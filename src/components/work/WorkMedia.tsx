"use client";

import Image from "next/image";
import { motion, useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { WorkItem } from "@/config/work";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * One media surface. Handles both kinds of item, and the difference matters:
 *
 * - `poster` renders a still and **no playback UI at all**. A play button over
 *   a photograph would tell the visitor they are looking at a reel when they
 *   are not. The surface is a plain div — nothing to click, nothing to focus.
 * - `video` makes the whole surface the play/pause control, so click and
 *   keyboard are the same one button, with a progress hairline underneath.
 *
 * There is no video in the project yet (see the audit at the top of
 * `config/work.ts`), so today every item takes the first path. The second is
 * built and wired so a real reel drops in by setting `mediaType` and `src`.
 *
 * PLAYBACK RULES
 * - Muted, inline, looped. **Audio is never played** — there is no unmuted path
 *   in this component at all.
 * - Hover starts playback; leaving pauses and holds the frame, rather than
 *   snapping back to the poster.
 * - Clicking is explicit intent: it toggles, and while the visitor has chosen
 *   play, leaving the surface no longer pauses it.
 * - Leaving the viewport pauses and clears that intent, so nothing decodes
 *   offscreen and coming back never starts mid-reel.
 * - Under reduced motion, hover does not start anything. Click still does —
 *   user-initiated playback stays available.
 */

export function WorkMedia({
  item,
  active,
  sectionInView,
  /** Aspect of this frame, e.g. "9 / 16". */
  aspect,
  /** Which crop of the item to use. */
  crop,
  className,
  /** Only the primary frame gets the format tag and playback controls. */
  primary = false,
  sizes,
  onPlayingChange,
}: {
  item: WorkItem;
  active: boolean;
  sectionInView: boolean;
  aspect: string;
  crop: "primary" | "support";
  className?: string;
  primary?: boolean;
  sizes: string;
  /** Lets the stage quiet its decorative motion while a reel is running. */
  onPlayingChange?: (playing: boolean) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  /** The visitor explicitly asked for playback — survives pointer leave. */
  const intent = useRef(false);
  const progress = useMotionValue(0);

  // Reported upward rather than read from the DOM, so the stage can drop its
  // idle drift the moment the content itself becomes the motion.
  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  const isVideo = item.mediaType === "video" && !!item.src;
  /**
   * Only the primary frame of the active item ever mounts a video. The
   * supporting fragment is always a still crop — it is a second view of the
   * same asset, not a second player, and mounting one there would double the
   * decoders for no visual gain.
   */
  const mountsVideo = isVideo && primary && active;
  const interactive = mountsVideo;

  // These only touch the element. The playing flag is driven by the video's own
  // play/pause events instead, so the DOM stays the single source of truth and
  // an effect never has to set state synchronously.
  const pause = useCallback(() => {
    video.current?.pause();
  }, []);

  const play = useCallback(() => {
    // A rejected play() is normal — an unloaded source, or a policy block.
    // Swallow it rather than leaving an unhandled rejection at the console; the
    // element stays paused and its own pause event has already reported that.
    void video.current?.play().catch(() => {});
  }, []);

  // Nothing decodes offscreen, and nothing resumes mid-reel on return.
  useEffect(() => {
    if (!sectionInView || !active) {
      intent.current = false;
      pause();
    }
  }, [sectionInView, active, pause]);

  const onEnter = useCallback(() => {
    if (!interactive || reduced || playing) return;
    play();
  }, [interactive, reduced, playing, play]);

  const onLeave = useCallback(() => {
    if (!interactive || intent.current) return;
    pause();
  }, [interactive, pause]);

  const onToggle = useCallback(() => {
    if (!interactive) return;
    if (playing) {
      intent.current = false;
      pause();
    } else {
      intent.current = true;
      play();
    }
  }, [interactive, playing, pause, play]);

  const onTime = useCallback(() => {
    const v = video.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    progress.set(v.currentTime / v.duration);
  }, [progress]);

  const surface = (
    <>
      {/* The still. Always rendered: for a poster item it is the whole visual,
          and for a video item it is what sits behind the frame until playback
          has something to show. */}
      <Image
        src={item.poster}
        alt={primary ? item.alt : ""}
        fill
        sizes={sizes}
        style={{ objectPosition: item.focus[crop] }}
        className="wrk-photo object-cover"
      />

      {mountsVideo ? (
        <video
          ref={video}
          // Never `auto`: metadata is enough to get a duration for the progress
          // hairline, and the poster covers the first frame.
          preload="metadata"
          poster={item.poster}
          muted
          loop
          playsInline
          onTimeUpdate={onTime}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          // A source that fails to load never fires `pause`, so the label
          // would otherwise stay on "Pause" after an offscreen pause. These
          // are DOM events rather than an effect, so state stays event-driven.
          onError={() => setPlaying(false)}
          onEmptied={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={item.src} />
        </video>
      ) : null}

      <span aria-hidden className="wrk-veil" />

      {primary ? (
        <span aria-hidden className="wrk-tag">
          {interactive ? (playing ? "Pause" : "Play") : item.format}
        </span>
      ) : null}

      {/* Progress hairline. Only meaningful while there is a video. */}
      {interactive ? (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 block h-px bg-ink/20"
        >
          <motion.span
            className="block h-full origin-left bg-accent"
            style={{ scaleX: progress }}
          />
        </span>
      ) : null}
    </>
  );

  const shell = `wrk-frame ${className ?? ""}`;

  // A video surface is the control itself — one button for pointer and
  // keyboard alike. A poster surface is inert, and correctly not focusable.
  return interactive ? (
    <button
      type="button"
      onClick={onToggle}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onEnter();
      }}
      onPointerLeave={onLeave}
      aria-label={`${playing ? "Pause" : "Play"} ${item.title} — ${item.type}`}
      aria-pressed={playing}
      className={shell}
      style={{ aspectRatio: aspect }}
    >
      {surface}
    </button>
  ) : (
    <div className={shell} style={{ aspectRatio: aspect }}>
      {surface}
    </div>
  );
}
