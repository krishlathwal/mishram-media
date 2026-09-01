"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import {
  resolveFrame,
  type Creator,
  type FrameKind,
} from "@/config/creators";
import { SOCIAL_ANCHOR } from "@/config/service-social";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * THE BRAND SIGNAL — the hero composition for Social & Personal Brand Growth.
 *
 * The idea is **identity → system → recognition**, not "someone posts a lot".
 * One person is the anchor; around them the same identity resolves into the
 * formats a brand is actually made of — a vertical frame, a still, a
 * positioning statement, a publishing rhythm — with one continuous signal
 * circling the whole arrangement behind them. What the composition says is that
 * a personal brand is a *system* that keeps returning, which is the argument
 * the rest of the page then makes in words.
 *
 * **Deliberately not the homepage's Service 01 scene.** That one is three
 * different creators around a planning surface, because §02 is introducing a
 * category. This is one creator resolving into three formats, because the page
 * is about one person becoming recognisable. Same grammar, different sentence.
 *
 * **No WebGL.** The homepage Hero is the site's only 3D moment (§12). This is
 * DOM, CSS, one SVG and Motion — and the whole composition is percentages of a
 * fixed-aspect box, which is the `.svc-stage-box` lesson from §10 applied
 * without the scroll machinery: geometry checked at one size is checked at all
 * of them.
 *
 * **No fake social UI**: no profile chrome, no follower count, no likes, no
 * comments, no engagement rate. The frames carry format labels and the
 * creator's real name, exactly as the homepage's own network surfaces do.
 */

/**
 * The anchor. A real creator with approved local photography and three crops
 * already tuned in `config/creators.ts` — never stock, never a scraped profile.
 *
 * **ZOYA JAAN → VISHNU PRIYA, Revision 31, and the reason is the ledger.**
 * Revision 28 rebuilt the Hero around Ali Fazal and Akash Sagar and kept Zoya,
 * Nikita and Lovekesh — which left `zoya-jaan.webp` rendering in **both** the
 * Hero and this page's opening composition. Same file, two places, one screen
 * apart on a visitor's way down the site.
 *
 * Exactly two published creators came *off* the Hero in that revision, Mukul
 * Sharma and Vishnu Priya, so those two are the only ones this page can anchor
 * without repeating the homepage. Mukul already carries the Content System
 * Board below, so the hero takes Vishnu Priya — and this route now opens and
 * argues on **two creators the Hero does not use at all**.
 *
 * She also has all three crops already tuned (`portrait`, `reel`, `content`),
 * so the composition needed no new art direction to make the swap.
 *
 * **Read from `SOCIAL_ANCHOR`, not looked up here.** The hero's attribution
 * line derives from the same export, so the caption and the photograph cannot
 * name two different people — which they briefly did while this was a local
 * lookup and the caption was a hardcoded string.
 */
function anchor(): Creator {
  return SOCIAL_ANCHOR;
}

const ANCHOR = anchor();

/** Pointer parallax depth per element. Mouse only, spring damped, small. */
const PARALLAX = {
  portrait: 1,
  reel: 1.7,
  content: 1.4,
  positioning: 0.7,
  rhythm: 2,
} as const;

export function BrandSignal() {
  const reduced = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 22, mass: 0.6 });

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== "mouse" || !box.current) return;
      const rect = box.current.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width - 0.5);
      py.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="svp-signal-box"
    >
      {/* The recurring signal, behind everything: one continuous loop that only
          shows where the frames leave a gap, with a teal segment travelling it.
          Uniform viewBox against a fixed-aspect box, so the stroke stays a true
          hairline at every size and never shears. */}
      <svg
        aria-hidden
        viewBox="0 0 100 109"
        fill="none"
        className="svp-signal-orbit"
      >
        <motion.path
          d="M22 19 C 56 3, 92 14, 89 41 C 86 69, 98 84, 73 98 C 48 112, 15 100, 9 80 C 3 60, 8 32, 22 19 Z"
          className="svp-orbit-base"
          stroke="var(--color-line-strong)"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M22 19 C 56 3, 92 14, 89 41 C 86 69, 98 84, 73 98 C 48 112, 15 100, 9 80 C 3 60, 8 32, 22 19 Z"
          stroke="var(--color-accent)"
          strokeWidth="0.55"
          strokeDasharray="14 286"
          className="svp-orbit-signal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        />
      </svg>

      {/* ── The identity ──────────────────────────────────────── */}
      <Element
        left={3}
        top={13}
        width={46}
        z={20}
        depth={PARALLAX.portrait}
        drift="a"
        delay={0.42}
        sx={sx}
        sy={sy}
      >
        <PhotoFrame
          kind="portrait"
          aspect="3 / 4"
          label={ANCHOR.name}
          sizes="(max-width: 640px) 44vw, (max-width: 1023px) 30vw, 18vw"
          eager
        />
      </Element>

      {/* ── The formats the identity resolves into ────────────── */}
      <Element
        left={56}
        top={3}
        width={27}
        z={30}
        depth={PARALLAX.reel}
        drift="b"
        delay={0.56}
        sx={sx}
        sy={sy}
      >
        <PhotoFrame
          kind="reel"
          aspect="9 / 16"
          label="Reel / 9:16"
          sizes="(max-width: 640px) 26vw, (max-width: 1023px) 18vw, 11vw"
        />
      </Element>

      <Element
        left={62}
        top={51}
        width={30}
        z={26}
        depth={PARALLAX.content}
        drift="c"
        delay={0.68}
        sx={sx}
        sy={sy}
      >
        <PhotoFrame
          kind="content"
          aspect="4 / 5"
          label="Content / 4:5"
          sizes="(max-width: 640px) 30vw, (max-width: 1023px) 20vw, 12vw"
        />
      </Element>

      {/* ── The system around them ────────────────────────────── */}
      <Element
        left={1}
        top={66}
        width={44}
        z={34}
        depth={PARALLAX.positioning}
        drift="d"
        delay={0.8}
        sx={sx}
        sy={sy}
      >
        <PositioningFragment />
      </Element>

      <Element
        left={47}
        top={86}
        width={34}
        z={36}
        depth={PARALLAX.rhythm}
        drift="a"
        delay={0.92}
        sx={sx}
        sy={sy}
      >
        <RhythmFragment />
      </Element>

      {/* One annotation, in the only genuinely empty corner. */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="svp-signal-anno"
      >
        <span aria-hidden className="block h-px w-5 bg-ink/25" />
        <span className="caps text-[0.5625rem] text-ink/50">Personal brand</span>
      </motion.span>
    </div>
  );
}

/**
 * One placed element. The outer wrapper carries the scroll-free entry and the
 * pointer parallax; an inner wrapper carries the idle drift, so a CSS animation
 * never fights a Motion transform on the same element (§10).
 */
function Element({
  left,
  top,
  width,
  z,
  depth,
  drift,
  delay,
  sx,
  sy,
  children,
}: {
  left: number;
  top: number;
  width: number;
  z: number;
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * 14 * depth);
  const y = useTransform(sy, (v) => v * 10 * depth);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        zIndex: z,
        x,
        y,
      }}
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`svc-drift svc-drift--${drift}`}>{children}</div>
    </motion.div>
  );
}

/**
 * A crop of the anchor's one approved photograph. `resolveFrame` and the
 * `--crt-zoom` / `--crt-origin` mechanism are §03's, reused rather than
 * re-tuned: the three crops in `config/creators.ts` were composed against this
 * exact set of frame shapes, so pointing new frames at them is reuse, not a
 * fresh guess at art direction.
 */
function PhotoFrame({
  kind,
  aspect,
  label,
  sizes,
  eager,
}: {
  kind: FrameKind;
  aspect: string;
  label: string;
  sizes: string;
  /**
   * Only the identity anchor sets this, and only because it is genuinely the
   * route's above-the-fold LCP candidate. Everything else on the page stays
   * lazy — §10i removed three below-the-fold eager images from the homepage
   * and both standing LCP warnings went with them.
   *
   * `loading="eager"` + `fetchPriority="high"` rather than `priority`, which
   * Next 16 deprecated: it now only inserts a `<link rel="preload">`, and the
   * docs recommend these two for a hero image instead.
   */
  eager?: boolean;
}) {
  const frame = resolveFrame(ANCHOR, kind);

  return (
    <div
      className="svp-frame crt-zoom"
      style={
        {
          aspectRatio: aspect,
          "--crt-zoom": frame.zoom,
          "--crt-origin": frame.origin,
        } as React.CSSProperties
      }
    >
      <Image
        src={frame.src}
        alt={kind === "portrait" ? ANCHOR.alt : ""}
        aria-hidden={kind === "portrait" ? undefined : true}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        style={{ objectPosition: frame.position }}
        className="svp-photo object-cover"
      />
      <span aria-hidden className="svp-veil" />
      <span aria-hidden className="svp-tag">
        {label}
      </span>
    </div>
  );
}

/**
 * The positioning fragment. Abstract on purpose — hairline type-lines rather
 * than invented copy, because a headline written into a mockup is a claim
 * nobody agreed to.
 */
function PositioningFragment() {
  return (
    <div className="svp-fragment" style={{ aspectRatio: "16 / 7" }}>
      <span className="caps svp-fragment-label">Positioning</span>
      <span aria-hidden className="svp-typelines">
        <span className="svp-typeline svp-typeline--accent" />
        <span className="svp-typeline" style={{ width: "82%" }} />
        <span className="svp-typeline" style={{ width: "48%" }} />
      </span>
    </div>
  );
}

/**
 * The publishing rhythm. Ticks on a baseline, three of them live — a cadence,
 * not a chart. **No axis, no numbers**, because any figure here would be
 * fabricated (the same rule §10's Service 03 scene follows).
 */
function RhythmFragment() {
  const live = new Set([1, 3, 6]);

  return (
    <div className="svp-fragment" style={{ aspectRatio: "16 / 6" }}>
      <span className="caps svp-fragment-label">Publishing</span>
      <span aria-hidden className="svp-rhythm">
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            className={`svp-tick${live.has(i) ? " svp-tick--on" : ""}`}
          />
        ))}
      </span>
    </div>
  );
}
