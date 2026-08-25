"use client";

import { motion } from "motion/react";

import type { ServiceSectionCopy } from "@/config/service-pages";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * THE CALM BEAT after a service page's hero.
 *
 * One position, argued in two short paragraphs, resolving into three words on a
 * hairline. Deliberately the quietest section on the page — the hero has just
 * been loud and the interactive section is next, so this is where a visitor is
 * allowed to simply read.
 *
 * The grid steps back to its outer columns here, which is the page's first
 * rhythm change and the same move the homepage's Mishram Difference makes.
 * **Not an essay** — if this block needs a third paragraph, the argument is
 * wrong rather than short.
 */
export function ServiceStatement({
  id,
  copy,
  body,
  baseline,
}: {
  id: string;
  copy: ServiceSectionCopy;
  body: readonly string[];
  /** Three or four words the section resolves into. */
  baseline: readonly string[];
}) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={copy}
          lead="below"
          className="lg:col-span-7"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
          className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end"
        >
          {body.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 24)}
              className={`max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] ${
                i === 0 ? "text-ink/75" : "mt-6 text-ink-soft"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* The section resolving into its own terms, on a hairline — the same
          closing grammar §02 ends on, at a smaller scale. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
        className="mt-16 border-t border-line pt-6 md:mt-20"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {baseline.map((word, i) => (
            <li key={word} className="flex items-center gap-6">
              {i > 0 ? (
                <span aria-hidden className="block h-3 w-px bg-line-strong" />
              ) : null}
              <span className="font-display text-[clamp(1.05rem,1.8vw,1.5rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                {word}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </ServiceSection>
  );
}
