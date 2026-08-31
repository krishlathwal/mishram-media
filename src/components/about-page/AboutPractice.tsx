"use client";

import { motion } from "motion/react";

import { PageLink } from "@/components/ui/PageLink";
import { ABOUT_PAGE_COPY } from "@/config/about-page";
import { servicePageHrefFor } from "@/config/service-pages";
import { PUBLIC_SERVICES } from "@/config/services";

import { AboutSection, AboutSectionHead, EASE } from "./AboutSection";

/**
 * WHAT WE DO TODAY — a capability index, not a service grid.
 *
 * Large numbered rows on hairlines: the index of a practice, read in one pass.
 * **No cards, no icons, no six-feature grid** (§18).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * REGISTRY-DRIVEN, AND THAT IS THE POINT.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * All five services render, because all five are genuine Mishram capabilities
 * and the homepage has said so since §02 was approved. The **action** comes
 * from `servicePageHrefFor`, which returns a path only for a route that is
 * `built` — so **Service 04 / Web & Digital Experiences appears as a named
 * capability with no link at all.**
 *
 * Not a `Coming Soon`. Not a disabled control. Not an `href="#"`. Not a
 * placeholder page committed to make a link valid. The row is simply a row —
 * which is §18's standing rule, and the same behaviour the homepage's
 * `02 / What We Do` already has.
 *
 * **Shipping that route lights this index with no edit here.**
 */
export function AboutPractice() {
  const copy = ABOUT_PAGE_COPY.practice;

  return (
    <AboutSection id="practice" labelledBy="practice-title" grid="full">
      <AboutSectionHead
        id="practice-title"
        label={copy.label}
        headline={copy.headline}
        accentWord={copy.accentWord}
        lead={copy.lead}
      />

      {/* `PUBLIC_SERVICES`, not `SERVICES` — this rendered all five and so
          listed Brand Shoots & Content as a flagship discipline, unlinked,
          long after it came off public discovery everywhere else on the site.
          The homepage, the header menu and the footer directory all read the
          public list; About was the one surface that did not, which is how it
          drifted. */}
      <ul className="mt-14 border-t border-line md:mt-16">
        {PUBLIC_SERVICES.map((service, i) => {
          const href = servicePageHrefFor(service.id);
          const title = service.title.join(" ");

          const body = (
            <>
              <span className="caps w-8 shrink-0 pt-[0.45em] text-[0.5625rem] text-ink-muted transition-colors duration-300 group-hover:text-accent">
                {service.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[clamp(1.35rem,2.9vw,2.35rem)] leading-[1.08] font-medium tracking-[-0.034em] text-ink">
                  {title}
                </span>
                <span className="mt-3 block max-w-[48ch] text-[0.875rem] leading-[1.7] text-ink-soft">
                  {service.description}
                </span>
              </span>
              {href ? (
                <span className="caps hidden shrink-0 items-center gap-2 self-center text-ink-muted transition-colors duration-300 group-hover:text-ink sm:flex">
                  {copy.action}
                  <span aria-hidden>↗</span>
                </span>
              ) : null}
            </>
          );

          return (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.07, ease: EASE }}
              className="border-b border-line"
            >
              {href ? (
                <PageLink href={href} className="abt-svc-row group">
                  {body}
                </PageLink>
              ) : (
                // No route exists, so there is nothing to link and nothing is
                // faked. A plain row — the capability is still stated.
                <div className="abt-svc-row">{body}</div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </AboutSection>
  );
}
