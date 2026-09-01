"use client";

import { motion } from "motion/react";

import { PROOF_COPY, PUBLIC_PROOF } from "@/config/proof";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * THE QUICK-SCAN PROOF INDEX — scale, in one screen, without a dashboard.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY IT EXISTS, AND WHERE IT SITS
 *
 * The page had strong proof and made a visitor scroll for all of it. Brands
 * are recognisable in the first screen and the management relationship in the
 * second, but *how much work there is behind them* took six chapters to
 * arrive at. This band answers that in the third screen:
 *
 *   Hero → Brands → Current Management → **this** → What We Do
 *
 * recognition → relationship → scale → capability. Current Management keeps
 * its position above it deliberately: a real relationship outranks a number,
 * and putting the figures first would have made the numbers the argument.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * **AN EDITORIAL INDEX, AND EVERY OBVIOUS ALTERNATIVE IS REFUSED.** No KPI
 * cards, no stat tiles, no bordered boxes, no icons, no circles, no rings, no
 * animated count-up, no chart, no axis, no sparkline, no percentage and no
 * comparison. Four facts, hairlines, display numerals and small caps labels —
 * the grammar §10t §7 already used for two facts, carrying four.
 *
 * **THE HIERARCHY IS TYPOGRAPHIC, NOT DECORATIVE.** The reach fact leads at
 * roughly double the scale of the three operating facts beside it, because one
 * Reel's reach and the shape of the business are different kinds of statement
 * and flattening them into four equal cells would say they are not. Nothing is
 * coloured, boxed or marked to achieve that — only sized.
 *
 * **EVERY LABEL CARRIES ITS CLAIM'S SCOPE.** *Views on a single Reel*, not
 * "views". *Brands worked with*, not "clients". *Creator-led videos*, not
 * "campaigns". The label is the part that stops a figure drifting into a
 * bigger claim than the evidence supports, and the register those labels come
 * from is `config/proof.ts` — **nothing here is written in JSX.**
 *
 * Unnumbered, like the other interludes, so §02, §03 and `ABOUT_CHAPTER` keep
 * their numbering.
 */
export function QuickProof() {
  if (PUBLIC_PROOF.length === 0) return null;

  const [lead, ...rest] = PUBLIC_PROOF;

  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />

      {/* Deliberately tighter than a chapter's padding. This is a band, not a
          section with a story — it has to be crossed quickly, which is the
          whole point of it. */}
      <div className="page-x relative py-12 sm:py-14 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2"
        >
          <h2 id="proof-title" className="caps flex items-center gap-3 text-ink">
            <span aria-hidden className="block h-px w-5 shrink-0 bg-accent" />
            {PROOF_COPY.label}
          </h2>
          <p className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft">
            {PROOF_COPY.note}
          </p>
        </motion.div>

        <dl className="qp-index mt-9 border-t border-line pt-9 md:mt-11 md:pt-11">
          {/* The reach fact, at display scale. `dl` wants dt/dd pairs, so the
              value is the `dd` and the scope line is the `dt` — reversed
              visually with `flex-col-reverse` rather than in the DOM, so a
              screen reader still hears the label before the figure. */}
          <div className="qp-lead">
            <Fact fact={lead} lead />
          </div>

          {/* The three operating facts. Rows on a phone, a three-column
              sub-grid from `sm` — never four microscopic columns. */}
          <div className="qp-rest">
            {rest.map((fact, i) => (
              <Fact key={fact.id} fact={fact} delay={0.08 + i * 0.06} />
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}

/**
 * One fact. The figure is the sentence, so it takes display type and the scope
 * sits under it in the site's own small caps — the treatment §10t §7 settled
 * on and the reason it is not a card.
 */
function Fact({
  fact,
  lead = false,
  delay = 0,
}: {
  fact: (typeof PUBLIC_PROOF)[number];
  lead?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className="qp-fact flex flex-col-reverse"
    >
      <dt className={`caps mt-3.5 ${lead ? "text-ink-soft" : "text-ink-muted"}`}>
        {fact.label}
      </dt>
      <dd
        className={
          lead
            ? "font-display text-[clamp(3rem,6.6vw,5.4rem)] leading-[0.9] font-medium tracking-[-0.045em] text-ink"
            : "font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[0.95] font-medium tracking-[-0.038em] text-ink"
        }
      >
        {fact.value}
      </dd>
    </motion.div>
  );
}

/** The hero's vertical grid continues through this band. */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}
