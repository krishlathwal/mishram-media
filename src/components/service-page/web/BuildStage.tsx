"use client";

import { useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { WEB_HERO } from "@/config/service-web";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import {
  ComponentSurface,
  MobileSurface,
  SiteSurface,
  WireSurface,
} from "./InterfaceSurface";
import { useScrollRange } from "./scroll-range";

/**
 * THE DIGITAL BUILD STAGE — the hero composition for Web & Digital
 * Experiences.
 *
 * The page's thesis as one image: **a measured field becomes a structure, the
 * structure becomes an interface, the interface adapts, and a system runs
 * behind it.** Four surfaces at four depths, connected by an architecture
 * layer, over a measurement grid.
 *
 * DELIBERATELY UNLIKE THE OTHER THREE SERVICE HEROES, and structurally rather
 * than cosmetically:
 *
 * - Service 01's Brand Signal is one identity resolving outward into formats.
 * - Service 02's Campaign Constellation converges five people onto one node.
 * - Service 03's Experiment Field is a directed route with a return trace.
 * - This is a **stack in depth**. Nothing radiates, nothing converges and
 *   nothing travels — the same object exists at four stages of being built,
 *   and the composition is what you see when you look at all four at once.
 *
 * **THE ASSEMBLY RUNS ON ENTRY, NOT ON SCROLL — and that is a decision.**
 * Gating the build sequence on scroll would leave a visitor who does not
 * scroll looking at a half-drawn hero, and §12 rules out animation that
 * withholds content. So the entry choreography completes the sequence on its
 * own (~2.4s), and **scroll then performs a second movement**: the measurement
 * field, the structure and the architecture lines converge into the primary
 * viewport and clear, the mobile surface docks, and the group recedes in Z.
 * The last frame before the hero leaves is one resolved digital experience —
 * the same handoff the homepage's Growth Orbit makes into the section below it.
 *
 * **No browser chrome, no photography, no code, no dashboard, no 3D model, no
 * WebGL** (§12 — the homepage hero is the site's only 3D moment). Percentages
 * of a fixed-aspect box, with an SVG whose viewBox matches that aspect exactly,
 * so a collision checked at one viewport is checked at all of them.
 *
 * **The narrow composition is a different composition, not a smaller one** —
 * the stack turns vertical and the surfaces re-order, which is the brief's own
 * instruction not to collapse a desktop system onto a phone. Both layouts are
 * the same data shape, so there is one render path and two tables.
 */

const WIDE_QUERY = "(min-width: 640px)";
const EASE = [0.16, 1, 0.3, 1] as const;

type SurfaceId = "wire" | "site" | "mobile" | "component";

type Place = {
  id: SurfaceId;
  /** The factual label under the surface. Structural only (§10). */
  label: string;
  /**
   * Where the label sits, when the surface's own left edge is not the right
   * place for it — the interface's would otherwise land 2 units from the
   * component surface below it.
   */
  labelX?: number;
  /** viewBox units. `x`/`w` are percentages of the box's width. */
  x: number;
  y: number;
  w: number;
  /** Height in the same units, derived from the surface's own aspect. */
  h: number;
  /** Pointer-parallax depth. Bigger = nearer = moves more. */
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
  /** Stacking order. The interface is always in front of its own structure. */
  z: number;
};

type Layout = {
  /** The box, and the SVG viewBox, are the same coordinate system. */
  vbW: number;
  vbH: number;
  aspect: string;
  surfaces: readonly Place[];
  /** Orthogonal connectors — an architecture drawing, not a flow chart. */
  links: readonly string[];
  /** Where a connector meets a surface. */
  nodes: readonly { x: number; y: number }[];
  /** Column ticks in the measurement field, as percentages of the width. */
  ticks: readonly number[];
};

const L = WEB_HERO.labels;

/* ── Wide: the stack reads left-to-right and back-to-front ────────
   Every surface is placed so that the part of it a *later* surface does not
   cover is the part that identifies it: the structure keeps its top-left
   corner, the narrow viewport hangs below the interface's bottom edge, and the
   component sits clear of both. Overlap is what makes it one object; the
   uncovered corner is what keeps it four stages. */

const WIDE: Layout = {
  vbW: 100,
  vbH: 86,
  aspect: "100 / 86",
  surfaces: [
    { id: "wire", label: L.structure, x: 0, y: 1, w: 54, h: 33.75, depth: 0.5, drift: "b", delay: 0.34, z: 10 },
    { id: "site", label: L.interface, labelX: 34, x: 24, y: 17, w: 72, h: 45, depth: 1, drift: "a", delay: 0.7, z: 30 },
    { id: "mobile", label: L.responsive, x: 76, y: 46, w: 17, h: 35.9, depth: 1.5, drift: "c", delay: 1.3, z: 40 },
    { id: "component", label: L.system, x: 0, y: 54, w: 22, h: 17.6, depth: 1.8, drift: "d", delay: 1.5, z: 40 },
  ],
  /* Each connector runs only through space no surface covers — a hidden
     hairline is a hairline that was not worth drawing. */
  links: [
    // Structure feeding the interface, above the interface's own top edge.
    "M 54 8 H 66 V 17",
    // The interface reaching the narrow viewport, around its right edge.
    "M 96 38 H 99 V 58 H 93",
    // The interface reaching the system behind it.
    "M 24 48 H 12 V 54",
  ],
  nodes: [
    { x: 66, y: 17 },
    { x: 93, y: 58 },
    { x: 12, y: 54 },
  ],
  ticks: [12, 34, 56, 78],
};

/* ── Narrow: the same four stages, stacked vertically ─────────────
   **A different composition, not the wide one scaled.** The stack turns
   vertical, every surface grows relative to the box, and the placement is
   re-derived so each label lands in space no surface occupies — the wide
   table's `STRUCTURE` ran straight under the interface at 390px. */

const STACKED: Layout = {
  vbW: 100,
  vbH: 126,
  aspect: "100 / 126",
  surfaces: [
    { id: "wire", label: L.structure, x: 0, y: 2, w: 50, h: 31.25, depth: 0.5, drift: "b", delay: 0.34, z: 10 },
    // `x: 22`, not 18. `STRUCTURE` is 62px wide and starts at the box's own
    // left edge, so at 18% the interface's left edge landed 1px off the end of
    // it at 390 — clearance that survives no font or viewport change.
    { id: "site", label: L.interface, x: 22, y: 20, w: 78, h: 48.75, depth: 1, drift: "a", delay: 0.7, z: 30 },
    { id: "mobile", label: L.responsive, x: 70, y: 60, w: 24, h: 50.7, depth: 1.5, drift: "c", delay: 1.3, z: 40 },
    { id: "component", label: L.system, x: 0, y: 78, w: 32, h: 25.6, depth: 1.8, drift: "d", delay: 1.5, z: 40 },
  ],
  links: [
    // Above the interface's top edge, where the structure is still visible.
    "M 50 10 H 58 V 20",
    // Down the clear channel between the component and the narrow viewport.
    "M 44 68.75 V 88 H 70",
    // Out to the left of the interface, then down into the system.
    "M 22 62 H 10 V 78",
  ],
  nodes: [
    { x: 58, y: 20 },
    { x: 70, y: 88 },
    { x: 10, y: 78 },
  ],
  ticks: [16, 50, 84],
};

/**
 * How far each surface travels toward the primary viewport as the hero exits,
 * in CSS pixels at full scroll. Small on purpose — this is a composition
 * resolving, not an animation playing.
 */
const CONVERGE: Record<SurfaceId, { x: number; y: number }> = {
  wire: { x: 36, y: 30 },
  site: { x: 0, y: 0 },
  mobile: { x: -30, y: -18 },
  component: { x: 42, y: -26 },
};

export function BuildStage() {
  const reduced = usePrefersReducedMotion();
  /**
   * `true` on the server so the wide composition is what ships in the HTML; a
   * phone corrects it on its first client render, inside the 300ms the hero
   * holds the whole composition at `opacity: 0`.
   */
  const wide = useMediaQuery(WIDE_QUERY, true);
  const layout = wide ? WIDE : STACKED;

  const box = useRef<HTMLDivElement>(null);

  /* ── Pointer parallax ─────────────────────────────────────────── */
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

  /* ── The scroll movement ──────────────────────────────────────
     **`start start`, and the first draft got this wrong.** With
     `start center` the progress is measured from the moment the stage's top
     passes the viewport's middle — which, for a composition that sits centred
     in a 100svh hero, has *already happened* at rest. Measured: 0.304 before a
     single pixel of scroll, which had the measurement field and every label at
     `opacity: 0` in the very first frame the visitor sees. The composition
     looked like it had failed to render.

     `start start` puts progress at 0 for as long as the hero is at the top of
     the viewport, which is the only correct resting state for a hero. */
  const { scrollYProgress } = useScroll({
    target: box,
    offset: ["start start", "end start"],
  });

  /**
   * `useScrollRange`, not a bare `useTransform` with a range — every scroll
   * driven `opacity` on this route stays off Motion's WAAPI ScrollTimeline
   * path, which does not track these ranges. See `scroll-range.ts`.
   */
  /**
   * The windows are stretched deliberately. The stage is ~465px tall inside a
   * 900px hero, so its own scroll range is barely half the chapter — with the
   * first tuning the whole composition had resolved and cleared by 420px, while
   * the lead, the detail and both CTAs were still fully on screen. A hero
   * visual should not finish before its own copy.
   *
   * The quiet layers still leave first, so the interface is what remains.
   */
  const labelsOut = useScrollRange(scrollYProgress, [0.1, 0.5], [1, 0]);
  const fieldOut = useScrollRange(scrollYProgress, [0.12, 0.58], [1, 0]);
  const linksOut = useScrollRange(scrollYProgress, [0.18, 0.65], [1, 0]);
  /** The whole group receding — the handoff into the section below. */
  const groupScale = useScrollRange(scrollYProgress, [0.45, 1], [1, 0.94]);
  const groupFade = useScrollRange(scrollYProgress, [0.65, 1], [1, 0.34]);

  const pctY = (y: number) => `${(y / layout.vbH) * 100}%`;

  return (
    <motion.div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-layout={wide ? "wide" : "stacked"}
      className="web-stage"
      style={{
        aspectRatio: layout.aspect,
        ...(reduced ? null : { scale: groupScale, opacity: groupFade }),
      }}
    >
      {/* ── The measurement field ───────────────────────────────
          The quietest layer and the first to go. It is the reason the
          composition reads as something being built to a system rather than
          as surfaces arranged by eye. */}
      {/* Two elements, and they must stay two: the scroll MotionValue owns the
          outer opacity and the entry animation owns the inner one. Both on the
          same element is the §10 conflict — Motion cannot animate a property it
          is also being driven on, and here it threw outright. */}
      <motion.div
        aria-hidden
        className="web-measure"
        style={reduced ? undefined : { opacity: fieldOut }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          {layout.ticks.map((t) => (
            <span
              key={t}
              className="web-tick"
              style={{ left: `${t}%`, top: 0, width: "1px", height: "100%" }}
            />
          ))}
          {/* Registration marks. Four corners, each one two hairlines. */}
          <span className="web-reg" style={{ left: 0, top: 0, borderLeftWidth: 1, borderTopWidth: 1 }} />
          <span className="web-reg" style={{ right: 0, top: 0, borderRightWidth: 1, borderTopWidth: 1 }} />
          <span className="web-reg" style={{ left: 0, bottom: 0, borderLeftWidth: 1, borderBottomWidth: 1 }} />
          <span className="web-reg" style={{ right: 0, bottom: 0, borderRightWidth: 1, borderBottomWidth: 1 }} />
        </motion.div>
      </motion.div>

      {/* ── The architecture layer ──────────────────────────────
          Orthogonal hairlines, drawn with `pathLength` and deliberately
          without `vector-effect` (§10's shatter gotcha). They say the surfaces
          are one system rather than four pictures. */}
      <motion.svg
        aria-hidden
        viewBox={`0 0 ${layout.vbW} ${layout.vbH}`}
        fill="none"
        className="web-lines"
        style={reduced ? undefined : { opacity: linksOut }}
      >
        {layout.links.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="web-link"
            stroke="var(--color-line-strong)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.62 + i * 0.14, ease: EASE }}
          />
        ))}

        {layout.nodes.map((n, i) => (
          <motion.rect
            key={`${n.x}-${n.y}`}
            x={n.x - 1.1}
            y={n.y - 1.1}
            width="2.2"
            height="2.2"
            className="web-node"
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
          />
        ))}
      </motion.svg>

      {/* ── The surfaces ────────────────────────────────────────── */}
      {layout.surfaces.map((place) => (
        <SurfaceNode
          key={place.id}
          place={place}
          layout={layout}
          sx={sx}
          sy={sy}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}

      {/* ── The labels, as HTML so the type stays crisp ─────────── */}
      {layout.surfaces.map((place, i) => (
        <motion.span
          key={`${place.id}-label`}
          aria-hidden
          className={`caps web-anno web-anno--corner${
            place.id === "site" ? " web-anno--accent" : ""
          }`}
          style={{
            left: `${place.labelX ?? place.x}%`,
            top: pctY(place.y + place.h),
            ...(reduced ? null : { opacity: labelsOut }),
          }}
        >
          {/* Same split as the measurement field: scroll drives the wrapper,
              the entry drives the label. */}
          <motion.span
            className="block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: place.delay + 0.34 + i * 0.04 }}
          >
            {place.label}
          </motion.span>
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * One surface in the stack.
 *
 * **Three transform layers, and they must stay three** (§10): the outer plane
 * owns the pointer parallax and the scroll convergence, the middle owns the
 * entry, and the inner owns the idle CSS drift. Putting an animated `y` on the
 * same element as a `y` MotionValue makes the two fight.
 */
function SurfaceNode({
  place,
  layout,
  sx,
  sy,
  progress,
  reduced,
}: {
  place: Place;
  layout: Layout;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const converge = CONVERGE[place.id];

  /* Pointer parallax and scroll convergence share one transform, so they are
     summed here rather than nested — two motion divs each owning an `x` would
     be a third layer for no reason. */
  const x = useTransform<number, number>(
    [sx, progress],
    ([pointer, scrolled]) => pointer * 13 * place.depth + scrolled * converge.x,
  );
  const y = useTransform<number, number>(
    [sy, progress],
    ([pointer, scrolled]) => pointer * 9 * place.depth + scrolled * converge.y,
  );

  /* Everything except the primary viewport clears as it converges — the
     surfaces resolve *into* the finished interface rather than piling onto it. */
  const fade = useScrollRange(
    progress,
    [0.22, 0.85],
    [1, place.id === "site" ? 1 : 0],
  );

  return (
    <motion.div
      className="web-plane"
      style={{
        left: `${place.x}%`,
        top: `${(place.y / layout.vbH) * 100}%`,
        width: `${place.w}%`,
        zIndex: place.z,
        ...(reduced ? null : { x, y, opacity: fade }),
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.955, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, delay: place.delay, ease: EASE }}
      >
        <div className={`svc-drift svc-drift--${place.drift}`}>
          <Surface id={place.id} delay={place.delay} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Surface({ id, delay }: { id: SurfaceId; delay: number }) {
  if (id === "wire") return <WireSurface className="aspect-[16/10]" />;
  if (id === "site") return <SiteSurface delay={delay + 0.2} />;
  if (id === "mobile") return <MobileSurface delay={delay + 0.1} />;
  return <ComponentSurface delay={delay + 0.1} />;
}
