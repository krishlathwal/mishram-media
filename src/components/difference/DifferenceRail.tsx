"use client";

import { AnimatePresence, motion } from "motion/react";

import {
  DIFFERENCE_COPY,
  DIFFERENTIATORS,
  type DifferentiatorId,
} from "@/config/difference";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { DifferenceFragment } from "./fragments";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The connected stack, narrow.
 *
 * Four horizontal layers cannot be squeezed into 390px without becoming
 * illegible, so the same system is rotated: one axis down the left, each layer
 * hanging off it by a node, and the active layer expanding in place. **Still not
 * cards** — hairline rows on a single line, and the line continues past the last
 * one into `Momentum` exactly as it does on the wide layout.
 *
 * Unlike 04 / Work Process's rail, the teal fill is **not cumulative**: these are
 * four parallel operating facts, not five sequential stages, so filling the rail
 * "as far as" one of them would claim an order that does not exist.
 */
export function DifferenceRail({
  activeId,
  onSelect,
}: {
  activeId: DifferentiatorId;
  onSelect: (id: DifferentiatorId) => void;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] w-px bg-line-strong"
      />
      {!reduced && (
        <span aria-hidden className="dif-signal left-[7px]" />
      )}

      <ul className="border-t border-line">
        {DIFFERENTIATORS.map((d) => {
          const active = d.id === activeId;
          return (
            <li key={d.id} className="relative border-b border-line">
              {/* Only the active layer's own segment goes teal. */}
              <motion.span
                aria-hidden
                className="absolute top-0 left-[7px] block w-px bg-accent"
                initial={false}
                animate={{ height: active ? "1.85rem" : "0rem" }}
                transition={{ duration: reduced ? 0.16 : 0.45, ease: EASE }}
              />

              <button
                type="button"
                aria-current={active ? "true" : undefined}
                aria-expanded={active}
                onClick={() => onSelect(d.id)}
                className="relative flex w-full items-center gap-4 py-5 pl-6 text-left"
              >
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
                  {d.index}
                </span>
                <span
                  className={`font-display text-[clamp(1.05rem,4vw,1.35rem)] leading-[1.1] font-medium tracking-[-0.02em] transition-colors duration-300 ${
                    active ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {d.name}
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
                    <div className="pb-7 pl-[3.1rem]">
                      <p className="max-w-[46ch] text-[0.9375rem] leading-[1.6] text-ink/72">
                        {d.detail}
                      </p>
                      <ul className="caps mt-5 flex flex-wrap items-center gap-x-3 gap-y-3 text-ink-muted">
                        {d.meta.map((m, i) => (
                          <li key={m} className="flex items-center gap-3">
                            {i > 0 ? (
                              <span
                                aria-hidden
                                className="block h-px w-3 bg-line-strong"
                              />
                            ) : null}
                            {m}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-7">
                        <DifferenceFragment id={d.id} />
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* The axis resolves, the same way it does on the wide layout. */}
      {/* Trigger on the block, not on the line or the label — see the note on
          the same block in ConnectedStack. */}
      <motion.div
        className="relative h-[5.5rem]"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.span
          aria-hidden
          className="absolute top-0 left-[7px] block h-[3.4rem] w-px origin-top bg-accent"
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        />
        <motion.span
          className="caps absolute top-[3.1rem] left-6 text-accent"
          variants={{
            hidden: { opacity: 0, y: 8 },
            shown: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
        >
          {DIFFERENCE_COPY.outputLabel}
        </motion.span>
      </motion.div>
    </div>
  );
}
