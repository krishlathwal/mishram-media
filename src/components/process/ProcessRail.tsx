"use client";

import { AnimatePresence, motion } from "motion/react";

import { PROCESS_STAGES } from "@/config/process";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Tablet and mobile: the same five stages read as a vertical system rather than
 * a squeezed horizontal one. A hairline runs down the rail with a teal segment
 * filled as far as the active stage — the same progress reading as the desktop
 * pipeline, rotated.
 *
 * The active stage expands in place: description and activities sit directly on
 * the page under hairline separators. Deliberately not an accordion of cards,
 * and only ever one open at a time.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProcessRail({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const activeIndex = Math.max(
    0,
    PROCESS_STAGES.findIndex((s) => s.id === activeId),
  );
  return (
    <div className="relative">
      {/* The rail runs behind the rows in per-row segments rather than as one
          bar with a percentage height: the active row expands, so any fraction
          of the whole rail would land the teal tip in the wrong place. Each
          segment is teal if its stage has been reached, and the active row's
          segment stops at the node — a fixed offset from the row top, which
          holds no matter how much description the row is showing. */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] w-px bg-line-strong"
      />

      <ul className="border-t border-line">
        {PROCESS_STAGES.map((s, i) => {
          const active = s.id === activeId;
          const reached = i < activeIndex;
          return (
            <li key={s.id} className="relative border-b border-line">
              <motion.span
                aria-hidden
                className="absolute top-0 left-[7px] block w-px bg-accent"
                initial={false}
                animate={{
                  height: reached ? "100%" : active ? "1.85rem" : "0rem",
                }}
                transition={{ duration: reduced ? 0.18 : 0.45, ease: EASE }}
              />

              <button
                type="button"
                aria-current={active ? "true" : undefined}
                aria-expanded={active}
                onClick={() => onSelect(s.id)}
                className="relative flex w-full items-center gap-5 py-5 pl-6 text-left"
              >
                {/* Node on the rail, centred on the 1px line. */}
                <span
                  aria-hidden
                  className={`absolute block rounded-full transition-all duration-300 ${
                    active
                      ? "left-[3px] h-[9px] w-[9px] bg-accent"
                      : "left-[5px] h-[5px] w-[5px] bg-line-strong"
                  }`}
                />
                <span
                  className={`caps w-6 shrink-0 transition-colors duration-300 ${
                    active ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {s.index}
                </span>
                <span
                  className={`font-display text-[clamp(1.05rem,4.2vw,1.35rem)] leading-none font-medium tracking-[-0.02em] transition-colors duration-300 ${
                    active ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {s.name}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0.18 : 0.42, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-7 pl-[3.55rem]">
                      <p className="max-w-[46ch] text-[0.9375rem] leading-[1.6] text-ink/72">
                        {s.description}
                      </p>
                      <ul className="caps mt-5 flex flex-wrap items-center gap-x-3 gap-y-3 text-ink-muted">
                        {s.activities.map((a, i) => (
                          <li key={a} className="flex items-center gap-3">
                            {i > 0 ? (
                              <span
                                aria-hidden
                                className="block h-px w-3 bg-line-strong"
                              />
                            ) : null}
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* The loop, stated rather than drawn — there is no room for a return
          curve at this width, and it is the meaning that matters. */}
      <p className="caps mt-6 flex items-center gap-3 pl-6 text-accent">
        <span aria-hidden className="block h-px w-4 bg-accent/60" />
        Learn → Iterate
      </p>
    </div>
  );
}
