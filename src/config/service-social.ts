/**
 * /services/social-personal-brand-growth — all of the page's words.
 *
 * The homepage's Service 01 says what this is in one sentence. This page is the
 * long form of the same claim, so nothing here contradicts `config/services.ts`
 * and nothing here goes beyond §1 of the brief.
 *
 * CONTENT INTEGRITY, and it is the reason several obvious lines are missing.
 * There are **no follower figures, growth percentages, reach numbers, ROI,
 * campaign results, testimonials or named brand relationships** anywhere on
 * this page. Every capability listed is one Mishram already states it offers.
 * The proof section shows real creator photography from `config/creators.ts`
 * and claims exactly what the homepage claims about the same portraits — that
 * they are creators in the Mishram network — and nothing more.
 */

import type {
  ServiceFaqItem,
  ServicePillar,
  ServiceScopeItem,
  ServiceSectionCopy,
  ServiceStep,
} from "./service-pages";
import { CREATORS, type Creator } from "./creators";

/**
 * THE ONE CREATOR THIS ROUTE IS BUILT ON — named once, read by both the hero
 * composition and its attribution line.
 *
 * **Vishnu Priya, and the choice is the media ledger's rather than taste.**
 * Revision 28 rebuilt the Hero around Ali Fazal and Akash Sagar while keeping
 * Zoya Jaan, Nikita Kumawat and Lovekesh Kataria — so those five are spoken
 * for on the homepage. Exactly two published creators came *off* the Hero,
 * Mukul Sharma and Vishnu Priya, and Mukul already carries the Content System
 * Board further down this page. **That leaves one creator who appears nowhere
 * on the homepage's first screen, and she anchors this one.**
 *
 * She also arrived with all three crops already tuned in `config/creators.ts`,
 * so the swap needed no new art direction.
 *
 * Exported so the attribution below is *derived*. Hardcoding it is what let
 * the caption read "Zoya Jaan" under somebody else's photograph for one build.
 */
const SOCIAL_ANCHOR_ID = "vishnu";

export const SOCIAL_ANCHOR: Creator = (() => {
  const found = CREATORS.find((c) => c.id === SOCIAL_ANCHOR_ID);
  if (!found) {
    throw new Error(`SOCIAL_ANCHOR: unknown creator "${SOCIAL_ANCHOR_ID}"`);
  }
  return found;
})();

/* ── Hero ───────────────────────────────────────────────────────── */

export const SOCIAL_HERO = {
  /** The hero breadcrumb is `SERVICES / <title>`, composed in `ServiceHero`. */
  headline: ["Build a brand", "people remember."] as const,
  /** One serif italic word, on the line that carries the promise. */
  accentWord: "remember.",
  lead: "We build the positioning, content systems and social presence that turn individual attention into a recognisable personal brand.",
  detail:
    "Social media management, content strategy, creator growth and personal branding — run as one system rather than a posting schedule.",
  /**
   * A dedicated service page is a conversion surface, so it opens with the
   * booking ask. The homepage's "exactly once" rule (§13) is a homepage rule;
   * what carries over is the restraint — this is the **only** booking CTA on
   * the route, and the only other ask is the inquiry form at the foot.
   */
  primaryCta: "Book a 15-Min Call",
  primaryCtaNote: "15 min · no obligation",
  secondaryCta: "Start a Project",
  /** The concept line under the composition. */
  signalPath: ["Positioning", "Content System", "Social Presence", "Recognition"],
  /**
   * Factual attribution for the photography in the hero composition.
   *
   * **DERIVED FROM THE ANCHOR, NOT TYPED — and Revision 31 is why.** This line
   * read "Pictured — Zoya Jaan" while it was hardcoded. Changing
   * `BrandSignal`'s anchor to Vishnu Priya left the caption naming the wrong
   * creator under her photograph, which is an identity error of exactly the
   * class §10u cost a whole revision to learn: **a person's name must never be
   * able to drift from the image beside it.**
   *
   * It now reads the anchor's own record, so the two cannot disagree again.
   * Swapping the anchor is one id in `BrandSignal.tsx` and the caption follows.
   */
  pictured: `Pictured — ${SOCIAL_ANCHOR.name}, Mishram creator network`,
} as const;

/* ── Positioning — the calm editorial beat after the hero ───────── */

export const SOCIAL_POSITIONING: ServiceSectionCopy & {
  body: readonly string[];
  baseline: readonly string[];
} = {
  label: "Why it matters",
  headline: ["Attention is temporary.", "Recognition compounds."],
  accentWord: "Recognition",
  body: [
    "A post can travel and leave nothing behind. A brand is what people can still describe once the post is gone — a point of view they recognise, formats they expect, and a presence that turns up often enough to be remembered.",
    "So the work is not a posting schedule. It is an identity, a repeatable content system, and a consistent place to be found.",
  ],
  baseline: ["Identity", "System", "Presence"],
};

/* ── What we actually build — one connected system ──────────────── */

export const SOCIAL_SYSTEM_COPY: ServiceSectionCopy = {
  label: "What we build",
  headline: ["Built as one system,", "not four services."],
  lead: "Positioning, content, publishing and learning are a single loop. Each part sets up the next, and what an audience responds to feeds back into the direction.",
};

export const SOCIAL_PILLARS: readonly ServicePillar[] = [
  {
    id: "positioning",
    index: "01",
    name: "Positioning",
    verb: "Define",
    sentence:
      "What you stand for, who it is for, and the point of view that makes you recognisable rather than familiar.",
    terms: ["Voice", "Point of View", "Audience", "Brand Direction"],
  },
  {
    id: "content-system",
    index: "02",
    name: "Content System",
    verb: "Create",
    sentence:
      "The pillars, formats and recurring series that make output repeatable instead of invented every week.",
    terms: ["Content Pillars", "Formats", "Recurring Series", "Content Planning"],
  },
  {
    id: "social-presence",
    index: "03",
    name: "Social Presence",
    verb: "Operate",
    sentence:
      "Publishing, platform consistency and the day-to-day coordination that keeps a presence alive between the good ideas.",
    terms: ["Publishing", "Platform Consistency", "Coordination", "Audience Touchpoints"],
  },
  {
    id: "growth-loop",
    index: "04",
    name: "Growth Loop",
    verb: "Learn",
    sentence:
      "What resonated, which formats earned attention, what deserves repeating, and where the direction should move next.",
    terms: ["What Resonates", "Formats That Work", "What to Repeat", "Where to Evolve"],
  },
];

/** The label on the return path — the loop closing back into positioning. */
export const SOCIAL_SYSTEM_LOOP = "Learn → Reposition";

/* ── The content system board — the page's signature interaction ── */

export const SOCIAL_BOARD_COPY: ServiceSectionCopy = {
  label: "The content system",
  headline: ["What a personal brand", "actually repeats."],
  lead: "Five kinds of communication, used deliberately. A brand is what happens when they stop being occasional.",
};

export type BoardPillarId =
  | "positioning"
  | "education"
  | "personality"
  | "proof"
  | "community";

export type BoardPillar = {
  id: BoardPillarId;
  index: string;
  name: string;
  /** The short line under the name in the index. */
  role: string;
  /** Real DOM text at all times for the active pillar — never hover-only. */
  sentence: string;
  /** Format names. Descriptive capability, never a claim about results. */
  formats: readonly string[];
};

export const SOCIAL_BOARD_PILLARS: readonly BoardPillar[] = [
  {
    id: "positioning",
    index: "01",
    name: "Positioning",
    role: "The lines people repeat about you",
    sentence:
      "Says what you stand for and who it is for, in words an audience can repeat without you in the room.",
    formats: ["Bio", "Pinned content", "Point-of-view posts", "Profile"],
  },
  {
    id: "education",
    index: "02",
    name: "Education",
    role: "Content that teaches something",
    sentence:
      "Answers a question the audience already has, in a format they can actually finish — and can come back to.",
    formats: ["Carousels", "Explainers", "Recurring series", "Long-form"],
  },
  {
    id: "personality",
    index: "03",
    name: "Personality",
    role: "The part only you can post",
    sentence:
      "Face, voice and opinion — the reason a feed reads as a person rather than a brand account with a name on it.",
    formats: ["Reels", "Behind the scenes", "Opinion", "Everyday"],
  },
  {
    id: "proof",
    index: "04",
    name: "Proof",
    role: "Evidence, not adjectives",
    sentence:
      "Work shown as a record rather than announced as a headline — the content that makes the positioning believable.",
    formats: ["Work records", "Notes", "Process", "Milestones"],
  },
  {
    id: "community",
    index: "05",
    name: "Community",
    role: "The half that is not broadcast",
    sentence:
      "Replies, conversations and collaborations. Distribution that comes from people rather than from posting more.",
    formats: ["Replies", "Collaborations", "Q&A", "Community"],
  },
];

/* ── Scope — the typographic index ──────────────────────────────── */

export const SOCIAL_SCOPE_COPY: ServiceSectionCopy = {
  label: "Scope",
  headline: ["What the work", "actually includes."],
  lead: "The engagement is shaped around where you are. This is the full range it draws from.",
};

export const SOCIAL_SCOPE: readonly ServiceScopeItem[] = [
  {
    id: "strategy",
    index: "01",
    name: "Personal Brand Strategy",
    detail:
      "Positioning, voice and the point of view the whole presence is built on. It is the decision every later one refers back to.",
  },
  {
    id: "content-strategy",
    index: "02",
    name: "Content Strategy",
    detail:
      "Content pillars, formats and the recurring series that turn output into something repeatable instead of a weekly scramble.",
  },
  {
    id: "management",
    index: "03",
    name: "Social Media Management",
    detail:
      "Day-to-day operation of the accounts — publishing, platform consistency, and the coordination that keeps it moving.",
  },
  {
    id: "planning",
    index: "04",
    name: "Content Planning",
    detail:
      "A working plan of what goes out, in which format and in what order, far enough ahead to be produced properly.",
  },
  {
    id: "creative-direction",
    index: "05",
    name: "Creative Direction",
    detail:
      "How the work looks and sounds, so a piece is recognisable as yours before anyone reads the name on it.",
  },
  {
    id: "short-form",
    index: "06",
    name: "Short-Form Content Strategy",
    detail:
      "What to make in vertical video, what each format is there to do, and which ideas are worth the production.",
  },
  {
    id: "creator-growth",
    index: "07",
    name: "Creator Growth Direction",
    detail:
      "Direction for creators building a public presence — what to double down on, what to drop, and what to try next.",
  },
  {
    id: "collaborations",
    index: "08",
    name: "Collaboration Coordination",
    detail:
      "Brand collaborations and campaign content, coordinated where they genuinely fit the brand rather than wherever they arrive.",
  },
];

/* ── Who it is for ──────────────────────────────────────────────── */

export const SOCIAL_AUDIENCE = {
  label: "Who it is for",
  statement: ["Built for people", "whose name is part of the brand."] as const,
  /** Deliberately narrows the claim. This is not a service for everyone. */
  note: "Not every business needs this. It matters most when the person is the reason people pay attention.",
  audiences: [
    "Creators",
    "Founders",
    "Experts & professionals",
    "Public-facing business leaders",
    "Emerging personal brands",
  ] as const,
} as const;

/* ── Proof ──────────────────────────────────────────────────────── */

export const SOCIAL_PROOF = {
  label: "Selected creators from our network",
  headline: ["Built around real", "creator experience."] as const,
  lead: "This service comes out of working with people who build a public presence for a living — the same creators the homepage introduces.",
  /**
   * The one claim made about these portraits, and it is the only one the
   * project can evidence: they are creators in the Mishram network. **No
   * follower figures, no growth claims, no management relationship, no
   * campaign attribution** — see §10b of the brief for the verification pass
   * that closed all of those off.
   */
  caption: "Portraits from the Mishram Media creator network.",
  action: "Explore our creator network",
  /** Back to the homepage roster — a real destination, and the full story. */
  actionHref: "/#creators",
} as const;

/* ── Process ────────────────────────────────────────────────────── */

export const SOCIAL_PROCESS_COPY: ServiceSectionCopy = {
  label: "How it runs",
  headline: ["How the work", "gets made."],
  lead: "Short enough to describe in four moves, and deliberately circular — the fourth is what feeds the first.",
};

export const SOCIAL_PROCESS: readonly ServiceStep[] = [
  {
    index: "01",
    name: "Find the angle.",
    detail:
      "Work out what you stand for, who it is for, and what makes it worth following rather than merely worth seeing.",
  },
  {
    index: "02",
    name: "Build the system.",
    detail:
      "Pillars, formats and a plan — so the next month of content is a decision already made rather than a blank week.",
  },
  {
    index: "03",
    name: "Create consistently.",
    detail:
      "Direction, production and publishing at a rhythm that can actually be held, on the platforms that matter to you.",
  },
  {
    index: "04",
    name: "Learn and evolve.",
    detail:
      "What worked gets repeated and sharpened. What did not gets replaced. The direction moves with the audience.",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────── */

export const SOCIAL_FAQ_COPY: ServiceSectionCopy = {
  label: "Questions",
  headline: ["Before you", "get in touch."],
};

export const SOCIAL_FAQ: readonly ServiceFaqItem[] = [
  {
    id: "includes",
    question: "What does personal brand management include?",
    answer:
      "Positioning and brand direction, a content system, day-to-day social media management, creative direction, and a regular review of what is working. The exact mix depends on how much you want to make yourself and how much you want handled.",
  },
  {
    id: "audience-size",
    question: "Do I need to already have a large audience?",
    answer:
      "No. The work is the same at either end — what changes is where the effort goes first. Early on it is positioning and format. Later it is consistency, iteration and knowing what to stop doing.",
  },
  {
    id: "content",
    question: "Do you create the content too?",
    answer:
      "Creative direction and content planning run through every engagement. Production is scoped with you: some clients shoot themselves and want direction, structure and editing; others want the content made for them.",
  },
  {
    id: "end-to-end",
    question: "Can you manage my social media end to end?",
    answer:
      "Yes. Publishing, platform consistency, coordination and the ongoing content plan can all sit with us, with an agreed rhythm for review and approvals.",
  },
  {
    id: "founders",
    question: "Do you work with founders as well as creators?",
    answer:
      "Yes. Founders, professionals and public-facing business leaders build a personal brand the same way creators do. The positioning is different; the system underneath it is not.",
  },
  {
    id: "start",
    question: "How do we get started?",
    answer:
      "Send a short brief through the form below, or book a 15-minute call. We will come back with what we would do first and how the engagement would be structured.",
  },
];

/* ── Inquiry ────────────────────────────────────────────────────── */

export const SOCIAL_INQUIRY = {
  /** Acknowledges the route beside the shared form's own label. */
  note: "Social & Personal Brand Growth",
  /** Replaces the homepage's general context paragraph. */
  context:
    "Tell us who the brand is for, where you are posting today, and what you want people to associate with your name. We will come back with a first direction and the most useful next step.",
} as const;
