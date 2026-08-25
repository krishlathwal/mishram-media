"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import type { ServiceScopeItem, ServiceSectionCopy } from "@/config/service-pages";
import { useHoverLock } from "@/hooks/useHoverLock";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * WHAT'S INCLUDED — a typographic scope index.
 *
 * **No icons, and no feature grid.** A numbered index of what the engagement
 * covers, with one item explained at a time beside it. The same pattern carries
 * to the other four service pages with different rows; only the words change.
 *
 * The wide layout needs room for an index and a whole detail column, so below
 * `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` — a portrait tablet
 * included, however wide it looks — the rows expand in place instead. Shape
 * first, device classification second (§11).
 */
const WIDE_QUERY = "(min-width: 1024px) and (min-aspect-ratio: 5 / 4)";

export function ServiceScope({
  id,
  copy,
  items,
  accessory,
}: {
  id: string;
  copy: ServiceSectionCopy;
  items: readonly ServiceScopeItem[];
  /**
   * An optional page-specific mark rendered beneath the active detail on the
   * wide layout. The index itself is shared vocabulary — this is the slot that
   * stops five service pages having an identical scope section, without any of
   * them forking the component.
   */
  accessory?: React.ReactNode;
}) {
  const wide = useMediaQuery(WIDE_QUERY);
  const { activeId, lockedId, preview, clearPreview, select } = useHoverLock(
    items[0].id,
  );

  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="full">
      <ServiceSectionHead id={`${id}-title`} copy={copy} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.85, ease: EASE }}
        className="mt-14 md:mt-16 lg:mt-20"
        data-layout={wide ? "split" : "rail"}
      >
        {wide ? (
          <div className="grid grid-cols-12 gap-x-8">
            <ul
              className="col-span-6 border-t border-line"
              onPointerLeave={clearPreview}
            >
              {items.map((item) => (
                <li key={item.id} className="border-b border-line">
                  <button
                    type="button"
                    onPointerEnter={() => preview(item.id)}
                    onFocus={() => preview(item.id)}
                    onBlur={clearPreview}
                    onClick={() => select(item.id)}
                    aria-current={lockedId === item.id ? "true" : undefined}
                    className="svp-scope-row group"
                  >
                    <span className="caps w-9 shrink-0 text-left text-[0.5625rem] text-ink-muted transition-colors duration-300 group-hover:text-accent">
                      {item.index}
                    </span>
                    <span
                      aria-hidden
                      className="svp-scope-slash caps text-ink-muted/50"
                    >
                      /
                    </span>
                    <span
                      className={clsx(
                        "font-display text-[clamp(1.05rem,1.55vw,1.4rem)] leading-[1.2] font-medium tracking-[-0.028em] transition-colors duration-300",
                        activeId === item.id ? "text-ink" : "text-ink/55",
                      )}
                    >
                      {item.name}
                    </span>
                    {/* A rule that grows out of the number toward the name —
                        no pill, no fill, no chip. */}
                    <span
                      aria-hidden
                      className={clsx(
                        "svp-scope-mark",
                        activeId === item.id && "svp-scope-mark--on",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* The detail. Every item is mounted in the same grid cell, so the
                panel holds the height of the longest one and switching never
                shunts the page (the lesson §10d-notes records). */}
            <div className="col-span-5 col-start-8 grid">
              {items.map((item) => (
                <div
                  key={item.id}
                  aria-hidden={item.id !== active.id}
                  style={{ gridArea: "1 / 1" }}
                  className={clsx(
                    "transition-opacity duration-[420ms] ease-[var(--ease-out-expo)]",
                    item.id === active.id
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <p
                    aria-hidden
                    className="font-display text-[clamp(3rem,5.4vw,4.5rem)] leading-[0.9] font-medium tracking-[-0.04em] text-ink/12"
                  >
                    {item.index}
                  </p>
                  <p className="mt-6 font-display text-[clamp(1.15rem,1.7vw,1.55rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink">
                    {item.name}
                  </p>
                  <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-[1.7] text-ink/70">
                    {item.detail}
                  </p>
                  {accessory ? <div className="mt-9">{accessory}</div> : null}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ul className="border-t border-line">
            {items.map((item) => {
              const open = activeId === item.id;
              return (
                <li key={item.id} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => select(item.id)}
                    aria-expanded={open}
                    aria-controls={`${id}-${item.id}`}
                    className="svp-scope-row group w-full"
                  >
                    <span className="caps w-9 shrink-0 text-left text-[0.5625rem] text-ink-muted">
                      {item.index}
                    </span>
                    <span
                      aria-hidden
                      className="svp-scope-slash caps text-ink-muted/50"
                    >
                      /
                    </span>
                    <span
                      className={clsx(
                        "text-left font-display text-[1.0625rem] leading-[1.25] font-medium tracking-[-0.028em]",
                        open ? "text-ink" : "text-ink/65",
                      )}
                    >
                      {item.name}
                    </span>
                  </button>

                  {/* Always mounted, so `aria-controls` names something real;
                      `inert` keeps the closed ones out of the accessibility
                      tree. The transition is the shared CSS disclosure. */}
                  <div
                    id={`${id}-${item.id}`}
                    inert={!open}
                    data-open={open ? "true" : "false"}
                    className="svp-disclosure"
                  >
                    <div>
                      <p className="max-w-[52ch] pb-6 pl-[3.375rem] text-[0.9375rem] leading-[1.7] text-ink/70">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </ServiceSection>
  );
}
