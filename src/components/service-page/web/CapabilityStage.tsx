"use client";

import clsx from "clsx";

/**
 * THE CAPABILITY STAGE — one product architecture, three states.
 *
 * The section's whole argument in one object: **six regions that never leave,
 * and change purpose rather than being replaced.** A masthead becomes a
 * masthead becomes a sidebar; a hero block becomes a product grid becomes a
 * workspace; a content column becomes a cart becomes a data table. Nothing
 * fades out and is succeeded by an unrelated illustration — the same frame is
 * re-laid-out, which is the visual form of *one development capability, many
 * possible products*.
 *
 * ── HOW IT ANIMATES, AND WHY IT IS NOT SCROLL-LINKED ──────────────────────
 *
 * The active state is a **discrete React value**, and the transformation is a
 * **CSS transition** on the regions' own geometry. That is a deliberate choice
 * over driving geometry from scroll progress, for four reasons:
 *
 * 1. It is the only way to hit the 500–800ms transition the section is
 *    specified at. Scroll-linked geometry has whatever duration the visitor's
 *    wheel gives it.
 * 2. Per-frame `left/top/width/height` on twelve boxes is layout work on every
 *    scroll frame. This is three transitions for the whole section.
 * 3. **It cannot reintroduce the WAAPI defect this page already paid for.**
 *    Nothing here reads a scroll MotionValue at all, so there is no
 *    `accelerate` descriptor and no ScrollTimeline (see `scroll-range.ts`).
 * 4. `prefers-reduced-motion` neutralises it for free — the global block in
 *    `globals.css` drops every transition to 0.01ms, so a reduced-motion
 *    visitor gets the same three states, switching instantly.
 *
 * Scroll's only job is choosing *which* state is active, and it does that once
 * per boundary rather than once per frame.
 *
 * ── WHAT IT IS NOT ────────────────────────────────────────────────────────
 *
 * No fake dashboard, no chart, no axis, no metric, no platform UI, no vendor
 * chrome, no client name, no brand, and **not one number anywhere** — the same
 * boundary §10m set for Service 03 and the hero above this section. What is
 * drawn is structure: where things sit, what connects to what, and where the
 * action is.
 */

export type StateId = "websites" | "commerce" | "product";

/** A region's box, in percentages of the stage's own width and height. */
type Rect = { x: number; y: number; w: number; h: number };

/**
 * What a region renders while it is in a given state. Deliberately a small
 * vocabulary — twelve fill kinds would be twelve illustrations, which is the
 * thing this component exists to avoid.
 */
type Fill =
  | "bar"
  | "hero"
  | "grid"
  | "panel"
  | "rows"
  | "list"
  | "table"
  | "media"
  | "card"
  | "nodes"
  | "calendar"
  | "user"
  | "action";

type Region = {
  id: string;
  /** Geometry and fill per state. Every region exists in every state. */
  states: Record<StateId, { rect: Rect; fill: Fill }>;
};

/* ── The six regions ─────────────────────────────────────────────
   The stage is 100 wide × 62.5 tall in its own units — the 16/10 of the
   project viewport in `DigitalWork`, so the two compositions on this page sit
   in the same frame. */

const VB_W = 100;
const VB_H = 62.5;

const REGIONS: readonly Region[] = [
  {
    /**
     * **The constant, and the section's strongest single move.** It is the
     * masthead of a website, the masthead of a store, and then — without ever
     * leaving — the navigation rail of an application. An 88×5 horizontal bar
     * becoming a 12×52 vertical one is the whole "one capability, many
     * products" idea happening to a single rectangle.
     */
    id: "rail",
    states: {
      websites: { rect: { x: 6, y: 6, w: 88, h: 5 }, fill: "bar" },
      commerce: { rect: { x: 6, y: 6, w: 88, h: 5 }, fill: "bar" },
      product: { rect: { x: 6, y: 6, w: 12, h: 52.5 }, fill: "bar" },
    },
  },
  {
    id: "primary",
    states: {
      websites: { rect: { x: 6, y: 16.5, w: 52, h: 22 }, fill: "hero" },
      commerce: { rect: { x: 6, y: 15, w: 56, h: 26 }, fill: "grid" },
      product: { rect: { x: 22, y: 6, w: 46, h: 24 }, fill: "panel" },
    },
  },
  {
    id: "aux",
    states: {
      websites: { rect: { x: 62, y: 16.5, w: 32, h: 22 }, fill: "media" },
      commerce: { rect: { x: 66, y: 15, w: 28, h: 16 }, fill: "card" },
      product: { rect: { x: 72, y: 6, w: 22, h: 24 }, fill: "nodes" },
    },
  },
  {
    id: "detail",
    states: {
      websites: { rect: { x: 6, y: 41, w: 52, h: 10 }, fill: "rows" },
      commerce: { rect: { x: 66, y: 34, w: 28, h: 12 }, fill: "list" },
      product: { rect: { x: 22, y: 33, w: 46, h: 18 }, fill: "table" },
    },
  },
  {
    /** The ask, wherever it lives. Teal because it is the action. */
    id: "action",
    states: {
      websites: { rect: { x: 6, y: 54, w: 20, h: 4.5 }, fill: "action" },
      commerce: { rect: { x: 66, y: 49, w: 28, h: 4.5 }, fill: "action" },
      product: { rect: { x: 22, y: 54, w: 24, h: 4.5 }, fill: "action" },
    },
  },
  {
    id: "meta",
    states: {
      websites: { rect: { x: 62, y: 41, w: 32, h: 17.5 }, fill: "rows" },
      commerce: { rect: { x: 6, y: 46.5, w: 56, h: 8 }, fill: "calendar" },
      product: { rect: { x: 72, y: 35, w: 22, h: 12 }, fill: "user" },
    },
  },
];

/* ── The architecture layer ──────────────────────────────────────
   Orthogonal hairlines running only through space no region covers. Each state
   has its own set; they cross-fade while the regions move, which reads as
   rerouting rather than as a swap. Drawn without an animated `pathLength`, so
   §10's `vector-effect` shatter gotcha cannot apply. */

type Wiring = {
  links: readonly string[];
  nodes: readonly { x: number; y: number }[];
  /** Connectors that leave the frame. Only the last state has them. */
  escapes?: readonly string[];
};

const WIRING: Record<StateId, Wiring> = {
  websites: {
    links: ["M 20 11 V 16.5", "M 20 38.5 V 41", "M 16 51 V 54", "M 58 27.5 H 62"],
    nodes: [
      { x: 20, y: 16.5 },
      { x: 16, y: 54 },
    ],
  },
  commerce: {
    links: ["M 62 23 H 66", "M 80 31 V 34", "M 80 46 V 49", "M 34 41 V 46.5"],
    nodes: [
      { x: 66, y: 23 },
      { x: 80, y: 49 },
    ],
  },
  product: {
    links: ["M 18 18 H 22", "M 45 30 V 33", "M 68 18 H 72", "M 34 51 V 54"],
    nodes: [
      { x: 22, y: 18 },
      { x: 72, y: 18 },
    ],
    /**
     * The handoff, drawn rather than written. Two connectors leave the bottom
     * of the frame and are clipped by it — the architecture continuing into
     * something this page has not shown yet.
     */
    escapes: ["M 56 51 V 62.5", "M 83 47 V 62.5"],
  },
};

/* ── The labels ──────────────────────────────────────────────────
   Two per state. Structural notation, never a benefit, and never more than the
   composition can carry — the §10q halo keeps each one legible over whatever
   it sits on. */

type Anno = { text: string; x: number; y: number; accent?: boolean };

const ANNOS: Record<StateId, readonly Anno[]> = {
  websites: [
    { text: "Structure", x: 6, y: 12.5 },
    // x 30, not 6: the ask sits at x 6-26 on the row below the content
    // rows, and at the left edge this label was printed straight over it.
    { text: "Content", x: 30, y: 52.5 },
  ],
  commerce: [
    { text: "Commerce", x: 6, y: 41.8 },
    { text: "Interaction", x: 66, y: 54.5, accent: true },
  ],
  product: [
    { text: "Workflow", x: 72, y: 30.6 },
    // Same correction as `Content` — the command area occupies x 22-46.
    { text: "Data", x: 50, y: 52.5 },
  ],
};

/* ── Fills ───────────────────────────────────────────────────────
   Every fill is structure and nothing else: no words, no imagery, no logos and
   no figures. Row heights stay in absolute pixels so nested chrome does not go
   microscopic on a phone (§10); padding is a percentage of the region. */

function FillBody({ kind, vertical }: { kind: Fill; vertical: boolean }) {
  if (kind === "bar") {
    // Masthead, or the same object stood on its end as a navigation rail.
    return (
      <div
        className={clsx(
          "flex h-full w-full items-center gap-[8%] p-[7%]",
          vertical && "flex-col items-stretch justify-start gap-[6%] py-[9%]",
        )}
      >
        <span
          className={clsx(
            "block shrink-0 rounded-[1px] bg-ink/40",
            vertical ? "h-[4px] w-full" : "h-[4px] w-[16%]",
          )}
        />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={clsx(
              "block shrink-0 rounded-[1px] bg-ink/16",
              vertical ? "h-[3px] w-[70%]" : "h-[3px] w-[9%]",
            )}
          />
        ))}
        <span className={clsx(vertical ? "hidden" : "flex-1")} />
        <span
          className={clsx(
            "block shrink-0 rounded-[2px] border border-line",
            vertical ? "mt-auto h-[9px] w-full" : "h-[9px] w-[10%]",
          )}
        />
      </div>
    );
  }

  if (kind === "hero") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-[7%] p-[7%]">
        <span className="block h-[8px] w-[86%] rounded-[1px] bg-ink/38" />
        <span className="block h-[8px] w-[62%] rounded-[1px] bg-ink/28" />
        <span className="mt-[3%] block h-[3px] w-[74%] bg-ink/14" />
        <span className="block h-[3px] w-[52%] bg-ink/14" />
      </div>
    );
  }

  if (kind === "grid") {
    // A catalogue. Six cells, each a media block over two rules.
    return (
      <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-[4%] p-[5%]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="flex min-h-0 flex-col gap-[8%]">
            <span className="web-media block min-h-0 flex-1" />
            <span className="block h-[3px] w-[76%] rounded-[1px] bg-ink/22" />
            <span className="block h-[3px] w-[44%] rounded-[1px] bg-ink/14" />
          </span>
        ))}
      </div>
    );
  }

  if (kind === "panel") {
    // A workspace: its own header rule, then the surface being worked on.
    return (
      <div className="flex h-full w-full flex-col gap-[4%] p-[5%]">
        <span className="flex items-center gap-[3%]">
          <span className="block h-[4px] w-[22%] rounded-[1px] bg-ink/34" />
          <span className="block h-[3px] flex-1 bg-line" />
          <span className="block h-[7px] w-[9%] rounded-[1px] border border-line" />
        </span>
        <span className="web-media block min-h-0 flex-1" />
      </div>
    );
  }

  if (kind === "rows") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-[12%] p-[7%]">
        {[100, 78, 90, 56].map((w, i) => (
          <span
            key={i}
            className="block h-[3px] rounded-[1px] bg-ink/16"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    );
  }

  if (kind === "list") {
    // Line items resolving into a total rule — a cart, drawn as structure.
    return (
      <div className="flex h-full w-full flex-col justify-center gap-[11%] p-[8%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-[6%]">
            <span className="block h-[7px] w-[13%] rounded-[1px] border border-line" />
            <span className="block h-[3px] flex-1 bg-ink/16" />
            <span className="block h-[3px] w-[16%] bg-ink/26" />
          </span>
        ))}
        <span className="mt-[3%] block h-px w-full bg-line" />
      </div>
    );
  }

  if (kind === "table") {
    // A data fragment: a header rule, four rows, three columns. No values.
    return (
      <div className="flex h-full w-full flex-col gap-[5%] p-[5%]">
        <span className="flex items-center gap-[4%]">
          {[26, 20, 14].map((w, i) => (
            <span
              key={i}
              className="block h-[3px] rounded-[1px] bg-ink/34"
              style={{ width: `${w}%` }}
            />
          ))}
        </span>
        <span className="block h-px w-full bg-line" />
        {[0, 1, 2, 3].map((r) => (
          <span key={r} className="flex flex-1 items-center gap-[4%]">
            <span className="block h-[3px] w-[30%] rounded-[1px] bg-ink/16" />
            <span className="block h-[3px] w-[22%] rounded-[1px] bg-ink/12" />
            <span className="block h-[3px] w-[12%] rounded-[1px] bg-ink/12" />
            <span
              className={clsx(
                "ml-auto block h-[5px] w-[5px] rounded-full",
                r === 1 ? "bg-accent/70" : "bg-ink/12",
              )}
            />
          </span>
        ))}
      </div>
    );
  }

  if (kind === "media") {
    return <span className="web-media absolute inset-[6%] block" />;
  }

  if (kind === "card") {
    // A single product, opened.
    return (
      <div className="flex h-full w-full gap-[6%] p-[7%]">
        <span className="web-media block h-full w-[40%]" />
        <span className="flex flex-1 flex-col justify-center gap-[12%]">
          <span className="block h-[4px] w-[86%] rounded-[1px] bg-ink/32" />
          <span className="block h-[3px] w-[58%] bg-ink/16" />
          <span className="block h-[3px] w-[70%] bg-ink/12" />
        </span>
      </div>
    );
  }

  if (kind === "nodes") {
    // Connected surfaces. Three squares on a spine — a workflow, not a chart.
    return (
      <div className="relative h-full w-full p-[10%]">
        <span className="absolute inset-y-[18%] left-[26%] w-px bg-line-strong" />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute flex items-center gap-[10%]"
            style={{ left: "10%", right: "10%", top: `${18 + i * 30}%` }}
          >
            <span
              className={clsx(
                "block h-[9px] w-[9px] shrink-0 rounded-[1px] border",
                i === 1 ? "border-accent bg-accent/25" : "border-line-strong",
              )}
            />
            <span className="block h-[3px] flex-1 rounded-[1px] bg-ink/14" />
          </span>
        ))}
      </div>
    );
  }

  if (kind === "calendar") {
    // Availability. A dot field, and one of them taken.
    return (
      <div className="grid h-full w-full grid-cols-7 grid-rows-3 gap-[3%] p-[4%]">
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "block rounded-[1px]",
              i === 9 ? "bg-accent/70" : "bg-ink/10",
            )}
          />
        ))}
      </div>
    );
  }

  if (kind === "user") {
    return (
      <div className="flex h-full w-full items-center gap-[8%] p-[9%]">
        <span className="block h-[16px] w-[16px] shrink-0 rounded-full border border-line-strong" />
        <span className="flex flex-1 flex-col gap-[26%]">
          <span className="block h-[3px] w-[80%] rounded-[1px] bg-ink/28" />
          <span className="block h-[3px] w-[52%] rounded-[1px] bg-ink/14" />
        </span>
      </div>
    );
  }

  // action
  return <span className="absolute inset-0 block rounded-[2px] bg-accent/80" />;
}

/* ── The stage ───────────────────────────────────────────────────── */

export function CapabilityStage({
  active,
  className,
}: {
  active: StateId;
  /** The state currently drawn. Everything else follows from it. */
  className?: string;
}) {
  return (
    <div
      aria-hidden
      data-state={active}
      className={clsx("web-cap-stage", className)}
    >
      {/* The measurement field, carried over from the hero — but held still.
          This section is the flatter, more editorial of the two on purpose, so
          there is no drift, no parallax and no depth here. */}
      <div className="web-measure">
        {[16, 38, 60, 82].map((t) => (
          <span
            key={t}
            className="web-tick"
            style={{ left: `${t}%`, top: 0, width: "1px", height: "100%" }}
          />
        ))}
        <span className="web-reg" style={{ left: 0, top: 0, borderLeftWidth: 1, borderTopWidth: 1 }} />
        <span className="web-reg" style={{ right: 0, top: 0, borderRightWidth: 1, borderTopWidth: 1 }} />
        <span className="web-reg" style={{ left: 0, bottom: 0, borderLeftWidth: 1, borderBottomWidth: 1 }} />
        <span className="web-reg" style={{ right: 0, bottom: 0, borderRightWidth: 1, borderBottomWidth: 1 }} />
      </div>

      {/* ── The architecture layer ──────────────────────────────── */}
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        className="web-lines web-cap-lines"
      >
        {(Object.keys(WIRING) as StateId[]).map((id) => {
          const w = WIRING[id];
          return (
            <g
              key={id}
              className="web-cap-wiring"
              data-on={id === active ? "true" : "false"}
            >
              {w.links.map((d) => (
                <path
                  key={d}
                  d={d}
                  className="web-link"
                  stroke="var(--color-line-strong)"
                  strokeWidth="0.34"
                />
              ))}
              {w.escapes?.map((d) => (
                <path
                  key={d}
                  d={d}
                  className="web-link"
                  stroke="var(--color-accent)"
                  strokeOpacity="0.5"
                  strokeWidth="0.34"
                  strokeDasharray="1.4 1.8"
                />
              ))}
              {w.nodes.map((n) => (
                <rect
                  key={`${n.x}-${n.y}`}
                  x={n.x - 1}
                  y={n.y - 1}
                  width="2"
                  height="2"
                  className="web-node"
                  strokeWidth="0.32"
                />
              ))}
            </g>
          );
        })}
      </svg>

      {/* ── The regions ─────────────────────────────────────────── */}
      {REGIONS.map((region) => {
        const { rect } = region.states[active];
        const vertical = rect.h > rect.w;

        return (
          <div
            key={region.id}
            className={clsx(
              "web-region",
              region.id === "action" && "web-region--action",
            )}
            style={{
              left: `${rect.x}%`,
              top: `${(rect.y / VB_H) * 100}%`,
              width: `${rect.w}%`,
              height: `${(rect.h / VB_H) * 100}%`,
            }}
          >
            {/* Every state's fill is mounted and cross-faded, so the region's
                own box can morph underneath while its contents change purpose.
                Only one is ever visible. */}
            {(Object.keys(region.states) as StateId[]).map((id) => (
              <span
                key={id}
                className="web-region-fill"
                data-on={id === active ? "true" : "false"}
              >
                <FillBody
                  kind={region.states[id].fill}
                  vertical={vertical && id === active}
                />
              </span>
            ))}
          </div>
        );
      })}

      {/* ── The labels, as HTML so the type stays crisp ─────────── */}
      {(Object.keys(ANNOS) as StateId[]).map((id) =>
        ANNOS[id].map((anno) => (
          <span
            key={`${id}-${anno.text}`}
            data-on={id === active ? "true" : "false"}
            className={clsx(
              "caps web-anno web-anno--corner web-cap-anno",
              anno.accent && "web-anno--accent",
            )}
            style={{ left: `${anno.x}%`, top: `${(anno.y / VB_H) * 100}%` }}
          >
            {anno.text}
          </span>
        )),
      )}
    </div>
  );
}
