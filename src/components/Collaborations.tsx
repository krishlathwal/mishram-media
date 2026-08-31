"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import {
  COLLABORATIONS_COPY,
  ORDERED_COLLABORATIONS,
  type Collaboration,
} from "@/config/collaborations";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────────────────────────────────────────────
   RAIL GEOMETRY — derived from the roster, not hand-tuned.

   The rail was approved at five brands, four copies per track, translating
   half its width over 46 seconds. Revision 16 took the roster to eighteen.
   Left alone, that would have run the same animation across a track three and
   a half times longer — the same 46s over far more pixels, so **every logo
   would have swept past at roughly three times the approved speed.**

   Both numbers below therefore come off the config: copies per track fall as
   the roster grows, and the duration tracks the resulting width so the rail
   keeps the pace it was approved at whatever length the roster reaches.
   ──────────────────────────────────────────────────────────────── */

/**
 * The seam-free loop needs one track wider than the viewport. Twelve marks at
 * this rail's proportions clear ~2,000px, which covers every supported width;
 * a shorter roster repeats until it does.
 */
const MIN_ITEMS_PER_TRACK = 12;

/**
 * Reference geometry — the desktop rail the 46s was composed against:
 * 29px logo height and an 86px gap at 1440px. Only the *ratio* of track
 * widths matters here, so these being viewport-specific is fine.
 */
const REF_LOGO_H = 29;
const REF_GAP = 86;
const APPROVED_DURATION = 46;
const APPROVED_TRACK_UNITS = 21.07 * 4; // the five approved marks, four copies
const APPROVED_TRACK_GAPS = 20;

/** A mark's width in logo-heights, which is what the rail actually lays out. */
function widthUnits(c: Collaboration): number {
  return (c.size.w / c.size.h) * (c.scale ?? 1);
}

function railTiming(items: readonly Collaboration[]) {
  const repeats = Math.max(1, Math.ceil(MIN_ITEMS_PER_TRACK / items.length));
  const count = items.length * repeats;
  const units = items.reduce((n, c) => n + widthUnits(c), 0) * repeats;

  const approvedPx = APPROVED_TRACK_UNITS * REF_LOGO_H + APPROVED_TRACK_GAPS * REF_GAP;
  const trackPx = units * REF_LOGO_H + count * REF_GAP;

  return {
    repeats,
    duration: (APPROVED_DURATION * trackPx) / approvedPx,
  };
}

/**
 * Credibility bridge between the hero and everything below it. Same editorial
 * grid, same hairlines, same restraint — a single continuous rail rather than
 * a carousel.
 *
 * Logos render as CSS masks tinted with `currentColor`, so both themes get the
 * right treatment (ivory on obsidian, ink on parchment) from one asset.
 */
export function Collaborations() {
  const items = ORDERED_COLLABORATIONS;
  const { repeats, duration } = railTiming(items);
  const section = useRef<HTMLElement>(null);

  // Handoff into 02 / What We Do: as this section leaves the top of the
  // viewport it quiets down and drifts back a few pixels, so the next chapter
  // takes over the same canvas rather than starting fresh.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const exitOpacity = useTransform(scrollYProgress, [0.15, 1], [1, 0.42]);
  const exitY = useTransform(scrollYProgress, [0.15, 1], [0, -16]);

  return (
    <section
      ref={section}
      id="collaborations"
      aria-labelledby="collaborations-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      {/* The hero's vertical grid continues through this section. */}
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

      <motion.div
        style={{ opacity: exitOpacity, y: exitY }}
        className="relative py-14 md:py-16 lg:py-[72px]"
      >
        {/* ── Label ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="page-x flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2"
        >
          <h2 id="collaborations-title" className="caps flex items-baseline gap-3">
            <span className="text-ink-muted">{COLLABORATIONS_COPY.index}</span>
            <span aria-hidden className="text-ink-muted">
              /
            </span>
            <span className="text-ink">{COLLABORATIONS_COPY.title}</span>
          </h2>
          <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
            {COLLABORATIONS_COPY.lead}
          </p>
        </motion.div>

        {/* ── Rail ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="collab-rail mt-11 md:mt-14"
          style={{ ["--collab-duration" as string]: `${duration.toFixed(1)}s` }}
        >
          <div className="collab-viewport">
            <div className="collab-track">
              {Array.from({ length: repeats }).map((_, copy) =>
                items.map((c) => (
                  <LogoItem
                    key={`${copy}-${c.name}`}
                    item={c}
                    // Only the first pass is exposed to assistive tech.
                    silent={copy > 0}
                  />
                )),
              )}
            </div>
            {/* Second track makes the loop seamless; never announced. */}
            <div className="collab-track collab-track--clone" aria-hidden>
              {Array.from({ length: repeats }).map((_, copy) =>
                items.map((c) => (
                  <LogoItem key={`clone-${copy}-${c.name}`} item={c} silent />
                )),
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LogoItem({ item, silent }: { item: Collaboration; silent: boolean }) {
  return (
    <div
      className={`collab-item${silent ? "" : " collab-item--primary"}`}
      data-dark-mono={item.darkKeepsMono ? "" : undefined}
      /* Reduced motion collapses the rail to one static set. At five marks
         that was the whole roster; at eighteen it would be a wall, which is
         the one thing this section must not become. The featured marks stand
         for the roster there — the section's own claim is "selected". */
      data-roster={item.priority === "roster" ? "" : undefined}
      aria-hidden={silent || undefined}
    >
      <span
        className="collab-mark"
        style={{
          height: `calc(var(--collab-logo-h) * ${item.scale ?? 1})`,
          aspectRatio: `${item.size.w} / ${item.size.h}`,
        }}
      >
        {/* THE BRAND'S OWN ARTWORK, AT REST — Revision 29.
            One layer, not two. The rail used to stack an ink-tinted silhouette
            under the colour file and cross-fade between them on hover; now the
            colour is simply what the rail *is*, and hover only takes it to full
            clarity. **That removed eighteen mask downloads from the homepage**
            for images that are no longer painted.

            `item.logo` still exists and the mask files stay on disk — `/about`
            renders the same roster as monochrome marks and reads them. This
            change is scoped to the rail. */}
        <span
          role={silent ? undefined : "img"}
          aria-label={silent ? undefined : item.name}
          className="collab-logo-color"
          style={{ backgroundImage: `url(${item.logoColor})` }}
        />
      </span>
      {/* Accent response, in place of a large scale-up. */}
      <span aria-hidden className="collab-underline" />
    </div>
  );
}
