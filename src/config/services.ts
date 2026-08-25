/**
 * 02 / WHAT WE DO
 *
 * Five service states share one sticky stage. Track height, progress fill and
 * per-service slot mapping all derive from `built`, so the length of the
 * sequence is a property of the data rather than of the scroll code.
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
  /** False until that service's scene exists. Nothing renders for it. */
  built: boolean;
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
  },
];

export const BUILT_SERVICES = SERVICES.filter((s) => s.built);

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
