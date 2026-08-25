"use client";

import { motion } from "motion/react";

import { SHOOTS_FORMATS } from "@/config/service-shoots";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { ShootFrame } from "./ShootFrame";

/**
 * ONE PRODUCTION, MANY FORMATS — and where each one goes.
 *
 * **Two movements in one section.** The format system first: one source frame,
 * four crops of it, each a different shape. Then the output rail: the five
 * places that content actually has to appear. A format without a destination is
 * just a crop, and a list of destinations without the formats is a list of
 * words — drafted apart they repeated each other's nouns a screen apart, which
 * is exactly what §10m's two merges were for.
 *
 * **The demonstration is literal, and that is the point.** Every crop is the
 * *same photograph* — one file, four aspect ratios — so the section proves its
 * own claim rather than asserting it. It is also why this page can be the most
 * photographic one on the site while the whole library is five source files:
 * see the audit at the head of `config/service-shoots.ts`.
 *
 * **NO PLATFORM CHROME ANYWHERE.** No feed frame, no story bar, no phone shell,
 * no handle, no like, no comment, no view count, no play control. The crops are
 * the content and nothing surrounds them but a hairline and a format tag.
 *
 * Aspect ratios are described as **usage** — "reels and stories", "most feeds"
 * — rather than as a platform specification, because common usage is what the
 * project can actually stand behind.
 */
export function FormatSystem({ id }: { id: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead id={`${id}-title`} copy={SHOOTS_FORMATS} />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mt-12 md:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The source ────────────────────────────────────────── */}
        <motion.div
          className="lg:col-span-4"
          variants={{ hidden: { opacity: 0, y: 18 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{SHOOTS_FORMATS.sourceLabel}</span>
            <span className="text-accent">One frame</span>
          </p>
          <div className="sht-source">
            <ShootFrame
              creatorId="zoya"
              kind="portrait"
              aspect="4 / 5"
              size="lg"
              described
            />
            <span aria-hidden className="sht-source-mark">
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span key={c} className={`sht-bracket-tick sht-bracket-tick--${c}`} />
              ))}
            </span>
          </div>
        </motion.div>

        {/* ── The four crops ────────────────────────────────────── */}
        <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <motion.p
            className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span>Cut for</span>
            <span className="text-ink/40">
              {String(SHOOTS_FORMATS.formats.length).padStart(2, "0")}
            </span>
          </motion.p>

          <ul className="sht-formats">
            {SHOOTS_FORMATS.formats.map((format, i) => (
              <motion.li
                key={format.id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  shown: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.75, delay: 0.24 + i * 0.09, ease: EASE }}
                className="sht-format"
              >
                {/* The same photograph, in a different shape. The frame crops
                    to its aspect, so the demonstration is real rather than
                    drawn. */}
                <ShootFrame
                  creatorId="zoya"
                  kind="portrait"
                  aspect={format.ratio.replace(":", " / ")}
                  size="sm"
                  className="sht-format-frame"
                />
                <span className="sht-format-body">
                  <span className="caps flex items-baseline gap-3">
                    <span className="text-accent">{format.ratio}</span>
                    <span className="text-ink-muted">{format.use}</span>
                  </span>
                  <h3 className="mt-3 font-display text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                    {format.name}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[0.8125rem] leading-[1.6] text-ink-soft">
                    {format.note}
                  </p>
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            className="mt-7 max-w-[56ch] text-[0.75rem] leading-[1.7] text-ink-muted"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {SHOOTS_FORMATS.caption}
          </motion.p>
        </div>
      </motion.div>

      {/* ── Movement two: where the content goes ────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="mt-14 border-t border-line pt-10 md:mt-16 md:pt-12"
      >
        <motion.p
          className="caps flex items-center gap-3 text-ink"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
          {SHOOTS_FORMATS.outputLabel}
        </motion.p>
        <motion.h3
          className="mt-5 max-w-[44ch] font-display text-[clamp(1.3rem,2.1vw,1.8rem)] leading-[1.1] font-medium tracking-[-0.032em] text-ink"
          variants={{ hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          {SHOOTS_FORMATS.outputHeadline}
        </motion.h3>

        <ol className="mt-9 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {SHOOTS_FORMATS.outputs.map((output, i) => (
            <motion.li
              key={output.index}
              variants={{
                hidden: { opacity: 0, y: 12 },
                shown: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, delay: 0.16 + i * 0.07, ease: EASE }}
              className="sht-output"
            >
              <span aria-hidden className="sht-output-tick" />
              <span className="caps block text-[0.5625rem] text-ink-muted">
                {output.index}
              </span>
              <h4 className="mt-4 font-display text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                {output.name}
              </h4>
              <p className="mt-3 max-w-[26ch] text-[0.8125rem] leading-[1.6] text-ink-soft">
                {output.note}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </ServiceSection>
  );
}
