"use client";

import { motion } from "motion/react";

import { CtaButton } from "@/components/ui/CtaButton";

import { EASE } from "./ServiceSection";

/**
 * SHARED SERVICE-PAGE HERO
 *
 * The copy column, the grid, the entry choreography and the CTA hierarchy are
 * the same on every service page. **The composition beside it is not** — each
 * service gets its own `visual`, which is where the five pages stop looking
 * like each other.
 *
 * `id="hero"` on purpose, and it is load-bearing. The layout's skip link and
 * the footer's back-to-top both point at `TOP_ANCHOR` (`#hero`), so giving
 * every page's opening section that id makes both work on a subpage with no
 * change to either component and no second anchor map. It also means
 * `useActiveSection` resolves to `hero`, which matches no nav item — so the
 * header sits genuinely neutral on a service route rather than lighting a
 * homepage section the visitor is not in.
 *
 * **No WebGL here, ever.** The homepage Hero is the site's only 3D moment
 * (§12); a service page's composition is DOM, CSS, Motion and SVG.
 */

type Action = { label: string; href: string; external?: boolean };

export function ServiceHero({
  parent,
  title,
  headline,
  accentWord,
  lead,
  detail,
  primary,
  primaryNote,
  secondary,
  tertiary,
  visual,
  wideVisual,
  caption,
  signalPath,
}: {
  /**
   * The one crumb above this page. `SERVICES` → `02 / What We Do`, which is
   * the homepage's services layer and the only real parent this route has —
   * there is no `/services` index page, so the breadcrumb must not imply one.
   */
  parent: Action;
  /** The service name — the current crumb, and the section's accessible label. */
  title: string;
  headline: readonly [string, string];
  accentWord: string;
  lead: string;
  detail: string;
  primary: Action;
  primaryNote: string;
  secondary: Action;
  /**
   * An optional **third** route out, rendered as a quiet text link rather than
   * a button — never a third weight competing with the two above it.
   *
   * Services 01–03 leave it unset and are byte-identical without it. Service 04
   * uses it because a build engagement starts with a brief rather than a call,
   * so `Start a Project` leads and the consultation moves here — the CTA
   * hierarchy inverts on that page without the component forking (§10l's own
   * remedy: art-direct through a slot).
   */
  tertiary?: Action;
  /** The page's own composition. */
  visual: React.ReactNode;
  /**
   * Lets a composition run to 38rem instead of 34rem.
   *
   * Services 01–03 are art-directed at 34rem and stay there. Service 04's
   * build stage carries four surfaces at four depths rather than one anchored
   * object, and at 34rem the interfaces inside them were reading as texture
   * rather than as structure. Optional, so nothing else moves.
   */
  wideVisual?: boolean;
  /** Factual attribution for any photography inside the composition. */
  caption?: string;
  /** The concept the composition draws, stated in words beneath it. */
  signalPath?: readonly string[];
}) {
  const [line1, line2] = headline;
  const accentAt = line2.indexOf(accentWord);
  const leadIn = accentAt === -1 ? line2 : line2.slice(0, accentAt);
  const trailing =
    accentAt === -1 ? "" : line2.slice(accentAt + accentWord.length);

  return (
    <section
      id="hero"
      aria-label={title}
      className="grain relative isolate w-full overflow-hidden bg-canvas"
    >
      <HeroGrid />

      <div className="page-x relative flex flex-col justify-center pt-[calc(var(--header-h)+clamp(28px,6vh,64px))] pb-[clamp(56px,8vh,96px)] lg:min-h-[100svh]">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* ── Copy ──────────────────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* ── Breadcrumb ─────────────────────────────────────
                The eyebrow *is* the back-context, rather than a second row
                above it: one editorial line, with only the parent actionable.
                A dedicated route needs a way back to the chapter it came from
                more than it needs its homepage chapter number, so the index is
                not repeated here.

                Plain `<a>`, not `<Link>`: a client-side navigation to
                `/#what-we-do` would scroll before the homepage's hydration
                changes its height — the 2,247px problem §10g documents — and
                only a real navigation re-runs `useHashLanding`. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              className="flex w-fit items-center gap-3"
            >
              <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
              <nav aria-label="Breadcrumb">
                <ol className="caps flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink/55">
                  <li>
                    <a
                      href={parent.href}
                      className="group relative inline-block py-1 transition-colors duration-300 hover:text-ink"
                    >
                      {parent.label}
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                  <li aria-hidden className="text-ink/25">
                    /
                  </li>
                  <li aria-current="page">{title}</li>
                </ol>
              </nav>
            </motion.div>

            {/* The page's one h1. */}
            <h1 className="mt-6 max-w-[min(92vw,42rem)] font-display text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.96] font-medium tracking-[-0.038em] text-ink sm:mt-8">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.24, ease: EASE }}
                  className="block"
                >
                  {line1}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.34, ease: EASE }}
                  className="block"
                >
                  {leadIn}
                  <span className="relative inline-block font-accent italic">
                    {accentWord}
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
                      className="absolute right-[0.09em] -bottom-[0.03em] left-0 block h-[2px] origin-left bg-accent"
                    />
                  </span>
                  {trailing}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="mt-7 max-w-[40ch] text-[clamp(1rem,1.05vw,1.1875rem)] leading-[1.55] text-ink/75 sm:mt-8"
            >
              {lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
              className="mt-6"
            >
              <span aria-hidden className="mb-4 block h-px w-14 bg-line" />
              <p className="max-w-[54ch] text-[0.8125rem] leading-[1.7] text-ink-soft">
                {detail}
              </p>
            </motion.div>

            {/* ── CTAs ────────────────────────────────────────────
                The route's whole conversion hierarchy lives here: the booking
                ask once, at the top, and a secondary that scrolls to the
                inquiry form at the foot. Nothing is repeated mid-page. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
              className="mt-9 sm:mt-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                {/* MEASUREMENT IS DERIVED HERE, NOT PASSED BY FIVE PAGES.
                    These two slots have fixed meanings on every service route —
                    the primary is always the booking ask, the secondary always
                    goes to the inquiry form — so the events belong to the
                    component that guarantees that, not repeated in five page
                    files that could drift. **Which** service is not lost:
                    `page_location` rides on every GA4 event. */}
                <CtaButton
                  href={primary.href}
                  variant="primary"
                  track={{ name: "book_consultation", context: "service_hero" }}
                  {...(primary.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : undefined)}
                >
                  {primary.label}
                </CtaButton>
                <CtaButton
                  href={secondary.href}
                  variant="secondary"
                  track={{ name: "start_project", context: "service_hero" }}
                >
                  {secondary.label}
                </CtaButton>
              </div>

              {tertiary ? (
                <a
                  href={tertiary.href}
                  {...(tertiary.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : undefined)}
                  className="caps group mt-5 inline-flex min-h-11 items-center gap-2.5 pl-1 text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  <span
                    aria-hidden
                    className="block h-px w-4 shrink-0 origin-left bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:scale-x-150"
                  />
                  {tertiary.label}
                  <span aria-hidden className="text-[0.6875rem] leading-none">
                    &#8599;
                  </span>
                </a>
              ) : null}

              <p
                className={`caps pl-1 text-ink-muted ${tertiary ? "mt-3" : "mt-4"}`}
              >
                {primaryNote}
              </p>
            </motion.div>
          </div>

          {/* ── Composition ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            // `mt-10` below `sm`: 56px between the CTA block and the
            // composition reads as a gap rather than a join on a phone. From
            // 640 up the approved 56 is unchanged.
            className={`mt-10 w-full max-w-[30rem] sm:mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:ml-auto ${
              wideVisual
                ? // The tablet band matters as much as the desktop one here:
                  // between 640 and 1024 this composition switches to its wide
                  // table but the 30rem cap held it to 480px, leaving a third
                  // of a 768px viewport empty beside it.
                  "sm:max-w-[36rem] lg:max-w-[38rem]"
                : "lg:max-w-[34rem]"
            }`}
          >
            {visual}

            {signalPath ? (
              <div className="mt-6">
                <span aria-hidden className="block h-px w-full bg-line" />
                {/* Tracked at 0.16em rather than `.caps`'s 0.26em — §11's own
                    remedy for a dense rail. At the default the five-step path
                    on Service 03 wrapped with `→ Signal` orphaned on a line of
                    its own, which reads as broken rather than as a wrap.
                    Tighter tracking can only reduce wrapping, so the other
                    service heroes are unaffected or improved. */}
                <ul className="caps mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 tracking-[0.16em] text-ink-muted">
                  {signalPath.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span aria-hidden className="text-ink-muted/60">
                          &rarr;
                        </span>
                      ) : null}
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {caption ? (
              // Full `ink-muted`, not 80% of it. On Service 03 this slot
              // carries the content-integrity disclaimer §10m requires to be
              // *rendered*, and at 9px on 80% muted it was effectively
              // invisible in the screenshot — a disclaimer nobody can read is
              // not rendered in any meaningful sense.
              <p className="caps mt-4 max-w-[46ch] text-[0.5625rem] leading-[1.7] text-ink-muted">
                {caption}
              </p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** The page opening on its most structured state — the same draw the homepage
    Hero uses, so a service route arrives inside the site's own system. */
function HeroGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      <div className="page-x grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.1 + i * 0.03, ease: EASE }}
            className="block h-full w-px origin-top bg-grid"
          />
        ))}
      </div>
    </div>
  );
}
