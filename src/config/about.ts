/**
 * ABOUT — the agency chapter, and the page's last substantial storytelling
 * before the footer.
 *
 * EVERY CLAIM HERE IS TRACEABLE. Sources:
 *
 * - Positioning and the capability list: §1 of the brief ("creative growth and
 *   digital agency working with businesses, brands and established Indian
 *   content creators").
 * - `emphasis` is **verbatim from Mishram's own schema.org markup** on the old
 *   site's `about.html`: "Founded to help brands grow through ideas and
 *   measurable impact". Used as written rather than paraphrased into something
 *   less accurate.
 * - The discipline captions come from the same markup's per-service
 *   descriptions: Meta and Google Ads; creative reels, video ads and product
 *   photography; influencer discovery and collaboration management; portfolio
 *   sites, e-commerce and product platforms.
 * - `locator` is `BRAND.locator`, already approved in `config/site.ts`.
 * - `HISTORY` is **verbatim-traceable to Mishram's own about page** — see the
 *   source note on that constant below.
 *
 * DELIBERATELY ABSENT:
 *
 * - **No metrics.** No client count, no reach, no creator count, no
 *   years-in-business figure. §1 forbids unverified figures, and the page
 *   already earns credibility through §01 Collaborations, §03 Creators, §05
 *   Selected Work and now §06 Recognition. **The three dated milestones in
 *   `HISTORY` are not metrics** — they are documented events, each traceable
 *   to one sentence Mishram published about itself.
 * - **No team members.** The old about page does list four role titles (Founder
 *   & CMO, Chief Client Officer, Influencer Marketing Manager, CFO), but every
 *   headshot is a remote Cloudinary file with a placeholder-looking filename,
 *   and staff change. A team block is also explicitly out of scope for this
 *   chapter. Available if the client later supplies confirmed names and photos.
 * - **No specific city.** The old site is internally inconsistent — its schema
 *   says New Delhi / Nainital / Bareilly while the visible page lists a US
 *   Nagar head office with Bareilly and Delhi branches. `INDIA` is the one
 *   locator that is certainly right, and the contact panel owns the details.
 */

export const ABOUT_COPY = {
  label: "About",
  /** Bookends the hero's "We turn attention into growth." on purpose. */
  headline: ["Creative thinking,", "built for growth."],
  /** Rendered in the serif italic accent, matching the sections above. */
  accentWord: "growth.",
  body: [
    "Mishram Media is a creative growth and digital agency. We work with businesses, brands and established Indian creators — across social, influencer marketing, performance, brand shoots and the digital experiences that hold it all together.",
    "We keep those disciplines together because growth doesn't happen in isolated channels. A campaign needs creative worth watching, creators with real audiences, media that reaches the right people, and a destination built to convert. Split across separate suppliers, the handoffs are where results get lost.",
  ],
  /** Verbatim from Mishram's own schema.org description. */
  emphasis: "Founded to help brands grow through ideas and measurable impact.",
  locator: "India",
  /** The closing conversion moment. */
  closing: ["Let's build something", "worth paying attention to."],
  /**
   * The bridge into the Project Inquiry form, **not a second booking ask.**
   *
   * This used to be `Book a 15-Min Call` + `Contact Us` as a two-button row —
   * the same primary ask the Hero already makes, now competing with the form
   * directly below it. It is a text action pointing at `#project-inquiry`, and
   * it deliberately says the next section's own headline, so the link names its
   * destination. See §10h of the brief; do not turn it back into a button row.
   */
  primaryCta: "Tell us what you're building",
  primaryCtaHref: "#project-inquiry",
  /** Understated. Opens the existing global contact panel. */
  secondaryCta: "Contact Us",
  /**
   * The route into the long form. **A text action, not a third button** — this
   * chapter already carries two, and the dedicated page is somewhere to read
   * rather than a second conversion. It sits with the history band, which is
   * the part of the chapter `/about` most obviously expands.
   */
  storyCta: "Read our story",
} as const;

/**
 * The connecting idea: the hero's `CREATIVE × PERFORMANCE × TECHNOLOGY` with
 * the creator dimension the site has spent five chapters demonstrating. Each
 * caption is drawn from the old site's own service descriptions, so none of
 * this is invented positioning.
 */
export const DISCIPLINES = [
  { name: "Creative", note: "Content, reels and brand shoots" },
  { name: "Performance", note: "Meta and Google Ads" },
  { name: "Creators", note: "Discovery, collaboration and campaigns" },
  { name: "Technology", note: "Websites, stores and product platforms" },
] as const;

/**
 * THREE DATED MOMENTS — a baseline under the chapter, not a timeline section.
 *
 * SOURCE, and it is a single sentence rather than four scattered claims. The
 * old site's `about.html` reads, word for word:
 *
 *   "Our journey began in 2021 under the name Starcrown Media, with a focused
 *    mission on influencer marketing. As client demands expanded, so did our
 *    capabilities. By 2023, we were offering services like paid ads, content
 *    creation, and web development. In 2025, we rebranded to Mishram.Media to
 *    better reflect our broader vision and impact."
 *
 * Verified identical in three places — the live page, `_backup_pre_seo/
 * about.html`, and the site's own `llms-full.txt` — with no contradicting
 * version anywhere. Same provenance class as `emphasis` above, which is
 * verbatim from the same document's schema.org description.
 *
 * **THIS SUPERSEDES THE EARLIER "no founding date" RULE.** That instruction
 * was written when the project believed no history evidence existed; the
 * 25 August 2026 content-migration audit found it. See
 * `docs/CONTENT-MIGRATION-AUDIT.md` §6.
 *
 * WHAT IS NOT SAID, and must not creep in:
 *
 * - No growth claim, no client or headcount figure, no revenue, no "since
 *   2021 we have…". These are three events, not a trajectory.
 * - The rebrand line does not import the source's "broader vision and impact",
 *   which is marketing language §1 rules out. It states the fact underneath.
 * - **No non-profit milestone.** The same page names a non-profit arm
 *   ("Starcrownmedia Zone Foundation"); it is held pending a client decision
 *   and is deliberately absent here.
 * - Nothing is claimed about what happened between the dates.
 *
 * This is also the honest support for §10a's **Creator-Native** differentiator:
 * the agency did not add creators to a marketing practice, it started as one.
 */
export const HISTORY = [
  {
    year: "2021",
    name: "Starcrown Media",
    detail: "Founded as an influencer marketing practice.",
  },
  {
    year: "2023",
    name: "New disciplines",
    detail: "Paid media, content production and web development joined it.",
  },
  {
    year: "2025",
    name: "Mishram.Media",
    detail: "Rebranded to reflect the wider practice.",
  },
] as const;
