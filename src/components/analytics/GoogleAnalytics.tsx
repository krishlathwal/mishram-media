import Script from "next/script";
import { Suspense } from "react";

import {
  GA_MEASUREMENT_ID,
  analyticsBootScript,
  analyticsEnabled,
} from "@/config/analytics";

import { RouteObserver } from "./RouteObserver";

/**
 * GOOGLE ANALYTICS 4 — mounted once, in the root layout, in two pieces.
 *
 * **That single mount is the whole installation.** Every public route —
 * `/`, `/about`, the five service pages, `/privacy`, `/terms`, `/cookies` —
 * renders inside `app/layout.tsx`, so the tag reaches all of them without the
 * Google snippet being pasted into a single page file. A route added tomorrow
 * is covered the moment it exists, which is the same argument §10j makes for
 * the service-page registry: derive it once, never maintain a list.
 *
 * Both pieces return `null` without a measurement id — Preview, `next dev` and
 * any local build. Nothing renders, nothing loads, and `lib/analytics.ts`
 * no-ops in step, so the site is byte-identical with analytics switched off.
 */

/**
 * PIECE ONE — the consent gate, in `<head>`, before anything else runs.
 *
 * A plain inline `<script>` rather than `next/script`, for the same reason
 * `themeBootScript` is one: it has to execute at parse time, ahead of Google's
 * library, and the existing boot script proves the idiom. (`next/script`'s
 * `beforeInteractive` would do the same job, but it is a Pages-Router-era
 * strategy its own lint rule still objects to, and this needs no framework
 * help to be first — being written first in `<head>` is sufficient.)
 *
 * It creates `dataLayer`, denies all four consent signals, re-grants
 * `analytics_storage` if *this* visitor already allowed it, and configures the
 * tag with `send_page_view: false`.
 *
 * Because `gtag()` only pushes into `dataLayer`, all of that is replayed in
 * order the moment the library arrives. **A returning visitor who chose "Only
 * necessary" is denied before Google's code exists**, which is the race the
 * plan called out: page tracked → visitor rejects → too late.
 */
export function AnalyticsBoot() {
  if (!analyticsEnabled) return null;

  return (
    <script
      id="ga-boot"
      dangerouslySetInnerHTML={{ __html: analyticsBootScript }}
    />
  );
}

/**
 * PIECE TWO — Google's library, and the route observer.
 *
 * `afterInteractive` requests `gtag.js` **after hydration**, so it never
 * competes with the WebGL hero for the main thread and never sits in front of
 * LCP (§16 — the hero is the only heavy runtime cost, and it stays that way).
 *
 * ── `send_page_view: false`, AND THE DUPLICATE IT PREVENTS ────────────────
 *
 * `gtag('config', …)` sends a page view on load and then never again — correct
 * for a document-per-navigation site, wrong for this one, where the header, the
 * route wipe and every internal link navigate on the client. Leaving it on
 * *and* tracking route changes is how a site ends up with two page views for
 * its landing page and one for every page after it. So it is off, and
 * `RouteObserver` sends every view including the first.
 */
export function GoogleAnalytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      {/* `useSearchParams` makes its subtree dynamic. The boundary keeps that
          contained, so all twenty routes stay statically prerendered — without
          it, adding analytics would quietly opt the entire site out of static
          generation. */}
      <Suspense fallback={null}>
        <RouteObserver />
      </Suspense>
    </>
  );
}
