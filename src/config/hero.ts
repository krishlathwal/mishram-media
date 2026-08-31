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
 * Photographic surfaces in the hero composition.
 *
 * **THE COMPOSITION IS LOCKED (§05); ONLY THE MEDIA MOVED (Revision 28.)**
 * Five surfaces, the same five aspects — `9/16`, `9/16`, `9/16`, `4/5`, `1/1` —
 * and the same `onMobile` pattern, because `layout.ts`, the exposure tiers and
 * the entry sequence were all composed against those numbers. Two creators were
 * swapped in; nothing about the scene changed.
 *
 * **Why these two.** `WEBSITE SHORTLIST` supplied first-party, client-labelled
 * photographs of Ali Fazal and Akash Sagar — stronger provenance than anything
 * the Hero carried, and the two relationships Mishram actually leads with.
 * Mukul Sharma and Vishnu Priya came out; **Zoya Jaan, Nikita Kumawat and
 * Lovekesh Kataria stay**, so the composition keeps its breadth rather than
 * becoming a wall of one kind of photograph.
 *
 * **Every caption is a relationship, not a metric.** `Worked With`,
 * `Current Management`, `Creator Network` — no follower count, and none of the
 * proposal's figures (§10ad-adjacent: the proof register holds those until a
 * phase publishes them properly).
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
    /**
     * **ALI FAZAL — Revision 28, and the strongest proof the Hero carries.**
     *
     * Source: `WEBSITE SHORTLIST/ali fazal.jpeg`, user-labelled. **The filename
     * is the identity evidence** — no face was matched, and §18's rule 7 is
     * untouched.
     *
     * **TWO FIGURES, AND BOTH STAY IN EVERY CROP.** §10u: the client's label
     * establishes that Ali Fazal is *in* the frame, not which figure he is, so
     * isolating one man would assert something unverified. The 9:16 crop was
     * chosen because it is the tightest aspect that still holds both heads
     * comfortably — measured, not assumed.
     *
     * **`Worked With`, never *managed*.** §18: exactly one person on this site
     * is described as managed, and it is not him.
     */
    id: "ali",
    src: "/media/hero/creators/ali-fazal.webp",
    alt: "Ali Fazal, photographed on a Mishram Media collaboration",
    label: "Ali Fazal",
    caption: "Worked With",
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
    /**
     * **AKASH SAGAR — and the allocation decision behind it is the point.**
     *
     * Three user-labelled Akash frames arrived in the shortlist. This one —
     * `Akash sagar.jpeg`, the bright corridor frame — is the **cleanest as a
     * portrait card**, which is what the Hero needs.
     *
     * `Akash sagar 1st.jpeg` is deliberately **held back for Phase 03 / Current
     * Management**, because it is the fuller, more relational frame and that
     * section has to demonstrate the working relationship rather than decorate
     * a hero. **The best relationship photograph does not go in the Hero** —
     * see the media ledger in `docs/FINAL-POLISH-ROADMAP.md`. The third frame
     * is out on quality (1.1MP, and third-party signage in shot).
     *
     * Two figures, both kept, for the same §10u reason as Ali above.
     *
     * `Current Management` is the one relationship label this site uses in the
     * strong sense, and §10t reserves it for exactly one person (§10u §2).
     */
    id: "akash",
    src: "/media/hero/creators/akash-sagar.webp",
    alt: "Akash Sagar, photographed during Mishram Media's management work",
    label: "Akash Sagar",
    caption: "Current Management",
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
