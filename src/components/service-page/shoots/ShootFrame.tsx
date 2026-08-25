import clsx from "clsx";
import Image from "next/image";

import { ROSTER, resolveFrame, type FrameKind } from "@/config/creators";

/**
 * ONE PHOTOGRAPHIC FRAME — the unit every composition on this page is built
 * from.
 *
 * It reuses §10b's tuned per-creator crops through `resolveFrame` rather than
 * guessing new ones: five approved photographs, each art-directed into three
 * genuine re-crops, which is what lets this page be photographic on **five
 * source files**. See the audit at the head of `config/service-shoots.ts` for
 * why five is the whole library.
 *
 * **Size buckets, and they matter here more than anywhere.** Next generates a
 * different `srcset` entry per distinct `sizes`, so five sources with a dozen
 * bespoke `sizes` strings become a dozen separate downloads of the same
 * photographs. Every frame on this route therefore picks one of **three**
 * buckets, so one source resolves to at most three fetched variants and the
 * browser cache does the rest.
 *
 * **Alt text is factual and never repeated.** The roster's own `alt` describes
 * what is in the picture ("Portrait of creator Zoya Jaan…") and never what it
 * achieved. A frame that repeats a photograph already described in the same
 * composition is decorative — `alt=""` plus `aria-hidden` — so a screen reader
 * hears each person once rather than once per crop.
 */

const SIZES = {
  lg: "(max-width: 640px) 72vw, (max-width: 1023px) 42vw, 30vw",
  md: "(max-width: 640px) 44vw, (max-width: 1023px) 26vw, 18vw",
  sm: "(max-width: 640px) 30vw, (max-width: 1023px) 17vw, 11vw",
} as const;

export type FrameSize = keyof typeof SIZES;

export function ShootFrame({
  creatorId,
  kind,
  aspect,
  size = "md",
  tag,
  described = false,
  eager = false,
  className,
  style,
}: {
  creatorId: string;
  kind: FrameKind;
  /** CSS aspect string. The frame crops to it — the crop *is* the subject. */
  aspect: string;
  size?: FrameSize;
  /** Format and index only. Never a client, a camera or a date. */
  tag?: string;
  /** True on the one frame that carries this photograph's alt in a composition. */
  described?: boolean;
  /** The route's single above-the-fold LCP candidate. Exactly one. */
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const creator = ROSTER.find((c) => c.id === creatorId);
  if (!creator) return null;

  const frame = resolveFrame(creator, kind);

  return (
    <span
      className={clsx("sht-frame crt-zoom", className)}
      style={
        {
          aspectRatio: aspect,
          "--crt-zoom": frame.zoom,
          "--crt-origin": frame.origin,
          ...style,
        } as React.CSSProperties
      }
    >
      <Image
        src={frame.src}
        alt={described ? creator.alt : ""}
        aria-hidden={described ? undefined : true}
        fill
        sizes={SIZES[size]}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        style={{ objectPosition: frame.position }}
        className="sht-photo object-cover"
      />
      <span aria-hidden className="sht-veil" />
      {tag ? (
        <span aria-hidden className="sht-tag">
          {tag}
        </span>
      ) : null}
    </span>
  );
}
