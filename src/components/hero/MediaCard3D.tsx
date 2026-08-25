"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { SceneTheme, SurfaceLayout } from "./layout";

const VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;

uniform sampler2D uMap;
uniform float uAspect;   // width / height of the surface
uniform float uRadius;   // corner radius, in units of the padded plane height
uniform float uInset;    // card's share of the padded plane (rest is shadow room)
uniform float uReveal;   // 0 -> 1 entry wipe
uniform float uHover;    // 0 -> 1 this surface is hovered
uniform float uDim;      // 0 -> 1 another surface is hovered
uniform float uOpacity;  // group fade (scroll / reduced motion)
uniform float uBase;     // resting exposure, set by depth
uniform float uLight;    // 0 dark theme, 1 light theme
uniform vec3  uCanvas;   // page background, what surfaces recede into on light
uniform vec3  uEdge;     // hairline colour
uniform vec3  uAccent;

varying vec2 vUv;

const vec3 SHADOW_COLOR = vec3(0.067, 0.067, 0.059);
const float SHADOW_DROP = 0.05;
const float SHADOW_SPREAD = 0.085;
const float SHADOW_STRENGTH = 0.16;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

void main() {
  // Work in a space where one unit equals the padded plane height. The card
  // occupies uInset of it; the margin is where the light-mode shadow lives.
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  vec2 hb = vec2(uAspect, 1.0) * 0.5 * uInset;
  float d = roundedBox(p, hb, uRadius);

  const float AA = 0.0045;
  float shape = 1.0 - smoothstep(-AA, AA, d);

  // Soft contact shadow — light theme only, so photography reads as sitting
  // above the paper rather than printed onto it. Deeper surfaces cast less,
  // which carries part of the depth the light theme no longer gets from fading.
  float ds = roundedBox(p - vec2(0.0, -SHADOW_DROP), hb, uRadius);
  float sh = (1.0 - smoothstep(0.0, SHADOW_SPREAD, ds))
    * SHADOW_STRENGTH * uLight * mix(0.55, 1.0, uBase);

  if (shape <= 0.001 && sh <= 0.002) discard;

  vec2 cardUv = (vUv - 0.5) / uInset + 0.5;
  vec3 col = texture2D(uMap, clamp(cardUv, 0.0, 1.0)).rgb;

  // Pull saturation back so photography sits inside the palette, but keep
  // enough that a portrait still reads as a photograph at rest.
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, mix(mix(0.80, 0.88, uLight), 0.99, uHover));

  float exposure = uBase * mix(1.0, 1.5, uHover) * mix(1.0, 0.55, uDim);
  float ground = smoothstep(0.0, 0.6, cardUv.y);

  if (uLight > 0.5) {
    // Depth reads as receding into the paper, not into the dark.
    col = mix(uCanvas, col, mix(0.18, 1.0, clamp(exposure, 0.0, 1.0)));
    col = mix(uCanvas, col, mix(0.9, 1.0, ground));
  } else {
    col *= exposure;
    col *= mix(0.66, 1.0, ground);
  }

  // Hairline edge, going to the accent on hover. On paper the border keeps a
  // floor even for receded surfaces, so their frames stay defined.
  float edge = smoothstep(-0.010, 0.0, d);
  vec3 edgeCol = mix(uEdge, uAccent, uHover);
  float restEdge = mix(0.17 * uBase, mix(0.14, 0.30, uBase), uLight);
  col = mix(col, edgeCol, edge * mix(restEdge, 0.6, uHover));

  // Entry: a soft wipe travelling up from the lower edge.
  float mask = smoothstep(0.0, 0.3, uReveal * 1.3 - cardUv.y);

  float cardA = shape * mask * uOpacity;
  float alpha = max(cardA, sh * mask * uOpacity);

  gl_FragColor = vec4(mix(SHADOW_COLOR, col, shape), alpha);
  #include <colorspace_fragment>
}
`;

type MediaCard3DProps = {
  layout: SurfaceLayout;
  map: THREE.Texture;
  aspect: number;
  hovered: boolean;
  anotherHovered: boolean;
  interactive: boolean;
  /** Settle instantly instead of animating in — the scene renders on demand. */
  reduced: boolean;
  theme: SceneTheme;
  /** Shared 0..1 group fade, mutated by the scene each frame. */
  opacityRef: React.RefObject<number>;
  /** Seconds since the scene mounted, before this card starts revealing. */
  delay: number;
  onHover: (id: string | null) => void;
};

/** Card's share of its plane; the remainder carries the light-mode shadow. */
const INSET = 0.88;

const REVEAL_SECONDS = 1.05;

export function MediaCard3D({
  layout,
  map,
  aspect,
  hovered,
  anotherHovered,
  interactive,
  reduced,
  theme,
  opacityRef,
  delay,
  onHover,
}: MediaCard3DProps) {
  const mesh = useRef<THREE.Mesh>(null);
  // R3F clones the `uniforms` object when it applies the prop, so animate the
  // live material's uniforms rather than the object handed to JSX.
  const material = useRef<THREE.ShaderMaterial>(null);
  const started = useRef<number | null>(null);
  // Theme is applied inside the render loop, only when it actually changes.
  const appliedTheme = useRef<SceneTheme | null>(null);

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uAspect: { value: aspect },
      uRadius: { value: 0.022 * INSET },
      uInset: { value: INSET },
      uReveal: { value: 0 },
      uHover: { value: 0 },
      uDim: { value: 0 },
      uOpacity: { value: 1 },
      uBase: { value: layout.base },
      uLight: { value: 0 },
      uCanvas: { value: new THREE.Color(theme.canvas) },
      uEdge: { value: new THREE.Color(theme.edge) },
      uAccent: { value: new THREE.Color(theme.accent) },
    }),
    // Theme is applied imperatively below so a swap never rebuilds the material.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, aspect, layout.base],
  );

  // The plane is slightly larger than the card so the light-mode shadow has
  // room to fall outside it; INSET is the card's share of that plane.
  const height = layout.height / INSET;
  const width = height * aspect;

  useFrame((state, delta) => {
    const node = mesh.current;
    const u = material.current?.uniforms;
    if (!node || !u) return;

    if (appliedTheme.current !== theme) {
      appliedTheme.current = theme;
      u.uLight.value = theme.light ? 1 : 0;
      (u.uCanvas.value as THREE.Color).set(theme.canvas);
      (u.uEdge.value as THREE.Color).set(theme.edge);
      (u.uAccent.value as THREE.Color).set(theme.accent);
    }

    const t = state.clock.elapsedTime;
    if (started.current === null) started.current = t;
    const since = t - started.current - delay;

    const reveal = reduced ? 1 : Math.max(0, Math.min(1, since / REVEAL_SECONDS));
    // easeOutCubic
    u.uReveal.value = 1 - Math.pow(1 - reveal, 3);
    u.uOpacity.value = opacityRef.current;

    const target = hovered ? 1 : 0;
    u.uHover.value += (target - u.uHover.value) * Math.min(1, delta * 7);
    const dimTarget = anotherHovered ? 1 : 0;
    u.uDim.value += (dimTarget - u.uDim.value) * Math.min(1, delta * 5);

    // Slow elliptical drift. Periods are long enough that this reads as
    // depth rather than as a carousel.
    const a = reduced ? layout.phase : t * layout.speed + layout.phase;
    const x = layout.center[0] + Math.cos(a) * layout.radius[0];
    const z = layout.center[2] + Math.sin(a) * layout.radius[1];
    const y =
      layout.center[1] +
      (reduced ? 0 : Math.sin(t * layout.bobSpeed + layout.phase) * layout.bob);

    // Entry arrives from further back.
    const entry = (1 - u.uReveal.value) * layout.entryDepth;
    const lift = hovered ? 0.34 : 0;

    node.position.set(x, y, z - entry + lift);

    const settle = hovered ? 0.35 : 1;
    const wobbleX = reduced ? 0 : Math.sin(t * layout.bobSpeed * 0.7) * 0.03;
    const wobbleY = reduced ? 0 : Math.sin(a * 0.8) * 0.05;
    node.rotation.x = (layout.tilt[0] + wobbleX) * settle;
    node.rotation.y = (layout.tilt[1] + wobbleY) * settle;
    node.rotation.z = layout.tilt[2] * settle;
  });

  return (
    <mesh
      ref={mesh}
      renderOrder={layout.order}
      onPointerOver={
        interactive
          ? (e) => {
              e.stopPropagation();
              onHover(layout.id);
              document.body.style.cursor = "pointer";
            }
          : undefined
      }
      onPointerOut={
        interactive
          ? () => {
              onHover(null);
              document.body.style.cursor = "";
            }
          : undefined
      }
    >
      <planeGeometry args={[width, height, 1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
