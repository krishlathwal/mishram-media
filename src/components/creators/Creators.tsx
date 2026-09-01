"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";

import { CREATORS_COPY, ROSTER } from "@/config/creators";
import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { CreatorIndex, MATRIX_MIN } from "./CreatorIndex";
import { CreatorMeta } from "./CreatorMeta";
import { CreatorStage } from "./CreatorStage";
import { WorkedWithIndex } from "./WorkedWithIndex";
import { useCreatorTransition } from "./useCreatorTransition";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 03 / CREATORS
 *
 * A talent index rather than a card grid: one indexed roster on the left, one
 * large creator on the right, and the visitor in control of which.
 *
 * Deliberately **not** another pinned sequence. §02 owns the long scroll; this
 * section is roughly one viewport of normal page scroll and gets its depth from
 * interaction instead. Nothing auto-advances — the selection only changes when
 * the visitor moves it.
 *
 * SELECTION MODEL. `useHoverLock`: hover (or keyboard focus) previews, click or
 * Enter locks, leaving the roster restores whatever is locked, previews
 * debounced 90ms so a fast diagonal cursor does not fire four transitions on
 * its way past. This section carried its own copy of that logic while it was
 * locked; reopening it was the moment to adopt the shared hook.
 *
 * SCALE. Everything derives from `ROSTER`: the index numbers, the roster count,
 * how many columns the matrix uses, which creators mount, and the column spans.
 * Adding a creator is one object in `config/creators.ts` — no edits here.
 */
export function Creators() {
  const { openContact } = useContact();
  const reduced = usePrefersReducedMotion();

  // The two-column composition needs room for a real cascade beside the index.
  // Below this the section stacks instead of being squeezed.
  const isWide = useMediaQuery("(min-width: 1024px)");
  // A two-column matrix stops being readable somewhere around here; a phone
  // this narrow gets full-width rows rather than two cramped ones.
  const veryNarrow = useMediaQuery("(max-width: 340px)");

  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    ROSTER[0]?.id ?? "",
  );

  // The creator under the cursor right now. Set on pointer entry, ahead of the
  // preview debounce, so its photograph is already being fetched by the time
  // the selection actually changes.
  const [warmId, setWarmId] = useState<string | null>(null);
  const warm = useCallback((id: string) => setWarmId(id), []);

  // What is actually on screen. Lags `activeId` only until the incoming
  // photograph is ready, which is what stops a switch revealing an empty frame.
  const { shownId, outgoingId, markLoaded } = useCreatorTransition(
    activeId,
    reduced,
  );

  if (ROSTER.length === 0) return null;

  // One column for a short roster, two once it would otherwise run tall.
  const columns = ROSTER.length >= MATRIX_MIN && !veryNarrow ? 2 : 1;

  const stage = (
    <CreatorStage
      shownId={shownId}
      outgoingId={outgoingId}
      activeId={activeId}
      warmId={warmId}
      onLoaded={markLoaded}
    />
  );

  const index = (
    <CreatorIndex
      activeId={activeId}
      lockedId={lockedId}
      columns={columns}
      onPreview={preview}
      onClearPreview={clearPreview}
      onSelect={select}
      onWarm={warm}
    />
  );

  return (
    <section
      id="creators"
      aria-labelledby="creators-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />

      {/* One step tighter than the chapter used to run. Revision 17 added the
          scale facts and the worked-with index below the stage, and the
          instruction was to absorb that inside this chapter rather than let
          the page grow — so the approach and the run-out give up a step each
          while the composition itself is untouched. */}
      <div className="page-x relative pt-14 pb-14 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
        <Intro />

        {/* The chapter rule the roster hangs from. */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="mt-14 block h-px w-full origin-left bg-line md:mt-20"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="mt-10 md:mt-14"
        >
          {isWide ? (
            <div className="grid grid-cols-12 items-center gap-x-8">
              {/* The roster column doubles as the caption: the list is the
                  control, the large name below it is the title of whatever is
                  on the stage — so hovering a row changes something directly
                  beneath the cursor as well as the photograph beside it.

                  The span widens by one column only when the matrix engages,
                  so a five-creator roster keeps the approved 4/8 composition
                  exactly and the photograph never shrinks to make room for
                  names that are not there. */}
              <div className={columns > 1 ? "col-span-5" : "col-span-4"}>
                {index}

                <div className="mt-9">
                  <CreatorMeta shownId={shownId} outgoingId={outgoingId} />
                </div>

                <Cta onClick={openContact} className="mt-9" />
              </div>

              {/* The stage takes its height from its own width, not from the
                  viewport. Frames are sized as a percentage of the box height,
                  so a fixed aspect is what keeps the portrait at the same share
                  of the width — otherwise a narrower column makes it swallow
                  the cascade instead of anchoring it. */}
              <div
                className={`relative aspect-[1.45] w-full ${
                  columns > 1 ? "col-span-7" : "col-span-8"
                }`}
              >
                {stage}
              </div>
            </div>
          ) : (
            <div>
              {/* Capped so a tablet gets a strong portrait rather than a
                  700px-wide one nine hundred pixels tall. */}
              <div className="relative aspect-[3/4] w-full max-w-[26rem]">
                <CreatorStage
                  shownId={shownId}
                  outgoingId={outgoingId}
                  activeId={activeId}
                  warmId={warmId}
                  onLoaded={markLoaded}
                  compact
                />
              </div>

              <div className="mt-8">
                <CreatorMeta
                  shownId={shownId}
                  outgoingId={outgoingId}
                  large
                />
              </div>

              <div className="mt-10">{index}</div>

              <Cta onClick={openContact} className="mt-10" />
            </div>
          )}
        </motion.div>

        {/* The second layer: the network's scale, and the confirmed
            relationships the project has no approved photograph for. Type
            rather than portraits — see the note at `WORKED_WITH`. */}
        <WorkedWithIndex />
      </div>
    </section>
  );
}

/** The hero's vertical grid continues through this section. */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}

function Intro() {
  const [line1, line2] = CREATORS_COPY.headline;
  const accent = CREATORS_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex items-baseline gap-3"
      >
        <span className="text-ink-muted">{CREATORS_COPY.index}</span>
        <span aria-hidden className="text-ink-muted">
          /
        </span>
        <span className="text-ink">{CREATORS_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="creators-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,40rem)] font-display text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
        >
          {[line1, line2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
                className="block"
              >
                {i === 0 ? (
                  line
                ) : (
                  <>
                    {leadIn}
                    <span className="font-accent italic">{accent}</span>
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* THE NETWORK, IN TWO HALVES — Revision 34.

            This slot held one sentence about the *relationship*, which the
            chapter already states twice more: `CreatorMeta` labels every
            creator on the stage individually, and the roster's own note says
            it again. What it never answered was what a brand actually arrives
            asking — **what kind of network is this** — so the slot now carries
            the two halves the proposal itself describes.

            **The categories describe the network and never a person.** Not one
            name on this page is sorted into either, and none should be: the
            proposal's Premium list is registered NEEDS VERIFY, and asserting a
            category about a real human being is the §10b follower-count
            mistake in a different currency.

            Two columns from `sm` and stacked below it, each on its own
            hairline — the site's existing label-plus-prose grammar used twice,
            not a card, a chip, a tier badge or a toggle. Bottom-aligned
            against the headline at `lg`, which is what keeps the row's height
            unchanged. */}
        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="crt-network"
        >
          {CREATORS_COPY.network.map((part) => (
            <div key={part.label} className="crt-network-part">
              <dt className="caps text-ink">{part.label}</dt>
              <dd className="mt-3 text-[0.8125rem] leading-[1.7] text-ink-soft">
                {part.line}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </>
  );
}

/**
 * One restrained action for the whole section. This is a credibility chapter,
 * not a conversion one — it reuses the inline CTA treatment from the service
 * copy and the existing contact panel, not a button block.
 */
function Cta({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink ${className ?? ""}`}
    >
      <span className="relative">
        {CREATORS_COPY.cta}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <span aria-hidden className="block h-3 w-3 overflow-hidden">
        <Arrow
          size={12}
          className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4"
        />
      </span>
    </button>
  );
}
