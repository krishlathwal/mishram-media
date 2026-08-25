"use client";

import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";

import { AboutSection, AboutSectionHead, EASE } from "./AboutSection";

/**
 * HOW WE THINK — four operating positions.
 *
 * **Not mission, vision and values.** Every one of these says something that
 * could be disagreed with, which is the test: "culture before format" rules out
 * starting from a deliverable, and "creative and distribution together" rules
 * out briefing them separately. **Excellence, Innovation, Integrity and Passion
 * fail that test by design and are not here** — a principle nobody could argue
 * with is decoration.
 *
 * Composition is a numbered editorial list, quieter than the service index
 * above it: the numerals recede and the sentences carry the weight, because
 * this is the one chapter with nothing to show and everything to say.
 */
export function AboutPrinciples() {
  const copy = ABOUT_PAGE_COPY.principles;

  return (
    <AboutSection id="principles" labelledBy="principles-title" grid="edges">
      <AboutSectionHead
        id="principles-title"
        label={copy.label}
        headline={copy.headline}
        accentWord={copy.accentWord}
        lead={copy.lead}
      />

      <ol className="mt-14 grid gap-x-8 gap-y-10 md:mt-16 md:grid-cols-2 md:gap-y-12">
        {copy.items.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, delay: 0.06 + i * 0.09, ease: EASE }}
            className="relative border-t border-line pt-8"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 block h-4 w-px bg-accent"
            />
            <p className="caps text-[0.5625rem] text-ink-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 max-w-[20ch] font-display text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.14] font-medium tracking-[-0.03em] text-ink">
              {item.name}
            </h3>
            <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.72] text-ink/72">
              {item.note}
            </p>
          </motion.li>
        ))}
      </ol>
    </AboutSection>
  );
}
