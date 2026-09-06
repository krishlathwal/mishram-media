"use client";

import { motion } from "motion/react";

import { FEEDBACK_COPY } from "@/config/feedback";
import { BRAND } from "@/config/site";

import { FeedbackForm } from "./FeedbackForm";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * `/feedback` — the private page Mishram sends to people they have worked
 * with.
 *
 * A practical page, like the legal documents: it borrows the site's
 * typography and restraint and none of its theatre. No hero composition, no
 * imagery, no navigation into it from anywhere on the site — it is reached by
 * a link Mishram shares, and answers `noindex`.
 *
 * The same two-column structure as the homepage's Project Inquiry, on
 * purpose: the invitation on the left, the form on its raised panel on the
 * right, the supporting notes under the invitation on a desktop and under the
 * form on a phone. Somebody who has seen the site's brief form recognises this
 * one immediately.
 *
 * The copy makes two things plain before the form starts: that the feedback
 * may be featured on the site, and that sending it does not mean it will be.
 */
export function FeedbackArticle() {
  return (
    // `id="hero"` for the same reason `LegalArticle` carries it: the layout's
    // skip link and the Footer's "Back to top" both target `#hero`.
    <article id="hero" className="relative w-full bg-canvas">
      <div className="page-x relative pt-[calc(var(--header-h)+clamp(40px,7vh,84px))] pb-24 md:pb-28">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="lg:col-span-4 lg:row-start-1"
          >
            <p className="caps flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
              <span className="text-ink/55">
                {BRAND.name} / {FEEDBACK_COPY.eyebrow}
              </span>
            </p>

            <h1 className="mt-7 max-w-[min(92vw,30rem)] font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] font-medium tracking-[-0.036em] text-ink">
              {FEEDBACK_COPY.title}
            </h1>

            <p className="mt-6 max-w-[40ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-ink/80">
              {FEEDBACK_COPY.lead}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="mt-10 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:mt-0 xl:col-span-7 xl:col-start-6"
          >
            <div className="inq-panel">
              <FeedbackForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="mt-12 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-12"
          >
            <p className="caps text-ink-muted">{FEEDBACK_COPY.nextLabel}</p>
            <ol className="mt-4 border-t border-line">
              {FEEDBACK_COPY.next.map((line, i) => (
                <li
                  key={line}
                  className="flex items-baseline gap-4 border-b border-line py-3.5"
                >
                  <span aria-hidden className="caps shrink-0 tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.875rem] leading-[1.6] text-ink-soft">
                    {line}
                  </span>
                </li>
              ))}
            </ol>

            <p className="caps mt-10 text-ink-muted">{FEEDBACK_COPY.directLabel}</p>
            <ul className="mt-4 border-t border-line">
              <li className="border-b border-line">
                <a
                  href={`mailto:${FEEDBACK_COPY.directValue}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="caps shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-accent">
                    Email
                  </span>
                  <span className="relative text-[0.8125rem] text-ink/80 transition-colors duration-300 group-hover:text-ink">
                    {FEEDBACK_COPY.directValue}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
