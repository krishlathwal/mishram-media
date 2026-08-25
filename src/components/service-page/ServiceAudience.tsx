"use client";

import { motion } from "motion/react";

import type { ServiceSectionCopy } from "@/config/service-pages";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * WHO THIS IS FOR — a statement, then a rail.
 *
 * **Not five audience cards.** The section's weight is on one line of type; the
 * audiences underneath are a restrained hairline rail, which is what keeps this
 * a qualifying moment rather than a persona grid.
 *
 * The copy is expected to *narrow* the claim rather than widen it — a service
 * that suits everyone is a service that describes nobody, and §1 forbids the
 * kind of language that would let it.
 */
export function ServiceAudience({
  id,
  copy,
  audiences,
}: {
  id: string;
  copy: ServiceSectionCopy;
  audiences: readonly string[];
}) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <ServiceSectionHead
        id={`${id}-title`}
        copy={copy}
        lead="beside"
        className="max-w-[min(100%,64rem)]"
      />

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className="mt-14 grid border-t border-line sm:grid-cols-2 md:mt-16 lg:mt-20 lg:grid-cols-5"
      >
        {audiences.map((audience, i) => (
          <li
            key={audience}
            className="border-b border-line py-6 sm:border-b-0 sm:py-7 lg:border-l lg:border-l-line lg:pr-4 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <span className="caps block text-[0.5625rem] text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-4 block max-w-[16ch] font-display text-[clamp(1rem,1.35vw,1.1875rem)] leading-[1.25] font-medium tracking-[-0.028em] text-ink">
              {audience}
            </span>
          </li>
        ))}
      </motion.ul>
    </ServiceSection>
  );
}
