"use client";

import { motion } from "motion/react";

import { WHAT_WE_DO_CLOSING } from "@/config/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The end of 02 / What We Do.
 *
 * Service 05 is the last service, so the sequence resolves into a statement —
 * built from the section's own grid, hairlines and whitespace, deliberately not
 * a coloured conversion banner or a card.
 *
 * **There is no CTA here, on purpose.** This block used to carry a second
 * `Book a 15-Min Call` + `Contact Us` presentation a screen and a half after
 * the Hero's, before the visitor had seen a creator, the process or any work.
 * The ask now sits once at the top and once at the end, in About. See the note
 * on `WHAT_WE_DO_CLOSING` in `config/services.ts`.
 *
 * The bottom padding is the transition into the Mishram Difference interlude,
 * whose central axis begins at this block's lower edge — so it is short enough
 * that the line is carrying the gap rather than the gap being empty.
 */
export function WhatWeDoClosing() {
  const [line1, line2] = WHAT_WE_DO_CLOSING.statement;
  const accent = WHAT_WE_DO_CLOSING.accentWord;
  const rest = line2.slice(accent.length);

  return (
    <div className="page-x relative border-t border-line pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-16">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-8">
          {/* The trigger sits on the block, not on the clipped lines: a line
              translated outside its overflow-hidden parent never intersects
              the viewport, so it would never fire on its own. */}
          <motion.p
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-14% 0px" }}
            className="max-w-[min(92vw,36rem)] font-display text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink"
          >
            {[line1, line2].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                  className="block"
                >
                  {i === 0 ? (
                    line
                  ) : (
                    <>
                      <span className="font-accent italic">{accent}</span>
                      {rest}
                    </>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.p>

          {/* The five disciplines the sequence just walked through, as a
              baseline rather than a repeat of the service list. */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-14% 0px" }}
            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
            className="caps mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-muted md:mt-11"
          >
            {WHAT_WE_DO_CLOSING.baseline.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden className="block h-px w-4 bg-line-strong" />
                ) : null}
                {word}
              </span>
            ))}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
