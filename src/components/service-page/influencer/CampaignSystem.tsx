"use client";

import { motion } from "motion/react";

import {
  CAMPAIGN_STAGES,
  CAMPAIGN_SYSTEM_LABELS,
  INFLUENCER_SYSTEM_COPY,
} from "@/config/service-influencer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * THE CAMPAIGN SYSTEM — five strands braiding into one.
 *
 * The drawing *is* the argument, and it is the page's title in line form: four
 * separate voices enter on the left and merge, stage by stage, until a single
 * trunk leaves on the right. **Many creators → one campaign.**
 *
 * DELIBERATELY NOT THE OTHER TWO LINE SECTIONS ON THIS SITE:
 *
 * - The homepage's §04 Work Process is five stages on one **rising** line, with
 *   a feedback loop under it and a selectable detail panel. It is the agency's
 *   whole process, and this must not read as a second copy of it.
 * - Service 01's `ServiceSystem` is four rows hanging off a **vertical spine**
 *   that turns back on itself. That is a loop; this is a convergence.
 *
 * Nothing is selectable here, on purpose. All five sentences are on screen at
 * once, and the page's interaction budget belongs to the Match Field above.
 *
 * The band is a fixed-aspect box with a `viewBox` that matches it exactly, so
 * the strokes stay uniform hairlines and no `preserveAspectRatio="none"` shear
 * can happen (§10a). Labels are HTML positioned over it by percentage, so the
 * type stays crisp and themeable — the technique §10c uses.
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/** Band aspect: 1000 × 168 viewBox units. */
const VB_W = 1000;
const VB_H = 168;

/** X positions of the five stage nodes, in viewBox units. */
const STAGE_X = [90, 300, 500, 700, 910];

/** The trunk's Y — everything converges onto it. */
const TRUNK_Y = 95;

/**
 * Four strands entering at different heights and merging one at a time. Each
 * path runs from the left edge to the stage where that strand joins the trunk;
 * by stage 04 there is a single line left.
 */
const STRANDS: readonly { from: number; mergeAt: number }[] = [
  { from: 30, mergeAt: 1 },
  { from: 62, mergeAt: 2 },
  { from: 128, mergeAt: 3 },
  { from: 158, mergeAt: 3 },
];

function strandPath(from: number, mergeAt: number): string {
  const endX = STAGE_X[mergeAt];
  const midX = (0 + endX) / 2;
  return `M0 ${from} C ${midX} ${from}, ${midX} ${TRUNK_Y}, ${endX} ${TRUNK_Y}`;
}

export function CampaignSystem({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead id={`${id}-title`} copy={INFLUENCER_SYSTEM_COPY} />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        data-layout={wide ? "band" : "rail"}
        className="mt-14 md:mt-16 lg:mt-20"
      >
        {wide ? (
          <>
            {/* ── The braid ─────────────────────────────────────── */}
            <div className="inf-band">
              <svg aria-hidden viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" className="inf-band-svg">
                {STRANDS.map((strand) => (
                  <motion.path
                    key={`${strand.from}`}
                    d={strandPath(strand.from, strand.mergeAt)}
                    stroke="var(--color-line-strong)"
                    strokeWidth="1.1"
                    variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                ))}

                {/* The trunk: present from the first node, teal by the last. */}
                <motion.path
                  d={`M${STAGE_X[0]} ${TRUNK_Y} L${VB_W} ${TRUNK_Y}`}
                  stroke="var(--color-accent)"
                  strokeOpacity="0.75"
                  strokeWidth="1.4"
                  variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
                  transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
                />

                {STAGE_X.map((x, i) => (
                  <motion.rect
                    key={x}
                    x={x - 3.5}
                    y={TRUNK_Y - 3.5}
                    width="7"
                    height="7"
                    className="inf-stage-node"
                    variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </svg>

              <span aria-hidden className="caps inf-band-label inf-band-label--start">
                {CAMPAIGN_SYSTEM_LABELS.strandsLabel}
              </span>
              <span aria-hidden className="caps inf-band-label inf-band-label--end">
                {CAMPAIGN_SYSTEM_LABELS.trunkLabel}
              </span>
            </div>

            {/* ── The stages, under their nodes ─────────────────── */}
            <ol className="mt-8 grid grid-cols-5 gap-x-6">
              {CAMPAIGN_STAGES.map((stage, i) => (
                <motion.li
                  key={stage.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    shown: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.09, ease: EASE }}
                >
                  <StageBody stage={stage} />
                </motion.li>
              ))}
            </ol>
          </>
        ) : (
          /* ── Narrow: the braid rotated ─────────────────────────
             A vertical rail with the same reading — the strands are stated as
             a label rather than drawn, because there is no width to braid in
             and a squeezed convergence would be illegible. The same honesty
             §10c's rail applies to its feedback loop. */
          <ol className="inf-rail">
            {CAMPAIGN_STAGES.map((stage, i) => (
              <motion.li
                key={stage.id}
                variants={{ hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.07, ease: EASE }}
                className="inf-rail-item"
              >
                <span aria-hidden className="inf-rail-node" />
                <StageBody stage={stage} />
              </motion.li>
            ))}
          </ol>
        )}
      </motion.div>
    </ServiceSection>
  );
}

function StageBody({ stage }: { stage: (typeof CAMPAIGN_STAGES)[number] }) {
  return (
    <>
      <p className="flex items-baseline gap-3">
        <span className="caps text-[0.5625rem] text-accent">{stage.index}</span>
        <span className="caps text-ink-muted">{stage.verb}</span>
      </p>
      <h3 className="mt-4 font-display text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink">
        {stage.name}
      </h3>
      <p className="mt-4 max-w-[34ch] text-[0.875rem] leading-[1.7] text-ink-soft">
        {stage.sentence}
      </p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        {stage.terms.map((term, t) => (
          <li key={term} className="flex items-center gap-4">
            {t > 0 ? (
              <span aria-hidden className="block h-2.5 w-px bg-line-strong" />
            ) : null}
            <span className="caps text-[0.5625rem] text-ink-muted">{term}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
