"use client";

import clsx from "clsx";
import Image from "next/image";
import { motion } from "motion/react";

import {
  CREATORS,
  resolveFrame,
  type Creator,
} from "@/config/creators";
import {
  SOCIAL_BOARD_COPY,
  SOCIAL_BOARD_PILLARS,
  type BoardPillarId,
} from "@/config/service-social";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  EASE,
  ServiceSection,
  ServiceSectionHead,
} from "../ServiceSection";

/**
 * THE CONTENT SYSTEM BOARD — this page's signature interaction.
 *
 * Five kinds of communication a personal brand repeats, and one board that
 * reconfigures into whichever one the visitor is looking at. The argument the
 * interaction makes is the section's thesis: a personal brand is not a stream
 * of posts, it is a small set of repeatable signals used deliberately.
 *
 * **NO FAKE SOCIAL UI ANYWHERE.** No profile header, no follower count, no
 * likes, comments, reach, engagement rate, chart or metric — inventing any of
 * them would be exactly the fabrication §1 forbids, and a mocked-up feed would
 * make this page a worse advertisement for the work than an abstract one. Every
 * state is structure: hairlines, frames, formats and one real photographic
 * crop. The only words inside the board are format names.
 *
 * Selection is the pattern §03/§04/§05 already prove — hover previews, click
 * locks, leaving restores the lock, previews debounced 90ms, `aria-current` on
 * the lock and never the preview. Rows are real `<button>`s, so focus previews
 * and Enter locks, and **every pillar's sentence is real DOM text at all
 * times** — the drawing never carries the explanation alone.
 */

const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

/** The one photographic state. A real creator, from the verified roster. */
function personalityCreator(): Creator {
  const found = CREATORS.find((c) => c.id === "mukul");
  if (!found) throw new Error("ContentSystemBoard: creator is not configured");
  return found;
}

const PERSON = personalityCreator();

export function ContentSystemBoard({ id }: { id: string }) {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } =
    useHoverLock<BoardPillarId>(SOCIAL_BOARD_PILLARS[0].id);

  const active =
    SOCIAL_BOARD_PILLARS.find((p) => p.id === activeId) ??
    SOCIAL_BOARD_PILLARS[0];

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <ServiceSectionHead id={`${id}-title`} copy={SOCIAL_BOARD_COPY} />

      <div
        data-layout={wide ? "split" : "rail"}
        className="mt-14 md:mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8"
      >
        {/* ── The board ─────────────────────────────────────────
            Rendered first in the DOM on narrow so the visual is not buried
            under five rows on a phone; the grid puts it on the right at
            desktop widths. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="lg:order-2 lg:col-span-7 lg:col-start-6"
        >
          <div className="svp-board">
            {SOCIAL_BOARD_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                aria-hidden
                className={clsx(
                  "svp-board-state",
                  pillar.id === active.id && "svp-board-state--on",
                )}
              >
                <BoardState id={pillar.id} />
              </div>
            ))}

            {/* The board's own baseline — the only chrome it has. */}
            <span aria-hidden className="svp-board-baseline" />
          </div>

          {/* The active pillar, in words. Every one is mounted in the same
              grid cell, so the block holds the height of the longest and
              switching never shunts the page below it (§10d-notes). */}
          <div className="mt-8 grid border-t border-line pt-7">
            {SOCIAL_BOARD_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                aria-hidden={pillar.id !== active.id}
                style={{ gridArea: "1 / 1" }}
                className={clsx(
                  "transition-opacity duration-[420ms] ease-[var(--ease-out-expo)]",
                  pillar.id === active.id
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                <p className="max-w-[54ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.65] text-ink/75">
                  {pillar.sentence}
                </p>
                <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  {pillar.formats.map((format, i) => (
                    <li key={format} className="flex items-center gap-5">
                      {i > 0 ? (
                        <span
                          aria-hidden
                          className="block h-2.5 w-px bg-line-strong"
                        />
                      ) : null}
                      <span className="caps text-ink-muted">{format}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── The index ─────────────────────────────────────── */}
        <div className="mt-12 lg:order-1 lg:col-span-4 lg:mt-0">
          <p className="caps flex items-baseline justify-between gap-4 border-b border-line pb-4 text-ink-muted">
            <span>Content pillars</span>
            <span className="text-ink/40">
              {String(SOCIAL_BOARD_PILLARS.length).padStart(2, "0")}
            </span>
          </p>

          <ul onPointerLeave={clearPreview}>
            {SOCIAL_BOARD_PILLARS.map((pillar) => {
              const on = activeId === pillar.id;
              return (
                <li key={pillar.id} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={() => preview(pillar.id)}
                    onFocus={() => preview(pillar.id)}
                    onBlur={clearPreview}
                    onClick={() => select(pillar.id)}
                    aria-current={lockedId === pillar.id ? "true" : undefined}
                    className="svp-board-row group"
                  >
                    <span className="caps w-8 shrink-0 pt-1.5 text-left text-[0.5625rem] text-ink-muted transition-colors duration-300 group-hover:text-accent">
                      {pillar.index}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className={clsx(
                          "block font-display text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.2] font-medium tracking-[-0.028em] transition-colors duration-300",
                          on ? "text-ink" : "text-ink/55",
                        )}
                      >
                        {pillar.name}
                      </span>
                      <span
                        className={clsx(
                          "mt-2 block text-[0.8125rem] leading-[1.5] transition-colors duration-300",
                          on ? "text-ink-soft" : "text-ink-muted",
                        )}
                      >
                        {pillar.role}
                      </span>
                    </span>
                    {/* A rule that grows toward the name. No pill, no fill. */}
                    <span
                      aria-hidden
                      className={clsx(
                        "svp-board-mark",
                        on && "svp-board-mark--on",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ServiceSection>
  );
}

/* ══════════════════════════════════════════════════════════════════
   THE FIVE STATES

   All structure. The board's aspect is fixed at 7/5 and every SVG below uses
   `viewBox="0 0 140 100"`, which is that exact ratio — so strokes stay uniform
   hairlines and nothing has to be re-checked at a second viewport.
   ══════════════════════════════════════════════════════════════════ */

function BoardState({ id }: { id: BoardPillarId }) {
  switch (id) {
    case "positioning":
      return <PositioningState />;
    case "education":
      return <EducationState />;
    case "personality":
      return <PersonalityState />;
    case "proof":
      return <ProofState />;
    case "community":
      return <CommunityState />;
  }
}

/** A statement resolving, and the axis it sits on. No invented headline. */
function PositioningState() {
  return (
    <>
      <span className="svp-state-block" style={{ left: "9%", top: "18%", width: "52%" }}>
        <span className="svp-typeline svp-typeline--accent" />
        <span className="svp-typeline" style={{ width: "88%" }} />
        <span className="svp-typeline" style={{ width: "62%" }} />
        <span className="svp-typeline" style={{ width: "34%" }} />
      </span>

      <svg viewBox="0 0 140 100" fill="none" className="svp-state-svg">
        <path d="M12 78 H128" stroke="var(--color-line-strong)" strokeWidth="0.4" />
        <path d="M12 74 V82" stroke="var(--color-line-strong)" strokeWidth="0.4" />
        <path d="M128 74 V82" stroke="var(--color-line-strong)" strokeWidth="0.4" />
        <path d="M84 72 V84" stroke="var(--color-accent)" strokeWidth="1" />
        <path
          d="M96 22 H128 M96 30 H120 M96 38 H126"
          stroke="var(--color-line)"
          strokeWidth="0.5"
        />
      </svg>

      <span className="caps svp-state-label" style={{ left: "9%", top: "62%" }}>
        Voice
      </span>
      <span className="caps svp-state-label" style={{ left: "68%", top: "84%" }}>
        Audience
      </span>
    </>
  );
}

/** One format, repeated as a series. The point is the recurrence. */
function EducationState() {
  return (
    <>
      <span
        className="svp-state-frame"
        style={{ left: "10%", top: "14%", width: "24%", aspectRatio: "4 / 5" }}
      >
        <span className="svp-frame-rows">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="svp-frame-row" style={{ width: `${88 - i * 13}%` }} />
          ))}
        </span>
      </span>

      <span
        className="svp-state-frame svp-state-frame--ghost"
        style={{ left: "17%", top: "22%", width: "24%", aspectRatio: "4 / 5" }}
      />

      <svg viewBox="0 0 140 100" fill="none" className="svp-state-svg">
        <path d="M62 26 H126" stroke="var(--color-line)" strokeWidth="0.5" />
        <path d="M62 42 H126" stroke="var(--color-line)" strokeWidth="0.5" />
        <path d="M62 58 H126" stroke="var(--color-line)" strokeWidth="0.5" />
        <path d="M62 74 H126" stroke="var(--color-line)" strokeWidth="0.5" />
        <path d="M62 22 V78" stroke="var(--color-accent)" strokeWidth="0.9" />
        {[26, 42, 58, 74].map((y) => (
          <circle key={y} cx="62" cy={y} r="1.4" fill="var(--color-accent)" />
        ))}
      </svg>

      <span className="caps svp-state-label" style={{ left: "45%", top: "13%" }}>
        Series
      </span>
      <span className="caps svp-state-label" style={{ left: "10%", top: "86%" }}>
        Format 4:5
      </span>
    </>
  );
}

/** The one photographic state: a person, and the takes around them. */
function PersonalityState() {
  const frame = resolveFrame(PERSON, "reel");

  return (
    <>
      <span
        className="svp-state-photo crt-zoom"
        style={
          {
            left: "11%",
            top: "10%",
            width: "22%",
            aspectRatio: "9 / 16",
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
          /* MEASURED, not estimated (Rev 39). The old value —
             `18vw / 14vw / 9vw` — under-declared this frame at every
             breakpoint, so the browser fetched a candidate narrower than the
             box and the photograph rendered soft even at DPR 1: a 286px box
             was served a 129px file.

             The frame sits inside `.svc-stage-box`, which letterboxes to a
             fixed aspect, so its width does **not** track the viewport the way
             a `vw` estimate assumes. Measured: 33.7vw at 390, 34.7vw at 768,
             19.9vw at 1440. `sizes` changes which srcset candidate is chosen
             and nothing else, so this has no layout effect. */
          sizes="(max-width: 640px) 34vw, (max-width: 1023px) 35vw, 20vw"
          style={{ objectPosition: frame.position }}
          className="svp-photo object-cover"
        />
        <span aria-hidden className="svp-veil" />
        <span aria-hidden className="svp-tag">
          Reel / 9:16
        </span>
      </span>

      {/* The same format, again and again — takes, not a gallery. */}
      {[40, 58, 76].map((left, i) => (
        <span
          key={left}
          className="svp-state-frame"
          style={{
            left: `${left}%`,
            top: `${16 + i * 5}%`,
            width: "16%",
            aspectRatio: "9 / 16",
            opacity: 0.9 - i * 0.24,
          }}
        />
      ))}

      <svg viewBox="0 0 140 100" fill="none" className="svp-state-svg">
        <path
          d="M48 88 H128"
          stroke="var(--color-line-strong)"
          strokeWidth="0.4"
        />
        <path d="M48 88 H74" stroke="var(--color-accent)" strokeWidth="1" />
      </svg>

      <span className="caps svp-state-label" style={{ left: "34%", top: "90%" }}>
        Recurring
      </span>
    </>
  );
}

/** A record, not a testimonial. No stars, no figures, no attributed words. */
function ProofState() {
  return (
    <>
      <span
        className="svp-state-block svp-state-panel"
        style={{ left: "9%", top: "20%", width: "42%" }}
      >
        <span aria-hidden className="tst-mark">
          &ldquo;
        </span>
        <span className="svp-typeline" style={{ width: "92%" }} />
        <span className="svp-typeline" style={{ width: "78%" }} />
        <span className="svp-typeline" style={{ width: "44%" }} />
      </span>

      {/* A small stack of records behind one another. */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="svp-state-frame"
          style={{
            left: `${62 + i * 4}%`,
            top: `${22 + i * 9}%`,
            width: "26%",
            aspectRatio: "16 / 10",
            opacity: 1 - i * 0.28,
          }}
        />
      ))}

      <span className="caps svp-state-label" style={{ left: "9%", top: "80%" }}>
        Work record
      </span>
    </>
  );
}

/** Distribution that comes from people. No platform icons, ever. */
function CommunityState() {
  const nodes: readonly [number, number][] = [
    [104, 18],
    [122, 34],
    [116, 56],
    [126, 74],
    [92, 82],
    [88, 40],
  ];

  return (
    <>
      <svg viewBox="0 0 140 100" fill="none" className="svp-state-svg">
        {nodes.map(([x, y], i) => (
          <path
            key={`${x}-${y}`}
            d={`M40 50 C ${(40 + x) / 2} ${50 + (y - 50) * 0.15}, ${(40 + x) / 2} ${y}, ${x} ${y}`}
            stroke={i < 2 ? "var(--color-accent)" : "var(--color-line-strong)"}
            strokeOpacity={i < 2 ? 0.75 : 1}
            strokeWidth="0.45"
          />
        ))}
        {/* Two of them coming back — the half that is not broadcast. */}
        <path
          d="M104 18 C 82 24, 66 34, 44 46"
          stroke="var(--color-accent)"
          strokeOpacity="0.4"
          strokeWidth="0.45"
          strokeDasharray="2 2.5"
        />
        {nodes.map(([x, y]) => (
          <circle
            key={`n-${x}-${y}`}
            cx={x}
            cy={y}
            r="1.5"
            fill="var(--color-ink)"
            fillOpacity="0.35"
          />
        ))}
        <circle cx="40" cy="50" r="3.4" fill="var(--color-accent)" />
      </svg>

      <span className="caps svp-state-label" style={{ left: "20%", top: "62%" }}>
        You
      </span>
      <span className="caps svp-state-label" style={{ left: "62%", top: "88%" }}>
        Conversation
      </span>
    </>
  );
}
