"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";
import { ABOUT_PAGE_COPY, ABOUT_PERSON } from "@/config/about-page";
import { BRAND, SOCIAL_URLS } from "@/config/site";
import { onTrackedClick } from "@/lib/analytics";

import { AboutSection, EASE } from "./AboutSection";

/**
 * WHERE WE ARE NOW — the forward-looking close, and the page's bridge into the
 * inquiry form.
 *
 * **No scale claims.** No client count, creator count, headcount, offices,
 * "award-winning team" or "industry leader". What the section says instead is
 * what the chronology has already proven: the mix has changed every couple of
 * years and is expected to keep changing.
 *
 * **The technology paragraph is a signal, not a landing page.** Web & Digital
 * Experiences is strategically the most important unbuilt route on the site
 * (§10o), so this names it as a growing part of the practice and stops. It does
 * **not** describe the offering, list capabilities or link anywhere — that page
 * gets its own deep discovery and build.
 *
 * **`INDIA` is the only locator**, for the reason §10f records: the old site
 * contradicts itself on every city it names.
 */
/**
 * ONE NAMED HUMAN, in the chapter about the present tense.
 *
 * The page argues by provenance — dates, records, portraits, a recognition —
 * and until Revision 37 the one thing it could not show was a person. §10f
 * wrote the unblock five revisions ago: *"A genuine agency or BTS photograph
 * would slot into the right column if the client supplies one."*
 *
 * **A name, an entity and a link. No title, and no biography.** The whole of
 * the reasoning, including every source that was searched, is at
 * `ABOUT_PERSON` in `config/about-page.ts` — read it before adding a word.
 * `role` is rendered only if it is ever set, so confirming the title is a
 * one-line config edit rather than a component change.
 *
 * **It sits in the left column's own headroom**, which is the §10ak move: the
 * chapter's height was set by the body paragraphs on the right while the left
 * held a headline and a locator with a third of a column empty beneath them.
 * That is what makes a real portrait affordable here.
 */
function Person() {
  const href = SOCIAL_URLS.linkedin;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
      className="mt-12 flex items-end gap-6 sm:gap-7"
    >
      {/* The width lives on this wrapper, never on `.abt-frame` itself —
          `.abt-frame` is `width: 100%` in globals.css, so a width utility on
          it is overridden and the portrait silently fills the whole column.
          That happened once and it took the name block's width with it. */}
      <div className="w-[8.5rem] shrink-0 sm:w-[10rem] lg:w-[11.5rem]">
        <span
          className="abt-frame block"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            src={ABOUT_PERSON.image}
            alt={ABOUT_PERSON.alt}
            fill
            // Measured against the wrapper: 136px below sm, 160px to lg, 184px above.
            sizes="(max-width: 639px) 136px, (max-width: 1023px) 160px, 184px"
            className="abt-photo object-cover"
          />
        </span>
      </div>

      <div className="pb-1">
        <p className="font-display text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.15] font-medium tracking-[-0.025em] text-ink">
          {ABOUT_PERSON.name}
        </p>

        {/* Renders only if the client ever confirms the title. Absent today,
            and absent deliberately — see ABOUT_PERSON. */}
        {ABOUT_PERSON.role ? (
          <p className="caps mt-2.5 text-ink-muted">{ABOUT_PERSON.role}</p>
        ) : null}

        <p className="caps mt-2.5 text-ink-muted">{ABOUT_PERSON.context}</p>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ABOUT_PERSON.name} on ${ABOUT_PERSON.linkLabel}`}
            // The existing vocabulary, reused. No new GA event was added.
            onClick={onTrackedClick({
              name: "social_outbound",
              platform: "linkedin",
              context: "about_person",
            })}
            className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink"
          >
            <span className="relative">
              {ABOUT_PERSON.linkLabel}
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
        ) : null}
      </div>
    </motion.div>
  );
}

export function AboutNow() {
  const { openContact } = useContact();
  const copy = ABOUT_PAGE_COPY.now;

  return (
    <AboutSection id="now" labelledBy="now-title" grid="edges">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="caps flex items-center gap-3 text-ink-muted"
          >
            <span aria-hidden className="block h-px w-6 bg-accent" />
            {copy.label}
          </motion.p>

          <motion.h2
            id="now-title"
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="mt-7 max-w-[14ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] font-medium tracking-[-0.036em] text-ink"
          >
            {[copy.headline[0], copy.headline[1]].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{
                    duration: 0.9,
                    delay: 0.06 + i * 0.08,
                    ease: EASE,
                  }}
                  className="block"
                >
                  {i === 1 ? (
                    <>
                      Still{" "}
                      <span className="font-accent italic">
                        {copy.accentWord}
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <Person />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.85, delay: 0.14, ease: EASE }}
          className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-2"
        >
          {copy.body.map((para, i) => (
            <p
              key={para.slice(0, 20)}
              className={`max-w-[56ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72 ${
                i > 0 ? "mt-7" : ""
              }`}
            >
              {para}
            </p>
          ))}

          {/* The locator moved here from the left column in Revision 37, and
              it was a measurement rather than a preference: once the portrait
              landed, the left column ran 243px past the right and the chapter
              was 145px taller than it needed to be. Under the body it also
              closes the chapter instead of interrupting it, which is the
              better stacked reading order below `lg`. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="caps mt-12 flex items-center gap-3 text-ink-muted"
          >
            <span aria-hidden className="block h-px w-4 bg-line-strong" />
            {copy.locatorLabel}
            <span className="text-ink">{BRAND.locator}</span>
          </motion.p>
        </motion.div>
      </div>

      {/* ── The bridge into the form ─────────────────────────────── */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-14% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="mt-20 block h-px w-full origin-left bg-line md:mt-24"
      />

      <div className="mt-12 flex flex-col gap-10 md:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <motion.p
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,31rem)] font-display text-[clamp(1.6rem,2.9vw,2.6rem)] leading-[1.06] font-medium tracking-[-0.033em] text-ink"
        >
          {copy.closing.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
          className="lg:text-right"
        >
          {/* The same pair the homepage About closes on: a bridge into the form
              directly below, and the panel beside it. **No booking CTA** — this
              page never asks for a calendar slot. */}
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 lg:justify-end">
            <a
              href={copy.primaryCtaHref}
              className="group inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink"
            >
              <span className="relative">
                {copy.primaryCta}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)]"
                />
              </span>
              <span aria-hidden className="block h-3.5 w-3.5 overflow-hidden">
                <Arrow
                  size={14}
                  className="rotate-90 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-y-5"
                />
              </span>
            </a>

            <button
              type="button"
              onClick={openContact}
              className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              <span className="relative">
                {copy.secondaryCta}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AboutSection>
  );
}
