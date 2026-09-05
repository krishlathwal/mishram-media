/**
 * 03 / CREATORS
 *
 * The roster the homepage shows. Creators associated with Mishram Media and
 * present in this project as local approved assets
 * (`public/media/creators/*.webp`, mirrored in `config/hero.ts`).
 *
 * **This list is closed to unverified names**: do not add a creator without
 * approved local photography, and never substitute stock imagery or an
 * influencer scraped from a platform. It is, however, **built to grow** — the
 * section was rearchitected to carry 15–20 creators comfortably and was stress
 * tested at 24 (§10b of the brief). Adding one is a single object here; no
 * component changes, no hand-counted numbers.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * REVISION 42 — TWO LISTS, AND THE CLIENT'S RANKING
 *
 * The client walked the homepage on video (6 September 2026) and ranked the
 * featured stage by name: **Ali Fazal, then Akash Sagar, then Lovekesh
 * Kataria, then Purav Jha, then Sagar Rathee, then Kaka** — and asked for the
 * creators that used to be on the stage (Zoya Jaan, Nikita Kumawat, Mukul
 * Sharma, Vishnu Priya) to move down into the *Also worked with* index.
 *
 * That splits one array into two roles:
 *
 * - **`ROSTER`** — every published creator with approved photography. The
 *   service routes, `/about` and the What We Do scenes read this: it is the
 *   photographic library, and nothing there moved.
 * - **`STAGE`** — the subset marked `stage: true`, in ranking order. Only the
 *   homepage chapter's index, cascade and meta block read this.
 *
 * Purav Jha and Sagar Rathee are on the client's stage list and **not on the
 * stage**, because neither has a still photograph anywhere in the library
 * (four `Purav` folders and `Dr 69 - sagar bhai shoot +bts` hold `.MOV` only,
 * and no frame is pulled from video under §10u rule 7). They lead the index
 * as type instead — see `WORKED_WITH`.
 * ═══════════════════════════════════════════════════════════════════════════
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
   * genuine re-crop of the portrait source — each creator has exactly one
   * approved photograph, so the supporting frames must be crops of it rather
   * than invented campaign work.
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
   * Contextual label. Only what is genuinely known — a creator in the Mishram
   * network, a worked-with relationship, or the one managed creator. No
   * invented niches or categories.
   */
  label: string;
  /**
   * Set `false` to keep a creator's record here without showing them anywhere
   * — a name confirmed but not yet cleared, or photography still being chosen.
   * Defaults to shown. Deliberately one boolean, not a CMS.
   */
  published?: boolean;
  /**
   * **Featured on the homepage stage** (Revision 42). The chapter's index,
   * cascade and meta block read `STAGE`, which is the published creators with
   * this flag, in array order. A published creator without it stays in the
   * photographic library every other route reads and joins the *Also worked
   * with* index by derivation — see `WORKED_WITH_OFF_STAGE`.
   */
  stage?: boolean;
  /**
   * Per-creator art direction. The geometry is shared — same portrait frame,
   * same reel, same content frame, same cascade — so switching stays spatially
   * stable. What changes is what each frame is *pointed at*, which is the
   * difference between one template with images dropped in and individually
   * composed states.
   */
  media: CreatorMedia;
  /**
   * Rounded public follower label, e.g. "2.4M". **Unset for everyone.**
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
  /**
   * Verified handle, without the `@`. `CreatorMeta` turns it into a real
   * outbound link; absent, it renders nothing at all.
   *
   * **Set only where two independent sources agree** — the client supplying
   * the handle for that name, and the live official account's own display name
   * matching the person. That is the bar Revision 17B used, and it is what
   * separates a handle from `followers`: a link is a destination anyone can
   * check in one click, a figure is a claim this site would be making.
   *
   * Unset for Zoya Jaan, Mukul Sharma and Kaka — none is on the client's
   * confirmed handle list and §10b's candidates for the first two remain
   * ambiguous.
   */
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
    // back to the default, which is what keeps the tuned crops exact.
    zoom: frame?.zoom ?? (frame ? 1 : FALLBACK_ZOOM[kind]),
    origin: frame?.origin ?? position,
  };
}

/**
 * Array order is the **stage ranking** the client gave, then the library. The
 * first four carry `stage: true`; the rest are the photographic library the
 * service routes still read.
 */
export const CREATORS: readonly Creator[] = [
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * ALI FAZAL — the roster's opening slot, from Revision 17B. "First Ali
   * Fazal, it's good" — the client, Revision 42.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * IDENTITY. The user supplied and explicitly labelled the source file
   * (`WEBSITE SHORTLIST/ali fazal.jpeg`). **The filename is the identity
   * evidence** — no face was compared, here or anywhere. The handle below was
   * then verified independently against the live official account.
   *
   * RELATIONSHIP. `Worked With`, and nothing stronger. He is **not** managed,
   * represented, signed or exclusive to Mishram Media; the one management
   * relationship the project can evidence has its own chapter.
   *
   * THE PHOTOGRAPH is a **relationship frame, not a portrait**: two figures,
   * on location. **The crop keeps both of them in every format** — the
   * project records that Ali Fazal is *in* this photograph, not which figure
   * he is, so isolating one would assert something unverified.
   */
  {
    id: "ali-fazal",
    name: "Ali Fazal",
    alt: "Ali Fazal photographed with Mishram Media",
    label: "Worked With",
    stage: true,
    instagram: "alifazal9",
    // 2560x3413 of a 3120x4160 source, output 1000x1333 — the portrait frame's
    // own 3:4, so the composition renders exactly as it was cropped and the
    // supporting frames are genuine re-crops of it. The pair fills the width,
    // so the supporting frames zoom rather than pan.
    media: {
      portrait: {
        src: "/media/creators/featured/ali-fazal.webp",
        position: "50% 50%",
      },
      // A 9:16 frame can only show ~43% of a 3:4 source's width at this zoom,
      // so the horizontal position is what decides whether both faces survive
      // it. Pulled left to 46%: at 50% the window's left edge landed exactly on
      // one of the two heads and bisected it.
      reel: { position: "46% 20%", zoom: 1.7, origin: "46% 20%" },
      content: { position: "50% 26%", zoom: 1.12, origin: "50% 22%" },
    },
  },
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * AKASH SAGAR — PUBLISHED ON THE STAGE IN REVISION 42, AT SECOND.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * He sat here `published: false` since Revision 13 on the reasoning that a
   * worked-with roster should not also carry the one managed creator. **The
   * client has now ranked him second on the stage by name** ("on the second
   * number add Bhandesiri, Akash Sagar"), and that instruction outranks the
   * project's own tidiness rule. The Current Management chapter stays exactly
   * as it is; this is a second, ranked appearance rather than a replacement.
   *
   * RELATIONSHIP — the one entry on this roster that is not a worked-with
   * label, and the evidence is a chain rather than an assertion:
   *
   * 1. The user confirmed it explicitly: Mishram Media currently manages this
   *    profile.
   * 2. `@xbhandesiri_`'s own public bio reads "Managed by - @filmybande".
   * 3. `@filmybande` is publicly "Prashant mishra", bio "Talent Management",
   *    with a `mishram.media` story highlight.
   *
   * So `label` is `"Currently Managed"` here and stays a worked-with word for
   * everyone else. **Do not relabel the others.**
   *
   * THE IMAGE. `featured/akash-sagar.webp` is a 3:4 crop of
   * `WEBSITE SHORTLIST/Akash sagar 1st.jpeg` — the client-labelled relational
   * frame, **the same extract Current Management renders** at a different
   * output size. The Hero carries the other frame (`Akash sagar.jpeg`), so the
   * two chapters that argue the relationship share the relational photograph
   * and the Hero keeps the portrait one. **Both figures stay in every crop.**
   */
  {
    id: "akash-sagar",
    name: "Akash Sagar",
    alt: "Akash Sagar photographed with Mishram Media during current management work",
    label: "Currently Managed",
    stage: true,
    instagram: "xbhandesiri_",
    // 1934x2579 of the rotated 3120x4160 source, output 1000x1333 — natively
    // 3:4, so the portrait frame crops nothing. Two figures side by side, so
    // the reel zooms on the pair rather than panning to one of them.
    media: {
      portrait: {
        src: "/media/creators/featured/akash-sagar.webp",
        position: "50% 30%",
      },
      reel: { position: "50% 22%", zoom: 1.75, origin: "50% 22%" },
      content: { position: "50% 34%", zoom: 1.14, origin: "50% 30%" },
    },
  },
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * LOVEKESH KATARIA — imagery upgraded and the spelling normalised (17B);
   * third on the client's stage ranking (42), "the image with me".
   * ─────────────────────────────────────────────────────────────────────────
   *
   * **The name is `Lovekesh`, with the middle `e`.** The live official
   * account `@corrupt_tuber` carries the display name **"Lovekesh Kataria"**.
   * One person, one spelling, everywhere. **`id` deliberately stays
   * `lovkesh`** — an internal key eight compositions look this creator up by.
   *
   * THE PHOTOGRAPH is `WEBSITE SHORTLIST/Lovekesh Kataria.jpeg`, user
   * supplied and labelled — 6048x8064 after orientation, an interior
   * relationship frame with the client. **Both figures are kept in every
   * format**: the project records that Lovekesh Kataria is *in* the frame, not
   * which figure he is.
   */
  {
    id: "lovkesh",
    name: "Lovekesh Kataria",
    alt: "Lovekesh Kataria photographed with Mishram Media",
    label: "Creator Network",
    stage: true,
    instagram: "corrupt_tuber",
    media: {
      // The vertical position is 14% for the two 16:9 frames on
      // `/services/brand-shoots-content`, which crop a 3:4 source to a 42%
      // band — at 50% that band landed below both heads. It does nothing on
      // the homepage, where the file and the frame share a 3:4 aspect.
      portrait: {
        src: "/media/creators/featured/lovekesh-kataria.webp",
        position: "50% 14%",
      },
      reel: { position: "50% 24%", zoom: 1.95, origin: "50% 24%" },
      content: { position: "50% 30%", zoom: 1.15, origin: "50% 26%" },
    },
    nudge: { reelY: -2 },
  },
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * KAKA — ADDED IN REVISION 42.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * IDENTITY. `WEBSITE SHORTLIST/Immortal Kaka Ji.jpeg`, supplied and named
   * by the client — the only Kaka photograph in the library, 2160x3840,
   * orientation 1, a café interior, two figures. **No face was compared.**
   *
   * RELATIONSHIP. Held since Revision 34 as P22 — *identity yes, relationship
   * not verified* — because nothing recorded a working relationship. **The
   * client has now named him on the stage ranking ("add Kaka the singer") and
   * in the written brief for this revision**, which is the one-sentence
   * unblock P22 asked for. `Worked With`, and nothing stronger.
   *
   * THE NAME. The client's spoken name is "Kaka"; the file is labelled
   * "Immortal Kaka Ji". The site renders **Kaka**, the name the client uses
   * for him — "the singer" was said to identify him, not as a label to print.
   * If the client's forthcoming image ("I'll share his image") turns out to be
   * a different person, this entry is one object to correct. No handle: none
   * was supplied and none is guessed.
   */
  {
    id: "kaka",
    name: "Kaka",
    alt: "Kaka photographed with Mishram Media",
    label: "Worked With",
    stage: true,
    // 2160x2880 of the 2160x3840 source from y=120, output 1000x1333 — the
    // heads sit at ~22% of the frame, which is where the portrait frame reads
    // them. The pair is side by side, so the supporting frames zoom on both.
    media: {
      portrait: {
        src: "/media/creators/featured/kaka.webp",
        position: "50% 24%",
      },
      reel: { position: "50% 18%", zoom: 1.8, origin: "50% 18%" },
      content: { position: "50% 30%", zoom: 1.16, origin: "50% 26%" },
    },
  },

  /* ── The photographic library — published, off the homepage stage ──────
     Zoya Jaan, Nikita Kumawat, Mukul Sharma and Vishnu Priya were the stage
     until Revision 42. The client asked for them to move into the *Also
     worked with* index, which `WORKED_WITH_OFF_STAGE` does by derivation.
     They stay published: the service routes, `/about` and the What We Do
     scenes still render this photography, and nothing about it changed. */
  {
    id: "zoya",
    name: "Zoya Jaan",
    alt: "Portrait of creator Zoya Jaan from the Mishram Media network",
    label: "Creator Network",
    // 620x1102. Face high in the frame at ~15%; full-length fashion pose.
    media: {
      portrait: { src: "/media/creators/zoya-jaan.webp", position: "48% 6%" },
      reel: { position: "50% 0%", zoom: 1.8, origin: "50% 0%" },
      content: { position: "50% 100%", zoom: 1.1, origin: "50% 30%" },
    },
  },
  {
    id: "nikita",
    name: "Nikita Kumawat",
    alt: "Portrait of creator Nikita Kumawat from the Mishram Media network",
    label: "Creator Network",
    // VERIFIED IN REVISION 17B: the client supplied this handle, the live
    // account's display name is "Nikita Kumawat (Bullet Rani)".
    instagram: "iamnikitakumawat",
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
    id: "mukul",
    name: "Mukul Sharma",
    alt: "Portrait of creator Mukul Sharma from the Mishram Media network",
    label: "Creator Network",
    media: {
      portrait: {
        src: "/media/creators/mukul-sharma.webp",
        position: "42% 45%",
      },
      reel: { position: "42% 50%", zoom: 1.75, origin: "42% 20%" },
      content: { position: "42% 100%", zoom: 1.6, origin: "42% 100%" },
    },
  },
  {
    id: "vishnu",
    name: "Vishnu Priya",
    alt: "Portrait of creator Vishnu Priya from the Mishram Media network",
    label: "Creator Network",
    // VERIFIED IN REVISION 17B. Client-supplied handle; the live account's
    // display name is "Vishnu Priya".
    instagram: "vishnupriyaaofficial",
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
 * Every published creator with approved photography — the library the service
 * routes, `/about` and the What We Do scenes read. **Not** the homepage stage.
 */
export const ROSTER: readonly Creator[] = CREATORS.filter(
  (c) => c.published !== false,
);

/**
 * The homepage stage: published creators marked `stage`, in the client's
 * ranking order. Index numbers, the roster count, the matrix geometry and the
 * cascade all derive from it — **nothing is hand-counted anywhere.**
 */
export const STAGE: readonly Creator[] = ROSTER.filter((c) => c.stage);

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
  /**
   * THE NETWORK, IN TWO HALVES — Revision 34. Mishram's own proposal
   * describes the network in two categories; they open the chapter.
   * **The two categories describe the network. They never label a person** —
   * not one name anywhere in this file carries a category, and none should.
   */
  network: [
    {
      label: "Established",
      line: "Actors and creators with audiences already built, and personal brands people recognise.",
    },
    {
      label: "Trending",
      line: "Fast-moving creators making the kind of short-form work that is in the conversation now.",
    },
  ] as readonly { label: string; line: string }[],
  /**
   * Roster header. The number beside it is `STAGE.length` — it counts the
   * people on the stage and nothing else. **Not** "network size".
   */
  rosterLabel: "Featured",
  cta: "Work with our creator network",
  /** Format captions on the supporting frames — descriptive, not claimed work. */
  formats: { reel: "Reel / 9:16", content: "Content / 4:5" },

  /**
   * The worked-with index's own heading and its one clarifying line. The
   * figures this chapter used to set at display scale live once, on the
   * homepage proof band (Revision 33). **No figure, no "over N".**
   */
  workedWithLabel: "Also worked with",
  workedWithNote:
    "Creators, actors and personalities Mishram Media has worked with on campaigns and content — a selection, not the whole network.",
  /**
   * The names the index sets at display scale above the list. Reading
   * emphasis, not a tier — see `lead` on `WorkedWith`.
   */
  workedWithLeadLabel: "Selected",
} as const;

/* ============================================================
   THE WORKED-WITH INDEX

   A **second layer** beside the image-backed stage above, and the reason it
   exists is content integrity rather than layout: the client confirmed these
   relationships, and the library holds approved photography for only some of
   them. The names are published as **type** — an editorial index states the
   relationship exactly and needs no photograph to be honest.

   **THE WORDING IS "WORKED WITH", AND IT IS LOAD-BEARING.** Not managed, not
   signed, not exclusive, not clients, not represented. Do not upgrade this
   language without separate confirmation for each name.

   Deliberately absent, and none of these should appear: follower counts,
   audience sizes, niches, categories, tiers, rankings, campaign names, brand
   pairings, or any implication of order beyond reading order.
   ============================================================ */

export type WorkedWith = {
  name: string;
  /**
   * The organisation or show a name is publicly associated with, **only where
   * the client supplied it**. Rendered as a quiet second line, never as a
   * claim about what Mishram did with them.
   */
  context?: string;
  /**
   * VERIFIED public Instagram handle, without the `@`. Optional, and **absent
   * is a real state, not a gap** — a name with no handle renders as a name,
   * never as a dead link, a disabled control or a "coming soon".
   *
   * A handle is set only where **two independent sources agree**: the client
   * supplied it, and the live official account's own display name, bio or
   * verified linkage corroborates the same person. `WORKED_WITH_UNVERIFIED`
   * records each one that did not resolve.
   */
  instagram?: string;
  /**
   * Sets this name at display scale above the index. **Reading emphasis, not a
   * tier and not a ranking** — the same editorial device the brand rail uses
   * (`priority: featured`), applied for the same reason: a long list needs a
   * way in. Nothing about audience size, fee or importance is implied.
   */
  lead?: boolean;
  /**
   * DEVELOPMENT ONLY — the reason a confirmed relationship is not rendered.
   * Set it and the row disappears from the index entirely. **The string is
   * never shown on the page.** It exists for the client's call on Shadab
   * Jakati (see `WORKED_WITH_UNVERIFIED`); nothing sets it. **Do not set it
   * without an instruction.**
   */
  withheld?: string;
};

/**
 * `@handle` → the profile it points at. Derived so the rendered handle and the
 * href are the same string by construction.
 */
export function workedWithUrl(instagram: string): string {
  return `https://www.instagram.com/${instagram}/`;
}

/**
 * Render order — **the client's, Revision 42.** "Move Sagar Rathee to the up,
 * Purav Jha to the up, Fukra Insaan to the top": the three lead the index at
 * display scale, then the two organisations the client named on the stage
 * ranking, then the four creators who moved down off the stage, then the rest
 * in the order the list arrived. **Reading order, not a ranking.**
 *
 * Ali Fazal, Akash Sagar and Lovekesh Kataria are on the image-backed stage,
 * so `WORKED_WITH_INDEX` filters them out on its own. They stay here because
 * this array is the client's relationship list, not the render list.
 */
export const WORKED_WITH: readonly WorkedWith[] = [
  { name: "Fukra Insaan", instagram: "fukra_insaan", lead: true },
  // No still exists anywhere in the library — `.MOV` only. Type is the honest
  // form until one arrives (§10af).
  { name: "Purav Jha", instagram: "puravjha", lead: true },
  { name: "Sagar Rathee", instagram: "dr.69___", lead: true },
  // No handle — see `WORKED_WITH_UNVERIFIED`. The client named "JJ
  // Communication" separately on the stage ranking; it is this relationship's
  // organisation, and the one photograph of it stays blocked (OPPO in frame).
  { name: "Manish Jain", context: "JJ Communications" },
  {
    // The client supplied "Shalu Nisha Podcast". Normalised to the show's own
    // published spelling — its YouTube channel, website and Instagram all read
    // `Shallu Nisha Podcast`, and the handle links to that channel.
    name: "Mukesh Jain",
    context: "Shallu Nisha Podcast",
    instagram: "mj.mukesh.jain",
  },
  // ── Moved down from the stage in Revision 42, at the client's request ──
  { name: "Nikita Kumawat", instagram: "iamnikitakumawat" },
  { name: "Vishnu Priya", instagram: "vishnupriyaaofficial" },
  // Zoya Jaan and Mukul Sharma were never on the client's August 2026 list;
  // "Zoya and the others which are removed from there — move them to here"
  // (Revision 42) is the instruction that adds them. No verified handle for
  // either (§10b), so both render as names.
  { name: "Zoya Jaan" },
  { name: "Mukul Sharma" },
  // ── The rest, in the order the client's list arrived ───────────────────
  { name: "Ali Fazal", instagram: "alifazal9" },
  { name: "Lovekesh Kataria", instagram: "corrupt_tuber" },
  { name: "Sahil Gambhir", instagram: "sahilgambhir_" },
  { name: "Vibhu Varshney", instagram: "dilsepaneer" },
  { name: "Allen Chaudhary" },
  { name: "Anubhav Golia", context: "BB Prank", instagram: "anubhav_golia" },
  { name: "Shadab Jakati" },
  { name: "Shubham Kochale" },
  { name: "Sahida Ansari", instagram: "sahida__ansari" },
  { name: "Famous Ram" },
  { name: "Deepankar", instagram: "deepankarmaxx" },
];

/**
 * DEVELOPMENT ONLY — never rendered.
 *
 * **The searches that did not resolve, and exactly what blocked each one.**
 * Every person here **keeps their row in the index**. The relationship is
 * user-confirmed; only the profile link is missing, and a missing link is
 * absent rather than faked (§18).
 */
export const WORKED_WITH_UNVERIFIED: readonly {
  name: string;
  candidates: string;
  blocked: string;
}[] = [
  {
    name: "Allen Chaudhary",
    candidates: "@allen_choudhary, @allenchoudhary",
    blocked:
      "Two live accounts under the same name with very different followings, and every public " +
      "source spells the surname 'Choudhary' rather than the 'Chaudhary' the client supplied. " +
      "Nothing distinguishes which account the relationship is with.",
  },
  {
    name: "Manish Jain",
    candidates:
      "@jj_mobile_world, @jj_communications_dellhi, @jj_communications_dellh, @manishjain644, " +
      "@jjcommunication83, @jj_communication_____shop, @jj_mobiles_worldd_",
    blocked:
      "Seven-plus accounts all presenting as 'Manish Jain (JJ Communication)', including pairs " +
      "differing by a single character — the signature of copycat accounts. Follower figures " +
      "reported between 8K and 37M. Picking one would be a coin toss on a live client site.",
  },
  {
    name: "Shadab Jakati",
    candidates: "none established",
    blocked:
      "No reliable source identifies his Instagram handle; coverage is all news articles about " +
      "the viral clip. SEPARATELY, AND MORE IMPORTANTLY: national outlets report an arrest in " +
      "2026 over a reel involving a minor, with a police complaint filed. This is flagged for the " +
      "client's decision — the name is published because the client confirmed the relationship, " +
      "but it should be reviewed before any outreach campaign uses this page.",
  },
  {
    name: "Shubham Kochale",
    candidates:
      "@shubhamkochale, @shubhamkochaleshortvideo123, @shubhamkochaleshortsvideo123, " +
      "@shubhamkochaleshortsvideo124, @shubhamkochalefinancevechle124",
    blocked:
      "Five accounts under the same name, four of them near-identical numbered variants. No " +
      "public source identifies a primary account.",
  },
  {
    name: "Famous Ram",
    candidates: "@famous_ram",
    blocked:
      "The handle matches the supplied name exactly and the account is verified, but its own " +
      "display name is 'NunnaRamesh' and the content is Telugu-language — nothing corroborates " +
      "that this is the person the client means, and several other 'Ram' creators exist. " +
      "One word from the client closes this.",
  },
  {
    name: "Zoya Jaan / Mukul Sharma",
    candidates: "§10b: @zoya__jaan_, @zoya.__jaan.8 / @iammukulsharma",
    blocked:
      "Neither is on the client's confirmed handle list, and §10b found two conflicting accounts " +
      "for one and nothing distinguishing for the other. Both render as names.",
  },
  {
    name: "Kaka",
    candidates: "none supplied",
    blocked:
      "The client named him and supplied the photograph; no handle arrived with either, and a " +
      "mononym is exactly the case a name match cannot resolve. Renders as a name on the stage.",
  },
];

/** DEVELOPMENT ONLY — never rendered. */
export const WORKED_WITH_SOURCE =
  "user-confirmed: 2026-08 creator relationships; ranking and additions from the client's " +
  "explaining video, 2026-09-06";

/**
 * DEVELOPMENT ONLY — never rendered. Where the handles above came from.
 */
export const WORKED_WITH_PROFILE_SOURCE =
  "Revision 17B, August 2026. Each handle was seeded by the client and then confirmed against the " +
  "live official account — display name, bio, or a stated linkage between the account and the " +
  "organisation the client named. No follower count, engagement figure or third-party profile " +
  "statistic was taken from any of them, and no aggregator site was used as evidence of identity.";

/**
 * Loose name equality, for the one job of not printing somebody twice.
 *
 * Case, punctuation and interior vowels are all dropped, so `Lovkesh Kataria`
 * and `Lovekesh Kataria` collapse to the same key. **Deliberately not used for
 * anything else** — it is far too lossy to be an identity check, and identity
 * on this project never comes from a string comparison.
 */
function nameKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, "").replace(/[aeiou]/g, "");
}

const STAGE_KEYS = new Set(STAGE.map((c) => nameKey(c.name)));

/**
 * EVERY CONFIRMED RELATIONSHIP THAT IS **NOT** ALREADY ON THE STAGE ABOVE.
 *
 * The index is headed "Also worked with": printing a stage creator again a few
 * hundred pixels below their own portrait reads as an error. Derived against
 * `STAGE` (not `ROSTER`, from Revision 42) so a creator who leaves the stage
 * joins the index on their own — which is exactly what happened to Nikita
 * Kumawat and Vishnu Priya this revision, with no second edit.
 */
const WORKED_WITH_OFF_STAGE: readonly WorkedWith[] = WORKED_WITH.filter(
  (p) => !p.withheld && !STAGE_KEYS.has(nameKey(p.name)),
);

/**
 * The names the section sets at display scale above the index — the three the
 * client asked to move "to the top". **Reading emphasis, not a tier.** Derived
 * from the same array as the index, so a lead can never be printed twice or go
 * missing: `WORKED_WITH_LEAD` and `WORKED_WITH_INDEX` partition
 * `WORKED_WITH_OFF_STAGE` between them.
 */
export const WORKED_WITH_LEAD: readonly WorkedWith[] =
  WORKED_WITH_OFF_STAGE.filter((p) => p.lead);

/** The index proper — everything off the stage that is not a lead. */
export const WORKED_WITH_INDEX: readonly WorkedWith[] =
  WORKED_WITH_OFF_STAGE.filter((p) => !p.lead);
