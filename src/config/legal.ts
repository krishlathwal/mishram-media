/**
 * LEGAL PAGES — Privacy, Terms, Cookies.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * AUDIT (August 2026). The previous Mishram Media site shipped all three
 * documents. They were read in full before any of this was written, and
 * **almost none of the content survived**, because it describes a site that
 * behaves nothing like this one.
 *
 * Source: `Mishram.Media/public_html/{privacyPolicy,termsAndConditions,
 * cookiePolicy}.html` (mirrored in `_backup_pre_seo/`), effective 5 July 2025.
 *
 * | Old claim | Verdict here |
 * | --- | --- |
 * | "Website Usage Data: IP address, browser type, referring URLs, and page visits via cookies or analytics" | **Removed.** This site sets no cookies and runs no analytics. Verified: nothing in `src/` touches `document.cookie`, and there is no gtag/GA/pixel/Sentry/PostHog anywhere |
 * | Cookie policy listing "Analytics Cookies (e.g. Google Analytics)", "Marketing Cookies", "Facebook Pixel, Google Ads, LinkedIn Insight Tag" | **Removed — this was false for this site.** None of them exists. Claiming them would be a fabrication in the one document whose whole job is accuracy |
 * | `info@mishram.com`, `support@mishram.com`, `+91 87550 65397`, `+91 6393939333`, "Prem Nagar, Dehradun" | **Removed.** All contradict each other and all contradict the verified details in `config/site.ts`. Every contact detail here is imported from there rather than typed |
 * | Terms clauses on payment, refunds, revision counts, delivery timelines, client responsibilities | **Removed from the website terms.** Those belong in a signed proposal or statement of work, not in the terms of an informational website — see §7 below, which says so explicitly |
 * | Terms: "not liable for loss of revenue… cannot guarantee specific results" | **Kept in substance.** It is true, it is relevant to a marketing agency's site, and §1 of the brief already forbids promising outcomes |
 * | Terms: governed by the laws of India, jurisdiction Uttarakhand | **Kept.** Consistent with the registered address in `config/site.ts` |
 *
 * ════════════════════════════════════════════════════════════════════════════
 * WHAT THIS SITE ACTUALLY DOES, verified in the code rather than assumed:
 *
 * - **No cookies at all.** No `document.cookie` anywhere in `src/`.
 * - **No analytics, no advertising pixel, no error tracker, no session
 *   recorder, no A/B tool.** None installed, none in `package.json`.
 * - **One piece of browser storage**: `localStorage["mishram-theme"]`, holding
 *   `"dark"` or `"light"`. It never leaves the device — which is precisely the
 *   technical difference between it and a cookie.
 * - **One outbound server call**: `POST /api/inquiry` → Resend's REST API, and
 *   only when `RESEND_API_KEY` / `INQUIRY_FROM_EMAIL` are configured. The route
 *   validates and delivers; it writes no database row, no file and no log.
 * - **One outbound browser call**: the form posting to this site's own route.
 * - **Fonts are self-hosted.** `next/font/google` downloads Archivo, Instrument
 *   Sans and Instrument Serif at build time and serves them from this origin,
 *   so a visitor's browser never requests them from Google.
 * - **No embeds.** No social widget, no iframe, no third-party script, no map.
 * - **Spam handling is one hidden honeypot field**, not a CAPTCHA service.
 *
 * **Hosting is deliberately not named.** No hosting configuration is committed
 * to this repository, so naming a provider would be a guess — the documents say
 * "our hosting provider" and can name it the moment deployment is confirmed.
 *
 * Nothing here claims to be legal advice or certified compliance. It describes
 * what the site does.
 */

import { BRAND, CONTACT } from "./site";

export type LegalSection = {
  heading: string;
  /** Paragraphs. Rendered in order. */
  body?: readonly string[];
  /** An optional hairline list beneath the paragraphs. */
  list?: readonly string[];
};

export type LegalDoc = {
  /** Route segment. `/privacy`, `/terms`, `/cookies`. */
  slug: string;
  /** `01`, `02`, `03` — the small index in the eyebrow. */
  index: string;
  title: string;
  /** One line under the headline, before the sections. */
  lead: string;
  /** The footer rail label. Explicit — deriving it produced "Cookie". */
  shortLabel: string;
  sections: readonly LegalSection[];
  metadata: { title: string; description: string };
};

/**
 * The date these documents were actually written. Not backdated — the old
 * site's "5 July 2025" belongs to the old documents, not to these.
 */
export const LEGAL_UPDATED = "25 August 2026";

const CONTACT_SECTION: LegalSection = {
  heading: "Contact",
  body: [
    // "on WhatsApp at the same number" is true again as of Revision 17. It was
    // removed in Revision 16 because the published phone line had changed and
    // the site's WhatsApp action still pointed at the previous number; the
    // client has since confirmed the two are one line. A legal page is the one
    // document that cannot carry a convenient approximation, which is why this
    // sentence has now been corrected twice rather than left roughly right.
    `Questions about this document, or a request about information you have sent us, go to ${CONTACT.email}. You can also reach us on ${CONTACT.phoneDisplay}, or on WhatsApp at the same number.`,
    `${BRAND.name}, ${CONTACT.address}.`,
  ],
};

const CHANGES_SECTION = (what: string): LegalSection => ({
  heading: "Changes to this policy",
  body: [
    `If how the site behaves changes, this ${what} is updated with it and the date at the top changes. There is no archive of previous versions; the current text is the current behaviour.`,
  ],
});

/* ── Privacy ────────────────────────────────────────────────────── */

const PRIVACY: LegalDoc = {
  slug: "privacy",
  index: "01",
  title: "Privacy Policy",
  shortLabel: "Privacy",
  lead: "What this website collects, what happens to it, and what it deliberately does not do.",
  sections: [
    {
      heading: "What this covers",
      body: [
        "This policy is about this website and the ways it lets you contact Mishram Media. It does not cover a client engagement — where there is a signed agreement in place, that agreement governs how project material is handled.",
        "There is no account to create, no login, and no visitor profile. You can read every page of this site without giving us anything.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Only what you choose to send. There are two ways that happens.",
        "The project inquiry form. Your name, your email address and a description of the project are required, because without them we cannot reply or understand what you need. Everything else is optional and the form works without it: phone or WhatsApp number, business or brand name, which services you are interested in, a budget range and a rough timing.",
        "Contacting us directly. If you email, call or message us on WhatsApp, we have whatever you decide to put in that message.",
      ],
      list: [
        "We never ask for government ID, payment card details or passwords",
        "We do not buy contact information or add you to a list you did not ask for",
        "We do not sell or trade anything you send us",
      ],
    },
    {
      heading: "What we do not collect",
      body: [
        "This is the part most website privacy policies get wrong, so it is worth being exact. This site runs no analytics, no advertising pixels and no tracking of any kind. It sets no cookies. Nobody is building a profile of you here, and nothing follows you to another site.",
        "Our hosting provider keeps ordinary server request logs, as every web host does — that is standard infrastructure operation, it is not something we read, analyse or connect to you.",
      ],
    },
    {
      heading: "How an inquiry actually travels",
      body: [
        "The form posts to a route on this site. That route checks the fields, then sends the inquiry as an email through Resend, our email delivery provider, when email delivery is configured. It arrives in the Mishram Media mailbox and we reply from there.",
        "The route does not write your inquiry to a database, a file or a log. There is nowhere on this server for it to sit — delivering it is the only thing that route does. It is, of course, processed by the email provider on the way and then kept in our inbox like any other email.",
        "The form includes one hidden field that no visitor can see or reach. If something fills it in, the submission is discarded and nothing is delivered. That is the whole of our spam handling — there is no CAPTCHA service and no device fingerprinting.",
      ],
    },
    {
      heading: "The WhatsApp option",
      body: [
        "If email delivery is not switched on, or the provider rejects the message, the form tells you plainly and offers a WhatsApp link with your details already written into it.",
        "Nothing is sent unless you follow that link yourself. It never opens on its own. If you do use it, the conversation happens inside WhatsApp and is handled under WhatsApp's own terms and privacy policy, not ours.",
      ],
    },
    {
      heading: "Who else is involved",
      body: [
        "A short list, and it is the whole list:",
      ],
      list: [
        "Our hosting provider — serves the pages and keeps standard request logs",
        "Resend — delivers inquiry emails, and only when that delivery is configured",
        "WhatsApp — only if you choose to contact us that way",
        "Instagram and Facebook — only if you follow one of our outbound links, at which point their policies apply and ours stops",
        "No analytics platform, no advertising network, no data broker, no CRM",
      ],
    },
    {
      heading: "Fonts, images and embeds",
      body: [
        "The typefaces this site uses are downloaded when the site is built and served from this domain, so your browser never requests them from a font network. Every photograph and every logo on the site is a local file. There is no embedded video, no social widget, no map and no third-party script.",
      ],
    },
    {
      heading: "How long we keep things",
      body: [
        "An inquiry stays in our email inbox for as long as it is useful — while we are talking, and for a reasonable period afterwards in case the conversation resumes. It is not copied anywhere else.",
        "If you would like us to delete an inquiry you sent, ask and we will.",
      ],
    },
    {
      heading: "Your choices",
      body: ["You can ask us to do any of the following, and we will."],
      list: [
        "Tell you what we hold from something you sent",
        "Correct it",
        "Delete it",
        "Stop contacting you",
      ],
    },
    {
      heading: "Children",
      body: [
        "This site is aimed at businesses, brands and creators. It is not directed at children and we do not knowingly collect information from them.",
      ],
    },
    CHANGES_SECTION("policy"),
    CONTACT_SECTION,
  ],
  metadata: {
    title: "Privacy Policy",
    description:
      "What this website collects, how a project inquiry is delivered, and why it sets no cookies and runs no analytics.",
  },
};

/* ── Terms ──────────────────────────────────────────────────────── */

const TERMS: LegalDoc = {
  slug: "terms",
  index: "02",
  title: "Terms & Conditions",
  shortLabel: "Terms",
  lead: "The terms for using this website — and what they deliberately leave to a client agreement.",
  sections: [
    {
      heading: "What these terms cover",
      body: [
        "These terms apply to your use of this website. By browsing it or sending an inquiry through it, you are agreeing to them.",
        "They do not replace a client agreement. Where Mishram Media has a signed proposal, contract or statement of work with you, that document governs the work — its scope, its timelines, its fees, its revisions and its ownership terms. Nothing on this page changes it, and nothing on this page should be read as the terms of an engagement.",
      ],
    },
    {
      heading: "The site is informational",
      body: [
        "Everything here describes what Mishram Media does and the work it has done. It is not an offer, a quote or a contract, and prices are not published. A budget range in the inquiry form is a starting point for a conversation, not a price you have accepted.",
      ],
    },
    {
      heading: "Sending an inquiry",
      body: [
        "An inquiry starts a conversation. It does not create an engagement, reserve capacity, or oblige either of us to anything.",
        "Please send accurate information — we plan a first response around it. And please do not send confidential or sensitive material through the form; wait until there is an agreement in place and a proper way to share it.",
      ],
    },
    {
      heading: "No guaranteed outcome",
      body: [
        "Content, social, creator and paid work depend on things nobody controls: platform algorithms, audience behaviour, competition and timing. Mishram Media commits to the craft and the process, not to a number.",
        "Nothing on this website is a promise of a specific result — no reach, no follower figure, no ranking, no revenue. Where the site shows work or creators, it is showing what exists, not predicting what yours will do.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        `The design, code, written copy, layout and the ${BRAND.name} wordmark on this site belong to Mishram Media or the people who licensed them to us.`,
        "Photography of creators appears here with permission and remains the rights-holders' own. Brand logos shown belong to those brands and appear only to identify the collaboration.",
        "Please do not copy, republish or reuse the site's material without written permission. Linking to a page, or quoting a short passage with attribution, is welcome.",
      ],
    },
    {
      heading: "Links out",
      body: [
        "This site links to WhatsApp, Instagram and Facebook, and may link elsewhere. Those are not ours: we do not control what they publish, how they behave or what they collect, and a link is not an endorsement of anything beyond the destination we intended.",
      ],
    },
    {
      heading: "Availability and changes",
      body: [
        "The site is developed continuously. Pages may change, move or be added, and it may be unavailable while it is being updated or for reasons outside our control. We do not promise uninterrupted access.",
      ],
    },
    {
      heading: "Limits",
      body: [
        "The website is provided as it is. To the extent the law allows, Mishram Media is not liable for indirect or consequential loss arising from using it — for example lost profit, lost business or lost data.",
        "Nothing here limits liability that cannot be limited by law, including for fraud or for death or personal injury caused by negligence.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of India, and the courts of Uttarakhand have jurisdiction over any dispute arising from them.",
      ],
    },
    CHANGES_SECTION("page"),
    CONTACT_SECTION,
  ],
  metadata: {
    title: "Terms & Conditions",
    description:
      "The terms for using the Mishram Media website, and why project scope, fees and delivery live in a client agreement instead.",
  },
};

/* ── Cookies ────────────────────────────────────────────────────── */

const COOKIES: LegalDoc = {
  slug: "cookies",
  index: "03",
  title: "Cookie Policy",
  shortLabel: "Cookies",
  lead: "The short version: this website does not set cookies. Here is what it does store, and why that is different.",
  sections: [
    {
      heading: "No cookies",
      body: [
        "This site sets no cookies. Not essential ones, not analytics ones, not advertising ones. There is no tracking, no visitor profiling and no cross-site measurement of any kind.",
        "That is also why you have not been shown a consent banner. A banner exists to ask permission for non-essential storage, and there is none here to ask about. If that ever changes, this page changes first.",
      ],
    },
    {
      heading: "The one thing that is stored",
      body: [
        "When you switch the site between its dark and light themes, that choice is saved on your own device so the next page does not flash the wrong one at you. It is a single entry, named mishram-theme, holding one word: dark, or light.",
        "It is not a cookie, and the difference matters. A cookie is attached to every request your browser makes to the site, so the server sees it. This is browser local storage: it stays on your device and is never transmitted to us or to anyone else. We could not read it if we wanted to.",
        "You can clear it at any time by clearing this site's data in your browser. Nothing breaks — the site simply follows your operating system's dark or light preference again.",
      ],
    },
    {
      heading: "Third-party cookies",
      body: [
        "None, because there is nothing here to set them. This site embeds no third-party scripts, no analytics tag, no advertising pixel, no social widget, no comment system, no embedded video and no map. Even the typefaces are served from this domain rather than fetched from a font network.",
        "If you follow a link out to Instagram, Facebook or WhatsApp, you have left this site — those platforms set their own cookies under their own policies, and this one no longer applies.",
      ],
    },
    {
      heading: "Managing storage in your browser",
      body: [
        "Every browser lets you view and clear the storage a site has used, usually under privacy or site settings. Because the only thing this site stores is a theme preference, clearing it has no effect beyond resetting that preference.",
      ],
    },
    CHANGES_SECTION("policy"),
    CONTACT_SECTION,
  ],
  metadata: {
    title: "Cookie Policy",
    description:
      "This website sets no cookies and runs no analytics. What it does store is a theme preference, kept on your own device.",
  },
};

/**
 * The three documents, in reading order. The registry is the routing source
 * — the footer's legal rail and the page-transition route marker both derive
 * from it, so a fourth document would need no component edit.
 */
export const LEGAL_DOCS: readonly LegalDoc[] = [PRIVACY, TERMS, COOKIES];

export function legalPath(slug: string): string {
  return `/${slug}`;
}

export function getLegalDoc(slug: string): LegalDoc {
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Unknown legal document: ${slug}`);
  return doc;
}

/** Short labels for the footer rail — `Privacy`, `Terms`, `Cookies`. */
export const LEGAL_LINKS = LEGAL_DOCS.map((doc) => ({
  slug: doc.slug,
  href: legalPath(doc.slug),
  label: doc.shortLabel,
}));

export const LEGAL_COPY = {
  /** The eyebrow's parent crumb — these pages have no other parent. */
  sectionLabel: "Legal",
  updatedLabel: "Updated",
} as const;
