import type { Metadata } from "next";

import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ServiceAudience } from "@/components/service-page/ServiceAudience";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServicePageNav } from "@/components/service-page/ServicePageNav";
import { ServiceProcess } from "@/components/service-page/ServiceProcess";
import { ServiceScope } from "@/components/service-page/ServiceScope";
import { ServiceStatement } from "@/components/service-page/ServiceStatement";
import { ServiceSystem } from "@/components/service-page/ServiceSystem";
import { BrandSignal } from "@/components/service-page/social/BrandSignal";
import { ContentSystemBoard } from "@/components/service-page/social/ContentSystemBoard";
import { CreatorField } from "@/components/service-page/social/CreatorField";
import { SERVICE_PARENT, resolveServicePage } from "@/config/service-pages";
import {
  SOCIAL_AUDIENCE,
  SOCIAL_FAQ,
  SOCIAL_FAQ_COPY,
  SOCIAL_HERO,
  SOCIAL_INQUIRY,
  SOCIAL_PILLARS,
  SOCIAL_POSITIONING,
  SOCIAL_PROCESS,
  SOCIAL_PROCESS_COPY,
  SOCIAL_SCOPE,
  SOCIAL_SCOPE_COPY,
  SOCIAL_SYSTEM_COPY,
  SOCIAL_SYSTEM_LOOP,
} from "@/config/service-social";
import { BRAND, OG_IMAGE, bookingHref } from "@/config/site";

const PAGE = resolveServicePage("social-personal-brand-growth");

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
 * 01 / SOCIAL & PERSONAL BRAND GROWTH
 *
 * The first dedicated service page, and the page the shared system was written
 * against. Its rhythm is the one the other four inherit:
 *
 *   hero (high) → positioning (calm) → system (structural) → board
 *   (interactive) → scope (structured) → proof (photographic) → audience
 *   (calm) → process (structural) → FAQ (practical) → inquiry (conversion)
 *   → footer.
 *
 * **The grid changes with it.** Structured where the content is structural,
 * reduced to its outer columns where it is editorial, absent where a
 * composition is the structure, and resolved to nothing through the inquiry so
 * the Footer starts on clean ground. That mirrors the homepage's philosophy
 * without copying any of its individual moves.
 *
 * **Conversion hierarchy:** the booking ask once, in the hero; the inquiry form
 * once, at the foot; one contextual link out to the creator roster in between.
 * No booking CTA is repeated between sections.
 */
export default function SocialPersonalBrandGrowthPage() {
  return (
    <>
      <ServiceHero
        parent={SERVICE_PARENT}
        title={PAGE.title}
        headline={SOCIAL_HERO.headline}
        accentWord={SOCIAL_HERO.accentWord}
        lead={SOCIAL_HERO.lead}
        detail={SOCIAL_HERO.detail}
        primary={{
          label: SOCIAL_HERO.primaryCta,
          href: bookingHref,
          // Unset NEXT_PUBLIC_BOOKING_URL means this falls back to WhatsApp,
          // which is off-site either way — but only open a new tab when it
          // genuinely leaves for one.
          external: true,
        }}
        primaryNote={SOCIAL_HERO.primaryCtaNote}
        secondary={{
          label: SOCIAL_HERO.secondaryCta,
          href: "#project-inquiry",
        }}
        signalPath={SOCIAL_HERO.signalPath}
        caption={SOCIAL_HERO.pictured}
        visual={<BrandSignal />}
      />

      <ServiceStatement
        id="positioning"
        copy={SOCIAL_POSITIONING}
        body={SOCIAL_POSITIONING.body}
        baseline={SOCIAL_POSITIONING.baseline}
      />

      <ServiceSystem
        id="brand-system"
        copy={SOCIAL_SYSTEM_COPY}
        pillars={SOCIAL_PILLARS}
        loopLabel={SOCIAL_SYSTEM_LOOP}
      />

      {/* The page's one interactive moment. */}
      <ContentSystemBoard id="content-system" />

      <ServiceScope id="scope" copy={SOCIAL_SCOPE_COPY} items={SOCIAL_SCOPE} />

      <CreatorField id="creator-proof" />

      <ServiceAudience
        id="who-its-for"
        copy={{
          label: SOCIAL_AUDIENCE.label,
          headline: SOCIAL_AUDIENCE.statement,
          lead: SOCIAL_AUDIENCE.note,
        }}
        audiences={SOCIAL_AUDIENCE.audiences}
      />

      <ServiceProcess
        id="approach"
        copy={SOCIAL_PROCESS_COPY}
        steps={SOCIAL_PROCESS}
      />

      <ServiceFaq id="faq" copy={SOCIAL_FAQ_COPY} items={SOCIAL_FAQ} />

      {/* The shared section, the shared form and the shared `/api/inquiry`
          route — with this service already ticked. Not a fork, not a second
          form architecture, not a second endpoint. */}
      <ProjectInquiry
        initialServices={PRESELECTED_SERVICES}
        note={SOCIAL_INQUIRY.note}
        context={SOCIAL_INQUIRY.context}
      />

      {/* Renders nothing until a second service route exists. */}
      <ServicePageNav slug={PAGE.slug} />

      {/* The Footer closes the page from `app/layout.tsx`, outside <main>. */}
    </>
  );
}
