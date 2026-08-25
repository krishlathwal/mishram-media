"use client";

import { motion } from "motion/react";

import {
  PATH_STAGES,
  PERFORMANCE_PATH_COPY,
  PERFORMANCE_PATH_LABELS,
  type PathStage,
} from "@/config/service-performance";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { OptimisationRail } from "./OptimisationRail";

/**
 * THE PERFORMANCE PATH — one controlled route, and the loop that closes it.
 *
 * **Two movements.** The path drawn — six moves and a return arc — then the
 * optimisation rail: what the loop is allowed to change between rounds. They
 * were drafted as two sections and merged, because read a screen apart they
 * repeated each other's nouns; read together the second is the first at a
 * different altitude. See the note above `PERFORMANCE_OPTIMISATION`.
 *
 * Six moves on a single flat line, each marked by a glyph that says what that
 * move actually does to the work: a hypothesis opening, variants stacking,
 * distribution fanning out, a destination receiving, a response arriving, and a
 * return arc carrying the answer back to the start.
 *
 * DELIBERATELY NOT THE OTHER THREE LINE SECTIONS ON THIS SITE, and the
 * differences are structural:
 *
 * - The homepage's §04 Work Process is five stages on a **rising** line — the
 *   rise encodes "idea to momentum" — and it is selectable.
 * - Service 01's `ServiceSystem` is four rows on a **vertical spine** that
 *   turns back on itself.
 * - Service 02's campaign band is four strands **converging** into one trunk.
 *
 * This is a **closed circuit**: flat, directional, and returning. Flat because
 * a performance loop does not climb — it repeats, and each repeat is better
 * informed rather than higher up. **The forward reading dominates** (creative →
 * distribution → landing, at full weight); the return trace is deliberately
 * secondary, at low opacity with only its arrowhead in teal, because a page
 * that draws the feedback loop as loudly as the campaign is describing a
 * process rather than a service.
 *
 * **Nothing is selectable.** All six sentences are on screen at once, and the
 * page's interaction budget belongs to the Test Bench above it — the same rule
 * Service 02 applies to its campaign band.
 *
 * **No numbers, no axes, no chart.** The glyphs are structural marks; the
 * ascending ticks at Signal carry direction and nothing else, and no figure is
 * attached to any of them.
 *
 * Fixed-aspect box with a `viewBox` that matches it exactly, so strokes stay
 * uniform hairlines and no `preserveAspectRatio="none"` shear can happen
 * (§10a). Stage bodies are HTML in a six-column grid with **no gap** — each
 * column carries its own padding instead — so a node's x is exactly its
 * column's centre at every width, with no gap arithmetic to drift.
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/** Band aspect: 1000 × 150 viewBox units. */
const VB_W = 1000;
const VB_H = 150;

/** The forward line's Y. Flat on purpose — see the note above. */
const LINE_Y = 70;

/** Column centres. `(i + 0.5) / 6` exactly, because the grid below has no gap. */
const NODE_X = PATH_STAGES.map((_, i) => ((i + 0.5) * VB_W) / PATH_STAGES.length);

export function PerformancePath({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="full">
      <ServiceSectionHead id={`${id}-title`} copy={PERFORMANCE_PATH_COPY} />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        data-layout={wide ? "band" : "rail"}
        className="mt-14 md:mt-16 lg:mt-20"
      >
        {wide ? (
          <>
            <div className="pfm-band">
              <svg
                aria-hidden
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                fill="none"
                className="pfm-band-svg"
              >
                {/* The structure, drawn first and quietly. */}
                <motion.path
                  d={`M0 ${LINE_Y} L${VB_W} ${LINE_Y}`}
                  className="pfm-path"
                  stroke="var(--color-line-strong)"
                  strokeWidth="1"
                  variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                  transition={{ duration: 1.2, ease: EASE }}
                />

                {/* The forward route — creative through to signal, at full
                    weight. This is the reading the section wants. */}
                <motion.path
                  d={`M${NODE_X[0]} ${LINE_Y} L${NODE_X[4]} ${LINE_Y}`}
                  className="pfm-path"
                  stroke="var(--color-accent)"
                  strokeOpacity="0.8"
                  strokeWidth="1.6"
                  variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                  transition={{ duration: 1.3, delay: 0.28, ease: EASE }}
                />

                {/* The loop closing. Low opacity by design. */}
                <motion.path
                  d={`M${NODE_X[5]} ${LINE_Y + 10} C ${NODE_X[5]} ${VB_H - 12}, ${NODE_X[0]} ${VB_H - 12}, ${NODE_X[0]} ${LINE_Y + 12}`}
                  className="pfm-path pfm-return"
                  stroke="var(--color-ink)"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                  variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                  transition={{ duration: 1.5, delay: 1.1, ease: EASE }}
                />
                <motion.path
                  d={`M${NODE_X[0] - 5} ${LINE_Y + 17} L${NODE_X[0]} ${LINE_Y + 11} L${NODE_X[0] + 5} ${LINE_Y + 17}`}
                  stroke="var(--color-accent)"
                  strokeOpacity="0.8"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                  variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                  transition={{ duration: 0.4, delay: 2.4 }}
                />

                {PATH_STAGES.map((stage, i) => (
                  <motion.g
                    key={stage.id}
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <StageGlyph id={stage.id} x={NODE_X[i]} />
                    <rect
                      x={NODE_X[i] - 3.5}
                      y={LINE_Y - 3.5}
                      width="7"
                      height="7"
                      className="pfm-band-node"
                    />
                  </motion.g>
                ))}
              </svg>

              <motion.span
                aria-hidden
                className="caps pfm-band-loop"
                variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                transition={{ duration: 0.6, delay: 2.1 }}
              >
                {PERFORMANCE_PATH_LABELS.arc}
              </motion.span>
            </div>

            {/* Six columns, no gap — each carries its own padding, so a
                column's centre is exactly its node's x at any width. */}
            <ol className="mt-8 grid grid-cols-6">
              {PATH_STAGES.map((stage, i) => (
                <motion.li
                  key={stage.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    shown: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: EASE }}
                  className="pr-6"
                >
                  <StageBody stage={stage} />
                </motion.li>
              ))}
            </ol>
          </>
        ) : (
          /* ── Narrow: the same route, rotated ────────────────────
             A vertical rail, with the loop stated in words rather than drawn.
             There is no width to carry a return arc at this size, and the
             meaning is what matters — the same honesty §10c's rail applies. */
          <>
            <ol className="pfm-rail">
              {PATH_STAGES.map((stage, i) => (
                <motion.li
                  key={stage.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    shown: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.7, delay: 0.08 + i * 0.07, ease: EASE }}
                  className="pfm-rail-item"
                >
                  <span aria-hidden className="pfm-rail-node" />
                  <StageBody stage={stage} />
                </motion.li>
              ))}
            </ol>
            <motion.p
              className="caps mt-7 flex items-center gap-3 text-ink-muted"
              variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
              {PERFORMANCE_PATH_LABELS.loop}
            </motion.p>
          </>
        )}
      </motion.div>

      {/* The loop's second reading: what it is allowed to change. */}
      <OptimisationRail />
    </ServiceSection>
  );
}

function StageBody({ stage }: { stage: PathStage }) {
  return (
    <>
      <p className="caps text-[0.5625rem] text-accent">{stage.index}</p>
      <h3 className="mt-4 font-display text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink">
        {stage.name}
      </h3>
      {/* The question the stage answers — the section's structure in the
          visitor's own words, and real DOM text at every width. */}
      <p className="mt-3 max-w-[28ch] text-[0.8125rem] leading-[1.5] text-ink/70">
        {stage.question}
      </p>
      <p className="mt-4 max-w-[32ch] text-[0.875rem] leading-[1.7] text-ink-soft">
        {stage.detail}
      </p>
    </>
  );
}

/**
 * What each move does to the work, drawn above its node.
 *
 * These are structural marks in the site's own hairline language — **not
 * icons**, and not a platform's UI. Nothing here is a chart, and the only
 * thing that could be mistaken for one (the ticks at Signal) carries direction
 * with no axis, no scale and no figure attached.
 */
function StageGlyph({ id, x }: { id: PathStage["id"]; x: number }) {
  const line = "var(--color-line-strong)";
  const accent = "var(--color-accent)";

  if (id === "hypothesis") {
    return (
      <g>
        <rect
          x={x - 9}
          y={30}
          width="18"
          height="18"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line x1={x} y1={48} x2={x} y2={66} stroke={line} strokeWidth="1" />
      </g>
    );
  }

  if (id === "creative") {
    return (
      <g>
        {[-22, -4, 14].map((dx, i) => (
          <rect
            key={dx}
            x={x + dx}
            y={26 + i * 4}
            width="14"
            height="18"
            stroke={i === 0 ? accent : line}
            strokeOpacity={i === 0 ? 0.8 : 1}
            strokeWidth="1"
          />
        ))}
        <line x1={x} y1={50} x2={x} y2={66} stroke={line} strokeWidth="1" />
      </g>
    );
  }

  if (id === "distribution") {
    return (
      <g>
        {[-20, 0, 20].map((dx) => (
          <line
            key={dx}
            x1={x}
            y1={66}
            x2={x + dx}
            y2={30}
            stroke={dx === 0 ? accent : line}
            strokeOpacity={dx === 0 ? 0.8 : 1}
            strokeWidth="1"
          />
        ))}
      </g>
    );
  }

  if (id === "destination") {
    return (
      <g>
        <rect x={x - 21} y={28} width="42" height="26" stroke={line} strokeWidth="1" />
        <line x1={x - 21} y1={35} x2={x + 21} y2={35} stroke={line} strokeWidth="1" />
        <rect x={x - 14} y={44} width="16" height="4" fill={accent} fillOpacity="0.8" />
        <line x1={x} y1={54} x2={x} y2={66} stroke={line} strokeWidth="1" />
      </g>
    );
  }

  if (id === "signal") {
    return (
      <g>
        <circle cx={x - 12} cy={40} r="10" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
        <circle cx={x - 12} cy={40} r="3.2" fill={accent} />
        {[6, 14, 22].map((dx, i) => (
          <line
            key={dx}
            x1={x + dx}
            y1={50}
            x2={x + dx}
            y2={44 - i * 6}
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        ))}
        <line x1={x} y1={54} x2={x} y2={66} stroke={line} strokeWidth="1" />
      </g>
    );
  }

  /* Iteration — the arc turning back, and the only glyph that points left. */
  return (
    <g>
      <path
        d={`M${x + 14} 46 A 14 14 0 1 0 ${x} 30`}
        stroke={accent}
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
      <path
        d={`M${x - 5} 26 L${x} 30 L${x - 5} 34`}
        stroke={accent}
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      <line x1={x} y1={56} x2={x} y2={66} stroke={line} strokeWidth="1" />
    </g>
  );
}
