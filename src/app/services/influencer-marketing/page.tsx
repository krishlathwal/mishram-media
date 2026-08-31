import type { Metadata } from "next";

import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ServiceAudience } from "@/components/service-page/ServiceAudience";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServicePageNav } from "@/components/service-page/ServicePageNav";
import { ServiceProcess } from "@/components/service-page/ServiceProcess";
import { ServiceScope } from "@/components/service-page/ServiceScope";
import { ServiceStatement } from "@/components/service-page/ServiceStatement";
import { CampaignConstellation } from "@/components/service-page/influencer/CampaignConstellation";
import { CampaignSystem } from "@/components/service-page/influencer/CampaignSystem";
import { CreatorCast } from "@/components/service-page/influencer/CreatorCast";
import { CreatorMatchField } from "@/components/service-page/influencer/CreatorMatchField";
import { FitRelations } from "@/components/service-page/influencer/FitRelations";
import { ScopeConstellationMark } from "@/components/service-page/influencer/ScopeConstellationMark";
import { SERVICE_PARENT, resolveServicePage } from "@/config/service-pages";
import {
  INFLUENCER_AUDIENCE,
  INFLUENCER_FAQ,
  INFLUENCER_FAQ_COPY,
  INFLUENCER_HERO,
  INFLUENCER_INQUIRY,
  INFLUENCER_PROCESS,
  INFLUENCER_PROCESS_COPY,
  INFLUENCER_RELEVANCE,
  INFLUENCER_SCOPE,
  INFLUENCER_SCOPE_COPY,
} from "@/config/service-influencer";
import { BRAND, OG_IMAGE, bookingHref } from "@/config/site";

const PAGE = resolveServicePage("influencer-marketing");

/** Hoisted so the form's initial state is seeded from a stable reference. */
const PRESELECTED_SERVICES = [PAGE.inquiryServiceId];

/**
 * The layout's title template appends the brand, so `title` is the service
 * alone. Positioning only — **no ranking, no superlative, no guarantee** (§1).
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
 * 02 / INFLUENCER MARKETING
 *
 * The second service page, and the first to test whether the shared system
 * (§10j) genuinely carries a different story. It reuses every shared primitive
 * — section shell, head, grid modes, hero, statement, scope index, audience
 * rail, process, FAQ, inquiry, prev/next — and brings four compositions of its
 * own, none of which appears on Service 01.
 *
 * **THE CONCEPT: many creators → one campaign.** Service 01 runs one identity
 * outward into a system. This one runs a field of distinct voices inward onto a
 * single objective. That inversion is what the hero draws, what the match field
 * interacts with and what the campaign system braids — the page is one argument
 * told three ways, not a template with new words in it.
 *
 * **The rhythm is deliberately reordered.** Service 01 goes positioning →
 * system → interaction → scope → proof. This goes relevance → interaction →
 * system → proof → scope, so the two do not walk in step even where they share
 * components: the interaction arrives early because the decision *is* the
 * pitch, and proof comes before scope because the network is the credential.
 *
 * **Not one number anywhere.** No reach, engagement, follower count, creator
 * count, ROI or campaign result — see the header of `config/service-influencer.ts`
 * for the full boundary and why the match field is built the way it is.
 */
export default function InfluencerMarketingPage() {
  return (
    <>
      <ServiceHero
        parent={SERVICE_PARENT}
        title={PAGE.title}
        headline={INFLUENCER_HERO.headline}
        accentWord={INFLUENCER_HERO.accentWord}
        lead={INFLUENCER_HERO.lead}
        detail={INFLUENCER_HERO.detail}
        primary={{
          label: INFLUENCER_HERO.primaryCta,
          href: bookingHref,
          external: true,
        }}
        primaryNote={INFLUENCER_HERO.primaryCtaNote}
        secondary={{
          label: INFLUENCER_HERO.secondaryCta,
          href: "#project-inquiry",
        }}
        signalPath={INFLUENCER_HERO.signalPath}
        caption={INFLUENCER_HERO.pictured}
        visual={<CampaignConstellation />}
      />

      <ServiceStatement
        id="relevance"
        copy={INFLUENCER_RELEVANCE}
        body={INFLUENCER_RELEVANCE.body}
        baseline={INFLUENCER_RELEVANCE.baseline}
      />

      {/* The page's one interactive moment, and it arrives early: on this
          service the decision is the thing being sold. */}
      <CreatorMatchField id="match-field" />

      <CampaignSystem id="campaign-system" />

      <CreatorCast id="creator-proof" />

      <ServiceScope
        id="scope"
        copy={INFLUENCER_SCOPE_COPY}
        items={INFLUENCER_SCOPE}
        // The shared index, art-directed for this page through its own slot
        // rather than by forking the component.
        accessory={<ScopeConstellationMark />}
      />

      <FitRelations id="creator-fit" />

      <ServiceAudience
        id="who-its-for"
        copy={{
          label: INFLUENCER_AUDIENCE.label,
          headline: INFLUENCER_AUDIENCE.statement,
          lead: INFLUENCER_AUDIENCE.note,
        }}
        audiences={INFLUENCER_AUDIENCE.audiences}
      />

      <ServiceProcess
        id="approach"
        copy={INFLUENCER_PROCESS_COPY}
        steps={INFLUENCER_PROCESS}
      />

      <ServiceFaq id="faq" copy={INFLUENCER_FAQ_COPY} items={INFLUENCER_FAQ} />

      {/* The shared section, the shared form and the shared `/api/inquiry`
          route — with this service already ticked. */}
      <ProjectInquiry
        initialServices={PRESELECTED_SERVICES}
        note={INFLUENCER_INQUIRY.note}
        context={INFLUENCER_INQUIRY.context}
      />

      {/* Derived from the built registry — with two routes live it now shows
          `Previous service — Social & Personal Brand Growth`. */}
      <ServicePageNav slug={PAGE.slug} />

      {/* The Footer closes the page from `app/layout.tsx`, outside <main>. */}
    </>
  );
}
