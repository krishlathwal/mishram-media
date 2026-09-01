/**
 * THE PROOF REGISTER — every published figure on this site, in one file.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * WHY THIS FILE EXISTS, AND WHY IT IS NOT A LIST OF NUMBERS
 *
 * Until Revision 33 the site published exactly two figures (`500+` creators,
 * `1,000+` promotional videos) and they lived inside `config/creators.ts`,
 * beside the roster they had nothing to do with. Every other number the
 * business could evidence sat unpublished in `docs/FINAL-POLISH-ROADMAP.md`,
 * because §1 forbids an unverified metric and nothing had been verified.
 *
 * **The client has now asked the website to reflect the same information the
 * Mishram brand-collaboration proposal already puts in front of brands.** That
 * changes the status of the proposal's figures from *unverified third-party
 * claim* to **first-party business claim, stated by the business, approved by
 * the business for publication** — which is the same class of evidence
 * `CONTACT`, `MANAGEMENT.statement` and the brand rail already run on.
 *
 * So this file is the register: **one canonical home for every figure, whether
 * it is published or held**, each carrying the source it came from and the
 * reason it is or is not public. Adding a figure to a component means adding a
 * record here. There is no second place a number can live.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * FOUR RULES, AND EVERY ONE OF THEM COST SOMETHING TO LEARN.
 *
 * 1. **Never mutate a claim's scope.** `100+ brands` is *brands worked with*,
 *    not *active clients*. `1,000+ creator-led videos` is a count of videos,
 *    not of campaigns. `130M+ on a single Reel` is one Reel's figure, **never
 *    an average**. Each `label` below is written to make the mutation
 *    impossible to perform accidentally.
 * 2. **A lower bound stays a lower bound.** The client gave `500+`, so `500+`
 *    is what renders. Nothing is rounded up, no range is offered — a range
 *    invites the reader to average it, and the floor is what the business
 *    stands behind (§10t §7).
 * 3. **`public: false` renders nothing at all.** No dash, no placeholder, no
 *    "coming soon" — the self-suppressing pattern Recognition, Client Notes
 *    and `MANAGEMENT.metrics` already use. A held figure is recorded here so
 *    the next session does not re-research it, and is invisible on the site.
 * 4. **`source` / `sourceType` / `confirmed` are DEVELOPMENT-ONLY.** They are
 *    provenance for whoever reads this file next; **no internal path, deck
 *    page or file name is ever rendered.** The public surface carries a plain
 *    English attribution where one is needed and nothing else.
 */

export type ProofSourceType =
  /** The client stated it directly, in a dated conversation. */
  | "user-confirmed"
  /** Mishram's own brand-collaboration proposal — first-party material. */
  | "first-party-proposal"
  /** A platform screenshot embedded in that proposal. */
  | "first-party-screenshot";

export type ProofFact = {
  id: string;
  /** Exactly as it renders. Never recomputed, never reformatted downstream. */
  value: string;
  /**
   * The label carries the claim's **scope**, and that is its whole job. It is
   * the thing standing between `130M+ views on a single Reel` and
   * `130M+ average views`.
   */
  label: string;
  /** DEVELOPMENT ONLY — never rendered. Where the figure comes from. */
  source: string;
  /** DEVELOPMENT ONLY — never rendered. */
  sourceType: ProofSourceType;
  /** DEVELOPMENT ONLY — never rendered. When the client stood behind it. */
  confirmed: string;
  /** DEVELOPMENT ONLY — never rendered. A visual corroboration, if one exists. */
  proofAsset?: string;
  /**
   * **Whether this figure renders in the quick-scan proof band**, and nothing
   * wider than that. False means the band never shows it — no dash, no
   * placeholder (rule 3).
   *
   * It is deliberately *not* a claim about the whole site: Revision 35
   * published `branded-video` inside 05 / Selected Work while it stays `false`
   * here, because a campaign result belongs beside campaigns and a fifth large
   * figure would have turned this band into a statistics board. A record's
   * `note` says where it renders when that is anywhere other than the band.
   */
  public: boolean;
  /** DEVELOPMENT ONLY — why a held figure is held, or where it is going. */
  note?: string;
};

/* ── The register ───────────────────────────────────────────────── */

export const PROOF_FACTS: readonly ProofFact[] = [
  /**
   * THE REACH FACT, and it leads the composition.
   *
   * The proposal states **130 million+ views on a single Reel**. The deck also
   * embeds a screenshot of the same account's Reel grid whose top tile reads
   * **139M** — so the published claim sits *below* what the evidence shows,
   * which is the only direction a claim should ever err in.
   *
   * **It is one Reel, and the label says so.** Not an average, not a monthly
   * figure, not a total, and not attributed to Mishram as a result Mishram
   * produced — managing a creator and causing a view count are different
   * statements (`config/management.ts`).
   */
  {
    id: "single-reel",
    value: "130M+",
    label: "Views on a single Reel",
    source:
      "Mishram brand-collaboration proposal, p2: 'WE GOT 130 MILLION+ VIEWS ON A SINGLE REEL'. " +
      "Corroborated by the deck's own Reel-grid screenshot, whose top tile reads 139M — the " +
      "published claim is deliberately the lower, quoted one.",
    sourceType: "first-party-proposal",
    confirmed: "user-approved: 2026-09 — publish what the proposal publishes",
    proofAsset: "/media/proof/xbhandesiri-reel-performance.webp",
    public: true,
  },
  {
    id: "brands",
    value: "100+",
    label: "Brands worked with",
    source:
      "Mishram brand-collaboration proposal, p2 and p6: 'experience across 100+ brands', " +
      "'We've worked with 100+ leading brands across India'.",
    sourceType: "first-party-proposal",
    confirmed: "user-approved: 2026-09",
    public: true,
    note:
      "The collaborations rail publishes eighteen marks, which is the subset with an official " +
      "logo asset and a confirmed relationship. 'Worked with' is the same wording the rail uses, " +
      "so the two surfaces agree rather than compete.",
  },
  {
    id: "creators",
    value: "500+",
    label: "Creators worked with",
    source: "client-confirmed directly, August 2026. Published since Revision 17 (§10t §7).",
    sourceType: "user-confirmed",
    confirmed: "user-confirmed: 2026-08",
    public: true,
  },
  /**
   * ONE WORDING, RECONCILED. The client confirmed **1,000+ promotional
   * videos** in August 2026 and the proposal says **1,000+ creator videos** /
   * **1,000+ creator-led videos**. Same number, two labels, and the site was
   * carrying the vaguer one.
   *
   * `Creator-led videos` wins: it is the client's own current wording, it is
   * more specific to the business Mishram actually runs, and it cannot be
   * misread as advertising spots. **The figure is untouched** — only the noun
   * changed, and both sources are recorded below so the change is auditable.
   */
  {
    id: "videos",
    value: "1,000+",
    label: "Creator-led videos",
    source:
      "client-confirmed directly, August 2026, as '1,000+ promotional videos'. Proposal p2 and " +
      "p6: '1,000+ creator videos', 'executing 1,000+ creator-led videos'. Same figure; the " +
      "proposal's noun is the more specific one and is what renders.",
    sourceType: "user-confirmed",
    confirmed: "user-confirmed: 2026-08 · wording reconciled 2026-09",
    public: true,
  },

  /* ── HELD. Recorded, and rendered nowhere. ─────────────────────── */

  /**
   * **PUBLISHED IN REVISION 35 — but in 05 / Selected Work, not in this band.**
   *
   * It was reserved rather than rejected: a *campaign* result belongs beside
   * campaigns, and a fifth large number here would have turned an editorial
   * index into the statistics board this layer must not become. Phase 08 put
   * it where it belongs, once, above the work index —
   * `SELECTED_WORK_COPY.proof` carries the rendered wording and the reasoning.
   *
   * **`public` stays false because that flag governs this band only.** Setting
   * it true would render the figure twice on one page, which is the exact
   * duplication Revision 33 removed.
   *
   * **It is attached to no brand**, and the rendered note says so: nothing in
   * any source identifies which collaboration the figure belongs to, so
   * naming one would turn a true agency claim into a false client claim.
   */
  {
    id: "branded-video",
    value: "40M+",
    label: "Views on a single branded video",
    source:
      "Mishram brand-collaboration proposal, p2 and p5: 'several branded campaigns achieving " +
      "40M+ views on a single video'.",
    sourceType: "first-party-proposal",
    confirmed: "user-approved: 2026-09",
    public: false,
    note:
      "PUBLISHED (Rev 35) in 05 / Selected Work, above the work index, with the scope note " +
      "'Across Mishram's brand collaborations. Not attributed to the work shown here.' " +
      "Stays out of this band: one figure, one place.",
  },
  /**
   * Held on language, not on doubt. "Billions" is unbounded, it cannot be
   * checked by anyone reading it, and §1 rules out exactly this register. The
   * four public figures above say the same thing with edges on it.
   */
  {
    id: "billions",
    value: "Billions",
    label: "Views and impressions",
    source: "Mishram brand-collaboration proposal, p2 and p6: 'billions of views'.",
    sourceType: "first-party-proposal",
    confirmed: "user-approved: 2026-09",
    public: false,
    note:
      "HELD — unbounded scale language. Specific proof is stronger, and §1 forbids the register. " +
      "Not scheduled for any phase.",
  },
  /**
   * The one claim that cannot be published even in principle as it stands: the
   * proposal's network slide lists **six handles against five follower
   * figures**, so nothing in the document says which figure belongs to whom.
   * Guessing is the §10u error. Unchanged since Revision 28.
   */
  {
    id: "follower-figures",
    value: "—",
    label: "Creator follower counts",
    source:
      "Mishram brand-collaboration proposal, p3/p4 network and viral slides, plus six profile " +
      "screenshots on p8.",
    sourceType: "first-party-screenshot",
    confirmed: "not mappable",
    public: false,
    note:
      "HELD — UNMAPPABLE. Six handles, five figures, and the profile screenshots are a different " +
      "set of creators. §18: no metric, ever, for anybody, without verification.",
  },
  /**
   * Held because the site has no way to show what it is averaging over. An
   * average across an unnamed set is not a checkable statement.
   */
  {
    id: "trending-average",
    value: "10M+",
    label: "Average views per trending creator",
    source:
      "Mishram brand-collaboration proposal, p8: 'an average of more than 10 million views per " +
      "creator'.",
    sourceType: "first-party-proposal",
    confirmed: "user-approved: 2026-09",
    public: false,
    note:
      "HELD — an average over an unnamed and unbounded set. The site cannot state what it is an " +
      "average of, so a reader cannot check it.",
  },
];

/**
 * What actually renders. **Order is the reading order**, and the first record
 * is the one the composition sets at display scale — see `QuickProof`.
 */
export const PUBLIC_PROOF: readonly ProofFact[] = PROOF_FACTS.filter((f) => f.public);

/** Development-only. The register's other half, for whoever reads this next. */
export const HELD_PROOF: readonly ProofFact[] = PROOF_FACTS.filter((f) => !f.public);

/* ── Section copy ───────────────────────────────────────────────── */

export const PROOF_COPY = {
  label: "Across the work",
  /**
   * One line, and it does the framing the numbers cannot do for themselves:
   * it says these are relationships and output, not audience or revenue.
   * **No superlative, no ranking, no "leading", no "#1"** (§1).
   */
  note: "Brands, creators and creator-led content across the work Mishram has run to date.",
} as const;
