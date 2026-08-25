"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { ROSTER, resolveFrame } from "@/config/creators";
import { INFLUENCER_PROOF } from "@/config/service-influencer";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * CREATOR PROOF — the casting wall.
 *
 * A single horizontal sequence of portraits at one height and **deliberately
 * uneven widths**, abutted rather than spaced: the wall a campaign gets cast
 * from. Each frame carries a different crop of a different creator, so the
 * strip reads as a set of distinct people rather than a row of thumbnails.
 *
 * **Not Service 01's creator field.** That is five equal 3:4 frames on a grid
 * with small vertical offsets — a field. This is one continuous strip with
 * varying aspect and no gaps, and the two do not read alike at any size.
 *
 * WHAT IS CLAIMED: these are creators in the Mishram Media network. **What is
 * not claimed, anywhere:** that any of them appeared in a client campaign, that
 * they worked together, that a result followed, or anything at all about
 * audience size. §10b's verification pass closed every figure off and none has
 * reappeared here. The caption says so on the page, not just in this comment.
 */
export function CreatorCast({ id }: { id: string }) {
  /** Uneven widths and crops. A casting wall is not a grid. */
  const cast = [
    { id: "zoya", kind: "portrait", aspect: "3 / 4", grow: 1.15 },
    { id: "mukul", kind: "reel", aspect: "9 / 16", grow: 0.86 },
    { id: "nikita", kind: "portrait", aspect: "4 / 5", grow: 1.22 },
    { id: "lovkesh", kind: "content", aspect: "1 / 1", grow: 1.5 },
    { id: "vishnu", kind: "reel", aspect: "9 / 16", grow: 0.86 },
  ] as const;

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead
        id={`${id}-title`}
        copy={{
          label: INFLUENCER_PROOF.label,
          headline: INFLUENCER_PROOF.headline,
          lead: INFLUENCER_PROOF.lead,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="inf-cast mt-14 md:mt-16 lg:mt-20"
      >
        {cast.map((member, i) => {
          const creator = ROSTER.find((c) => c.id === member.id);
          if (!creator) return null;
          const frame = resolveFrame(creator, member.kind);

          return (
            <figure
              key={member.id}
              className="inf-cast-member"
              style={{ "--inf-grow": member.grow } as React.CSSProperties}
            >
              <div
                className="inf-cast-frame crt-zoom"
                style={
                  {
                    aspectRatio: member.aspect,
                    "--crt-zoom": frame.zoom,
                    "--crt-origin": frame.origin,
                  } as React.CSSProperties
                }
              >
                <Image
                  src={frame.src}
                  alt={creator.alt}
                  fill
                  sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 20vw"
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
            </figure>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-12 flex flex-col gap-5 border-t border-line pt-6 lg:flex-row lg:items-start lg:justify-between"
      >
        <p className="caps max-w-[64ch] leading-[1.7] text-ink-muted">
          {INFLUENCER_PROOF.caption}
        </p>

        {/* A real destination on the homepage. Plain anchor for the reason
            §10g gives — a full navigation lets `useHashLanding` re-land the
            fragment after the homepage's hydration changes its height. */}
        <a
          href={INFLUENCER_PROOF.actionHref}
          className="group inline-flex shrink-0 items-center gap-2.5 self-start py-3 text-[0.8125rem] font-medium text-ink lg:py-0"
        >
          <span className="relative">
            {INFLUENCER_PROOF.action}
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
