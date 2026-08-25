"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { TESTIMONIALS, type Testimonial } from "@/config/testimonials";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The quotation itself, and who said it.
 *
 * Every quote is mounted and only the active one is visible, so the text is
 * real DOM content at all times. Inactive blocks are `aria-hidden`, so the
 * accessibility tree only ever holds the quote on screen.
 *
 * **All of them share one grid cell**, which is what keeps the field the height
 * of the *longest* quote no matter which is showing. The obvious version — the
 * active block `relative` and the rest `absolute` — sizes the field to whatever
 * is live, and measured here that swung the section between 709px and 808px, so
 * hovering a name shunted the whole page below it. A little whitespace under a
 * short quote is the right trade, and it is what a printed spread does anyway.
 *
 * The outgoing quote clips upward while the incoming one resolves down through
 * the same edge, and the author line lands on the same beat. **No typewriter,
 * no letter-by-letter, no blur.** ~420ms.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Block({
  item,
  active,
  reduced,
}: {
  item: Testimonial;
  active: boolean;
  reduced: boolean;
}) {
  const dur = reduced ? 0.2 : 0.42;

  return (
    <motion.div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 ${active ? "" : "pointer-events-none"}`}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.18 : 0.26, ease: EASE }}
    >
      <blockquote>
        {/* One small serif mark, not a decorative glyph floating across half
            the screen. The words carry the design. */}
        <span aria-hidden className="tst-mark font-accent">
          &ldquo;
        </span>

        <p className="-mb-[0.1em] overflow-hidden">
          <motion.span
            className="block max-w-[46ch] pb-[0.12em] font-display text-[clamp(1.3rem,2vw,2.05rem)] leading-[1.34] font-medium tracking-[-0.022em] text-ink"
            initial={false}
            animate={{ y: active || reduced ? "0%" : "104%" }}
            transition={{ duration: dur, ease: EASE }}
          >
            {item.quote}
          </motion.span>
        </p>

        <motion.footer
          className="mt-9 flex items-center gap-4 md:mt-11"
          initial={false}
          animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
          transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.06 }}
        >
          {/* Rendered only when the asset is confirmed to be this person —
              see the audit in config/testimonials.ts. Absent is the norm. */}
          {item.image ? (
            <span className="tst-portrait relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
          ) : null}

          <span className="block">
            <cite className="block font-display text-[1.0625rem] leading-none font-medium tracking-[-0.02em] text-ink not-italic">
              {item.author}
            </cite>

            {/* Only what is documented. No placeholder dash, no invented title. */}
            {item.role || item.company ? (
              <span className="caps mt-2.5 block text-ink-muted">
                {[item.role, item.company].filter(Boolean).join(" / ")}
              </span>
            ) : null}
          </span>
        </motion.footer>
      </blockquote>
    </motion.div>
  );
}

export function QuoteStage({ activeId }: { activeId: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="grid">
      {TESTIMONIALS.map((t) => (
        <Block
          key={t.id}
          item={t}
          active={t.id === activeId}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
