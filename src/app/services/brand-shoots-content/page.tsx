import type { Metadata } from "next";

import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ServiceAudience } from "@/components/service-page/ServiceAudience";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServicePageNav } from "@/components/service-page/ServicePageNav";
import { ServiceProcess } from "@/components/service-page/ServiceProcess";
import { ServiceScope } from "@/components/service-page/ServiceScope";
import { ContactSheet } from "@/components/service-page/shoots/ContactSheet";
import { DirectionDesk } from "@/components/service-page/shoots/DirectionDesk";
import { FormatSystem } from "@/components/service-page/shoots/FormatSystem";
import { ScopeFrameMark } from "@/components/service-page/shoots/ScopeFrameMark";
import { Selects } from "@/components/service-page/shoots/Selects";
import { ShotBuilder } from "@/components/service-page/shoots/ShotBuilder";
import { SERVICE_PARENT, resolveServicePage } from "@/config/service-pages";
import {
  SHOOTS_AUDIENCE,
  SHOOTS_FAQ,
  SHOOTS_FAQ_COPY,
  SHOOTS_HERO,
  SHOOTS_INQUIRY,
  SHOOTS_PROCESS,
  SHOOTS_PROCESS_COPY,
  SHOOTS_SCOPE,
  SHOOTS_SCOPE_COPY,
} from "@/config/service-shoots";
import { BRAND, bookingHref } from "@/config/site";

const PAGE = resolveServicePage("brand-shoots-content");

/** Hoisted so the form's initial state is seeded from a stable reference. */
const PRESELECTED_SERVICES = [PAGE.inquiryServiceId];

/**
 * The layout's title template appends the brand, so `title` is the service
 * alone. Positioning only — **no ranking, no superlative, no guarantee** (§1).
 *
 * **`robots` is derived, not typed in.** While the service is off public
 * discovery (`public: false` in `config/services.ts`) nothing on the site
 * links here, so the page must not be indexed either — a route that is
 * deliberately hidden should not arrive through search. `noindex, nofollow`
 * lifts by itself the moment that flag goes back to `true`, which is what
 * stops it being left behind on a page that is public again.
 */
export const metadata: Metadata = {
  title: PAGE.metadata?.title,
  description: PAGE.metadata?.description,
  alternates: { canonical: PAGE.path },
  robots: PAGE.service.public
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: `${PAGE.metadata?.title} — ${BRAND.name}`,
    description: PAGE.metadata?.description,
    siteName: BRAND.name,
    locale: "en_IN",
    type: "website",
    url: PAGE.path,
  },
};

/**
 * 05 / BRAND SHOOTS & CONTENT
 *
 * ─────────────────────────────────────────────────────────────────────────
 * **HIDDEN FROM PUBLIC DISCOVERY — Revision 16. THE PAGE IS NOT DELETED AND
 * NOT DEPRECATED.**
 *
 * Everything below this notice is untouched and still works. The client asked
 * for the discipline to come off the public site during a creator and brand
 * outreach campaign, so `public: false` in `config/services.ts` takes it out
 * of the homepage `What We Do` sequence, both services menus, the footer's
 * services directory, prev/next and the `/about` capability link — and adds
 * the `noindex, nofollow` above. The route still resolves by direct URL, on
 * purpose, so nothing here has to be re-verified before it comes back.
 *
 * **Restoring it is one boolean.** Do not "clean up" this page, do not remove
 * its scene from the `SCENES` map in `whatwedo/ServiceStage.tsx`, and do not
 * renumber Service 04 to close the gap.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The fourth service page built, and it keeps its canonical index — **05, not
 * 04.** Service 04 / Web & Digital Experiences is deliberately deferred for a
 * dedicated deep build, so the built sequence is temporarily 01 → 02 → 03 → 05
 * and the numbering gap is honest rather than hidden. Nothing on this page
 * hardcodes either fact: `resolveServicePage` reads the index off
 * `config/services.ts`, and prev/next reads `BUILT_SERVICE_PAGES`.
 *
 * **THE CONCEPT: THE SHOOT BOARD.** A creative director's wall rather than a
 * portfolio — idea → direction → frame → format → library. The hero is a
 * working contact sheet, the interaction lets a visitor build a different kind
 * of frame, the format section proves one photograph becomes four shapes, and
 * the selects are the library that comes out of it.
 *
 * **This is the site's most photographic page, and the least diagrammatic.**
 * Services 01–03 argue with lines, nodes and abstract surfaces; this one argues
 * with photographs, crops and crop marks. There is not a single connected-system
 * diagram on it — the one SVG on the route is the scope accessory.
 *
 * **The rhythm is its own**, so no two service pages walk in step:
 *
 * ```
 * 01  hero → positioning → system → interaction → scope → proof → audience → process → FAQ
 * 02  hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
 * 03  hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
 * 05  hero → direction → interaction → formats + outputs → scope → selects → audience → process → FAQ
 * ```
 *
 * Two sections carry two movements each — direction holds the statement and the
 * desk, formats holds the crops and where they go — and both merges removed a
 * genuine repeat rather than trimming content. That is §10m's lesson applied
 * before it cost anything.
 *
 * **CONTENT INTEGRITY.** No client, campaign, brand relationship, photographer
 * or creative-director credit, camera, lens, location, date or budget. No shoot
 * count, turnaround time, package or price. No result of any kind. Every
 * photograph is one of the five approved creator files, and the old site's
 * brand-shoot gallery is unusable — 16 of its 19 images are §9-excluded
 * categories. The full audit is at the head of `config/service-shoots.ts`.
 */
export default function BrandShootsContentPage() {
  return (
    <>
      <ServiceHero
        parent={SERVICE_PARENT}
        title={PAGE.title}
        headline={SHOOTS_HERO.headline}
        accentWord={SHOOTS_HERO.accentWord}
        lead={SHOOTS_HERO.lead}
        detail={SHOOTS_HERO.detail}
        primary={{
          label: SHOOTS_HERO.primaryCta,
          href: bookingHref,
          external: true,
        }}
        primaryNote={SHOOTS_HERO.primaryCtaNote}
        secondary={{
          label: SHOOTS_HERO.secondaryCta,
          href: "#project-inquiry",
        }}
        signalPath={SHOOTS_HERO.signalPath}
        caption={SHOOTS_HERO.pictured}
        visual={<ContactSheet />}
      />

      {/* The calm beat and the direction desk in one section: the statement
          and its illustration were the same sentence twice. */}
      <DirectionDesk id="direction" />

      {/* The page's one interactive moment. */}
      <ShotBuilder id="shot-builder" />

      {/* One production → four shapes, then the five places they go. */}
      <FormatSystem id="formats" />

      <ServiceScope
        id="scope"
        copy={SHOOTS_SCOPE_COPY}
        items={SHOOTS_SCOPE}
        // The shared index, art-directed for this page through its own slot
        // rather than by forking the component (§10l).
        accessory={<ScopeFrameMark />}
      />

      <Selects id="selects" />

      <ServiceAudience
        id="who-its-for"
        copy={{
          label: SHOOTS_AUDIENCE.label,
          headline: SHOOTS_AUDIENCE.statement,
          lead: SHOOTS_AUDIENCE.note,
        }}
        audiences={SHOOTS_AUDIENCE.audiences}
      />

      <ServiceProcess
        id="approach"
        copy={SHOOTS_PROCESS_COPY}
        steps={SHOOTS_PROCESS}
      />

      <ServiceFaq id="faq" copy={SHOOTS_FAQ_COPY} items={SHOOTS_FAQ} />

      {/* The shared section, the shared form and the shared `/api/inquiry`
          route — with this service already ticked. */}
      <ProjectInquiry
        initialServices={PRESELECTED_SERVICES}
        note={SHOOTS_INQUIRY.note}
        context={SHOOTS_INQUIRY.context}
      />

      {/* Derived from the built registry. With Service 04 deferred this shows
          `Previous service — Performance Marketing` and no next. */}
      <ServicePageNav slug={PAGE.slug} />

      {/* The Footer closes the page from `app/layout.tsx`, outside <main>. */}
    </>
  );
}
