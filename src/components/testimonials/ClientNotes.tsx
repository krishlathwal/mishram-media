"use client";

import { motion } from "motion/react";

import { CLIENT_NOTES_COPY, TESTIMONIALS } from "@/config/testimonials";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { QuoteIndex } from "./QuoteIndex";
import { QuoteStage } from "./QuoteStage";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The quote needs a genuinely wide field beside a narrow index. Below this — or
 * on a portrait tablet however wide — it stacks. Shape first, device
 * classification second, and the same query §04, §05 and the Difference
 * interlude use.
 */
const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/**
 * CLIENT NOTES — the human proof between 05 / Selected Work and Recognition.
 *
 * **Currently renders nothing.** `TESTIMONIALS` is empty because not one of the
 * testimonials in the old Mishram Media site survives verification — placeholder
 * avatars from `i.pravatar.cc`, one quote attributed to two different people
 * verbatim, three strangers sharing a job title, and a dedicated testimonials
 * page that still praises the purchased template's own agency. The full audit is
 * in `config/testimonials.ts`.
 *
 * A visible placeholder was rejected: an empty heading or a "coming soon" row
 * implies Mishram has testimonials it is choosing not to show, which is itself
 * an unverified claim. One real entry makes the section appear, composed.
 *
 * **Deliberately not a numbered chapter**, like the Mishram Difference — so
 * nothing after it renumbers and Recognition keeps its own `06`.
 *
 * CONCEPT. An editorial quote index, not a review widget: a small indexed
 * roster of names on the left, one large quotation holding the field on the
 * right, the author beneath it. No cards, no carousel, no speech bubbles, no
 * star ratings, no Google badges. §05 above it is the page's most media-heavy
 * chapter, so this one is deliberately quiet — typography is the whole design.
 *
 * NO CTA, on purpose. This section exists as proof; the page's asks live in the
 * Hero, About and the Footer.
 */
export function ClientNotes() {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    TESTIMONIALS[0]?.id ?? "",
  );

  if (TESTIMONIALS.length === 0) return null;

  const index = (
    <QuoteIndex
      activeId={activeId}
      lockedId={lockedId}
      onPreview={preview}
      onClearPreview={clearPreview}
      onSelect={select}
    />
  );

  return (
    <section
      id="client-notes"
      aria-labelledby="client-notes-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />
      <LeadIn />

      <div className="page-x relative pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        <Intro />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mt-14 md:mt-16 lg:mt-20"
        >
          {wide ? (
            <div className="grid grid-cols-12 gap-x-8">
              {/* The index is navigation and stays small; the quotation is the
                  subject and takes two thirds of the row. */}
              <div className="col-span-4 xl:col-span-3">{index}</div>

              <div className="col-span-8 xl:col-span-8 xl:col-start-5">
                <QuoteStage activeId={activeId} />
              </div>
            </div>
          ) : (
            <div>
              <QuoteStage activeId={activeId} />
              <div className="mt-12 md:mt-14">{index}</div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * A local rhythm change: three structural rules instead of twelve. §05 above is
 * dense with media and the page has carried the same twelve hairlines through
 * most of its chapters — here the typography is the architecture, so the grid
 * steps back to the two edges of the quote field and the left margin. §11's
 * global grid behaviour is untouched, and it is a different move from the
 * Difference interlude, which keeps its columns and masks out the centre.
 */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={`block h-full w-px ${
              i === 0 || i === 4 || i === 8 ? "bg-grid" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * The handoff out of §05. That chapter ends on cinematic media, so this arrives
 * quietly — one short descending trace and no teal tip, the same restraint
 * About uses. It belongs entirely to this section, so §05 needed no change.
 */
function LeadIn() {
  return (
    <motion.span
      aria-hidden
      className="page-x pointer-events-none absolute inset-x-0 top-0 hidden lg:block"
      initial={{ height: 0 }}
      whileInView={{ height: 52 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="block h-full w-px bg-line-strong" />
    </motion.span>
  );
}

function Intro() {
  const [line1, line2] = CLIENT_NOTES_COPY.headline;
  const accent = CLIENT_NOTES_COPY.accentWord;
  const rest = line2.slice(accent.length);

  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex items-center gap-3"
      >
        {/* A short teal rule rather than a chapter number — this is an
            interlude, and numbering it would shift everything after it. */}
        <span aria-hidden className="block h-px w-6 bg-accent/70" />
        <span className="text-ink">{CLIENT_NOTES_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="client-notes-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,34rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
        >
          <span className="sr-only">{CLIENT_NOTES_COPY.a11yLabel}. </span>
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
                    <span className="font-accent italic">{accent}</span>
                    {rest}
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[32ch] lg:pb-2"
        >
          {CLIENT_NOTES_COPY.lead}
        </motion.p>
      </div>
    </>
  );
}
