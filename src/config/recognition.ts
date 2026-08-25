/**
 * 06 / RECOGNITION
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ACTIVE since the 25 August 2026 content-migration audit. One verified item
 * is configured below, so the section renders and About advances to `07`.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ───────────────────────────────────────────────────────────────────────────
 * AUDIT (August 2026) — **PARTLY SUPERSEDED. Preserved as the record of what
 * was concluded and why, because three of its four findings still stand.**
 * A bounded search for Mishram Media award, certificate, trophy, press or
 * event-recognition material found nothing verifiable at the time:
 * ───────────────────────────────────────────────────────────────────────────
 *
 * 1. `aditi-landing/awards/*` — four award photographs plus `aditi_trophy.jpg`.
 *    These belong to **Aditi Sharma** and come from a separate project, "The
 *    Career Acceleration Program" (its `index.html` mentions Mishram zero
 *    times). Its own alt text names the awards: a presentation by Ms. Sania
 *    Nehwal, a Certificate of Appreciation from Mr. Munaf Patel, Top 100 Women
 *    Creators at Womennovator Creators Fest. Another person's recognition —
 *    showing it here would manufacture credibility the agency has not earned.
 *
 * 2. **SUPERSEDED — this finding was wrong, and the way it was wrong is worth
 *    keeping.** It read: *"promotional banners, not documentation. No award
 *    name, organisation, year or category appears anywhere in that markup."*
 *    True of the markup. **False of the images**, which that pass never
 *    opened. The 25 August 2026 audit downloaded both and read them: the
 *    2048×731 desktop banner carries `"AWARDED AS " BEST DIGITAL MARKETING
 *    AGENCY` in display type and a gold badge reading `NUFEW 2024-25`, over a
 *    photograph of an award plaque being presented. That is the item
 *    configured below. **Lesson: a text search cannot clear an image.**
 *    The hotlinking objection was correct and is honoured — the asset is
 *    downloaded, cropped and served locally (§14).
 *
 * 3. `lovkesh-kataria.webp` is genuinely awards-evening photography and an
 *    approved local asset — but it documents a *creator* at an awards evening,
 *    and the project does not even record which figure in the frame is him. It
 *    is not recorded as recognition the agency received. Under a heading that
 *    says "Recognition" it would imply an agency award by juxtaposition, so it
 *    stays in §03 where it is honest.
 *
 * 4. `mishram.com.zip` and `mishramsf.zip`: zero award-related entries. The
 *    Foundation site is a different entity, so its material would not count
 *    even if it had any.
 *
 * ADDING A SECOND ITEM. The composition adapts to one, two, or three-plus
 * items on its own. Add the file under `public/media/recognition/`, add an
 * entry here, and fill only the fields that are actually known. `title` may be
 * a factual generic label ("Award Recognition", "Industry Recognition", "Event
 * Recognition") when the specific award is not documented; `organisation` and
 * `year` stay undefined rather than guessed. **Never invent an award name,
 * body, year or category.**
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHAT THE CONFIGURED ITEM DELIBERATELY DOES NOT SAY
 * ───────────────────────────────────────────────────────────────────────────
 *
 * - **`NUFEW` is never expanded.** It is printed on the badge as four letters
 *   and appears nowhere as text in either repository — `grep -i nufew` across
 *   both returns zero matches, because the string exists only as pixels. Any
 *   expansion ("National …") would be invented. Render it exactly as printed.
 * - **Nobody in the photograph is named.** The recipient strongly resembles
 *   `Prashant_image_vkhpy0.png` (the old site's founder photograph) and the
 *   presenter's only identification anywhere is an `alt="Tushar Kapoor"` on
 *   the mobile crop. Resemblance and an alt attribute are not documentation,
 *   so the caption names neither. **The award is the claim; the people are
 *   not.** Do not add a presenter, a recipient or a celebrity endorsement.
 * - **No rank, scale or jurisdiction.** Not "#1", not "national", not "winner
 *   among N agencies", not a government award. The badge says what it says.
 * - The plaque's own inscription is illegible at the source's resolution, so
 *   nothing is quoted from it.
 *
 * BRAND SAFETY. Exclude any asset where a betting, gambling, casino,
 * real-money-gaming or gaming brand is visibly prominent, even if the
 * recognition itself is genuine.
 */

export type RecognitionItem = {
  id: string;
  /**
   * The most specific factual title available. A generic-but-true label is
   * correct when the specific award is undocumented.
   */
  title: string;
  /** Awarding body. Undefined unless documented. */
  organisation?: string;
  /** Undefined unless documented. */
  year?: string;
  /** Short factual category — "Award", "Recognition", "Event". */
  type: string;
  image: string;
  alt: string;
  /** One factual sentence. Undefined rather than padded. */
  caption?: string;
  /** width / height of the source, e.g. "4 / 3". Drives the frame. */
  aspect?: string;
  /** `object-position` for the crop. */
  focus?: string;
  /**
   * DEVELOPMENT METADATA — never rendered. Where the asset came from, so any
   * displayed claim stays traceable.
   */
  source: string;
};

/**
 * One verified item. Every field below is read directly off the photograph;
 * nothing is inferred. See the "what this deliberately does not say" block
 * above before adding a word to it.
 */
export const RECOGNITION_ITEMS: readonly RecognitionItem[] = [
  {
    id: "nufew-best-digital-marketing-agency",
    title: "Best Digital Marketing Agency",
    organisation: "NUFEW",
    year: "2024–25",
    type: "Award",
    image:
      "/media/recognition/mishram-best-digital-marketing-agency-nufew-2024-25.webp",
    // Describes the photograph, never an achievement, and names nobody in it.
    alt: "The NUFEW 2024–25 award plaque being presented to Mishram Media, photographed against the event backdrop.",
    caption: "Recognition for Mishram Media's work in digital marketing.",
    // Source is 775×581 — exactly 4:3, so `object-cover` crops nothing.
    aspect: "4 / 3",
    source:
      "OLD_REPO/public_html/index.html:1592-1602 (banner-container) → " +
      "res.cloudinary.com/dlnux9dga/image/upload/v1751801863/DESKTOP_-_AWARD_bq7qju.gif, " +
      "2048×731. Downloaded and cropped to the presentation and the NUFEW " +
      "badge — CROP REVISED Rev 14 after seeing it composed on the page: " +
      "now left 1236, top 150, 775×581 (was left 1198, top 45, 850×680). " +
      "Raising the top edge drops the decorative sunburst arc and a band of " +
      "flat lilac, so the two figures and the plaque fill the frame instead " +
      "of floating in promotional artwork; the badge is retained. " +
      "PURE CROP — nothing recoloured, retouched, generated or removed from " +
      "within the image. The banner's headline typography and clipart " +
      "trophies fall outside it; the lilac that remains is the event's own " +
      "backdrop. See docs/CONTENT-MIGRATION-AUDIT.md §2 and §18.",
  },
];

export const RECOGNITION_COPY = {
  index: "06",
  label: "Recognition",
  headline: ["Work that", "gets noticed."],
  /** Rendered in the serif italic accent, matching the sections above. */
  accentWord: "noticed.",
  lead: "A few moments of recognition from the work and relationships we've built along the way.",
  cta: "Build something worth noticing",
} as const;
