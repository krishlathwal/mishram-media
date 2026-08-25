import type { Metadata } from "next";

import { AboutCredibility } from "@/components/about-page/AboutCredibility";
import { AboutDisciplines } from "@/components/about-page/AboutDisciplines";
import { AboutHero } from "@/components/about-page/AboutHero";
import { AboutNow } from "@/components/about-page/AboutNow";
import { AboutOrigin } from "@/components/about-page/AboutOrigin";
import { AboutPractice } from "@/components/about-page/AboutPractice";
import { AboutPrinciples } from "@/components/about-page/AboutPrinciples";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ABOUT_PAGE_COPY } from "@/config/about-page";
import { BRAND, ABOUT_PATH } from "@/config/site";

/**
 * The layout's title template appends the brand, so `title` is the page alone
 * and the rendered title is `About — Mishram Media`. Positioning only: **no
 * ranking, no superlative, no scale claim** (§1).
 */
export const metadata: Metadata = {
  title: ABOUT_PAGE_COPY.meta.title,
  description: ABOUT_PAGE_COPY.meta.description,
  alternates: { canonical: ABOUT_PATH },
  openGraph: {
    title: `${ABOUT_PAGE_COPY.meta.title} — ${BRAND.name}`,
    description: ABOUT_PAGE_COPY.meta.description,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    url: ABOUT_PATH,
  },
};

/**
 * `/about` — THE EDITORIAL ARCHIVE.
 *
 * The site's fifth page type, and deliberately the calmest. Service 01 is a
 * brand system, 02 a creator network, 03 an experiment engine, 05 a shoot
 * board — each built around one signature interaction. **This page has none.**
 * Nothing on it is selectable, nothing reconfigures, and there is no system
 * diagram beyond one small convergence mark. It argues by **provenance**:
 * dates, records, portraits, a recognition, and the type around them.
 *
 * That is not an absence of ideas — it is the correct form for the one page a
 * visitor reads after they have already decided to take Mishram seriously.
 *
 * ### The chapters
 *
 * ```
 * hero          the archive — five fragments from five chapters
 * origin        2021 → 2023 → 2025, what it taught, and who it was with
 * disciplines   four practices converging on one name
 * practice      the five services as a capability index
 * principles    four operating positions
 * on the record recognition + collaborations, as one credibility chapter
 * now           where the practice is going, and the bridge into the form
 * inquiry       the shared form — no service preselected
 * footer        Footer V2, unchanged
 * ```
 *
 * **Three merges were applied up front rather than as a length fix**, because
 * in each case the halves are one argument: origin with creator-native (the
 * second is the consequence of the first), recognition with collaborations
 * (both are short evidence, neither is the subject), and "where we are now"
 * with the closing bridge.
 *
 * ### What is NOT on this page, and why
 *
 * **No team and no founder.** The old site names four people, and the
 * content-migration audit classified all four **B — needs current
 * confirmation**. **No city or office** — the old site contradicts itself, so
 * `INDIA` stands. **No scale claims** of any kind. Full reasoning and every
 * source is at the head of `config/about-page.ts`; read it before adding a
 * sentence here.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOrigin />
      <AboutDisciplines />
      <AboutPractice />
      <AboutPrinciples />
      <AboutCredibility />
      <AboutNow />
      {/* The same section, the same form, the same endpoint as every other
          route. **No service is preselected** — a visitor arriving from the
          company story has not chosen one, and seeding a checkbox here would
          be guessing on their behalf. */}
      <ProjectInquiry
        note={ABOUT_PAGE_COPY.inquiry.note}
        context={ABOUT_PAGE_COPY.inquiry.context}
      />
    </>
  );
}
