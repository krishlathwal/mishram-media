import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

/**
 * `robots.txt` — the site had none, so crawlers were working from defaults and
 * had no pointer to the sitemap.
 *
 * **Deliberately permissive.** Per-page `robots` metadata already carries the
 * only exclusion this site has — a service that is built but held back answers
 * `noindex, nofollow` from its own `metadata`, which is the right layer for it:
 * the rule lives beside the flag that causes it and lifts itself when the flag
 * flips. Restating those paths here would be a second list to keep in step,
 * and a `Disallow` would be strictly worse than the `noindex` it duplicates —
 * a disallowed page cannot be crawled, so its `noindex` is never read.
 *
 * `/api/` is excluded because it is a route handler with no document to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
