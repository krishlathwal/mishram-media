/**
 * PROJECT INQUIRY — the homepage's final conversion moment.
 *
 * This file is the **single source for the form's shape**: the copy, the
 * allowed option values, the field limits and the validator. The browser and
 * `app/api/inquiry/route.ts` both import it, which is what stops the two
 * drifting — a value the client can send is by definition a value the server
 * accepts, and vice versa.
 *
 * It imports nothing client-only, so it is safe on the server. `config/site.ts`
 * is the one import, and it is data only — the published contact details, so
 * the form's direct routes cannot drift from the rest of the site.
 */

import { CONTACT } from "./site";

export type Option = { id: string; label: string };

/**
 * `Custom Software / CRM` is deliberately its own choice even though it sits
 * inside Web & Digital Experiences strategically (§10). Someone looking for a
 * CRM does not necessarily read "digital experiences" as software, and a
 * service list is no use if it does not contain the words the visitor has in
 * their head.
 */
export const INQUIRY_SERVICES: readonly Option[] = [
  { id: "social", label: "Social & Personal Brand Growth" },
  { id: "influencer", label: "Influencer Marketing" },
  { id: "performance", label: "Performance Marketing" },
  { id: "web", label: "Web & Digital Experiences" },
  { id: "software", label: "Custom Software / CRM" },
  { id: "shoots", label: "Brand Shoots & Content" },
  { id: "unsure", label: "Not sure yet" },
];

/**
 * Engagement budget, not media spend — **never label this "ad budget"**. Ranges
 * rather than an exact figure, because the point is to find the right
 * conversation, and `Let's discuss` exists so nobody is blocked by not knowing.
 */
export const INQUIRY_BUDGETS: readonly Option[] = [
  { id: "under-50k", label: "Under ₹50K" },
  { id: "50k-1l", label: "₹50K – ₹1L" },
  { id: "1l-3l", label: "₹1L – ₹3L" },
  { id: "3l-5l", label: "₹3L – ₹5L" },
  { id: "5l-plus", label: "₹5L+" },
  { id: "discuss", label: "Let's discuss" },
];

export const INQUIRY_TIMELINES: readonly Option[] = [
  { id: "asap", label: "As soon as possible" },
  { id: "30-days", label: "Within 30 days" },
  { id: "1-3-months", label: "1–3 months" },
  { id: "exploring", label: "Just exploring" },
];

/** Bounds every free-text field, on both sides of the wire. */
export const INQUIRY_LIMITS = {
  name: { min: 2, max: 80 },
  email: { min: 5, max: 160 },
  phone: { min: 0, max: 40 },
  business: { min: 0, max: 120 },
  message: { min: 10, max: 2000 },
} as const;

/**
 * Good enough to catch a typo, deliberately not an RFC 5322 implementation —
 * the only real proof an address works is a reply arriving at it.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  business: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
  /** Honeypot. Real visitors never see it, so it must arrive empty. */
  companyWebsite: string;
};

export type InquiryField = keyof Omit<InquiryPayload, "companyWebsite">;

export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const EMPTY_INQUIRY: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  business: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
  companyWebsite: "",
};

const ids = (options: readonly Option[]) => new Set(options.map((o) => o.id));

const SERVICE_IDS = ids(INQUIRY_SERVICES);
const BUDGET_IDS = ids(INQUIRY_BUDGETS);
const TIMELINE_IDS = ids(INQUIRY_TIMELINES);

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Normalises anything into the payload shape. Used by the route on untrusted
 * JSON, so it never assumes a field is present or is the right type.
 */
export function coerceInquiry(input: unknown): InquiryPayload {
  const raw = (input ?? {}) as Record<string, unknown>;
  const services = Array.isArray(raw.services)
    ? raw.services.filter((s): s is string => typeof s === "string")
    : [];

  return {
    name: str(raw.name),
    email: str(raw.email),
    phone: str(raw.phone),
    business: str(raw.business),
    services: [...new Set(services)].filter((s) => SERVICE_IDS.has(s)),
    budget: BUDGET_IDS.has(str(raw.budget)) ? str(raw.budget) : "",
    timeline: TIMELINE_IDS.has(str(raw.timeline)) ? str(raw.timeline) : "",
    message: str(raw.message),
    companyWebsite: str(raw.companyWebsite),
  };
}

/* ============================================================
   ATTRIBUTION

   Where the inquiry came from, kept **separate from the brief on purpose**.
   `InquiryPayload` is what a person typed; this is what the campaign did. They
   travel in the same request and land in the same row, but nothing here is
   ever shown back to the visitor, put in the WhatsApp fallback or included in
   the notification email — it is sales context, not part of the message.

   **It is not tracking.** No identifier is generated, nothing is written that
   could follow somebody to another site, and the two fields that describe the
   visitor rather than the campaign — IP address and user agent — are
   deliberately not collected at all. See `/privacy`.
   ============================================================ */

/** The five standard campaign parameters, in the order they are read. */
export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParam = (typeof UTM_PARAMS)[number];

export type InquiryAttribution = {
  /** The route the form was submitted from, e.g. `/services/performance-marketing`. */
  pagePath: string;
  /** The external page the visit arrived from, when the browser supplies one. */
  referrer: string;
} & Record<UtmParam, string>;

/**
 * Bounds, because these arrive from a URL and a URL is untrusted input. A real
 * campaign parameter is a word or two; anything longer is either a mistake or
 * somebody probing, and it gets cut rather than rejected — an over-long UTM is
 * no reason to lose a genuine lead.
 */
export const ATTRIBUTION_LIMITS = {
  pagePath: 512,
  referrer: 512,
  utm: 200,
} as const;

export const EMPTY_ATTRIBUTION: InquiryAttribution = {
  pagePath: "",
  referrer: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

const clamp = (v: unknown, max: number) => str(v).slice(0, max);

/**
 * Normalises attribution off untrusted JSON, exactly as `coerceInquiry` does
 * for the brief. **Never throws and never fails a submission** — a field it
 * cannot make sense of becomes an empty string, because attribution is
 * metadata about a lead and must not be able to cost you the lead.
 */
export function coerceAttribution(input: unknown): InquiryAttribution {
  const raw = (input ?? {}) as Record<string, unknown>;

  const utms = Object.fromEntries(
    UTM_PARAMS.map((k) => [k, clamp(raw[k], ATTRIBUTION_LIMITS.utm)]),
  ) as Record<UtmParam, string>;

  return {
    pagePath: clamp(raw.pagePath, ATTRIBUTION_LIMITS.pagePath),
    referrer: clamp(raw.referrer, ATTRIBUTION_LIMITS.referrer),
    ...utms,
  };
}

/**
 * The same rules the form applies, so the visitor never meets a server error
 * for something the browser could have told them. **Required: name, email and
 * the project description.** Everything else is optional on purpose — phone
 * because email is already a working route back, budget because a good lead may
 * genuinely not know it yet, business because a personal-brand client has no
 * company to type.
 */
export function validateInquiry(value: InquiryPayload): InquiryErrors {
  const errors: InquiryErrors = {};

  if (value.name.length < INQUIRY_LIMITS.name.min) {
    errors.name = "Please tell us your name.";
  } else if (value.name.length > INQUIRY_LIMITS.name.max) {
    errors.name = `Please keep this under ${INQUIRY_LIMITS.name.max} characters.`;
  }

  if (!value.email) {
    errors.email = "Please add an email so we can reply.";
  } else if (
    !EMAIL.test(value.email) ||
    value.email.length > INQUIRY_LIMITS.email.max
  ) {
    errors.email = "That email doesn't look right — please check it.";
  }

  if (value.phone.length > INQUIRY_LIMITS.phone.max) {
    errors.phone = `Please keep this under ${INQUIRY_LIMITS.phone.max} characters.`;
  }

  if (value.business.length > INQUIRY_LIMITS.business.max) {
    errors.business = `Please keep this under ${INQUIRY_LIMITS.business.max} characters.`;
  }

  if (value.message.length < INQUIRY_LIMITS.message.min) {
    errors.message = "A sentence or two about the project is enough.";
  } else if (value.message.length > INQUIRY_LIMITS.message.max) {
    errors.message = `Please keep this under ${INQUIRY_LIMITS.message.max} characters.`;
  }

  return errors;
}

/**
 * The services a route may arrive with already ticked.
 *
 * Allow-listed against `INQUIRY_SERVICES` exactly as `coerceInquiry` does, so a
 * service page cannot preselect an option the form does not have. **Preselected
 * is not locked** — the visitor can untick it, add others, or ignore the group
 * entirely, which is why this only ever seeds the form's initial state.
 */
export function preselectedServices(
  ids: readonly string[] | undefined,
): string[] {
  if (!ids || ids.length === 0) return [];
  return [...new Set(ids)].filter((id) => SERVICE_IDS.has(id));
}

export function labelsFor(
  options: readonly Option[],
  selected: readonly string[],
): string[] {
  return options.filter((o) => selected.includes(o.id)).map((o) => o.label);
}

export const INQUIRY_COPY = {
  label: "Start a project",
  headline: ["Tell us what", "you're building."],
  /** Serif italic accent on the trailing word, as the numbered chapters do. */
  accentWord: "building.",
  lead: "Share a little about the project and we'll figure out the most useful next step.",
  context:
    "Whether it's a brand that needs momentum, a campaign that needs creators, or a system that needs building — start with the goal and we'll work back from there.",
  directLabel: "Prefer to talk directly?",
  /**
   * The WhatsApp row's value — the number again, and it is true again.
   *
   * Revision 16 had to replace this with a wording ("Chat with the team")
   * because the published phone line had changed and WhatsApp was not
   * confirmed on it, so printing the number under a WhatsApp label would have
   * been a claim the project could not stand behind. **Revision 17 closed
   * that**: the client confirmed the line, so the row prints the number it
   * actually dials. Rendered from `CONTACT`, never retyped.
   */
  whatsappValue: CONTACT.phoneDisplay,
  fields: {
    name: "Your name",
    email: "Email",
    phone: "Phone / WhatsApp",
    business: "Business / Brand",
    businessPlaceholder: "Company, creator or brand name",
    services: "What can we help with?",
    budget: "Project budget",
    timeline: "When would you like to start?",
    message: "Tell us about the project",
    messagePlaceholder: "What are you trying to build, grow or improve?",
  },
  optional: "Optional",
  submit: "Send project brief",
  submitting: "Sending…",
  /** Deliberately narrow: it is what the form does, and nothing more. */
  privacy: "We'll only use these details to respond to your inquiry.",
  success: {
    title: "Brief received.",
    body: "Thanks — we'll take a look and get back to you.",
    again: "Send another inquiry",
  },
  /**
   * No response-time promise anywhere. "Within 24 hours" is a commitment only
   * Mishram can make, and the site must not make it for them.
   */
  /**
   * **These two describe capture, not delivery, and that is the change.**
   * Until the lead database existed the only thing that could fail was the
   * email, so the copy talked about email. Now the inquiry is recorded first
   * and the notification is sent afterwards: a failed email is invisible to
   * the visitor because their brief is safely stored, and the only thing worth
   * telling them about is the case where it is *not*. Neither string mentions
   * email any more, because neither case is about email.
   */
  errors: {
    failed:
      "We couldn't save this right now. You can try again, or continue on WhatsApp.",
    unconfigured:
      "This site isn't set up to receive inquiries yet. Your details are still here — you can send them straight to us on WhatsApp.",
    summary: "Please check the highlighted fields.",
  },
  whatsapp: "Continue on WhatsApp",
  retry: "Try again",
} as const;

/**
 * The WhatsApp fallback message. Built from what the visitor actually typed and
 * **never sent automatically** — it only ever fills a link the visitor chooses
 * to follow after being told email delivery is unavailable.
 */
export function inquiryWhatsappMessage(value: InquiryPayload): string {
  const lines = [
    "Hi Mishram Media,",
    "",
    "I'd like to discuss a project.",
    "",
    `Name: ${value.name}`,
  ];

  if (value.email) lines.push(`Email: ${value.email}`);
  if (value.phone) lines.push(`Phone: ${value.phone}`);
  if (value.business) lines.push(`Business: ${value.business}`);

  const services = labelsFor(INQUIRY_SERVICES, value.services);
  if (services.length) lines.push(`Services: ${services.join(", ")}`);

  const budget = labelsFor(INQUIRY_BUDGETS, [value.budget])[0];
  if (budget) lines.push(`Budget: ${budget}`);

  const timeline = labelsFor(INQUIRY_TIMELINES, [value.timeline])[0];
  if (timeline) lines.push(`Timeline: ${timeline}`);

  lines.push("", "Project:", value.message);

  return lines.join("\n");
}
