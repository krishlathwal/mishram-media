"use client";

import { motion } from "motion/react";

import { DISCIPLINES } from "@/config/about";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The connecting idea, as the section's visual anchor.
 *
 * The hero's eyebrow reads `CREATIVE × PERFORMANCE × TECHNOLOGY`. Five chapters
 * later the site has demonstrated a fourth dimension, so this is that equation
 * with `CREATORS` written into it — one teal hairline threading four
 * disciplines, each with a rule reaching out to its caption.
 *
 * Typographic rather than an infographic on purpose: no cards, no icons, no
 * four-feature grid. This is the page's calm chapter, and after five media-heavy
 * sections the restraint is the point. It is also honest — there is no agency or
 * behind-the-scenes photography in the project, and borrowing a creator portrait
 * here would read as a team photo.
 *
 * The disciplines are a real `<ul>` with real text, so the section never depends
 * on decorative graphics to be understood.
 */
export function DisciplineSystem() {
  return (
    <div className="relative">
      {/* The thread. Grows downward on entry, connecting all four. */}
      <motion.span
        aria-hidden
        className="absolute top-[0.55rem] bottom-[0.9rem] left-[3px] w-px origin-top bg-accent/45"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
      />

      <ul className="flex flex-col">
        {DISCIPLINES.map((d, i) => (
          <li key={d.name}>
            <motion.div
              // Inline with its rule only from xl up. Below that the caption is
              // wider than the column it sits in — at 1024 and 390 the inline
              // row overflowed the page — so name and caption stack instead and
              // the rule drops out.
              className="relative flex flex-col gap-1.5 pl-7 xl:flex-row xl:items-baseline xl:gap-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{
                duration: 0.7,
                delay: 0.28 + i * 0.11,
                ease: EASE,
              }}
            >
              {/* Node on the thread. */}
              <span
                aria-hidden
                className="absolute top-[0.5rem] left-0 block h-[7px] w-[7px] rounded-full bg-accent"
              />

              <span className="font-display text-[clamp(1.1rem,1.7vw,1.6rem)] leading-none font-medium tracking-[-0.025em] text-ink">
                {d.name}
              </span>

              {/* The rule reaching out to the caption. Lengths vary with the
                  label, which is what keeps this from looking like a table. */}
              <span
                aria-hidden
                className="mb-[0.35em] hidden h-px flex-1 bg-line-strong xl:block"
              />

              <span className="caps text-ink-muted xl:shrink-0">{d.note}</span>
            </motion.div>

            {/* The multiplication between disciplines — the hero's own glyph. */}
            {i < DISCIPLINES.length - 1 ? (
              <motion.span
                aria-hidden
                // Sits just clear of the thread rather than on top of it —
                // centred on the line, the glyph disappeared into it.
                className="block py-[0.9rem] pl-[0.85rem] text-[0.8rem] leading-none text-accent/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.36 + i * 0.11,
                  ease: EASE,
                }}
              >
                ×
              </motion.span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
