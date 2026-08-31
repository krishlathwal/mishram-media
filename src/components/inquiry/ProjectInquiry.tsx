"use client";

import { motion } from "motion/react";

import { INQUIRY_COPY } from "@/config/inquiry";
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
 * **An editorial project brief, not a lead form.** Bottom rules instead of
 * boxes, four large fields rather than fifteen small ones, hairline option rows
 * instead of pills, and the site's own type doing the work. Nothing here should
 * read as an embedded form product.
 *
 * Unnumbered, like the two interludes — Recognition keeps its `06` and About's
 * adaptive chapter number is untouched.
 *
 * **The grid resolves here.** Its vertical rules fade out down the section so
 * that by the Footer boundary the page's twelve-column scaffold is gone — which
 * is what lets the Footer become a distinct ending rather than one more band of
 * the same page. §11's global behaviour is unchanged.
 *
 * SERVICE PAGES REUSE THIS SECTION AS IT IS. There is no second form
 * architecture and no second delivery route — a service page passes three
 * optional props and gets the same experience with its own service ticked. The
 * headline stays "Tell us what you're building." everywhere; only the small
 * label and the context paragraph acknowledge the route.
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

      <div className="page-x relative pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28 lg:pt-24 lg:pb-24">
        <Intro note={note} />

        <div className="mt-12 md:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Context and the direct routes out. Deliberately one short
              paragraph, not a three-step explainer — §04 Work Process already
              owns that and repeating it here would be filler. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-4"
          >
            <p className="max-w-[42ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-ink/72">
              {context ?? INQUIRY_COPY.context}
            </p>

            <p className="caps mt-12 text-ink-muted">
              {INQUIRY_COPY.directLabel}
            </p>

            {/* The real published routes, from the shared config. No booking
                CTA here — the Hero owns that ask. */}
            <ul className="mt-5 border-t border-line">
              {/* `value` prints the real address and the real number; the
                  events carry neither — only the method and where it was
                  clicked. Mishram's own contact details are not visitor PII,
                  but there is no measurement value in shipping them to Google
                  either, so they stay here. */}
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="mt-14 lg:col-span-7 lg:col-start-6 lg:mt-0"
          >
            <InquiryForm initialServices={initialServices} />
          </motion.div>
        </div>
      </div>
    </section>
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

function Intro({ note }: { note?: string }) {
  const [line1, line2] = INQUIRY_COPY.headline;
  const accent = INQUIRY_COPY.accentWord;
  const leadIn = line2.slice(0, line2.length - accent.length);

  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="caps flex flex-wrap items-center gap-3"
      >
        <span aria-hidden className="block h-px w-6 shrink-0 bg-accent/70" />
        <span className="text-ink">{INQUIRY_COPY.label}</span>
        {/* A service page says which service without forking the section. */}
        {note ? (
          <>
            <span aria-hidden className="block h-2.5 w-px bg-line-strong" />
            <span className="text-ink-muted">{note}</span>
          </>
        ) : null}
      </motion.p>

      <div className="mt-8 flex flex-col gap-x-16 gap-y-7 md:mt-10 lg:flex-row lg:items-end lg:justify-between">
        {/* Trigger on the heading, not the clipped lines: a line translated
            outside its overflow-hidden parent never intersects the viewport,
            so it would never fire on its own. Variants propagate. */}
        <motion.h2
          id="project-inquiry-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
          className="max-w-[min(92vw,34rem)] font-display text-[clamp(1.9rem,3.8vw,3.3rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink"
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

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:max-w-[32ch] lg:pb-2"
        >
          {INQUIRY_COPY.lead}
        </motion.p>
      </div>
    </>
  );
}
