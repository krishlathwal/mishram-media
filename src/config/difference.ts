/**
 * THE MISHRAM DIFFERENCE — the interlude between 02 / What We Do and
 * 03 / Creators.
 *
 * §02 says what Mishram does. This answers the question a brand actually asks
 * next: *why you instead of an agency, two freelancers and a dev shop?* It is
 * deliberately **not a numbered chapter** — it is a bridge, so it carries no
 * index and does not renumber anything after it.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * REVISION 42 — REDESIGNED AS A CONTRAST, NOT A SYSTEM DRAWING
 *
 * The client's verdict on the walkthrough video: *"this feels so irrelevant …
 * make it simpler and clean, just differentiate how we are different from
 * other creators and other agencies, keep it clean and simple, I don't want
 * to increase the length of the page."* The connected stack — an axis, four
 * reaching rows, evidence fragments and a selection model — is gone. What
 * stands in its place is the one thing the section had to do: four rows that
 * put the usual, fragmented setup beside the way Mishram works.
 *
 * **No competitor is named, implied or diminished.** The left column
 * describes a *setup* — separate suppliers, separate rooms, a website built
 * elsewhere — which is a neutral and true description of how the work is
 * often assembled, in the same register §10z used for "typical web project".
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Every claim here is an operating fact about how the work is organised, not a
 * quality boast. No metrics, no rankings, no "award-winning", no "10X" — §1 of
 * the brief forbids all of it, and a differentiation section is exactly where
 * that temptation appears.
 *
 * NO CTA. §02 carries `Discuss this project`, §03 opens with `Work with our
 * creator network`, and About owns the page's closing ask.
 */

export type DifferentiatorId =
  | "creator-native"
  | "creative-performance"
  | "destination"
  | "connected";

export type Differentiator = {
  id: DifferentiatorId;
  index: string;
  name: string;
  /** The fragmented setup, one sentence. Neutral, never a competitor. */
  usual: string;
  /** How Mishram works, one sentence. An operating fact, never a boast. */
  mishram: string;
};

export const DIFFERENCE_COPY = {
  label: "The Mishram Difference",
  headline: ["Fewer handoffs.", "More momentum."],
  /**
   * Serif italic accent on the **leading** word, as in "One growth system." —
   * not on the trailing word as in the Hero. 04 / Work Process already accents
   * `momentum.` in its own headline, and "Fewer" is the word carrying the claim.
   */
  accentWord: "Fewer",
  lead: "What changes when creators, content, performance and the website come from one team instead of four suppliers.",
  /** The two column heads of the contrast. */
  columns: { usual: "The usual setup", mishram: "With Mishram" },
} as const;

export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    id: "creator-native",
    index: "01",
    name: "Creator-native",
    usual: "Creators are booked through an intermediary who has never worked with them.",
    mishram:
      "We work directly with creators, personal brands and influencer-led campaigns — the relationships are ours.",
  },
  {
    id: "creative-performance",
    index: "02",
    name: "Creative + performance",
    usual: "The idea is made in one room and the media plan in another.",
    mishram:
      "The idea and its distribution are developed as one system, so the creative is built to perform from the start.",
  },
  {
    id: "destination",
    index: "03",
    name: "We build the destination",
    usual: "Attention is sent to a website somebody else built, on somebody else's timeline.",
    mishram:
      "We build where it lands — websites, landing experiences, custom software and CRM systems.",
  },
  {
    id: "connected",
    index: "04",
    name: "One connected partner",
    usual: "Strategy, creation, launch and optimisation are handed between unrelated suppliers.",
    mishram:
      "Plan, create, launch and scale stay with one team, so nothing is lost at a handoff.",
  },
];
