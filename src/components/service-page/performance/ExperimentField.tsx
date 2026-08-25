"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import {
  PERFORMANCE_HERO,
  type SurfaceRow,
} from "@/config/service-performance";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { CreativeSurface } from "./CreativeSurface";

/**
 * THE EXPERIMENT FIELD — the hero composition for Performance Marketing.
 *
 * The page's thesis in one image: **a hypothesis becomes variants, variants
 * become distribution, distribution becomes a destination, the destination
 * returns a signal, and the signal changes the next round of creative.**
 *
 * DELIBERATELY UNLIKE THE OTHER TWO HEROES, and the difference is structural
 * rather than cosmetic:
 *
 * - Service 01's Brand Signal is one identity resolving outward into formats,
 *   circled by a closed loop, anchored on a photograph.
 * - Service 02's Campaign Constellation is a field of five people converging
 *   inward onto one node.
 * - This is a **directed route with a return trace** — left to right, through
 *   controlled stages, ending in a feedback arc. Nothing radiates and nothing
 *   converges; things travel. **There is no photography in it at all.**
 *
 * WHAT IT DOES NOT SAY. No ad-manager chrome, no platform UI, no logo, no
 * chart, no axis, and **not one number** — no ROAS, CTR, CPA, spend, revenue or
 * conversion count. The surfaces carry structure and nothing else (see
 * `CreativeSurface`), the signal is a mark rather than a measurement, and the
 * caption under the hero says on the page that this is a diagram of a method.
 *
 * **No WebGL, no canvas, no video** (§12). Percentages of a fixed-aspect box
 * with an SVG whose viewBox matches that aspect exactly, so a collision checked
 * at one viewport is checked at all of them and no stroke can shear (§10, §10a).
 *
 * **The narrow composition is a different composition, not a smaller one.** At
 * phone width the route turns vertical, the variant cluster becomes one primary
 * plus two fragments, and the landing sits beside its own signal — the brief's
 * instruction not to shrink the desktop system to 390px. Both layouts are the
 * same data shape, so there is one render path and two tables.
 */

const WIDE_FIELD_QUERY = "(min-width: 640px)";

type Place = {
  id: string;
  /** The factual label under the surface. Structural only (§10). */
  label: string;
  left: number;
  top: number;
  width: number;
  /** CSS aspect string, and the same ratio as a number for the tag maths. */
  aspect: string;
  ar: number;
  rows: readonly SurfaceRow[];
  /** Pointer-parallax depth. Bigger = nearer = moves more. */
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
};

type Anno = {
  id: string;
  text: string;
  x: number;
  y: number;
  /** `corner` is left-aligned, for a label sitting against the box edge. */
  place: "above" | "below" | "corner";
  /** Teal, for the two labels that name a teal mark. Sparingly. */
  accent?: boolean;
};

type Layout = {
  vbW: number;
  vbH: number;
  aspect: string;
  surfaces: readonly Place[];
  /** The variant that carries the spend. Drawn teal, and it travels. */
  dominant: string;
  /** The variants that also entered distribution. Graphite hairlines. */
  quiet: readonly string[];
  /** Distribution → destination. */
  out: string;
  /** Variant → distribution → destination as one continuous path, for the dash. */
  flow: string;
  /** Routes that quieten after distribution. Nothing is labelled a loser. */
  stubs: readonly string[];
  /** Destination → signal. */
  drop: string;
  /** The return trace, and its arrowhead. Secondary by design. */
  feedback: string;
  arrow: string;
  node: { x: number; y: number };
  signal: { x: number; y: number };
  ticks: readonly { x: number; y0: number; y1: number }[];
  annos: readonly Anno[];
};

const L = PERFORMANCE_HERO.labels;

/** The creative variants. Same idea, three structures. */
const VARIANT_A: readonly SurfaceRow[] = [
  { k: "rule", w: 80, strong: true },
  { k: "block", grow: 1 },
  { k: "rule", w: 66 },
  { k: "rule", w: 42 },
  { k: "action", w: 56 },
];

const VARIANT_B: readonly SurfaceRow[] = [
  { k: "rule", w: 92, strong: true },
  { k: "rule", w: 58, strong: true },
  { k: "block", grow: 1 },
  { k: "rule", w: 60 },
  { k: "action", w: 52 },
];

const VARIANT_C: readonly SurfaceRow[] = [
  { k: "rule", w: 44, strong: true },
  { k: "block", grow: 1 },
  { k: "rule", w: 72 },
  { k: "action", w: 60 },
];

/** The destination. An interface, not an ad — masthead rule, then the page. */
const LANDING_ROWS: readonly SurfaceRow[] = [
  { k: "rule", w: 26 },
  { k: "rule", w: 100 },
  { k: "rule", w: 64, strong: true },
  { k: "rule", w: 46 },
  { k: "block", grow: 1 },
  { k: "action", w: 32 },
];

/* ── Wide: the route runs left to right ─────────────────────────── */

const WIDE: Layout = {
  vbW: 100,
  vbH: 88,
  aspect: "100 / 88",
  surfaces: [
    {
      id: "a",
      label: L.variantA,
      left: 1,
      top: 7,
      width: 26,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_A,
      depth: 1,
      drift: "a",
      delay: 0.36,
    },
    {
      id: "b",
      label: L.variantB,
      left: 13,
      top: 35,
      width: 19,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_B,
      depth: 1.5,
      drift: "b",
      delay: 0.46,
    },
    {
      id: "c",
      label: L.variantC,
      left: 1,
      top: 66,
      width: 15,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_C,
      depth: 1.9,
      drift: "c",
      delay: 0.56,
    },
    {
      id: "landing",
      label: L.landing,
      left: 61,
      top: 17,
      width: 38,
      aspect: "16 / 10",
      ar: 1.6,
      rows: LANDING_ROWS,
      depth: 1.2,
      drift: "d",
      delay: 0.82,
    },
  ],
  dominant: "M27 22.4 C 38 22.4, 40 44, 48 44",
  quiet: [
    "M32 42.7 C 38 42.7, 43 44, 48 44",
    "M16 67.5 C 30 67.5, 40 54, 48 45",
  ],
  out: "M48 44 C 54 44, 56 27, 61 27",
  flow: "M27 22.4 C 38 22.4, 40 44, 48 44 C 54 44, 56 27, 61 27",
  stubs: [
    "M48 44 C 51 49, 52 56, 52 61",
    "M48 44 C 50 50, 49 58, 48 63",
  ],
  drop: "M78 40 L78 52",
  // The return trace stops at Variant C's right edge (x16, mid-height) rather
  // than running on to y79, where its arrowhead landed on top of the
  // `VARIANT C` label — visible the first time this hero was screenshotted.
  // It now points into the surface it actually returns to.
  feedback: "M71 60 C 50 80, 30 78, 17 71",
  arrow: "M21 68 L16.5 71 L21 74",
  node: { x: 48, y: 44 },
  signal: { x: 78, y: 56 },
  ticks: [
    { x: 84, y0: 59, y1: 55 },
    { x: 87.5, y0: 59, y1: 52 },
    { x: 91, y0: 59, y1: 49 },
  ],
  annos: [
    { id: "creative", text: L.creative, x: 1, y: 1, place: "corner" },
    { id: "distribution", text: L.distribution, x: 48, y: 44, place: "above", accent: true },
    // Clear of the signal disc rather than inside it. `below` alone put the
    // word 14px under the node's centre, which is well within the ~22px
    // radius — the screenshot showed the disc cutting through the letterforms.
    { id: "signal", text: L.signal, x: 78, y: 60.5, place: "below", accent: true },
    // Below the return trace now that the trace sits higher, so the label and
    // the line it names no longer occupy the same pixels.
    { id: "iterate", text: L.iterate, x: 40, y: 79, place: "below" },
  ],
};

/* ── Narrow: the same route, turned vertical ────────────────────── */

const STACKED: Layout = {
  vbW: 100,
  vbH: 178,
  aspect: "100 / 178",
  surfaces: [
    {
      id: "a",
      label: L.variantA,
      left: 3,
      top: 5,
      width: 42,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_A,
      depth: 1,
      drift: "a",
      delay: 0.36,
    },
    {
      id: "b",
      label: L.variantB,
      left: 54,
      top: 8,
      width: 24,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_B,
      depth: 1.5,
      drift: "b",
      delay: 0.46,
    },
    {
      id: "c",
      label: L.variantC,
      left: 60,
      top: 32,
      width: 20,
      aspect: "4 / 5",
      ar: 0.8,
      rows: VARIANT_C,
      depth: 1.9,
      drift: "c",
      delay: 0.56,
    },
    {
      id: "landing",
      label: L.landing,
      left: 4,
      top: 65,
      width: 62,
      aspect: "16 / 10",
      ar: 1.6,
      rows: LANDING_ROWS,
      depth: 1.2,
      drift: "d",
      delay: 0.82,
    },
  ],
  dominant: "M24 61 C 24 78, 34 89, 40 95",
  quiet: [
    "M66 47 C 66 70, 48 86, 40 95",
    "M70 83 C 70 90, 48 93, 40 95",
  ],
  out: "M40 97 C 40 106, 36 108, 35 114",
  flow: "M24 61 C 24 78, 34 89, 40 95 L40 97 C 40 106, 36 108, 35 114",
  stubs: [
    "M40 97 C 46 101, 50 106, 51 110",
    "M40 97 C 44 102, 45 108, 44 112",
  ],
  drop: "M67 132 L75 132",
  feedback: "M78 142 C 70 164, 40 172, 13 167",
  arrow: "M17 164 L12.5 167 L17 170",
  node: { x: 40, y: 96 },
  signal: { x: 80, y: 132 },
  ticks: [
    { x: 85, y0: 138, y1: 134 },
    { x: 88.5, y0: 138, y1: 131 },
    { x: 92, y0: 138, y1: 128 },
  ],
  annos: [
    { id: "creative", text: L.creative, x: 3, y: 0, place: "corner" },
    { id: "distribution", text: L.distribution, x: 40, y: 96, place: "above", accent: true },
    // Same correction as the wide layout, plus one this layout has of its own:
    // centred on the disc at x80 the word also ran into the ascending ticks at
    // x85–92. Pulled left and dropped below both. Verified at 390.
    { id: "signal", text: L.signal, x: 72, y: 137, place: "below", accent: true },
    { id: "iterate", text: L.iterate, x: 44, y: 170, place: "above" },
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ExperimentField() {
  const reduced = usePrefersReducedMotion();
  /**
   * `true` on the server so the desktop composition is what ships in the HTML;
   * a phone corrects it on its first client render, which happens inside the
   * 300ms the hero holds the whole composition at `opacity: 0`.
   */
  const wide = useMediaQuery(WIDE_FIELD_QUERY, true);
  const layout = wide ? WIDE : STACKED;

  const box = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 84, damping: 24, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 84, damping: 24, mass: 0.7 });

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== "mouse" || !box.current) return;
      const rect = box.current.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const pct = (y: number) => `${(y / layout.vbH) * 100}%`;

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-layout={wide ? "wide" : "stacked"}
      className="pfm-field"
      style={{ aspectRatio: layout.aspect }}
    >
      {/* ── The routes, behind the surfaces ─────────────────────── */}
      <svg
        aria-hidden
        viewBox={`0 0 ${layout.vbW} ${layout.vbH}`}
        fill="none"
        className="pfm-routes"
      >
        {/* The variants that also entered distribution. Nothing here is
            labelled a loser — a test that only ran one thing is not a test. */}
        {layout.quiet.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="pfm-route"
            stroke="var(--color-line-strong)"
            strokeWidth="0.26"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.75 + i * 0.1, ease: EASE }}
          />
        ))}

        {/* The route the spend follows. */}
        <motion.path
          d={layout.dominant}
          className="pfm-route"
          stroke="var(--color-accent)"
          strokeWidth="0.55"
          strokeOpacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.68, ease: EASE }}
        />
        <motion.path
          d={layout.out}
          className="pfm-route"
          stroke="var(--color-accent)"
          strokeWidth="0.55"
          strokeOpacity="0.9"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
        />

        {/* Traffic actually moving. The only continuous motion in the
            composition, and it is a dash on a path — not a particle system. */}
        <motion.path
          d={layout.flow}
          className="pfm-route pfm-flow"
          stroke="var(--color-accent)"
          strokeWidth="0.8"
          strokeDasharray="4 46"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        />

        {/* Distribution continuing at lower weight. */}
        {layout.stubs.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="pfm-route pfm-route--quiet"
            stroke="var(--color-line-strong)"
            strokeWidth="0.24"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 0.8, delay: 1.15 + i * 0.08, ease: EASE }}
          />
        ))}

        {/* Destination → signal. */}
        <motion.path
          d={layout.drop}
          className="pfm-route"
          stroke="var(--color-accent)"
          strokeWidth="0.4"
          strokeOpacity="0.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.35, ease: EASE }}
        />

        {/* The distribution node — a square, the page's own hairline language
            rather than a bullet. */}
        <motion.rect
          x={layout.node.x - 2}
          y={layout.node.y - 2}
          width="4"
          height="4"
          className="pfm-node"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        />

        {/* The response. A mark, never a measurement. */}
        <motion.circle
          cx={layout.signal.x}
          cy={layout.signal.y}
          r="3.6"
          className="pfm-signal-ring"
          stroke="var(--color-accent)"
          strokeWidth="0.3"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
          style={{
            transformOrigin: `${layout.signal.x}px ${layout.signal.y}px`,
          }}
        />
        <motion.circle
          cx={layout.signal.x}
          cy={layout.signal.y}
          r="1.3"
          fill="var(--color-accent)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.56, ease: EASE }}
          style={{
            transformOrigin: `${layout.signal.x}px ${layout.signal.y}px`,
          }}
        />

        {/* Intensity and direction, with no axis and no figure attached. */}
        {layout.ticks.map((tick, i) => (
          <motion.line
            key={tick.x}
            x1={tick.x}
            y1={tick.y0}
            x2={tick.x}
            y2={tick.y1}
            stroke="var(--color-accent)"
            strokeOpacity="0.55"
            strokeWidth="0.45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.7 + i * 0.09 }}
          />
        ))}

        {/* The loop closing. Deliberately secondary: the dominant reading is
            creative → distribution → landing, and this is what happens after. */}
        <motion.path
          d={layout.feedback}
          className="pfm-route pfm-feedback"
          stroke="var(--color-ink)"
          strokeOpacity="0.22"
          strokeWidth="0.24"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 1.85, ease: EASE }}
        />
        <motion.path
          d={layout.arrow}
          stroke="var(--color-accent)"
          strokeWidth="0.4"
          strokeLinecap="square"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.4, delay: 2.9 }}
        />
      </svg>

      {/* ── The surfaces ────────────────────────────────────────── */}
      {layout.surfaces.map((place) => (
        <SurfaceNode
          key={place.id}
          place={place}
          vbH={layout.vbH}
          sx={sx}
          sy={sy}
        />
      ))}

      {/* ── The labels, as HTML so the type stays crisp ─────────── */}
      {layout.annos.map((anno, i) => (
        <motion.span
          key={anno.id}
          aria-hidden
          className={`caps pfm-anno pfm-anno--${anno.place}${
            anno.accent ? " pfm-anno--accent" : ""
          }`}
          style={{ left: `${anno.x}%`, top: pct(anno.y) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 + i * 0.12 }}
        >
          {anno.text}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * One surface in the field. The outer wrapper carries the entry and the pointer
 * parallax; an inner wrapper carries the idle drift, so a CSS animation never
 * fights a Motion transform on the same element (§10).
 */
function SurfaceNode({
  place,
  vbH,
  sx,
  sy,
}: {
  place: Place;
  vbH: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * 12 * place.depth);
  const y = useTransform(sy, (v) => v * 8 * place.depth);

  /** Where the surface ends, so its label can sit under it rather than on it. */
  const bottom = ((place.top / 100) * vbH + place.width / place.ar) / vbH;

  return (
    <>
      {/* Three layers, and they must stay three: the parallax MotionValues own
          the outer transform, the entry animation owns the middle one, and the
          idle CSS drift owns the inner one. Putting an animated `y` on the same
          element as a `y` MotionValue makes the two fight (§10). */}
      <motion.div
        className="pfm-place"
        style={{
          left: `${place.left}%`,
          top: `${place.top}%`,
          width: `${place.width}%`,
          x,
          y,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: place.delay, ease: EASE }}
        >
          <div className={`svc-drift svc-drift--${place.drift}`}>
            <CreativeSurface rows={place.rows} aspect={place.aspect} />
          </div>
        </motion.div>
      </motion.div>

      <motion.span
        aria-hidden
        className="caps pfm-tag"
        style={{ left: `${place.left}%`, top: `${bottom * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: place.delay + 0.3 }}
      >
        {place.label}
      </motion.span>
    </>
  );
}
