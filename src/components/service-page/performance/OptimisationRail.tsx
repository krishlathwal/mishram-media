"use client";

import { motion } from "motion/react";

import { PERFORMANCE_OPTIMISATION } from "@/config/service-performance";

import { EASE } from "../ServiceSection";

/**
 * WHAT WE OPTIMISE — five thin tracks, and not one number on any of them.
 *
 * This is the moment a performance page normally fills with a dashboard, and
 * the reason it does not here is simple: Mishram has no account data it may
 * publish, so every figure would be invented, and an invented figure on this
 * page is a business claim. What can honestly be shown is the *shape* of the
 * work — five things that can change, each moving through the same three
 * states.
 *
 * **Test → Learn → Adjust, drawn as position on a track.** No axis, no scale,
 * no percentage, no gauge, no red/green. The teal segment reaches the third
 * state because that is where a round ends, not because anything was measured.
 *
 * **A closing movement of the performance path, not a section of its own.** The
 * path draws the loop; this names what the loop is allowed to change. Read as
 * two chapters they repeated each other's nouns a screen apart — distribution,
 * destination and creative in both — which reads as a page saying the same
 * thing twice rather than at two altitudes.
 *
 * DELIBERATELY NOT A REPEAT OF THE TEST BENCH either, which is the other risk
 * here. The bench is about **what a single experiment varies** inside one
 * round; this is about **what changes between rounds**, and it includes things
 * a creative test never touches — how the media is structured, and how often
 * anything is allowed to change at all. The lead says so on the page.
 */
export function OptimisationRail() {
  const { tracks, states } = PERFORMANCE_OPTIMISATION;

  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="mt-14 border-t border-line pt-10 md:mt-16 md:pt-12"
    >
      <p className="caps flex items-center gap-3 text-ink">
        <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
        {PERFORMANCE_OPTIMISATION.label}
      </p>
      <h3 className="mt-5 max-w-[52ch] font-display text-[clamp(1.3rem,2.1vw,1.8rem)] leading-[1.1] font-medium tracking-[-0.032em] text-ink">
        {PERFORMANCE_OPTIMISATION.headline}
      </h3>
      <p className="mt-5 max-w-[58ch] text-[0.875rem] leading-[1.7] text-ink-soft">
        {PERFORMANCE_OPTIMISATION.lead}
      </p>

      <div className="mt-10">
        {/* The three states, named once at the head of the tracks rather than
            repeated on every row. From `lg` the header shares the tracks' own
            grid, so each state sits over the mark it names. */}
        <motion.div
          className="pfm-states-row"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span aria-hidden className="pfm-states-spacer" />
          <span aria-hidden className="pfm-states-spacer" />
          <ol className="pfm-states caps text-ink-muted">
            {states.map((state, i) => (
              <li key={state}>
                <span
                  className={i === states.length - 1 ? "text-accent" : undefined}
                >
                  {state}
                </span>
              </li>
            ))}
          </ol>
          <span aria-hidden className="pfm-states-spacer" />
        </motion.div>

        {/* No top rule here — the states header above already closes on one,
            and two hairlines a pixel apart is a seam, not a rhythm. */}
        <ol>
          {tracks.map((track, i) => (
            <motion.li
              key={track.index}
              variants={{
                hidden: { opacity: 0, y: 12 },
                shown: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
              className="pfm-track"
            >
              <span className="caps pfm-track-index text-ink-muted">
                {track.index}
              </span>

              {/* h4: these sit under the rail's own h3, which sits under the
                  section's h2. The outline stays honest at every level. */}
              <h4 className="pfm-track-name font-display text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                {track.name}
              </h4>

              {/* The track itself: a hairline with three marks on it, the last
                  of them teal. Nothing is measured and nothing is scaled. */}
              <span aria-hidden className="pfm-track-line">
                <motion.span
                  className="pfm-track-fill"
                  variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.08,
                    ease: EASE,
                  }}
                />
                {states.map((state, s) => (
                  <span
                    key={state}
                    className="pfm-track-mark"
                    data-last={s === states.length - 1 ? "true" : undefined}
                    style={{ left: `${(s / (states.length - 1)) * 100}%` }}
                  />
                ))}
              </span>

              <p className="pfm-track-note text-[0.8125rem] leading-[1.65] text-ink-soft">
                {track.note}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
