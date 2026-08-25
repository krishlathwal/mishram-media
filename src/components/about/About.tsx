"use client";

import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import { ABOUT_COPY, HISTORY } from "@/config/about";
import { ABOUT_PATH } from "@/config/site";
import { ABOUT_CHAPTER } from "@/config/sections";

import { DisciplineSystem } from "./DisciplineSystem";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ABOUT — the agency chapter, and the last substantial storytelling before the
 * footer.
 *
 * Deliberately the calm one. Five chapters of pinned scroll, photography and
 * interaction come before it, so this is typography, space, hairlines and one
 * restrained visual — the visitor finally gets a moment to actually read. No
 * team grid, no mission/vision/values cards, no statistics.
 *
 * **And still no timeline.** `History` below adds three dated moments as a
 * hairline baseline under the story, reusing the tick grammar the service
 * pages already use for process steps. It is a colophon, not a chapter of its
 * own — see the note on that component.
 *
 * Its chapter number is adaptive (see `config/sections.ts`): it was 06 while
 * §06 Recognition self-suppressed and is **07 now that Recognition has a
 * verified item**. Derived, never hardcoded.
 *
 * Every claim traces to something verified — see the source notes at the top of
 * `config/about.ts`. No metrics, no team members, no city.
 */
export function About() {
  const { openContact } = useContact();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />
      <LeadIn />

      <div className="page-x relative pt-20 pb-28 md:pt-28 md:pb-32 lg:pt-32 lg:pb-40">
        {/* ── Chapter label ─────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="caps flex items-baseline gap-3"
        >
          <span className="text-ink-muted">{ABOUT_CHAPTER}</span>
          <span aria-hidden className="text-ink-muted">
            /
          </span>
          <span className="text-ink">{ABOUT_COPY.label}</span>
        </motion.p>

        {/* ── Statement ─────────────────────────────────────────────── */}
        <Headline />

        {/* ── Story + the connecting system ─────────────────────────── */}
        <div className="mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="lg:col-span-5"
          >
            {/* Line length held near 62ch — this is the one place on the page
                with real reading to do. */}
            {ABOUT_COPY.body.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                className={`max-w-[58ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72 ${
                  i > 0 ? "mt-6" : ""
                }`}
              >
                {para}
              </p>
            ))}

            <span aria-hidden className="mt-10 block h-px w-14 bg-accent/60" />

            {/* Verbatim from Mishram's own schema.org description. */}
            <p className="mt-8 max-w-[30ch] font-display text-[clamp(1.15rem,1.7vw,1.6rem)] leading-[1.28] font-medium tracking-[-0.025em] text-ink">
              {ABOUT_COPY.emphasis}
            </p>

            <p className="caps mt-10 flex items-center gap-3 text-ink-muted">
              <span aria-hidden className="block h-px w-4 bg-line-strong" />
              {ABOUT_COPY.locator}
            </p>
          </motion.div>

          <div className="mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:pt-2">
            <DisciplineSystem />
          </div>
        </div>

        {/* ── Where it came from ────────────────────────────────────── */}
        <History />

        {/* The route into the long form. One restrained text action beside the
            history band — the part of this chapter `/about` most obviously
            expands — rather than a third button in a chapter that already
            carries two. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
          className="mt-10"
        >
          <PageLink
            href={ABOUT_PATH}
            className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
          >
            <span className="relative">
              {ABOUT_COPY.storyCta}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
              />
            </span>
            <span aria-hidden className="block h-3 w-3 overflow-hidden">
              <Arrow
                size={12}
                className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4"
              />
            </span>
          </PageLink>
        </motion.div>

        {/* ── Closing conversion moment ─────────────────────────────── */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-14% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          /* One step tighter than it was (was `mt-20 md:mt-24`). The history
             band now closes the chapter body with real structure, so the
             closing rule no longer needs to announce itself across 96px of
             empty column. */
          className="mt-16 block h-px w-full origin-left bg-line md:mt-20"
        />

        <div className="mt-12 flex flex-col gap-10 md:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.p
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="max-w-[min(92vw,31rem)] font-display text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.06] font-medium tracking-[-0.033em] text-ink"
          >
            {ABOUT_COPY.closing.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="lg:text-right"
          >
            {/* A bridge into the form below, not a second booking ask. The
                Hero owns `Book a 15-Min Call`; repeating it here put the page's
                primary CTA directly above a form asking for the same thing.
                Native anchor navigation — no modal, no scripted scroll. */}
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 lg:justify-end">
              <a
                href={ABOUT_COPY.primaryCtaHref}
                className="group inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink"
              >
                <span className="relative">
                  {ABOUT_COPY.primaryCta}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)]"
                  />
                </span>
                <span aria-hidden className="block h-3.5 w-3.5 overflow-hidden">
                  <Arrow
                    size={14}
                    className="rotate-90 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-y-5"
                  />
                </span>
              </a>

              <button
                type="button"
                onClick={openContact}
                className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                <span className="relative">
                  {ABOUT_COPY.secondaryCta}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * THREE DATED MOMENTS, as a baseline under the chapter.
 *
 * **Not a timeline section**, and the distinction is the whole design. §10f
 * rules out a timeline, and it still does: this is one hairline with three
 * moments hanging off it, sitting between the story and the closing rule the
 * way a printed colophon sits under an essay. No axis, no connecting arrows,
 * no cards, no dates-and-dots rail, no scroll behaviour, no interaction.
 *
 * The grammar is **already on this site** — `ServiceProcess` puts four steps on
 * a shared `border-t` with a teal tick marking where each one starts. Reusing
 * it means About gains no new visual language, which is what keeps this a
 * supporting beat rather than a second subject competing with the manifesto.
 *
 * The years need no eyebrow: 2021 · 2023 · 2025 in sequence reads as
 * chronology on sight, and a "Our Story" label would be exactly the template
 * heading §18 rules out.
 *
 * Copy and its provenance live in `HISTORY` in `config/about.ts`.
 */
function History() {
  return (
    // 64px of approach rather than the story block's 80: this block opens on
    // its own hairline, so it needs less room to read as separate.
    //
    // The rule moves between layouts, and that is deliberate. Across three
    // columns one shared `border-t` is the structure every tick sits on. Once
    // the moments stack, that single rule leaves moments 02 and 03 with a teal
    // tick hanging in empty space — visible immediately on a 390px screenshot —
    // so each row takes its own rule instead and the chronology keeps reading
    // as marks on a structure rather than as three floating dashes.
    <ol className="mt-16 grid sm:grid-cols-3 sm:border-t sm:border-line">
      {HISTORY.map((moment, i) => (
        <motion.li
          key={moment.year}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease: EASE }}
          className="relative border-t border-line pt-7 pb-7 sm:border-t-0 sm:pr-8 sm:pb-0"
        >
          {/* The tick on the hairline — where this moment starts, marked on the
              structure itself, exactly as §10j's process rows do it. */}
          <span
            aria-hidden
            className="absolute top-0 left-0 block h-4 w-px bg-accent"
          />
          {/* The year is the chronology, so it carries a step more weight than
              a decorative index would: 10px and `ink-soft` rather than 9px and
              `ink-muted`. It still sits under the name in the hierarchy — the
              band is read by its milestones, dated. */}
          <span className="caps block text-[0.625rem] text-ink-soft">
            {moment.year}
          </span>
          <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(1.05rem,1.45vw,1.3rem)] leading-[1.15] font-medium tracking-[-0.028em] text-ink">
            {moment.name}
          </h3>
          <p className="mt-3 max-w-[32ch] text-[0.8125rem] leading-[1.65] text-ink-soft">
            {moment.detail}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

function Headline() {
  const [line1, line2] = ABOUT_COPY.headline;
  const accent = ABOUT_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <div className="mt-8 md:mt-10">
      {/* Trigger on the heading, not the clipped lines: a line translated
          outside its overflow-hidden parent never intersects the viewport, so
          it would never fire on its own. Variants propagate. */}
      <motion.h2
        id="about-title"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-12% 0px" }}
        className="max-w-[min(92vw,34rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
      >
        {[line1, line2].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.05em]">
            <motion.span
              variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
              className="block"
            >
              {i === 0 ? (
                line
              ) : (
                <>
                  {leadIn}
                  <span className="font-accent italic">{accent}</span>
                </>
              )}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </div>
  );
}

/** The hero's vertical grid continues through this section. */
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

/**
 * The handoff from whatever precedes it — §05 today, §06 once Recognition has
 * content. A single descending trace, no teal tip: after five chapters of
 * signal this one arrives quietly, which is the whole point of the chapter.
 * Belongs entirely to this section, so nothing above it needed changing.
 */
function LeadIn() {
  return (
    <motion.span
      aria-hidden
      className="page-x pointer-events-none absolute inset-x-0 top-0 hidden lg:block"
      initial={{ height: 0 }}
      whileInView={{ height: 58 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="block h-full w-px bg-line-strong" />
    </motion.span>
  );
}
