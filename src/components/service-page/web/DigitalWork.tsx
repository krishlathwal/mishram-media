"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import {
  WEB_WORK,
  WEB_WORK_ACTION,
  WEB_WORK_BASELINE,
  WEB_WORK_COPY,
  type WorkProject,
} from "@/config/service-web";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import {
  EASE,
  ServiceSection,
  ServiceSectionHead,
} from "../ServiceSection";
import { SiteSurface } from "./InterfaceSurface";
import { useScrollRange } from "./scroll-range";

/**
 * 02 / SELECTED DIGITAL WORK — proof, second on the page.
 *
 * Every other service page on this site argues first and evidences late,
 * because on those services the evidence is a method. Here it is two live URLs,
 * and a visitor who can open the work should meet it before five screens of
 * positioning. So this sits directly under the hero.
 *
 * **THE VIEWPORT IS A WINDOW, NOT A DEVICE.** No traffic lights, no address
 * bar, no tab strip, no laptop bezel, no perspective mockup — a hairline frame
 * at the page's own 3px radius, and the site inside it. The URL is set beside
 * the frame as editorial type where it can be read and clicked, which is both
 * more honest and more useful than drawing it into fake browser chrome.
 *
 * **The capture scrolls inside the window**, driven by scroll position and
 * nothing else. A portfolio thumbnail shows that a site exists; a site moving
 * under its own header shows what it is like to be on it. Transform only — the
 * image never re-lays-out, so this costs one compositor property per frame.
 *
 * TWO COMPOSITIONS, NOT ONE SCALED:
 *
 * - **Pinned**, where there is room: one viewport holds the section while the
 *   projects reframe through it, meta swapping beside it. The mobile capture
 *   enters late in each slot, so responsiveness is demonstrated rather than
 *   claimed.
 * - **Stacked**, everywhere else: two full-width editorial panels, each with
 *   its own scroll-linked capture. Not a degraded version — a different
 *   composition for a different shape.
 *
 * **CONTENT BOUNDARY.** Name, category, capture, URL. No metric, no stack, no
 * timeline, no scope, no role description, no testimonial — see the head of
 * `config/service-web.ts` for why each of those is absent.
 */

/**
 * Pinning needs height to pin and a landscape frame to pin *in*; 1024 is where
 * a four-column meta block and a seven-column viewport both stop being cramped.
 * Lighter than §02's `DESKTOP_SEQUENCE_QUERY` because this panel carries one
 * composition rather than five.
 */
const PINNED_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (min-aspect-ratio: 5 / 4)";

/** Scroll distance, in vh, that each project holds the pinned viewport for. */
const PROJECT_SCROLL_VH = 115;

/** The window's own shape. Both compositions use it, so the maths is shared. */
const FRAME_AR = 16 / 10;
const PHONE_AR = 9 / 19;

/**
 * How far a capture may travel inside its window, as a percentage of the
 * capture's own height — which is what `translateY` is a percentage of.
 *
 * A capture is rendered at the window's full width, so its height relative to
 * the window is `(h / w) × frameAspect`. Anything beyond the window is the
 * travel, and expressing it this way means the config can hold captures of
 * different lengths without a per-project constant.
 */
function travelOf(media: { width: number; height: number }, frameAr: number) {
  const rendered = (media.height / media.width) * frameAr;
  if (rendered <= 1) return 0;
  return -(1 - 1 / rendered) * 100;
}

/* ── The window ─────────────────────────────────────────────────── */

function ProjectView({
  project,
  shotY,
  phoneY,
  phoneIn,
  sizes,
  phoneSizes,
}: {
  project: WorkProject;
  shotY?: MotionValue<string>;
  phoneY?: MotionValue<string>;
  /** The mobile capture's own entry, so it arrives after the desktop one. */
  phoneIn?: { opacity: MotionValue<number>; x: MotionValue<number> };
  sizes: string;
  phoneSizes: string;
}) {
  return (
    <div className="relative">
      <div className="web-view">
        {project.desktop ? (
          <motion.div style={shotY ? { y: shotY } : undefined} className="absolute inset-x-0 top-0">
            <Image
              src={project.desktop.src}
              alt={project.alt}
              width={project.desktop.width}
              height={project.desktop.height}
              sizes={sizes}
              /* Below the fold on every viewport, so it stays lazy — §16's
                 rule, and the reason four captures never decode at once. */
              className="web-shot"
            />
          </motion.div>
        ) : (
          /* No capture yet — the page's own interface surface, never a grey
             placeholder tile. The section is designed so a capture can be
             dropped in later without anything being redesigned around it. */
          <div className="absolute inset-0 p-[4%]">
            <SiteSurface aspect="16 / 10" />
          </div>
        )}
      </div>

      {project.mobile ? (
        <motion.div
          className="web-phone w-[19%] max-w-[132px] right-[5%] -bottom-[7%] lg:w-[17%]"
          style={{
            aspectRatio: "9 / 19",
            ...(phoneIn ? { opacity: phoneIn.opacity, x: phoneIn.x } : null),
          }}
        >
          <motion.div style={phoneY ? { y: phoneY } : undefined} className="absolute inset-x-0 top-0">
            <Image
              src={project.mobile.src}
              alt=""
              width={project.mobile.width}
              height={project.mobile.height}
              sizes={phoneSizes}
              className="web-phone-shot"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}

/* ── The meta beside a project ──────────────────────────────────── */

function ProjectMeta({ project }: { project: WorkProject }) {
  return (
    <div>
      <p
        aria-hidden
        className="font-display text-[clamp(2.75rem,5vw,4.25rem)] leading-[0.9] font-medium tracking-[-0.04em] text-ink/12"
      >
        {project.index}
      </p>

      {/* Sized against the viewport beside it rather than against the section
          head: at 2.4rem the project name read as a caption to a very large
          image instead of as the thing the image belongs to. */}
      <h3 className="mt-6 font-display text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.02] font-medium tracking-[-0.036em] text-ink">
        {project.name}
      </h3>

      <p className="caps mt-4 text-ink-soft">{project.category}</p>

      {project.note ? (
        <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-[1.7] text-ink/70">
          {project.note}
        </p>
      ) : null}

      <span aria-hidden className="mt-7 block h-px w-full bg-line" />

      {/* The whole point of the section: a real link to the real site. */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="web-visit caps mt-1"
      >
        <span aria-hidden className="block h-px w-5 shrink-0 bg-accent" />
        <span>
          {WEB_WORK_ACTION}
          <span className="sr-only"> — {project.name}, opens in a new tab</span>
        </span>
        <span aria-hidden className="text-[0.6875rem] leading-none">
          &#8599;
        </span>
      </a>

      <p className="caps mt-1 pl-[1.6rem] text-ink-muted">{project.displayUrl}</p>
    </div>
  );
}

/* ── Pinned: one window, the projects reframing through it ──────── */

function PinnedWork() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const count = WEB_WORK.length;

  /**
   * The one piece of React state in the pinned stage, and it changes **once
   * per project boundary**, not per frame — everything else reads MotionValues
   * through `useTransform` (§10's scroll rule).
   *
   * It exists for keyboard users. A slot faded to `opacity: 0` is still in the
   * tab order, so without this a visitor tabbing through the page would land
   * on a `Visit live site` link for a project that is not on screen. `inert`
   * takes the inactive slot out of the tab order and the accessibility tree at
   * the same time; a pointer-events rule alone would not.
   */
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setActive(next);
  });

  return (
    <div
      ref={track}
      className="relative mt-14 md:mt-16 lg:mt-20"
      style={{ height: `calc(100svh + ${count * PROJECT_SCROLL_VH}vh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center pt-[var(--header-h)] pb-10">
        <div className="grid w-full grid-cols-12 items-center gap-x-8">
          {/* Both projects occupy the same two cells, so switching never
              shunts the layout — the lesson §10d-notes records. */}
          <div className="col-span-4 grid">
            {WEB_WORK.map((project, i) => (
              <PinnedSlot
                key={project.id}
                i={i}
                count={count}
                p={scrollYProgress}
                inactive={i !== active}
              >
                <ProjectMeta project={project} />
              </PinnedSlot>
            ))}
          </div>

          <div className="col-span-7 col-start-6 grid">
            {WEB_WORK.map((project, i) => (
              <PinnedSlot
                key={project.id}
                i={i}
                count={count}
                p={scrollYProgress}
                inactive={i !== active}
              >
                <PinnedView project={project} i={i} count={count} p={scrollYProgress} />
              </PinnedSlot>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One project's cell in the pinned stage. Every slot is mounted in the same
 * grid area and only its opacity and depth change, so the panel holds the
 * height of the tallest and nothing reflows while scrolling.
 */
function PinnedSlot({
  i,
  count,
  p,
  inactive,
  children,
}: {
  i: number;
  count: number;
  p: MotionValue<number>;
  /** Out of the tab order and the accessibility tree while off screen. */
  inactive: boolean;
  children: React.ReactNode;
}) {
  /**
   * The stops stay inside [0, 1] and strictly increasing. `useScrollRange`
   * keeps the opacity off Motion's WAAPI path — see the long note in
   * `scroll-range.ts` for the two defects that path caused here — but the
   * clamping is kept regardless: a band that runs past either end of its own
   * track is wrong on its own terms.
   */
  const EDGE = 0.001;
  const start = i / count;
  const end = (i + 1) / count;
  const band = 0.07;

  const fadeInFrom = Math.max(0, start - band);
  const fadeInTo = Math.max(fadeInFrom + EDGE, Math.min(1, start + band));
  const fadeOutFrom = Math.max(fadeInTo + EDGE, Math.min(1, end - band));
  const fadeOutTo = Math.max(fadeOutFrom + EDGE, Math.min(1, end + band));
  const stops = [fadeInFrom, fadeInTo, fadeOutFrom, fadeOutTo];

  const opacity = useScrollRange(p, stops, [
    i === 0 ? 1 : 0,
    1,
    1,
    i === count - 1 ? 1 : 0,
  ]);

  /* A reframe, not a cross-fade: the outgoing project recedes very slightly
     while the incoming one settles forward. Same range as the opacity above,
     so the two move together. */
  const scale = useScrollRange(p, stops, [0.985, 1, 1, 0.985]);

  return (
    <motion.div
      inert={inactive}
      style={{ gridArea: "1 / 1", opacity, scale }}
      className="min-w-0"
    >
      {children}
    </motion.div>
  );
}

function PinnedView({
  project,
  i,
  count,
  p,
}: {
  project: WorkProject;
  i: number;
  count: number;
  p: MotionValue<number>;
}) {
  const start = i / count;
  const end = (i + 1) / count;

  const shotTravel = project.desktop ? travelOf(project.desktop, FRAME_AR) : 0;
  const phoneTravel = project.mobile ? travelOf(project.mobile, PHONE_AR) : 0;

  const shotY = useTransform(p, [start, end], ["0%", `${shotTravel}%`]);
  const phoneY = useTransform(
    p,
    [start + 0.12, end],
    ["0%", `${phoneTravel}%`],
  );

  /* The narrow viewport arrives after the wide one has been read, so the
     section makes one point at a time. */
  const phoneOpacity = useScrollRange(p, [start + 0.22, start + 0.36], [0, 1]);
  const phoneX = useScrollRange(p, [start + 0.22, start + 0.36], [34, 0]);

  return (
    <ProjectView
      project={project}
      shotY={shotY}
      phoneY={phoneY}
      phoneIn={{ opacity: phoneOpacity, x: phoneX }}
      sizes="(min-width: 1024px) 58vw, 92vw"
      phoneSizes="(min-width: 1024px) 11vw, 24vw"
    />
  );
}

/* ── Stacked: two editorial panels ──────────────────────────────── */

function StackedWork() {
  return (
    <div className="mt-10 flex flex-col gap-16 sm:gap-20 md:mt-16 md:gap-28">
      {WEB_WORK.map((project) => (
        <StackedPanel key={project.id} project={project} />
      ))}
    </div>
  );
}

function StackedPanel({ project }: { project: WorkProject }) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  /* The capture travels as the panel crosses the viewport — the same idea as
     the pinned window, driven by the panel's own position instead of a track. */
  const { scrollYProgress } = useScroll({
    target: panel,
    offset: ["start end", "end start"],
  });

  const shotTravel = project.desktop ? travelOf(project.desktop, FRAME_AR) : 0;
  const phoneTravel = project.mobile ? travelOf(project.mobile, PHONE_AR) : 0;

  const shotY = useTransform(scrollYProgress, [0.1, 0.9], ["0%", `${shotTravel}%`]);
  const phoneY = useTransform(scrollYProgress, [0.2, 0.95], ["0%", `${phoneTravel}%`]);

  return (
    <motion.div
      ref={panel}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-5">
        <div className="flex items-baseline gap-4">
          <span aria-hidden className="caps text-[0.5625rem] text-ink-muted">
            {project.index}
          </span>
          <h3 className="font-display text-[clamp(1.5rem,5.4vw,2.1rem)] leading-[1.05] font-medium tracking-[-0.032em] text-ink">
            {project.name}
          </h3>
        </div>
        <p className="caps text-ink-soft">{project.category}</p>
      </div>

      {/* The phone hangs below the frame's edge, so the panel needs room for
          it rather than clipping it against the next project's head. */}
      <div className="pb-10 sm:pb-14">
        <ProjectView
          project={project}
          shotY={reduced ? undefined : shotY}
          phoneY={reduced ? undefined : phoneY}
          sizes="(min-width: 768px) 88vw, 92vw"
          phoneSizes="24vw"
        />
      </div>

      {/* Stacked below `sm` rather than wrapped: with `justify-between` the
          shorter URL sat on the action's row and the longer one dropped to its
          own, so two identical panels laid out differently. */}
      <div className="flex flex-col items-start gap-y-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-2">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="web-visit caps"
        >
          <span aria-hidden className="block h-px w-5 shrink-0 bg-accent" />
          <span>
            {WEB_WORK_ACTION}
            <span className="sr-only"> — {project.name}, opens in a new tab</span>
          </span>
          <span aria-hidden className="text-[0.6875rem] leading-none">
            &#8599;
          </span>
        </a>
        <p className="caps text-ink-muted">{project.displayUrl}</p>
      </div>
    </motion.div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function DigitalWork({ id }: { id: string }) {
  /**
   * `false` on the server: the stacked composition is what ships in the HTML,
   * so a phone — where this section is heaviest — never renders a pinned track
   * it cannot use, and a desktop upgrades on its first client render.
   *
   * **Reduced motion takes the stacked path too.** The pinned stage is scroll
   * position driving transform on every frame, which is exactly what the
   * setting asks us not to do; the stacked panels then run with their own
   * travel disabled, so the captures sit still. Nothing is lost — both
   * projects, both captures and both links are present either way.
   */
  const reduced = usePrefersReducedMotion();
  const pinned = useMediaQuery(PINNED_QUERY, false) && !reduced;

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <ServiceSectionHead id={`${id}-title`} copy={WEB_WORK_COPY} />

      <div data-layout={pinned ? "pinned" : "stacked"}>
        {pinned ? <PinnedWork /> : <StackedWork />}
      </div>

      {/* The section resolving into three words on a hairline — the closing
          grammar the rest of the site's chapters end on. Not a claim about
          either project. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-12 border-t border-line pt-6 sm:mt-16 md:mt-20"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {WEB_WORK_BASELINE.map((word, i) => (
            <li key={word} className="flex items-center gap-6">
              {i > 0 ? (
                <span aria-hidden className="block h-3 w-px bg-line-strong" />
              ) : null}
              <span className="font-display text-[clamp(1.05rem,1.8vw,1.5rem)] leading-none font-medium tracking-[-0.03em] text-ink">
                {word}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </ServiceSection>
  );
}
