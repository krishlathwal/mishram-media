"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import {
  RECOGNITION_BANNER,
  RECOGNITION_COPY,
  RECOGNITION_ITEMS,
} from "@/config/recognition";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 06 / RECOGNITION — the client's award banner, full bleed.
 *
 * Revision 42. The archive composition (a museum-labelled photograph on
 * 8 / 3 columns) is gone from the homepage at the client's request: *"add
 * just that banner which I created in Canva, and put only that — other than
 * that you can add the titles."* So the section **is** the banner: the
 * artwork covers the whole chapter, and the award's facts — the same title,
 * organisation and year §10p read off the badge — sit over it on a plum
 * plate, the banner's own hue and the one surface on the page that carries the
 * brand colour as a field.
 *
 * What is not done here: the artwork is never cropped away from its own
 * type (the plate sits over the tagline corner, the "MISHRAM MEDIA" title and
 * the trophy moment stay clear), nobody in it is named, `NUFEW` is not
 * expanded, and no gold is added by the site — any gold is in the artwork.
 * `/about` still renders the first-party photograph from
 * `RECOGNITION_ITEMS[0]`, untouched.
 *
 * **This section renders nothing while `RECOGNITION_ITEMS` is empty** — the
 * facts on the plate come from that record, so a banner with nothing to say
 * under it is not a state this chapter has.
 */
export function Recognition() {
  const { openContact } = useContact();
  const item = RECOGNITION_ITEMS[0];

  // Content-blocked: no section rather than an empty one.
  if (!item) return null;

  const detail = [item.organisation, item.year].filter(Boolean).join(" · ");

  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
      className="rcg-banner relative w-full overflow-hidden border-t border-line bg-canvas"
    >
      {/* The banner itself. `fill` + cover so it is never distorted. One
          element, two layouts: **from `xl` it is the section's background**
          and the plate sits over its left third, under the trophy pair's
          faces (the artwork holds the pair right of centre, heads in its top
          third); **below `xl` it is a block at the artwork's own aspect
          above the plate**. Both edges were captured, not assumed: at 1024
          and 1280 the chapter is not tall enough for a readable plate to
          clear the left figure's face, and a 4:3 crop of the artwork cut
          the first letter off its own wordmark on a tablet. Below the fold,
          so lazy and no preload (§16). */}
      <div
        aria-hidden
        className="relative aspect-[2560/1411] xl:absolute xl:inset-0 xl:aspect-auto"
      >
        <Image
          src={RECOGNITION_BANNER.src}
          alt=""
          fill
          sizes="100vw"
          style={{ objectPosition: RECOGNITION_BANNER.focus }}
          className="object-cover"
        />
        {/* A soft grounding at the foot only — enough to seat the plate,
            never enough to dim the artwork. Only where the plate overlays. */}
        <span className="rcg-banner-scrim hidden xl:block" />
      </div>

      {/* From `xl` the section is the artwork's own aspect — exactly, with no
          cap, because the artwork has type at both edges (the wordmark in its
          top fifth, the URL line at its foot) and any vertical crop cuts one
          of them; at 1920 a 50rem cap took the top off the wordmark. The
          plate sits low in it — a short foot, so it clears the faces above
          and covers the URL line below rather than halving it. Below `xl`
          the plate simply follows the artwork in normal flow. */}
      <div className="page-x relative flex flex-col justify-end py-5 sm:py-6 xl:min-h-[calc(1411/2560*100vw)] xl:pt-16 xl:pb-5">
        <motion.figure
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="plum-field rcg-plate"
        >
          <p className="caps flex items-baseline gap-3">
            <span className="text-ink-muted">{RECOGNITION_COPY.index}</span>
            <span aria-hidden className="text-ink-muted">
              /
            </span>
            <span className="text-ink">{RECOGNITION_COPY.label}</span>
          </p>

          <Headline />

          <figcaption className="mt-7 border-t border-line pt-6">
            <span className="block font-display text-[clamp(1.1rem,1.55vw,1.5rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink">
              {item.title}
            </span>
            {detail ? (
              <span className="caps mt-2.5 block text-ink-muted">{detail}</span>
            ) : null}
            {/* The caption is the one line the plate can spare: at 1280 the
                chapter is 720px tall and a plate carrying it reaches the
                left figure's chin. Back from 1440, where there is room. */}
            {item.caption ? (
              <span className="mt-3 block max-w-[38ch] text-[0.8125rem] leading-[1.65] text-ink-soft xl:hidden min-[1440px]:block">
                {item.caption}
              </span>
            ) : null}
            {/* Names what the reader is looking at, so the artwork's own
                "award-winning" line is never mistaken for the site's copy. */}
            <span className="sr-only">{RECOGNITION_BANNER.alt}</span>
          </figcaption>

          <div className="mt-7">
            <RecognitionAction onClick={openContact} />
          </div>
        </motion.figure>
      </div>
    </section>
  );
}

function Headline() {
  const [line1, line2] = RECOGNITION_COPY.headline;
  const accent = RECOGNITION_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    // Trigger on the heading, not the clipped lines: a line translated
    // outside its overflow-hidden parent never intersects the viewport, so
    // it would never fire on its own. Variants propagate.
    <motion.h2
      id="recognition-title"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="mt-5 max-w-[14ch] font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.04] font-medium tracking-[-0.035em] text-ink"
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
  );
}

/**
 * The chapter's one text action. Restrained on purpose: §02 owns the page's
 * conversion moment and §05 already carries a text action, so this is one
 * line or nothing.
 */
function RecognitionAction({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
    </button>
  );
}
