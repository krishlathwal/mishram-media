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
 * REVISION 36 — THE ARTWORK BECAME A PHOTOGRAPH
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Until this revision the item rendered a **775×581 crop of the old site's
 * promotional Cloudinary banner** — two cut-out figures on a flat lilac field
 * with clipart hanging stars, a gold rosette and a rendered gold `NUFEW
 * 2024-25` badge. §10q re-cropped it once because it read as an advertisement
 * pasted onto an editorial page, and cropping could not fix what it was.
 *
 * **The real photographs were on the drive the whole time.** The Revision 17
 * media audit flagged five first-party 3024×4032 photographs of the award
 * evening as *"the single highest-value finding in this audit"* and correctly
 * declined to act on them inside a creator-media revision. This is the scoped
 * Recognition revision it asked for.
 *
 * The banner is **retired, not re-cropped**: it is a marketing composite, and
 * a genuine photograph of the same moment at four times the resolution exists.
 * The derivative was deleted; the Cloudinary original is not ours to keep.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * ⚠ `NUFEW` vs `NUFW` — AN UNRESOLVED DISCREPANCY, REPORTED NOT ACTED ON
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Reading the photographs at high zoom turned up a conflict the project could
 * not see while the only evidence was a rendered badge:
 *
 * | Source                                        | Reads    |
 * | --------------------------------------------- | -------- |
 * | The promotional banner's rendered gold badge   | `NUFEW`  |
 * | The event's own step-and-repeat, many times    | `NUFW`   |
 * | The engraved plaque held in `CE81BFA5`         | `NUFW`   |
 * | The trophy's own plate in `186F38BE`           | `NUFW`   |
 *
 * The step-and-repeat prints the expansion legibly beside the mark:
 * **`NUFW — NEXUS UNIVERSE FASHION WEEK`.**
 *
 * **The site keeps publishing `NUFEW` and nothing here changes that.** Three
 * reasons, in order: it is the string the client's own material carries and
 * the one this project was told to use; a designer's badge and an engraver's
 * die can disagree without either being the awarding body's legal name; and
 * `NUFEW` → `NUFW` is a one-character difference of exactly the kind §10u
 * spent a revision learning not to resolve on a name fragment (Shadab *Hasan*
 * is still not Shadab *Jakati*).
 *
 * **So the expansion is NOT published either.** `NEXUS UNIVERSE FASHION WEEK`
 * expands `NUFW`, and the site does not print `NUFW`. Writing it beside
 * `NUFEW` would assert the two are the same body, which is the whole question.
 * §18's rule stands unchanged: **`NUFEW` is never expanded.**
 *
 * **This is a one-word decision for the client**, in the same class as the
 * Shadab Jakati flag — raised here rather than settled unilaterally.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * THE TWO STEP-AND-REPEAT FRAMES ARE HELD, ON TWO INDEPENDENT GROUNDS
 * ───────────────────────────────────────────────────────────────────────────
 *
 * `135279F4-…` and `CE81BFA5-…` show one figure against the event's
 * step-and-repeat holding the engraved plaque. Either would have made a
 * genuinely different second frame. Both are held:
 *
 * 1. **The backdrop is a sponsor wall carrying twenty-plus third-party marks**
 *    — NUFW, VLCC Institute, Prima, Peplos Jeans, Stylox, Satmola, Inkz,
 *    Aagaaz Events, 360 Advertising Production, Gopal's 56, HB Klyde Premier,
 *    D'Vomore, All India News, Samar Salon Academy, Ever Pure, MCF, Mr & Ms
 *    Next Super Models and more. §9 was checked against every legible mark and
 *    **none is a betting, gambling, casino or real-money-gaming brand** — but
 *    §18's *"a third-party brand in frame is a brand claim"* does not survive
 *    twenty of them at editorial scale. (Worth recording: the wall also
 *    carries **Star Crown Media**, the agency's own 2021 name — good
 *    provenance, and not a reason to publish the other nineteen.)
 * 2. **The plaque is a different award from the one this item publishes.** Read
 *    at full resolution it is inscribed to a *digital partner* and addressed to
 *    an individual by name — not `Best Digital Marketing Agency`, and not to
 *    the agency. Rendering it under this item's title would attach the wrong
 *    artifact to the claim.
 *
 * The other two stage frames (`03EBDAA5-…`, now supplied as `Award.HEIC`, and
 * `4FCFF00A-…`) are the **same pose seconds apart** from the one published.
 * Publishing two would be a scrapbook of one moment, so the archive stays at
 * one item and the count-adaptive composition stays in its single-item state.
 *
 * **Nothing new is claimed from any of them.** The trophy's plate and the
 * plaque's inscription are both illegible at full resolution — the media
 * audit predicted this and re-checking confirmed it.
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
    image: "/media/recognition/nufew-award-presentation-2024-25.webp",
    /**
     * Describes the photograph, never an achievement, and **names nobody**.
     * Two figures are in frame and neither is identified: §18 rule 7 bars a
     * face, and the one filename in the library that names a presenter is the
     * exact case §10p already ruled is not evidence.
     */
    alt: "Mishram Media's NUFEW 2024–25 award held on stage at the awards ceremony.",
    caption: "Recognition for Mishram Media's work in digital marketing.",
    // The crop is authored at exactly 4:3, so `object-cover` crops nothing —
    // and `/about`'s archive board, which hardcodes a 4/3 recognition
    // fragment, keeps its composition with no edit on that route.
    aspect: "4 / 3",
    source:
      "F:/Drive data/186F38BE-342B-4E0F-8847-9645F42AEFE0.HEIC — first-party, " +
      "3024×4032, one of five photographs of the same award evening at the " +
      "root of the client's own drive. Decoded to JPEG by the Revision 17 " +
      "Windows-Imaging-Component pass (orientation resolved by the decoder, " +
      "all metadata stripped), staged at " +
      "_website-converted-jpg/186F38BE-….jpg. " +
      "PRODUCTION: extract{left 560, top 1360, 2000×1500} → 4:3 → 1600×1200 " +
      "WebP q76. **PURE CROP AND DOWNSCALE** — nothing recoloured, retouched, " +
      "sharpened, denoised, generated, added or removed. " +
      "CHOSEN BY LOOKING, over the two near-identical frames of the same pose " +
      "(03EBDAA5-… — resupplied by the client as `Award.HEIC`, same bytes — " +
      "and 4FCFF00A-…): this one holds the trophy highest and most centrally " +
      "with both faces to camera. " +
      "THE CROP'S TOP EDGE IS DELIBERATE: it sits below the stage truss, which " +
      "carries a third-party event-production banner. Nothing else legible in " +
      "frame is a brand — the backdrop is the ceremony's own LED graphic — so " +
      "no §18 decision was cropped around; an unrelated vendor's banner was " +
      "simply framed out. " +
      "Sized for the box it renders into: 824px at 1440 (58vw), so 1600 covers " +
      "2× DPR. The retired banner was 775px and went soft on retina — §10q " +
      "defect 4 in a different form. See docs/MEDIA-ASSET-AUDIT.md §3B.",
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
