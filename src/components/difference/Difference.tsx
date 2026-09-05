"use client";

import { motion } from "motion/react";

import { DIFFERENCE_COPY, DIFFERENTIATORS } from "@/config/difference";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * THE MISHRAM DIFFERENCE — the interlude between 02 / What We Do and
 * 03 / Creators, rebuilt in Revision 42 as a contrast table.
 *
 * **Deliberately not a numbered chapter.** §02 has just finished saying what
 * Mishram does; this answers why a brand would take all of it from one partner
 * instead of assembling it from an agency, two freelancers and a dev shop. It
 * carries no index, so nothing after it renumbers, and it has **no top border**
 * — a chapter rule would announce a new section when the point is that this is
 * a continuation.
 *
 * The client asked for it to be "simpler and clean": no axis, no evidence
 * fragments, no selection model, nothing to operate. Four rows on hairlines —
 * the usual setup in the muted register, the Mishram way in full ink — and the
 * page's twelve-column grid quietened to its outer columns exactly as before,
 * so the rows read as the structure in a clean field. Shorter than the stack
 * it replaces, which was the other half of the instruction.
 *
 * Weight: no WebGL, no canvas, no scroll track, no imagery at all.
 */
export function Difference() {
  return (
    <section
      id="difference"
      aria-labelledby="difference-title"
      className="relative w-full bg-canvas"
    >
      <Grid />

      <div className="page-x relative pt-14 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:pt-22 lg:pb-22">
        <div className="flex flex-col gap-x-16 gap-y-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="caps flex items-center gap-3"
            >
              {/* A short teal rule instead of a chapter number — this is an
                  interlude, and numbering it would claim a slot in a sequence
                  that is already correct. */}
              <span aria-hidden className="block h-px w-6 bg-accent/70" />
              <span className="text-ink">{DIFFERENCE_COPY.label}</span>
            </motion.p>

            <Headline />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="max-w-[42ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[36ch] lg:pb-2"
          >
            {DIFFERENCE_COPY.lead}
          </motion.p>
        </div>

        <Contrast />
      </div>
    </section>
  );
}

function Headline() {
  const [line1, line2] = DIFFERENCE_COPY.headline;
  const accent = DIFFERENCE_COPY.accentWord;
  const rest = line1.slice(accent.length);

  return (
    // The trigger sits on the heading, not on the clipped lines: a line
    // translated outside its overflow-hidden parent never intersects the
    // viewport, so it would never fire on its own. Variants propagate.
    <motion.h2
      id="difference-title"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px" }}
      className="mt-8 max-w-[min(92vw,32rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink md:mt-9"
    >
      {[line1, line2].map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
            className="block"
          >
            {i === 0 ? (
              <>
                <span className="font-accent italic">{accent}</span>
                {rest}
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/**
 * The contrast. A `dl` per row: the term is the differentiator, the two
 * definitions are the usual setup and the Mishram way — so a screen reader
 * hears "Creator-native: the usual setup … with Mishram …" in that order.
 *
 * Three columns from `md`, stacked below it with the two column heads
 * repeated inline as small labels, because a phone has no header row to look
 * up to.
 */
function Contrast() {
  const { usual, mishram } = DIFFERENCE_COPY.columns;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      className="mt-10 md:mt-12"
    >
      {/* Column heads, wide only. */}
      <div className="hidden border-b border-line pb-4 md:grid md:grid-cols-12 md:gap-x-8">
        <span className="caps text-ink-muted md:col-span-3" aria-hidden>
          &nbsp;
        </span>
        <span className="caps text-ink-muted md:col-span-4">{usual}</span>
        <span className="caps flex items-center gap-3 text-ink md:col-span-5">
          <span aria-hidden className="block h-px w-4 bg-accent" />
          {mishram}
        </span>
      </div>

      <div className="border-t border-line md:border-t-0">
        {DIFFERENTIATORS.map((d, i) => (
          <motion.dl
            key={d.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: EASE }}
            className="grid gap-y-4 border-b border-line py-6 md:grid-cols-12 md:gap-x-8 md:py-7"
          >
            <dt className="flex items-baseline gap-4 md:col-span-3">
              <span className="caps w-6 shrink-0 text-accent">{d.index}</span>
              <span className="font-display text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.15] font-medium tracking-[-0.025em] text-ink">
                {d.name}
              </span>
            </dt>

            <dd className="pl-10 md:col-span-4 md:pl-0">
              <span className="caps mb-2 block text-ink-muted md:hidden">{usual}</span>
              <p className="max-w-[40ch] text-[0.875rem] leading-[1.65] text-ink-muted">
                {d.usual}
              </p>
            </dd>

            <dd className="pl-10 md:col-span-5 md:pl-0">
              <span className="caps mb-2 flex items-center gap-3 text-ink md:hidden">
                <span aria-hidden className="block h-px w-4 bg-accent" />
                {mishram}
              </span>
              <p className="max-w-[44ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.62] text-ink/85">
                {d.mishram}
              </p>
            </dd>
          </motion.dl>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * The page grid, locally quietened. The outer columns survive so the section
 * still belongs to the page; the centre is cleared so the contrast reads as the
 * structure instead of competing with twelve hairlines behind it.
 */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="dif-grid grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}
