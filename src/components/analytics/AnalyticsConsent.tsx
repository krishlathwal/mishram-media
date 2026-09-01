"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";

import { PageLink } from "@/components/ui/PageLink";
import { analyticsEnabled, type ConsentChoice } from "@/config/analytics";
import { readConsent, setConsent, subscribeConsent } from "@/lib/analytics";

/**
 * THE ANALYTICS CONSENT NOTICE.
 *
 * A hairline card in the corner, in the site's own type. **Not a modal, not a
 * scrim, not a wall.** It does not trap focus, does not block the page, does
 * not stop a visitor reading or submitting anything, and disappears for good
 * once answered. §10h's argument against SaaS form chrome applies here too:
 * the standard cookie banner is the single ugliest component on most premium
 * sites, and this site is its own portfolio piece.
 *
 * **Two answers, both real.** `Allow analytics` grants `analytics_storage`;
 * `Only necessary` leaves it denied. Neither is pre-selected, neither is
 * styled as the "wrong" one, and there is no dismiss-without-answering X —
 * closing a consent prompt is not an answer, and treating it as one is exactly
 * the dark pattern the plan said not to build.
 *
 * **It asks only about analytics**, because analytics is all this site has.
 * There is no advertising tag, so the three `ad_*` signals stay denied and are
 * not offered as a choice — asking for a permission with nothing behind it
 * would be theatre (`config/analytics.ts`).
 *
 * ── ACCESSIBILITY ─────────────────────────────────────────────────────────
 *
 * A labelled `<section>` with real `<button>`s in the tab order, `polite` so it
 * never interrupts a screen reader mid-sentence, and a visible focus ring on
 * both actions. The entrance is opacity and 8px — `MotionConfig
 * reducedMotion="user"` in the layout strips the movement for anyone who asks,
 * leaving a plain fade.
 *
 * ── WHEN IT APPEARS ───────────────────────────────────────────────────────
 *
 * Only when the tag is switched on **and** this visitor has not answered.
 *
 * The answer lives in `localStorage`, which the server cannot see, so it is
 * read through `useSyncExternalStore` — the same idiom `ThemeProvider` uses for
 * the same reason. The server snapshot is `"answered"`, so the notice is absent
 * from the prerendered HTML and appears after hydration only for a visitor who
 * genuinely has not replied. **There is no copy of the choice in React state**:
 * `setConsent` writes it and fires the event, and this re-reads.
 */

const COPY = {
  label: "Analytics",
  body: "We'd like to measure how this site is used — pages viewed, and which campaigns bring people here. No name, email or message you send us is ever included.",
  allow: "Allow analytics",
  deny: "Only necessary",
  privacy: "Privacy",
} as const;

/** True once the visitor has chosen either way. */
function getSnapshot(): boolean {
  return readConsent() !== null;
}

/** Nothing is known on the server, so nothing is rendered there. */
function getServerSnapshot(): boolean {
  return true;
}

export function AnalyticsConsent() {
  const answered = useSyncExternalStore(
    subscribeConsent,
    getSnapshot,
    getServerSnapshot,
  );

  function answer(choice: ConsentChoice) {
    setConsent(choice);
  }

  if (!analyticsEnabled) return null;

  return (
    <AnimatePresence>
      {!answered && (
        <motion.section
          aria-label="Analytics consent"
          aria-live="polite"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 z-90 w-[min(calc(100vw-2rem),25rem)] border border-line-strong bg-canvas p-5 sm:bottom-6 sm:left-6 sm:p-6"
        >
          <p className="caps flex items-center gap-3 text-ink">
            <span aria-hidden className="block h-px w-5 shrink-0 bg-accent/70" />
            {COPY.label}
          </p>

          <p className="mt-4 text-[0.8125rem] leading-[1.65] text-ink-soft">
            {COPY.body}
          </p>

          {/* TOUCH TARGETS — 48px, which is this project's own standard rather
              than a floor borrowed from the spec.

              Both buttons shipped at `h-10` (40px). That clears WCAG 2.2 AA's
              24px minimum comfortably and was left alone during the launch
              (§10ae item 5), but it is under the 48px the inquiry form's option
              rows hold themselves to — and a consent notice is the one control
              a visitor must operate before doing anything else. `h-12` brings
              it to the same bar. The notice's own height is unchanged where it
              matters: these two are the tallest things in the row, so the row
              grows by the 8px difference and nothing reflows around it. */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={() => answer("granted")}
              className="inline-flex h-12 items-center rounded-[3px] bg-ink px-4 text-[0.8125rem] font-medium text-canvas transition-opacity duration-300 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {COPY.allow}
            </button>

            <button
              type="button"
              onClick={() => answer("denied")}
              className="inline-flex h-12 items-center rounded-[3px] border border-line-strong px-4 text-[0.8125rem] font-medium text-ink transition-colors duration-300 hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {COPY.deny}
            </button>

            {/* Deliberately quiet and deliberately present: the one place a
                visitor can read what this actually does before answering.

                `min-h-11` (44px) is a target, not a size — the link keeps its
                12px type and its underline reveal, and because the buttons
                beside it are 48px the row does not grow by a pixel. Without it
                the hit area was the height of the text itself, which is under
                WCAG 2.2 AA's 24px minimum for a control that is not inline in
                a sentence. */}
            <PageLink
              href="/privacy"
              className="group inline-flex min-h-11 items-center text-[0.75rem] text-ink-muted transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {/* The underline anchors to the text, not to the 44px target —
                  on the link box it would have drawn along the bottom of the
                  hit area instead of under the words. */}
              <span className="relative">
                {COPY.privacy}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                />
              </span>
            </PageLink>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
