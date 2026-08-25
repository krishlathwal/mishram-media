"use client";

import Image from "next/image";
import { motion, useTransform } from "motion/react";

import type { StageMotion } from "../ServiceStage";

/**
 * Shared building blocks for every service scene: a depth-travelling surface,
 * a photographic fill and an editorial annotation. Extracted from Service 01
 * unchanged so each new scene composes the same grammar rather than inventing
 * its own.
 */

export type SurfaceSpec = {
  /** Percentages of the stage box. */
  left: number;
  top: number;
  width: number;
  aspect: string;
  /** Entry window in local service progress. */
  enter: [number, number];
  /** Depth: how far back it starts and how much pointer parallax it takes. */
  depth: number;
  tilt: number;
  drift: "a" | "b" | "c" | "d";
  z: number;
  /**
   * Extra offset in px at the start of the entry window, resolving to zero once
   * settled. Lets a surface travel into place — used for the campaign board
   * carrying across from Service 02, and to spread stacked variants apart.
   */
  travelX?: number;
  travelY?: number;
  /**
   * Scale at the start of the entry window. Defaults to 0.9; set it to the
   * ratio of the previous service's object when a surface should read as that
   * object growing rather than a new one appearing.
   */
  enterScale?: number;
  /**
   * How the surface behaves in the exit window. "recede" is the default handoff
   * posture; "advance" keeps a surface forward and dominant so it can become
   * the bridge into the next service.
   */
  exit?: "recede" | "advance";
  /**
   * Aspect ratio at the start of the entry window, as a number, resolving to
   * `aspect` once settled. Use it when a surface continues a differently
   * cropped object from the previous service — the crop resolves instead of
   * the frame cutting.
   */
  aspectFrom?: number;
};

/** Builds the scroll + pointer transform for one surface. */
export function useSurface(m: StageMotion, s: SurfaceSpec) {
  const { progress, pointerX, pointerY } = m;
  const [e0, e1] = s.enter;
  const advancing = s.exit === "advance";

  const exitZ = advancing ? 90 : -120;
  const exitScale = advancing ? 1.07 : 0.95;
  const exitOpacity = advancing ? 1 : 0.45;
  const exitY = advancing ? 0 : -30;

  const scrollY = useTransform(
    progress,
    [e0, e1, 0.8, 1],
    [90 * s.depth + (s.travelY ?? 0), 0, 0, exitY],
  );
  const scrollZ = useTransform(
    progress,
    [e0, e1, 0.8, 1],
    [-260 * s.depth, 0, 0, exitZ],
  );
  const scrollX = useTransform(progress, [e0, e1], [s.travelX ?? 0, 0]);
  const scale = useTransform(
    progress,
    [e0, e1, 0.8, 1],
    [s.enterScale ?? 0.9, 1, 1, exitScale],
  );
  const opacity = useTransform(
    progress,
    [e0, e0 + (e1 - e0) * 0.55, 0.8, 1],
    [0, 1, 1, exitOpacity],
  );

  const x = useTransform(
    [scrollX, pointerX] as const,
    ([sx, px]: number[]) => sx + px * 16 * s.depth,
  );
  const y = useTransform([scrollY, pointerY] as const, ([sy, py]: number[]) => sy + py * 11 * s.depth);
  const rotateY = useTransform(pointerX, (v) => v * -3 * s.depth);
  const rotateX = useTransform(pointerY, (v) => v * 2 * s.depth);

  return { x, y, z: scrollZ, scale, opacity, rotateY, rotateX };
}

/**
 * Resolving crop. Returns a static aspect string unless the spec opts into an
 * animated one, in which case the ratio interpolates across the entry window.
 * `aspect-ratio` accepts a bare number, so a MotionValue<number> drives it
 * directly.
 */
function useAspect(m: StageMotion, s: SurfaceSpec) {
  const [e0, e1] = s.enter;
  const to = parseAspect(s.aspect);
  const animated = useTransform(m.progress, [e0, e1], [s.aspectFrom ?? to, to]);
  return s.aspectFrom === undefined ? s.aspect : animated;
}

/** "9 / 16" -> 0.5625. */
function parseAspect(a: string): number {
  const [w, h] = a.split("/").map((n) => Number(n.trim()));
  return h ? w / h : Number(a);
}

export function Surface({
  m,
  spec,
  className,
  children,
}: {
  m: StageMotion;
  spec: SurfaceSpec;
  className?: string;
  children: React.ReactNode;
}) {
  const style = useSurface(m, spec);
  const aspect = useAspect(m, spec);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${spec.left}%`,
        top: `${spec.top}%`,
        width: `${spec.width}%`,
        zIndex: spec.z,
        x: style.x,
        y: style.y,
        z: style.z,
        scale: style.scale,
        opacity: style.opacity,
        rotateX: style.rotateX,
        rotateY: style.rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Inner wrapper carries the idle drift, so it never fights the
          scroll transform on the element above it. */}
      <div className={`svc-drift svc-drift--${spec.drift}`}>
        <motion.div
          className={`svc-surface ${className ?? ""}`}
          style={{ aspectRatio: aspect, transform: `rotate(${spec.tilt}deg)` }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Photo({
  src,
  alt,
  priority,
  sizes = "(max-width: 1023px) 45vw, 24vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Override when a frame is materially larger or smaller than the default. */
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="svc-photo object-cover"
      />
      <span aria-hidden className="svc-photo-veil" />
    </>
  );
}

export type AnnotationSpec = {
  text: string;
  left: number;
  top: number;
  /** Local progress at which it reveals. */
  at: number;
  /** Resting emphasis — background annotations sit lower. */
  level?: "fore" | "back";
};

export function Annotation({
  m,
  text,
  left,
  top,
  at,
  level = "fore",
}: AnnotationSpec & { m: StageMotion }) {
  const peak = level === "back" ? 0.55 : 1;
  const opacity = useTransform(
    m.progress,
    [at, at + 0.12, 0.82, 1],
    [0, peak, peak, 0.25],
  );
  const x = useTransform(m.progress, [at, at + 0.12], [-10, 0]);

  return (
    <motion.span
      aria-hidden
      className="svc-anno absolute z-40 items-center gap-2 whitespace-nowrap"
      style={{ left: `${left}%`, top: `${top}%`, opacity, x }}
    >
      <span className="block h-px w-5 bg-ink/25" />
      <span className="caps text-[0.5625rem] text-ink/50">{text}</span>
    </motion.span>
  );
}
