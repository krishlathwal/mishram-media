"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import {
  MobileServicesGroup,
  SERVICES_MENU_COPY,
  SERVICES_MENU_ID,
  ServicesMenuPanel,
} from "@/components/header/ServicesMenu";
import { PageLink } from "@/components/ui/PageLink";
import { isServiceRoute } from "@/config/service-pages";
import {
  ABOUT_PATH,
  BRAND,
  CONTACT,
  NAV_ITEMS,
  SECTION_ORDER,
  SERVICES_ANCHOR,
  isRouteHref,
} from "@/config/site";
import { useContact } from "@/components/contact/ContactProvider";
import { CloseIcon, MenuIcon } from "@/components/contact/icons";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useDialogBehaviour } from "@/hooks/useDialogBehaviour";
import { useHashLanding } from "@/hooks/useHashLanding";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSectionHref } from "@/hooks/useSectionHref";
import { Wordmark } from "@/components/ui/Wordmark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** Stable empty list — a new array each render would re-run the observer. */
const NO_SECTIONS: readonly string[] = [];

/**
 * All four navigation targets are sections of the homepage, so these are plain
 * anchors with nothing intercepting them: native hash navigation, a normal URL,
 * working back and forward, and `scroll-margin-top` in globals.css clearing the
 * fixed header. No scroll library, no wheel handling, no custom routing.
 *
 * On a **service page** the same four anchors have to leave the route, so every
 * href goes through `useSectionHref` — `#work` on `/`, `/#work` everywhere
 * else. Still one navigation list (`NAV_ITEMS`), still a plain anchor, and the
 * homepage's own behaviour is unchanged.
 *
 * The active-section treatment also takes care of itself off the homepage: a
 * service page's opening section is `id="hero"`, which is in `SECTION_ORDER`
 * and matches no nav item.
 *
 * **Active state off the homepage comes from the URL, not from an observer.**
 * A `/services/...` route lights `Services`, because that is the chapter the
 * visitor is inside; the IntersectionObserver is not attached at all there,
 * since there are no homepage sections to watch.
 */
export function Header() {
  const { openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hrefFor = useSectionHref();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const closeServices = useCallback(() => setServicesOpen(false), []);

  // A route change closes the directory — otherwise it hangs open over the page
  // the visitor just chose from it. Adjusted during render rather than in an
  // effect: this is state deriving from a prop change, and an effect would
  // paint the open menu once over the new route before closing it.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setServicesOpen(false);
  }

  // Orientation only — which chapter the visitor is currently reading.
  //
  // Off the homepage there are no homepage sections to observe, so the
  // observer is handed an empty list and never attaches: `useActiveSection`
  // returns early when nothing resolves. A service route resolves its active
  // item from the URL instead — `/services/...` is inside Services, which is
  // 02 / What We Do.
  const activeId = useActiveSection(onHome ? SECTION_ORDER : NO_SECTIONS);
  const activeHref = onHome
    ? activeId
      ? // `#about` resolves here while the homepage chapter holds the scan
        // line, and deliberately matches no nav item now that `About` is a
        // route — the same neutral state `#hero` produces (§10g).
        `#${activeId}`
      : null
    : pathname === ABOUT_PATH
      ? ABOUT_PATH
      : isServiceRoute(pathname)
        ? SERVICES_ANCHOR
        : null;

  // A hash that arrived with the URL lands before hydration changes the page
  // height. This re-lands it; in-page clicks never reach it.
  useHashLanding();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
          scrolled && "bg-canvas/72 backdrop-blur-xl",
        )}
      >
        <div
          className={clsx(
            "page-x flex items-center justify-between",
            "transition-[height] duration-500 ease-[var(--ease-out-expo)]",
            scrolled ? "h-[58px] lg:h-[66px]" : "h-[var(--header-h)]",
          )}
        >
          {/* Left: wordmark + editorial locator */}
          <div className="flex items-center gap-4">
            <PageLink
              href="/"
              aria-label={`${BRAND.name} — home`}
              className="group block"
            >
              <Wordmark className="h-[18px] w-auto text-ink transition-colors duration-500 group-hover:text-accent lg:h-[20px]" />
            </PageLink>
            <span aria-hidden className="hidden h-3.5 w-px bg-line-strong sm:block" />
            <span className="caps hidden text-ink-muted sm:block">
              {BRAND.locator}
            </span>
          </div>

          {/* Centre-right: section links */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item) => {
                const current = activeHref === item.href;
                const isServices = item.href === SERVICES_ANCHOR;
                // A route destination plays the shared wipe; an anchor stays a
                // plain `<a>` so `useHashLanding` can re-land it (§10g).
                const Tag = isRouteHref(item.href) ? PageLink : "a";
                return (
                  <li key={item.href} className={isServices ? "relative" : undefined}>
                    <span className="flex items-baseline gap-1">
                    <Tag
                      href={hrefFor(item.href)}
                      aria-current={current ? "true" : undefined}
                      className="group relative flex items-baseline gap-1.5 py-1"
                    >
                      <span
                        className={clsx(
                          "caps text-[0.5625rem] transition-colors duration-300",
                          current
                            ? "text-accent"
                            : "text-ink-muted group-hover:text-accent",
                        )}
                      >
                        {item.index}
                      </span>
                      <span
                        className={clsx(
                          "relative text-[0.8125rem] font-medium transition-colors duration-300",
                          current
                            ? "text-ink"
                            : "text-ink/80 group-hover:text-ink",
                        )}
                      >
                        {item.label}
                        {/* The hairline the hover state already draws, held
                            open in teal while this is the section being read. */}
                        <span
                          aria-hidden
                          className={clsx(
                            "absolute -bottom-1 left-0 h-px w-full transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
                            current
                              ? "origin-left scale-x-100 bg-accent"
                              : "origin-right scale-x-0 bg-ink/60 group-hover:origin-left group-hover:scale-x-100",
                          )}
                        />
                      </span>
                    </Tag>

                    {/* The overview stays a plain anchor; this only opens the
                        directory of service pages beside it. A visitor never
                        has to choose between the two. */}
                    {isServices ? (
                      <button
                        ref={servicesTrigger}
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        aria-controls={SERVICES_MENU_ID}
                        aria-label={SERVICES_MENU_COPY.toggle}
                        className="hdr-disclosure"
                      >
                        <Chevron open={servicesOpen} />
                      </button>
                    ) : null}
                    </span>

                    {isServices ? (
                      <ServicesMenuPanel
                        open={servicesOpen}
                        onClose={closeServices}
                        triggerRef={servicesTrigger}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: contact + mobile trigger */}
          <div className="flex items-center gap-1 md:gap-3">
            <ThemeToggle className="-mr-1 md:mr-1" />
            <button
              type="button"
              onClick={openContact}
              className="group hidden items-center gap-2.5 py-2 pl-1 text-[0.8125rem] font-medium text-ink md:inline-flex"
            >
              <span
                aria-hidden
                className="h-[5px] w-[5px] rounded-full bg-accent transition-all duration-[420ms] ease-[var(--ease-out-expo)] group-hover:w-4 group-hover:rounded-none"
              />
              <span className="relative">
                Contact Us
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-mr-2 grid h-10 w-10 place-items-center text-ink md:hidden"
            >
              <MenuIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {/* Hairline that spans the full width, revealed on scroll */}
        <div
          aria-hidden
          className={clsx(
            "h-px w-full origin-left bg-line transition-transform duration-[700ms] ease-[var(--ease-out-expo)]",
            scrolled ? "scale-x-100" : "scale-x-0",
          )}
        />
      </header>

      <MobileMenu
        open={menuOpen}
        activeHref={activeHref}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

function MobileMenu({
  open,
  activeHref,
  onClose,
}: {
  open: boolean;
  activeHref: string | null;
  onClose: () => void;
}) {
  const { openContact } = useContact();
  const ref = useDialogBehaviour(open, onClose);
  const reduced = usePrefersReducedMotion();
  const hrefFor = useSectionHref();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grain fixed inset-0 z-90 flex flex-col bg-canvas md:hidden"
        >
          <div className="page-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Wordmark className="h-[17px] w-auto text-ink" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 grid h-10 w-10 place-items-center text-ink"
            >
              <CloseIcon className="h-[18px] w-[18px]" />
            </button>
          </div>

          <nav aria-label="Primary" className="page-x flex-1 pt-8">
            <ul className="border-t border-line">
              {NAV_ITEMS.map((item, i) => {
                const current = activeHref === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduced ? 0 : 0.08 + i * 0.055,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-line"
                  >
                    {/* Closing on activation is the whole wiring: the browser
                        performs the hash navigation itself, against a page the
                        menu is no longer covering. */}
                    <div className="flex items-center justify-between gap-4">
                      {(() => {
                        // Same branch as the desktop rail: a route destination
                        // plays the wipe, an anchor stays native.
                        const Tag = isRouteHref(item.href) ? PageLink : "a";
                        return (
                      <Tag
                        href={hrefFor(item.href)}
                        aria-current={current ? "true" : undefined}
                        onClick={onClose}
                        className="flex flex-1 items-baseline gap-4 py-5"
                      >
                        <span
                          className={clsx(
                            "caps text-[0.5625rem]",
                            current ? "text-accent" : "text-ink-muted",
                          )}
                        >
                          {item.index}
                        </span>
                        <span className="relative font-display text-[2rem] leading-none tracking-[-0.035em] text-ink">
                          {item.label}
                          {current && (
                            <span
                              aria-hidden
                              className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                            />
                          )}
                        </span>
                      </Tag>
                        );
                      })()}

                      {/* The label still navigates to the overview; this only
                          expands the service pages beneath it, in place. */}
                      {item.href === SERVICES_ANCHOR ? (
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          aria-expanded={servicesOpen}
                          aria-controls={`${SERVICES_MENU_ID}-mobile`}
                          aria-label={SERVICES_MENU_COPY.toggle}
                          className="-mr-2 grid h-11 w-11 shrink-0 place-items-center text-ink-soft"
                        >
                          <PlusMark open={servicesOpen} />
                        </button>
                      ) : null}
                    </div>

                    {item.href === SERVICES_ANCHOR ? (
                      <MobileServicesGroup open={servicesOpen} onNavigate={onClose} />
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Direct lines, so the fastest route out of the menu is one tap. */}
          <div className="page-x shrink-0 pt-6 pb-[max(28px,env(safe-area-inset-bottom))]">
            <ul className="mb-6 border-t border-line">
              {[
                { label: "Call", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
                { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              ].map((row) => (
                <li key={row.label} className="border-b border-line">
                  <a
                    href={row.href}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="caps text-ink-muted">{row.label}</span>
                    <span className="text-[0.8125rem] text-ink/80">
                      {row.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => {
                onClose();
                // Let the menu unmount restore focus before the panel claims it.
                window.setTimeout(openContact, 220);
              }}
              className="flex h-[52px] w-full items-center justify-center rounded-[3px] bg-ink text-[0.8125rem] font-medium text-canvas"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The desktop disclosure mark: a hairline chevron that flips when open. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className={clsx(
        "transition-transform duration-[420ms] ease-[var(--ease-out-expo)]",
        open && "rotate-180",
      )}
    >
      <path
        d="M1.5 3.5 5 6.75 8.5 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** The mobile disclosure mark: two hairlines, the vertical one collapsing. */
function PlusMark({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="svp-faq-mark">
      <span className="svp-faq-mark__bar" />
      <span
        className="svp-faq-mark__bar svp-faq-mark__bar--v"
        data-open={open ? "true" : undefined}
      />
    </span>
  );
}
