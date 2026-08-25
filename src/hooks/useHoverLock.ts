"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hover-previews-and-click-locks selection, extracted from the pattern proven
 * in 03 / Creators.
 *
 * Hovering (or focusing) an item previews it; clicking locks it; leaving the
 * group restores whatever is locked. That last part is the important one —
 * without it, sweeping a cursor down a list strands the visitor on an item they
 * never chose. Previews are debounced so a fast cursor crossing four rows on
 * its way somewhere else does not fire four transitions.
 *
 * Creators still carries its own copy of this logic and is locked, so it was
 * left alone; it can adopt this hook whenever that section is next reopened.
 */
export function useHoverLock<T extends string>(
  initial: T,
  /** Debounce before a hover becomes a preview. 90ms is the tested value. */
  delay = 90,
) {
  const [lockedId, setLockedId] = useState<T>(initial);
  const [previewId, setPreviewId] = useState<T | null>(null);
  const timer = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const preview = useCallback(
    (id: T) => {
      clearTimer();
      timer.current = window.setTimeout(() => setPreviewId(id), delay);
    },
    [clearTimer, delay],
  );

  const clearPreview = useCallback(() => {
    clearTimer();
    setPreviewId(null);
  }, [clearTimer]);

  const select = useCallback(
    (id: T) => {
      clearTimer();
      setPreviewId(null);
      setLockedId(id);
    },
    [clearTimer],
  );

  return {
    /** What the visitor is looking at right now — preview wins over lock. */
    activeId: previewId ?? lockedId,
    /** What they actually chose. Drives `aria-current`, never the preview. */
    lockedId,
    preview,
    clearPreview,
    select,
  };
}
