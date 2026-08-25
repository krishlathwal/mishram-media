"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { ABOUT_PAGE_COPY } from "@/config/about-page";
import { CREATORS, resolveFrame } from "@/config/creators";
import { RECOGNITION_ITEMS } from "@/config/recognition";

import { EASE } from "./AboutSection";

/**
 * THE MISHRAM ARCHIVE — the hero composition, and the page's thesis as an
 * object rather than a diagram.
 *
 * **Five fragments from five different chapters of the company**: a creator, a
 * format, a recognition, a beginning, and a build. Laid on one board at
 * different depths, the way prints and proofs end up on a studio wall.
 *
 * **What makes this the About page and not a service page.** Services 01–03 and
 * 05 each draw a *system* — a signal, a constellation, an experiment loop, a
 * shoot board — and each is interactive. This is deliberately none of those:
 * nothing here is selectable, nothing reconfigures, and the composition argues
 * by *provenance* rather than by mechanism. It is an archive, so it is dated,
 * labelled and still.
 *
 * **Content integrity.** The fragments are five separate things and the note
 * beneath says so on the page — nothing here implies one campaign, one client
 * or one shoot. Every image is a local approved asset: two creator crops from
 * the roster and the verified recognition photograph. The two non-photographic
 * fragments are typography and structure, drawn here, so no stock image and no
 * invented artefact appears anywhere on the board.
 */

type Fragment = {
  id: string;
  /** What chapter of the company this fragment is from. */
  label: string;
  /** Percentages of the fixed-aspect board. */
  left: number;
  top: number;
  width: number;
  /** width / height, so the height is derived and the board stays predictable. */
  ar: number;
  depth: number;
  drift: "a" | "b" | "c" | "d";
  delay: number;
  /** Narrow layout: dropped entirely, or kept as one of the three that survive. */
  narrow?: { left: number; top: number; width: number };
  /** A different aspect on the narrow board, where the same width buys less room. */
  narrowAr?: number;
};

const WIDE: readonly Fragment[] = [
  { id: "creator", label: "Creator", left: 2, top: 6, width: 40, ar: 0.78, depth: 1, drift: "a", delay: 0.1, narrow: { left: 3, top: 3, width: 76 } },
  { id: "format", label: "Format", left: 46, top: 0, width: 22, ar: 0.5625, depth: 1.35, drift: "b", delay: 0.22 },
  { id: "recognition", label: "Recognition", left: 52, top: 46, width: 46, ar: 4 / 3, depth: 0.8, drift: "c", delay: 0.34, narrow: { left: 36, top: 58, width: 62 } },
  { id: "beginning", label: "Beginning", left: 2, top: 63, width: 30, ar: 1.5, depth: 1.15, drift: "d", delay: 0.46, narrow: { left: 3, top: 79, width: 56 }, narrowAr: 1.12 },
  { id: "build", label: "Build", left: 70, top: 8, width: 28, ar: 1.42, depth: 1.5, drift: "b", delay: 0.58 },
];

/** The board's own aspect, so every percentage above is viewport-invariant. */
const BOARD_AR = "100 / 96";

export function ArchiveBoard() {
  const copy = ABOUT_PAGE_COPY.hero;
  const zoya = CREATORS.find((c) => c.id === "zoya");
  const mukul = CREATORS.find((c) => c.id === "mukul");
  const award = RECOGNITION_ITEMS[0];

  return (
    <div className="abt-board-wrap">
      <div className="abt-board" style={{ ["--abt-board-ar" as string]: BOARD_AR }}>
        {WIDE.map((f) => (
          <motion.figure
            key={f.id}
            className="abt-frag"
            data-narrow={f.narrow ? "keep" : "drop"}
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: `${f.width}%`,
              ["--abt-nl" as string]: `${f.narrow?.left ?? f.left}%`,
              ["--abt-nt" as string]: `${f.narrow?.top ?? f.top}%`,
              ["--abt-nw" as string]: `${f.narrow?.width ?? f.width}%`,
              ["--abt-depth" as string]: String(f.depth),
            }}
            initial={{ opacity: 0, y: 26 * f.depth, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1, delay: f.delay, ease: EASE }}
          >
            <span className={`abt-frag-inner abt-drift--${f.drift}`}>
              <span className="abt-frame">
                {f.id === "creator" && zoya ? (
                  <Crop creator={zoya} kind="portrait" alt={zoya.alt} priority />
                ) : null}
                {f.id === "format" && mukul ? (
                  <Crop creator={mukul} kind="reel" alt={mukul.alt} />
                ) : null}
                {f.id === "recognition" && award ? (
                  <Image
                    src={award.image}
                    alt={award.alt}
                    fill
                    sizes="(max-width: 1023px) 60vw, 22vw"
                    className="abt-photo object-cover"
                  />
                ) : null}
                {f.id === "beginning" ? <Beginning /> : null}
                {f.id === "build" ? <Build /> : null}
              </span>
              <span aria-hidden className="abt-frag-label caps">
                {f.label}
              </span>
            </span>
          </motion.figure>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
        className="mt-7"
      >
        <span aria-hidden className="block h-px w-full bg-line" />
        <p className="caps mt-4 text-ink-muted">{copy.boardLabel}</p>
        {/* Rendered on the page, not left in a comment: five chapters, not one
            campaign. */}
        <p className="caps mt-3 max-w-[46ch] text-[0.5625rem] leading-[1.7] text-ink-muted">
          {copy.boardNote}
        </p>
      </motion.div>
    </div>
  );
}

/** A roster crop, using §10b's own tuned art direction rather than a new guess. */
function Crop({
  creator,
  kind,
  alt,
  priority = false,
}: {
  creator: (typeof CREATORS)[number];
  kind: "portrait" | "reel" | "content";
  alt: string;
  priority?: boolean;
}) {
  const frame = resolveFrame(creator, kind);
  return (
    <span
      className="abt-crop"
      style={{
        ["--crt-zoom" as string]: String(frame.zoom),
        ["--crt-origin" as string]: frame.origin,
      }}
    >
      <Image
        src={frame.src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 66vw, 30vw"
        style={{ objectPosition: frame.position }}
        className="abt-photo object-cover"
        {...(priority
          ? { loading: "eager" as const, fetchPriority: "high" as const }
          : {})}
      />
    </span>
  );
}

/**
 * The beginning: a date, set as type. The company's first year is the one
 * artefact from 2021 this project can honestly show — there is no photograph
 * of it, and inventing one is not an option, so it is drawn as a record card.
 */
function Beginning() {
  return (
    <span className="abt-card">
      <span className="caps block text-[0.5rem] text-ink-muted">Founded</span>
      <span className="mt-auto block font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none font-medium tracking-[-0.04em] text-ink">
        2021
      </span>
      <span className="caps mt-2 block text-[0.5rem] text-ink-soft">
        Starcrown Media
      </span>
    </span>
  );
}

/**
 * The build: a structural fragment of an interface. Abstract on purpose — a
 * screenshot of a real client site would be a portfolio claim this page does
 * not make, and a mock one would be an invented brand (§10m's rule for
 * `CreativeSurface`, applied here).
 */
function Build() {
  return (
    <span className="abt-card abt-card--wire" aria-hidden>
      <span className="abt-wire-row" style={{ width: "42%" }} />
      <span className="abt-wire-row abt-wire-row--strong" style={{ width: "78%" }} />
      <span className="abt-wire-block" />
      <span className="abt-wire-row" style={{ width: "56%" }} />
      <span className="abt-wire-action" />
    </span>
  );
}
