"use client";

import { motion, useTransform } from "motion/react";

import type { StageMotion } from "../ServiceStage";
import {
  Annotation,
  Surface,
  type AnnotationSpec,
  type SurfaceSpec,
} from "./parts";

/**
 * SERVICE 03 — Performance Marketing
 *
 * The campaign built with creators becomes a paid growth asset. Read left to
 * right: campaign creative (with the variants it is tested against) → paid
 * distribution → landing experience → conversion, with one abstract
 * optimisation curve underneath.
 *
 * Deliberately not a dashboard. No ad-manager chrome, no ROAS, no CTR, no
 * revenue, no axes, no numbers of any kind — every figure would be fabricated.
 * The whole scene is Mishram's own abstract editorial language, so no client
 * campaign is implied and no excluded category can appear.
 *
 * The campaign creative carries across from Service 02's board (same aspect,
 * entering from where that board sat) and the landing experience is built to
 * advance rather than recede on exit — it becomes the bridge into Service 04.
 */

/** Two variants the main creative is tested against; they spread as it settles. */
const VARIANT_A: SurfaceSpec = {
  left: 1, top: 17, width: 26, aspect: "16 / 11",
  enter: [0.1, 0.42], depth: 0.45, tilt: -2.6, drift: "b", z: 10,
  travelX: 34, travelY: 40,
};

const VARIANT_B: SurfaceSpec = {
  left: 12, top: 31, width: 26, aspect: "16 / 11",
  enter: [0.14, 0.46], depth: 0.5, tilt: 2.4, drift: "d", z: 12,
  travelX: -20, travelY: -22,
};

/** Continuity bridge: Service 02's campaign board, moved left and clarified. */
const CREATIVE: SurfaceSpec = {
  left: 5, top: 23, width: 31, aspect: "16 / 11",
  enter: [0, 0.28], depth: 0.85, tilt: 0.4, drift: "a", z: 25,
  travelX: 150, travelY: 30,
};

/**
 * Conversion interface surface. Kept general rather than campaign-specific,
 * because Service 04 will expand this same object into a full digital
 * experience — so it advances on exit instead of receding.
 */
const LANDING: SurfaceSpec = {
  left: 58, top: 19, width: 38, aspect: "4 / 3",
  enter: [0.24, 0.58], depth: 1, tilt: -0.8, drift: "c", z: 30,
  exit: "advance",
};

const LABELS: readonly AnnotationSpec[] = [
  { text: "Creative Testing", left: 1, top: 57, at: 0.34 },
  { text: "Paid Acquisition", left: 40, top: 25, at: 0.44 },
  { text: "Distribution", left: 40, top: 41, at: 0.52, level: "back" },
  { text: "Conversion", left: 62, top: 79, at: 0.66 },
];

/** The paid path: creative → landing, then landing → conversion. */
const TRACE = "M37 37 C 46 34, 50 33, 57 33 M76 56 C 76 61, 76 63, 76 66";

/** One abstract optimisation curve. No axes, no figures — a metaphor only. */
const CURVE = "M48 92 C 58 90, 64 86, 71 83 S 84 77, 94 71";

function CampaignCreative({ variant }: { variant?: "a" | "b" }) {
  return (
    <div className="flex h-full w-full flex-col gap-[6%] p-[7%]">
      <div className="flex items-center justify-between gap-[4%]">
        <span className="caps text-[0.5rem] text-ink/55">
          {variant ? "Variant" : "Campaign"}
        </span>
        <span
          className={`block h-[7px] rounded-[1px] ${variant ? "w-[10%] bg-ink/20" : "w-[18%] bg-accent/75"}`}
        />
      </div>
      <span className="block h-px w-full bg-line" />
      <div className="flex flex-1 gap-[6%]">
        {/* Creative frame plus its message block. */}
        <span className="block h-full w-[34%] rounded-[2px] border border-line bg-ink/[0.05]" />
        <span className="flex flex-1 flex-col justify-center gap-[9%]">
          <span className="block h-[3px] w-full bg-ink/28" />
          <span className="block h-[3px] w-[68%] bg-ink/18" />
          <span
            className={`mt-[6%] block h-[9px] w-[46%] rounded-[1px] ${variant ? "bg-ink/15" : "bg-accent/60"}`}
          />
        </span>
      </div>
    </div>
  );
}

/**
 * Conversion interface: an eyebrow, a display block, a primary action and a
 * supporting row. General enough to grow into a full site in Service 04.
 */
function LandingExperience() {
  return (
    <div className="flex h-full w-full flex-col gap-[4%] p-[6%]">
      <div className="flex items-center justify-between">
        <span className="block h-[3px] w-[16%] bg-ink/30" />
        <span className="flex gap-[6px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-[3px] w-[14px] bg-ink/12" />
          ))}
        </span>
      </div>
      <span className="block h-px w-full bg-line" />

      <div className="flex flex-1 flex-col justify-center gap-[5%]">
        <span className="block h-[7px] w-[74%] bg-ink/30" />
        <span className="block h-[7px] w-[52%] bg-ink/22" />
        <span className="mt-[3%] block h-[3px] w-[64%] bg-ink/12" />
        <span className="mt-[4%] block h-[13px] w-[34%] rounded-[2px] bg-accent/75" />
      </div>

      <span className="block h-px w-full bg-line" />
      <div className="flex gap-[4%] pt-[2%]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-[16px] flex-1 rounded-[2px] border border-line"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

export function PerformanceMarketingScene({ m }: { m: StageMotion }) {
  // Paid path draws in once the creative has landed.
  const traceLength = useTransform(m.progress, [0.3, 0.68], [0, 1]);
  const traceOpacity = useTransform(m.progress, [0.3, 0.48, 0.82, 1], [0, 1, 1, 0.3]);

  // Optimisation curve completes late and quietens on exit.
  const curveLength = useTransform(m.progress, [0.5, 0.86], [0, 1]);
  const curveOpacity = useTransform(m.progress, [0.5, 0.66, 0.82, 1], [0, 0.5, 0.5, 0.12]);

  // Conversion resolves last.
  const nodeScale = useTransform(m.progress, [0.62, 0.76], [0.4, 1]);
  const nodeOpacity = useTransform(m.progress, [0.62, 0.74, 0.85, 1], [0, 0.85, 0.85, 0.25]);

  return (
    <div className="svc-stage-inner">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 5 }}
      >
        {/* Paid distribution */}
        <motion.g style={{ opacity: traceOpacity }}>
          <motion.path
            d={TRACE}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.22"
            strokeLinecap="round"
              style={{ pathLength: traceLength }}
            opacity={0.5}
          />
          {/* A short dash marching the same path reads as traffic flowing. */}
          <path
            className="svc-flow"
            d={TRACE}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.38"
            strokeLinecap="round"
              pathLength={100}
            strokeDasharray="4 96"
          />
        </motion.g>

        {/* Optimisation curve — abstract, unlabelled, no axes. */}
        <motion.path
          d={CURVE}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.2"
          strokeLinecap="round"
          style={{ pathLength: curveLength, opacity: curveOpacity }}
        />

        {/* Conversion endpoint */}
        <motion.g style={{ opacity: nodeOpacity, scale: nodeScale, originX: "76%", originY: "70%" }}>
          <circle
            cx="76"
            cy="70"
            r="3.4"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="0.22"
              opacity={0.6}
          />
          <circle cx="76" cy="70" r="1.1" fill="var(--color-accent)" />
        </motion.g>
      </svg>

      <Surface m={m} spec={VARIANT_A} className="svc-surface--plan">
        <CampaignCreative variant="a" />
        <span aria-hidden className="svc-tag">
          A
        </span>
      </Surface>

      <Surface m={m} spec={VARIANT_B} className="svc-surface--plan">
        <CampaignCreative variant="b" />
        <span aria-hidden className="svc-tag">
          B
        </span>
      </Surface>

      <Surface m={m} spec={CREATIVE} className="svc-surface--plan">
        <CampaignCreative />
      </Surface>

      <Surface m={m} spec={LANDING} className="svc-surface--plan">
        <LandingExperience />
      </Surface>

      {LABELS.map((l) => (
        <Annotation key={l.text} m={m} {...l} />
      ))}
    </div>
  );
}
