"use client";

import { motion } from "motion/react";

import { DIFFERENCE_COPY, DIFFERENTIATORS } from "@/config/difference";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { ConnectedStack } from "./ConnectedStack";
import { DifferenceRail } from "./DifferenceRail";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The spatial stack needs width for a name, a connector and a whole detail
 * column either side of one axis. Below this — or on a portrait tablet however
 * wide — the vertical rail is the honest reading. Shape first, device
 * classification second, and the same query 04 / Work Process uses.
 */
const STACK_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/**
 * THE MISHRAM DIFFERENCE — the interlude between 02 / What We Do and
 * 03 / Creators.
 *
 * **Deliberately not a numbered chapter.** §02 has just finished saying what
 * Mishram does; this answers why a brand would take all of it from one partner
 * instead of assembling it from an agency, two freelancers and a dev shop. It
 * carries no index, so nothing after it renumbers, and it has **no top border**
 * — a chapter rule would announce a new section when the point is that this is
 * a continuation.
 *
 * The join is the axis instead. One hairline runs the entire height of the
 * section at `--dif-axis`, drawn downward as the section enters, and the four
 * layers reach into it. It carries on past `Momentum` to the section's bottom
 * edge, where 03 / Creators' own border picks it up — which is why **Creators
 * needed no change at all.**
 *
 * The page's 12-column grid is locally quietened here rather than removed: the
 * outer columns survive and the centre is cleared, so the stack is the structure
 * in its own field. §11's global grid behaviour is untouched.
 *
 * Weight: no WebGL, no canvas, no scroll track, one small already-loaded
 * photograph. Lighter than §02 by design.
 */
export function Difference() {
  const wide = useMediaQuery(STACK_QUERY);
  const reduced = usePrefersReducedMotion();
  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    DIFFERENTIATORS[0].id,
  );

  return (
    <section
      id="difference"
      aria-labelledby="difference-title"
      // The split grid keys off this rather than a raw width, so the CSS and
      // the layout in use can never disagree at an awkward viewport shape.
      data-layout={wide ? "stack" : "rail"}
      className="relative w-full bg-canvas"
    >
      <Grid />
      {wide ? <Axis reduced={reduced} /> : null}

      {/* Top padding is the transition out of §02 — the axis runs through all
          of it. Bottom padding is the handoff into §03 and is deliberately
          shorter than a normal chapter's: the line is what carries it. */}
      <div className="page-x relative pt-16 pb-14 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24 lg:pt-28 lg:pb-24">
        <div className="dif-split grid gap-y-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="caps flex items-center gap-3"
            >
              {/* A short teal rule instead of a chapter number — this is an
                  interlude, and numbering it would claim a slot in a sequence
                  that is already correct. */}
              <span aria-hidden className="block h-px w-6 bg-accent/70" />
              <span className="text-ink">{DIFFERENCE_COPY.label}</span>
            </motion.p>

            <Headline />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="max-w-[42ch] self-end text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.62] text-ink/72 lg:pl-10 xl:pl-14"
          >
            {DIFFERENCE_COPY.lead}
          </motion.p>
        </div>

        <div className="mt-14 md:mt-16 lg:mt-20">
          {wide ? (
            <ConnectedStack
              activeId={activeId}
              lockedId={lockedId}
              onPreview={preview}
              onClearPreview={clearPreview}
              onSelect={select}
            />
          ) : (
            <DifferenceRail activeId={activeId} onSelect={select} />
          )}
        </div>
      </div>
    </section>
  );
}

function Headline() {
  const [line1, line2] = DIFFERENCE_COPY.headline;
  const accent = DIFFERENCE_COPY.accentWord;
  const rest = line1.slice(accent.length);

  return (
    // The trigger sits on the heading, not on the clipped lines: a line
    // translated outside its overflow-hidden parent never intersects the
    // viewport, so it would never fire on its own. Variants propagate.
    <motion.h2
      id="difference-title"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-12% 0px" }}
      className="mt-8 max-w-[min(92vw,32rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink md:mt-10"
    >
      {[line1, line2].map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.05em]">
          <motion.span
            variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
            className="block"
          >
            {i === 0 ? (
              <>
                <span className="font-accent italic">{accent}</span>
                {rest}
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/**
 * The central axis. Spans the whole section — the top edge is where §02's
 * closing block ends, so it reads as one line continuing downward out of
 * "One growth system." rather than as a rule this section drew for itself.
 *
 * Positioned inside a `page-x` wrapper's *content* box, exactly like the layers
 * and the connectors, so `--dif-axis` resolves against the same width for all
 * of them and nothing needs measuring.
 */
function Axis({ reduced }: { reduced: boolean }) {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      {/* The trigger sits on the full-height wrapper, never on the line
          itself: a line held at `scaleY(0)` is a zero-height box pinned to the
          section's top edge, and a viewport margin can put that box outside the
          root permanently — the same class of bug as the mask-reveal gotcha in
          §4 of the brief. Variants propagate down instead. */}
      <motion.div
        className="relative h-full"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
      >
        <motion.span
          className="dif-axis-line"
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: 1.25, ease: EASE }}
        />
        {/* Idle life: one slow signal down the axis. It never changes which
            layer is active — that is the visitor's alone. */}
        {reduced ? null : (
          <span className="dif-signal left-[var(--dif-axis)]" />
        )}
      </motion.div>
    </div>
  );
}

/**
 * The page grid, locally quietened. The outer columns survive so the section
 * still belongs to the page; the centre is cleared so the connected stack reads
 * as the structure instead of competing with twelve hairlines behind it.
 */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="dif-grid grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}
