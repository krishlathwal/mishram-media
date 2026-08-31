"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";

/**
 * THE BUSINESS SYSTEM — one architecture, four states, accumulating.
 *
 * §03's capability stage transforms a single frame between three products.
 * This does the opposite and the contrast is deliberate: **nothing here is
 * replaced.** Four entry points converge on one record; the record grows a CRM
 * around it; an automation rail appears beneath the whole thing; and then the
 * product surfaces arrive *outside the original frame*. The earlier tiers stay
 * on screen, subdued, because the argument is accumulation — the website is
 * one node in something larger, and you have to still be able to see it when
 * the larger thing exists.
 *
 * ── THE ONE PIECE OF GEOMETRY THAT MOVES ──────────────────────────────────
 *
 * The customer record. In `capture` it is large and central because it is the
 * only thing there; from `organise` on it contracts and shifts left as the
 * system builds around it. Everything else holds position and changes only
 * presence, tone and its routes. That constraint is what keeps a fourteen-node
 * diagram to four transitions instead of a per-frame layout pass.
 *
 * ── HOW IT ANIMATES ───────────────────────────────────────────────────────
 *
 * The active state is a discrete React value; every visual change is a CSS
 * transition. Routes draw themselves with a normalised `pathLength="1"` and a
 * `stroke-dashoffset` transition — pure CSS, no per-frame work, and no
 * animated `pathLength`, so §10's `vector-effect` shatter gotcha cannot apply.
 *
 * **There is no looping animation anywhere in this section**, which is also
 * the complete answer to "do not keep expensive effects running offscreen":
 * once a state has settled, the section costs nothing at all. The status mark
 * inside the CRM moves between rows when the state changes — a status change,
 * not a heartbeat.
 *
 * ── WHAT IT IS NOT ────────────────────────────────────────────────────────
 *
 * No dashboard, no chart, no axis, no gauge, no table of records, no terminal,
 * no code, no database cylinder, no cloud icon, no network globe, no glow. No
 * client name and no vendor name. **Not one number.** Every node is a category
 * of thing; the flow is a shape, not a report.
 */

export type SystemStateId = "capture" | "organise" | "automate" | "extend";

const STATE_ORDER: readonly SystemStateId[] = [
  "capture",
  "organise",
  "automate",
  "extend",
];

/** `[x, y, w, h]` — x/w as percentages of width, y/h in the field's own units. */
type Rect = readonly [number, number, number, number];

type NodeKind = "entry" | "record" | "module" | "step" | "surface" | "mobile";

type SystemNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** Wide layout: the rect this node holds from `from` onward. */
  wide?: Rect;
  /**
   * Wide layout, per state — for the one node whose geometry actually moves.
   * Two explicit fields rather than a union: `Array.isArray` cannot narrow a
   * fixed-length tuple out of `Rect | Record<…>`, and a cast to get there
   * would be exactly the kind of thing that hides a real mistake later.
   */
  wideStates?: Partial<Record<number, Rect>>;
  /** First state index the node exists in, wide layout. */
  from: number;
  /** State index from which it recedes. Absent = never recedes. */
  dimFrom?: number;
  /**
   * Narrow layout. Only the states whose fragment includes this node — mobile
   * shows one tier at a time rather than the accumulated whole, because the
   * accumulated whole at 360px is fourteen illegible boxes.
   */
  narrow?: Partial<Record<number, Rect>>;
  narrowDim?: readonly number[];
};

/* ── The wide field ──────────────────────────────────────────────
   100 × 62.5 — the same 16/10 frame the hero's build stage and §03's
   capability stage sit in, so all three compositions on this route share one
   shape. */

const WIDE = { w: 100, h: 62.5 } as const;
/** The "original website frame". State four's surfaces sit outside it. */
const WIDE_FRAME = { x: 0, y: 0, w: 72, h: 62.5 } as const;

const NARROW = { w: 100, h: 66 } as const;

const NODES: readonly SystemNode[] = [
  /* ENTRY — four ways the same event arrives. */
  {
    id: "web",
    label: "Website",
    kind: "entry",
    wide: [1, 5, 15, 7],
    from: 0,
    dimFrom: 1,
    narrow: { 0: [2, 3, 45, 11] },
  },
  {
    id: "form",
    label: "Form",
    kind: "entry",
    wide: [1, 15, 15, 7],
    from: 0,
    dimFrom: 1,
    narrow: { 0: [53, 3, 45, 11] },
  },
  {
    id: "booking",
    label: "Booking",
    kind: "entry",
    wide: [1, 25, 15, 7],
    from: 0,
    dimFrom: 1,
    narrow: { 0: [2, 17, 45, 11] },
  },
  {
    id: "campaign",
    label: "Campaign",
    kind: "entry",
    wide: [1, 35, 15, 7],
    from: 0,
    dimFrom: 1,
    narrow: { 0: [53, 17, 45, 11] },
  },

  /* THE SHARED ELEMENT — large and central while it is alone, then contracted
     and moved aside as the system grows around it. */
  {
    id: "record",
    label: "Customer record",
    kind: "record",
    wideStates: { 0: [38, 22, 24, 16], 1: [23, 18, 16, 11], 2: [23, 18, 16, 11], 3: [23, 18, 16, 11] },
    from: 0,
    dimFrom: 2,
    narrow: { 0: [18, 44, 64, 18], 1: [18, 2, 64, 12] },
    narrowDim: [1],
  },

  /* THE CRM MODULE — the only node with interior structure. */
  {
    id: "crm",
    label: "CRM",
    kind: "module",
    wide: [45, 8, 25, 26],
    from: 1,
    dimFrom: 3,
    narrow: { 1: [4, 24, 92, 38], 2: [2, 54, 96, 9], 3: [2, 56, 96, 8] },
    narrowDim: [2, 3],
  },
  {
    id: "integrations",
    label: "Integrations",
    kind: "step",
    wide: [45, 37, 25, 6],
    from: 2,
    narrow: { 2: [2, 36, 96, 11] },
  },

  /* THE AUTOMATION RAIL — under the whole system, because that is where it
     runs. */
  {
    id: "trigger",
    label: "Trigger",
    kind: "step",
    wide: [1, 46, 15, 6],
    from: 2,
    narrow: { 2: [2, 4, 45, 11] },
  },
  {
    id: "workflow",
    label: "Workflow",
    kind: "step",
    wide: [19, 46, 15, 6],
    from: 2,
    narrow: { 2: [53, 4, 45, 11] },
  },
  {
    id: "action",
    label: "Action",
    kind: "step",
    wide: [37, 46, 15, 6],
    from: 2,
    narrow: { 2: [2, 18, 45, 11] },
  },
  {
    id: "notify",
    label: "Notification",
    kind: "step",
    wide: [55, 46, 17, 6],
    from: 2,
    narrow: { 2: [53, 18, 45, 11] },
  },

  /* THE SURFACES — outside the original frame, which is the payoff. */
  {
    id: "admin",
    label: "Admin panel",
    kind: "surface",
    wide: [75, 4, 24, 10],
    from: 3,
    narrow: { 3: [2, 3, 52, 14] },
  },
  {
    id: "portal",
    label: "Client portal",
    kind: "surface",
    wide: [75, 17, 24, 10],
    from: 3,
    narrow: { 3: [2, 20, 52, 14] },
  },
  {
    id: "webapp",
    label: "Web app",
    kind: "surface",
    wide: [75, 30, 11, 13],
    from: 3,
    narrow: { 3: [2, 37, 52, 14] },
  },
  {
    id: "mobile",
    label: "Mobile",
    kind: "mobile",
    // y 29, not 26: the client portal's box ends at y 27 and shares this
    // column, so at 26 the phone's top-left corner sat on its bottom-right.
    wide: [89, 29, 10, 21],
    from: 3,
    narrow: { 3: [62, 8, 20, 42] },
  },
];

/* ── Routes ──────────────────────────────────────────────────────
   Orthogonal hairlines running only through space no node occupies. `nodes`
   lists what a route connects, so hovering either end lights it. */

type Route = {
  id: string;
  d: string;
  /** Wide states the route is drawn in. */
  on: readonly number[];
  /** States where it recedes with the tier it belongs to. */
  dim?: readonly number[];
  nodes: readonly string[];
  /** Leaves the frame. Drawn dashed, never animated. */
  escape?: boolean;
};

const ROUTES: readonly Route[] = [
  /* State 0 — four routes converging on one record. */
  { id: "c0a", d: "M 16 8.5 H 24 V 30 H 38", on: [0], nodes: ["web", "record"] },
  { id: "c0b", d: "M 16 18.5 H 28 V 30 H 38", on: [0], nodes: ["form", "record"] },
  { id: "c0c", d: "M 16 28.5 H 32 V 30 H 38", on: [0], nodes: ["booking", "record"] },
  { id: "c0d", d: "M 16 38.5 H 34 V 30 H 38", on: [0], nodes: ["campaign", "record"] },

  /* States 1-3 — the same four, re-routed to the contracted record. */
  { id: "c1a", d: "M 16 8.5 H 19 V 23.5 H 23", on: [1, 2, 3], dim: [1, 2, 3], nodes: ["web", "record"] },
  { id: "c1b", d: "M 16 18.5 H 19 V 23.5 H 23", on: [1, 2, 3], dim: [1, 2, 3], nodes: ["form", "record"] },
  { id: "c1c", d: "M 16 28.5 H 19 V 23.5 H 23", on: [1, 2, 3], dim: [1, 2, 3], nodes: ["booking", "record"] },
  { id: "c1d", d: "M 16 38.5 H 19 V 23.5 H 23", on: [1, 2, 3], dim: [1, 2, 3], nodes: ["campaign", "record"] },

  /* Record → CRM. */
  { id: "r-crm", d: "M 39 23.5 H 45", on: [1, 2, 3], nodes: ["record", "crm"] },
  { id: "crm-int", d: "M 57.5 34 V 37", on: [2, 3], nodes: ["crm", "integrations"] },

  /* The automation rail, fed from the record and returning to the CRM. */
  { id: "r-trig", d: "M 31 29 V 40 H 8.5 V 46", on: [2, 3], nodes: ["record", "trigger"] },
  { id: "t-w", d: "M 16 49 H 19", on: [2, 3], nodes: ["trigger", "workflow"] },
  { id: "w-a", d: "M 34 49 H 37", on: [2, 3], nodes: ["workflow", "action"] },
  { id: "a-n", d: "M 52 49 H 55", on: [2, 3], nodes: ["action", "notify"] },
  { id: "n-crm", d: "M 63.5 46 V 40 H 57.5 V 34", on: [2, 3], nodes: ["notify", "crm"] },

  /* State 3 — out of the frame, into the product surfaces. */
  { id: "crm-adm", d: "M 70 12 H 72.5 V 9 H 75", on: [3], nodes: ["crm", "admin"] },
  { id: "crm-por", d: "M 70 20 H 72.5 V 22 H 75", on: [3], nodes: ["crm", "portal"] },
  { id: "crm-app", d: "M 70 28 H 72.5 V 36 H 75", on: [3], nodes: ["crm", "webapp"] },
  { id: "app-mob", d: "M 86 36 H 89", on: [3], nodes: ["webapp", "mobile"] },

  /* And past them. Where the next chapter begins. */
  { id: "esc-a", d: "M 99 9 H 100", on: [3], nodes: ["admin"], escape: true },
  { id: "esc-b", d: "M 99 22 H 100", on: [3], nodes: ["portal"], escape: true },
  { id: "esc-c", d: "M 99 36 H 100", on: [3], nodes: ["mobile"], escape: true },
];

const NARROW_ROUTES: readonly Route[] = [
  { id: "n0a", d: "M 24 14 V 34", on: [0], nodes: ["web"] },
  { id: "n0b", d: "M 75 14 V 34", on: [0], nodes: ["form"] },
  { id: "n0c", d: "M 24 28 V 34", on: [0], nodes: ["booking"] },
  { id: "n0d", d: "M 75 28 V 34", on: [0], nodes: ["campaign"] },
  { id: "n0bus", d: "M 24 34 H 75", on: [0], nodes: ["record"] },
  { id: "n0down", d: "M 50 34 V 44", on: [0], nodes: ["record"] },

  { id: "n1a", d: "M 50 14 V 24", on: [1], nodes: ["record", "crm"] },

  { id: "n2a", d: "M 47 9.5 H 53", on: [2], nodes: ["trigger", "workflow"] },
  { id: "n2b", d: "M 75 15 V 16.5 H 24 V 18", on: [2], nodes: ["workflow", "action"] },
  { id: "n2c", d: "M 47 23.5 H 53", on: [2], nodes: ["action", "notify"] },
  { id: "n2d", d: "M 75 29 V 32 H 50 V 36", on: [2], nodes: ["notify", "integrations"] },
  { id: "n2e", d: "M 50 47 V 54", on: [2], nodes: ["integrations", "crm"] },

  { id: "n3a", d: "M 54 10 H 58", on: [3], nodes: ["admin"] },
  { id: "n3b", d: "M 54 27 H 58", on: [3], nodes: ["portal"] },
  { id: "n3c", d: "M 54 44 H 58", on: [3], nodes: ["webapp"] },
  { id: "n3spine", d: "M 58 10 V 44", on: [3], nodes: ["admin", "portal", "webapp"] },
  { id: "n3mob", d: "M 58 29 H 62", on: [3], nodes: ["mobile"] },
  { id: "n3crm", d: "M 50 56 V 50 H 58", on: [3], nodes: ["crm"] },
  { id: "n3esc", d: "M 82 29 H 100", on: [3], nodes: ["mobile"], escape: true },
];

/* ── Node interiors ──────────────────────────────────────────────
   Structure and a name. No words beyond the label, no imagery, no figures. */

function NodeBody({
  node,
  active,
  compact,
}: {
  node: SystemNode;
  active: number;
  /** The node is too short for its full interior — see the module below. */
  compact: boolean;
}) {
  if (node.kind === "module") {
    /* In the narrow fragments the CRM stays on screen as a thin strip, to say
       the later tiers still belong to the same system. Three named rows and a
       rule do not survive 28px, so at that height it keeps its name and its
       status mark and drops the rest. */
    if (compact) {
      return (
        <div className="flex h-full w-full items-center gap-[4%] px-[4%]">
          <span aria-hidden className="web-sys-status" />
          <span className="caps web-sys-label text-[0.5rem]">{node.label}</span>
          <span aria-hidden className="ml-auto block h-px w-[30%] bg-line" />
        </div>
      );
    }
    /* The one node with an interior: a header, three named rows, and a status
       mark that moves down the rows as the system takes on more work. */
    const rows = ["Pipeline", "Owner", "Status"];
    return (
      <div className="flex h-full w-full flex-col gap-[6%] p-[8%]">
        <span className="flex items-center justify-between gap-2">
          <span className="caps web-sys-label text-[0.5625rem]">{node.label}</span>
          <span aria-hidden className="block h-[7px] w-[7px] rounded-[1px] border border-line" />
        </span>
        <span aria-hidden className="block h-px w-full bg-line" />
        {rows.map((row, i) => (
          <span key={row} className="flex flex-1 items-center gap-[6%]">
            <span
              aria-hidden
              className="web-sys-status"
              style={{ opacity: i === Math.min(2, Math.max(0, active - 1)) ? 1 : 0 }}
            />
            <span className="caps text-[0.5rem] text-ink/35">{row}</span>
            <span aria-hidden className="ml-auto block h-[2px] w-[26%] bg-ink/12" />
          </span>
        ))}
      </div>
    );
  }

  if (node.kind === "mobile") {
    /* A narrow surface in the page's own interface language — a header rule, a
       region, an action. Deliberately not a device mockup. */
    return (
      <div className="flex h-full w-full flex-col gap-[7%] p-[9%]">
        <span className="caps web-sys-label text-[0.5rem]">{node.label}</span>
        <span aria-hidden className="block h-px w-full bg-line" />
        <span aria-hidden className="web-media block w-full flex-1" />
        <span aria-hidden className="block h-[7px] w-full rounded-[1px] bg-accent/70" />
      </div>
    );
  }

  if (node.kind === "surface") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-[9%] p-[8%]">
        <span className="caps web-sys-label text-[0.5rem]">{node.label}</span>
        <span aria-hidden className="block h-px w-full bg-line" />
        <span aria-hidden className="flex items-center gap-[4%]">
          <span className="block h-[3px] w-[34%] rounded-[1px] bg-ink/18" />
          <span className="block h-[3px] w-[22%] rounded-[1px] bg-ink/12" />
          <span className="ml-auto block h-[6px] w-[14%] rounded-[1px] bg-accent/60" />
        </span>
      </div>
    );
  }

  if (node.kind === "record") {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-[10%] p-[9%]">
        <span className="caps web-sys-label text-[0.5rem]">{node.label}</span>
        <span aria-hidden className="block h-px w-full bg-line" />
        <span aria-hidden className="block h-[3px] w-[72%] rounded-[1px] bg-ink/20" />
        <span aria-hidden className="block h-[3px] w-[48%] rounded-[1px] bg-ink/14" />
      </div>
    );
  }

  /* entry + step — a name, and a mark that says it is a node on a route. */
  return (
    <div className="flex h-full w-full items-center gap-[6%] px-[8%]">
      <span
        aria-hidden
        className="block h-[5px] w-[5px] shrink-0 rounded-[1px] border border-line-strong"
      />
      <span className="caps web-sys-label min-w-0 text-[0.5rem]">{node.label}</span>
    </div>
  );
}

/* ── The stage ───────────────────────────────────────────────────── */

export function SystemArchitecture({
  active,
  narrow = false,
  className,
}: {
  /** The state currently drawn, as an index into `STATE_ORDER`. */
  active: number;
  /** The mobile fragment layout: one tier at a time, not the accumulated whole. */
  narrow?: boolean;
  className?: string;
}) {
  /**
   * Which node the pointer is on, for route highlighting. One state update per
   * hover, never during scroll, and the diagram is `aria-hidden` with every
   * node named in the copy beside it — so this is an enhancement for pointer
   * users and nothing is only available through it.
   */
  const [lit, setLit] = useState<string | null>(null);
  const clear = useCallback(() => setLit(null), []);

  const field = narrow ? NARROW : WIDE;
  const routes = narrow ? NARROW_ROUTES : ROUTES;

  const placed = NODES.map((node) => {
    const rect = narrow
      ? node.narrow?.[active]
      : (node.wideStates?.[active] ??
        (active >= node.from ? node.wide : undefined));

    if (!rect) return null;

    const dim = narrow
      ? (node.narrowDim ?? []).includes(active)
      : node.dimFrom !== undefined && active >= node.dimFrom;

    return { node, rect, dim };
  }).filter(Boolean) as { node: SystemNode; rect: Rect; dim: boolean }[];

  /** In the wide layout the frame is the *first three* states' bounds. */
  const frameOn = !narrow;

  return (
    <div
      aria-hidden
      data-state={STATE_ORDER[active]}
      className={clsx("web-sys-stage", className)}
      style={{ aspectRatio: `${field.w} / ${field.h}` }}
      onPointerLeave={clear}
    >
      {frameOn ? (
        <div
          className="web-sys-frame"
          style={{
            left: `${WIDE_FRAME.x}%`,
            top: 0,
            width: `${WIDE_FRAME.w}%`,
            height: "100%",
            opacity: active === 3 ? 0.55 : 1,
          }}
        >
          <span className="web-sys-corner" style={{ left: 0, top: 0, borderLeftWidth: 1, borderTopWidth: 1 }} />
          <span className="web-sys-corner" style={{ right: 0, top: 0, borderRightWidth: 1, borderTopWidth: 1 }} />
          <span className="web-sys-corner" style={{ left: 0, bottom: 0, borderLeftWidth: 1, borderBottomWidth: 1 }} />
          <span className="web-sys-corner" style={{ right: 0, bottom: 0, borderRightWidth: 1, borderBottomWidth: 1 }} />
        </div>
      ) : null}

      {/* ── Routes, behind the nodes ────────────────────────────── */}
      <svg
        viewBox={`0 0 ${field.w} ${field.h}`}
        fill="none"
        className="web-lines"
        style={{ overflow: "hidden" }}
      >
        {routes.map((route) => {
          const on = route.on.includes(active);
          const dim = (route.dim ?? []).includes(active);
          const isLit = lit !== null && route.nodes.includes(lit);
          return (
            <path
              key={route.id}
              d={route.d}
              pathLength={1}
              className={clsx("web-sys-route", route.escape && "web-sys-route--escape")}
              data-on={on ? "true" : "false"}
              data-tone={dim && !isLit ? "dim" : undefined}
              data-lit={on && isLit ? "true" : undefined}
            />
          );
        })}
      </svg>

      {/* ── Nodes ───────────────────────────────────────────────── */}
      {placed.map(({ node, rect, dim }) => {
        const [x, y, w, h] = rect;
        const isLit = lit === node.id;
        return (
          <div
            key={node.id}
            className="web-sys-node"
            data-on="true"
            data-tone={dim && !isLit ? "dim" : undefined}
            data-lit={isLit ? "true" : undefined}
            data-key={node.id === "record" || node.id === "crm" ? "true" : undefined}
            style={{
              left: `${x}%`,
              top: `${(y / field.h) * 100}%`,
              width: `${w}%`,
              height: `${(h / field.h) * 100}%`,
            }}
            onPointerEnter={() => setLit(node.id)}
          >
            <NodeBody node={node} active={active} compact={h < 16} />
          </div>
        );
      })}
    </div>
  );
}
