"use client";

import { motion } from "motion/react";

import { SHOOTS_DIRECTION } from "@/config/service-shoots";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { ShootFrame } from "./ShootFrame";

/**
 * BEFORE THE SHUTTER — the calm beat, and the direction desk in one section.
 *
 * **Two sections merged, and the merge is the argument.** "The shoot starts
 * before the shutter" and "a visual language before a shot list" are the same
 * sentence twice; the desk is what the statement was describing. Rendered a
 * screen apart they were a claim and then its illustration — §10m's lesson,
 * applied before it cost anything.
 *
 * The section is **typographic**, deliberately: it sits between a photographic
 * hero and a photographic interaction, and the page needs one place where the
 * thinking is the subject rather than the picture. Six decisions on hairlines,
 * and beside them one framing study — a single real frame with composition
 * guides drawn over it.
 *
 * **The study is not a camera interface.** No histogram, no exposure readout,
 * no focus box, no grid toggle, no shutter or aperture value — §10's rule for
 * the homepage scene, which forbade a camera/DSLR interface, holds here. What
 * is drawn is thirds, a horizon and a crop bracket: decisions made visible, not
 * a piece of software imitated.
 *
 * **Nothing is selectable.** All six sentences are on screen at once and the
 * page's interaction budget belongs to the Shot Builder — the rule Service 01
 * applies to its system and Service 02 to its campaign band.
 */
export function DirectionDesk({ id }: { id: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={SHOOTS_DIRECTION}
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
          {SHOOTS_DIRECTION.body.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 24)}
              className={`max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] ${
                i === 0 ? "text-ink/75" : "mt-6 text-ink-soft"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mt-14 md:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The six decisions ─────────────────────────────────── */}
        <div className="lg:col-span-7">
          <motion.p
            className="caps border-b border-line pb-4 text-ink-muted"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {SHOOTS_DIRECTION.axesLabel}
          </motion.p>

          <ol>
            {SHOOTS_DIRECTION.axes.map((axis, i) => (
              <motion.li
                key={axis.index}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  shown: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}
                className="sht-axis"
              >
                <span aria-hidden className="sht-axis-tick" />
                <span className="caps sht-axis-index text-ink-muted">
                  {axis.index}
                </span>
                <h3 className="sht-axis-name font-display text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                  {axis.name}
                </h3>
                <p className="sht-axis-note text-[0.8125rem] leading-[1.65] text-ink-soft">
                  {axis.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ── The framing study ─────────────────────────────────── */}
        <motion.div
          className="mt-12 lg:col-span-3 lg:col-start-10 lg:mt-0"
          variants={{ hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <p className="caps border-b border-line pb-4 text-ink-muted">
            {SHOOTS_DIRECTION.studyLabel}
          </p>

          <div className="sht-study">
            <ShootFrame
              creatorId="vishnu"
              kind="portrait"
              aspect="4 / 5"
              size="md"
              described
            />

            {/* Thirds, a horizon and a crop bracket. Decisions made visible —
                not a viewfinder, and not a piece of software. */}
            <span aria-hidden className="sht-guides">
              <span className="sht-guide sht-guide--v" style={{ left: "33.333%" }} />
              <span className="sht-guide sht-guide--v" style={{ left: "66.667%" }} />
              <span className="sht-guide sht-guide--h" style={{ top: "33.333%" }} />
              <span className="sht-guide sht-guide--h" style={{ top: "66.667%" }} />
              <span className="sht-bracket">
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span key={c} className={`sht-bracket-tick sht-bracket-tick--${c}`} />
                ))}
              </span>
            </span>
          </div>

          <p className="mt-5 max-w-[40ch] text-[0.75rem] leading-[1.7] text-ink-muted">
            {SHOOTS_DIRECTION.studyNote}
          </p>
        </motion.div>
      </motion.div>
    </ServiceSection>
  );
}
