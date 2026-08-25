"use client";

import { useRef } from "react";
import { motion } from "motion/react";

import { HERO_COPY } from "@/config/hero";
import { bookingHref } from "@/config/site";
import { useContact } from "@/components/contact/ContactProvider";
import { HeroScene } from "@/components/hero/HeroScene";
import { CtaButton } from "@/components/ui/CtaButton";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared entry step. MotionConfig strips the transform for reduced-motion
 * visitors, so the same declaration covers both cases.
 */
function step(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const { openContact } = useContact();

  const [line1, line2] = HERO_COPY.headline;
  // The closing word carries the serif italic accent.
  const accent = HERO_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <section
      ref={section}
      id="hero"
      aria-label="Mishram Media"
      className="grain relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {/* ── Media system ──────────────────────────────────────────
          Mobile gives it the lower band of the section; from md up it
          spans the whole hero so surfaces can drift behind the type. */}
      <div className="hero-media">
        <HeroScene sectionRef={section} />
      </div>

      {/* Readability scrim — vertical on mobile, horizontal on desktop. */}
      <div
        aria-hidden
        className="hero-scrim pointer-events-none absolute inset-0 z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-[linear-gradient(0deg,rgb(var(--t-canvas-rgb))_0%,rgb(var(--t-canvas-rgb)/0)_100%)]"
      />

      {/* ── Editorial grid rules ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      >
        <div className="page-x grid h-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.4, delay: 0.1 + i * 0.03, ease: EASE }}
              className="block h-full w-px origin-top bg-grid"
            />
          ))}
        </div>
      </div>

      {/* ── Copy ─────────────────────────────────────────────────── */}
      <div className="page-x pointer-events-none relative z-20 flex min-h-[100svh] flex-col pt-[calc(var(--header-h)+clamp(20px,4.5vh,54px))] pb-[clamp(64px,9vh,104px)]">
        {/* Eyebrow */}
        <motion.p
          {...step(0.15)}
          className="pointer-events-auto flex w-fit items-center gap-3"
        >
          <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
          <span className="caps text-ink/55">{HERO_COPY.eyebrow}</span>
        </motion.p>

        {/* Headline — deliberately two lines. Runs wider than the body
            column so the type can break the grid a little. */}
        <h1 className="pointer-events-auto mt-6 w-fit max-w-[min(92vw,48rem)] font-display text-[clamp(2.25rem,5.4vw,5rem)] leading-[0.94] font-medium tracking-[-0.038em] text-ink sm:mt-8">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={{ y: "108%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.26, ease: EASE }}
              className="block"
            >
              {line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={{ y: "108%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1, delay: 0.36, ease: EASE }}
              className="block"
            >
              {leadIn}
              <span className="relative inline-block font-accent italic">
                {accent}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 1, ease: EASE }}
                  className="absolute right-[0.09em] -bottom-[0.03em] left-0 block h-[2px] origin-left bg-accent"
                />
              </span>
            </motion.span>
          </span>
        </h1>

        <div className="pointer-events-auto w-fit max-w-[min(92vw,32rem)]">
          {/* Lead */}
          <motion.p
            {...step(0.7)}
            className="mt-7 max-w-[34ch] text-[clamp(1.0625rem,1.1vw,1.25rem)] leading-[1.5] text-ink/75 sm:mt-8"
          >
            {HERO_COPY.lead}
          </motion.p>

          {/* Supporting detail */}
          <motion.div {...step(0.82)} className="mt-6 hidden sm:block">
            <span aria-hidden className="mb-4 block h-px w-14 bg-line" />
            <p className="max-w-[56ch] text-[0.8125rem] leading-[1.7] text-ink-soft">
              {HERO_COPY.detail}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div {...step(0.94)} className="mt-9 sm:mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <CtaButton
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                {HERO_COPY.primaryCta}
              </CtaButton>
              <CtaButton as="button" onClick={openContact} variant="secondary">
                {HERO_COPY.secondaryCta}
              </CtaButton>
            </div>
            <p className="caps mt-4 pl-1 text-ink-muted">
              {HERO_COPY.primaryCtaNote}
            </p>
          </motion.div>
        </div>

        {/* ── Hero foot ──────────────────────────────────────────── */}
        <motion.div
          {...step(1.15)}
          className="pointer-events-auto mt-auto pt-12 sm:pt-14"
        >
          <span aria-hidden className="mb-4 block h-px w-full bg-line" />
          <div className="flex items-end justify-between gap-6">
            <ScrollCue />
            <ul className="caps hidden items-center gap-4 text-ink-muted lg:flex">
              {HERO_COPY.capabilities.map((c, i) => (
                <li key={c} className="flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="block h-2.5 w-px bg-line-strong"
                    />
                  )}
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollCue() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="relative block h-7 w-px overflow-hidden bg-line-strong"
      >
        <motion.span
          className="absolute inset-x-0 top-0 block h-2.5 bg-accent"
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "280%"] }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
        />
      </span>
      <span className="caps text-ink-muted">{HERO_COPY.scrollCue}</span>
    </div>
  );
}
