"use client";

import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import {
  PERFORMANCE_WALL,
  type WallVariant,
} from "@/config/service-performance";

import { EASE } from "../ServiceSection";
import { CreativeSurface } from "./CreativeSurface";

/**
 * THE VARIANT SHEET — one original and four versions of it, on one baseline.
 *
 * The first movement of the creative section: what a creative test actually
 * produces. The original is taller than the rest and everything sits on a
 * shared baseline, so the set reads as a **variant sheet** — the thing pinned
 * up next to a working screen — rather than as a portfolio grid.
 *
 * **DIFFERENT IN KIND FROM THE TEST BENCH BELOW IT.** The bench is schematic:
 * small wireframes in a laboratory field, driven by a selector, showing how an
 * experiment is *set up*. This is compositional: larger, denser, tonal surfaces
 * driven by the pointer, showing what the experiment *makes*. The `media` tone
 * on these surfaces is what carries the difference visually.
 *
 * **Not Service 02's casting wall.** That is abutted photographs at one height
 * with hand-tuned uneven widths. These are separated surfaces whose widths fall
 * out of their own aspect ratios, with one deliberately dominant — and there is
 * no photography in any of them.
 *
 * **Abstract, and it is not a shortage of assets.** No client creative, no
 * brand, no product, no photograph, no headline text and no figure — see
 * `CreativeSurface` for the three separate reasons. **Nothing is labelled a
 * winner**, because no result exists to report.
 *
 * Hover pulls one forward and steps the rest back — the `:has()` gesture §10d's
 * contact sheet uses, gated to fine pointers so a tap never leaves a sticky
 * state. **No modal, no lightbox.**
 */
export function VariantSheet() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted"
      >
        <span>{PERFORMANCE_WALL.sheetLabel}</span>
        <span className="text-ink/40">{PERFORMANCE_WALL.changeLabel}</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="pfm-sheet"
      >
        <Variant variant={PERFORMANCE_WALL.primary} primary />
        {PERFORMANCE_WALL.variants.map((variant) => (
          <Variant key={variant.id} variant={variant} />
        ))}
      </motion.div>

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <p className="max-w-[62ch] text-[0.75rem] leading-[1.7] text-ink-muted">
          {PERFORMANCE_WALL.caption}
        </p>

        {/* The route's one mid-page contextual link (§10j). It points at a
            service page that exists — nothing here links to an unbuilt one. */}
        <PageLink
          href={PERFORMANCE_WALL.actionHref}
          className="group inline-flex shrink-0 items-center gap-2.5 text-[0.8125rem] leading-[1.5] text-ink-soft transition-colors duration-300 hover:text-ink"
        >
          {PERFORMANCE_WALL.action}
          <Arrow
            size={12}
            className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          />
        </PageLink>
      </div>
    </>
  );
}

/**
 * One composition, with what changed named underneath it.
 *
 * The label is real DOM text at all times rather than a hover reveal — the
 * caption is the claim, so it has to be readable without a pointer (§10e).
 * Hover *strengthens* it.
 *
 * The figure owns the height and the surface fills it, so five different aspect
 * ratios sit on one baseline with their widths falling out of their own shape.
 * The caption is absolutely positioned below on the wide layout for the same
 * reason: an in-flow caption of varying height would break that baseline.
 */
function Variant({
  variant,
  primary = false,
}: {
  variant: WallVariant;
  primary?: boolean;
}) {
  return (
    <figure className={`pfm-variant${primary ? " pfm-variant--primary" : ""}`}>
      <CreativeSurface
        rows={variant.rows}
        aspect={variant.aspect}
        tone="media"
        className="pfm-variant-surface"
      />
      <figcaption className="pfm-variant-caption">
        <span className="caps flex items-center gap-2.5 text-ink-muted">
          <span aria-hidden className="pfm-variant-link" />
          <span className="pfm-variant-change">{variant.change}</span>
        </span>
        <span className="pfm-variant-note">{variant.note}</span>
      </figcaption>
    </figure>
  );
}
