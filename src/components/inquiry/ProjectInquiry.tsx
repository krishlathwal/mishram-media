"use client";

import { motion } from "motion/react";

import { INQUIRY_COPY } from "@/config/inquiry";
import { RECOGNITION_ITEMS } from "@/config/recognition";
import {
  CONTACT,
  GENERAL_WHATSAPP_MESSAGE,
  whatsappHref,
} from "@/config/site";

import type { AnalyticsEvent } from "@/config/analytics";
import { onTrackedClick } from "@/lib/analytics";

import { InquiryForm } from "./InquiryForm";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Where the two direct routes out of the inquiry section were clicked. */
const INQUIRY_DIRECT = "inquiry_direct";

/**
 * PROJECT INQUIRY — the homepage's last conversion moment.
 *
 * The page could show everything and still leave a visitor with no way to say
 * what they need short of phoning or opening WhatsApp. This is that way.
 *
 * **Revision 43 — back on the site's own surfaces, and re-set as a two-column
 * chapter.** Revision 42 made the whole section a plum field; the client's
 * verdict was that it read off-theme against the rest of the page, so the
 * plum stays where it earned its place (the Recognition plate) and the form
 * returns to obsidian and parchment. What replaced the colour is structure:
 *
 * - **Left, the invitation.** Label, headline and lead; the context paragraph;
 *   three short lines on what happens after the brief is sent; the two direct
 *   routes out (email, WhatsApp — the real published ones); and, from `lg`,
 *   one line of recognition drawn from the same record §06 renders.
 * - **Right, the brief itself, on a raised panel.** `canvas-raise` with a
 *   hairline border and a teal top edge — the one raised surface on the page,
 *   which is what makes the form the destination the section is for. Inside
 *   it the same fields, now in four numbered groups.
 *
 * On a phone the panel follows the headline directly and the supporting
 * column drops below it, so the form is never pushed under three screens of
 * preamble.
 *
 * What did not change: the fields, the validation, the payload, the route,
 * the events, the outcomes, the WhatsApp fallback, the success state. Still
 * **no booking CTA and no second primary action** — the whole section is the
 * ask, and `Send project brief` is its one button (§13, §18).
 *
 * Unnumbered, like the other interludes — Recognition keeps its `06` and
 * About's adaptive chapter number is untouched.
 *
 * **The grid resolves here.** Its vertical rules fade out down the section so
 * that by the Footer boundary the page's twelve-column scaffold is gone.
 *
 * SERVICE PAGES REUSE THIS SECTION AS IT IS. A service page passes three
 * optional props and gets the same experience with its own service ticked.
 */
export function ProjectInquiry({
  /** Preselected in the form's service group. Seeded, never locked. */
  initialServices,
  /** Sits beside the section label, e.g. the service the route is about. */
  note,
  /** Replaces the general context paragraph with a route-specific one. */
  context,
}: {
  initialServices?: readonly string[];
  note?: string;
  context?: string;
} = {}) {
  return (
    <section
      id="project-inquiry"
      aria-labelledby="project-inquiry-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />

      <div className="page-x relative pt-12 pb-14 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:pt-20 lg:pb-20">
        {/* One grid, two rows on the left, the panel spanning both on the
            right. Explicit row placement is what lets the supporting column
            sit under the headline on a desktop and under the form on a phone
            without rendering anything twice. */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-4 lg:row-start-1"
          >
            <Intro note={note} context={context} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="mt-10 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:mt-0 xl:col-span-7 xl:col-start-6"
          >
            <div className="inq-panel">
              <InquiryForm initialServices={initialServices} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="mt-12 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-12"
          >
            <Details />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * The invitation: label, headline, lead and the context paragraph. The
 * headline is sized for a four-column measure now, not the full page width.
 */
function Intro({ note, context }: { note?: string; context?: string }) {
  const [line1, line2] = INQUIRY_COPY.headline;
  const accent = INQUIRY_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <>
      <p className="caps flex flex-wrap items-center gap-3">
        <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
        <span className="text-ink">{INQUIRY_COPY.label}</span>
        {/* A service page says which service without forking the section. */}
        {note ? (
          <>
            <span aria-hidden className="block h-2.5 w-px bg-line-strong" />
            <span className="text-ink-muted">{note}</span>
          </>
        ) : null}
      </p>

      {/* Trigger on the heading, not the clipped lines: a line translated
          outside its overflow-hidden parent never intersects the viewport,
          so it would never fire on its own. Variants propagate. */}
      <motion.h2
        id="project-inquiry-title"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-12% 0px" }}
        className="mt-7 max-w-[min(92vw,30rem)] font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink md:mt-8"
      >
        {[line1, line2].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.05em]">
            <motion.span
              variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.9, delay: 0.08 + i * 0.08, ease: EASE }}
              className="block"
            >
              {i === 0 ? (
                line
              ) : (
                <>
                  {leadIn}
                  <span className="font-accent italic">{accent}</span>
                </>
              )}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      <p className="mt-6 max-w-[40ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-ink/80">
        {INQUIRY_COPY.lead}
      </p>

      <p className="mt-5 max-w-[42ch] text-[0.875rem] leading-[1.7] text-ink-soft">
        {context ?? INQUIRY_COPY.context}
      </p>
    </>
  );
}

/**
 * The supporting column: what happens next, the direct routes, and one line
 * of recognition. Deliberately short — §04 Work Process owns the delivery
 * story; this is only what happens to the brief.
 */
function Details() {
  const award = RECOGNITION_ITEMS[0];

  return (
    <>
      {/* Desktop and up only: on a phone the form has just been filled in
          and three more rows before the direct routes cost a screen. */}
      <div className="hidden lg:block">
      <p className="caps text-ink-muted">{INQUIRY_COPY.next.label}</p>
      <ol className="mt-4 border-t border-line">
        {INQUIRY_COPY.next.steps.map((step, i) => (
          <li
            key={step}
            className="flex items-baseline gap-4 border-b border-line py-3.5"
          >
            <span aria-hidden className="caps shrink-0 tabular-nums text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[0.875rem] leading-[1.6] text-ink-soft">
              {step}
            </span>
          </li>
        ))}
      </ol>
      </div>

      <p className="caps text-ink-muted lg:mt-10">{INQUIRY_COPY.directLabel}</p>

      {/* The real published routes, from the shared config. No booking CTA
          here — the Hero owns that ask. */}
      <ul className="mt-4 border-t border-line">
        {/* `value` prints the real address and the real number; the events
            carry neither — only the method and where it was clicked. */}
        <DirectRow
          label="Email"
          value={CONTACT.email}
          href={`mailto:${CONTACT.email}`}
          track={{
            name: "contact_click",
            method: "email",
            context: INQUIRY_DIRECT,
          }}
        />
        <DirectRow
          label="WhatsApp"
          value={INQUIRY_COPY.whatsappValue}
          href={whatsappHref(GENERAL_WHATSAPP_MESSAGE)}
          external
          track={{
            name: "contact_click",
            method: "whatsapp",
            context: INQUIRY_DIRECT,
          }}
        />
      </ul>

      {/* The same record §06 renders, restated in one line where a visitor is
          deciding whether to write. Renders nothing while that record is
          empty, exactly as the chapter does. Desktop only: on a phone the
          chapter is two screens above and repeating it costs a screen. */}
      {award ? (
        <p className="mt-10 hidden lg:block">
          <span className="caps block text-ink-muted">
            {INQUIRY_COPY.recognisedLabel}
          </span>
          <span className="mt-2.5 block text-[0.8125rem] leading-[1.6] text-ink-soft">
            {award.title}
            {award.organisation || award.year ? (
              <span className="text-ink-muted">
                {" · "}
                {[award.organisation, award.year].filter(Boolean).join(" ")}
              </span>
            ) : null}
          </span>
        </p>
      ) : null}
    </>
  );
}

function DirectRow({
  label,
  value,
  href,
  external,
  track,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  track?: AnalyticsEvent;
}) {
  return (
    <li className="border-b border-line">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        {...(track ? { onClick: onTrackedClick(track) } : undefined)}
        className="group flex items-baseline justify-between gap-4 py-4"
      >
        <span className="caps shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-accent">
          {label}
        </span>
        <span className="relative text-[0.8125rem] text-ink/80 transition-colors duration-300 group-hover:text-ink">
          {value}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
          />
        </span>
      </a>
    </li>
  );
}

/**
 * The page's twelve-column scaffold, resolving. It runs at full strength where
 * the section begins — continuing About above it — and is gone by the bottom
 * edge, so the Footer starts on clean ground.
 */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="inq-grid grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}
