import type { MetadataRoute } from "next";

import { LEGAL_DOCS, legalPath } from "@/config/legal";
import { PUBLIC_SERVICE_PAGES, servicePagePath } from "@/config/service-pages";
import { ABOUT_PATH, SITE_URL } from "@/config/site";

/**
 * THE SITEMAP — derived, never hand-written.
 *
 * The site had none, which is the one piece of technical SEO a multi-route
 * marketing site cannot really do without: four service pages, an About page
 * and three legal documents were discoverable only by crawling the navigation.
 *
 * **It lists what is indexable, not what exists**, and those are two different
 * questions here. `PUBLIC_SERVICE_PAGES` is `built && public`, so a service
 * that is finished but held back — Brand Shoots & Content today (§10s) —
 * stays out. That page already answers `noindex, nofollow`; a sitemap entry
 * pointing at it would be the site contradicting itself, which is worse than
 * having no sitemap at all.
 *
 * Deliberately **not** derived from `PUBLIC_ROUTES` in `config/routes.ts`:
 * that list walks `BUILT_SERVICE_PAGES` because it exists to name any route a
 * visitor can reach by URL, including a hidden one. Same shape, different
 * question.
 *
 * `lastModified` is the build time. There is no per-page content date in this
 * project, and inventing one — or freezing a literal that silently goes stale
 * — would be worse than a value that is at least true of the deployment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, SITE_URL).toString();

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url(ABOUT_PATH), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...PUBLIC_SERVICE_PAGES.map((page) => ({
      url: url(servicePagePath(page.slug)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...LEGAL_DOCS.map((doc) => ({
      url: url(legalPath(doc.slug)),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
