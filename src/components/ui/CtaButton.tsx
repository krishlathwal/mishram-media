"use client";

import { useState } from "react";
import clsx from "clsx";

import { Arrow } from "./Arrow";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary";

type BaseProps = {
  children: string;
  variant?: Variant;
  className?: string;
};

type CtaProps = BaseProps &
  (
    | ({ as?: "a" } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">)
    | ({ as: "button" } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">)
  );

/**
 * Shared CTA. Three things happen on hover:
 *  1. a fill sweeps through the button from whichever edge the pointer entered
 *  2. the label swaps behind a mask — the current copy rises out, a clone rises in
 *  3. the arrow travels out to the right while a second arrow enters from the left
 * The whole button also drifts toward the pointer (see Magnetic).
 */
export function CtaButton(props: CtaProps) {
  const { children, variant = "primary", className, as = "a", ...rest } = props;
  // Which edge the travelling fill grows from.
  const [origin, setOrigin] = useState<"left" | "right">("left");

  const isPrimary = variant === "primary";

  function handleEnter(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(e.clientX < r.left + r.width / 2 ? "left" : "right");
  }

  const shell = clsx(
    "group/cta relative isolate inline-flex h-[52px] items-center overflow-hidden rounded-[3px]",
    "select-none px-6 sm:px-7",
    "transition-[border-color] duration-300 ease-[var(--ease-out-expo)]",
    isPrimary
      ? "bg-ink text-canvas"
      : "border border-line-strong text-ink hover:border-ink/40",
    className,
  );

  const content = (
    <>
      {/* Travelling fill */}
      <span
        aria-hidden
        style={{ transformOrigin: origin }}
        className={clsx(
          "absolute inset-0 z-0 scale-x-0",
          "transition-transform duration-[520ms] ease-[var(--ease-out-expo)]",
          "group-hover/cta:scale-x-100 group-focus-visible/cta:scale-x-100",
          isPrimary ? "bg-accent" : "bg-ink/[0.07]",
        )}
      />

      {/* Masked label swap */}
      <span className="relative z-10 block overflow-hidden">
        <span
          className={clsx(
            "block text-[0.8125rem] leading-[1.4] font-medium tracking-[0.01em]",
            "transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
            "group-hover/cta:-translate-y-full group-focus-visible/cta:-translate-y-full",
          )}
        >
          {children}
        </span>
        <span
          aria-hidden
          className={clsx(
            "absolute inset-0 block translate-y-full text-[0.8125rem] leading-[1.4] font-medium tracking-[0.01em]",
            "transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
            "group-hover/cta:translate-y-0 group-focus-visible/cta:translate-y-0",
          )}
        >
          {children}
        </span>
      </span>

      {/* Arrow relay */}
      <span
        aria-hidden
        className="relative z-10 ml-3.5 block h-3.5 w-3.5 overflow-hidden"
      >
        <Arrow
          className={clsx(
            "absolute inset-0 transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
            "group-hover/cta:translate-x-6 group-focus-visible/cta:translate-x-6",
          )}
        />
        <Arrow
          className={clsx(
            "absolute inset-0 -translate-x-6 transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
            "group-hover/cta:translate-x-0 group-focus-visible/cta:translate-x-0",
          )}
        />
      </span>
    </>
  );

  return (
    <Magnetic
      strength={isPrimary ? 9 : 6}
      innerStrength={isPrimary ? 4 : 3}
      className="inline-block"
    >
      {as === "button" ? (
        <button
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          className={shell}
          onPointerEnter={handleEnter}
        >
          {content}
        </button>
      ) : (
        <a
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          className={shell}
          onPointerEnter={handleEnter}
        >
          {content}
        </a>
      )}
    </Magnetic>
  );
}
