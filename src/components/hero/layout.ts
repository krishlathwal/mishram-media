/**
 * Spatial composition for the hero. Content lives in `@/config/hero`;
 * this file is only how those surfaces sit in space.
 *
 * Positions were composed in projected screen space, then divided back through
 * the perspective scale `camera.z / (camera.z - surface.z)` so a surface pushed
 * further back lands where it was composed instead of drifting toward centre.
 *
 * Each surface then drifts along a slow ellipse — radii stay under a fifth of a
 * unit and periods run 110–240s, so the scene reads as depth, not as a carousel.
 *
 * Exposure (`base`) carries the depth hierarchy: one bright foreground anchor,
 * two mid-ground frames, and everything else receding into the obsidian.
 */

export type SurfaceLayout = {
  id: string;
  /** Centre of this surface's elliptical path, in world units. */
  center: [number, number, number];
  /** [x radius, z radius] of that ellipse. */
  radius: [number, number];
  /** Starting angle, keeps the group out of lockstep. */
  phase: number;
  /** Radians per second. */
  speed: number;
  /** Vertical bob. */
  bob: number;
  bobSpeed: number;
  /** Resting rotation, in radians. */
  tilt: [number, number, number];
  /** World-unit height of the frame. */
  height: number;
  /** Resting exposure — how far back into the dark this surface sits. */
  base: number;
  /** Extra depth it starts from before the entry animation. */
  entryDepth: number;
  /** Transparent sort hint, front-most last. */
  order: number;
};

const TAU = Math.PI * 2;

export const DESKTOP_LAYOUT: Record<string, SurfaceLayout> = {
  // Foreground anchor, sitting just clear of the type column.
  zoya: {
    id: "zoya",
    center: [1.103, 0.048, 0.25],
    radius: [0.13, 0.15],
    phase: 0.25 * TAU,
    speed: 0.048,
    bob: 0.05,
    bobSpeed: 0.3,
    tilt: [0.015, -0.14, -0.012],
    height: 1.82,
    base: 1,
    entryDepth: 1.5,
    order: 7,
  },
  // Mid ground, upper right.
  ali: {
    id: "ali",
    center: [2.812, 0.631, -0.9],
    radius: [0.12, 0.14],
    phase: 0.72 * TAU,
    speed: 0.04,
    bob: 0.065,
    bobSpeed: 0.26,
    tilt: [0.012, -0.17, 0.018],
    height: 1.549,
    base: 0.74,
    entryDepth: 1.8,
    order: 5,
  },
  // Square campaign moment, lower right.
  lovkesh: {
    id: "lovkesh",
    center: [2.394, -0.937, -0.25],
    radius: [0.11, 0.12],
    phase: 0.08 * TAU,
    speed: 0.052,
    bob: 0.045,
    bobSpeed: 0.36,
    tilt: [-0.018, -0.15, 0.015],
    height: 0.958,
    base: 0.8,
    entryDepth: 1.2,
    order: 6,
  },
  // 4:5 frame set well back, high and close to the type edge.
  akash: {
    id: "akash",
    center: [0.133, 1.328, -2.0],
    radius: [0.16, 0.15],
    phase: 0.42 * TAU,
    speed: 0.034,
    bob: 0.075,
    bobSpeed: 0.22,
    tilt: [0.028, -0.07, -0.024],
    height: 1.394,
    base: 0.62,
    entryDepth: 2.0,
    order: 3,
  },
  // Deepest photographic surface — drifts behind the headline, barely there.
  nikita: {
    id: "nikita",
    center: [-2.26, 1.282, -3.1],
    radius: [0.2, 0.17],
    phase: 0.86 * TAU,
    speed: 0.028,
    bob: 0.09,
    bobSpeed: 0.18,
    tilt: [0.016, 0.1, 0.035],
    height: 1.885,
    base: 0.26,
    entryDepth: 2.3,
    order: 1,
  },

  // ── Non-photographic surfaces ────────────────────────────────────
  // An abstracted website layout, set back between the two portraits.
  interface: {
    id: "interface",
    center: [2.749, 1.48, -2.5],
    radius: [0.14, 0.13],
    phase: 0.3 * TAU,
    speed: 0.031,
    bob: 0.055,
    bobSpeed: 0.24,
    tilt: [0.03, -0.12, 0.016],
    height: 1.1,
    base: 0.45,
    entryDepth: 1.9,
    order: 2,
  },
  // Performance fragment, deep and to the right.
  growth: {
    id: "growth",
    center: [3.967, 0.072, -2.7],
    radius: [0.18, 0.15],
    phase: 0.66 * TAU,
    speed: 0.025,
    bob: 0.08,
    bobSpeed: 0.2,
    tilt: [-0.022, -0.15, -0.018],
    height: 0.894,
    base: 0.4,
    entryDepth: 2.1,
    order: 2,
  },
};

/**
 * Stacked form — phones and portrait tablets. Four surfaces composed for the
 * lower band of the hero with the closer camera.
 */
export const MOBILE_LAYOUT: Record<string, SurfaceLayout> = {
  zoya: {
    ...DESKTOP_LAYOUT.zoya,
    center: [-0.597, -0.096, 0.2],
    radius: [0.08, 0.09],
    height: 1.974,
  },
  ali: {
    ...DESKTOP_LAYOUT.ali,
    center: [0.781, 0.689, -0.8],
    radius: [0.07, 0.08],
    height: 1.607,
    base: 0.82,
  },
  akash: {
    ...DESKTOP_LAYOUT.akash,
    center: [1.02, -0.967, -0.4],
    radius: [0.07, 0.07],
    height: 1.02,
    base: 0.78,
  },
  interface: {
    ...DESKTOP_LAYOUT.interface,
    center: [-1.35, 1.88, -1.6],
    radius: [0.09, 0.09],
    height: 0.856,
    base: 0.48,
  },
};

/** Camera per breakpoint. */
export const CAMERA = {
  desktop: { position: [0, 0, 6.1] as const, fov: 38 },
  mobile: { position: [0, 0, 5.4] as const, fov: 44 },
};

/** Where the orbit rings sit, and how large they read, per breakpoint. */
export const RINGS = {
  desktop: { origin: [1.5, -0.1, -1.4] as const, scale: 1 },
  mobile: { origin: [0.05, -0.1, -1.1] as const, scale: 0.6 },
};

/** Entry stagger, in seconds, keyed by surface id. */
export const ENTRY_DELAY: Record<string, number> = {
  zoya: 0.0,
  lovkesh: 0.1,
  ali: 0.18,
  interface: 0.26,
  akash: 0.34,
  growth: 0.42,
  nikita: 0.5,
};

/** Colours the WebGL scene needs, mirrored from the CSS theme tokens. */
export type SceneTheme = {
  light: boolean;
  /** Page background — what surfaces recede into in the light theme. */
  canvas: string;
  /** Hairline around each media surface. */
  edge: string;
  accent: string;
  ring: string;
  ringOpacity: [number, number];
};

export const SCENE_THEME: Record<'dark' | 'light', SceneTheme> = {
  dark: {
    light: false,
    canvas: '#0a0a0a',
    edge: '#f3efe7',
    accent: '#35d6c0',
    ring: '#f3efe7',
    ringOpacity: [0.075, 0.045],
  },
  light: {
    light: true,
    canvas: '#f3f0e8',
    edge: '#11110f',
    accent: '#0b8f80',
    // Delicate graphite rather than ivory.
    ring: '#11110f',
    ringOpacity: [0.1, 0.06],
  },
};
