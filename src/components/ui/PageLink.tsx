"use client";

import Link from "next/link";

import { useRouteTransition } from "@/components/transition/RouteTransition";
import type { AnalyticsEvent } from "@/config/analytics";
import { track } from "@/lib/analytics";

/**
 * An internal route link that plays the Mishram signal wipe.
 *
 * Wraps Next's `Link`, so **prefetching is unchanged** — the destination is
 * already warm by the time the wipe starts, which is exactly why the transition
 * can be short. The click handler only takes over when it should:
 *
 * - modifier-clicks and middle-clicks fall through to the browser, so
 *   open-in-new-tab keeps working
 * - anything already handled by another handler is left alone
 * - reduced motion, and navigating to the path you are already on, both fall
 *   back to a plain push inside the provider
 *
 * **Use it for pathname changes only** — `/`, `/services/…`, `/privacy`. Hash
 * links stay plain `<a>`: same-page hashes are native and instant, and
 * cross-page ones (`/#what-we-do`) need a real navigation so `useHashLanding`
 * can re-land them (§10g).
 */
export function PageLink({
  href,
  children,
  className,
  track: analyticsEvent,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Optional measurement, declared as data — see `CtaButton`. Reported before
   * the wipe starts and before any modifier-click falls through, so
   * open-in-new-tab counts exactly like a normal click, which it is.
   */
  track?: AnalyticsEvent;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">) {
  const transition = useRouteTransition();

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        if (analyticsEvent) track(analyticsEvent);
        if (!transition) return;
        if (event.defaultPrevented) return;
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        transition.start(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
