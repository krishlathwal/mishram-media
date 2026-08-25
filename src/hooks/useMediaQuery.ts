"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. The value is correct on the first client
 * render; server rendering falls back to `initial`.
 */
export function useMediaQuery(query: string, initial = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => initial,
  );
}

/**
 * The hero composition has two forms: a wide one where the media system spans
 * the whole section, and a stacked one where it takes the lower band. The
 * switch is driven by frame shape, not width alone — a portrait tablet needs
 * the stacked composition even though it is 820px across.
 *
 * Keep this in sync with the `.hero-media` / `.hero-scrim` rules in globals.css.
 */
export const STACKED_HERO_QUERY =
  "(max-width: 767px), (max-width: 1100px) and (orientation: portrait)";

export function useStackedHero(): boolean {
  return useMediaQuery(STACKED_HERO_QUERY, true);
}

/**
 * The pinned What We Do sequence needs three things at once, and a viewport
 * that fails any of them gets the stacked chapters instead.
 *
 * **Width 1280.** Not a device guess — the measured point where the 4-column
 * copy stops being cramped. The capability rail needs a ~168px cell to hold
 * `Creative Production` on one line and stay two columns; below two columns it
 * becomes four rows and overflows the fixed `h-[22rem]` copy holder into the
 * progress indicator (at 1024px it overshot by 65px). A 12-column grid only
 * gives `col-span-4` that much room from about 1254px up, so 1280.
 *
 * **Height 680 and a landscape frame.** A 100svh panel is only worth pinning if
 * there is height to pin, and a portrait tablet cannot carry the composition
 * however wide it looks.
 *
 * Mirrored by `data-sequence` on the section, which gates the scene annotations
 * in CSS — keep the two in step.
 */
export const DESKTOP_SEQUENCE_QUERY =
  "(min-width: 1280px) and (min-height: 680px) and (min-aspect-ratio: 5 / 4)";

export function useDesktopSequence(): boolean {
  return useMediaQuery(DESKTOP_SEQUENCE_QUERY);
}
