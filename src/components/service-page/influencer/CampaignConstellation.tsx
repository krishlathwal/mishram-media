"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { ROSTER, resolveFrame, type FrameKind } from "@/config/creators";
import { INFLUENCER_ANCHOR, INFLUENCER_HERO } from "@/config/service-influencer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * THE CAMPAIGN CONSTELLATION — the hero composition for Influencer Marketing.
 *
 * The page's thesis in one image: **many creators, one campaign.** A campaign
 * signal sits at the centre; five real creators are distributed around it at
 * genuinely different scales and depths; arcs connect each of them back to the
 * centre, and one teal segment travels the network.
 *
 * **Deliberately the opposite of Service 01's Brand Signal.** That composition
 * is one identity resolving into three formats — a person becoming a system.
 * This one is a field of distinct people converging on a single objective. Same
 * grammar, opposite direction, and no element is reused between them.
 *
 * **No WebGL** (§12), no canvas, no video. Percentages of a fixed-aspect box,
 * so a collision checked at one viewport is checked at all of them, plus one
 * SVG whose viewBox matches that aspect exactly — no shearing, true hairlines.
 *
 * WHAT IT DOES NOT SAY. Every frame carries the creator's real name and their
 * format, and nothing else. **No follower count, no audience demographic, no
 * engagement figure, no campaign score, no price, and no implication that these
 * five people were ever on one campaign together.** The attribution line under
 * the composition says what they are: creators from the network.
 *
 * **ONE NODE IS THE RELATIONSHIP NODE** (Revision 32). `INFLUENCER_ANCHOR`
 * gives a single frame its own production photograph and the only relationship
 * word the project can evidence for it — `Worked with`, never *managed*. It is
 * one node of five on purpose: the hero has to keep reading as a network being
 * orchestrated, so the proof arrives inside the composition rather than
 * replacing it with a portrait.
 */

/** Box aspect, and the SVG viewBox that matches it exactly. */
const VB_W = 100;
const VB_H = 92;

type Placement = {
  creatorId: string;
  kind: FrameKind;
  aspect: string;
  left: number;
  top: number;
  width: number;
  z: number;
  /** Pointer-parallax depth. Bigger = further forward = moves more. */
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
  sizes: string;
  /** Only the anchor is eager — see the note on `eager` below. */
  eager?: boolean;
  /**
   * Draw this node from `INFLUENCER_ANCHOR` — its own crop, its own aspect and
   * the relationship marker — instead of from the roster's shared portrait.
   */
  anchor?: boolean;
};

/**
 * The field. Sizes are deliberately uneven: a constellation with five equal
 * frames is a grid, not a network.
 *
 * Every position is a percentage of the fixed-aspect box, and every one is
 * checked against the SVG's own coordinate space below.
 */
const FIELD: readonly Placement[] = [
  {
    creatorId: "zoya",
    kind: "portrait",
    aspect: "3 / 4",
    left: 1,
    top: 6,
    width: 30,
    z: 30,
    depth: 1,
    drift: "a",
    delay: 0.4,
    sizes: "(max-width: 640px) 40vw, (max-width: 1023px) 22vw, 12vw",
    eager: true,
  },
  {
    creatorId: "mukul",
    kind: "reel",
    aspect: "9 / 16",
    left: 72,
    top: 2,
    width: 21,
    z: 28,
    depth: 1.6,
    drift: "b",
    delay: 0.52,
    sizes: "(max-width: 640px) 26vw, (max-width: 1023px) 15vw, 8vw",
  },
  {
    creatorId: "nikita",
    kind: "content",
    aspect: "4 / 5",
    left: 66,
    top: 56,
    width: 26,
    z: 26,
    depth: 1.3,
    drift: "c",
    delay: 0.64,
    sizes: "(max-width: 640px) 32vw, (max-width: 1023px) 18vw, 10vw",
  },
  {
    // The relationship node. Three percent wider than the four around it and a
    // 4:5 rather than a 3:4 — enough to be the frame a visitor looks at first
    // in the lower half, not enough to stop the field reading as a field. Its
    // arc already terminates behind the photograph, so the geometry is
    // unchanged; only the frame's own box grew.
    creatorId: "lovkesh",
    kind: "portrait",
    aspect: INFLUENCER_ANCHOR.aspect,
    left: 3,
    top: 60,
    width: 25,
    z: 24,
    depth: 1.8,
    drift: "d",
    delay: 0.76,
    sizes: "(max-width: 640px) 32vw, (max-width: 1023px) 18vw, 10vw",
    anchor: true,
  },
  {
    creatorId: "vishnu",
    kind: "reel",
    aspect: "9 / 16",
    left: 36,
    top: 63,
    width: 17,
    z: 22,
    depth: 2.1,
    drift: "b",
    delay: 0.88,
    sizes: "(max-width: 640px) 22vw, (max-width: 1023px) 12vw, 7vw",
  },
];

/** Where the campaign signal sits, in viewBox units and in percentages. */
const CENTRE = { x: 47, y: 41 };

/**
 * One arc per creator, drawn from the centre out to that creator's frame. Hand
 * placed against the field above so no arc crosses a photograph — every one of
 * them runs through the gaps.
 */
const ARCS: readonly string[] = [
  `M${CENTRE.x} ${CENTRE.y} C 40 32, 34 26, 26 24`,
  `M${CENTRE.x} ${CENTRE.y} C 56 34, 64 26, 72 20`,
  `M${CENTRE.x} ${CENTRE.y} C 56 48, 62 54, 68 60`,
  `M${CENTRE.x} ${CENTRE.y} C 38 48, 30 54, 22 60`,
  `M${CENTRE.x} ${CENTRE.y} C 44 54, 42 62, 42 68`,
];

export function CampaignConstellation() {
  const reduced = usePrefersReducedMotion();
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

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inf-constellation"
    >
      {/* The network, behind the people. */}
      <svg
        aria-hidden
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        className="inf-net"
      >
        {ARCS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            className="inf-arc"
            stroke="var(--color-line-strong)"
            strokeWidth="0.28"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.5 + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* One teal segment travelling the network — the campaign moving
            through it. The only continuous motion in the composition. */}
        <motion.path
          d={ARCS[1]}
          className="inf-arc inf-arc--signal"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          strokeDasharray="7 60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        />

        {/* The campaign node. */}
        <motion.circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r="4.6"
          className="inf-centre-ring"
          stroke="var(--color-accent)"
          strokeWidth="0.3"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
        />
        <motion.circle
          cx={CENTRE.x}
          cy={CENTRE.y}
          r="1.5"
          fill="var(--color-accent)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}
        />
      </svg>

      {/* The centre's label, as HTML so the type stays crisp and themeable. */}
      <motion.span
        aria-hidden
        className="caps inf-centre-label"
        style={{ left: `${CENTRE.x}%`, top: `${(CENTRE.y / VB_H) * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.95 }}
      >
        {INFLUENCER_HERO.centreLabel}
      </motion.span>

      {FIELD.map((place) => (
        <CreatorNode key={place.creatorId} place={place} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

/**
 * One creator in the field. The outer wrapper carries the entry and the pointer
 * parallax; an inner wrapper carries the idle drift, so a CSS animation never
 * fights a Motion transform on the same element (§10).
 */
function CreatorNode({
  place,
  sx,
  sy,
}: {
  place: Placement;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const creator = ROSTER.find((c) => c.id === place.creatorId);
  const x = useTransform(sx, (v) => v * 13 * place.depth);
  const y = useTransform(sy, (v) => v * 9 * place.depth);

  if (!creator) return null;

  // The anchor brings its own crop; everyone else uses the roster's, which is
  // what keeps this page's other two compositions byte-identical.
  const rosterFrame = resolveFrame(creator, place.kind);
  const frame = place.anchor
    ? {
        src: INFLUENCER_ANCHOR.src,
        position: INFLUENCER_ANCHOR.position,
        zoom: 1,
        origin: INFLUENCER_ANCHOR.position,
      }
    : rosterFrame;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${place.left}%`,
        top: `${place.top}%`,
        width: `${place.width}%`,
        zIndex: place.z,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, delay: place.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`svc-drift svc-drift--${place.drift}`}>
        <div
          className="svp-frame crt-zoom"
          style={
            {
              aspectRatio: place.aspect,
              "--crt-zoom": frame.zoom,
              "--crt-origin": frame.origin,
            } as React.CSSProperties
          }
        >
          <Image
            src={frame.src}
            alt={place.anchor ? INFLUENCER_ANCHOR.alt : creator.alt}
            fill
            sizes={place.sizes}
            /**
             * **Exactly one eager image in this composition.** Five above-the-fold
             * portraits competing for bandwidth is the §10i bug with a different
             * cast; the anchor is the LCP candidate and the rest load normally.
             */
            loading={place.eager ? "eager" : undefined}
            fetchPriority={place.eager ? "high" : undefined}
            style={{ objectPosition: frame.position }}
            className="svp-photo object-cover"
          />
          <span aria-hidden className="svp-veil" />
          {/* Real name — plus, on the anchor only, the one relationship word
              the project can evidence, as an eyebrow above it. Above rather
              than below so all five tags keep the same last-line baseline and
              the marker grows into the frame instead of off the bottom of it.
              Never a follower count. */}
          <span
            aria-hidden
            className={place.anchor ? "svp-tag inf-node-tag" : "svp-tag"}
          >
            {place.anchor && (
              <span className="inf-node-relation">
                {INFLUENCER_ANCHOR.relationship}
              </span>
            )}
            {creator.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
