/**
 * The mark that hangs under the active scope detail on this page.
 *
 * A miniature of the hero's constellation: a handful of nodes converging on one
 * teal point. It is what makes the **shared** scope index feel like it belongs
 * to Influencer Marketing rather than to Service 01 — supplied through the
 * component's `accessory` slot, so neither page had to fork it.
 *
 * Decorative and `aria-hidden`: the detail beside it already says everything.
 * Uniform viewBox on a fixed-aspect box, so the hairlines stay hairlines.
 */
export function ScopeConstellationMark() {
  const nodes: readonly [number, number][] = [
    [8, 12],
    [26, 4],
    [10, 40],
    [34, 46],
    [50, 20],
  ];

  return (
    <span aria-hidden className="inf-scope-mark">
      <svg viewBox="0 0 96 54" fill="none" className="block h-full w-full">
        {nodes.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y} C ${(x + 84) / 2} ${y}, ${(x + 84) / 2} 30, 84 30`}
            stroke="var(--color-line-strong)"
            strokeWidth="0.5"
          />
        ))}
        {nodes.map(([x, y]) => (
          <circle
            key={`n-${x}-${y}`}
            cx={x}
            cy={y}
            r="1.6"
            fill="var(--color-ink)"
            fillOpacity="0.3"
          />
        ))}
        <circle cx="84" cy="30" r="3.4" stroke="var(--color-accent)" strokeWidth="0.6" />
        <circle cx="84" cy="30" r="1.2" fill="var(--color-accent)" />
      </svg>
    </span>
  );
}
