/**
 * FEEDBACK — the private testimonial intake (Revision 43).
 *
 * Mishram sends a link to `/feedback` to a brand, creator, client or partner
 * they have actually worked with. That person writes a few words; the words
 * land in `public.testimonials` as **`pending`**; somebody at Mishram reads
 * them in the Supabase Table Editor and sets `approved` or `rejected`. Only an
 * `approved` row ever reaches the homepage. **Nothing is published because it
 * was submitted** — that is the one rule this whole system exists to enforce.
 *
 * This file is the **single source for the form's shape**, exactly as
 * `config/inquiry.ts` is for the project brief: the copy, the allowed option
 * values, the field limits and the validator. The browser and
 * `app/api/feedback/route.ts` both import it, so a value the form can send is
 * by definition a value the route accepts. It imports nothing client-only —
 * `config/site.ts` is data — so it is safe on the server.
 */

import { CONTACT } from "./site";

/** The route. Not in the navigation, not in the sitemap, `noindex`. */
export const FEEDBACK_PATH = "/feedback";

export type FeedbackOption = { id: string; label: string };

/**
 * How the person worked with Mishram. A closed list, because it is also what
 * the public section can say about an anonymous quote — *"A brand we worked
 * with"* is a true sentence only if the value came from this set.
 */
export const FEEDBACK_RELATIONSHIPS: readonly FeedbackOption[] = [
  { id: "brand", label: "As a brand" },
  { id: "creator", label: "As a creator" },
  { id: "client", label: "As a client" },
  { id: "partner", label: "As a partner" },
  { id: "other", label: "Other" },
];

export type Relationship = (typeof FEEDBACK_RELATIONSHIPS)[number]["id"];

/**
 * What the public section calls a person who chose not to show their name.
 * Keyed on the relationship, so the anonymous author line is still a fact the
 * person supplied rather than a guess.
 */
export const RELATIONSHIP_AUTHOR: Record<string, string> = {
  brand: "A brand we worked with",
  creator: "A creator we worked with",
  client: "A client",
  partner: "A partner",
  other: "Someone we worked with",
};

/** Bounds every free-text field, on both sides of the wire. */
export const FEEDBACK_LIMITS = {
  name: { min: 2, max: 80 },
  organization: { min: 0, max: 120 },
  role: { min: 0, max: 80 },
  email: { min: 5, max: 160 },
  profileUrl: { min: 0, max: 200 },
  testimonial: { min: 20, max: 1200 },
} as const;

/**
 * Good enough to catch a typo, deliberately not an RFC 5322 implementation —
 * the same rule the inquiry form applies.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Anything that reads as a link. The feedback field has a sibling field for
 * the person's own site, so a testimonial carrying two or more of these is
 * far more likely to be a bot than a client — and the route says so plainly.
 */
const LINKISH = /(https?:\/\/|www\.)/gi;

export type FeedbackPayload = {
  name: string;
  organization: string;
  role: string;
  relationship: string;
  email: string;
  profileUrl: string;
  testimonial: string;
  /** Required, and must be true. Never pre-checked in the form. */
  consent: boolean;
  displayName: boolean;
  displayOrganization: boolean;
  mediaAllowed: boolean;
  /** Honeypot. Real visitors never see it, so it must arrive empty. */
  companyWebsite: string;
};

export type FeedbackField = keyof Omit<
  FeedbackPayload,
  "companyWebsite" | "displayName" | "displayOrganization" | "mediaAllowed"
>;

export type FeedbackErrors = Partial<Record<FeedbackField, string>>;

export const EMPTY_FEEDBACK: FeedbackPayload = {
  name: "",
  organization: "",
  role: "",
  relationship: "",
  email: "",
  profileUrl: "",
  testimonial: "",
  consent: false,
  displayName: false,
  displayOrganization: false,
  mediaAllowed: false,
  companyWebsite: "",
};

const RELATIONSHIP_IDS = new Set(FEEDBACK_RELATIONSHIPS.map((o) => o.id));

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const bool = (v: unknown) => v === true;

/**
 * Normalises anything into the payload shape. Used by the route on untrusted
 * JSON, so it never assumes a field is present or is the right type. A
 * checkbox arrives as `true` or it did not arrive — `"true"`, `1` and `"on"`
 * are all treated as unchecked, because consent is not something to infer.
 */
export function coerceFeedback(input: unknown): FeedbackPayload {
  const raw = (input ?? {}) as Record<string, unknown>;
  const relationship = str(raw.relationship);

  return {
    name: str(raw.name),
    organization: str(raw.organization),
    role: str(raw.role),
    relationship: RELATIONSHIP_IDS.has(relationship) ? relationship : "",
    email: str(raw.email),
    profileUrl: str(raw.profileUrl),
    testimonial: str(raw.testimonial),
    consent: bool(raw.consent),
    displayName: bool(raw.displayName),
    displayOrganization: bool(raw.displayOrganization),
    mediaAllowed: bool(raw.mediaAllowed),
    companyWebsite: str(raw.companyWebsite),
  };
}

/** `https://…` or `http://…`, parseable, nothing else. */
function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/**
 * The same rules the form applies, so the person never meets a server error
 * for something the browser could have told them. **Required: name, email,
 * relationship, the feedback itself, and consent.** Everything else is
 * optional on purpose — a creator has no company to type, and a link is a
 * courtesy rather than a credential.
 */
export function validateFeedback(value: FeedbackPayload): FeedbackErrors {
  const errors: FeedbackErrors = {};
  const L = FEEDBACK_LIMITS;

  if (value.name.length < L.name.min) {
    errors.name = "Please tell us your name.";
  } else if (value.name.length > L.name.max) {
    errors.name = `Please keep this under ${L.name.max} characters.`;
  }

  if (value.organization.length > L.organization.max) {
    errors.organization = `Please keep this under ${L.organization.max} characters.`;
  }

  if (value.role.length > L.role.max) {
    errors.role = `Please keep this under ${L.role.max} characters.`;
  }

  if (!value.relationship) {
    errors.relationship = "Please tell us how we worked together.";
  }

  if (!value.email) {
    errors.email = "Please add an email so we can confirm this came from you.";
  } else if (!EMAIL.test(value.email) || value.email.length > L.email.max) {
    errors.email = "That email doesn't look right — please check it.";
  }

  if (value.profileUrl) {
    if (value.profileUrl.length > L.profileUrl.max || !isWebUrl(value.profileUrl)) {
      errors.profileUrl = "Please paste a full link, starting with https://";
    }
  }

  if (value.testimonial.length < L.testimonial.min) {
    errors.testimonial = "A few sentences about working together is perfect.";
  } else if (value.testimonial.length > L.testimonial.max) {
    errors.testimonial = `Please keep this under ${L.testimonial.max} characters.`;
  } else if ((value.testimonial.match(LINKISH) ?? []).length >= 2) {
    errors.testimonial =
      "Please keep links out of the feedback itself — there's a separate field for your website.";
  }

  if (!value.consent) {
    errors.consent = "Please confirm you're happy for us to use this feedback.";
  }

  return errors;
}

export function relationshipLabel(id: string): string {
  return FEEDBACK_RELATIONSHIPS.find((o) => o.id === id)?.label ?? "";
}

export const FEEDBACK_COPY = {
  /** The transition overlay's name for the route. */
  routeMarker: "Feedback",
  eyebrow: "Feedback",
  title: "Thank you for working with us.",
  lead: "Share a few words about your experience. We may feature approved feedback on Mishram Media's website.",
  /** What happens after they press send — plain, and no promise of publication. */
  nextLabel: "What happens next",
  next: [
    "We read every submission ourselves.",
    "Only feedback we approve is published — sending it does not guarantee publication.",
    "Your email is never published. We use it only to confirm the feedback is yours and to reach you about it.",
  ],
  /** Where to write instead, for anyone who would rather not use a form. */
  directLabel: "Prefer to email it?",
  directValue: CONTACT.email,
  panelLabel: "Your feedback",
  groups: {
    about: { index: "01", title: "About you" },
    words: { index: "02", title: "Your words" },
    permission: { index: "03", title: "Permission" },
  },
  fields: {
    name: "Your name",
    organization: "Company or creator name",
    organizationPlaceholder: "Brand, channel or business",
    role: "Your role",
    rolePlaceholder: "Founder, marketing lead, creator…",
    relationship: "How did we work together?",
    email: "Email",
    profileUrl: "Website or social profile",
    profileUrlPlaceholder: "https://",
    testimonial: "Your feedback",
    testimonialPlaceholder: "What was it like working with Mishram Media?",
  },
  permissions: {
    legend: "How may we show it?",
    displayName: "Show my name with the feedback",
    displayOrganization: "Show my company or creator name",
    mediaAllowed:
      "Mishram Media may use my logo or profile photo alongside it, if I share one",
  },
  consent: {
    label:
      "I give Mishram Media permission to use this feedback publicly on its website and marketing material.",
    hint: "Submitting does not guarantee publication. You can ask us to take published feedback down at any time.",
  },
  optional: "Optional",
  submit: "Send feedback",
  submitting: "Sending…",
  privacy:
    "We use these details only to review your feedback and, if approved, to publish it as you've allowed.",
  success: {
    title: "Thank you.",
    body: "Your feedback has been received. We'll read it before anything is published.",
  },
  errors: {
    failed: `We couldn't save this right now. Please try again in a moment, or email it to ${CONTACT.email}.`,
    unconfigured: `This page isn't set up to receive feedback yet. You can email it to us at ${CONTACT.email}.`,
    summary: "Please check the highlighted fields.",
  },
  retry: "Try again",
  metadata: {
    title: "Share your feedback",
    description:
      "A private page for brands, creators, clients and partners who have worked with Mishram Media to share feedback.",
  },
} as const;
