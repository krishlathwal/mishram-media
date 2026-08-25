"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { useDesktopSequence } from "@/hooks/useMediaQuery";

import type { StageMotion } from "../ServiceStage";
import {
  Annotation,
  Photo,
  Surface,
  type AnnotationSpec,
  type SurfaceSpec,
} from "./parts";

/**
 * SERVICE 05 — Brand Shoots & Content
 *
 * The last service, and the one that has to be shown rather than explained. It
 * is a composed photographic system — a contact sheet laid across the page —
 * not a gallery, a masonry grid or a camera interface.
 *
 * CONTINUITY. Service 04 ends with the media region inside its desktop
 * interface scaling up and losing its framing while the chrome quietens. That
 * photograph is this scene's primary frame: `enterScale`, `travelX/travelY` and
 * `aspectFrom` place it on top of the Service 04 object at the exact size,
 * position and crop it had, so the two slots overlap on the same image and the
 * handoff reads as one photograph escaping the interface rather than a scene
 * swap. Everything else in this scene arrives around it afterwards.
 *
 * EXIT. There is no Service 06. The supporting frames recede while the primary
 * holds forward (`exit: "advance"`), so the sequence resolves on one strong
 * visual moment and hands off to the section's closing statement.
 *
 * The photography is Mishram's own creator work. Nothing here claims a client
 * campaign — the annotations describe format and craft, never a brand, a
 * campaign name, a camera or a date.
 */

type Specs = {
  primary: SurfaceSpec;
  reel: SurfaceSpec;
  still: SurfaceSpec;
  detail: SurfaceSpec | null;
};

/**
 * Desktop. The primary frame's entry values were measured off Service 04's
 * media region at the end of its exit: 44.3% of the stage wide, 42.7% tall,
 * centred at (60.0%, 29.7%), cropped at 1.183. It settles at a centre of
 * (59%, 33%) — deliberately almost the same place — so during the crossfade
 * the two slots hold the same photograph within a few pixels and the crop
 * opening downward is the only movement. The rest of the sheet then arrives
 * around it, from the left.
 */
const DESKTOP: Specs = {
  primary: {
    left: 38, top: 3, width: 42, aspect: "4 / 5",
    enter: [0.13, 0.27], depth: 0.3, tilt: -0.5, drift: "a", z: 30,
    travelX: 11, travelY: 19, enterScale: 1.1, aspectFrom: 1.183,
    exit: "advance",
  },
  reel: {
    left: 22, top: 28, width: 18, aspect: "9 / 16",
    enter: [0.3, 0.56], depth: 0.62, tilt: 1.6, drift: "c", z: 40,
    travelX: 42, travelY: 30,
  },
  still: {
    left: 1, top: 6, width: 22, aspect: "4 / 5",
    enter: [0.38, 0.64], depth: 0.78, tilt: -1.8, drift: "b", z: 20,
    travelX: -46, travelY: 22,
  },
  detail: {
    left: 31, top: 62, width: 27, aspect: "16 / 9",
    enter: [0.46, 0.72], depth: 0.5, tilt: 1.2, drift: "d", z: 45,
    travelX: -20, travelY: 26,
  },
};

/**
 * Stacked. Each service is its own chapter here, so there is no object to
 * continue: one dominant photograph, one vertical crop and one landscape
 * detail, echoing the desktop arrangement at a simpler scale.
 *
 * The stacked stage box is much wider relative to its height on a tablet
 * (~1.94) than on a phone (~1.15), and surface heights derive from a width
 * percentage, so these are sized to fill the box at 390px while staying
 * inside the spill the existing Service 01 and 02 scenes already have at
 * 1023px. Proper tablet art direction is a later pass for all five scenes.
 */
const STACKED: Specs = {
  primary: {
    left: 32, top: 3, width: 47, aspect: "4 / 5",
    enter: [0, 0.32], depth: 1, tilt: -0.8, drift: "a", z: 30,
  },
  reel: {
    left: 12, top: 18, width: 26, aspect: "9 / 16",
    enter: [0.14, 0.46], depth: 0.7, tilt: 1.6, drift: "c", z: 40,
    travelX: -22, travelY: 18,
  },
  still: {
    left: 20, top: 62, width: 35, aspect: "16 / 9",
    enter: [0.26, 0.6], depth: 0.5, tilt: 1.2, drift: "d", z: 45,
    travelY: 18,
  },
  detail: null,
};

/**
 * Surface heights derive from a width percentage, so the composition grows
 * taller as the stage box gets shorter (a 768px-tall viewport makes it a good
 * deal deeper than a 900px one). These sit in the margins that survive that
 * whole range, rather than beside a specific frame edge.
 */
const LABELS: readonly AnnotationSpec[] = [
  { text: "Visual Direction", left: 1, top: 1, at: 0.4 },
  { text: "Reels", left: 1, top: 62, at: 0.5, level: "back" },
  { text: "Campaign Content", left: 1, top: 76, at: 0.58 },
  { text: "Creative Production", left: 60, top: 84, at: 0.66, level: "back" },
];

/**
 * Production metadata, kept to format and craft. `FRAME` indices are the
 * contact sheet's own numbering — they do not stand in for a shoot that did
 * not happen.
 */
const SHEET = ["Frame 01", "Frame 02", "Frame 03", "Frame 04", "Frame 05"];

/** Small in-frame tag: format at rest, `View` on hover. */
function FrameTag({ children }: { children: string }) {
  return (
    <span aria-hidden className="svc-frame-tag">
      <span className="svc-frame-tag__rest">{children}</span>
      <span className="svc-frame-tag__hover">View</span>
    </span>
  );
}

/**
 * Selection ticks on the chosen frame — the contact-sheet gesture for "this
 * one". Four corner marks, no rectangle, no crosshair.
 */
function SelectionTicks({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.44, 0.6, 0.82, 1], [0, 0.4, 0.4, 0.15]);

  return (
    <motion.span aria-hidden style={{ opacity }} className="absolute inset-0 z-10">
      {(
        [
          ["top-[5%] left-[4%]", "origin-left"],
          ["top-[5%] right-[4%]", "origin-right"],
          ["bottom-[5%] left-[4%]", "origin-left"],
          ["bottom-[5%] right-[4%]", "origin-right"],
        ] as const
      ).map(([pos], i) => (
        <span key={i} className={`absolute block h-px w-[6%] bg-ink ${pos}`} />
      ))}
    </motion.span>
  );
}

/**
 * The sheet baseline: one hairline, five indices and a slow playhead. This is
 * the only continuously moving element once the composition settles.
 */
function SheetBaseline({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.5, 0.7, 0.84, 1], [0, 1, 1, 0.15]);
  const scaleX = useTransform(progress, [0.5, 0.78], [0, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="svc-sheet-rail absolute inset-x-[2%] top-[89%] z-[5]"
    >
      <span className="relative block h-px w-full bg-line">
        <motion.span
          style={{ scaleX }}
          className="absolute inset-0 block origin-left bg-line-strong"
        />
        <span className="svc-playhead absolute top-1/2 left-0 block h-[7px] w-px -translate-y-1/2 bg-accent" />
      </span>

      <span className="mt-2 flex justify-between">
        {SHEET.map((f, i) => (
          <span key={f} className="flex items-center gap-1.5">
            <span
              className={`block h-[3px] w-px ${i === 0 ? "bg-accent" : "bg-line-strong"}`}
            />
            <span className="caps text-[0.5rem] text-ink/35">{f}</span>
          </span>
        ))}
      </span>
    </motion.div>
  );
}

export function BrandShootsScene({ m }: { m: StageMotion }) {
  const s = useDesktopSequence() ? DESKTOP : STACKED;

  return (
    <div className="svc-stage-inner svc-sheet">
      {/* Supporting still — furthest back, behind the primary's left edge. */}
      <Surface m={m} spec={s.still} className="svc-frame">
        <Photo
          src={
            s.detail
              ? "/media/creators/vishnu-priya.webp"
              : "/media/creators/lovkesh-kataria.webp"
          }
          alt={
            s.detail
              ? "Editorial still of creator Vishnu Priya from Mishram Media's content work"
              : "Landscape frame of creator Lovkesh Kataria from Mishram Media's content work"
          }
          sizes="(max-width: 1023px) 32vw, 18vw"
        />
        <FrameTag>{s.detail ? "Portrait / 4:5" : "Detail / 16:9"}</FrameTag>
      </Surface>

      {/* Primary frame — the photograph carried over from Service 04. */}
      <Surface m={m} spec={s.primary} className="svc-frame svc-crop">
        <Photo
          src="/media/creators/zoya-jaan.webp"
          alt="Campaign frame of creator Zoya Jaan, produced by Mishram Media"
          sizes="(max-width: 1023px) 46vw, 28vw"
        />
        <SelectionTicks progress={m.progress} />
        <FrameTag>Still / 4:5</FrameTag>
      </Surface>

      {/* Vertical content frame — the reel format, at the sheet's own scale. */}
      <Surface m={m} spec={s.reel} className="svc-frame">
        <Photo
          src="/media/creators/mukul-sharma.webp"
          alt="Vertical content frame of creator Mukul Sharma, produced by Mishram Media"
          sizes="(max-width: 1023px) 24vw, 15vw"
        />
        <FrameTag>Reel / 9:16</FrameTag>
      </Surface>

      {/* Landscape detail — desktop only; the stacked sheet stays to three. */}
      {s.detail ? (
        <Surface m={m} spec={s.detail} className="svc-frame">
          <Photo
            src="/media/creators/lovkesh-kataria.webp"
            alt="Landscape frame of creator Lovkesh Kataria from Mishram Media's content work"
            sizes="20vw"
          />
          <FrameTag>Detail / 16:9</FrameTag>
        </Surface>
      ) : null}

      <SheetBaseline progress={m.progress} />

      {LABELS.map((l) => (
        <Annotation key={l.text} m={m} {...l} />
      ))}
    </div>
  );
}
