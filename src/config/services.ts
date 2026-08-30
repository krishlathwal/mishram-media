/**
 * 02 / WHAT WE DO
 *
 * The service states share one sticky stage. Track height, progress fill and
 * per-service slot mapping all derive from `PUBLIC_SERVICES`, so the length of
 * the sequence is a property of the data rather than of the scroll code —
 * hiding a service shortens the pinned scroll correctly with no change to the
 * scroll architecture.
 *
 * Two independent flags decide whether a service reaches the page, and keeping
 * them apart is the point: `built` records that the implementation exists,
 * `public` records the editorial decision to show it. See the type below.
 */

export type ServiceId =
  | "social-growth"
  | "influencer"
  | "performance"
  | "web"
  | "shoots";

export type Service = {
  id: ServiceId;
  index: string;
  /** Line-broken deliberately; each entry is its own line. */
  title: readonly string[];
  description: string;
  capabilities: readonly string[];
  /**
   * Whether the implementation exists — the homepage scene, and (mirrored in
   * `config/service-pages.ts`) the dedicated route. **This is a fact about the
   * code, never an editorial decision.** Do not set it `false` to hide
   * something that is built; that is what `public` is for.
   */
  built: boolean;
  /**
   * Whether the service appears in public discovery — the homepage `What We
   * Do` sequence, the header and mobile services menus, the footer's services
   * directory, service-page prev/next, and the `/about` capability index's
   * link.
   *
   * **Separate from `built` on purpose.** A service can be finished and still
   * be held back, and conflating the two would mean deleting working code to
   * take something off the site. Everything derives from this flag, so hiding
   * a service is one boolean here rather than an
   * `if (service.id !== "shoots")` scattered through the components.
   *
   * A hidden service's route stays reachable by direct URL and carries
   * `robots: noindex, nofollow` for as long as it is hidden.
   */
  public: boolean;
};

export const SERVICES: readonly Service[] = [
  {
    id: "social-growth",
    index: "01",
    title: ["Social & Personal", "Brand Growth"],
    description:
      "We shape digital identities people recognise, remember and follow.",
    capabilities: [
      "Social Management",
      "Content Strategy",
      "Personal Branding",
      "Creator Growth",
    ],
    built: true,
    public: true,
  },
  {
    id: "influencer",
    index: "02",
    title: ["Influencer", "Marketing"],
    description:
      "We connect the right creators, brands and ideas to build campaigns people actually notice.",
    capabilities: [
      "Creator Network",
      "Campaign Strategy",
      "Collaborations",
      "Distribution",
    ],
    built: true,
    public: true,
  },
  {
    id: "performance",
    index: "03",
    title: ["Performance", "Marketing"],
    description:
      "Creative thinking backed by paid acquisition and conversion-focused execution.",
    capabilities: [
      "Meta Ads",
      "Paid Acquisition",
      "Creative Testing",
      "Conversion",
    ],
    built: true,
    public: true,
  },
  {
    id: "web",
    index: "04",
    title: ["Web & Digital", "Experiences"],
    // The category stays broad on purpose — "Software Development" would be a
    // narrower promise than the work actually covers. The capability rail is
    // what makes the technical half explicit on the homepage: landing pages
    // and conversion experiences move to the future service page rather than
    // taking two of only four visible slots.
    description:
      "Websites, digital experiences and custom business systems designed to look exceptional, work intelligently and turn interest into action.",
    capabilities: [
      "Web Design",
      "Web Development",
      "Custom Software",
      "CRM Systems",
    ],
    built: true,
    public: true,
  },
  {
    id: "shoots",
    index: "05",
    title: ["Brand Shoots", "& Content"],
    description:
      "Visual content built to make brands look sharper, stronger and more memorable.",
    capabilities: [
      "Brand Shoots",
      "Reels",
      "Campaign Content",
      "Creative Production",
    ],
    built: true,
    /**
     * **HIDDEN AT THE CLIENT'S REQUEST — Revision 16. Not unfinished.**
     *
     * The homepage scene, the `/services/brand-shoots-content` route and every
     * composition on it are complete and untouched (§10n). The client wants
     * the discipline off public discovery while the site is used for a
     * creator and brand outreach campaign, so it is hidden rather than
     * removed: nothing was deleted, no scene was unregistered, and flipping
     * this one boolean back puts the whole service — homepage chapter, menus,
     * footer row, prev/next, `Explore service ↗` and search indexing —
     * exactly where it was.
     *
     * **The index stays `05`.** Numbering belongs to the five-service system,
     * not to what happens to be visible this month, so Web & Digital
     * Experiences is still `04` and is not promoted to close the gap.
     */
    public: false,
  },
];

/** Every service whose implementation exists, visible or not. */
export const BUILT_SERVICES = SERVICES.filter((s) => s.built);

/**
 * The services the public site presents — what `02 / What We Do` runs through,
 * and the set every discovery surface derives from.
 *
 * `built` is about the code, `public` is the editorial decision, and a service
 * has to clear both. Today that is 01–04: Service 05 is finished and hidden
 * (see its note above).
 */
export const PUBLIC_SERVICES = SERVICES.filter((s) => s.built && s.public);

/** Scroll distance, in vh, that each built service is pinned for. */
export const SERVICE_SCROLL_VH = 130;

export const WHAT_WE_DO_COPY = {
  index: "02",
  label: "What We Do",
  headline: ["Built to turn attention", "into business."],
  /** Rendered in the serif italic accent, matching the hero's treatment. */
  accentWord: "business.",
  lead: "Strategy, content, creators, performance and digital experiences — connected under one growth system.",
  cta: "Discuss this project",
  /**
   * The route action, shown **only** for a service whose dedicated page
   * actually exists — `servicePageHrefFor` in `config/service-pages.ts` decides
   * that, so an unbuilt service renders nothing rather than a dead link.
   */
  pageCta: "Explore service",
} as const;

/**
 * The chapter ending — a statement, and nothing else.
 *
 * It used to carry a `Book a 15-Min Call` + `Contact Us` block. That was the
 * page's *second* booking presentation after the Hero's, and it arrived long
 * before the visitor had seen the creators, the process or the work — asking
 * for the meeting at the point where the page had only finished describing
 * itself. Removed deliberately; the closing conversion moment in About is the
 * one that has earned it. **Do not reintroduce a CTA block here.**
 *
 * The chapter now resolves into the statement and hands straight to the
 * Mishram Difference interlude, whose axis descends out of this block.
 */
export const WHAT_WE_DO_CLOSING = {
  statement: ["Different disciplines.", "One growth system."],
  /** Serif italic accent. The weight of the line sits on "One". */
  accentWord: "One",
  baseline: ["Strategy", "Content", "Creators", "Performance", "Technology"],
} as const;
