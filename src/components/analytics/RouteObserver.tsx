"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { pageView } from "@/lib/analytics";

/**
 * ONE PAGE VIEW PER REAL NAVIGATION. Renders nothing.
 *
 * The App Router changes routes without a document load, so Google's own
 * `config` page view — which fires once, on load — would report the landing
 * page and then silence. This watches the router instead and sends the view
 * itself, including the first one (`send_page_view: false` in
 * `config/analytics.ts` is what makes "including the first" safe).
 *
 * ── WHAT COUNTS AS A NAVIGATION ───────────────────────────────────────────
 *
 * `pathname` and `searchParams`, and nothing else.
 *
 * - **A hash does not.** `#about`, `#creators`, `#project-inquiry` are how this
 *   homepage is read — §10g makes the whole navigation native anchors — and a
 *   visitor scrolling through six chapters would otherwise look like six page
 *   views. Neither hook changes on a hash change, so no event fires. This is
 *   the single biggest source of inflated page views on a one-page site and it
 *   is designed out rather than filtered later.
 * - **Query changes do.** `/?utm_source=meta` is a different arrival from `/`,
 *   and GA4 reads the standard `utm_*` parameters out of `page_location` on its
 *   own. No second attribution system is built here; the Supabase session
 *   attribution from §10ac is untouched and answers a different question.
 * - **Back and forward do**, because the router reports them like any other
 *   route change.
 *
 * ── THE DUPLICATE GUARD ───────────────────────────────────────────────────
 *
 * The ref holds the last URL actually reported. React's development Strict Mode
 * runs effects twice, a parent re-render can re-run them, and a query object
 * can change identity without changing value — none of those are navigations,
 * and all three are stopped by comparing the string rather than trusting the
 * effect to fire once.
 */
export function RouteObserver() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reported = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (reported.current === url) return;
    reported.current = url;

    pageView();
  }, [pathname, searchParams]);

  return null;
}
