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
   * The identity plate's own eyebrow. It names what the small image actually
   * is — the account's published profile picture — so the avatar is never
   * mistaken for commissioned photography. See `MANAGEMENT_AVATAR`.
   */
  plateLabel: "Official profile",
  /** Small factual mark under the plate. Relationship, not a claim about work. */
  plateNote: "Creator — currently managed",

  /**
   * METRICS — EMPTY, AND THE SECTION RENDERS NOTHING FOR THEM.
   *
   * The architecture is here so verified figures can appear from config
   * without touching the component: fill this array and the row appears,
   * leave it empty and **there is no empty box, no dash, no "coming soon"** —
   * the same self-suppressing pattern §06 Recognition and Client Notes use.
   *
   * **Do not populate it from the numbers discussed in planning.** Follower
   * growth, average reel views, total reels, retention and any projection are
   * all unevidenced: Revision 17 searched the entire supplied media library
   * and found no analytics screenshot, insights export or dashboard capture of
   * any kind. A figure needs a dated screenshot tied unambiguously to this
   * account before it goes here, and `source` has to say which one.
   */
  metrics: [] as readonly ManagementMetric[],

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
