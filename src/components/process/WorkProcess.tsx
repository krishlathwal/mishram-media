"use client";

import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { PROCESS_STAGES, WORK_PROCESS_COPY } from "@/config/process";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { ProcessDetail } from "./ProcessDetail";
import { ProcessPipeline } from "./ProcessPipeline";
import { ProcessRail } from "./ProcessRail";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The horizontal pipeline needs width for five labels stepping up a rising
 * line. Below this — or on a portrait tablet, however wide — the vertical rail
 * is the honest reading rather than a squeezed diagram. Shape first, device
 * classification second, as §11 has it.
 */
const PIPELINE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/**
 * 04 / WORK PROCESS
 *
 * What actually happens when someone hires Mishram, as one connected system
 * rather than five cards: a single rising line carrying an idea through
 * Discover → Strategy → Create → Launch → Scale, with a thin return trace from
 * Scale back to Strategy because growth work does not stop.
 *
 * Deliberately light. §02 owns the long pinned scroll and §03 owns the
 * photography; this section is a little over one viewport of ordinary scroll,
 * one SVG and no imagery at all. Scroll drives the entrance only — after that
 * everything comes from stage selection, so the visitor never has to scroll
 * precisely to read a stage.
 */
export function WorkProcess() {
  const { openContact } = useContact();
  const horizontal = useMediaQuery(PIPELINE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    PROCESS_STAGES[0].id,
  );

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />
      <LeadIn />

      <div className="page-x relative pt-20 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        <Intro />

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="mt-14 block h-px w-full origin-left bg-line md:mt-16"
        />

        {horizontal ? (
          <>
            <div className="mt-12">
              <ProcessPipeline
                activeId={activeId}
                lockedId={lockedId}
                onPreview={preview}
                onClearPreview={clearPreview}
                onSelect={select}
              />
            </div>

            <span aria-hidden className="mt-10 block h-px w-full bg-line" />

            <div className="mt-10">
              <ProcessDetail activeId={activeId} />
            </div>
          </>
        ) : (
          <div className="mt-10">
            <ProcessRail activeId={activeId} onSelect={select} />
          </div>
        )}

        <Cta onClick={openContact} className="mt-12 md:mt-14" />
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
 * The handoff from Creators. A thin trace descends out of the section boundary
 * and resolves into a teal tip — the line that becomes the pipeline. Creators
 * itself is untouched: this belongs entirely to the section it leads into, so
 * people hand off to process without a hard reset.
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
        className="block w-px origin-top bg-line-strong"
        variants={{ rest: { height: 0 }, shown: { height: 74 } }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <motion.span
          className="mt-[-1px] block h-[18px] w-px bg-accent"
          variants={{ rest: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          style={{ marginTop: 56 }}
        />
      </motion.span>
    </motion.span>
  );
}

function Intro() {
  const [line1, line2] = WORK_PROCESS_COPY.headline;
  const accent = WORK_PROCESS_COPY.accentWord;
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
        <span className="text-ink-muted">{WORK_PROCESS_COPY.index}</span>
        <span aria-hidden className="text-ink-muted">
          /
        </span>
        <span className="text-ink">{WORK_PROCESS_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-6 md:mt-9 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="process-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          /* Deliberately a step down from the hero and §02 — this is a
             system diagram, not the page's opening statement. */
          className="max-w-[min(92vw,32rem)] font-display text-[clamp(1.75rem,3.2vw,2.9rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink"
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
          {WORK_PROCESS_COPY.lead}
        </motion.p>
      </div>
    </>
  );
}

/**
 * One small action. §02 already ends on the page's conversion moment, so this
 * stays a text action rather than a second button block — the same inline
 * treatment as the service copy and the creator roster.
 */
function Cta({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className={`group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink ${className ?? ""}`}
    >
      <span className="relative">
        {WORK_PROCESS_COPY.cta}
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
    </motion.button>
  );
}
