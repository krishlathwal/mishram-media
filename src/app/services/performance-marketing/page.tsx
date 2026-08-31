import type { Metadata } from "next";

import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ServiceAudience } from "@/components/service-page/ServiceAudience";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServicePageNav } from "@/components/service-page/ServicePageNav";
import { ServiceProcess } from "@/components/service-page/ServiceProcess";
import { ServiceScope } from "@/components/service-page/ServiceScope";
import { ServiceStatement } from "@/components/service-page/ServiceStatement";
import { CreativeTestBench } from "@/components/service-page/performance/CreativeTestBench";
import { ExperimentField } from "@/components/service-page/performance/ExperimentField";
import { LandingExperience } from "@/components/service-page/performance/LandingExperience";
import { PerformancePath } from "@/components/service-page/performance/PerformancePath";
import { ScopeExperimentMark } from "@/components/service-page/performance/ScopeExperimentMark";
import { SERVICE_PARENT, resolveServicePage } from "@/config/service-pages";
import {
  PERFORMANCE_AUDIENCE,
  PERFORMANCE_FAQ,
  PERFORMANCE_FAQ_COPY,
  PERFORMANCE_HERO,
  PERFORMANCE_HYPOTHESIS,
  PERFORMANCE_INQUIRY,
  PERFORMANCE_PROCESS,
  PERFORMANCE_PROCESS_COPY,
  PERFORMANCE_SCOPE,
  PERFORMANCE_SCOPE_COPY,
} from "@/config/service-performance";
import { BRAND, OG_IMAGE, bookingHref } from "@/config/site";

const PAGE = resolveServicePage("performance-marketing");

/** Hoisted so the form's initial state is seeded from a stable reference. */
const PRESELECTED_SERVICES = [PAGE.inquiryServiceId];

/**
 * The layout's title template appends the brand, so `title` is the service
 * alone. Positioning only — **no ranking, no superlative, no guarantee** (§1),
 * and on this page in particular no promised return.
 */
export const metadata: Metadata = {
  title: PAGE.metadata?.title,
  description: PAGE.metadata?.description,
  alternates: { canonical: PAGE.path },
  openGraph: {
    title: `${PAGE.metadata?.title} — ${BRAND.name}`,
    description: PAGE.metadata?.description,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    url: PAGE.path,
    images: [OG_IMAGE],
  },
};

/**
 * 03 / PERFORMANCE MARKETING
 *
 * The third service page, and the one that has to carry a story with **no
 * creators in it at all**. Service 01 is one identity becoming a system;
 * Service 02 is many voices becoming one campaign; this is neither — it is
 * variants, distribution, a destination and what the response changes.
 *
 * **THE CONCEPT: THE EXPERIMENT ENGINE.** Every composition on the route draws
 * the same loop at a different scale — hypothesis → creative variants → paid
 * distribution → landing experience → signal → the next test. The hero draws it
 * spatially, the creative section lets the visitor operate one turn of it, the
 * path draws it as a closed circuit, and the destination section argues the
 * half of it everyone inherits rather than builds.
 *
 * **The rhythm is its own**, so no two service pages walk in step:
 *
 * ```
 * 01  hero → positioning → system → interaction → scope → proof → audience → process → FAQ
 * 02  hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
 * 03  hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
 * ```
 *
 * The interaction arrives **second** here, earlier than on either page before
 * it, because on this service the method is the product — a visitor who
 * operates one test has understood the pitch. Scope arrives late, after the
 * page has shown the work rather than listed it.
 *
 * **Two sections carry two movements each**, which is why this route runs nine
 * chapters where the brief sketched twelve. Creative holds the variant sheet
 * and the bench; the path holds the loop and what the loop changes. Both merges
 * removed a genuine repeat rather than trimming content — see the notes in
 * `config/service-performance.ts`.
 *
 * **NOT ONE NUMBER APPEARS ON THIS ROUTE.** No ROAS, CTR, CPA, CPM, spend,
 * revenue, conversion count, lead volume or percentage — not even decoratively,
 * because a decorative figure on a performance page is read as a claim. There
 * is no dashboard, no ad-manager chrome, no Meta UI, no chart with an axis and
 * no red/green state anywhere. The full boundary and the reasoning behind each
 * omission is at the head of `config/service-performance.ts`.
 *
 * **No photography, and no image request at all.** A deliberate inversion of
 * Service 02's fifteen: this page is about method rather than people, so every
 * surface on it is CSS, SVG and type.
 */
export default function PerformanceMarketingPage() {
  return (
    <>
      <ServiceHero
        parent={SERVICE_PARENT}
        title={PAGE.title}
        headline={PERFORMANCE_HERO.headline}
        accentWord={PERFORMANCE_HERO.accentWord}
        lead={PERFORMANCE_HERO.lead}
        detail={PERFORMANCE_HERO.detail}
        primary={{
          label: PERFORMANCE_HERO.primaryCta,
          href: bookingHref,
          external: true,
        }}
        primaryNote={PERFORMANCE_HERO.primaryCtaNote}
        secondary={{
          label: PERFORMANCE_HERO.secondaryCta,
          href: "#project-inquiry",
        }}
        signalPath={PERFORMANCE_HERO.signalPath}
        // No photography in this composition, so the caption slot carries the
        // page's integrity note instead of an attribution line.
        caption={PERFORMANCE_HERO.note}
        visual={<ExperimentField />}
      />

      <ServiceStatement
        id="hypothesis"
        copy={PERFORMANCE_HYPOTHESIS}
        body={PERFORMANCE_HYPOTHESIS.body}
        baseline={PERFORMANCE_HYPOTHESIS.baseline}
      />

      {/* The page's centre of gravity, and its one interactive moment. Two
          movements in one section: the variant sheet — what a creative test
          produces — and then the bench, where it is decided. It arrives early
          because on this service the method *is* what is being sold. */}
      <CreativeTestBench id="creative" />

      {/* The loop drawn, then what the loop is allowed to change. */}
      <PerformancePath id="performance-path" />

      <LandingExperience id="destination" />

      <ServiceScope
        id="scope"
        copy={PERFORMANCE_SCOPE_COPY}
        items={PERFORMANCE_SCOPE}
        // The shared index, art-directed for this page through its own slot
        // rather than by forking the component (§10l).
        accessory={<ScopeExperimentMark />}
      />

      <ServiceAudience
        id="who-its-for"
        copy={{
          label: PERFORMANCE_AUDIENCE.label,
          headline: PERFORMANCE_AUDIENCE.statement,
          lead: PERFORMANCE_AUDIENCE.note,
        }}
        audiences={PERFORMANCE_AUDIENCE.audiences}
      />

      <ServiceProcess
        id="approach"
        copy={PERFORMANCE_PROCESS_COPY}
        steps={PERFORMANCE_PROCESS}
      />

      <ServiceFaq id="faq" copy={PERFORMANCE_FAQ_COPY} items={PERFORMANCE_FAQ} />

      {/* The shared section, the shared form and the shared `/api/inquiry`
          route — with this service already ticked. */}
      <ProjectInquiry
        initialServices={PRESELECTED_SERVICES}
        note={PERFORMANCE_INQUIRY.note}
        context={PERFORMANCE_INQUIRY.context}
      />

      {/* Derived from the built registry — with three routes live it shows
          `Previous service — Influencer Marketing`. */}
      <ServicePageNav slug={PAGE.slug} />

      {/* The Footer closes the page from `app/layout.tsx`, outside <main>. */}
    </>
  );
}
