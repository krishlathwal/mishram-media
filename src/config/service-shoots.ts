/**
 * /services/brand-shoots-content — all of the page's words.
 *
 * The homepage's Service 05 says what this is in one sentence. This page is the
 * long form of the same claim, so nothing here contradicts `config/services.ts`
 * and nothing here goes beyond §1 of the brief.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * THE PHOTOGRAPHY AUDIT, and it is the reason this page is built the way it is.
 *
 * **The old site's brand-shoot portfolio is unusable, and not marginally.**
 * `Mishram.Media/public_html/brandshoot.html` carries a 19-image gallery. Its
 * own alt attributes name the brands, and **16 of the 19 are categories §9
 * permanently excludes from every surface of this website**:
 *
 * | Category | Named in the old gallery's alt text |
 * | --- | --- |
 * | Fantasy betting / real-money gaming | dream11, my11circle, mpl, winzo |
 * | Betting / casino | 1xbet, melbet, parimatch, leon, slottica, glory casino |
 * | Offshore CFD / binary options (§9 treats these as gambling-adjacent) | olymp trade, binomo, pocket option, octafx, capital.com, currency.com |
 * | Permitted (§8's approved rail) | mamaearth, cashkaro, upstox |
 *
 * The three permitted ones do not rescue it either: all 19 are **remote
 * Cloudinary files**, which §14 forbids hotlinking, and none has a local copy,
 * a date, a credit or any record tying a photograph to a piece of work. The
 * same Cloudinary account also hosts the placeholder testimonial portraits
 * §10d-notes already disqualified, so the account is not a provenance signal.
 *
 * **Consequence: the photographic library for this page is the five approved
 * creator portraits in `public/media/creators/`, and nothing else.** That is
 * not a compromise the page hides — it is the page's argument. Brand Shoots &
 * Content sells *creative direction and format*, so a page that shows one
 * source resolving into 9:16, 4:5, 1:1 and 16:9 is making its own case more
 * honestly than a client portfolio would. Every frame on the route is a real,
 * approved photograph, art-directed through §10b's tuned per-creator crops.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * WHAT IS NEVER CLAIMED HERE. No client name, no campaign name, no brand
 * relationship, no photographer or creative-director credit, no camera, lens,
 * location, date or production budget. No shoot count, turnaround time, package
 * or price. No result of any kind. The frames are labelled by **format and
 * role** — which is what they factually are — and the captions say on the page
 * that they are Mishram's own creator photography shown as examples of framing,
 * not a client campaign.
 *
 * **PRODUCT & DETAIL is named, and here is the evidence.** Mishram's own
 * schema.org service description on the old `about.html` reads "creative reels,
 * video ads and product photography" — the same source `config/about.ts` cites
 * for its discipline captions. So the capability is Mishram's own statement
 * about itself. **No product photograph is shown anywhere**, because none
 * exists locally; that direction's frames are genuine detail crops of the
 * creator work, which is what a detail frame is.
 */

import type {
  ServiceFaqItem,
  ServiceScopeItem,
  ServiceSectionCopy,
  ServiceStep,
} from "./service-pages";

/* ── Hero ───────────────────────────────────────────────────────── */

export const SHOOTS_HERO = {
  /** The hero breadcrumb is `SERVICES / <title>`, composed in `ServiceHero`. */
  headline: ["Make the brand", "worth looking at."] as const,
  /** One serif italic word, mid-line — the §10l precedent. */
  accentWord: "looking",
  lead: "Creative direction, brand shoots and content production built to give businesses and creators a visual language people recognise.",
  detail:
    "Campaign shoots, creator content, social content and the visual direction underneath them — planned as one production rather than a day with a camera.",
  /**
   * A dedicated service page opens with the booking ask, and this is the
   * **only** one on the route — §10j's CTA rule.
   */
  primaryCta: "Book a 15-Min Call",
  primaryCtaNote: "15 min · no obligation",
  secondaryCta: "Start a Project",
  /** The concept line under the composition. */
  signalPath: ["Idea", "Direction", "Frame", "Format", "Library"],
  /** Factual attribution for the photography in the hero composition. */
  pictured:
    "Pictured — creators from the Mishram Media network. Frame indices and format tags are this sheet's own; no client, campaign, location or date is claimed.",
  /** The one label sitting outside the frames. */
  sheetLabel: "Contact sheet",
} as const;

/* ── Direction — the calm beat, merged with creative direction ────
   TWO SECTIONS IN ONE, and the merge is the argument rather than a saving.
   "The shoot starts before the shutter" and "a visual language before a shot
   list" are the same sentence twice; the Direction Desk is what the first one
   was describing. Rendered apart they were a claim and then its illustration a
   screen later. */

export const SHOOTS_DIRECTION: ServiceSectionCopy & {
  body: readonly string[];
  axesLabel: string;
  axes: readonly { index: string; name: string; note: string }[];
  studyLabel: string;
  studyNote: string;
} = {
  label: "Before the shutter",
  headline: ["The shoot starts", "before the shutter."],
  accentWord: "shutter.",
  lead: "Good production is mostly decisions. The camera only records the ones already made.",
  body: [
    "What the brand should feel like, what it is actually saying, which formats the content has to survive in, and where it will end up living — those are settled first, because a frame that was not planned for anywhere tends to end up nowhere.",
    "That is the difference between a set of nice photographs and a visual language: one is a day's output, the other is something a brand can keep using and still look like itself.",
  ],
  axesLabel: "What gets decided first",
  axes: [
    {
      index: "01",
      name: "Mood",
      note: "The feeling before the subject — warm or cool, quiet or loud, close or composed.",
    },
    {
      index: "02",
      name: "Composition",
      note: "Where things sit in the frame, and what the frame leaves out.",
    },
    {
      index: "03",
      name: "Styling",
      note: "Wardrobe, surface, colour and prop — the parts that read before anything else does.",
    },
    {
      index: "04",
      name: "Framing",
      note: "How close, and from where. The same subject is a different idea at three distances.",
    },
    {
      index: "05",
      name: "Format",
      note: "Which shapes the content has to work in, decided before the shoot rather than cropped after it.",
    },
    {
      index: "06",
      name: "Narrative",
      note: "The order the frames are read in, so a set says something a single image cannot.",
    },
  ],
  studyLabel: "Framing study",
  studyNote:
    "Guides drawn over one of our own frames. Not a camera interface — the decisions, made visible.",
};

/* ── The Shot Builder — the page's signature interaction ─────────
   Five production directions. Choosing one changes the geometry of the frames,
   the format mix, the direction note and the shot list.

   **These are categories of frame, not a record of a shoot that happened.**
   Every image is one of the five approved creator photographs under a
   different crop, and the record carries format, role and intended use —
   never a camera setting, a client, a location or a date. */

export const SHOOTS_BUILDER_COPY: ServiceSectionCopy = {
  label: "The shot builder",
  headline: ["One production,", "five kinds of frame."],
  lead: "A shoot is not one picture repeated. Choose a direction and the frames, the formats and the shot list change with it.",
};

export type ShotDirectionId =
  | "hero"
  | "detail"
  | "portrait"
  | "social"
  | "campaign";

/** One frame in a direction's arrangement. Sources are the approved roster. */
export type BuilderFrame = {
  /** Creator id from `config/creators.ts`. */
  creatorId: string;
  /** Which tuned crop (§10b) to use. */
  kind: "portrait" | "reel" | "content";
  aspect: string;
  /** Percentages of the builder's fixed-aspect box. */
  left: number;
  top: number;
  width: number;
  z: number;
  /** In-frame tag. Format and index only. */
  tag: string;
  /** Size bucket — kept to three across the page so one source yields few variants. */
  size: "lg" | "md" | "sm";
  /** Real alt on the dominant frame; supporting crops repeat it, so they are decorative. */
  primary?: boolean;
};

export type ShotDirection = {
  id: ShotDirectionId;
  index: string;
  name: string;
  /** The short line under the name in the index. */
  role: string;
  /** Real DOM text at all times for the active direction — never hover-only. */
  sentence: string;
  /** The editorial record. Generic values only — no camera metadata. */
  record: { shot: string; role: string; format: string; use: string };
  /** Three shot-list rows. Descriptive of frames, not of a booked schedule. */
  list: readonly { index: string; name: string; format: string }[];
  frames: readonly BuilderFrame[];
};

export const SHOT_DIRECTIONS: readonly ShotDirection[] = [
  {
    id: "hero",
    index: "01",
    name: "Hero",
    role: "The one image everything else supports",
    sentence:
      "The frame a brand leads with. It has to survive being cropped square for social and wide for a web surface, so it is composed with both in mind rather than rescued afterwards.",
    record: {
      shot: "Hero frame",
      role: "Primary",
      format: "4:5 / 16:9",
      use: "Brand / Web",
    },
    list: [
      { index: "01", name: "Establishing wide", format: "16:9" },
      { index: "02", name: "Hero frame", format: "4:5" },
      { index: "03", name: "Alternate crop", format: "1:1" },
    ],
    frames: [
      {
        creatorId: "zoya",
        kind: "portrait",
        aspect: "4 / 5",
        left: 4,
        top: 6,
        width: 52,
        z: 20,
        tag: "01 / 4:5",
        size: "lg",
        primary: true,
      },
      {
        creatorId: "nikita",
        kind: "portrait",
        aspect: "16 / 9",
        left: 50,
        top: 52,
        width: 46,
        z: 30,
        tag: "02 / 16:9",
        size: "md",
      },
    ],
  },
  {
    id: "detail",
    index: "02",
    name: "Product & Detail",
    role: "Texture, styling and the close frame",
    sentence:
      "The frames that carry the material — fabric, finish, surface, the thing itself. They do the work a wide shot cannot, and they are usually what a campaign runs out of first.",
    record: {
      shot: "Detail",
      role: "Supporting",
      format: "1:1 / 4:5",
      use: "Campaign / Web",
    },
    list: [
      { index: "01", name: "Close detail", format: "1:1" },
      { index: "02", name: "Styling frame", format: "4:5" },
      { index: "03", name: "Surface crop", format: "1:1" },
    ],
    frames: [
      {
        creatorId: "mukul",
        kind: "content",
        aspect: "1 / 1",
        left: 4,
        top: 10,
        width: 50,
        z: 20,
        tag: "01 / 1:1",
        size: "lg",
        primary: true,
      },
      {
        creatorId: "lovkesh",
        kind: "content",
        aspect: "4 / 5",
        left: 56,
        top: 20,
        width: 40,
        z: 30,
        tag: "02 / 4:5",
        size: "md",
      },
    ],
  },
  {
    id: "portrait",
    index: "03",
    name: "Portrait",
    role: "The person, framed on purpose",
    sentence:
      "For a founder, a creator or a team, the portrait is the brand. Distance, eyeline and background are decisions, not defaults — and the same person reads completely differently at three of them.",
    record: {
      shot: "Portrait",
      role: "Primary frame",
      format: "4:5 / 9:16",
      use: "Social / Brand",
    },
    list: [
      { index: "01", name: "Mid portrait", format: "4:5" },
      { index: "02", name: "Close portrait", format: "9:16" },
      { index: "03", name: "Environment", format: "3:4" },
    ],
    frames: [
      {
        creatorId: "nikita",
        kind: "portrait",
        aspect: "3 / 4",
        left: 8,
        top: 4,
        width: 44,
        z: 20,
        tag: "01 / 3:4",
        size: "lg",
        primary: true,
      },
      {
        creatorId: "nikita",
        kind: "reel",
        aspect: "9 / 16",
        left: 62,
        top: 16,
        width: 30,
        z: 30,
        tag: "02 / 9:16",
        size: "md",
      },
    ],
  },
  {
    id: "social",
    index: "04",
    name: "Social",
    role: "Built vertical from the start",
    sentence:
      "Short-form is a shape before it is anything else. Content built vertical holds its subject and its space; content cropped vertical afterwards usually loses one of them.",
    record: {
      shot: "Social frame",
      role: "Vertical primary",
      format: "9:16 / 1:1",
      use: "Social / Creator",
    },
    list: [
      { index: "01", name: "Vertical primary", format: "9:16" },
      { index: "02", name: "Square alternate", format: "1:1" },
      { index: "03", name: "Cut-down", format: "9:16" },
    ],
    frames: [
      {
        creatorId: "mukul",
        kind: "reel",
        aspect: "9 / 16",
        left: 12,
        top: 4,
        width: 33,
        z: 20,
        tag: "01 / 9:16",
        size: "lg",
        primary: true,
      },
      {
        creatorId: "lovkesh",
        kind: "content",
        aspect: "1 / 1",
        left: 51,
        top: 24,
        width: 42,
        z: 30,
        tag: "02 / 1:1",
        size: "md",
      },
    ],
  },
  {
    id: "campaign",
    index: "05",
    name: "Campaign",
    role: "A set that reads in order",
    sentence:
      "A campaign is several frames doing different jobs — one that stops you, one that explains, one that carries the message wide. Shot together so they look like they belong to each other.",
    record: {
      shot: "Campaign set",
      role: "Sequence",
      format: "16:9 / 4:5",
      use: "Campaign / Launch",
    },
    list: [
      { index: "01", name: "Wide campaign frame", format: "16:9" },
      { index: "02", name: "Supporting portrait", format: "4:5" },
      { index: "03", name: "Detail", format: "1:1" },
    ],
    frames: [
      {
        creatorId: "lovkesh",
        kind: "portrait",
        aspect: "16 / 9",
        left: 3,
        top: 8,
        width: 64,
        z: 20,
        tag: "01 / 16:9",
        size: "lg",
        primary: true,
      },
      {
        creatorId: "vishnu",
        kind: "portrait",
        aspect: "4 / 5",
        left: 62,
        top: 26,
        width: 33,
        z: 30,
        tag: "02 / 4:5",
        size: "md",
      },
    ],
  },
];

export const SHOOTS_BUILDER_LABELS = {
  directionsLabel: "Direction",
  activeLabel: "Active direction",
  recordLabel: "Shot record",
  listLabel: "Shot list",
  fields: { shot: "Shot", role: "Role", format: "Format", use: "Use" },
  /**
   * Rendered on the page, not buried in a comment — the rule §10l set and §10m
   * kept. A builder that looks like a production record has to say it is not
   * one.
   */
  disclaimer:
    "Illustrative. These are Mishram's own creator photographs, re-cropped to show what each kind of frame does — not a shoot that was booked, and not a client's campaign. No camera, location, date or credit is recorded anywhere on this page.",
} as const;

/* ── Formats, merged with what the content is for ────────────────
   TWO MOVEMENTS IN ONE SECTION. A format without a destination is just a crop,
   and a list of destinations without the formats is a list of words — the
   argument only works with both, and drafted apart they repeated each other's
   nouns a screen apart (§10m's lesson, applied before it cost anything). */

export const SHOOTS_FORMATS: ServiceSectionCopy & {
  sourceLabel: string;
  formats: readonly {
    id: string;
    ratio: string;
    name: string;
    note: string;
    use: string;
  }[];
  outputLabel: string;
  outputHeadline: string;
  outputs: readonly { index: string; name: string; note: string }[];
  caption: string;
} = {
  label: "One production",
  headline: ["One production.", "Multiple ways to show up."],
  lead: "A shoot should not produce one usable image. It should produce a library — the same idea, cut for everywhere it has to appear.",
  sourceLabel: "Source frame",
  /**
   * Common aspect-ratio usage, stated as usage rather than as a platform
   * specification. **No platform chrome anywhere** — no feed frame, no story
   * bar, no like, no comment, no handle.
   */
  formats: [
    {
      id: "vertical",
      ratio: "9:16",
      name: "Vertical",
      note: "Reels and stories, and anything that has to fill a phone.",
      use: "Social",
    },
    {
      id: "feed",
      ratio: "4:5",
      name: "Portrait",
      note: "The tallest shape most feeds allow, and the one campaign work usually lives in.",
      use: "Campaign",
    },
    {
      id: "square",
      ratio: "1:1",
      name: "Square",
      note: "The flexible one — it survives being placed almost anywhere.",
      use: "Creator",
    },
    {
      id: "wide",
      ratio: "16:9",
      name: "Wide",
      note: "Web surfaces, headers and anywhere the frame has to hold a headline beside it.",
      use: "Web",
    },
  ],
  outputLabel: "Where it goes",
  outputHeadline: "Every frame needs somewhere to go.",
  outputs: [
    {
      index: "01",
      name: "Social",
      note: "The ongoing feed — the content that has to keep arriving.",
    },
    {
      index: "02",
      name: "Campaign",
      note: "A set built to run together, in a window, saying one thing.",
    },
    {
      index: "03",
      name: "Web",
      note: "The site and the landing pages, where the frame carries a headline.",
    },
    {
      index: "04",
      name: "Creator",
      note: "Material a creator can actually make something with.",
    },
    {
      index: "05",
      name: "Launch",
      note: "The moment a product or a brand arrives, and needs to look ready.",
    },
  ],
  caption:
    "One source frame, four crops. Deliberately no platform interface — no feed, no story bar, no counts.",
};

/* ── Scope ──────────────────────────────────────────────────────── */

export const SHOOTS_SCOPE_COPY: ServiceSectionCopy = {
  label: "Scope",
  headline: ["What we handle", "on a production."],
  lead: "Shaped around the direction as much as the day itself.",
};

/**
 * **Every row is a capability Mishram already states.** `config/services.ts`
 * carries `Brand Shoots / Reels / Campaign Content / Creative Production`, and
 * the old site's own schema.org service description adds product photography.
 *
 * **Deliberately absent, because the project holds no evidence of any of them:**
 * studio rental, hair and makeup, equipment or lighting hire, drone, a
 * cinematography crew, full film production, post-production or VFX, retouching
 * as a standalone service, location scouting and permits, talent contracting.
 * Add them the moment the client confirms — a scope index is a promise.
 */
export const SHOOTS_SCOPE: readonly ServiceScopeItem[] = [
  {
    id: "direction",
    index: "01",
    name: "Creative Direction",
    detail:
      "What the work should feel like and why — the mood, the references and the visual rules everything after this is measured against.",
  },
  {
    id: "planning",
    index: "02",
    name: "Shoot Planning",
    detail:
      "What actually gets made: the frames the brand needs, in the formats it needs them, decided before anyone turns up.",
  },
  {
    id: "brand",
    index: "03",
    name: "Brand Shoots",
    detail:
      "Photography built around a brand rather than around a product listing — the images the rest of its presence is assembled from.",
  },
  {
    id: "creator",
    index: "04",
    name: "Creator Shoots",
    detail:
      "Content built with and around creators, in the shapes their audience already watches things in.",
  },
  {
    id: "detail",
    index: "05",
    name: "Product & Detail Photography",
    detail:
      "The close frames — texture, finish, styling and the thing itself — which are what a campaign runs short of first.",
  },
  {
    id: "campaign",
    index: "06",
    name: "Campaign Content",
    detail:
      "A set shot to run together: several frames doing different jobs and still reading as one piece of work.",
  },
  {
    id: "shortform",
    index: "07",
    name: "Short-Form Content Direction",
    detail:
      "Reels and short-form built vertical from the start — direction, structure and what each cut is for.",
  },
  {
    id: "formats",
    index: "08",
    name: "Format Adaptation",
    detail:
      "One production turned into the library it should have been: 9:16, 4:5, 1:1 and 16:9, composed rather than cropped.",
  },
];

/* ── The selects — the content library ──────────────────────────── */

export const SHOOTS_SELECTS = {
  label: "Selected creator & content imagery",
  headline: ["A few frames from", "the world we build in."] as const,
  accentWord: "frames",
  lead: "Photography from Mishram's own creator work, laid out the way a sheet of selects actually looks — different shapes, different distances, chosen rather than collected.",
  /**
   * The only claim made about these photographs, and the only one the project
   * can evidence. Rendered on the page.
   */
  caption:
    "Creator photography from Mishram Media's own work, shown here as examples of framing and format. No client, campaign, brand, location, photographer, camera or date is attributed to any of them.",
  action: "See the full creator roster",
  actionHref: "/#creators",
  sheetLabel: "Selects",
} as const;

/* ── Who it is for ──────────────────────────────────────────────── */

export const SHOOTS_AUDIENCE = {
  label: "Who it is for",
  statement: ["Built for brands that need", "their own visual language."] as const,
  note: "Production is worth doing properly when there is something specific to say and a reason for it to look like you rather than like everyone else. It is not a substitute for knowing what the brand is.",
  audiences: [
    "Brands",
    "Creators",
    "Personal brands",
    "Product-led businesses",
    "Campaign teams",
  ] as const,
} as const;

/* ── Process ────────────────────────────────────────────────────── */

export const SHOOTS_PROCESS_COPY: ServiceSectionCopy = {
  label: "How it runs",
  headline: ["From direction", "to a content library."],
  lead: "Five moves, and the last one is what turns a shoot into something you keep using.",
};

/**
 * **Kept at the creative and strategic level on purpose.** The project holds no
 * record of how Mishram handles permits, studio booking, talent contracting or
 * crew, so none of it is described as a step. Those are conversations for a
 * proposal, not claims for a service page.
 */
export const SHOOTS_PROCESS: readonly ServiceStep[] = [
  {
    index: "01",
    name: "Define the direction.",
    detail:
      "What the work has to feel like, what it is saying, and the visual rules the rest of it will be judged against.",
  },
  {
    index: "02",
    name: "Plan the frames.",
    detail:
      "The shot list: which frames the brand actually needs, in which formats, and what each one is for.",
  },
  {
    index: "03",
    name: "Produce the shoot.",
    detail:
      "The day itself, run against the plan — with enough room left in it for the frame nobody planned.",
  },
  {
    index: "04",
    name: "Shape the selects.",
    detail:
      "Choosing, sequencing and finishing — turning everything that was shot into the set that is worth using.",
  },
  {
    index: "05",
    name: "Adapt the content.",
    detail:
      "Cutting the work into the formats it has to live in, so one production shows up in more than one place.",
  },
];

/* ── FAQ ────────────────────────────────────────────────────────── */

export const SHOOTS_FAQ_COPY: ServiceSectionCopy = {
  label: "Questions",
  headline: ["Before the", "first shoot."],
};

export const SHOOTS_FAQ: readonly ServiceFaqItem[] = [
  {
    id: "kinds",
    question: "What kinds of shoots do you produce?",
    answer:
      "Brand shoots, creator shoots, campaign content, product and detail photography, and short-form content. What a given production actually needs is worked out from the direction rather than picked off a list.",
  },
  {
    id: "both",
    question: "Can you create content for both brands and creators?",
    answer:
      "Yes, and the two often run together. Mishram works with businesses and with established creators, so a production can be built around a brand, around a creator, or around both appearing in the same set.",
  },
  {
    id: "direction",
    question: "Do you help plan the creative direction, or only shoot?",
    answer:
      "The direction is the part we would rather start with. Mood, composition, styling, framing and format are decided before the shoot, because that is what separates a set of nice photographs from something a brand can keep using.",
  },
  {
    id: "formats",
    question: "Can one shoot be adapted for multiple social formats?",
    answer:
      "That is the intention rather than an extra. Frames are composed with 9:16, 4:5, 1:1 and 16:9 in mind from the shot list onward, so the formats are built rather than cropped out afterwards.",
  },
  {
    id: "shortform",
    question: "Do you also create short-form content?",
    answer:
      "Yes — reels and short-form are part of the offering, directed vertical from the start rather than cut down from something shot wide.",
  },
  {
    id: "plan",
    question: "How do we plan a shoot?",
    answer:
      "It starts with a conversation about what the content is for and where it will live. From there we shape the direction and a shot list, and the scale of the production follows from what that actually needs — we would rather work that out with you than publish a package.",
  },
];

/* ── Inquiry ────────────────────────────────────────────────────── */

export const SHOOTS_INQUIRY = {
  note: "Brand Shoots & Content",
  context:
    "Tell us what the content is for, who it is meant to reach and where it will end up. We will come back with the direction we would take and the frames we think it actually needs.",
} as const;
