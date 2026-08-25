"use client";

import { motion } from "motion/react";

import { PERFORMANCE_LANDING } from "@/config/service-performance";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * THE LANDING EXPERIENCE — the half of the campaign that is usually inherited.
 *
 * This section exists because Mishram builds the destination as well, and a
 * performance page that stops at the ad describes only half of what the money
 * does. It is the one place on this route where the web capability is visible,
 * and it is deliberately an **argument**, not a cross-sell.
 *
 * **NO LINK TO `/services/web-digital-experiences`.** That route does not exist
 * yet, and this site never links to one that does not (§18). When Service 04
 * ships, a contextual link belongs here — recorded in the brief rather than
 * left as a comment nobody finds.
 *
 * WHAT THE COMPOSITION IS NOT. No browser chrome, no address bar, no phone
 * bezel, no client site, no brand, no product, no checkout, no form, no cookie
 * banner and no figure of any kind. Two abstract interface surfaces at
 * genuinely different layouts — the mobile one is **re-laid out rather than
 * scaled**, which is the section's own point about paid-social traffic — plus a
 * three-step conversion path drawn as a line.
 *
 * The surfaces are absolutely positioned percentages of a fixed-aspect box, so
 * the overlap is identical at every viewport, and it collapses to a two-column
 * flow below `lg` where there is no room for the composition.
 */
export function LandingExperience({ id }: { id: string }) {
  const { labels } = PERFORMANCE_LANDING;

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={PERFORMANCE_LANDING}
          lead="below"
          className="lg:col-span-5"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.85, delay: 0.18, ease: EASE }}
          className="mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end"
        >
          {PERFORMANCE_LANDING.body.map((paragraph, i) => (
            <p
              key={paragraph.slice(0, 24)}
              className={`max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] ${
                i === 0 ? "text-ink/75" : "mt-6 text-ink-soft"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* ── The destination, drawn ────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-8% 0px" }}
        className="mt-12 md:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        <div className="lg:col-span-7">
          {/* Two slots, each holding a screen and its own label. Absolutely
              placed and overlapping from `md`, and a plain stacked flow below
              that — a 22%-wide phone mockup on a 350px screen would be the
              microscopic webpage the brief rules out. Wrapping screen + label
              together is what lets one markup do both. */}
          <div className="pfm-destination">
            <motion.div
              className="pfm-screen-slot pfm-screen-slot--desktop"
              variants={{
                hidden: { opacity: 0, y: 18 },
                shown: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {/* Desktop. A masthead, one argument, one action — no chrome. */}
              <div className="pfm-screen pfm-screen--desktop">
              <span aria-hidden className="pfm-screen-bar">
                <span className="pfm-screen-mark" />
                <span className="pfm-screen-nav" />
              </span>
              <span aria-hidden className="pfm-screen-body">
                <span className="pfm-screen-col">
                  <span className="pfm-row-rule pfm-row-rule--strong" style={{ width: "88%" }} />
                  <span className="pfm-row-rule pfm-row-rule--strong" style={{ width: "62%" }} />
                  <span className="pfm-row-rule" style={{ width: "76%" }} />
                  <span className="pfm-row-rule" style={{ width: "58%" }} />
                  <span className="pfm-row-action" style={{ width: "48%" }} />
                </span>
                <span className="pfm-screen-media" />
              </span>
              <span aria-hidden className="pfm-screen-foot">
                <span className="pfm-row-block" />
                <span className="pfm-row-block" />
                <span className="pfm-row-block" />
              </span>
              </div>
              <span aria-hidden className="caps pfm-screen-label">
                {labels.desktop}
              </span>
            </motion.div>

            <motion.div
              className="pfm-screen-slot pfm-screen-slot--mobile"
              variants={{
                hidden: { opacity: 0, y: 22 },
                shown: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
            >
              {/* Mobile. Genuinely re-laid out — one column, the action pinned
                  to the foot — because that is the section's own argument. */}
              <div className="pfm-screen pfm-screen--mobile">
                <span aria-hidden className="pfm-screen-bar">
                  <span className="pfm-screen-mark" />
                </span>
                <span aria-hidden className="pfm-screen-stack">
                  <span className="pfm-row-rule pfm-row-rule--strong" style={{ width: "92%" }} />
                  <span className="pfm-row-rule" style={{ width: "70%" }} />
                  <span className="pfm-screen-media pfm-screen-media--stacked" />
                  <span className="pfm-row-rule" style={{ width: "84%" }} />
                  <span className="pfm-row-rule" style={{ width: "60%" }} />
                </span>
                <span aria-hidden className="pfm-screen-sticky">
                  <span className="pfm-row-action" style={{ width: "100%" }} />
                </span>
              </div>
              <span aria-hidden className="caps pfm-screen-label">
                {labels.mobile}
              </span>
            </motion.div>
          </div>

          <p className="mt-6 max-w-[62ch] text-[0.75rem] leading-[1.7] text-ink-muted">
            {PERFORMANCE_LANDING.caption}
          </p>
        </div>

        {/* ── What the page has to do ───────────────────────────────
            Real DOM text, and the conversion path stated as three words on a
            line rather than drawn as a funnel — a funnel graphic implies
            drop-off rates, and there are none to show.

            Four requirements, deliberately as a short list rather than four
            titled blocks: this section's job is to say the destination is part
            of the campaign, not to become a web-services page. */}
        <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          <motion.ul
            className="caps flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-5 text-ink-muted"
            variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {labels.path.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden className="text-ink-muted/60">
                    &rarr;
                  </span>
                ) : null}
                <span className={i === labels.path.length - 1 ? "text-accent" : undefined}>
                  {step}
                </span>
              </li>
            ))}
          </motion.ul>

          <ol>
            {PERFORMANCE_LANDING.requirements.map((item, i) => (
              <motion.li
                key={item.index}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  shown: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: EASE }}
                className="pfm-requirement"
              >
                <span aria-hidden className="pfm-requirement-tick" />
                <span className="block text-[0.9375rem] leading-[1.4] font-medium text-ink">
                  {item.name}
                </span>
                <span className="mt-1.5 block max-w-[40ch] text-[0.8125rem] leading-[1.6] text-ink-soft">
                  {item.note}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </ServiceSection>
  );
}
