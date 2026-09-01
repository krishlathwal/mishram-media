/**
 * THE DEDICATED ABOUT PAGE — `/about`.
 *
 * The long form of the homepage's About chapter (§10f), not a second copy of
 * it. The homepage answers *who is this*; this route answers *where did it come
 * from, how does it think, and what has it actually done.*
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVERY CLAIM ON THIS PAGE IS TRACEABLE. The sources, in full:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * - **The chronology** is verbatim-traceable to Mishram's own `about.html`,
 *   identical in `_backup_pre_seo/about.html` and in the old site's
 *   `llms-full.txt`. The same sentence `config/about.ts` cites for `HISTORY`.
 * - **`emphasis`** is verbatim from Mishram's own schema.org `description`.
 * - **The disciplines and their captions** come from the same markup's
 *   per-service descriptions, already approved in `config/about.ts`.
 * - **The service index** is derived from `config/services.ts` — the same five
 *   the homepage states — with links derived from the `built` registry.
 * - **The recognition** is the single verified item in `config/recognition.ts`.
 * - **The collaborations** are the five approved names in
 *   `config/collaborations.ts`, unchanged.
 * - **The creator portraits** are the five approved local assets.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * WHAT THIS PAGE DELIBERATELY DOES NOT SAY — read before adding a sentence
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * - **NO TEAM, AND NO FOUNDER.** The old site names four people in its visible
 *   markup and in a schema.org `employee` array, and the content-migration
 *   audit classified all four **B — needs current confirmation**: staff change,
 *   and every headshot is a numbered placeholder GIF. Publishing a historical
 *   employment record as a current one is exactly the class of claim §1
 *   forbids. **No team grid, no founder biography, no name.** The founder is
 *   the strongest-evidenced of the four and is still not named here.
 * - **NO CITY, NO OFFICE, NO ADDRESS.** The old site contradicts itself —
 *   its schema says New Delhi / Nainital / Bareilly while the visible page
 *   lists a US Nagar head office with Bareilly and Delhi branches. `INDIA` is
 *   the one locator nothing contradicts, and the contact panel owns the rest.
 * - **NO SCALE CLAIMS.** No client count, creator count, campaign count,
 *   headcount, years-in-business, reach, revenue or "1000+ influencers" — the
 *   last is on the old homepage and is unverified.
 * - **NO INDUSTRY-FIRST CLAIM.** The creator-origin chapter says *creators
 *   were where we started*, which the chronology supports. It does **not** say
 *   "creator-native before it was a category", which would be a claim about
 *   the industry rather than about Mishram.
 * - **NO NON-PROFIT STORY.** The old about page names a non-profit arm; it is
 *   held pending a client decision (audit §17).
 * - **NO INFLUENCER GEOGRAPHY.** India / Philippines / Bangladesh / Nepal /
 *   Morocco is evidenced but unconfirmed, and is held for the same reason.
 * - **NO AWARD EMBELLISHMENT.** `NUFEW` is never expanded, nobody in the
 *   photograph is named, and no rank, scale or jurisdiction is claimed
 *   (§10p, §10q).
 * - **NO EXCLUDED BRAND**, in any state — §9 holds absolutely.
 */

export const ABOUT_PAGE_COPY = {
  /** What the shared route transition writes. Read by `config/routes.ts`. */
  routeMarker: "About",

  meta: {
    title: "About",
    description:
      "Mishram Media began in creator marketing and grew into a multidisciplinary practice across content, performance, technology and digital experiences.",
  },

  hero: {
    /**
     * An archive label rather than a breadcrumb. A breadcrumb implies a parent
     * route, and About is top level — the service pages' `SERVICES / …` crumb
     * exists because `02 / What We Do` is genuinely its parent.
     */
    eyebrow: ["About", "Mishram Media"],
    headline: ["Built around attention,", "ideas and what comes next."],
    accentWord: "next.",
    lead: "Mishram Media brings creators, content, performance and technology together to help brands and people build attention into something more useful.",
    /** Names the composition beside it, so five fragments read as an archive. */
    boardLabel: "The Mishram archive",
    /** Rendered on the page: five chapters, not one campaign. */
    boardNote:
      "Fragments from different chapters of the practice — a creator, a format, a recognition, a beginning, a build. Not one project.",
  },

  /**
   * ORIGIN + CREATOR-NATIVE, merged into one chapter.
   *
   * The brief's own guidance: the two belong together, because the second is
   * the *consequence* of the first. Told separately, the chronology becomes
   * trivia and the creator argument loses its evidence.
   */
  origin: {
    label: "Origin",
    headline: ["We started", "with creators."],
    accentWord: "creators.",
    lead: "Mishram did not add influencer marketing to an existing agency. It began there, and everything since has been built outward from that.",
    /** Verbatim from Mishram's own schema.org description. */
    emphasis: "Founded to help brands grow through ideas and measurable impact.",
    /**
     * The same three moments the homepage carries, given room here: a large
     * year, a milestone, and the sentence the homepage has no space for.
     * **No fourth moment without evidence of the same quality.**
     */
    chapters: [
      {
        year: "2021",
        name: "Starcrown Media",
        summary: "Founded as an influencer marketing practice.",
        detail:
          "The work was creator work from the start — finding the right people, shaping what they made, and getting it in front of an audience that already trusted them.",
      },
      {
        year: "2023",
        name: "New disciplines",
        summary:
          "Paid media, content production and web development joined it.",
        detail:
          "Briefs stopped ending at the post. Campaigns needed media behind them, content made to a standard, and somewhere for the interest to land — so those became part of the practice rather than someone else's problem.",
      },
      {
        year: "2025",
        name: "Mishram.Media",
        summary: "Rebranded to reflect the wider practice.",
        detail:
          "The name changed because the description had. What began as an influencer practice was by then working across creative, performance and technology.",
      },
    ],
    /** The point of the chronology — it has to land somewhere. */
    consequence: {
      headline: ["What starting there", "taught us."],
      accentWord: "taught us.",
      points: [
        {
          name: "Attention is earned, not bought",
          note: "Creator work makes that unavoidable. A post that nobody chooses to watch has not reached anyone, whatever it cost to place.",
        },
        {
          name: "Platforms have cultures",
          note: "Formats, pacing and tone are not interchangeable across them, and a campaign that ignores that reads as an advert wherever it lands.",
        },
        {
          name: "Collaboration beats direction",
          note: "The people who built an audience understand it better than a brief does. The work is stronger when it is made with them.",
        },
      ],
    },
    creatorsLabel: "From the creator network",
    creatorsNote:
      "Creators Mishram Media has worked with. No campaign, result or endorsement is implied.",
    creatorsCta: "Explore our creator network",
    /**
     * A real destination — §03 exists. Held in config like the service pages'
     * `actionHref`, and rendered as a plain `<a>`: §10g's rule is that only a
     * real navigation re-runs `useHashLanding`, which corrects the landing
     * after the homepage's hydration changes its height.
     */
    creatorsCtaHref: "/#creators",
  },

  disciplines: {
    label: "Disciplines",
    headline: ["Different disciplines.", "One way of thinking."],
    accentWord: "thinking.",
    lead: "Four practices that most companies buy separately. Holding them together is what shapes how Mishram works — not a list of departments.",
    /**
     * Deliberately **not** the homepage's `DisciplineSystem`, which states
     * what each discipline delivers. These say what each one does to the way
     * the company works, which is the question a company profile answers.
     */
    items: [
      {
        name: "Creative",
        note: "Content, reels and campaign production",
        shapes:
          "Everything starts as something someone has to want to watch. That standard sets the bar for the rest.",
      },
      {
        name: "Performance",
        note: "Meta and Google Ads",
        shapes:
          "Distribution is planned while the work is being made, so the creative and the media are never designed by different people to different briefs.",
      },
      {
        name: "Creators",
        note: "Discovery, collaboration and campaigns",
        shapes:
          "The oldest discipline here, and the one that keeps the others close to how people actually behave online.",
      },
      {
        name: "Technology",
        note: "Websites, platforms and custom systems",
        shapes:
          "Interest has to arrive somewhere, and then somebody has to act on it. Building both means the campaign, the destination and the system behind it can be designed as one thing.",
      },
    ],
    convergence: "Mishram",
  },

  practice: {
    label: "The practice",
    headline: ["What we do", "today."],
    accentWord: "today.",
    lead: "Four practices, each described in full on its own page.",
    /**
     * **Registry-driven.** The index renders `PUBLIC_SERVICES` from
     * `config/services.ts`, and the action comes from `servicePageHrefFor`,
     * which returns a path only for a route that is built *and* public. All
     * four public services now resolve to a page; a service that is hidden or
     * unbuilt renders no row rather than a dead one — the same rule the
     * homepage and the footer follow.
     */
    action: "Explore service",
  },

  principles: {
    label: "How we think",
    headline: ["Four things", "we hold to."],
    accentWord: "hold to.",
    lead: "Not values. The four positions that decide how a piece of work gets made here.",
    items: [
      {
        name: "Culture before format",
        note: "Understand where attention already lives, then decide what to make for it. The format is a consequence, not a starting point.",
      },
      {
        name: "Creative and distribution together",
        note: "The idea and how it reaches people are one decision. Split across two teams, the work arrives weaker than it was written.",
      },
      {
        name: "Build the destination",
        note: "Attention needs somewhere useful to arrive. A campaign that lands on a page nobody thought about has spent its own momentum.",
      },
      {
        name: "Learn, then make again",
        note: "What happened last should decide what gets made next. That is the only part of this that compounds.",
      },
    ],
  },

  /**
   * RECOGNITION + CONNECTIONS, merged into one credibility chapter.
   *
   * Both are short, both are evidence, and neither is the subject of the page.
   * A separate chapter for each would give a one-item award and a five-logo
   * rail more weight than the story they support.
   */
  credibility: {
    label: "On the record",
    headline: ["Some of it", "is on paper."],
    accentWord: "on paper.",
    lead: "A recognition, and a few of the brands the work has run alongside.",
    recognitionLabel: "Recognition",
    /** Nothing here beyond what the photograph itself supports (§10p). */
    recognitionNote:
      "Received by Mishram Media. The award's own wording is what is shown — nothing about it is inferred.",
    connectionsLabel: "Selected connections",
    /**
     * Says exactly what the homepage rail says and no more. **Do not upgrade
     * this to "clients", "partners" or "trusted by"** — the old site's own
     * wording was "Worked with brands".
     *
     * The index renders `FEATURED_COLLABORATIONS`, not the whole roster.
     * Revision 16 took the roster from five names to eighteen, and eighteen
     * rows here would turn a supporting beat inside the company's story into
     * the longest block on the page. "A few of the brands" is what the lead
     * above already promises.
     */
    connectionsNote:
      "A selection of the brands Mishram Media has worked with. Shown as a record, not as an endorsement.",
  },

  now: {
    label: "Now",
    headline: ["Still evolving.", "Still building."],
    accentWord: "building.",
    body: [
      "Mishram Media works across creator-led brand building, campaigns, performance, content and the digital experiences that hold them together. The mix has changed every couple of years since 2021, and the expectation is that it keeps changing.",
      "Technology is becoming a larger part of the practice — from websites and conversion experiences to custom business systems and the tools a business runs on. It is the same argument as the rest of the page: the work is stronger when the thing that attracts attention and the thing that receives it are built by the same people.",
    ],
    locatorLabel: "Where we work",
    /** `BRAND.locator`. The one locator no source contradicts. */
    closing: ["Let's build something", "worth paying attention to."],
    primaryCta: "Tell us what you're building",
    primaryCtaHref: "#project-inquiry",
    secondaryCta: "Contact Us",
  },

  inquiry: {
    /** Sits beside the section label. **No service is preselected on About.** */
    note: "General enquiry",
    context:
      "Tell us what you're working on and we'll come back with the most useful next step — whether that is creators, campaigns, content or a build.",
  },
} as const;

/**
 * THE PERSON — one named human inside the `now` chapter, added Revision 37.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * THIS IS A NAME AND A PHOTOGRAPH. IT IS NOT A TITLE, AND THE DIFFERENCE
 * COST A DELIBERATE DECISION RATHER THAN AN OVERSIGHT.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * **IDENTITY — established.** `F:\Drive data\WEBSITE SHORTLIST\
 * Prashant Mishra.jpeg` is a client-supplied file the client named after him.
 * That is the same evidence class Ali Fazal, Akash Sagar and Lovekesh Kataria
 * are published on. **No face was compared, matched or recognised** (§18
 * rule 7), and the photograph is a single figure, so no crop asserts which
 * person in a frame he is.
 *
 * **ROLE — NOT PUBLISHED, and the evidence was searched before deciding.**
 * Every first-party source the project holds was checked:
 *
 * | Source | Says |
 * | --- | --- |
 * | Old site `about.html:1347` (visible team block) | Founder & Chief Marketing Officer |
 * | Old site `about.html:101-104` (schema.org `employee`) | the same |
 * | The old site's own `llms.txt` | the same |
 * | `@filmybande` — Mishram's **current** public Instagram | display name "Prashant mishra", bio "Talent Management" |
 * | `SOCIAL_URLS.linkedin`, supplied by the client in Revision 16 | `…/in/prashant-mishra-mishram-media` |
 * | The first-party proposal deck, all nine pages | **no role for anyone** |
 * | This project's own configs | record the title only as *evidence for the management chain* |
 *
 * So the title is **first-party and historical**, and the content-migration
 * audit classified it **B — needs current confirmation**, noting that
 * *"'Founder' and 'CMO' are separate claims and only the first is
 * corroborated."* §10r then locked **"NO TEAM AND NO FOUNDER"** on the
 * ground that publishing a historical employment record as a current one is
 * exactly what §1 forbids.
 *
 * **Nothing found in Revision 37 changes that**, so nothing here reverses it.
 * The two current sources — the Instagram account and the LinkedIn slug the
 * client supplied — corroborate that he is the person Mishram's public
 * channels run through. **Neither states a title.** So the site publishes the
 * name, a neutral entity line, and a real link, and leaves the title to the
 * one sentence from the client that would settle it.
 *
 * **Do not add "Founder", "CEO", "Managing Director", "Creative Director" or
 * "Owner" here on the grounds that it sounds natural.** It is a one-line
 * unblock, in the same shape as the Shadab Jakati flag and the NUFEW / NUFW
 * discrepancy: `role: "…"` below, and the component renders it.
 *
 * **NO BIOGRAPHY EITHER.** No years of experience, no education, no
 * achievements, no "visionary founder", no brand count. The project holds no
 * first-party source for any of it, and a portrait plus a name plus a
 * verifiable link already answers the only question this block exists to
 * answer.
 *
 * **NO TEAM GRID.** Three further names sit in the old site's `employee`
 * array — Upendra Singh, Subhash Kumar, Abhishek Gautam — all classified
 * **B**, none corroborated anywhere, and every headshot a numbered
 * placeholder GIF. One evidenced person does not make a team section, and a
 * team section with one filled slot is worse than none.
 *
 * **The href is not written here.** It comes from `SOCIAL_URLS.linkedin` in
 * `config/site.ts`, which is where the client's supplied URL already lives —
 * one URL, one place, and the outbound click reuses the existing
 * `social_outbound` event rather than inventing a second vocabulary.
 */
export const ABOUT_PERSON = {
  name: "Prashant Mishra",
  /**
   * Deliberately the entity, not a title. Evidence-safe: it says he is of
   * Mishram Media, which the client's own LinkedIn slug and public Instagram
   * both establish, and claims nothing about what he does there.
   */
  context: "Mishram Media",
  /**
   * **Absent on purpose — see the block above.** Set this only when the client
   * confirms the current title; the component renders it under the name with
   * no other change.
   */
  role: undefined as string | undefined,
  image: "/media/about/prashant-mishra.webp",
  /**
   * Describes the photograph and **states no role** (§26). "Prashant Mishra,
   * founder of Mishram Media" would encode in alt text exactly the claim the
   * visible copy is withholding.
   */
  alt: "Prashant Mishra, photographed seated on a styled interior set.",
  linkLabel: "LinkedIn",
  /**
   * DEVELOPMENT METADATA — never rendered.
   */
  source:
    "F:\\Drive data\\WEBSITE SHORTLIST\\Prashant Mishra.jpeg — client-supplied " +
    "and client-named, 8064×6048 stored with EXIF orientation 6, so 6048×8064 " +
    "upright. Reserved for this phase by the Revision 28 media ledger and not " +
    "spent since. PRODUCTION: .rotate() FIRST, then " +
    "extract{left 1616, top 2200, 2600×3467} → 3:4 → 900×1200 WebP q80. " +
    "**PURE CROP AND DOWNSCALE** — nothing retouched, recoloured, enhanced, " +
    "relit, background-replaced or generated. The sunglasses and the set are " +
    "in the photograph. " +
    "CROP CHOSEN BY LOOKING: a full-length environmental 4:5 was rendered " +
    "first and the styled set dominated the figure; 3:4 head-to-lap makes the " +
    "person the subject and the set context, and 3:4 is the aspect §10b " +
    "already established as this site's portrait crop. " +
    "The seven stills in `Prashant - data/PRASHANT SIR - PICTURES/` were all " +
    "inventoried and are **IDENTITY UNKNOWN** under §18 rule 7 — a folder " +
    "names whose collection it is, not who is in the frame — so none was used " +
    "and none may be.",
} as const;
