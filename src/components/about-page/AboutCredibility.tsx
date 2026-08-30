"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";
import { FEATURED_COLLABORATIONS } from "@/config/collaborations";
import { RECOGNITION_ITEMS } from "@/config/recognition";

import { AboutSection, AboutSectionHead, EASE } from "./AboutSection";

/**
 * ON THE RECORD — recognition and collaborations, as one credibility chapter.
 *
 * **Merged deliberately.** Both are short, both are evidence, and neither is
 * the subject of this page. Two separate chapters would give a single award and
 * five logos more structural weight than the story they exist to support.
 *
 * **Neither half duplicates its homepage counterpart:**
 *
 * - §06 Recognition is a photographic archive with the frame at seven columns
 *   and a museum label beside it. Here the same photograph is **small** — a
 *   record inside a paragraph of the company's story, not the chapter's
 *   subject. No trophy treatment, no gold, no badge chrome (§10p, §10q).
 * - §01 Collaborations is a continuous marquee that pauses on hover. Here the
 *   same five brands are a **static index** — numbered rows with the mark
 *   beside the name. Same brands, same config, completely different
 *   composition, and nothing moves.
 *
 * **Content integrity.** The award says only what its own photograph supports:
 * `NUFEW` is never expanded, nobody in the frame is named, and no rank, scale
 * or jurisdiction is claimed. The brands are described as *worked with* — the
 * old site's own wording — never as clients, partners or "trusted by". §9
 * excluded categories are absent from `collaborations.ts` entirely, so none can
 * reach this DOM in any state.
 */
export function AboutCredibility() {
  const copy = ABOUT_PAGE_COPY.credibility;
  const award = RECOGNITION_ITEMS[0];

  return (
    <AboutSection id="on-the-record" labelledBy="record-title" grid="none">
      <AboutSectionHead
        id="record-title"
        label={copy.label}
        headline={copy.headline}
        accentWord={copy.accentWord}
        lead={copy.lead}
      />

      <div className="mt-14 md:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8">
        {/* ── Recognition, at record scale ─────────────────────── */}
        {award ? (
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="caps border-t border-line pt-7 text-ink-muted">
              {copy.recognitionLabel}
            </p>

            <span
              className="abt-frame mt-8 block"
              style={{ aspectRatio: award.aspect ?? "4 / 3" }}
            >
              <Image
                src={award.image}
                alt={award.alt}
                fill
                sizes="(max-width: 1023px) 92vw, 38vw"
                className="abt-photo object-cover"
              />
            </span>

            <figcaption className="mt-6">
              <span className="block font-display text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.2] font-medium tracking-[-0.026em] text-ink">
                {award.title}
              </span>
              <span className="caps mt-3 block text-ink-muted">
                {[award.organisation, award.year].filter(Boolean).join(" · ")}
              </span>
              <span className="mt-4 block max-w-[40ch] text-[0.875rem] leading-[1.7] text-ink-soft">
                {copy.recognitionNote}
              </span>
            </figcaption>
          </motion.figure>
        ) : null}

        {/* ── The connections index ────────────────────────────── */}
        <div className="mt-20 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <p className="caps border-t border-line pt-7 text-ink-muted">
            {copy.connectionsLabel}
          </p>

          <ul className="mt-8">
            {FEATURED_COLLABORATIONS.map((brand, i) => (
              <motion.li
                key={brand.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.08 + i * 0.07,
                  ease: EASE,
                }}
                className="abt-brand-row"
              >
                <span className="caps w-8 shrink-0 text-[0.5625rem] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-[clamp(1.05rem,1.6vw,1.35rem)] leading-none font-medium tracking-[-0.028em] text-ink">
                  {brand.name}
                </span>
                {/* The alpha mask tinted with the theme's ink — the same asset
                    and the same treatment §01 uses at rest, held static. */}
                <span
                  aria-hidden
                  className="abt-brand-mark"
                  style={{
                    ["--abt-mark" as string]: `url(${brand.logo})`,
                    ["--abt-mark-scale" as string]: String(brand.scale ?? 1),
                    ["--abt-mark-ar" as string]: String(
                      brand.size.w / brand.size.h,
                    ),
                  }}
                />
              </motion.li>
            ))}
          </ul>

          <p className="caps mt-8 max-w-[46ch] text-[0.5625rem] leading-[1.7] text-ink-muted">
            {copy.connectionsNote}
          </p>
        </div>
      </div>
    </AboutSection>
  );
}
