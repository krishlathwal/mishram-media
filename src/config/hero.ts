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
 * **THE COMPOSITION IS LOCKED (§05); ONLY THE MEDIA MOVED — twice.**
 * Revision 28 swapped two creators in; **Revision 42 re-cast the five slots
 * against the client's own creator priority**, spoken on the explaining video
 * of 6 September 2026: *remove Zoya, highlight Bhandesiri (Akash Sagar),
 * Ali Fazal and Lovekesh Kataria, and use the photograph of Lovekesh "which is
 * with me"*. Five surfaces, the same five aspects — `9/16`, `9/16`, `9/16`,
 * `4/5`, `1/1` — and the same `onMobile` pattern, because `layout.ts`, the
 * exposure tiers and the entry sequence were all composed against those
 * numbers. Only the slot *keys* in `layout.ts` were renamed to follow the
 * creators (`zoya → akash`, `akash → lovkesh`, `lovkesh → kaka`), and the
 * resting exposures were retuned so the three named creators are the bright
 * ones.
 *
 * | Slot | Aspect | Creator | Source |
 * | --- | --- | --- | --- |
 * | 1, primary | 9:16 | **Akash Sagar** | `Akash sagar.jpeg`, a fresh 9:16 crop |
 * | 2 | 9:16 | Ali Fazal | unchanged |
 * | 3, deepest | 9:16 | Nikita Kumawat | unchanged — the atmospheric back card |
 * | 4 | 4:5 | **Lovekesh Kataria** | `Lovekesh Kataria.jpeg`, a fresh 4:5 crop — the pair |
 * | 5 | 1:1 | **Kaka** | `Immortal Kaka Ji.jpeg`, a 1:1 crop |
 *
 * **Every caption is a relationship, not a metric.** `Worked With`,
 * `Current Management`, `Creator Network` — no follower count, and none of the
 * proposal's figures.
 *
 * **Purav Jha was asked for and is not here.** Four `Purav` folders on the
 * drive hold `.MOV` only; no still exists and no frame was pulled, because a
 * folder name does not establish which person in a frame is the named one
 * (§10u rule 7). Open request to the client.
 */
export const HERO_SURFACES: readonly HeroSurface[] = [
  {
    /**
     * **AKASH SAGAR — the primary slot, Revision 42.** "Most important
     * Bhandesiri" in the client's own words. A 9:16 crop of the same bright
     * corridor frame the Hero has carried since Revision 28
     * (`WEBSITE SHORTLIST/Akash sagar.jpeg`, user-labelled): the middle
     * 2268×4032 of the 3024×4032 source, which is the tightest aspect that
     * still holds both figures with headroom — chosen by rendering the left,
     * middle and right 9:16 windows and looking. **Both figures stay** (§10u).
     * The old 4:5 crop of this frame is no longer used by the Hero; homepage
     * Service 02 takes it instead, so the file stays on disk.
     */
    id: "akash",
    src: "/media/hero/creators/akash-sagar-portrait.webp",
    alt: "Akash Sagar, photographed during Mishram Media's management work",
    label: "Akash Sagar",
    caption: "Current Management",
    aspect: 9 / 16,
    onMobile: true,
  },
  {
    /**
     * **ALI FAZAL — Revision 28, unchanged.** Source: `WEBSITE SHORTLIST/ali
     * fazal.jpeg`, user-labelled. **The filename is the identity evidence** —
     * no face was matched, and §18's rule 7 is untouched. **Two figures, and
     * both stay in every crop.** `Worked With`, never *managed*.
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
    // The deepest photographic surface, drifting behind the headline at 0.26
    // exposure. Kept as the composition's depth card; not one of the three the
    // client asked to highlight, and not on the mobile set.
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
     * **LOVEKESH KATARIA — the photograph "which is with me", Revision 42.**
     * The Hero used to keep the original 720×720 awards-evening file because
     * the scene was composed against it. The client asked for it to be
     * replaced with the newer interior photograph
     * (`WEBSITE SHORTLIST/Lovekesh Kataria.jpeg`, user-labelled, EXIF 6 so
     * `.rotate()` first). This is a 4:5 crop of the rotated original —
     * `{ 900, 2350, 4300×5375 }` — holding the pair with the arm across the
     * shoulder intact, a different window from the 3:4 roster crop and the
     * 4:5 influencer-page crop. The old square file stays on disk; nothing
     * else on the homepage renders it now.
     */
    id: "lovkesh",
    src: "/media/hero/creators/lovekesh-kataria.webp",
    alt: "Lovekesh Kataria photographed with Mishram Media",
    label: "Lovekesh Kataria",
    caption: "Creator Network",
    aspect: 4 / 5,
    onMobile: true,
  },
  {
    /**
     * **KAKA — added in Revision 42.** The client asked for "Kaka, the
     * singer" to be added and named him in the creator priority list; that
     * instruction is the relationship record P22 was waiting for. The
     * photograph is `WEBSITE SHORTLIST/Immortal Kaka Ji.jpeg`, the client's
     * own label — the only Kaka photograph in the library. A 1:1 crop,
     * `{ 0, 560, 2160×2160 }`, both figures kept. `Worked With`, nothing
     * stronger.
     */
    id: "kaka",
    src: "/media/hero/creators/kaka.webp",
    alt: "Kaka, photographed with Mishram Media",
    label: "Kaka",
    caption: "Worked With",
    aspect: 1,
    onMobile: false,
  },
];

/** Tiny typographic fragments floating inside the media system. */
export const HERO_ANNOTATIONS = [
  { id: 'growth', text: 'Creator Growth', at: [0.622, -1.357, -0.8] as const },
  { id: 'perf', text: 'Performance', at: [0.701, 1.47, -0.8] as const },
] as const;
