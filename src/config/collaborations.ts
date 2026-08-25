/**
 * SELECTED COLLABORATIONS — public-facing client rail.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * BRAND-SAFETY RULE (permanent, applies to every public surface of this site)
 *
 * Betting, gambling, casino, real-money gaming and fantasy-betting companies
 * are NEVER rendered on this website — not in this rail, not in future Work,
 * Case Study, Services or Creator sections, and not in duplicated, hidden or
 * reduced-motion markup either.
 *
 * Mishram's previous site listed several such clients. They are deliberately
 * absent from this file rather than filtered at render time, so a prohibited
 * brand cannot reach the DOM by accident. Anything added here must be a
 * genuine, verifiable collaboration in an eligible category below.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Categories permitted on public surfaces. */
export type CollaborationCategory =
  | "beauty-d2c"
  | "grooming-d2c"
  | "fintech"
  | "shopping"
  | "education"
  | "lifestyle"
  | "technology"
  | "media";

export type Collaboration = {
  name: string;
  /** Alpha-only PNG, rendered as a CSS mask tinted with the theme's ink. */
  logo: string;
  /**
   * The brand's genuine artwork, revealed on hover. Generated from the same
   * source and bounds as , so the two layers overlay exactly.
   * Never hand-coloured — see the brand-safety note above.
   */
  logoColor: string;
  /**
   * Set when the artwork is monochrome black: on obsidian it would vanish, so
   * the ivory-tinted mask stays as the dark-theme treatment.
   */
  darkKeepsMono?: boolean;
  /** Natural pixel size of those assets — the rail lays logos out by height. */
  size: { w: number; h: number };
  category: CollaborationCategory;
  /**
   * Optical normalisation. Logos are laid out by height; stacked marks need
   * more of it than wordmarks to carry the same visual weight.
   */
  scale?: number;
  /** Set false to pull an entry from the rail without deleting it. */
  visible: boolean;
};

/**
 * Every entry below was carried over from Mishram Media's previous site,
 * which displayed these brands in its client rail.
 */
export const COLLABORATIONS: readonly Collaboration[] = [
  {
    name: "Mamaearth",
    logo: "/media/brands/mamaearth.png",
    logoColor: "/media/brands/mamaearth-color.png",
    size: { w: 841, h: 128 },
    category: "beauty-d2c",
    visible: true,
  },
  {
    name: "Groww",
    logo: "/media/brands/groww.png",
    logoColor: "/media/brands/groww-color.png",
    size: { w: 492, h: 128 },
    category: "fintech",
    visible: true,
  },
  {
    name: "Muuchstac",
    logo: "/media/brands/muuchstac.png",
    logoColor: "/media/brands/muuchstac-color.png",
    size: { w: 141, h: 160 },
    category: "grooming-d2c",
    // Artwork is black; on obsidian the tinted mask is the correct treatment.
    darkKeepsMono: true,
    // Stacked lockup rather than a wordmark — needs extra height to match.
    scale: 1.8,
    visible: true,
  },
  {
    name: "CashKaro",
    logo: "/media/brands/cashkaro.png",
    logoColor: "/media/brands/cashkaro-color.png",
    size: { w: 681, h: 128 },
    category: "shopping",
    visible: true,
  },
  {
    name: "Upstox",
    logo: "/media/brands/upstox.png",
    logoColor: "/media/brands/upstox-color.png",
    size: { w: 481, h: 128 },
    category: "fintech",
    visible: true,
  },
];

export const VISIBLE_COLLABORATIONS = COLLABORATIONS.filter((c) => c.visible);

export const COLLABORATIONS_COPY = {
  index: "01",
  title: "Selected Collaborations",
  lead: "Brands, creators and teams we've built with.",
} as const;
