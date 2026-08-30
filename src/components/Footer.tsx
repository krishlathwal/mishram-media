"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Wordmark } from "@/components/ui/Wordmark";
import { FOOTER_COPY, FOOTER_EQUATION } from "@/config/footer";
import { LEGAL_LINKS } from "@/config/legal";
import {
  PUBLIC_SERVICE_PAGES,
  resolveServicePage,
  servicePagePath,
} from "@/config/service-pages";
import {
  BRAND,
  CONTACT,
  GENERAL_WHATSAPP_MESSAGE,
  NAV_ITEMS,
  SOCIAL_LINKS,
  TOP_ANCHOR,
  isRouteHref,
  whatsappHref,
} from "@/config/site";
import { useSectionHref } from "@/hooks/useSectionHref";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FOOTER — the agency desk.
 *
 * The page begins highly structured. §10h resolves the twelve-column grid to
 * nothing by its bottom edge. Here the scaffolding is gone and what remains is
 * a **final directory**: how to reach Mishram, where the rest of the site is,
 * which service pages exist, where to follow, and the legal documents.
 *
 * **This is not another conversion block.** The Project Inquiry form above is
 * the ask; there is no booking CTA here and there never should be.
 *
 * V2 replaced a composition that was one enormous centred wordmark and very
 * little else — it read as a poster and left the last screen almost empty. The
 * mark is now a **signature at the lower left**, roughly a third of its old
 * size, and the space it used to occupy carries content a visitor can act on.
 *
 * DELIBERATE INVERSION, unchanged from V1. `.ftr` redefines the theme's
 * `--color-*` names to their dark values on itself, so the whole subtree flips
 * and every semantic class keeps working. On the parchment homepage that is the
 * dark back cover of a printed annual; in dark mode the palette is already
 * right and the footer separates itself by composition instead.
 *
 * **Everything rendered is derived.** Services come from the `built` flags in
 * `config/service-pages.ts`, legal from `config/legal.ts`, navigation from
 * `NAV_ITEMS`, contact from `CONTACT`, socials from `SOCIAL_URLS`. Shipping the
 * next service route makes it appear here with no edit to this file.
 */
export function Footer() {
  const hrefFor = useSectionHref();
  const services = PUBLIC_SERVICE_PAGES.map((page) => resolveServicePage(page.slug));

  // Resolves when the page is built. A static homepage has no request to read a
  // clock from, and a client-side year would trade that for a hydration
  // mismatch on the last line of the site.
  const year = new Date().getFullYear();

  return (
    <footer className="ftr grain">
      {/* The last structural trace, arriving and resolving. §10h's grid has
          faded to nothing by the boundary above; this is what it becomes. */}
      <Signal />

      <div className="page-x relative pt-12 pb-8 md:pt-16 md:pb-10">
        {/* ── Marker row ──────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-6">
          <p className="caps text-ink-soft">{FOOTER_COPY.signature}</p>
          <BackToTop />
        </div>

        {/* ── The desk ────────────────────────────────────────────
            Asymmetric on purpose, and the grid is invisible: contact takes the
            weight it deserves on the left, and the three directories sit
            lighter to its right with a deliberate empty column between. */}
        <div className="mt-10 md:mt-14 md:grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-12">
          {/* Contact */}
          <div className="lg:col-span-4">
            <Label>{FOOTER_COPY.contactLabel}</Label>

            {/* The most useful thing in the footer, so it is sized like it. */}
            <a href={`mailto:${CONTACT.email}`} className="group mt-6 inline-block max-w-full">
              <span className="relative block truncate font-display text-[clamp(1.0625rem,1.9vw,1.375rem)] leading-[1.2] font-medium tracking-[-0.025em] text-ink">
                {CONTACT.email}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-line-strong transition-colors duration-[420ms] ease-[var(--ease-out-expo)] group-hover:bg-accent"
                />
              </span>
            </a>

            <div className="mt-7 flex flex-col items-start gap-3">
              <TextLink href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</TextLink>
              <TextLink href={whatsappHref(GENERAL_WHATSAPP_MESSAGE)} external>
                {FOOTER_COPY.whatsappLabel}
              </TextLink>
            </div>
          </div>

          {/* The three directories. On a phone they pair up rather than
              stacking as four full-width blocks, which is what took the old
              footer past 1,300px there. `lg:contents` dissolves this wrapper at
              desktop widths so its children sit directly on the twelve columns
              and can be placed asymmetrically. */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 md:mt-0 lg:contents">
          {/* Navigate */}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6 lg:row-start-1">
            <Label>{FOOTER_COPY.navLabel}</Label>
            {/* The header's own NAV_ITEMS — same destinations, no second list.
                `About` resolves to `/about` here as it does everywhere else,
                so the footer never points at the homepage chapter once the
                real page exists. */}
            <ul className="mt-6">
              {NAV_ITEMS.map((item) => {
                const Tag = isRouteHref(item.href) ? PageLink : "a";
                return (
                  <li key={item.href}>
                    <Tag href={hrefFor(item.href)} className="ftr-row group">
                      <span className="caps w-6 shrink-0 text-[0.5625rem] text-ink-muted transition-colors duration-300 group-hover:text-accent">
                        {item.index}
                      </span>
                      <span className="relative">
                        {item.label}
                        <Sweep />
                      </span>
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Follow */}
          <div className="lg:col-span-2 lg:col-start-11 lg:row-start-1">
            <Label>{FOOTER_COPY.socialLabel}</Label>
            <Socials />
          </div>

          {/* Services — only routes that exist */}
          <div className="col-span-2 lg:col-span-3 lg:col-start-8 lg:row-start-1">
            <Label>{FOOTER_COPY.servicesLabel}</Label>
            <ul className="mt-6">
              {services.map((service) => (
                <li key={service.slug}>
                  <PageLink
                    href={servicePagePath(service.slug)}
                    className="ftr-row group items-start"
                  >
                    <span className="caps w-6 shrink-0 pt-[0.2rem] text-[0.5625rem] text-ink-muted transition-colors duration-300 group-hover:text-accent">
                      {service.index}
                    </span>
                    <span className="relative max-w-[22ch]">
                      {service.title}
                      <Sweep />
                    </span>
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          </div>
        </div>

        {/* ── The base ──────────────────────────────────────────────
            The signature sits at the lower left and the practical links to its
            right — the inverse of V1, which centred the mark and had nothing
            beside it. */}
        <div className="ftr-base mt-12 pt-8 md:mt-16 md:pt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
          {/* The one finishing detail: a slow teal segment travelling the base
              rule. It is the same signal the footer opens on and the same one
              the route transition draws, so the ending, the boundary above it
              and every page change speak with one mark. */}
          <span aria-hidden className="ftr-base-rule" />

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="ftr-mark-band"
            >
              <Wordmark className="ftr-mark" />
            </motion.div>
          </div>

          <div className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:text-right">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 lg:justify-end">
              {LEGAL_LINKS.map((legal) => (
                <li key={legal.slug}>
                  <PageLink href={legal.href} className="ftr-legal group">
                    <span className="relative">
                      {legal.label}
                      <Sweep />
                    </span>
                  </PageLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2 lg:items-end">
              <p className="caps text-ink-muted">
                © {year} {BRAND.name}
              </p>
              <p className="caps tracking-[0.16em] text-ink-muted/80">
                {FOOTER_EQUATION}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Label({ children }: { children: string }) {
  return <p className="caps text-ink-muted">{children}</p>;
}

/**
 * Icon, platform, and an arrow when there is somewhere to go.
 *
 * **All three platforms are always present**, because the set is the set. What
 * changes is whether a row is a link: a verified URL renders an `<a>`; an
 * unverified one renders a non-interactive row carrying `aria-disabled` and a
 * screen-reader-only explanation. **No `href="#"`, no bare `linkedin.com`, no
 * visible "coming soon".** Filling the URL into `SOCIAL_URLS` turns that row
 * into a real link with no change here.
 */
function Socials() {
  return (
    <ul className="mt-6">
      {SOCIAL_LINKS.map((social) => {
        const inner = (
          <>
            <SocialIcon platform={social.id} size={18} className="ftr-social-icon" />
            <span className="relative caps">
              {social.label}
              {social.href ? <Sweep /> : null}
            </span>
            {social.href ? (
              <span
                aria-hidden
                className="ftr-social-arrow block text-[0.625rem] leading-none"
              >
                &#8599;
              </span>
            ) : null}
          </>
        );

        return (
          <li key={social.id}>
            {social.href ? (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BRAND.name} on ${social.label}`}
                className="ftr-social group"
              >
                {inner}
              </a>
            ) : (
              <span aria-disabled="true" className="ftr-social ftr-social--pending">
                {inner}
                <span className="sr-only"> — {FOOTER_COPY.socialPending}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The handoff. §10h's twelve rules fade to nothing at its bottom edge; one of
 * them continues a little way into the dark field and resolves into a dot, so
 * the page steps out of its own system rather than hitting a dark rectangle.
 */
function Signal() {
  return (
    <div aria-hidden className="page-x pointer-events-none absolute inset-x-0 top-0">
      <div className="relative h-20">
        {/* Draws by **height**, not `scaleY`, and that is deliberate.
            `MotionConfig reducedMotion="user"` strips transform animations —
            and `initial` is read once, at hydration, when
            `usePrefersReducedMotion` is still returning its server snapshot.
            A `scaleY` version therefore mounted at 0, never animated, and left
            the signal permanently invisible for exactly the visitors who were
            promised a static one. Height is not a transform, so it survives. */}
        <motion.span
          className="ftr-signal"
          initial={{ height: 0 }}
          whileInView={{ height: "3.5rem" }}
          viewport={{ once: true, margin: "-2% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
        />
        <motion.span
          className="ftr-signal-dot"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-2% 0px" }}
          transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
        />
      </div>
    </div>
  );
}

function BackToTop() {
  return (
    <a href={TOP_ANCHOR} className="ftr-legal group">
      <span className="relative">
        {FOOTER_COPY.backToTop}
        <Sweep />
      </span>
      <Arrow
        size={10}
        className="-rotate-90 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:-translate-y-[3px]"
      />
    </a>
  );
}

function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : undefined)}
      className={clsx(
        "group inline-flex items-center gap-2 text-[0.9375rem] text-ink/80 transition-colors duration-300 hover:text-ink",
      )}
    >
      <span className="relative">
        {children}
        <Sweep />
      </span>
      {external ? (
        <span
          aria-hidden
          className="block text-[0.625rem] leading-none transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        >
          &#8599;
        </span>
      ) : null}
    </a>
  );
}

/** The site's hairline hover sweep — teal, growing from the left. */
function Sweep() {
  return (
    <span
      aria-hidden
      className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
    />
  );
}
