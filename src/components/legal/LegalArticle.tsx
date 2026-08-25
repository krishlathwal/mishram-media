"use client";

import { motion } from "motion/react";

import { LEGAL_COPY, LEGAL_UPDATED, type LegalDoc } from "@/config/legal";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The shared shell for Privacy, Terms and Cookies.
 *
 * These are **practical pages**, so they borrow the service pages' typography
 * and restraint and none of their theatre: no oversized hero, no composition,
 * no interactive section, no imagery. An eyebrow, a headline, the date it was
 * last true, and a readable column.
 *
 * The measure is capped around 72 characters — the width a long legal
 * paragraph is actually readable at — rather than running the full grid.
 *
 * One `h1` per page and `h2` per section, so the document outline matches the
 * document. The header stays neutral on these routes, which is correct: a legal
 * page is not inside Work, Services, Creators or About.
 */
export function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    // `id="hero"` is load-bearing, not decorative. The layout's skip link and
    // the Footer's "Back to top" both target `TOP_ANCHOR` (`#hero`), which
    // every other route supplies from its opening section — these three had no
    // such element, so both controls resolved to nothing on /privacy, /terms
    // and /cookies. Recorded as a known defect in §10k and fixed here, which is
    // the smaller of the two options that note lists.
    //
    // No `scroll-margin-top` is needed: `section[id]` carries that rule and
    // this is an <article>, but it is also the first thing in <main>, so the
    // anchor lands at the top of the document — which is what "back to top"
    // means — and the padding below already clears the fixed header.
    <article id="hero" className="relative w-full bg-canvas">
      <div className="page-x relative pt-[calc(var(--header-h)+clamp(40px,7vh,84px))] pb-24 md:pb-28">
        <div className="mx-auto max-w-[46rem] lg:mx-0 lg:ml-[8.333%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="caps flex items-center gap-3"
          >
            <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
            <span className="text-ink/55">
              {LEGAL_COPY.sectionLabel} / {doc.index}
            </span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
            className="mt-7 font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.036em] text-ink"
          >
            {doc.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: EASE }}
          >
            <p className="mt-7 max-w-[58ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-ink/72">
              {doc.lead}
            </p>
            <p className="caps mt-8 text-ink-muted">
              {LEGAL_COPY.updatedLabel} — {LEGAL_UPDATED}
            </p>
          </motion.div>

          <div className="mt-14 border-t border-line md:mt-16">
            {doc.sections.map((section, i) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6% 0px" }}
                transition={{ duration: 0.6, delay: 0.04, ease: EASE }}
                className="border-b border-line py-10 md:py-12"
              >
                <div className="flex items-baseline gap-4">
                  <span aria-hidden className="caps shrink-0 text-[0.5625rem] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[clamp(1.15rem,1.9vw,1.55rem)] leading-[1.2] font-medium tracking-[-0.03em] text-ink">
                    {section.heading}
                  </h2>
                </div>

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-5 max-w-[72ch] text-[0.9375rem] leading-[1.8] text-ink/72 md:pl-[calc(0.5625rem+1rem)]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-7 border-t border-line md:ml-[calc(0.5625rem+1rem)]">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex max-w-[68ch] items-baseline gap-3 border-b border-line py-3.5 text-[0.875rem] leading-[1.65] text-ink/70"
                      >
                        <span aria-hidden className="mt-[0.45em] block h-px w-3 shrink-0 bg-line-strong" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
