"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { SELECTED_WORK_COPY, WORK_ITEMS } from "@/config/work";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { WorkIndex } from "./WorkIndex";
import { WorkMeta, WorkStage } from "./WorkStage";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The wide composition needs room for an index, a tall 9:16 surface, an
 * overlapping fragment and a metadata column side by side. Below this — or on a
 * portrait tablet however wide — the reel gets the width instead and everything
 * else stacks under it. Shape first, device classification second, as §11 has
 * it.
 */
const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/**
 * 05 / SELECTED WORK
 *
 * A cinematic media index: one work dominant at a time, at a size that reads as
 * actual work rather than a thumbnail. No device mockup around it — the media is
 * the object, inside a thin editorial frame.
 *
 * §04 is abstract and line-based; this hands back to media, so the page runs
 * process → output. Scroll drives the entrance only; after that everything is
 * selection and playback. No pinned track.
 *
 * `sectionInView` is the one piece of state the whole section shares: it is what
 * guarantees nothing decodes offscreen (see `WorkMedia`).
 */
export function SelectedWork() {
  const { openContact } = useContact();
  const wide = useMediaQuery(WIDE_QUERY);
  const section = useRef<HTMLElement>(null);
  // Generous margin: pause well before the section is fully gone, and be ready
  // slightly before it arrives.
  const inView = useInView(section, { margin: "10% 0px 10% 0px" });

  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    WORK_ITEMS[0].id,
  );

  return (
    <section
      ref={section}
      id="work"
      aria-labelledby="work-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />
      <LeadIn />

      <div className="page-x relative pt-14 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        <Intro />

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="mt-14 block h-px w-full origin-left bg-line md:mt-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
          className="mt-12 md:mt-14"
        >
          {wide ? (
            <div className="grid grid-cols-12 items-center gap-x-8">
              <div className="col-span-3">
                <WorkIndex
                  activeId={activeId}
                  lockedId={lockedId}
                  onPreview={preview}
                  onClearPreview={clearPreview}
                  onSelect={select}
                />
                <Cta onClick={openContact} className="mt-9" />
              </div>

              {/* The reel is sized by height, so it stays a believable piece of
                  work rather than stretching with the column. */}
              <div className="col-span-9 relative h-[clamp(24rem,56vh,36rem)]">
                <WorkStage activeId={activeId} sectionInView={inView} />

                {/* Metadata top-aligned beside the media. The wrapper owns the
                    positioning: WorkMeta is itself `relative` so its stacked
                    blocks can overlay each other, and passing `absolute` in
                    would collide with that. */}
                <div className="absolute top-[10%] left-[42%] w-[52%]">
                  <WorkMeta activeId={activeId} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-10">
              {/* The reel takes the width it needs and keeps its margins — not
                  full-bleed, which would cost the section its composure. */}
              <div className="w-full max-w-[19rem] shrink-0 sm:max-w-[17rem]">
                <WorkStage
                  activeId={activeId}
                  sectionInView={inView}
                  compact
                />
              </div>

              <div className="min-w-0 flex-1">
                <WorkMeta activeId={activeId} />

                <WorkIndex
                  activeId={activeId}
                  lockedId={lockedId}
                  onPreview={preview}
                  onClearPreview={clearPreview}
                  onSelect={select}
                  className="mt-10"
                />

                <Cta onClick={openContact} className="mt-9" />
              </div>
            </div>
          )}
        </motion.div>
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

/**
 * The handoff from Work Process. §04's line descends past the section boundary
 * and widens into a short horizontal baseline — the process line becoming the
 * baseline the media sits on. It belongs entirely to this section, so §04
 * needed no change.
 */
function LeadIn() {
  return (
    <motion.span
      aria-hidden
      className="page-x pointer-events-none absolute inset-x-0 top-0 hidden lg:block"
      initial="rest"
      whileInView="shown"
      viewport={{ once: true, margin: "-5% 0px" }}
    >
      <motion.span
        className="block w-px bg-line-strong"
        variants={{ rest: { height: 0 }, shown: { height: 68 } }}
        transition={{ duration: 0.85, ease: EASE }}
      />
      <motion.span
        className="block h-px origin-left bg-accent"
        variants={{ rest: { width: 0 }, shown: { width: 96 } }}
        transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
      />
    </motion.span>
  );
}

function Intro() {
  const [line1, line2] = SELECTED_WORK_COPY.headline;
  const accent = SELECTED_WORK_COPY.accentWord;
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
        <span className="text-ink-muted">{SELECTED_WORK_COPY.index}</span>
        <span aria-hidden className="text-ink-muted">
          /
        </span>
        <span className="text-ink">{SELECTED_WORK_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-6 md:mt-9 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="work-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,34rem)] font-display text-[clamp(1.85rem,3.6vw,3.1rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink"
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

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[32ch] lg:pb-2"
        >
          {SELECTED_WORK_COPY.lead}
        </motion.p>
      </div>
    </>
  );
}

/** One restrained action. This is a proof section, not a conversion one. */
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
        {SELECTED_WORK_COPY.cta}
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
