"use client";

import clsx from "clsx";
import { motion } from "motion/react";

import type { ServiceSectionCopy, ServiceStep } from "@/config/service-pages";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * THE SERVICE'S OWN PROCESS — short, structural, and deliberately not §04.
 *
 * The homepage already owns the full Work Process: five stages on a rising
 * line, selectable, with a feedback loop drawn under it. Repeating any of that
 * here would be the same section twice at different lengths.
 *
 * So this is four steps on one hairline, each opening with a teal tick — a
 * structure, not a diagram, and readable in a single pass. Nothing to select,
 * nothing to discover.
 */
export function ServiceProcess({
  id,
  copy,
  steps,
}: {
  id: string;
  copy: ServiceSectionCopy;
  steps: readonly ServiceStep[];
}) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="full">
      <ServiceSectionHead id={`${id}-title`} copy={copy} />

      <ol
        className={clsx(
          "mt-14 grid border-t border-line md:mt-16 md:grid-cols-2 lg:mt-20",
          // Derived rather than fixed at four: Service 01 has four moves and
          // Service 02 has five, and neither should be padded or wrapped to
          // match the other. Static class names so Tailwind can see them.
          steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
        )}
      >
        {steps.map((step, i) => (
          <motion.li
            key={step.index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease: EASE }}
            className="relative pt-8 pb-8 md:pr-8 lg:pb-0"
          >
            {/* The tick sitting on the shared hairline — where this step
                starts, marked on the structure itself. */}
            <span
              aria-hidden
              className="absolute top-0 left-0 block h-5 w-px bg-accent"
            />
            <span className="caps block text-[0.5625rem] text-ink-muted">
              {step.index}
            </span>
            <h3 className="mt-5 max-w-[14ch] font-display text-[clamp(1.2rem,1.75vw,1.6rem)] leading-[1.1] font-medium tracking-[-0.032em] text-ink">
              {step.name}
            </h3>
            <p className="mt-4 max-w-[34ch] text-[0.875rem] leading-[1.7] text-ink-soft">
              {step.detail}
            </p>
          </motion.li>
        ))}
      </ol>
    </ServiceSection>
  );
}
