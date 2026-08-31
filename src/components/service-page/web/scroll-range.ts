"use client";

import { transform, useTransform, type MotionValue } from "motion/react";

/**
 * `useTransform` over a numeric range, **pinned to the JavaScript path**.
 *
 * ── WHY THIS EXISTS, AND IT IS NOT AN OPTIMISATION ────────────────────────
 *
 * `useTransform(scrollProgress, inputRange, outputRange)` is not always a
 * JavaScript subscription. When the input comes from `useScroll` and the range
 * is a literal array, Motion attaches an `accelerate` descriptor
 * (`framer-motion/value/use-transform`), and `VisualElement.bindToMotionValue`
 * turns it into a **WAAPI animation on a ScrollTimeline** — but only for the
 * five properties in `acceleratedValues`, of which `opacity` is one.
 *
 * That path cost this page two separate defects:
 *
 * 1. **It throws on an out-of-range stop.** WAAPI keyframe offsets must sit
 *    inside [0, 1]; the natural cross-fade band around a slot boundary
 *    (`start - band` … `end + band`) produces `-0.07` and `1.07`. Chrome
 *    rejects the whole animation during `commitLayoutEffect` — *"Offsets must
 *    be monotonically non-decreasing"* — and the entire page renders blank.
 *
 * 2. **It does not track this page's scroll ranges.** Measured on the pinned
 *    work stage at progress 0.994: `scale`, which is a transform prop and
 *    therefore always on the JS path, read `0.985` — exactly right. `opacity`,
 *    on the accelerated path and driven from the same MotionValue with the
 *    same range, read `1` where it should have read `0`. Both projects'
 *    meta rendered on top of each other.
 *
 * The behaviour of (2) is Motion's ScrollTimeline mapping, not something this
 * page can configure, so the fix is to stay off that path: passing a
 * **transformer function** rather than a range makes `useTransform` skip
 * `accelerate` entirely, which is exactly the code path every other animated
 * value in this codebase already takes. The cost is an opacity write per frame
 * on a handful of elements — immaterial next to a section that does not work.
 *
 * `transform` is Motion's own range interpolator, so the interpolation itself
 * is unchanged; only who runs it moves.
 */
export function useScrollRange(
  value: MotionValue<number>,
  range: readonly number[],
  output: readonly number[],
): MotionValue<number> {
  return useTransform(value, transform([...range], [...output]));
}
