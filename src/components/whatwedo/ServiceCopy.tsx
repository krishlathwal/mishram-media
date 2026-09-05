"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

import { PageLink } from "@/components/ui/PageLink";
import { SERVICES_PATH, servicePageHrefFor } from "@/config/service-pages";
import { WHAT_WE_DO_COPY, type Service } from "@/config/services";
import { useContact } from "@/components/contact/ContactProvider";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Left column of the sticky panel. Title lines reveal through a clip mask and
 * prepare to clip upward again as the service hands off to the next one.
 */
export function ServiceCopy({
  service,
  progress,
}: {
  service: Service;
  progress: MotionValue<number>;
}) {
  const { openContact } = useContact();

  /**
   * The dedicated page for this service, if it has been built. `undefined`
   * renders no action at all — **an unbuilt service never shows a dead link**,
   * and adding the next route needs no change here (see `service-pages.ts`).
   */
  const pageHref = servicePageHrefFor(service.id);

  const bodyOpacity = useTransform(progress, [0.1, 0.3, 0.82, 0.98], [0, 1, 1, 0]);
  const bodyY = useTransform(progress, [0.1, 0.3, 0.82, 0.98], [18, 0, 0, -14]);
  const indexOpacity = useTransform(progress, [0.02, 0.16, 0.86, 1], [0, 1, 1, 0]);

  return (
    <div className="flex flex-col">


      <motion.span
        style={{ opacity: indexOpacity }}
        className="block font-display text-[0.9375rem] leading-none font-medium text-accent"
      >
        {service.index}
      </motion.span>

      <h3 className="mt-4 font-display text-[clamp(1.75rem,2.5vw,2.6rem)] leading-[1.03] font-medium tracking-[-0.032em] text-ink">
        {service.title.map((line, i) => (
          <span key={line} className="-mb-[0.1em] block overflow-hidden">
            <TitleLine progress={progress} index={i}>
              {line}
            </TitleLine>
          </span>
        ))}
      </h3>

      <motion.div style={{ opacity: bodyOpacity, y: bodyY }}>
        <p className="mt-6 max-w-[34ch] text-[clamp(0.9375rem,1vw,1.0625rem)] leading-[1.55] text-ink/72">
          {service.description}
        </p>

        {/* Hairline rows rather than an inline list: the copy column is narrow
            and a wrapped separator would orphan.

            The columns are content-aware rather than fixed at two. `Creative
            Production` is the longest capability on the site and used to wrap
            onto a second line wherever the column fell below its width. Two
            things fix that:

            1. The rail tracks at 0.16em instead of the 0.26em `.caps` default.
               Measured, that takes the string from 171.5px to 163.1px at the
               ≥768px caps size — which is what makes it fit the 171.9px cell a
               1280px viewport gives it, with real slack instead of 0.4px.
            2. `auto-fit` drops to one clean column wherever two genuinely do
               not fit, instead of wrapping a label. The minimum tracks the
               `.caps` font-size step at 768px, so it is correct on both sides
               of it.

            Result: two columns at 1440, 1280 and every phone down to 375px;
            one column on the narrow stacked copy column at 768–1023px. Never a
            wrapped capability. */}
        <ul className="caps mt-8 grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-x-6 border-t border-line tracking-[0.16em] text-ink-muted md:grid-cols-[repeat(auto-fit,minmax(10.5rem,1fr))]">
          {service.capabilities.map((c) => (
            <li key={c} className="border-b border-line py-3">
              {c}
            </li>
          ))}
        </ul>

        {/* ── The chapter's two contextual actions — BUTTONS, Revision 42 ──
            They were two text links on one hairline. The client's verdict on
            the walkthrough video was that they read as too light to be
            clickable, so both are now real button shapes (`.svc-action` in
            `globals.css`): `Explore service` filled in ink, because it only
            ever appears on a service that has a page and is the information
            route out; `Discuss this project` outlined, because it opens the
            contact panel and must not compete with the page's primary CTA.

            Still one row where two fit. The pinned panel's copy holder grew
            from 22rem to 23.5rem to make room for the taller row. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {pageHref ? (
            <PageLink
              href={pageHref}
              className="svc-action svc-action--primary group"
              /* `service_slug`, never the label. The slug is the stable
                 identifier the route is built from; the label is editorial
                 copy that has already been rewritten once (§10). */
              track={{
                name: "service_explore",
                service_slug: pageHref.replace(`${SERVICES_PATH}/`, ""),
                context: "what_we_do",
              }}
            >
              <span>{WHAT_WE_DO_COPY.pageCta}</span>
              <ActionArrow />
            </PageLink>
          ) : null}

          <button
            type="button"
            onClick={openContact}
            className="svc-action group"
          >
            <span>{WHAT_WE_DO_COPY.cta}</span>
            <ActionArrow />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ActionArrow() {
  return (
    <span aria-hidden className="block h-3 w-3 overflow-hidden">
      <Arrow
        size={12}
        className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4"
      />
    </span>
  );
}

function TitleLine({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: string;
}) {
  const start = 0.04 + index * 0.05;
  const y = useTransform(
    progress,
    [start, start + 0.2, 0.84 + index * 0.04, 1],
    ["108%", "0%", "0%", "-108%"],
  );

  return (
    <motion.span style={{ y }} className="block pb-[0.12em]">
      {children}
    </motion.span>
  );
}
