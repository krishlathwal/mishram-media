"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";
import { ROSTER, resolveFrame } from "@/config/creators";

import { AboutSection, AboutSectionHead, EASE } from "./AboutSection";

/**
 * THE ORIGIN — the chronology and what starting there taught the company, as
 * one chapter with three movements.
 *
 * **Merged on purpose.** The brief's own guidance is that origin and
 * creator-native belong together, and it is right: told apart, the chronology
 * is trivia and the creator argument has no evidence under it. Here the dates
 * establish the fact, the consequences say what the fact means, and the
 * portraits show who it was with.
 *
 * **The chronology is an archive index, not a timeline.** No axis, no
 * connecting arrows, no dots-on-a-rail, no cards. A large year on the left, the
 * milestone and its sentences on the right, one hairline per chapter — the way
 * a dated entry sits in a printed record. The homepage's `History` band is the
 * three-line summary of exactly this; giving it room is the whole reason a
 * dedicated page exists.
 *
 * **Every date and milestone is verbatim-traceable** to Mishram's own
 * `about.html` — see the source note in `config/about-page.ts`.
 */
export function AboutOrigin() {
  const copy = ABOUT_PAGE_COPY.origin;

  return (
    <AboutSection id="origin" labelledBy="origin-title" grid="edges">
      <AboutSectionHead
        id="origin-title"
        label={copy.label}
        headline={copy.headline}
        accentWord={copy.accentWord}
        lead={copy.lead}
      />

      {/* Verbatim from Mishram's own schema.org description. */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
        className="mt-10 max-w-[34ch] font-display text-[clamp(1.15rem,1.75vw,1.65rem)] leading-[1.28] font-medium tracking-[-0.026em] text-ink md:mt-14"
      >
        {copy.emphasis}
      </motion.p>

      {/* ── The dated chapters ─────────────────────────────────── */}
      <ol className="mt-14 md:mt-16">
        {copy.chapters.map((chapter, i) => (
          <motion.li
            key={chapter.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: 0.06 + i * 0.08, ease: EASE }}
            className="relative border-t border-line py-8 md:py-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 block h-5 w-px bg-accent"
            />

            {/* The year at archive scale — the thing you scan for. */}
            <p className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-none font-medium tracking-[-0.04em] text-ink-muted lg:col-span-3">
              {chapter.year}
            </p>

            <div className="mt-6 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <h3 className="font-display text-[clamp(1.2rem,1.9vw,1.6rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink">
                {chapter.name}
              </h3>
              <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-ink/72">
                {chapter.summary}
              </p>
              <p className="mt-4 max-w-[56ch] text-[0.875rem] leading-[1.75] text-ink-soft">
                {chapter.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* ── What starting there taught us ───────────────────────── */}
      <div className="mt-16 border-t border-line pt-12 md:mt-20 md:pt-14">
        <motion.h3
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,26rem)] font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.06] font-medium tracking-[-0.033em] text-ink"
        >
          {copy.consequence.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, delay: 0.06 + i * 0.08, ease: EASE }}
                className="block"
              >
                {i === 1 ? (
                  <span className="font-accent italic">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        <ul className="mt-12 grid gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-8">
          {copy.consequence.points.map((point, i) => (
            <motion.li
              key={point.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease: EASE }}
              className="relative border-t border-line pt-7 md:pr-6"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 block h-4 w-px bg-accent"
              />
              <h4 className="max-w-[22ch] font-display text-[1.0625rem] leading-[1.2] font-medium tracking-[-0.026em] text-ink">
                {point.name}
              </h4>
              <p className="mt-3.5 max-w-[38ch] text-[0.875rem] leading-[1.7] text-ink-soft">
                {point.note}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ── The people it was with ──────────────────────────────── */}
      <CreatorStrip />
    </AboutSection>
  );
}

/**
 * An editorial portrait sequence, **not** the homepage's talent index.
 *
 * §03 is a selectable directory with a cascading stage; Service 01's field is
 * five equal 3:4 frames; Service 02's casting wall is one strip at a single
 * height. This is a **stagger** — alternating frame heights on one baseline, so
 * it reads as prints laid out rather than as a roster. Nothing is selectable.
 *
 * **What is claimed:** these are creators Mishram Media has worked with — the
 * exact claim the homepage makes about the same portraits, and the caption says
 * so on the page. No campaign, result or endorsement is implied.
 */
function CreatorStrip() {
  const copy = ABOUT_PAGE_COPY.origin;
  // Four, not all five: the strip is evidence for an argument, and a fifth
  // frame turns it back into the roster §03 already owns.
  const creators = ROSTER.slice(0, 4);

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-line pt-7">
        <p className="caps text-ink-muted">{copy.creatorsLabel}</p>
        <a
          href={copy.creatorsCtaHref}
          className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
        >
          <span className="relative">
            {copy.creatorsCta}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
            />
          </span>
          <span aria-hidden>↗</span>
        </a>
      </div>

      <ul className="abt-strip mt-10">
        {creators.map((creator, i) => {
          const frame = resolveFrame(creator, "portrait");
          return (
            <motion.li
              key={creator.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: 0.06 + i * 0.08, ease: EASE }}
              // Alternating heights are what make this a stagger rather than a
              // grid — set in CSS so the pattern survives any column count.
              className="abt-strip-item"
              data-tall={i % 2 === 0 ? "true" : "false"}
            >
              <span className="abt-frame block">
                <span
                  className="abt-crop"
                  style={{
                    ["--crt-zoom" as string]: String(frame.zoom),
                    ["--crt-origin" as string]: frame.origin,
                  }}
                >
                  <Image
                    src={frame.src}
                    alt={creator.alt}
                    fill
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 22vw"
                    style={{ objectPosition: frame.position }}
                    className="abt-photo object-cover"
                  />
                </span>
              </span>
              <span className="caps mt-3.5 block text-ink-soft">
                {creator.name}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <p className="caps mt-8 max-w-[52ch] text-[0.5625rem] leading-[1.7] text-ink-muted">
        {copy.creatorsNote}
      </p>
    </div>
  );
}
