"use client";

import { motion } from "motion/react";

import type { ServicePillar, ServiceSectionCopy } from "@/config/service-pages";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * WHAT WE ACTUALLY BUILD — the service as one connected system.
 *
 * **Not four cards.** Four editorial rows hanging off a single spine, with the
 * spine turning at the foot and returning to the top — the loop is the argument
 * the section is making, so it is drawn rather than described.
 *
 * Deliberately **not interactive**. Every sentence is on screen at once and
 * nothing has to be discovered: this page's one interactive moment belongs to
 * the content-system board below it, and two selectable sections in a row would
 * make the visitor work for information that is only four sentences long.
 * Hover does nothing but emphasise, and it is gated to fine pointers.
 *
 * The return arc is its own small SVG in a fixed-aspect box rather than a
 * percentage-scaled one. A `preserveAspectRatio="none"` path shears its stroke
 * and stops being a hairline — the mistake §10a records — and a uniform box is
 * the cheapest way to make that impossible.
 */
export function ServiceSystem({
  id,
  copy,
  pillars,
  loopLabel,
}: {
  id: string;
  copy: ServiceSectionCopy;
  pillars: readonly ServicePillar[];
  /** The words on the return path. */
  loopLabel: string;
}) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead id={`${id}-title`} copy={copy} />

      {/* The trigger sits on the full-height wrapper, never on the spine: a
          line held at scaleY(0) is a zero-height box pinned to the top edge,
          and a viewport margin can put it outside the root permanently (§10a).
          Variants propagate down. */}
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="svp-system relative mt-14 md:mt-16 lg:mt-20"
      >
        {/* The spine spans the rows and stops there — the return arc below
            continues the same line, so letting the spine run the full height
            of the section would draw it twice. Wrapping the two together is
            what makes that exact without a magic offset. */}
        <div className="relative">
          <motion.span
            aria-hidden
            className="svp-spine"
            variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          <ol className="relative">
          {pillars.map((pillar, i) => (
            <li key={pillar.id} className="svp-pillar relative">
              <span aria-hidden className="svp-node" />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.08,
                  ease: EASE,
                }}
                className="svp-pillar-inner"
              >
                <div className="svp-pillar-head">
                  <p className="flex items-baseline gap-3">
                    <span className="caps text-[0.5625rem] text-accent">
                      {pillar.index}
                    </span>
                    <span className="caps text-ink-muted">{pillar.verb}</span>
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.05] font-medium tracking-[-0.032em] text-ink">
                    {pillar.name}
                  </h3>
                </div>

                <div className="svp-pillar-body">
                  <p className="max-w-[52ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.65] text-ink/72">
                    {pillar.sentence}
                  </p>
                  <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                    {pillar.terms.map((term, t) => (
                      <li key={term} className="flex items-center gap-5">
                        {t > 0 ? (
                          <span
                            aria-hidden
                            className="block h-2.5 w-px bg-line-strong"
                          />
                        ) : null}
                        <span className="caps text-ink-muted">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </li>
          ))}
          </ol>
        </div>

        <Loop label={loopLabel} />
      </motion.div>
    </ServiceSection>
  );
}

/**
 * The spine turning back on itself. One uniform-aspect SVG, so the stroke stays
 * a true hairline at every size, with the arrowhead pointing back up the way
 * the line came.
 */
function Loop({ label }: { label: string }) {
  return (
    <div className="svp-loop">
      <motion.svg
        aria-hidden
        viewBox="0 0 120 64"
        fill="none"
        className="svp-loop-svg"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
      >
        {/* Down out of the spine, right along the foot, and back up. No
            vectorEffect — it cannot be combined with an animated pathLength
            (§10), and this path is animated. */}
        <motion.path
          d="M0.5 0 L0.5 40 Q0.5 52 12.5 52 L96 52 Q108 52 108 40 L108 22"
          stroke="var(--color-accent)"
          strokeOpacity="0.55"
          strokeWidth="1"
          variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
          transition={{ duration: 1.2, delay: 0.75, ease: EASE }}
        />
        <motion.path
          d="M104 27 L108 21 L112 27"
          stroke="var(--color-accent)"
          strokeOpacity="0.75"
          strokeWidth="1"
          strokeLinecap="square"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.4, delay: 1.7, ease: EASE }}
        />
      </motion.svg>

      <motion.p
        className="caps svp-loop-label text-ink-muted"
        variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
        transition={{ duration: 0.6, delay: 1.5, ease: EASE }}
      >
        {label}
      </motion.p>
    </div>
  );
}
