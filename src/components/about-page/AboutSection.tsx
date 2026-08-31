"use client";

import clsx from "clsx";
import { motion } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The About page's own section shell.
 *
 * **Deliberately not `ServiceSection`.** The service pages are a system of
 * interactive chapters; this route is an editorial archive, and borrowing their
 * shell is the fastest way to make it read as a sixth service page. What is
 * shared is the design system — tokens, hairlines, `.caps`, the padding scale —
 * not the components.
 *
 * One step tighter than the homepage's `lg:py-32`, matching the service pages'
 * reasoning: this route has more chapters than the homepage, so the boundaries
 * have to work harder per pixel.
 */
export function AboutSection({
  id,
  labelledBy,
  grid = "none",
  className,
  children,
}: {
  id: string;
  labelledBy?: string;
  /** `full` draws the twelve-column scaffold; `edges` keeps only the outer two. */
  grid?: "full" | "edges" | "none";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={clsx(
        "relative w-full border-t border-line bg-canvas",
        className,
      )}
    >
      {grid !== "none" ? <Grid mode={grid} /> : null}
      <div className="page-x relative py-14 sm:py-16 md:py-24 lg:py-24">
        {children}
      </div>
    </section>
  );
}

function Grid({ mode }: { mode: "full" | "edges" }) {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div
        className={clsx(
          "grid h-full grid-cols-12",
          // The archive's rhythm change: two rules holding the field rather
          // than twelve running through it. §10d-notes made the same move for
          // the same reason — typography is the architecture here.
          mode === "edges" && "[&>span:not(:first-child):not(:last-child)]:opacity-0",
        )}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}

/**
 * Label, clipped two-line headline with one serif accent, and a lead — the
 * page's repeating opening beat. The accent sits on the **trailing** word, as
 * the numbered homepage chapters do.
 */
export function AboutSectionHead({
  id,
  label,
  headline,
  accentWord,
  lead,
  className,
}: {
  id?: string;
  label: string;
  headline: readonly string[];
  accentWord?: string;
  lead?: string;
  className?: string;
}) {
  const [line1, line2] = headline;
  const accentAt = accentWord ? line2.indexOf(accentWord) : -1;
  const leadIn = accentAt === -1 ? line2 : line2.slice(0, accentAt);

  return (
    <div className={className}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="caps flex items-center gap-3 text-ink-muted"
      >
        <span aria-hidden className="block h-px w-6 bg-accent" />
        {label}
      </motion.p>

      <motion.h2
        id={id}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-12% 0px" }}
        className="mt-7 max-w-[min(92vw,30rem)] font-display text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink"
      >
        {[line1, line2].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.9, delay: 0.06 + i * 0.08, ease: EASE }}
              className="block"
            >
              {i === 0 || accentAt === -1 ? (
                line
              ) : (
                <>
                  {leadIn}
                  <span className="font-accent italic">{accentWord}</span>
                </>
              )}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {lead ? (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          className="mt-7 max-w-[52ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72"
        >
          {lead}
        </motion.p>
      ) : null}
    </div>
  );
}
