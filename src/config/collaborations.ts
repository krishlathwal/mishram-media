/**
 * SELECTED COLLABORATIONS — public-facing brand rail.
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
 *
 * **One brand from the Revision 16 list was withheld under this rule — see
 * `WITHHELD` at the foot of this file.** The rule was not weakened for it.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * REVISION 16 — the roster the client confirmed.
 *
 * Eighteen brand relationships were supplied directly by the client as
 * user-confirmed first-party business information, and they replace a rail
 * that carried five names inherited from the old site's markup. Four of those
 * five are in the new list; the fifth (Muuchstac) is a legitimate older
 * relationship and stays. **A larger list is not a licence to drop a real
 * one.**
 *
 * `priority` is what stops this becoming a sponsor wall. The rail leads with
 * the strongest and most current marks and the rest of the roster follows it,
 * so a visitor gets recognition at a glance rather than twenty logos to scan.
 * Nothing is hardcoded in JSX — the components read these flags.
 *
 * LOGO POLICY. Every mark below is a **local** asset built from an official
 * source, in this preference order: the brand's own media/press pack, its own
 * website or CDN, then a reliable vector repository where the file is clearly
 * the current official mark. No logo blog, no icon marketplace, no screenshot,
 * no watermarked file, and **nothing is hotlinked** (§14). Marks are never
 * stretched, redrawn or recoloured; `logoSource` records where each came from
 * and is development-only.
 */

/** Categories permitted on public surfaces. */
export type CollaborationCategory =
  | "beauty-d2c"
  | "grooming-d2c"
  | "wellness-d2c"
  | "food-d2c"
  | "food-delivery"
  | "quick-commerce"
  | "fintech"
  | "shopping"
  | "education"
  | "lifestyle"
  | "technology"
  | "entertainment"
  | "media";

/**
 * Where a brand sits in the rail.
 *
 * `featured` — the current, strongest, most recognisable relationships. They
 * lead the rail, so they are what a visitor sees in the first screen after the
 * Hero.
 * `roster` — the rest of the legitimate roster. It continues through the same
 * rail rather than being hidden behind a "see more".
 */
export type CollaborationPriority = "featured" | "roster";

export type Collaboration = {
  name: string;
  /** Alpha mask, rendered as a CSS mask tinted with the theme's ink. */
  logo: string;
  /**
   * The brand's genuine artwork, revealed on hover. Generated from the same
   * source and bounds as `logo`, so the two layers overlay exactly.
   * Never hand-coloured — see the brand-safety note above.
   */
  logoColor: string;
  /**
   * Set when the artwork is monochrome black, or dark enough that it would
   * disappear on obsidian: the ivory-tinted mask is then the correct
   * dark-theme treatment and the colour layer stays hidden.
   */
  darkKeepsMono?: boolean;
  /** Natural pixel size of those assets — the rail lays logos out by height. */
  size: { w: number; h: number };
  category: CollaborationCategory;
  priority: CollaborationPriority;
  /**
   * Optical normalisation. Logos are laid out by height; stacked marks need
   * more of it than wordmarks to carry the same visual weight.
   */
  scale?: number;
  /** Set false to pull an entry from the rail without deleting the record. */
  visible: boolean;
  /**
   * DEVELOPMENT ONLY — never rendered. Where the relationship claim comes
   * from, so a published brand stays traceable.
   */
  source: string;
  /** DEVELOPMENT ONLY — never rendered. Where the artwork came from. */
  logoSource: string;
};

const CONFIRMED = "user-confirmed: 2026-08 brand relationship";
const LEGACY = "previous Mishram Media site client rail";
/**
 * The third provenance class, added in Revision 29: a brand the **current
 * first-party Mishram collaboration deck** presents as a relationship.
 * `canva.link/2zuy2cde0ar0kfd`, and its local export in
 * `WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf`.
 */
const DECK = "first-party Mishram collaboration deck (2026)";

/**
 * Render order is editorial, and `featured` entries lead deliberately.
 * `ORDERED_COLLABORATIONS` sorts by priority regardless, so a misplaced entry
 * cannot break the invariant — but keep the array readable anyway.
 */
export const COLLABORATIONS: readonly Collaboration[] = [
  /* ── Featured — what the rail opens on ─────────────────────────── */
  {
    name: "Swiggy",
    logo: "/media/brands/swiggy.png",
    logoColor: "/media/brands/swiggy-color.png",
    size: { w: 423, h: 128 },
    category: "food-delivery",
    priority: "featured",
    visible: true,
    source: CONFIRMED,
    logoSource: "official current mark (vector), matching Swiggy's own corporate-site asset",
  },
  {
    name: "Canva",
    logo: "/media/brands/canva.png",
    logoColor: "/media/brands/canva-color.png",
    size: { w: 399, h: 128 },
    category: "technology",
    priority: "featured",
    scale: 1.1,
    visible: true,
    source: CONFIRMED,
    logoSource: "official current wordmark (vector)",
  },
  {
    name: "Yash Raj Films",
    logo: "/media/brands/yash-raj-films.png",
    logoColor: "/media/brands/yash-raj-films-color.png",
    size: { w: 140, h: 160 },
    category: "entertainment",
    priority: "featured",
    // Stacked lockup — the box mark above the wordmark, as Muuchstac is.
    scale: 1.6,
    visible: true,
    source: CONFIRMED,
    logoSource: "official current mark (vector)",
  },
  {
    name: "Mamaearth",
    logo: "/media/brands/mamaearth.png",
    logoColor: "/media/brands/mamaearth-color.png",
    size: { w: 841, h: 128 },
    category: "beauty-d2c",
    priority: "featured",
    visible: true,
    source: `${CONFIRMED}; also ${LEGACY}`,
    logoSource: "existing approved asset (Revision 01)",
  },
  {
    name: "Groww",
    logo: "/media/brands/groww.png",
    logoColor: "/media/brands/groww-color.png",
    size: { w: 492, h: 128 },
    category: "fintech",
    priority: "featured",
    visible: true,
    // The client's list spelled this "Grow". Normalised to the company's own
    // current identity; it is the same brand already on the rail, not a second.
    source: `${CONFIRMED}; also ${LEGACY}`,
    logoSource: "existing approved asset (Revision 01)",
  },
  {
    name: "Swiggy Instamart",
    logo: "/media/brands/swiggy-instamart.png",
    logoColor: "/media/brands/swiggy-instamart-color.png",
    size: { w: 315, h: 128 },
    category: "quick-commerce",
    priority: "featured",
    scale: 1.15,
    visible: true,
    source: CONFIRMED,
    logoSource: "official current mark (vector), from Swiggy's own corporate site",
  },
  {
    name: "Excel Entertainment",
    logo: "/media/brands/excel-entertainment.png",
    logoColor: "/media/brands/excel-entertainment-color.png",
    size: { w: 251, h: 160 },
    category: "entertainment",
    priority: "featured",
    scale: 1.35,
    visible: true,
    source: CONFIRMED,
    logoSource: "official website header mark — the only resolution they publish",
  },
  {
    name: "Wondershare",
    logo: "/media/brands/wondershare.png",
    logoColor: "/media/brands/wondershare-color.png",
    size: { w: 1010, h: 128 },
    category: "technology",
    priority: "featured",
    darkKeepsMono: true,
    visible: true,
    source: CONFIRMED,
    logoSource: "official horizontal wordmark (vector), from Wondershare's own asset CDN",
  },
  {
    name: "Upstox",
    logo: "/media/brands/upstox.png",
    logoColor: "/media/brands/upstox-color.png",
    size: { w: 481, h: 128 },
    category: "fintech",
    priority: "featured",
    visible: true,
    source: `${CONFIRMED}; also ${LEGACY}`,
    logoSource: "existing approved asset (Revision 01)",
  },
  {
    name: "Pilgrim",
    logo: "/media/brands/pilgrim.png",
    logoColor: "/media/brands/pilgrim-color.png",
    size: { w: 515, h: 128 },
    category: "beauty-d2c",
    priority: "featured",
    darkKeepsMono: true,
    visible: true,
    source: CONFIRMED,
    logoSource: "official website mark",
  },
  {
    name: "CashKaro",
    logo: "/media/brands/cashkaro.png",
    logoColor: "/media/brands/cashkaro-color.png",
    size: { w: 681, h: 128 },
    category: "shopping",
    priority: "featured",
    visible: true,
    source: `${CONFIRMED}; also ${LEGACY}`,
    logoSource: "existing approved asset (Revision 01)",
  },
  {
    name: "Kapiva",
    logo: "/media/brands/kapiva.png",
    logoColor: "/media/brands/kapiva-color.png",
    size: { w: 355, h: 128 },
    category: "wellness-d2c",
    priority: "featured",
    darkKeepsMono: true,
    visible: true,
    source: CONFIRMED,
    logoSource: "official website mark (vector)",
  },

  /* ── The rest of the roster, through the same rail ─────────────── */
  {
    name: "Navi",
    logo: "/media/brands/navi.png",
    logoColor: "/media/brands/navi-color.png",
    size: { w: 483, h: 128 },
    category: "fintech",
    priority: "roster",
    // The wordmark is a near-black purple; on obsidian it reads as nothing.
    darkKeepsMono: true,
    visible: true,
    // Supplied as "Navi UPI". The published name is the brand's own — Navi is
    // the company, UPI is a product surface within it.
    source: `${CONFIRMED} (supplied as "Navi UPI")`,
    logoSource: "official website mark (vector)",
  },
  {
    name: "Pintola",
    logo: "/media/brands/pintola.png",
    logoColor: "/media/brands/pintola-color.png",
    size: { w: 416, h: 128 },
    category: "food-d2c",
    priority: "roster",
    scale: 1.15,
    visible: true,
    source: CONFIRMED,
    logoSource: "official website mark",
  },
  {
    name: "AVVATAR",
    logo: "/media/brands/avvatar.png",
    logoColor: "/media/brands/avvatar-color.png",
    size: { w: 187, h: 160 },
    category: "wellness-d2c",
    priority: "roster",
    darkKeepsMono: true,
    scale: 1.45,
    visible: true,
    source: `${CONFIRMED} (supplied as "AVVATAR India")`,
    logoSource: "official website mark — their published asset is small; see the note below",
  },
  {
    name: "DermaTouch",
    logo: "/media/brands/dermatouch.png",
    logoColor: "/media/brands/dermatouch-color.png",
    size: { w: 337, h: 128 },
    category: "beauty-d2c",
    priority: "roster",
    darkKeepsMono: true,
    visible: true,
    source: CONFIRMED,
    logoSource: "official website mark",
  },
  {
    name: "Troovy",
    logo: "/media/brands/troovy.png",
    logoColor: "/media/brands/troovy-color.png",
    size: { w: 307, h: 128 },
    category: "food-d2c",
    priority: "roster",
    visible: true,
    source: CONFIRMED,
    logoSource: "official website mark",
  },
  {
    name: "Muuchstac",
    logo: "/media/brands/muuchstac.png",
    logoColor: "/media/brands/muuchstac-color.png",
    size: { w: 141, h: 160 },
    category: "grooming-d2c",
    priority: "roster",
    // Artwork is black; on obsidian the tinted mask is the correct treatment.
    darkKeepsMono: true,
    // Stacked lockup rather than a wordmark — needs extra height to match.
    scale: 1.8,
    visible: true,
    // Kept deliberately. A longer list of newer names is not a reason to drop
    // a real earlier relationship.
    source: LEGACY,
    logoSource: "existing approved asset (Revision 01)",
  },

  /* ── Confirmed, but not renderable ─────────────────────────────── */
  {
    name: "VYRL",
    logo: "",
    logoColor: "",
    size: { w: 1, h: 1 },
    category: "media",
    priority: "roster",
    /**
     * **NO LEGITIMATE LOGO ASSET EXISTS TO DOWNLOAD.** The relationship is
     * confirmed and the record is kept here, but the rail is a logo rail and
     * this brand has nothing to put in it: `vyrl.in`, `vyrloriginals.in` and
     * `vyrloriginals.com` all resolve to a redirect stub with no site behind
     * them, there is no media or press page, and the mark is on neither
     * Wikimedia Commons nor Wikipedia. The only images available are logo
     * aggregators and a rounded platform avatar — both ruled out by the logo
     * policy above.
     *
     * `visible: false` rather than deletion, so the confirmed relationship is
     * not lost. **Supply an official file and flip one boolean.**
     */
    visible: false,
    source: CONFIRMED,
    logoSource: "none — no official asset could be sourced",
  },
  {
    name: "Duolingo",
    logo: "",
    logoColor: "",
    size: { w: 1, h: 1 },
    category: "education",
    priority: "roster",
    /**
     * **NEW IN REVISION 29, AND HELD FOR THE SAME REASON AS VYRL.**
     *
     * The relationship is newly evidenced: the current first-party Mishram
     * collaboration deck presents a Duolingo brand tile in its brand-video
     * section. That satisfies the relationship test.
     *
     * **It does not satisfy the asset test.** The only file available is the
     * deck's own 480×360 raster — a white wordmark locked onto Duolingo's
     * green, with no transparency. Publishing it would mean either shipping a
     * green rectangle among transparent marks or cutting the wordmark out of
     * its ground, and lifting a mark off its background is altering the
     * artwork, which the logo policy above forbids.
     *
     * `visible: false`, so the confirmed relationship is recorded and cannot
     * be lost. **Supply an official transparent asset and flip one boolean.**
     */
    visible: false,
    source: DECK,
    logoSource: "none yet — deck tile is 480×360 raster on an opaque ground",
  },
];

/**
 * WITHHELD — confirmed by the client and deliberately NOT published.
 *
 * Development-only. Never rendered, and not part of `COLLABORATIONS`, so it
 * cannot reach the DOM through a render path, a marquee duplicate or a
 * reduced-motion fallback.
 */
export const WITHHELD = [
  {
    name: "Fun N Earn",
    reason:
      "Real-money gaming. The product is a cash-contest app: money is added to " +
      "an in-app wallet to enter paid contests, winnings are withdrawn after KYC, " +
      "and the platform takes a commission on winnings. That is squarely inside " +
      "the permanent brand-safety rule above, which covers real-money gaming as " +
      "well as betting, casino and fantasy. The rule was not weakened, and no " +
      "exception was made because the relationship is genuine — the relationship " +
      "is not what the rule turns on.",
    source: CONFIRMED,
  },
] as const;

export const VISIBLE_COLLABORATIONS = COLLABORATIONS.filter((c) => c.visible);

const PRIORITY_ORDER: Record<CollaborationPriority, number> = {
  featured: 0,
  roster: 1,
};

/**
 * The rail's render order: featured marks first, then the rest of the roster,
 * each group keeping the editorial order above.
 */
export const ORDERED_COLLABORATIONS = [...VISIBLE_COLLABORATIONS].sort(
  (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
);

/**
 * The strongest, most current marks. What the rail opens on, and the set used
 * anywhere a full roster would read as a wall rather than as evidence.
 */
export const FEATURED_COLLABORATIONS = ORDERED_COLLABORATIONS.filter(
  (c) => c.priority === "featured",
);

export const COLLABORATIONS_COPY = {
  index: "01",
  title: "Selected Collaborations",
  /**
   * The exact claim, and nothing above it. **Not "trusted by", not "partners",
   * not "our clients"** — those describe relationships this project cannot
   * evidence for every mark on the rail. "Worked with" is what is true of all
   * of them, and it is the old site's own wording.
   */
  lead: "Selected brands we've worked with.",
} as const;
