"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MagneticProps = {
  children: ReactNode;
  /** Maximum pull toward the pointer, in px. */
  strength?: number;
  /** Inner content lags behind the shell for a parallax feel. */
  innerStrength?: number;
  className?: string;
};

const SPRING = { stiffness: 220, damping: 22, mass: 0.55 } as const;

/**
 * Pointer attraction. The wrapper drifts toward the cursor and the inner
 * layer follows at a lower rate, so the label appears to sit above the
 * surface rather than being glued to it.
 */
export function Magnetic({
  children,
  strength = 8,
  innerStrength = 4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const ratio = innerStrength / (strength || 1);
  const ix = useTransform(sx, (v) => v * ratio);
  const iy = useTransform(sy, (v) => v * ratio);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // -1..1 from the element centre, clamped so wide buttons don't over-pull.
    const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, nx)) * strength);
    y.set(Math.max(-1, Math.min(1, ny)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlurCapture={reset}
    >
      <motion.div style={{ x: ix, y: iy }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
