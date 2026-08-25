"use client";

import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";

import { AboutSection, AboutSectionHead, EASE } from "./AboutSection";

/**
 * ONE PRACTICE, FOUR DISCIPLINES.
 *
 * **Deliberately not the homepage's Mishram Difference, and not its
 * `DisciplineSystem` either.** The interlude argues *fewer handoffs* — an
 * operating claim aimed at a brand comparing suppliers. `DisciplineSystem` is
 * the hero's equation with `CREATORS` written into it, and it states what each
 * discipline *delivers*. This section answers the only question a company
 * profile should ask of the same four words: **what does holding them together
 * do to the company?** So each row carries a `shapes` sentence that exists
 * nowhere else on the site.
 *
 * The drawing is four columns converging on one mark. Four separate practices
 * resolving into a single name is the literal shape of the argument, and it is
 * the one thing on this page that is a diagram — which is why it stays small,
 * static and unlabelled beyond the four names.
 */
export function AboutDisciplines() {
  const copy = ABOUT_PAGE_COPY.disciplines;

  return (
    <AboutSection id="disciplines" labelledBy="disciplines-title" grid="none">
      <AboutSectionHead
        id="disciplines-title"
        label={copy.label}
        headline={copy.headline}
        accentWord={copy.accentWord}
        lead={copy.lead}
      />

      <div className="mt-14 md:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* ── The convergence ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start"
          aria-hidden
        >
          <Convergence label={copy.convergence} />
        </motion.div>

        {/* ── The four rows ────────────────────────────────────── */}
        <ul className="mt-14 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {copy.items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.75, delay: 0.06 + i * 0.08, ease: EASE }}
              className="relative border-t border-line py-7 last:border-b md:py-9"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 block h-4 w-px bg-accent"
              />
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <h3 className="font-display text-[clamp(1.3rem,2.1vw,1.75rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                  {item.name}
                </h3>
                <p className="caps text-ink-muted">{item.note}</p>
              </div>
              <p className="mt-5 max-w-[54ch] text-[0.9375rem] leading-[1.72] text-ink/72">
                {item.shapes}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </AboutSection>
  );
}

/**
 * Four lines entering at the top, bending inward, resolving into one mark.
 *
 * A fixed `viewBox` matched to a fixed-aspect box, so no stroke can shear and a
 * collision checked once is checked everywhere. Nothing here is animated on a
 * loop — the page is an archive, and a travelling signal would borrow Service
 * 03's language.
 */
function Convergence({ label }: { label: string }) {
  return (
    <div className="abt-converge">
      <svg viewBox="0 0 120 150" className="block h-auto w-full" role="presentation">
        {/* Four strands, evenly spaced, converging on a single trunk. */}
        {[10, 43, 77, 110].map((x, i) => (
          <path
            key={x}
            d={`M${x} 4 L${x} ${46 + i * 4} C ${x} ${84 + i * 3}, 60 ${88 + i * 3}, 60 108`}
            className="abt-strand"
            style={{ ["--abt-strand-i" as string]: String(i) }}
          />
        ))}
        {/* The trunk, and the point they resolve at. */}
        <path d="M60 108 L60 128" className="abt-trunk" />
        <circle cx="60" cy="108" r="3.2" className="abt-node" />
      </svg>
      <p className="caps mt-5 text-center text-ink-soft">{label}</p>
    </div>
  );
}
