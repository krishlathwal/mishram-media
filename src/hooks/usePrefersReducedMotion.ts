"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Resolves correctly on the first client render, so nothing starts animating
 * and then reverses course. Server rendering assumes motion is allowed;
 * everything that reads this is either client-only or visually inert until
 * hydration.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
