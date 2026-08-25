/**
 * The mark that hangs under the active scope detail on this page.
 *
 * A miniature of the hero's experiment field: three variants branching off one
 * hypothesis, one of them carrying on into a destination node, and a faint
 * return arc beneath. It is what makes the **shared** scope index feel like it
 * belongs to Performance Marketing — supplied through `ServiceScope`'s
 * `accessory` slot, so neither this page nor Service 02 had to fork it (§10l:
 * art-direct a shared primitive with a slot, never a fork).
 *
 * **Nothing in common with Service 02's constellation mark**, which is five
 * nodes converging inward on one point. This one travels left to right and
 * comes back.
 *
 * Decorative and `aria-hidden`: the detail beside it already says everything.
 * Uniform viewBox on a fixed-aspect box, so the hairlines stay hairlines.
 */
export function ScopeExperimentMark() {
  /** Where the three variants leave the hypothesis. */
  const branches: readonly number[] = [12, 27, 42];

  return (
    <span aria-hidden className="pfm-scope-mark">
      <svg viewBox="0 0 96 54" fill="none" className="block h-full w-full">
        {/* The hypothesis. */}
        <rect x="4" y="22" width="8" height="10" stroke="var(--color-line-strong)" strokeWidth="0.6" />

        {branches.map((y, i) => (
          <path
            key={y}
            d={`M12 27 C 24 27, 26 ${y}, 38 ${y}`}
            stroke={i === 1 ? "var(--color-accent)" : "var(--color-line-strong)"}
            strokeOpacity={i === 1 ? 0.85 : 1}
            strokeWidth={i === 1 ? "0.8" : "0.5"}
          />
        ))}

        {branches.map((y, i) => (
          <rect
            key={`v-${y}`}
            x="38"
            y={y - 4}
            width="7"
            height="8"
            stroke={i === 1 ? "var(--color-accent)" : "var(--color-line-strong)"}
            strokeOpacity={i === 1 ? 0.85 : 0.7}
            strokeWidth="0.5"
          />
        ))}

        {/* The one that carries on, into a destination and a response. */}
        <path
          d="M45 27 C 56 27, 58 22, 66 22"
          stroke="var(--color-accent)"
          strokeOpacity="0.85"
          strokeWidth="0.8"
        />
        <rect x="66" y="14" width="22" height="16" stroke="var(--color-line-strong)" strokeWidth="0.6" />
        <line x1="66" y1="19" x2="88" y2="19" stroke="var(--color-line-strong)" strokeWidth="0.5" />
        <circle cx="77" cy="40" r="2.6" stroke="var(--color-accent)" strokeWidth="0.5" />
        <circle cx="77" cy="40" r="1" fill="var(--color-accent)" />
        <line x1="77" y1="30" x2="77" y2="37" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="0.5" />

        {/* And the loop back, quiet. */}
        <path
          d="M74 42 C 56 52, 24 52, 9 44"
          stroke="var(--color-ink)"
          strokeOpacity="0.22"
          strokeWidth="0.5"
        />
        <path
          d="M12 41 L8.5 44 L12 47"
          stroke="var(--color-accent)"
          strokeOpacity="0.7"
          strokeWidth="0.6"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}
