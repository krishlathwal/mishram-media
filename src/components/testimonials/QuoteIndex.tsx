"use client";

import clsx from "clsx";

import { TESTIMONIALS } from "@/config/testimonials";

/**
 * The quote index — `01 / NAME`, hairline-separated.
 *
 * Real buttons, so keyboard and screen-reader users get the same section:
 * focusing a row previews it exactly as hovering does, Enter locks it.
 *
 * The active marker is deliberately **not** the marker either neighbouring
 * section uses: 03 / Creators grows a rule between the number and the name, and
 * the Mishram Difference runs a connector into a vertical axis. Here it is the
 * site's own hairline sweep under the name — typographic, and it costs no
 * horizontal space, which is what keeps a long client name whole.
 */
export function QuoteIndex({
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
  return (
    <ul
      className="border-t border-line"
      onPointerLeave={onClearPreview}
      onBlur={(e) => {
        // Only when focus leaves the index entirely, not between rows.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onClearPreview();
        }
      }}
    >
      {TESTIMONIALS.map((t, i) => {
        const active = t.id === activeId;
        return (
          <li key={t.id} className="border-b border-line">
            <button
              type="button"
              // Tracks the locked choice, never the hover preview.
              aria-current={t.id === lockedId ? "true" : undefined}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") onPreview(t.id);
              }}
              onFocus={() => onPreview(t.id)}
              onClick={() => onSelect(t.id)}
              className="group/row flex min-h-12 w-full items-center gap-3.5 py-3.5 text-left md:py-4"
            >
              <span
                className={clsx(
                  "caps shrink-0 tabular-nums transition-colors duration-300",
                  active ? "text-accent" : "text-ink-muted",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span aria-hidden className="caps shrink-0 text-ink-muted/50">
                /
              </span>

              <span
                className={clsx(
                  "relative min-w-0 text-[0.9375rem] leading-[1.25] font-medium transition-colors duration-300",
                  active ? "text-ink" : "text-ink-soft group-hover/row:text-ink",
                )}
              >
                {t.author}
                <span
                  aria-hidden
                  className={clsx(
                    "absolute -bottom-1 left-0 h-px w-full bg-accent transition-transform duration-[460ms] ease-[var(--ease-out-expo)]",
                    active
                      ? "origin-left scale-x-100"
                      : "origin-right scale-x-0",
                  )}
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
