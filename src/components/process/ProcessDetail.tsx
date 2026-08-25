"use client";

import { motion } from "motion/react";

import { PROCESS_STAGES, type ProcessStage } from "@/config/process";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The active stage, explained. Sits on the grid between two hairlines — no
 * card, no rounded container, no fill.
 *
 * Every stage's block is mounted and only the active one is visible, so the
 * text swap needs no remount and the container height is always driven by
 * whichever block is live. Descriptions are real DOM text at every stage, so
 * the process is never explained by the drawing alone.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Block({
  stage,
  active,
  reduced,
}: {
  stage: ProcessStage;
  active: boolean;
  reduced: boolean;
}) {
  const dur = reduced ? 0.2 : 0.44;

  return (
    <motion.div
      aria-hidden={!active}
      className={
        active ? "relative" : "pointer-events-none absolute inset-x-0 top-0"
      }
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.18 : 0.28, ease: EASE }}
    >
      <div className="grid gap-y-6 md:grid-cols-12 md:gap-x-8">
        <p className="md:col-span-4 lg:col-span-3">
          <span className="caps block text-accent">{stage.index}</span>
          <span className="-mb-[0.1em] mt-3 block overflow-hidden font-display text-[clamp(1.5rem,2.2vw,2.15rem)] leading-[1.05] font-medium tracking-[-0.03em] text-ink">
            <motion.span
              className="block pb-[0.12em]"
              initial={false}
              animate={{ y: active || reduced ? "0%" : "108%" }}
              transition={{ duration: dur, ease: EASE }}
            >
              {stage.name}
            </motion.span>
          </span>
        </p>

        <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
          <motion.p
            className="max-w-[52ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.6] text-ink/72"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
            transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.05 }}
          >
            {stage.description}
          </motion.p>

          <motion.ul
            className="caps mt-8 flex flex-wrap items-center gap-x-3 gap-y-3 text-ink-muted"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
            transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.1 }}
          >
            {stage.activities.map((a, i) => (
              <li key={a} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden className="block h-px w-3 bg-line-strong" />
                ) : null}
                {a}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessDetail({ activeId }: { activeId: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative">
      {PROCESS_STAGES.map((s) => (
        <Block
          key={s.id}
          stage={s}
          active={s.id === activeId}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
