/**
 * Hero content. Copy and media live here so they can be swapped without
 * touching layout or scene code.
 */

export const HERO_COPY = {
  eyebrow: "Creative × Performance × Technology",
  /** Line breaks are deliberate — do not break word by word. */
  headline: ["We turn attention", "into growth."] as const,
  /** Rendered in the serif italic accent face. */
  accentWord: "growth.",
  lead: "We build creators, brands and digital experiences designed to scale.",
  detail:
    "From personal brands and influencer campaigns to performance marketing and high-converting websites, Mishram Media connects creative thinking with measurable growth.",
  primaryCta: "Book a 15-Min Call",
  primaryCtaNote: "15 min · No obligation",
  secondaryCta: "Contact Us",
  scrollCue: "Scroll to explore",
  /** Capabilities, stated plainly. No metrics, no rankings. */
  /**
   * **Revision 21.** Was `Social · Influencer · Performance · Brand Shoots ·
   * Web`. Brand Shoots came off the rail when it came off public discovery,
   * and `Software` took the slot — the rail states what Mishram leads with,
   * and after Service 04 shipped the custom-software half was the one
   * capability the homepage never said out loud. Five items either way, so
   * §11's measured two-column rail is unchanged.
   */
  capabilities: ["Social", "Influencer", "Performance", "Web", "Software"],
} as const;

export type HeroSurface = {
  id: string;
  src: string;
  alt: string;
  /** Shown in the hover caption. */
  label: string;
  caption: string;
  /** width / height */
  aspect: number;
  /** Included in the reduced mobile composition. */
  onMobile: boolean;
};

/**
 * Photographic surfaces in the hero composition. Every portrait is a creator
 * already associated with Mishram Media on the previous site.
 */
export const HERO_SURFACES: readonly HeroSurface[] = [
  {
    id: "zoya",
    src: "/media/creators/zoya-jaan.webp",
    alt: "Portrait of creator Zoya Jaan from the Mishram Media network",
    label: "Zoya Jaan",
    caption: "Creator Network",
    aspect: 9 / 16,
    onMobile: true,
  },
  {
    id: "mukul",
    src: "/media/creators/mukul-sharma.webp",
    alt: "Portrait of creator Mukul Sharma from the Mishram Media network",
    label: "Mukul Sharma",
    caption: "Creator Network",
    aspect: 9 / 16,
    onMobile: true,
  },
  {
    id: "nikita",
    src: "/media/creators/nikita-kumawat.webp",
    alt: "Portrait of creator Nikita Kumawat from the Mishram Media network",
    label: "Nikita Kumawat",
    caption: "Creator Network",
    aspect: 9 / 16,
    onMobile: false,
  },
  {
    id: "vishnu",
    src: "/media/creators/vishnu-priya.webp",
    alt: "Portrait of creator Vishnu Priya from the Mishram Media network",
    label: "Vishnu Priya",
    caption: "Creator Network",
    aspect: 4 / 5,
    onMobile: true,
  },
  {
    // THE HERO KEEPS THE ORIGINAL PHOTOGRAPH, and that is deliberate. Revision
    // 17B replaced this creator's roster image with a user-supplied file
    // (`featured/lovekesh-kataria.webp`), but the Hero's exposure tiers,
    // `layout.ts` positions and 1:1 aspect were all composed against *this*
    // square source and the whole scene is locked (§05). Only the **spelling**
    // was normalised — the site must never show `Lovkesh` and `Lovekesh` as two
    // people (§10u §4).
    id: "lovkesh",
    src: "/media/creators/lovkesh-kataria.webp",
    alt: "Creator Lovekesh Kataria at an awards evening",
    label: "Lovekesh Kataria",
    caption: "Creator Network",
    aspect: 1,
    onMobile: false,
  },
];

/** Tiny typographic fragments floating inside the media system. */
export const HERO_ANNOTATIONS = [
  { id: 'growth', text: 'Creator Growth', at: [0.622, -1.357, -0.8] as const },
  { id: 'perf', text: 'Performance', at: [0.701, 1.47, -0.8] as const },
] as const;
