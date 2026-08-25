"use client";

import { useCallback, useState } from "react";
import { motion } from "motion/react";

import type { ServiceFaqItem, ServiceSectionCopy } from "@/config/service-pages";

import { EASE, ServiceSection, ServiceSectionHead } from "./ServiceSection";

/**
 * FAQ — hairline rows, and nothing else.
 *
 * **No giant FAQ card, no accordion component, no dependency.** A real
 * `<button>` per row carrying `aria-expanded` and `aria-controls`, and the
 * answer in the region it names. Rows open independently and all start closed,
 * which is what distinguishes this from the scope index above — there, one item
 * is always active and selecting another replaces it.
 *
 * The mark is a hairline cross that rotates into a minus. No chevron, no icon
 * font, no rotating caret glyph.
 */
export function ServiceFaq({
  id,
  copy,
  items,
}: {
  id: string;
  copy: ServiceSectionCopy;
  items: readonly ServiceFaqItem[];
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = useCallback((itemId: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  }, []);

  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="none">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <ServiceSectionHead
          id={`${id}-title`}
          copy={copy}
          lead="below"
          className="lg:col-span-4"
        />

        <ul className="mt-12 border-t border-line lg:col-span-7 lg:col-start-6 lg:mt-0">
          {items.map((item, i) => {
            const isOpen = open.has(item.id);
            const panelId = `${id}-${item.id}`;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                className="border-b border-line"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="svp-faq-row group"
                  >
                    <span className="max-w-[38ch] text-left text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-[1.45] font-medium text-ink/85 transition-colors duration-300 group-hover:text-ink">
                      {item.question}
                    </span>
                    <Mark open={isOpen} />
                  </button>
                </h3>

                {/* Always mounted — `aria-controls` has to name an element
                    that exists, and `inert` is what keeps a closed answer out
                    of the accessibility tree and the tab order. The open/close
                    transition is CSS (`.svp-disclosure`), so nothing measures
                    the DOM and reduced motion collapses it for free. */}
                <div
                  id={panelId}
                  inert={!isOpen}
                  data-open={isOpen ? "true" : "false"}
                  className="svp-disclosure"
                >
                  <div>
                    <p className="max-w-[58ch] pr-10 pb-7 text-[0.9375rem] leading-[1.75] text-ink/70">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </ServiceSection>
  );
}

/** Two hairlines. The vertical one collapses, so a plus becomes a minus. */
function Mark({ open }: { open: boolean }) {
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
