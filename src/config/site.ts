/**
 * Single source of truth for brand, navigation and contact details.
 *
 * Everything in CONTACT is real, user-confirmed first-party information. Do not
 * invent numbers, addresses or booking links here.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PUBLIC CONTACT DETAILS REPLACED — Revision 16 (August 2026)
 *
 * The client supplied a new public contact set and it supersedes the details
 * carried over from the previous Mishram Media site. Every published surface —
 * the contact panel, the footer, the inquiry section's direct routes and the
 * legal pages — reads this file, so the change propagates from here.
 *
 * | Channel   | Now                                    | Was                    |
 * | --------- | -------------------------------------- | ---------------------- |
 * | Email     | `info@mishram.media`                   | `mediamishram@gmail.com` |
 * | Phone     | `+91 95482 78558`                      | `+91 63993 99333`      |
 * | Instagram | `@filmybande`                          | `@mishram.media`       |
 * | LinkedIn  | Prashant Mishra / Mishram Media        | none — suppressed      |
 *
 * **The brand name did not change.** The source the details arrived in carried
 * the phrase "Prashant Ads Agency"; that is context around the contact block,
 * not a rename. This site is **Mishram Media**, everywhere.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * THE PRODUCTION ORIGIN — written once, for the whole site.
 *
 * `app/layout.tsx` passes this to Next's `metadataBase`, which is what every
 * relative `alternates.canonical` and `openGraph.url` on every route resolves
 * against. **Those paths stay relative in each page's own metadata** — the
 * domain appears here and nowhere else, so moving origins is one edit rather
 * than nine.
 *
 * **Why it is a hardcoded constant rather than an env var.** Without a
 * `metadataBase`, Next falls back to the deployment's own URL — on Vercel that
 * is the per-deployment `*.vercel.app` hostname, so **every preview build would
 * publish canonicals and OG URLs pointing at itself**, and a preview that got
 * indexed would compete with the real site. An env var would have the same
 * failure mode the moment it was missing on one environment. The canonical
 * origin is a fact about this business, not about where it happens to be
 * hosted, so it is written down.
 *
 * No trailing slash — `new URL()` joins paths correctly without one.
 */
export const SITE_URL = "https://mishram.media";

export const BRAND = {
  name: "Mishram Media",
  shortName: "Mishram",
  wordmark: "/brand/mishram-wordmark.png",
  /** Small editorial locator shown beside the wordmark. */
  locator: "India",
  descriptor: "Creative growth & digital studio",
} as const;

/**
 * ONE NUMBER, EVERYWHERE — resolved in Revision 17.
 *
 * Revision 16 replaced the published phone line but had to leave the `wa.me`
 * deep link on the previous number, because nothing supplied with the new
 * details said the new line was also on WhatsApp and a link to a number with
 * no account behind it fails silently at exactly the moment a visitor is
 * trying to reach the business. That was the last open contact question on the
 * site.
 *
 * **The client has now confirmed `+91 95482 78558` is the current WhatsApp
 * number**, so this constant matches `CONTACT.phone` and the split is closed:
 * the panel, the footer, the inquiry fallback, every booking CTA and the legal
 * pages all resolve to the same line. **The previous number `916399399333` is
 * gone from production entirely** — it survives only in this comment and in the
 * revision history, which is where an obsolete contact detail belongs.
 *
 * Derived from `CONTACT.phone` rather than retyped, so the two can never drift
 * apart again.
 */
const PHONE_E164 = "+919548278558";

/** `wa.me` wants the digits without the `+`. One number, written once. */
const WHATSAPP_NUMBER = PHONE_E164.replace("+", "");

export const CONTACT = {
  whatsappNumber: WHATSAPP_NUMBER,
  email: "info@mishram.media",
  phone: PHONE_E164,
  phoneDisplay: "+91 95482 78558",
  instagram: "https://instagram.com/filmybande",
  /** Rendered wherever the handle itself is shown rather than the URL. */
  instagramHandle: "@filmybande",
  address: "Rameshwarpur, Lalpur, US Nagar, Uttarakhand, India",
} as const;

/** Builds a WhatsApp deep link with an optional prefilled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const GENERAL_WHATSAPP_MESSAGE =
  "Hi Mishram Media — I found you through your website and would like to know more about your services.";

export const CONSULTATION_WHATSAPP_MESSAGE =
  "Hi Mishram Media — I'd like to book the free 15-minute consultation call.";

/**
 * Scheduling link. Left empty until a genuine calendar exists.
 * Set NEXT_PUBLIC_BOOKING_URL to switch every booking CTA over to it.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

export const hasBooking = BOOKING_URL.length > 0;

/** Booking CTA target: the calendar if configured, otherwise WhatsApp. */
export const bookingHref = hasBooking
  ? BOOKING_URL
  : whatsappHref(CONSULTATION_WHATSAPP_MESSAGE);

export type SocialPlatform = "instagram" | "facebook" | "linkedin";

export type SocialLink = {
  id: SocialPlatform;
  label: string;
  /**
   * `null` while the profile URL is not verified. The footer renders the row
   * either way — as a real link when a URL exists, and as a non-interactive,
   * quieter row carrying `aria-disabled` when it does not. **Never a
   * `href="#"` and never a bare domain.**
   */
  href: string | null;
};

/**
 * VERIFIED PROFILES ONLY — a URL here or `null`, never a guess.
 *
 * The bar is the same one §10d-notes applies to testimonials: a profile has to
 * be something Mishram themselves declared, not something that looks plausible.
 *
 * | Platform | URL | Evidence |
 * | --- | --- | --- |
 * | Instagram | `instagram.com/filmybande` | **Supplied directly by the client, Revision 16**, as the public contact Instagram. It supersedes `@mishram.media` as the account this site points a visitor at |
 * | Facebook | `facebook.com/mishram` | The old site's schema.org `sameAs` on every page, plus both social rows |
 * | LinkedIn | `linkedin.com/in/prashant-mishra-mishram-media` | **Supplied directly by the client, Revision 16.** This is the profile URL the row waited for |
 *
 * `sameAs` is the structured-data field for an organisation's own official
 * profiles, so a URL declared there is Mishram stating it about themselves. A
 * URL the client hands over directly is stronger evidence still.
 *
 * **LINKEDIN IS NOW LIVE.** It rendered for three revisions as a present but
 * non-interactive row (`aria-disabled`, no `href`) because the only URL that
 * had ever existed for it was a bare `linkedin.com` in the purchased
 * template's social row. That blocker is resolved, and filling the URL in was
 * the whole change — the footer's rail turned it into a real link with **zero
 * component edits**, exactly as it was built to.
 *
 * **`@mishram.media` is not deleted, it is demoted.** It is the account the
 * old site declared in `sameAs` and it is kept below as evidence; the public
 * contact action points at the account the client asked for. Do not render
 * both — two Instagram rows in one social rail reads as an unresolved
 * migration rather than as a choice.
 */
export const SOCIAL_URLS: Record<SocialPlatform, string | null> = {
  instagram: CONTACT.instagram,
  facebook: "https://www.facebook.com/mishram",
  linkedin: "https://www.linkedin.com/in/prashant-mishra-mishram-media",
};

/**
 * Development-only provenance. **Never rendered.**
 *
 * The Instagram account the previous Mishram Media site declared in its
 * schema.org `sameAs`. Kept so the historical record is not lost when the
 * public contact account changes — §10p's audit cites reels on it, and a
 * later pass may want it back.
 */
export const LEGACY_INSTAGRAM = {
  handle: "@mishram.media",
  url: "https://www.instagram.com/mishram.media/",
  source: "old site schema.org sameAs, footer and contact page",
} as const;

/** Render order, and the accessible name each icon carries. */
const SOCIAL_ORDER: readonly { id: SocialPlatform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" },
];

/**
 * All three platforms, in order, each carrying its URL or `null`. Derived —
 * never hand-edited. Consumers decide how to present an unverified one; the
 * footer shows it and does not link it.
 */
export const SOCIAL_LINKS: readonly SocialLink[] = SOCIAL_ORDER.map(
  ({ id, label }) => ({ id, label, href: SOCIAL_URLS[id] }),
);

/** Just the ones that are safe to link. Use where a dead row is not an option. */
export const VERIFIED_SOCIAL_LINKS = SOCIAL_LINKS.filter(
  (s): s is SocialLink & { href: string } => s.href !== null,
);

export type NavItem = {
  index: string;
  label: string;
  href: string;
};

/**
 * The four primary homepage destinations, and the single source of navigation
 * for the header, the mobile menu and the footer — there is no second routing
 * layer anywhere.
 *
 * Every one of these IDs is on the page. `#work` is **05 / Selected Work**, not
 * the collaboration rail; `#what-we-do` is **02 / What We Do**, labelled
 * "Services" because that is the word a visitor scans for.
 *
 * Deliberately four. Collaborations, Work Process and Recognition are chapters
 * of the page rather than destinations, and listing them would flatten a
 * hierarchy that is intentional.
 */
/**
 * The Services destination, named once.
 *
 * `02 / What We Do` is the site's services layer, so it is both the nav item
 * below **and** what a `/services/...` route belongs to — the header lights
 * this item while the visitor is on a service page, and a service page's own
 * breadcrumb points back at it. One string, three consumers.
 */
export const SERVICES_ANCHOR = "#what-we-do";

/**
 * The dedicated About route.
 *
 * **`About` in the primary navigation is a page, not a section.** Until
 * Revision 15 it pointed at `#about`, the homepage's About chapter, because
 * that chapter was all there was. Now that `/about` exists, one word in the
 * header would otherwise mean a section on one route and a page on another —
 * so it means the page, everywhere, and the homepage chapter is what a visitor
 * scrolls past on the way down rather than a navigation destination.
 *
 * `#about` is still observed by the header's active-state list on purpose: it
 * matches no nav item, so scrolling through the homepage chapter leaves the
 * header neutral exactly as `#hero` does. That is the §10g mechanism doing its
 * job, not an oversight.
 */
export const ABOUT_PATH = "/about";

/**
 * A nav destination that is a route rather than an in-page anchor.
 *
 * The three anchor items need `sectionHref` and a plain `<a>`; a route item
 * needs neither and takes `PageLink` so it plays the shared wipe. One
 * predicate, so the header, the mobile sheet and the footer all branch the
 * same way instead of each testing for a literal path.
 */
export function isRouteHref(href: string): boolean {
  return !href.startsWith("#");
}

export const NAV_ITEMS: readonly NavItem[] = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "Services", href: SERVICES_ANCHOR },
  { index: "03", label: "Creators", href: "#creators" },
  { index: "04", label: "About", href: ABOUT_PATH },
] as const;

/** The page's top anchor — used by the skip link and the footer's back-to-top. */
export const TOP_ANCHOR = "#hero";

/**
 * A navigation anchor, resolved for the route it is being rendered on.
 *
 * Every `NAV_ITEMS` href is a bare fragment because all four destinations are
 * sections of the homepage. On a subpage a bare fragment resolves against
 * *that* route and points at nothing, so the header, the mobile menu and the
 * footer pass their hrefs through here. **One list, one helper — no second
 * navigation config, and the homepage's behaviour is byte-for-byte what §10g
 * describes**, because on `/` this returns the fragment unchanged.
 *
 * `TOP_ANCHOR` deliberately does *not* need it: every page's opening section
 * carries `id="hero"`, so the skip link and the footer's back-to-top stay
 * in-page wherever they are rendered.
 *
 * The result is used on a plain `<a>`, never a `<Link>`. That is on purpose: a
 * client-side navigation to `/#work` would scroll before the homepage's own
 * hydration changes its height — the 2,247px problem §10g documents — and only
 * a real navigation re-runs `useHashLanding` to correct it.
 */
export function sectionHref(hash: string, onHome: boolean): string {
  // A route destination is already absolute — prefixing it would produce
  // `//about`. Only fragments need resolving against the current route.
  if (isRouteHref(hash)) return hash;
  return onHome ? hash : `/${hash}`;
}

/**
 * Section IDs in the order the visitor meets them, for the header's active-state
 * observer. `hero` is in the list on purpose: while it holds the scan line no
 * nav item matches, so the header stays neutral at the top of the page instead
 * of asserting a section the visitor has not reached.
 */
export const SECTION_ORDER = [
  "hero",
  "what-we-do",
  "creators",
  "work",
  "about",
] as const;
