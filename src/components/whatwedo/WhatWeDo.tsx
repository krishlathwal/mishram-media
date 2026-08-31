"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  type MotionValue,
} from "motion/react";

import {
  PUBLIC_SERVICES,
  SERVICE_SCROLL_VH,
  WHAT_WE_DO_COPY,
  type Service,
} from "@/config/services";
import { useDesktopSequence } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import { ServiceCopy } from "./ServiceCopy";
import { ServiceProgress } from "./ServiceProgress";
import { ServiceStage } from "./ServiceStage";
import { WhatWeDoClosing } from "./WhatWeDoClosing";
import { useServiceSlot } from "./useServiceSlot";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 02 / WHAT WE DO
 *
 * Desktop pins one panel while the page scrolls normally past a taller track —
 * no wheel interception, no snapping, no scroll library. Scroll position only
 * drives transforms.
 *
 * The track is sized from the number of services on **public discovery**, so
 * the length of the sequence is a property of the config rather than of this
 * component. Revision 16 took Service 05 off public discovery and the pinned
 * span shortened by one slot on its own — no empty scroll, no blank slot, no
 * transition left hanging, and no component edit. The chapter then resolves
 * into WhatWeDoClosing exactly as before.
 */
export function WhatWeDo() {
  const pinned = useDesktopSequence();

  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      // Scene annotations key off this rather than a width, so the CSS and the
      // sequence in use can never disagree at an awkward viewport shape.
      data-sequence={pinned ? "pinned" : "stacked"}
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />
      <Intro />
      {pinned ? <DesktopSequence /> : <StackedSequence />}
      <WhatWeDoClosing />
    </section>
  );
}

/** The hero's vertical grid continues through this section. */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}

function Intro() {
  const [line1, line2] = WHAT_WE_DO_COPY.headline;
  const accent = WHAT_WE_DO_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <div className="page-x relative pt-14 pb-10 sm:pt-20 sm:pb-14 md:pt-28 md:pb-20 lg:pt-32">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex items-baseline gap-3"
      >
        <span className="text-ink-muted">{WHAT_WE_DO_COPY.index}</span>
        <span aria-hidden className="text-ink-muted">
          /
        </span>
        <span className="text-ink">{WHAT_WE_DO_COPY.label}</span>
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
        {/* The trigger sits on the heading, not on the clipped lines: a line
            translated outside its overflow-hidden parent never intersects the
            viewport, so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="what-we-do-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,40rem)] font-display text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
        >
          {[line1, line2].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
                className="block"
              >
                {i === 0 ? (
                  line
                ) : (
                  <>
                    {leadIn}
                    <span className="font-accent italic">{accent}</span>
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[38ch] lg:pb-2"
        >
          {WHAT_WE_DO_COPY.lead}
        </motion.p>
      </div>
    </div>
  );
}

/** Persistent across service swaps, so it never dips during a transition. */
function SectionLabel() {
  return (
    <p className="caps flex items-baseline gap-3 text-ink-muted">
      <span>{WHAT_WE_DO_COPY.index}</span>
      <span aria-hidden>/</span>
      <span>{WHAT_WE_DO_COPY.label}</span>
    </p>
  );
}

/**
 * Desktop: one pinned panel for the whole sequence. Every built service stacks
 * its copy and its stage on the shared columns; `useServiceSlot` maps the single
 * track progress onto each one's window, with a deliberate overlap so one
 * service transforms into the next instead of cross-fading.
 */
function DesktopSequence() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const count = PUBLIC_SERVICES.length;

  return (
    <div
      ref={track}
      className="relative"
      style={{ height: `calc(100svh + ${count * SERVICE_SCROLL_VH}vh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="page-x relative grid h-full grid-cols-12 items-center gap-x-8 pt-[var(--header-h)] pb-16">
          {/* Left: the section label persists; the copies swap beneath it. */}
          <div className="col-span-4 flex flex-col justify-center">
            <SectionLabel />
            <span aria-hidden className="mt-6 block h-px w-full bg-line" />

            <div className="relative mt-7 h-[22rem]">
              {PUBLIC_SERVICES.map((s, i) => (
                <SlotCopy
                  key={s.id}
                  service={s}
                  index={i}
                  count={count}
                  track={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-8">
              <ServiceProgress progress={scrollYProgress} />
            </div>
          </div>

          {/* Right: one stage, every scene stacked on it. */}
          <div className="relative col-span-8 h-full py-6">
            {PUBLIC_SERVICES.map((s, i) => (
              <SlotStage
                key={s.id}
                service={s}
                index={i}
                count={count}
                track={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type SlotProps = {
  service: Service;
  index: number;
  count: number;
  track: MotionValue<number>;
};

function SlotCopy({ service, index, count, track }: SlotProps) {
  const slot = useServiceSlot(track, index, count, index === count - 1);

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{ opacity: slot.copyPresence, pointerEvents: slot.copyPointerEvents }}
    >
      <ServiceCopy service={service} progress={slot.local} />
    </motion.div>
  );
}

function SlotStage({ service, index, count, track }: SlotProps) {
  const slot = useServiceSlot(track, index, count, index === count - 1);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: slot.presence, pointerEvents: slot.pointerEvents }}
    >
      <ServiceStage id={service.id} progress={slot.local} />
    </motion.div>
  );
}

/**
 * Tablet and mobile: no pinning. Each service is its own chapter and animates
 * to its settled state once it enters view.
 *
 * From 768px up the chapter splits into copy | stage rather than stacking them,
 * which uses the width a tablet actually has and gives the scene a box close to
 * its authored aspect instead of a shallow full-width band it has to letterbox
 * inside. Below that it is one column, normal vertical scrolling, no hover and
 * no pinning.
 */
function StackedSequence() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={wrap} className="page-x relative pb-14 sm:pb-20 md:pb-24">
      <SectionLabel />
      <span aria-hidden className="mt-6 block h-px w-full bg-line" />

      {PUBLIC_SERVICES.map((s, i) => (
        <StackedService key={s.id} service={s} first={i === 0} />
      ))}

      <div className="mt-16 md:mt-20">
        <ServiceProgress progress={scrollYProgress} />
      </div>
    </div>
  );
}

function StackedService({ service, first }: { service: Service; first: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      progress.set(0.74);
      return;
    }
    const controls = animate(progress, 0.74, { duration: 1.8, ease: EASE });
    return () => controls.stop();
  }, [inView, reduced, progress]);

  return (
    <div
      ref={ref}
      className={
        first
          ? "pt-12 md:pt-14"
          : "mt-16 border-t border-line pt-12 md:mt-20 md:pt-14"
      }
    >
      <div className="md:grid md:grid-cols-12 md:items-center md:gap-x-8">
        <div className="md:col-span-5">
          <ServiceCopy service={service} progress={progress} />
        </div>

        {/* One aspect for every width: the scenes are composed in percentages,
            so a stable box is what keeps them from spilling. */}
        <div className="relative mt-10 aspect-[1.141] w-full md:col-span-7 md:mt-0">
          <ServiceStage id={service.id} progress={progress} />
        </div>
      </div>
    </div>
  );
}
