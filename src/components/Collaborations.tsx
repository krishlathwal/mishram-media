"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import {
  COLLABORATIONS_COPY,
  VISIBLE_COLLABORATIONS,
  type Collaboration,
} from "@/config/collaborations";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Copies per track — enough to fill a wide viewport before the loop repeats. */
const REPEATS = 4;

/**
 * Credibility bridge between the hero and everything below it. Same editorial
 * grid, same hairlines, same restraint — a single continuous rail rather than
 * a carousel.
 *
 * Logos render as CSS masks tinted with `currentColor`, so both themes get the
 * right treatment (ivory on obsidian, ink on parchment) from one asset.
 */
export function Collaborations() {
  const items = VISIBLE_COLLABORATIONS;
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
        >
          <div className="collab-viewport">
            <div className="collab-track">
              {Array.from({ length: REPEATS }).map((_, copy) =>
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
              {Array.from({ length: REPEATS }).map((_, copy) =>
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
      aria-hidden={silent || undefined}
    >
      <span
        className="collab-mark"
        style={{
          height: `calc(var(--collab-logo-h) * ${item.scale ?? 1})`,
          aspectRatio: `${item.size.w} / ${item.size.h}`,
        }}
      >
        {/* Resting layer: silhouette tinted with the theme's ink. */}
        <span
          role={silent ? undefined : "img"}
          aria-label={silent ? undefined : item.name}
          className="collab-logo"
          style={{
            WebkitMaskImage: `url(${item.logo})`,
            maskImage: `url(${item.logo})`,
          }}
        />
        {/* Hover layer: the brand's genuine artwork, cross-faded in. */}
        <span
          aria-hidden
          className="collab-logo-color"
          style={{ backgroundImage: `url(${item.logoColor})` }}
        />
      </span>
      {/* Accent response, in place of a large scale-up. */}
      <span aria-hidden className="collab-underline" />
    </div>
  );
}
