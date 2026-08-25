/**
 * CLIENT NOTES — testimonials.
 *
 * **`TESTIMONIALS` is empty, so the section renders nothing.** That is the
 * finding of the audit below, not an oversight, and it is the same decision
 * §06 Recognition made for the same reason: a testimonial is a factual claim
 * about a named real person, and none of the material in this project clears
 * that bar. See §10d-notes of the brief.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * AUDIT (August 2026) — every testimonial in the old Mishram Media site
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * THREE SOURCES WERE FOUND, AND ALL THREE ARE DISQUALIFIED.
 *
 * **A. Live service pages** — `webDevelopment.html`, `metaAds.html`,
 * `socialMediaManagement.html`, `brandshoot.html`, `influencerMarketing.html`.
 * Five slides: Rahul Mehta, Ayesha Khan, Kunal Verma, Sneha Roy, Vikram Singh.
 *
 * **B. Live `index.html` and `about.html`.** Three slides: Rahul Mehta, Kunal
 * Verma, Vishnu Priya. Mirrored in the site's own `llms-full.txt`.
 *
 * **C. `_backup_pre_seo/testimonials.html`.** A dedicated testimonials page,
 * already removed from the live site.
 *
 * WHY EACH FAILS:
 *
 * 1. **The portraits are a placeholder service.** Every avatar on the service
 *    pages is `https://i.pravatar.cc/40?img=5|7|8` — pravatar.cc generates
 *    random stock faces. `img=8` is used for **three different named people**
 *    (Kunal Verma, Sneha Roy, Vikram Singh). No portrait in any source can be
 *    connected to the person it is attached to.
 *
 * 2. **One quote is attributed to two different people, verbatim.** On
 *    `index.html`, `about.html` and `llms-full.txt`, "Vishnu Priya" is given
 *    Rahul Mehta's quote word for word. At least one attribution is false and
 *    there is no way to tell which — which also puts the other slides in the
 *    same set in doubt.
 *
 * 3. **The roles are placeholders.** Three different people share "Head of
 *    Product" with no employer. Two more are "Social Media Influencer" with no
 *    handle. No company, link, organisation or date appears anywhere.
 *
 * 4. **Source C is unmodified template demo content.** Its quotes praise
 *    **"SEOC"** — the purchased template's own agency name, not Mishram — and
 *    are signed "David M.", "Emily R." under Google review icons. It was
 *    deleted from the live site, which is the correct read of what it was.
 *
 * 5. **Unverifiable figures inside the quotes** — "4x ROI in the first month",
 *    "conversions have doubled" — plus a page-level "(40+ Reviews)" claim. §1
 *    of the brief forbids all of it.
 *
 * 6. **Star ratings with nothing behind them.** Every card carries ★★★★★, and
 *    source C adds a Google icon implying Google reviews that do not exist.
 *
 * ALSO CHECKED, NOTHING FOUND: `assets/js/homepage/review.js` (slider logic
 * only, no data), `mishram.com.zip` (same files as the extracted site),
 * `mishramsf.zip` (zero testimonial or review entries), and this repo.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TO SWITCH THE SECTION ON
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Two genuine testimonials are enough — the composition is count-adaptive. Add
 * an entry per person and fill **only** the fields that are documented:
 *
 * - `quote` verbatim. Trimming is allowed *only* as a continuous excerpt of the
 *   real words, with the untouched original recorded in `sourceNote`. Never
 *   paraphrase and put quotation marks around it.
 * - `role` / `company` stay `undefined` rather than guessed. The layout is
 *   correct without them.
 * - `image` only when that asset is confirmed to be that person. Typography
 *   alone is the better outcome otherwise — **never** attach a stock face, and
 *   never generate one.
 * - `sourceNote` is **development-only and never rendered.** It records where
 *   the quote came from and what was actually verified.
 *
 * The client can supply these in minutes — they have the relationships. Written
 * permission to publish a name is worth having on file before it ships.
 *
 * BRAND SAFETY (§9) applies here as it does everywhere: no testimonial from a
 * betting, gambling, casino, real-money gaming or gaming client, whatever it
 * says.
 */

export type Testimonial = {
  id: string;
  /** Verbatim, or a continuous excerpt with the original kept in `sourceNote`. */
  quote: string;
  author: string;
  /** Only if documented. Absent is correct; the layout expects it. */
  role?: string;
  /** Only if documented. */
  company?: string;
  /**
   * Only when the asset is confirmed to be this person. Typography alone beats
   * the wrong face on a real person's name.
   */
  image?: { src: string; alt: string };
  /** DEVELOPMENT ONLY. Never rendered. Where it came from, what was verified. */
  sourceNote: string;
};

/**
 * Empty on purpose — see the audit above. `ClientNotes` returns `null` while
 * this is empty, so the homepage simply has no such section. Adding one real
 * entry makes it appear, composed, with no other change.
 *
 * A visible placeholder was rejected deliberately: an empty "Client Notes"
 * heading, or a "coming soon" row, implies Mishram has testimonials it is
 * choosing not to show. That is itself a claim, and an unverified one.
 */
export const TESTIMONIALS: readonly Testimonial[] = [];

export const CLIENT_NOTES_COPY = {
  /** Not "TESTIMONIALS" — this is an editorial interlude, not a review widget. */
  label: "Client Notes",
  headline: ["What working together", "feels like."],
  /**
   * Serif italic accent on the leading word of the second line, as the Mishram
   * Difference interlude does. "feels" is the human word in the line, and the
   * two interludes accenting a leading word is what separates them from the
   * numbered chapters, which all accent the trailing one.
   */
  accentWord: "feels",
  /**
   * Only accurate for quotes from people Mishram actually built with — which
   * is the bar `TESTIMONIALS` enforces, so it stays true by construction.
   */
  lead: "A few words from people we've had the chance to build with.",
  /** Screen-reader name for the section. The visible label stays editorial. */
  a11yLabel: "Client testimonials",
} as const;
