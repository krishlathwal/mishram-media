"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";

import { ROSTER, resolveFrame } from "@/config/creators";
import {
  CAMPAIGN_INTENTS,
  FORMAT_NODES,
  INFLUENCER_MATCH_COPY,
  INFLUENCER_MATCH_LABELS,
  type CampaignIntentId,
} from "@/config/service-influencer";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * THE CREATOR MATCH FIELD — this page's signature interaction.
 *
 * Choose a campaign intent and the route redraws: from the objective, through
 * the formats that intent actually needs, into a brief. The argument is the
 * section's thesis — the same brand, five different plans, and the difference
 * is a judgement rather than a filter.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * THE CONSTRAINT THAT SHAPED THIS, and it is worth reading before changing it.
 *
 * The obvious build is: pick an intent, and two or three creators light up.
 * **That version cannot ship.** It would state that a named real person is the
 * right choice for "Launch" or "Cultural Relevance", and the project holds no
 * evidence of any such thing — it would be inventing a characteristic for a
 * real human being on a client's live site, which is precisely what §1 forbids
 * and what §10b's follower-count audit already refused once.
 *
 * So the route runs through **format and stage nodes, never through people.**
 * The creator field sits behind it as an evenly-treated backdrop: every
 * portrait is rendered at the same emphasis, and **no intent ever changes which
 * creator is highlighted, because none of them is ever highlighted.** What
 * changes is the geometry of the plan.
 *
 * That is also why the disclaimer is rendered on the page rather than left in
 * this comment.
 * ════════════════════════════════════════════════════════════════════════════
 *
 * **No claimed software.** There is no matching engine, no audience-intelligence
 * platform and no proprietary score behind this, so nothing here is drawn to
 * look like one: no dashboard chrome, no percentages, no fit meters, no charts.
 *
 * Selection is the pattern §03/§04/§05 prove and Service 01 reuses — hover
 * previews, click locks, leaving restores the lock, previews debounced 90ms,
 * `aria-current` on the lock and never the preview. Rows are real `<button>`s,
 * so focus previews and Enter locks, and **every intent's sentence and brief
 * are real DOM text at all times.**
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/** Stage aspect, and the viewBox that matches it exactly. */
const VB_W = 100;
const VB_H = 62;

/** Where the plan starts and ends, in viewBox units. */
const OBJECTIVE = { x: 8, y: 38 };
const BRIEF = { x: 92, y: 30 };

/**
 * The creator field: five real portraits, evenly treated, quiet, and **never
 * altered by the selected intent**. They are here because the network is real,
 * not because any of them is filed under a campaign type.
 */
const BACKDROP: readonly {
  id: string;
  left: number;
  top: number;
  width: number;
  aspect: string;
  drift: "a" | "b" | "c" | "d";
}[] = [
  { id: "zoya", left: 26, top: 4, width: 13, aspect: "3 / 4", drift: "a" },
  { id: "mukul", left: 52, top: 2, width: 11, aspect: "9 / 16", drift: "b" },
  { id: "nikita", left: 72, top: 62, width: 13, aspect: "4 / 5", drift: "c" },
  { id: "lovkesh", left: 22, top: 68, width: 12, aspect: "3 / 4", drift: "d" },
  { id: "vishnu", left: 47, top: 66, width: 10, aspect: "9 / 16", drift: "a" },
];

function routePath(nodeIndices: readonly number[]): string {
  const points = [
    OBJECTIVE,
    ...nodeIndices.map((i) => ({ x: FORMAT_NODES[i].x, y: FORMAT_NODES[i].y })),
    BRIEF,
  ];

  return points
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = points[i - 1];
      const midX = (prev.x + p.x) / 2;
      return `C ${midX} ${prev.y}, ${midX} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");
}

export function CreatorMatchField({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } =
    useHoverLock<CampaignIntentId>(CAMPAIGN_INTENTS[0].id);

  const active =
    CAMPAIGN_INTENTS.find((i) => i.id === activeId) ?? CAMPAIGN_INTENTS[0];
  const activeNodes = new Set(active.route);

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead id={`${id}-title`} copy={INFLUENCER_MATCH_COPY} />

      <div
        data-layout={wide ? "split" : "rail"}
        className="mt-14 md:mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The intents ───────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>{INFLUENCER_MATCH_LABELS.intentsLabel}</span>
            <span className="text-ink/40">
              {String(CAMPAIGN_INTENTS.length).padStart(2, "0")}
            </span>
          </p>

          <ul onPointerLeave={clearPreview}>
            {CAMPAIGN_INTENTS.map((intent) => {
              const on = activeId === intent.id;
              return (
                <li key={intent.id} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={() => preview(intent.id)}
                    onFocus={() => preview(intent.id)}
                    onBlur={clearPreview}
                    onClick={() => select(intent.id)}
                    aria-current={lockedId === intent.id ? "true" : undefined}
                    className="inf-intent group"
                  >
                    <span
                      className={clsx(
                        "caps w-8 shrink-0 pt-1.5 text-left text-[0.5625rem] transition-colors duration-300",
                        on ? "text-accent" : "text-ink-muted group-hover:text-accent",
                      )}
                    >
                      {intent.index}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className={clsx(
                          "block font-display text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.2] font-medium tracking-[-0.028em] transition-colors duration-300",
                          on ? "text-ink" : "text-ink/55",
                        )}
                      >
                        {intent.name}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-[0.8125rem] leading-[1.5] transition-colors duration-300",
                          on ? "text-ink-soft" : "text-ink-muted",
                        )}
                      >
                        {intent.role}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={clsx("inf-intent-mark", on && "inf-intent-mark--on")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── The field ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0"
        >
          <div className="inf-field">
            {/* The network, evenly treated and never changed by the intent. */}
            {BACKDROP.map((place) => {
              const creator = ROSTER.find((c) => c.id === place.id);
              if (!creator) return null;
              const frame = resolveFrame(creator, "portrait");
              return (
                <span
                  key={place.id}
                  aria-hidden
                  className={`inf-node svc-drift svc-drift--${place.drift}`}
                  style={{
                    left: `${place.left}%`,
                    top: `${place.top}%`,
                    width: `${place.width}%`,
                  }}
                >
                  <span
                    className="inf-node-frame crt-zoom"
                    style={
                      {
                        aspectRatio: place.aspect,
                        "--crt-zoom": frame.zoom,
                        "--crt-origin": frame.origin,
                      } as React.CSSProperties
                    }
                  >
                    <Image
                      src={frame.src}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(max-width: 640px) 14vw, (max-width: 1023px) 10vw, 6vw"
                      style={{ objectPosition: frame.position }}
                      className="inf-node-photo object-cover"
                    />
                  </span>
                </span>
              );
            })}

            <svg aria-hidden viewBox={`0 0 ${VB_W} ${VB_H}`} fill="none" className="inf-route">
              {/* Every possible route, faint — the plans not taken. */}
              {CAMPAIGN_INTENTS.map((intent) => (
                <path
                  key={intent.id}
                  d={routePath(intent.route)}
                  stroke="var(--color-line)"
                  strokeWidth="0.22"
                />
              ))}

              {/* The chosen one. */}
              <motion.path
                key={active.id}
                d={routePath(active.route)}
                stroke="var(--color-accent)"
                strokeWidth="0.55"
                initial={{ pathLength: 0, opacity: 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              {FORMAT_NODES.map((node, i) => (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={activeNodes.has(i) ? 1.5 : 0.9}
                  className="inf-format-dot"
                  fill={activeNodes.has(i) ? "var(--color-accent)" : "var(--color-ink)"}
                  fillOpacity={activeNodes.has(i) ? 1 : 0.28}
                />
              ))}

              <circle cx={OBJECTIVE.x} cy={OBJECTIVE.y} r="2.2" fill="var(--color-accent)" />
              <circle
                cx={BRIEF.x}
                cy={BRIEF.y}
                r="2.6"
                stroke="var(--color-accent)"
                strokeWidth="0.4"
              />
            </svg>

            {/* Node labels as HTML, so the type stays crisp and themeable. */}
            {FORMAT_NODES.map((node, i) => (
              <span
                key={node.id}
                aria-hidden
                className={clsx(
                  "caps inf-format-label",
                  activeNodes.has(i) && "inf-format-label--on",
                )}
                style={{ left: `${node.x}%`, top: `${(node.y / VB_H) * 100}%` }}
              >
                {node.label}
              </span>
            ))}

            <span
              aria-hidden
              className="caps inf-endpoint"
              style={{ left: `${OBJECTIVE.x}%`, top: `${(OBJECTIVE.y / VB_H) * 100}%` }}
            >
              {INFLUENCER_MATCH_LABELS.objective}
            </span>
          </div>

          {/* ── The brief ──────────────────────────────────────────
              Typographic fields, not a dashboard. Every value is a shape a
              plan can take — generic and illustrative, never a campaign
              anybody ran and never a number. */}
          <div className="mt-8 border-t border-line pt-7">
            <p className="caps text-ink-muted">{INFLUENCER_MATCH_LABELS.briefLabel}</p>

            {/* Every intent mounted in one grid cell, so the block holds the
                height of the longest and switching never shunts the page. */}
            <div className="mt-6 grid">
              {CAMPAIGN_INTENTS.map((intent) => (
                <div
                  key={intent.id}
                  aria-hidden={intent.id !== active.id}
                  style={{ gridArea: "1 / 1" }}
                  className={clsx(
                    "transition-opacity duration-[420ms] ease-[var(--ease-out-expo)]",
                    intent.id === active.id
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="max-w-[54ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.65] text-ink/75">
                    {intent.sentence}
                  </p>

                  <dl className="mt-7 grid grid-cols-2 gap-x-6 border-t border-line sm:grid-cols-4">
                    {(
                      [
                        ["objective", intent.brief.objective],
                        ["mix", intent.brief.mix],
                        ["format", intent.brief.format],
                        ["distribution", intent.brief.distribution],
                      ] as const
                    ).map(([key, value]) => (
                      <div key={key} className="border-b border-line py-4">
                        <dt className="caps text-[0.5625rem] text-ink-muted">
                          {INFLUENCER_MATCH_LABELS.fields[key]}
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

            <p className="mt-7 max-w-[62ch] text-[0.75rem] leading-[1.7] text-ink-muted">
              {INFLUENCER_MATCH_LABELS.disclaimer}
            </p>
          </div>
        </motion.div>
      </div>
    </ServiceSection>
  );
}
