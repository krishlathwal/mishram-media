"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { BUILT_SERVICES, SERVICES } from "@/config/services";

/**
 * Editorial position marker: 01 ── ● ─────────── 05.
 *
 * The accent line fills across the range the built services occupy, and any
 * remaining slot shows as a quiet tick. Nothing here is clickable — there are
 * no per-service pages, and dead navigation would imply otherwise.
 */
export function ServiceProgress({
  progress,
}: {
  /** 0..1 across the whole built sequence. */
  progress: MotionValue<number>;
}) {
  const total = SERVICES.length;
  const builtSpan = BUILT_SERVICES.length / total;
  const scaleX = useTransform(progress, [0, 1], [0, builtSpan]);
  const opacity = useTransform(progress, [0, 0.12], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-4">
      <span className="caps text-ink-muted">{SERVICES[0].index}</span>

      <span className="relative block h-px flex-1 bg-line">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 block w-full origin-left bg-accent"
          style={{ scaleX }}
        />
        {SERVICES.map((s, i) => (
          <span
            key={s.id}
            aria-hidden
            className={`absolute top-1/2 block -translate-y-1/2 ${
              s.built
                ? "h-[5px] w-[5px] rounded-full bg-accent"
                : "h-[3px] w-px bg-line-strong"
            }`}
            style={{ left: `${(i / (total - 1)) * 100}%` }}
          />
        ))}
      </span>

      <span className="caps text-ink-muted">{SERVICES[total - 1].index}</span>
    </motion.div>
  );
}
