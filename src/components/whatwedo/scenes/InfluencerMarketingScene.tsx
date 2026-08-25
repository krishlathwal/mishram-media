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
 * SERVICE 02 — Influencer Marketing
 *
 * A living editorial creator network, not a node diagram: four real creators
 * from the Mishram network arranged at different depths around one central
 * campaign surface they converge on. Three short traces imply a coordinated
 * campaign without wiring every creator to every other.
 *
 * Continuity from Service 01: the first creator to arrive is Nikita Kumawat,
 * who anchored the personal-brand scene, entering near where that portrait
 * receded. Personal brand → creator network, rather than two unrelated slides.
 *
 * No invented reach, no follower counts, no fabricated client campaign — the
 * central surface is an abstract campaign board built from the Mishram system.
 */

/** Continuity anchor: carried over from Service 01, entering first. */
const NIKITA: SurfaceSpec = {
  left: 1, top: 6, width: 21, aspect: "9 / 16",
  enter: [0.02, 0.3], depth: 0.9, tilt: -1.6, drift: "a", z: 25,
};

const CAMPAIGN: SurfaceSpec = {
  left: 33, top: 34, width: 34, aspect: "16 / 11",
  enter: [0, 0.26], depth: 1, tilt: 0.6, drift: "c", z: 30,
};

const ZOYA: SurfaceSpec = {
  left: 74, top: 4, width: 20, aspect: "9 / 16",
  enter: [0.14, 0.44], depth: 0.72, tilt: 2, drift: "b", z: 20,
};

const LOVKESH: SurfaceSpec = {
  left: 9, top: 66, width: 22, aspect: "1 / 1",
  enter: [0.22, 0.52], depth: 0.62, tilt: 1.6, drift: "d", z: 20,
};

const MUKUL: SurfaceSpec = {
  left: 73, top: 63, width: 16, aspect: "9 / 16",
  enter: [0.3, 0.6], depth: 0.5, tilt: -2.2, drift: "b", z: 15,
};

const LABELS: readonly AnnotationSpec[] = [
  { text: "Creator Network", left: 1, top: 57, at: 0.34 },
  { text: "Campaign Strategy", left: 34, top: 26, at: 0.42 },
  { text: "Collaboration", left: 34, top: 66, at: 0.5, level: "back" },
  { text: "Distribution", left: 62, top: 92, at: 0.58, level: "back" },
];

/**
 * Abstract campaign board. Deliberately no brand marks and no figures — it
 * reads as the thing the network is being organised around, nothing more.
 */
function CampaignFragment() {
  return (
    <div className="flex h-full w-full flex-col gap-[5%] p-[6%]">
      <div className="flex items-center justify-between gap-[4%]">
        <span className="caps text-[0.5rem] text-ink/55">Campaign</span>
        <span className="block h-[7px] w-[16%] rounded-[1px] bg-accent/75" />
      </div>

      <span className="block h-px w-full bg-line" />

      <div className="flex flex-1 items-stretch gap-[5%]">
        {/* Content variants the campaign ships across. */}
        {["9 / 16", "1 / 1", "4 / 5"].map((a, i) => (
          <span
            key={a}
            className="block h-full flex-1 rounded-[2px] border border-line"
            style={{ opacity: 1 - i * 0.22 }}
          />
        ))}
        <span className="flex flex-[1.4] flex-col justify-center gap-[10%]">
          <span className="block h-[3px] w-full bg-ink/28" />
          <span className="block h-[3px] w-[72%] bg-ink/18" />
          <span className="block h-[3px] w-[44%] bg-ink/12" />
        </span>
      </div>
    </div>
  );
}

export function InfluencerMarketingScene({ m }: { m: StageMotion }) {
  // Traces converge on the campaign surface, drawn in as the network forms.
  const traceLength = useTransform(m.progress, [0.3, 0.72], [0, 1]);
  const traceOpacity = useTransform(m.progress, [0.3, 0.5, 0.82, 1], [0, 1, 1, 0.35]);

  // Exit posture: the traces align toward one direction as the network recedes
  // and the campaign surface is left dominant.
  const traceShift = useTransform(m.progress, [0.82, 1], [0, 5]);

  return (
    <div className="svc-stage-inner">
      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ opacity: traceOpacity, x: traceShift, zIndex: 5 }}
      >
        <motion.path
          /* Three partial arcs only — implied convergence, not a wired graph. */
          d="M24 40 C 32 44, 36 44, 42 45 M70 40 C 64 43, 62 44, 58 45 M28 74 C 36 68, 40 62, 44 58"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: traceLength }}
          opacity={0.6}
        />
      </motion.svg>

      <Surface m={m} spec={CAMPAIGN} className="svc-surface--plan">
        <CampaignFragment />
      </Surface>

      <Surface m={m} spec={NIKITA}>
        <Photo
          src="/media/creators/nikita-kumawat.webp"
          alt="Creator Nikita Kumawat, part of the Mishram Media creator network"
        />
        <span aria-hidden className="svc-name">
          Nikita Kumawat
        </span>
      </Surface>

      <Surface m={m} spec={ZOYA}>
        <Photo
          src="/media/creators/zoya-jaan.webp"
          alt="Creator Zoya Jaan, part of the Mishram Media creator network"
        />
        <span aria-hidden className="svc-name">
          Zoya Jaan
        </span>
      </Surface>

      <Surface m={m} spec={LOVKESH}>
        <Photo
          src="/media/creators/lovkesh-kataria.webp"
          alt="Creator Lovkesh Kataria, part of the Mishram Media creator network"
        />
        <span aria-hidden className="svc-name">
          Lovkesh Kataria
        </span>
      </Surface>

      <Surface m={m} spec={MUKUL}>
        <Photo
          src="/media/creators/mukul-sharma.webp"
          alt="Creator Mukul Sharma, part of the Mishram Media creator network"
        />
        <span aria-hidden className="svc-name">
          Mukul Sharma
        </span>
      </Surface>

      {LABELS.map((l) => (
        <Annotation key={l.text} m={m} {...l} />
      ))}
    </div>
  );
}
