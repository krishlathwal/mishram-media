"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

import type { ServiceId } from "@/config/services";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { BrandShootsScene } from "./scenes/BrandShootsScene";
import { InfluencerMarketingScene } from "./scenes/InfluencerMarketingScene";
import { PerformanceMarketingScene } from "./scenes/PerformanceMarketingScene";
import { SocialGrowthScene } from "./scenes/SocialGrowthScene";
import { WebDigitalScene } from "./scenes/WebDigitalScene";

/**
 * What every service scene is handed: one 0..1 progress value for its own slot
 * in the sequence, plus normalised pointer position over the stage. Scenes read
 * these through `useTransform` and never trigger a React render while scrolling.
 */
export type StageMotion = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

const SPRING = { stiffness: 140, damping: 24, mass: 0.6 } as const;

/**
 * The shared visual stage. Every service registers its scene here, keyed by id;
 * an unregistered id renders nothing rather than an empty frame.
 */
const SCENES: Partial<Record<ServiceId, (m: StageMotion) => React.ReactNode>> = {
  "social-growth": (m) => <SocialGrowthScene m={m} />,
  influencer: (m) => <InfluencerMarketingScene m={m} />,
  performance: (m) => <PerformanceMarketingScene m={m} />,
  web: (m) => <WebDigitalScene m={m} />,
  shoots: (m) => <BrandShootsScene m={m} />,
};

export function ServiceStage({
  id,
  progress,
}: {
  id: ServiceId;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, SPRING);
  const pointerY = useSpring(rawY, SPRING);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [reduced, rawX, rawY],
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const scene = SCENES[id];
  if (!scene) return null;

  return (
    <div
      className="svc-stage"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* Fixed-aspect composition box. Pointer parallax is normalised against
          it, not the stage, so the parallax field matches what is drawn. */}
      <div ref={ref} className="svc-stage-box">
        {scene({ progress, pointerX, pointerY })}
      </div>
    </div>
  );
}
