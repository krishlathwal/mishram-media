"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import {
  DIFFERENCE_COPY,
  DIFFERENTIATORS,
  type DifferentiatorId,
} from "@/config/difference";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { DifferenceFragment } from "./fragments";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The connected stack, wide.
 *
 * Four layers on the left, one vertical Mishram axis, and what the active layer
 * means on the right of it. **Not four cards** — the rows are hairline-
 * separated rows of type, and the only thing that moves on activation is a teal
 * line travelling along that row's connector into the axis, plus a matching
 * teal segment appearing on the axis itself at the row's height.
 *
 * The axis is drawn by `Difference` and spans the whole section, so the segment
 * here has to sit at exactly the same x. Both resolve `--dif-axis` against the
 * same `page-x` content box, which is why neither hard-codes a pixel offset.
 *
 * Row heights are a fixed `--dif-row`, which is what lets the axis segment be
 * placed with one transform (`index × row height`) instead of measuring the DOM.
 */
export function ConnectedStack({
  activeId,
  lockedId,
  onPreview,
  onClearPreview,
  onSelect,
}: {
  activeId: DifferentiatorId;
  lockedId: DifferentiatorId;
  onPreview: (id: DifferentiatorId) => void;
  onClearPreview: () => void;
  onSelect: (id: DifferentiatorId) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const activeIndex = Math.max(
    0,
    DIFFERENTIATORS.findIndex((d) => d.id === activeId),
  );

  return (
    <div className="dif-system relative">
      {/* The axis responds: one teal segment, one row tall, moved to whichever
          layer is active. A direct child of the system rather than of the list,
          because `--dif-axis` has to resolve against the *system's* width —
          inside the 56% column it would land at 56% of 56%. */}
      <motion.span
        aria-hidden
        className="dif-axis-active"
        initial={false}
        animate={{ y: `${activeIndex * 100}%` }}
        transition={{ duration: reduced ? 0.14 : 0.52, ease: EASE }}
      />

      <div className="dif-split grid">
        {/* ── The four layers ─────────────────────────────────────── */}
        <ul
          className="relative border-t border-line"
          onMouseLeave={onClearPreview}
        >
          {DIFFERENTIATORS.map((d, i) => {
            const active = d.id === activeId;
            return (
              <motion.li
                key={d.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.18 + i * 0.08,
                  ease: EASE,
                }}
                className="border-b border-line"
              >
                <button
                  type="button"
                  aria-current={d.id === lockedId ? "true" : undefined}
                  onMouseEnter={() => onPreview(d.id)}
                  onFocus={() => onPreview(d.id)}
                  onBlur={onClearPreview}
                  onClick={() => onSelect(d.id)}
                  className="dif-row flex w-full items-center gap-5 pr-0 text-left"
                >
                  <span
                    className={clsx(
                      "caps w-6 shrink-0 transition-colors duration-300",
                      active ? "text-accent" : "text-ink-muted",
                    )}
                  >
                    {d.index}
                  </span>

                  <span
                    className={clsx(
                      "font-display text-[clamp(1.15rem,1.7vw,1.5rem)] leading-none font-medium tracking-[-0.025em] transition-colors duration-300",
                      active ? "text-ink" : "text-ink-soft",
                    )}
                  >
                    {d.name}
                  </span>

                  {/* The connector. The graphite line always reaches the axis —
                      that is the structure. Activation runs teal along it. */}
                  <span
                    aria-hidden
                    className="relative ml-8 block h-px min-w-8 flex-1 bg-line"
                  >
                    <span
                      className={clsx(
                        "dif-reach absolute inset-0 block origin-left bg-accent",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        {/* ── What the active layer means ─────────────────────────── */}
        <div className="relative pl-10 xl:pl-14">
          {DIFFERENTIATORS.map((d) => (
            <DetailBlock
              key={d.id}
              id={d.id}
              detail={d.detail}
              meta={d.meta}
              active={d.id === activeId}
              reduced={reduced}
            />
          ))}
        </div>
      </div>

      {/* ── The axis resolves ───────────────────────────────────── */}
      {/* Trigger on the block, not on its two marks: both sit at the foot of a
          960px section, where a viewport margin measured against a 74px line or
          an 11px label leaves them outside the root. The block's own box is
          always in view when they are. */}
      <motion.div
        className="relative h-[7.5rem]"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.span
          aria-hidden
          className="dif-axis-out"
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        />
        <motion.span
          className="dif-out-label caps text-accent"
          variants={{
            hidden: { opacity: 0, y: 8 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          {DIFFERENCE_COPY.outputLabel}
        </motion.span>
      </motion.div>
    </div>
  );
}

/**
 * Every block is mounted and only the active one is visible, so the sentence
 * for each layer is real DOM text at all times — the drawing never carries the
 * explanation on its own, and the container height is driven by whichever block
 * is live.
 */
function DetailBlock({
  id,
  detail,
  meta,
  active,
  reduced,
}: {
  id: DifferentiatorId;
  detail: string;
  meta: readonly string[];
  active: boolean;
  reduced: boolean;
}) {
  const dur = reduced ? 0.18 : 0.42;

  return (
    <motion.div
      aria-hidden={!active}
      className={
        active ? "relative" : "pointer-events-none absolute inset-x-0 top-0"
      }
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.16 : 0.26, ease: EASE }}
    >
      <motion.p
        className="max-w-[40ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.62] text-ink/72"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
        transition={{ duration: dur, ease: EASE }}
      >
        {detail}
      </motion.p>

      <motion.ul
        className="caps mt-7 flex flex-wrap items-center gap-x-3 gap-y-3 text-ink-muted"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
        transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.06 }}
      >
        {meta.map((m, i) => (
          <li key={m} className="flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden className="block h-px w-3 bg-line-strong" />
            ) : null}
            {m}
          </li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-9"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 12 }}
        transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.12 }}
      >
        <DifferenceFragment id={id} />
      </motion.div>
    </motion.div>
  );
}
