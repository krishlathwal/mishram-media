"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";

import {
  CREATORS_COPY,
  ROSTER,
  resolveFrame,
  type Creator,
  type FrameKind,
} from "@/config/creators";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The photographic half of the roster.
 *
 * **Mounted on demand, not all at once.** The original built for five creators
 * and mounted every one of their frames permanently, which is what made
 * switching instant. That does not survive a roster of twenty — sixty image
 * nodes in a section most visitors scroll straight past. So the stage now
 * renders only the creators a transition needs:
 *
 * | | |
 * | --- | --- |
 * | `shownId` | what is on screen |
 * | `outgoingId` | the one wiping away, for one transition only |
 * | `activeId` | the incoming one, loading behind the clip |
 * | `warmId` | the one under the cursor right now, fetching early |
 *
 * plus the creator the section opened on, which is kept mounted for the reason
 * in `mounted` below. That is **at most five, and normally one or two** —
 * bounded by construction, not by the length of the roster. The instant feel
 * comes from `useCreatorTransition` gating the swap on the incoming photograph
 * rather than from keeping everything mounted.
 *
 * Only one creator is ever *visible* — the rest are clipped to nothing and
 * marked `aria-hidden`, so the accessibility tree only ever contains the shown
 * creator.
 *
 * There is deliberately no perspective, no composition box and no scroll
 * machinery here. §02 owns that; this section is meant to feel lighter.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type FrameSpec = {
  /** Percentages of the stage box. Height drives sizing; width follows aspect. */
  height: number;
  aspect: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  z: number;
};

/**
 * Desktop geometry. A cascade rather than a row: the content frame sits small
 * and furthest back at the left, the reel bridges up through the middle, and
 * the portrait dominates the right at the full height of the box. Each frame
 * overlaps the next, so the composition reads front-to-back and the eye is
 * carried into the portrait rather than across three separate pictures.
 *
 * 3:4 is the most forgiving common portrait crop across the 9:16, 4:5 and 1:1
 * sources in the roster: every creator keeps their subject without needing a
 * per-creator frame shape that would make the composition jump on switch.
 */
const FRAMES: Record<FrameKind, FrameSpec> = {
  portrait: { top: 0, right: 0, height: 100, aspect: "3 / 4", z: 30 },
  reel: { bottom: 4, left: 30, height: 54, aspect: "9 / 16", z: 40 },
  content: { top: 8, left: 8, height: 44, aspect: "4 / 5", z: 20 },
};

/**
 * Mobile. The portrait takes the whole box and one format frame tucks into its
 * lower corner for depth — five tiny frames would defeat the point of a section
 * whose power comes from showing people at scale.
 */
const COMPACT: Partial<Record<FrameKind, FrameSpec>> = {
  portrait: { top: 0, left: 0, height: 100, aspect: "3 / 4", z: 30 },
  reel: { bottom: 5, right: 4, height: 30, aspect: "9 / 16", z: 40 },
};

/**
 * Masked depth transition. The outgoing frame wipes upward and settles back;
 * the incoming one resolves down out of the same edge — so one creator becomes
 * the next rather than two photographs cross-fading.
 *
 * `out` is also the state a frame **mounts** in, which is what lets a creator
 * load behind the clip without ever being seen half-drawn.
 */
function variants(reduced: boolean) {
  if (reduced) {
    return {
      out: { opacity: 0, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
      in: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
    };
  }
  return {
    out: { opacity: 0.5, clipPath: "inset(0% 0% 100% 0%)", scale: 1.05, y: -14 },
    in: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
  };
}

function Frame({
  creator,
  kind,
  spec,
  shown,
  order,
  reduced,
  tag,
  animateOnMount,
  onLoaded,
}: {
  creator: Creator;
  kind: FrameKind;
  spec: FrameSpec;
  shown: boolean;
  /** Supporting frames land just after the portrait, not with it. */
  order: number;
  reduced: boolean;
  tag?: string;
  animateOnMount: boolean;
  onLoaded: (id: string) => void;
}) {
  const isPortrait = kind === "portrait";
  const crop = resolveFrame(creator, kind);

  // Per-creator vertical nudge, only for the supporting frames and only a
  // couple of percent — enough to let a composition breathe, never enough to
  // move the frame somewhere else.
  const nudge =
    kind === "reel"
      ? (creator.nudge?.reelY ?? 0)
      : kind === "content"
        ? (creator.nudge?.contentY ?? 0)
        : 0;

  const offset = (v: number | undefined, sign: 1 | -1) =>
    v === undefined ? undefined : `${v + sign * nudge}%`;

  return (
    <motion.div
      aria-hidden={!shown}
      className="absolute"
      style={{
        height: `${spec.height}%`,
        aspectRatio: spec.aspect,
        zIndex: shown ? spec.z : 1,
        top: offset(spec.top, 1),
        bottom: offset(spec.bottom, -1),
        left: spec.left === undefined ? undefined : `${spec.left}%`,
        right: spec.right === undefined ? undefined : `${spec.right}%`,
        pointerEvents: shown ? "auto" : "none",
      }}
      // The first paint must not animate the initial creator in — the section
      // already has its own entrance. Everything mounted later starts clipped.
      initial={animateOnMount ? "out" : false}
      animate={shown ? "in" : "out"}
      variants={variants(reduced)}
      /* ~460ms, with the supporting frames trailing the portrait by a beat so
         the whole cascade resolves inside ~550ms. Long enough to read as a
         wipe, short enough that sweeping the roster never feels laggy. */
      transition={{
        duration: reduced ? 0.2 : 0.46,
        ease: EASE,
        delay: reduced ? 0 : order * 0.045,
      }}
    >
      {/* Inner wrapper carries the idle drift, so CSS animation never fights
          the Motion transform on the element above it. */}
      <div
        className={
          isPortrait
            ? "h-full w-full"
            : `crt-drift crt-drift--${kind === "reel" ? "a" : "b"} h-full w-full`
        }
      >
        <div
          className={`crt-frame h-full w-full ${isPortrait ? "crt-crop" : "crt-zoom"}`}
          // Per-creator crop, read by the `.crt-zoom` / `.crt-crop` rules. The
          // origin falls back to the object position, which is right whenever a
          // frame is not deliberately zoomed off-centre.
          style={
            {
              "--crt-zoom": crop.zoom,
              "--crt-origin": crop.origin,
            } as React.CSSProperties
          }
        >
          <Image
            src={crop.src}
            alt={isPortrait ? creator.alt : ""}
            fill
            /* One `sizes` for every frame that shares the portrait source: all
               three crop the same file, so a single variant per creator serves
               the whole stage — one request each, and enough resolution for the
               zoomed supporting frames to stay sharp. */
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 34vw, 28vw"
            style={{ objectPosition: crop.position }}
            className="crt-photo object-cover"
            // Only the portrait reports readiness — it is the frame the
            // transition is gated on, and the supporting frames share its file.
            onLoad={isPortrait ? () => onLoaded(creator.id) : undefined}
          />
          <span aria-hidden className="crt-veil" />
          {tag ? <span className="crt-tag">{tag}</span> : null}
        </div>
      </div>
    </motion.div>
  );
}

/** One depth plane: the mounted creators' frames of a given kind, stacked. */
function Plane({
  kind,
  spec,
  creators,
  shownId,
  initialId,
  order,
  reduced,
  tag,
  onLoaded,
  x,
  y,
  className,
}: {
  kind: FrameKind;
  spec: FrameSpec;
  creators: readonly Creator[];
  shownId: string;
  initialId: string;
  order: number;
  reduced: boolean;
  tag?: string;
  onLoaded: (id: string) => void;
  x: ReturnType<typeof useTransform<number, number>>;
  y: ReturnType<typeof useTransform<number, number>>;
  className?: string;
}) {
  return (
    <motion.div style={{ x, y }} className={`absolute inset-0 ${className ?? ""}`}>
      {creators.map((c) => (
        <Frame
          key={`${c.id}-${kind}`}
          creator={c}
          kind={kind}
          spec={spec}
          shown={c.id === shownId}
          order={order}
          reduced={reduced}
          tag={tag}
          // The initial creator is the only one mounted with the page, and it
          // stays mounted — so "mounted after the first paint" is simply "not
          // the initial creator", with nothing to track across renders.
          animateOnMount={c.id !== initialId}
          onLoaded={onLoaded}
        />
      ))}
    </motion.div>
  );
}

export function CreatorStage({
  shownId,
  outgoingId,
  activeId,
  warmId,
  onLoaded,
  compact = false,
}: {
  /** What is on screen. */
  shownId: string;
  /** The one wiping away, mounted for one transition only. */
  outgoingId: string | null;
  /** The selection, which becomes `shownId` once its portrait has loaded. */
  activeId: string;
  /** Under the cursor right now — fetched early so the swap has nothing to wait for. */
  warmId: string | null;
  onLoaded: (id: string) => void;
  /** Mobile: one dominant portrait plus a single format frame. */
  compact?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);

  // The creator the section opened on. It stays mounted (see `mounted`), and
  // it is *not* marked `priority`: this section sits ~9,500px down the page, so
  // preloading its portrait only competed with the Hero on first paint. Lazy is
  // correct here; `useCreatorTransition` is what keeps switching instant.
  const [initialId] = useState(shownId);

  /**
   * The mounted set, in roster order so the DOM stays predictable. Bounded by
   * construction — five ids at the very most, and duplicates collapse.
   *
   * The initial creator stays mounted for the section's life. It costs three
   * already-decoded frames and buys two things: the `priority` image is never
   * re-requested, and "did this frame mount with the page or after it" becomes
   * a property of the data (`id !== initialId`) rather than something that has
   * to be tracked across renders.
   */
  const mounted = useMemo(() => {
    const ids = new Set(
      [initialId, shownId, outgoingId, activeId, warmId].filter(
        (id): id is string => id !== null,
      ),
    );
    return ROSTER.filter((c) => ids.has(c.id));
  }, [initialId, shownId, outgoingId, activeId, warmId]);

  // Restrained pointer parallax, spring-damped, mouse only.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 140, damping: 24, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 140, damping: 24, mass: 0.6 });

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || compact || e.pointerType !== "mouse" || !box.current) return;
      const r = box.current.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width) * 2 - 1);
      rawY.set(((e.clientY - r.top) / r.height) * 2 - 1);
    },
    [reduced, compact, rawX, rawY],
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  // Foreground moves least, background most — the established depth reading.
  const nearX = useTransform(px, (v) => v * 7);
  const nearY = useTransform(py, (v) => v * 5);
  const farX = useTransform(px, (v) => v * 17);
  const farY = useTransform(py, (v) => v * 12);

  const specs = compact ? COMPACT : FRAMES;

  const shared = {
    creators: mounted,
    shownId,
    initialId,
    reduced,
    onLoaded,
  };

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-full w-full"
    >
      {specs.content ? (
        <Plane
          {...shared}
          kind="content"
          spec={specs.content}
          order={2}
          tag={CREATORS_COPY.formats.content}
          x={farX}
          y={farY}
        />
      ) : null}

      {specs.portrait ? (
        <Plane
          {...shared}
          kind="portrait"
          spec={specs.portrait}
          order={0}
          x={nearX}
          y={nearY}
          className="crt-portrait"
        />
      ) : null}

      {specs.reel ? (
        <Plane
          {...shared}
          kind="reel"
          spec={specs.reel}
          order={1}
          tag={CREATORS_COPY.formats.reel}
          x={farX}
          y={farY}
        />
      ) : null}
    </div>
  );
}
