/**
 * Single source of truth for brand, navigation and contact details.
 *
 * Everything in CONTACT is real information carried over from the previous
 * Mishram Media site. Do not invent numbers, addresses or booking links here.
 */

export const BRAND = {
  name: "Mishram Media",
  shortName: "Mishram",
  wordmark: "/brand/mishram-wordmark.png",
  /** Small editorial locator shown beside the wordmark. */
  locator: "India",
  descriptor: "Creative growth & digital studio",
} as const;

const WHATSAPP_NUMBER = "916399399333";

export const CONTACT = {
  whatsappNumber: WHATSAPP_NUMBER,
  email: "mediamishram@gmail.com",
  phone: "+916399399333",
  phoneDisplay: "+91 63993 99333",
  instagram: "https://www.instagram.com/mishram.media/",
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
 * | Instagram | `instagram.com/mishram.media` | In the old site's schema.org `sameAs`, its footer and its contact page |
 * | Facebook | `facebook.com/mishram` | Same — `sameAs` on every page, plus both social rows |
 * | LinkedIn | **none** | Only ever `https://linkedin.com` — a bare domain with no profile path, absent from `sameAs`, and sitting in the purchased template's social row next to an identical bare `twitter.com`. That is the template's placeholder, not a profile |
 *
 * `sameAs` is the structured-data field for an organisation's own official
 * profiles, so a URL declared there is Mishram stating it about themselves.
 *
 * **A null is presented, never linked.** LinkedIn is shown in the footer's
 * social rail — the profile is coming and the platform belongs in the set — but
 * as a non-interactive row with `aria-disabled`, not an anchor. There is no
 * `href="#"`, no bare `linkedin.com`, and nothing a visitor can click into
 * nowhere. **Filling the URL in below turns that same row into a real link with
 * zero component edits.**
 */
export const SOCIAL_URLS: Record<SocialPlatform, string | null> = {
  instagram: CONTACT.instagram,
  facebook: "https://www.facebook.com/mishram",
  linkedin: null,
};

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
