"use client";

import clsx from "clsx";

import { CREATORS_COPY, ROSTER, creatorIndex } from "@/config/creators";

/**
 * The talent index — a **matrix**, not a list.
 *
 * A single vertical column is right for five names and wrong for twenty: it
 * becomes taller than the photograph beside it and turns the directory into the
 * subject. Above `MATRIX_MIN` the roster flows into two columns instead, so
 * twenty creators read as ten compact rows and the whole roster stays visible.
 *
 * Deliberately **not** solved with an inner scroll area, pagination or a
 * carousel: nested scrolling hides creators, breaks trackpads and makes the
 * roster hostile to keyboards. Every configured creator is on the page.
 *
 * Real buttons, so keyboard and screen-reader users get the same section as
 * everyone else. Items flow **down each column** (`grid-flow-col`) while the DOM
 * order stays 01…n, so Tab order and reading order agree.
 *
 * Interaction model (state lives in Creators.tsx): hover previews, click or
 * keyboard locks, leaving the roster returns to whatever is locked. Pointer
 * entry also *warms* the creator's photograph immediately, ahead of the preview
 * debounce, so the switch has nothing left to wait for.
 *
 * The active row is marked by a teal rule growing out of the index number
 * toward the name — no pill, no chip, no filled background.
 */

/** Below this a single column reads better than a half-empty matrix. */
export const MATRIX_MIN = 7;

export function CreatorIndex({
  activeId,
  lockedId,
  columns,
  onPreview,
  onClearPreview,
  onSelect,
  onWarm,
}: {
  activeId: string;
  lockedId: string;
  /** 1 or 2. Decided by roster length and available width, in Creators.tsx. */
  columns: number;
  onPreview: (id: string) => void;
  onClearPreview: () => void;
  onSelect: (id: string) => void;
  onWarm: (id: string) => void;
}) {
  const dense = columns > 1;
  const rows = Math.ceil(ROSTER.length / columns);

  return (
    <div>
      {/* The count is `ROSTER.length` and nothing else — it describes the
          creators on this page, not the size of Mishram's network, which is
          larger and not verified. */}
      <p className="caps mb-5 flex items-baseline gap-3 text-ink-muted">
        <span>{CREATORS_COPY.rosterLabel}</span>
        <span aria-hidden>/</span>
        <span className="tabular-nums text-ink">
          {creatorIndex(ROSTER.length - 1)}
        </span>
      </p>

      <ul
        className="grid grid-flow-col"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, auto))`,
          gridAutoColumns: "minmax(0, 1fr)",
          columnGap: dense ? "1.25rem" : undefined,
        }}
        onPointerLeave={onClearPreview}
        onBlur={(e) => {
          // Only when focus leaves the roster entirely, not between rows.
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            onClearPreview();
          }
        }}
      >
        {ROSTER.map((c, i) => {
          const active = c.id === activeId;
          return (
            <li
              key={c.id}
              className={clsx(
                "border-b border-line",
                // Each column closes its own rules, so the two columns read as
                // two lists rather than one broken rail.
                i % rows === 0 && "border-t border-line",
              )}
            >
              <button
                type="button"
                // Reflects the locked choice, not the hover preview — the hover
                // is a look-ahead, the lock is the selection.
                aria-current={c.id === lockedId ? "true" : undefined}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  onWarm(c.id);
                  onPreview(c.id);
                }}
                onFocus={() => {
                  onWarm(c.id);
                  onPreview(c.id);
                }}
                onClick={() => onSelect(c.id)}
                className={clsx(
                  "group/row flex w-full items-center text-left",
                  // A two-column row is compact enough that its padding alone
                  // stops short of a comfortable tap target, so the floor is
                  // set explicitly rather than left to the font metrics.
                  dense
                    ? "min-h-12 gap-2.5 py-3 md:gap-3 md:py-3.5"
                    : "gap-4 py-4 md:py-[1.15rem]",
                )}
              >
                <span
                  className={clsx(
                    "caps shrink-0 tabular-nums transition-colors duration-300",
                    dense ? "w-[1.35rem]" : "w-6",
                    active ? "text-accent" : "text-ink-muted",
                  )}
                >
                  {creatorIndex(i)}
                </span>

                {/* The active marker. Always in the layout so nothing shifts. */}
                <span
                  aria-hidden
                  className={clsx(
                    "block shrink-0",
                    dense ? "w-2 md:w-3" : "w-8 sm:w-10",
                  )}
                >
                  <span
                    className="crt-rule w-full"
                    style={{ transform: `scaleX(${active ? 1 : 0})` }}
                  />
                </span>

                {/* min-w-0 so a long name wraps to a second line inside its
                    column instead of pushing the row wider. No ellipsis — a
                    creator's name is the one thing here that must stay whole. */}
                <span
                  className={clsx(
                    "min-w-0 font-display leading-[1.2] font-medium tracking-[-0.02em] transition-colors duration-300",
                    dense
                      ? "text-[clamp(0.9375rem,1.05vw,1.125rem)]"
                      : "text-[clamp(1rem,1.35vw,1.35rem)]",
                    active ? "text-ink" : "text-ink-soft group-hover/row:text-ink",
                  )}
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
