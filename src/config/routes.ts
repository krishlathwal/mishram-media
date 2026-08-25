/**
 * THE PUBLIC ROUTE MAP.
 *
 * One place that knows what every public URL on the site *is*, so the page
 * transition can name a destination without a switch statement growing a case
 * per page. Every entry is derived from a registry that already exists —
 * `SERVICE_PAGES` for services, `LEGAL_DOCS` for legal — so a new route names
 * itself the moment it is added there.
 *
 * **Nothing here creates a route.** It only describes routes that exist.
 */

import { ABOUT_PAGE_COPY } from "./about-page";
import { LEGAL_COPY, LEGAL_DOCS, legalPath } from "./legal";
import {
  BUILT_SERVICE_PAGES,
  SERVICES_PATH,
  resolveServicePage,
  servicePagePath,
} from "./service-pages";
import { ABOUT_PATH, BRAND, SERVICES_ANCHOR } from "./site";

/** What the transition overlay writes while a destination resolves. */
export type RouteMarker = {
  /** Small tracked line above the label — the destination's parent. */
  eyebrow?: string;
  label: string;
};

/**
 * The destination's name, for the page-transition overlay.
 *
 * Falls back to the brand rather than guessing: a route this does not
 * recognise still gets a branded wipe, never an empty panel or a raw pathname.
 */
export function routeMarker(pathname: string): RouteMarker {
  if (pathname === "/") {
    return { eyebrow: BRAND.name, label: BRAND.descriptor };
  }

  if (pathname.startsWith(`${SERVICES_PATH}/`)) {
    const slug = pathname.slice(SERVICES_PATH.length + 1).replace(/\/$/, "");
    const page = BUILT_SERVICE_PAGES.find((p) => p.slug === slug);
    if (page) {
      const resolved = resolveServicePage(page.slug);
      return {
        eyebrow: `Services / ${resolved.index}`,
        label: resolved.title,
      };
    }
  }

  if (pathname === ABOUT_PATH) {
    return { eyebrow: BRAND.name, label: ABOUT_PAGE_COPY.routeMarker };
  }

  const doc = LEGAL_DOCS.find((d) => legalPath(d.slug) === pathname);
  if (doc) {
    return { eyebrow: LEGAL_COPY.sectionLabel, label: doc.title };
  }

  return { label: BRAND.name };
}

/**
 * Every public page, for documentation and for anything that wants to walk the
 * site. Derived — the service list carries only `built` routes, so this can
 * never name a page that does not exist.
 */
export const PUBLIC_ROUTES: readonly { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: ABOUT_PATH, label: ABOUT_PAGE_COPY.routeMarker },
  ...BUILT_SERVICE_PAGES.map((p) => ({
    path: servicePagePath(p.slug),
    label: resolveServicePage(p.slug).title,
  })),
  ...LEGAL_DOCS.map((d) => ({ path: legalPath(d.slug), label: d.title })),
];

/**
 * Where the header's `Services` item points. Re-exported so the services menu
 * does not have to reach into two configs for one destination.
 */
export const SERVICES_OVERVIEW_ANCHOR = SERVICES_ANCHOR;
