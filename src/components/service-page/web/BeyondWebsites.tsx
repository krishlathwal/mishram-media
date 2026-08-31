"use client";

import clsx from "clsx";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import {
  WEB_SYSTEM_COPY,
  WEB_SYSTEM_DIRECTORY,
  WEB_SYSTEM_DIRECTORY_LABEL,
  WEB_SYSTEM_ENTRY,
  WEB_SYSTEM_HANDOFF,
  WEB_SYSTEM_INTRO,
  WEB_SYSTEM_STATEMENT,
  WEB_SYSTEM_STATES,
  type SystemStateCopy,
} from "@/config/service-web";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { SystemArchitecture } from "./SystemArchitecture";

/**
 * 04 / BEYOND WEBSITES — the perception shift.
 *
 * The chapter that has to move the visitor from *"Mishram builds premium
 * websites"* to *"Mishram can build the digital infrastructure my business
 * runs on"* — without becoming a second capability list, which §03 already is.
 *
 * ── THE INK ENVIRONMENT, AND WHY IT IS A SCOPE RATHER THAN A THEME ────────
 *
 * The section carries `web-ink`, which re-declares the same `--t-*` semantic
 * tokens at the obsidian column's values on one element. Everything inside
 * then resolves through `bg-canvas` / `text-ink` / `border-line` / `bg-accent`
 * exactly as it does everywhere else, so **not one component here references a
 * raw palette value**, and both themes are served by one rule: in light it is
 * an inversion, in dark it is a no-op and the chapter reads as continuous. In
 * dark its separation comes from structure instead — the chapter rule, the
 * frame marks and a composition more technical than anything above it.
 *
 * ── THE BRIDGE ───────────────────────────────────────────────────────────
 *
 * §03's handoff rail ends on `Workflow`. This section opens with a line that
 * starts where that one stopped, in the same grid column, labelled with the
 * event a website actually captures. The two chapters descend as one.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 *
 * Scroll chooses the state — three React updates across the whole track — and
 * every visual change is a CSS transition. Routes draw with a normalised
 * `pathLength` and a dash-offset transition. **No scroll MotionValue reaches a
 * style property**, so the `accelerate` / ScrollTimeline defect
 * `scroll-range.ts` documents cannot recur, and **no animation loops**, so
 * there is nothing to pause when the section leaves the viewport.
 */

/**
 * The same threshold §03 uses. A four-state narrative beside a fourteen-node
 * architecture needs at least as much room as a three-state one, and 1024×768
 * is better served by the stacked narrative than by a compressed split.
 */
const STICKY_QUERY =
  "(min-width: 1200px) and (min-height: 720px) and (min-aspect-ratio: 5 / 4)";

/**
 * Below this the stacked narrative becomes **one continuous system map**: a
 * spine with four checkpoints, and each state's nodes drawn as chips instead
 * of a `100 / 66` architecture fragment.
 *
 * 640 is where the fragment stops being worth its height. Four of them cost
 * 924px on a 390px screen, every box in them is already named in the copy
 * beside them, and at that width a fourteen-node plan is fourteen boxes nobody
 * can read. From 640 up there is room for the drawing and it comes back.
 */
const COMPACT_QUERY = "(max-width: 639px)";

/** Scroll distance, in vh, each state holds the pinned stage for. */
const STATE_SCROLL_VH = 56;

const slotId = (id: string) => `system-${id}`;

/* ── The bridge out of §03 ──────────────────────────────────────── */

function EntryBridge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      /* Pulled up through `ServiceSection`'s own top padding so the line
         resumes at the chapter boundary itself. §03's rail stops a padding
         above it; leaving this one a padding below would put 200px of nothing
         between two halves of the same descent. */
      className="-mt-24 md:-mt-28 lg:grid lg:grid-cols-12 lg:gap-x-8"
    >
      {/* Column six, so the line lands exactly under the rail §03 ends on. */}
      <div className="web-sys-entry lg:col-span-7 lg:col-start-6">
        <span aria-hidden className="web-sys-entry-dot" />
        <p className="caps text-accent">{WEB_SYSTEM_ENTRY.label}</p>
        <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
      </div>
      <p className="mt-4 max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:col-span-7 lg:col-start-6">
        {WEB_SYSTEM_ENTRY.note}
      </p>
    </motion.div>
  );
}

/* ── A state's copy ─────────────────────────────────────────────── */

function StateCopy({
  state,
  className,
  /**
   * The narrow layout draws this state's nodes instead of listing them, so the
   * terms rail becomes the architecture rather than a caption under it. Same
   * words, same order, same `<ul>` — only the shape changes.
   */
  asNodes = false,
}: {
  state: SystemStateCopy;
  className?: string;
  asNodes?: boolean;
}) {
  return (
    <div className={className}>
      {/* The state's name is the heading, matching §03's families — the
          document outline must not depend on which layout is in use, and
          `h2 → h3` is what four sub-chapters of one argument are. */}
      <h3 className="caps flex items-center gap-3">
        <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
        <span aria-hidden className="text-accent">{state.index}</span>
        <span aria-hidden className="text-ink-muted/50">/</span>
        <span className="text-ink">{state.name}</span>
      </h3>

      <p className="mt-4 max-w-[26ch] font-display sm:mt-6 text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.15] font-medium tracking-[-0.032em] text-ink">
        {state.lead}
      </p>

      <p className="mt-4 max-w-[44ch] text-[0.9375rem] sm:mt-5 leading-[1.7] text-ink/70">
        {state.body}
      </p>

      {/* Every node in the drawing, as real text. On the wide layouts the
          architecture beside this is `aria-hidden` and this is where the
          information actually lives; on the narrow one **this is the
          architecture** — the same five names, drawn as the boxes the diagram
          would have drawn, which is why the phone needs no diagram at all. */}
      {asNodes ? (
        <ul className="web-sys-chips mt-5">
          {state.terms.map((term) => (
            <li key={term} className="web-sys-chip caps">
              {term}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 sm:mt-7 sm:pt-5">
          {/* The divider trails its term rather than leading the next one. With
              five terms this list wraps at every width it is used at, and a
              leading divider means the second line opens on a stray hairline. */}
          {state.terms.map((term, i) => (
            <li key={term} className="flex items-center gap-5">
              <span className="caps tracking-[0.16em] text-ink-soft">{term}</span>
              {i < state.terms.length - 1 ? (
                <span aria-hidden className="block h-2.5 w-px bg-line-strong" />
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {state.callout ? (
        <div className="mt-5 border-l border-accent/50 pl-5 sm:mt-7">
          <p className="caps text-accent">{state.callout.label}</p>
          <p className="mt-2 max-w-[40ch] text-[0.875rem] leading-[1.7] text-ink/70">
            {state.callout.body}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/* ── Sticky: one architecture, four states ──────────────────────── */

function StickySystem() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const count = WEB_SYSTEM_STATES.length;

  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  return (
    <div
      ref={track}
      className="relative mt-14 md:mt-16 lg:mt-20"
      style={{ height: `calc(100svh + ${count * STATE_SCROLL_VH}vh)` }}
    >
      {WEB_SYSTEM_STATES.map((s, i) => (
        <span
          key={s.id}
          id={slotId(s.id)}
          aria-hidden
          className="web-slot"
          style={{ top: `${i * STATE_SCROLL_VH}vh` }}
        />
      ))}

      <div className="sticky top-0 flex h-[100svh] items-center pt-[var(--header-h)] pb-10">
        <div className="grid w-full grid-cols-12 items-center gap-x-8">
          {/* Every state's copy is mounted so the whole narrative is in the
              document; the three that are not on screen are `inert`, which
              takes them out of the tab order and the accessibility tree at
              once — the pattern the two sections above already use. */}
          <div className="col-span-4 grid">
            {WEB_SYSTEM_STATES.map((s, i) => (
              <div
                key={s.id}
                inert={i !== index}
                style={{ gridArea: "1 / 1" }}
                className={clsx(
                  "min-w-0 transition-opacity duration-[520ms] ease-[var(--ease-out-expo)]",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <StateCopy state={s} />
              </div>
            ))}
          </div>

          <div className="col-span-7 col-start-6">
            <SystemArchitecture active={index} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stacked: the same four states, read rather than driven ─────── */

function StackedSystem({ compact }: { compact: boolean }) {
  return (
    <div
      className={clsx(
        "mt-10 flex flex-col md:mt-16 md:gap-24",
        compact ? "web-sys-map gap-9" : "gap-12 sm:gap-16",
      )}
    >
      {WEB_SYSTEM_STATES.map((state, i) => (
        <motion.div
          key={state.id}
          id={slotId(state.id)}
          className={compact ? "web-sys-stop" : undefined}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {compact ? <span aria-hidden className="web-sys-stop-node" /> : null}

          <StateCopy state={state} asNodes={compact} />

          {/* The fragment layout, not the accumulated whole: at 360px the
              fourteen-node architecture is fourteen illegible boxes, so each
              block draws the tier its copy is about.

              **Not on a phone at all.** Four fragments at `100 / 66` cost 924px
              there, and every box in them is already named in the chips above —
              so the phone gets one continuous spine with four checkpoints
              instead of four separate drawings of the same idea. */}
          {compact ? null : (
          <div className="mt-6 sm:mt-9">
            <SystemArchitecture active={i} narrow />
          </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── The pause ──────────────────────────────────────────────────── */

function Statement() {
  const [first, second] = WEB_SYSTEM_STATEMENT.lines;
  const accent = WEB_SYSTEM_STATEMENT.accentWord;
  const at = second.indexOf(accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="mt-14 border-t border-line pt-10 sm:mt-16 sm:pt-12 md:mt-24 md:pt-16"
    >
      <p className="max-w-[min(92vw,30ch)] font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.08] font-medium tracking-[-0.035em] text-ink">
        <span className="block">{first}</span>
        <span className="block">
          {at === -1 ? (
            second
          ) : (
            <>
              {second.slice(0, at)}
              <span className="font-accent italic">{accent}</span>
              {second.slice(at + accent.length)}
            </>
          )}
        </span>
      </p>
      <p className="mt-7 max-w-[54ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
        {WEB_SYSTEM_STATEMENT.support}
      </p>
    </motion.div>
  );
}

/* ── The directory ──────────────────────────────────────────────── */

function Directory() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="mt-14 sm:mt-16 md:mt-24"
    >
      <p className="caps flex items-center gap-3 text-ink-muted">
        <span aria-hidden className="block h-px w-6 shrink-0 bg-line-strong" />
        <span>{WEB_SYSTEM_DIRECTORY_LABEL}</span>
      </p>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 sm:mt-10 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {WEB_SYSTEM_DIRECTORY.map((group) => (
          <div key={group.id} className="web-dir-group">
            <p className="flex items-baseline gap-3">
              <span aria-hidden className="caps text-[0.5625rem] text-accent">
                {group.index}
              </span>
              <span className="font-display text-[1.0625rem] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                {group.name}
              </span>
            </p>
            <ul className="mt-4">
              {group.items.map((item) => (
                <li key={item} className="web-dir-item caps">
                  <span aria-hidden className="web-dir-mark" />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
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
          {WEB_SYSTEM_HANDOFF.label}
        </p>

        {/* Where the escaping routes go. No heading, no copy, no CTA — the
            chapter that answers this is not built. */}
        <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {WEB_SYSTEM_HANDOFF.terms.map((term, i) => (
            <motion.li
              key={term}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09, ease: EASE }}
              className="flex items-center gap-5"
            >
              {i > 0 ? (
                <span aria-hidden className="text-ink-muted/60">
                  &rarr;
                </span>
              ) : null}
              <span className="font-display text-[clamp(1rem,1.6vw,1.375rem)] leading-none font-medium tracking-[-0.03em] text-ink/70">
                {term}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function BeyondWebsites({ id }: { id: string }) {
  const reduced = usePrefersReducedMotion();
  /**
   * `false` on the server, so the stacked narrative is what ships in the HTML
   * and what a client without JavaScript keeps. Reduced motion takes the same
   * path — every state settled, nothing depending on a transition to be
   * understood.
   */
  const sticky = useMediaQuery(STICKY_QUERY, false) && !reduced;
  /**
   * The narrow system map. `true` on the server, so the phone composition is
   * what ships in the HTML and what a client without JavaScript keeps — the
   * inverse default to `sticky`, and deliberate: the cheapest layout should be
   * the one that renders first.
   */
  const compact = useMediaQuery(COMPACT_QUERY, true);

  return (
    <ServiceSection
      id={id}
      labelledBy={`${id}-title`}
      grid="edges"
      className="web-ink"
    >
      <EntryBridge />

      <div className="mt-16 md:mt-20">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={WEB_SYSTEM_COPY}
          /* "Not every business problem" is 26 characters against §03's 18,
             and at the shared `34rem` measure it wrapped a second time and
             left `problem` alone on a line. Widened here rather than in the
             shared component, which the other four service pages are
             art-directed against. */
          className="[&_h2]:max-w-[min(92vw,44rem)]"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-8 max-w-[58ch] text-[0.9375rem] leading-[1.7] text-ink/70"
      >
        {WEB_SYSTEM_INTRO}
      </motion.p>

      <div data-layout={sticky ? "sticky" : compact ? "map" : "stacked"}>
        {sticky ? <StickySystem /> : <StackedSystem compact={!sticky && compact} />}
      </div>

      <Statement />
      <Directory />
      <Handoff />
    </ServiceSection>
  );
}
