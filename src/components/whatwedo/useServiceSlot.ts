"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * How far into the previous service's slot a service begins entering, as a
 * fraction of one slot. The overlap is what makes one visual system transform
 * into the next rather than cross-fading between two slides.
 */
const SLOT_LEAD = 0.16;

/** How long a finished service lingers, in slot units, before it is removed. */
const SLOT_TAIL = 0.08;

export type ServiceSlot = {
  /** 0..1 across this service's own window, including its lead-in. */
  local: MotionValue<number>;
  /** 0..1 mount presence — gates opacity so a passed service does not linger. */
  presence: MotionValue<number>;
  /**
   * Tighter than `presence`: the stages overlap so one transforms into the
   * next, but two sets of readable copy must never share the column.
   */
  copyPresence: MotionValue<number>;
  /** "auto" only while this service is the active one. */
  pointerEvents: MotionValue<string>;
  copyPointerEvents: MotionValue<string>;
};

/**
 * Maps the shared 0..1 track progress onto one service's slot.
 *
 * Slot i owns track positions [i, i+1) but starts entering at `i - SLOT_LEAD`,
 * so while service i-1 plays out its exit posture, service i is already
 * emerging from depth behind it.
 */
export function useServiceSlot(
  trackProgress: MotionValue<number>,
  index: number,
  count: number,
  isLast: boolean,
): ServiceSlot {
  const start = Math.max(0, index - SLOT_LEAD);
  const end = index + 1;

  const local = useTransform(trackProgress, (p) => {
    const slot = p * count;
    return Math.min(1, Math.max(0, (slot - start) / (end - start)));
  });

  const presence = useTransform(trackProgress, (p) => {
    const slot = p * count;
    if (slot <= start) return 0;
    if (slot < start + 0.06) return (slot - start) / 0.06;
    // The final service holds its exit posture instead of disappearing.
    if (isLast || slot <= end) return 1;
    if (slot < end + SLOT_TAIL) return 1 - (slot - end) / SLOT_TAIL;
    return 0;
  });

  // Copy swaps cleanly at the slot boundary rather than overlapping.
  const COPY_FADE = 0.05;
  const copyPresence = useTransform(trackProgress, (p) => {
    const slot = p * count;
    if (index > 0) {
      if (slot <= index - COPY_FADE) return 0;
      if (slot < index + COPY_FADE) {
        return (slot - (index - COPY_FADE)) / (COPY_FADE * 2);
      }
    }
    if (isLast || slot <= end - COPY_FADE) return 1;
    if (slot < end + COPY_FADE) {
      return 1 - (slot - (end - COPY_FADE)) / (COPY_FADE * 2);
    }
    return 0;
  });

  const pointerEvents = useTransform(
    [presence, local] as const,
    ([pr, lo]: number[]): string => (pr > 0.6 && lo < 0.85 ? "auto" : "none"),
  );

  const copyPointerEvents = useTransform(
    copyPresence,
    (v): string => (v > 0.6 ? "auto" : "none"),
  );

  return { local, presence, copyPresence, pointerEvents, copyPointerEvents };
}
