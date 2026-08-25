"use client";

import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";

import { ArchiveBoard } from "./ArchiveBoard";
import { EASE } from "./AboutSection";

/**
 * The About hero. Calmer than any service hero by design: no CTA pair, no
 * booking ask, no interactive composition — a title, a sentence, and the
 * archive beside it.
 *
 * **`id="hero"`**, like every other route's opening section, so the layout's
 * skip link and the Footer's back-to-top resolve here (§10k, §10q).
 *
 * **No `Book a 15-Min Call`.** The service pages open with one because a
 * visitor can land on them cold looking to buy. This page is read by someone
 * deciding whether to take Mishram seriously, and the ask belongs at the foot
 * where the shared inquiry form already is.
 */
export function AboutHero() {
  const copy = ABOUT_PAGE_COPY.hero;
  const [line1, line2] = copy.headline;
  const accentAt = line2.indexOf(copy.accentWord);
  const leadIn = accentAt === -1 ? line2 : line2.slice(0, accentAt);

  return (
    <section
      id="hero"
      aria-label={`About ${copy.eyebrow[1]}`}
      className="grain relative isolate w-full overflow-hidden border-b border-line bg-canvas"
    >
      <div className="page-x relative pt-[calc(var(--header-h)+clamp(56px,9vh,104px))] pb-20 md:pb-24 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* ── Copy ─────────────────────────────────────────────── */}
          <div className="lg:col-span-6 lg:pt-6">
            {/* An archive label, not a breadcrumb — About has no parent route,
                and a crumb that leads nowhere is worse than none. */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="caps flex items-center gap-3 text-ink-muted"
            >
              <span aria-hidden className="block h-px w-6 bg-accent" />
              {copy.eyebrow[0]}
              <span aria-hidden className="text-ink-muted/60">
                /
              </span>
              {copy.eyebrow[1]}
            </motion.p>

            <motion.h1
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true }}
              className="mt-9 max-w-[min(92vw,17ch)] font-display text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.0] font-medium tracking-[-0.038em] text-ink"
            >
              {[line1, line2].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                    transition={{
                      duration: 1,
                      delay: 0.08 + i * 0.09,
                      ease: EASE,
                    }}
                    className="block"
                  >
                    {i === 0 ? (
                      line
                    ) : (
                      <>
                        {leadIn}
                        <span className="font-accent italic">
                          {copy.accentWord}
                        </span>
                      </>
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="mt-9 max-w-[54ch] text-[clamp(0.9375rem,1.1vw,1.125rem)] leading-[1.7] text-ink/72"
            >
              {copy.lead}
            </motion.p>
          </div>

          {/* ── The archive ──────────────────────────────────────── */}
          <div className="mt-16 lg:col-span-6 lg:mt-0">
            <ArchiveBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
