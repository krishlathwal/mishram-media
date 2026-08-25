"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import {
  SHOOTS_BUILDER_COPY,
  SHOOTS_BUILDER_LABELS,
  SHOT_DIRECTIONS,
  type ShotDirectionId,
} from "@/config/service-shoots";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { ShootFrame } from "./ShootFrame";

/**
 * THE SHOT BUILDER — this page's signature interaction.
 *
 * Choose a production direction — Hero, Product & Detail, Portrait, Social,
 * Campaign — and the arrangement changes: different frames, at different
 * aspects, in different positions, with a shot list and an editorial record
 * beside them. **The same production, five kinds of frame.**
 *
 * DELIBERATELY UNLIKE THE OTHER THREE SIGNATURE INTERACTIONS, and the
 * difference is what is being changed:
 *
 * - Service 01's Content System Board rearranges the **same abstract objects**
 *   into five configurations.
 * - Service 02's Creator Match Field redraws a **route** between fixed nodes.
 * - Service 03's Creative Test Bench replaces **wireframe surfaces**.
 * - This one changes **photographs and their crops** — it is the only one of
 *   the four where the subject is an image rather than a diagram, and the only
 *   one with no SVG in it at all.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * THE CONSTRAINT. Every frame is one of the five approved creator photographs
 * under one of §10b's tuned crops. **Nothing here is a shoot that was booked**,
 * and nothing is a client's campaign — the directions are categories of frame,
 * which is a factual thing to say about a photograph, not a claim about work
 * that happened.
 *
 * So the record carries **format, role and intended use** and stops there. **No
 * camera, no lens, no aperture, no location, no date, no crew, no client, no
 * budget, no turnaround.** The disclaimer saying so is rendered on the page,
 * not left in this comment — the rule §10l set and §10m kept.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Selection is the proven pattern (`useHoverLock`, §10c): hover previews, click
 * locks, leaving the list restores the lock, previews debounced 90ms,
 * `aria-current` on the lock and never the preview, real `<button>`s so focus
 * previews and Enter locks. Every direction's sentence, record and shot list
 * are real DOM text at all times.
 *
 * **Nothing auto-switches**, and the height never moves: the frame stage is a
 * fixed-aspect box with the five arrangements absolutely stacked inside it, and
 * all five records share one grid cell (§10d-notes).
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

export function ShotBuilder({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } =
    useHoverLock<ShotDirectionId>(SHOT_DIRECTIONS[0].id);

  const active =
    SHOT_DIRECTIONS.find((d) => d.id === activeId) ?? SHOT_DIRECTIONS[0];

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <ServiceSectionHead id={`${id}-title`} copy={SHOOTS_BUILDER_COPY} />

      <div
        data-layout={wide ? "split" : "rail"}
        className="mt-12 md:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The directions ────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{SHOOTS_BUILDER_LABELS.directionsLabel}</span>
            <span className="text-ink/40">
              {String(SHOT_DIRECTIONS.length).padStart(2, "0")}
            </span>
          </p>

          <ul onPointerLeave={wide ? clearPreview : undefined}>
            {SHOT_DIRECTIONS.map((direction) => {
              const on = activeId === direction.id;
              return (
                <li key={direction.id} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={wide ? () => preview(direction.id) : undefined}
                    onFocus={wide ? () => preview(direction.id) : undefined}
                    onBlur={wide ? clearPreview : undefined}
                    onClick={() => select(direction.id)}
                    aria-current={lockedId === direction.id ? "true" : undefined}
                    className="sht-direction group"
                  >
                    <span
                      className={clsx(
                        "caps w-7 shrink-0 pt-1.5 text-left text-[0.5625rem] transition-colors duration-300",
                        on
                          ? "text-accent"
                          : "text-ink-muted group-hover:text-accent",
                      )}
                    >
                      {direction.index}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className={clsx(
                          "block font-display text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.2] font-medium tracking-[-0.028em] transition-colors duration-300",
                          on ? "text-ink" : "text-ink/55",
                        )}
                      >
                        {direction.name}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-[0.8125rem] leading-[1.5] transition-colors duration-300",
                          on ? "text-ink-soft" : "text-ink-muted",
                        )}
                      >
                        {direction.role}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={clsx(
                        "sht-direction-mark",
                        on && "sht-direction-mark--on",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── The frames ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-10 lg:col-span-5 lg:col-start-5 lg:mt-0"
        >
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{SHOOTS_BUILDER_LABELS.activeLabel}</span>
            <span className="text-accent">{active.name}</span>
          </p>

          {/* Fixed aspect, so switching a direction can never change the page's
              height — and every arrangement is authored inside one box, so a
              collision checked at one viewport is checked at all of them. */}
          <div className="sht-stage">
            {SHOT_DIRECTIONS.map((direction) => (
              <div
                key={direction.id}
                aria-hidden={direction.id !== active.id}
                className={clsx(
                  "sht-stage-state",
                  direction.id === active.id && "sht-stage-state--on",
                )}
              >
                {direction.frames.map((frame, i) => (
                  <span
                    key={`${frame.creatorId}-${frame.kind}-${i}`}
                    className="sht-stage-place"
                    style={{
                      left: `${frame.left}%`,
                      top: `${frame.top}%`,
                      width: `${frame.width}%`,
                      zIndex: frame.z,
                    }}
                  >
                    <ShootFrame
                      creatorId={frame.creatorId}
                      kind={frame.kind}
                      aspect={frame.aspect}
                      size={frame.size}
                      tag={frame.tag}
                      /* Only the frame that leads an arrangement carries its
                         alt; the supporting crop repeats a photograph the
                         accessibility tree already has. */
                      described={frame.primary && direction.id === active.id}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-[68ch] text-[0.75rem] leading-[1.7] text-ink-muted">
            {SHOOTS_BUILDER_LABELS.disclaimer}
          </p>
        </motion.div>

        {/* ── The record and the shot list ──────────────────────────
            An editorial card of hairline rows — label left, value right —
            rather than §10m's four-column table. Same discipline, different
            grammar, because two service pages should not resolve into the
            same block of type. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0"
        >
          <p className="caps border-b border-line pb-4 text-ink-muted">
            {SHOOTS_BUILDER_LABELS.recordLabel}
          </p>

          {/* All five mounted in one grid cell, so the block holds the height
              of the longest and switching never shunts the page. */}
          <div className="grid">
            {SHOT_DIRECTIONS.map((direction) => (
              <div
                key={direction.id}
                aria-hidden={direction.id !== active.id}
                style={{ gridArea: "1 / 1" }}
                className={clsx(
                  "transition-opacity duration-[420ms] ease-[var(--ease-out-expo)]",
                  direction.id === active.id
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <dl>
                  {(
                    [
                      ["shot", direction.record.shot],
                      ["role", direction.record.role],
                      ["format", direction.record.format],
                      ["use", direction.record.use],
                    ] as const
                  ).map(([key, value]) => (
                    <div key={key} className="sht-record-row">
                      <dt className="caps text-[0.5625rem] text-ink-muted">
                        {SHOOTS_BUILDER_LABELS.fields[key]}
                      </dt>
                      <dd className="text-[0.8125rem] leading-[1.35] font-medium text-ink/85">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="caps mt-8 text-ink-muted">
                  {SHOOTS_BUILDER_LABELS.listLabel}
                </p>
                <ol className="mt-4">
                  {direction.list.map((row) => (
                    <li key={row.index} className="sht-list-row">
                      <span className="caps text-[0.5625rem] text-accent">
                        {row.index}
                      </span>
                      <span className="flex-1 text-[0.8125rem] leading-[1.4] text-ink/75">
                        {row.name}
                      </span>
                      <span className="caps text-[0.5625rem] text-ink-muted">
                        {row.format}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 max-w-[34ch] text-[0.8125rem] leading-[1.65] text-ink-soft">
                  {direction.sentence}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </ServiceSection>
  );
}
