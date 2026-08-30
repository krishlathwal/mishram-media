/**
 * THE SERVICE PAGE REGISTRY
 *
 * One entry per dedicated service route. It is deliberately **thin**: almost
 * everything a service page needs to name itself already exists in
 * `config/services.ts` (the homepage's own service order, titles and
 * capabilities) and in `config/inquiry.ts` (the option the form preselects), so
 * this file records only the three facts those two cannot supply — the route
 * segment, which inquiry option belongs to it, and whether the page exists yet.
 *
 * **`built` is the whole safety mechanism.** Prev/next navigation, and anything
 * else that wants to link between service pages, reads `BUILT_SERVICE_PAGES` —
 * so a route that has not been written yet can never be linked to. No
 * placeholder pages, no "coming soon", no dead hrefs.
 *
 * Adding a service page: write the route, fill in `metadata`, flip `built`.
 * Nothing else in the system needs to change.
 */

import { SERVICES, type Service, type ServiceId } from "./services";
import { NAV_ITEMS, SERVICES_ANCHOR, sectionHref } from "./site";

export type ServicePage = {
  /** Route segment under `/services`. */
  slug: string;
  /** The homepage service this page expands. Title and index come from it. */
  serviceId: ServiceId;
  /**
   * Which `INQUIRY_SERVICES` option this route preselects in the shared form.
   * Preselected, never locked — the visitor can deselect it or add others.
   */
  inquiryServiceId: string;
  /**
   * False until the route actually exists. Nothing links to an unbuilt page,
   * and no placeholder route is committed for one.
   */
  built: boolean;
  /**
   * Page-level SEO. Written when the page is built, so an unbuilt entry never
   * carries speculative copy. The layout's title template appends the brand.
   */
  metadata?: {
    title: string;
    description: string;
  };
};

export const SERVICE_PAGES: readonly ServicePage[] = [
  {
    slug: "social-personal-brand-growth",
    serviceId: "social-growth",
    inquiryServiceId: "social",
    built: true,
    metadata: {
      title: "Social & Personal Brand Growth",
      description:
        "Social media management, personal branding, creator growth and content systems built to turn attention into a brand people recognise.",
    },
  },
  {
    slug: "influencer-marketing",
    serviceId: "influencer",
    inquiryServiceId: "influencer",
    built: true,
    metadata: {
      title: "Influencer Marketing",
      description:
        "Creator discovery, campaign strategy and influencer collaborations built around the right people, the right content and a coordinated launch.",
    },
  },
  {
    slug: "performance-marketing",
    serviceId: "performance",
    inquiryServiceId: "performance",
    // Flipped to `true` only after the route existed, the page was complete,
    // the responsive sweep passed, preselection worked, accessibility passed
    // and the production build succeeded — the §10l discipline.
    built: true,
    metadata: {
      title: "Performance Marketing",
      description:
        "Performance marketing built around creative testing, paid distribution, conversion-focused experiences and continuous campaign learning.",
    },
  },
  /**
   * **DEFERRED BY THE CLIENT, not unfinished.** Service 04 is held back for a
   * dedicated deep design and build pass, because its page has to demonstrate
   * websites, landing experiences, custom software, CRM systems, internal
   * business tools and automation — a materially wider scope than any other
   * service page carries. A shallow version now would set the wrong ceiling for
   * it. See §10o of the brief.
   *
   * The consequence is a **temporary numbering gap**: the built sequence runs
   * 01 → 02 → 03 → 05, and Service 05 keeps its canonical `05`. That is honest
   * and it is derived, not hand-written — `resolveServicePage` reads the index
   * off `config/services.ts` and prev/next reads `BUILT_SERVICE_PAGES`, so
   * nothing renumbers itself and no dead link is possible.
   */
  { slug: "web-digital-experiences", serviceId: "web", inquiryServiceId: "web", built: false },
  {
    slug: "brand-shoots-content",
    serviceId: "shoots",
    inquiryServiceId: "shoots",
    // Flipped to `true` only after the route existed, the page was complete,
    // the responsive sweep passed, preselection worked, accessibility passed
    // and the production build succeeded — the §10l discipline.
    built: true,
    metadata: {
      title: "Brand Shoots & Content",
      description:
        "Creative direction, brand shoots and content production designed to build a distinctive visual language across social, campaigns and digital experiences.",
    },
  },
];

/**
 * Only the routes that exist. Use it where the question is "does this page
 * exist" — the route transition's marker, for instance, which has to name a
 * destination a visitor reached by direct URL.
 *
 * **It is not the list to link from.** See `PUBLIC_SERVICE_PAGES`.
 */
export const BUILT_SERVICE_PAGES: readonly ServicePage[] = SERVICE_PAGES.filter(
  (p) => p.built,
);

/** True while the service behind a route is on public discovery. */
function isPublicService(serviceId: ServiceId): boolean {
  return SERVICES.find((s) => s.id === serviceId)?.public === true;
}

/**
 * **The only list anything may link from.**
 *
 * A route has to exist *and* its service has to be public. Menus, the footer
 * directory, `Explore service ↗` and prev/next all read this, so hiding a
 * service takes its page off every discovery surface at once — with no
 * component edit and no `if (id === …)` anywhere (`config/services.ts`).
 *
 * The route itself keeps working by direct URL, deliberately: nothing is
 * deleted, and the page carries `noindex, nofollow` while it is hidden.
 */
export const PUBLIC_SERVICE_PAGES: readonly ServicePage[] =
  BUILT_SERVICE_PAGES.filter((p) => isPublicService(p.serviceId));

/** The one path segment every service route lives under. */
export const SERVICES_PATH = "/services";

export function servicePagePath(slug: string): string {
  return `${SERVICES_PATH}/${slug}`;
}

/** True while the visitor is inside the Services area of the site. */
export function isServiceRoute(pathname: string): boolean {
  return pathname === SERVICES_PATH || pathname.startsWith(`${SERVICES_PATH}/`);
}

const SERVICES_NAV = NAV_ITEMS.find((item) => item.href === SERVICES_ANCHOR);

/**
 * The one crumb above every service route.
 *
 * **There is no `/services` index page**, and the breadcrumb must not imply
 * one — so the parent is the homepage's own services chapter, `02 / What We
 * Do`. Label and destination both come from `NAV_ITEMS`, so a service page's
 * back-context can never disagree with the header that sits above it.
 */
export const SERVICE_PARENT = {
  label: SERVICES_NAV?.label ?? "Services",
  href: sectionHref(SERVICES_ANCHOR, false),
} as const;

/**
 * The dedicated page for a homepage service — **or `undefined` if it has not
 * been built.**
 *
 * This is what wires `02 / What We Do` to the service routes without the URL
 * being written down twice. `ServiceCopy` asks for a service's href and renders
 * its `Explore service ↗` action only when one comes back, so:
 *
 * - a service whose route does not exist can never render a dead link, and
 * - **building the next route is one `built: true` in the table above.** No
 *   component edit, no second config, no per-service special case.
 *
 * Deliberately derived rather than a `pageHref` field copied onto
 * `config/services.ts`: two places holding the same URL is exactly how a
 * navigation layer starts to drift.
 */
export function servicePageHrefFor(serviceId: ServiceId): string | undefined {
  const page = PUBLIC_SERVICE_PAGES.find((p) => p.serviceId === serviceId);
  return page ? servicePagePath(page.slug) : undefined;
}

/**
 * A service page plus everything derived from the homepage's own service data,
 * so a title or a chapter number is never written down twice.
 */
export type ResolvedServicePage = ServicePage & {
  service: Service;
  /** `Social & Personal Brand Growth` — the two homepage lines, joined. */
  title: string;
  /** `01` — the homepage chapter number for this service. */
  index: string;
  path: string;
};

export function resolveServicePage(slug: string): ResolvedServicePage {
  const page = SERVICE_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown service page: ${slug}`);

  const service = SERVICES.find((s) => s.id === page.serviceId);
  if (!service) throw new Error(`Unknown service: ${page.serviceId}`);

  const title = service.title.join(" ");

  return {
    ...page,
    service,
    title,
    index: service.index,
    path: servicePagePath(page.slug),
  };
}

/**
 * The built pages either side of this one, for an optional prev/next rail at
 * the foot of a service page.
 *
 * **Derived from `PUBLIC_SERVICE_PAGES`, so it returns `null` for a neighbour
 * whose route does not exist or whose service is hidden**, and the rail
 * renders nothing at all rather than a lonely link or a disabled control.
 *
 * A hidden page is not in that list, so it finds no index and gets no rail of
 * its own either — which is correct: a page that is off public discovery
 * should not offer a way further into the site's service sequence.
 */
export function adjacentServicePages(slug: string): {
  previous: ResolvedServicePage | null;
  next: ResolvedServicePage | null;
} {
  const i = PUBLIC_SERVICE_PAGES.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };

  const at = (n: number) =>
    n >= 0 && n < PUBLIC_SERVICE_PAGES.length
      ? resolveServicePage(PUBLIC_SERVICE_PAGES[n].slug)
      : null;

  return { previous: at(i - 1), next: at(i + 1) };
}

/* ============================================================
   THE SHARED SECTION VOCABULARY

   The shapes every service page's copy is written into. They are what makes
   the five pages one system: the same spacing, typography, responsive
   behaviour and CTA rules fall out of components that consume these types.

   **They deliberately do not describe the visuals.** A page's hero
   composition, its signature interaction and its proof section stay React
   components with their own art direction — the thing that stops five service
   pages being one JSON template rendered five times.
   ============================================================ */

/** A section's own label + headline + lead. */
export type ServiceSectionCopy = {
  /** Small tracked label under a short teal rule. */
  label: string;
  /** Two lines, broken deliberately. */
  headline: readonly [string, string];
  /**
   * The one word rendered in Instrument Serif italic, if this section is
   * carrying the accent. **Most sections should leave it unset** — the
   * homepage review found eight consecutive accented sections and called it a
   * template (§10i). Two or three per page is the intent.
   */
  accentWord?: string;
  lead?: string;
};

/** One layer of the "what we actually build" system. */
export type ServicePillar = {
  id: string;
  index: string;
  name: string;
  /** One verb — what this layer does to the work. */
  verb: string;
  sentence: string;
  /** Short meta rail beneath the sentence. Capabilities, never claims. */
  terms: readonly string[];
};

/** One row of the typographic scope index. */
export type ServiceScopeItem = {
  id: string;
  index: string;
  name: string;
  detail: string;
};

/** One step of the service-specific process. */
export type ServiceStep = {
  index: string;
  name: string;
  detail: string;
};

/** One FAQ row. Answers stay factual — no result is ever promised. */
export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
};
