"use client";

import { motion } from "motion/react";

import { INFLUENCER_FIT } from "@/config/service-influencer";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * WHY CREATOR FIT MATTERS — the quiet beat after the casting wall.
 *
 * Four pairings, each drawn as two terms meeting at a node on a hairline. The
 * point of the drawing is that fit is always a *relationship* between two
 * things rather than a property of one — which is also why there is no
 * photography in this section: the page has just spent a full-width band on
 * faces, and repeating them here would flatten the rhythm.
 *
 * **No statistics, no scoring, no meters.** Nothing here implies a measurement,
 * because Mishram measures none of it — this is judgement, described.
 */
export function FitRelations({ id }: { id: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={{
            label: INFLUENCER_FIT.label,
            headline: INFLUENCER_FIT.headline,
          }}
          lead="below"
          className="lg:col-span-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
          className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end"
        >
          {INFLUENCER_FIT.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-ink/75"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      <ul className="mt-16 border-t border-line md:mt-20">
        {INFLUENCER_FIT.pairs.map((pair, i) => (
          <motion.li
            key={pair.a}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, delay: 0.05 + i * 0.07, ease: EASE }}
            className="inf-pair"
          >
            <span className="caps w-8 shrink-0 text-[0.5625rem] text-ink-muted">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* The relationship, drawn: two terms meeting at a node. */}
            <span className="inf-pair-relation">
              <span className="inf-pair-term">{pair.a}</span>
              <span aria-hidden className="inf-pair-link">
                <span className="inf-pair-node" />
              </span>
              <span className="inf-pair-term">{pair.b}</span>
            </span>

            <span className="inf-pair-note">{pair.note}</span>
          </motion.li>
        ))}
      </ul>
    </ServiceSection>
  );
}
