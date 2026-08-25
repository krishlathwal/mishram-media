"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { routeMarker } from "@/config/routes";
import { Wordmark } from "@/components/ui/Wordmark";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * THE MISHRAM SIGNAL WIPE — one route transition for the whole site.
 *
 * A route replacement in the App Router is close to instantaneous for a
 * prerendered page, which is a performance win and a comprehension problem: a
 * visitor clicks `Explore service ↗`, the screen changes, and nothing tells
 * them a *page* changed rather than a section. This is that signal.
 *
 * **It never stalls navigation.** `router.push` fires on the same tick as the
 * click; the overlay animates over the top while the browser does the work.
 * The wipe is feedback, not a loading screen, and there is no artificial delay
 * anywhere in it. The panel leaves as soon as both the cover has finished and
 * the destination has actually rendered.
 *
 *   cover 230ms → (destination arrives) → reveal 280ms
 *
 * so a prefetched route reads as roughly **half a second** end to end.
 *
 * **No spinner, no percentage, no progress ring, no bouncing dots.** The panel
 * is the footer's obsidian field, a teal signal line and the Mishram wordmark
 * — the same three things the closing canvas is built from, so a page change
 * feels like part of the same brand rather than a system message.
 *
 * SCOPE. Pathname changes only, and only through `PageLink`. Same-page hash
 * navigation (`#creators`) stays native and immediate. Cross-page hash links
 * (`/#what-we-do` from a service page) deliberately stay full navigations too
 * — §10g records why: only a real navigation re-runs `useHashLanding`, which
 * is what corrects the landing after the homepage's hydration changes its
 * height. External links, `mailto:`, `tel:` and WhatsApp are untouched.
 *
 * BACK / FORWARD are left entirely alone. History navigation resolves the way
 * the browser intends; nothing here hijacks it.
 */

const COVER_MS = 230;
const REVEAL_MS = 280;

/**
 * The panel can never become a trap. If a destination somehow does not arrive,
 * the overlay clears itself and the visitor sees whatever the router landed on.
 */
const MAX_COVER_MS = 2200;

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

type Phase = "idle" | "cover" | "reveal";

type TransitionApi = {
  /** Navigate to an internal path with the wipe. Falls back to a plain push. */
  start: (href: string) => void;
};

const Ctx = createContext<TransitionApi | null>(null);

/** `null` outside the provider, so a link can degrade instead of crashing. */
export function useRouteTransition(): TransitionApi | null {
  return useContext(Ctx);
}

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const [target, setTarget] = useState<string | null>(null);
  /** When the cover began, so the reveal can wait out only what is left of it. */
  const coverStart = useRef(0);

  const start = useCallback(
    (href: string) => {
      const [path] = href.split("#");

      // Reduced motion gets the navigation and nothing else — never a delay,
      // and never a sweeping overlay somebody asked not to see.
      if (reduced || !path || path === pathname) {
        router.push(href);
        return;
      }

      coverStart.current = performance.now();
      setTarget(path);
      setPhase("cover");
      // Fired now, not after the cover: the animation runs *over* the
      // navigation rather than in front of it.
      router.push(href);
    },
    [pathname, reduced, router],
  );

  const arrived = target !== null && pathname === target;

  /**
   * Leave once the destination is real **and** the cover has had its full
   * span — whichever finishes last. A prefetched route usually arrives first,
   * so this is normally just waiting out the remainder of the wipe; a slower
   * one is simply covered for longer, which is the whole point of the panel.
   */
  useEffect(() => {
    if (phase !== "cover" || !arrived) return;
    const remaining = Math.max(0, COVER_MS - (performance.now() - coverStart.current));
    const t = window.setTimeout(() => {
      // Done while the field is opaque, so a new route always opens at its top
      // without the visitor watching a 9,000px homepage scroll unwind.
      window.scrollTo(0, 0);
      setPhase("reveal");
    }, remaining);
    return () => window.clearTimeout(t);
  }, [phase, arrived]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = window.setTimeout(() => {
      setPhase("idle");
      setTarget(null);
    }, REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  // The escape hatch. Nothing is ever left behind an overlay.
  useEffect(() => {
    if (phase !== "cover") return;
    const t = window.setTimeout(() => {
      setPhase("idle");
      setTarget(null);
    }, MAX_COVER_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const api = useMemo<TransitionApi>(() => ({ start }), [start]);
  const marker = routeMarker(target ?? pathname);

  return (
    <Ctx.Provider value={api}>
      {children}

      <AnimatePresence>
        {phase !== "idle" ? (
          <motion.div
            key="route-wipe"
            // Decorative: Next's own route announcer handles telling a screen
            // reader where it landed, and this panel holds nothing focusable,
            // so it can neither trap focus nor be announced twice.
            aria-hidden
            className="rt-panel grain"
            initial={{ y: "100%" }}
            animate={{ y: phase === "reveal" ? "-100%" : "0%" }}
            transition={{
              duration: (phase === "reveal" ? REVEAL_MS : COVER_MS) / 1000,
              ease: EASE_IN_OUT,
            }}
          >
            {/* The signal crossing — the same teal hairline the footer opens
                on, travelling the leading edge of the field. */}
            <motion.span
              className="rt-signal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="rt-mark"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Wordmark className="rt-wordmark" />
              {marker.eyebrow ? (
                <p className="caps mt-6 text-ink-muted">{marker.eyebrow}</p>
              ) : null}
              <p className="rt-label">{marker.label}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
