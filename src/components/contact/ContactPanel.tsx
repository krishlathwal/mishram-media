"use client";

import { AnimatePresence, motion } from "motion/react";

import {
  BRAND,
  CONTACT,
  GENERAL_WHATSAPP_MESSAGE,
  bookingHref,
  hasBooking,
  whatsappHref,
} from "@/config/site";
import { useDialogBehaviour } from "@/hooks/useDialogBehaviour";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Arrow } from "@/components/ui/Arrow";

import { useContact } from "./ContactProvider";
import {
  CalendarIcon,
  CloseIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./icons";

type Channel = {
  index: string;
  label: string;
  detail: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
};

const CHANNELS: Channel[] = [
  {
    index: "01",
    label: "WhatsApp",
    detail: "Chat with the team",
    href: whatsappHref(GENERAL_WHATSAPP_MESSAGE),
    icon: WhatsAppIcon,
    external: true,
  },
  {
    index: "02",
    label: "Email",
    detail: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: MailIcon,
  },
  {
    index: "03",
    label: "Call",
    detail: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    icon: PhoneIcon,
  },
  {
    index: "04",
    label: "Book a Call",
    // Falls back to WhatsApp until NEXT_PUBLIC_BOOKING_URL points at a real calendar.
    detail: hasBooking
      ? "15 min · No obligation"
      : "15 min · Request over WhatsApp",
    href: bookingHref,
    icon: CalendarIcon,
    external: true,
  },
];

export function ContactPanel() {
  const { open, closeContact } = useContact();
  const panelRef = useDialogBehaviour(open, closeContact);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduced = usePrefersReducedMotion();

  // Desktop slides in from the right edge, mobile rises from the bottom.
  const shown = { opacity: 1, x: 0, y: 0 };
  const hidden = reduced
    ? { opacity: 0, x: 0, y: 0 }
    : isMobile
      ? { opacity: 1, x: 0, y: "100%" }
      : { opacity: 1, x: "100%", y: 0 };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100" role="presentation">
          <motion.button
            type="button"
            aria-label="Close contact panel"
            onClick={closeContact}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full cursor-default bg-canvas/70 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-panel-title"
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={
              reduced
                ? { duration: 0.2 }
                : { duration: 0.62, ease: [0.16, 1, 0.3, 1] }
            }
            className={[
              "grain absolute flex flex-col bg-canvas",
              "inset-x-0 bottom-0 max-h-[88svh] rounded-t-2xl border-t border-line-strong",
              "md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-[26rem]",
              "md:rounded-none md:border-t-0 md:border-l lg:w-[28rem]",
            ].join(" ")}
          >
            <div
              aria-hidden
              className="mx-auto mt-3 h-[3px] w-9 rounded-full bg-ink/20 md:hidden"
            />

            <header className="flex items-start justify-between px-6 pt-6 pb-7 md:px-8 md:pt-9">
              <div>
                <p className="caps text-accent">Contact</p>
                <h2
                  id="contact-panel-title"
                  className="mt-4 font-display text-[1.75rem] leading-[1.05] tracking-[-0.03em] text-ink md:text-[2rem]"
                >
                  Start a<br />
                  conversation.
                </h2>
                <p className="mt-3 max-w-[26ch] text-[0.8125rem] leading-[1.6] text-ink-soft">
                  Choose how you&rsquo;d like to reach us.
                </p>
              </div>

              <button
                type="button"
                onClick={closeContact}
                aria-label="Close contact panel"
                className="group -mt-1 -mr-1 grid h-9 w-9 shrink-0 place-items-center border border-line text-ink-soft transition-colors duration-300 hover:border-line-strong hover:text-ink"
              >
                <CloseIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-90" />
              </button>
            </header>

            <ul className="flex-1 overflow-y-auto border-t border-line">
              {CHANNELS.map((c) => (
                <li key={c.index} className="border-b border-line">
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={closeContact}
                    className="group/row relative flex items-center gap-4 px-6 py-5 md:px-8"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-ink/[0.035] transition-transform duration-[520ms] ease-[var(--ease-out-expo)] group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
                    />
                    <span
                      aria-hidden
                      className="absolute top-0 bottom-0 left-0 w-px origin-bottom scale-y-0 bg-accent transition-transform duration-[520ms] ease-[var(--ease-out-expo)] group-hover/row:scale-y-100 group-focus-visible/row:scale-y-100"
                    />

                    <span className="caps relative z-10 w-6 text-ink-muted transition-colors duration-300 group-hover/row:text-accent">
                      {c.index}
                    </span>

                    <c.icon className="relative z-10 h-[18px] w-[18px] shrink-0 text-ink-soft transition-colors duration-300 group-hover/row:text-accent" />

                    <span className="relative z-10 min-w-0 flex-1">
                      <span className="block text-[0.9375rem] leading-tight font-medium text-ink">
                        {c.label}
                      </span>
                      <span className="mt-1 block truncate text-[0.75rem] leading-tight text-ink-soft">
                        {c.detail}
                      </span>
                    </span>

                    <span className="relative z-10 block h-3.5 w-3.5 shrink-0 overflow-hidden text-ink-soft">
                      <Arrow className="absolute inset-0 transition-all duration-[420ms] ease-[var(--ease-out-expo)] group-hover/row:translate-x-5 group-hover/row:text-accent" />
                      <Arrow className="absolute inset-0 -translate-x-5 transition-all duration-[420ms] ease-[var(--ease-out-expo)] group-hover/row:translate-x-0 group-hover/row:text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <footer className="px-6 pt-6 pb-[max(24px,env(safe-area-inset-bottom))] md:px-8 md:py-8">
              <p className="caps text-ink-muted">{BRAND.name}</p>
              <p className="mt-3 max-w-[30ch] text-[0.75rem] leading-[1.7] text-ink-muted">
                {CONTACT.address}
              </p>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-[0.75rem] text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                <span className="relative">
                  Instagram
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
                <span aria-hidden className="text-[0.625rem]">
                  &#8599;
                </span>
              </a>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
