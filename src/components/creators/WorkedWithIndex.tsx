"use client";

import { motion } from "motion/react";

import { Arrow } from "@/components/ui/Arrow";
import {
  CREATORS_COPY,
  CREATOR_SCALE,
  WORKED_WITH_INDEX,
  WORKED_WITH_LEAD,
  workedWithUrl,
  type WorkedWith,
} from "@/config/creators";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * THE SECOND LAYER OF §03 — scale, then the worked-with roster.
 *
 * The stage above shows creators the project has approved photography for.
 * This shows the rest of the confirmed relationships as **type**, because the
 * project has an identified photograph for one of them and inventing the other
 * seventeen is not an option (see the note at `WORKED_WITH`).
 *
 * **An editorial index, not cards.** No portraits, no avatars, no follower
 * counts, no niches, no tiers, no ranking, no "view profile". Columns of names
 * on hairlines, an optional quiet second line carrying an organisation and/or
 * a verified handle, and nothing that could be mistaken for a directory of
 * bookable talent.
 *
 * **PROFILE LINKS, added in Revision 17B.** A handle renders as a real
 * outbound link only where it was verified (see `WorkedWith.instagram`); a
 * name without one renders as a name. **No `href="#"`, no disabled control,
 * no greyed-out row and no "profile coming soon"** — the rule §18 already
 * applies to unbuilt routes, the suppressed LinkedIn icon, Recognition and
 * Client Notes. A missing thing is absent, never faked.
 *
 * The two scale facts sit above it as **large type on the same hairline
 * grammar** — deliberately not KPI cards, not a counter, not a chart.
 */
export function WorkedWithIndex() {
  return (
    <div className="mt-12 md:mt-16">
      <Scale />
      <Roster />
    </div>
  );
}

/**
 * The handle, as a real destination.
 *
 * Rendered in the same grammar as every other outbound link on this site — a
 * small caps label and the site's travelling arrow — rather than as a platform
 * chip or an icon button. The accessible label carries the person's name, so
 * `@handle` is never the only thing a screen reader hears, and the whole row's
 * name is not part of the link: the name is a statement the site is making,
 * the handle is a place to go, and only one of those is clickable.
 */
function ProfileLink({
  person,
  large = false,
}: {
  person: WorkedWith;
  large?: boolean;
}) {
  if (!person.instagram) return null;

  return (
    <a
      href={workedWithUrl(person.instagram)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${person.name} on Instagram`}
      className={`wwi-link group/ig ${large ? "wwi-link--lead" : ""}`}
    >
      <span>@{person.instagram}</span>
      <span aria-hidden className="block h-2.5 w-2.5 shrink-0 overflow-hidden">
        <Arrow
          size={10}
          className="-rotate-45 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/ig:translate-x-3 group-hover/ig:-translate-y-3"
        />
      </span>
    </a>
  );
}

function Scale() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <p className="caps text-ink-muted">{CREATORS_COPY.scaleLabel}</p>

      {/* Two facts on one rule. Sized like a statement rather than a metric —
          the number is the sentence, so it takes display type and the label
          sits under it in the site's own small caps. */}
      <dl className="mt-5 grid gap-x-8 gap-y-7 border-t border-line pt-7 sm:grid-cols-2">
        {CREATOR_SCALE.map((fact) => (
          <div key={fact.label}>
            <dd className="font-display text-[clamp(2rem,4vw,3.1rem)] leading-[0.98] font-medium tracking-[-0.038em] text-ink">
              {fact.value}
            </dd>
            <dt className="caps mt-4 text-ink-soft">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

function Roster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
      className="mt-11 md:mt-13"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="caps text-ink">{CREATORS_COPY.workedWithLabel}</p>
        <p className="max-w-[52ch] text-[0.8125rem] leading-[1.7] text-ink-soft">
          {CREATORS_COPY.workedWithNote}
        </p>
      </div>

      <Lead />

      {/* Two columns from `sm`, three from `lg`, one below that. Flowing **down
          column one then down column two** is what makes an index read as an
          index — the same `grid-auto-flow: column` reasoning §10b-scale applies
          to the roster matrix above, and the DOM order stays the reading order
          so Tab agrees with the eye. */}
      <ul
        className="wwi-list mt-8 border-t border-line"
        style={{
          // Derived, so adding a name rebalances the columns with no CSS edit.
          ["--wwi-rows-2" as string]: String(Math.ceil(WORKED_WITH_INDEX.length / 2)),
          ["--wwi-rows-3" as string]: String(Math.ceil(WORKED_WITH_INDEX.length / 3)),
        }}
      >
        {WORKED_WITH_INDEX.map((person) => (
          <li key={person.name} className="wwi-row">
            <span className="wwi-name">{person.name}</span>

            {/* The row's quiet second register. It carries the organisation
                the client supplied, the verified handle, or both — and
                nothing at all where neither exists, which is a real state
                rather than a gap to fill. */}
            {person.context || person.instagram ? (
              <span className="wwi-meta">
                {person.context ? (
                  <span className="wwi-context">{person.context}</span>
                ) : null}
                <ProfileLink person={person} />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * THE LEAD NAMES — the two the index sets at display scale.
 *
 * High-recognition relationships the project has **no first-party photograph
 * of**, so type is the only honest way to give them weight; the alternative
 * would be putting a picture on the page that this project cannot source. They
 * sit between the index's heading and the list, in the same hairline grammar,
 * at roughly the scale the scale facts above use.
 *
 * Two names on one rule at `sm` and above, stacked below it. Self-suppressing:
 * mark nothing `lead` in config and this renders nothing.
 */
function Lead() {
  if (WORKED_WITH_LEAD.length === 0) return null;

  return (
    <ul className="wwi-lead mt-8 border-t border-line">
      {WORKED_WITH_LEAD.map((person) => (
        <li key={person.name} className="wwi-lead-item">
          <p className="wwi-lead-name font-display text-ink">{person.name}</p>
          {person.context ? (
            <p className="wwi-context mt-3">{person.context}</p>
          ) : null}
          <ProfileLink person={person} large />
        </li>
      ))}
    </ul>
  );
}
