"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import {
  MANAGEMENT,
  MANAGEMENT_AVATAR,
  MANAGEMENT_FRAME,
  MANAGEMENT_PROOF,
} from "@/config/management";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CURRENT MANAGEMENT — the page's second chapter, and its strongest single
 * relationship claim.
 *
 * `01 / Selected Collaborations` says which brands the work has run alongside.
 * This says the agency manages a creator, today. Those are the two facts an
 * outreach recipient is scanning for, so they sit back to back before the page
 * starts explaining itself.
 *
 * **Premium editorial proof, and deliberately not any of the obvious things:**
 * no analytics dashboard, no follower count, no engagement bar, no platform
 * chrome, no verified tick, no influencer-SaaS panel. The name, the handle,
 * one sentence, one quiet link out.
 *
 * The composition is **type left, identity plate right** — structurally unlike
 * §06 Recognition and §03 Creators' index-plus-cascade, so no two chapters on
 * this page read as the same layout.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY THE RIGHT-HAND COLUMN IS TYPE RATHER THAN A PORTRAIT (Revision 17B)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Revision 17 built this as two large photographic frames. **The user has
 * since confirmed those images are not Akash Sagar**, and they are gone — see
 * `MANAGEMENT_REVOKED_MEDIA`. The library holds no other identified photograph
 * of him, so the only traceable image left is the profile picture the exact
 * official account publishes, at 150×150 and no larger.
 *
 * So the media became a **plate**: the official avatar at 72px — inside its
 * own resolution even at 2× DPR — the handle set as display type, and the
 * chapter's hairline grammar carrying the rest. **The avatar is never
 * upscaled**, and the relationship is not unpublished to protect a
 * composition. A correct small image beats a wrong large one.
 *
 * **Unnumbered**, so §02, §03 and `ABOUT_CHAPTER` are untouched.
 */
export function CurrentManagement() {
  return (
    <section
      id="current-management"
      aria-labelledby="current-management-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />

      <div className="page-x relative pt-14 pb-14 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* ── The evidence, and it leads ──────────────────────────────
              Photograph first in the DOM and first on screen at every size.
              The image *is* the argument this chapter makes, so it opens the
              chapter on a phone exactly as it opens the left column on a
              desktop — one reading order, not two.

              `mb-14` rather than a top margin, and no `order-*`: below `lg`
              the parent is a plain block, so `order` does nothing there and
              the figure's caption would otherwise land a few pixels above the
              chapter label and read as a collision. */}
          <div className="mb-14 lg:col-span-5 lg:mb-0">
            <RelationshipFrame />
          </div>

          {/* ── The claim ───────────────────────────────────────────── */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="caps flex items-center gap-3 text-ink"
            >
              {/* A short teal rule instead of a chapter index — the interlude
                  grammar the Difference and Client Notes already use.
                  The dot beside it is the status marker: the same teal point
                  the header already uses, and the whole of the "this is
                  current" signal. **No "LIVE", no "SIGNED", no "EXCLUSIVE"** —
                  the label says Current Management and the sentence says
                  currently manages; none of the rest is supported. */}
              <span aria-hidden className="flex shrink-0 items-center gap-2">
                <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="block h-px w-5 bg-accent" />
              </span>
              {MANAGEMENT.label}
            </motion.p>

            {/* The name *is* the headline here. Every other chapter opens on a
                statement; this one opens on a person, which is the point. */}
            <motion.h2
              id="current-management-title"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-12% 0px" }}
              className="mt-7 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink md:mt-8"
            >
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                  className="block"
                >
                  {MANAGEMENT.name}
                </motion.span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              {/* THE BYLINE — handle and avatar together, Revision 30.
                  Revision 17B set the handle at display scale because it was
                  the only graphic the chapter had. The photograph is the
                  graphic now, so the handle returns to what it actually is: a
                  destination, next to the one image identified by the account
                  itself rather than by a filename. Two provenances, one line. */}
              <div className="mgt-byline">
                <span className="mgt-avatar">
                  <Image
                    src={MANAGEMENT_AVATAR.src}
                    alt={MANAGEMENT_AVATAR.alt}
                    width={MANAGEMENT_AVATAR.width}
                    height={MANAGEMENT_AVATAR.height}
                    // 44px on screen, so the 150px source still covers 2x and
                    // is never asked to do more than it can (§10u).
                    sizes="44px"
                    className="mgt-avatar-img"
                  />
                </span>
                <span className="mgt-byline-text">
                  <span className="mgt-handle-inline">{MANAGEMENT.handle}</span>
                  <span className="caps mt-1 block text-ink-muted">
                    {MANAGEMENT.plateNote}
                  </span>
                </span>
              </div>

              <p className="mt-7 max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72">
                {MANAGEMENT.statement}
              </p>

              {/* WHAT MISHRAM HANDLES. A hairline index, not KPI cards — every
                  item is scope, and there is no figure anywhere on this page. */}
              <ul className="mgt-scope">
                {MANAGEMENT.scope.map((item) => (
                  <li key={item} className="caps mgt-scope-item text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Metrics render only when there are verified ones. Empty today,
                  and an empty array renders nothing at all — no placeholder
                  row, no dash, no "coming soon". */}
              <Metrics />

              <a
                href={MANAGEMENT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${MANAGEMENT.name} on Instagram, ${MANAGEMENT.handle}`}
                className="group mt-9 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink transition-colors duration-300"
              >
                <span className="relative">
                  {MANAGEMENT.cta}
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
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * THE RELATIONSHIP FRAME — Revision 30, and the chapter's centre of gravity.
 *
 * Revision 17B replaced a portrait composition with a typographic one because
 * the only image traceable to Akash Sagar was a 150px avatar. That was the
 * honest state of the evidence then. **A client-labelled photograph now
 * exists**, so the chapter returns to what §10u said it would return to — and
 * the note in `config/management.ts` that promised "the unblock is one file"
 * turned out to be exactly right: one config export and one component.
 *
 * **Both figures stay in frame.** The photograph is evidence of a working
 * relationship, and the arm across the shoulder is the part that makes it
 * evidence. Cropping to a solo portrait would delete the argument *and* assert
 * which figure is which, which the client's label does not establish (§10u).
 *
 * The caption names what the image is, so it is never read as a commissioned
 * portrait — the same discipline the avatar's `plateLabel` used.
 *
 * Below the fold, so `loading="lazy"` and **no preload**: this must not
 * compete with the hero for the first megabyte (§16).
 */
function RelationshipFrame() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.95, ease: EASE }}
      className="mgt-frame"
    >
      {/* The teal corner marker the identity plate used to carry — the mark
          moved with the composition rather than being dropped. */}
      <span aria-hidden className="mgt-frame-mark" />

      <Image
        src={MANAGEMENT_FRAME.src}
        alt={MANAGEMENT_FRAME.alt}
        width={MANAGEMENT_FRAME.width}
        height={MANAGEMENT_FRAME.height}
        loading="lazy"
        sizes="(min-width: 1024px) 38vw, 92vw"
        className="mgt-frame-img"
      />

      <figcaption className="mgt-frame-caption caps text-ink-muted">
        {MANAGEMENT.frameCaption}
      </figcaption>
    </motion.figure>
  );
}

/**
 * THE REEL-PERFORMANCE INSET — Revision 33, and the promise in
 * `config/management.ts` finally coming due.
 *
 * `MANAGEMENT.metrics` was empty for five revisions under one condition: *"A
 * figure needs a dated screenshot tied unambiguously to this account before it
 * goes here."* This renders the figures **and the screenshot they were read
 * off, side by side** — so the evidence is not a footnote, it is the other
 * half of the block.
 *
 * **Still not a dashboard**, and the constraints are the same ones §10t set:
 * no chart, no axis, no bar, no percentage, no growth arrow, no comparison, no
 * timeframe, no total. Three figures as type, one image, one line saying what
 * the reader is looking at.
 *
 * **It sits in the claim column's own headroom.** The chapter's height is set
 * by the photograph on the left, which ran 243px taller than the text beside
 * it — so the inset costs the section a fraction of its own height rather than
 * all of it, and the photograph stays the dominant object. That is why it is
 * here and not in a strip beneath the composition.
 *
 * Self-suppressing exactly as before: empty the array and this renders
 * nothing at all — no empty box, no dash, no "coming soon".
 *
 * Below the fold, so `loading="lazy"` and **no preload** (§16).
 */
function Metrics() {
  if (MANAGEMENT.metrics.length === 0) return null;

  return (
    <div className="mgt-proof mt-9">
      <figure className="mgt-proof-shot">
        <Image
          src={MANAGEMENT_PROOF.src}
          alt={MANAGEMENT_PROOF.alt}
          width={MANAGEMENT_PROOF.width}
          height={MANAGEMENT_PROOF.height}
          loading="lazy"
          /* 208px in the two-column inset, full column width below 480px.
             The 560px source covers 2× at both. */
          sizes="(min-width: 480px) 13rem, 92vw"
        />
      </figure>

      <div>
        <p className="caps text-ink-muted">{MANAGEMENT.proofLabel}</p>

        {/* Three figures, each labelled for what it is. `dt` before `dd` in
            the DOM so a screen reader hears "Reel views — 70.9 million"
            rather than a bare number; visually the figure leads. */}
        <dl className="mgt-proof-figures mt-4">
          {MANAGEMENT.metrics.map((m) => (
            <div key={m.value} className="flex flex-col-reverse">
              <dt className="sr-only">{m.label}</dt>
              <dd className="mgt-proof-figure">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* What the reader is looking at, and nothing more. No result, no
            attribution to Mishram, no timeframe. */}
        <p className="mt-5 max-w-[34ch] text-[0.8125rem] leading-[1.65] text-ink-soft">
          {MANAGEMENT.proofNote}
        </p>
      </div>
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
