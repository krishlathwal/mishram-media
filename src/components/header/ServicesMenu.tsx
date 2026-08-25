"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { PageLink } from "@/components/ui/PageLink";
import {
  BUILT_SERVICE_PAGES,
  resolveServicePage,
  servicePagePath,
} from "@/config/service-pages";
import { useSectionHref } from "@/hooks/useSectionHref";
import { SERVICES_ANCHOR } from "@/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export const SERVICES_MENU_ID = "services-menu";

export const SERVICES_MENU_COPY = {
  label: "Services",
  overview: "Overview",
  overviewDetail: "What We Do — all five services",
  toggle: "Show service pages",
} as const;

/**
 * The built service routes, resolved. **Derived from the `built` flags**, so a
 * route that does not exist can never appear in a menu — and shipping the next
 * one puts it here with no edit to this file or to the header.
 */
export function useServiceMenuItems() {
  return BUILT_SERVICE_PAGES.map((page) => resolveServicePage(page.slug));
}

/**
 * THE SERVICES MENU — desktop.
 *
 * `Services` in the header stays a plain anchor to `02 / What We Do`, because
 * the overview is a real destination and a visitor should never have to choose
 * between it and the pages beneath it. A small disclosure sits beside the
 * label and opens this panel, which lists the overview again — explicitly —
 * and then every service page that exists.
 *
 * **Not a mega-menu.** A 22rem panel, hairline rows, a numbered list and the
 * page's own palette. It is a directory, not a marketing surface.
 */
export function ServicesMenuPanel({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const hrefFor = useSectionHref();
  const services = useServiceMenuItems();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      // Escape returns the visitor to the control they opened it from, rather
      // than dropping focus at the top of the document.
      triggerRef.current?.focus();
    };

    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panel.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panel}
          id={SERVICES_MENU_ID}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="hdr-menu"
        >
          <p className="caps flex items-center gap-3 text-ink-muted">
            <span aria-hidden className="block h-px w-5 shrink-0 bg-accent/70" />
            {SERVICES_MENU_COPY.label}
          </p>

          <ul className="mt-5 border-t border-line">
            {/* The overview stays reachable from inside the menu too, so a
                visitor who opened the disclosure has not lost it. */}
            <li className="border-b border-line">
              <a href={hrefFor(SERVICES_ANCHOR)} onClick={onClose} className="hdr-menu-row group">
                <span className="caps w-7 shrink-0 pt-[0.15rem] text-[0.5625rem] text-ink-muted">
                  &mdash;
                </span>
                <span className="min-w-0 flex-1">
                  <span className="hdr-menu-title">{SERVICES_MENU_COPY.overview}</span>
                  <span className="hdr-menu-detail">
                    {SERVICES_MENU_COPY.overviewDetail}
                  </span>
                </span>
              </a>
            </li>

            {services.map((service) => {
              const path = servicePagePath(service.slug);
              const current = pathname === path;
              return (
                <li key={service.slug} className="border-b border-line">
                  <PageLink
                    href={path}
                    onClick={onClose}
                    aria-current={current ? "page" : undefined}
                    className="hdr-menu-row group"
                  >
                    <span
                      className={clsx(
                        "caps w-7 shrink-0 pt-[0.15rem] text-[0.5625rem] transition-colors duration-300",
                        current ? "text-accent" : "text-ink-muted group-hover:text-accent",
                      )}
                    >
                      {service.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={clsx("hdr-menu-title", current && "text-ink")}
                      >
                        {service.title}
                      </span>
                      <span className="hdr-menu-detail">
                        {service.service.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="hdr-menu-arrow block text-[0.625rem] leading-none"
                    >
                      &#8599;
                    </span>
                  </PageLink>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * THE SERVICES GROUP — mobile menu.
 *
 * The same content as an expandable group inside the existing sheet, rather
 * than a nested scroll panel. The label itself still navigates to the overview;
 * the `+` expands the group in place.
 */
export function MobileServicesGroup({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const hrefFor = useSectionHref();
  const services = useServiceMenuItems();

  return (
    <div
      id={`${SERVICES_MENU_ID}-mobile`}
      inert={!open}
      data-open={open ? "true" : "false"}
      className="svp-disclosure"
    >
      <div>
        <ul className="pb-5 pl-10">
          <li>
            <a href={hrefFor(SERVICES_ANCHOR)} onClick={onNavigate} className="hdr-sub-row">
              <span className="caps w-7 shrink-0 text-[0.5625rem] text-ink-muted">
                &mdash;
              </span>
              <span>{SERVICES_MENU_COPY.overview}</span>
            </a>
          </li>
          {services.map((service) => {
            const path = servicePagePath(service.slug);
            const current = pathname === path;
            return (
              <li key={service.slug}>
                <PageLink
                  href={path}
                  onClick={onNavigate}
                  aria-current={current ? "page" : undefined}
                  className="hdr-sub-row"
                >
                  <span
                    className={clsx(
                      "caps w-7 shrink-0 text-[0.5625rem]",
                      current ? "text-accent" : "text-ink-muted",
                    )}
                  >
                    {service.index}
                  </span>
                  <span className={current ? "text-ink" : undefined}>
                    {service.title}
                  </span>
                </PageLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
