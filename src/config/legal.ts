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
 * | "Website Usage Data: IP address, browser type, referring URLs, and page visits via cookies or analytics" | **Removed at the time**, when it was false. **Revision 26 restored a truthful version of it**: GA4 now runs, and the policy describes exactly what it does and what it never receives |
 * | Cookie policy listing "Analytics Cookies (e.g. Google Analytics)", "Marketing Cookies", "Facebook Pixel, Google Ads, LinkedIn Insight Tag" | **Removed, and only one of the four has since become true.** Google Analytics is real as of Revision 26 and is documented. **Marketing cookies, the Facebook Pixel, Google Ads and the LinkedIn Insight Tag still do not exist**, and are still not claimed — which is the point: the document tracks the site, in both directions |
 * | `info@mishram.com`, `support@mishram.com`, `+91 87550 65397`, `+91 6393939333`, "Prem Nagar, Dehradun" | **Removed.** All contradict each other and all contradict the verified details in `config/site.ts`. Every contact detail here is imported from there rather than typed |
 * | Terms clauses on payment, refunds, revision counts, delivery timelines, client responsibilities | **Removed from the website terms.** Those belong in a signed proposal or statement of work, not in the terms of an informational website — see §7 below, which says so explicitly |
 * | Terms: "not liable for loss of revenue… cannot guarantee specific results" | **Kept in substance.** It is true, it is relevant to a marketing agency's site, and §1 of the brief already forbids promising outcomes |
 * | Terms: governed by the laws of India, jurisdiction Uttarakhand | **Kept.** Consistent with the registered address in `config/site.ts` |
 *
 * ════════════════════════════════════════════════════════════════════════════
 * WHAT THIS SITE ACTUALLY DOES, verified in the code rather than assumed:
 *
 * - **GOOGLE ANALYTICS 4, ADDED IN REVISION 26 — and the two lines below it
 *   used to say the opposite.** `gtag.js` loads on every page in production.
 *   It runs under **Consent Mode v2 with every signal denied by default**: with
 *   `analytics_storage: denied` it sets no cookie and stores no identifier, and
 *   only a visitor who presses `Allow analytics` moves it to `granted`, at
 *   which point Google's `_ga` cookies may appear. The three advertising
 *   signals are **never** granted — there is no advertising tag on this site.
 *   The choice is kept in `localStorage["mishram-analytics-consent"]`.
 * - **No advertising pixel, no error tracker, no session recorder, no A/B
 *   tool, no Google Ads tag and no Tag Manager container.** None installed,
 *   none in `package.json`. GA4 is reached through one `<script>`, not a
 *   dependency.
 * - **Nothing a visitor types is ever sent to Google.** The `generate_lead`
 *   event carries option ids, a count and a page — never a name, email, phone,
 *   business or message. Verified by scanning the built client bundle.
 * - **No cookie is set by this site's own code.** No `document.cookie`
 *   anywhere in `src/`; the only cookies possible are Google's, only after
 *   consent.
 * - **Two pieces of browser storage, both first-party and neither a cookie**:
 *   `localStorage["mishram-theme"]`, holding `"dark"` or `"light"`; and
 *   `sessionStorage["mishram-attribution"]`, holding the `utm_*` parameters
 *   and external referrer of *this visit*, written only when the visitor
 *   arrived with one. Neither is attached to a request the way a cookie is;
 *   the theme never leaves the device at all, and the attribution entry leaves
 *   it only if the visitor presses submit. The session entry dies with the tab.
 * - **Two outbound server calls, and the order matters**: `POST /api/inquiry`
 *   now writes the inquiry to **Supabase** (`public.leads`) first, then
 *   attempts a notification email through Resend when `RESEND_API_KEY` /
 *   `INQUIRY_FROM_EMAIL` are configured. **The claim that this route stores
 *   nothing is no longer true and the documents below have been rewritten** —
 *   it stores the inquiry, deliberately, so that a failed email cannot lose it.
 * - **Still no IP address, no user agent, no fingerprint and no visitor
 *   profile.** The leads table holds the brief, the page it was sent from and
 *   the campaign that sent them — sales context, not tracking.
 * - **One outbound browser call**: the form posting to this site's own route.
 *   The browser still never talks to Supabase or to an email provider.
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
        "Alongside an inquiry we record which page of this site you sent it from, and — if you arrived from an advertisement, a link we shared or another website — the campaign tags in that link and the site that sent you. That is so we know which of our own efforts actually reach people. It is stored with the inquiry and nowhere else, and if you came here directly there is nothing to record.",
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
        "This is the part most website privacy policies get wrong, so it is worth being exact. There are no advertising pixels here, no session recording, no fingerprinting, no A/B testing tool and no data broker. Nothing on this site follows you to another one, and nothing here is used to build an advertising profile of you.",
        "We ourselves do not store your IP address, your browser's user agent or your device details. Nothing you read is written down by us: the campaign information described above is attached to an inquiry you chose to send, and if you never send one, nothing about your visit reaches our own records at all.",
        "The one measurement tool we do use is Google Analytics, and it has its own section below, because it deserves a straight explanation rather than a bullet point.",
        "Our hosting provider keeps ordinary server request logs, as every web host does — that is standard infrastructure operation, it is not something we read, analyse or connect to you.",
      ],
    },
    {
      heading: "How an inquiry actually travels",
      body: [
        "The form posts to a route on this site. That route checks the fields, then saves your inquiry to our database. We use Supabase, a hosted database service, to run it. That saved record is the copy we work from.",
        "Once it is saved, the route also tries to send us an email about it through Resend, our email delivery provider, when email delivery is configured — so that somebody notices it quickly. That email is a notification, not the inquiry itself. If it fails to send, your inquiry is still safely with us and we still see it; that is exactly why it is saved first.",
        "Your browser only ever talks to this website. It does not contact the database or the email provider directly, and neither of those services is reachable from the page you are reading.",
        "The form includes one hidden field that no visitor can see or reach. If something fills it in, the submission is discarded — nothing is saved and nothing is sent. That is the whole of our spam handling: there is no CAPTCHA service and no device fingerprinting.",
      ],
    },
    {
      heading: "Google Analytics, and what we ask you first",
      body: [
        "We use Google Analytics to understand how this site is used — which pages people read, and which campaigns actually bring anyone here. That is the whole purpose: it tells us whether our own advertising and outreach are worth continuing. It is measurement, not a customer list.",
        "The first time you visit, a small notice asks whether you are willing to allow it. Until you answer, Google Analytics is switched to its no-storage mode: it sets no cookie, saves nothing on your device, and cannot recognise you or connect one visit to another. Google still receives a basic, anonymous signal that a page was viewed.",
        "If you choose Allow analytics, Google Analytics starts using its own cookies so that repeat visits can be counted as one person rather than several, and it processes ordinary technical information — the page address, the referring site, approximate location from your IP address, and general device and browser type. Google is the processor for that, under its own terms.",
        "If you choose Only necessary, it stays in the no-storage mode described above and we do not ask you again. You can change your mind by clearing this site's data in your browser, which makes the notice reappear.",
        "Advertising is switched off entirely, whichever you choose. There is no Google Ads tag on this site, no remarketing and no ad personalisation, so those permissions are never requested and never granted.",
      ],
      list: [
        "We never send Google your name, email address, phone number, business name or the message you wrote",
        "When an inquiry is submitted we record that one happened, along with which services, budget range and timing were chosen — never who chose them",
        "Google Analytics is not our lead database, cannot see it, and is never used to contact anybody",
      ],
    },
    {
      heading: "The WhatsApp option",
      body: [
        "If your inquiry cannot be saved — because something is genuinely wrong at our end — the form tells you plainly and offers a WhatsApp link with your details already written into it. It does not pretend to have received something it did not.",
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
        "Supabase — hosts the database your inquiry is saved in, on our behalf",
        "Resend — delivers the email that notifies us of an inquiry, and only when that delivery is configured",
        "Google Analytics — measures how the site is used, in its no-storage mode until you allow it, and never receives anything you typed",
        "WhatsApp — only if you choose to contact us that way",
        "Instagram and Facebook — only if you follow one of our outbound links, at which point their policies apply and ours stops",
        "No advertising network, no remarketing and no data broker. We do not sell, rent or trade inquiry information to anyone",
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
        "An inquiry stays in our database, and in our email inbox, for as long as it is useful — while we are talking, and for a reasonable period afterwards in case the conversation resumes. Those two places are the whole of it; it is not copied anywhere else.",
        "If you would like us to delete an inquiry you sent, ask and we will remove it from both.",
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
      "What this website collects, how a project inquiry is stored and answered, and how its analytics work — including what is never sent to Google.",
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
  lead: "The short version: this site sets no cookies of its own, and no analytics cookie at all unless you allow it. Here is exactly what is stored, and when.",
  sections: [
    {
      heading: "The short version",
      body: [
        "This website sets no cookies of its own. It never has and it does not now.",
        "One cookie is possible, and only one: Google Analytics, and only after you press Allow analytics on the small notice that appears on your first visit. Until you do — and permanently, if you choose Only necessary — Google Analytics runs in a mode where it stores nothing on your device and cannot recognise you.",
        "There are no advertising cookies here at any point, whatever you choose. There is no Google Ads tag, no remarketing pixel, no social pixel and no cross-site profiling. Those permissions are never even requested, because there is nothing on this site that would use them.",
        "This page said something different before. It used to say the site ran no analytics at all, which was true then and is not true now. It was rewritten in the same change that added the analytics, rather than at some point afterwards.",
      ],
    },
    {
      heading: "If you allow analytics",
      body: [
        "Google Analytics uses its own cookies to tell repeat visits apart from new ones — so that one person reading four pages is counted as one person, not four. The common ones are named _ga and a second one beginning _ga_ followed by a code for this specific property.",
        "We do not set them, cannot read them from our own systems, and they are governed by Google's terms rather than ours. We are not going to quote you an expiry here, because that is Google's setting to change and a number in this document would be out of date the moment it did.",
        "Nothing you type into the inquiry form is ever attached to them. Your name, email, phone number, business and message go to our own database and to our inbox, and to nowhere else — the privacy policy sets that out in full.",
      ],
    },
    {
      heading: "If you choose Only necessary",
      body: [
        "No analytics cookie is set, nothing is stored on your device by Google, and no identifier for you exists. Google still receives a plain signal that a page was viewed, with no way to connect it to you or to any other visit.",
        "We do not ask again. The answer is remembered so the notice never reappears — that entry is described below.",
      ],
    },
    {
      heading: "The three things this site stores itself",
      body: [
        "None of them is a cookie, and the difference matters. A cookie is attached to every request your browser makes to the site, so the server sees it on every page. These are browser storage: they sit on your device, and none of them is transmitted just because you loaded a page.",
        "Your theme choice. When you switch the site between dark and light, that choice is saved so the next page does not flash the wrong one at you. It is a single entry, named mishram-theme, holding one word: dark, or light. It never leaves your device at all — we could not read it if we wanted to.",
        "Your analytics answer. Whichever button you press on the notice is remembered in an entry named mishram-analytics-consent, holding one word: granted, or denied. It exists so we do not ask you the same question on every page. It is not an identifier and says nothing about you beyond your answer.",
        "Where your visit came from, if it came from somewhere. If you arrive from an advertisement, a shared link or another website, the campaign tags in that link and the referring site are held in an entry named mishram-attribution, so that the information is still there if you fill in the inquiry form a few pages later. It is sent to us only if you press submit, and then it is saved with your inquiry. If you arrived here directly, nothing is written at all.",
        "That last one is session storage, the shortest-lived kind: scoped to the tab you are reading in and gone the moment you close it. It is not used to recognise you, on this site or anywhere else.",
        "You can clear all of them at any time by clearing this site's data in your browser. Nothing breaks — the site follows your operating system's dark or light preference again, and the analytics notice asks you once more.",
      ],
    },
    {
      heading: "Third-party scripts",
      body: [
        "Google Analytics is the only one, and it is the only third party whose code runs on this site at all. There is no advertising pixel, no Tag Manager container, no social widget, no comment system, no embedded video, no map and no chat bubble. Even the typefaces are served from this domain rather than fetched from a font network.",
        "If you follow a link out to Instagram, Facebook or WhatsApp, you have left this site — those platforms set their own cookies under their own policies, and this one no longer applies.",
      ],
    },
    {
      heading: "Managing storage in your browser",
      body: [
        "Every browser lets you view and clear the storage a site has used, usually under privacy or site settings. Clearing this site's data resets the theme, forgets where your visit came from, removes any Google Analytics cookie, and brings the analytics notice back so you can answer it differently.",
      ],
    },
    CHANGES_SECTION("policy"),
    CONTACT_SECTION,
  ],
  metadata: {
    title: "Cookie Policy",
    description:
      "This website sets no cookies of its own, and no analytics cookie unless you allow it. Here is what is stored on your device, when, and how to clear it.",
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
