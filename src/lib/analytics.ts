import {
  ANALYTICS_CONSENT_KEY,
  analyticsEnabled,
  type AnalyticsEvent,
  type ConsentChoice,
} from "@/config/analytics";

/**
 * THE ONLY PLACE `window.gtag` IS CALLED.
 *
 * Components pass a typed `AnalyticsEvent` from `config/analytics.ts`; nothing
 * else in the codebase touches Google's global, so there is no `(window as
 * any)` anywhere and no way to send an event name or a parameter that the union
 * does not describe.
 *
 * **ANALYTICS CAN NEVER BREAK THE SITE.** Every function here is a no-op when
 * the tag is off, when the script has not loaded, when it was blocked, or when
 * anything at all throws. Measurement is not allowed to fail a lead (§10ac —
 * Supabase is the source of truth, GA is measurement).
 */

/** Google's own queue shape: `gtag` is a variadic push into `dataLayer`. */
type GtagCommand =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["consent", "default" | "update", Record<string, string>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagCommand) => void;
  }
}

/**
 * True only when there is somewhere for a hit to go.
 *
 * The boot script defines `window.gtag` synchronously, before `gtag.js` is
 * requested, so this is true from the first paint and queued events are not
 * lost while the library downloads.
 */
function ready(): boolean {
  return (
    analyticsEnabled &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

/**
 * One manual page view.
 *
 * Manual because `config` runs with `send_page_view: false` — see
 * `components/analytics/GoogleAnalytics.tsx` for why that is the only way to
 * get one view per navigation in an App Router application rather than one on
 * load and none afterwards.
 *
 * The URL comes from the browser, so a campaign's `utm_*` parameters are in
 * `page_location` exactly as GA4 expects and its own attribution does the rest.
 * **No second attribution system is built here** — the Supabase session
 * attribution in §10ac stays separate and untouched, because it answers a
 * different question (which lead came from where) with data GA never sees.
 */
export function pageView(): void {
  if (!ready()) return;
  try {
    window.gtag?.("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    });
  } catch {
    // Measurement is never worth an exception.
  }
}

/**
 * Send one typed event.
 *
 * `name` becomes GA4's event name and everything else becomes its parameters,
 * so the union in `config/analytics.ts` is simultaneously the type and the
 * documentation of the payload.
 */
export function track(event: AnalyticsEvent): void {
  if (!ready()) return;
  try {
    const { name, ...params } = event;
    window.gtag?.("event", name, params);
  } catch {
    // As above.
  }
}

/**
 * A click handler that reports and then gets out of the way.
 *
 * It never calls `preventDefault`, never delays navigation and never wraps the
 * link's own behaviour — the anchor does what an anchor does, and the event is
 * queued on the way past. That is deliberate: a tracked outbound link that
 * waits for a network call is how analytics starts costing conversions.
 */
export function onTrackedClick(event: AnalyticsEvent): () => void {
  return () => track(event);
}

/* ============================================================
   CONSENT
   ============================================================ */

/**
 * Fired when the visitor answers, so anything rendering the notice can re-read
 * the stored value instead of holding a second copy of it in React state.
 * Same idiom as the theme's own event (`components/theme/ThemeProvider.tsx`).
 */
const CONSENT_EVENT = "mishram:analytics-consent";

/** Subscribe half of `useSyncExternalStore`. */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/** The stored choice, or `null` while the visitor has not answered. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Private window, disabled site data, embedded webview. Treated as "not
    // answered", which means denied and the notice shown — the safe direction.
    return null;
  }
}

/**
 * Record the visitor's answer and tell Google about it in the same call.
 *
 * **Only `analytics_storage` ever changes.** The three advertising signals
 * stay denied because this site runs no advertising tag — granting them would
 * be asking for a permission there is nothing to use (`config/analytics.ts`).
 *
 * The write is attempted first so a returning visitor is honoured by the boot
 * script on their next page, before Google's library loads.
 */
export function setConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
  } catch {
    // The choice still applies to this page; it just will not be remembered.
  }

  try {
    window.dispatchEvent(new Event(CONSENT_EVENT));
  } catch {
    // As above.
  }

  if (!ready()) return;
  try {
    window.gtag?.("consent", "update", { analytics_storage: choice });
  } catch {
    // As above.
  }
}
