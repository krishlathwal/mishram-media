/**
 * GOOGLE ANALYTICS 4 — the whole configuration, written once.
 *
 * The measurement id lives here and nowhere else. **No component ever contains
 * the literal `G-…` string** (§14's rule about a value appearing in one place,
 * applied to the tag).
 *
 * ── WHERE IT IS SWITCHED ON ───────────────────────────────────────────────
 *
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured **on Vercel Production only**.
 * It is deliberately absent from `.env.local` and from Preview, so:
 *
 * | Environment | Tag |
 * | --- | --- |
 * | Production (`mishram.media`) | on |
 * | Vercel Preview | **off** — no id, nothing renders |
 * | `next dev` / a local `npm run build` | **off** — no id, nothing renders |
 *
 * That is the entire dev/preview protection, and it is one condition rather
 * than a hostname allow-list that would break the first time a domain changed.
 * A developer who does set the id locally gets `debug_mode`, so their hits land
 * in GA4's DebugView instead of the reports — Google's own mechanism for this,
 * rather than an invented one.
 *
 * **The id is not a secret.** It is visible in the page source of every site
 * that runs GA. It is an env var for environment control, not for secrecy —
 * which is exactly why it is `NEXT_PUBLIC_`, unlike everything in §10ac.
 *
 * ── WHAT IS DELIBERATELY NOT HERE ─────────────────────────────────────────
 *
 * **No Google Ads conversion id and no conversion label.** None has been
 * supplied, and inventing an `AW-…` would be a fabrication of exactly the kind
 * §9 and the legal audit exist to prevent. The event vocabulary below is shaped
 * so an Ads tag can be added later without any component changing.
 *
 * **No Google Tag Manager.** GA4 through `gtag.js` directly: one script, no
 * container, no second configuration surface that can disagree with this file.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/**
 * The one switch. Everything analytics-related renders nothing and does
 * nothing when this is false, and **the site is unaffected** — no error, no
 * console noise, no missing UI. See `lib/analytics.ts`.
 */
export const analyticsEnabled = GA_MEASUREMENT_ID.length > 0;

/**
 * Hits from a non-production build go to GA4's DebugView instead of the
 * standard reports. Only ever relevant if a developer sets the id locally.
 */
export const GA_DEBUG_MODE = process.env.NODE_ENV !== "production";

/* ============================================================
   CONSENT
   ============================================================ */

/**
 * The visitor's analytics choice. **Its own key** — never the theme's, which
 * is a different question with a different lifetime.
 */
export const ANALYTICS_CONSENT_KEY = "mishram-analytics-consent";

export type ConsentChoice = "granted" | "denied";

/**
 * Consent Mode v2, and all four signals start **denied**.
 *
 * `ad_*` stay denied permanently for now: this site runs no Google Ads tag, so
 * there is nothing for advertising consent to enable, and asking for
 * permission the site cannot use would be dishonest. Granting analytics does
 * not touch them (see `lib/analytics.ts`).
 *
 * With `analytics_storage: denied` the tag sets no cookie and stores no
 * identifier — Google's own cookieless mode. `/cookies` says so in those words.
 */
export const CONSENT_DEFAULTS = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

/**
 * THE BOOT SCRIPT, and its position is the whole point.
 *
 * It runs **before** `gtag.js` is requested, so the order in `dataLayer` is
 * always:
 *
 * ```
 * consent default (everything denied)
 *   → consent update (only if this visitor already allowed analytics)
 *     → config, with send_page_view: false
 * ```
 *
 * That closes the race the brief warned about — *page tracked → visitor
 * rejects → too late*. A returning visitor who chose "Only necessary" has
 * `denied` applied before Google's library has even loaded, and a visitor who
 * chose "Allow analytics" is measured from their first page rather than from
 * their second.
 *
 * `gtag()` queues into `dataLayer`, so none of this depends on the network.
 * Written as a string for the same reason `themeBootScript` is: it has to be
 * in the document before anything else runs.
 */
export const analyticsBootScript = `
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('consent', 'default', ${JSON.stringify(CONSENT_DEFAULTS)});
  try {
    if (localStorage.getItem(${JSON.stringify(ANALYTICS_CONSENT_KEY)}) === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {}
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}, {
    send_page_view: false,
    debug_mode: ${GA_DEBUG_MODE}
  });
})();
`;

/* ============================================================
   THE EVENT VOCABULARY

   Every event this site sends, as one discriminated union. A component passes
   an object from this type; nothing anywhere calls `window.gtag` directly, and
   nothing can invent an event name or a parameter by typo.

   **No parameter here can carry personal information.** Every field is an id,
   a slug, a method name or a place on the site — see the note on
   `generate_lead`.
   ============================================================ */

export type ContactMethod = "whatsapp" | "email" | "phone";

export type AnalyticsEvent =
  /** GA4 recommended event. The only conversion this site has. */
  | {
      name: "generate_lead";
      /** Selected service **ids**, joined. Never labels, never free text. */
      services: string;
      service_count: number;
      /** The budget option id, e.g. `1l-3l`. Never a rupee figure typed by anybody. */
      budget_range: string;
      /** The timeline option id. */
      timeline: string;
      page_path: string;
      form_context: string;
    }
  /** First real interaction with the inquiry form. Once per form instance. */
  | { name: "form_start"; form_name: string; form_context: string }
  | { name: "book_consultation"; context: string }
  | { name: "start_project"; context: string }
  | { name: "contact_click"; method: ContactMethod; context: string }
  | { name: "social_outbound"; platform: string; context: string }
  | { name: "creator_profile_click"; platform: string; context: string }
  | { name: "service_explore"; service_slug: string; context: string };

export type AnalyticsEventName = AnalyticsEvent["name"];
