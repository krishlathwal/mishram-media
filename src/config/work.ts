/**
 * 05 / SELECTED WORK
 *
 * ════════════════════════════════════════════════════════════════════════════
 * REVISION 35 — THE CHAPTER FINALLY HAS REAL BRANDED WORK IN IT
 *
 * For five revisions this index carried three creator portraits relabelled as
 * work: `zoya-jaan.webp`, `mukul-sharma.webp`, `nikita-kumawat.webp`, each the
 * **same file already rendering in §03 Creators** and two of them in the Hero
 * as well. They were honestly labelled — `Still / 9:16`, no invented campaign
 * name, no fabricated result — but they proved that Mishram photographs
 * creators, not that it makes work for brands. On a chapter called *Selected
 * Work* that is the wrong claim to be able to make.
 *
 * **Two genuine branded-campaign frames now open it**, both first-party, both
 * carrying a legible brand that is already on this site's own collaborations
 * rail. See `WORK_ITEMS` for the provenance of each.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * ── THE VIDEO QUESTION, ANSWERED PROPERLY THIS TIME ───────────────────────
 *
 * The audit that used to head this file said *"no Mishram Media video of any
 * kind"*. §10t corrected that and it stays corrected: **video exists.** What
 * this revision adds is that the campaign-relevant video was audited frame by
 * frame rather than dismissed, and **no clip passes**:
 *
 * | Source | Finding |
 * | --- | --- |
 * | `PRASHANT VIDEO/Swiggy/IMG_3842.MOV` (5.7s, 4K, 9:16) | **Real Swiggy branding, and the still is better.** A handheld behind-the-scenes take of people crossing a room; as motion it reads as a phone video from a shoot day, not portfolio work |
 * | `PRASHANT VIDEO/Swiggy/IMG_3847.MOV`, `Funny edits/IMG_3818`, `IMG_3822` | Personal/vlog footage in public places. No brand, no campaign, identifiable private individuals |
 * | `REELS - MISHRAM/CREATIVE REEL - ALL/…` (16 folders) | Mishram's own in-house skits — *"asking for agency"*, *"WHERE IS OUR SOCIAL MEDIA MANAGER"*, *"100 followers"*. Agency self-promo, no brand, no campaign |
 * | `…/14th work load/final.mp4` | Still held on §10t's three grounds: office humour, burnt-in captions describing two employees as a couple, third-party banner |
 *
 * **NO SAFE VIDEO SELECTED**, and that is a result rather than a gap. A strong
 * still-based index beats the wrong clip, and the playback path in `WorkMedia`
 * remains fully built: `mediaType: "video"` plus `src` switches it on with no
 * component edit.
 *
 * ── WHAT IS NEVER CLAIMED HERE ────────────────────────────────────────────
 *
 * - **No campaign name, brief, date, deliverable count or creator list.** The
 *   sources establish a brand and a frame; they do not establish a project.
 * - **No Mishram role.** Nothing in the material says who did what, and
 *   "agencies usually do these things" is not evidence (§12).
 * - **Nobody is named.** These photographs carry no identity metadata, and
 *   §18 rule 7 bars using a face. Recognition sets the precedent: publish the
 *   moment, name no one.
 * - **No result is attached to any item.** The one performance figure in the
 *   chapter is scoped to the whole of Mishram's brand collaborations and says
 *   so on the page — see `SELECTED_WORK_COPY.proof`.
 *
 * BRAND SAFETY. Both published brands are on the collaborations rail with an
 * official asset and a client-confirmed relationship (§10s). Nothing here
 * touches a permanently excluded category, and no held brand — zingbus, Fun N
 * Earn, VYRL, Duolingo, OPPO material — appears in any frame.
 */

export type WorkMediaType = "video" | "poster";

export type WorkItem = {
  id: string;
  /**
   * The brand, for branded work; the creator, for creator content. **Never an
   * invented project name.**
   */
  title: string;
  /** Factual editorial category. */
  type: string;
  /**
   * How Mishram is connected to the brand — and only where the collaborations
   * rail already evidences it. Absent on creator content, where the roster's
   * own label is the relationship. **Never upgraded to "managed", "client" or
   * "campaign by".**
   */
  relationship?: string;
  /** What the asset actually is — drives whether playback UI exists at all. */
  mediaType: WorkMediaType;
  /** Video source. Undefined for every item — see the audit above. */
  src?: string;
  /** Poster / still. The whole visual while `mediaType` is `"poster"`. */
  poster: string;
  alt: string;
  /** Small in-frame format tag. Describes the asset, not a claim about it. */
  format: string;
  /**
   * Crops for the 9:16 primary and the 4:5 supporting fragment. The primary is
   * the full vertical frame (every source here is natively 9:16, so it crops
   * nothing); the support goes close on what the frame is *about* — the brand
   * in a campaign still, the face in a creator still — so the two read as two
   * frames rather than two slices of one.
   */
  focus: { primary: string; support: string };
  /** DEVELOPMENT ONLY — never rendered. Where the frame came from. */
  source: string;
  /** Only when genuinely known. Unset for all of these. */
  year?: string;
};

/**
 * Three items, and the order is the argument: **branded work first, creator
 * content last.** A visitor who reads only the featured state should see a
 * real brand.
 */
export const WORK_ITEMS: readonly WorkItem[] = [
  /**
   * SWIGGY — the featured state.
   *
   * A frame from `IMG_3842.MOV`, inside the client's own `PRASHANT VIDEO/
   * Swiggy/` folder: a content setup with **Swiggy delivery boxes and the
   * "Food you ♥ on time" tagline legible** in the foreground, food styled
   * across the table, a laptop and phones in shot.
   *
   * **This is the frame Phase 05 could not find.** That phase examined the two
   * *stills* in the same folder and correctly held them — four people in a room
   * with nothing Swiggy in shot. The branding is in the video, one folder over,
   * and a folder name is a signal rather than evidence: the evidence is the
   * packaging in the frame.
   *
   * Swiggy is on the collaborations rail from an official asset with a
   * client-confirmed relationship (§10s), so the brand claim is one this site
   * already makes and can evidence — the same test the Troovy frame passed in
   * §10aj, and the one OPPO and zingbus fail.
   */
  {
    id: "swiggy",
    title: "Swiggy",
    type: "Branded Content",
    relationship: "Worked with",
    mediaType: "poster",
    poster: "/media/work/swiggy-branded-content.webp",
    alt: "Swiggy delivery boxes and styled food laid out on a table during a content setup, from Mishram Media campaign material",
    format: "Still / 9:16",
    // The boxes sit low in the frame, so the supporting crop drops to them
    // rather than to the room.
    focus: { primary: "50% 50%", support: "50% 100%" },
    source:
      "F:\\Drive data\\Prashant - data\\PRASHANT VIDEO\\Swiggy\\IMG_3842.MOV — frame at 5.0s of 5.67s, " +
      "3840x2160 HEVC with a -90 display matrix, so upright it is natively 2160x3840 (9:16). " +
      "Extracted { 180, 640, 1800x3200 } and resized to 620x1102; saturation +6% for the HLG " +
      "source and nothing else. No recolouring, no crop around any brand.",
  },
  /**
   * PINTOLA — a product-integration frame, and the deck puts it on its own
   * brand page.
   *
   * An image embedded in Mishram's brand-collaboration proposal, **page 6 —
   * "BRANDS WE'VE WORKED WITH" / "Experience That Delivers"**. Three people
   * presenting a **Pintola® High Protein Muesli** pack to camera, the wordmark
   * and pack copy legible.
   *
   * Pintola is on the collaborations rail from an official asset with a
   * client-confirmed relationship (§10s). The deck placing this frame on its
   * brand-collaboration page is the second source, and it is why this is a
   * campaign frame rather than a photograph that happens to contain a product.
   *
   * **Natively 9:16** (794×1412), so the primary frame crops nothing.
   */
  {
    id: "pintola",
    title: "Pintola",
    type: "Branded Content",
    relationship: "Worked with",
    mediaType: "poster",
    poster: "/media/work/pintola-branded-content.webp",
    alt: "A Pintola High Protein Muesli pack presented to camera, from Mishram Media campaign material",
    format: "Still / 9:16",
    // Top-anchored: the 4:5 window only sees 70% of a 9:16 source, so anchoring
    // it high crops the legs and lands on the pack — a genuinely different
    // frame rather than the same one slightly moved.
    focus: { primary: "50% 50%", support: "50% 0%" },
    source:
      "WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf — embedded image on page 6 (794x1412), extracted " +
      "from the PDF's own JPEG stream and resized to 620x1102. Uncropped; the source is already 9:16.",
  },
  /**
   * MUKUL SHARMA — the one creator-content item, and the only one of the
   * original three that survives.
   *
   * The chapter's lead promises *creator content, campaigns and visual work*,
   * so dropping creator content entirely would make the lead wrong. One item
   * keeps it true.
   *
   * **He is the least-repeated of the three**, which is the whole reason he is
   * the one kept: Zoya Jaan and Nikita Kumawat both render in the Hero *and*
   * §03, so either would have been a third appearance on one page. Mukul is on
   * §03's stage and nowhere else on the homepage — Revision 28 took him off the
   * Hero. It is still a repeat, and it is the smallest one available.
   */
  {
    id: "mukul",
    title: "Mukul Sharma",
    type: "Creator Content",
    mediaType: "poster",
    poster: "/media/creators/mukul-sharma.webp",
    alt: "Vertical creator content featuring Mukul Sharma, from the Mishram Media network",
    format: "Still / 9:16",
    focus: { primary: "50% 50%", support: "42% 30%" },
    source: "existing approved creator asset — §03 roster, unchanged",
  },
];

export const SELECTED_WORK_COPY = {
  index: "05",
  label: "Selected Work",
  headline: ["Work made", "to be watched."],
  /** Rendered in the serif italic accent, matching the sections above. */
  accentWord: "watched.",
  lead: "Selected creator content, campaigns and visual work from across our network.",
  cta: "Create with us",
  /**
   * THE 40M+ CLAIM, AND ITS SCOPE IS THE WHOLE POINT.
   *
   * Phase 06 held this deliberately for this chapter: a campaign result belongs
   * where campaigns are, and a fifth large figure would have turned the
   * homepage's proof band into a statistics board. It is now published, once,
   * here.
   *
   * The proposal's own sentence is *"Some of our brand collaborations have
   * generated 40M+ views on a single video."* Every word of the scope survives:
   *
   * - **"on a single video"** — not a total, not an average, not a monthly
   *   figure. `label` carries that and must not be shortened to "views".
   * - **"some of our brand collaborations"** — an agency-level statement about
   *   an unnamed collaboration. `note` says so on the page, in the one sentence
   *   that stops a reader attaching it to the work displayed beside it.
   *
   * **IT IS ATTACHED TO NO BRAND.** Not Swiggy, not Pintola, not Troovy, not
   * any item in `WORK_ITEMS` — nothing in any source identifies which
   * collaboration the figure belongs to, and guessing would turn a true
   * agency claim into a false client claim. `note` is not decoration; it is the
   * part that keeps the sentence honest.
   *
   * One figure, in an editorial line above the index. **No KPI band, no second
   * proof section, no counter, no chart** — the work stays the dominant content.
   */
  proof: {
    value: "40M+",
    label: "Views on a single branded video",
    note: "Across Mishram's brand collaborations. Not attributed to the work shown here.",
  },
} as const;
