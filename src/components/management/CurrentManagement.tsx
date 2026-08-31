"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import { MANAGEMENT, MANAGEMENT_AVATAR } from "@/config/management";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CURRENT MANAGEMENT — the page's second chapter, and its strongest single
 * relationship claim.
 *
 * `01 / Selected Collaborations` says which brands the work has run alongside.
 * This says the agency manages a creator, today. Those are the two facts an
 * outreach recipient is scanning for, so they sit back to back before the page
 * starts explaining itself.
 *
 * **Premium editorial proof, and deliberately not any of the obvious things:**
 * no analytics dashboard, no follower count, no engagement bar, no platform
 * chrome, no verified tick, no influencer-SaaS panel. The name, the handle,
 * one sentence, one quiet link out.
 *
 * The composition is **type left, identity plate right** — structurally unlike
 * §06 Recognition and §03 Creators' index-plus-cascade, so no two chapters on
 * this page read as the same layout.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY THE RIGHT-HAND COLUMN IS TYPE RATHER THAN A PORTRAIT (Revision 17B)
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Revision 17 built this as two large photographic frames. **The user has
 * since confirmed those images are not Akash Sagar**, and they are gone — see
 * `MANAGEMENT_REVOKED_MEDIA`. The library holds no other identified photograph
 * of him, so the only traceable image left is the profile picture the exact
 * official account publishes, at 150×150 and no larger.
 *
 * So the media became a **plate**: the official avatar at 72px — inside its
 * own resolution even at 2× DPR — the handle set as display type, and the
 * chapter's hairline grammar carrying the rest. **The avatar is never
 * upscaled**, and the relationship is not unpublished to protect a
 * composition. A correct small image beats a wrong large one.
 *
 * **Unnumbered**, so §02, §03 and `ABOUT_CHAPTER` are untouched.
 */
export function CurrentManagement() {
  return (
    <section
      id="current-management"
      aria-labelledby="current-management-title"
      className="relative w-full border-t border-line bg-canvas"
    >
      <Grid />

      <div className="page-x relative pt-14 pb-14 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* ── The claim ───────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="caps flex items-center gap-3 text-ink"
            >
              {/* A short teal rule instead of a chapter index — the interlude
                  grammar the Difference and Client Notes already use. */}
              <span aria-hidden className="block h-px w-6 shrink-0 bg-accent" />
              {MANAGEMENT.label}
            </motion.p>

            {/* The name *is* the headline here. Every other chapter opens on a
                statement; this one opens on a person, which is the point. */}
            <motion.h2
              id="current-management-title"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: "-12% 0px" }}
              className="mt-7 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.035em] text-ink md:mt-8"
            >
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                  className="block"
                >
                  {MANAGEMENT.name}
                </motion.span>
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              {/* The handle used to sit here in teal caps. It moved into the
                  identity plate in Revision 17B, where it is the graphic and
                  is set five times larger — printing it in both columns at the
                  same eye level read as a duplication rather than as emphasis. */}
              <p className="mt-6 max-w-[46ch] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.72] text-ink/72">
                {MANAGEMENT.statement}
              </p>

              {/* Metrics render only when there are verified ones. Empty today,
                  and an empty array renders nothing at all — no placeholder
                  row, no dash, no "coming soon". */}
              <Metrics />

              <a
                href={MANAGEMENT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${MANAGEMENT.name} on Instagram, ${MANAGEMENT.handle}`}
                className="group mt-9 inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink transition-colors duration-300"
              >
                <span className="relative">
                  {MANAGEMENT.cta}
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
              </a>
            </motion.div>
          </div>

          {/* ── The identity plate ──────────────────────────────────── */}
          <div className="mt-12 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <IdentityPlate />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * THE IDENTITY PLATE — the handle as the graphic, the official avatar as the
 * verification mark.
 *
 * The one image this project can trace to Akash Sagar is 150×150 (see
 * `MANAGEMENT_AVATAR`), so **it is rendered at 72px and the typography carries
 * the composition**. Nothing here is a placeholder for a photograph that is
 * coming: it is a complete editorial treatment of the evidence that exists,
 * built from the site's own hairline vocabulary — the same self-suppressing
 * discipline §06 and Client Notes apply to content they cannot verify.
 *
 * Deliberately **not** a social-profile card: no follower count, no verified
 * tick, no Instagram chrome, no gradient ring, no "Follow" button. The avatar
 * sits in the site's own square 3px frame with an `image-line` hairline, the
 * treatment every other photograph on this page already uses.
 */
function IdentityPlate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.95, delay: 0.12, ease: EASE }}
      className="mgt-plate"
    >
      {/* A teal corner marker rather than a border on all four sides — the
          same restraint the interlude's rule uses instead of a chapter index. */}
      <span aria-hidden className="mgt-plate-mark" />

      <div className="mgt-plate-head">
        <span className="mgt-avatar">
          <Image
            src={MANAGEMENT_AVATAR.src}
            alt={MANAGEMENT_AVATAR.alt}
            width={MANAGEMENT_AVATAR.width}
            height={MANAGEMENT_AVATAR.height}
            // Rendered at 72px, so the 150px source covers 2x DPR exactly and
            // is never asked to do more than it can. `sizes` is deliberately a
            // fixed pixel value: this box does not scale with the viewport.
            sizes="72px"
            className="mgt-avatar-img"
          />
        </span>

        <span className="mgt-plate-caption caps text-ink-muted">
          {MANAGEMENT.plateLabel}
        </span>
      </div>

      {/* The handle is the graphic. It is distinctive, it is the thing a brand
          partner will search for, and it is set at display scale for exactly
          that reason — the name is already the headline in the column left. */}
      <p className="mgt-handle font-display text-ink">{MANAGEMENT.handle}</p>

      <p className="mgt-plate-note caps text-ink-muted">
        {MANAGEMENT.plateNote}
      </p>
    </motion.div>
  );
}

/**
 * The metric row — **architecture only until there is evidence.**
 *
 * `MANAGEMENT.metrics` is empty and returning `null` is the whole behaviour:
 * an empty state here would be a claim that figures exist and are being
 * withheld. Populating the array is the only change needed to switch it on.
 */
function Metrics() {
  if (MANAGEMENT.metrics.length === 0) return null;

  return (
    <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-7">
      {MANAGEMENT.metrics.map((m) => (
        <div key={m.label}>
          <dt className="caps text-ink-muted">{m.label}</dt>
          <dd className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-none font-medium tracking-[-0.03em] text-ink">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The hero's vertical grid continues through this section. */
function Grid() {
  return (
    <div
      aria-hidden
      className="page-x pointer-events-none absolute inset-0 hidden lg:block"
    >
      <div className="grid h-full grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="block h-full w-px bg-grid" />
        ))}
      </div>
    </div>
  );
}
