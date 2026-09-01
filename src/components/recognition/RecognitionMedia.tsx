"use client";

import Image from "next/image";
import type { ReactNode } from "react";

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
   *
   * **The split is 8 / 3, not 7 / 4** (Rev 36). With one photograph carrying
   * the whole chapter the evidence has to read as evidence, and 946px does
   * what 824px did not; the label still holds its title on one line and the
   * action anchors its foot. Both were rendered before the choice was made.
   * `sizes` in `Recognition.tsx` is measured against this split — **move one
   * and re-measure the other.**
   */
  aside = false,
  /**
   * The chapter's one text action, rendered at the **foot of the museum
   * label** instead of under the archive.
   *
   * A slot rather than a fork (§18): against a 4:3 frame the label bottomed
   * out around 180px beside a 618px photograph and left half a column of empty
   * canvas — visible the moment the section was captured, and invisible to
   * every measurement that preceded it (§10q). Anchoring the action to the
   * column's foot finishes the label *and* takes the action's own band out of
   * the section, which is what paid for the wider frame beside it.
   *
   * Only the single-item (`aside`) state passes it. With fragments present
   * that column is already occupied, so the action stays under the archive.
   */
  action,
  sizes,
  className,
}: {
  item: RecognitionItem;
  position: number;
  dominant?: boolean;
  aside?: boolean;
  action?: ReactNode;
  sizes: string;
  className?: string;
}) {
  // Most specific factual line available, never padded with a guess.
  const detail = [item.organisation, item.year].filter(Boolean).join(" · ");

  return (
    <figure
      className={`rcg-item ${
        aside ? "lg:grid lg:grid-cols-11 lg:gap-x-8" : ""
      } ${className ?? ""}`}
    >
      <div
        // `lg:self-start` matters: the row is left on the default `stretch` so
        // the label column can fill it and hang its action off the bottom, and
        // without this the frame would stretch too and fight its own
        // `aspect-ratio`.
        className={aside ? "lg:col-span-8 lg:self-start" : undefined}
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
            ? "mt-6 max-w-[34ch] lg:col-span-3 lg:col-start-9 lg:mt-0 lg:flex lg:flex-col"
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

        {/* `mt-auto` only bites once the column is a flex box with a height to
            fill, which is the `aside` case. Below `lg` it collapses to normal
            flow directly under the caption, which is the right reading order
            on a phone. */}
        {action ? <span className="mt-10 block lg:mt-auto lg:pt-10">{action}</span> : null}
      </figcaption>
    </figure>
  );
}
