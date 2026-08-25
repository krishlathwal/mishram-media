"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";

import type { StageMotion } from "../ServiceStage";
import {
  Annotation,
  Surface,
  type AnnotationSpec,
  type SurfaceSpec,
} from "./parts";

/**
 * SERVICE 04 — Web & Digital Experiences
 *
 * Service 03 ended on a small conversion surface. Here that same object grows
 * into a complete digital experience: a desktop interface at the centre, a
 * genuinely adapted mobile view overlapping it, and two small system fragments
 * saying Mishram designs systems rather than isolated screens.
 *
 * The desktop surface enters at the landing surface's exact size and position
 * (`enterScale` + `travelX`/`travelY`), so it reads as one object gaining
 * capability rather than a new mockup appearing.
 *
 * The inner interface is a design demonstration, not a case study — no client
 * name, no invented brand, no fabricated results. Its media region is the
 * continuity object for Service 05: on exit it grows to take the screen while
 * the interface chrome quietens.
 */

/**
 * The landing surface from Service 03 was 38% wide at (58, 19); this is 60%
 * wide at (14, 10). The enter offsets place it exactly on top of the old one.
 */
const DESKTOP: SurfaceSpec = {
  left: 14, top: 10, width: 60, aspect: "16 / 10",
  enter: [0, 0.34], depth: 1, tilt: -0.4, drift: "a", z: 30,
  travelX: 255, travelY: 22, enterScale: 0.63,
  exit: "advance",
};

const MOBILE: SurfaceSpec = {
  left: 66, top: 40, width: 13, aspect: "9 / 19",
  enter: [0.3, 0.62], depth: 0.8, tilt: 1.8, drift: "c", z: 40,
  travelX: 40, travelY: 60,
};

const SYSTEM: SurfaceSpec = {
  left: 80, top: 12, width: 18, aspect: "1 / 1",
  enter: [0.4, 0.7], depth: 0.5, tilt: 2.2, drift: "b", z: 15,
};

const PIPELINE: SurfaceSpec = {
  left: 1, top: 63, width: 21, aspect: "16 / 9",
  enter: [0.48, 0.78], depth: 0.4, tilt: -2.4, drift: "d", z: 15,
};

const LABELS: readonly AnnotationSpec[] = [
  { text: "Responsive", left: 66, top: 78, at: 0.5 },
  { text: "Conversion Experience", left: 14, top: 60, at: 0.6 },
  { text: "System", left: 80, top: 39, at: 0.68, level: "back" },
  // Sits under the Design → Build → Ship fragment. Was "Interaction", which
  // described the wrong object; "Custom Build" names what that fragment
  // actually shows and carries the software/CRM half of the service into the
  // scene without turning it into a dashboard.
  { text: "Custom Build", left: 1, top: 84, at: 0.74, level: "back" },
];

/**
 * The desktop experience. Deliberately no browser chrome — a site, not a
 * screenshot of one. The media region is absolutely placed so it can be scaled
 * up independently on exit.
 */
function DesktopExperience({ progress }: { progress: MotionValue<number> }) {
  // Interface quietens on exit; the imagery takes over.
  const chrome = useTransform(progress, [0.82, 0.98], [1, 0.1]);
  // The inner page settles a few pixels, as if it had been scrolled into place.
  const innerY = useTransform(progress, [0.16, 0.46], [10, 0]);
  // The primary action resolves last.
  const ctaScale = useTransform(progress, [0.5, 0.66], [0.92, 1]);
  const ctaOpacity = useTransform(progress, [0.5, 0.66, 0.82, 0.98], [0.35, 1, 1, 0.1]);
  // Continuity object for Service 05.
  const mediaScale = useTransform(progress, [0.82, 1], [1, 1.62]);
  const mediaRadius = useTransform(progress, [0.82, 1], [2, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Fine interior grid — the same discipline as the page around it. */}
      <motion.div
        aria-hidden
        style={{ opacity: chrome }}
        className="absolute inset-0 flex justify-between px-[6%]"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="block h-full w-px bg-ink/[0.028]" />
        ))}
      </motion.div>

      {/* Masthead */}
      <motion.div
        style={{ opacity: chrome }}
        className="absolute inset-x-0 top-0 flex items-center justify-between px-[6%] py-[4%]"
      >
        <span className="block h-[5px] w-[13%] rounded-[1px] bg-ink/45" />
        <span className="flex items-center gap-[10px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-[3px] w-[16px] bg-ink/18" />
          ))}
          <span className="ml-[6px] block h-[11px] w-[34px] rounded-[2px] border border-line" />
        </span>
      </motion.div>

      <motion.span
        aria-hidden
        style={{ opacity: chrome }}
        className="absolute inset-x-[6%] top-[15%] block h-px bg-line"
      />

      {/* Editorial column */}
      <motion.div
        style={{ y: innerY, opacity: chrome }}
        className="absolute top-[24%] bottom-[26%] left-[6%] flex w-[40%] flex-col justify-center gap-[7%]"
      >
        <span className="block h-[9px] w-full rounded-[1px] bg-ink/40" />
        <span className="block h-[9px] w-[78%] rounded-[1px] bg-ink/30" />
        <span className="mt-[4%] block h-[3px] w-[88%] bg-ink/14" />
        <span className="block h-[3px] w-[64%] bg-ink/14" />
        <motion.span
          style={{ scale: ctaScale, opacity: ctaOpacity }}
          className="mt-[8%] block h-[17px] w-[52%] origin-left rounded-[2px] bg-accent/80"
        />
      </motion.div>

      {/* Media region — the Service 05 continuity object. */}
      <motion.div
        style={{ scale: mediaScale, borderRadius: mediaRadius }}
        className="svc-crop absolute top-[22%] right-[6%] bottom-[24%] z-10 w-[40%] origin-center overflow-hidden"
      >
        <Image
          src="/media/creators/zoya-jaan.webp"
          alt="Editorial photography inside a Mishram Media digital experience"
          fill
          sizes="(max-width: 1023px) 30vw, 18vw"
          className="object-cover"
        />
      </motion.div>

      {/* Supporting row */}
      <motion.div
        style={{ opacity: chrome }}
        className="absolute inset-x-[6%] bottom-[7%]"
      >
        <span className="mb-[10px] block h-px w-full bg-line" />
        <div className="flex gap-[3%]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-[15px] flex-1 rounded-[2px] border border-line"
              style={{ opacity: 1 - i * 0.22 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/** The same design family, re-laid out for a narrow viewport — not shrunk. */
function MobileExperience({ progress }: { progress: MotionValue<number> }) {
  const chrome = useTransform(progress, [0.82, 0.98], [1, 0.12]);

  return (
    <motion.div
      style={{ opacity: chrome }}
      className="flex h-full w-full flex-col gap-[5%] p-[9%]"
    >
      <div className="flex items-center justify-between">
        <span className="block h-[3px] w-[38%] rounded-[1px] bg-ink/45" />
        <span className="flex flex-col gap-[2px]">
          {[0, 1].map((i) => (
            <span key={i} className="block h-[2px] w-[9px] bg-ink/25" />
          ))}
        </span>
      </div>

      <span className="block h-px w-full bg-line" />

      {/* Stacked hierarchy: headline first, then media, then the action. */}
      <span className="block h-[6px] w-full rounded-[1px] bg-ink/38" />
      <span className="block h-[6px] w-[70%] rounded-[1px] bg-ink/26" />

      <span className="svc-crop relative mt-[3%] block w-full flex-1 overflow-hidden rounded-[2px]">
        <Image
          src="/media/creators/zoya-jaan.webp"
          alt=""
          fill
          sizes="12vw"
          className="object-cover"
        />
      </span>

      <span className="mt-[2%] block h-[11px] w-full rounded-[2px] bg-accent/80" />
      <span className="block h-[2px] w-[60%] bg-ink/14" />
    </motion.div>
  );
}

/** Grid and type scale — evidence of a system behind the screens. */
function SystemFragment() {
  return (
    <div className="flex h-full w-full flex-col gap-[8%] p-[9%]">
      <span className="caps text-[0.45rem] text-ink/45">Grid</span>
      <div className="flex flex-1 gap-[5%]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block h-full flex-1 bg-ink/[0.07]" />
        ))}
      </div>
      <span className="block h-px w-full bg-line" />
      <span className="caps text-[0.45rem] text-ink/45">Type</span>
      <div className="flex flex-col gap-[6px]">
        {[1, 0.66, 0.42].map((w, i) => (
          <span
            key={i}
            className="block rounded-[1px] bg-ink/22"
            style={{ width: `${w * 100}%`, height: `${7 - i * 2}px` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Design → Build → Ship. Three rows, not a wall of fake code. */
function PipelineFragment() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[9%] px-[9%]">
      {["Design", "Build", "Ship"].map((step, i) => (
        <span key={step} className="flex items-center gap-[7%]">
          <span
            className={`block h-[4px] w-[4px] rounded-full ${i === 1 ? "bg-accent" : "bg-ink/25"}`}
          />
          <span className="caps text-[0.45rem] text-ink/45">{step}</span>
          <span className="block h-px flex-1 bg-line" />
        </span>
      ))}
    </div>
  );
}

export function WebDigitalScene({ m }: { m: StageMotion }) {
  return (
    <div className="svc-stage-inner">
      <Surface m={m} spec={SYSTEM} className="svc-surface--plan">
        <SystemFragment />
      </Surface>

      <Surface m={m} spec={PIPELINE} className="svc-surface--plan">
        <PipelineFragment />
      </Surface>

      <Surface m={m} spec={DESKTOP} className="svc-surface--plan">
        <DesktopExperience progress={m.progress} />
      </Surface>

      <Surface m={m} spec={MOBILE} className="svc-surface--plan">
        <MobileExperience progress={m.progress} />
      </Surface>

      {LABELS.map((l) => (
        <Annotation key={l.text} m={m} {...l} />
      ))}
    </div>
  );
}
