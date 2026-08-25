/**
 * The mark that hangs under the active scope detail on this page.
 *
 * A frame index: one crop-marked rectangle with a thirds guide inside it, and
 * three smaller format outlines beside it at 9:16, 1:1 and 16:9 — the page's
 * own language at fragment scale, and the same idea the whole route argues
 * (one frame, several shapes).
 *
 * **Nothing in common with the other two scope accessories.** Service 02's is
 * five nodes converging inward on one point; Service 03's is a route that
 * branches and returns. This one does not travel at all — it is a set of
 * rectangles, which is the difference between a diagram and a sheet.
 *
 * Decorative and `aria-hidden`: the detail beside it already says everything.
 * Uniform viewBox on a fixed-aspect box, so the hairlines stay hairlines.
 */
export function ScopeFrameMark() {
  const line = "var(--color-line-strong)";
  const accent = "var(--color-accent)";

  /** Small format outlines, sized off a shared baseline so they read as a set. */
  const formats: readonly { x: number; w: number; h: number }[] = [
    { x: 56, w: 8, h: 14 },
    { x: 68, w: 12, h: 12 },
    { x: 84, w: 12, h: 7 },
  ];

  return (
    <span aria-hidden className="sht-scope-mark">
      <svg viewBox="0 0 96 54" fill="none" className="block h-full w-full">
        {/* The frame, with crop marks rather than a border on every side. */}
        <rect x="6" y="10" width="38" height="34" stroke={line} strokeWidth="0.6" />
        <line x1="18.7" y1="10" x2="18.7" y2="44" stroke={line} strokeOpacity="0.5" strokeWidth="0.4" />
        <line x1="31.3" y1="10" x2="31.3" y2="44" stroke={line} strokeOpacity="0.5" strokeWidth="0.4" />
        <line x1="6" y1="21.3" x2="44" y2="21.3" stroke={line} strokeOpacity="0.5" strokeWidth="0.4" />
        <line x1="6" y1="32.7" x2="44" y2="32.7" stroke={line} strokeOpacity="0.5" strokeWidth="0.4" />

        {/* Crop marks at the corners — the page's recurring editorial mark. */}
        {(
          [
            [6, 10, 1, 1],
            [44, 10, -1, 1],
            [6, 44, 1, -1],
            [44, 44, -1, -1],
          ] as const
        ).map(([x, y, dx, dy]) => (
          <g key={`${x}-${y}`}>
            <line x1={x} y1={y} x2={x + dx * 5} y2={y} stroke={accent} strokeOpacity="0.8" strokeWidth="0.8" />
            <line x1={x} y1={y} x2={x} y2={y + dy * 5} stroke={accent} strokeOpacity="0.8" strokeWidth="0.8" />
          </g>
        ))}

        {/* The same frame, cut three other ways. */}
        {formats.map((f) => (
          <rect
            key={f.x}
            x={f.x}
            y={27 - f.h / 2}
            width={f.w}
            height={f.h}
            stroke={line}
            strokeWidth="0.5"
          />
        ))}
        <line x1="48" y1="27" x2="54" y2="27" stroke={accent} strokeOpacity="0.6" strokeWidth="0.5" />
      </svg>
    </span>
  );
}
