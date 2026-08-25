"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { ROSTER, type Creator } from "@/config/creators";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Name, relationship and — once it is verified — reach.
 *
 * The name swaps through the site's established clip mask rather than a fade:
 * the outgoing line rises out of its box while the incoming one rises in.
 *
 * It takes `shownId`, not the raw selection, so the name and the photograph
 * land on the same beat even when the incoming image needed a moment to load.
 * Like the stage, it mounts **only the two creators a transition involves** —
 * the roster is built to carry twenty and mounting every name block would put
 * nineteen absolutely-positioned copies behind the visible one.
 *
 * `followers` and `instagram` are optional and currently unset for the whole
 * roster (see `config/creators.ts`). This lays out correctly without them — no
 * placeholder dash, no "coming soon", and no invented number.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Line({
  creator,
  active,
  reduced,
  large,
}: {
  creator: Creator;
  active: boolean;
  reduced: boolean;
  /** Type scale: the roster column, or the larger mobile block. */
  large: boolean;
}) {
  // Matches the stage transition, so name and photograph land on one beat.
  const dur = reduced ? 0.2 : 0.46;

  // The active block holds the container's height; the outgoing one overlays it
  // while it clears, so nothing jumps mid-transition.
  const position = active
    ? "relative"
    : "pointer-events-none absolute inset-x-0 top-0";

  return (
    <motion.div
      aria-hidden={!active}
      // `inert` as well as `aria-hidden`, because this block can now contain a
      // real link. `aria-hidden` hides it from the accessibility tree but
      // leaves it in the tab order, and a focusable element inside an
      // aria-hidden subtree is exactly the defect §17 keeps catching. Same
      // idiom the disclosure panels use.
      inert={!active}
      className={position}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduced ? 0.18 : 0.3, ease: EASE }}
    >
      <p
        className={`-mb-[0.1em] overflow-hidden font-display font-medium tracking-[-0.035em] text-ink ${
          large
            ? "text-[clamp(1.75rem,7.5vw,2.4rem)] leading-[1.05]"
            : "text-[clamp(1.6rem,3vw,2.9rem)] leading-[1.04]"
        }`}
      >
        <motion.span
          className="block pb-[0.12em]"
          initial={false}
          animate={{ y: active || reduced ? "0%" : "108%" }}
          transition={{ duration: dur, ease: EASE }}
        >
          {creator.name}
        </motion.span>
      </p>

      <motion.span
        className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active || reduced ? 0 : 10 }}
        transition={{ duration: dur, ease: EASE, delay: reduced ? 0 : 0.06 }}
      >
        <span className="caps text-ink-muted">{creator.label}</span>

        {/* Rendered only from verified data — see config/creators.ts. */}
        {creator.followers ? (
          <span className="caps text-ink">
            {creator.instagram ? "Instagram / " : ""}
            {creator.followers}
          </span>
        ) : null}

        {/* A real destination, not decoration. Renders only where a handle is
            verified — one creator today, and none of the historical five, for
            the reason in `config/creators.ts`. The label carries the name so
            "@handle" is never the only thing a screen reader hears. */}
        {creator.instagram && !creator.followers ? (
          <a
            href={`https://www.instagram.com/${creator.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} on Instagram`}
            className="caps group/ig inline-flex items-center gap-1.5 text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            @{creator.instagram}
            <span aria-hidden className="block h-2.5 w-2.5 overflow-hidden">
              <Arrow
                size={10}
                className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/ig:translate-x-3 group-hover/ig:-translate-y-3"
              />
            </span>
          </a>
        ) : null}
      </motion.span>
    </motion.div>
  );
}

export function CreatorMeta({
  shownId,
  outgoingId,
  large = false,
}: {
  shownId: string;
  outgoingId: string | null;
  large?: boolean;
}) {
  const reduced = usePrefersReducedMotion();

  const lines = useMemo(() => {
    const ids = new Set([shownId, outgoingId].filter((id): id is string => !!id));
    return ROSTER.filter((c) => ids.has(c.id));
  }, [shownId, outgoingId]);

  return (
    <div className="relative">
      {lines.map((c) => (
        <Line
          key={c.id}
          creator={c}
          active={c.id === shownId}
          reduced={reduced}
          large={large}
        />
      ))}
    </div>
  );
}
