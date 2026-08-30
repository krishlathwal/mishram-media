"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { PUBLIC_SERVICES } from "@/config/services";

/**
 * Editorial position marker: 01 ── ● ─────────── 04.
 *
 * It marks position within the chapter the visitor is actually reading, so it
 * spans the services on **public discovery** — not the full five-service
 * system. Before Revision 16 the two were the same list and this read
 * `01 … 05`; with Service 05 hidden, an endpoint of `05` would advertise a
 * chapter that is not there and leave the fill short of its own last dot.
 *
 * **Numbering is not renumbered to close the gap** — each service keeps its
 * canonical index from `config/services.ts`, so the endpoints are the first
 * and last *visible* indices rather than a recount.
 *
 * Nothing here is clickable, and it stays that way. Some services have a page
 * and some do not; a rail where a few dots navigate is worse than one where
 * none do. The route in is `Explore service ↗` in the copy column, which only
 * appears where there is somewhere to go.
 */
export function ServiceProgress({
  progress,
}: {
  /** 0..1 across the whole visible sequence. */
  progress: MotionValue<number>;
}) {
  const total = PUBLIC_SERVICES.length;
  // `total - 1` is the span the dots are placed across. Guarded because the
  // set is now editorial rather than fixed: hiding services down to one would
  // otherwise put every dot at `NaN%`.
  const span = Math.max(1, total - 1);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const opacity = useTransform(progress, [0, 0.12], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-4">
      <span className="caps text-ink-muted">{PUBLIC_SERVICES[0].index}</span>

      <span className="relative block h-px flex-1 bg-line">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 block w-full origin-left bg-accent"
          style={{ scaleX }}
        />
        {PUBLIC_SERVICES.map((s, i) => (
          <span
            key={s.id}
            aria-hidden
            className="absolute top-1/2 block h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-accent"
            style={{ left: `${(i / span) * 100}%` }}
          />
        ))}
      </span>

      <span className="caps text-ink-muted">
        {PUBLIC_SERVICES[total - 1].index}
      </span>
    </motion.div>
  );
}
