/**
 * 04 / WORK PROCESS
 *
 * What actually happens when someone hires Mishram: five stages, one connected
 * system. Exactly five — no filler steps, and no "proven formula" language.
 *
 * The geometry lives here too, because the pipeline is one SVG and the stage
 * labels are HTML positioned over it: both need the same node coordinates or
 * they drift apart. Coordinates are in the pipeline's viewBox space
 * (`PIPE_VIEW`), and `at` is each node's fraction along the base path, which is
 * what drives the teal progress stroke.
 */

export type ProcessStage = {
  id: string;
  index: string;
  name: string;
  description: string;
  /** Two to four activities. Real work, not buzzwords. */
  activities: readonly string[];
  /** Node position in `PIPE_VIEW` coordinates. */
  node: { x: number; y: number };
  /** Fraction along the base path, 0..1. Drives the teal progress stroke. */
  at: number;
};

/** The pipeline's SVG coordinate space. The container matches this aspect. */
export const PIPE_VIEW = { w: 1000, h: 240 } as const;

export const PROCESS_STAGES: readonly ProcessStage[] = [
  {
    id: "discover",
    index: "01",
    name: "Discover",
    description:
      "We start by understanding what you're building, who needs to care and where the opportunity actually is.",
    activities: ["Business", "Audience", "Positioning", "Opportunity"],
    node: { x: 70, y: 158 },
    at: 0,
  },
  {
    id: "strategy",
    index: "02",
    name: "Strategy",
    description:
      "We turn the opportunity into a focused plan across the channels and formats that matter.",
    activities: ["Direction", "Channels", "Content", "Campaigns"],
    node: { x: 272, y: 135 },
    at: 0.228,
  },
  {
    id: "create",
    index: "03",
    name: "Create",
    description:
      "Ideas become the content, campaigns and digital experiences people actually see.",
    activities: ["Creative", "Content", "Design", "Production"],
    node: { x: 474, y: 112 },
    at: 0.457,
  },
  {
    id: "launch",
    index: "04",
    name: "Launch",
    description:
      "We put the work into market with the right distribution, timing and execution.",
    activities: ["Publish", "Media", "Creators", "Activation"],
    node: { x: 676, y: 89 },
    at: 0.685,
  },
  {
    id: "scale",
    index: "05",
    name: "Scale",
    description:
      "We learn from what performs, improve what matters and build on the momentum.",
    activities: ["Optimise", "Iterate", "Performance", "Growth"],
    node: { x: 878, y: 68 },
    at: 0.913,
  },
];

/**
 * The base path every layer is drawn on: a gentle rise through all five nodes,
 * continuing past the last one. The rise is the point — idea to momentum, not a
 * ruler with ticks on it.
 */
export const PIPE_PATH =
  "M70,158 C150,157 190,136 272,135 C354,134 394,113 474,112 C556,111 596,90 676,89 C758,88 800,69 878,68 C918,67 940,63 955,58";

/**
 * The feedback loop: Scale back to Strategy, under the main line. Growth work
 * is continuous, so the process does not simply stop at the fifth node.
 */
export const PIPE_LOOP =
  "M876,80 C918,118 898,176 700,182 C520,188 382,186 296,170 C280,164 272,154 270,146";

export const WORK_PROCESS_COPY = {
  index: "04",
  label: "Work Process",
  headline: ["From idea", "to momentum."],
  /** Rendered in the serif italic accent, matching the sections above. */
  /**
   * **Empty on purpose.** Eight consecutive sections each accenting one word in
   * Instrument Serif had stopped reading as emphasis and started reading as a
   * template (§4 gives the serif to emphasis, not to every headline). This is
   * the chapter that loses it: "momentum." also heads the Mishram Difference
   * two sections earlier, so dropping the accent removes a word echo and an
   * accent echo at once. The Intro renders the line plain when this is empty.
   */
  accentWord: "",
  lead: "A clear system for turning the right direction into work that moves.",
  loop: "Learn → Iterate",
  cta: "Start a project",
} as const;
