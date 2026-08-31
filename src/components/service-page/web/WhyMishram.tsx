"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { PageLink } from "@/components/ui/PageLink";
import {
  PUBLIC_SERVICE_PAGES,
  resolveServicePage,
  servicePagePath,
} from "@/config/service-pages";
import {
  WEB_WHY_COPY,
  WEB_WHY_ENTRY,
  WEB_WHY_EXPLORE_LABEL,
  WEB_WHY_INTRO,
  WEB_WHY_PRACTICE,
  WEB_WHY_SPANS,
  WEB_WHY_STAGES,
} from "@/config/service-web";

import { EASE, ServiceSection, ServiceSectionHead } from "../ServiceSection";

/**
 * 05 / WHY MISHRAM — the connected route.
 *
 * The chapter that answers the only question §01–§04 leave open. They prove
 * Mishram can build the thing; this says why the build should happen here
 * rather than at a development studio — and the answer is not technology.
 *
 * ── THE PACING DECISION, WHICH IS THE FIRST THING TO KNOW ─────────────────
 *
 * **This section is deliberately the cheapest on the route.** §03 pins a
 * three-state capability stage; §04 pins a four-state, fourteen-node
 * architecture. Both are ~3,000–4,600px of scroll on a phone. A third pinned
 * chapter here would have made the page unreadable, so this one has **no
 * sticky track, no scroll MotionValue, no state machine, no pinned viewport
 * and no accumulated diagram** — one drawing, drawn once, and then it stops.
 * The contrast in pacing is the point: the page needs to exhale before the
 * inquiry form.
 *
 * ── THE ARGUMENT, DRAWN ───────────────────────────────────────────────────
 *
 * One route, five stages, two spans over it:
 *
 * ```
 *   ├─ where mishram works ─────────────────────────────┤
 *                                                    ●  Growth
 *                                            ●  System
 *                                    ●  Conversion
 *                            ●  Experience
 *                    ●  Traffic
 *   ────┴───────────┴───────────┴───────────┴───────────┴────
 *        Traffic     Experience  Conversion  System      Growth
 *                    └── a typical web project ──┘
 * ```
 *
 * The whole case is the difference between the two span widths. Nothing is
 * asserted about anybody else — `A typical web project` describes a **brief**,
 * which is a neutral and true statement about scope, and the section never
 * says another agency lacks anything.
 *
 * **The route rises.** Not decoration: it is the one place this page borrows
 * the homepage's own rising-line grammar, and it is why the five drop ticks
 * are different lengths — the stages do not sit at one altitude, so the
 * measured field underneath them has to reach different distances to meet the
 * baseline. The hero's `Grid` annotation set that vocabulary up.
 *
 * ── WHY THIS IS `Traffic` AND NOT `Attention` ─────────────────────────────
 *
 * §04 ends on `Traffic → Experience → Conversion → System → Growth` in display
 * type, under `And what it is all for`, and then stops without explaining it.
 * This section opens on the same five words, in the same order, and gives them
 * a route. The reprise is the chapter transition — which only works if the
 * words match exactly, so `WEB_WHY_STAGES` is pinned to
 * `WEB_SYSTEM_HANDOFF.terms`.
 *
 * ── MOTION ───────────────────────────────────────────────────────────────
 *
 * One in-view boolean draws the route once, in CSS, off a static
 * `pathLength="1"` and a dash-offset transition — the pattern §04's routes
 * use, and the reason `vectorEffect` is absent here too (§10's shatter gotcha
 * needs an *animated* `pathLength`, which this is not). Hover is one React
 * state, set on pointer enter, never during scroll.
 *
 * **Nothing loops**, so once the route has drawn the section costs nothing at
 * all — there is no offscreen work to pause.
 */

/* ── The band's geometry ─────────────────────────────────────────
   Everything is a **percentage of the band**, x and y alike, which is what
   lets the band keep a `clamp()` height instead of an aspect ratio — a route
   whose height tracked its width would be 500px tall on a wide desktop.

   The consequence is that the field is not square, and it is why the
   axis-aligned hairlines are HTML rather than SVG: under
   `preserveAspectRatio="none"` a vertical stroke is scaled by the width and a
   horizontal one by the height, so a single `stroke-width` renders the drop
   ticks several times thicker than the span rule. HTML borders are exactly
   1px at every viewport; the SVG carries only the diagonal route, which is
   near-horizontal and lands between 1.0 and 1.5px across the whole range.

   `vectorEffect` would have solved it in one attribute and is deliberately
   absent — §10's shatter gotcha, the same reason §04's routes omit it. */

/** One x per stage, as a percentage of the band. Column starts, so a node
 *  registers on the first character of its own name rather than floating
 *  above the middle of a centred column. */
const NODE_X = [0, 20, 40, 60, 80] as const;
/** One y per stage. The route rises; the drop ticks absorb the difference. */
const NODE_Y = [86, 77.5, 69, 60.5, 52] as const;

/** The span bracket: its rule, and the length of the ticks that close it. */
const SPAN_Y = 10;
const SPAN_TICK = 15;

/**
 * The route does not stop at `Growth`; a business does not either. A short
 * continuation on the same slope, quieter than the drawn segments, and
 * deliberately **not** the dashed escape stroke §04 uses — that one means
 * "goes somewhere this page has not shown", and this means "keeps going".
 */
const TAIL_X = 97;
const SLOPE = (NODE_Y[4] - NODE_Y[0]) / (NODE_X[4] - NODE_X[0]);
const TAIL_Y = NODE_Y[4] + SLOPE * (TAIL_X - NODE_X[4]);

const line = (x1: number, y1: number, x2: number, y2: number) =>
  `M${x1} ${y1}L${x2} ${y2}`;

/* ── The bridge out of §04 ──────────────────────────────────────── */

function WhyEntry() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      /* Pulled up through `ServiceSection`'s own top padding, and landing in
         the same grid column §04's handoff rail occupies — so the descent
         that started at §03 crosses this chapter rule instead of restarting
         under it. The device is shared on purpose: `.web-sys-entry` is the
         route's chapter bridge, used at both boundaries. */
      className="-mt-24 md:-mt-28 lg:grid lg:grid-cols-12 lg:gap-x-8"
    >
      <div className="web-sys-entry lg:col-span-7 lg:col-start-6">
        <span aria-hidden className="web-sys-entry-dot" />
        <p className="caps text-accent">{WEB_WHY_ENTRY.label}</p>
        <span aria-hidden className="hidden h-px flex-1 bg-line sm:block" />
      </div>
      <p className="mt-4 max-w-[46ch] text-[0.8125rem] leading-[1.7] text-ink-soft lg:col-span-7 lg:col-start-6">
        {WEB_WHY_ENTRY.note}
      </p>
    </motion.div>
  );
}

/* ── The drawn route ────────────────────────────────────────────── */

function Journey() {
  const wrap = useRef<HTMLDivElement>(null);
  /** One boolean, once. No scroll value reaches a style property anywhere. */
  const drawn = useInView(wrap, { once: true, margin: "-15% 0px" });

  /**
   * Which stage the pointer is on. Hover changes emphasis only — every word is
   * in the document at every moment, nothing is revealed and nothing is
   * hidden — so there is no keyboard equivalent to provide and no control to
   * put in the tab order for it.
   */
  const [lit, setLit] = useState<number | null>(null);

  const { full, typical } = WEB_WHY_SPANS;

  return (
    <div
      ref={wrap}
      data-drawn={drawn ? "true" : "false"}
      className="web-why mt-8 sm:mt-14 md:mt-16"
      onPointerLeave={() => setLit(null)}
    >
      {/* The span label lives **above** the drawing rather than inside it, at
          every width. That is what keeps the band free of type — a line of
          text inside a box whose height is a `clamp()` is the one thing that
          cannot be positioned in percentages — and it is why the narrow
          layout needs no second copy of this string. */}
      <p className="web-why-span caps">
        <span aria-hidden className="web-why-span-rule" />
        <span className="text-accent">{full.label}</span>
      </p>

      {/* The band. Below `md` it is not rendered at all and the route is drawn
          by the list's own vertical rail instead — a five-column path at 390px
          would be five illegible columns, the same judgement §04 makes about
          its architecture. Decoration throughout: every word it annotates is
          in the list below, so the whole band is hidden from assistive tech. */}
      <div aria-hidden className="web-why-band">
        {/* The span. One rule with two ticks closing it downward. */}
        <span
          className="web-why-span-mark"
          style={{
            left: `${NODE_X[full.from]}%`,
            width: `${NODE_X[full.to] - NODE_X[full.from]}%`,
            top: `${SPAN_Y}%`,
            height: `${SPAN_TICK}%`,
          }}
        />

        {/* The measured field: one tick per stage, down to the row rule. They
            are all different lengths, because the stages are not at one
            altitude — that is the drawing telling the truth about its own
            geometry rather than tidying it away. */}
        {NODE_X.map((x, i) => (
          <span
            key={`tick-${WEB_WHY_STAGES[i].id}`}
            className="web-why-tick"
            data-lit={lit === i ? "true" : undefined}
            style={{ left: `${x}%`, top: `${NODE_Y[i]}%` }}
          />
        ))}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          className="web-why-lines"
        >
          {/* The route. Four segments, so a hovered stage can brighten the two
              either side of it without lighting the whole path. */}
          {NODE_X.slice(0, -1).map((x, i) => (
            <path
              key={`seg-${WEB_WHY_STAGES[i].id}`}
              className="web-why-route"
              pathLength={1}
              data-lit={lit === i || lit === i + 1 ? "true" : undefined}
              d={line(x, NODE_Y[i], NODE_X[i + 1], NODE_Y[i + 1])}
            />
          ))}

          {/* And it keeps going. */}
          <path
            className="web-why-route web-why-route--tail"
            pathLength={1}
            d={line(NODE_X[4], NODE_Y[4], TAIL_X, TAIL_Y)}
          />
        </svg>

        {/* Square marks, in HTML rather than the SVG: a `<rect>` in a field
            stretched this far would be a very flat rectangle, and a
            registration mark has to stay square at every width. */}
        {NODE_X.map((x, i) => (
          <span
            key={WEB_WHY_STAGES[i].id}
            className="web-why-node"
            data-lit={lit === i ? "true" : undefined}
            style={{ left: `${x}%`, top: `${NODE_Y[i]}%` }}
          />
        ))}
      </div>

      <ul className="web-why-stages">
        {WEB_WHY_STAGES.map((stage, i) => (
          /* The list item is the animated element rather than a wrapper inside
             it: an animated wrapper carries a transform, a transform is a
             containing block, and the rail mark and the bracket below both
             position against the item itself. */
          <motion.li
            key={stage.id}
            className="web-why-stage"
            data-lit={lit === i ? "true" : undefined}
            onPointerEnter={() => setLit(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: EASE }}
          >
            {/* The narrow layout's node. The band above carries the wide
                layout's — two marks, one of which is always `display: none`,
                because they are decoration and the alternative is one node
                that has to be in two places in one document. */}
            <span aria-hidden className="web-why-node web-why-node--rail" />

            <h3 className="web-why-stage-name">{stage.name}</h3>

            <ul className="web-why-terms">
              {stage.terms.map((term) => (
                <li key={term} className="caps">
                  {term}
                </li>
              ))}
            </ul>

            {i === typical.from ? (
              /* The bracket, and the section's whole argument. One element,
                 repositioned entirely in CSS: a horizontal span hanging under
                 two columns on the wide layout, a vertical one beside two rows
                 on the narrow. The `sr-only` prefix is what makes the phrase
                 mean the same thing to a screen reader as the drawing does to
                 an eye — on its own, inside `Experience`, it would not. */
              <p className="web-why-typical">
                <span aria-hidden className="web-why-typical-mark" />
                {/* `caps` sits on the same element as `web-why-typical-label`,
                    not on a span inside it. Nested, its own `font-size` and
                    `letter-spacing` win on the child whatever the specificity
                    outside says, and the narrow layout's fit — which is
                    measured to the pixel against `Experience` — was silently
                    not applying at all. */}
                <span className="caps web-why-typical-label">
                  <span className="sr-only">
                    {WEB_WHY_STAGES[typical.from].name} and{" "}
                    {WEB_WHY_STAGES[typical.to].name} together are{" "}
                  </span>
                  {typical.label}
                </span>
              </p>
            ) : null}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ── The closing strip ──────────────────────────────────────────── */

function Closing({ slug }: { slug: string }) {
  /**
   * Derived, never written down twice. `PUBLIC_SERVICE_PAGES` is `built &&
   * public`, so this rail cannot name a route that does not exist or a service
   * that is off discovery — and it needs no edit when either changes.
   */
  const others = PUBLIC_SERVICE_PAGES.filter((p) => p.slug !== slug).map((p) =>
    resolveServicePage(p.slug),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
      className="mt-8 border-t border-line pt-6 sm:mt-14 sm:pt-9 md:mt-14 lg:grid lg:grid-cols-12 lg:gap-x-8"
    >
      <div className="lg:col-span-5">
        <p className="caps text-ink-muted">{WEB_WHY_PRACTICE.label}</p>
        {/* The five practices behind the route. Deliberately not the five
            stages restated — these are what Mishram sells, and they are the
            reason the span above is as wide as it is. */}
        {/* The divider trails its term rather than leading the next one: this
            row wraps at 390px, and a leading divider opens the second line on
            a stray hairline. Same correction §04's state terms carry. */}
        <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-5">
          {WEB_WHY_PRACTICE.terms.map((term, i) => (
            <li key={term} className="flex items-center gap-3">
              <span className="font-display text-[0.8125rem] leading-none font-medium tracking-[-0.02em] text-ink/75 sm:text-[0.9375rem]">
                {term}
              </span>
              {i < WEB_WHY_PRACTICE.terms.length - 1 ? (
                <span aria-hidden className="block h-2.5 w-px bg-line-strong" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {others.length ? (
        <div className="mt-6 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <p className="caps text-ink-muted">{WEB_WHY_EXPLORE_LABEL}</p>
          {/* Real anchors, real titles, and the site's own quiet row grammar
              rather than three CTA cards — this is a cross-reference, not a
              second call to action on a page that already has one. */}
          <ul className="mt-2 sm:mt-3">
            {others.map((service) => (
              <li key={service.slug}>
                <PageLink
                  href={servicePagePath(service.slug)}
                  className="web-why-link group"
                >
                  <span aria-hidden className="caps web-why-link-index">
                    {service.index}
                  </span>
                  <span className="relative">
                    {service.title}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100"
                    />
                  </span>
                  <span aria-hidden className="web-why-link-mark">
                    &#8599;
                  </span>
                </PageLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.div>
  );
}

/* ── The section ────────────────────────────────────────────────── */

export function WhyMishram({ id, slug }: { id: string; slug: string }) {
  return (
    <ServiceSection id={id} labelledBy={`${id}-title`} grid="edges">
      <WhyEntry />

      {/* The asymmetric head: the claim on the left, the argument on the
          right, and the drawing underneath both. The two are one row from
          `lg` rather than a headline with 200px of copy stacked beneath it —
          which is also the single largest saving on a page this long. */}
      <div className="mt-8 md:mt-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8">
        <div className="lg:col-span-6">
          <ServiceSectionHead
            id={`${id}-title`}
            copy={WEB_WHY_COPY}
            /* The six columns this sits in are narrower than the shared
               `34rem`, so the cap is raised and the column does the real
               constraining — `Growth. Under one roof.` is 23 characters and
               fits from 1024 up. Widened here rather than in
               `ServiceSectionHead`, which the other four service pages are
               art-directed against; the same call §04 made for its headline. */
            className="[&_h2]:max-w-[min(92vw,42rem)]"
          />
        </div>

        <div className="mt-8 max-w-[58ch] sm:mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pb-1">
          {WEB_WHY_INTRO.map((paragraph, i) => (
            <motion.p
              key={paragraph.slice(0, 28)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE }}
              className="mt-5 text-[0.9375rem] leading-[1.7] text-ink/70 first:mt-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>

      <Journey />
      <Closing slug={slug} />
    </ServiceSection>
  );
}
