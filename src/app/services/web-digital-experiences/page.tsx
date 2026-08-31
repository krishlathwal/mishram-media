import type { Metadata } from "next";

import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServicePageNav } from "@/components/service-page/ServicePageNav";
import { BeyondWebsites } from "@/components/service-page/web/BeyondWebsites";
import { BuildStage } from "@/components/service-page/web/BuildStage";
import { DigitalWork } from "@/components/service-page/web/DigitalWork";
import { HowWeBuild } from "@/components/service-page/web/HowWeBuild";
import { WhatWeBuild } from "@/components/service-page/web/WhatWeBuild";
import { WhyMishram } from "@/components/service-page/web/WhyMishram";
import { SERVICE_PARENT, resolveServicePage } from "@/config/service-pages";
import { WEB_HERO, WEB_INQUIRY } from "@/config/service-web";
import { BRAND, OG_IMAGE, bookingHref } from "@/config/site";

const PAGE = resolveServicePage("web-digital-experiences");

/** Hoisted so the form's initial state is seeded from a stable reference. */
const PRESELECTED_SERVICES = [PAGE.inquiryServiceId];

/** The section this page's own `Explore Our Work` scrolls to.
 *
 *  Deliberately **not** `work`. `SECTION_ORDER` lists `work` as the homepage's
 *  `05 / Selected Work`, and `useActiveSection` observes it — an `id="work"`
 *  here would light the header's `Work` item while the visitor is on a service
 *  route, which §10j requires to stay neutral. */
const WORK_ANCHOR = "digital-work";

/**
 * The layout's title template appends the brand, so `title` is the service
 * alone. Positioning only — no ranking, no superlative, no guarantee (§1).
 *
 * **`noindex` while the route is unapproved.** `config/service-pages.ts` still
 * carries `built: false` for this slug, so nothing on the site links here and
 * the page is reachable by direct URL for review only. That is the same
 * treatment §10s gives a hidden service, and it is removed in the same commit
 * that flips `built` — one change, not a cleanup to remember.
 */
export const metadata: Metadata = {
  title: PAGE.metadata?.title,
  description: PAGE.metadata?.description,
  robots: PAGE.built ? undefined : { index: false, follow: false },
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
 * 04 / WEB & DIGITAL EXPERIENCES
 *
 * The service page §10o held back for a dedicated pass, and the widest scope on
 * the site: websites, commerce, digital products, custom software, internal
 * tools and mobile applications. It is also the only service where **the work
 * itself is public** — two live URLs a visitor can open and judge — which sets
 * both the opportunity and the discipline for the whole route.
 *
 * **THE CONCEPT: THE DIGITAL BUILD STAGE.** Every composition on the route
 * draws the same object at a different stage of being built — measured field,
 * structure, interface, responsive form, system. The hero draws all five at
 * once in depth; the work section replaces the drawing with the real thing.
 *
 * **The rhythm is its own**, so no two service pages walk in step:
 *
 * ```
 * 01  hero → positioning → system → interaction → scope → proof → audience → process → FAQ
 * 02  hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
 * 03  hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
 * 04  hero → PROOF → …
 * ```
 *
 * **Proof arrives second here, earlier than anywhere else on the site.** On the
 * other three services the evidence is a method and has to be explained before
 * it can be shown. Here it is two websites. A visitor who can open the work
 * should not have to read five screens first, and the page earns the rest of
 * itself afterwards.
 *
 * **THE CTA HIERARCHY INVERTS**, and deliberately. Services 01–03 open with the
 * booking ask because a call is the natural first step into a retainer; a build
 * starts with a brief, so `Start a Project` leads, `Explore Our Work` sits
 * beside it, and the consultation moves to a quiet third link — never a third
 * button. `ServiceHero` grew one optional slot for that; the other four pages
 * are untouched.
 *
 * **BUILD STATE.** The build index, the custom-software chapter and the
 * Mishram argument are written. What is left of the approved flow — a
 * responsive demonstration, a development process and a technology philosophy
 * — collapses into **one** compact `How We Build` chapter before the inquiry
 * section rather than three cinematic ones, because the route already measures
 * ~14,000px on a phone without them. It is **absent rather than stubbed**; no
 * placeholder reaches this route.
 */
export default function WebDigitalExperiencesPage() {
  return (
    <>
      <ServiceHero
        parent={SERVICE_PARENT}
        title={PAGE.title}
        headline={WEB_HERO.headline}
        accentWord={WEB_HERO.accentWord}
        lead={WEB_HERO.lead}
        detail={WEB_HERO.detail}
        primary={{
          label: WEB_HERO.primaryCta,
          href: "#project-inquiry",
        }}
        secondary={{
          label: WEB_HERO.secondaryCta,
          href: `#${WORK_ANCHOR}`,
        }}
        // The existing Mishram booking route, kept available without competing
        // with the two actions above it.
        tertiary={{
          label: WEB_HERO.tertiaryCta,
          href: bookingHref,
          external: true,
        }}
        primaryNote={WEB_HERO.tertiaryNote}
        signalPath={WEB_HERO.signalPath}
        // No photography in this composition, so the caption slot carries the
        // page's integrity note instead of an attribution line.
        caption={WEB_HERO.note}
        visual={<BuildStage />}
        // Four surfaces at four depths need more room than the single anchored
        // object the other three heroes carry.
        wideVisual
      />

      {/* Proof, before argument. */}
      <DigitalWork id={WORK_ANCHOR} />

      {/* The breadth, argued as one capability rather than listed as thirty —
          and ending on the connectors that leave the frame, so the custom
          software chapter has somewhere to begin. */}
      <WhatWeBuild id="what-we-build" />

      {/* The perception shift: the website is one node in a system Mishram
          also builds. Carries the ink environment, and ends on the routes that
          leave the frame toward the growth argument. */}
      <BeyondWebsites id="beyond-websites" />

      {/* Out of the ink environment and back onto the page's own canvas — the
          positioning chapter, and the only one here that is not about what
          Mishram builds. It picks up the five words §04 ends on and gives them
          a route, so the chapter break is a reprise rather than a restart.

          Deliberately the cheapest section on the page: no pinned track, no
          state machine, one drawing drawn once. The route needs to exhale
          before the form. */}
      <WhyMishram id="why-mishram" slug={PAGE.slug} />

      {/* The last thing the page argues, and the shortest: what building here
          is actually like. Process, technical approach and capability in one
          chapter rather than four — §10z — and it ends on the stack statement
          rather than a call to action, because the next section is one. */}
      <HowWeBuild id="how-we-build" />

      {/* The shared section, the shared form and the shared `/api/inquiry`
          route — with this service already ticked. It **is** this page's
          closing CTA: `Tell us what you're building.` is the question §06
          leaves the visitor with, so no separate final CTA is built. */}
      <ProjectInquiry
        initialServices={PRESELECTED_SERVICES}
        note={WEB_INQUIRY.note}
        context={WEB_INQUIRY.context}
      />

      {/* Derived from the public registry. While this route is unapproved it
          finds no index and renders nothing at all, rather than a lonely link
          — `adjacentServicePages` returning `{null, null}` is the correct
          answer for a page that is not yet part of the sequence. */}
      <ServicePageNav slug={PAGE.slug} />

      {/* The Footer closes the page from `app/layout.tsx`, outside <main>. */}
    </>
  );
}
