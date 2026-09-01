/**
 * THE MISHRAM DIFFERENCE — the interlude between 02 / What We Do and
 * 03 / Creators.
 *
 * §02 says what Mishram does. This answers the question a brand actually asks
 * next: *why you instead of an agency, two freelancers and a dev shop?* It is
 * deliberately **not a numbered chapter** — it is a bridge, so it carries no
 * index and does not renumber anything after it.
 *
 * Every claim here is an operating fact about how the work is organised, not a
 * quality boast. No metrics, no rankings, no "award-winning", no "10X" — §1 of
 * the brief forbids all of it, and a differentiation section is exactly where
 * that temptation appears.
 *
 * NO CTA. §02 already carries `Discuss this project`, §03 opens with
 * `Work with our creator network`, and About owns the page's closing ask. A
 * third action inside a 900px interlude would be over-CTA-ing the page. The
 * `Strategy / Create / Launch / Scale` labels on 04 are the Work Process stage
 * names on purpose — that chapter is the answer, four sections later, and does
 * not need a link jumping the visitor past the proof.
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
  /** One sentence. The visual carries the rest. */
  detail: string;
  /** Three or four supporting labels — the same `.caps` rail as elsewhere. */
  meta: readonly string[];
};

export const DIFFERENCE_COPY = {
  label: "The Mishram Difference",
  headline: ["Fewer handoffs.", "More momentum."],
  /**
   * Serif italic accent on the **leading** word, as in "One growth system." —
   * not on the trailing word as in the Hero. Deliberate: 04 / Work Process
   * already accents `momentum.` in its own headline, and two italic
   * "momentum."s on one page would read as an accident. "Fewer" is also the
   * word carrying the actual claim.
   */
  accentWord: "Fewer",
  /**
   * **This used to enumerate the disciplines, and that was a duplication.**
   * `WHAT_WE_DO_CLOSING.baseline` prints `Strategy — Content — Creators —
   * Performance — Technology` immediately above this section — 124px of empty
   * run away on desktop, and roughly one screen on a phone. The old lead
   * ("Creators, content, performance and technology working as one team, not
   * four suppliers.") repeated four of those five words and added nothing
   * between them: the same idea in adjacent sections, which is the one copy
   * failure a rhythm pass exists to catch.
   *
   * **The claim is unchanged** — "working as one team", "four suppliers" and
   * the "four" that anchors it all survive verbatim. Only the list became a
   * reference to the list, which turns a redundancy into a connective and lets
   * this chapter get on with answering *why Mishram* rather than restating
   * *what Mishram does*. The disciplines are still named above it and again in
   * the four differentiator rows below, so nothing is lost.
   */
  lead: "The same disciplines, working as one team rather than four suppliers.",
  /** Names the vertical axis the four layers connect into. */
  axisLabel: "Mishram",
  /** What the system resolves into at the foot of the axis. */
  outputLabel: "Momentum",
} as const;

export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    id: "creator-native",
    index: "01",
    name: "Creator-Native",
    detail:
      "We work directly across creators, personal brands and influencer-led campaigns.",
    meta: ["Creator Network", "Personal Brands", "Collaborations"],
  },
  {
    id: "creative-performance",
    index: "02",
    name: "Creative + Performance",
    detail:
      "The idea and the distribution strategy are developed as part of the same system.",
    meta: ["Content", "Campaigns", "Paid Growth"],
  },
  {
    id: "destination",
    index: "03",
    name: "We Build the Destination",
    detail:
      "We don't only drive attention — we build where it lands: websites, landing experiences, custom software and CRM systems.",
    meta: ["Web", "Software", "CRM", "Digital Systems"],
  },
  {
    id: "connected",
    index: "04",
    name: "One Connected Partner",
    detail:
      "Strategy, creation, launch and optimisation stay connected instead of being handed between unrelated suppliers.",
    meta: ["Strategy", "Create", "Launch", "Scale"],
  },
];
