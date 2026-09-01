"use client";

import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import {
  RECOGNITION_COPY,
  RECOGNITION_ITEMS,
  type RecognitionItem,
} from "@/config/recognition";

import { RecognitionMedia } from "./RecognitionMedia";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 06 / RECOGNITION — the recognition archive.
 *
 * A curated set of glimpses, not an award wall: one dominant moment plus up to
 * two smaller fragments, offset and overlapping, captioned with only what is
 * documented. No trophy icons, no badges, no gold, no achievement counters.
 *
 * **This section renders nothing while `RECOGNITION_ITEMS` is empty**, which it
 * currently is — see the audit in `config/recognition.ts`. There is no verified
 * Mishram Media recognition material, and a placeholder would imply the agency
 * has awards it simply is not showing. Adding one entry to the config makes the
 * section appear, composed; the layout adapts to one, two or three-plus items.
 */
export function Recognition() {
  const { openContact } = useContact();
  const items = RECOGNITION_ITEMS;

  // Content-blocked: no section rather than an empty one.
  if (items.length === 0) return null;

  const [dominant, ...rest] = items;
  // Three fragments would start competing with the dominant moment.
  const fragments = rest.slice(0, 2);
  // Single item → the museum-label column exists and has room, so the action
  // finishes it. With fragments that column is spoken for and the action keeps
  // its own row under the archive. One node either way, never two.
  const inLabel = fragments.length === 0;
  const action = <RecognitionAction onClick={openContact} />;

  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
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

        {/* Archive. Asymmetric by construction: the dominant moment takes the
            left seven columns and the fragments step down its right edge, so it
            never reads as a gallery of equal tiles. */}
        <div className="rcg-archive mt-12 md:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            // With fragments beside it the dominant keeps its seven columns.
            // Alone, it takes the full width and splits internally, so the
            // caption fills the column the fragments would have occupied
            // instead of leaving five empty ones. See `RecognitionMedia`.
            className={fragments.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}
          >
            <RecognitionItemView
              item={dominant}
              position={1}
              dominant
              aside={inLabel}
              action={inLabel ? action : undefined}
            />
          </motion.div>

          {fragments.length > 0 ? (
            <div
              // The top offset is what makes this an archive rather than a
              // gallery: the fragments hang off the dominant moment's lower
              // right instead of sitting level with its top edge.
              className="mt-12 flex flex-col gap-10 sm:flex-row sm:gap-8 lg:col-span-5 lg:mt-0 lg:flex-col lg:gap-12 lg:pt-[18%]"
            >
              {fragments.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.18 + i * 0.12,
                    ease: EASE,
                  }}
                  className={`flex-1 ${i === 1 ? "lg:pl-[16%]" : ""}`}
                >
                  <RecognitionItemView item={f} position={i + 2} />
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>

        {/* With fragments in the archive the label column is occupied, so the
            action keeps its own row here. In the single-item state it has
            already been rendered at the foot of the museum label. */}
        {inLabel ? null : <div className="mt-14 md:mt-16">{action}</div>}
      </div>
    </section>
  );
}

/**
 * The chapter's one text action.
 *
 * Restrained on purpose: §02 owns the page's conversion moment and §05 already
 * carries a text action, so this is one line or nothing. Extracted so the same
 * node can sit in the museum label or under the archive without either
 * position owning a second copy of it.
 */
function RecognitionAction({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
    >
      <span className="relative">
        {RECOGNITION_COPY.cta}
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

/**
 * Split out so the archive body stays readable, and so the media component
 * never has to know about layout.
 */
function RecognitionItemView({
  item,
  position,
  dominant = false,
  aside = false,
  action,
}: {
  item: RecognitionItem;
  position: number;
  dominant?: boolean;
  aside?: boolean;
  action?: React.ReactNode;
}) {
  return (
    // NO `priority`, and no eager loading. §10i removed the same flag from
    // three other below-the-fold images; this one survived only because the
    // section rendered nothing. It renders now, roughly 13,000px down the
    // page, so preloading it would compete with the Hero for bandwidth before
    // the visitor has scrolled. `RecognitionMedia` has no priority prop at all.
    <RecognitionMedia
      item={item}
      position={position}
      dominant={dominant}
      aside={aside}
      action={action}
      sizes={
        dominant
          ? // Measured, not guessed, and re-measured whenever the split moves.
            // Beside its museum label the frame is eight of eleven inner
            // columns — **946px at 1440, i.e. 66vw** (it was 824px / 58vw at
            // the old seven-column split). §10q's defect 4 was exactly this
            // going stale: left under-declared, the browser picks a candidate
            // narrower than the box and the photograph comes back soft.
            aside
            ? "(max-width: 1023px) 92vw, 66vw"
            : "(max-width: 1023px) 92vw, 52vw"
          : "(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 28vw"
      }
    />
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
 * The handoff from §05. Selected Work's media baseline continues past the
 * section boundary and resolves into the first hairline of the archive —
 * moving work becoming documented milestones. It belongs entirely to this
 * section, so §05 needed no change.
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
        variants={{ rest: { height: 0 }, shown: { height: 64 } }}
        transition={{ duration: 0.85, ease: EASE }}
      />
      <motion.span
        className="block h-px origin-left bg-line-strong"
        variants={{ rest: { width: 0 }, shown: { width: 120 } }}
        transition={{ duration: 0.75, delay: 0.6, ease: EASE }}
      />
    </motion.span>
  );
}

function Intro() {
  const [line1, line2] = RECOGNITION_COPY.headline;
  const accent = RECOGNITION_COPY.accentWord;
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
        <span className="text-ink-muted">{RECOGNITION_COPY.index}</span>
        <span aria-hidden className="text-ink-muted">
          /
        </span>
        <span className="text-ink">{RECOGNITION_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-6 md:mt-9 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="recognition-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,32rem)] font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.03] font-medium tracking-[-0.035em] text-ink"
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
          className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[34ch] lg:pb-2"
        >
          {RECOGNITION_COPY.lead}
        </motion.p>
      </div>
    </>
  );
}
