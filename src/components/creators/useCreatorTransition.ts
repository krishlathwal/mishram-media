"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * How long the outgoing creator stays mounted after being replaced: the stage's
 * 460ms wipe plus the 90ms the supporting frames trail the portrait by.
 */
const CLEAR_MS = 560;
const CLEAR_MS_REDUCED = 220;

/**
 * If an image is slow or fails, the selection must not appear stuck. After this
 * the switch happens regardless — and the worst case is the frame's own
 * `canvas-raise` background for a moment, never a white flash.
 */
const WAIT_CAP_MS = 900;

/**
 * Gates the creator switch on the incoming photograph being ready, and keeps the
 * outgoing one mounted only for as long as the transition needs it.
 *
 * The roster used to mount **every** creator's frames at once, which is what
 * made switching instant with five of them. At twenty that is sixty image nodes
 * on a section most visitors scroll past, so the stage now mounts on demand —
 * and the reason it still feels instant is this hook rather than the mounting.
 *
 * - `shownId` is what the stage and the name actually display. It changes only
 *   once the incoming portrait has loaded, so a switch never reveals an empty
 *   frame.
 * - `outgoingId` is the creator being wiped away. It exists for one transition
 *   and is then unmounted, which is what bounds the mounted set.
 *
 * The index rows deliberately do **not** wait on this — they track the raw
 * selection, so a hover always feels acknowledged immediately. The photograph
 * and the large name are what land together, on one beat.
 */
export function useCreatorTransition(activeId: string, reduced: boolean) {
  const [shownId, setShownId] = useState(activeId);
  const [outgoingId, setOutgoingId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(
    () => new Set<string>(),
  );

  /** Reported by the stage when a creator's portrait has decoded. */
  const markLoaded = useCallback((id: string) => {
    setLoaded((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    if (activeId === shownId) return;

    const promote = () => {
      setOutgoingId(shownId);
      setShownId(activeId);
    };

    if (loaded.has(activeId)) {
      promote();
      return;
    }

    const timer = window.setTimeout(promote, WAIT_CAP_MS);
    return () => window.clearTimeout(timer);
  }, [activeId, shownId, loaded]);

  useEffect(() => {
    if (outgoingId === null) return;
    const timer = window.setTimeout(
      () => setOutgoingId(null),
      reduced ? CLEAR_MS_REDUCED : CLEAR_MS,
    );
    return () => window.clearTimeout(timer);
  }, [outgoingId, reduced]);

  return { shownId, outgoingId, markLoaded };
}
