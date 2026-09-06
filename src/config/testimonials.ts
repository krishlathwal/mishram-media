/**
 * CLIENT NOTES — testimonials.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REVISION 43 — THE SECTION NOW READS THE DATABASE, AND NOTHING ELSE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * There is no static list of testimonials in this project any more, and there
 * must never be one again. What the homepage shows comes from
 * `public.testimonials` through `lib/testimonials.ts`: rows a real person
 * submitted on the private `/feedback` page **and a person at Mishram set to
 * `approved` in the Supabase Table Editor.** Every row starts `pending`; the
 * public read filters on `approved`; there is no code path that publishes a
 * submission by itself.
 *
 * While no approved row exists — which is the state this ships in — `ClientNotes`
 * receives an empty list and returns `null`, so **the homepage has no Client
 * Notes section**, exactly as it has since Revision 06. A visible placeholder
 * was rejected long ago for the same reason as §06's: an empty "Client Notes"
 * heading, or a "coming soon" row, implies Mishram has testimonials it is
 * choosing not to show, which is itself a claim.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * AUDIT (August 2026) — every testimonial in the old Mishram Media site
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Kept so nobody repeats the work. THREE SOURCES WERE FOUND, AND ALL THREE
 * ARE DISQUALIFIED — conclusively, by two independent audits (§10d-notes of
 * the brief). Do not re-audit them, and never seed the database from them.
 *
 * **A. Live service pages** — five slides: Rahul Mehta, Ayesha Khan, Kunal
 * Verma, Sneha Roy, Vikram Singh. **B. Live `index.html` and `about.html`** —
 * Rahul Mehta, Kunal Verma, Vishnu Priya. **C. `_backup_pre_seo/testimonials.html`.**
 *
 * WHY EACH FAILS: every avatar is `i.pravatar.cc` stock or an AI-generated
 * portrait; one quote is attributed to two different people verbatim; the
 * roles are placeholders; source C praises the purchased template's own
 * agency ("SEOC"); the quotes carry unverifiable figures; every card wears
 * ★★★★★ with nothing behind it.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT A PUBLISHED QUOTE MAY CARRY
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * - `quote` — the person's own words, as stored. A published excerpt must be a
 *   continuous run of them; never a paraphrase in quotation marks.
 * - `author` — the name **only if `display_name_allowed`**; otherwise the
 *   relationship they chose, *"A brand we worked with"*.
 * - `role` / `company` — only what was supplied **and** permitted. Absent is
 *   correct; the layout expects it.
 * - `image` — not yet collected. `media_allowed` is recorded for later, and
 *   a portrait renders only when an asset is confirmed to be that person.
 *   **Never a stock face, never generated.**
 * - `sourceNote` — development-only, never rendered.
 *
 * BRAND SAFETY (§9) applies here as it does everywhere: no testimonial from a
 * betting, gambling, casino, real-money gaming or gaming client is approved,
 * whatever it says.
 */

export type Testimonial = {
  id: string;
  /** The person's words as stored, or a continuous excerpt of them. */
  quote: string;
  /** The name if permitted, otherwise the relationship line. */
  author: string;
  /** Only if supplied and the name is shown. */
  role?: string;
  /** Only if supplied and permitted. */
  company?: string;
  /**
   * Only when the asset is confirmed to be this person. Typography alone beats
   * the wrong face on a real person's name.
   */
  image?: { src: string; alt: string };
  /** DEVELOPMENT ONLY. Never rendered. Where it came from, what was verified. */
  sourceNote?: string;
};

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
   * is the bar the approval step enforces, so it stays true by construction.
   */
  lead: "A few words from people we've had the chance to build with.",
  /** Screen-reader name for the section. The visible label stays editorial. */
  a11yLabel: "Client testimonials",
} as const;
