/**
 * /services/influencer-marketing — all of the page's words.
 *
 * The homepage's Service 02 says what this is in one sentence. This page is the
 * long form of the same claim, so nothing here contradicts `config/services.ts`
 * and nothing here goes beyond §1 of the brief.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CONTENT INTEGRITY, and it is stricter here than on any page so far, because
 * influencer marketing is the category where invented numbers are normal.
 *
 * **There is not one figure on this page.** No reach, no impressions, no views,
 * no follower counts, no engagement rate, no ROI, no conversion lift, no
 * creator count, no campaign count, no client names, no case studies. The page
 * has to work on clarity alone — and it does, because what a brand is actually
 * buying is judgement, not a spreadsheet.
 *
 * **No claimed software.** Mishram matches creators by thinking about them.
 * There is no audience-intelligence platform, no AI matching engine and no
 * proprietary score, so none is described, drawn or implied. The Creator Match
 * Field is explicitly an illustration of a way of deciding, not a product.
 *
 * **No creator is categorised.** The project holds no record of which creator
 * suits which campaign intent, so nothing anywhere maps a real name to a
 * strategic attribute. See `CreatorMatchField` for how that constraint shaped
 * the interaction rather than being bolted on afterwards.
 *
 * **Nothing about money.** Negotiation, contracts, rate cards and creator
 * payments are deliberately absent from the scope: the project has no evidence
 * Mishram manages any of them, and a service page is the wrong place to find
 * out. They can be added the moment the client confirms it.
 */

import type {
  ServiceFaqItem,
  ServicePillar,
  ServiceScopeItem,
  ServiceSectionCopy,
  ServiceStep,
} from "./service-pages";

/* ── Hero ───────────────────────────────────────────────────────── */

export const INFLUENCER_HERO = {
  headline: ["Find the right voices.", "Build the right campaign."] as const,
  /**
   * One serif italic word, on the first line. `right` appears twice in the
   * headline and only the first is accented — accenting both would turn a
   * rhyme into a tic.
   */
  accentWord: "right",
  lead: "We connect brands with creators who fit the audience, the idea and the campaign — then coordinate the work from brief to launch.",
  detail:
    "Creator discovery, campaign strategy, collaborations and execution — handled as one piece of work rather than a list of names sent over email.",
  primaryCta: "Book a 15-Min Call",
  primaryCtaNote: "15 min · no obligation",
  secondaryCta: "Start a Project",
  /** The concept line under the composition. */
  signalPath: ["Objective", "Creator Fit", "Collaboration", "Distribution"],
  /** Factual attribution for the photography in the hero composition. */
  pictured: "Pictured — creators from the Mishram Media network",
  /** The centre of the constellation. */
  centreLabel: "Campaign",
} as const;

/* ── Relevance — the calm beat after the hero ───────────────────── */

export const INFLUENCER_RELEVANCE: ServiceSectionCopy & {
  body: readonly string[];
  baseline: readonly string[];
} = {
  label: "Why it matters",
  headline: ["Reach is easy to count.", "Relevance is harder to find."],
  accentWord: "Relevance",
  body: [
    "Anyone can sort creators by audience size. That is the part a spreadsheet does, and it is the part that most often produces a campaign nobody remembers — the right number of people seeing something from the wrong person.",
    "The decision that matters is quieter: whose audience actually cares about this, whose way of making things suits the idea, and who can say it without sounding like they were paid to.",
  ],
  baseline: ["Fit", "Idea", "Coordination"],
};

/* ── The Creator Match Field — the page's signature interaction ─── */

export const INFLUENCER_MATCH_COPY: ServiceSectionCopy = {
  label: "The match field",
  headline: ["One objective,", "many possible routes."],
  lead: "A campaign intent changes the shape of the whole plan — who it needs, what gets made, and how it goes out. Choose one and watch the route redraw.",
};

export type CampaignIntentId =
  | "awareness"
  | "product-story"
  | "launch"
  | "cultural"
  | "creator-led";

export type CampaignIntent = {
  id: CampaignIntentId;
  index: string;
  name: string;
  /** The short line under the name in the index. */
  role: string;
  /** Real DOM text at all times for the active intent — never hover-only. */
  sentence: string;
  /**
   * The illustrative brief this intent resolves into. **Deliberately generic**
   * — these are shapes a plan can take, not a plan, and certainly not a
   * campaign anyone ran.
   */
  brief: {
    objective: string;
    mix: string;
    format: string;
    distribution: string;
  };
  /** Which format nodes the route runs through. Indices into FORMAT_NODES. */
  route: readonly number[];
};

/**
 * The nodes a campaign route can pass through. **Formats and stages, never
 * people** — the route is drawn between these, which is what lets the
 * interaction show a decision without ever asserting that a named real creator
 * suits a particular intent.
 */
export const FORMAT_NODES: readonly { id: string; label: string; x: number; y: number }[] = [
  { id: "short", label: "Short-form", x: 40, y: 16 },
  { id: "series", label: "Series", x: 46, y: 32 },
  { id: "story", label: "Story-led", x: 38, y: 50 },
  { id: "multi", label: "Multi-voice", x: 62, y: 22 },
  { id: "moment", label: "Moment", x: 66, y: 46 },
  { id: "longer", label: "Longer-form", x: 58, y: 56 },
];

export const CAMPAIGN_INTENTS: readonly CampaignIntent[] = [
  {
    id: "awareness",
    index: "01",
    name: "Awareness",
    role: "Be seen by the right rooms",
    sentence:
      "Breadth, but chosen breadth. Several voices carrying one recognisable idea into audiences that do not already overlap.",
    brief: {
      objective: "Reach the right rooms",
      mix: "Multi-voice",
      format: "Short-form",
      distribution: "Staggered release",
    },
    route: [0, 3],
  },
  {
    id: "product-story",
    index: "02",
    name: "Product Story",
    role: "Explain the thing properly",
    sentence:
      "Fewer creators, more room. The point is that someone credible takes the time to show what the product actually does.",
    brief: {
      objective: "Show it working",
      mix: "Focused",
      format: "Story-led",
      distribution: "Sequenced",
    },
    route: [2, 5],
  },
  {
    id: "launch",
    index: "03",
    name: "Launch",
    role: "Arrive everywhere at once",
    sentence:
      "Timing is the creative decision. Several creators publishing inside one window so the thing feels like an event rather than a post.",
    brief: {
      objective: "Make it an event",
      mix: "Multi-voice",
      format: "Short-form",
      distribution: "Coordinated window",
    },
    route: [0, 3, 4],
  },
  {
    id: "cultural",
    index: "04",
    name: "Cultural Relevance",
    role: "Belong to the conversation",
    sentence:
      "Built around something already happening. The brand joins a moment instead of announcing one, which only works if the creator genuinely belongs in it.",
    brief: {
      objective: "Join the moment",
      mix: "Native voices",
      format: "Moment-led",
      distribution: "Responsive",
    },
    route: [4, 1],
  },
  {
    id: "creator-led",
    index: "05",
    name: "Creator-Led Content",
    role: "Hand over the making",
    sentence:
      "The brief sets the boundaries and the creator makes the work. Output the brand can keep using, made by people whose audience already trusts how they make it.",
    brief: {
      objective: "Make work worth reusing",
      mix: "Selective",
      format: "Series",
      distribution: "Ongoing",
    },
    route: [1, 2],
  },
];

export const INFLUENCER_MATCH_LABELS = {
  intentsLabel: "Campaign intent",
  objective: "Objective",
  briefLabel: "The shape of the brief",
  fields: {
    objective: "Objective",
    mix: "Creator mix",
    format: "Format",
    distribution: "Distribution",
  },
  /**
   * Rendered on the page, not buried in a comment. The field shows real
   * creators because the network is real; it must not be read as saying any of
   * them is filed under a campaign type.
   */
  disclaimer:
    "Illustrative. The creator surfaces show the network, not a categorisation — on a real campaign the shortlist is built against the brief, by people, one brand at a time.",
} as const;

/* ── The campaign system ────────────────────────────────────────── */

export const INFLUENCER_SYSTEM_COPY: ServiceSectionCopy = {
  label: "The campaign system",
  headline: ["Many voices,", "one coordinated campaign."],
  lead: "Influencer work goes wrong in the gaps — between the objective and the shortlist, the brief and the making, the making and the launch. This is how those gaps get closed.",
};

/** Five stages. The strands narrow across them: many voices becoming one campaign. */
export const CAMPAIGN_STAGES: readonly ServicePillar[] = [
  {
    id: "objective",
    index: "01",
    name: "Objective",
    verb: "Define",
    sentence:
      "What the collaboration is actually for — and what it would look like if it worked.",
    terms: ["Brand goal", "Audience", "Success looks like"],
  },
  {
    id: "fit",
    index: "02",
    name: "Creator Fit",
    verb: "Match",
    sentence:
      "Who makes sense for this audience and this idea, judged on context and craft rather than on audience size.",
    terms: ["Discovery", "Shortlist", "Context"],
  },
  {
    id: "brief",
    index: "03",
    name: "Brief",
    verb: "Frame",
    sentence:
      "Enough direction that the brand gets what it needs, and enough room that the creator still sounds like themselves.",
    terms: ["Direction", "Boundaries", "Freedom"],
  },
  {
    id: "coordination",
    index: "04",
    name: "Coordination",
    verb: "Run",
    sentence:
      "Content, timing, approvals and communication kept in one place, so a campaign across several people behaves like one campaign.",
    terms: ["Communication", "Timing", "Approvals"],
  },
  {
    id: "launch",
    index: "05",
    name: "Launch + Learn",
    verb: "Release",
    sentence:
      "Everything goes out in the shape it was planned in, and what the response teaches carries into the next collaboration.",
    terms: ["Rollout", "Response", "Review"],
  },
];

export const CAMPAIGN_SYSTEM_LABELS = {
  strandsLabel: "Many voices",
  trunkLabel: "One campaign",
} as const;

/* ── Creator proof ──────────────────────────────────────────────── */

export const INFLUENCER_PROOF = {
  label: "Selected creators from our network",
  headline: ["The network is", "the starting point."] as const,
  lead: "Influencer work depends on knowing people before a brand needs them. These are creators Mishram has worked with and built alongside.",
  /**
   * The only claim made about these portraits, and the only one the project can
   * evidence. **No campaign is attributed to any of them**, because none is
   * recorded — the section proves a relationship exists, not that a particular
   * piece of work happened.
   */
  caption:
    "Portraits from the Mishram Media creator network. No campaign, client or result is attributed to any of them here.",
  action: "Explore our creator network",
  actionHref: "/#creators",
} as const;

/* ── Why fit matters ────────────────────────────────────────────── */

export const INFLUENCER_FIT: ServiceSectionCopy & {
  body: readonly string[];
  pairs: readonly { a: string; b: string; note: string }[];
} = {
  label: "Creator fit",
  headline: ["The biggest creator", "isn't always the right creator."],
  body: [
    "A collaboration works when several quieter things line up at once. None of them shows up in a follower count, and all of them are visible if you actually watch the work.",
  ],
  pairs: [
    {
      a: "Audience",
      b: "Context",
      note: "The people are right, and the setting they meet the brand in is right too.",
    },
    {
      a: "Creative",
      b: "Format",
      note: "The idea suits how this creator already makes things, rather than fighting it.",
    },
    {
      a: "Timing",
      b: "Objective",
      note: "The moment the work lands is doing as much as the work itself.",
    },
    {
      a: "Voice",
      b: "Brand",
      note: "It sounds like them and it still says what the brand needed said.",
    },
  ],
};

/* ── Scope ──────────────────────────────────────────────────────── */

export const INFLUENCER_SCOPE_COPY: ServiceSectionCopy = {
  label: "Scope",
  headline: ["What we handle", "on a campaign."],
  lead: "Shaped around where a campaign starts and how much of it you want to run yourself.",
};

/**
 * **Deliberately no negotiation, contracts, rate cards or creator payments.**
 * The project holds no evidence Mishram manages any of those, and a service
 * page is the wrong place for a brand to find that out. Add them the moment the
 * client confirms it.
 */
export const INFLUENCER_SCOPE: readonly ServiceScopeItem[] = [
  {
    id: "strategy",
    index: "01",
    name: "Influencer Campaign Strategy",
    detail:
      "What the campaign is for, what shape it should take, and which kind of collaboration actually serves the objective.",
  },
  {
    id: "discovery",
    index: "02",
    name: "Creator Discovery",
    detail:
      "Finding the people who fit — from the network we already know, and beyond it where the brief needs someone we do not.",
  },
  {
    id: "shortlist",
    index: "03",
    name: "Creator Shortlisting",
    detail:
      "A considered shortlist with the reasoning attached, so the choice is a decision you can make rather than a list you have to sift.",
  },
  {
    id: "briefing",
    index: "04",
    name: "Campaign Briefing",
    detail:
      "The brief each creator actually works from: direction, boundaries and reference, without flattening the voice you picked them for.",
  },
  {
    id: "communication",
    index: "05",
    name: "Creator Communication",
    detail:
      "Being the line between brand and creator through the whole campaign, so neither side is chasing the other for an answer.",
  },
  {
    id: "coordination",
    index: "06",
    name: "Collaboration Coordination",
    detail:
      "Timelines, deliverables, approvals and revisions tracked in one place across everyone involved.",
  },
  {
    id: "content",
    index: "07",
    name: "Content Planning & Rollout",
    detail:
      "What goes out, from whom, in what order and when — so a campaign across several people lands as one thing.",
  },
  {
    id: "review",
    index: "08",
    name: "Campaign Review",
    detail:
      "What the response suggests about the creative, the mix and the timing, written down so the next campaign starts further along.",
  },
];

/* ── Who it is for ──────────────────────────────────────────────── */

export const INFLUENCER_AUDIENCE = {
  label: "Who it is for",
  statement: ["Built for brands", "entering the conversation."] as const,
  note: "Creator work suits a brand with something worth saying and a reason for someone else to say it. It is not a shortcut for a product that has not found its story yet.",
  audiences: [
    "Consumer brands",
    "D2C brands",
    "Lifestyle brands",
    "Product launches",
    "Brands new to creator-led marketing",
  ] as const,
} as const;

/* ── Process ────────────────────────────────────────────────────── */

export const INFLUENCER_PROCESS_COPY: ServiceSectionCopy = {
  label: "How it runs",
  headline: ["From objective", "to response."],
  lead: "Five moves, and the fifth is what makes the next campaign better than this one.",
};

export const INFLUENCER_PROCESS: readonly ServiceStep[] = [
  {
    index: "01",
    name: "Understand the campaign.",
    detail:
      "What the brand needs, who it is for, and what would count as this having worked.",
  },
  {
    index: "02",
    name: "Shape the creator mix.",
    detail:
      "How many voices, at what kind of scale, and why each one earns a place in the plan.",
  },
  {
    index: "03",
    name: "Build the brief.",
    detail:
      "Direction every creator can work from without losing what made them worth briefing.",
  },
  {
    index: "04",
    name: "Coordinate the rollout.",
    detail:
      "Content, approvals and timing held together so everything lands in the shape it was planned in.",
  },
  {
    index: "05",
    name: "Learn from the response.",
    detail:
      "What the work actually did, and what that changes about the next collaboration.",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────── */

export const INFLUENCER_FAQ_COPY: ServiceSectionCopy = {
  label: "Questions",
  headline: ["Before you", "get in touch."],
};

export const INFLUENCER_FAQ: readonly ServiceFaqItem[] = [
  {
    id: "choose",
    question: "How do you choose influencers for a campaign?",
    answer:
      "By starting from the objective rather than from a list. We look at whose audience this genuinely matters to, whether the idea suits how that creator already makes things, and whether they can say it without it sounding bought. Audience size is one input among several, not the first one.",
  },
  {
    id: "outside-network",
    question: "Can you work with creators outside your existing network?",
    answer:
      "Yes. The network is where we start because we already know how those people work, but a brief regularly points somewhere else — and finding the right person we have not worked with before is part of the job.",
  },
  {
    id: "coordination",
    question: "Do you handle creator outreach and coordination?",
    answer:
      "Yes. Outreach, briefing, communication, timelines, approvals and rollout can all sit with us, so the brand has one conversation instead of one per creator.",
  },
  {
    id: "idea",
    question: "Can you help us develop the campaign idea as well?",
    answer:
      "Often that is the more useful half. Plenty of campaigns arrive as a product and a budget, and the work is turning that into something a creator can make well and an audience will actually watch.",
  },
  {
    id: "scale",
    question: "Do you work with micro-creators as well as larger creators?",
    answer:
      "Creator scale is a decision the campaign makes, not a preference we bring. Some objectives are better served by several smaller, closer audiences and others by fewer larger ones — we would work that out with you against the brief rather than start from a size.",
  },
  {
    id: "paid",
    question: "Can influencer marketing work alongside paid media?",
    answer:
      "Yes, and it usually should. Creator content is often the strongest material a paid campaign has, and Mishram runs performance marketing too — so the same work can be planned once and used in both places.",
  },
];

/* ── Inquiry ────────────────────────────────────────────────────── */

export const INFLUENCER_INQUIRY = {
  note: "Influencer Marketing",
  context:
    "Tell us what the campaign needs to do, who it is meant to reach, and whether you have creators in mind already. We will come back with how we would shape it and who it might involve.",
} as const;
