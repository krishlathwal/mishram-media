"use client";

import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { SHOOTS_SELECTS } from "@/config/service-shoots";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { ShootFrame, type FrameSize } from "./ShootFrame";

/**
 * THE SELECTS — the content library, and the page's most photographic moment.
 *
 * A sheet of selects the way one actually looks: **different shapes, different
 * distances, different heights, chosen rather than collected.** Seven frames
 * across two irregular rows, with frame indices and format tags, sitting on the
 * page's own crop-mark language.
 *
 * DELIBERATELY NOT THE OTHER TWO PHOTOGRAPHIC SECTIONS ON THIS SITE:
 *
 * - Service 01's `CreatorField` is five **equal 3:4 frames** on a grid with
 *   small vertical offsets — a field of people.
 * - Service 02's `CreatorCast` is one **continuous strip at a single height**
 *   with uneven widths, abutted — a casting wall.
 * - This is neither: heights and aspects both vary, the frames are spaced, and
 *   the set reads as *selects from a shoot* rather than as a roster.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * WHAT IS CLAIMED: these are creator photographs from Mishram Media's own work,
 * shown as examples of framing and format.
 *
 * **WHAT IS NOT CLAIMED, ANYWHERE:** that they belong to one shoot, that any of
 * them was made for a client, that a brand, campaign, location, photographer,
 * camera or date is attached to any of them, or that a result followed. The
 * caption says so on the page.
 *
 * The old site's brand-shoot portfolio would have been the obvious source here
 * and **cannot be used at all** — 16 of its 19 images are betting, casino,
 * fantasy-gaming or offshore-CFD brands, which §9 permanently excludes, and all
 * 19 are hotlinked. The full audit is at the head of `config/service-shoots.ts`.
 * ════════════════════════════════════════════════════════════════════════════
 */

type Select = {
  id: string;
  creatorId: string;
  kind: "portrait" | "reel" | "content";
  aspect: string;
  size: FrameSize;
  tag: string;
  /** Column span on the wide sheet. */
  span: string;
  /** Small vertical offset, so the sheet is a sheet and not a table. */
  offset?: string;
  /** True where this photograph is described for the first time on the sheet. */
  described?: boolean;
  /** Spans the full width on a phone. */
  wide?: boolean;
};

/**
 * Two rows that do not line up, on purpose. Widths come from the column span,
 * heights from each frame's own aspect — so the bottom edges are uneven without
 * a single hand-tuned pixel.
 */
const SELECTS: readonly Select[] = [
  {
    id: "s01",
    creatorId: "zoya",
    kind: "portrait",
    aspect: "4 / 5",
    size: "lg",
    tag: "01 / 4:5",
    span: "lg:col-span-4",
    described: true,
    wide: true,
  },
  {
    id: "s02",
    creatorId: "mukul",
    kind: "reel",
    aspect: "9 / 16",
    size: "md",
    tag: "02 / 9:16",
    span: "lg:col-span-2",
    offset: "1.5rem",
    described: true,
  },
  {
    id: "s03",
    creatorId: "lovkesh",
    kind: "portrait",
    aspect: "16 / 9",
    size: "lg",
    tag: "03 / 16:9",
    span: "lg:col-span-5",
    offset: "0.5rem",
    described: true,
  },
  {
    id: "s04",
    creatorId: "nikita",
    kind: "portrait",
    aspect: "3 / 4",
    size: "md",
    tag: "04 / 3:4",
    span: "lg:col-span-3",
    offset: "1.75rem",
    described: true,
    wide: true,
  },
  {
    id: "s05",
    creatorId: "vishnu",
    kind: "reel",
    aspect: "9 / 16",
    size: "sm",
    tag: "05 / 9:16",
    span: "lg:col-span-2",
    described: true,
  },
  {
    id: "s06",
    creatorId: "mukul",
    kind: "content",
    aspect: "1 / 1",
    size: "md",
    tag: "06 / 1:1",
    span: "lg:col-span-3",
    offset: "1rem",
  },
  {
    id: "s07",
    creatorId: "vishnu",
    kind: "portrait",
    aspect: "4 / 5",
    size: "md",
    tag: "07 / 4:5",
    span: "lg:col-span-3",
    offset: "0.5rem",
  },
];

export function Selects({ id }: { id: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead
        id={`${id}-title`}
        copy={{
          label: SHOOTS_SELECTS.label,
          headline: SHOOTS_SELECTS.headline,
          accentWord: SHOOTS_SELECTS.accentWord,
          lead: SHOOTS_SELECTS.lead,
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mt-12 md:mt-14"
      >
        <motion.p
          className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span>{SHOOTS_SELECTS.sheetLabel}</span>
          <span className="text-ink/40">
            {String(SELECTS.length).padStart(2, "0")}
          </span>
        </motion.p>

        <div className="sht-selects">
          {SELECTS.map((select, i) => (
            <motion.figure
              key={select.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                shown: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.06 + i * 0.06, ease: EASE }}
              className={`sht-select-item ${select.span}${
                select.wide ? " sht-select-item--wide" : ""
              }`}
              style={{ "--sht-offset": select.offset ?? "0rem" } as React.CSSProperties}
            >
              <ShootFrame
                creatorId={select.creatorId}
                kind={select.kind}
                aspect={select.aspect}
                size={select.size}
                tag={select.tag}
                described={select.described}
              />
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <p className="max-w-[74ch] text-[0.75rem] leading-[1.7] text-ink-muted">
            {SHOOTS_SELECTS.caption}
          </p>

          {/* The route's one mid-page contextual link (§10j). A same-page hash
              on the homepage, so it stays a plain `<a>` — only a real
              navigation re-runs `useHashLanding` (§10g). */}
          <a
            href={SHOOTS_SELECTS.actionHref}
            className="group inline-flex shrink-0 items-center gap-2.5 text-[0.8125rem] leading-[1.5] text-ink-soft transition-colors duration-300 hover:text-ink"
          >
            {SHOOTS_SELECTS.action}
            <Arrow
              size={12}
              className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </a>
        </div>
      </motion.div>
    </ServiceSection>
  );
}
