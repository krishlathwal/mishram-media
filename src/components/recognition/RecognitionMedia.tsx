"use client";

import Image from "next/image";

import type { RecognitionItem } from "@/config/recognition";

/**
 * One piece of evidence. Full-colour, thin editorial frame, and a factual
 * annotation that is real DOM text rather than a hover-only reveal — the
 * caption is the claim, so it must be readable without a pointer.
 *
 * Hover strengthens rather than reveals: the frame lifts, the hairline goes
 * teal, saturation comes to full, and the annotation brightens.
 */
export function RecognitionMedia({
  item,
  /** Index in the archive, used for the `RECOGNITION / 01` style fallback. */
  position,
  /** The dominant frame carries the fuller label. */
  dominant = false,
  /**
   * Put the caption in its own column beside the frame instead of beneath it.
   *
   * Used only when the archive holds a **single** item, where the fragment
   * column would otherwise be five empty columns of canvas — reviewed on a real
   * screenshot and it read as an unbalanced left-aligned banner rather than an
   * editorial archive. Beside the frame it becomes a museum label: the evidence
   * on the left, what it is on the right. The two- and three-item compositions
   * are untouched, because there the fragments already occupy that column.
   */
  aside = false,
  sizes,
  className,
}: {
  item: RecognitionItem;
  position: number;
  dominant?: boolean;
  aside?: boolean;
  sizes: string;
  className?: string;
}) {
  // Most specific factual line available, never padded with a guess.
  const detail = [item.organisation, item.year].filter(Boolean).join(" · ");

  return (
    <figure
      className={`rcg-item ${
        aside ? "lg:grid lg:grid-cols-11 lg:items-start lg:gap-x-8" : ""
      } ${className ?? ""}`}
    >
      <div
        className={aside ? "lg:col-span-7" : undefined}
        style={{ aspectRatio: item.aspect ?? "4 / 3" }}
        // The aspect lives on this wrapper so the frame fills it exactly.
      >
        <div className="rcg-frame h-full w-full">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes={sizes}
            style={{ objectPosition: item.focus ?? "50% 50%" }}
            className="rcg-photo object-cover"
          />
          <span aria-hidden className="rcg-veil" />
          {/* The in-frame mark renders **only as a fallback**, when there is no
              organisation or year to put in the caption. With both present it
              was the identical string twice, 60px apart — and, sitting in ink
              over pale photography, the copy inside the frame was the illegible
              one. Both problems were visible the moment the section was
              screenshotted. */}
          {detail ? null : (
            <span aria-hidden className="rcg-tag">
              {`${item.type} / ${String(position).padStart(2, "0")}`}
            </span>
          )}
        </div>
      </div>

      <figcaption
        className={
          aside
            ? "mt-6 max-w-[34ch] lg:col-span-4 lg:col-start-8 lg:mt-0"
            : dominant
              ? "mt-5 max-w-[46ch]"
              : "mt-3.5 max-w-[34ch]"
        }
      >
        <span
          className={
            dominant
              ? "block font-display text-[clamp(1.05rem,1.5vw,1.45rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink"
              : "block font-display text-[0.9375rem] leading-[1.25] font-medium tracking-[-0.02em] text-ink"
          }
        >
          {item.title}
        </span>

        {detail ? (
          <span className="caps mt-2.5 block text-ink-muted">{detail}</span>
        ) : null}

        {item.caption ? (
          <span
            className={
              dominant
                ? "mt-3 block text-[0.875rem] leading-[1.6] text-ink-soft"
                : "mt-2 block text-[0.8125rem] leading-[1.6] text-ink-soft"
            }
          >
            {item.caption}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
