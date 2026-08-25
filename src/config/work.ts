/**
 * 05 / SELECTED WORK
 *
 * MEDIA AUDIT (August 2026). A bounded search of the whole workspace — the
 * project repo, the extracted old Mishram Media site, and both site archives —
 * found **no Mishram Media video of any kind**. No reels, no creator clips, no
 * campaign footage, no vertical 9:16 content, no poster frames, no captions.
 *
 * The only videos anywhere belong to a **different entity**: three files under
 * `mishramngo/` (package name `mishram-foundation-site`) at 44MB, 88MB and
 * 96MB. Those are Foundation films, not agency creator work — rendering them
 * here would attribute another organisation's content to Mishram Media, and
 * they are one to two orders of magnitude too large for a homepage regardless.
 * They are deliberately not referenced.
 *
 * So every entry below is `mediaType: "poster"`: a still, honestly labelled as
 * one. **No play control is rendered for a poster** — a play affordance over a
 * photograph would be a lie about what the visitor is looking at. The video path
 * is fully built in `WorkMedia`, so dropping a real reel in means setting
 * `mediaType: "video"` and adding `src`. Nothing else changes.
 *
 * TITLES. No invented campaign names. The title is the creator actually in the
 * frame; the type is the factual editorial category; the format tag states what
 * the asset is (`Still / 9:16`).
 *
 * BRAND SAFETY. Nothing here touches the permanently excluded categories — the
 * assets are the same five approved creator portraits used in §03.
 */

export type WorkMediaType = "video" | "poster";

export type WorkItem = {
  id: string;
  /** The creator genuinely in the frame. Never an invented project name. */
  title: string;
  /** Factual editorial category. */
  type: string;
  /** What the asset actually is — drives whether playback UI exists at all. */
  mediaType: WorkMediaType;
  /** Video source. Undefined for every item until a real reel lands. */
  src?: string;
  /** Poster / still. Always present, and the whole visual while `mediaType`
   *  is `"poster"`. */
  poster: string;
  alt: string;
  /** Small in-frame format tag. Describes the asset, not a claim about it. */
  format: string;
  /**
   * Crops for the 9:16 primary and the 4:5 supporting fragment. The primary is
   * the full vertical frame (these sources are natively 9:16, so it crops
   * nothing); the support goes close on the face, so the two read as two frames
   * rather than two slices of one.
   */
  focus: { primary: string; support: string };
  /** Only when genuinely known. Unset for all of these. */
  year?: string;
};

/**
 * Three entries, not five: these are the sources that are natively 9:16
 * (620×1102), so the primary frame crops nothing. Vishnu Priya's 4:5 and
 * Lovkesh Kataria's 1:1 would both crop hard into a vertical frame, so they are
 * held back rather than forced — an art-direction reason, not an oversight.
 *
 * `zoya` is the featured state: the strongest subject separation and the only
 * one whose supporting 4:5 crop reads as a genuinely different frame.
 */
export const WORK_ITEMS: readonly WorkItem[] = [
  {
    id: "zoya",
    title: "Zoya Jaan",
    type: "Creator Content",
    mediaType: "poster",
    poster: "/media/creators/zoya-jaan.webp",
    alt: "Vertical creator content featuring Zoya Jaan, from the Mishram Media network",
    format: "Still / 9:16",
    focus: { primary: "50% 50%", support: "50% 12%" },
  },
  {
    id: "mukul",
    title: "Mukul Sharma",
    type: "Creator Content",
    mediaType: "poster",
    poster: "/media/creators/mukul-sharma.webp",
    alt: "Vertical creator content featuring Mukul Sharma, from the Mishram Media network",
    format: "Still / 9:16",
    focus: { primary: "50% 50%", support: "42% 30%" },
  },
  {
    id: "nikita",
    title: "Nikita Kumawat",
    type: "Creator Content",
    mediaType: "poster",
    poster: "/media/creators/nikita-kumawat.webp",
    alt: "Vertical creator content featuring Nikita Kumawat, from the Mishram Media network",
    format: "Still / 9:16",
    focus: { primary: "50% 50%", support: "44% 16%" },
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
} as const;
