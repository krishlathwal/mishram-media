"use client";

import { motion } from "motion/react";

import {
  WEB_HOW_CAPABILITIES,
  WEB_HOW_COPY,
  WEB_HOW_STACK,
  WEB_HOW_STEPS,
} from "@/config/service-web";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * 06 / HOW WE BUILD — the last informational chapter on the route.
 *
 * §01–§03 answer *what* Mishram can build, §04 widens it to the system behind
 * the interface, §05 answers *why here*. This answers the only question left —
 * **what it is actually like to build something with Mishram** — and then the
 * page stops arguing and hands over to the form.
 *
 * ── ONE CHAPTER, BECAUSE FOUR WOULD HAVE BEEN FOUR ────────────────────────
 *
 * The approved flow carried a development process, a responsive demonstration,
 * a technology philosophy and a capability index as **separate** chapters.
 * §10z collapsed them into this one after the route measured 15,353px on a
 * phone with five sections built. So: six stages, one technical statement, one
 * capability index — and no FAQ, no pricing, no stack chapter and no second
 * call to action, because `ProjectInquiry` immediately below already is one.
 *
 * The responsive demonstration survives as **one detail**: three descending
 * outlines inside the `Test` artifact. That is all it was ever going to prove.
 *
 * ── THE COMPOSITION, AND WHY IT IS NOT §05 AGAIN ──────────────────────────
 *
 * §05 draws a *journey the customer takes* — a rising line, two spans over it,
 * caps term rails under each stage. This draws *the process Mishram runs*, and
 * it had to look nothing like it one section later:
 *
 * - the line is **flat**, not rising, and its registration marks pass straight
 *   through it rather than sitting on it;
 * - the stages carry **sentences**, where §05's carry tracked capability
 *   terms — prose against index type is the strongest texture difference two
 *   adjacent sections can have;
 * - each stage is numbered `01`–`06`, which §05's deliberately are not;
 * - and the artifact resolves, which nothing else on the route does.
 *
 * ── THE ARTIFACT ─────────────────────────────────────────────────────────
 *
 * One tiny frame per stage, and the product inside it resolves as the process
 * runs: loose coordinates → structural divisions → hierarchy → a working
 * surface → the same surface at three widths → finished. It is **secondary by
 * construction** — 46×30px wide, 38×22 narrow, `aria-hidden`, and built from absolutely
 * positioned `<span>`s rather than six illustrations, so the whole sequence
 * costs six boxes and twenty-two bars of pure CSS.
 *
 * ── COST ─────────────────────────────────────────────────────────────────
 *
 * No canvas, no WebGL, no scroll listener, no MotionValue, no state, no
 * `requestAnimationFrame`, no imagery and no new dependency. The only motion
 * is one staggered `whileInView` fade per row, which Motion removes under
 * `reducedMotion="user"`. Once the rows have settled the section costs nothing.
 */

/* ── The resolving artifact ──────────────────────────────────────
   `[x, y, w, h]` as percentages of the frame, plus a tone. Percentages so the
   same six drawings serve the 46×30 desktop frame and the 38×22 narrow one
   without a second table. */

type Tone = "line" | "ink" | "accent" | "frame";
type Part = readonly [number, number, number, number, Tone?];

/**
 * Six states of one product, in order. Read down the column on a phone and
 * across the row on a desktop; either way it is the same object getting more
 * finished, which is the only thing this drawing has to say.
 */
const ARTIFACT: readonly (readonly Part[])[] = [
  /* 01 Discover — marks on an empty field. Nothing is decided yet, so nothing
     is aligned to anything. */
  [
    [16, 20, 10, 15],
    [45, 52, 10, 15],
    [72, 30, 10, 15],
  ],
  /* 02 Architect — the field divides. Structure before appearance. */
  [
    [12, 24, 76, 5],
    [12, 50, 76, 5],
    [12, 76, 50, 5],
  ],
  /* 03 Design — hierarchy arrives: one element outranks the others. */
  [
    [12, 18, 76, 12, "ink"],
    [12, 46, 50, 7],
    [12, 64, 68, 7],
  ],
  /* 04 Build — a working surface, with something live in it. */
  [
    [12, 16, 76, 12, "ink"],
    [12, 42, 40, 8],
    [58, 42, 30, 8, "accent"],
    [12, 60, 76, 8],
  ],
  /* 05 Test — the same surface at three widths. The responsive demonstration
     that used to be an entire chapter, at 46 by 30 pixels. */
  [
    [8, 26, 34, 56, "frame"],
    [48, 34, 24, 48, "frame"],
    [78, 42, 14, 40, "frame"],
  ],
  /* 06 Launch — resolved, and the frame closes in teal. */
  [
    [12, 14, 76, 12, "ink"],
    [12, 36, 76, 9],
    [12, 54, 48, 9],
    [66, 54, 22, 9, "accent"],
    [12, 72, 76, 9],
  ],
];

function BuildArtifact({ stage, id }: { stage: number; id: string }) {
  return (
    <span aria-hidden className="web-how-art" data-stage={id}>
      {ARTIFACT[stage].map(([x, y, w, h, tone], i) => (
        <span
          key={i}
          className="web-how-part"
          data-tone={tone}
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
        />
      ))}
    </span>
  );
}

/* ── The stack statement and what it covers ─────────────────────── */

function Stack() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="mt-6 border-t border-line pt-6 sm:mt-12 sm:pt-9 lg:grid lg:grid-cols-12 lg:gap-x-8"
    >
      {/* Deliberately **no caps label above this**. An eyebrow reading
          `THE STACK FOLLOWS THE PRODUCT` over a line reading *The stack
          follows the product* is the same six words twice. */}
      <div className="lg:col-span-5">
        <p className="web-how-statement">{WEB_HOW_STACK.statement}</p>
        <p className="mt-4 max-w-[46ch] text-[0.875rem] leading-[1.7] text-ink-soft sm:mt-5">
          {WEB_HOW_STACK.support}
        </p>
      </div>

      {/* Categories of work, never products — no framework, no vendor, no
          version and no logo anywhere in this index. */}
      <ul className="web-how-caps mt-5 lg:col-span-6 lg:col-start-7 lg:mt-0">
        {WEB_HOW_CAPABILITIES.map((group) => (
          <li key={group.id} className="web-how-capgroup">
            <p className="caps text-ink-muted">{group.name}</p>
            <ul className="web-how-capitems">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function HowWeBuild({ id }: { id: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      {/* A chapter rule and nothing else. §05 arrives out of §04's ink
          environment and needs the bridge that carries the line across; this
          boundary is two editorial sections on the same canvas, and inventing
          a second shared-element device for it would be decoration. */}
      <ServiceSectionHead id={`${id}-title`} copy={WEB_HOW_COPY} />

      <ol className="web-how-steps mt-8 md:mt-12">
        {WEB_HOW_STEPS.map((step, i) => (
          <motion.li
            key={step.id}
            className="web-how-step"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, delay: 0.06 + i * 0.06, ease: EASE }}
          >
            {/* The registration mark. It **crosses** the line rather than
                sitting on it — horizontal through the narrow rail, vertical
                through the wide one — which is the detail that keeps this from
                reading as §05's nodes or as the shared `ServiceProcess` tick. */}
            <span aria-hidden className="web-how-tick" />
            <span aria-hidden className="caps web-how-index">
              {step.index}
            </span>
            <h3 className="web-how-name">
              {/* The index is decorative in the drawing and real here, so the
                  document reads `01 Discover` in order and never twice. */}
              <span className="sr-only">{`${step.index} — `}</span>
              {step.name}
            </h3>
            <p className="web-how-detail">{step.detail}</p>
            <BuildArtifact stage={i} id={step.id} />
          </motion.li>
        ))}
      </ol>

      <Stack />
    </ServiceSection>
  );
}
