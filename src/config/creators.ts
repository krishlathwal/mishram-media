/**
 * 03 / CREATORS
 *
 * The roster the homepage shows. Currently the five creators already associated
 * with Mishram Media and already present in this project as local approved
 * assets (`public/media/creators/*.webp`, mirrored in `config/hero.ts`).
 *
 * **This list is closed to unverified names**: do not add a creator without
 * approved local photography, and never substitute stock imagery or an
 * influencer scraped from a platform. It is, however, **built to grow** — the
 * section was rearchitected to carry 15–20 creators comfortably and was stress
 * tested at 24 (§10b of the brief). Adding one is a single object here; no
 * component changes, no hand-counted numbers.
 *
 * FOLLOWER COUNTS — still none, after a real verification pass. See the note
 * above `followers` below, and §10b of the brief for the candidate handles that
 * were found and why each was rejected.
 */

export const FRAME_KINDS = ["portrait", "reel", "content"] as const;

export type FrameKind = (typeof FRAME_KINDS)[number];

/** One frame's crop, and optionally its own source file. */
export type FrameCrop = {
  /**
   * A dedicated image for this frame. **Optional.** Left unset, the frame is a
   * genuine re-crop of the portrait source, which is what all five current
   * creators do — each has exactly one approved photograph, so the supporting
   * frames must be crops of it rather than invented campaign work.
   *
   * Set it once a creator genuinely has a separate reel still or content shot.
   */
  src?: string;
  /** `object-position` for the cover crop. */
  position: string;
  /** Extra zoom on top of the cover crop. 1 = none. */
  zoom?: number;
  /** `transform-origin` for that zoom. Defaults to `position`. */
  origin?: string;
};

export type CreatorMedia = {
  /** The one required asset. Everything else can be derived from it. */
  portrait: FrameCrop & { src: string };
  /** Omit entirely and the reel becomes a tighter crop of the portrait. */
  reel?: FrameCrop;
  /** Omit entirely and the content frame becomes a mid crop of the portrait. */
  content?: FrameCrop;
};

export type Creator = {
  id: string;
  name: string;
  alt: string;
  /**
   * Contextual label. Only what is genuinely known — every one of these is a
   * creator in the Mishram network, which is exactly what the hero already
   * says about the same portraits. No invented niches or categories.
   */
  label: string;
  /**
   * Set `false` to keep a creator's record here without showing them on the
   * homepage — a name confirmed but not yet cleared, or photography still
   * being chosen. Defaults to shown. Deliberately one boolean, not a CMS.
   */
  published?: boolean;
  /**
   * Per-creator art direction. The geometry is shared — same portrait frame,
   * same reel, same content frame, same cascade — so switching stays spatially
   * stable. What changes is what each frame is *pointed at*, which is the
   * difference between one template with images dropped in and individually
   * composed states.
   */
  media: CreatorMedia;
  /**
   * Rounded public follower label, e.g. "2.4M". **Unset for all five.**
   *
   * A bounded verification pass (Aug 2026) turned up candidate accounts for
   * every creator but confirmed none of them. Three reasons, and any one of
   * them is disqualifying under §1 of the brief:
   *
   * 1. Several creators have multiple same-name accounts plus fan pages, and
   *    the project holds no record linking a name to a handle — so picking one
   *    would be assuming, which is exactly what must not happen for a named
   *    real person on a client's live site.
   * 2. Every figure came from secondary aggregator/biography sites, and they
   *    disagree badly — one creator was listed at 1M, 2.3M and 3.5M by three
   *    different sites.
   * 3. Instagram profiles sit behind an auth wall, so the portrait in this repo
   *    could not be matched against a profile photo.
   *
   * Fill this in only from the live account, once the client confirms the
   * handle. Use a rounded label ("2.4M", "850K") — never "2,438,921".
   */
  followers?: string;
  /** Verified handle, without the @. Unset for the same reason as `followers`. */
  instagram?: string;
  /**
   * Tiny scene offsets in % of the stage box, where a creator's composition
   * genuinely wants them. Kept to a couple of percent: enough to breathe, never
   * enough to make a creator look like a different section.
   */
  nudge?: { reelY?: number; contentY?: number };
};

/**
 * Where a supporting frame lands when a creator supplies only a portrait.
 *
 * A **layout default, not art direction.** It gives a new creator three
 * distinguishable frames on day one instead of the same crop at three sizes,
 * which is the failure mode this section already learned about (see Mukul in
 * §10b). Tune the real values in the creator's own `media` block once the
 * composition has actually been looked at.
 */
const FALLBACK_ZOOM: Record<FrameKind, number> = {
  portrait: 1,
  reel: 1.5,
  content: 1.25,
};

export type ResolvedFrame = {
  src: string;
  position: string;
  zoom: number;
  origin: string;
};

/**
 * What a given frame actually renders, after the fallbacks.
 *
 * The resolution order is deliberate: a frame's own dedicated source wins, then
 * the portrait's. Everything a frame does not state is inherited rather than
 * guessed, so a creator can be added with one image and refined later without
 * anything else changing.
 */
export function resolveFrame(
  creator: Creator,
  kind: FrameKind,
): ResolvedFrame {
  const portrait = creator.media.portrait;
  const frame = kind === "portrait" ? portrait : creator.media[kind];
  const position = frame?.position ?? portrait.position;

  return {
    src: frame?.src ?? portrait.src,
    position,
    // An explicit frame with no zoom means 1 — only a *missing* frame falls
    // back to the default, which is what keeps the five tuned crops exact.
    zoom: frame?.zoom ?? (frame ? 1 : FALLBACK_ZOOM[kind]),
    origin: frame?.origin ?? position,
  };
}

export const CREATORS: readonly Creator[] = [
  {
    id: "zoya",
    name: "Zoya Jaan",
    alt: "Portrait of creator Zoya Jaan from the Mishram Media network",
    label: "Creator Network",
    // 620x1102. Face high in the frame at ~15%; full-length fashion pose.
    // The 3:4 frame can only shift 25% of the source, so the portrait takes
    // all the headroom available and the content frame drops below the chin
    // entirely rather than clipping it.
    media: {
      portrait: { src: "/media/creators/zoya-jaan.webp", position: "48% 6%" },
      reel: { position: "50% 0%", zoom: 1.8, origin: "50% 0%" },
      content: { position: "50% 100%", zoom: 1.1, origin: "50% 30%" },
    },
  },
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * AKASH SAGAR — VERIFIED RELATIONSHIP, **UNPUBLISHED FOR WANT OF A PHOTO.**
   * ─────────────────────────────────────────────────────────────────────────
   *
   * `published: false`, so `ROSTER` excludes him, the visible roster stays at
   * five and index numbering is unaffected. Every other field is verified and
   * ready: **supply the portrait and flip one boolean.**
   *
   * WHY HE IS SECOND AND NOT LAST. He is the only creator on this list the
   * agency *currently manages*, so appending him below five historical
   * "worked with" relationships would bury the strongest one. Zoya keeps the
   * opening slot deliberately — she is the creator the section opens on, the
   * single image that loads first (§10b-scale), and §10d's featured work item.
   * Displacing her would change the approved opening composition to make a
   * point about ordering.
   *
   * RELATIONSHIP — the one entry on this roster that is not "Creator Network",
   * and the evidence is a chain rather than an assertion:
   *
   * 1. The user confirmed it explicitly: Mishram Media currently manages this
   *    profile.
   * 2. `@xbhandesiri_`'s own public bio reads "Managed by - @filmybande".
   * 3. `@filmybande` is publicly "Prashant mishra", bio "Talent Management",
   *    with a `mishram.media` story highlight.
   * 4. Prashant Mishra is named **Founder & Chief Marketing Officer** of
   *    Mishram.Media in the old site's schema.org `employee` array.
   *
   * So `label` is `"Currently Managed"` here and stays `"Creator Network"` for
   * everyone else — the field is per-creator, so no component knows or cares.
   * **Do not relabel the other five.** The old site's own ceiling for them is
   * "We've successfully worked with influencers"; see the audit §4.
   *
   * THE IMAGE, and why there isn't one. A bounded attempt was made against all
   * three legitimate sources on 25 Aug 2026:
   *   - this repo — nothing;
   *   - the old repo — `grep -i bhandesiri` returns zero matches anywhere;
   *   - the official public profile — the only asset it exposes is a
   *     **150×150** avatar (`stp=dst-jpg_s150x150_tt6`), with **no `srcset`
   *     and no larger variant offered**.
   * 150×150 is roughly 7% of the pixels this section needs: the portrait frame
   * renders 400–520px wide on desktop, so ~1000px at 2× DPR, and the five
   * approved assets are 620×1102, 720×720 and 640×800. It would read as a
   * blurred square beside five properly shot portraits. Stock, a scraped
   * substitute, a fan-page crop or a generated portrait are all ruled out
   * (§1), and hotlinking Instagram is ruled out twice over (§14).
   *
   * **`media.portrait.src` names the file that is still needed.** It is never
   * requested while `published` is false. Do not flip that boolean before the
   * file exists, or Next/Image will 404. Crops below are layout defaults —
   * art-direct them against the real photograph, as §10b does for the others.
   */
  {
    id: "akash-sagar",
    name: "Akash Sagar",
    alt: "Portrait of creator Akash Sagar, managed by Mishram Media",
    label: "Currently Managed",
    published: false,
    instagram: "xbhandesiri_",
    media: {
      portrait: { src: "/media/creators/akash-sagar.webp", position: "50% 20%" },
    },
  },
  {
    id: "nikita",
    name: "Nikita Kumawat",
    alt: "Portrait of creator Nikita Kumawat from the Mishram Media network",
    label: "Creator Network",
    // 620x1102. Standing slightly left of centre, eyes ~21%. Horizontal
    // position pulls left so she sits centred in the frame rather than
    // drifting toward the right edge.
    media: {
      portrait: {
        src: "/media/creators/nikita-kumawat.webp",
        position: "44% 10%",
      },
      reel: { position: "44% 0%", zoom: 1.7, origin: "44% 4%" },
      content: { position: "44% 100%", zoom: 1.1, origin: "44% 30%" },
    },
  },
  {
    id: "lovkesh",
    name: "Lovkesh Kataria",
    alt: "Creator Lovkesh Kataria at an awards evening",
    label: "Creator Network",
    // 720x720, and the only two-person frame in the roster. The crop keeps
    // both figures in every format rather than zooming in on one: the project
    // does not record which figure is Lovkesh, so isolating one would be
    // asserting something unverified. The reel tightens on the pair instead.
    media: {
      // The 1:1 source in a 3:4 frame crops width only, so the full ceiling
      // came along with it. A 1.25x lift trims it and closes on the pair.
      portrait: {
        src: "/media/creators/lovkesh-kataria.webp",
        position: "35% 50%",
        zoom: 1.25,
        origin: "40% 62%",
      },
      reel: { position: "43% 50%", zoom: 1.9, origin: "47% 30%" },
      // A chest-up crop of the pair, sitting between the portrait and the
      // tight reel. A close crop of the black sherwani was tried and rejected:
      // it reads as a dead rectangle in dark mode, where the other creators'
      // content frames get patterned fabric to work with.
      content: { position: "40% 50%", zoom: 1.5, origin: "40% 40%" },
    },
    nudge: { reelY: -2 },
  },
  {
    id: "mukul",
    name: "Mukul Sharma",
    alt: "Portrait of creator Mukul Sharma from the Mishram Media network",
    label: "Creator Network",
    // 620x1102, and already a close portrait — eyes at ~34%. So this one
    // inverts the usual pattern: the portrait frame pulls *down* for headroom,
    // and the reel only needs a modest 1.5x rather than the ~1.8x the
    // full-length poses want.
    media: {
      portrait: {
        src: "/media/creators/mukul-sharma.webp",
        position: "42% 45%",
      },
      // Origin sits high enough to keep the hair inside the frame.
      reel: { position: "42% 50%", zoom: 1.75, origin: "42% 20%" },
      // Drops below the face entirely onto the jacket. At a gentler zoom all
      // three frames were the same close-up at three sizes.
      content: { position: "42% 100%", zoom: 1.6, origin: "42% 100%" },
    },
  },
  {
    id: "vishnu",
    name: "Vishnu Priya",
    alt: "Portrait of creator Vishnu Priya from the Mishram Media network",
    label: "Creator Network",
    // 640x800. The only 4:5 source, so the 3:4 portrait frame crops width
    // rather than height and the eyes land at their natural 22% untouched.
    // The content frame needs a hard 1.7x to become a genuine mid crop,
    // because frame and source share an aspect ratio.
    media: {
      portrait: {
        src: "/media/creators/vishnu-priya.webp",
        position: "52% 50%",
      },
      reel: { position: "52% 50%", zoom: 1.55, origin: "52% 2%" },
      content: { position: "52% 50%", zoom: 1.7, origin: "52% 100%" },
    },
  },
];

/**
 * What the homepage actually renders, and the only list any component should
 * read. Index numbers, the roster count, the matrix geometry and the stage all
 * derive from it — **nothing is hand-counted anywhere.**
 */
export const ROSTER: readonly Creator[] = CREATORS.filter(
  (c) => c.published !== false,
);

/** `01`…`99`, from array order. Never write an index into the data. */
export function creatorIndex(i: number): string {
  return String(i + 1).padStart(2, "0");
}

export const CREATORS_COPY = {
  index: "03",
  label: "Creators",
  headline: ["Built with people", "who move culture."],
  /** Rendered in the serif italic accent, matching the hero and §02. */
  accentWord: "culture.",
  lead: "Creators we've worked with, managed and built alongside.",
  /**
   * Roster header. The number beside it is `ROSTER.length` — it counts the
   * creators actually on this page and nothing else. **Not** "network size":
   * Mishram's real network is larger than what is configured here and that
   * figure is not verified, so the page must never imply it.
   */
  rosterLabel: "Selected Creators",
  cta: "Work with our creator network",
  /** Format captions on the supporting frames — descriptive, not claimed work. */
  formats: { reel: "Reel / 9:16", content: "Content / 4:5" },
} as const;
