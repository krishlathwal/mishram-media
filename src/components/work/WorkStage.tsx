"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";

import { WORK_ITEMS, type WorkItem } from "@/config/work";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { WorkMedia } from "./WorkMedia";

/**
 * The composition: one dominant 9:16 surface, one supporting 4:5 fragment
 * overlapping its lower-right, and the work's metadata to the right.
 *
 * Every item's frames are mounted and switched by clip path, the same technique
 * §03 uses — so switching a work item is a wipe rather than a source swap, and
 * the small local posters are all fetched with the section. The `<video>` inside
 * `WorkMedia` mounts **only for the active item**, so however many reels this
 * index eventually holds, exactly one can ever be decoding.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function variants(reduced: boolean) {
  if (reduced) {
    return {
      out: { opacity: 0, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
      in: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
    };
  }
  return {
    out: { opacity: 0.45, clipPath: "inset(0% 0% 100% 0%)", scale: 1.04, y: -12 },
    in: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1, y: 0 },
  };
}

function Layer({
  item,
  active,
  reduced,
  order,
  className,
  children,
}: {
  item: WorkItem;
  active: boolean;
  reduced: boolean;
  order: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={item.id}
      aria-hidden={!active}
      className={className}
      style={{ zIndex: active ? 2 : 1, pointerEvents: active ? "auto" : "none" }}
      initial={false}
      animate={active ? "in" : "out"}
      variants={variants(reduced)}
      transition={{
        duration: reduced ? 0.2 : 0.5,
        ease: EASE,
        delay: reduced ? 0 : order * 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}

export function WorkStage({
  activeId,
  sectionInView,
  compact = false,
}: {
  activeId: string;
  sectionInView: boolean;
  /** Stacked layout: primary media only, no supporting fragment. */
  compact?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const onPlayingChange = useCallback((v: boolean) => setPlaying(v), []);

  return (
    // Drops the crop and drift animations while a reel runs — from then on the
    // content is the motion and decoration would compete with it.
    <div
      className="relative h-full w-full"
      data-playing={playing ? "true" : "false"}
    >
      {/* The primary box. On the wide layout its width comes from its own
          aspect against the stage height, which is why the supporting fragment
          lives *inside* it — percentages there resolve against the reel, not
          against the much wider stage column. */}
      <div
        className={
          compact
            ? "relative w-full"
            : "absolute top-0 left-0 h-full"
        }
        style={{ aspectRatio: "9 / 16" }}
      >
        {WORK_ITEMS.map((w) => (
          <Layer
            key={w.id}
            item={w}
            active={w.id === activeId}
            reduced={reduced}
            order={0}
            className="absolute inset-0"
          >
            <WorkMedia
              item={w}
              active={w.id === activeId}
              sectionInView={sectionInView}
              aspect="9 / 16"
              crop="primary"
              primary
              onPlayingChange={onPlayingChange}
              className="wrk-crop h-full w-full"
              sizes={
                compact
                  ? "(max-width: 639px) 88vw, 17rem"
                  : "(max-width: 1279px) 26vw, 20vw"
              }
            />
          </Layer>
        ))}

        {/* Supporting fragment — a different crop of the same asset, hung off
            the reel's lower-right edge for depth. Wide layout only: at narrow
            widths it would only steal room from the reel. */}
        {!compact ? (
          <div className="absolute bottom-[7%] left-[74%] h-[36%]">
            {WORK_ITEMS.map((w) => (
              <Layer
                key={w.id}
                item={w}
                active={w.id === activeId}
                reduced={reduced}
                order={1}
                className="absolute inset-y-0 left-0"
              >
                <WorkMedia
                  item={w}
                  active={w.id === activeId}
                  sectionInView={sectionInView}
                  aspect="4 / 5"
                  crop="support"
                  className="wrk-drift h-full"
                  sizes="(max-width: 1279px) 14vw, 10vw"
                />
              </Layer>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Work metadata. Separate from the stage so the stacked layout can place it
 * under the reel while the desktop layout puts it beside.
 */
export function WorkMeta({
  activeId,
  className,
}: {
  activeId: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`relative ${className ?? ""}`}>
      {WORK_ITEMS.map((w) => {
        const active = w.id === activeId;
        return (
          <motion.div
            key={w.id}
            aria-hidden={!active}
            className={
              active ? "relative" : "pointer-events-none absolute inset-x-0 top-0"
            }
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: reduced ? 0.18 : 0.3, ease: EASE }}
          >
            <span className="caps block text-accent">{w.type}</span>

            <p className="-mb-[0.1em] mt-4 overflow-hidden font-display text-[clamp(1.5rem,2.4vw,2.35rem)] leading-[1.04] font-medium tracking-[-0.032em] text-ink">
              <motion.span
                className="block pb-[0.12em]"
                initial={false}
                animate={{ y: active || reduced ? "0%" : "108%" }}
                transition={{ duration: reduced ? 0.2 : 0.5, ease: EASE }}
              >
                {w.title}
              </motion.span>
            </p>

            <p className="caps mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-muted">
              <span>{w.format}</span>
              {w.year ? (
                <>
                  <span aria-hidden className="block h-px w-3 bg-line-strong" />
                  <span>{w.year}</span>
                </>
              ) : null}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
