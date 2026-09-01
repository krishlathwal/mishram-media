/**
 * CURRENT MANAGEMENT — the one creator Mishram Media manages today.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY THIS IS ITS OWN CHAPTER RATHER THAN A SIXTH ROW IN §03
 *
 * `03 / Creators` is a **worked-with** roster: relationships the agency can
 * evidence, none of which it claims to own. Management is a different and
 * much stronger claim, and burying the only one the project can make inside a
 * list of five historical collaborations would have thrown it away. So this
 * is a short, high, unnumbered interlude — directly after the brand rail,
 * before `02 / What We Do` — where an outreach recipient meets it in the first
 * two screens.
 *
 * **Unnumbered on purpose.** Like the Mishram Difference, Client Notes and
 * Project Inquiry, it carries a short teal rule instead of a chapter index, so
 * `02 / What We Do`, `03 / Creators` and `ABOUT_CHAPTER` all keep their
 * numbering and nothing downstream had to be renumbered.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * THE RELATIONSHIP, and the evidence for it — a chain, not an assertion:
 *
 * 1. The client confirmed it directly, twice: Mishram Media currently manages
 *    this profile (Revisions 16 and 17).
 * 2. `@xbhandesiri_`'s own public bio reads "Managed by - @filmybande".
 * 3. `@filmybande` is publicly "Prashant mishra", bio "Talent Management",
 *    carrying a `mishram.media` story highlight — and it is the account the
 *    client supplied in Revision 16 as Mishram's public contact Instagram.
 * 4. Prashant Mishra is named **Founder & Chief Marketing Officer** of
 *    Mishram.Media in the old site's schema.org `employee` array.
 *
 * WHAT THIS CHAPTER MUST NEVER SAY, and every one of these is a
 * content-integrity constraint rather than a style preference:
 *
 * - **No metric of any kind.** No follower count, growth figure, view average,
 *   reel count, retention percentage or projection. The library the client
 *   supplied in Revision 17 contains **zero analytics screenshots** — the whole
 *   of `F:\Drive data` was searched — so every figure discussed for this
 *   section remains unevidenced and unpublished. See `metrics` below.
 * - **Never "exclusive", "signed" or "under contract".** The evidence supports
 *   *manages*. It does not describe the terms, and the terms are not the
 *   project's to characterise.
 * - **No claim about what the management produced.** Managing a creator and
 *   causing their growth are different statements.
 */

export type ManagementMetric = {
  /** Rounded, human label — never a raw count. */
  value: string;
  label: string;
  /** DEVELOPMENT ONLY. What evidence supports this, and where it lives. */
  source: string;
};

export const MANAGEMENT = {
  label: "Current Management",
  name: "Akash Sagar",
  handle: "@xbhandesiri_",
  instagram: "https://instagram.com/xbhandesiri_",
  /**
   * The relationship, stated once. It names only what the client confirmed
   * Mishram actually handles — **the handle is set above the statement, so it
   * is deliberately not repeated inside it.**
   */
  statement:
    "Mishram Media currently manages Akash Sagar across creator strategy, brand opportunities and the development of his short-form presence.",
  cta: "View Instagram",

  /**
   * WHAT MISHRAM HANDLES — three items, and every one is lifted straight out
   * of `statement` above rather than added to it.
   *
   * `statement` is the client-confirmed sentence: *creator strategy, brand
   * opportunities and the development of his short-form presence*. This rail
   * is that sentence as a scannable index, so a brand visitor reads the scope
   * in a second without the section growing a paragraph.
   *
   * **Nothing was invented to round it to four.** Campaign coordination,
   * content direction, payment handling and legal representation were all
   * considered and all rejected: the deck describes those as things Mishram
   * does on *campaigns*, which is a different claim from what it does for
   * *this creator*. Add an item only when the client confirms that item.
   *
   * It is scope, never performance. No figure belongs in this array.
   */
  scope: [
    "Creator strategy",
    "Brand opportunities",
    "Short-form growth",
  ] as readonly string[],

  /** Names the photograph for what it is, so it is never read as a portrait. */
  frameCaption: "Working relationship",
  /**
   * The identity plate's own eyebrow. It names what the small image actually
   * is — the account's published profile picture — so the avatar is never
   * mistaken for commissioned photography. See `MANAGEMENT_AVATAR`.
   */
  plateLabel: "Official profile",
  /** Small factual mark under the plate. Relationship, not a claim about work. */
  plateNote: "Creator — currently managed",

  /**
   * METRICS — POPULATED IN REVISION 33, AND ONLY FROM ONE SCREENSHOT.
   *
   * This array was empty for five revisions with the note: *"A figure needs a
   * dated screenshot tied unambiguously to this account before it goes here,
   * and `source` has to say which one."* **That screenshot now exists**, and
   * the bar it was held against is exactly the bar it cleared.
   *
   * `MANAGEMENT_PROOF` below is a capture of `@xbhandesiri_`'s own Reels grid,
   * embedded in Mishram's brand-collaboration proposal. **Every figure here is
   * read off that one frame**, which also renders beside them — so a visitor
   * sees the number and the thing it came from at the same time.
   *
   * WHAT THESE FIGURES ARE NOT, and each of these is a content-integrity
   * constraint rather than caution:
   *
   * - **Not an average.** They are three individual Reels' view counts.
   * - **Not a total, a monthly figure or a 30-day window.** The screenshot
   *   establishes none of those and the labels claim none of them.
   * - **Not a Mishram result.** Managing a creator and causing a view count
   *   are different statements, and only the first is evidenced.
   * - **Not follower growth, retention, engagement rate or a projection.**
   *   None of those appears in the screenshot, so none appears here. The
   *   figures discussed in planning — 30M average, 800K growth, a 100K
   *   starting point, 1B dashboard totals, 35% retention — remain
   *   **unevidenced and unpublished**.
   *
   * **Three, not nine.** The screenshot shows nine tiles; publishing all nine
   * as type would turn the chapter into the dashboard §10t refused. Three is
   * enough to establish the order of magnitude, and the frame beside them
   * carries the rest.
   */
  metrics: [
    {
      value: "70.9M",
      label: "Reel views",
      source: "visible in MANAGEMENT_PROOF — row 3, tile 1",
    },
    {
      value: "40.3M",
      label: "Reel views",
      source: "visible in MANAGEMENT_PROOF — row 2, tile 1",
    },
    {
      value: "33.9M",
      label: "Reel views",
      source: "visible in MANAGEMENT_PROOF — row 2, tile 2",
    },
  ] as readonly ManagementMetric[],

  /** The inset's own label and its one line of public attribution. */
  proofLabel: "Selected Reel views",
  /**
   * Rendered on the page. It says exactly what the reader is looking at and
   * nothing more — no result, no attribution to Mishram, no timeframe.
   */
  proofNote:
    "Reel view counts visible on the @xbhandesiri_ account, captured in Mishram Media's own brand-collaboration deck.",

  /** DEVELOPMENT ONLY — never rendered. */
  source: "user-confirmed: 2026-08 current management relationship",
} as const;

export type ManagementFrame = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THE MEDIA — REVISION 17 IMAGE ASSOCIATION REVOKED BY THE USER (17B)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Revision 17 published two large photographs here, cropped from
 * `…\AKASH COVER PHOTO\IMG_2189.jpg` and `IMG_2190.jpg`. The folder named
 * Akash and the client had named the files, which is why they cleared the
 * audit's identity bar.
 *
 * **The user has since stated plainly that those images are not Akash Sagar.**
 * A first-party correction outranks a folder name, so:
 *
 * - `akash-sagar-xbhandesiri-primary.webp` and `-secondary.webp` are **deleted
 *   from `public/`**. The Drive originals are untouched; the audit keeps the
 *   record under `REVISION 17 IMAGE ASSOCIATION REVOKED BY USER`.
 * - `IMG_2188/2189/2190.jpg` must **never** represent Akash Sagar again, in any
 *   crop, at any size, on any surface.
 * - `F:\Drive data` was re-searched for `akash`, `sagar`, `bhande`,
 *   `xbhandesiri` and for folders added since. **There is no other
 *   Mishram-owned photograph of him in the library.**
 *
 * WHAT REPLACED IT, and why it is small on purpose.
 *
 * The **only** image this project can now trace to Akash Sagar is the profile
 * picture served by the exact official account, `@xbhandesiri_` — whose own
 * display name is "Akash Sagar" and whose bio reads "Managed by
 * - @filmybande", the account §10s published as Mishram's public Instagram.
 * Instagram serves it at **150×150 and nothing larger** (every larger `stp`
 * variant is refused: the URL signature covers that parameter).
 *
 * So it is used **as an avatar, at avatar size** — 72px, inside its own source
 * resolution even at 2× DPR. **It is never upscaled into a photograph**, and
 * the chapter's media treatment was rebuilt around type instead of around a
 * portrait. A correct small image beats a wrong large one, and the composition
 * being temporarily less photographic is the honest state of the evidence.
 *
 * **The unblock is one file.** Supply a Mishram-owned photograph of Akash with
 * explicit identity and this goes back to a full portrait composition — the
 * `.mgt-plate` treatment is one block in `CurrentManagement.tsx`, not a
 * redesign of the chapter.
 */
/**
 * ─────────────────────────────────────────────────────────────────────────
 * THE UNBLOCK ARRIVED — REVISION 30
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The note above ends: *"The unblock is one file. Supply a Mishram-owned
 * photograph of Akash with explicit identity and this goes back to a full
 * portrait composition."* **That file now exists**, and this is it.
 *
 * Source: `F:\Drive data\WEBSITE SHORTLIST\Akash sagar 1st.jpeg`, a
 * client-labelled first-party photograph. **The filename is the identity
 * evidence** — no face was matched, and §18 rule 7 is untouched. It is the
 * *second* Akash frame the client supplied: Revision 28 gave the Hero the
 * cleaner portrait frame and **deliberately reserved this one**, because it is
 * the relational photograph and this is the chapter that argues a
 * relationship. The Hero looks like proof; this has to *be* it.
 *
 * **TWO FIGURES, AND BOTH STAY.** §10u again: the label says Akash Sagar is
 * *in* the frame, not which figure he is, so cropping to a solo portrait would
 * assert something unverified — and would also throw away the arm-around-the-
 * shoulder gesture that makes the photograph evidence rather than decoration.
 *
 * The crop was chosen by testing, not assumed: 5:4 and 16:10 both cut heads
 * off, 1:1 held the pair well, and **3:4 held them largest with headroom
 * intact**, which is what a dominant left column wants. Extracted from
 * `{ left: 624, top: 666, width: 1934, height: 2579 }` of the rotated
 * original, then fitted — the original is never modified.
 *
 * **The avatar below is not replaced by this.** They carry different
 * provenance and both are worth having: this photograph is identified by the
 * client's own label, the avatar is identified by the official account itself.
 * The photograph now carries the composition and the avatar became the byline
 * beside the handle — a verification mark rather than the graphic.
 */
export const MANAGEMENT_FRAME = {
  src: "/media/management/akash-sagar-current-management.webp",
  alt: "Akash Sagar photographed with Mishram Media during current management work",
  width: 960,
  height: 1280,
} as const satisfies ManagementFrame;

/** DEVELOPMENT ONLY — never rendered. */
export const MANAGEMENT_FRAME_SOURCE =
  "F:\\Drive data\\WEBSITE SHORTLIST\\Akash sagar 1st.jpeg — client-labelled, first-party. " +
  "Reserved for this chapter by the Revision 28 media ledger; the Hero uses a different file " +
  "(Akash sagar.jpeg) and 'Akash sagar 2nd.jpeg' stays held on resolution and third-party signage.";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THE REEL-PERFORMANCE SCREENSHOT — REVISION 33
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The chapter's third provenance, and the one that took longest to arrive.
 * The photograph is identified by the client's own filename; the avatar by the
 * account itself; **this is identified by nothing but its own visible UI**, and
 * that is what makes it usable as evidence.
 *
 * SOURCE. An image embedded in Mishram's brand-collaboration proposal
 * (`WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf`, page 3 — a 716×1600 capture) —
 * first-party material, not a repost, not a third-party statistics site, not
 * a recreation. Extracted from the PDF directly rather than photographed off a
 * screen, so nothing is resampled twice.
 *
 * WHY *THIS* CAPTURE, AND NOT THE ONE WITH THE BIGGER NUMBERS. The deck holds
 * four captures of this account's Reels grid. One of them — a tighter crop —
 * shows **139M, 111M and 70.9M**, which are far stronger figures. **It carries
 * no account header**, so it proves a set of view counts without proving whose
 * they are, and a figure whose account cannot be seen is exactly the class of
 * evidence §18 rule 7 rejects.
 *
 * The capture used here shows, in one uncropped frame: the back arrow, the
 * handle **`xbhandesiri_`**, the verified badge, the profile tabs with **Reels
 * active**, and nine tiles each carrying Instagram's own eye icon and view
 * count. **Account, metric type and figures are all established by the same
 * image.** The strongest figure it carries is 70.9M, and taking 70.9M with
 * provenance over 139M without it is the whole decision.
 *
 * THE CROP. `{ left: 0, top: 85, width: 716, height: 1215 }` of the extracted
 * original, which removes **only the phone's status bar** — clock, battery
 * percentage and notification icons, none of which is evidence and one of
 * which is personal. Nothing else was touched: **no figure altered, no label
 * added, no interface redrawn, no tile removed, no recolouring.** The frame
 * below the crop is the account's next row, cut by the grid rather than by a
 * decision about which numbers to show.
 */
export const MANAGEMENT_PROOF = {
  src: "/media/proof/xbhandesiri-reel-performance.webp",
  alt: "Screenshot of the Instagram profile @xbhandesiri_ with the Reels tab open, showing nine Reels with view counts from 7.6M to 70.9M",
  width: 560,
  height: 950,
} as const satisfies ManagementFrame;

/** DEVELOPMENT ONLY — never rendered. */
export const MANAGEMENT_PROOF_SOURCE =
  "F:\\Drive data\\WEBSITE SHORTLIST\\PROPOSAL - PDF (1).pdf — embedded image on page 3, " +
  "716x1600, extracted from the PDF's own JPEG stream. Cropped to { 0, 85, 716x1215 } to drop " +
  "the phone status bar only, then resized to 560 wide (a downscale; nothing is upscaled). " +
  "A second deck capture shows 139M / 111M / 70.9M but carries no account header and is " +
  "therefore NOT used — see the note above.";

export const MANAGEMENT_AVATAR = {
  src: "/media/creators/akash-sagar/akash-sagar-xbhandesiri-avatar.webp",
  alt: "Profile picture of Akash Sagar from his official Instagram account @xbhandesiri_",
  width: 150,
  height: 150,
} as const satisfies ManagementFrame;

/**
 * DEVELOPMENT ONLY — never rendered. The provenance chain for the file above,
 * written down because an avatar taken from a live account is the one asset
 * class on this site that cannot be re-derived from the repository.
 */
export const MANAGEMENT_AVATAR_SOURCE =
  "official public profile: https://www.instagram.com/xbhandesiri_/ — display name 'Akash Sagar', " +
  "bio 'Managed by - @filmybande'. Profile image fetched from the account's own CDN URL at its " +
  "maximum published size (150x150); no larger variant is served. Not a search result, not a fan " +
  "page, not a news photograph, not identified by face.";

/**
 * DEVELOPMENT ONLY — never rendered. What must not come back.
 */
export const MANAGEMENT_REVOKED_MEDIA = {
  files: [
    "IMG_2188.jpg",
    "IMG_2189.jpg",
    "IMG_2190.jpg",
    "akash-sagar-xbhandesiri-primary.webp",
    "akash-sagar-xbhandesiri-secondary.webp",
  ],
  reason:
    "REVISION 17 IMAGE ASSOCIATION REVOKED BY USER — the user states these do not depict Akash Sagar. " +
    "Held in docs/MEDIA-ASSET-AUDIT.md as history only. Never republish them as Akash Sagar.",
} as const;
