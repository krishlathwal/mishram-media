"use client";

import { motion, useTransform } from "motion/react";

import type { StageMotion } from "../ServiceStage";
import {
  Annotation,
  Photo,
  Surface,
  type AnnotationSpec,
  type SurfaceSpec,
} from "./parts";

/**
 * SERVICE 01 — Social & Personal Brand Growth
 *
 * An editorial content ecosystem rather than a mock profile: one creator at the
 * centre, the formats their presence is built from around it, a planning
 * surface behind, and a single trace connecting the four. The point is that
 * Mishram builds the whole presence, not individual posts. No invented metrics,
 * no fake social UI.
 *
 * Everything is positioned as a percentage of the stage and driven by one
 * scroll MotionValue, so nothing re-renders React while scrolling.
 */

const PORTRAIT: SurfaceSpec = {
  left: 19, top: 9, width: 34, aspect: "9 / 16",
  enter: [0, 0.3], depth: 1, tilt: -1.4, drift: "a", z: 30,
};

const REEL: SurfaceSpec = {
  left: 62, top: 2, width: 22, aspect: "9 / 16",
  enter: [0.08, 0.4], depth: 0.72, tilt: 2.2, drift: "b", z: 20,
};

const CONTENT: SurfaceSpec = {
  left: 59, top: 57, width: 26, aspect: "4 / 5",
  enter: [0.15, 0.47], depth: 0.6, tilt: -1.8, drift: "c", z: 20,
};

const PLAN: SurfaceSpec = {
  left: 0, top: 7, width: 30, aspect: "16 / 10",
  enter: [0.2, 0.54], depth: 0.4, tilt: 2.6, drift: "d", z: 10,
};

const LABELS: readonly AnnotationSpec[] = [
  { text: "Strategy", left: 0, top: 35, at: 0.3 },
  { text: "Personal Brand", left: 19, top: 86, at: 0.38 },
  { text: "Content", left: 59, top: 50, at: 0.46 },
  { text: "Growth", left: 0, top: 63, at: 0.54 },
];

/** Planning surface — the same abstracted-interface language as the hero. */
function PlanFragment() {
  return (
    <div className="flex h-full w-full flex-col gap-[6%] p-[7%]">
      <div className="flex items-center gap-[4%]">
        <span className="block h-[3px] w-[22%] bg-ink/35" />
        <span className="block h-[2px] w-[12%] bg-ink/15" />
      </div>
      <span className="block h-px w-full bg-line" />
      <div className="flex flex-1 gap-[5%]">
        {[0.62, 0.4, 0.78].map((h, i) => (
          <div key={i} className="flex flex-1 flex-col justify-end gap-[8%]">
            <span
              className={`block w-full ${i === 1 ? "bg-accent/70" : "bg-ink/12"}`}
              style={{ height: `${h * 100}%` }}
            />
            <span className="block h-[2px] w-[70%] bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialGrowthScene({ m }: { m: StageMotion }) {
  const traceLength = useTransform(m.progress, [0.18, 0.62], [0, 1]);
  const traceOpacity = useTransform(m.progress, [0.18, 0.4, 0.82, 1], [0, 1, 1, 0.3]);

  return (
    <div className="svc-stage-inner">
      {/* Trace connecting planning → creator → formats: the growth system. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: traceOpacity, zIndex: 5 }}
      >
        <motion.path
          d="M14 24 C 30 30, 28 52, 38 58 S 62 46, 70 30 M38 58 C 52 70, 62 74, 70 78"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: traceLength }}
          opacity={0.55}
        />
      </motion.svg>

      <Surface m={m} spec={PLAN} className="svc-surface--plan">
        <PlanFragment />
      </Surface>

      <Surface m={m} spec={PORTRAIT}>
        <Photo
          src="/media/creators/nikita-kumawat.webp"
          alt="Creator Nikita Kumawat, part of the Mishram Media network"
        />
      </Surface>

      <Surface m={m} spec={REEL}>
        <Photo
          src="/media/creators/mukul-sharma.webp"
          alt="Vertical content frame featuring creator Mukul Sharma"
        />
        <span aria-hidden className="svc-format">
          9:16
        </span>
      </Surface>

      <Surface m={m} spec={CONTENT}>
        <Photo
          src="/media/creators/vishnu-priya.webp"
          alt="Content frame featuring creator Vishnu Priya"
        />
        <span aria-hidden className="svc-format">
          4:5
        </span>
      </Surface>

      {LABELS.map((l) => (
        <Annotation key={l.text} m={m} {...l} />
      ))}
    </div>
  );
}
