"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import type { ServiceSectionCopy } from "@/config/service-pages";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SHARED SERVICE-PAGE SECTION SHELL
 *
 * The part of a service page that must be identical across all five: the
 * section wrapper, its vertical rhythm, its grid behaviour, and the
 * label / headline / lead block at the top of it.
 *
 * **What it deliberately does not own is the visual.** Everything below the
 * head is `children` — a page's hero composition, its signature interaction and
 * its proof section stay art-directed React, which is what stops the five pages
 * being one template rendered five times.
 */

/* ── The grid ──────────────────────────────────────────────────────
   The page inherits the homepage's twelve-column scaffold but does not draw
   the same twelve lines from top to bottom, which is what made the homepage's
   own §10a and §10d-notes reductions read as deliberate. Here the rhythm is
   per section: structured where the content is structural, reduced where it is
   editorial, absent where a composition is the structure. */

export type ServiceGridMode = "full" | "edges" | "none";

export function ServiceGrid({ mode = "full" }: { mode?: ServiceGridMode }) {
  if (mode === "none") return null;

  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div
        className={clsx(
          "grid h-full grid-cols-12",
          mode === "edges" && "svp-grid--edges",
        )}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}

/* ── The section wrapper ───────────────────────────────────────── */

export function ServiceSection({
  id,
  labelledBy,
  grid = "full",
  bordered = true,
  className,
  children,
}: {
  id: string;
  labelledBy?: string;
  grid?: ServiceGridMode;
  /** A chapter rule at the top. Off where a section continues the one above. */
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={clsx(
        "relative w-full bg-canvas",
        bordered && "border-t border-line",
        className,
      )}
    >
      <ServiceGrid mode={grid} />
      {/* One padding scale for every section on every service page, so the
          chapter boundaries are a constant the way the homepage's 256px ones
          are. Slightly tighter than the homepage's `lg:py-32`: this page has
          ten sections rather than a pinned sequence, and 32px per boundary is
          most of a viewport across the route. */}
      <div className="page-x relative py-24 md:py-28 lg:py-28">{children}</div>
    </section>
  );
}

/* ── The head ──────────────────────────────────────────────────── */

/**
 * Puts the serif italic on whichever line actually contains the accent word, so
 * copy can carry it on a leading word (the homepage's interludes) or a trailing
 * one (its numbered chapters) without a second component.
 */
function withAccent(line: string, accent?: string) {
  if (!accent) return line;
  const i = line.indexOf(accent);
  if (i === -1) return line;

  return (
    <>
      {line.slice(0, i)}
      <span className="font-accent italic">{accent}</span>
      {line.slice(i + accent.length)}
    </>
  );
}

export function ServiceSectionHead({
  id,
  copy,
  lead: leadPlacement = "beside",
  className,
}: {
  id: string;
  copy: ServiceSectionCopy;
  /** `beside` puts the lead to the right at `lg`; `below` keeps it under. */
  lead?: "beside" | "below";
  className?: string;
}) {
  const [line1, line2] = copy.headline;

  return (
    <div className={className}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex items-center gap-3"
      >
        {/* A short teal rule rather than a number: the chapter index belongs to
            the homepage's sequence, and this page's sections are not chapters
            of it. */}
        <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
        <span className="text-ink">{copy.label}</span>
      </motion.p>

      <div
        className={clsx(
          "mt-8 flex flex-col gap-x-16 gap-y-7 md:mt-10",
          leadPlacement === "beside" &&
            "lg:flex-row lg:items-end lg:justify-between",
        )}
      >
        {/* The trigger sits on the heading, never on the clipped lines: a line
            translated outside its overflow-hidden parent never intersects the
            viewport, so it would never fire on its own (§4). Variants
            propagate down. */}
        <motion.h2
          id={id}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,34rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
        >
          {[line1, line2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
                className="block"
              >
                {withAccent(line, copy.accentWord)}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {copy.lead ? (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className={clsx(
              "text-[0.8125rem] leading-[1.7] text-ink-soft",
              leadPlacement === "beside"
                ? "max-w-[46ch] lg:max-w-[34ch] lg:pb-2"
                : "max-w-[58ch]",
            )}
          >
            {copy.lead}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
