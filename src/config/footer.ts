import { DISCIPLINES } from "./about";

/**
 * FOOTER V2 — the agency desk.
 *
 * Only labels and structural copy live here. **Every value the footer renders —
 * email, phone, WhatsApp, navigation, the service routes, the social profiles
 * and the legal pages — comes from another config**, so a contact detail is
 * changed in exactly one place and the footer can never drift from the contact
 * panel, the header, the service registry or the legal documents.
 *
 * WHAT CHANGED FROM V1, and why. The Final Signal ended the page on one
 * enormous centred wordmark and very little else. It read as a poster and left
 * the last screen of the site nearly empty. V2 keeps the field — obsidian in
 * both themes, no twelve-column grid, no border, no booking CTA — and makes it
 * **useful**: contact, navigation, the service pages that exist, socials and
 * legal, with the wordmark demoted to a signature at the lower left.
 *
 * **NO BOOKING CTA.** The Project Inquiry form (§10h) is the conversion
 * endpoint, and `Book a 15-Min Call` appears exactly once on the homepage, in
 * the Hero. The footer signs off; it does not pitch. Do not add one back.
 *
 * NO CITY. The locator is `BRAND.locator` (`India`) for the reason recorded in
 * `config/about.ts`: the previous site contradicts itself about the address.
 */
export const FOOTER_COPY = {
  /** The small marker the closing canvas opens on. */
  signature: "Mishram Media / India",
  contactLabel: "Get in touch",
  navLabel: "Navigate",
  /** Only routes that exist are listed under it — see `service-pages.ts`. */
  servicesLabel: "Services",
  socialLabel: "Follow",
  legalLabel: "Legal",
  callLabel: "Call",
  whatsappLabel: "WhatsApp",
  backToTop: "Back to top",
  /** Screen-reader name for the closing mark. */
  markLabel: "Mishram Media",
  /**
   * Read only by assistive technology, on the one social row that is present
   * but not yet linkable. **Not rendered visually** — the row is quieter than
   * its neighbours, which is the visual signal, and a visible "coming soon"
   * would be clutter on a profile that is days away.
   */
  socialPending: "Profile not published yet",
} as const;

/**
 * The hero opens on `CREATIVE × PERFORMANCE × TECHNOLOGY`; About writes the
 * creator dimension into it. The last line of the page closes that same
 * equation, built from `DISCIPLINES` rather than retyped — one list, three
 * places, no chance of the footer claiming a discipline About does not.
 */
export const FOOTER_EQUATION = DISCIPLINES.map((d) => d.name).join(" × ");
