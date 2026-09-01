"use client";

import clsx from "clsx";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
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
  WEB_WORK_PROVENANCE,
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
        /**
         * THE NARROW CAPTURE IS AN OBJECT, NOT A DECORATION — and below `sm`
         * that took a measurement rather than a preference.
         *
         * At `19%` of a 348px column this frame rendered **66px wide** on a
         * 390 viewport: a 720px capture of a 360-CSS-px layout shown at 0.18×,
         * which is a smudge on the one page whose whole subject is how a site
         * behaves at that width. The desktop capture beside it renders at
         * 0.24×, so the narrow view — the more legible artefact of the two per
         * pixel of column — was the smaller of the two.
         *
         * `32%` puts it at **111px / 0.31×**, which is the same scale the
         * pinned stage already gives it at 1440 (124px against a 720px
         * capture). The cap holds it there as the column grows toward `sm`, and
         * `640` up is unchanged because `19%` of a 698px column is already
         * 133px. **Only the widths where it was failing move.**
         *
         * `-bottom-20` is absolute rather than a percentage on purpose: the
         * hang below the window is what the panel's own `pb` has to clear, and
         * a percentage of a container whose height tracks the column means the
         * hang grows with the viewport — 78px at 639px, past the padding —
         * while a fixed value is the same 80px at every narrow width.
         *
         * **80px, not 48, and a capture decided it.** At `-bottom-12` the
         * frame's top edge landed 8% into the window, straight across the
         * Ekly capture's own headline. Dropping the phone to 21–38% (viewport
         * depending) clears it: the wide view keeps its proposition legible and
         * the narrow view carries the same words at a size a reader can
         * actually read them at. The two are complementary rather than one
         * hiding the other.
         */
        <motion.div
          className="web-phone w-[32%] max-w-[132px] right-[4%] -bottom-20 sm:w-[19%] sm:-bottom-[7%] lg:w-[17%]"
          style={{
            aspectRatio: "9 / 19",
            ...(phoneIn ? { opacity: phoneIn.opacity, x: phoneIn.x } : null),
          }}
        >
          <motion.div style={phoneY ? { y: phoneY } : undefined} className="absolute inset-x-0 top-0">
            <Image
              src={project.mobile.src}
              /* Real alt text now that it is a real object. The two strings
                 differ only in the width they name, because that is the only
                 thing that differs about the two views. */
              alt={project.mobileAlt ?? ""}
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

        <ProjectIndex active={active} p={scrollYProgress} />
      </div>
    </div>
  );
}

/**
 * THE INDEX — what a reframing stage cannot say for itself.
 *
 * A pinned stage that swaps one project for another tells a visitor nothing
 * about how many there are or where they are in them: the section can read as
 * one project that happens to change, and somebody who scrolls quickly past the
 * first can leave believing the portfolio is one site. The stacked composition
 * never has that problem because both panels are simply on the page.
 *
 * So the panel carries the same device the homepage's own service track uses —
 * indices on a hairline with an accent fill running through them (§10). Two
 * differences, both deliberate:
 *
 * - **Nothing is clickable, and it stays that way.** §10's ruling on the
 *   homepage progress indicator, for the same reason: an index that navigates
 *   is a control, and this is a read-out of where the scroll already is.
 * - **It is `aria-hidden`.** Every project's number, name, category, note and
 *   link are real text in both slots, and the inactive one is `inert` rather
 *   than absent — so this adds no information to the accessibility tree and
 *   would only repeat two numerals into it.
 *
 * The fill is the track's own progress driving `scaleX` **directly** — no
 * `useTransform` at all, because the mapping is the identity and a literal
 * input range is the thing that opts a value into Motion's WAAPI path (§10v).
 * `scale` is not one of the five accelerated properties either way, so this is
 * belt and braces rather than a fix; it is also simply less machinery.
 */
function ProjectIndex({ active, p }: { active: number; p: MotionValue<number> }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-10 flex items-center gap-4"
    >
      {WEB_WORK.map((project, i) => (
        <Fragment key={project.id}>
          {i > 0 ? (
            <span className="relative block h-px w-20 bg-line-strong sm:w-28">
              <motion.span
                style={{ scaleX: p }}
                className="absolute inset-0 block origin-left bg-accent"
              />
            </span>
          ) : null}
          <span
            className={clsx(
              "caps transition-colors duration-500",
              i === active ? "text-ink" : "text-ink-muted/45",
            )}
          >
            {project.index}
          </span>
        </Fragment>
      ))}
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
      /**
       * MEASURED, NOT ESTIMATED — §10aq's rule, applied to this section.
       *
       * The pinned window is `col-span-7` inside `page-x`, which resolves to
       * **51.5vw at 1600, 51.4 at 1440, 51.2 at 1280 and 50.9 at 1024** — not
       * the 58vw this declared, which over-fetched one srcset step at every
       * one of them. The narrow frame's own box is 8.6vw against the 11vw
       * declared. Both are now the measured value plus a hair.
       */
      sizes="(min-width: 1024px) 52vw, 91vw"
      phoneSizes="(min-width: 1024px) 9vw, 29vw"
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

      {/* The same line the pinned meta column carries, so a phone is not
          reading a screenshot with no idea what the site is. It sits above the
          frame rather than beside it because there is no beside here — and it
          is one line at every width from 320 up. */}
      {project.note ? (
        <p className="mb-7 max-w-[52ch] text-[0.9375rem] leading-[1.7] text-ink/70">
          {project.note}
        </p>
      ) : null}

      {/* The phone hangs below the frame's edge, so the panel needs room for
          it rather than clipping it against the next project's head. The hang
          is a fixed 80px at every narrow width (see `ProjectView`), which is
          what lets one padding value clear it instead of a per-breakpoint
          guess. Above `sm` the hang goes back to 7% of the window — 31px at
          768 — so the padding steps down with it. */}
      <div className="pb-20 sm:pb-14">
        <ProjectView
          project={project}
          shotY={reduced ? undefined : shotY}
          phoneY={reduced ? undefined : phoneY}
          /* Measured: the stacked window is 90.9vw at 768, 90.2 at 430, 89.2 at
             390 and 86.9 at 320 — one value covers the whole range, and 88/92
             was two values covering it worse. */
          sizes="91vw"
          phoneSizes="(min-width: 640px) 18vw, 29vw"
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
        {/* The provenance line shares the rail rather than getting a band of
            its own, so on every width from `md` up it costs no height at all —
            the three words were already the shortest row on the page. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
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

          <p className="caps max-w-[34ch] text-ink-muted">
            {WEB_WORK_PROVENANCE}
          </p>
        </div>
      </motion.div>
    </ServiceSection>
  );
}
