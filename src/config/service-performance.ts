/**
 * /services/performance-marketing — all of the page's words.
 *
 * The homepage's Service 03 says what this is in one sentence. This page is the
 * long form of the same claim, so nothing here contradicts `config/services.ts`
 * and nothing here goes beyond §1 of the brief.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CONTENT INTEGRITY — and this page is the hardest one on the site.
 *
 * Performance marketing is the service a visitor most expects to see numbers
 * on, which is exactly why there are none. **There is not one figure anywhere
 * on this route.** No ROAS, CTR, CPA, CPC, CPM, spend, revenue, conversion
 * count, lead volume, percentage lift, growth multiple, client name or case
 * study. Not even a decorative one: a "4.8 ROAS" drawn as illustration is read
 * as a claim, and Mishram has no account data it may publish.
 *
 * **No dashboard, and no platform UI.** Nothing here recreates Meta Ads
 * Manager, borrows its chrome, or uses a Meta logo. No KPI cards, no charts
 * with axes, no traffic-light red/green states, no gauges, no fit meters. The
 * only accent is the site's teal, as everywhere else. What the page draws
 * instead is Mishram's own method — hypothesis, variants, distribution,
 * destination, signal — in the same abstract hairline language §02's Service 03
 * scene already established.
 *
 * **No promised result.** The scope and the FAQ describe method, never outcome:
 * "campaign optimisation", "performance learning", "iteration",
 * "conversion-focused". Never "scale profitably", never a guaranteed CPA, lead
 * volume or return.
 *
 * **No invented minimum budget.** The project holds no record of one, so the
 * FAQ says what the budget actually depends on and that it is settled during
 * planning — rather than publishing a floor nobody agreed.
 *
 * **PLATFORM CLAIM, and where it comes from.** `config/services.ts` lists
 * `Meta Ads` as this service's capability, and the homepage has said so since
 * §02 was approved, so Meta advertising is what the page is built around.
 * Google Ads is *not* promoted to a scope row: the project's own emphasis is
 * Meta, and a scope index is a promise. It is acknowledged once, in the
 * platform FAQ, because Mishram's own schema.org service description — the
 * same source `config/about.ts` cites for "Meta and Google Ads" — does state
 * it. Naming it there and nowhere else is the honest reading of both facts.
 *
 * **No photography.** Not a shortage — a decision. Services 01 and 02 are about
 * people, and this one is about method, so the whole route is CSS, SVG and
 * type. See the note on `PERFORMANCE_WALL` for why the creative surfaces are
 * abstract rather than mock ads.
 * ════════════════════════════════════════════════════════════════════════════
 */

import type {
  ServiceFaqItem,
  ServiceScopeItem,
  ServiceSectionCopy,
  ServiceStep,
} from "./service-pages";

/* ── Hero ───────────────────────────────────────────────────────── */

export const PERFORMANCE_HERO = {
  /** The hero breadcrumb is `SERVICES / <title>`, composed in `ServiceHero`. */
  headline: ["Test the idea.", "Scale what works."] as const,
  /** One serif italic word, on the line that carries the method. */
  accentWord: "works.",
  lead: "We connect creative testing, paid distribution and conversion-focused experiences into one performance system built to learn and improve.",
  detail:
    "Campaign creative, Meta advertising, landing experiences and the testing that decides what runs next — planned together, so what the media learns changes what gets made.",
  /**
   * A dedicated service page opens with the booking ask, and this is the
   * **only** one on the route — §10j's CTA rule. The other ask is the shared
   * inquiry form at the foot.
   */
  primaryCta: "Book a 15-Min Call",
  primaryCtaNote: "15 min · no obligation",
  secondaryCta: "Start a Project",
  /** The concept line under the composition. The sixth move is drawn, not listed. */
  signalPath: ["Hypothesis", "Creative Test", "Distribution", "Landing", "Signal"],
  /**
   * The hero has no photography, so the caption slot carries the thing a
   * performance page most needs to say out loud: the composition is a diagram
   * of a method, not a report from an account.
   */
  note: "Illustrative — the variants, routes and signals are Mishram's own abstractions of how a test is built. No campaign data is shown anywhere on this page.",
  /** Labels inside the composition. Factual and structural only (§10). */
  labels: {
    creative: "Creative test",
    variantA: "Variant A",
    variantB: "Variant B",
    variantC: "Variant C",
    distribution: "Paid distribution",
    landing: "Landing",
    signal: "Signal",
    iterate: "Iterate",
  },
} as const;

/* ── Hypothesis — the calm editorial beat after the hero ────────── */

export const PERFORMANCE_HYPOTHESIS: ServiceSectionCopy & {
  body: readonly string[];
  baseline: readonly string[];
} = {
  label: "Where performance starts",
  headline: ["Better media starts", "with a better hypothesis."],
  accentWord: "hypothesis.",
  lead: "Paid distribution is an amplifier. What it amplifies is decided long before the campaign goes live.",
  body: [
    "Media can put an idea in front of exactly the right people, at whatever scale the budget allows — and it will do that just as efficiently for an unclear message, a weak piece of creative, or a page that gives someone nowhere to go.",
    "So the first question is not how much to spend. It is what we are trying to find out, and what would have to be built for the answer to mean anything.",
  ],
  baseline: ["Hypothesis", "Test", "Decision"],
};

/* ── Creative, and the test bench ────────────────────────────────
   ONE SECTION, TWO MOVEMENTS, and the merge was deliberate.

   These were drafted as two sections — a creative wall and a test bench — and
   both of them showed abstract rectangles that vary. Read in sequence they
   were the same idea twice: here are versions of an ad, and here are versions
   of an ad. Combined they are one argument with a hinge in it — **this is what
   a creative test produces**, then **this is how it is decided** — and the page
   loses a chapter boundary it was not earning. Measured, the merge took ~700px
   out of the route (see §10m of the brief).

   The head is the persuasive line; the bench keeps its own sub-label below the
   hinge, so the interaction is still announced rather than stumbled into.

   **This is an illustration of a method, not a live test and not a report.**
   Nothing here is a campaign anyone ran, and no variant is presented as a
   winner — the record resolves into a decision rule, never a result. */

export const PERFORMANCE_CREATIVE_COPY: ServiceSectionCopy = {
  label: "Creative",
  headline: ["Media buys attention.", "Creative earns it."],
  accentWord: "earns",
  lead: "Targeting decides who sees the ad. Whether they stay is a question about the work — so the creative and the media are built by the same people, and tested one decision at a time.",
};

export type TestVariableId =
  | "hook"
  | "message"
  | "format"
  | "offer"
  | "destination";

/**
 * One abstract creative surface, described as a stack of structural rows.
 *
 * `rule` is a line of type, `block` a media region, `action` the thing being
 * clicked. **No words, no imagery, no numbers** — the shape of a composition is
 * what a structural test actually varies, and drawing headline text into a
 * mockup would put a claim on the page that nobody wrote.
 */
export type SurfaceRow =
  | { k: "rule"; w: number; strong?: boolean }
  | { k: "block"; grow?: number }
  | { k: "action"; w: number; outline?: boolean };

export type TestVariant = {
  /** `A` / `B` / `C` — the variant's name in the experiment. */
  tag: string;
  /** What is different about this one, in three or four words. */
  note: string;
  /** The surface's own shape. Format is a variable, so this varies. */
  aspect: string;
  /** Share of the bench's height, so differing aspects give differing widths. */
  height: number;
  rows: readonly SurfaceRow[];
};

export type TestVariable = {
  id: TestVariableId;
  index: string;
  name: string;
  /** The short line under the name in the index. */
  role: string;
  /** Real DOM text at all times for the active variable — never hover-only. */
  sentence: string;
  /** The illustrative record the experiment resolves into. */
  record: {
    variants: string;
    held: string;
    decision: string;
  };
  variants: readonly TestVariant[];
};

/** The body every variant shares unless the variable is changing it. */
const BODY: readonly SurfaceRow[] = [
  { k: "block", grow: 1 },
  { k: "rule", w: 68 },
  { k: "rule", w: 44 },
];

export const TEST_VARIABLES: readonly TestVariable[] = [
  {
    id: "hook",
    index: "01",
    name: "Hook",
    role: "The first two seconds",
    sentence:
      "Most of what a campaign learns, it learns in the opening. Three ways into the same idea, with everything after them held still.",
    record: {
      variants: "Three openings",
      held: "Message, offer, destination",
      decision: "Keep the opening that earned the next second",
    },
    variants: [
      {
        tag: "A",
        note: "Direct opening",
        aspect: "4 / 5",
        height: 80,
        rows: [{ k: "rule", w: 78, strong: true }, ...BODY, { k: "action", w: 56 }],
      },
      {
        tag: "B",
        note: "Longer setup",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 92, strong: true },
          { k: "rule", w: 62, strong: true },
          ...BODY,
          { k: "action", w: 56 },
        ],
      },
      {
        tag: "C",
        note: "Opens on a question",
        aspect: "4 / 5",
        height: 80,
        rows: [{ k: "rule", w: 40, strong: true }, ...BODY, { k: "action", w: 56 }],
      },
    ],
  },
  {
    id: "message",
    index: "02",
    name: "Message",
    role: "What the ad actually argues",
    sentence:
      "The same product can be sold on what it does, on what it replaces, or on who it is for. The hierarchy of the composition is the argument.",
    record: {
      variants: "Three arguments",
      held: "Hook, format, audience",
      decision: "Keep the argument people stayed for",
    },
    variants: [
      {
        tag: "A",
        note: "Headline-led",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 90, strong: true },
          { k: "rule", w: 70, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 38 },
          { k: "action", w: 52 },
        ],
      },
      {
        tag: "B",
        note: "Balanced",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 74, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 66 },
          { k: "rule", w: 48 },
          { k: "action", w: 52 },
        ],
      },
      {
        tag: "C",
        note: "Detail-led",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 42, strong: true },
          { k: "rule", w: 88 },
          { k: "rule", w: 82 },
          { k: "rule", w: 70 },
          { k: "block", grow: 1 },
          { k: "action", w: 52 },
        ],
      },
    ],
  },
  {
    id: "format",
    index: "03",
    name: "Format",
    role: "The shape it arrives in",
    sentence:
      "A placement is a shape before it is anything else. The same idea has to survive being cropped, and some ideas do not.",
    record: {
      variants: "9:16 / 4:5 / 1:1",
      held: "Hook, message, audience",
      decision: "Keep the shape the idea survives",
    },
    variants: [
      {
        tag: "A",
        note: "9:16",
        aspect: "9 / 16",
        height: 96,
        rows: [{ k: "rule", w: 84, strong: true }, ...BODY, { k: "action", w: 62 }],
      },
      {
        tag: "B",
        note: "4:5",
        aspect: "4 / 5",
        height: 80,
        rows: [{ k: "rule", w: 84, strong: true }, ...BODY, { k: "action", w: 58 }],
      },
      {
        tag: "C",
        note: "1:1",
        aspect: "1 / 1",
        height: 64,
        rows: [{ k: "rule", w: 84, strong: true }, { k: "block", grow: 1 }, { k: "action", w: 54 }],
      },
    ],
  },
  {
    id: "offer",
    index: "04",
    name: "Offer",
    role: "The reason to act now",
    sentence:
      "Where the ask sits, how early it arrives and how much it asks for. A change of framing, not a change of price.",
    record: {
      variants: "Three framings",
      held: "Creative, audience, destination",
      decision: "Keep the framing that made the next step obvious",
    },
    variants: [
      {
        tag: "A",
        note: "Ask at the end",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 80, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 58 },
          { k: "action", w: 74 },
        ],
      },
      {
        tag: "B",
        note: "Ask up front",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "action", w: 60 },
          { k: "rule", w: 80, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 58 },
        ],
      },
      {
        tag: "C",
        note: "Quieter ask",
        aspect: "4 / 5",
        height: 80,
        rows: [
          { k: "rule", w: 80, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 58 },
          { k: "action", w: 40, outline: true },
        ],
      },
    ],
  },
  {
    id: "destination",
    index: "05",
    name: "Destination",
    role: "Where the click lands",
    sentence:
      "The ad is only half of it. Sending the same traffic to differently built pages is one of the most useful tests there is, and one of the least run.",
    record: {
      variants: "Three page structures",
      held: "Creative, message, audience",
      decision: "Keep the page that continued the message",
    },
    variants: [
      {
        tag: "A",
        note: "Long page",
        aspect: "3 / 4",
        height: 84,
        rows: [
          { k: "rule", w: 34 },
          { k: "rule", w: 86, strong: true },
          { k: "block", grow: 1 },
          { k: "rule", w: 78 },
          { k: "rule", w: 64 },
          { k: "block", grow: 1 },
          { k: "rule", w: 70 },
          { k: "action", w: 56 },
        ],
      },
      {
        tag: "B",
        note: "Focused page",
        aspect: "3 / 4",
        height: 84,
        rows: [
          { k: "rule", w: 34 },
          { k: "rule", w: 88, strong: true },
          { k: "rule", w: 60 },
          { k: "block", grow: 1 },
          { k: "action", w: 68 },
        ],
      },
      {
        tag: "C",
        note: "Sectioned page",
        aspect: "3 / 4",
        height: 84,
        rows: [
          { k: "rule", w: 34 },
          { k: "rule", w: 82, strong: true },
          { k: "block", grow: 1 },
          { k: "action", w: 52 },
          { k: "rule", w: 74 },
          { k: "block", grow: 1 },
          { k: "action", w: 52 },
        ],
      },
    ],
  },
];

export const PERFORMANCE_BENCH_LABELS = {
  /** The hinge between the two movements of the creative section. */
  benchLabel: "The test bench",
  benchLead:
    "A test is only useful if you know what it was testing. Choose a variable and the experiment reconfigures around it — the same idea, a different question.",
  variablesLabel: "Test variable",
  activeLabel: "Active experiment",
  recordLabel: "The test record",
  fields: {
    variable: "Variable",
    variants: "Variants",
    held: "Held constant",
    decision: "Next decision",
  },
  /**
   * Rendered on the page rather than left in a comment, exactly as Service 02's
   * match-field disclaimer is. A bench that looks like a real test has to say
   * that it is not one.
   */
  disclaimer:
    "Illustrative. These are Mishram's own abstract compositions of how a structured test is set up — not client creative, not a campaign that ran, and not a result. No variant is shown winning.",
} as const;

/* ── The performance path ───────────────────────────────────────── */

export const PERFORMANCE_PATH_COPY: ServiceSectionCopy = {
  label: "The performance path",
  headline: ["Creative, media and", "destination on one route."],
  lead: "Six moves on a single line, and the sixth is what makes the next round of creative better than this one.",
};

export type PathStageId =
  | "hypothesis"
  | "creative"
  | "distribution"
  | "destination"
  | "signal"
  | "iteration";

export type PathStage = {
  id: PathStageId;
  index: string;
  name: string;
  /** The question this stage answers. */
  question: string;
  detail: string;
};

export const PATH_STAGES: readonly PathStage[] = [
  {
    id: "hypothesis",
    index: "01",
    name: "Hypothesis",
    question: "What are we trying to learn?",
    detail:
      "One thing worth finding out, written down before anything is built — so there is something for the campaign to answer.",
  },
  {
    id: "creative",
    index: "02",
    name: "Creative",
    question: "What versions should we test?",
    detail:
      "The variants that make the question answerable: enough difference between them to matter, and enough held still to be readable.",
  },
  {
    id: "distribution",
    index: "03",
    name: "Distribution",
    question: "Who should see it, and where?",
    detail:
      "Campaign structure, audiences and placements set up so a result can be traced back to a decision rather than to luck.",
  },
  {
    id: "destination",
    index: "04",
    name: "Destination",
    question: "Where does the traffic land?",
    detail:
      "The page after the click, built to continue the same message and make the next step obvious rather than to be guessed at.",
  },
  {
    id: "signal",
    index: "05",
    name: "Signal",
    question: "What did the response tell us?",
    detail:
      "What the behaviour suggests about the creative, the audience and the destination — separated from noise wherever it honestly can be.",
  },
  {
    id: "iteration",
    index: "06",
    name: "Iteration",
    question: "What should change next?",
    detail:
      "The loop closing. What keeps running, what gets rebuilt, and what the next test is allowed to ask.",
  },
];

export const PERFORMANCE_PATH_LABELS = {
  forward: "Creative → Distribution → Landing",
  /** The short label sitting on the return arc, breaking the line. */
  arc: "Iterate",
  /** Stated as text on the narrow rail, where there is no room to draw it. */
  loop: "Iterate → back to the hypothesis",
} as const;

/* ── The variant sheet — the creative section's first movement ───
   **Abstract on purpose, and it is not a shortage of assets.** A mock ad with
   a headline written into it puts a claim on the page nobody agreed to, and a
   mock ad for a recognisable brand implies a client relationship. So these are
   Mishram's own compositions: hierarchy, crop, weight and the position of the
   ask — the things a creative test actually changes.

   Notes are deliberately short. They sit under surfaces as narrow as 110px on
   a phone, and a sentence there wraps into a paragraph. */

export type WallVariant = {
  id: string;
  /** What changed in this version, in one word. */
  change: string;
  note: string;
  aspect: string;
  rows: readonly SurfaceRow[];
};

export const PERFORMANCE_WALL = {
  /** The version everything else is a variation of. */
  primary: {
    id: "primary",
    change: "Original",
    note: "The version we start from.",
    aspect: "4 / 5",
    rows: [
      { k: "rule", w: 86, strong: true },
      { k: "rule", w: 58, strong: true },
      { k: "block", grow: 1 },
      { k: "rule", w: 72 },
      { k: "rule", w: 48 },
      { k: "action", w: 58 },
    ] as readonly SurfaceRow[],
  } satisfies WallVariant,
  variants: [
    {
      id: "hook",
      change: "Hook",
      note: "A different way in.",
      aspect: "4 / 5",
      rows: [
        { k: "rule", w: 44, strong: true },
        { k: "block", grow: 1 },
        { k: "rule", w: 72 },
        { k: "rule", w: 48 },
        { k: "action", w: 58 },
      ],
    },
    {
      id: "hierarchy",
      change: "Hierarchy",
      note: "Same words, weighted differently.",
      aspect: "4 / 5",
      rows: [
        { k: "block", grow: 1 },
        { k: "rule", w: 88, strong: true },
        { k: "rule", w: 62 },
        { k: "action", w: 58 },
      ],
    },
    {
      id: "crop",
      change: "Crop",
      note: "Closer to the subject.",
      aspect: "1 / 1",
      rows: [
        { k: "rule", w: 66, strong: true },
        { k: "block", grow: 2 },
        { k: "action", w: 52 },
      ],
    },
    {
      id: "format",
      change: "Format",
      note: "Rebuilt vertical, not cropped.",
      aspect: "9 / 16",
      rows: [
        { k: "rule", w: 80, strong: true },
        { k: "block", grow: 1 },
        { k: "rule", w: 60 },
        { k: "action", w: 70 },
      ],
    },
  ] as readonly WallVariant[],
  sheetLabel: "One idea, five versions",
  changeLabel: "What changed",
  caption:
    "Abstract compositions built for this page. No client creative, no brand, no campaign and no result is shown.",
  /**
   * The route's one mid-page contextual link (§10j's CTA rule). It points at a
   * service page that **exists** — nothing on this site links to an unbuilt
   * route. Creator content genuinely is some of the strongest paid creative
   * there is, so the link is an argument rather than a cross-sell.
   */
  action: "See how we run creator campaigns",
  actionHref: "/services/influencer-marketing",
} as const;

/* ── The landing experience ─────────────────────────────────────── */

export const PERFORMANCE_LANDING: ServiceSectionCopy & {
  body: readonly string[];
  requirements: readonly { index: string; name: string; note: string }[];
  labels: { desktop: string; mobile: string; path: readonly string[] };
  caption: string;
} = {
  label: "The destination",
  headline: ["The ad is only", "half the journey."],
  lead: "Traffic has to arrive somewhere built to continue the message and make the next step obvious.",
  body: [
    "A campaign is usually judged on the ad, and then lost on the page. The click is the easy half — what happens in the ten seconds after it is where most of the budget actually goes.",
    "Mishram builds the destination as well, so the page can be designed alongside the campaign instead of inherited from it.",
  ],
  requirements: [
    {
      index: "01",
      name: "Continue the message",
      note: "The page picks up the sentence the ad started, in the same words.",
    },
    {
      index: "02",
      name: "Make the next step obvious",
      note: "One thing to do, visible without hunting for it, on the first screen.",
    },
    {
      index: "03",
      name: "Arrive fast",
      note: "A page that keeps someone waiting has already spent the click.",
    },
    {
      index: "04",
      name: "Fit the device it was opened on",
      note: "Paid social traffic is a phone. The mobile view is the real page, not the fallback.",
    },
  ],
  labels: {
    desktop: "Desktop",
    mobile: "Mobile",
    path: ["Arrive", "Understand", "Act"],
  },
  caption:
    "An abstract interface, not a client site. No browser chrome, no brand, no checkout and no data.",
};

/* ── What we optimise ───────────────────────────────────────────── */

/**
 * **A movement of the performance path, not a section of its own.**
 *
 * Drafted as a standalone chapter and folded in during the length pass, for a
 * better reason than length: the path draws the loop, and this names what the
 * loop is allowed to change. Read together they are one idea; read as two
 * chapters they repeated each other's nouns — distribution, destination and
 * creative appeared in both, a screen apart, which reads as a page saying the
 * same thing twice rather than at two altitudes.
 */
export const PERFORMANCE_OPTIMISATION: {
  label: string;
  headline: string;
  lead: string;
  tracks: readonly { index: string; name: string; note: string }[];
  states: readonly string[];
} = {
  label: "What we optimise",
  headline: "Optimisation is a series of better decisions.",
  lead: "Not a dial that gets turned. Five things can change between one round and the next, and the useful question is always which one — and why.",
  tracks: [
    {
      index: "01",
      name: "Message",
      note: "Which argument the campaign is actually making.",
    },
    {
      index: "02",
      name: "Creative",
      note: "Which versions keep running, and what replaces the rest.",
    },
    {
      index: "03",
      name: "Distribution",
      note: "Who the media is spent against, and how the campaign is structured to spend it.",
    },
    {
      index: "04",
      name: "Destination",
      note: "What the page does with the traffic once it arrives.",
    },
    {
      index: "05",
      name: "Next action",
      note: "What someone is asked to do, and how soon they are asked.",
    },
  ],
  /** The three states every track moves through. Never a number. */
  states: ["Test", "Learn", "Adjust"],
};

/* ── Scope ──────────────────────────────────────────────────────── */

export const PERFORMANCE_SCOPE_COPY: ServiceSectionCopy = {
  label: "Scope",
  headline: ["What we handle", "on a performance engagement."],
  lead: "Shaped around what already exists — creative, media, destination, or all three.",
};

/**
 * **Meta advertising is named; Google Ads is not.** See the platform note at
 * the head of this file. Nothing here promises a result: the language is
 * method — structure, testing, optimisation, learning — because that is what
 * Mishram can honestly commit to before knowing the account.
 */
export const PERFORMANCE_SCOPE: readonly ServiceScopeItem[] = [
  {
    id: "strategy",
    index: "01",
    name: "Performance Strategy",
    detail:
      "What the campaign is for, what it has to prove, and which of the many things that could be tested is worth testing first.",
  },
  {
    id: "meta",
    index: "02",
    name: "Meta Advertising",
    detail:
      "Campaigns across Instagram and Facebook — set up, run and adjusted day to day, with the reasoning behind each change written down.",
  },
  {
    id: "structure",
    index: "03",
    name: "Campaign Structure",
    detail:
      "How campaigns, ad sets and budgets are organised, so a change in the response can be traced back to a decision rather than guessed at.",
  },
  {
    id: "creative",
    index: "04",
    name: "Campaign Creative",
    detail:
      "The ads themselves — hooks, messaging, formats and the variants a real test needs, made for the placement rather than cropped into it.",
  },
  {
    id: "testing",
    index: "05",
    name: "Creative Testing",
    detail:
      "Changing one thing at a time and recording what it was, so every round of spend returns something you did not know before.",
  },
  {
    id: "audience",
    index: "06",
    name: "Audience Strategy",
    detail:
      "Who the media is spent against, how broadly, and how that changes as the campaign learns who is actually responding.",
  },
  {
    id: "landing",
    index: "07",
    name: "Landing Experience Direction",
    detail:
      "What the page after the click has to say and do — planned with the campaign, and built by us where that is the faster route.",
  },
  {
    id: "optimisation",
    index: "08",
    name: "Campaign Optimisation",
    detail:
      "The decisions between rounds: what keeps running, what gets rebuilt, what stops, and what the next test asks.",
  },
  {
    id: "reporting",
    index: "09",
    name: "Reporting & Learning",
    detail:
      "What happened, what it suggests and what we would do differently — written in plain language rather than exported as a dashboard.",
  },
];

/* ── Who it is for ──────────────────────────────────────────────── */

export const PERFORMANCE_AUDIENCE = {
  label: "Who it is for",
  statement: ["Built for teams", "that want more than ad spend."] as const,
  note: "Performance works when there is something worth distributing and somewhere worth sending people. It is not a way to make an unclear offer work by spending more against it.",
  audiences: [
    "Brands running paid social",
    "D2C businesses",
    "Service businesses",
    "Creator-led brands",
    "Product and offer launches",
  ] as const,
} as const;

/* ── Process ────────────────────────────────────────────────────── */

export const PERFORMANCE_PROCESS_COPY: ServiceSectionCopy = {
  label: "How it runs",
  headline: ["From hypothesis", "to the next test."],
  lead: "Five moves, and the fifth is the one that makes the second round better than the first.",
};

export const PERFORMANCE_PROCESS: readonly ServiceStep[] = [
  {
    index: "01",
    name: "Define the hypothesis.",
    detail:
      "What we are trying to learn, and what would count as having learned it. Written before anything is built.",
  },
  {
    index: "02",
    name: "Build the test.",
    detail:
      "Creative variants, campaign structure and destination, set up so one thing varies and everything else holds still.",
  },
  {
    index: "03",
    name: "Launch the distribution.",
    detail:
      "The campaign goes live against the audience the hypothesis needs, structured so the response can be read.",
  },
  {
    index: "04",
    name: "Read the signal.",
    detail:
      "What the response suggests about the creative, the audience and the page — and how confident that reading honestly is.",
  },
  {
    index: "05",
    name: "Iterate.",
    detail:
      "What changes, what stays, and what the next test is allowed to ask now that this one has answered.",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────── */

export const PERFORMANCE_FAQ_COPY: ServiceSectionCopy = {
  label: "Questions",
  headline: ["What people ask", "before the first test."],
};

export const PERFORMANCE_FAQ: readonly ServiceFaqItem[] = [
  {
    id: "platforms",
    question: "What platforms do you run performance campaigns on?",
    answer:
      "Meta — Instagram and Facebook — is what this service is built around, and it is where the creative testing described here happens. Google Ads sits within Mishram's wider capability; if search is central to what you need, raise it early so we can scope it honestly rather than assume it.",
  },
  {
    id: "creative",
    question: "Do you make the ads as well, or only run the media?",
    answer:
      "We make them, and we would rather. The creative and the media are the same decision made twice, and a test is far easier to read when the same people control what is being varied and what is being held still.",
  },
  {
    id: "landing",
    question: "Can you improve the landing page too?",
    answer:
      "Yes. Mishram builds websites and landing experiences, so the destination can be designed alongside the campaign rather than inherited from it. If you would rather keep the page you have, we will direct what needs to change on it instead.",
  },
  {
    id: "what-to-test",
    question: "How do you decide what to test?",
    answer:
      "From the hypothesis. We look at where the campaign is most likely to be losing people — the opening, the message, the format, the offer or the page — and change one of those at a time, so whatever the response says is attributable to something.",
  },
  {
    id: "budget",
    question: "Do I need a large advertising budget to start?",
    answer:
      "There is no published minimum, and we would rather not invent one. What the budget needs to be depends on the objective, the market, how much creative the test needs and how large the campaign has to be for the answer to mean anything — so it is worked out together during planning.",
  },
  {
    id: "alongside",
    question: "Can performance marketing run alongside influencer campaigns?",
    answer:
      "Yes, and it is often the better version of both. Creator content is frequently the strongest material a paid campaign has, and Mishram runs influencer marketing too — so the same work can be planned once and used in both places.",
  },
];

/* ── Inquiry ────────────────────────────────────────────────────── */

export const PERFORMANCE_INQUIRY = {
  note: "Performance Marketing",
  context:
    "Tell us what you are selling, who it is for, and what is already running. We will come back with what we would test first, and what would have to be built for that test to mean anything.",
} as const;
