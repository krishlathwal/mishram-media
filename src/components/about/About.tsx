"use client";

import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import { ABOUT_COPY } from "@/config/about";
import { ABOUT_PATH } from "@/config/site";
import { ABOUT_CHAPTER } from "@/config/sections";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ABOUT — a preview of the chapter, and the bridge into the form.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * **SHORTENED TO A PREVIEW — Revision 16. 1,468px → ~740px.**
 *
 * This was the page's last long storytelling chapter: two paragraphs, a
 * verbatim emphasis line, the `INDIA` locator, the four-discipline system
 * drawing and the 2021 / 2023 / 2025 history band. All of it was written
 * before `/about` existed. Once it did (§10r), the homepage was telling the
 * company's story twice — the shorter version immediately above a form, and
 * the full one a click away.
 *
 * So the chapter keeps its headline and gives up its body: one sentence of
 * positioning, one sentence of provenance, `Read our story ↗`, and then the
 * closing conversion moment it always ended on. **Nothing was deleted from the
 * site.** The discipline system, the emphasis line, the locator and the full
 * chronology are all on `/about`; the second paragraph's argument is what the
 * Mishram Difference interlude already makes on this page.
 *
 * **Do not rebuild the long version here.** If this chapter needs to say more,
 * that is a signal `/about` is not doing its job.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Still the calm one, and now emphatically so — typography, space and
 * hairlines, no visual at all. No team grid, no mission/vision/values cards,
 * no statistics, no timeline.
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

      {/* One step tighter than the chapter used to run, top and bottom. A
          preview does not need the approach a five-block chapter did, and the
          §10i boundary rhythm still reads because the sections either side are
          untouched. */}
      <div className="page-x relative pt-16 pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
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

        {/* ── The preview: positioning, provenance, and the way in ────
            Two columns rather than a stack, because the whole point of the
            block is that it is short — set one under the other, the same
            three sentences read as the start of a chapter that then stops. */}
        <div className="mt-10 md:mt-12 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="max-w-[62ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72 lg:col-span-6"
          >
            {ABOUT_COPY.body[0]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
            className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0"
          >
            {/* The chronology, compressed to the two dates that carry it. The
                dated band this replaces is on `/about`, with the room to say
                what starting there taught the practice. */}
            <p className="max-w-[60ch] text-[0.8125rem] leading-[1.7] text-ink-soft">
              <span aria-hidden className="mr-3 inline-block h-px w-4 align-middle bg-accent/60" />
              {ABOUT_COPY.historyPreview}
            </p>

            {/* The route into the long form. A text action, not a third
                button — this chapter already carries two below. */}
            <div className="mt-6">
              <PageLink
                href={ABOUT_PATH}
                className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink transition-colors duration-300"
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
            </div>
          </motion.div>
        </div>

        {/* ── Closing conversion moment ─────────────────────────────── */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-14% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          /* Tightened twice: once when the history band gave the chapter body
             its own structure, and again when the body became a preview. The
             rule's job is to separate the story from the ask, and across three
             sentences it does that without a runway. */
          className="mt-10 block h-px w-full origin-left bg-line md:mt-12"
        />

        <div className="mt-10 flex flex-col gap-10 md:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
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
