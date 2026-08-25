"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import {
  PERFORMANCE_BENCH_LABELS,
  PERFORMANCE_CREATIVE_COPY,
  TEST_VARIABLES,
  type TestVariableId,
} from "@/config/service-performance";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";
import { CreativeSurface } from "./CreativeSurface";
import { VariantSheet } from "./VariantSheet";

/**
 * CREATIVE — the page's centre of gravity, and its signature interaction.
 *
 * **One section, two movements.** The variant sheet first: one original and
 * four versions of it, which is what a creative test produces. Then the bench:
 * pick what the experiment is changing and watch it reconfigure, which is how
 * the versions get decided.
 *
 * They were drafted as two sections and merged, for a better reason than
 * length — both showed abstract rectangles that vary, and read in sequence they
 * were the same idea twice. See the note above `PERFORMANCE_CREATIVE_COPY`.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE BENCH — this page's signature interaction.
 *
 * Choose what the experiment is changing — hook, message, format, offer or
 * destination — and the bench reconfigures: three variants that differ in
 * exactly that way, and a record saying what is being varied, what is being
 * held still, and what decision comes next. **The same campaign, a different
 * question.**
 *
 * ════════════════════════════════════════════════════════════════════════════
 * WHAT THIS IS NOT, and the constraints are the design.
 *
 * **It is not a live test, a report, or a product.** There is no testing
 * platform behind it, so nothing is drawn to look like one: no dashboard
 * chrome, no ad-manager UI, no charts, no gauges, no confidence bars, no
 * percentages. The disclaimer saying so is rendered on the page rather than
 * left in this comment — the same rule Service 02's match field follows.
 *
 * **No variant is ever shown winning.** A green tick, a "+32%", a highlighted
 * champion — any of them would be a fabricated result, and on a performance
 * page a fabricated result is a business claim. The record resolves into a
 * *decision rule* ("keep the opening that earned the next second"), which is
 * method rather than outcome.
 *
 * **No creative content.** The surfaces carry structure only — see
 * `CreativeSurface` for why there is no copy, no imagery and no brand in any of
 * them.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * DELIBERATELY NOT THE OTHER TWO SIGNATURE INTERACTIONS. Service 01's Content
 * System Board redraws one board into five arrangements of the same objects.
 * Service 02's Creator Match Field redraws a route between fixed nodes. This
 * one **replaces the objects themselves** — the three surfaces are genuinely
 * different compositions per variable, and in one state they are not even the
 * same shape. Nothing is reused between the three.
 *
 * Selection is the proven pattern (§10c's `useHoverLock`): hover previews,
 * click locks, leaving the list restores the lock, previews debounced 90ms,
 * `aria-current` on the lock and never the preview, real `<button>`s so focus
 * previews and Enter locks. Every variable's sentence and record are real DOM
 * text at all times.
 *
 * **Nothing auto-switches**, and the height never moves: the bench is a
 * fixed-aspect box, and all five records are mounted in one grid cell so the
 * block holds the height of the longest (§10d-notes).
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

export function CreativeTestBench({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } =
    useHoverLock<TestVariableId>(TEST_VARIABLES[0].id);

  const active =
    TEST_VARIABLES.find((v) => v.id === activeId) ?? TEST_VARIABLES[0];

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <ServiceSectionHead id={`${id}-title`} copy={PERFORMANCE_CREATIVE_COPY} />

      {/* ── Movement one: what a test produces ──────────────────── */}
      <div className="mt-14 md:mt-16">
        <VariantSheet />
      </div>

      {/* ── The hinge, then movement two: how it is decided ─────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mt-14 md:mt-16"
      >
        <h3 className="caps flex items-center gap-3 text-ink">
          <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
          {PERFORMANCE_BENCH_LABELS.benchLabel}
        </h3>
        <p className="mt-5 max-w-[62ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.65] text-ink/72">
          {PERFORMANCE_BENCH_LABELS.benchLead}
        </p>
      </motion.div>

      <div
        data-layout={wide ? "split" : "rail"}
        className="mt-8 md:mt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The variables ─────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{PERFORMANCE_BENCH_LABELS.variablesLabel}</span>
            <span className="text-ink/40">
              {String(TEST_VARIABLES.length).padStart(2, "0")}
            </span>
          </p>

          <ul onPointerLeave={wide ? clearPreview : undefined}>
            {TEST_VARIABLES.map((variable) => {
              const on = activeId === variable.id;
              return (
                <li key={variable.id} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={
                      wide ? () => preview(variable.id) : undefined
                    }
                    onFocus={wide ? () => preview(variable.id) : undefined}
                    onBlur={wide ? clearPreview : undefined}
                    onClick={() => select(variable.id)}
                    aria-current={lockedId === variable.id ? "true" : undefined}
                    className="pfm-variable group"
                  >
                    <span
                      className={clsx(
                        "caps w-8 shrink-0 pt-1.5 text-left text-[0.5625rem] transition-colors duration-300",
                        on
                          ? "text-accent"
                          : "text-ink-muted group-hover:text-accent",
                      )}
                    >
                      {variable.index}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className={clsx(
                          "block font-display text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.2] font-medium tracking-[-0.028em] transition-colors duration-300",
                          on ? "text-ink" : "text-ink/55",
                        )}
                      >
                        {variable.name}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-[0.8125rem] leading-[1.5] transition-colors duration-300",
                          on ? "text-ink-soft" : "text-ink-muted",
                        )}
                      >
                        {variable.role}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={clsx(
                        "pfm-variable-mark",
                        on && "pfm-variable-mark--on",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── The bench ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0"
        >
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{PERFORMANCE_BENCH_LABELS.activeLabel}</span>
            <span className="text-accent">{active.name}</span>
          </p>

          {/* Fixed aspect, so switching a variable can never change the page's
              height — and the three surfaces are laid out by *height*, so a
              variable that changes the shape (Format) genuinely changes the
              widths on the bench. */}
          <div className="pfm-bench">
            {TEST_VARIABLES.map((variable) => (
              <div
                key={variable.id}
                aria-hidden={variable.id !== active.id}
                className={clsx(
                  "pfm-bench-state",
                  variable.id === active.id && "pfm-bench-state--on",
                )}
              >
                {variable.variants.map((variant) => (
                  /* The slot owns the height, the surface fills it and takes
                     its width from its own aspect. That is what lets Format
                     genuinely change the shapes on the bench while every other
                     variable keeps three identical footprints — and it is why
                     the height percentage sits here rather than on the
                     surface, which has no definite height of its own. */
                  <span
                    key={variant.tag}
                    className="pfm-slot"
                    style={{ height: `${variant.height}%` }}
                  >
                    <CreativeSurface
                      rows={variant.rows}
                      aspect={variant.aspect}
                      className="pfm-slot-surface"
                    />
                    <span aria-hidden className="pfm-slot-tag">
                      <span className="text-accent">{variant.tag}</span>
                      <span className="pfm-slot-note">{variant.note}</span>
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* ── The test record ────────────────────────────────────
              Typographic fields, not a results panel. Every value is a
              property of the experiment — never a measurement of it. */}
          <div className="mt-8 border-t border-line pt-7">
            <p className="caps text-ink-muted">
              {PERFORMANCE_BENCH_LABELS.recordLabel}
            </p>

            {/* All five mounted in one grid cell, so the block holds the height
                of the longest and switching never shunts the page. */}
            <div className="mt-6 grid">
              {TEST_VARIABLES.map((variable) => (
                <div
                  key={variable.id}
                  aria-hidden={variable.id !== active.id}
                  style={{ gridArea: "1 / 1" }}
                  className={clsx(
                    "transition-opacity duration-[420ms] ease-[var(--ease-out-expo)]",
                    variable.id === active.id
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="max-w-[56ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.65] text-ink/75">
                    {variable.sentence}
                  </p>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-4">
                    {(
                      [
                        ["variable", variable.name],
                        ["variants", variable.record.variants],
                        ["held", variable.record.held],
                        ["decision", variable.record.decision],
                      ] as const
                    ).map(([key, value]) => (
                      <div key={key} className="border-b border-line py-4">
                        <dt className="caps text-[0.5625rem] text-ink-muted">
                          {PERFORMANCE_BENCH_LABELS.fields[key]}
                        </dt>
                        <dd className="mt-2.5 text-[0.875rem] leading-[1.35] font-medium text-ink/85">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <p className="mt-7 max-w-[64ch] text-[0.75rem] leading-[1.7] text-ink-muted">
              {PERFORMANCE_BENCH_LABELS.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </ServiceSection>
  );
}
