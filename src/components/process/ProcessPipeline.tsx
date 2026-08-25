"use client";

import { motion } from "motion/react";

import {
  PIPE_LOOP,
  PIPE_PATH,
  PIPE_VIEW,
  PROCESS_STAGES,
  WORK_PROCESS_COPY,
  type ProcessStage,
} from "@/config/process";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The pipeline: one SVG line system, with the stage labels as HTML positioned
 * over it so the typography stays crisp and themeable.
 *
 * Four layers, quietest first — a graphite base hairline through all five
 * nodes, a teal progress stroke as far as the active stage, a small travelling
 * signal dash, and the nodes themselves. On top of that, one group per stage
 * that only resolves while that stage is active, so the line itself carries the
 * explanation rather than just sitting behind the words.
 *
 * **Stroke gotcha (§10 of the brief).** `vectorEffect="non-scaling-stroke"` and
 * an animated `pathLength` cannot be combined — dashes get measured in screen
 * px while `pathLength` normalises to user units, and the path shatters. So the
 * base draw, the progress stroke and the signal omit `vectorEffect` and carry a
 * viewBox-space stroke width; every static line keeps it and stays a true
 * hairline at any size.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const { w: VW, h: VH } = PIPE_VIEW;

/** Scattered inputs converging into Discover: information becoming clarity. */
const INPUTS = [
  { x: 10, y: 118, r: 1.6, d: "a" },
  { x: 26, y: 186, r: 1.2, d: "b" },
  { x: 8, y: 152, r: 1.1, d: "b" },
  { x: 34, y: 132, r: 1.9, d: "a" },
  { x: 20, y: 206, r: 1.3, d: "a" },
  { x: 44, y: 178, r: 1.5, d: "b" },
  { x: 30, y: 100, r: 1.1, d: "b" },
] as const;

const INPUT_TRACES = [
  "M12,119 C34,126 52,142 69,156",
  "M22,187 C40,180 56,168 69,159",
  "M35,133 C46,139 60,148 69,157",
] as const;

/** Alternatives considered between Strategy and Create; one route chosen. */
const ALT_ROUTES = [
  "M272,135 C330,150 390,152 474,112",
  "M272,135 C336,112 400,96 474,112",
] as const;

/** Distribution fanning out of Launch: work reaching market. */
const LAUNCH_TRACES = [
  "M676,89 C724,74 764,52 812,40",
  "M676,89 C728,92 772,104 818,118",
  "M676,89 C730,80 776,74 822,76",
] as const;

/** Ascending ticks past Scale — restrained, and never a number. */
const SCALE_TICKS = [
  { x: 902, y: 58, h: 12 },
  { x: 918, y: 52, h: 18 },
  { x: 934, y: 45, h: 25 },
] as const;

function StageGroup({
  active,
  reduced,
  children,
}: {
  active: boolean;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.18 : 0.46, ease: EASE }}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </motion.g>
  );
}

export function ProcessPipeline({
  activeId,
  lockedId,
  onPreview,
  onClearPreview,
  onSelect,
}: {
  activeId: string;
  lockedId: string;
  onPreview: (id: string) => void;
  onClearPreview: () => void;
  onSelect: (id: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const active =
    PROCESS_STAGES.find((s) => s.id === activeId) ?? PROCESS_STAGES[0];
  const activeIndex = PROCESS_STAGES.indexOf(active);
  // Discover sits at the very start of the path, so give it a visible stub
  // rather than a zero-length stroke.
  const progress = Math.max(0.05, active.at);

  const is = (id: string) => activeId === id;

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${VW} / ${VH}` }}
      onPointerLeave={onClearPreview}
      onBlur={(e) => {
        // Only when focus leaves the pipeline entirely, not between stages.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onClearPreview();
        }
      }}
    >
      <motion.svg
        aria-hidden
        viewBox={`0 0 ${VW} ${VH}`}
        fill="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        initial="rest"
        whileInView="shown"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        {/* Feedback loop. Quiet at every stage, resolved at Scale — the process
            does not simply end on the fifth node. */}
        <motion.path
          d={PIPE_LOOP}
          stroke="var(--color-line-strong)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ opacity: is("scale") ? 0 : 0.16 }}
          transition={{ duration: reduced ? 0.18 : 0.46, ease: EASE }}
        />
        <motion.path
          d={PIPE_LOOP}
          stroke="var(--color-accent)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="3 5"
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ opacity: is("scale") ? 0.8 : 0 }}
          transition={{ duration: reduced ? 0.18 : 0.46, ease: EASE }}
        />

        {/* Base line, drawn on entry. */}
        <motion.path
          d={PIPE_PATH}
          stroke="var(--color-line-strong)"
          strokeWidth={1.3}
          strokeLinecap="round"
          variants={{ rest: { pathLength: 0 }, shown: { pathLength: 1 } }}
          transition={{ duration: reduced ? 0.01 : 1.15, ease: EASE }}
        />

        {/* Teal progress, as far as the active stage. */}
        <motion.path
          d={PIPE_PATH}
          stroke="var(--color-accent)"
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: progress }}
          transition={{ duration: reduced ? 0.18 : 0.62, ease: EASE }}
        />

        {/* The travelling signal: one small dash, decorative only — it never
            changes which stage is selected. */}
        {!reduced ? (
          <motion.path
            className="prc-signal"
            d={PIPE_PATH}
            stroke="var(--color-accent)"
            strokeWidth={2.2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.014 0.986"
            variants={{ rest: { opacity: 0 }, shown: { opacity: 0.9 } }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          />
        ) : null}

        {/* ── 01 Discover — scattered inputs converging ─────────────── */}
        <StageGroup active={is("discover")} reduced={reduced}>
          {INPUT_TRACES.map((d) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-ink)"
              strokeWidth={0.9}
              strokeLinecap="round"
              opacity={0.28}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {INPUTS.map((p) => (
            <circle
              key={`${p.x}-${p.y}`}
              className={`prc-drift prc-drift--${p.d}`}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="var(--color-ink)"
              opacity={0.42}
            />
          ))}
        </StageGroup>

        {/* ── 02 Strategy — alternatives quieten, one route resolves ── */}
        <StageGroup active={is("strategy")} reduced={reduced}>
          {ALT_ROUTES.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke="var(--color-ink)"
              strokeWidth={0.9}
              strokeLinecap="round"
              strokeDasharray={i === 0 ? "2 5" : "1 6"}
              opacity={i === 0 ? 0.3 : 0.18}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* Grid intersections resolving around the chosen direction. */}
          {[330, 372, 414].map((x) => (
            <line
              key={x}
              x1={x}
              y1={104}
              x2={x}
              y2={148}
              stroke="var(--color-ink)"
              strokeWidth={0.8}
              opacity={0.14}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </StageGroup>

        {/* ── 03 Create — the line generates content surfaces ────────── */}
        <StageGroup active={is("create")} reduced={reduced}>
          {/* 4:5 still, 9:16 reel, and an interface block. Abstract on purpose:
              the real formats live in §02 and §03. */}
          <rect x={430} y={24} width={26} height={33} rx={1.5}
            stroke="var(--color-ink)" strokeWidth={0.9} opacity={0.42}
            vectorEffect="non-scaling-stroke" />
          <rect x={466} y={18} width={19} height={34} rx={1.5}
            stroke="var(--color-accent)" strokeWidth={1} opacity={0.7}
            vectorEffect="non-scaling-stroke" />
          <g opacity={0.4}>
            <rect x={495} y={28} width={38} height={26} rx={1.5}
              stroke="var(--color-ink)" strokeWidth={0.9}
              vectorEffect="non-scaling-stroke" />
            <line x1={500} y1={36} x2={520} y2={36} stroke="var(--color-ink)"
              strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
            <line x1={500} y1={42} x2={528} y2={42} stroke="var(--color-ink)"
              strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
          </g>
          {[
            "M474,112 C468,96 452,72 446,59",
            "M474,112 C475,94 476,72 476,54",
            "M474,112 C486,96 502,70 510,56",
          ].map((d) => (
            <path key={d} d={d} stroke="var(--color-ink)" strokeWidth={0.8}
              opacity={0.24} strokeLinecap="round"
              vectorEffect="non-scaling-stroke" />
          ))}
        </StageGroup>

        {/* ── 04 Launch — outputs move outward into market ───────────── */}
        <StageGroup active={is("launch")} reduced={reduced}>
          {LAUNCH_TRACES.map((d, i) => (
            <g key={d}>
              <path
                d={d}
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                strokeLinecap="round"
                opacity={0.26}
                vectorEffect="non-scaling-stroke"
              />
              {/* A fragment part-way along each route, not a platform badge. */}
              <rect
                x={[806, 812, 816][i]}
                y={[36, 114, 72][i]}
                width={9}
                height={11}
                rx={1}
                fill="var(--color-accent)"
                opacity={0.55}
              />
            </g>
          ))}
        </StageGroup>

        {/* ── 05 Scale — the signal strengthens and returns ──────────── */}
        <StageGroup active={is("scale")} reduced={reduced}>
          <path
            d="M878,68 C910,64 936,58 955,52"
            stroke="var(--color-accent)"
            strokeWidth={2.4}
            strokeLinecap="round"
            opacity={0.55}
          />
          {SCALE_TICKS.map((t) => (
            <line
              key={t.x}
              x1={t.x}
              y1={t.y + t.h}
              x2={t.x}
              y2={t.y}
              stroke="var(--color-accent)"
              strokeWidth={1}
              strokeLinecap="round"
              opacity={0.4}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </StageGroup>

        {/* Nodes, above every line. */}
        {PROCESS_STAGES.map((s, i) => {
          const on = s.id === activeId;
          const passed = i <= activeIndex;
          return (
            <motion.circle
              key={s.id}
              cx={s.node.x}
              cy={s.node.y}
              initial={false}
              animate={{ r: on ? 4.2 : 2.4, opacity: passed ? 1 : 0.5 }}
              transition={{ duration: reduced ? 0.18 : 0.42, ease: EASE }}
              fill={passed ? "var(--color-accent)" : "var(--color-line-strong)"}
            />
          );
        })}
      </motion.svg>

      {/* Feedback-loop annotation. HTML, so the caps treatment matches the rest
          of the site rather than being SVG text. */}
      <motion.span
        aria-hidden
        className="caps absolute z-10 text-[0.5rem] text-accent"
        style={{ left: "42%", top: "79%" }}
        initial={false}
        animate={{ opacity: is("scale") ? 1 : 0, y: is("scale") ? 0 : 4 }}
        transition={{ duration: reduced ? 0.18 : 0.5, ease: EASE }}
      >
        {WORK_PROCESS_COPY.loop}
      </motion.span>

      {/* Stage controls, sitting above their node on the rising line. */}
      <motion.ul
        className="absolute inset-0"
        initial="rest"
        whileInView="shown"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        {PROCESS_STAGES.map((s, i) => (
          <StageLabel
            key={s.id}
            stage={s}
            order={i}
            active={s.id === activeId}
            locked={s.id === lockedId}
            reduced={reduced}
            onPreview={onPreview}
            onClearPreview={onClearPreview}
            onSelect={onSelect}
          />
        ))}
      </motion.ul>
    </div>
  );
}

function StageLabel({
  stage,
  order,
  active,
  locked,
  reduced,
  onPreview,
  onSelect,
}: {
  stage: ProcessStage;
  order: number;
  active: boolean;
  locked: boolean;
  reduced: boolean;
  onPreview: (id: string) => void;
  onClearPreview: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.li
      className="absolute"
      style={{
        left: `${(stage.node.x / VW) * 100}%`,
        top: `${(stage.node.y / VH) * 100}%`,
      }}
      variants={{
        rest: { opacity: 0, y: 10 },
        shown: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reduced ? 0.01 : 0.55,
        delay: reduced ? 0 : 0.45 + order * 0.08,
        ease: EASE,
      }}
    >
      <button
        type="button"
        aria-current={locked ? "true" : undefined}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onPreview(stage.id);
        }}
        onFocus={() => onPreview(stage.id)}
        onClick={() => onSelect(stage.id)}
        // Anchored to the node and lifted above the line, so the labels step
        // upward with the rise instead of needing a separate stagger.
        className="group/stage absolute bottom-[14px] left-0 flex w-max flex-col items-start gap-1.5 pb-1 text-left"
      >
        <span
          className={`caps transition-colors duration-300 ${
            active ? "text-accent" : "text-ink-muted"
          }`}
        >
          {stage.index}
        </span>
        <span
          className={`font-display text-[clamp(0.9rem,1.1vw,1.15rem)] leading-none font-medium tracking-[-0.02em] transition-colors duration-300 ${
            active ? "text-ink" : "text-ink-soft group-hover/stage:text-ink"
          }`}
        >
          {stage.name}
        </span>
        {/* The active marker. Always in layout so nothing shifts. */}
        <span aria-hidden className="block w-10">
          <span
            className="prc-rule w-full"
            style={{ transform: `scaleX(${active ? 1 : 0})` }}
          />
        </span>
      </button>
    </motion.li>
  );
}
