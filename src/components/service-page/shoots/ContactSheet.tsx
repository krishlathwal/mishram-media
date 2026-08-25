"use client";

import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { SHOOTS_HERO } from "@/config/service-shoots";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { ShootFrame, type FrameSize } from "./ShootFrame";

/**
 * THE LIVE CONTACT SHEET — the hero composition for Brand Shoots & Content.
 *
 * A working creative board rather than a finished gallery: six frames at
 * different crops, aspects and depths, each carrying its index and its format,
 * with corner crop marks on the board itself, a selection bracket on the frame
 * that has been chosen, and a sheet rail beneath carrying the whole set.
 *
 * **DELIBERATELY NOT THE HOMEPAGE'S SERVICE 05 SCENE.** That is four frames and
 * a playhead, sized to survive a pinned scroll and to continue Service 04's
 * photograph — a transition, seen for a few seconds. This is a static board
 * with more of everything: two extra frames, in-frame indices and formats, crop
 * marks, a selection bracket and a rail with a marker per frame. Nothing is
 * copied across; the geometry is authored for this box.
 *
 * **And not the other three heroes.** Service 01's Brand Signal is one identity
 * circled by a loop, Service 02's Constellation is five people converging on a
 * node, Service 03's Experiment Field is a route that travels and returns.
 * **This one does not diagram anything** — it is photography arranged, which is
 * the whole difference the page is meant to carry.
 *
 * WHAT IT DOES NOT SAY. No client, no campaign, no brand, no photographer, no
 * camera, no lens, no location, no date, no budget. The indices are the sheet's
 * own numbering and the tags are formats — both factual. The attribution line
 * under the composition says so on the page.
 *
 * **No WebGL, no canvas, no video** (§12). Percentages of a fixed-aspect box,
 * so a collision checked at one viewport is checked at all of them.
 *
 * **The narrow composition is a different arrangement, not a smaller one.** At
 * phone width it becomes one dominant frame and two supporting crops, because
 * six frames at 350px is six thumbnails — which is exactly what a contact sheet
 * on a phone must not be.
 */

const WIDE_QUERY = "(min-width: 640px)";

type Place = {
  id: string;
  creatorId: string;
  kind: "portrait" | "reel" | "content";
  aspect: string;
  ar: number;
  left: number;
  top: number;
  width: number;
  z: number;
  size: FrameSize;
  tag: string;
  /** Pointer-parallax depth. Bigger = nearer = moves more. */
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
  /** The frame the selection bracket sits on. */
  selected?: boolean;
  /** Carries this photograph's alt; repeats of the same source are decorative. */
  described?: boolean;
  /** The route's one eager image. */
  eager?: boolean;
};

type Layout = {
  aspect: string;
  /** Height of the box in the same units the placements are percentages of. */
  vbH: number;
  frames: readonly Place[];
  /** Where the sheet rail sits, as a percentage of box height. */
  railTop: number;
};

/* ── Wide: the full board ───────────────────────────────────────── */

const WIDE: Layout = {
  aspect: "100 / 104",
  vbH: 104,
  railTop: 96,
  frames: [
    {
      id: "f01",
      creatorId: "zoya",
      kind: "portrait",
      aspect: "4 / 5",
      ar: 0.8,
      left: 30,
      top: 6,
      width: 44,
      z: 30,
      size: "lg",
      tag: "01 / 4:5",
      depth: 1,
      drift: "a",
      delay: 0.34,
      selected: true,
      described: true,
      eager: true,
    },
    {
      id: "f02",
      creatorId: "mukul",
      kind: "reel",
      aspect: "9 / 16",
      ar: 0.5625,
      left: 8,
      top: 20,
      width: 24,
      z: 40,
      size: "md",
      tag: "02 / 9:16",
      depth: 1.5,
      drift: "c",
      delay: 0.46,
      described: true,
    },
    {
      id: "f03",
      creatorId: "nikita",
      kind: "portrait",
      aspect: "4 / 5",
      ar: 0.8,
      left: 1,
      top: 60,
      width: 27,
      z: 20,
      size: "md",
      tag: "03 / 4:5",
      depth: 1.8,
      drift: "b",
      delay: 0.58,
      described: true,
    },
    {
      id: "f04",
      creatorId: "vishnu",
      kind: "portrait",
      aspect: "16 / 9",
      ar: 1.7778,
      left: 33,
      top: 64,
      width: 34,
      z: 45,
      size: "md",
      tag: "04 / 16:9",
      depth: 1.3,
      drift: "d",
      delay: 0.7,
    },
    {
      id: "f05",
      creatorId: "lovkesh",
      kind: "content",
      aspect: "1 / 1",
      ar: 1,
      left: 70,
      top: 62,
      width: 24,
      z: 35,
      size: "sm",
      tag: "05 / 1:1",
      depth: 1.6,
      drift: "c",
      delay: 0.82,
      described: true,
    },
    {
      id: "f06",
      creatorId: "nikita",
      kind: "reel",
      aspect: "9 / 16",
      ar: 0.5625,
      left: 70,
      top: 8,
      width: 20,
      z: 25,
      size: "sm",
      tag: "06 / 9:16",
      depth: 2,
      drift: "b",
      delay: 0.94,
      described: true,
    },
  ],
};

/* ── Narrow: one dominant frame, two supporting crops ───────────── */

const STACKED: Layout = {
  aspect: "100 / 108",
  vbH: 108,
  railTop: 92,
  frames: [
    {
      id: "f01",
      creatorId: "zoya",
      kind: "portrait",
      aspect: "4 / 5",
      ar: 0.8,
      left: 2,
      top: 6,
      width: 66,
      z: 30,
      size: "lg",
      tag: "01 / 4:5",
      depth: 1,
      drift: "a",
      delay: 0.34,
      selected: true,
      described: true,
      eager: true,
    },
    {
      id: "f02",
      creatorId: "mukul",
      kind: "reel",
      aspect: "9 / 16",
      ar: 0.5625,
      left: 70,
      top: 10,
      width: 28,
      z: 40,
      size: "md",
      tag: "02 / 9:16",
      depth: 1.5,
      drift: "c",
      delay: 0.46,
      described: true,
    },
    {
      id: "f03",
      creatorId: "lovkesh",
      kind: "content",
      aspect: "1 / 1",
      ar: 1,
      left: 70,
      top: 60,
      width: 28,
      z: 35,
      size: "sm",
      tag: "03 / 1:1",
      depth: 1.8,
      drift: "b",
      delay: 0.58,
      described: true,
    },
  ],
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactSheet() {
  const reduced = usePrefersReducedMotion();
  /**
   * `true` on the server so the board is what ships in the HTML; a phone
   * corrects it on its first client render, inside the 300ms the shared hero
   * holds the whole composition at `opacity: 0`.
   */
  const wide = useMediaQuery(WIDE_QUERY, true);
  const layout = wide ? WIDE : STACKED;

  const box = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 82, damping: 24, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 82, damping: 24, mass: 0.7 });

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
      data-layout={wide ? "board" : "stacked"}
      className="sht-board"
      style={{ aspectRatio: layout.aspect }}
    >
      {/* Crop marks on the board itself — the editorial mark for "this is a
          working surface", and the page's one recurring piece of chrome. */}
      {(["tl", "tr", "bl", "br"] as const).map((corner, i) => (
        <motion.span
          key={corner}
          aria-hidden
          className={`sht-crop sht-crop--${corner}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.05 }}
        />
      ))}

      <motion.span
        aria-hidden
        className="caps sht-board-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {SHOOTS_HERO.sheetLabel}
      </motion.span>

      {layout.frames.map((place) => (
        <FrameNode key={place.id} place={place} sx={sx} sy={sy} />
      ))}

      {/* The sheet rail: one hairline, a marker per frame, and the first one
          picked out. The set, counted — not a progress bar. */}
      <motion.div
        aria-hidden
        className="sht-rail"
        style={{ top: `${layout.railTop}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.05 }}
      >
        <motion.span
          className="sht-rail-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.05, ease: EASE }}
        />
        <span className="sht-rail-ticks">
          {layout.frames.map((f, i) => (
            <span key={f.id} className="sht-rail-tick">
              <span
                className={`sht-rail-mark${i === 0 ? " sht-rail-mark--on" : ""}`}
              />
              <span className="caps sht-rail-index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          ))}
        </span>
      </motion.div>
    </div>
  );
}

/**
 * One frame on the board. Three layers, and they must stay three: the parallax
 * MotionValues own the outer transform, the entry animation owns the middle
 * one, and the CSS idle drift owns the inner one. An animated `y` on the same
 * element as a `y` MotionValue makes the two fight (§10, §10m).
 */
function FrameNode({
  place,
  sx,
  sy,
}: {
  place: Place;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * 11 * place.depth);
  const y = useTransform(sy, (v) => v * 7 * place.depth);

  return (
    <motion.div
      className="sht-place"
      style={{
        left: `${place.left}%`,
        top: `${place.top}%`,
        width: `${place.width}%`,
        zIndex: place.z,
        x,
        y,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.95, delay: place.delay, ease: EASE }}
      >
        <div className={`svc-drift svc-drift--${place.drift}`}>
          <span className="sht-place-inner">
            <ShootFrame
              creatorId={place.creatorId}
              kind={place.kind}
              aspect={place.aspect}
              size={place.size}
              tag={place.tag}
              described={place.described}
              eager={place.eager}
            />
            {/* The selection bracket — four corner ticks, the contact-sheet
                gesture for "this one". No rectangle, no crosshair. */}
            {place.selected ? (
              <span aria-hidden className="sht-select">
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span key={c} className={`sht-select-tick sht-select-tick--${c}`} />
                ))}
              </span>
            ) : null}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
