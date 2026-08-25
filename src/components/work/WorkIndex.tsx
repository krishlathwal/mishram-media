"use client";

import { WORK_ITEMS } from "@/config/work";

/**
 * The work index. Only real entries — no `COMING SOON` rows, and no invented
 * project names padding it out to look fuller than the portfolio is.
 *
 * Same control pattern as §03 and §04: real buttons, hover previews, click
 * locks, `aria-current` tracks the lock rather than the preview.
 */
export function WorkIndex({
  activeId,
  lockedId,
  onPreview,
  onClearPreview,
  onSelect,
  className,
}: {
  activeId: string;
  lockedId: string;
  onPreview: (id: string) => void;
  onClearPreview: () => void;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <ul
      className={`border-t border-line ${className ?? ""}`}
      onPointerLeave={onClearPreview}
      onBlur={(e) => {
        // Only when focus leaves the index entirely, not between rows.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onClearPreview();
        }
      }}
    >
      {WORK_ITEMS.map((w, i) => {
        const active = w.id === activeId;
        return (
          <li key={w.id} className="border-b border-line">
            <button
              type="button"
              aria-current={w.id === lockedId ? "true" : undefined}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") onPreview(w.id);
              }}
              onFocus={() => onPreview(w.id)}
              onClick={() => onSelect(w.id)}
              className="group/row flex w-full items-baseline gap-4 py-4 text-left md:py-[1.05rem]"
            >
              <span
                className={`caps w-6 shrink-0 tabular-nums transition-colors duration-300 ${
                  active ? "text-accent" : "text-ink-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Active marker. Always in layout so nothing shifts. */}
              <span aria-hidden className="block w-7 shrink-0 self-center sm:w-9">
                <span
                  className="wrk-rule w-full"
                  style={{ transform: `scaleX(${active ? 1 : 0})` }}
                />
              </span>

              <span className="min-w-0">
                <span
                  className={`block truncate font-display text-[clamp(0.95rem,1.15vw,1.15rem)] leading-tight font-medium tracking-[-0.02em] transition-colors duration-300 ${
                    active ? "text-ink" : "text-ink-soft group-hover/row:text-ink"
                  }`}
                >
                  {w.title}
                </span>
                <span className="caps mt-1.5 block text-[0.5rem] text-ink-muted">
                  {w.type}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
