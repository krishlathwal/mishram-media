"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { HERO_ANNOTATIONS, HERO_SURFACES } from "@/config/hero";
import type { Theme } from "@/components/theme/ThemeProvider";

import { MediaCard3D } from "./MediaCard3D";
import {
  CAMERA,
  DESKTOP_LAYOUT,
  ENTRY_DELAY,
  MOBILE_LAYOUT,
  RINGS,
  SCENE_THEME,
  type SceneTheme,
  type SurfaceLayout,
} from "./layout";
import {
  TEXTURE_THEME,
  createGrowthTexture,
  createInterfaceTexture,
} from "./textures";

export type HoverPayload = { label: string; caption: string } | null;

export type PlaceAnnotation = (
  index: number,
  x: number,
  y: number,
  opacity: number,
) => void;

type SceneProps = {
  stacked: boolean;
  reduced: boolean;
  /** 0 at the top of the hero, 1 once it has scrolled away. */
  scrollRef: React.RefObject<number>;
  onHover: (payload: HoverPayload) => void;
  active: boolean;
  theme: Theme;
  /** Called each frame with where an annotation should sit, in CSS pixels. */
  placeAnnotation: PlaceAnnotation;
};

/** Faint orbital rings — the system the media surfaces belong to. */
function OrbitRings({
  opacityRef,
  config,
  theme,
}: {
  opacityRef: React.RefObject<number>;
  config: { origin: readonly [number, number, number]; scale: number };
  theme: SceneTheme;
}) {
  const group = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame((state) => {
    if (group.current) group.current.rotation.z = state.clock.elapsedTime * 0.012;
    const o = opacityRef.current;
    materials.current.forEach((m, i) => {
      if (!m) return;
      m.opacity = theme.ringOpacity[i === 0 ? 0 : 1] * o;
      m.color.set(theme.ring);
    });
  });

  return (
    <group
      ref={group}
      position={[config.origin[0], config.origin[1], config.origin[2]]}
      scale={config.scale}
    >
      <mesh rotation={[1.28, 0, 0.14]} renderOrder={0}>
        <torusGeometry args={[2.85, 0.0045, 4, 128]} />
        <meshBasicMaterial
          ref={(m) => {
            if (m) materials.current[0] = m;
          }}
          color={theme.ring}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[1.44, 0.2, -0.1]} renderOrder={0}>
        <torusGeometry args={[4.1, 0.004, 4, 128]} />
        <meshBasicMaterial
          ref={(m) => {
            if (m) materials.current[1] = m;
          }}
          color={theme.ring}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Projects each annotation's world anchor to screen space and hands the result
 * back to the DOM layer outside the canvas — so the labels parallax with the
 * surfaces around them while staying real, crisp text.
 */
function Annotations({
  opacityRef,
  place,
  parentRef,
}: {
  opacityRef: React.RefObject<number>;
  place: PlaceAnnotation;
  parentRef: React.RefObject<THREE.Group | null>;
}) {
  const point = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, size }) => {
    const parent = parentRef.current;
    if (!parent) return;
    const o = opacityRef.current;

    for (let i = 0; i < HERO_ANNOTATIONS.length; i += 1) {
      const a = HERO_ANNOTATIONS[i];
      point.set(a.at[0], a.at[1], a.at[2]);
      // Inherit the group's parallax and scroll transform.
      parent.localToWorld(point);
      point.project(camera);

      place(
        i,
        (point.x * 0.5 + 0.5) * size.width,
        (-point.y * 0.5 + 0.5) * size.height,
        point.z < 1 ? 0.85 * o : 0,
      );
    }
  });

  return null;
}

/**
 * Drives the whole group: pointer parallax, the scroll hand-off toward the
 * next section, and the shared opacity every surface reads from.
 */
function SceneBody({
  stacked,
  reduced,
  scrollRef,
  onHover,
  placeAnnotation,
  theme,
}: Omit<SceneProps, "active">) {
  const group = useRef<THREE.Group>(null);
  const opacityRef = useRef(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const { invalidate } = useThree();

  const layouts = stacked ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const sceneTheme = SCENE_THEME[theme];

  const photoSurfaces = useMemo(
    () =>
      HERO_SURFACES.filter(
        (s) => Boolean(layouts[s.id]) && (!stacked || s.onMobile),
      ),
    [layouts, stacked],
  );

  const loaded = useLoader(
    THREE.TextureLoader,
    photoSurfaces.map((s) => s.src),
  );

  const textures = useMemo(() => {
    const arr = (Array.isArray(loaded) ? loaded : [loaded]) as THREE.Texture[];
    arr.forEach((t) => {
      // Hardware sRGB decode on sample; the shader encodes back on output.
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.needsUpdate = true;
    });
    return arr;
  }, [loaded]);

  const procedural = useMemo(() => {
    const t = TEXTURE_THEME[theme];
    const built: Record<string, THREE.Texture> = {
      interface: createInterfaceTexture(t),
    };
    if (!stacked) built.growth = createGrowthTexture(t);
    return built;
  }, [stacked, theme]);

  useEffect(() => {
    return () => {
      Object.values(procedural).forEach((t) => t.dispose());
    };
  }, [procedural]);

  // Reduced motion: settle immediately, render one frame, then stop. A theme
  // swap needs the same nudge, since nothing else requests a frame.
  useEffect(() => {
    if (!reduced) return;
    // Two nudges: one once the textures land, one after layout settles.
    const a = window.setTimeout(() => invalidate(), 40);
    const b = window.setTimeout(() => invalidate(), 240);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [reduced, invalidate, theme]);

  useEffect(() => {
    const s = photoSurfaces.find((p) => p.id === hovered);
    onHover(s ? { label: s.label, caption: s.caption } : null);
  }, [hovered, photoSurfaces, onHover]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const p = scrollRef.current;
    // Scroll hand-off: the system recedes and settles a little lower, so the
    // section that eventually follows feels like the same space.
    const targetZ = reduced ? 0 : -2.2 * p;
    const targetY = reduced ? 0 : -0.85 * p;
    opacityRef.current = Math.max(0, 1 - p * 1.15);

    if (reduced) {
      node.position.set(0, 0, 0);
      node.rotation.set(0, 0, 0);
      opacityRef.current = 1;
      return;
    }

    const k = Math.min(1, delta * 3.2);
    node.position.z += (targetZ - node.position.z) * k;
    node.position.y += (targetY - node.position.y) * k;

    // Restrained pointer parallax.
    const px = state.pointer.x;
    const py = state.pointer.y;
    const kp = Math.min(1, delta * 2.4);
    node.rotation.y += (px * 0.085 - node.rotation.y) * kp;
    node.rotation.x += (-py * 0.055 - node.rotation.x) * kp;
    node.position.x += (px * -0.16 - node.position.x) * kp;
  });

  return (
    <group ref={group}>
      <OrbitRings
        opacityRef={opacityRef}
        config={stacked ? RINGS.mobile : RINGS.desktop}
        theme={sceneTheme}
      />

      {photoSurfaces.map((s, i) => (
        <MediaCard3D
          key={s.id}
          layout={layouts[s.id]}
          map={textures[i]}
          aspect={s.aspect}
          hovered={hovered === s.id}
          anotherHovered={hovered !== null && hovered !== s.id}
          interactive={!reduced && !stacked}
          reduced={reduced}
          theme={sceneTheme}
          opacityRef={opacityRef}
          delay={ENTRY_DELAY[s.id] ?? 0}
          onHover={setHovered}
        />
      ))}

      {Object.entries(procedural).map(([id, tex]) => {
        const layout = layouts[id] as SurfaceLayout | undefined;
        if (!layout) return null;
        return (
          <MediaCard3D
            key={id}
            layout={layout}
            map={tex}
            aspect={id === "interface" ? 768 / 480 : 640 / 400}
            hovered={false}
            anotherHovered={hovered !== null}
            interactive={false}
            reduced={reduced}
            theme={sceneTheme}
            opacityRef={opacityRef}
            delay={ENTRY_DELAY[id] ?? 0}
            onHover={() => {}}
          />
        );
      })}

      {!stacked && (
        <Annotations
          opacityRef={opacityRef}
          place={placeAnnotation}
          parentRef={group}
        />
      )}
    </group>
  );
}

export function Scene({
  stacked,
  reduced,
  scrollRef,
  onHover,
  active,
  placeAnnotation,
  theme,
}: SceneProps) {
  const cam = stacked ? CAMERA.mobile : CAMERA.desktop;

  return (
    <Canvas
      flat
      dpr={[1, stacked ? 1.5 : 1.75]}
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [...cam.position], fov: cam.fov, near: 0.1, far: 40 }}
      style={{ width: "100%", height: "100%" }}
      onCreated={(s) => {
        if (process.env.NODE_ENV !== "production") {
          (window as unknown as { __r3f?: unknown }).__r3f = s;
        }
      }}
    >
      <Suspense fallback={null}>
        <SceneBody
          stacked={stacked}
          reduced={reduced}
          scrollRef={scrollRef}
          onHover={onHover}
          placeAnnotation={placeAnnotation}
          theme={theme}
        />
      </Suspense>
    </Canvas>
  );
}
