"use client";

import { useTheme } from "./ThemeProvider";

/**
 * An optical half-disc rather than a sun/moon icon: the ring is the page, the
 * filled half is the ink. Switching themes rotates it through 180°, so the
 * control states what it does without a label. Deliberately quieter than
 * Contact Us.
 *
 * The rotation is driven by `[data-theme]` in CSS, so it is already correct on
 * the first painted frame rather than settling after hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`group grid h-9 w-9 place-items-center text-ink-muted transition-colors duration-300 hover:text-ink ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="theme-disc h-[15px] w-[15px]"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.7"
        />
        {/* Filled half — the optical "state" of the page. */}
        <path d="M8 1a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
    </button>
  );
}
