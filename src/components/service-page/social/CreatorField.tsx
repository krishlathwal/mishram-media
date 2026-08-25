"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { ROSTER, resolveFrame } from "@/config/creators";
import { SOCIAL_PROOF } from "@/config/service-social";
import { Arrow } from "@/components/ui/Arrow";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * PROOF — the creator field.
 *
 * **What is claimed here, and nothing beyond it:** these are creators in the
 * Mishram Media network, shown with the same approved local photography the
 * homepage uses. That is the only relationship the project can evidence.
 *
 * **Deliberately not claimed:** follower counts, audience growth, engagement,
 * reach, revenue, campaign results, or that any of them is a case study for
 * this service. §10b of the brief records a real verification pass that found
 * candidate handles for all five creators and confirmed none of them, so no
 * figure of any kind appears — and inventing one for a named real person on a
 * live site is exactly the failure that audit exists to prevent.
 *
 * **Not a second Talent Index.** §03 is an indexed roster with one cinematic
 * creator beside it and a selection model; this is a single photographic field
 * where all five are present at once and nothing has to be chosen. The link
 * beneath it goes to §03 for the version that does.
 */
export function CreatorField({ id }: { id: string }) {
  /** Small, irregular vertical offsets — a field, not a row of thumbnails. */
  const offsets = ["0rem", "2.75rem", "0.75rem", "3.5rem", "1.5rem"];

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead
        id={`${id}-title`}
        copy={{
          label: SOCIAL_PROOF.label,
          headline: SOCIAL_PROOF.headline,
          lead: SOCIAL_PROOF.lead,
        }}
      />

      <div className="svp-field mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:mt-16 lg:mt-20 lg:grid-cols-5 lg:gap-x-5">
        {ROSTER.map((creator, i) => {
          const frame = resolveFrame(creator, "portrait");

          return (
            <motion.figure
              key={creator.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: 0.06 * i, ease: EASE }}
              className="svp-creator"
              style={
                { "--svp-offset": offsets[i % offsets.length] } as React.CSSProperties
              }
            >
              <div
                className="svp-frame crt-zoom"
                style={
                  {
                    aspectRatio: "3 / 4",
                    "--crt-zoom": frame.zoom,
                    "--crt-origin": frame.origin,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={frame.src}
                  alt={creator.alt}
                  fill
                  sizes="(max-width: 639px) 44vw, (max-width: 1023px) 30vw, 18vw"
                  style={{ objectPosition: frame.position }}
                  className="svp-photo object-cover"
                />
                <span aria-hidden className="svp-veil" />
              </div>

              <figcaption className="mt-4 flex items-baseline gap-2.5">
                <span className="caps text-[0.5625rem] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.875rem] leading-[1.35] font-medium text-ink/85">
                  {creator.name}
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        className="mt-14 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="caps text-ink-muted">{SOCIAL_PROOF.caption}</p>

        {/* A real destination on the homepage. Left as a plain anchor for the
            reason §10g gives: a full navigation lets `useHashLanding` re-land
            the fragment after the homepage's own hydration changes its
            height. */}
        {/* `py-3` keeps this a 44px touch target on a phone — it is a text
            action, not a button, and a 20px row is not tappable. */}
        <a
          href={SOCIAL_PROOF.actionHref}
          className="group inline-flex items-center gap-2.5 self-start py-3 text-[0.8125rem] font-medium text-ink sm:py-0"
        >
          <span className="relative">
            {SOCIAL_PROOF.action}
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
        </a>
      </motion.div>
    </ServiceSection>
  );
}
