"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";

import { useStackedHero } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

import { HERO_ANNOTATIONS } from "@/config/hero";

import { HeroStatic } from "./HeroStatic";
import type { HoverPayload, PlaceAnnotation } from "./Scene";

// The whole three.js payload stays out of the initial bundle and off the server.
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
});

let webglSupport: boolean | null = null;

/** Probed once per document and cached; the throwaway context is discarded. */
function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

// Server render resolves to null so the fallback images are never requested
// by clients that will run the canvas anyway.
const UNKNOWN_WEBGL = () => null;
const noopSubscribe = () => () => {};

/** Any failure inside the canvas drops back to the static composition. */
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type HeroSceneProps = {
  /** The hero section, used for scroll progress and visibility. */
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HeroScene({ sectionRef }: HeroSceneProps) {
  const reduced = usePrefersReducedMotion();
  const stacked = useStackedHero();
  const { theme } = useTheme();
  const supported = useSyncExternalStore<boolean | null>(
    noopSubscribe,
    hasWebGL,
    UNKNOWN_WEBGL,
  );
  const [visible, setVisible] = useState(true);
  const [hover, setHover] = useState<HoverPayload>(null);

  const scrollRef = useRef(0);
  const captionRef = useRef<HTMLDivElement>(null);
  const annotationNodes = useRef<(HTMLElement | null)[]>([]);

  // Scroll progress across the hero, written to a ref so the render loop can
  // read it without re-rendering React.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const h = el.offsetHeight || 1;
      scrollRef.current = Math.max(0, Math.min(1, window.scrollY / h));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  // Stop rendering when the hero leaves the viewport or the tab is hidden.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0 },
    );
    io.observe(el);

    const onVisibility = () =>
      setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [sectionRef]);

  // The hover caption follows the pointer instead of anchoring to the frame.
  useEffect(() => {
    if (stacked || reduced) return;
    const onMove = (e: PointerEvent) => {
      const node = captionRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${e.clientX + 18}px, ${e.clientY + 18}px, 0)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [stacked, reduced]);

  const onHover = useCallback((payload: HoverPayload) => setHover(payload), []);

  const placeAnnotation = useCallback<PlaceAnnotation>((i, x, y, opacity) => {
    const el = annotationNodes.current[i];
    if (!el) return;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translateY(-50%)`;
    el.style.opacity = String(opacity);
  }, []);

  const staticFallback = (
    <HeroStatic className="absolute inset-0 h-full w-full" />
  );

  return (
    <>
      <div className="absolute inset-0 h-full w-full">
        {supported === null ? null : supported ? (
          <SceneBoundary fallback={staticFallback}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.9 : 0.6, delay: 0.15 }}
              className="h-full w-full"
            >
              <Scene
                stacked={stacked}
                reduced={reduced}
                scrollRef={scrollRef}
                onHover={onHover}
                active={visible}
                placeAnnotation={placeAnnotation}
                theme={theme}
              />
            </motion.div>
          </SceneBoundary>
        ) : (
          staticFallback
        )}

        {/* Editorial annotations. Real DOM text, placed each frame by the
            render loop so it parallaxes with the surfaces around it. */}
        {supported && !stacked && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {HERO_ANNOTATIONS.map((a, i) => (
              <span
                key={a.id}
                ref={(el) => {
                  annotationNodes.current[i] = el;
                }}
                className="absolute top-0 left-0 flex items-center gap-2 whitespace-nowrap opacity-0 will-change-transform"
              >
                <span className="block h-px w-5 bg-ink/25" />
                <span className="caps text-[0.5625rem] text-ink/45">
                  {a.text}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pointer caption for hovered media surfaces */}
      <div
        ref={captionRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 border-l border-accent bg-canvas/85 py-1.5 pr-3.5 pl-3 backdrop-blur-sm"
            >
              <span className="text-[0.75rem] leading-none font-medium text-ink">
                {hover.label}
              </span>
              <span aria-hidden className="h-2.5 w-px bg-line-strong" />
              <span className="caps text-[0.5rem] text-ink-soft">
                {hover.caption}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
