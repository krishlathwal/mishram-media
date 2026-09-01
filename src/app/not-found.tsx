import type { Metadata } from "next";

import { Arrow } from "@/components/ui/Arrow";
import { PageLink } from "@/components/ui/PageLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { CONTACT } from "@/config/site";

/**
 * 404 — the branded not-found page.
 *
 * Until Revision 39 this route rendered Next's own default: an unstyled
 * "404: This page could not be found." on a white card, with **its own
 * `<title>`**, no header, no footer and no trace of the site around it. On a
 * site whose whole argument is craft, the one page a visitor reaches by
 * accident was the one page that looked like nobody had built it.
 *
 * **It is deliberately small.** A server component with no client state, no
 * imagery and no animation of its own: the wordmark is the existing CSS mask
 * so it inherits `currentColor` and is correct in both themes, `PageLink`
 * plays the site's own route wipe, and the header, footer, theme system and
 * consent notice all arrive from `app/layout.tsx` exactly as they do
 * everywhere else. **No new media, no new dependency, no new CSS.**
 *
 * **Two routes out and no invented navigation.** Home, and the address the
 * contact panel already publishes — a fabricated sitemap of "popular pages"
 * is the template move §18 rules out, and a visitor who mistyped a URL wants
 * the front door or a person, not a menu.
 *
 * `min-h` is `100svh` minus the header, so the page fills the viewport without
 * the footer floating in the middle of a short document.
 */
export const metadata: Metadata = {
  title: "Page not found",
  // A 404 must never be indexed — it is a real response code, not a page.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="hero"
      className="page-x flex min-h-[calc(100svh-var(--header-h))] w-full flex-col justify-center border-t border-line bg-canvas py-24"
    >
      <p className="caps flex items-center gap-3 text-ink-muted">
        <span aria-hidden className="block h-px w-6 bg-accent" />
        404
      </p>

      <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.036em] text-ink">
        This page isn&apos;t{" "}
        <span className="font-accent italic">here.</span>
      </h1>

      <p className="mt-7 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
        The link may be old, or the address may have a typo in it. Everything
        else is where it was.
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
        <PageLink
          href="/"
          className="group inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] font-medium text-ink"
        >
          <span className="relative">
            Return home
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
            />
          </span>
          <span aria-hidden className="block h-3 w-3 overflow-hidden">
            <Arrow
              size={12}
              className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:translate-x-4 group-hover:-translate-y-4"
            />
          </span>
        </PageLink>

        {/* The published address, not a second copy of the contact panel. */}
        <a
          href={`mailto:${CONTACT.email}`}
          className="group inline-flex min-h-11 items-center text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
        >
          <span className="relative">
            {CONTACT.email}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
            />
          </span>
        </a>
      </div>

      <Wordmark className="mt-20 w-[min(52vw,15rem)] text-ink/10" />
    </main>
  );
}
