/**
 * /services/web-digital-experiences — all of the page's words.
 *
 * The homepage's Service 04 says what this is in one sentence
 * (`config/services.ts`). This page is the long form of the same claim, so
 * nothing here contradicts it and nothing here goes beyond §1 of the brief.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CONTENT INTEGRITY — and this page has the widest surface to get it wrong on.
 *
 * This is the one service where **the work itself is public**: two live sites a
 * visitor can open in a new tab and judge. That is the strongest evidence on
 * the site — and it is also the reason the section around it has to stay
 * silent about everything it cannot prove.
 *
 * **What each project may carry: its name, its category, a screenshot of the
 * live site, and a link to it. Nothing else.** No metric, no revenue, no
 * traffic, no conversion lift, no launch date, no build duration, no team size,
 * no technology stack, no scope breakdown, no description of Mishram's exact
 * role, and no testimonial. None of that is recorded anywhere in this project,
 * and a portfolio line invented to fill a layout is a claim.
 *
 * The two projects are Mishram's own, stated by the client directly — the same
 * bar §10s applies to a contact detail, and a stronger one than the schema.org
 * `sameAs` evidence the social rail runs on.
 *
 * **No invented technology claim.** The capability language stays at the level
 * the business actually sells — frontend, backend, CMS, databases, payments,
 * integrations — and never names a framework, a vendor or a version. §10m
 * settled the equivalent question for advertising platforms: a capability index
 * is a promise, so it lists only what the project can stand behind.
 *
 * **No promised outcome.** "Designed to convert" is a design intent; "increases
 * conversions" is a result. Only the first appears here.
 *
 * **The compositions are abstractions, not screenshots of client software.**
 * Every procedural interface on this route is Mishram's own drawing of a
 * structure — no client's admin panel, no real CRM record, no customer name, no
 * dashboard figure. §10m's rule that a decorative number reads as a claim
 * applies here unchanged: **there are no numbers inside any interface surface
 * on this page.**
 * ════════════════════════════════════════════════════════════════════════════
 *
 * SECTION MAP — the approved flow, and what is wired today.
 *
 * | # | Section                          | Status        |
 * | - | -------------------------------- | ------------- |
 * | 1 | Hero — the Digital Build Stage    | **built**     |
 * | 2 | Selected Digital Work             | **built**     |
 * | 3 | What We Build — the index         | **built**     |
 * | 4 | Beyond Websites — custom software | **built**     |
 * | 5 | Why Mishram — the whole route     | **built**     |
 * | 6 | How We Build — the build itself   | **built**     |
 * | 7 | Project inquiry (shared)          | **built**     |
 *
 * **The flow was shortened after §04 was measured, not before.** The approved
 * plan carried four more chapters — a responsive demonstration, a development
 * process, a technology philosophy and a capability index. The route already
 * measured ~14,000px on a phone with §03 and §04 alone, so the remaining
 * argument collapses into **one** compact chapter before the inquiry section
 * rather than four cinematic ones. Fewer sections is the right answer to a
 * page that is long — not less to say, the same argument said once.
 *
 * **That chapter is `06 / How We Build`, and the route's information
 * architecture is now complete.** Nothing further is planned for this page:
 * the next pass on it is QA, copy and production, not another section. A
 * seventh chapter would need to argue something the six above it do not, and
 * there is nothing left — process was the last question a visitor had.
 */

import type { ServiceSectionCopy } from "./service-pages";

/* ── Hero — THE DIGITAL BUILD STAGE ─────────────────────────────── */

export const WEB_HERO = {
  /** The hero breadcrumb is `SERVICES / <title>`, composed in `ServiceHero`. */
  headline: ["Websites people remember.", "Systems businesses rely on."] as const,
  /**
   * One serif italic word, on the line carrying the half of this service the
   * site's other four pages never claim. The emphasis is deliberate: everybody
   * says they build websites, and the second sentence is the differentiator.
   */
  accentWord: "rely",
  lead: "Strategy, design and development for high-performance websites, commerce experiences and custom digital products — from landing pages to CRM platforms and mobile applications.",
  detail:
    "One team for the interface a customer sees and the system a business runs on, so the two are designed to fit each other rather than integrated afterwards.",
  /**
   * THE CTA HIERARCHY, and it is deliberately different from the other four
   * service pages.
   *
   * Services 01–03 open with the booking ask because a call is the natural
   * first step into a retainer. A build starts with a brief instead — scope,
   * pages, functionality — so `Start a Project` leads and the consultation sits
   * beneath it as a quieter third route rather than a third heavy button.
   * Both destinations are Mishram's existing ones; nothing new was invented.
   */
  primaryCta: "Start a Project",
  secondaryCta: "Explore Our Work",
  /**
   * **The same call the other four heroes offer, named the same way.** This
   * read `Book a free 15-min consultation` while every other hero on the site
   * says `Book a 15-Min Call` — one destination under two nouns, and the only
   * place the word "consultation" appeared in a label. The register still
   * differs, deliberately: this is a quiet third link rather than a button, so
   * it stays sentence case. `free` moves into the note, where the same promise
   * costs no headline weight.
   */
  tertiaryCta: "Book a 15-min call",
  tertiaryNote: "Free · 15 min · no obligation",
  /** The concept rail under the composition. Categories, never claims. */
  signalPath: ["Web", "Commerce", "SaaS", "Software", "Mobile"] as const,
  /**
   * The composition carries no photography, so the caption slot carries what a
   * page full of interfaces most needs to say out loud — the same move §10m
   * made on Service 03.
   */
  note: "Illustrative — every interface in this composition is Mishram's own abstraction of a structure. No client software, customer record or product screen is shown.",
  /** Labels inside the composition. Structural and factual only (§10). */
  labels: {
    structure: "Structure",
    interface: "Interface",
    responsive: "Responsive",
    system: "System",
    component: "Component",
    measure: "Grid",
  },
} as const;

/* ── 02 / Selected Digital Work ──────────────────────────────────
   PROOF BEFORE ARGUMENT, and the order is the point.

   Every other service page on this site argues first and shows evidence late,
   because on those services the evidence is a method rather than an artefact.
   Here it is two URLs. A visitor who can open the work should meet it before
   five screens of positioning — so this section sits second, directly under
   the hero, and the page earns the rest of itself afterwards.

   **Range is the argument, not volume.** Two projects that could not be less
   alike — an AI product and an interior design studio — say more about what
   Mishram can take on than a wall of similar sites would. The copy therefore
   never counts them, so a third project changes this file and nothing else. */

export const WEB_WORK_COPY: ServiceSectionCopy = {
  label: "Selected Digital Work",
  headline: ["Built for very", "different businesses."],
  accentWord: "different",
  lead: "An AI product and an interior design studio. Two entirely different problems, held to the same standard.",
};

export type WorkProjectMedia = {
  src: string;
  /** Intrinsic size of the optimised asset, so nothing shifts while it loads. */
  width: number;
  height: number;
};

export type WorkProject = {
  id: string;
  /** The section's own index. Not the homepage's chapter numbering. */
  index: string;
  name: string;
  /** Industry, supplied by the client. Never a scope or a role description. */
  category: string;
  /** The live site. Opens in a new tab, `noopener noreferrer`. */
  url: string;
  /** The URL as it is written on the page — no protocol, no trailing slash. */
  displayUrl: string;
  /**
   * Optional, and **empty until something factual exists to put in it.** A
   * one-line description of what the site is would be legitimate; a line about
   * results, stack, timeline or Mishram's exact role would not. The layout
   * renders correctly with it absent, so nothing is redesigned when it arrives.
   *
   * **Both are now filled, and every word in them is read off the live site's
   * own pages** — its `<title>`, its navigation and the sections it actually
   * carries. That is the same evidence class as the screenshot beside it: a
   * visitor can open the URL and check the sentence. Nothing in either line is
   * a result, a role, a technology, a date or a scope of engagement.
   */
  note?: string;
  desktop?: WorkProjectMedia;
  mobile?: WorkProjectMedia;
  /** Meaningful alt text. Describes the site, never editorialises about it. */
  alt: string;
  /**
   * The narrow capture's own alt text.
   *
   * It used to be `alt=""`. That was right while the phone rendered at 66px on
   * a 390 viewport — a decorative fragment carrying nothing a reader could
   * judge. Revision 40 makes it a real object at every width, and a real object
   * describes itself. The two strings differ only in the width they name,
   * because that is the only thing that differs about the two views.
   */
  mobileAlt?: string;
};

/**
 * The two live projects.
 *
 * **A project with no capture still renders.** `desktop`/`mobile` are optional
 * on purpose: the viewport falls back to the page's own procedural interface
 * surface rather than to a grey placeholder box, so a capture can be dropped in
 * later without the section being redesigned around it — and the aesthetic
 * never degrades to a "coming soon" tile.
 */
export const WEB_WORK: readonly WorkProject[] = [
  {
    id: "ekly",
    index: "01",
    name: "Ekly",
    category: "AI / SaaS / Creative Technology",
    url: "https://www.ekly.ai/",
    displayUrl: "ekly.ai",
    desktop: {
      src: "/media/work/ekly-desktop.webp",
      width: 1440,
      height: 1600,
    },
    mobile: { src: "/media/work/ekly-mobile.webp", width: 720, height: 2400 },
    /* Read off the live site: its own title is "Ekly — Create polished video,
       image, and audio in one studio", and its navigation carries Pricing,
       Guides, Blog and Partner Program beside the route into the app. */
    note: "A product and marketing site for an AI generation studio — pricing, guides, editorial and the route into the app.",
    alt: "The Ekly website, captured from the live site at desktop width.",
    mobileAlt: "The Ekly website, captured from the live site at mobile width.",
  },
  {
    id: "ruchita",
    index: "02",
    name: "Ruchita Interiors",
    category: "Interior Design / Service Business",
    url: "https://ruchitainteriors.com/",
    displayUrl: "ruchitainteriors.com",
    desktop: {
      src: "/media/work/ruchita-desktop.webp",
      width: 1440,
      height: 2600,
    },
    mobile: {
      src: "/media/work/ruchita-mobile.webp",
      width: 720,
      height: 2400,
    },
    /* Read off the live site: its own title is "Ruchita Interiors —
       Residential, Commercial & Turnkey Interior Solutions", and it carries a
       service index, a project index with per-project pages, an editorial
       section and an enquiry form. **Its own hero publishes counters; those
       figures appear only inside the screenshot and are never repeated in
       Mishram's voice** (§10v). */
    note: "A studio site for an interior design practice — services, a project index with case pages, editorial and enquiry.",
    alt: "The Ruchita Interiors website, captured from the live site at desktop width.",
    mobileAlt: "The Ruchita Interiors website, captured from the live site at mobile width.",
  },
];

/** The action on every project. One string, so the two can never disagree. */
export const WEB_WORK_ACTION = "Visit live site";

/**
 * The rail beneath the work, and the only place on this section where Mishram
 * speaks about the projects at all. Three structural words, in the same closing
 * grammar `ServiceStatement` ends on — not a claim about either site.
 */
export const WEB_WORK_BASELINE = ["Design", "Build", "Live"] as const;

/**
 * The provenance line, and it earns its place rather than decorating the rail.
 *
 * Every other piece of evidence on this site carries one — Recognition's
 * caption, the campaign band's source note, the proof band's attribution — and
 * this section had none, because for five revisions the narrow capture was a
 * 66px fragment nobody would ask about. Now that both views are real objects at
 * every width, the line says exactly what a reader is looking at and where it
 * came from, which is what turns two screenshots into documentation.
 *
 * **It states provenance and nothing else.** No date, no role, no tooling, no
 * claim about either site. It shares the closing rail with `WEB_WORK_BASELINE`,
 * so on desktop it costs no height at all.
 */
export const WEB_WORK_PROVENANCE =
  "Captured from the live sites — desktop and mobile.";

/* ── 03 / What We Build — the capability index ───────────────────
   THE BREADTH PROBLEM, and why this is not a list.

   This service covers more ground than any other on the site, and the obvious
   way to say so — every capability as its own card — would be thirty-odd boxes
   saying "we do this too". That reads as a directory, not as a studio.

   So the capabilities are grouped into **three families**, and the section
   argues that they are the *same* capability pointed at different problems: one
   procedural product architecture that transforms between them, rather than
   three unrelated illustrations. The list itself stays typographic — a matrix
   of names on hairlines, no icons, no containers, no pills.

   **Every name here is a category of work, not a claim about a project.** No
   count, no client, no framework, no platform vendor. */

export const WEB_BUILD_COPY: ServiceSectionCopy = {
  /**
   * No `03 /` prefix, deliberately, and it is the one place this section
   * departs from the brief it was written to. §10j settled it for the whole
   * service-page system: the chapter index belongs to the homepage's sequence,
   * and a service page's sections are not chapters of it — which is why
   * `ServiceSectionHead` draws a short teal rule where a number would go.
   * Numbering this one would also disagree with `Selected Digital Work`
   * directly above it.
   */
  label: "What We Build",
  headline: ["From a single page", "to an entire digital product."],
  accentWord: "entire",
  lead: "A focused landing page, a complete commerce experience, or the product a team runs the business on. We build around the requirement, not around a template.",
};

/** The rail under the head — the three families, before they are explained. */
export const WEB_BUILD_RAIL = ["Web", "Commerce", "Product"] as const;

/** One name in a family. Most carry nothing else. */
export type Capability = {
  name: string;
  /**
   * An optional three-step flow this row swaps into the composition's rail
   * while it is hovered or focused.
   *
   * **Deliberately set on a handful of rows, not all thirty-three.** A
   * sentence per capability would be thirty-three claims to keep honest and a
   * wall of text to read; these are generic shapes of a journey, and the
   * family's own flow is always on screen underneath, so nothing here is
   * content that only exists on hover.
   */
  flow?: readonly [string, string, string];
};

export type CapabilityFamily = {
  id: "websites" | "commerce" | "product";
  index: string;
  name: string;
  /** Three words under the index row. Structural, never a benefit. */
  meta: string;
  description: string;
  /** The family's own flow, always visible beneath the composition. */
  flow: readonly [string, string, string];
  capabilities: readonly Capability[];
};

export const WEB_BUILD_FAMILIES: readonly CapabilityFamily[] = [
  {
    id: "websites",
    index: "01",
    name: "Websites",
    meta: "Structure · Content · Identity",
    description:
      "Focused digital experiences for businesses, brands, campaigns and people.",
    flow: ["Structure", "Content", "Action"],
    capabilities: [
      { name: "Static Websites" },
      { name: "Dynamic Websites" },
      { name: "Business Websites" },
      { name: "Corporate Websites" },
      { name: "Portfolio Websites" },
      { name: "Personal Brand Sites" },
      /**
       * Added in Revision 40, and it is the one category this index was
       * missing rather than a new promise. Mishram's own business is
       * established Indian content creators (§1), `03 / Creators` is a whole
       * homepage chapter, and `Personal Brand Sites` beside it named the
       * outcome without naming the client. A creator arriving on this page had
       * to infer that Mishram builds for creators from a page that never said
       * so — on the site of a creator agency.
       */
      { name: "Creator Websites" },
      { name: "Agency Websites" },
      { name: "Landing Pages", flow: ["Attention", "Argument", "Action"] },
      { name: "Campaign Websites" },
      { name: "Blogs & Editorial", flow: ["Author", "Publish", "Read"] },
      { name: "NGO Websites" },
      { name: "Event Websites" },
    ],
  },
  {
    id: "commerce",
    index: "02",
    name: "Commerce + Service",
    meta: "Catalogue · Booking · Transaction",
    description:
      "Digital journeys built around products, appointments, bookings and transactions.",
    flow: ["Browse", "Select", "Checkout"],
    capabilities: [
      { name: "E-commerce Websites", flow: ["Product", "Cart", "Checkout"] },
      { name: "D2C Stores" },
      { name: "Product Catalogues" },
      { name: "Booking Platforms", flow: ["Discover", "Select", "Reserve"] },
      { name: "Appointment Systems", flow: ["Availability", "Book", "Confirm"] },
      { name: "Restaurants & Cafés" },
      { name: "Hotels & Hospitality" },
      { name: "Travel Websites" },
      { name: "Real Estate Websites" },
      { name: "Education & Courses" },
      { name: "Healthcare & Clinics" },
    ],
  },
  {
    id: "product",
    index: "03",
    name: "Digital Products",
    meta: "Users · Workflows · Logic",
    description:
      "Applications and platforms built around users, workflows and business logic.",
    flow: ["User", "Workspace", "Action"],
    capabilities: [
      { name: "SaaS Platforms" },
      { name: "AI Products" },
      { name: "Web Applications" },
      { name: "Marketplaces" },
      { name: "Directories" },
      { name: "Membership Platforms" },
      { name: "Customer Portals", flow: ["Account", "Records", "Requests"] },
      { name: "Admin Panels" },
      { name: "Dashboards", flow: ["Data", "View", "Decision"] },
      { name: "Custom CMS" },
    ],
  },
];

/**
 * THE HANDOFF, and it is the whole reason this section does not simply stop.
 *
 * The next chapter argues that not every business problem is another website.
 * So the last state's architecture is drawn with two connectors running off the
 * bottom of its own frame, and the section closes on where they go — four
 * terms on a descending rail, and **no heading, no copy and no CTA**, because
 * the section that answers them has not been built yet.
 */
export const WEB_BUILD_HANDOFF = {
  label: "Beyond the interface",
  terms: ["Customer", "Data", "CRM", "Workflow"],
} as const;

/* ── 04 / Beyond Websites — the business system ──────────────────
   THE PERCEPTION SHIFT, and it is the reason this section exists.

   Everything above it argues that Mishram builds websites well. This chapter
   has to leave the visitor understanding something different: that the website
   can be one entrance to a system Mishram also builds — the CRM, the internal
   tools, the automation, the portals and the applications behind it.

   **It cannot become a second capability list.** The breadth already has a
   home in §03; here the argument is made by an architecture that grows through
   four states, and the directory at the foot is an appendix to it rather than
   a services grid.

   ── CONTENT INTEGRITY ────────────────────────────────────────────────────
   **No client, no vendor, no data.** Not one company name — neither a client's
   nor a competing product's; the case for custom software is made on fit, not
   by naming what it replaces. No lead, no customer, no record, no revenue, no
   pipeline value, no conversion, no time saved, no headcount, and **no number
   anywhere in the architecture**. Every node is a category of thing, and the
   flow it draws is explicitly an illustration of a shape rather than a report
   from a project.

   **No overpromised automation.** `03 / Automate` says what can be automated
   depends on the process, because it does. Nothing here implies AI, and
   nothing implies a workflow arrives switched on. */

export const WEB_SYSTEM_COPY: ServiceSectionCopy = {
  label: "Beyond Websites",
  headline: ["Not every business problem", "needs another website."],
  accentWord: "another",
  lead: "Sometimes you need software built around the way your business actually works.",
};

/**
 * The bridge out of §03. That section's handoff rail ends on `Workflow`; this
 * is where the line it drew arrives, so the two chapters read as one descent.
 */
export const WEB_SYSTEM_ENTRY = {
  label: "Form submission",
  note: "The event a website captures is the event a system has to carry.",
} as const;

export const WEB_SYSTEM_INTRO =
  "From custom CRM systems and internal tools to customer portals, automation and mobile applications, we design and build the systems behind the customer experience.";

export type SystemStateCopy = {
  id: "capture" | "organise" | "automate" | "extend";
  index: string;
  name: string;
  /** The one-line idea, shown under the state's number. */
  lead: string;
  /** One short paragraph. Never two. */
  body: string;
  /** The nodes this state introduces — real text, not a property of the drawing. */
  terms: readonly string[];
  /** At most one per page. Only `organise` carries it. */
  callout?: { label: string; body: string };
};

export const WEB_SYSTEM_STATES: readonly SystemStateCopy[] = [
  {
    id: "capture",
    index: "01",
    name: "Capture",
    lead: "Bring enquiries, customers and activity into one system.",
    body: "A website form, a booking, a campaign response and a phone enquiry are the same event arriving four different ways. The first job of a system is to stop them living in four different places.",
    terms: ["Website", "Form", "Booking", "Campaign", "Customer record"],
  },
  {
    id: "organise",
    index: "02",
    name: "Organise",
    lead: "Turn scattered information into a workflow your team can actually use.",
    body: "Once every enquiry lands in one place it needs an owner, a stage and a next step — a pipeline shaped like the way your team already works rather than one they have to work around.",
    terms: ["CRM", "Pipeline", "Owner", "Status", "Customer database"],
    /**
     * CRM earns the one callout on this page because it is the capability most
     * often bought as a template and outgrown. The line argues for fit — it
     * does not name a product, and it does not claim custom is always right.
     */
    callout: {
      label: "Custom CRM",
      body: "Built around your pipeline, team and process — not forced into someone else's template.",
    },
  },
  {
    id: "automate",
    index: "03",
    name: "Automate",
    lead: "Connect actions, notifications and business processes without repeating the same work manually.",
    body: "A new record can assign itself, schedule the follow-up, move a status and send the confirmation. What can be automated depends on the process — this is automation built for one operation, not a switch that gets turned on.",
    terms: ["Trigger", "Workflow", "Action", "Notification", "Integrations"],
  },
  {
    id: "extend",
    index: "04",
    name: "Extend",
    lead: "Give your team and your customers the tools the workflow needs next.",
    body: "The same system can surface as an admin panel for your team, a portal for your customers, a web application, and an app on their phone. The website becomes one entrance to it rather than the whole of it.",
    terms: [
      "Admin panel",
      "Client portal",
      "Web application",
      "Mobile application",
    ],
  },
];

/** The pause between the architecture and its appendix. Two lines, nothing else. */
export const WEB_SYSTEM_STATEMENT = {
  lines: ["Your website can be the front door.", "We can build what happens behind it too."] as const,
  /** The serif italic, on the half that carries the claim. */
  accentWord: "behind it",
  support:
    "CRM, workflows, internal tools, customer portals, automation and applications — designed around your operation.",
} as const;

export type SystemDirectoryGroup = {
  id: string;
  index: string;
  name: string;
  items: readonly string[];
};

export const WEB_SYSTEM_DIRECTORY_LABEL = "Custom systems / on demand";

export const WEB_SYSTEM_DIRECTORY: readonly SystemDirectoryGroup[] = [
  {
    id: "customer",
    index: "01",
    name: "Customer + Sales",
    items: [
      "Custom CRM",
      "Lead Management",
      "Sales Pipeline",
      "Customer Database",
      "Booking Systems",
      "Customer Portals",
    ],
  },
  {
    id: "operations",
    index: "02",
    name: "Operations",
    items: [
      "Admin Panels",
      "Internal Tools",
      "Workflow Systems",
      "Inventory Management",
      "Order Management",
      "Custom CMS",
    ],
  },
  {
    id: "automation",
    index: "03",
    name: "Automation + Integration",
    items: [
      "Workflow Automation",
      "API Integrations",
      "Payment Integrations",
      "Notifications",
      "Third-party Integrations",
      "Process Automation",
    ],
  },
  {
    id: "applications",
    index: "04",
    name: "Applications",
    items: [
      "Web Applications",
      "SaaS Platforms",
      "Client Portals",
      "Progressive Web Apps",
      "iOS Applications",
      "Android Applications",
      "Custom Software",
    ],
  },
];

/**
 * THE HANDOFF, and the same restraint §03's ends on.
 *
 * The architecture reaches the customer, and the last routes leave the frame
 * toward what the next chapter argues — that Mishram designs the traffic, the
 * experience and the conversion as well as the system underneath. **No
 * heading, no copy, no CTA**: it names five destinations and stops.
 *
 * **These five terms are now load-bearing.** §05 opens on exactly this list and
 * turns it into a drawn route, so the rail below is the section boundary's
 * setup line and `WEB_WHY_STAGES` is its answer. Renaming a term here without
 * renaming it there breaks a deliberate callback across a chapter break — the
 * two lists are one idea stated twice, quietly and then properly.
 */
export const WEB_SYSTEM_HANDOFF = {
  label: "And what it is all for",
  terms: ["Traffic", "Experience", "Conversion", "System", "Growth"],
} as const;

/* ── 05 / Why Mishram — the connected journey ────────────────────
   THE POSITIONING CHAPTER, and the only one on this route that is not about
   what Mishram builds.

   Everything above argues capability: two live sites, thirty things we build,
   an architecture behind them. This answers the question all of that leaves
   open — **why take a build to Mishram rather than to a development studio.**

   The answer is not technology, and the copy never claims it is. It is that
   the same company already works on the four stages either side of the
   website: the content and creators that earn attention, the campaigns that
   bring people in, the action the experience is designed for, and the system
   the relationship continues inside.

   ── CONTENT INTEGRITY, and this section is the easiest one to break it on ──

   A positioning chapter is where invented proof normally arrives. **There is
   none here.** No conversion rate, no traffic figure, no client count, no
   project count, no revenue, no years in business, no award, no testimonial
   and no ranking — none of that is recorded anywhere in this project, and §1
   rules it out even where it might be true but unverified.

   **No competitor is attacked.** The section makes its case by drawing scope,
   not by claiming anyone else lacks it: `A typical web project` describes a
   *brief*, not an agency, and it is the neutral fact the whole argument rests
   on. Nothing here says other people do not understand business.

   **Every capability named is one Mishram already sells** — the five practice
   terms are `config/services.ts` restated, and the three cross-links are
   derived from the public registry rather than written down again. */

/**
 * **No `lead`, and it is the only head on this route without one.** The lead
 * slot would have said "the same team works on what brings someone to the
 * experience and on what happens after they arrive" — which is the first
 * paragraph of `WEB_WHY_INTRO` with the specifics removed. The section is
 * stronger with the paragraphs promoted beside the headline than with a
 * summary of them above and the real copy below.
 *
 * **The line break falls after `Development.`, not after `Growth.`** The three
 * words together are 28 characters and need ~690px at the display size, which
 * is more than the six columns this headline sits in — so `Growth.` opens the
 * second line and the phrase stays two lines at every width from 1024 up
 * instead of breaking to three.
 */
export const WEB_WHY_COPY: ServiceSectionCopy = {
  /** No `05 /` prefix — §10j, the same rule the three sections above follow. */
  label: "Why Mishram",
  headline: ["Design. Development.", "Growth. Under one roof."],
  accentWord: "one roof",
};

/**
 * The bridge out of §04, and the mirror of `WEB_SYSTEM_ENTRY`.
 *
 * §04 closes on `Traffic → Experience → Conversion → System → Growth` under
 * `And what it is all for` — five words on a rail, subdued, with nothing said
 * about them. This is where they arrive, so the reprise reads as a chapter
 * resolving rather than a list repeated.
 */
export const WEB_WHY_ENTRY = {
  label: "The whole route",
  /**
   * One line, and it has to be one line. §04's own bridge note is the same
   * length for the same reason: this is an annotation on a hairline, not the
   * section's opening paragraph, and a third line here costs more on a phone
   * than it adds anywhere.
   */
  note: "Five stages. A website is one of them.",
} as const;

/**
 * Two paragraphs, and the section's whole argument is in the second one.
 *
 * Deliberately short. §03 and §04 are the long chapters on this route; this one
 * exists to give the page air, and the drawing below carries most of the
 * meaning — the copy only has to make the drawing legible.
 */
export const WEB_WHY_INTRO = [
  "A website should not be designed in isolation from the business around it.",
  "Mishram already works across content, creators, influencer campaigns and paid acquisition — and builds the CRM and workflows behind them. So the experience is designed knowing where its traffic comes from and where its enquiries go.",
] as const;

/** One stage of the route. Two or three terms, and never a sentence. */
export type WhyStage = {
  id: string;
  name: string;
  /**
   * What Mishram actually does at this stage. Capabilities, never outcomes —
   * `Measure` is a practice, `Improved conversion` would be a promise.
   */
  terms: readonly string[];
};

/**
 * **The five names are `WEB_SYSTEM_HANDOFF.terms`, exactly.** That is the
 * callback the chapter break is built on, and the reason this is `Traffic`
 * rather than the `Attention` the brief also offered: the page has already
 * said the word, one section earlier, in display type.
 */
export const WEB_WHY_STAGES: readonly WhyStage[] = [
  { id: "traffic", name: "Traffic", terms: ["Content", "Creators", "Campaigns"] },
  { id: "experience", name: "Experience", terms: ["Website", "Commerce", "Product"] },
  { id: "conversion", name: "Conversion", terms: ["Enquiry", "Booking", "Purchase"] },
  { id: "system", name: "System", terms: ["CRM", "Automation", "Workflow"] },
  { id: "growth", name: "Growth", terms: ["Measure", "Learn", "Improve"] },
];

/**
 * THE DIFFERENTIATION MOMENT — two spans over one route, and the entire
 * argument of the section is the difference between their widths.
 *
 * `typical` describes **a brief**, not a competitor: most web projects are
 * commissioned to build an experience and the action inside it, which is a
 * true and unremarkable statement about scope. `full` is what Mishram works
 * across. Neither label mentions anybody else, and neither claims a result.
 *
 * `from`/`to` are indices into `WEB_WHY_STAGES`, so the drawing cannot drift
 * out of step with the list it annotates.
 */
export const WEB_WHY_SPANS = {
  full: { label: "Where Mishram works", from: 0, to: 4 },
  /**
   * `Typical web project`, not `A typical web project`. On the narrow layout
   * this label shares a line with the stage name it brackets, and at 330px the
   * article was the two characters that pushed it into `Experience`. An
   * annotation on a drawing drops the article anyway.
   */
  typical: { label: "Typical web project", from: 1, to: 2 },
} as const;

/**
 * The closing strip. The five practices behind the route — `config/services.ts`
 * said the same thing on the homepage — and the label that ties them to it.
 *
 * **Not a second journey.** These are Mishram's disciplines, not the visitor's
 * five stages, which is exactly why the terms differ from `WEB_WHY_STAGES`.
 */
export const WEB_WHY_PRACTICE = {
  label: "Built for the whole journey",
  terms: ["Content", "Media", "Performance", "Web", "Systems"],
} as const;

/**
 * The cross-links back into the parent brand, and the reason this section is
 * where the Web Development page stops being a technical side-service.
 *
 * **The list itself is derived, not written here.** The component reads
 * `PUBLIC_SERVICE_PAGES` and drops this page's own slug, so the rail can never
 * name a route that does not exist, never link to a hidden service, and never
 * need editing when the registry changes. Anchor text is each service's real
 * title — useful to a reader, and correct for search without one keyword
 * written for it.
 */
export const WEB_WHY_EXPLORE_LABEL = "Also explore";

/* ── 06 / How We Build — one process, one stack argument ─────────
   THE LAST INFORMATIONAL CHAPTER, and it closes the page's argument.

   §01–§03 answer *what* Mishram can build. §04 widens it to the system behind
   the interface. §05 answers *why here*. This answers the only question left:
   **what is it actually like to build something with Mishram** — and then the
   page has nothing else to say and hands over to the form.

   ── IT IS ONE CHAPTER BECAUSE FOUR WOULD HAVE BEEN FOUR ─────────────────

   The approved flow carried a development process, a responsive
   demonstration, a technology philosophy and a capability index as separate
   chapters. §10z collapsed them into this one. The route already measured
   15,353px on a phone with five sections; four more would have been a page
   nobody reaches the end of. So: **six stages, one technical statement, one
   capability index, and no FAQ, pricing, stack chapter or second CTA.**

   The responsive demonstration survives as one detail — three breakpoint
   ticks under the `Test` artifact — which is all it was ever going to prove.

   ── CONTENT INTEGRITY ────────────────────────────────────────────────────

   **No performance or quality claim that cannot be stood behind.** No uptime
   figure, no Lighthouse score, no "enterprise-grade", no "military-grade",
   no "infinitely scalable", no guaranteed ranking and no promised conversion
   lift. `Test` says what is checked, not what is achieved — the same line §1
   draws between a design intent and a result.

   **No framework is named anywhere**, and that is a positioning decision, not
   an omission: §10 already settled that a capability index is a promise, so it
   lists what the business sells — frontend, backend, CMS, database, payments,
   integrations — and never a vendor, a version or a logo. The visitor is
   buying a product, not a dependency list. */

export const WEB_HOW_COPY: ServiceSectionCopy = {
  /** No `06 /` prefix — §10j, like every other section on this route. */
  label: "How We Build",
  headline: ["From idea to launch,", "without the handoffs."],
  /**
   * **No `accentWord`, deliberately.** Five sections on this page already
   * carry one — `rely`, `different`, `entire`, `another`, `one roof` — and
   * §10i's finding was that consecutive accented headlines stop reading as
   * emphasis and start reading as a template. The last chapter settling down
   * into plain display type is the correct end to that sequence.
   */
  lead: "Six stages, and at every one of them you know what is being decided and what happens next.",
};

/** One stage of the build. A name, a line, and never a paragraph. */
export type BuildStep = {
  id: string;
  index: string;
  name: string;
  /**
   * **One sentence, and it is written to a width.** At 390px the stage rail
   * leaves ~52 characters on a line, so every one of these is ≤49 — six
   * stages that each wrap to two lines cost 126px on a page that has none to
   * spare. Refined from the approved copy to fit, not truncated: each still
   * names what the stage actually decides.
   */
  detail: string;
};

export const WEB_HOW_STEPS: readonly BuildStep[] = [
  {
    id: "discover",
    index: "01",
    name: "Discover",
    detail: "Understand the business, audience and objective.",
  },
  {
    id: "architect",
    index: "02",
    name: "Architect",
    detail: "Define the pages, journeys and functionality.",
  },
  {
    id: "design",
    index: "03",
    name: "Design",
    detail: "Interface, interaction and responsive behaviour.",
  },
  {
    id: "build",
    index: "04",
    name: "Build",
    detail: "Develop frontend, backend, CMS and integrations.",
  },
  {
    id: "test",
    index: "05",
    name: "Test",
    detail: "Check function, performance and accessibility.",
  },
  {
    id: "launch",
    index: "06",
    name: "Launch",
    detail: "Deploy, connect production systems, verify live.",
  },
];

/**
 * THE TECHNICAL STATEMENT, and the reason there is no technology chapter.
 *
 * It is one line and one supporting sentence. A page that has spent four
 * chapters describing what gets built does not then need a chapter about the
 * tools — it needs one sentence saying the tools are chosen second.
 *
 * There is **no separate caps label above it**: an eyebrow reading
 * `THE STACK FOLLOWS THE PRODUCT` above a line reading *The stack follows the
 * product* is the same six words twice.
 */
export const WEB_HOW_STACK = {
  statement: "The stack follows the product — not the other way around.",
  support:
    "We choose the architecture around what has to be built and how it may need to grow.",
} as const;

export type CapabilityGroup = {
  id: string;
  name: string;
  items: readonly string[];
};

/**
 * The capability index. **Categories of work, never products** — every term
 * here is something Mishram sells, and not one of them is a framework, a
 * vendor, a hosting provider or a version number.
 */
export const WEB_HOW_CAPABILITIES: readonly CapabilityGroup[] = [
  {
    id: "product",
    name: "Product",
    items: ["Frontend", "Backend", "CMS", "Mobile"],
  },
  {
    id: "system",
    name: "System",
    items: ["Database", "Authentication", "APIs", "Automation"],
  },
  {
    id: "commerce",
    name: "Commerce & Delivery",
    items: ["Payments", "E-commerce", "Analytics", "Cloud Deployment"],
  },
];

/* ── The shared inquiry section ──────────────────────────────────── */

export const WEB_INQUIRY = {
  note: "Web & Digital Experiences",
  context:
    "Tell us what you are trying to launch, improve or automate — a page, a store, a platform or the system behind it. We will come back with how we would approach building it, and what it would actually take.",
} as const;
