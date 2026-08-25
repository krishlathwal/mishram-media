"use client";

import { useEffect } from "react";

/** How long after load the page is still allowed to change height under us. */
const SETTLE_WINDOW = 1600;

/**
 * Re-lands a hash that was already in the URL when the page loaded.
 *
 * The browser performs that first fragment scroll against the server-rendered
 * page — and hydration then changes the page height underneath it. §02 is the
 * culprit: `useDesktopSequence` resolves to `false` on the server, so the HTML
 * ships the stacked chapters and hydration swaps in the pinned track, which is
 * **2,247px taller at 1440×900**. Everything below §02 moves down by that much
 * and a deep link to `#work` or `#about` lands a couple of thousand pixels
 * short of its section.
 *
 * So this repeats the browser's own `scrollIntoView` — no offset arithmetic,
 * `scroll-margin-top` still supplies the header clearance — each time the
 * document's height changes, until it stops changing. Instant on purpose: a
 * load-time fragment should arrive, not travel, and the CSS `scroll-behavior:
 * smooth` would otherwise animate the whole page height while the target is
 * still moving.
 *
 * **Only ever runs once, only when the URL arrived with a hash, and any input
 * from the visitor ends it immediately.** In-page anchor clicks never reach
 * this — the page height is settled by then and the browser handles them alone.
 */
export function useHashLanding(): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;

    let stopped = false;

    const align = () => {
      if (stopped) return;
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    const stop = () => {
      if (stopped) return;
      stopped = true;
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };

    // `body` carries the page's real height; `html` is pinned to `h-full`.
    const observer = new ResizeObserver(align);
    const timer = window.setTimeout(stop, SETTLE_WINDOW);

    align();
    observer.observe(document.body);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    return stop;
  }, []);
}
