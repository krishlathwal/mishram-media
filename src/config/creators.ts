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
   * Unset for Zoya Jaan and Mukul Sharma — neither is on the client's
   * confirmed handle list and §10b's candidates for both remain ambiguous.
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
    // back to the default, which is what keeps the five tuned crops exact.
    zoom: frame?.zoom ?? (frame ? 1 : FALLBACK_ZOOM[kind]),
    origin: frame?.origin ?? position,
  };
}

export const CREATORS: readonly Creator[] = [
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * ALI FAZAL — the roster's opening slot, from Revision 17B.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * IDENTITY. The user supplied and explicitly labelled the source file
   * (`F:\Drive data\ali fazal.jpeg`). **The filename is the identity
   * evidence**, exactly as the folder name was for the Current Management
   * chapter — no face was compared, here or anywhere. The handle below was
   * then verified independently against the live official account.
   *
   * RELATIONSHIP. `Worked With`, and nothing stronger. He is **not** managed,
   * represented, signed or exclusive to Mishram Media; the one management
   * relationship the project can evidence has its own chapter. The `label`
   * field is per-creator precisely so this can be exact without relabelling
   * anyone else (§18 — *"do not relabel the other five"*).
   *
   * WHY HE OPENS THE SECTION. §10b gave the opening slot to Zoya. The user
   * has since asked for Ali Fazal to carry the strongest visual priority in
   * the creator proof, and the opening slot is what that means here: it is the
   * creator the stage shows first and the one image the section mounts on
   * load. Editorial priority, not a ranking — nothing on the page numbers the
   * roster by importance.
   *
   * THE PHOTOGRAPH is a **relationship frame, not a portrait**: two figures,
   * on location. **The crop keeps both of them in every format**, which is the
   * rule §10b already settled on the other two-person frame in this roster —
   * the project records that Ali Fazal is *in* this photograph, not which
   * figure he is, so isolating one would assert something unverified.
   */
  {
    id: "ali-fazal",
    name: "Ali Fazal",
    alt: "Ali Fazal photographed with Mishram Media",
    label: "Worked With",
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
      // The three frames have to be small / mid / large of genuinely different
      // crops, not one crop at three sizes — the failure §10b records about
      // Mukul. With a two-person frame the lever is zoom rather than pan, so
      // the reel goes properly close and the content stays gentle.
      // A 9:16 frame can only show ~43% of a 3:4 source's width at this zoom,
      // so the horizontal position is what decides whether both faces survive
      // it. Pulled left to 46%: at 50% the window's left edge landed exactly on
      // one of the two heads and bisected it, which starts to read as isolating
      // one figure — the thing this crop must not do.
      reel: { position: "46% 20%", zoom: 1.7, origin: "46% 20%" },
      content: { position: "50% 26%", zoom: 1.12, origin: "50% 22%" },
    },
  },
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
   * AKASH SAGAR — **PUBLISHED IN REVISION 17, AND DELIBERATELY NOT HERE.**
   * ─────────────────────────────────────────────────────────────────────────
   *
   * The photograph blocker is closed: the client's media library supplied
   * approved, identified photography and he now has **his own Current
   * Management chapter** high on the homepage — see `config/management.ts` and
   * §10t of the brief.
   *
   * **`published: false` stays, and it is now a decision rather than a
   * blocker.** This roster is a *worked-with* list; management is a materially
   * bigger claim with its own chapter. Publishing him in both would duplicate
   * the same portrait on one page and blur exactly the distinction the two
   * layers exist to draw — the brief's instruction was "do not simply make
   * Akash creator #06".
   *
   * The record stays here because the fields below are verified and because
   * `WORKED_WITH_INDEX` filters against `ROSTER`: if a later revision does
   * decide he belongs on the stage, flipping this boolean adds him **and**
   * removes him from the index automatically, with no second edit.
   *
   * WHY HE SITS SECOND IN THIS ARRAY. He is the only creator on it the agency
   * *currently manages*, so appending him below five historical "worked with"
   * relationships would bury the strongest one if he were ever published here.
   * Zoya keeps the opening slot deliberately — she is the creator the section
   * opens on, the single image that loads first (§10b-scale), and §10d's
   * featured work item.
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
   * THE IMAGE — **the blocker that closed.** Revision 13 recorded that the
   * only asset anywhere was a 150×150 avatar, roughly 7% of the pixels this
   * section needs, and that stock, a scraped substitute, a fan-page crop and a
   * generated portrait were all ruled out (§1) with hotlinking ruled out twice
   * over (§14). Revision 17's media library resolved it: two approved,
   * identified photographs, cropped and shipped as
   * `public/media/creators/akash-sagar/*`.
   *
   * **`media.portrait.src` below still names a file that does not exist**, and
   * that is intentional rather than an oversight. It is never requested while
   * `published` is false, and it records the shape this roster would need if he
   * were ever added to the *stage* — a 3:4 portrait cropped for the cascade,
   * which is a different asset from the two the Current Management chapter
   * uses. **Do not flip `published` without producing that file first**, or
   * Next/Image will 404.
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
    // VERIFIED IN REVISION 17B, and it resolves §10b's four-account problem
    // rather than guessing past it: the client supplied this handle, the live
    // account's display name is "Nikita Kumawat (Bullet Rani)", and its own
    // bio names `@imnikkskumawat` as the personal account — which is what §10b
    // could not distinguish. `followers` stays unset; the handle is a
    // destination, the figure would be a claim.
    instagram: "iamnikitakumawat",
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
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * LOVEKESH KATARIA — imagery upgraded and the spelling normalised (17B).
   * ─────────────────────────────────────────────────────────────────────────
   *
   * **The name is now `Lovekesh`, with the middle `e`.** Revision 17 left two
   * spellings standing — `Lovkesh` on this roster because that is what the
   * approved asset shipped under, and `Lovekesh` in the worked-with index
   * because that is the client's spelling and every public source's. The user
   * has now asked for one canonical public spelling, and the verification pass
   * settled which: the live official account `@corrupt_tuber` carries the
   * display name **"Lovekesh Kataria"**. One person, one spelling, everywhere.
   *
   * **`id` deliberately stays `lovkesh`.** It is an internal key, not public
   * text, and eight other compositions across the homepage and two service
   * routes look this creator up by it. Renaming the key would be a rename with
   * no reader-facing benefit and eight chances to break something.
   *
   * THE PHOTOGRAPH IS NEW. The user supplied and explicitly labelled
   * `F:\Drive data\Lovekesh Kataria.jpeg` — 6048x8064 after orientation, an
   * interior relationship frame. It replaces the 720x720 awards-evening file,
   * which had no resolution headroom left at the size this stage renders. The
   * old file is **not deleted**: `config/hero.ts` still uses it and the Hero is
   * locked (§05).
   *
   * **Both figures are kept in every format, as before** — the reason is
   * unchanged and now applies to a second photograph: the project records that
   * Lovekesh Kataria is *in* the frame, not which figure he is.
   */
  {
    id: "lovkesh",
    name: "Lovekesh Kataria",
    alt: "Lovekesh Kataria photographed with Mishram Media",
    label: "Creator Network",
    instagram: "corrupt_tuber",
    // 3800x5067 of the 6048x8064 rotated source, output 1000x1333 — the
    // portrait frame's own 3:4, so the crop is what renders. That is why the
    // 1.25x lift the 1:1 source needed is gone: there is no square ceiling to
    // trim any more, and keeping the zoom would have thrown away the headroom
    // the new crop was composed with.
    media: {
      // The vertical position is **14%, not 50%, and it does nothing at all on
      // the homepage** — this file and the stage's portrait frame share a 3:4
      // aspect, so there is no overflow for `object-position` to move. It
      // exists for the two 16:9 frames on `/services/brand-shoots-content`,
      // which crop a 3:4 source to a 42% band: at 50% that band landed below
      // both heads and rendered as a torso strip. Set here rather than on those
      // frames because the crop is a fact about this photograph.
      portrait: {
        src: "/media/creators/featured/lovekesh-kataria.webp",
        position: "50% 14%",
      },
      // Same small / mid / large discipline as Ali's, one step lower in the
      // frame throughout because the heads sit deeper here — there is a
      // corridor ceiling above them.
      reel: { position: "50% 24%", zoom: 1.95, origin: "50% 24%" },
      content: { position: "50% 30%", zoom: 1.15, origin: "50% 26%" },
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
    // VERIFIED IN REVISION 17B. Client-supplied handle, and the live account's
    // display name is "Vishnu Priya". §10b rejected `@vishnupriyaaa` because
    // nothing tied it to this name; this one is a different account and the
    // tie is first-party. `followers` stays unset.
    instagram: "vishnupriyaaofficial",
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
  // "Creators" alone stopped being accurate in Revision 17B: Ali Fazal is an
  // actor, not a content creator, and describing him as one on a live site
  // would misstate who he is. The wording now matches the worked-with index's
  // own note, which already had to say this.
  lead: "Creators, actors and personalities we've worked with, managed and built alongside.",
  /**
   * Roster header. The number beside it is `ROSTER.length` — it counts the
   * people actually on this page and nothing else. **Not** "network size":
   * Mishram's real network is larger than what is configured here and that
   * figure is not verified, so the page must never imply it.
   *
   * It reads `Featured` rather than `Selected Creators` from Revision 17B, for
   * the same reason the lead changed: this is now the image-backed layer of a
   * two-layer chapter, and not everyone on it is a creator.
   */
  rosterLabel: "Featured",
  cta: "Work with our creator network",
  /** Format captions on the supporting frames — descriptive, not claimed work. */
  formats: { reel: "Reel / 9:16", content: "Content / 4:5" },

  /**
   * The worked-with index's own heading and its one clarifying line.
   *
   * **The second sentence arrived in Revision 33**, and it is what is left of
   * the two scale facts this chapter used to set at display scale. Those
   * figures now live once, on the homepage proof band; the job they were also
   * doing — saying that a page of eighteen names is not the whole network —
   * is done here, in words, inside a note that already existed.
   *
   * Folding it in rather than giving it its own labelled block was deliberate:
   * a second caps-label-plus-prose row directly above this one read as the
   * same statement made twice in the same shape. **No figure, no "over N".**
   */
  workedWithLabel: "Also worked with",
  workedWithNote:
    "Creators, actors and personalities Mishram Media has worked with on campaigns and content. The index is a selection — the working network is larger than the names shown here.",
  /**
   * The two names the index sets at display scale above the list. Reading
   * emphasis, not a tier — see `lead` on `WorkedWith`.
   */
  workedWithLeadLabel: "Selected",
  /**
   * `scaleLabel` and the two facts it introduced were removed in Revision 33.
   * The figures moved to `config/proof.ts` and render once, on the homepage
   * proof band; the sentence they were also carrying moved into
   * `workedWithNote` above. Nothing replaced the label, because a labelled
   * block of its own was the repetition.
   */
} as const;

/* ============================================================
   THE WORKED-WITH INDEX

   A **second layer** beside the image-backed stage above, and the reason it
   exists is content integrity rather than layout.

   The client confirmed eighteen further relationships in Revision 17. The
   media library supplied alongside them contains an approved, unambiguously
   identified photograph for **one** person — and identity there comes from an
   explicit folder name, never from what somebody looks like. Putting the other
   names on the stage would mean either guessing which photograph is whom, or
   shipping seventeen empty frames.

   So the names are published as **type**. An editorial index states the
   relationship exactly, needs no photograph to be honest, and is the same
   answer §10b already reached about follower counts: publish what is
   evidenced, in the form the evidence supports.

   **THE WORDING IS "WORKED WITH", AND IT IS LOAD-BEARING.** Not managed, not
   signed, not exclusive, not clients, not represented. Management is a
   materially bigger claim and the project can evidence exactly one of those —
   see `config/management.ts`. Do not upgrade this language without separate
   confirmation for each name.

   Deliberately absent, and none of these should appear: follower counts,
   audience sizes, niches, categories, tiers, rankings, campaign names, brand
   pairings, or any implication of order. `PROMINENT` below controls nothing
   but reading order.
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
   * ─────────────────────────────────────────────────────────────────────────
   * THE BAR, and it is the same one the rest of this project uses.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * A handle is set only where **two independent sources agree**:
   *
   * 1. the client supplied the handle for that name (first-party), **and**
   * 2. the live official account's own display name, bio or verified linkage
   *    corroborates the same person.
   *
   * The URL is derived rather than stored, so a handle and its link cannot
   * drift apart — see `workedWithUrl`.
   *
   * **A name matching is not evidence.** Where several accounts carry the same
   * name, or the account's own display name does not corroborate the name the
   * client supplied, the handle stays absent and the person keeps their row.
   * `WORKED_WITH_UNVERIFIED` records each one and what blocked it, so nobody
   * repeats the search.
   */
  instagram?: string;
  /**
   * Sets this name at display scale above the index. **Reading emphasis, not a
   * tier and not a ranking** — it is the same editorial device the brand rail
   * already uses (`priority: featured` in `config/collaborations.ts`), applied
   * for the same reason: a long list needs a way in.
   *
   * Nothing about audience size, fee or importance is implied or knowable
   * here, and no number appears anywhere in this section.
   */
  lead?: boolean;
};

/**
 * `@handle` → the profile it points at. Derived so the rendered handle and the
 * href are the same string by construction.
 */
export function workedWithUrl(instagram: string): string {
  return `https://www.instagram.com/${instagram}/`;
}

/**
 * Render order. The four the client named first lead, then the rest in the
 * order supplied. **This is reading order, not a ranking**, and nothing on the
 * page numbers these rows or implies a tier.
 */
export const WORKED_WITH: readonly WorkedWith[] = [
  // Ali Fazal and Lovekesh Kataria are both on the image-backed stage above as
  // of Revision 17B, so `WORKED_WITH_INDEX` filters them out of this list on
  // its own. They stay here because this array is the client's list as
  // supplied, not the render list.
  { name: "Ali Fazal", instagram: "alifazal9" },
  { name: "Fukra Insaan", instagram: "fukra_insaan", lead: true },
  { name: "Lovekesh Kataria", instagram: "corrupt_tuber" },
  { name: "Purav Jha", instagram: "puravjha", lead: true },
  { name: "Sahil Gambhir", instagram: "sahilgambhir_" },
  { name: "Vibhu Varshney", instagram: "dilsepaneer" },
  // No handle — see `WORKED_WITH_UNVERIFIED`.
  { name: "Allen Chaudhary" },
  { name: "Manish Jain", context: "JJ Communications" },
  {
    // The client supplied "Shalu Nisha Podcast". Normalised to the show's own
    // published spelling — its YouTube channel, website and Instagram all read
    // `Shallu Nisha Podcast`, and the handle above links to that channel. Same
    // rule §10s applied to the brand rail: spell an organisation the way the
    // organisation spells itself, not the way the list arrived.
    name: "Mukesh Jain",
    context: "Shallu Nisha Podcast",
    instagram: "mj.mukesh.jain",
  },
  { name: "Anubhav Golia", context: "BB Prank", instagram: "anubhav_golia" },
  { name: "Nikita Kumawat", instagram: "iamnikitakumawat" },
  { name: "Vishnu Priya", instagram: "vishnupriyaaofficial" },
  { name: "Sagar Rathee", instagram: "dr.69___" },
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
 * Written down for the same reason §10b wrote down its rejected follower
 * candidates: so the next session does not spend the time again, and so the
 * client can close any of these with one message.
 *
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
];

/**
 * DEVELOPMENT ONLY — never rendered.
 *
 * **THE SPELLING SPLIT IS CLOSED (Revision 17B).** Revision 17 carried
 * `Lovkesh Kataria` on the roster and `Lovekesh Kataria` here, each correct in
 * its own place. The verification pass settled it: the live official account
 * `@corrupt_tuber` publishes the display name **"Lovekesh Kataria"**, so that
 * is now the spelling in both lists and the only one the site renders.
 *
 * `nameKey` below stays regardless. It is what makes the de-duplication robust
 * against the next spelling difference rather than against this one.
 */
export const WORKED_WITH_SOURCE = "user-confirmed: 2026-08 creator relationships";

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

const ROSTER_KEYS = new Set(ROSTER.map((c) => nameKey(c.name)));

/**
 * EVERY CONFIRMED RELATIONSHIP THAT IS **NOT** ALREADY ON THE IMAGE-BACKED
 * STAGE ABOVE.
 *
 * The client's list includes people the roster shows with photography, and the
 * index is headed "Also worked with": printing them again a few hundred pixels
 * below their own portrait reads as an error rather than as emphasis.
 * `WORKED_WITH` keeps all eighteen because that is the list as supplied; this
 * is the subset the page needs.
 *
 * Derived, so publishing a roster creator later removes them from the index on
 * their own — **which is exactly what happened in Revision 17B**: Ali Fazal and
 * Lovekesh Kataria joined the stage and left this list without a second edit.
 */
const WORKED_WITH_OFF_STAGE: readonly WorkedWith[] = WORKED_WITH.filter(
  (p) => !ROSTER_KEYS.has(nameKey(p.name)),
);

/**
 * The two names the section sets at display scale above the index.
 *
 * **Reading emphasis, not a tier.** They are high-recognition relationships the
 * project has no first-party photograph of, so type is the only honest way to
 * give them weight — the alternative would be a portrait this project does not
 * have. Nothing about them is numbered, ranked or measured.
 *
 * Derived from the same array as the index, so a lead can never be printed
 * twice or go missing: `WORKED_WITH_LEAD` and `WORKED_WITH_INDEX` partition
 * `WORKED_WITH_OFF_STAGE` between them.
 */
export const WORKED_WITH_LEAD: readonly WorkedWith[] =
  WORKED_WITH_OFF_STAGE.filter((p) => p.lead);

/** The index proper — everything off the stage that is not a lead. */
export const WORKED_WITH_INDEX: readonly WorkedWith[] =
  WORKED_WITH_OFF_STAGE.filter((p) => !p.lead);

/* ============================================================
   SCALE — MOVED OUT OF THIS FILE IN REVISION 33

   This chapter used to set **500+ creators worked with** and **1,000+
   promotional videos** at display scale above the index. Both figures are
   still published; **they are published once, and not here.**

   Revision 33 gave the homepage a quick-scan proof band in its third screen
   (`config/proof.ts`, `components/proof/QuickProof.tsx`) carrying four facts —
   brands, creators, creator-led videos and single-Reel reach. Printing two of
   those four again, at display scale, six chapters further down turned the
   same evidence into what a reader would fairly read as more evidence. **The
   number of facts on the page did not change; the number of times two of them
   are stated did.**

   What stands in their place is one quiet line naming the same relationship in
   words — `CREATORS_COPY.scaleNote` — because a roster of eighteen names still
   needs saying that the real network is larger than the page.

   **`ScaleFact` and `CREATOR_SCALE` are deliberately gone rather than left
   exported and unused**, so nothing can re-render them by accident, and
   `config/proof.ts` is the only place a figure lives. The provenance for both
   went with them: the client's August 2026 confirmation is recorded on the
   `creators` and `videos` records there.
   ============================================================ */
