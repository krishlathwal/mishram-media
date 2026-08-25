"use client";

import { useEffect, useState } from "react";

/**
 * Where the page decides which section it is "on": a horizontal scan line at
 * 45% of the viewport height. Expressed as a root margin that collapses the
 * observer root to that single line, so the sections — which are contiguous,
 * full-width siblings — can only cross it one at a time.
 */
const SCAN_LINE = "-45% 0px -55% 0px";

/**
 * Which section currently holds the scan line.
 *
 * Deliberately not a scroll spy. There is no scroll listener, no measurement
 * loop and no React state update per scroll pixel — one IntersectionObserver
 * fires a handful of times per page, which is once per section boundary.
 *
 * Two behaviours worth keeping:
 *
 * - **Nothing on the line holds the last reading.** Collaborations, Work
 *   Process and the footer are not navigation destinations, so scrolling
 *   through them keeps the previous item lit rather than blanking the header
 *   and lighting it again a moment later.
 * - **At a boundary the later section wins.** Two adjacent sections can touch
 *   the line on the same frame; resolving in document order means the one being
 *   scrolled into takes it, never the one being left.
 *
 * Returns `null` until the first callback, and whenever the page has never had
 * a tracked section on the line.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const onLine = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onLine.add(entry.target.id);
          else onLine.delete(entry.target.id);
        }

        for (let i = ids.length - 1; i >= 0; i -= 1) {
          if (onLine.has(ids[i])) {
            setActive(ids[i]);
            return;
          }
        }
      },
      { rootMargin: SCAN_LINE, threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
