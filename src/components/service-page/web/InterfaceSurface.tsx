"use client";

import clsx from "clsx";
import { motion } from "motion/react";

/**
 * THE PAGE'S SMALLEST UNIT — one abstract interface.
 *
 * Service 03 has `CreativeSurface`; this is its counterpart, and it exists for
 * the same reason. A web page has to draw interfaces constantly, and every one
 * of them is an opportunity to fabricate something. So none of these contain
 * words, imagery, logos, product names or **numbers**. What is left is exactly
 * what interface design actually decides — hierarchy, proportion, where the
 * media sits and where the ask sits — which is the honest thing to draw.
 *
 * Four registers of the same object, and the sequence between them *is* the
 * page's thesis: **structure → interface → responsive → component.**
 *
 * - `WireSurface` — the layout before it is anything. Dashed hairlines only.
 * - `SiteSurface` — the same layout, resolved. Masthead, editorial column,
 *   media region, primary action, supporting row.
 * - `MobileSurface` — genuinely re-laid-out for a narrow viewport, not shrunk.
 * - `ComponentSurface` — one piece of an application in isolation.
 *
 * `SiteSurface` and `MobileSurface` are deliberately the **same drawing** the
 * homepage's `WebDigitalScene` already makes, down to the masthead weights and
 * the 40/40 editorial split. A visitor arriving from `02 / What We Do` should
 * recognise the object, not meet a second one.
 *
 * Inner padding and gaps are percentages of the surface's own width — §10j's
 * fragment lesson — but the row *heights* stay in absolute pixels, which is
 * what stops nested interface chrome going microscopic on a phone (§10).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Shared entry for content that resolves after its surface has arrived. */
function resolveIn(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, delay, ease: EASE },
  } as const;
}

/* ── Structure ──────────────────────────────────────────────────── */

/**
 * The layout as a drawing. It sits behind and above-left of the finished
 * interface, so the two read as one object at two stages rather than as two
 * mockups — the "idea → structure" half of the hero's argument.
 */
export function WireSurface({ className }: { className?: string }) {
  return (
    <div className={clsx("web-surface web-surface--wire", className)}>
      <div className="relative h-full w-full p-[7%]">
        {/* Column guides — the drawing's own grid, at grid weight. */}
        <div aria-hidden className="absolute inset-y-[7%] inset-x-[7%] flex justify-between">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="block h-full w-px bg-grid" />
          ))}
        </div>

        <div className="relative flex h-full w-full flex-col gap-[6%]">
          <span className="block h-[9px] w-full border border-dashed border-line" />
          <div className="flex flex-1 gap-[6%]">
            <span className="block h-full flex-[0.9] border border-dashed border-line" />
            <span className="block h-full flex-1 border border-dashed border-line" />
          </div>
          <div className="flex gap-[4%]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[13px] flex-1 border border-dashed border-line"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Interface ──────────────────────────────────────────────────── */

/**
 * The primary viewport, and the composition's anchor.
 *
 * **No browser chrome**, for the reason §10 gives: this is a site, not a
 * screenshot of one. `delay` offsets the internal resolve so the interface
 * fills in after its own surface has arrived — the structure appears, then it
 * becomes an interface.
 */
export function SiteSurface({
  delay = 0,
  className,
  aspect = "16 / 10",
}: {
  delay?: number;
  className?: string;
  aspect?: string;
}) {
  return (
    /* The full surface register, not `--plan`: this is the composition's
       anchor and it has to sit forward of the structure behind it. On obsidian
       the `--plan` fill is within a percent or two of the canvas, which left
       the primary viewport reading as one more faint rectangle. */
    <div
      className={clsx("web-surface", className)}
      style={{ aspectRatio: aspect }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* The interior grid — the same discipline as the page around it. */}
        <motion.div
          aria-hidden
          {...resolveIn(delay)}
          className="absolute inset-0 flex justify-between px-[6%]"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="block h-full w-px bg-ink/[0.028]" />
          ))}
        </motion.div>

        {/* Masthead */}
        <motion.div
          {...resolveIn(delay + 0.08)}
          className="absolute inset-x-0 top-0 flex items-center justify-between px-[6%] py-[4%]"
        >
          <span className="block h-[5px] w-[13%] rounded-[1px] bg-ink/45" />
          <span className="flex items-center gap-[10px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-[3px] w-[16px] bg-ink/18" />
            ))}
            <span className="ml-[6px] block h-[11px] w-[34px] rounded-[2px] border border-line" />
          </span>
        </motion.div>

        <motion.span
          aria-hidden
          {...resolveIn(delay + 0.08)}
          className="absolute inset-x-[6%] top-[15%] block h-px bg-line"
        />

        {/* Editorial column. The hierarchy resolves top-down, so the headline
            lands before the body and the action lands last. */}
        <div className="absolute top-[24%] bottom-[26%] left-[6%] flex w-[40%] flex-col justify-center gap-[7%]">
          <motion.span
            {...resolveIn(delay + 0.18)}
            className="block h-[9px] w-full rounded-[1px] bg-ink/40"
          />
          <motion.span
            {...resolveIn(delay + 0.24)}
            className="block h-[9px] w-[78%] rounded-[1px] bg-ink/30"
          />
          <motion.span
            {...resolveIn(delay + 0.34)}
            className="mt-[4%] block h-[3px] w-[88%] bg-ink/14"
          />
          <motion.span
            {...resolveIn(delay + 0.38)}
            className="block h-[3px] w-[64%] bg-ink/14"
          />
          {/* The ask. Teal because it is the action, not because anything was
              measured — and it is the last thing to arrive. */}
          <motion.span
            initial={{ opacity: 0, scaleX: 0.88 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: delay + 0.52, ease: EASE }}
            className="mt-[8%] block h-[17px] w-[52%] origin-left rounded-[2px] bg-accent/80"
          />
        </div>

        {/* Media region. A composition, not a placeholder for a photograph. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: delay + 0.28, ease: EASE }}
          className="web-media absolute top-[22%] right-[6%] bottom-[24%] w-[40%] overflow-hidden"
        />

        {/* Supporting row */}
        <motion.div
          {...resolveIn(delay + 0.44)}
          className="absolute inset-x-[6%] bottom-[7%]"
        >
          <span className="mb-[10px] block h-px w-full bg-line" />
          <div className="flex gap-[3%]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[15px] flex-1 rounded-[2px] border border-line"
                style={{ opacity: 1 - i * 0.22 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Responsive ─────────────────────────────────────────────────── */

/**
 * The same design family, **re-laid out** for a narrow viewport rather than
 * scaled down — which is the whole claim the surface exists to make. The
 * headline stacks above the media, and the action goes full width.
 */
export function MobileSurface({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx("web-surface web-surface--lift", className)}
      style={{ aspectRatio: "9 / 19" }}
    >
      <motion.div
        {...resolveIn(delay)}
        className="flex h-full w-full flex-col gap-[5%] p-[9%]"
      >
        <div className="flex items-center justify-between">
          <span className="block h-[3px] w-[38%] rounded-[1px] bg-ink/45" />
          <span className="flex flex-col gap-[2px]">
            {[0, 1].map((i) => (
              <span key={i} className="block h-[2px] w-[9px] bg-ink/25" />
            ))}
          </span>
        </div>

        <span className="block h-px w-full bg-line" />

        <span className="block h-[6px] w-full rounded-[1px] bg-ink/38" />
        <span className="block h-[6px] w-[70%] rounded-[1px] bg-ink/26" />

        <span className="web-media mt-[3%] block w-full flex-1" />

        <motion.span
          initial={{ opacity: 0, scaleX: 0.9 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: delay + 0.3, ease: EASE }}
          className="mt-[2%] block h-[11px] w-full origin-left rounded-[2px] bg-accent/80"
        />
        <span className="block h-[2px] w-[60%] bg-ink/14" />
      </motion.div>
    </div>
  );
}

/* ── Product ────────────────────────────────────────────────────── */

/**
 * One piece of an application, in isolation — the "product" end of the hero's
 * sequence, and the surface that carries the software half of this service
 * without the composition turning into a dashboard.
 *
 * **Not a dashboard, and never a CRM screen.** §10 rules that out for the
 * homepage scene and the same rule holds here: no table, no admin chrome, no
 * record, no figure. A label, an input, a state pair and an action — the
 * smallest honest evidence that we build things with logic behind them.
 */
export function ComponentSurface({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx("web-surface web-surface--lift", className)}
      style={{ aspectRatio: "5 / 4" }}
    >
      <motion.div
        {...resolveIn(delay)}
        className="flex h-full w-full flex-col justify-center gap-[8%] p-[11%]"
      >
        <span className="block h-[2px] w-[34%] bg-ink/22" />

        {/* An input, with focus resolved on it. */}
        <span className="relative block h-[16px] w-full rounded-[2px] border border-line-strong">
          <motion.span
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.34, ease: EASE }}
            className="absolute top-[3px] bottom-[3px] left-[7%] block w-px bg-accent"
          />
        </span>

        {/* A state pair. One of two, chosen — logic, drawn at its smallest. */}
        <span className="flex items-center gap-[6%]">
          <span className="block h-[9px] w-[9px] rounded-full border border-line-strong" />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.46, ease: EASE }}
            className="block h-[9px] w-[9px] rounded-full bg-accent"
          />
          <span className="block h-[2px] flex-1 bg-line" />
        </span>

        <motion.span
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.56, ease: EASE }}
          className="block h-[13px] w-[62%] origin-left rounded-[2px] bg-accent/80"
        />
      </motion.div>
    </div>
  );
}
