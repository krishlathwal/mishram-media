import clsx from "clsx";

import type { SurfaceRow } from "@/config/service-performance";

/**
 * ONE ABSTRACT CREATIVE SURFACE — the page's smallest unit, and the reason it
 * can talk about creative testing without fabricating anything.
 *
 * A surface is a stack of structural rows: lines of type, a media region, and
 * the thing being clicked. **There are no words in it, no imagery and no
 * numbers.** That is deliberate three times over:
 *
 * - A headline written into a mockup is a claim nobody wrote, and on a
 *   performance page it would read as copy from a campaign that ran.
 * - A logo or a recognisable product implies a client relationship the project
 *   cannot evidence, and §9's excluded categories can never reach the DOM if
 *   nothing in here names a company at all.
 * - **A figure would be a fabrication.** No impression, click, cost or return
 *   appears on any surface on this route.
 *
 * What is left is exactly what a structural test actually varies — hierarchy,
 * weight, proportion, shape and where the ask sits — which is the honest thing
 * to draw.
 *
 * Padding and gaps are percentages of the surface's own width, so the inner
 * structure shrinks with the composition instead of overflowing it. That is
 * §10j's fragment lesson: fixed rem padding held at 1440 and clipped at 390.
 */
export function CreativeSurface({
  rows,
  aspect,
  className,
  style,
  tone = "wire",
}: {
  rows: readonly SurfaceRow[];
  aspect: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * `wire` is the schematic treatment the test bench uses — hairlines in a
   * laboratory field. `media` is denser and tonal, so the variant wall reads as
   * compositions rather than as a second set of wireframes.
   */
  tone?: "wire" | "media";
}) {
  return (
    <span
      className={clsx("pfm-surface", tone === "media" && "pfm-surface--media", className)}
      style={{ aspectRatio: aspect, ...style }}
    >
      {rows.map((row, i) => {
        if (row.k === "block") {
          return (
            <span
              key={i}
              className="pfm-row-block"
              style={{ flexGrow: row.grow ?? 1 }}
            />
          );
        }

        if (row.k === "action") {
          return (
            <span
              key={i}
              className={clsx("pfm-row-action", row.outline && "pfm-row-action--outline")}
              style={{ width: `${row.w}%` }}
            />
          );
        }

        return (
          <span
            key={i}
            className={clsx("pfm-row-rule", row.strong && "pfm-row-rule--strong")}
            style={{ width: `${row.w}%` }}
          />
        );
      })}
    </span>
  );
}
