"use client";

import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import {
  WEB_BUILD_COPY,
  WEB_BUILD_FAMILIES,
  WEB_BUILD_HANDOFF,
  WEB_BUILD_RAIL,
  type CapabilityFamily,
} from "@/config/service-web";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { CapabilityStage, type StateId } from "./CapabilityStage";

/**
 * 03 / WHAT WE BUILD — the capability explorer.
 *
 * The section that has to answer *"what can Mishram actually build for us?"*
 * across thirty-three categories of work without becoming a directory. It does
 * it by refusing to treat them as thirty-three things: they are three families
 * of one capability, and the composition beside them is **one product
 * architecture that transforms** rather than three illustrations that swap.
 *
 * ── THE ARCHITECTURE DECISION: SCROLL-DRIVEN, DISCRETE STATE ──────────────
 *
 * Sticky scroll-driven on desktop, because the section's thesis is
 * *transformation, not replacement*, and a tab component gives the visitor a
 * before and an after with nothing between them. Three slots down a pinned
 * track hand one object from state to state, and the reframe is the argument.
 *
 * **But the state itself is discrete, not scroll-linked**, and that is the
 * important half. Scroll sets an index once per boundary — three React updates
 * for the whole section — and the transformation is a CSS transition on the
 * regions' geometry. See `CapabilityStage` for the four reasons, of which the
 * one specific to this page is that **nothing here reads a scroll MotionValue
 * for a visual property**, so the `accelerate` / ScrollTimeline defect
 * documented in `scroll-range.ts` cannot recur.
 *
 * ── THE THRESHOLD IS HIGHER THAN THE SECTION ABOVE IT ─────────────────────
 *
 * `DigitalWork` pins from 1024. This does not, and the difference is real:
 * that section pins one image beside a short meta column, while this one needs
 * a category index, a twelve-row matrix *and* a composition in the same 100svh
 * panel. At 1024×768 that is cramped, so the threshold is **1200**, and
 * 1024×768 gets the stacked sequence — which is the better composition there,
 * not a degraded one.
 *
 * ── MOBILE IS NOT THE DESKTOP LAYOUT SHRUNK ───────────────────────────────
 *
 * No tabs, no taps, nothing behind a control. All three families render in
 * sequence — label, title, description, composition, flow, matrix — so every
 * capability on the page is reachable by scrolling and by a screen reader. It
 * is also what ships in the HTML (`useMediaQuery` returns `false` on the
 * server) and what a reduced-motion visitor gets.
 */

/**
 * Pinning needs room for three things side by side, not two. 1200 is where the
 * four-column index and the seven-column stage both stop being cramped; below
 * it the stacked sequence is simply the better layout.
 */
const STICKY_QUERY =
  "(min-width: 1200px) and (min-height: 720px) and (min-aspect-ratio: 5 / 4)";

/** Scroll distance, in vh, each family holds the pinned stage for. */
const STATE_SCROLL_VH = 72;

/** `id` on the slot marker a category's index row links to. */
const slotId = (id: string) => `build-${id}`;

/* ── The flow rail ──────────────────────────────────────────────── */

function FlowRail({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "caps flex flex-wrap items-center gap-x-2 gap-y-2 tracking-[0.16em] text-ink-muted",
        className,
      )}
    >
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden className="text-ink-muted/60">
              &rarr;
            </span>
          ) : null}
          <span className="web-flow-step">{step}</span>
        </span>
      ))}
    </p>
  );
}

/* ── The capability matrix ──────────────────────────────────────── */

function Matrix({
  family,
  onPreview,
  onClear,
}: {
  family: CapabilityFamily;
  /** A row with its own flow lends it to the rail while it is hovered. */
  onPreview?: (flow: readonly string[] | null) => void;
  onClear?: () => void;
}) {
  return (
    <ul className="web-matrix" onPointerLeave={onClear}>
      {family.capabilities.map((capability) => (
        <li
          key={capability.name}
          className="web-matrix-item caps"
          /* Focusable only where focusing does something. The stacked sequence
             renders the matrix without a rail to update, and a tab stop that
             changes nothing is a tab stop that should not exist. */
          tabIndex={capability.flow && onPreview ? 0 : undefined}
          onPointerEnter={
            capability.flow ? () => onPreview?.(capability.flow ?? null) : undefined
          }
          onFocus={
            capability.flow ? () => onPreview?.(capability.flow ?? null) : undefined
          }
          onBlur={capability.flow ? onClear : undefined}
        >
          <span aria-hidden className="web-matrix-mark" />
          <span className="min-w-0">{capability.name}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Sticky: three slots, one transforming object ───────────────── */

function StickyExplorer() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const count = WEB_BUILD_FAMILIES.length;

  /**
   * The section's only scroll-derived state, and it changes **once per family
   * boundary** — two updates across the whole track. Everything visual is a
   * CSS transition off this value, so no scroll MotionValue reaches a style
   * property anywhere in this section.
   */
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  /** A hovered capability's flow, borrowed until the pointer leaves. */
  const [preview, setPreview] = useState<readonly string[] | null>(null);
  const clearPreview = useCallback(() => setPreview(null), []);

  const family = WEB_BUILD_FAMILIES[index];
  const flow = preview ?? family.flow;

  return (
    <div
      ref={track}
      className="relative mt-14 md:mt-16 lg:mt-20"
      style={{ height: `calc(100svh + ${count * STATE_SCROLL_VH}vh)` }}
    >
      {/* Zero-size anchors at each family's scroll offset. They make the index
          rows real links to a position rather than buttons that script the
          scroll — native anchor navigation, per §10's scroll rule. */}
      {WEB_BUILD_FAMILIES.map((f, i) => (
        <span
          key={f.id}
          id={slotId(f.id)}
          aria-hidden
          className="web-slot"
          style={{ top: `${i * STATE_SCROLL_VH}vh` }}
        />
      ))}

      <div className="sticky top-0 flex h-[100svh] items-center pt-[var(--header-h)] pb-10">
        <div className="grid w-full grid-cols-12 items-center gap-x-8">
          {/* ── The index, and the active family's matrix ─────────
              Five columns, not four, and the reason is measured: at four the
              matrix got 174px per column at 1280, and `MEMBERSHIP PLATFORMS`,
              `PERSONAL BRAND SITES`, `E-COMMERCE WEBSITES` and `APPOINTMENT
              SYSTEMS` all wrapped to two lines. Five gives 224px — 45px of
              slack on the longest name — so the index survives a font
              fallback and a longer future entry. Column six stays empty as the
              gutter between the two halves. */}
          <div className="col-span-5">
            <ul>
              {WEB_BUILD_FAMILIES.map((f, i) => {
                const on = i === index;
                return (
                  /* The family name is a real `h3`, matching the stacked
                     sequence — the two layouts must not expose a different
                     document outline. The link inside it is the navigation;
                     the heading is the content. */
                  <li key={f.id} className="web-cap-row" data-on={on ? "true" : "false"}>
                    <h3 className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className={clsx(
                          "caps w-6 shrink-0 text-[0.5625rem] transition-colors duration-[420ms]",
                          on ? "text-accent" : "text-ink-muted",
                        )}
                      >
                        {f.index}
                      </span>
                      <a
                        href={`#${slotId(f.id)}`}
                        aria-current={on ? "true" : undefined}
                        className={clsx(
                          "web-cap-name inline-block py-2 font-display font-medium tracking-[-0.034em]",
                          on
                            ? "text-[clamp(1.6rem,2.4vw,2.25rem)] leading-[1.05] text-ink"
                            : "text-[clamp(1.25rem,1.7vw,1.6rem)] leading-[1.1] text-ink/45",
                        )}
                      >
                        {f.name}
                      </a>
                    </h3>

                    {/* The metadata belongs to the selected row only — three
                        rows of it would be a table of contents. */}
                    <p
                      className={clsx(
                        "caps mt-1 block pl-10 text-ink-muted transition-opacity duration-[420ms]",
                        on ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {f.meta}
                    </p>

                    <span aria-hidden className="mt-3 block pl-10">
                      <span className="web-cap-mark" />
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-ink/70">
              {family.description}
            </p>

            {/* Every family's matrix is mounted so the whole capability index
                is real text in the document; the two that are not on screen
                are `inert`, which takes them out of the tab order and the
                accessibility tree at the same time — the `DigitalWork`
                pattern. */}
            <div className="mt-8 grid">
              {WEB_BUILD_FAMILIES.map((f, i) => (
                <div
                  key={f.id}
                  inert={i !== index}
                  style={{ gridArea: "1 / 1" }}
                  className={clsx(
                    "transition-opacity duration-[520ms] ease-[var(--ease-out-expo)]",
                    i === index ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <Matrix
                    family={f}
                    onPreview={setPreview}
                    onClear={clearPreview}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── The object ──────────────────────────────────────── */}
          <div className="col-span-6 col-start-7">
            <CapabilityStage active={family.id as StateId} />

            <div className="mt-6">
              <span aria-hidden className="block h-px w-full bg-line" />
              <FlowRail steps={flow} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stacked: the same three families, read rather than driven ──── */

function StackedExplorer() {
  return (
    <div className="mt-10 flex flex-col gap-14 sm:gap-16 md:mt-16 md:gap-24">
      {WEB_BUILD_FAMILIES.map((family) => (
        <motion.div
          key={family.id}
          id={slotId(family.id)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex items-baseline gap-4 border-b border-line pb-4">
            <span aria-hidden className="caps text-[0.5625rem] text-accent">
              {family.index}
            </span>
            <h3 className="font-display text-[clamp(1.5rem,5.2vw,2.1rem)] leading-[1.05] font-medium tracking-[-0.034em] text-ink">
              {family.name}
            </h3>
          </div>

          <p className="caps mt-4 text-ink-muted">{family.meta}</p>

          <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-ink/70">
            {family.description}
          </p>

          {/* Each block draws the object locked to its own state, so the three
              read as one architecture in three configurations rather than as
              three pictures. */}
          <div className="mt-6 sm:mt-9">
            <CapabilityStage active={family.id as StateId} />
          </div>

          <div className="mt-5">
            <span aria-hidden className="block h-px w-full bg-line" />
            <FlowRail steps={family.flow} className="mt-4" />
          </div>

          <div className="mt-6 sm:mt-9">
            <Matrix family={family} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── The handoff ────────────────────────────────────────────────── */

function Handoff() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="mt-14 border-t border-line pt-8 sm:mt-16 sm:pt-10 md:mt-24"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <p className="caps text-ink-muted lg:col-span-4">
          {WEB_BUILD_HANDOFF.label}
        </p>

        {/* Where the last state's escaping connectors go. No heading, no copy
            and no CTA — the chapter that answers this has not been built, and
            a placeholder for it would be exactly the thing §10o warns against. */}
        <div className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <ul className="web-handoff-rail">
            {WEB_BUILD_HANDOFF.terms.map((term, i) => (
              <motion.li
                key={term}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
                className="web-handoff-term"
              >
                <span aria-hidden className="web-handoff-dot" />
                <span className="font-display text-[clamp(1.05rem,1.8vw,1.5rem)] leading-none font-medium tracking-[-0.03em] text-ink/70">
                  {term}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function WhatWeBuild({ id }: { id: string }) {
  const reduced = usePrefersReducedMotion();
  /**
   * `false` on the server, so the stacked sequence is what ships in the HTML
   * and what a client without JavaScript keeps. Reduced motion takes the same
   * path: a pinned track is scroll position driving a layout, which is
   * precisely what the setting asks us not to do.
   */
  const sticky = useMediaQuery(STICKY_QUERY, false) && !reduced;

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <ServiceSectionHead id={`${id}-title`} copy={WEB_BUILD_COPY} />

      {/* The three families named before they are explained — the same rail
          grammar the hero closes on. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-10"
      >
        <span aria-hidden className="mb-4 block h-px w-14 bg-line" />
        <p className="caps flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-muted">
          {WEB_BUILD_RAIL.map((word, i) => (
            <span key={word} className="flex items-center gap-3">
              {i > 0 ? (
                <span aria-hidden className="text-ink-muted/50">
                  /
                </span>
              ) : null}
              <span>{word}</span>
            </span>
          ))}
        </p>
      </motion.div>

      <div data-layout={sticky ? "sticky" : "stacked"}>
        {sticky ? <StickyExplorer /> : <StackedExplorer />}
      </div>

      <Handoff />
    </ServiceSection>
  );
}
