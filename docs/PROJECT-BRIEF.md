# Mishram Media — Project Brief

> **IMPORTANT: This document is the source of truth for continuing Mishram Media in a fresh AI coding session. Read it before modifying the project. Existing approved sections should be extended, not redesigned.**

Describes the project **as currently implemented**, not the original plan.

---

## 1. Business positioning

Mishram Media is a creative growth and digital agency working with businesses, brands and
established Indian content creators.

Capabilities: social media management, personal brand building, creator growth, influencer
marketing, influencer network, performance marketing, Meta ads, website design & development,
digital growth strategy, brand shoots, content production.

Positioning is **creative agency + growth partner + digital studio + creator network + technology
capability** — never "small generic social-media agency". The site is itself the proof of the
web-development capability, so its craft is part of the pitch.

Tone: confident, restrained, intelligent, specific. No "next level", "one-stop solution", "unlock
your potential", "10X". No unverified metrics, rankings or testimonials anywhere.

---

## 2. Approved homepage structure

```
Header (fixed)
  ↓
Hero — Growth Orbit                     [APPROVED / LOCKED]
  ↓
01 / Selected Collaborations            [18 brands, featured-first — §10s]
  ↓
Current Management — Xbhandesiri        [interlude, unnumbered; §10t.
                                         Akash Sagar, published Revision 17.
                                         MEDIA CORRECTED IN 17B — the Revision
                                         17 photographs were not him and are
                                         gone; the chapter is now typographic
                                         with the official 72px avatar. §10u]
  ↓
02 / What We Do                         [Services 01-04 public, 05 hidden but built
                                         + closing statement — LOCKED. §10s]
  ↓
The Mishram Difference                  [interlude, unnumbered; built — see §10a]
  ↓
03 / Creators                           [two layers: the image-backed stage
                                         (now 6, with Ali Fazal opening it),
                                         + scale facts and the worked-with
                                         index, which now carries verified
                                         profile links. §10b-scale, §10t, §10u]
  ↓
04 / Work Process                       [built; awaiting review]
  ↓
05 / Selected Work                      [foundation built; awaiting review]
  ↓
Client Notes                            [interlude, unnumbered; built —
                                         CONTENT-BLOCKED, renders nothing. §10d-notes]
  ↓
06 / Recognition                        [ACTIVE — one verified award. §10e, §10p]
  ↓
07 / About                              [a PREVIEW of /about — 0.80 viewports.
                                         §10f, §10s]
  ↓
Project Inquiry                         [interlude, unnumbered; built — §10h.
                                         The page's final conversion moment]
  ↓
Footer — THE FINAL SIGNAL               [rebuilt — full-bleed closing canvas,
                                         no grid, oversized wordmark. §10g]

Contact panel — global overlay          [APPROVED / LOCKED]
```

`src/app/page.tsx` is exactly this and nothing else — **no dev spacer any more**. The Footer is
rendered from `app/layout.tsx`, after `</main>`, because it is the page's footer rather than a
footer belonging to About.

**The homepage shell is complete.** What remains is content (reels, creator handles, the creator
roster expansion) and routes that do not exist yet: case studies and work detail pages.

**All five service routes are built and four are public** — Services 01, 02, 03 and 04 each carry
`Explore service ↗` in `02 / What We Do`. Service 04 published in Revision 21 (§10y); Service 05's
route is built but **hidden from public discovery** (§10s), so it alone renders no action. Both the
link and every menu, footer row and prev/next entry derive from `PUBLIC_SERVICE_PAGES`
(`built && public`), so a dead link is not possible and neither is an accidental one.

---

## 3. Design system

Semantic tokens only. Components never reference raw palette values. Tokens live on `<html>` as
`--t-*` and are exposed to Tailwind as `--color-*` in `@theme` (`src/app/globals.css`).

| Semantic token | Dark (default) | Light |
| --- | --- | --- |
| `canvas` | `#0a0a0a` | `#f3f0e8` |
| `canvas-raise` | `#121212` | `#fbf9f3` |
| `--t-canvas-rgb` | `10 10 10` | `243 240 232` |
| `ink` | `#f3efe7` | `#11110f` |
| `ink-soft` | `#9a938a` | `#65625b` |
| `ink-muted` | `#6b655d` | `#7c7871` |
| `line` | `rgba(243,239,231,0.10)` | `rgba(17,17,15,0.12)` |
| `line-strong` | `rgba(243,239,231,0.22)` | `rgba(17,17,15,0.24)` |
| `grid` | `rgba(243,239,231,0.055)` | `rgba(17,17,15,0.055)` |
| `accent` | `#35d6c0` | `#0b8f80` |
| `accent-soft` | `rgba(53,214,192,0.16)` | `rgba(11,143,128,0.14)` |
| `surface` | `rgba(243,239,231,0.035)` | `rgba(17,17,15,0.035)` |
| `surface-hover` | `rgba(243,239,231,0.07)` | `rgba(17,17,15,0.06)` |
| `image-line` | `rgba(243,239,231,0.22)` | `rgba(17,17,15,0.16)` |
| `overlay` | `rgba(10,10,10,0.70)` | `rgba(243,240,232,0.74)` |
| `--t-image-shadow` | `none` | `0 20px 60px rgba(17,17,15,0.09)` |
| `--collab-logo-rest` | `0.5` | `0.62` |
| `--grain-opacity` / `--grain-blend` | `0.035` / `overlay` | `0.022` / `multiply` |

Non-themed: `--color-ember: #ff7048` (tangerine micro-accent, currently unused — keep it rare).

Layout: `--gutter: clamp(20px, 4.4vw, 76px)`, `--header-h: 66px` (78px ≥1024px).
Easing: `--ease-out-expo: cubic-bezier(0.16,1,0.3,1)`, `--ease-out-quint: cubic-bezier(0.22,1,0.36,1)`.

**Rules.** Teal carries interaction only — never a teal-and-orange theme. Use borders and hairlines
rather than floating containers. Rounded corners stay small (2–3px on surfaces); no blanket 24px
radius. A 12-column `bg-grid` hairline grid runs continuously through Hero → Collaborations →
What We Do (hidden below `lg`).

### Theme system

- Boot script in `<head>` (`themeBootScript`, `ThemeProvider.tsx`) sets `data-theme` before first
  paint — no flash. Stored choice wins, else `prefers-color-scheme`.
- Persisted in `localStorage` under `mishram-theme`.
- `ThemeProvider` reads the attribute via `useSyncExternalStore`; the toggle dispatches a
  `mishram:themechange` event.
- Swapping adds `.theme-transition` to `<html>` for 520ms, which enables a 440ms colour/border/
  shadow cross-fade on `*` — deliberately excludes `transform` and `opacity` so Motion animations
  are untouched.
- Toggle is an optical half-disc SVG (no emoji), rotated by `[data-theme="light"] .theme-disc` in
  CSS so it is correct on the first frame. Sits immediately before `Contact Us` in the header.

---

## 4. Typography

Loaded via `next/font/google` in `src/app/layout.tsx`.

| Role | Family | CSS var | Usage |
| --- | --- | --- | --- |
| Display | **Archivo** | `--font-display` | Headlines, service titles, indices |
| Body / UI | **Instrument Sans** | `--font-sans` | Everything else |
| Accent | **Instrument Serif** (400, incl. italic) | `--font-accent` | One italic word per headline |

Headline treatment: tight tracking (`-0.032em` to `-0.038em`), line-height `0.94`–`1.03`, weight 500.
The `.caps` utility (tracked-out uppercase, 10–11px, `0.26em`) carries eyebrows, indices and
annotations.

**Mask-reveal gotcha:** a line translated outside its `overflow-hidden` parent never intersects the
viewport, so `whileInView` on the line itself will never fire. Put the trigger on the heading and
propagate variants (see `WhatWeDo.tsx` Intro). Clip spans use `-mb-[0.1em]` with `pb-[0.12em]` on the
inner span so tall lines aren't sheared.

---

## 5. Growth Orbit Hero — LOCKED

Concept: media surfaces drifting on slow ellipses around an invisible axis right of centre —
creators, content, technology and growth shown rather than named.

**Files:** `Hero.tsx`, `hero/HeroScene.tsx`, `hero/Scene.tsx`, `hero/MediaCard3D.tsx`,
`hero/layout.ts`, `hero/textures.ts`, `hero/HeroStatic.tsx`, `config/hero.ts`.

### Locked decisions

- Copy: eyebrow `CREATIVE × PERFORMANCE × TECHNOLOGY`; headline **"We turn attention / into
  growth."** with `growth.` in Instrument Serif italic under a teal rule; lead "We build creators,
  brands and digital experiences designed to scale."; CTAs `Book a 15-Min Call` +
  `Contact Us`; note `15 MIN · NO OBLIGATION`; cue `SCROLL TO EXPLORE`; foot capabilities
  `Social · Influencer · Performance · Brand Shoots · Web`.
- Seven surfaces: 5 creator photographs + a procedural website-wireframe + an unlabelled ascending
  performance curve (no numbers, ever).
- Camera: desktop `z 6.1 / fov 38`; stacked `z 5.4 / fov 44`. Positions in `layout.ts` were composed
  in projected screen space and divided back through `camera.z / (camera.z − surface.z)` — **do not
  "simplify" them.**
- Resting exposure tiers (rebalanced and approved): primary `zoya 1.0`; secondary `lovkesh 0.80`,
  `mukul 0.74`, `vishnu 0.62`; tertiary `interface 0.45`, `growth 0.40`, `nikita 0.26`.
  Stacked overrides: `mukul 0.82`, `vishnu 0.78`, `interface 0.48`.
- Custom unlit `ShaderMaterial` per card (no lights). Dark: `col *= exposure`. Light:
  `mix(canvas, col, mix(0.18, 1.0, exposure))` — depth recedes into paper, not into black — plus an
  SDF contact shadow scaled by `uBase`, and a border floor `mix(0.14, 0.30, uBase)`.
- Plane geometry is `INSET = 0.88` larger than the visible card so the light-mode shadow has room.
- Two faint orbit rings (torus), graphite in light, ivory in dark.
- Three DOM annotations (`Creator Growth`, `Performance`) projected each frame from world space via
  a `placeAnnotation` callback — crisp text, never DOM inside the canvas.
- Entry: staggered bottom-up wipe from depth. Scroll: the group recedes in Z and fades, handing off
  to the section below.
- **R3F clones the `uniforms` prop** — always animate `material.current.uniforms`, never the
  memoised object. This has bitten us once.

### Fallbacks & performance

- Scene is `next/dynamic({ ssr: false })`; three.js never reaches the server bundle.
- WebGL probed once via `useSyncExternalStore` (server snapshot `null` so fallback images aren't
  requested by clients that will run the canvas). Failure inside the canvas → `SceneBoundary` →
  `HeroStatic` (same composition as layered `next/image` frames, same exposure tiers).
- Render loop pauses when the hero leaves the viewport or the tab is hidden.
- ~9 draw calls, ~2k triangles, 7 textures, DPR capped `[1, 1.75]` (1.5 stacked). No post-processing.

---

## 6. Cursor & interactions — LOCKED

There is **one** cursor system. Do not add another or install a cursor package.

- **Hero pointer caption** (`HeroScene.tsx`): hovering a media surface shows a fixed, pointer-
  following caption — creator name + `CREATOR NETWORK` — with a teal left border. Hovered surface
  lifts in Z, restores saturation, takes a teal hairline; neighbours dim via `uDim`.
- **Magnetic CTAs** (`ui/Magnetic.tsx`, `ui/CtaButton.tsx`): shell drifts toward the pointer, inner
  layer follows at a lower rate. Primary CTA also does a directional fill from the entry edge, a
  masked label swap, and a two-arrow relay. Mouse pointers only.
- **Collaboration logos**: mono → genuine brand colour cross-fade, `translateY(-3px) scale(1.05)`.
- **Service surfaces** (What We Do): hairline goes teal, photo returns to full saturation.

All hover rules are gated behind `@media (hover: hover) and (pointer: fine)` so touch never leaves a
sticky state.

---

## 7. Contact panel — LOCKED

> **CONTACT DATA SUPERSEDED BY §10s (Revision 16).** The panel's design, its four rows and its
> accessibility behaviour are all current and unchanged. **The details in the table below are
> not** — the client replaced the public contact set. Email is now `info@mishram.media`, the
> published phone is `+91 95482 78558`, Instagram is `@filmybande`, and LinkedIn is live.
> **The WhatsApp split is closed as of §10t (Revision 17)** — the client confirmed the new line is
> also the WhatsApp number, so the panel, the footer, the inquiry fallback and every booking CTA
> all resolve to `+91 95482 78558`. The previous number is gone from production.

`contact/ContactProvider.tsx` (context: `open`, `openContact`, `closeContact`) +
`contact/ContactPanel.tsx`. Any new section opens it with `useContact().openContact()` — never build
new modal logic.

Desktop: full-height sheet flush to the right edge (26–28rem). Mobile: bottom sheet, `max-h-[88svh]`,
rounded top only. Four hairline-separated rows with index numbers, icon, travelling arrow and a teal
left-edge marker:

| # | Channel | Target |
| --- | --- | --- |
| 01 | WhatsApp | `https://wa.me/916399399333?text=…` |
| 02 | Email | `mailto:mediamishram@gmail.com` |
| 03 | Call | `tel:+916399399333` |
| 04 | Book a Call | `BOOKING_URL`, else WhatsApp consultation message |

All contact data is real and lives in `src/config/site.ts` — **never invent numbers, addresses or
booking links.** Address: Rameshwarpur, Lalpur, US Nagar, Uttarakhand, India. Instagram:
`instagram.com/mishram.media`.

`NEXT_PUBLIC_BOOKING_URL` is unset, so every booking CTA falls back to WhatsApp with a free
15-minute consultation message. Setting the env var switches all of them. No placeholder scheduling
URL is committed.

Accessibility via `hooks/useDialogBehaviour.ts`: scroll lock without layout shift, Escape, Tab focus
trap, focus restoration, `role="dialog" aria-modal`.

---

## 8. Selected Collaborations — LOCKED

> **THE BRAND LIST AND THE RAIL'S TIMING ARE SUPERSEDED BY §10s (Revision 16).** The composition,
> the marquee, the two-layer logo treatment and the hover colour are all current and unchanged.
> **The five-brand table below is not** — the roster is now **eighteen rendered brands** with a
> `priority` flag, and copies-per-track and animation duration are derived from the roster rather
> than fixed, so the rail keeps its approved speed at any length. Reduced motion now shows the
> **featured** set rather than every mark. The section's lead is now
> *"Selected brands we've worked with."*

`src/components/Collaborations.tsx`, `src/config/collaborations.ts`.

One continuous CSS-transform marquee: two identical tracks side by side, the pair translated
`-50%` over 46s linear — no seam, no carousel library. Edges dissolve via `mask-image`. Hover pauses
the rail and lets neighbours drop to 45%. Section is ~290px tall on desktop.

Each logo is two layers on identical bounds: an **alpha mask** tinted with `currentColor` (muted
silver on obsidian, graphite on parchment) and the **genuine brand artwork** cross-faded in on hover.
Both are generated from one source in one pass so they overlay exactly; antialiased edges are
un-blended from white.

### Approved brands (all five verified from the previous Mishram site's client rail)

| Brand | Category | Note |
| --- | --- | --- |
| Mamaearth | `beauty-d2c` | |
| Groww | `fintech` | |
| Muuchstac | `grooming-d2c` | `darkKeepsMono` — artwork is black, so the ivory mask stays in dark mode; `scale: 1.8` for the stacked lockup |
| CashKaro | `shopping` | |
| Upstox | `fintech` | |

Do not add or remove brands without explicit approval. Quality over quantity — 4–6 verified names
beats a longer list.

Reduced motion collapses the rail to a single static centred set of exactly five logos (the clone
track and all repeats are removed from layout).

---

## 9. PERMANENT BRAND-SAFETY RULE

**Betting, gambling, casino, real-money gaming and fantasy-betting companies are never rendered
anywhere on this website.**

Applies to every public surface — logo rails, portfolio, case studies, testimonials, awards context,
creator work, hero content, future Work and service pages — and to *all rendered markup*, including
marquee duplication, hidden/duplicated rows, loading and placeholder states, reduced-motion
fallbacks and mobile variants.

The previous Mishram site listed many such clients (plus several offshore CFD/binary-options
brands, which are also excluded as gambling-adjacent). They are **absent from
`collaborations.ts` entirely** rather than filtered at render time, so they cannot reach the DOM by
accident. Do not reintroduce them from old data. Do not substitute fabricated companies — a shorter
list is correct.

**THE RULE HAS NOW BEEN APPLIED TO A GENUINE, CLIENT-CONFIRMED RELATIONSHIP, and it held.**
Revision 16's brand list included **Fun N Earn**, and the product turned out to be a real-money
cash-contest app — money added to an in-app wallet to enter paid contests, winnings withdrawn
after KYC, a commission taken on winnings. **It is not published anywhere on this site.** §9 does
not turn on whether the relationship is real; it turns on the category, and no exception was made.
The record lives in `WITHHELD` in `config/collaborations.ts`, development-only and deliberately
outside `COLLABORATIONS` so it cannot reach the DOM by any render path. **Check the category
before publishing a brand, not after** — see §10s §2.

---

## 10. 02 / What We Do — COMPLETE & LOCKED (Services 01–05 + closing)

> **SERVICE 05 IS HIDDEN FROM PUBLIC DISCOVERY — §10s (Revision 16). The scene is untouched.**
> Everything below is current, including Service 05's scene, its continuity with Service 04 and
> its five measured entry values. What changed is one boolean: `public: false` in
> `config/services.ts`. The chapter now runs **four** services, the pinned track is one
> `SERVICE_SCROLL_VH` slot shorter (7,449 → 6,279px), and the progress indicator reads
> `01 … 04`. **Canonical numbering is unchanged** — Brand Shoots is still 05 and Web & Digital
> Experiences is still 04. Flipping the flag back restores the chapter exactly.

`src/components/whatwedo/` — `WhatWeDo.tsx`, `ServiceCopy.tsx`, `ServiceProgress.tsx`,
`ServiceStage.tsx`, `useServiceSlot.ts`, `scenes/parts.tsx` (shared Surface / Photo / Annotation),
`scenes/SocialGrowthScene.tsx`, `scenes/InfluencerMarketingScene.tsx`,
`scenes/PerformanceMarketingScene.tsx`, `scenes/WebDigitalScene.tsx`,
`scenes/BrandShootsScene.tsx`, `WhatWeDoClosing.tsx`; data in `src/config/services.ts`.

### Copy

Section: `02 / WHAT WE DO`, headline **"Built to turn attention / into business."** (`business.` in
serif italic), lead "Strategy, content, creators, performance and digital experiences — connected
under one growth system."

### Scroll architecture

**Native scrolling only. No wheel interception, no snapping, no smooth-scroll library, no scroll
position manipulation.** Scroll position drives transforms and nothing else.

- Intro renders in normal flow.
- A track sized `calc(100svh + count × SERVICE_SCROLL_VH vh)` (`SERVICE_SCROLL_VH = 130`) contains
  one `position: sticky; top: 0; h-[100svh]` panel.
- `useScroll({ target: track, offset: ["start start", "end end"] })` → 0…1 across the pinned span.
- Per-service local progress comes from `useServiceSlot`, which also returns `presence` and a
  tighter `copyPresence`. Slot i owns track positions [i, i+1) but starts entering at
  `i − SLOT_LEAD` (0.16), so one scene transforms into the next instead of cross-fading; a finished
  scene clears over `SLOT_TAIL` (0.08). Copy swaps cleanly at the boundary — two sets of readable
  copy must never share the column.
- Every built service stacks its copy and its stage on the shared columns; only the active slot gets
  `pointer-events: auto`.
- No React state updates while scrolling — scenes read MotionValues through `useTransform`.
- The pinned path runs only where it fits — `DESKTOP_SEQUENCE_QUERY` in `hooks/useMediaQuery.ts`:
  `(min-width: 1280px) and (min-height: 680px) and (min-aspect-ratio: 5 / 4)`. Anything else gets
  `StackedSequence`: same components, MotionValue animated to `0.74` (settled) once in view.
- The section carries `data-sequence="pinned" | "stacked"`, and the scene annotations plus Service
  05's sheet rail are gated on that attribute in CSS (`.svc-anno`, `.svc-sheet-rail`) rather than on
  a raw width — so the CSS and the sequence in use can never disagree.

### Phases within a service's local progress

`0–0.30` entry from depth · `0.30–0.75` settled · `0.78–1.0` exit prep (titles clip upward,
surfaces recede in Z to 45%). Each exit state is the deliberate handoff into the next service.

### Shared scene grammar — `scenes/parts.tsx`

`Surface` (depth travel + pointer parallax + idle drift), `Photo`, `Annotation`. `SurfaceSpec`
supports `travelX` / `travelY` (enter from an offset — used to carry an object across a service
boundary, and to spread stacked variants apart), `enterScale` (start at the previous service's
object size, so a surface reads as that object growing) and `exit: "advance"` (hold a surface
forward and dominant instead of receding, so it can bridge into the next service).

`aspectFrom` animates the aspect ratio across the entry window (`aspect-ratio` takes a
bare number, so a MotionValue drives it directly) — use it when a surface continues a
differently cropped object, so the crop *resolves* instead of the frame cutting. `Photo`
takes an optional `sizes` when a frame is materially larger than the 24vw default.

**Gotcha:** never combine `vectorEffect="non-scaling-stroke"` with an animated `pathLength` — dashes
get measured in screen px while `pathLength` normalises user units, and long paths shatter into
fragments. Service 03's drawn paths omit `vectorEffect`.

### The composition box — `.svc-stage-box`

Every scene positions its surfaces as a percentage of its parent, and surface *heights* come from a
width percentage plus an aspect ratio. That only composes predictably if the parent's aspect is
itself predictable — and the raw stage is not. `.svc-stage` is an `absolute inset-0` child, so it
ignores the column's `py-6` and takes the full padding box: 865×758 (1.14) at 1440×900, 865×626
(1.38) at 1440×768, 612×626 (0.98) at 1024×768, and a shallow full-width band on the stacked path.
Scenes authored against one of those shapes spilled out of the others — Services 01, 02 and 05 by
~130px, ~90px and ~84px at 1023px.

So `.svc-stage` is now only a **measuring container** (`container-type: size`) and the scenes live in
`.svc-stage-box`: the largest box of a fixed aspect that fits inside it, centred.

```css
--svc-box-w: min(100cqw, calc(100cqh * var(--svc-stage-ar)));   /* --svc-stage-ar: 1.141 */
width:  var(--svc-box-w);
height: calc(var(--svc-box-w) / var(--svc-stage-ar));
```

Container query units read the stage's own size, so this is pure CSS with no measurement in JS.
`--svc-stage-ar` **is the aspect of the approved 1440×900 desktop stage**, so at that viewport the
box *is* the stage and nothing moves. Everywhere else the same composition is letterboxed and scaled
rather than distorted. Measured, the box is 1.141 at every one of 1440×900 / 1440×768 / 1366×768 /
1280×800 / 1152×800 / 1024×768 / 820×1180 / 768×1024 / 430×932 / 390×844 / 375×812.

Consequences worth knowing:

- **Scene percentages are now viewport-invariant.** A collision or a spill checked at one size is
  checked at all of them. Anything under ~6px of overhang is the bounding box of a tilted surface,
  not layout.
- `--svc-u` on the box is **one reference pixel** — `calc(var(--svc-box-w) / 865)`, exactly 1px at
  the reference stage and proportional elsewhere. Scene chrome that must scale with the composition
  uses it instead of a raw px value; `perspective` is its first consumer, so depth foreshortening
  reads the same at every size. Fake-interface px chrome deliberately does *not* use it — leaving it
  at absolute size is what stops nested UI going microscopic on a phone.
- Labels sized in absolute px inside a scaling box will run out of room. `.svc-name` therefore wraps
  instead of truncating — an ellipsis ate real creator names on tablet ("NIKITA KUMA…"). Desktop is
  unchanged; every name still fits one line there.

### Service 01 — Social & Personal Brand Growth

Title "Social & Personal / Brand Growth"; description "We shape digital identities people recognise,
remember and follow."; capabilities `Social Management / Content Strategy / Personal Branding /
Creator Growth` in a 2×2 hairline grid; CTA `Discuss this project ↗` → existing contact panel.

Scene: an editorial content ecosystem, not a mock profile. Nikita Kumawat portrait anchors it,
Mukul Sharma (9:16) and Vishnu Priya (4:5) sit around it as format frames, a procedural planning
surface sits furthest back, and one teal SVG trace draws through all four. Annotations `STRATEGY`,
`PERSONAL BRAND`, `CONTENT`, `GROWTH` reveal in sequence (pinned sequence only — the stacked
chapters have no margin to put them in). No fake
social UI, no invented statistics.

Depth is CSS `perspective: 1500px` with `translateZ` −260→0 scaled per surface, plus scale and
opacity. Idle: four out-of-phase 13–19s drifts at 2–3px on an **inner** wrapper, so CSS animation
never fights the Motion transform on the element above it. Pointer parallax up to 16px with slight
`rotateY`/`rotateX`, spring-damped.

### Progress indicator

`01 ───────────● 05`. The accent line fills across the built-services span. All five are now
built, so it spans the full width and every slot is an accent dot. **Nothing is clickable, and it
stays that way.** When this was written no service page existed and dead navigation would have
implied otherwise; three now do, and the reason has simply changed rather than gone away — three of
five dots would navigate and two would not, which is worse than none doing. The route into a
service page is `Explore service ↗` in the copy column, which only appears where there is somewhere
to go (§10j).

### Service 02 — Influencer Marketing

Title "Influencer / Marketing"; description "We connect the right creators, brands and ideas to build
campaigns people actually notice."; capabilities `Creator Network / Campaign Strategy /
Collaborations / Distribution`.

A living editorial creator network, not a node diagram. Four real creators (Nikita Kumawat, Zoya
Jaan, Lovkesh Kataria, Mukul Sharma) at different depths around one abstract campaign board, with
three partial arcs implying convergence — never every creator wired to every other. Nikita carries
over from Service 01 as the continuity anchor (personal brand → creator network). Creator names are
real, from config; no reach or follower figures.

### Service 03 — Performance Marketing

Title "Performance / Marketing"; description "Creative thinking backed by paid acquisition and
conversion-focused execution."; capabilities `Meta Ads / Paid Acquisition / Creative Testing /
Conversion`.

Campaign creative (with A/B variants behind it) → paid distribution → landing experience →
conversion, plus one abstract optimisation curve. The campaign board carries across from Service 02
using `travelX`. A short dash marches the paid path (`.svc-flow`) to read as traffic.

**Deliberately not a dashboard:** no ad-manager chrome, no ROAS/CTR/CPA/revenue, no axes, no numbers
of any kind — any figure would be fabricated. The whole scene is Mishram's own abstract language, so
no client campaign is implied and no excluded category can appear.

The **landing experience** uses `exit: "advance"` — on exit it scales to 1.065 at full opacity while
everything else recedes to 0.48. It is intentionally a general conversion-interface surface rather
than a client site, because Service 04 expands this same object into a full digital experience.

### Service 04 — Web & Digital Experiences

Title "Web & Digital / Experiences"; description **"Websites, digital experiences and custom
business systems designed to look exceptional, work intelligently and turn interest into action.";**
capabilities **`Web Design / Web Development / Custom Software / CRM Systems`**.

**The homepage now states the software capability explicitly.** Mishram builds custom software, CRM
systems and internal business tools, not only marketing websites, and the old capability rail
(`Development / Landing Pages / Conversion`) read as a web-agency list. Two decisions behind the
current one:

- **The category stays "Web & Digital Experiences."** Renaming it "Software Development" would be a
  *narrower* promise than the work actually covers, and would break the Service 03 → 04 → 05
  continuity, which runs conversion surface → full digital experience → photography.
- **Landing pages and conversion experiences moved off the rail**, not out of the offering. Four
  slots are all the copy column holds at 1280 (see §11), and the two that make the technical half
  legible earn them. They return on the service page below.

The longest new label is 15 characters against `Creative Production`'s 19, so the measured
`auto-fit` rail in §11 is unaffected — two columns at 1440, 1280 and every phone down to 375px.

**Future `/services/web-digital-experiences` page — required scope.** Recorded here so the homepage
edit is not mistaken for the full offering. That page must cover: Web Design · Web Development ·
Landing Pages · Conversion Experiences · Custom Software · CRM Systems · Internal Business Tools ·
appropriate business automations and integrations. **Not built — do not build it as part of a
homepage task.**

Service 03's landing surface grows into a complete digital experience. A desktop interface anchors
the centre (masthead, editorial column, teal CTA, media region, supporting row — deliberately **no
browser chrome**), a genuinely re-laid-out mobile view overlaps it lower-right, and two small
fragments (`GRID` / `TYPE`, and `DESIGN → BUILD → SHIP`) say Mishram designs systems rather than
isolated screens.

The desktop surface enters at the landing surface's exact size and position — `enterScale: 0.63`
with `travelX: 255, travelY: 22` — so it reads as one object gaining capability. Interaction is
simulated only: the inner column settles a few pixels and the CTA resolves late. **No iframe, no
embedded site, no fake client name, no invented brand, no fabricated results.**

**The scene itself is unchanged apart from one tertiary annotation.** `Interaction` → `Custom Build`,
sitting under the Design → Build → Ship fragment — it names what that fragment actually shows and
carries the software half of the service into the composition. The scene is **not** a software
dashboard and must not become one: no admin chrome, no tables, no CRM UI.

The **media region inside the desktop interface** is the Service 05 continuity object. On exit the
interface chrome drops to ~10%, the mobile surface recedes and that image scales to 1.62 with its
radius resolving to 0 — the last impression is photography taking over the screen, which is exactly
where Brand Shoots should begin.

### Service 05 — Brand Shoots & Content

Title "Brand Shoots / & Content"; description "Visual content built to make brands look sharper,
stronger and more memorable."; capabilities `Brand Shoots / Reels / Campaign Content /
Creative Production`. The last service.

One composed photographic system — a contact sheet laid across the page. **Not** a gallery, a
masonry grid, a portfolio card grid or any kind of camera/DSLR interface. A large 4:5 primary frame
sits right of centre, a 9:16 reel frame overlaps its left edge, a 4:5 portrait sits back and further
left, and a 16:9 landscape detail tucks under the primary. A hairline sheet baseline runs beneath
with five frame indices and one slow teal playhead; four annotations sit in the margins.

**Continuity — the whole point of this scene.** Service 04's media region is measured, not guessed.
At the end of Service 04's exit it is **44.3% of the stage wide, 42.7% tall, centred at
(60.0%, 29.7%), cropped at 1.183**. Service 05's primary frame settles at a centre of (59%, 33%) —
deliberately almost the same place — and enters with `enterScale: 1.1`, `travelX: 11`,
`travelY: 19` and `aspectFrom: 1.183`, over `enter: [0.13, 0.27]`. That window is chosen so the
frame is at its entry pose exactly when Service 04's image maxes out (track slot 4.0) and is fully
opaque by the time Service 04's slot clears (slot 4.08) — no opacity dip, no double image.
Measured through the crossfade the two slots hold the same photograph to within **~5px of width and
~4px of centre**; the crop opening from 1.183 to 4:5 is the only visible movement. **If any of
Service 04's exit values change, re-measure and re-tune these five numbers.**

**Exit.** There is no Service 06, so the primary uses `exit: "advance"` while the supporting frames
recede: the chapter resolves on one strong visual moment and hands off to the closing statement
rather than preparing another scene.

Photography is Mishram's own creator work (Zoya Jaan, Mukul Sharma, Vishnu Priya, Lovkesh Kataria).
In-frame tags are format only — `STILL / 4:5`, `REEL / 9:16`, `PORTRAIT / 4:5`, `DETAIL / 16:9` —
swapping to `VIEW` on hover through a masked label, which is the contextual cursor state without a
second cursor system. Hovering a frame keeps it at full strength and drops its neighbours to 55%
via `.svc-sheet:has(.svc-frame:hover)`. **No fabricated client, campaign, camera, lens or date.**
Frame indices are the sheet's own numbering, not a claim about a shoot.

Frames sit closer to full saturation at rest than Services 01–04 (`.svc-frame` raises `.svc-photo`
to `saturate(0.95)` and halves the veil) because here the photography *is* the content. Tags use
the `.svc-name` halo trick — ink plus a canvas-coloured text-shadow — so they stay legible over
both bright and dark regions of a photograph in either theme.

### Closing moment — end of Section 02

`WhatWeDoClosing.tsx`, copy in `WHAT_WE_DO_CLOSING`. Renders after the sequence for both the
pinned and the stacked path.

Statement **"Different disciplines. / One growth system."** with `One` in Instrument Serif italic —
the accent sits on the word that carries the line, not on a trailing "-word." as in the Hero and the
section intro. Baseline `Strategy — Content — Creators — Performance — Technology` on hairline
separators. Built from the section's own grid, hairlines and whitespace — **no coloured banner, no
gradient, no big rounded card.**

### THE CTA HERE WAS REMOVED — do not reinstate it

This block used to end with a full conversion row: **"Have something in mind?"** plus
`Book a 15-Min Call` + `Contact Us` and the `15 MIN · NO OBLIGATION` note. It is gone.

Reviewing the whole page showed it was the **second** booking presentation after the Hero's, arriving
a screen and a half in — before the visitor had seen a creator, the process, any work or the agency.
The page was asking for the meeting at the point where it had only finished describing itself. It
also left a mostly-empty viewport between §02 and the next chapter.

`Book a 15-Min Call` now appears exactly three times, all of them earned: **Hero** (attention),
**About's closing** (after the proof), and the **Footer** (as a direct line, not a pitch). Verified by
walking the rendered page. The per-service `Discuss this project` action inside §02 stays — it is
contextual, small, and opens the panel rather than asking for a calendar slot.

Reveal order is now statement → baseline, and the block's bottom padding is short (`lg:pb-16`)
because the Mishram Difference interlude's axis begins at its lower edge and carries the gap. **Do
not restore a large empty runway here, and do not add a CTA block back.**

### Adding a service

1. Write the scene component in `whatwedo/scenes/`, composing `parts.tsx`.
2. Register it in the `SCENES` map in `ServiceStage.tsx` (keyed by `ServiceId`).
3. Flip `built: true` and fill `title`/`description`/`capabilities` in `config/services.ts`.

Track height, progress fill and per-service slot mapping all derive from `built` — the scroll
architecture needs no changes, and none were made for Service 05. `SERVICE_SCROLL_VH` stays at 130;
the closing block lives in normal flow after the track, so it gets its own scroll space for free.

All five services are built. Do not add a Service 06.

---

## 10a. The Mishram Difference — the interlude, built

`src/components/difference/` — `Difference.tsx` (shell, intro, axis, local grid reduction),
`ConnectedStack.tsx` (wide), `DifferenceRail.tsx` (narrow), `fragments.tsx` (the four micro-visuals);
copy in `src/config/difference.ts`; `.dif-*` styles in `globals.css`.

### Why it exists, and why it is not numbered

§02 says what Mishram does. §03 starts proving it. Between the two, the page never answered the
question a brand actually asks next: *why you, instead of an agency, two freelancers and a dev shop?*

It is deliberately **an interlude, not a chapter**. It carries **no index**, so `03 / Creators` and
everything after it keep their numbering and `ABOUT_CHAPTER` (§10f) is untouched. It also has **no
top border** — a chapter rule would announce a new section when the whole point is that this
continues §02's closing thought. The label is a short teal rule plus `THE MISHRAM DIFFERENCE`, which
is what marks it as an interlude rather than a numbered slot.

Not called "Why Choose Us" or "Our USP", which read as a template. Copy: headline **"Fewer handoffs. /
More momentum."** with **`Fewer`** in Instrument Serif italic, and the lead "Creators, content,
performance and technology working as one team, not four suppliers."

**The accent is on the leading word on purpose.** §04 / Work Process already accents `momentum.` in
its own headline; two italic "momentum."s on one page would read as an accident rather than a rhyme.
"Fewer" is also the word carrying the actual claim. Precedent: §02's closing accents `One`.

### The four differentiators — operating facts, not boasts

| # | Layer | Meta rail |
| --- | --- | --- |
| 01 | Creator-Native | `Creator Network / Personal Brands / Collaborations` |
| 02 | Creative + Performance | `Content / Campaigns / Paid Growth` |
| 03 | We Build the Destination | `Web / Software / CRM / Digital Systems` |
| 04 | One Connected Partner | `Strategy / Create / Launch / Scale` |

Each is one sentence about how the work is organised. **No metrics, no rankings, no
"award-winning"** — a differentiation section is exactly where that temptation appears, and §1
forbids it. 03 is where the software and CRM positioning lands a second time, in the visitor's own
language. 04's rail is the Work Process stage names on purpose: §04 is the answer, later.

### The connected stack

One vertical **Mishram axis** at `--dif-axis: 56%` of the section's content width. The four layers own
everything to its left; the system owns everything to its right. **Not four cards, not four boxes** —
hairline-separated rows of type, and the only thing that moves on activation is a line.

- The axis spans the **entire section**, top border to bottom edge, and is drawn downward as the
  section enters. That is the "line continuing out of §02" — it starts exactly where §02's closing
  block ends, and it carries on past `Momentum` to where §03's own border picks it up. **Creators
  needed no change at all.**
- Each row's connector is a graphite hairline that always reaches the axis (the structure); the
  **teal fill travels along it** on activation (the reaching).
- The axis responds with **one teal segment, one row tall**, moved to the active row. Rows are a
  fixed `--dif-row: 5.5rem`, which is what lets that segment be placed by `index × row height`
  instead of measuring the DOM.
- The right of the axis carries the active layer's sentence, its meta rail and one evidence
  fragment; the axis resolves at the foot into a teal tail and `MOMENTUM`.

**Geometry gotcha, and it bit once.** `--dif-axis` is a percentage, so every element using it must
resolve it against the *same* box. The active segment first lived inside the 56%-wide rows column,
where `left: 56%` landed at 56% of 56% — 31% of the section. It is now a direct child of
`.dif-system`. Anything new that sits on the axis goes there too.

**Trigger gotcha, an extension of §4's.** The axis is held at `scaleY(0)` before it draws, which makes
it a **zero-height box pinned to the section's top edge** — a `whileInView` margin can put that box
outside the root permanently, and the line then never appears. The trigger is on the full-height
wrapper and variants propagate down. The same applies to the `Momentum` block at the foot of a 930px
section: trigger the block, not its 74px line or its 11px label.

### The evidence fragments

One 16:10 footprint for all four, so switching a layer never moves the panel below them: a creator
record (the section's **only** photograph — an already-fetched Zoya Jaan crop, damped to
`saturate(0.82)` under a canvas veil so it stays inside the palette), a creative panel with its
distribution path, an interface plus a record list, and four lines resolving into one continuous
output. All `aria-hidden` — every one restates something the sentence beside it already says.

SVG fragments **must not** use `preserveAspectRatio="none"`: it shears the curve and makes the stroke
non-uniform, which is visible at this size. Both were fixed to a uniform aspect.

### Local grid reduction — the first rhythm change on the page

The page carried the same full 12-column grid through nearly every section. Here — and **only** here —
`.dif-grid` masks the centre out and keeps the outer columns, so the stack reads as the structure in
a clean field. `§11`'s global grid behaviour is untouched, and Creators' full grid resuming at the
boundary is what makes the reduction read as deliberate. The Footer is to receive a larger visual
break later.

### Interaction

`useHoverLock` (§10c): hover previews, click locks, leaving the group restores the lock, 90ms
debounce, `aria-current` on the lock, never the preview. Rows are real `<button>`s — focus previews
and Enter locks. **Nothing auto-switches**; the idle life is one slow teal signal down the axis, and
it never changes which layer is active.

Every layer's sentence is **mounted at all times** and only the active one is visible, so the drawing
never carries the explanation alone — the same rule §04's detail panel follows.

### Responsive and reduced motion

| Shape | Behaviour |
| --- | --- |
| `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` | The spatial stack — the same query §04 uses |
| Everything else | Vertical rail: axis on the left, layers hanging off it, active one expanding in place |

The rail's teal fill is **not cumulative**, unlike §04's: these are four parallel facts, not five
sequential stages, so filling "as far as" one of them would claim an order that does not exist. The
layout switch is mirrored by `data-layout` on the section, which gates the split grid in CSS, so the
two can never disagree.

**No CTA in this section**, and that is deliberate — §02 carries `Discuss this project`, §03 opens
with `Work with our creator network`, and About owns the closing ask. A `See how we work` link to
§04 was considered and rejected: it would jump the visitor past the proof the page has just set up.

Weight: no WebGL, no canvas, no scroll track, one small already-loaded photograph. Section is
~930px at 1440, lighter than §02 by design.

Verified at 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844 in both themes and under
reduced motion: no horizontal overflow, no console errors, all four layers selectable everywhere.
Under reduced motion the axis, the output and all four names render fully, the signal is not
rendered at all, and every layer's sentence is still in the DOM.

---

## 10b. 03 / Creators — rearchitected for scale, awaiting review

> **EXTENDED BY §10t (Revision 17), not replaced.** Everything below is current: the stage, the
> composition, the five tuned crops, the selection model and the media-loading architecture are all
> untouched. What was added is a **second layer beneath them** — two scale facts and a
> **worked-with index** of fifteen further confirmed names, published as type because the project
> has approved photography for one of them and inventing the rest is not an option. The chapter's
> own padding came down one step to absorb it.
>
> **Akash Sagar is now published, but not here.** `published: false` still excludes him from
> `ROSTER`, deliberately: he has his own Current Management chapter high on the page (§10t), and
> putting the one managed creator into a worked-with roster as well would blur the distinction the
> two layers exist to draw.

`src/components/creators/` — `Creators.tsx` (shell, selection state, intro, CTA),
`CreatorIndex.tsx`, `CreatorStage.tsx`, `CreatorMeta.tsx`, `useCreatorTransition.ts`; data in
`src/config/creators.ts`; `.crt-*` styles in `globals.css`.

**The concept, the composition and the interaction model are unchanged** — talent index left,
cinematic creator right, hover previews / click locks. What was rebuilt is the part that only ever
worked at five: the roster's shape and the media loading. See §10b-scale below.

### Copy

Section `03 / CREATORS`, headline **"Built with people / who move culture."** (`culture.` in serif
italic), lead "Creators we've worked with, managed and built alongside." One restrained inline CTA,
`Work with our creator network ↗`, opening the existing contact panel — this is a credibility
chapter, not a conversion one.

### Concept

A **talent index**, not a card grid: an indexed roster on the left, one large creator on the right,
and the visitor in control of which. Deliberately **not** another pinned sequence — §02 owns the
long scroll. Creators is ~1160px at 1440 (a little over one viewport) of ordinary page scroll and
gets its depth from interaction instead. **Nothing auto-advances.**

### The roster — verified creators only

The same five already in `config/hero.ts` with approved local portraits. The list is **closed to
unverified names** — do not add one without approved local photography, and never substitute stock
or a scraped influencer — but it is no longer *architecturally* closed: see §10b-scale.

| # | Creator | Source asset |
| --- | --- | --- |
| 01 | Zoya Jaan | `zoya-jaan.webp` 620×1102 |
| 02 | Nikita Kumawat | `nikita-kumawat.webp` 620×1102 |
| 03 | Lovkesh Kataria | `lovkesh-kataria.webp` 720×720 |
| 04 | Mukul Sharma | `mukul-sharma.webp` 620×1102 |
| 05 | Vishnu Priya | `vishnu-priya.webp` 620×1102 |

### FOLLOWER COUNTS — none are shown, after a real verification pass

A bounded verification pass was run (August 2026, ~10 minutes, one search per creator). It found a
candidate account for every creator and **confirmed none of them**, so `followers` and `instagram`
remain empty for all five. Recorded here so nobody repeats the work:

| Creator | Candidate handle(s) found | Figures seen | Why rejected |
| --- | --- | --- | --- |
| Zoya Jaan | `@zoya__jaan_`, `@zoya.__jaan.8` | 5.8M / 7M | Two accounts, two conflicting figures |
| Nikita Kumawat | `@iamnikitakumawat`, `@imnikkskumawat`, `@im_nikita_kumawati`, + a fan page | 1M / 2.3M / 3.5M | Four accounts, three-way figure spread |
| Lovkesh Kataria | `@corrupt_tuber` | 3.6M / 4M | Best of the five — distinctive handle, documented public figure — but every source spells the name **Lovekesh**, the figures disagree, and the local photo shows two people so it cannot be matched |
| Mukul Sharma | `@iammukulsharma` | none found | Very common name; nothing distinguishes this account from any other |
| Vishnu Priya | `@vishnupriyaaa` | ~360K | Common name, sources say "Vishnu Priyaaa"; no way to tie it to this portrait |

Three blockers, and any one is disqualifying under §1:

1. **The project holds no record linking a name to a handle.** For common names, picking one would
   be assuming — exactly what must not happen for a named real person on a client's live site.
2. **Every figure came from secondary aggregator/biography sites** and they disagree badly. One
   creator was listed at 1M, 2.3M and 3.5M by three different sites.
3. **Instagram sits behind an auth wall**, so the portraits in this repo could not be matched
   against a profile photo.

**To switch it on:** the client can confirm each handle in minutes — they have the relationships.
Then read the figure off the live account and store a rounded label (`"2.4M"`, `"850K"` — never
`"2,438,921"`). `CreatorMeta` renders `followers` and `instagram` automatically and already lays
out correctly with both absent: no placeholder dash, no "coming soon". **No total network reach is
calculated anywhere** and none should be until every component is verified.

The contextual label stays `CREATOR NETWORK` for all five — the only relationship the project can
evidence, and what the hero already says about the same portraits. No invented niches.

### Composition

Left `col-span-4`: the index, then the large active name + label, then the CTA. The list is the
control and the big name below it is the title of what is on the stage, so hovering a row changes
something directly under the cursor as well as the photograph beside it.

Right `col-span-8`: a cascade, not a row — content frame small and furthest back at the left, reel
bridging up through the middle, portrait dominating the right at the full height of the box, each
overlapping the next.

**Three formats from one source.** Each creator has exactly one approved photograph, so the
supporting frames are genuine re-crops of it rather than invented campaign work. The portrait frame
is **3:4** — the most forgiving common crop across the 9:16, 4:5 and 1:1 sources, so no creator
needs a different frame shape that would make the composition jump on switch.

### Per-creator art direction

Geometry is shared and never changes: same portrait frame, same reel, same content frame, same
cascade, so switching stays spatially stable. What is tuned per creator is what each frame is
*pointed at* — `media.{portrait,reel,content}` in `config/creators.ts`, each carrying a
`position` (object-position), an optional `zoom`, an optional `origin` and an optional `src`. Those reach the DOM as
`--crt-zoom` / `--crt-origin` custom properties, read by `.crt-zoom` and `.crt-crop`; the idle
portrait animation composes with the zoom instead of overriding it. There is also a restrained
`nudge` for a couple of percent of vertical offset on a supporting frame.

Every crop below was chosen by looking at the actual file, then checked in the rendered composition:

| Creator | Source | Portrait | Reel | Content |
| --- | --- | --- | --- | --- |
| Zoya Jaan | 620×1102 | Face sits at ~15% of the source, so the frame takes all the headroom the 25% crop range allows | 1.8× from the top edge | Drops past the chin entirely to the dress — a partial-face crop would have clipped her |
| Nikita Kumawat | 620×1102 | Pulled left to 44%: she stands off-centre and drifted toward the edge at 50% | 1.7× | Saree drape below the face |
| Lovkesh Kataria | 720×720 | **1.25× lift** — the 1:1 source in a 3:4 frame crops width only, so the full ceiling came with it | 1.9× on the pair | 1.5× chest-up on the pair |
| Mukul Sharma | 620×1102 | Inverted: already a close selfie, so the frame pulls *down* for headroom | 1.75×, origin high enough to keep the hair in frame | 1.6× onto the jacket graphic — at a gentler zoom all three frames were the same close-up at three sizes |
| Vishnu Priya | 640×800 | The only 4:5 source: the 3:4 frame crops width, and the eyes land at their natural 22% untouched | 1.55× | Hard 1.7× — frame and source share an aspect, so nothing less becomes a genuine mid crop |

Two decisions worth keeping:

- **Lovkesh's frames all keep both figures.** The project does not record which figure is him, so
  isolating one would assert something unverified. A close crop of his black sherwani was tried for
  the content frame and rejected — it reads as a dead rectangle in dark mode, where the other
  creators' content frames have patterned fabric to work with.
- **Crops are shared between desktop and mobile.** The mobile portrait frame is also 3:4, so a crop
  verified on one is correct on the other. All five were checked at 390 regardless; no responsive
  focal overrides were needed.

**Stage aspect is fixed at 1.45.** Frames are sized as a percentage of box *height*, so a fixed
aspect is what keeps the portrait at the same share of the width. Without it a narrower column made
the portrait swallow the cascade (at 768 it took 73% of the width instead of 52%).

### Interaction model

- **Hover previews, click locks.** Leaving the list restores whatever is locked, so sweeping the
  cursor down five names never strands the visitor on a creator they did not choose.
- Previews are debounced 90ms — that is what stops a fast diagonal cursor firing four transitions on
  its way past.
- Rows are real `<button>`s. **Focus previews and Enter locks**, so keyboard gets the same section.
  `aria-current="true"` tracks the *lock*, never the hover preview.
- Inactive frames are `aria-hidden`, so the accessibility tree only ever holds the active creator.
- No cursor system was added. The portrait's hover state is the established one — teal hairline,
  saturation to full, veil lifts, format tag brightens.

### Transition, not remount

The outgoing frame wipes upward while the incoming one resolves down out of the same edge, so one
creator *becomes* the next. The name swaps through the same clip mask on the same beat. **No opacity
cross-fade between two photographs.**

Timing is **~460ms**, supporting frames trailing the portrait by 45ms each so the whole cascade
resolves inside ~550ms. Verified under a 35ms-per-row cursor sweep with real mouse input: exactly
one name visible at any moment, exactly one creator in the accessibility tree, no flashing, no stale
name, and the lock survives a click made mid-sweep.

**This used to work by mounting every creator's frames permanently.** That is what §10b-scale
replaced — the frames now mount on demand and the switch is gated on the incoming photograph
instead.

### Idle life

`.crt-crop` 26s scale on the active portrait, `.crt-drift--a/b` 16s/21s 2–3px on the supporting
frames, and spring-damped pointer parallax (near ×7, far ×17). Nothing bounces, nothing orbits,
nothing auto-changes.

### Responsive

| Width | Behaviour |
| --- | --- |
| ≥1024px | Two-column composition: index + meta + CTA left, cascade stage right |
| <1024px | Stacked: portrait (capped `max-w-[26rem]`), name + label, roster, CTA |
| ≤340px | The roster matrix collapses to one column whatever the roster length |

The stacked path uses `COMPACT` geometry — the portrait takes the box and one reel frame tucks into
its lower corner. Five tiny frames would defeat a section whose power comes from showing people at
scale. Selection never scrolls the page.

Verified at 1440×900 / 1280×800 / 1024×768 / 768×1024 / 430×932 / 390×844, both themes, and reduced
motion, with no horizontal overflow and no console errors.

### Reduced motion

Switching becomes a short opacity transition; clip wipe, depth travel, parallax, crop and drift are
all off. Every creator remains selectable and all information stays present. Verified: `crt-crop`
and `crt-drift` both compute to `animation-name: none`, and the switch is a plain opacity swap with
both frames unclipped.

---

## 10b-scale. Carrying 15–20+ creators

The section above was built for the five creators the project has. The business has many more, so
the architecture — not the design — was rebuilt to carry **15–20 now and 24–30 later**.
**Stress tested at 24.** Two things had to change: the roster's shape, and what the stage mounts.

### The roster is a matrix, not a list

A single vertical column is right for five names and wrong for twenty — it grows taller than the
photograph beside it and turns the directory into the subject. So the roster is a CSS grid with
`grid-auto-flow: column` and an explicit row count, which flows **down column one, then down column
two**, exactly as an index should read. DOM order stays `01…n`, so Tab order and reading order agree.

**The column count is derived, not fixed.** One column below `MATRIX_MIN` (7), two at or above it —
so today's five-creator roster renders *identically to the approved design*, matrix and all, and
only splits when it would otherwise run tall. The desktop spans follow: `4/8` at one column (the
approved composition, untouched), `5/7` at two, so the photograph never shrinks to make room for
names that are not there.

Deliberately rejected, and none of them should come back:

- **No inner scroll area.** Nested scrolling hides creators, fights trackpads and is hostile to
  keyboards.
- **No pagination.** Fifteen to twenty names do not justify hiding half of them behind "next".
- **No carousel.** The index is stronger and more editorial.
- **No virtualisation library.** Thirty text rows are cheap; only the media needed work.

Names **wrap to a second line** rather than truncating — a creator's name is the one thing here that
must stay whole, so there is no ellipsis. Verified with deliberately long test names.

### The roster header

`SELECTED CREATORS / 05`, where the number is `ROSTER.length`. It becomes `12`, `18`, `24` on its
own as creators are added. **It is not "network size"** — Mishram's real creator network is larger
than what is configured here and that figure is not verified, so the page must never imply it. Index
numbers come from array order via `creatorIndex(i)`, clean to `99`.

### Media loading — the actual reason this needed rebuilding

The stage used to mount **every** creator's three frames permanently. At five that was 15 image
nodes and made switching instant. At twenty it would be 60, in a section most visitors scroll past.

It now mounts only what a transition needs: the **shown** creator, the **outgoing** one for the
length of one wipe, the **incoming** one loading behind its clip, the one being **warmed** under the
cursor, and the creator the section opened on. **At most five, normally one or two — bounded by
construction, not by roster length.**

Switching still feels instant because of `useCreatorTransition`, not because everything is mounted:

- `shownId` changes only once the incoming portrait has fired `onLoad`, so **a switch never reveals
  an empty frame.** A 900ms cap stops a slow or failed image stranding the selection, and the worst
  case is the frame's own `canvas-raise` background — never a white flash.
- Pointer entry **warms** a creator immediately, ahead of the 90ms preview debounce, so the fetch and
  the debounce overlap.
- The **index rows deliberately do not wait** on any of this. They track the raw selection, so a
  hover always feels acknowledged; the photograph and the large name are what land together.

`CreatorMeta` mounts the same two creators for the same reason, rather than n absolutely-positioned
name blocks behind the visible one.

**Exactly one image on the page carries `priority`:** the creator the section opens on. Every later
mount stays lazy, so the roster's length never changes what loads first.

Measured at 24 configured creators, 1440×900:

| | |
| --- | --- |
| Image nodes at rest | **3** (one creator × three frames) |
| Distinct sources fetched on load | **1** |
| Peak during a 35ms-per-row sweep of the whole roster | **6 nodes, 2 sources** |
| Peak across the full interaction test | **9 nodes, 3 sources** |
| Under the old architecture | 72 nodes, 24 sources |

Untouched creators are never fetched. Verified with real mouse input, not dispatched events —
React's `onPointerEnter` comes from delegated pointer events and does not fire for synthetic
`pointerenter`, so any future test of this must drive `Input.dispatchMouseEvent`.

### Optional per-frame sources

`media.reel` and `media.content` may now carry their own `src`. Left unset — which is what all five
current creators do — the frame is a genuine re-crop of the portrait source, because each of them
has exactly one approved photograph. Set it when a creator genuinely has a separate reel still.

Omit a frame block **entirely** and `resolveFrame` falls back to the portrait's crop with a default
zoom (`reel 1.5`, `content 1.25`). That is a **layout default, not art direction** — it stops a new
creator's three frames being the same crop at three sizes, which is the failure this section already
learned about. Tune the real values once the composition has been looked at. An explicit frame with
no `zoom` still means 1, which is what keeps the five tuned crops byte-exact.

### Adding a creator

One object in `config/creators.ts`, one image in `public/media/creators/`:

```ts
{
  id: "creator-name",
  name: "Creator Name",
  alt: "Portrait of creator Creator Name from the Mishram Media network",
  label: "Creator Network",
  media: { portrait: { src: "/media/creators/creator-name.webp", position: "50% 20%" } },
}
```

Index number, roster count, matrix column count, desktop spans, the selector, the stage, the
metadata, the mount set and every responsive variant all derive from `ROSTER`. **No component
changes and nothing hand-counted.** Add `published: false` to keep a record here without showing it
— one boolean, not a CMS. `followers` / `instagram` stay absent until verified.

### Stress test — and its removal

Twenty-four development-only entries were injected temporarily (existing local images, names
prefixed `DEV`, two deliberately over-long to test wrapping) to verify matrix geometry, section
height, wrapping, selection, keyboard, media loading and the mobile layout. **They were removed
afterwards and are not in production.** The config was restored from a byte-identical backup and
`src/` was scanned for every marker used. Production contains exactly the five legitimate creators.

Results at 24: section **1382px** at 1440×900 and 1905px at 768; all 24 rows visible with no inner
scroll; rows **≥48px** everywhere; no horizontal overflow at 1440, 1024, 768, 390 or 320.
Interaction verified end to end — hover 15 previews, click 15 locks, leaving the roster keeps 15,
hovering 04 previews without changing the lock, leaving restores 15, focusing 19 previews it and
Enter locks it.

---

## 10c. 04 / Work Process — built, awaiting review

`src/components/process/` — `WorkProcess.tsx` (shell, selection state, intro, lead-in, CTA),
`ProcessPipeline.tsx`, `ProcessDetail.tsx`, `ProcessRail.tsx`; data and geometry in
`src/config/process.ts`; `.prc-*` styles in `globals.css`.

### Copy

Section `04 / WORK PROCESS`, headline **"From idea / to momentum."** (`momentum.` in serif italic),
lead "A clear system for turning the right direction into work that moves." The headline is
deliberately a step down in scale from the hero and §02 — this is a system diagram, not the page's
opening statement. One small text action, `Start a project ↗`, opening the existing contact panel:
§02 already owns the page's conversion moment, so this is not a second button block.

### Concept — one connected system

Five stages on **one rising line**: an idea entering, becoming structured, made, launched, amplified.
The rise is the point — it encodes "idea to momentum" rather than being a ruler with ticks on it.
Not five cards, not five icons, not a corporate timeline.

**Deliberately light.** §02 owns the long pinned scroll and §03 owns the photography. This section is
~1080px at 1440 (a little over one viewport), one SVG, and **no imagery at all**. Scroll drives the
entrance only; after that everything comes from stage selection, so the visitor never has to scroll
precisely to read a stage. Nothing auto-advances.

### The pipeline

One SVG line system with the stage labels as **HTML positioned over it**, so the typography stays
crisp and themeable while the lines stay resolution-independent. Both read node coordinates from
`PROCESS_STAGES` in the config — they must, or they drift apart.

Layers, quietest first: a graphite base hairline drawn on entry; a teal progress stroke as far as the
active stage; one small travelling signal dash; then the nodes. Labels sit **above** their node, so
they step upward with the rise and get the staggered look for free without a separate offset — and
without colliding with the line or the feedback loop below it.

**Stroke gotcha (extends §10).** `vectorEffect="non-scaling-stroke"` and an animated `pathLength`
cannot be combined — dashes get measured in screen px while `pathLength` normalises to user units,
and the path shatters. So the base draw, the progress stroke and the signal omit `vectorEffect` and
carry a viewBox-space stroke width; every static line keeps it and stays a true hairline at any size.

### The five stages, and what each does to the line

| # | Stage | The line's behaviour |
| --- | --- | --- |
| 01 | Discover | Scattered input dots and three converging traces feed into the first node — information becoming clarity |
| 02 | Strategy | Two alternative routes appear as quiet dashes and grid intersections resolve — many possibilities becoming one chosen direction |
| 03 | Create | Three abstract surfaces emit upward from the node (a 4:5 still, a teal 9:16 reel, an interface block) — strategy becoming tangible output |
| 04 | Launch | Distribution traces fan out with a content fragment part-way along each — work reaching market. **No platform icons** |
| 05 | Scale | The outgoing path thickens, ascending ticks appear (never a number), and the feedback loop resolves in teal |

### The feedback loop

A thin return trace runs from Scale back to Strategy, under the main line, annotated
`LEARN → ITERATE`. It is present at **0.16 opacity at every stage** and resolves to a teal dash at
Scale — so the process visibly does not end on the fifth node. This was the one element that needed
restraining during the build: at full weight it swept across the whole section and dominated the
diagram.

### Interaction model

Reuses the pattern proven in §03, now extracted into `hooks/useHoverLock.ts`: hover previews, click
locks, leaving the group restores the lock, previews debounced 90ms. Creators still carries its own
copy and is locked, so it was left alone; it can adopt the hook whenever that section is reopened.

Stages are real `<button>`s. **Focus previews and Enter locks**, so keyboard gets the same section.
`aria-current="true"` tracks the lock, never the preview; the rail adds `aria-expanded`. Every
stage's description is real DOM text at all times — the drawing never carries the explanation alone.

Verified under a 35ms-per-row cursor sweep across all five stages: exactly one detail block visible
throughout, no flashing, no stale stage, and a click made mid-sweep survives continued hovering.

### Responsive

| Shape | Behaviour |
| --- | --- |
| `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` | Horizontal pipeline + detail panel |
| Everything else | Vertical rail, stages expanding in place |

The horizontal pipeline needs width for five labels stepping up a rising line; below that — or on a
portrait tablet however wide — the vertical rail is the honest reading rather than a squeezed
diagram. Shape first, device classification second, as §11 has it.

The rail is the same progress reading rotated: a hairline with a teal segment filled as far as the
active stage. **The fill is drawn per row, not as a percentage of the whole rail** — the active row
expands, so any fraction of the total would land the teal tip in the wrong place. The active row's
segment stops at a fixed offset from its top, which is where the node sits regardless of how much
description is showing. The loop is stated as text there rather than drawn; there is no room for a
return curve at that width and it is the meaning that matters.

Verified at 1440×900, 1024×768, 768×1024 and 390×844 in both themes and under reduced motion: no
horizontal overflow, no console errors, all five stages selectable everywhere.

### Transition from Creators

Photography hands off to abstraction without a hard reset: the 12-column grid continues, and a thin
trace descends out of the section boundary and resolves into a teal tip — the line that becomes the
pipeline. **It belongs entirely to Work Process**, so Creators needed no change at all.

### Reduced motion

The signal dash is removed and the input drift, path draw and long transitions are off. The complete
process line, the active state, the per-stage graphics, the feedback loop and every description
remain — and selection still works.

---

## 10d. 05 / Selected Work — foundation built, awaiting review

> **THE BLOCKER NARROWED IN §10t (Revision 17), and the section is unchanged.** The media audit
> found a **finished, local, vertical 9:16 Mishram reel** — so "no local production-owned file"
> is no longer the reason this section shows stills. **That particular file is held on three
> independent grounds**: it is internal office humour rather than creator or campaign work, its
> burnt-in captions describe two identifiable employees as a couple, and a third-party brand
> banner runs through it. Every other video in the library is a raw take.
>
> **The ask is now specific:** a creator or campaign piece, cleared for publication. The playback
> path in `WorkMedia` remains built and still has not run against real decodable media.

`src/components/work/` — `SelectedWork.tsx` (shell, selection state, intro, lead-in, CTA),
`WorkIndex.tsx`, `WorkStage.tsx` (+ `WorkMeta`), `WorkMedia.tsx`; data in
`src/config/work.ts`; `.wrk-*` styles in `globals.css`.

### Copy

Section `05 / SELECTED WORK`, headline **"Work made / to be watched."** (`watched.` in serif
italic), lead "Selected creator content, campaigns and visual work from across our network." One
restrained text action, `Create with us ↗`, opening the existing contact panel.

The section is named **Selected Work**, not Influencer Reels, so it can eventually carry reels,
creator content, campaign pieces, brand shoots and digital work under one identity. The current
visual focus is vertical creator content.

### MEDIA AUDIT — no Mishram Media video file has been supplied to this repo

> **CORRECTED 25 August 2026.** This section used to read *"there is no Mishram Media video
> anywhere"* and *"no agency video of any kind"*. **That was too broad, and the distinction
> matters.** It was accurate about the *filesystem* and wrong about the world: **genuine Mishram
> Media social reels exist publicly.** The content-migration audit found **at least nine reels on
> `@mishram.media`** (plus collaborations with `@filmybande` and `@deepankarmaxx`) — permalinks
> are recorded in `docs/CONTENT-MIGRATION-AUDIT.md` §10. What does not exist is a **local,
> production-owned source file**, and that is what this section is actually blocked on.
>
> **They must not be scraped, hotlinked or embedded** from Instagram — §14 requires local assets
> and the platform's terms are a separate reason. **The unblock is the client exporting the source
> MP4s from their own account**, which is a far narrower ask than "shoot some reels".

A bounded search of the whole workspace (project repo, the extracted old Mishram Media site, and
both archives, including `mishramsf.zip`) found **no agency video file of any kind**: no reels, no
creator clips, no campaign footage, no vertical 9:16 content, no poster frames, no captions. The old
site's `assets/img` holds only theme furniture — backgrounds, icons, logos — and no portfolio media.
**Re-verified 25 August 2026**, including the 464-file `mishrammediaupdated (2).zip`, which holds
zero `.mp4` / `.mov` / `.webm`.

**One remote video was missed by that search and is rejected on its own merits.** The old
`influencerMarketing.html:947` references
`res.cloudinary.com/dlnux9dga/video/upload/…/INFLUENCERS_to4v66.mp4` (7.5 MB). It is a **1:1
promotional explainer graphic** in the old brand's purple language — a title card, two captioned
boxes and baked-in text — not a reel or campaign piece. It was also placed inside an `<img>` tag,
so it never played on the old site either. **Not Selected Work material at any size.**

The only videos anywhere belong to a **different entity**:

| File | Size | Why not used |
| --- | --- | --- |
| `mishramngo/public/video/Mishram.ngo 2.mp4` | 96 MB | Foundation film, not agency creator work |
| `mishramngo/public/video/ngovideo.mp4` | 44 MB | Same |
| `mishramngo/public/video/womens day.mp4` | 88 MB | Same |

That directory's `package.json` is `mishram-foundation-site` — a separate organisation from the
agency. Rendering its footage as Mishram Media "Selected Work" would attribute another entity's
content to the agency, and at 44–96MB each they are one to two orders of magnitude too large for a
homepage regardless. **They are deliberately not referenced anywhere.** No optimisation or
transcoding was attempted, because no asset here belongs in this section at any size.

### Consequence: honest media typing

Every item is `mediaType: "poster"` — a still, labelled as one, with the in-frame tag
`STILL / 9:16`. **No play control is rendered for a poster**: a play affordance over a photograph
would tell the visitor they are looking at a reel when they are not. A poster surface is a plain
`div` — nothing to click, nothing to focus.

Three entries, from the sources that are natively 9:16 (620×1102), so the primary frame crops
nothing: Zoya Jaan (featured), Mukul Sharma, Nikita Kumawat. Vishnu Priya's 4:5 and Lovkesh
Kataria's 1:1 would both crop hard into a vertical frame, so they are held back — an art-direction
reason, not an oversight. **No invented project titles**: the title is the creator actually in the
frame, the type is the factual category (`Creator Content`), and no `year` is claimed. No
`COMING SOON` rows padding the index.

**Featured state:** Zoya Jaan — strongest subject separation, and the only one whose supporting 4:5
crop reads as a genuinely different frame from the primary.

### Playback — built, and smoke-tested

The video path in `WorkMedia` is complete even though nothing uses it yet. Dropping a real reel in
means setting `mediaType: "video"` and adding `src`; nothing else changes.

- Muted, inline, looped, `preload="metadata"` with the poster covering the first frame. **There is
  no unmuted code path in the component at all** — audio can never play.
- Hover starts playback. Leaving pauses and holds the frame rather than snapping back to the poster.
- Clicking is explicit intent: it toggles, and while the visitor has chosen play, leaving the surface
  no longer pauses it.
- Leaving the viewport pauses and clears that intent, so nothing decodes offscreen and returning
  never resumes mid-reel. Driven by one `useInView` on the section, passed down as
  `sectionInView`.
- **Only the primary frame of the active item ever mounts a `<video>`.** The supporting fragment is
  always a still, and inactive items are posters — so however long the index grows, exactly one
  decoder can exist.
- Under reduced motion, hover starts nothing; click still does. User-initiated playback stays
  available, per §17.
- The whole media surface *is* the play/pause button, so pointer and keyboard share one control,
  with `aria-label` and `aria-pressed`. A thin progress hairline sits at the bottom, teal for the
  played portion. No native controls, no seek bar, no fullscreen viewer, no social UI.
- `playing` is driven by the element's own `play`/`pause`/`error`/`emptied` events, never set
  synchronously in an effect. The DOM is the single source of truth.

Verified by temporarily pointing one item at a video source and stepping the lifecycle: mounts
paused and muted → click plays and the control flips to Pause → switching item unmounts the video
entirely (one decoder) → scrolling offscreen pauses and resets the control. Two real bugs were found
this way and fixed: the supporting fragment was mounting a second video, and a failed load left the
control label stale. **The path has not yet run against real decodable media** — worth one smoke test
when the first genuine reel lands.

### Composition

Wide layout, `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)`: index `col-span-3` with the CTA
beneath, then a `col-span-9` stage holding the dominant 9:16 surface at the left, a 4:5 supporting
fragment hung off its lower-right for depth, and the metadata top-aligned beside it. The reel is
sized by **height** (`clamp(24rem, 56vh, 36rem)`, ≈284×504 at 1440×900), so it stays a believable
piece of work rather than stretching with the column. **No device mockup** — a thin editorial frame
is the entire chrome.

The supporting fragment lives *inside* the primary's box, because the primary's width comes from its
own aspect against the stage height: percentages on the stage column would resolve against something
far wider. `WorkMeta` owns its own `relative`, so positioning is applied on a wrapper rather than
passed in — the two collided unpredictably when passed as a class.

Below that threshold the reel gets the width and everything stacks: reel (capped `19rem`, `17rem`
from `sm`) then metadata, index and CTA beside it at `sm`+ or under it on a phone. Not full-bleed —
that would cost the section its composure.

Media sits at **full saturation** in both themes with a lighter veil than §03's, because here the
work is the proof. Idle life is a 30s crop on the featured surface and a 2px drift on the fragment,
both suppressed via `data-playing` once a reel runs — from then on the content is the motion.

### Interaction and transition

Selection reuses `useHoverLock` (§10c): hover previews, click locks, leaving restores the lock,
90ms debounce, `aria-current` on the lock. Switching a work item is a clip wipe, not a source swap —
all posters are mounted and switched, the same technique §03 uses.

The handoff from §04 runs process → output: §04's line descends past the section boundary and widens
into a short teal baseline, the line becoming the baseline the media sits on. It belongs entirely to
this section, so **§04 needed no change**.

### Remaining verified candidates

Vishnu Priya (4:5) and Lovkesh Kataria (1:1) are approved assets but wrong-shaped for a 9:16 frame.
They become usable if the client supplies vertical crops. **The real unblock is genuine reel video** —
until then this section shows stills honestly labelled as stills.

Verified at 1440×900, 1024×768, 768×1024 and 390×844 in both themes and under reduced motion: no
horizontal overflow, no console errors, all three items selectable everywhere.

---

## 10d-notes. Client Notes — built, CONTENT-BLOCKED

`src/components/testimonials/` — `ClientNotes.tsx` (self-suppressing shell, intro, lead-in, local
grid), `QuoteIndex.tsx`, `QuoteStage.tsx`; data and the full audit in `src/config/testimonials.ts`;
`.tst-*` styles in `globals.css`.

### The section currently renders nothing, on purpose

`TESTIMONIALS` is empty, so `ClientNotes` returns `null` and **the homepage has no Client Notes
section.** `<ClientNotes />` already sits in `page.tsx` between §05 and Recognition: adding one real
entry makes it appear, composed, with no other change. It is **unnumbered**, like the Mishram
Difference, so Recognition keeps its `06` and `ABOUT_CHAPTER` (§10f) is untouched.

A visible placeholder was rejected for the same reason as §06's. An empty "Client Notes" heading, or
a `COMING SOON` row, implies Mishram has testimonials it is choosing not to show — which is a claim,
and an unverified one.

### AUDIT (August 2026) — every testimonial in the old site fails verification

**RE-VERIFIED FROM SOURCE on 25 August 2026 and the verdict is now final, not provisional.** The
25 August content-migration audit re-opened all three sources rather than inheriting this
conclusion, confirmed every failure below, and **found a further independent disqualifier** (see
"the seventh failure"). **These eight candidates are conclusively rejected. Do not re-audit them,
and do not treat them as material merely awaiting review.** Activation requires *new* first-party
material — genuine client messages, an approved quote, or another first-party source — never a
reappraisal of what is here.

Three sources exist, and all three are disqualified. Recorded here so nobody repeats the work.

| Source | Contents | Verdict |
| --- | --- | --- |
| Live service pages — `webDevelopment` / `metaAds` / `socialMediaManagement` / `brandshoot` / `influencerMarketing` `.html` | 5 slides: Rahul Mehta, Ayesha Khan, Kunal Verma, Sneha Roy, Vikram Singh | **Excluded** — placeholder avatars, placeholder roles |
| Live `index.html` + `about.html`, mirrored in the site's own `llms-full.txt` | 3 slides: Rahul Mehta, Kunal Verma, Vishnu Priya | **Excluded** — one quote used twice, verbatim |
| `_backup_pre_seo/testimonials.html` | A dedicated testimonials page, already deleted from the live site | **Excluded** — unmodified template demo content |

The specific failures:

1. **The portraits are a placeholder service.** Every avatar on the service pages is
   `https://i.pravatar.cc/40?img=5|7|8` — pravatar.cc generates random stock faces, and `img=8` is
   used for **three different named people** (Kunal Verma, Sneha Roy, Vikram Singh). This is the
   "some avatars appeared stock" note from earlier audits, confirmed: **no portrait in any source
   can be connected to the person it is attached to.**
2. **One quote is attributed to two people, word for word.** "Vishnu Priya" is given Rahul Mehta's
   quote verbatim on `index.html`, `about.html` and in `llms-full.txt`. At least one attribution is
   false and there is no way to tell which — which puts the rest of that set in doubt too.
3. **The roles are placeholders.** Three different people share "Head of Product" with no employer;
   two more are "Social Media Influencer" with no handle. No company, link, organisation or date
   appears anywhere in any source.
4. **Source C praises a different agency.** Its quotes are about **"SEOC"** — the purchased
   template's own agency name — signed "David M." and "Emily R." under Google review icons. The
   previous team deleting that page from the live site was the correct read of what it was.
5. **Unverifiable figures inside the quotes** — "4x ROI in the first month", "conversions have
   doubled" — plus a page-level "(40+ Reviews)" claim. §1 forbids all of it.
6. **★★★★★ on every card** with no rating platform behind it, and source C's Google icon implying
   Google reviews that do not exist.

7. **THE SEVENTH FAILURE — found 25 August 2026, and it closes the question.** This audit
   recorded only the `pravatar.cc` problem, which covers the *service pages*. The four **named**
   Cloudinary avatars used on `index.html` and `about.html` — `rahul_mehta_gh8cuc.png`,
   `kunal_verma_do6m0m.png`, `sneha_roy_ywxeti.png`, `vikram_singh_s53fhy.png` — were never
   opened. They were downloaded and viewed on 25 August: **all four are AI-generated portraits**
   (poreless skin, flawless symmetry, synthetic depth-of-field, stock-neutral wardrobe). So *no
   portrait in any source connects to the person it is attached to* — now by **two independent
   mechanisms** rather than one. Same lesson as §10p's award finding, in the opposite direction:
   a filename that names a person is not evidence of a person either.

Also checked, nothing found: `assets/js/homepage/review.js` (slider logic only — no data),
`mishram.com.zip` (the same files as the extracted site), `mishramsf.zip` (zero testimonial or
review entries) and this repo.

**Nothing was published from any of it, and no portrait was used.** Zero of eight candidate
testimonials cleared the bar, which is below the two-testimonial minimum, so the honest outcome is
no section.

### To switch it on

Two genuine testimonials are enough — the composition is count-adaptive. Per record: `quote`
verbatim (trimming allowed **only** as a continuous excerpt of the real words, with the untouched
original kept in `sourceNote` — never paraphrase and quote it); `role` / `company` left `undefined`
rather than guessed; `image` **only** when that asset is confirmed to be that person; `sourceNote`
recording provenance and what was actually verified. `sourceNote` is **development-only and never
rendered.** Written permission to publish a name is worth having on file. §9 brand safety applies —
no testimonial from an excluded client category, whatever it says.

### Architecture (verified against a temporary populated config, then reverted)

**An editorial quote index.** A small indexed roster of names on `col-span-4`, one large quotation
holding `col-span-8` beside it, the author beneath. **No cards, no carousel, no speech bubbles, no
star ratings, no Google badges, no giant floating quotation glyph** — one small teal serif mark
hangs into the margin the way a printed pull quote does, and the words carry the rest.

Copy: `— CLIENT NOTES` (a short teal rule, not a chapter number), headline **"What working together /
feels like."** with `feels` in Instrument Serif italic, lead "A few words from people we've had the
chance to build with." The accent sits on the **leading** word, as the Mishram Difference does —
that is what separates the two interludes from the numbered chapters, which all accent the trailing
one. The quote body stays in Archivo; §4 gives the serif to one accent, not to paragraphs.

**Quotes are mounted together in one grid cell.** The obvious version — active `relative`, the rest
`absolute` — sizes the field to whatever is live, and measured here that swung the section between
709px and 808px, so hovering a name shunted the whole page below it. Sharing a cell holds the field
at the height of the *longest* quote whatever is showing. It matters most on mobile, where the index
sits **below** the quote and a height change would move the row out from under the finger.

Interaction is `useHoverLock` (§10c): hover previews, click locks, leaving restores the lock, 90ms
debounce, `aria-current` on the lock. Rows are real `<button>`s — focus previews, Enter locks.
Inactive quotes are `aria-hidden`, so the accessibility tree only ever holds the one on screen.
Transition is ~420ms: the outgoing quote clips upward, the incoming resolves down through the same
edge, author metadata on the same beat. **No CTA** — §05 above and Recognition below both need this
section to stay proof, and the page's asks live in the Hero, About and the Footer.

**A second local rhythm change: three structural rules instead of twelve.** §05 is the page's most
media-heavy chapter and the same twelve hairlines had run through most of it, so here the grid steps
back to the left margin and the two edges of the quote field, and typography is the architecture.
A different move from the Difference interlude, which keeps its columns and masks out the centre —
the two must not read as the same trick. §11's global grid behaviour is untouched, and the full grid
resuming in the section below is what makes the change legible.

The handoff out of §05 is one short descending trace with no teal tip, the restraint About uses. It
belongs entirely to this section, so **§05 needed no change.**

Below `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` it stacks: label → headline → lead → quote
→ author → selector, rows ≥48px, no swipe-only carousel and every testimonial reachable without
gesture discovery.

Verified with four temporary entries covering all four role/company combinations at 1440×900,
1280×800, 1024×768, 768×1024, 430×932 and 390×844 in both themes and under reduced motion: exactly
one quote visible and one in the accessibility tree at every moment, section height stable at 808px
through every selection, no horizontal overflow, no console errors, and the author block correct
with a role only, a company only, both, and neither. **That config was reverted; nothing fabricated
ships.** The shipped state was then re-verified: `#client-notes` is absent from the DOM entirely and
About still reads `06 / About`.

---

## 10e. 06 / Recognition — built, and now ACTIVE

> **SUPERSEDED IN PART BY §10p (Revision 13).** The architecture, the copy and the
> responsive/reduced-motion behaviour below are all current and unchanged. **The
> "CONTENT-BLOCKED" status and row 2 of the audit table are not** — the section now renders one
> verified award. See §10p.

`src/components/recognition/` — `Recognition.tsx` (shell, archive composition, intro, lead-in,
CTA), `RecognitionMedia.tsx`; data in `src/config/recognition.ts`; `.rcg-*` styles in
`globals.css`.

### It used to render nothing, on purpose — that state is over

`RECOGNITION_ITEMS` was empty, so `Recognition` returned `null` and the homepage had no §06.
**It now holds one verified item and the section renders.** Everything the paragraph below argues
still holds for the *empty* case, which is why it is kept:

A visible placeholder was rejected deliberately. An empty "Recognition" heading, or a
`COMING SOON` row, implies the agency has awards it simply is not displaying — which is a claim,
and an unverified one. No section is the honest state.

### AUDIT (August 2026) — **PARTLY SUPERSEDED, see §10p**

Row 2 of this table was **wrong**, and how it was wrong matters more than the row: the pass
searched the old site's *markup* and never opened the *images*. Rows 1, 4 and 5 still stand.

| Candidate | Verdict |
| --- | --- |
| `aditi-landing/awards/*` (4 JPGs) + `aditi_trophy.jpg` | **Excluded — different person.** From "The Career Acceleration Program – Aditi Sharma"; that `index.html` mentions Mishram zero times. Its own alt text names them: a presentation by Ms. Sania Nehwal, a Certificate of Appreciation from Mr. Munaf Patel, Top 100 Women Creators at Womennovator Creators Fest, a formal ceremony honour. Aditi Sharma's recognition, not the agency's |
| Two remote `*_AWARD_*.gif` on Cloudinary, referenced by the old Mishram Media site | ~~Excluded — promotional, unlabelled, hotlinked~~ **← WRONG. SUPERSEDED (§10p).** "No award name, body, year or category appears anywhere in that markup" was true of the *markup* and false of the *images*, which this pass never opened. The 2048×731 banner reads `"AWARDED AS " BEST DIGITAL MARKETING AGENCY` with a gold `NUFEW 2024-25` badge over an award-plaque presentation. **This is now the configured §06 item.** The hotlinking objection was correct and is honoured — the asset is downloaded, cropped and served locally |
| `lovkesh-kataria.webp` | **Excluded from §06 — wrong subject.** Genuinely awards-evening photography and an approved local asset, but it documents a *creator* at an awards evening, and the project does not record which figure is him. Under a "Recognition" heading it would imply an agency award by juxtaposition. It stays in §03, where it is honest |
| `mishram.com.zip`, `mishramsf.zip` | Zero award-related entries |
| `mishramngo/` (Foundation) | Different entity — would not count even if it had material |

**To add a second item:** one photograph of Mishram Media recognition is enough. Drop it in
`public/media/recognition/`, add an entry, and fill only the fields that are documented. `title`
may be a factual generic label ("Award Recognition", "Industry Recognition", "Event Recognition")
where the specific award is not recorded; `organisation` and `year` stay `undefined` rather than
guessed. **Never invent an award name, body, year or category.** Every item carries a dev-only
`source` field so any displayed claim stays traceable; it is never rendered.

### Architecture (verified against a temporary populated config, then reverted)

**The recognition archive** — glimpses, not an award wall. One dominant moment on `col-span-7` plus
up to two fragments on `col-span-5`, offset down by `18%` so they hang off its lower right rather
than sitting level with its top edge. **Count-adaptive**: one item renders the dominant alone, two
adds one fragment, three or more caps at two — a third would start competing. No trophy icons, no
badges, no star ratings, no gold, no achievement counters.

Copy: `06 / RECOGNITION`, headline **"Work that / gets noticed."** (`noticed.` in serif italic,
and a deliberate echo of §05's "Work made to be watched."), lead "A few moments of recognition from
the work and relationships we've built along the way." One restrained text action,
`Build something worth noticing ↗`.

**Labels use the most specific factual information available and nothing more.** The in-frame
annotation shows `organisation · year` when both are documented and falls back to
`Recognition / 01` otherwise. The caption block shows title, then the org/year line only if
present, then a caption sentence only if present. Verified: an item with no organisation and no year
renders its title alone.

Captions are **real DOM text at all times, never a hover-only reveal** — the caption is the claim, so
it has to be readable without a pointer. Hover *strengthens* rather than reveals: the frame lifts
3px, the hairline goes teal, saturation comes to full, the annotation brightens, and neighbours step
back 2px via `.rcg-archive:has(.rcg-item:hover)`. No modal, no lightbox, no second cursor system.

Media sits at full colour in both themes — archival prints on parchment in light, cinematic on
obsidian in dark. **No gold**: an awards section is not a licence to leave the palette.

### Responsive and reduced motion

Below `lg` the archive becomes a vertical editorial column: full-width evidence at meaningful size
with its caption beneath, fragments side by side from `sm` and stacked on a phone. No thumbnails, no
carousel, normal scroll. Reduced motion removes the lift and the neighbour step-back and shortens
transitions; all imagery and captions remain.

Verified at 1440×900, 1024×768, 768×1024 and 390×844 in both themes and under reduced motion, with a
temporary populated config — no horizontal overflow, no console errors. **That config was reverted;
nothing fabricated ships.** The shipped state was then re-verified: `#recognition` is absent from
the DOM entirely.

---

## 10f. About — built, awaiting review

> **SUPERSEDED IN PART BY §10s (Revision 16). THE HOMEPAGE CHAPTER IS NOW A PREVIEW —
> 1,468px → 718px, 1.63 → 0.80 viewports.** The adaptive chapter numbering, the content-integrity
> rules and the closing conversion moment below are all current. **The chapter's body is not.**
> The second paragraph, the verbatim emphasis line, the `INDIA` locator, `DisciplineSystem` and
> the 2021/2023/2025 history band are all gone from the homepage — every one of them lives on
> `/about` (§10r) or, in the second paragraph's case, is the argument the Mishram Difference
> interlude already makes on this page (§10a). `DisciplineSystem.tsx` was deleted;
> `DISCIPLINES` still feeds `FOOTER_EQUATION`. **Do not rebuild the long version here.**

`src/components/about/` — `About.tsx` (shell, preview, closing conversion); copy and provenance in
`src/config/about.ts`; chapter numbering in `src/config/sections.ts`. No new CSS — the section is
typography, grid and hairlines only.

### Adaptive chapter numbering

§06 Recognition self-suppresses while it has no verified items, so About cannot hardcode its index —
the page would jump `05 → 07` with nothing between, which reads as a bug. `ABOUT_CHAPTER` in
`config/sections.ts` derives it: **06 today, 07 automatically once Recognition is populated.**
Verified both ways by temporarily populating the recognition config, then reverting.

Deliberately a derived constant rather than a section registry. Every existing section owns its own
index in its own config, and rewriting that system to solve one adaptive label would be the wrong
trade. Recognition keeps its fixed `06` because it only ever occupies that slot.

### Concept — the calm chapter

An editorial agency manifesto, not an About template. Five chapters of pinned scroll, photography
and interaction come first, so this one is typography, space and hairlines: the visitor finally gets
a moment to read. **No team grid, no mission/vision/values cards, no statistics, no timeline, no
stock office photography.**

Copy: chapter label, headline **"Creative thinking, / built for growth."** (`growth.` in serif
italic — a deliberate bookend to the hero's "We turn attention into *growth.*"), two paragraphs of
story, one emphasis line, the `INDIA` locator, then the closing conversion moment.

### Content — every claim traceable

| Element | Source |
| --- | --- |
| Positioning and capability list | §1 of this brief |
| Emphasis line, **verbatim**: "Founded to help brands grow through ideas and measurable impact." | Mishram's own schema.org `description` on the old site's `about.html` |
| Discipline captions (Meta and Google Ads; content, reels and brand shoots; discovery, collaboration and campaigns; websites, stores and product platforms) | The same markup's per-service `description` fields |
| `INDIA` locator | `BRAND.locator` in `config/site.ts` |

Body copy is **103 words** across two paragraphs, inside the 80–140 target.

**Deliberately absent, and why:**

- **No metrics.** No client count, reach, years-in-business or creator count. §1 forbids unverified
  figures, and the page already earns credibility through §01, §03, §05 and now §06.
  **This no longer excludes the founding year** — see the history band below.
- **No team members.** The old about page does list four role titles (Founder & CMO, Chief Client
  Officer, Influencer Marketing Manager, CFO), but every headshot is a remote Cloudinary file with a
  placeholder-looking filename, and staff change. Available if the client supplies confirmed names
  and photos — though a team block is out of scope for this chapter's design.
- **No specific city.** The old site contradicts itself: its schema says New Delhi / Nainital /
  Bareilly while the visible page lists a US Nagar head office with Bareilly and Delhi branches.
  `INDIA` is the one locator certainly right, and the contact panel owns the details.

### The history band — added Revision 13, and it is not a timeline

Three dated moments on one hairline, between the story grid and the closing rule: **2021 Starcrown
Media · 2023 New disciplines · 2025 Mishram.Media.** Copy and provenance live in `HISTORY` in
`config/about.ts`; the component is `History` inside `About.tsx`.

**Why this does not break §10f's "no timeline" rule.** It reuses the grammar already on the site —
`ServiceProcess` puts four steps on a shared `border-t` with a teal tick marking where each one
starts — so About gains **no new visual language**. There is no axis, no connecting arrow, no card,
no dot-and-date rail, no scroll behaviour and nothing selectable. It reads as a colophon under an
essay, which is why it supports the manifesto instead of competing with it. **Do not grow it into
a timeline section, and do not add a fourth moment without evidence of the same quality.**

The years carry themselves: `2021 · 2023 · 2025` in sequence reads as chronology on sight, so
there is **no eyebrow and no "Our Story" heading** — that is exactly the template heading §18 rules
out.

**THE "no founding date" RULE IS SUPERSEDED.** §19's earlier instruction was written when the
project believed no history evidence existed. It does exist, verbatim, in Mishram's own
`about.html`, identically in `_backup_pre_seo/about.html` and in the site's own `llms-full.txt` —
the same provenance class as the `emphasis` line this chapter already publishes. **2021 may be
published.**

Deliberately not imported from the same source sentence: its "broader vision and impact" (marketing
language, §1), any growth claim, and the non-profit arm it also names — that is held pending a
client decision (§10p).

Cost: **+212px**, absorbed by two one-step spacing reductions so About lands at **1,403px /
1.56 viewports** — in line with Project Inquiry's accepted 1.53, and still a preview rather than
a page. §10p has the arithmetic.

### The connecting idea — MOVED TO `/about` IN REVISION 16

> `DisciplineSystem.tsx` was **deleted from the homepage chapter** (§10s §6). `/about`'s
> disciplines chapter carries the same idea at full length, and `DISCIPLINES` in
> `config/about.ts` still feeds `FOOTER_EQUATION`, so the data and the footer's colophon are
> unchanged. The description below is kept as the record of what the homepage treatment was.

The hero's eyebrow reads `CREATIVE × PERFORMANCE × TECHNOLOGY`. Five chapters later the site has
demonstrated a fourth dimension, so `DisciplineSystem` was that equation with **CREATORS** written
in: one teal hairline threading four disciplines, a node at each, the hero's own `×` glyph between
them, and a rule reaching out to each caption. Typographic, not an infographic — no cards, no icons,
no four-feature grid. A real `<ul>` of real text, so the section never depended on decorative
graphics to be understood.

**No photography at all in About**, and that is the honest choice: the project has no agency, team or
behind-the-scenes imagery, and borrowing a creator portrait here would read as a team photo. The
absence also gives the page its calm chapter after five media-heavy sections. A genuine agency or
BTS photograph would slot into the right column if the client supplies one.

### Closing moment — now a bridge, not a second booking ask

A full-width hairline, then **"Let's build something worth paying attention to."** left, and on the
right the action **`Tell us what you're building ↓`** anchoring to `#project-inquiry`, with an
understated `Contact Us` beside it opening the global panel. Built from the grid, hairlines and
whitespace — no banner, no gradient, no glow.

**This was `Book a 15-Min Call` + `Contact Us` as a two-button row, and it is gone.** Once the
Project Inquiry form landed directly beneath it (§10h), About was making the page's primary booking
ask immediately above a form asking for the same thing — two conversions competing in one screen,
and the third `Book a 15-Min Call` on a page that already opens with one.

The primary action deliberately **says the next section's own headline**, so the link names its
destination rather than describing itself. Native hash navigation, no modal, no scripted scroll,
`scroll-margin-top` supplying the header clearance as everywhere else (§10g). `primaryCtaNote`
("15 min · no obligation") went with the booking button — it described the call, not the form.

**Do not turn this back into a button row**, and do not reintroduce a booking CTA here.

### Responsive

Single flowing column below `lg`: label → headline → story → emphasis → locator → discipline
system → closing CTA. The discipline rows go inline with their rule only from `xl` up — below that
the caption is wider than the column it sits in, which overflowed the page by 93px at 390 and 32px
at 1024 before the fix, so name and caption stack and the rule drops out. CTA buttons sit on one row
from `sm` and stack below it, 52px throughout, with the note attached under the pair.

Verified at 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844 in both themes and under
reduced motion: no horizontal overflow, no console errors, chapter number correct in both
Recognition states.

---

## 10h. Project Inquiry — built

`src/components/inquiry/` — `ProjectInquiry.tsx` (shell, intro, context column, grid resolve),
`InquiryForm.tsx` (state, validation, submission, every outcome state), `fields.tsx` (primitives);
copy, options, limits and the shared validator in `src/config/inquiry.ts`; delivery in
`src/app/api/inquiry/route.ts`; `.inq-*` styles in `globals.css`.

### Why it exists

The page could show everything and still leave a visitor with no way to say what they need short of
phoning or opening WhatsApp. This is the final conversion moment, and About now hands straight into
it. **Unnumbered**, like the other interludes, so Recognition keeps `06` and `ABOUT_CHAPTER` is
untouched.

Copy: `— START A PROJECT`, headline **"Tell us what / you're building."** (`building.` in serif
italic — the trailing accent the numbered chapters use), lead "Share a little about the project and
we'll figure out the most useful next step." No "fill out the form below" anywhere.

### An editorial project brief, not a lead form

Bottom rules instead of boxes, four large fields rather than fifteen small ones, hairline option rows
instead of pills, the site's own type doing the work. **No card, no 16px radius, no Typeform, no
SaaS input chrome, no CRM wall of questions.** Left column: one short paragraph and the two direct
routes out (email, WhatsApp, both from `config/site.ts`) — deliberately *not* a three-step explainer,
since §04 Work Process already owns that.

**No CTA of any kind in this section** beyond the submit button. No `Book a 15-Min Call`, no
`Contact Us` — the whole section *is* the ask.

### Fields

| Field | Required | Notes |
| --- | --- | --- |
| Your name | **Yes** | 2–80 chars |
| Email | **Yes** | 5–160, structure-checked both sides |
| Phone / WhatsApp | No | `type="tel"`; email is already a working route back, so nobody is made to give both |
| Business / Brand | No | "Company, creator or brand name" — a personal-brand client has no company to type |
| What can we help with? | No | Multi-select, real checkboxes |
| Project budget | No | Single-select. **Engagement budget, never "ad budget"** |
| When would you like to start? | No | Single-select |
| Tell us about the project | **Yes** | 10–2000 chars, counter appears in the last 240 |

Services: `Social & Personal Brand Growth` · `Influencer Marketing` · `Performance Marketing` ·
`Web & Digital Experiences` · **`Custom Software / CRM`** · `Brand Shoots & Content` ·
`Not sure yet`. Software gets its own choice even though it sits inside Web & Digital Experiences
strategically (§10) — someone looking for a CRM does not read "digital experiences" as software, and
a service list is no use if it lacks the words the visitor has in their head.

Budget: `Under ₹50K` · `₹50K – ₹1L` · `₹1L – ₹3L` · `₹3L – ₹5L` · `₹5L+` · `Let's discuss`.
Timeline: `As soon as possible` · `Within 30 days` · `1–3 months` · `Just exploring`.

**Deliberately not asked:** address, employee count, industry dropdown, revenue, account creation,
"how did you hear about us", file upload, visible captcha.

### Delivery — honest, and server-side

`config/inquiry.ts` is the single source for the copy, the allowed option values, the limits **and
the validator**, imported by both the browser and the route — so a value the client can send is by
definition one the server accepts.

`POST /api/inquiry` validates, then delivers by `fetch` against Resend's REST API. **The browser
never holds a credential and never talks to an email provider directly.** No npm package for one
HTTP call (§15). **No database, no file, no log of the message** — the route only delivers, which is
what lets the microcopy honestly say the details are used to respond and nothing else. `reply_to` is
the inquirer's address, so replying from the inbox reaches them.

| Status | `error` | Meaning |
| --- | --- | --- |
| 200 | — | Delivered, or silently swallowed as spam |
| 400 | `invalid_request` | Body was not JSON |
| 400 | `validation` | Field errors, returned in `fields` |
| 503 | `delivery_not_configured` | No key/sender/recipient |
| 502 | `delivery_failed` | The provider rejected it |

**Environment** (documented in `.env.example`, none of them `NEXT_PUBLIC_`):

- `RESEND_API_KEY` — required.
- `INQUIRY_FROM_EMAIL` — required, and **deliberately has no default.** It needs a domain verified
  with the provider; inventing `leads@mishram.media` would look configured and then fail at send
  time instead of here.
- `INQUIRY_TO_EMAIL` — optional, defaults to `CONTACT.email`, Mishram's real published address.

### Fallback, and the states

With any of the three missing the route answers `delivery_not_configured`, and the form **says so
plainly** — then offers `Continue on WhatsApp ↗`, a link carrying the whole brief built from what was
actually typed. **It never opens by itself**, and no success is ever faked. The 502 path offers the
same thing alongside a retry.

- **Success** appears *only* after a confirmed 200: "Brief received. Thanks — we'll take a look and
  get back to you." **No response-time promise** — that is Mishram's commitment to make, not the
  site's. `Send another inquiry` resets.
- **Errors never clear what was typed**, including the services and budget. A visitor who writes a
  long brief on a site whose email is not switched on yet does not lose it.
- Submitting shows `Sending…` and disables the button.

### Security and validation

Both sides run the same rules. The route re-validates untrusted JSON through `coerceInquiry`, which
**allow-lists the option ids** — a bogus service or budget is dropped rather than trusted — and
bounds every free-text field. One **honeypot** field, off-screen, `tabindex="-1"` and inside
`aria-hidden`: anything in it gets a 200 and no delivery, with no explanation returned.

**No rate limiting.** A per-process counter is meaningless on serverless and pretending otherwise
would be worse than nothing — record it as deployment hardening (provider-level or edge middleware).

### Accessibility

Real `<form>`, real `<label>` on every input, real `<fieldset>`/`<legend>` per option group, native
checkboxes and radios visually hidden but focusable (never `display: none`), correct `type` and
`inputMode` so mobile keyboards behave. `aria-invalid` + `aria-describedby` on errored fields, one
`role="status" aria-live="polite"` region for every outcome, and submit moves focus to the first
invalid field. **Every error has words** — colour is never the only signal. The one new design token,
`--color-error`, is themed (`#ff8563` dark, `#b4360f` light at 5.35:1 on parchment) because ember
alone fails as text on paper.

### The grid resolves here

`.inq-grid` masks the twelve-column scaffold out down the section — full strength at the top,
continuing About, and **gone by the bottom edge**, so the Footer starts on clean ground. §11's global
behaviour is unchanged.

**Known seam:** the current Footer still draws its own twelve-column grid, so the scaffold reappears
immediately below the fade. Removing it is explicitly part of the Footer redesign (§19), not this
task.

### Future — the inquiry pipeline

The route is delivery only, on purpose. It is the natural attachment point for a CRM, a Sheets row,
lead qualification, or a Slack notification later — and Mishram sells exactly that kind of build, so
its own pipeline is a reasonable first case. **Not built, and not to be built as part of a homepage
task.**

### Verified

Every route branch exercised directly: invalid JSON, empty body, bad email, short and over-length
message, bogus option ids (dropped), honeypot (200 with no delivery — proven because the identical
payload without it returns 503), unconfigured, and delivery failure. Every UI state driven in the
browser: required validation with focus moving to the first problem, invalid email, multi-select
services, optional fields left empty, values preserved across failures, the WhatsApp fallback
carrying the full brief, a stubbed 200 success, and a stubbed 502.

Section is **1377px at 1440×900 (1.53 viewports)** — a little over the 1.4 guidance, and left there
rather than cramping 48px touch targets or dropping a field. Verified at 1440×900, 1280×800,
1024×768, 768×1024, 430×932 and 390×844 in both themes and under reduced motion: no horizontal
overflow, no console errors, option rows ≥48px everywhere, services one column on a phone and budget
and timeline paired.

---

## 10g. Navigation, anchors and the Footer — rebuilt

> **SUPERSEDED IN PART BY §10k (Revision 09).** The anchor map, the native hash behaviour and
> `useHashLanding` below are all current. **The Footer described here is V1 and has been replaced** —
> see §10k for Footer V2, which keeps the inverted obsidian field and the opening trace, demotes the
> wordmark to a left-aligned signature roughly a third of the size, and adds contact, navigation,
> service routes, socials and legal links.

`src/components/Footer.tsx`, copy in `src/config/footer.ts`, navigation and socials in
`src/config/site.ts`, active state in `src/hooks/useActiveSection.ts`, deep-link correction in
`src/hooks/useHashLanding.ts`. Two CSS rules in `globals.css`; no new component CSS at all.

### The anchor map — one list, three surfaces

`NAV_ITEMS` in `config/site.ts` is the **only** navigation source. The header, the mobile menu and
the footer all render it, so there is no second routing layer and no way for them to disagree.

| Label | Anchor | Section |
| --- | --- | --- |
| Work | `#work` | 05 / Selected Work — **not** Selected Collaborations |
| Services | `#what-we-do` | 02 / What We Do (labelled "Services": the word a visitor scans for) |
| Creators | `#creators` | 03 / Creators |
| About | `#about` | About |

Plus `TOP_ANCHOR = "#hero"` for the skip link and the footer's back-to-top.

Every ID already existed on a section root; **nothing was renamed and no ID was added**, so no
section component changed. `#collaborations`, `#process` and `#recognition` exist too but are
deliberately **not** navigation destinations — they are chapters of the page, and listing them
would flatten a four-item hierarchy that is intentional.

### Behaviour — native, and nothing else

Plain `<a href="#…">`. No click handler intercepts them, no wheel handling, no scroll library, no
custom routing. The URL takes the hash normally and back/forward work.

- **Smooth scrolling** is `scroll-behavior: smooth` on `html`. The reduced-motion block at the end
  of `globals.css` already forces `scroll-behavior: auto !important`, so a visitor who asks for
  reduced motion gets an instant jump — verified, not assumed.
- **Fixed-header clearance** is one CSS rule: `section[id] { scroll-margin-top: calc(var(--header-h)
  + 12px) }`. It covers every section at once and tracks `--header-h` at both its values, so there
  is **no pixel arithmetic in JavaScript**. Measured: every anchor lands with its section top at
  90px (desktop) / 78px (mobile), chapter label at 231px — clear of the header.

### Deep links needed one correction, and why

A hash already in the URL at load is scrolled by the browser against the **server-rendered** page,
and hydration then changes the height underneath it: `useDesktopSequence` resolves `false` on the
server, so the HTML ships §02's stacked chapters and hydration swaps in the pinned track — **2,247px
taller at 1440×900**. `/#about` landed 2,250px short.

`useHashLanding` repeats the browser's own `scrollIntoView` (instant, `block: "start"`, so
`scroll-margin-top` still supplies the clearance) whenever the document height changes, until it
stops — capped at 1.6s, cancelled by any wheel/touch/key input, and it only runs when the URL
arrived with a hash. **In-page clicks never reach it**; by then the height is settled.

Verified: `#hero`, `#what-we-do`, `#creators`, `#work` and `#about` all land at exactly the same
position as an in-page click, with the correct nav item lit.

### Active navigation state

`useActiveSection` — **one IntersectionObserver, no scroll listener, no React state per scroll
pixel.** `rootMargin: "-45% 0px -55% 0px"` collapses the root to a horizontal scan line at 45% of
the viewport, and the sections are contiguous siblings, so only one crosses it at a time.

Two decisions:

- **Nothing on the line holds the last reading.** Hero, Collaborations, Work Process and the Footer
  are not destinations; scrolling through them keeps the previous item lit rather than blanking the
  header and lighting it again a moment later. `hero` *is* observed, and matches no nav item — which
  is how the header stays genuinely neutral at the top of the page instead of asserting a section
  the visitor has not reached.
- **At a boundary the later section wins**, resolved in document order, so the section being scrolled
  into takes it rather than the one being left.

Treatment is the header's existing language: the index goes teal, the label to full ink, and the
hairline the hover state already draws is held open in teal. No pill, no background, no glowing tab.
`aria-current="true"` tracks it. The mobile menu shows the same state as a teal index and a teal
rule under the label.

Verified under a stepwise scroll of the whole page in real Chrome: neutral → Services → Creators
(held through Work Process) → Work → About (held through the Footer), reversing cleanly on the way
back up, with exactly one item active at every position and never two.

### Mobile menu

Already-approved design, now wired: the four links point at the real anchors, `onClick` closes the
menu and the browser then performs the hash navigation against a page the menu is no longer
covering. Verified at 390×844 — menu opens with the scroll lock on, tapping any item closes it,
releases the lock, sets the hash and lands the section at 78px.

### Footer concept — THE FINAL SIGNAL

**Superseded by Footer V2 — §10k.** Kept here as the record of what V1 was and why.

**The editorial colophon that stood here has been replaced.** It continued the page's twelve-column
grid, read as one more informational band, scattered small text, and repeated `Book a 15-Min Call` —
so the site ended by restating itself rather than signing off.

The concept now is the page resolving. It begins highly structured; §10h fades the twelve-column
scaffold to nothing by its bottom edge; here the scaffolding is gone entirely and what remains is
the brand. **Creative-studio colophon × oversized brand poster × the final frame of a film** — not a
corporate footer, and **not another conversion block**: the Project Inquiry form above is the ask.

**DELIBERATE INVERSION.** `.ftr` redefines the theme's **`--color-*`** names to their dark values on
itself, so the whole subtree flips and every semantic class inside keeps working untouched. On the
parchment homepage that is the dark back cover of a printed annual. In dark mode the palette is
already right, so the footer separates itself by composition instead — no grid, more air, and type
at a scale nothing above it uses. **No second arbitrary dark shade**; the values are the dark
theme's own.

**Gotcha worth keeping.** Overriding `--t-*` here does *nothing*. `@theme` declares
`--color-ink: var(--t-ink)` on `:root`, so the `var()` is substituted there and the *resolved* value
is what inherits down. It has to be the `--color-*` names, which every Tailwind utility resolves at
the element. The first attempt overrode `--t-*` and the footer stayed parchment.

**No twelve-column background anywhere**, no `.bg-grid`, and **no `border-top`** — the boundary is
the transition, not chrome. The alignment is still a CSS grid; it just is not drawn. The only rules
are content-specific. One very low radial tonal lift keeps the full-bleed field from reading flat,
plus the site's existing `.grain` — no texture asset.

| Region | Content |
| --- | --- |
| Marker row | `MISHRAM MEDIA / INDIA` left, `Back to top ↑` right |
| Contact | `GET IN TOUCH`, then the **email as the largest functional element** (clamping to 24px), with phone and `WHATSAPP ↗` beneath |
| Navigate | The four `NAV_ITEMS` as `01 / Work` … |
| Follow | The verified social icons |
| Closing mark | The Mishram wordmark at poster scale |
| Colophon | `© <year> Mishram Media` and the discipline equation |

Height is **851px at 1440×900** — above the 650–800 guidance, and left there because the closing
mark is the point of the section and shrinking it to hit a number would defeat the redesign. 916px
at 768, ~1110px on a phone.

### The Inquiry → Footer transition

§10h's grid reaches zero at its own bottom edge. The footer opens with **one short teal trace
descending from the boundary into the dark field, resolving into a 3px dot** — the last structural
line arriving and becoming a signal. Verified at the seam: the inquiry's rules are gone before the
boundary, the footer draws **zero** grid lines and has **no border-top**, so there is no moment where
the grid fades and then reappears. That reappearance was the whole reason §10h's fade existed.

**Reduced-motion gotcha, and a real bug it caught.** The signal draws by animating **height**, not
`scaleY`. `MotionConfig reducedMotion="user"` strips transform animations, and `initial` is read once
at hydration — when `usePrefersReducedMotion` is still returning its server snapshot of `false`. The
`scaleY` version therefore mounted at 0, never animated, and left the signal permanently invisible
for exactly the visitors who were promised a static one. Height is not a transform, so it survives.
The same reasoning is why About's lead-in animates height.

### The closing mark

The real Mishram wordmark, reused as a CSS mask exactly as the header does — the brand's own artwork
at poster scale, never a substitute logotype.

**It is an integrated wordmark, not a stacked lockup:** MISHRAM with a studio light built into the
first M, headphones over the A, and two diagonal slashes, so its ink spans the full 420×199 box.
**Cropping its lower edge removes the word and leaves only the light** — the first attempt did
exactly that and produced an unreadable blob.

One aspect cannot be both full-bleed and short, so there are two art directions:

- **≥640px — height-driven.** `clamp(200px, 26vw, 292px)`, mark complete, 616px wide at 1440. That
  lands in the 12–18vw the closing frame wants.
- **<640px — width-driven.** `138%`, so the mark genuinely runs off **both** edges and the outer
  slashes crop. On a phone the poster reading is earned rather than forced.

**The one signature interaction:** a teal band inside the letterforms tracking the pointer. The mark
is a mask filled with a gradient, so the band only ever appears *within* the mark; moving it sets one
custom property — no layout, no re-render. At rest the default position sits off-canvas, so the mark
is plain ivory. **Off entirely under reduced motion and for non-mouse pointers.** Verified: `--ftr-x`
tracks 25% → 75% and clears on leave, and never appears at all under reduced motion.

### Social — icons, and only verified destinations

The three marks are **inline SVG**, one family: each platform's mark inside the same rounded square,
on the same 24px grid at the same 1.5 stroke. **No icon dependency** for three symbols (§15), and
inline paths inherit `currentColor` so they stay in the Mishram palette — **never a platform's own
blue, pink or gradient**, on hover or otherwise.

48px tile, 20px glyph. At rest a graphite hairline; on hover or keyboard focus the border and icon go
teal, the icon lifts 2px, and the platform name reveals beneath through an **absolutely positioned**
label, so the row never moves. Every link carries `aria-label="Mishram Media on <Platform>"`,
`target="_blank"` and `rel="noopener noreferrer"`.

| Platform | URL | Evidence | Rendered |
| --- | --- | --- | --- |
| Instagram | `instagram.com/mishram.media` | The old site's schema.org `sameAs`, its footer and its contact page | **Yes** |
| Facebook | `facebook.com/mishram` | Same — `sameAs` on every page, plus both social rows | **Yes** |
| LinkedIn | **none** | Only ever `https://linkedin.com` — a bare domain, no profile path, absent from `sameAs`, sitting in the purchased template's social row beside an identical bare `twitter.com` | **No — suppressed** |

`sameAs` is the structured-data field for an organisation's own official profiles, so a URL declared
there is Mishram stating it about themselves. That is what promoted Facebook; LinkedIn has no such
declaration anywhere.

`SOCIAL_URLS` in `config/site.ts` holds all three keys, LinkedIn as `null`. **A null renders
nothing** — no icon, no disabled control, no `href="#"`. Filling the URL in makes the icon appear
with **zero component edits**; `SOCIAL_LINKS` is derived from it and never hand-edited.

### Footer data — all of it from shared config

| Rendered | Source |
| --- | --- |
| Email / Call / WhatsApp | `CONTACT` in `config/site.ts`, as `mailto:` / `tel:` / `whatsappHref(GENERAL_WHATSAPP_MESSAGE)` |
| Navigation | `NAV_ITEMS` |
| Socials | `SOCIAL_URLS` → `SOCIAL_LINKS` |
| Locator | `BRAND.locator` = `India` |
| Equation | `DISCIPLINES` in `config/about.ts`, joined with ` × ` |

**NO BOOKING CTA.** `FOOTER_COPY.bookingCta` is deleted and `bookingHref` is no longer imported here.
`Book a 15-Min Call` now appears **exactly once on the rendered homepage, in the Hero** — verified by
walking the page. Do not add one back.

`INDIA` stays the public locator, for the reason in §10f. **No city.**

**No dead links anywhere.** Ten footer destinations, all real: `#hero`, `mailto:`, `tel:`, the
WhatsApp deep link, the four section anchors, Instagram and Facebook. No privacy or terms route
exists, so none is implied. The year is `new Date().getFullYear()`, resolved at build time.

### Responsive

| Width | Behaviour |
| --- | --- |
| ≥1024px | Contact on `col-span-5`, Navigate and Follow to its right, asymmetric — invisible grid |
| 768–1023px | Two functional columns, closing mark beneath |
| <768px | One column: marker → contact → navigate → follow → cropped mark → colophon |

The mark switches art direction at 640px (see above). Social tiles are 48px at every width; nav rows
and the direct links carry their own padding.

Verified at 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844 in both themes and under
reduced motion: **zero grid lines drawn, no `border-top`, no booking CTA, and no horizontal page
overflow at any of them** — the mark's overhang is clipped by the footer's own `overflow: hidden`.

Accessibility, verified with real Tab presses rather than programmatic focus: every footer control
matches `:focus-visible` and takes the site's 1px teal ring at 3px offset, which reads clearly on
the obsidian field. Tab order is Back to top → email → phone → WhatsApp → 01–04 → socials. Focusing a
social tile reveals its platform name, so the icon is never the only label. Full-page pass in both
themes: no console errors.

---

## 10i. Homepage final review (Revision 06)

A full end-to-end pass of the rendered page — Hero through Footer, both themes, seven viewports,
reduced motion — rather than a code read. Audit first, then fix; only Critical and Important were
implemented.

### The page as measured

**16,296px at 1440×900 — 18.1 viewports.** 02 / What We Do is 7,450px of that (8.3 viewports, 46% of
the page), which is the pinned sequence doing exactly what `SERVICE_SCROLL_VH` says. Every other
chapter sits between 0.95 and 1.5 viewports, so the rhythm the page was designed around does hold in
the render: one immersive chapter, then a run of one-viewport chapters at different densities.

Section boundaries are **0px** — no phantom gaps, and nothing left behind by the two suppressed
sections. The empty run at each boundary is 256px, which is two standard `lg:py-32` paddings meeting.
That is the design system, not accidental space, so it was left alone.

### Fixed

**CRITICAL — three below-the-fold images carried `priority`.** Service 01's Nikita portrait, Creators'
opening Zoya portrait (~9,500px down) and Selected Work's featured poster (~11,800px down) were each
emitting a `<link rel="preload">` and an eager fetch on first load, competing with the Hero for
bandwidth before the visitor had scrolled a pixel. Both of the standing Next LCP warnings were these.
Removed from all three; the Hero's WebGL fallback keeps its own.

Verified on a first load with no scrolling: **zero priority images, zero eager images, zero image
preload links, and both LCP warnings gone.** All 23 images keep their `sizes`.

**IMPORTANT — the serif accent had become a template.** Every one of eight consecutive sections
carried an italic Instrument Serif word, which is the opposite of what §4 gives the serif to. 04 /
Work Process lost its: "momentum." also heads the Mishram Difference two sections earlier, so one
edit removed an accent echo and a word echo together. Seven sections keep an accent, with a
deliberate gap at §04.

**IMPORTANT — `Discuss this project ↗` × 5.** One per service chapter. On the pinned path only one
shows at a time, but the stacked path puts five identical actions down 4,500px, where it reads as
boilerplate rather than an offer. Demoted from full ink to `ink-soft` with a hover return: the lead
path is intact, it just no longer competes with the copy it sits under.

**IMPORTANT — Footer slack.** Trimmed 48px of padding around the closing mark (marker row, the gap
above the mark, the colophon), **without touching the wordmark**: 851 → **803px** desktop and 1,110 →
**1,070px** mobile. The mark is still 292px tall and 616px wide on desktop, still cropped on a phone.

### Left alone, deliberately

- **The 256px chapter boundaries.** Consistent, and the product of the shared padding scale.
- **`02 / WHAT WE DO` appearing twice** for one screen as the sticky panel pins. The panel's label is a
  persistent chapter marker across 6,750px of pinned scroll, and the intro's label is the chapter
  opener; both earn their place. Polish at most.
- **Selected Work's sparse right column.** A composition consequence of three honest entries and no
  reels. Architecture is right; the fix is content.
- **Project Inquiry at 1,377px / 1.53 viewports**, against a 1.3–1.5 target. Roughly 60px over, and
  every remaining candidate is either a specified field or a 48px touch target. Left, rather than
  cramped to hit a number.
- **The three.js `Clock` deprecation warning.** It comes from `new THREE.Clock()` inside
  `@react-three/fiber`'s own store (`dist/events-*.esm.js`), not from this codebase — reading
  `state.clock` or not makes no difference. No safe local fix; it clears when R3F ships a release
  built on `THREE.Timer`. **Do not attempt a three.js migration for it.**
- **Recognition's `priority` flag.** Same class as the bug above, but the section renders nothing, so
  it is not a live issue. Worth removing whenever that section is populated.

### Verified in this pass

| | |
| --- | --- |
| Booking CTA | `Book a 15-Min Call` appears **exactly once**, in the Hero |
| WebGL | **1 canvas**, Hero only. **0 videos** anywhere |
| Overflow | No body overflow at 1440×900, 1440×768, 1280×800, 1024×768, 768×1024, 430×932 or 390×844 |
| Suppressed sections | No wrapper, no phantom spacing; About still reads `06 / About` |
| Navigation | Under continuous scroll: neutral → Services → Creators → Work → About, held through Inquiry and Footer. All four anchors land at 90px |
| Reduced motion | Full page at 1440 and 390: nothing missing, no zero-size traces, footer intact |
| Accessibility | One `h1`; 8 `h2`; H3s correctly nested inside §02; every image has `alt`; form errors and honeypot intact |
| Creators | Hover previews, click locks, leaving restores, focus/Enter — unaffected by the priority change |

The only overflow found anywhere is the documented `svc-surface` tilt overhang (≤19px at 430),
clipped by `body { overflow-x: hidden }` and already recorded in §19 as a non-defect.

**One measurement worth recording rather than chasing:** on a first load ~11 creator-image requests
fire before any scroll. Five are the Hero's own WebGL textures, which it genuinely needs; the rest are
Chrome pulling lazy images in early under dev-server conditions. No preload links and no priority
flags remain, so the actionable part is fixed. Worth one look against a production build if load time
is ever measured properly.

---

## 10j. THE SERVICE PAGE SYSTEM — shared architecture, and the first page built

`src/config/service-pages.ts` (registry + the shared section vocabulary),
`src/config/service-social.ts` (this page's words), `src/components/service-page/*` (the shared
primitives), `src/components/service-page/social/*` (this page's own compositions),
`src/app/services/social-personal-brand-growth/page.tsx` (the route). `.svp-*` styles in
`globals.css`.

**Built and live: `/services/social-personal-brand-growth` (§10j), `/services/influencer-marketing` (§10l) and `/services/performance-marketing` (§10m). The other two routes do not exist.**
No placeholder page, no "coming soon", and nothing anywhere links to them — see *Prev / next* below.

### THE PUBLIC ROUTE INVENTORY (Revision 08)

Read off `src/app/**` rather than off this document, because a plan is not a
route. **Two public pages exist. That is the whole site.**

> **Now seven — §10k (Revision 09) added `/privacy`, `/terms` and `/cookies`; §10l (Revision 10)
> added `/services/influencer-marketing`; §10m (Revision 11) added
> `/services/performance-marketing`.** The two rows below are still accurate; the current inventory
> is the table in §10k.

| URL | File | Purpose | Discoverable from |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | The homepage — nine sections | Header wordmark, every footer/header anchor, the service page's breadcrumb |
| `/services/social-personal-brand-growth` | `src/app/services/social-personal-brand-growth/page.tsx` | 01 / Social & Personal Brand Growth service page | `02 / What We Do`, Service 01's `Explore service ↗` |

**Not pages, and deliberately not linked as such:**

- `src/app/api/inquiry/route.ts` — a route handler. It has no UI, it is reached
  only by the form's `fetch`, and it must never appear in navigation.
- `/_not-found` — Next's built-in 404, which shows in build output. No
  `not-found.tsx` is authored.

**There are no internal, development, debug, design-lab or preview routes**, and
nothing is hidden behind a route group. Verified: no `src/pages`, no
`middleware`, no rewrites in `next.config.ts`, no `(group)`, `[dynamic]`,
`@parallel` or intercepting segments, and no static HTML in `public/`.

**There is no `/services` index page.** Nothing links to one, and the service
page's breadcrumb points at `02 / What We Do` rather than implying one exists.

### Homepage Service 01 → its service page

`02 / What We Do` is the discovery layer for service routes. Service 01's copy
column now carries **two contextual actions on one row**:

| Action | Job | Weight | Target |
| --- | --- | --- | --- |
| `Explore service ↗` | Information | Full `ink` | `/services/social-personal-brand-growth` |
| `Discuss this project ↗` | Conversion | `ink-soft`, the §10i treatment, unchanged | The global contact panel |

They are separated by the site's own hairline rather than a second button, and
`Explore service` takes the heavier ink **because it can never become
boilerplate** — it only appears on a service that has a page, where the other
action appears five times. `Explore service` is a real `<a>` (Next `Link`,
client-side, so Back returns to the homepage naturally); `Discuss this project`
stays a `<button>` opening the panel. **No clickable divs, and the service title
stays typography rather than becoming a giant invisible link** — the explicit
action is the better affordance.

**One row, not two, and that is load-bearing.** The pinned panel gives the copy
a fixed `h-[22rem]` holder (§11); a second row would push the block into the
progress indicator beneath it. Measured, the action row is **20px and the copy
block 355px — byte-identical to before this change**, because `.svc-action`
pins `line-height: 1.5`, which is exactly what Tailwind's `text-[0.8125rem]`
paired with the action that stood there. (Service 04's copy has always been
378px in that holder — a pre-existing 26px, absorbed by the `mt-8` gap below it.
Not introduced here.)

**Touch targets are gated on `data-sequence`**, the attribute §10 already uses
for the scene annotations: `padding-block: 0.85rem` on the stacked path gives a
47px target at 390, and `0` on the pinned path, which is mouse-only territory by
definition (`min-width: 1280px`, landscape) and has no room to spare.

### The service-link architecture — one flag, no dead links

**`servicePageHrefFor(serviceId)` in `config/service-pages.ts` is the whole
mechanism.** It returns the path of a service's page only when that entry is
`built: true`, and `ServiceCopy` renders `Explore service ↗` only when a href
comes back.

```ts
const pageHref = servicePageHrefFor(service.id);   // undefined ⇒ no action
```

Consequences worth keeping:

- **An unbuilt service can never render a dead link.** Services 02–05 show only
  their existing contextual action, and will keep doing so until their routes
  exist. **No `Coming Soon`, no disabled control, no placeholder route.**
- **Shipping the next page is one `built: true` plus its `metadata`.** The
  homepage link, the prev/next rail and the page's own SEO all switch on
  together. **No component edit, and no `if (service.id === …)` anywhere.**
- **The URL is written once.** Deliberately derived rather than copied onto
  `config/services.ts` as a `pageHref` field — two configs holding the same URL
  is exactly how a navigation layer starts to drift.

### Header active state on a service route

`Services` lights while the visitor is inside `/services/...`, resolved **from
the URL, not from an observer**:

- On `/`, `useActiveSection(SECTION_ORDER)` behaves exactly as §10g describes —
  unchanged.
- Off `/`, the observer is handed a stable empty list and never attaches; there
  are no homepage sections to watch. `isServiceRoute(pathname)` then resolves
  the active item to `SERVICES_ANCHOR`.
- `SERVICES_ANCHOR` (`#what-we-do`) is declared once in `config/site.ts` and
  used by `NAV_ITEMS`, by the header's active state and by the service page's
  breadcrumb — three consumers, one string.

Verified on the route: `Services` carries `aria-current="true"`, the other three
carry nothing, and the treatment is the header's existing one (teal index, full
ink label, teal hairline held open). **No fifth nav item was added**, and the
Footer was not turned into a sitemap — both keep the approved four.

### The service page's back-context

The hero eyebrow **is** the breadcrumb rather than a second row above it:

```
SERVICES / SOCIAL & PERSONAL BRAND GROWTH
```

A real `<nav aria-label="Breadcrumb">` with an `<ol>`; only `SERVICES` is
actionable, and the current page carries `aria-current="page"`. The chapter
index that used to open this line is gone — a dedicated route needs a way back
to the chapter it came from more than it needs to repeat that chapter's number,
and `resolveServicePage` no longer computes an `eyebrow` string.

`SERVICE_PARENT` in `config/service-pages.ts` supplies both halves, and takes
its label and destination from `NAV_ITEMS`, so the crumb can never disagree with
the header above it. **Plain `<a href="/#what-we-do">`, not `<Link>`** — §10g's
rule: only a real navigation re-runs `useHashLanding`, which is what corrects
the landing after the homepage's hydration changes its height.

**No bulky breadcrumb bar, and no `/services` index implied.**

### Route strategy

| Route | Service | State |
| --- | --- | --- |
| `/services/social-personal-brand-growth` | 01 Social & Personal Brand Growth | **Built** |
| `/services/influencer-marketing` | 02 Influencer Marketing | **Built** — §10l |
| `/services/performance-marketing` | 03 Performance Marketing | **Built** — §10m |
| `/services/web-digital-experiences` | 04 Web & Digital Experiences | **Built and public** — deferred by §10o, built section by section across §10v / §10w / §10x, published in §10y, positioning chapter added in §10z |
| `/services/brand-shoots-content` | 05 Brand Shoots & Content | **Built** — §10n |

`SERVICE_PAGES` carries all five with a `built` flag, mirroring `config/services.ts`. It is
deliberately **thin** — slug, which homepage service it expands, which inquiry option it
preselects, `built`, and (once built) its metadata. Title, chapter index and the hero eyebrow are
**derived** from `SERVICES` by `resolveServicePage`, so a service name is never written twice and
can never drift from the homepage.

### What is shared, and what stays unique

The line is drawn on purpose: **shared = the system; unique = the story.**

| Shared primitive | What it owns |
| --- | --- |
| `ServiceSection` | Section wrapper, `aria-labelledby`, one padding scale, grid mode |
| `ServiceSectionHead` | Teal rule + label, two-line clipped headline, optional serif accent, lead |
| `ServiceGrid` | `full` / `edges` / `none` — the page's grid rhythm |
| `ServiceHero` | Breadcrumb, `h1`, lead, detail, CTA hierarchy, entry choreography, `id="hero"` |
| `ServiceStatement` | The calm editorial beat: headline, two paragraphs, a baseline of terms |
| `ServiceSystem` | N pillars on one spine, with the spine returning at the foot |
| `ServiceScope` | The typographic scope index + active detail |
| `ServiceAudience` | One statement plus a restrained audience rail |
| `ServiceProcess` | Four steps on a hairline, each opening with a teal tick |
| `ServiceFaq` | Hairline disclosure rows, real `button` + `aria-expanded` |
| `ServicePageNav` | Previous / next service — renders nothing until a second route exists |

Each page still brings its **own hero composition, its own signature interaction and its own proof
section** as ordinary React components. `ServiceSectionCopy`, `ServicePillar`, `ServiceScopeItem`,
`ServiceStep` and `ServiceFaqItem` describe *copy*, never visuals — which is what stops five service
pages becoming one JSON template rendered five times. **Do not extend the config types to describe
layout.**

### Section rhythm, and the grid moving with it

```
hero            high / structured grid
positioning     calm / grid reduced to its outer columns
brand system    structural / no grid — the spine is the structure
content board   interactive / no grid
scope           structured / full grid
creator proof   photographic / no grid
who it's for    calm / grid reduced
process         structural / full grid
FAQ             practical / no grid
inquiry         conversion / grid resolves to nothing by the footer boundary
footer          the existing Final Signal, unchanged
```

Measured at 1440×900: **9,921px — 11.0 viewports including the Footer, 10.1 for `<main>` alone.**
A little over the 7–10 guidance and left there: the boundaries are one constant padding scale
(`py-24 md:py-28 lg:py-28`, deliberately one step tighter than the homepage's `lg:py-32` because
this page has ten sections rather than a pinned sequence), and every remaining section is between
0.6 and 1.5 viewports. Nothing is padding to hit a number.

### Service-page CTA rules

Different from the homepage's, and deliberately so — a service page is a conversion surface that a
visitor may land on cold.

- **`Book a 15-Min Call` appears exactly once**, in the hero. Verified on the rendered page.
- **`Start a Project`** sits beside it and is an in-page anchor to `#project-inquiry`.
- **Mid-page: one contextual text link only** — `Explore our creator network ↗` → `/#creators`.
- **The foot is the inquiry form.** No booking CTA after a section, ever.
- §13's homepage rule (`Book a 15-Min Call` exactly once on `/`) is a **homepage** rule; what
  carries to a service route is the restraint, not the count.

### Inquiry integration — one form, one endpoint

The service page renders the **same `ProjectInquiry` section, the same `InquiryForm` and the same
`POST /api/inquiry`.** No fork, no second form architecture, no second route. Three optional props:

| Prop | Effect |
| --- | --- |
| `initialServices` | Seeds the service checkboxes. Allow-listed through `preselectedServices` in `config/inquiry.ts`, exactly as `coerceInquiry` allow-lists the wire |
| `note` | A small label beside `Start a project` naming the service |
| `context` | Replaces the general context paragraph with a route-specific one |

**Preselected, never locked.** They are ordinary checkboxes from the first render — verified: the
route opens with `social` ticked, it can be unticked, another can be added, and `Send another
inquiry` returns the form to the state the route opened in rather than a blank one it never had.
The headline stays *"Tell us what you're building."* on every surface.

### Navigation from a subpage

`NAV_ITEMS` stays the single navigation source. Every href now goes through `sectionHref` /
`useSectionHref`: a bare fragment on `/`, `/#section` everywhere else. The header, the mobile menu
and the footer all use it — **no second nav config, and the homepage's markup is unchanged.**

Two decisions worth keeping:

- **Plain `<a>`, never `<Link>`, for anything carrying a hash.** A client-side navigation to
  `/#work` would scroll before the homepage's hydration changes its height — the 2,247px problem
  §10g documents — and only a real navigation re-runs `useHashLanding` to correct it. A plain route
  link with no hash (`Explore service ↗` → `/services/...`) has no such constraint and uses `Link`.
- **Every service page's opening section is `id="hero"`.** That makes the layout's skip link and the
  Footer's back-to-top work off the homepage with no change to either.
- **Active state off the homepage comes from the URL** — see *Header active state on a service
  route* above. `Services` lights on `/services/...`; the IntersectionObserver is not attached
  there at all.

Verified from the route: `Work → /#work`, `Services → /#what-we-do`, `Creators → /#creators`,
`About → /#about`, logo `→ /`, `Contact Us` opens the global panel, footer identical, back-to-top
and skip link both in-page, breadcrumb `SERVICES → /#what-we-do`.

**Dead-link audit (Revision 08), run against both rendered pages.** Every `<a href>` collected and
resolved: all in-page hashes have a matching element; `/`, `/#work`, `/#what-we-do`, `/#creators`,
`/#about` and `/services/social-personal-brand-growth` all return **200** with the fragment's id
present in the served HTML; the rest are `mailto:`, `tel:`, WhatsApp, Instagram and Facebook.
**Nothing anywhere points at an unbuilt service route.** Browser Back from the service page returns
to `/` naturally, with the header's anchors back to bare fragments and the WebGL hero remounted —
no history handling was written.

### Prev / next service — built, and now rendering

`adjacentServicePages` reads `BUILT_SERVICE_PAGES`, so a neighbour whose route does not exist comes
back `null`. **Three pages are built, so the rail now renders on all three** — 01 shows only a next,
03 shows only a previous, and 02 shows both. With one page built it returned `null` and was absent
from the DOM entirely — the same honesty as Recognition and Client Notes. Do not add a placeholder link.

### Responsive strategy

Shape first, device classification second, as §11 has it. Two JS-driven switches, both on
`(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` — the same query §10a and §10c use — mirrored by
`data-layout` on the element so the CSS and the layout in use cannot disagree:

| | Wide | Otherwise |
| --- | --- | --- |
| Scope index | Index left, one large detail beside it | Rows expand in place |
| Content board | Index left, board right | Board first, then a tap-selectable rail |

Everything else is pure CSS. The hero stacks copy-then-composition below `lg`; the system's pillars
go from a two-column row to a block; the audience rail is 5 → 2 → 1; the process is 4 → 2 → 1; the
creator field is 5 → 3 → 2 across.

Measured, both themes: **no horizontal overflow at 1440×900, 1280×800, 1024×768, 768×1024, 430×932
or 390×844.** The only overhang anywhere is the Footer's deliberately cropped wordmark, clipped by
the footer's own `overflow: hidden` and already recorded in §10g. Every row is ≥48px (scope 58,
board 84, FAQ 65) and the hero CTAs are 52px throughout. At 390 the creator frames are 167px wide,
two across — meaningful photography rather than five thumbnails.

### SEO / metadata architecture

Page metadata comes from the registry, so it is written once per route and never drifts.

- **Title:** `Social & Personal Brand Growth` — the layout's `%s — Mishram Media` template supplies
  the brand, so the rendered title is **`Social & Personal Brand Growth — Mishram Media`.** (An em
  dash rather than a pipe, matching the rest of the site.)
- **Description:** *Social media management, personal branding, creator growth and content systems
  built to turn attention into a brand people recognise.* (136 characters.)
- `alternates.canonical` and an `openGraph` block, both derived from the same fields.
- **Positioning only.** No "#1", no "best agency", no "guaranteed growth", no "10X" (§1).

The route is **statically prerendered** — confirmed in the production build output.

### Social & Personal Brand Growth — the visual concept

**THE BRAND SIGNAL** (`social/BrandSignal.tsx`). The hero composition, and the page's thesis in one
image: *identity → system → recognition.*

One creator (Zoya Jaan, from the verified roster) anchors it as a 3:4 portrait. Around her the
**same identity resolves into the formats a brand is actually made of** — a 9:16 frame, a 4:5 frame,
an abstract positioning fragment and a publishing-rhythm fragment — with one continuous signal
circling the whole arrangement behind them and a short teal segment travelling it.

- **Deliberately not the homepage's Service 01 scene.** That one is three *different* creators
  around a planning surface, because §02 is introducing a category. This is *one* creator resolving
  into three formats, because the page is about one person becoming recognisable. Same grammar,
  different sentence.
- The three crops are `resolveFrame(zoya, portrait|reel|content)` — §03's own tuned art direction
  and its `--crt-zoom` / `--crt-origin` mechanism, reused rather than re-guessed.
- **No WebGL.** The homepage Hero remains the site's only 3D moment (§12). This is DOM, CSS, one SVG
  and Motion.
- Composition is percentages of a **fixed-aspect box** (`100 / 109`) — the `.svc-stage-box` lesson
  from §10 without the scroll machinery. Verified identical at 1440 and at 390: portrait 3→49%,
  reel 56→83%, content 62→92%, positioning 1→45%, rhythm 47→81%, nothing past 92% right or 97.7%
  bottom.
- Fragment padding and gaps are **percentages of the fragment's own width**. Fixed rem padding held
  at 1440 and clipped the publishing ticks at 390, where the fragment is a third the size.

**THE CONTENT SYSTEM BOARD** (`social/ContentSystemBoard.tsx`) is the page's one interactive moment:
five pillars — Positioning, Education, Personality, Proof, Community — and a board that reconfigures
into whichever one is selected. Hover previews, click locks, leaving restores the lock, previews
debounced 90ms, `aria-current` on the lock and never the preview (`useHoverLock`, §10c). Every
pillar's sentence is real DOM text at all times, and all five are mounted in one grid cell so the
block holds the height of the longest and switching never shunts the page (§10d-notes).

The board is a fixed **7/5** box and every state draws into `viewBox="0 0 140 100"` — the same
ratio — so strokes stay uniform hairlines and no state needs re-checking at a second viewport.

**The connected system** (`ServiceSystem`) is four editorial rows hanging off one spine, with the
spine turning at the foot and an arrow pointing back to the top: the loop is the argument, so it is
drawn rather than described. It is **deliberately not interactive** — two selectable sections in a
row would make a visitor work for four sentences, and the board is where the interaction budget
goes. The return arc is a fixed-size SVG rather than a percentage-scaled one, because a
`preserveAspectRatio="none"` path shears its stroke (§10a).

### Content integrity on this page

Nothing on this route claims anything the project cannot evidence.

- **No follower figures, growth percentages, reach, engagement, ROI, campaign results, testimonials
  or named brand relationships** anywhere.
- **No fake social UI.** No profile chrome, feed, follower count, likes, comments or metric in any
  board state or hero fragment. Every composition is structure — hairlines, frames, format labels —
  and the only photography is the creator roster's own.
- **The proof section claims exactly what the homepage claims about the same portraits:** they are
  creators in the Mishram Media network. `SELECTED CREATORS FROM OUR NETWORK`, real names from
  config, and a caption saying so. §10b's verification pass closed off every figure; none has
  reappeared here.
- The hero carries a factual attribution line — `PICTURED — ZOYA JAAN, MISHRAM CREATOR NETWORK` — so
  the composition cannot be read as a case study.
- Every capability listed in the scope index is one §1 already states Mishram offers.
- **Who it's for narrows the claim** rather than widening it: *"Not every business needs this."*
- FAQ answers are factual and **promise no result**.
- §9 brand safety: no excluded category appears in any state, hidden or otherwise.

### Accessibility

One `h1`; eight `h2`s; `h3`s correctly nested under the system pillars, the process steps and the
FAQ. Every section but the hero carries a resolving `aria-labelledby`; the hero uses `aria-label`,
as the homepage's does. Every image has `alt`, and the three decorative crops are `alt=""` plus
`aria-hidden`. No unnamed button or link on the page.

**One defect found and fixed during the build:** the FAQ and the scope rail originally unmounted
their panels, which left every collapsed `aria-controls` pointing at an element that did not exist.
Both panels are now **always mounted**, with `inert` keeping the closed ones out of the
accessibility tree and the tab order, and the open/close transition moved to CSS
(`.svp-disclosure`, `grid-template-rows: 0fr → 1fr`) — the platform's own way to transition to
content height, with nothing to measure and nothing to strip under reduced motion.

### Reduced motion

The orbit signal stops and the loop stays fully drawn; active markers still move, because a
selection has to be visible, but in 120ms. Every content block, the board interaction, the FAQ and
the form stay usable.

**One guard worth keeping.** Motion implements an animated `pathLength` as an inline
`stroke-dasharray` / `stroke-dashoffset`, so a draw that is stripped or never runs leaves the line
permanently invisible — the same class of bug §10g records for the footer signal. The reduced-motion
block forces `.svp-orbit-base` and the loop path to their drawn state with `!important`, which is
what reaches past Motion's inline style.

### Performance

- **No new dependency.** Plain React, the platform, and the animation engine already installed.
- **No second WebGL canvas, no video, no autoplay, no new asset.** Verified on the rendered page:
  0 canvases, 0 videos. All nine images are existing creator `.webp` files.
- **Exactly one eager image** — the hero portrait, the route's genuine above-the-fold LCP
  candidate. `loading="eager"` + `fetchPriority="high"` rather than `priority`, which Next 16
  deprecated in favour of `preload`; React hoists a single responsive preload for it. **Every other
  image on the page is lazy**, which is the §10i rule applied from the start.
- Every image carries a `sizes` matched to its measured box, so a phone never pulls a desktop-sized
  file.

### Homepage

**The homepage's design was not changed.** No section redesigned, no scene touched, no copy edited
beyond Service 01 gaining its route action (Revision 08, above). Verified after both passes: nine
sections in the same order, `what-we-do` **7,449px** (§10i recorded 7,450), Project Inquiry 1,376px,
Footer 803px, page 16,245px, one canvas, `Book a 15-Min Call` exactly once, and the header and
footer anchors still bare fragments on `/`.

**Revision 07 deferred the homepage wiring on the grounds that one of five services quietly becoming
a link would read as asymmetric. Revision 08 reversed that**, because the asymmetry is the honest
state: one service has a page and four do not, and hiding a real destination to keep the row tidy
costs the visitor more than the unevenness does. The architecture is what makes it safe — the link
is derived from `built`, so the other four cannot render one, and all five even out by themselves as
the routes ship.

---
## 10k. THE GLOBAL SHELL (Revision 09) — Footer V2, the services menu, the route transition, and the legal routes

`src/components/Footer.tsx` + `config/footer.ts`, `src/components/header/ServicesMenu.tsx`,
`src/components/transition/RouteTransition.tsx` + `src/components/ui/PageLink.tsx`,
`src/config/routes.ts`, `src/config/legal.ts`, `src/components/legal/LegalArticle.tsx`,
`src/app/{privacy,terms,cookies}/page.tsx`. `.ftr-*`, `.hdr-*` and `.rt-*` in `globals.css`.

### The public route inventory, after Revision 09

Read off `src/app/**`. **Nine public pages after Revision 15. That is the whole site.**

| URL | File | Reachable from |
| --- | --- | --- |
| `/` | `app/page.tsx` | Header wordmark, every header/footer anchor, the service page's breadcrumb, the transition |
| `/services/social-personal-brand-growth` | `app/services/social-personal-brand-growth/page.tsx` | Header services menu, Service 01's `Explore service ↗`, footer Services list, Service 02's prev/next |
| `/services/influencer-marketing` | `app/services/influencer-marketing/page.tsx` | Header services menu, Service 02's `Explore service ↗`, footer Services list, Service 01's and 03's prev/next |
| `/services/performance-marketing` | `app/services/performance-marketing/page.tsx` | Header services menu, Service 03's `Explore service ↗`, footer Services list, Service 02's prev/next, Service 03's own mid-page creator-campaign link |
| `/services/brand-shoots-content` | `app/services/brand-shoots-content/page.tsx` | Header services menu (listed as `05`), Service 05's `Explore service ↗`, footer Services list, Service 03's prev/next |
| `/about` | `app/about/page.tsx` | Header nav (04 / About) on every route, footer Navigate list, the homepage About chapter (`Read our story ↗`) — §10r |
| `/privacy` | `app/privacy/page.tsx` | Footer legal rail, on every page |
| `/terms` | `app/terms/page.tsx` | Footer legal rail, on every page |
| `/cookies` | `app/cookies/page.tsx` | Footer legal rail, on every page |

`/api/inquiry` is a route handler, not a page, and never appears in navigation. `/_not-found` is
Next's built-in. **There are still no internal, debug, design-lab or preview routes**, no route
groups, no dynamic segments, no middleware and no rewrites. **No page is an orphan** — verified by
crawling every rendered `href` on all eight routes; every internal href returns **200**. **The one
unbuilt service route (`/services/web-digital-experiences`) returns 404 and is referenced
nowhere** — verified after Revision 12 by collecting every internal `href` on all eight pages.

**One pre-existing dead anchor, found during Revision 11's crawl and deliberately not fixed here.**
The layout's skip link and the Footer's back-to-top both point at `TOP_ANCHOR` (`#hero`), and the
three legal routes have no `#hero` element — so on `/privacy`, `/terms` and `/cookies` both resolve
to nothing. It predates this revision, it is in the global shell rather than in any service page,
and fixing it means touching §10k's locked components. **Worth one small fix when the shell is next
opened**: either give `LegalArticle`'s root `id="hero"`, or have `TOP_ANCHOR` fall back to scrolling
to the document top off the homepage.

### FOOTER V2 — the agency desk

V1's Final Signal ended the page on one 616px centred wordmark and almost nothing else. It read as a
poster, it left the last screen empty, and it could not carry the legal links or the service routes
the site now has. **The field is kept; the composition is replaced.**

Kept: the full-bleed obsidian canvas in **both** themes (the `--color-*` inversion, unchanged), no
twelve-column grid, no `border-top`, the teal trace the inquiry's grid resolves into, the verified
contact data, and **no booking CTA** — `Book a 15-Min Call` still appears exactly once on the site,
in the homepage Hero.

**Desktop composition** — an invisible twelve-column grid, four directories on one row with a
deliberate empty column between the contact block and the rest:

```
MISHRAM MEDIA / INDIA                                    Back to top ↑

GET IN TOUCH        NAVIGATE       SERVICES              FOLLOW
mediamishram@…      01 Work        01 Social & Personal  ⃞ Instagram ↗
+91 63993 99333     02 Services       Brand Growth       ⃞ LinkedIn
WhatsApp ↗          03 Creators                          ⃞ Facebook ↗
                    04 About
───────────────────────────────────────────────────────────────────
MISHRAM wordmark                     PRIVACY  TERMS  COOKIES
(bottom-left, 340px)                 © 2026 · Strategy × Content × …
```

Measured column offsets at 1440: contact at 63px, Navigate 624, Services 848, Follow 1184 — all on
one row. **Heights: 681px at 1440×900, 681 at 1440×768, 677 at 1280×800, 646 at 1024×768** — inside
the 550–700 target, against V1's 803.

**The wordmark is a signature, not the composition.** 340px at 1440 (V1: 616px), left-aligned to the
page gutter, centre sitting 487px left of the viewport centre — decisively asymmetric. **Not
cropped**, deliberately: it is an integrated mark with a studio light inside the first M and slashes
at the end, so trimming an edge removes a letterform rather than reading as a bleed. At this size it
does not need a crop to sit as a signature.

**Mobile.** 60vw wide (234px at 390), left-aligned at the gutter, 111px tall — against V1's 138% of
the viewport. The four directories pair up instead of stacking as full-width blocks: contact, then
Navigate | Follow side by side, then Services full width. From `md` the contact block pairs with the
directories.

| Width | Footer height |
| --- | --- |
| 1440 / 1280 / 1024 | 681 / 677 / 646 |
| 768 portrait | 886 |
| 430 / 390 | 1,013 / 1,012 |

**390 is 1,012px against V1's 1,070, and that is the honest result rather than the 700–900 target.**
The brief asked for both a materially shorter mobile footer *and* materially more content in it, and
on a 390px screen those pull against each other: contact, four navigation rows, three social rows,
the service list, three legal links and the colophon at 44px touch targets cost what they cost.
Getting under 900 needed either dropping a directory or shrinking the tap targets, and neither was
worth 100px. Every row is ≥44px and there is no horizontal overflow at any width.

**Everything in it is derived.** Services from the `built` flags, legal from `LEGAL_DOCS`,
navigation from `NAV_ITEMS`, contact from `CONTACT`, socials from `SOCIAL_URLS`. Shipping the next
service route makes it appear here with **no edit to the footer**.

**The finishing detail** is a slow teal segment travelling the base rule — the same signal the footer
opens on and the same one the route transition draws. It replaced V1's pointer-tracked band inside
the letterforms, which was composed for a poster-scale mark that no longer exists.

### The social rail, and LinkedIn

> **LINKEDIN IS LIVE — §10s (Revision 16).** The mechanism below is exactly what shipped it: the
> client supplied `linkedin.com/in/prashant-mishra-mishram-media`, filling `SOCIAL_URLS.linkedin`
> turned the row into a real link, and **no component was edited.** The `aria-disabled` path
> stays in the code for the next unverified platform. The Instagram row now points at
> `@filmybande`, the client's supplied public contact account; `@mishram.media` is kept as
> `LEGACY_INSTAGRAM` in `config/site.ts` — development-only, never rendered.

Icon, platform name, and an arrow **only where there is somewhere to go** — a directory row rather
than an isolated app tile, which is what lets it fill a column instead of floating in one.

| Platform | Rendered as | Evidence |
| --- | --- | --- |
| Instagram | `<a>` | schema.org `sameAs` on the old site, plus its footer and contact page |
| Facebook | `<a>` | Same |
| **LinkedIn** | **`<span aria-disabled="true">`** | **No verified URL.** The only one that ever existed was a bare `linkedin.com` in the purchased template's social row |

**LinkedIn is visually present and is not a link.** No `href="#"`, no bare domain, no `COMING SOON`
label. The visual signal is that the row is quieter — muted ink, a dimmer mark, no arrow, no hover
affordance, `cursor: default` — and a screen-reader-only "Profile not published yet" carries the
state to assistive technology without putting clutter on the page.

**Filling `SOCIAL_URLS.linkedin` in turns that same row into a real link with zero component
edits.** `SOCIAL_LINKS` now carries all three platforms with a nullable `href` rather than filtering
the unverified one out; `VERIFIED_SOCIAL_LINKS` exists for anywhere a dead row would not be
acceptable.

### The header services menu

`Services` **stays a plain anchor** to `02 / What We Do`. A small chevron disclosure sits beside it
and opens a 352px panel listing the overview again, explicitly, and then every service page that
exists. A visitor never has to choose between the overview and the pages beneath it.

- Real `<button>` with `aria-expanded` and `aria-controls`. Click toggles; **Escape closes and
  returns focus to the trigger**; a pointer-down outside closes; choosing anything closes; a route
  change closes it during render rather than in an effect, so it never paints open over the new page.
- The active service carries `aria-current="page"` inside the panel, and `Services` itself stays lit
  in the header on any `/services/...` route (Revision 08).
- **Not a mega-menu**: hairline rows, a numbered list, the page's own palette, one line of the
  service's own description from `config/services.ts`.
- **No fifth top-level nav item**, and the footer is not a sitemap — both keep the approved four.

**Mobile** gets the same content as an expandable group inside the existing sheet, using the shared
`.svp-disclosure` CSS (always mounted, `inert` when closed, so `aria-controls` names something real).
The label still navigates to the overview; the `+` expands in place. No nested scroll panel.

Both surfaces read `BUILT_SERVICE_PAGES`, so **an unbuilt service can never appear** and the next
route joins both menus with no component edit.

### THE MISHRAM SIGNAL WIPE — one route transition for the site

`RouteTransition` lives in `app/layout.tsx`, so **every internal route change gets it, including
pages built later**, and no page carries transition state of its own.

An obsidian field wipes up across the viewport, a teal hairline crosses its leading edge, and the
Mishram wordmark plus the destination's name resolve at the lower left — the same three things the
footer is built from, so a page change reads as part of the same object rather than a system message.

```
cover 230ms  →  (destination arrives)  →  reveal 280ms
```

≈ **510ms end to end** for a prefetched route. **No spinner, no percentage, no progress ring, no
bouncing dots**, and **navigation is never stalled**: `router.push` fires on the same tick as the
click and the panel animates over the top of it. The reveal waits for whichever finishes last — the
cover's own span or the destination actually rendering — so a slower route is simply covered for
longer. A 2.2s escape hatch clears the panel unconditionally; nothing can be left behind it.

The destination's name comes from `routeMarker` in `config/routes.ts`, derived from the service and
legal registries — `Services / 01 — Social & Personal Brand Growth`, `Legal — Privacy Policy` — so a
new page names itself.

**Scope, and what deliberately does not transition:**

| Navigation | Behaviour |
| --- | --- |
| `/` → `/services/…`, `/privacy` → `/terms`, logo → `/` | Full wipe, via `PageLink` |
| Same-page hash (`#creators`, `#project-inquiry`) | **Native and immediate.** Verified: the panel never mounts |
| Cross-page hash (`/#what-we-do` from a service page) | **Full navigation, no wipe.** §10g's rule — only a real navigation re-runs `useHashLanding`, which corrects the landing after the homepage's hydration changes its height |
| `mailto:`, `tel:`, WhatsApp, Instagram, Facebook | Untouched |
| Browser Back / Forward | **Left entirely alone.** No history hijacking, no overlay |

`PageLink` wraps Next's `Link`, so **prefetching is unchanged** — which is exactly why the wipe can
be short. Modifier-clicks and middle-clicks fall through, so open-in-new-tab still works.

**Reduced motion** gets the navigation and nothing else: no overlay, no delay, a plain `router.push`.
**Scroll**: the new route is scrolled to its top while the field is opaque, so a visitor never
watches a 9,000px homepage scroll unwind. **Focus** is left to Next's own route handling — the panel
is `aria-hidden`, holds nothing focusable, and can neither trap focus nor be announced twice. No
`loading.tsx` was added: all five routes are statically prerendered, so the overlay already covers
the only gap there is.

### The legal routes

`/privacy`, `/terms`, `/cookies`. Content and the full audit live in `config/legal.ts`; the routes
are shells around one shared `LegalArticle`. Updated **25 August 2026** — the date they were written,
not the old documents' 5 July 2025.

**Design.** The service pages' typography and restraint, and none of their theatre: an eyebrow
(`LEGAL / 01`), the title, the updated date, and a readable column — measured 736px at 1440, inside
the 680–800 target. Numbered sections on hairlines, one `h1` and an `h2` per section. No hero, no
composition, no imagery, no gimmick. The header stays **neutral** on these routes, which is correct:
a legal page is not inside Work, Services, Creators or About.

**The audit.** The previous site's three documents were read in full and **almost none of the content
survived**, because it describes a site that behaves nothing like this one. The full table is in
`config/legal.ts`; the headline removals:

- "Website Usage Data … via cookies or analytics" — **this site has neither.**
- A cookie policy listing Google Analytics, Facebook Pixel, Google Ads and a LinkedIn Insight Tag —
  **none of them exists here.** Carrying that over would have been a fabrication in the one document
  whose entire job is accuracy.
- `info@mishram.com`, `support@mishram.com`, two conflicting phone numbers and a Dehradun address —
  all contradict each other and all contradict `config/site.ts`. Every contact detail on the new
  pages is imported, not typed.
- The old Terms' payment, refund, revision-count and delivery clauses — **removed from the website
  terms**, because they belong in a signed proposal. The new Terms say so explicitly.
- Kept: "cannot guarantee specific results", and Indian law / Uttarakhand jurisdiction.

**What the Privacy Policy documents, all verified in the code:** the inquiry fields (name, email and
description required; phone, business, services, budget and timing optional); that the route
validates and delivers through Resend when configured and **writes no database row, no file and no
log**; that it is nonetheless processed by the email provider and kept in Mishram's inbox, so the
page never claims it is "never stored anywhere"; the WhatsApp fallback and that **nothing is sent
unless the visitor follows it themselves**; the honeypot; that fonts are downloaded at build time and
served from this origin, so no request reaches Google; and a complete third-party list — hosting
provider, Resend, WhatsApp, and the social platforms only if an outbound link is followed. **Hosting
is not named**: no hosting configuration is committed here, so naming a provider would be a guess.

**What the Cookie Policy documents:** this site **sets no cookies at all** — verified, nothing in
`src/` touches `document.cookie` — runs no analytics and embeds no third-party script, so there is
no consent banner because there is nothing to consent to. The one thing stored is
`localStorage["mishram-theme"]`, and the page explains why that is **not** a cookie: it is never
transmitted with a request.

### Global navigation architecture

Every public page has an obvious route into it, from everywhere:

| From | Routes available |
| --- | --- |
| Homepage | Header nav, header services menu, Service 01's `Explore service ↗`, footer Services list, footer legal rail |
| Service page | Header nav (`/#…`), header services menu, breadcrumb → `02 / What We Do`, footer everything |
| Legal page | Header nav (`/#…`), header services menu, footer everything |

**Dead-link audit, run against the rendered HTML of all five routes:** every internal href returns
200, every in-page hash has a matching element, and the rest are `mailto:`, `tel:`, WhatsApp,
Instagram and Facebook. **No `href="#"`, no bare `linkedin.com`, and nothing pointing at an unbuilt
service route** anywhere on the site.

---

## 10l. 02 / INFLUENCER MARKETING — the second service page (Revision 10)

`src/app/services/influencer-marketing/page.tsx`, copy in
`src/config/service-influencer.ts`, compositions in
`src/components/service-page/influencer/*`. `.inf-*` styles in `globals.css`.

**Built and live: `/services/influencer-marketing`.** It is the first real test of
whether §10j's shared system carries a *different* story, and the answer is yes: it reuses every
shared primitive and shares no composition, no rhythm and no section order with Service 01.

### The concept — many creators, one campaign

Service 01 runs **one identity outward into a system**: a person becoming recognisable. Service 02
runs **a field of distinct voices inward onto one objective**. That inversion is the whole page, and
it is told three times in three different forms — the hero draws it, the match field interacts with
it, the campaign system braids it. It is one argument, not a template with new words in it.

**The rhythm is deliberately reordered**, so the two pages do not walk in step even where they share
components:

```
Service 01   hero → positioning → system → interaction → scope → proof → audience → process → FAQ → inquiry
Service 02   hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ → inquiry
```

The interaction arrives **third** here rather than fourth, because on this service the decision *is*
the pitch; proof comes **before** scope, because the network is the credential.

Measured at 1440×900: **10,567px — 11.74 viewports including the Footer, 10.98 for `<main>`.**
That is above the 9–11 guidance and it is worth saying why rather than hiding it: this page carries
**eleven** sections against Service 01's ten, and the shared `ServiceSection` padding is 224px per
section — 2,464px, 2.7 viewports, of chapter boundary before a word is written. Hero, the shared
inquiry and the Footer are another 3.3 between them. The eight middle sections average ~950px each,
which is not padded. Shortening it further meant losing a section the brief asked for.

### Hero — the Campaign Constellation

A campaign signal at the centre; **five real creators distributed around it at genuinely different
scales and depths**; five arcs connecting each back to the centre, hand-placed so none crosses a
photograph; and one teal segment travelling the network. The concept line beneath reads
`Objective → Creator Fit → Collaboration → Distribution`.

- **Nothing is reused from Service 01's Brand Signal.** That is one creator re-cropped three ways
  around a positioning fragment; this is five creators at five sizes around a node. Different box
  aspect (100/92 against 100/109), different geometry, different SVG, different motion.
- Percentages of a **fixed-aspect box** with a `viewBox` that matches it exactly — a collision
  checked at one viewport is checked at all of them, and no stroke can shear. Verified: **zero
  elements escape the box** at 1440, 1280, 1024, 768, 430 or 390.
- Motion is restrained: 1–3px idle drift on four out-of-phase periods, arcs drawing on entry,
  spring-damped pointer parallax at five different depths, and one travelling signal. **No WebGL, no
  canvas, no video** (§12).
- Each frame carries **the creator's real name and nothing else.** No follower count, no audience
  demographic, no engagement figure, no campaign score, no price. The line beneath says what they
  are: creators from the network.

### The Creator Match Field — the signature interaction

Choose one of five campaign intents — Awareness, Product Story, Launch, Cultural Relevance,
Creator-Led Content — and the route redraws from an objective node, through the formats that intent
needs, into a brief. Same brand, five different plans.

**THE CONSTRAINT THAT SHAPED IT, and it must survive any redesign.** The obvious build is: pick an
intent, two or three creators light up. **That version cannot ship.** It would assert that a named
real person is the right choice for "Launch", and the project holds no evidence of any such thing —
inventing a characteristic for a real human being on a client's live site is exactly what §1 forbids
and what §10b's follower-count audit already refused once.

So **the route runs through format and stage nodes, never through people.** The creator field is an
evenly-treated backdrop, and **no intent ever changes which creator is emphasised, because none of
them ever is.** Verified empirically: the five backdrop portraits compute to the *same* opacity
(0.62) under every one of the five intents. The disclaimer is rendered on the page, not left in a
comment.

**No claimed software.** There is no matching engine, no audience-intelligence platform and no
proprietary score, so nothing is drawn to look like one — no dashboard chrome, no percentages, no
fit meters, no charts. The brief it resolves into is four typographic fields (`Objective` /
`Creator mix` / `Format` / `Distribution`) whose values are shapes a plan can take, never a campaign
anyone ran and never a number.

Selection is the proven pattern: hover previews, click locks, leaving restores the lock, 90ms
debounce, `aria-current` on the lock and never the preview, real `<button>`s so focus previews and
Enter locks, every intent's sentence and brief mounted in one grid cell so switching never shunts
the page.

### The campaign system — five strands braiding into one

Four separate voices enter on the left and merge, stage by stage, until a single trunk leaves on the
right. **The drawing is the page's title in line form.** Objective → Creator Fit → Brief →
Coordination → Launch + Learn.

Deliberately not the other two line sections on the site: §04 Work Process is five stages on a
**rising** line with a feedback loop and a selectable panel; Service 01's `ServiceSystem` is four
rows on a **vertical spine that turns back on itself**. That is a loop; this is a convergence.
Nothing is selectable — all five sentences are on screen at once, and the interaction budget belongs
to the match field. Below `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` the braid becomes a
vertical rail and the convergence is stated rather than drawn, the same honesty §10c's rail applies.

### Creator proof — the casting wall

One continuous horizontal strip at a single height with **deliberately uneven widths** (264 / 197 /
280 / 344 / 197 at 1440) and a different crop of a different creator in each. Not Service 01's
five-up offset field; hovering one keeps it at full strength and steps the rest back, the casting
gesture.

**What is claimed:** these are creators in the Mishram Media network. **What is not claimed
anywhere:** that any of them appeared in a client campaign, that they worked together, that a result
followed, or anything at all about audience size. The caption says so on the page.

### Scope, and how the shared index was art-directed

Eight capabilities, using the shared `ServiceScope`: Influencer Campaign Strategy · Creator
Discovery · Creator Shortlisting · Campaign Briefing · Creator Communication · Collaboration
Coordination · Content Planning & Rollout · Campaign Review.

**Deliberately absent: negotiation, contracts, rate cards and creator payments.** A service page is
the wrong place for a brand to find out a capability was overstated.

> **RESOLVED IN §10t (Revision 17): `Creator Outreach` and `Negotiation` are now published rows.**
> The client confirmed both, so the "deferred pending client confirmation" state the note below
> describes is over. The index is ten rows, renumbered `01`–`10`. **Contracts, legal contracting,
> rate cards, talent exclusivity and creator payments remain absent and unconfirmed.** The note
> below is kept as the record of how the decision was reached.
>
> **EVIDENCE UPDATE — 25 August 2026. The premise for omitting *negotiation* has changed; the
> public scope has deliberately NOT.** This section used to justify the omission as "the project
> holds no evidence Mishram manages any of them." That is no longer true of negotiation: the old
> site's own `influencerMarketing.html` states Mishram will *"manage outreach, **negotiations**,
> and briefs, and build strong, long-term collaborations"* — first-party copy, the same class of
> source `config/about.ts` already cites.
>
> **The scope index was left unchanged in Revision 13 on purpose.** Promoting a row is a public
> promise, this is historical copy about a previous incarnation of the business, and the decision
> belongs in a service-content pass rather than a content-migration one. **Contracts, rate cards
> and creator payments remain wholly unevidenced.** So: the reason for the omission is now
> "deferred pending client confirmation", not "no evidence exists" — and anyone revisiting this
> should know the difference.

`ServiceScope` gained one optional prop — `accessory`, a page-specific mark rendered under the active
detail. Service 02 passes a miniature of the hero constellation. **That is the pattern for
art-directing a shared primitive: add a slot, never fork the component.** `ServiceProcess` likewise
now derives its column count from the step count, so Service 01 keeps four moves and Service 02 gets
five without either being padded to match the other.

### Automatic discovery — verified, with zero component edits

`built: true` was flipped **only after** the route existed, the page was complete, the responsive
sweep passed, preselection worked and the production build succeeded. Flipping it lit four surfaces
on its own:

| Surface | Result |
| --- | --- |
| Header services menu | `Overview` + `01` + `02` |
| Mobile services group | `Overview` + `01` + `02` |
| Homepage `02 / What We Do` | Service 02 gained `Explore service ↗` |
| Footer Services directory | Both routes listed |
| Service-page prev/next | Service 01 → `Next service — Influencer Marketing`; Service 02 → `Previous service — Social & Personal Brand Growth` |

**No JSX was edited in the Header, the mobile menu, the Footer, `ServiceCopy` or `ServicePageNav`.**
The registry architecture from §10j and §10k carried it, which is what it was built to do.

The **global Mishram signal wipe** (§10k) plays for every one of those routes with no page-specific
code: the marker resolves to `Services / 02 — Influencer Marketing` because `routeMarker` reads the
same registry. Verified on homepage → Service 02 and Service 02 → Service 01.

### Responsive

Two shape-first switches, both on `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` and both
mirrored by `data-layout`: the match field goes index + field → intents then field then brief; the
campaign band goes braid → vertical rail. The scope index uses the shared switch. The casting wall
is a flex strip from `sm` and a two-column grid below it.

At **390** the hero keeps its dominant creator and its supporting frames at genuinely different
sizes rather than five equal thumbnails, the casting wall is two columns of 169px portraits, and the
process is one column. **No horizontal overflow at 1440×900, 1440×768, 1280×800, 1024×768, 768×1024,
430×932 or 390×844.** The only overhang anywhere is a zoomed crop inside `.svp-frame`, clipped by
its own `overflow: hidden` — the same benign case §10i records for the homepage's surfaces.

### SEO and performance

- **Title:** `Influencer Marketing — Mishram Media` (the layout template supplies the brand).
- **Description:** *Creator discovery, campaign strategy and influencer collaborations built around
  the right people, the right content and a coordinated launch.* (141 characters.)
- `alternates.canonical` and an `openGraph` block, both derived from the registry. Statically
  prerendered.
- **15 images, 1 eager, 1 preload, 0 canvases, 0 videos, and every image has `sizes`.** Five
  above-the-fold portraits competing for bandwidth is §10i's bug with a different cast, so only the
  anchor is eager — the rest load normally.
- **No new dependency.** The compositions are CSS, SVG and the Motion already installed.

### Content integrity — the boundary on this page

Influencer marketing is the category where invented numbers are normal, so this page is stricter
than any before it. **There is not one figure on it.** No reach, impressions, views, follower counts,
engagement rate, ROI, conversion lift, creator count, campaign count, client name or case study. No
claimed software. No creator categorised. No testimonial — Client Notes stays content-blocked. §9
brand safety holds: no excluded category appears in any state.

The full boundary, and the reasoning behind each omission, is at the head of
`config/service-influencer.ts`.

---

## 10m. 03 / PERFORMANCE MARKETING — the third service page (Revision 11)

`src/app/services/performance-marketing/page.tsx`, copy in
`src/config/service-performance.ts`, compositions in
`src/components/service-page/performance/*`. `.pfm-*` styles in `globals.css`.

**Built and live: `/services/performance-marketing`.** It is the harder test of
§10j's shared system than Service 02 was, because it has to carry a story with
**no creators in it at all** — and, on the one service a visitor most expects
numbers on, without a single figure.

### The concept — THE EXPERIMENT ENGINE

Service 01 runs **one identity outward into a system**. Service 02 runs **a
field of voices inward onto one objective**. Service 03 is neither: it
**travels and comes back**.

```
hypothesis → creative variants → paid distribution → landing → signal ↺ next test
```

Every composition on the route draws that same loop at a different scale. The
hero draws it spatially, the creative section lets the visitor operate one turn
of it, the path draws it as a closed circuit, and the destination section argues
the half of it everyone inherits rather than builds. **One argument, four
forms** — the §10l rule, applied to a different sentence.

### Section rhythm, and why it is nine chapters rather than twelve

```
Service 01   hero → positioning → system → interaction → scope → proof → audience → process → FAQ
Service 02   hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
Service 03   hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
```

The interaction arrives **second**, earlier than on either page before it,
because on this service the method *is* the product: a visitor who has operated
one test has understood the pitch. Scope arrives late, after the page has shown
the work rather than listed it.

**Two sections carry two movements each, and both merges removed a genuine
repeat rather than trimming content:**

| Section | Movement one | Movement two | Why merged |
| --- | --- | --- | --- |
| Creative | The variant sheet — what a test produces | The test bench — how it is decided | Both showed abstract rectangles that vary. Read a screen apart they were the same idea twice; read together they are one argument with a hinge in it. **−474px** |
| The performance path | The loop drawn — six moves and a return arc | The optimisation rail — what the loop may change | They repeated each other's nouns (distribution, destination, creative) a screen apart. Together the second is the first at a different altitude, and the copy says so. **−674px** |

### Length — measured, and honestly over the guidance

**11,384px at 1440×900 — 12.65 viewports including the prev/next rail and the Footer.** The target
was 9.5–11 and this does not reach it. The arithmetic, rather than an excuse:

| | |
| --- | --- |
| Shared `ServiceSection` padding × 9 sections | **2,016px** (2.24 viewports) |
| Hero (`min-h: 100svh`) | 900 |
| Shared Project Inquiry (§10h) | 1,376 |
| Footer V2 + prev/next rail | 902 |
| **Structural cost before a word of this page's own content** | **5,194px — 5.8 viewports** |

That leaves nine sections averaging ~688px of actual content each, which is not
padded: the two heaviest are the merged ones above, and the lightest is 590px.
Measured section by section: hero 900 · hypothesis 590 · **creative 1,881** ·
**path 1,570** · destination 1,036 · scope 1,101 · audience 652 · process 697 ·
FAQ 681 · inquiry 1,376 · rail 221 · footer 681.

The page went **13.57 → 12.75 → 12.40 viewports** across three passes (all
measured before `built: true` added the 221px prev/next rail) — the two merges,
a shallower bench box, a shorter destination composition and tighter internal
margins. **Every further reduction from here removes a section the brief asked
for**, and the two candidates are recorded below rather than taken unilaterally.

**If a shorter page is wanted, in order of least damage:**

1. **Fold `Who it's for` into the hypothesis statement** (−~390px). Both are
   quiet typographic beats; the audience rail would replace the statement's
   three-word baseline.
2. **Fold the destination section into the path's stage 04** (−~390px). It is
   already that stage expanded, but it costs the page one of its best lines
   ("The ad is only half the journey.") and buries the web capability.

Neither reaches 11.0 on its own; both together land at ~11.5.

### Hero — the Experiment Field

A directed route with a return trace: three creative variants at the left, a
distribution node, a landing surface at the right, a response mark below it, and
a quiet feedback arc running back underneath. **No photography at all.**

- **Nothing radiates and nothing converges.** Service 01's Brand Signal is one
  identity circled by a closed loop on a photograph; Service 02's Campaign
  Constellation is five people converging on a node. This one *travels*.
- **The narrow composition is a different composition, not a smaller one.**
  Below 640px the route turns vertical, the cluster becomes one primary plus two
  fragments, and the landing sits beside its own signal. Both layouts are the
  same data shape — one render path, two tables — so a change to either is a
  table edit. `useMediaQuery(query, true)` so the desktop layout is what ships
  in the HTML; a phone corrects it inside the 300ms the hero holds the whole
  composition at `opacity: 0`.
- Percentages of a fixed-aspect box with a `viewBox` matching it exactly.
  **Verified: zero elements escape the box** at 1440×900, 1440×768, 1280×800,
  1024×768, 768×1024, 430×932 or 390×844.
- Motion: entry from depth, 1–3px idle drift on four out-of-phase periods,
  spring-damped pointer parallax at four depths, and **one** travelling dash on
  the route the spend follows. No WebGL, no canvas, no video (§12).

**Three layers, and they must stay three.** The parallax MotionValues own the
outer transform, the entry animation owns the middle one, and the CSS idle
drift owns the inner one. An animated `y` on the same element as a `y`
MotionValue makes the two fight — §10's rule, and the reason `SurfaceNode` looks
over-nested.

### The abstract creative surface — the page's smallest unit

`CreativeSurface` renders a stack of structural rows: lines of type, a media
region, and the thing being clicked. **No words, no imagery, no brand, no
number.** Three separate reasons, all of them load-bearing:

1. A headline written into a mockup is a claim nobody wrote, and on a
   performance page it reads as copy from a campaign that ran.
2. A logo or a recognisable product implies a client relationship the project
   cannot evidence — and §9's excluded categories can never reach the DOM if
   nothing in here names a company at all.
3. **A figure would be a fabrication.**

What is left is exactly what a structural test varies — hierarchy, weight,
proportion, shape, and where the ask sits — which is the honest thing to draw.
Two tones: `wire` (schematic, for the bench) and `media` (denser and tonal, for
the sheet), which is what stops the two movements reading as one.

### The Creative Test Bench — the signature interaction

Five variables — **Hook · Message · Format · Offer · Destination**. Choosing one
replaces the three surfaces on the bench with three that differ in exactly that
way, and rewrites a four-field record: `Variable` / `Variants` / `Held constant`
/ `Next decision`.

**What makes it different from the other two signature interactions.** Service
01's board redraws one board into five arrangements of the same objects;
Service 02's match field redraws a route between fixed nodes. This one
**replaces the objects themselves** — and under `Format` the three surfaces are
not even the same shape, because that is what that variable means.

**THE CONSTRAINTS, and they are the design:**

- **No variant is ever shown winning.** A green tick, a highlighted champion, a
  "+32%" — each would be a fabricated result, and on this page a fabricated
  result is a business claim. The record resolves into a **decision rule**
  ("keep the opening that earned the next second"), which is method, not outcome.
- **No claimed software.** There is no testing platform behind it, so nothing is
  drawn to look like one: no dashboard chrome, no ad-manager UI, no charts, no
  gauges, no confidence bars, no percentages. **The disclaimer saying so is
  rendered on the page**, not left in a comment — the rule §10l set.
- `Held constant` is on the record deliberately. It is the one field that shows
  the method is a method rather than a mood board.

Selection is the proven pattern (`useHoverLock`, §10c). **Verified with real
input:** hovering previews without moving the lock, clicking locks, leaving the
list restores the lock, focus previews, Enter locks, `aria-current` tracks the
lock and never the preview, and exactly one record is outside `aria-hidden` at
any moment. **The section height is 1,881px through every state** — the bench is
a fixed-aspect box and all five records share one grid cell (§10d-notes).

**The bench box uses `box-sizing: content-box` on purpose.** `aspect-ratio` then
sizes the surfaces area alone and the tag strip is padding *below* it, so every
slot's height percentage resolves against one viewport-invariant box. Folding
the tag strip into the aspect makes the usable height — and therefore the
surface widths — depend on the viewport, which is how a composition starts
overflowing at one size and not another.

### The performance path

Six moves on a single **flat** line, each marked by a glyph that says what that
move does to the work: a dashed hypothesis frame, variants stacking,
distribution fanning, a destination receiving, a response arriving, and an arc
turning back. Flat because a performance loop does not climb — it repeats.

Deliberately none of the other three line sections on this site: §04 Work
Process is five stages **rising** and selectable; Service 01's `ServiceSystem`
is four rows on a **vertical spine**; Service 02's band is four strands
**converging**. This is a **closed circuit**.

**The forward reading dominates** — creative → distribution → landing at full
weight — and the return trace is 0.2 opacity with only its arrowhead in teal.
A page that draws the feedback loop as loudly as the campaign is describing a
process rather than selling a service.

Six columns with **no gap** (each carries its own padding), so a node's x is
exactly its column's centre at every width with no gap arithmetic to drift.
Below `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)` it becomes a vertical
rail and the loop is stated in words — §10c's honesty.

### What we optimise

Five tracks — Message · Creative · Distribution · Destination · Next action —
each moving through **Test → Learn → Adjust**, drawn as position on a hairline.
**No axis, no scale, no percentage, no gauge, no red/green.** The teal segment
reaches the third state because that is where a round *ends*, not because
anything was measured.

The risk this movement carries is reading as a repeat of the bench. It does not,
and the lead says why on the page: the bench is **what one experiment varies
inside a round**; this is **what changes between rounds**, and it includes two
things a creative test never touches — how the media is structured, and how
often anything is allowed to change at all.

### The landing experience

Two abstract interface surfaces and a three-word conversion path. The mobile one
is **genuinely re-laid out rather than scaled** — one column, the action pinned
to the foot — because that is the section's own argument about paid-social
traffic.

**No browser chrome, no address bar, no phone bezel, no client site, no brand,
no product, no checkout, no form, no cookie banner, no figure.**

Below `md` the two screens simply stack, the mobile one at 52% of the column: a
22%-wide phone mockup on a 350px screen is the microscopic webpage the brief
rules out. Each slot carries its own label, which is what lets one markup serve
both layouts (`column-reverse` at `md`+ puts the phone's label above it).

**FUTURE — the one cross-service link this page is missing.** `/services/web-digital-experiences`
does not exist, so nothing here links to it (§18). **When Service 04 ships, a
contextual link belongs in this section** — it is the natural place on the site
where paid media hands off to the destination, and the copy already sets it up
("Mishram builds the destination as well"). Recorded here rather than left as a
comment nobody finds.

### Scope, and the platform claim

Nine capabilities: Performance Strategy · **Meta Advertising** · Campaign
Structure · Campaign Creative · Creative Testing · Audience Strategy · Landing
Experience Direction · Campaign Optimisation · Reporting & Learning.

**Google Ads is deliberately not a scope row.** `config/services.ts` lists
`Meta Ads` as this service's capability and the homepage has said so since §02
was approved, so Meta advertising is what the page is built around — and a scope
index is a promise. It is acknowledged **once**, in the platform FAQ, because
Mishram's own schema.org service description (the same source `config/about.ts`
cites for "Meta and Google Ads") does state it. Naming it there and nowhere else
is the honest reading of both facts. **Promote it to a scope row the moment the
client confirms search is a service they run.**

**Deliberately absent from the scope, and from every FAQ answer:** any promised
result. No ROAS optimisation, no guaranteed CPA, no lead volume, no revenue, no
"scale profitably". The language is method — structure, testing, optimisation,
learning — because that is what Mishram can commit to before seeing an account.

`ServiceScope.accessory` carries a miniature **experiment trace** for this page:
three variants branching off one hypothesis, one continuing into a destination
and a response, and a faint return arc. Nothing in common with Service 02's
constellation mark, which converges inward on one point.

### Content integrity — the strictest boundary on the site

Performance marketing is the category where invented numbers are normal, so this
page is stricter than Service 02's already-strict rule.

**There is not one performance figure on the route.** No ROAS, CTR, CPA, CPC,
CPM, spend, revenue, conversion count, lead volume, percentage lift, growth
multiple, client name or case study — **not even decoratively.** A "4.8 ROAS"
drawn as illustration is read as a claim, and Mishram has no account data it may
publish.

**Verified by walking every text node in `<main>`:** the only digits anywhere on
the page are `Book a 15-Min Call`, `15 min · no obligation`, the format ratios
`9:16 / 4:5 / 1:1`, `D2C`, and the shared inquiry form's own engagement-budget
and timing options (§10h). **No dashboard, no ad-manager chrome, no Meta UI, no
logo, no chart with an axis, and no red/green state anywhere** — teal remains
the only accent, so nothing here can be mistaken for a performance indicator.

**No invented minimum budget.** The project holds no record of one, so the FAQ
says what the budget actually depends on — objective, market, creative
requirement, campaign scale — and that it is settled during planning.

The full boundary, and the reasoning behind each omission, is at the head of
`config/service-performance.ts`.

### Automatic discovery — verified, with zero component edits

`built: true` was flipped **only after** the route existed, the page was
complete, the responsive sweep passed, preselection worked, accessibility passed
and the production build succeeded. Flipping it lit five surfaces on its own:

| Surface | Result |
| --- | --- |
| Header services menu | `Overview` + `01` + `02` + `03`, with `03` carrying `aria-current="page"` |
| Mobile services group | The same four rows |
| Homepage `02 / What We Do` | Service 03 gained `Explore service ↗` — three now |
| Footer Services directory | All three routes, on every page |
| Service-page prev/next | 01 → Next 02; 02 → Prev 01 / **Next 03**; 03 → **Prev 02** |

**No JSX was edited in the Header, the mobile menu, the Footer, `ServiceCopy` or
`ServicePageNav`.** The **global Mishram signal wipe** (§10k) plays for the route
with no page-specific code — verified: the marker resolves to
`Services / 03` + `Performance Marketing` because `routeMarker` reads the same
registry, and hash navigation (`#project-inquiry`) still never mounts the panel.

### Responsive

One shape-first switch on `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)`
(the bench index/field split and the path band → rail), mirrored by
`data-layout`, plus three pure-CSS ones: the hero field at 640, the variant
sheet at 768 and the destination at 768.

**The sheet's breakpoint is measured, not chosen.** Five surfaces sized by
height plus four gaps plus a caption under the narrowest of them need ~605px; at
640 the content column is 584 and the last caption ran **67px past the right
edge, taking the whole page with it**. Below 768 the two-column grid — one
dominant version across the full width, four alternates two-up — is the honest
layout. The caption strip is likewise sized for the worst case (a three-line
note under the narrowest surface at 768), because an overhanging caption lands
on the rule that closes the block.

**Verified at 1440×900, 1440×768, 1280×800, 1024×768, 768×1024, 640×900,
430×932 and 390×844:** no horizontal overflow at any of them, and **zero
elements escaping any composition box** — hero field, bench, variant sheet, path
band and destination all clean. Rows: test variables ≥84px, scope ≥57, FAQ ≥65,
hero CTAs 52 throughout.

### Accessibility

One `h1`; nine `h2`s; `h3`s under the path stages, the bench sub-label, the
optimisation headline, the process steps and the FAQ; `h4` on the optimisation
track names, which sit under that `h3`. Every section but the hero carries a
resolving `aria-labelledby`; the hero uses `aria-label`. **No unnamed button or
link anywhere in `<main>`, and no image to caption — there are none.**

### Reduced motion

The travelling dash stops and is **removed**, not left parked on the route:
`opacity: 0 !important`, because Motion resolves its entry to an inline
`opacity: 1` that a plain rule cannot reach past. Without it the dash survives as
a static thicker stroke over the line it travels — the §10j inline-style problem
in the opposite direction, and worth knowing about.

Both `pathLength` guards are in place (`.pfm-route`, `.pfm-path` forced to their
drawn state with `!important`), and so is the equivalent for a **transform**:
`.pfm-track-fill` is held at `scaleX(0)` before it animates, so a stripped
transform animation would leave every optimisation track looking empty.
`transform: scaleX(1) !important` is what stops that.

Verified by applying the guard declarations directly and confirming every route,
path and return arc resolves to `stroke-dasharray: none` at full opacity, and
the track fill to `scaleX(1)`. **The media query itself could not be emulated in
this session's browser** — see *Visual verification* below.

### SEO and performance

- **Title:** `Performance Marketing — Mishram Media` (the layout template
  supplies the brand).
- **Description:** *Performance marketing built around creative testing, paid
  distribution, conversion-focused experiences and continuous campaign
  learning.* (135 characters.) No ranking, no superlative, no promised return.
- `alternates.canonical` and an `openGraph` block, both derived from the
  registry. **Statically prerendered** — confirmed in the production build.
- **0 images, 0 canvases, 0 videos, 0 image preloads.** A deliberate inversion of
  Service 02's fifteen images: this page is about method rather than people, so
  every surface on it is CSS, SVG and type. The only image request on the route
  is the shared `mishram-wordmark.png` the Header and Footer already use.
  1,664 DOM nodes, 25 inline SVGs, 23 requests in total.
- **No new dependency.** Plain React, the platform, and the Motion already
  installed.

### Visual verification — what was and was not possible

**No composited screenshot was available in this session.** The Browser pane was
not displayed, so the page never composited frames: `computer{action:
"screenshot"}` timed out, and no Chrome instance was connected for the
`claude-in-chrome` path. Verification was therefore **DOM, geometry and
computed-style measurement**, driven with real CDP input where interaction
mattered.

Three consequences of a non-compositing pane are worth recording, because they
look like page bugs and are not:

1. **`IntersectionObserver` never fires**, so every `whileInView` element sits at
   its `initial` state. Confirmed against the shipped Service 02 page, which
   showed 66 elements stuck at `opacity: 0`. Geometry has to be measured after
   neutralising Motion's pre-animation inline styles.
2. **CSS transitions never advance.** A theme swap left `.pfm-surface` borders
   at the previous theme's value until `transition: none` was forced; both
   themes then resolved correctly through the semantic tokens.
3. **`scroll-behavior: smooth` never scrolls.** `document.documentElement.style.scrollBehavior = "auto"`
   is needed before any programmatic scroll.

**The whole layout was measured rather than looked at**, which is enough for
geometry, overflow, contained-ness, row heights, hierarchy, state and the
numbers audit — and is *not* enough for art direction. **The compositions on this
page should be looked at by a person before approval.**

> **Revision 12 note: the pane composited again**, so Service 05 *was* reviewed
> visually. Two of Service 03's compositions have still never been looked at by
> a person — worth ten minutes at review.

---

## 10n. 05 / BRAND SHOOTS & CONTENT — the fourth service page built (Revision 12)

`src/app/services/brand-shoots-content/page.tsx`, copy in
`src/config/service-shoots.ts`, compositions in
`src/components/service-page/shoots/*`. `.sht-*` styles in `globals.css`.

**Built and live: `/services/brand-shoots-content`.** It keeps its canonical
index — **05, not 04** — because Service 04 is deferred (§10o), so the built
sequence is temporarily `01 → 02 → 03 → 05`.

### THE PHOTOGRAPHY AUDIT — the old brand-shoot portfolio cannot be used

This is the finding that shaped the page, and it is recorded so nobody spends
the time again. `Mishram.Media/public_html/brandshoot.html` carries a 19-image
gallery, and **its own `alt` attributes name the brands**:

| Category | Named in the old gallery's alt text | Count |
| --- | --- | --- |
| Fantasy betting / real-money gaming | dream11, my11circle, mpl, winzo | 4 |
| Betting / casino | 1xbet, melbet, parimatch, leon, slottica, glory casino | 6 |
| Offshore CFD / binary options — §9 treats these as gambling-adjacent | olymp trade, binomo, pocket option, octafx, capital.com, currency.com | 6 |
| **Permitted** (§8's approved rail) | mamaearth, cashkaro, upstox | 3 |

**Sixteen of nineteen are categories §9 permanently excludes from every surface
of this site.** The three permitted ones do not rescue it either: all 19 are
**remote Cloudinary files**, which §14 forbids hotlinking; none has a local
copy, a date, a credit or any record tying a photograph to a piece of work; and
the same Cloudinary account hosts the placeholder testimonial portraits
§10d-notes already disqualified, so the account is not a provenance signal.

**Consequence: the photographic library for this page is the five approved
creator portraits in `public/media/creators/`, and nothing else** — which
§10d's media audit had already established for video, now confirmed for stills.

**That is the page's argument rather than a compromise it hides.** Brand Shoots
& Content sells *creative direction and format*. A page that shows one source
resolving into 9:16, 4:5, 1:1 and 16:9 makes its own case more honestly than a
borrowed client portfolio would, and every frame on the route is a real,
approved photograph art-directed through §10b's tuned per-creator crops. **Five
source files carry twenty-nine frames**, because `resolveFrame` gives each
creator three genuinely different crops.

### The concept — THE SHOOT BOARD

`idea → direction → frame → format → library`. A creative director's wall, not a
portfolio: the hero is a working contact sheet, the interaction builds a
different kind of frame, the format section proves one photograph becomes four
shapes, and the selects are the library that comes out of it.

**This is the site's most photographic page and its least diagrammatic.**
Services 01–03 argue with lines, nodes and abstract surfaces. This one argues
with photographs, crops and crop marks — **there is no connected-system diagram
on it at all**, and the only SVG on the route is the scope accessory. That
contrast with Service 03, which carries zero images, is deliberate.

### Section rhythm

```
01  hero → positioning → system → interaction → scope → proof → audience → process → FAQ
02  hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
03  hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
05  hero → direction → interaction → formats + outputs → scope → selects → audience → process → FAQ
```

**Both of the brief's authorised merges were applied up front rather than as a
length fix**, because in each case the two halves were the same sentence twice:

| Section | Movement one | Movement two |
| --- | --- | --- |
| Before the shutter | the statement — production is mostly decisions | the Direction Desk — the six decisions, and a framing study |
| One production | the format system — one frame, four shapes | the output rail — the five places content has to appear |

**Proof comes late here** (the selects sit after scope), the reverse of Service
02, because on this service the method is what is being sold and the library is
the payoff.

### Length — measured, and over the guidance

**11,189px at 1440×900 — 12.43 viewports including the prev/next rail and the
Footer.** The target was 9–11.5. The arithmetic:

| | |
| --- | --- |
| Shared `ServiceSection` padding × 9 sections | **2,016px** |
| Hero (`min-h: 100svh`) | 900 |
| Shared Project Inquiry (§10h) | 1,376 |
| Footer V2 + prev/next rail | 902 |
| **Structural cost before a word of this page's own content** | **5,194px — 5.8 viewports** |

The remaining 6,000px is nine sections averaging ~665px, which is not padded.
**Photographs are simply tall**: a 4:5 frame in a four-column cell at 1440 is
430px on its own, and the two photographic showpieces — formats (1,436) and
selects (1,586) — are 27% of the page between them.

**The brief's own remedy was exhausted before the first measurement**: both
named merges (Creative Direction + Shoot Starts Before Camera; Content With a
Job + Multi-Format System) were built merged from the start. Everything after
that was trimming — a shorter format-crop scale, tighter select spans and gaps,
narrower study and source columns — which took it from 12.56 to 12.43 without
cramping anything. **Going lower means removing a section the brief asked for.**
If a shorter page is wanted, the two candidates in order of least damage are
folding `Who it's for` into the direction statement, and dropping the output
rail back to a single line inside the format section.

### Hero — the Live Contact Sheet

Six frames at different crops, aspects and depths, each carrying its index and
its format; crop marks on the board itself; a teal selection bracket on the
frame that has been chosen; and a sheet rail beneath with a marker per frame.

**Deliberately not the homepage's Service 05 scene.** That is four frames and a
playhead, sized to survive a pinned scroll and to continue Service 04's
photograph — a transition, seen for a few seconds. This is a static board with
two extra frames, in-frame indices and formats, crop marks, a selection bracket
and a counted rail. Nothing is copied across; the geometry is authored for this
box.

**Frame selection was corrected on sight, and this is worth keeping.** The first
build used §10b's `content` crops for three prominent frames. Those crops are
tuned to drop *below* the face — Zoya's "past the chin entirely to the dress" —
which is right for a small fragment inside a scrolling scene and **wrong for a
labelled frame on a page selling photography**: two of them rendered as flat
rectangles of fabric. The rule now is: `portrait` and `reel` for prominent
frames, and `content` only where a genuine detail is wanted *and* the source has
something to show (Mukul's jacket graphic, Lovkesh's pair). **Zoya-content and
Nikita-content are not used at any prominent size anywhere on the route.**

**The narrow arrangement is a different composition, not a smaller one:** one
dominant 4:5 at 66% of the box, two supporting crops beside it, and the rail —
because six frames at 350px is six thumbnails, which is what a contact sheet on
a phone must not be.

### The Shot Builder — the signature interaction

Five production directions — Hero · Product & Detail · Portrait · Social ·
Campaign. Choosing one replaces the frames, their aspects and their positions,
and rewrites a shot record (`Shot` / `Role` / `Format` / `Use`) and a three-row
shot list.

**Different from the other three signature interactions in what it changes.**
Service 01's board rearranges the same abstract objects; Service 02's field
redraws a route between fixed nodes; Service 03's bench replaces wireframe
surfaces. This one changes **photographs and their crops** — the only one of the
four whose subject is an image rather than a diagram, and the only one with no
SVG in it.

**The record is hairline rows, label above value** — deliberately not §10m's
four-column table, because two service pages should not resolve into the same
block of type.

**PRODUCT & DETAIL is named, and the evidence is Mishram's own.** The old
`about.html` schema.org service description reads "creative reels, video ads and
product photography" — the same source `config/about.ts` cites. **No product
photograph is shown anywhere**, because none exists locally; that direction's
frames are genuine detail crops of the creator work, which is what a detail
frame is.

Selection is the proven pattern (`useHoverLock`, §10c). **Verified with real CDP
input:** hovering previews without moving the lock, leaving the list restores
the lock, clicking locks, `aria-current` tracks the lock only, and **the section
holds 1,026px through every state** — the stage is a fixed-aspect box with the
five arrangements absolutely stacked inside it and all five records in one grid
cell.

### One production, many formats

One source frame and four crops of it — **the same photograph, four aspect
ratios** — so the section proves its claim rather than asserting it. Then the
output rail: Social · Campaign · Web · Creator · Launch.

**NO PLATFORM CHROME ANYWHERE.** No feed frame, no story bar, no phone shell, no
handle, no like, no comment, no view count, no play control. Ratios are
described as *usage* ("reels and stories", "most feeds") rather than as platform
specifications, because common usage is what the project can stand behind.

**The crop sits above its text, never beside it, and that is a measured
decision.** Sizing the crops by height is what makes four genuinely different
footprints — but it also makes the 16:9 nearly three times the width of the
9:16, and side by side that left the widest one about **9px of column** for its
sentence. The frame height is also set per column-count rather than by one
shared clamp: at the shared value the phone's crops came out **50px wide**,
which is a thumbnail rather than a demonstration.

### The selects — the content library

Seven frames across two irregular rows, heights *and* aspects both varying, with
frame indices and format tags.

- Service 01's `CreatorField` is five **equal 3:4 frames** on a grid — a field.
- Service 02's `CreatorCast` is one **strip at a single height** with uneven
  widths, abutted — a casting wall.
- This is neither: the bottom edges are uneven without a hand-tuned pixel,
  because widths come from the column span and heights from each frame's aspect.

On a phone it staggers **full-width, half, half, full-width, half, half, half**
(measured: 350 · 167 · 167 · 350 · 167 · 167 · 167), so the photography stays
large and it never becomes a three-column thumbnail gallery.

**Three column counts, not two, and the middle one is a height decision.** Phone
keeps the stagger; `lg` uses the twelve-column spans that make the sheet
irregular; **between them the sheet is three even columns.** Carrying the phone
stagger into tablet width made a full-width 4:5 select 750px across and 937px
tall, and an even two-column tablet grid made each 9:16 select 637px tall on its
own — the section came out at **2,945px**. Three columns brought it to **1,844**
without shrinking anything that matters. Row height is always set by the tallest
frame in the row, so on this sheet the column count *is* the height control.

**What is claimed:** creator photography from Mishram Media's own work, shown as
examples of framing and format. **What is not claimed anywhere:** that the
frames belong to one shoot, that any was made for a client, or that a brand,
campaign, location, photographer, camera or date attaches to any of them. The
caption says so on the page.

### The direction desk

Typographic on purpose — it sits between a photographic hero and a photographic
interaction, and the page needs one place where the thinking is the subject.
Six decisions on hairlines, and beside them one framing study: thirds, and a
crop bracket, drawn over a real frame.

**The study is not a camera interface.** No histogram, no exposure readout, no
focus box, no grid toggle, no shutter or aperture value — §10's rule for the
homepage scene holds here. The guides are canvas-coloured, so they invert
correctly over photography in both themes (verified: `rgba(243,240,232,0.55)`
light, `rgba(10,10,10,0.55)` dark).

### Scope

Eight capabilities: Creative Direction · Shoot Planning · Brand Shoots · Creator
Shoots · Product & Detail Photography · Campaign Content · Short-Form Content
Direction · Format Adaptation.

**Deliberately absent, because the project holds no evidence of any of them:**
studio rental, hair and makeup, equipment or lighting hire, drone, a
cinematography crew, full film production, post-production or VFX, retouching as
a standalone service, location scouting and permits, talent contracting. The
process is likewise kept at the creative and strategic level for the same
reason. `ServiceScope.accessory` carries a **frame index** — a crop-marked
rectangle with a thirds guide and three format outlines beside it, which does
not travel anywhere, unlike Service 02's constellation and Service 03's route.

### Content integrity

No client, campaign, brand relationship, photographer or creative-director
credit, camera, lens, location, date or production budget. **No shoot count,
turnaround time, package or price** — the "how do we plan a shoot" answer says
the scale follows from what the work needs rather than publishing a package. No
result of any kind. §9 holds absolutely: the one obvious source of brand-shoot
imagery on this project is excluded wholesale, and nothing from it reaches the
DOM in any state.

**Alt text describes the photograph, never an achievement** — the roster's own
`alt` strings, and `alt=""` plus `aria-hidden` on any crop that repeats a
photograph already described in the same composition, so a screen reader hears
each person once rather than once per crop.

### Responsive

One shape-first switch on `(min-width: 1024px) and (min-aspect-ratio: 5 / 4)`
for the builder, plus three pure-CSS ones: the hero board at 640, the format
grid at 640 and the selects grid at 1024.

**Verified at 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844:** no
horizontal overflow at any of them, and **zero elements escaping any composition
box** — board, builder stage, format grid, selects and study all clean. Rows:
directions 82px, scope 58, FAQ 65, hero CTAs 52. The one apparent overhang is
`.sht-source-mark` at 6px, which is the crop bracket sitting deliberately
*outside* its frame at `inset: -6px`.

### SEO and performance

- **Title:** `Brand Shoots & Content — Mishram Media`.
- **Description:** *Creative direction, brand shoots and content production
  designed to build a distinctive visual language across social, campaigns and
  digital experiences.* (155 characters.) Statically prerendered.
- **29 image nodes, 5 unique source files, 11 fetched variants, 1 eager, 1
  preload, 28 lazy, 0 canvases, 0 videos.** The variant count is the point:
  every frame picks one of **three** `sizes` buckets, because Next emits a
  separate `srcset` entry per distinct `sizes` and a dozen bespoke ones would
  have turned five photographs into a dozen downloads. Exactly one image is
  eager — the hero's dominant frame, the route's genuine LCP candidate.
- **No new dependency.**

### Visual verification

**Real composited screenshots were available in this session**, unlike
Revision 11. The hero board, the direction axes, the framing study, the shot
builder in three of its five states, the format system, the FAQ and the whole
mobile hero were reviewed as images at 820×560 (the pane's native resolution,
1:1 and sharp), at 1440×900 (downscaled but legible for composition) and at
390×844.

**Three defects were found by looking that measurement would not have caught:**
the three fabric-only crops in the hero, the 16:9 format crop squeezing its
sentence to 9px, and the phone's 50px-wide format crops. All three are fixed
above. Two layout bugs were found by measurement in parallel — a builder grid
spanning past column 12, and dead space under the mobile board.

---


## 10p. CONTENT MIGRATION — Recognition activated, About gains its history (Revision 13)

The first revision in a while that ships **content rather than architecture**. Nothing was
redesigned; two already-built sections were filled from verified evidence, and one long-standing
performance defect was cleared.

Full evidence ledger: **`docs/CONTENT-MIGRATION-AUDIT.md`** (25 August 2026). This section records
what shipped and what it corrected.

### THE METHODOLOGICAL LESSON, and it is the most reusable thing here

**A text search cannot clear an image.** Three separate earlier conclusions in this brief were
reached by grepping markup and filenames, and two of them were wrong in opposite directions:

| Earlier conclusion | Reached by | Reality |
| --- | --- | --- |
| The old site's `*_AWARD_*.gif` are "unlabelled" promotional banners | grepping the markup | The **images** carry the award category, the awarding badge and the year. §06 exists because of them |
| The named testimonial avatars are plausible | trusting filenames like `rahul_mehta.png` | All four are **AI-generated portraits** |
| "No Mishram Media video of any kind" | searching the filesystem | True of the filesystem; **nine reels exist publicly** |

**Open the file.** Filenames, alt attributes and surrounding markup are hypotheses, not evidence.

### 06 / Recognition — active

One item, every field read directly off the photograph:

| Field | Value | Why it is safe |
| --- | --- | --- |
| `title` | **Best Digital Marketing Agency** | Verbatim from the banner's display type |
| `organisation` | **NUFEW** | Verbatim from the gold badge |
| `year` | **2024–25** | Verbatim from the badge (en dash for the site's range convention) |
| `type` | Award | Factual category |
| `caption` | "Recognition for Mishram Media's work in digital marketing." | States the scope and nothing more |

**Rendered on the page as** `06 / RECOGNITION` → *Work that gets noticed.* → the photograph, with
the in-frame tag and the caption line both reading **`NUFEW · 2024–25`**.

**THE FOUR THINGS IT DELIBERATELY DOES NOT SAY**, and they are content-integrity constraints
rather than style choices — the full reasoning is at the head of `config/recognition.ts`:

1. **`NUFEW` is never expanded.** It appears nowhere as text in either repository — `grep -i nufew`
   returns **zero matches across both**, because the string exists only as pixels. Any expansion
   would be invented. **Do not write "National …" or anything like it.**
2. **Nobody in the photograph is named.** The recipient strongly resembles the old site's founder
   photograph and the presenter's only identification anywhere is an `alt="Tushar Kapoor"` on the
   mobile crop. Resemblance and an alt attribute are not documentation. **The award is the claim;
   the people are not.** No presenter, no recipient, no celebrity endorsement.
3. **No rank, scale or jurisdiction.** Not "#1", not "national", not "winner among N agencies", not
   a government award.
4. **Nothing is quoted from the plaque** — its inscription is illegible at the source's resolution.

**The asset, and why it looks the way it does.** `public/media/recognition/
mishram-best-digital-marketing-agency-nufew-2024-25.webp`, **850×680 (exactly 5:4), 108 KB.**
Downloaded from the old deployment's Cloudinary original (2048×731), cropped to `left 1198, top 45,
850×680` and converted with `sharp` — **not hotlinked** (§14). The crop deliberately excludes the
banner's promotional headline typography and its clipart trophies; the lilac field that remains is
the event's own backdrop, so **nothing was recoloured, retouched or faked**.

**The existing §10e treatment is what controls it, and no CSS changed.** `.rcg-photo` already damps
to `saturate(0.94)` at rest and comes to full on hover; the frame is a hairline, the veil is the
canvas token, and the caption carries the facts in the site's own type. **The homepage does not
become gold**, and no trophy iconography was added anywhere. §10e's "No gold: an awards section is
not a licence to leave the palette" holds as written.

850px is the ceiling the evidence supports, so **the image is never upscaled** — verified: Next caps
its srcset at the source width even when asked for 1920. Delivered variant at 1440 is **750×600
WebP, 20.9 KB**, and the badge text stays legible at that size (checked by rendering it).

**THE `priority` DEFECT IS FIXED, and the affordance is gone.** §10i removed stale `priority` flags
from three below-the-fold images and left this one because the section rendered nothing. It renders
now, ~12,800px down the page. `priority={dominant}` was removed from `RecognitionItemView`, **and
the `priority` prop was deleted from `RecognitionMedia` entirely** so it cannot be reinstated by
accident. Verified on the shipped page: **0 eager images, 0 image preload links, 24 of 24 lazy**,
and the Recognition image resolves `loading="lazy"`, `fetchpriority="auto"`.

**Numbering derives, as designed.** `ABOUT_CHAPTER` read `RECOGNITION_ITEMS.length > 0` and About
became **`07 / ABOUT`** with no code change. Verified on the rendered page.

**Composition at one item.** The archive's count-adaptive path puts the dominant frame on 7 of 12
columns (measured 56.4%) with the fragment column empty — the state §10e designed for. Section is
**1,309px / 1.45 viewports**, inside the 0.95–1.5 band, and nothing in it is padded: 256px chapter
padding, 140 intro, 65 rule, 752 archive, 84 CTA.

### About — the history band

See §10f. Three moments, `+212px`, two one-step spacing reductions applied, **1,403px / 1.56
viewports**.

### 03 / Creators — Akash Sagar prepared, deliberately unpublished

`@xbhandesiri_` is the **only creator the agency currently manages**, and the relationship is the
best-evidenced on the roster — user-confirmed, then corroborated by a public chain: the creator's
bio credits `@filmybande` → that account is publicly "Prashant mishra" with a `mishram.media`
highlight → Prashant Mishra is named **Founder & CMO** in the old site's schema.org `employee`
array.

**He ships as `published: false`, and the reason is the photograph.** A bounded attempt was made
against all three legitimate sources: this repo (nothing), the old repo (`grep -i bhandesiri`
returns zero matches anywhere), and the official public profile — whose **only** exposed asset is a
**150×150** avatar with **no `srcset` and no larger variant**. That is ~7% of the pixels this
section needs: the portrait frame renders 400–520px wide, so ~1000px at 2× DPR, against approved
roster assets of 620×1102, 720×720 and 640×800. **Stock, a scraped substitute, a fan-page crop and
a generated portrait are all ruled out (§1); hotlinking Instagram is ruled out twice over (§14).**

So `ROSTER` still holds **five**, the roster header still reads `SELECTED CREATORS / 05`, index
numbering is untouched and the approved composition is byte-identical. **Supply the portrait and
flip one boolean.** He is positioned **second, not last** — appending the one current management
relationship below five historical "worked with" ones would bury it — while **Zoya keeps the
opening slot**, because she is the creator the section opens on, the single image that loads first
(§10b-scale) and §10d's featured work item.

**Two small generic capabilities were added, and both are config-driven:**

- **Relationship labels are per-creator.** `label` already existed and is a free string, so
  `"Currently Managed"` applies to Akash alone and the historical five keep `"Creator Network"`.
  **Do not relabel them** — the old site's own ceiling for those relationships is "We've
  successfully worked with influencers".
- **A verified handle now renders as a real external link** — `@handle ↗`, `target="_blank"`,
  `rel="noopener noreferrer"`, `aria-label="<Name> on Instagram"`, with the site's existing `Arrow`.
  It renders **only where a handle is configured**, which is nowhere on the public page today.

**One accessibility fix went with it.** `CreatorMeta`'s inactive lines carried `aria-hidden` only,
which hides them from the accessibility tree but **leaves them in the tab order** — fine when the
block held nothing focusable, a defect the moment it holds a link. They now carry `inert` as well,
the same idiom §17 uses for closed disclosure panels.

**Verified against a temporary config, then reverted** — the method §10d-notes and §10e both used.
Temporarily publishing him confirmed: the roster becomes 6, he renders at **02**, the header derives
to `SELECTED CREATORS / 06`, the label renders **`CURRENTLY MANAGED`** while the others keep
`CREATOR NETWORK`, the link resolves to `https://www.instagram.com/xbhandesiri_/` with the correct
`aria-label`, and **media loading stays bounded — 3 image nodes, 1 distinct source at rest.** The
config was then restored; the shipped state was re-verified at five creators.

### What was found and deliberately NOT shipped

Everything below is evidenced to some degree and is **held pending a client decision**. None of it
is a gap to be filled opportunistically.

| Held | Status |
| --- | --- |
| Client Notes / testimonials | **Conclusively rejected, 8 of 8.** See §10d-notes, including the seventh failure found this pass. Section stays suppressed |
| Fukra Insaan, Prerna Malhan, Sahil Gambhir, Tehelka Bhai, Deepankar Maxx | **B — needs confirmation.** Named in Mishram's own copy or on its Instagram, but identity unverifiable and no usable local image. A later creator-expansion pass |
| Irwin Javier, Boss Toni, Argoni X, Vijay 3 Guy, `xx_mrswag` | **C — permanently rejected.** The first three are one 1920×1920 stock menswear photoshoot series on the same grey arched backdrop, two in near-identical poses, sold as three creators. Vijay 3 Guy is a 1024×1536 generated/stock studio portrait — and the neighbouring Fukra Insaan tile carries `alt="Vijay 3 Guy"`, so the old site's own labelling is unreliable there. `xx_mrswag` is unnamed with a third-party photographer's watermark. **Never add these** |
| Team — Prashant Mishra, Upendra Singh, Subhash Kumar, Abhishek Gautam | Named in visible markup **and** schema.org `employee` (stronger than §10f recorded), but every headshot is a numbered placeholder GIF and staff change. **Publish none** |
| Influencer geography — India, Philippines, Bangladesh, Nepal, Morocco | First-party claim; needs to still be true |
| Non-profit arm — "Starcrownmedia Zone Foundation" / Mishram.NGO | Links the agency to a separate legal entity |
| WOW Skin Science | The **only** new brand-safe candidate in the whole old estate, named twice in Mishram's own prose — but it appears in **no logo rail on any page**, so there is no artwork, and §8 requires explicit approval |
| Negotiation in the Influencer Marketing scope | Evidence recorded in §10l; public scope deliberately unchanged |

**§9 brand safety re-confirmed.** The old estate's rails carry **16 betting, casino,
fantasy-gaming and offshore-CFD brands**. They remain absent from `collaborations.ts` entirely and
are recorded as rejections only. The five approved brands are unchanged.

### Measured, before and after (1440×900)

| | Before | After |
| --- | --- | --- |
| Homepage height | 16,122px | **17,612px** (19.57 viewports) |
| Recognition | absent | **1,309px** |
| About | 1,223px | **1,403px** (+212 history, −32 tightening) |
| Public creator roster | 5 | **5** (+1 configured, unpublished) |
| Image nodes | 23 | **24** |
| Creator image nodes at rest | 3 | **3** |
| Distinct creator sources at rest | 1 | **1** |
| Eager images | 0 | **0** |
| Image preload links | 0 | **0** |
| Canvases / videos | 1 / 0 | **1 / 0** |
| Horizontal overflow | none | **none** |

Section order is **Selected Work → Recognition → About**, boundaries **0px** on both sides, and
`#client-notes` is still absent from the DOM entirely.

### Visual verification — measurement again, not looking

**No composited screenshot was available in this session**, as in Revision 11: the Browser pane was
not displayed, so `computer{action:"screenshot"}` timed out and **CDP input was unavailable too**
(a `left_click` by ref timed out on the hidden pane). Verification was DOM, geometry and
computed-style measurement, plus the temporary-config technique for anything interactive.

The three non-compositing artefacts §10m records all reappeared and were worked around:
`IntersectionObserver` never fires, CSS transitions never advance (a theme probe read the previous
theme's border until `transition: none` was forced — both themes then resolved correctly through
the semantic tokens), and `scroll-behavior: smooth` never scrolls.

**What that does and does not cover.** Geometry, overflow, containment, numbering, loading
behaviour, both themes' token resolution and the content audit are all verified. **Art direction is
not.** The Recognition crop was reviewed as an image file directly — the source, the candidate
crops and the delivered 750px variant were all rendered and looked at — so the *photograph* has been
seen. **The Recognition section and the About history band as composed on the page have not been,
and are worth ten minutes at review**, alongside Service 03's compositions, which are still
outstanding from Revision 11.

---

## 10q. POST-MIGRATION VISUAL QA (Revision 14)

The first pass on this project where **real composited screenshots were available**, and it earns
its own section because looking at the pages found nine defects that three prior passes of
measurement had not.

### How screenshots were finally obtained — reuse this

The Browser pane has been non-compositing for most of this project (§10m, §10p), and the
`claude-in-chrome` extension is not connected. **Neither is a dead end.** Chrome is installed on
the machine, so it was launched headless with `--remote-debugging-port` and driven over CDP by a
~100-line script using Node's **global `WebSocket`** — no Playwright, no Puppeteer, **no dependency
added to this project**.

That gives everything the pane could not: `Emulation.setDeviceMetricsOverride` for any viewport,
`Emulation.setEmulatedMedia` for `prefers-color-scheme` **and** `prefers-reduced-motion`,
`Page.captureScreenshot` with `captureBeyondViewport` and a `clip` rect for whole-section or
whole-page captures at any scale, and `Runtime.evaluate` for scroll sweeps and probes.

**One gotcha, and it cost a wrong verdict.** A scroll sweep is required before capturing: without
it `IntersectionObserver` never fires and every `whileInView` element sits at `opacity: 0`, so a
capture of an unvisited section shows a half-empty page that looks like a bug.

### THE SECOND METHODOLOGICAL LESSON

§10p's was *a text search cannot clear an image*. This pass adds the counterpart:

> **Geometry cannot clear a composition.** Every defect below sat inside a correctly measured
> layout. Nothing overflowed, every box was the right size, every row cleared its touch target —
> and labels were still being struck through by the lines they named.

### What was found, and fixed

| # | Defect | Fix |
| --- | --- | --- |
| 1 | **Recognition's award image was a lilac promotional banner** dominating the obsidian canvas — decorative sunburst, gold rosette and a band of flat lilac around two small figures. It read as an advertisement pasted onto an editorial page | **Recropped from the original**, raising the top edge: `left 1236, top 150, 775×581` (4:3). Sunburst gone, figures and plaque fill the frame, badge retained. **Pure crop** — nothing recoloured, retouched or generated |
| 2 | **The in-frame `NUFEW · 2024–25` tag duplicated the caption line 60px away** — and, being ink over pale photography, was the illegible copy of the two | The in-frame mark now renders **only as a fallback**, when there is no organisation or year for the caption to carry |
| 3 | **Recognition's single item left five empty columns** and a caption stranded under a wide frame | With one item the frame takes seven columns and the **caption moves beside it** as a museum label. Two- and three-item states untouched. Section **1,317 → 1,232px** |
| 4 | **`sizes` under-declared the frame at 52vw** when it is 824px (58vw), so the browser fetched the 750w variant for an 824px box | `sizes` corrected for the aside case |
| 5 | **About's history ticks floated with no rule on mobile.** The shared `border-t` works across three columns; stacked, moments 02 and 03 were teal dashes in empty space | The rule moves with the layout — shared `border-t` from `sm`, per-row `border-t` below it |
| 6 | **The years read too quietly** to be the chronology | 9px `ink-muted` → **10px `ink-soft`**. Still under the milestone names |
| 7 | **Service 03's hero had three label collisions**: `PAID DISTRIBUTION` struck through by the teal curve, `SIGNAL` cut by its own disc, and the `ITERATE` arrowhead landing on the `VARIANT C` label | The **halo trick §10n uses for tags over photography** applied to `.pfm-anno`, plus two geometry corrections: the signal label moved clear of the disc, and the return trace shortened to point into Variant C's edge rather than through its label. Same corrections applied to the stacked layout, where `SIGNAL` also ran into the ascending ticks |
| 8 | **The hero concept rail wrapped with `→ Signal` orphaned** on a line of its own — and measurement showed **Service 01 had the same defect**, unnoticed since Revision 07. Both were over by **under 10px** | Rail tracking 0.26em → **0.16em** (§11's own remedy) and gaps `3` → `2`. **All four service heroes now fit on one line**, with 17–157px to spare |
| 9 | **Service 03's content-integrity disclaimer was effectively invisible** — 9px at 80% of `ink-muted`. §10m requires it *rendered*; a disclaimer nobody can read is not rendered in any meaningful sense | Full `ink-muted`, `leading-[1.7]`, `max-w-[46ch]` |

**Plus the known defect from §10k, now closed:** `LegalArticle`'s root carries `id="hero"`, so the
layout's skip link and the Footer's back-to-top resolve on `/privacy`, `/terms` and `/cookies`.
Verified: `id="hero"` appears exactly once on each of the three routes and the homepage is unchanged.

### Verdicts

**Recognition — passes.** Reads as evidence rather than an ad: the presentation fills the frame,
`Best Digital Marketing Agency` and `NUFEW · 2024–25` carry the claim in the site's own type
beside it, and the section is **1,232px / 1.37 viewports**. The remaining gold badge and rosette
are *in the photograph*; they were not added and cannot honestly be removed. The homepage itself
stays obsidian and teal — **no gold anywhere in the CSS**.

**About's history — passes.** Reads as chronology on sight, sits as a colophon under the
manifesto rather than competing with it, and is not a timeline, not cards, not a diagram. At 390
it becomes a genuine **vertical chronology** with each moment on its own rule.

**Proof rhythm — passes.** Selected Work (vertical 9:16 reel, index left) and Recognition
(landscape 4:3, frame left, label right) share no orientation, side or structure, so Recognition
does not read as a second gallery. Recognition → About steps from photographic proof to
typographic story. Inquiry does not arrive too late.

**Service 03 — passes after the fixes above.** The experiment loop reads immediately, the bench's
active state is unmistakable, the return trace is present and secondary, and **nothing on the route
resembles a dashboard**. The narrow layout is genuinely a different composition, not stacked
desktop fragments.

**Two observations recorded rather than acted on**, because fixing either means restructuring an
approved section: the variant sheet's right third is empty beneath the `WHAT CHANGED` header, and
the test bench's left column runs ~380px shorter than the record beside it. Neither is a defect;
both are the cost of an index-plus-detail layout with a short index.

### Measured after (1440×900)

Homepage **17,550px / 19.5 viewports** · Recognition 1,232 · About 1,405 · 24 images ·
**0 eager, 0 preloads, 24 lazy** · Recognition `loading="lazy"` · 1 canvas · 0 videos · no
horizontal overflow at 1440×900, 1280×800 or 768×1024.
Service 03 **11,410px / 12.68 viewports** · 0 images · 0 canvases · 0 videos · 0 preloads.
Under emulated `prefers-reduced-motion`: **zero elements stuck at `opacity: 0`**, Recognition's
image present, all three history moments at full opacity.

---

## 10r. `/about` — THE EDITORIAL ARCHIVE (Revision 15)

`src/app/about/page.tsx`, copy in `src/config/about-page.ts`, components in
`src/components/about-page/*`. `.abt-*` styles in `globals.css`.

**Built and live: `/about`.** The site's **fifth page type** and its ninth public route.

### The concept, and why it has no signature interaction

Service 01 is a brand system, 02 a creator network, 03 an experiment engine, 05 a shoot board —
each built around one thing the visitor operates. **This page has none, deliberately.** Nothing on
it is selectable, nothing reconfigures, and there is no system diagram beyond one small convergence
mark. It argues by **provenance**: dates, records, portraits, a recognition, and the type around
them.

That is the correct form for the one page read by someone who has *already* decided to take
Mishram seriously. A fifth interactive chapter would have made About the sixth service page.

### The chapters, and the three merges

```
hero            the archive — five fragments from five chapters
origin          2021 → 2023 → 2025, what it taught, and who it was with
disciplines     four practices converging on one name
practice        the five services as a capability index
principles      four operating positions
on the record   recognition + collaborations, as one credibility chapter
now             where the practice is going, and the bridge into the form
inquiry         the shared form — no service preselected
footer          Footer V2, unchanged
```

**Three merges were applied up front rather than as a length fix**, because in each case the halves
are one argument: **origin with creator-native** (the second is the consequence of the first — told
apart, the chronology is trivia and the creator claim has no evidence under it), **recognition with
collaborations** (both short, both evidence, neither the subject), and **"where we are now" with
the closing bridge**.

### The hero — THE MISHRAM ARCHIVE

Five fragments on one fixed-aspect board at different depths: a **creator** portrait, a **format**
(a 9:16 re-crop), the **recognition** photograph, a **beginning** (a 2021 record card set as type),
and a **build** (an abstract interface fragment). Each carries a small label naming which chapter of
the company it is from, and **a note rendered on the page says they are five separate things, not
one project.**

- **Every image is a local approved asset.** Two roster crops using §10b's own tuned art direction
  via `resolveFrame`, and the verified §06 photograph. **No stock, nothing invented.**
- The two non-photographic fragments are **drawn** — there is no photograph of 2021, and a mocked
  client screenshot would be a portfolio claim this page does not make (§10m's `CreativeSurface`
  rule, applied here).
- Percentages of a fixed-aspect box, so a collision checked at one width is checked at all of them.
  **Verified: zero fragments escape the board** at 1440×900, 1440×768, 1280×800, 1024×768,
  768×1024, 430×932 or 390×844.
- Motion is 2–3px idle drift on four out-of-phase periods plus a staggered entry. **No WebGL, no
  canvas, no video, no parallax.**

**The narrow board is a different composition, not a smaller one.** Two fragments are removed
outright and the three that remain are re-placed and re-sized — five archival items at 390px would
be five thumbnails, which is what an archive must never become. The record card also takes a
**taller aspect** there, because the same two tracked-out caps lines buy far less room at 56% of a
phone than at 30% of a desktop column.

### The origin chapter — an archive index, not a timeline

A large year on the left, the milestone and its sentences on the right, one hairline per chapter.
**No axis, no connecting arrows, no dots-on-a-rail, no cards.** The homepage's `History` band is
the three-line summary of exactly this; giving it room is the whole reason the route exists.

Every date and milestone is **verbatim-traceable** to Mishram's own `about.html` (§10p). The
chronology then lands: *what starting there taught us* — attention is earned not bought, platforms
have cultures, collaboration beats direction — so the history is never left as trivia.

**The creator claim uses the safer wording.** *"Creators were where we started"*, which the
chronology supports, **not** "creator-native before it was a category", which would be a claim about
the industry rather than about Mishram.

The portrait sequence is a **stagger** — alternating frame heights on one baseline — deliberately
none of §03's selectable index, Service 01's five equal frames or Service 02's single-height
casting wall.

### The service index — registry-driven, and that is the point

All five services render, because all five are genuine capabilities the homepage already states.
The **action** comes from `servicePageHrefFor`, which returns a path only for a `built` route — so
**Service 04 / Web & Digital Experiences appears as a named capability with no link at all.**

**No `Coming Soon`, no disabled control, no `href="#"`, no placeholder page.** Verified on the
rendered route: four rows link, `Web & Digital Experiences => NO LINK`. **Shipping that route lights
this index with no edit here.**

### Recognition and collaborations — neither duplicates its homepage counterpart

- §06 puts the award on seven columns with a museum label. Here the same photograph is **small** —
  a record inside the company's story rather than a chapter's subject. No trophy treatment, no gold.
- §01 is a continuous marquee. Here the same five brands are a **static numbered index** with the
  ink-tinted mask beside each name. Same config, same brands, completely different composition,
  and nothing moves. §08's optical `scale` is applied, without which Muuchstac's stacked lockup
  rendered as an 18px glyph.

Brands are described as **worked with** — the old site's own wording — never clients, partners or
"trusted by".

### WHAT THIS PAGE DELIBERATELY DOES NOT SAY

The full list with sources is at the head of `config/about-page.ts`. The load-bearing ones:

- **NO TEAM AND NO FOUNDER.** The old site names four people in visible markup *and* in a schema.org
  `employee` array; the content-migration audit classified all four **B — needs current
  confirmation**. Publishing a historical employment record as a current one is exactly what §1
  forbids. The founder is the best-evidenced of the four and is still not named.
- **NO CITY, OFFICE OR ADDRESS.** `INDIA` only (§10f).
- **NO SCALE CLAIMS.** No client, creator, campaign or head count; no years-in-business, reach or
  revenue; not the old homepage's "1000+ influencers".
- **NO AWARD EMBELLISHMENT.** `NUFEW` unexpanded, nobody in the frame named, no rank or
  jurisdiction (§10p, §10q).
- **NO NGO STORY, NO INFLUENCER GEOGRAPHY** — both evidenced, both held pending a client decision.
- **The technology paragraph is a signal, not a landing page.** It names technology as a growing
  part of the practice and stops. Web & Digital Experiences gets its own deep discovery (§10o).

### Navigation — `About` now means the page, everywhere

**`NAV_ITEMS`' About entry is `/about`, not `#about`.** One word in the header cannot mean a
section on one route and a page on another. The homepage About chapter remains, reached by
scrolling, and gained one restrained **`Read our story ↗`** text action beside its history band —
not a third button in a chapter that already carries two.

- `sectionHref` returns a route href untouched; only fragments resolve against the current route.
- `isRouteHref` is the one predicate the header, the mobile sheet and the footer all branch on, so a
  route item renders as `PageLink` (playing the shared wipe) and an anchor stays a plain `<a>` for
  `useHashLanding` (§10g).
- **Active state is derived from the pathname** on `/about`, never from the homepage observer.
  `#about` is still in `SECTION_ORDER` on purpose: it matches no nav item, so scrolling the homepage
  chapter leaves the header neutral exactly as `#hero` does.
- The **Footer's About row points at `/about`** on every route.

**Verified on all four route types** — `/`, a service page, a legal page and `/about` itself: About
resolves to `/about` in the header and the footer everywhere, and carries `aria-current` only on
`/about`. Outbound links from the page: `/#creators`, the four built service routes, and
`#project-inquiry`. **Nothing points at an unbuilt route.**

The **global Mishram signal wipe** plays with no page-specific code — `routeMarker` resolves
`Mishram Media / About` from `config/routes.ts`, derived from `ABOUT_PAGE_COPY`.

### Length — measured, and over the guidance

**10,595px at 1440×900 — 11.77 viewports** against a 8–10.5 target. The arithmetic rather than an
excuse:

| | |
| --- | --- |
| Hero | 1,000 |
| Shared Project Inquiry (§10h) | 1,377 |
| Footer V2 | 681 |
| Shared section padding × 7 | **1,344** |
| **Structural cost before a word of this page's content** | **4,402px — 4.9 viewports** |

That leaves seven chapters averaging ~885px each, and the heaviest is the merged origin chapter at
2,490. A spacing pass took the page from 11,139 → 10,595 without removing a word.

**Reaching 10.5 means removing content the brief asked for**, and the two candidates are recorded
here rather than taken: the creator stagger (~810px, but the brief asks for 3–5 portraits) and the
three "what it taught us" points (~450px, but they are the payload of the chronology). For
comparison the page is **shorter than Service 03 (12.68) and Service 05 (12.43)**.

### SEO, performance and accessibility

- **Title** `About — Mishram Media` (the layout template supplies the brand). **Description:**
  *Mishram Media began in creator marketing and grew into a multidisciplinary practice across
  content, performance, technology and digital experiences.* Canonical and `openGraph` derived from
  the same fields. **Statically prerendered.**
- **8 images · 1 eager · 1 preload · 7 lazy · 0 canvases · 0 videos · no new dependency.** The one
  eager image is the hero's dominant creator fragment, the route's genuine LCP candidate. The
  recognition photograph and every strip portrait are lazy.
- **One `h1`, seven `h2`, twelve `h3`.** Every section carries a resolving `aria-labelledby`; the
  hero uses `aria-label`. Decorative fragments and the convergence mark are `aria-hidden`.
- **No horizontal overflow** at 1440×900, 1440×768, 1280×800, 1024×768, 768×1024, 430×932 or
  390×844. **Under reduced motion: zero text elements and zero images hidden**, and the archive
  drift resolves to `animation-name: none`.

---

## 10s. CURRENT PROOF / OUTREACH PREPARATION (Revision 16)

The first revision aimed at a **specific commercial use of the site**: the client is about to
run a high-value creator and brand outreach campaign, and the recipient of that outreach will
open this page cold. So it ships **current contact details, the brand relationships the client
actually has, and a shorter page** — and takes one finished discipline off public discovery
because the campaign is not selling it.

Nothing was redesigned. Every change is data, one derived flag, or copy.

---

### 1 — PUBLIC CONTACT DETAILS REPLACED

The client supplied a new public contact set. It supersedes the details carried over from the
old Mishram Media site, and it lives in `config/site.ts` exactly as before — the contact panel,
the header strip, the footer, the inquiry section's direct routes and the legal pages all read
that file, so nothing was retyped anywhere.

| Channel | Now | Was |
| --- | --- | --- |
| Email | **`info@mishram.media`** | `mediamishram@gmail.com` |
| Phone | **`+91 95482 78558`** (`+919548278558`) | `+91 63993 99333` |
| Instagram | **`@filmybande`** — `instagram.com/filmybande` | `@mishram.media` |
| LinkedIn | **`linkedin.com/in/prashant-mishra-mishram-media`** | none — the row rendered unlinked |

**THE BRAND NAME DID NOT CHANGE.** The material the details arrived in carried the phrase
*"Prashant Ads Agency"*. That is context around the contact block, not a rename, and it appears
nowhere in this repository. The site is **Mishram Media**, everywhere.

**LinkedIn is live, and it cost one line.** §10k built the footer's social rail so an unverified
platform renders as a present-but-non-interactive row with `aria-disabled` — never an
`href="#"`, never a bare domain. Filling `SOCIAL_URLS.linkedin` turned that same row into a real
link with **zero component edits**, which is what it was built to do. The three-platform set and
its treatment are unchanged.

**`@mishram.media` was demoted, not deleted.** It is the account the old site declared in its
schema.org `sameAs`, and §10p's audit cites reels on it, so it is kept in `config/site.ts` as
`LEGACY_INSTAGRAM` — development-only, never rendered. **One Instagram row, not two**: a social
rail carrying both would read as an unresolved migration rather than as a choice.

#### THE WHATSAPP NUMBER IS DELIBERATELY NOT THE PUBLISHED NUMBER, and this needs a decision

`whatsappNumber` still points at `916399399333`. **Nothing supplied with the new details says the
new line is on WhatsApp**, and a `wa.me` link built from a number with no WhatsApp account behind
it fails silently at exactly the moment a visitor is trying to reach the business — so the
working route was left pointing at the number the project knows answers.

Two consequences, both handled rather than hidden:

- **The old number is never rendered as text anywhere.** It survives only inside the `wa.me`
  deep link. The site publishes exactly one phone number, and there is no surface where two
  contradictory numbers appear.
- **Two places that printed the published number under a WhatsApp label were corrected**, because
  after the change they would have been false:
  - Project Inquiry's WhatsApp row showed `CONTACT.phoneDisplay`. It now says
    `INQUIRY_COPY.whatsappValue` — *"Chat with the team"* — which is what the action does.
  - The legal pages' contact section said *"or on WhatsApp at the same number"*. It now says
    *"or through the WhatsApp link on this site"*. **A legal page is the one document that cannot
    carry a convenient approximation.**

**THE UNBLOCK IS ONE CONFIRMATION.** When the client confirms WhatsApp on the new line, change
that one constant to `919548278558` and every WhatsApp action on the site follows. Do not "tidy"
it into agreement with `phone` before then.

**No structured data was updated, because there is none.** The site ships no JSON-LD and no
schema.org markup of any kind — verified, not assumed. `app/layout.tsx` carries `metadata` and
`openGraph` only, neither of which contains contact information. If organisation structured data
is ever added, it reads `CONTACT` like everything else.

---

### 2 — THE BRAND ROSTER: 5 → 19, and one withheld

`config/collaborations.ts` carried five names inherited from the old site's client rail. The
client supplied **eighteen relationships** as user-confirmed first-party business information.
Four of the five were in that list; the fifth, Muuchstac, is a legitimate earlier relationship
and **stays** — a longer list of newer names is not a reason to drop a real older one.

**Eighteen brands render on the site**, and a nineteenth relationship (VYRL) is recorded without
an asset — see below. Every entry carries a development-only `source` and `logoSource` so a
published claim stays traceable, and neither field is ever rendered.

| # | Brand | Category | Priority |
| --- | --- | --- | --- |
| 01 | Swiggy | food-delivery | featured |
| 02 | Canva | technology | featured |
| 03 | Yash Raj Films | entertainment | featured |
| 04 | Mamaearth | beauty-d2c | featured |
| 05 | Groww | fintech | featured |
| 06 | Swiggy Instamart | quick-commerce | featured |
| 07 | Excel Entertainment | entertainment | featured |
| 08 | Wondershare | technology | featured |
| 09 | Upstox | fintech | featured |
| 10 | Pilgrim | beauty-d2c | featured |
| 11 | CashKaro | shopping | featured |
| 12 | Kapiva | wellness-d2c | featured |
| 13 | Navi | fintech | roster |
| 14 | Pintola | food-d2c | roster |
| 15 | AVVATAR | wellness-d2c | roster |
| 16 | DermaTouch | beauty-d2c | roster |
| 17 | Troovy | food-d2c | roster |
| 18 | Muuchstac | grooming-d2c | roster |
| — | VYRL | media | configured, **not rendered** — no asset exists |

**Spelling was normalised to each company's current official identity**, not to how the list
arrived: `Grow` → **Groww** (the brand already on the rail — deduplicated, not added twice),
`Navi UPI` → **Navi** (the company; UPI is a product surface inside it), `AVVATAR India` →
**AVVATAR**, and Swiggy and Swiggy Instamart are two entries because they are two marks.

#### FUN N EARN — WITHHELD UNDER §9, AND THE RULE WAS NOT WEAKENED

**`Fun N Earn` is real-money gaming and is not published anywhere on this site.**

It was researched before publication rather than after. The product is a cash-contest app:
**money is added to an in-app wallet to enter paid contests, winnings are withdrawn to a payment
wallet after KYC, and the platform takes a commission on winnings** — its own terms and FAQ say
so. §9 excludes betting, gambling, casino, real-money gaming and fantasy-betting companies from
**every** public surface of this site, permanently, and this is squarely inside it.

**No exception was made because the relationship is genuine.** §9 does not turn on whether the
relationship is real; it turns on the category. The record lives in `WITHHELD` at the foot of
`config/collaborations.ts` — development-only, and **deliberately not part of `COLLABORATIONS`**,
so it cannot reach the DOM through a render path, a marquee duplicate or a reduced-motion
fallback. That is the same architecture §9 already required for the old site's sixteen excluded
brands.

Every other brand on the list was checked against §9 before publication. None of the remaining
eighteen is in an excluded category.

#### VYRL — confirmed, and the one asset that could not be sourced

VYRL is configured with `visible: false` and a written reason. **No legitimate official logo
exists to download**: `vyrl.in`, `vyrloriginals.in` and `vyrloriginals.com` all resolve to a
redirect stub with no site behind them, there is no media or press page, and the mark is on
neither Wikimedia Commons nor Wikipedia. The only images available are logo-aggregator sites and
a rounded platform avatar, both of which the logo policy below rules out.

The record is kept rather than deleted so a confirmed relationship is not lost. **Supply an
official file and flip one boolean.** This is the same rule the site already applies to
Recognition, Client Notes and the suppressed social row: *a missing thing is absent, never
faked.*

---

### 3 — THE LOGO PIPELINE, and where every mark came from

Thirteen new marks were sourced. **All are local**; nothing is hotlinked (§14). Source preference
was, in order: the brand's own media/press pack, its own website or CDN, then a reliable vector
repository where the file is clearly the current official mark. **No logo blog, no icon
marketplace, no screenshot, no watermarked file.**

| Brand | Source | Format |
| --- | --- | --- |
| Swiggy | Current official mark, vector — identical to the lockup on Swiggy's own corporate site | SVG |
| Swiggy Instamart | **Swiggy's own corporate domain**, `Instamart-Logo-1.svg` | SVG |
| Canva | Current official wordmark, vector | SVG |
| Yash Raj Films | Current official mark, vector | SVG |
| Wondershare | **Wondershare's own asset CDN**, horizontal wordmark | SVG |
| Navi | **navi.com**, the site's own header mark | SVG |
| Kapiva | **kapiva.in**, the inline SVG in the site's own header | SVG |
| Pilgrim · Pintola · DermaTouch · Troovy | Each brand's **own website/CDN** | PNG |
| AVVATAR | **avvatarindia.com**, the site's own header mark | PNG |
| Excel Entertainment | **excelmovies.com**, the site's own header mark | PNG |

Mamaearth, Groww, CashKaro, Upstox and Muuchstac keep their existing approved assets, untouched.

**The two layers are still generated in one pass from one source**, exactly as §8 requires, so
they overlay to the pixel: `<name>.png` is the mask the rail tints with the theme's ink, and
`<name>-color.png` is the genuine artwork the hover reveals. Wordmarks normalise to 128px tall
and stacked lockups to 160px (the existing convention), trimmed to tight bounds so every mark
sizes optically rather than by whatever padding its source carried. **Nothing is stretched,
redrawn or recoloured**, and no full-colour mark was reduced to a house palette.

#### THE MASK DERIVATION — a real problem, and the fix generalises

The rail's rest state is the mark reduced to one flat silhouette. For artwork drawn dark on
transparency, its alpha channel *is* the mark. **Four of these are drawn the other way round** —
a solid field of brand colour with the letterforms painted white **on top of** it rather than
knocked out of it. Their alpha channel is a featureless slab: Troovy reduced to a blob, Swiggy
and Instamart to a rounded square, Yash Raj Films to a rectangle. **None was identifiable at
29px**, which was visible immediately on a rendered proof and would not have shown up in any
measurement.

Those four use an `ink` mask instead: `(1 − luminance) × alpha`, stretched so the darkest ink in
the mark is fully opaque. The white letterforms fall out as transparent — which is what the
printed mark does on paper. Swiggy's pin, Instamart's full `insta mart` wordmark, Troovy's
lettering and YRF's figure all read at rest. **The genuine artwork is untouched and is what the
hover layer shows.**

Seven marks are near-black artwork and carry `darkKeepsMono`, the flag §8 already had: on
obsidian the ivory-tinted mask is the correct treatment because the colour layer would be
invisible. Navi is the one non-obvious member — its `navi` wordmark is a near-black purple that
reads as nothing on a `#0a0a0a` canvas.

**Weight: 150KB for thirteen new brands across 26 files** — *less* than the five existing brands
cost between them (307KB), thanks to palette quantisation on flat artwork at display-appropriate
sizes.

**The load cost, stated rather than buried.** The brand directory is **456KB across 36 files** for
eighteen brands, against 307KB across 10 for five, and **all 36 are fetched on load** rather than
lazily: the rest layer is a CSS `mask-image` and the hover layer a `background-image`, both on
elements inside the viewport. Nothing regressed — §10i's rules hold, and the page still reports
**0 eager images and 0 image preloads**, because none of these is an `<img>`. That is the honest
price of the section carrying the roster it now carries, and it buys the page's primary proof.
**If it is ever worth reducing, the lever is deferring the colour layer to first hover** — roughly
250KB and 18 requests, traded for a flash on the first hover of each mark. Not taken here, because
the cross-fade is part of the approved treatment (§8).

**Known weak asset, recorded rather than hidden:** AVVATAR publishes its mark at **111×95** and
nothing larger exists on its site. That is enough for the 29px rail at 2× DPR and it is the
official mark, but it is the one asset on the rail with no headroom. Excel Entertainment's is
154×104 for the same reason. Neither was upscaled or substituted.

---

### 4 — THE RAIL: priority, and a timing bug the roster would have caused

**The section stays exactly where it was — directly after the Hero, second on the page.** Brand
credibility is now the most important thing on this site after the Hero itself, and it is 298px
of the page at 1440.

`priority` is what stops eighteen marks becoming a sponsor wall:

- **`featured`** — the twelve strongest and most current relationships. They lead the rail, so
  they are what a visitor meets in the first screen after the Hero.
- **`roster`** — the six remaining legitimate relationships, continuing through the same rail. **No "see
  more", no second rail, no wall above the fold.**

Order is editorial and deliberately mixed by category, so the opening does not read as a block of
fintech or a block of D2C. `ORDERED_COLLABORATIONS` sorts by priority regardless of array order,
so a misplaced entry cannot break the invariant.

#### THE MARQUEE TIMING HAD TO BECOME DERIVED, and this was a genuine defect

The rail was approved at five brands, four copies per track, translating half its width over
**46 seconds**. Left alone, eighteen brands would have run **the same 46 seconds across a track
three and a half times longer** — every logo sweeping past at roughly three times the approved
speed. That is not a length problem, it is the approved section breaking.

Both numbers now come off the config (`railTiming` in `Collaborations.tsx`):

- **Copies per track fall as the roster grows.** `MIN_ITEMS_PER_TRACK = 12` is what the seam-free
  `-50%` loop needs to stay wider than the viewport; five brands still repeat four times, so the
  approved five-brand rail is byte-identical.
- **Duration tracks the resulting track width**, against the reference geometry the 46s was
  composed at (29px logo height, 86px gap). Measured on the shipped page: **37.3s** for eighteen
  visible marks — the same pixels per second the section was approved at.

**Reduced motion shows the featured twelve, not all eighteen.** The rule collapses the rail to
one static centred set; at five marks that was the whole roster, at eighteen it would be the
wrapped wall this section exists to avoid. `data-roster` on the supporting entries is what the
reduced-motion block hides, and the section's own line already says the brands shown are
selected. Verified under emulated `prefers-reduced-motion`: twelve marks, two centred rows,
372px.

#### SECTION LANGUAGE

The lead is now **"Selected brands we've worked with."** — previously *"Brands, creators and
teams we've built with"*, which stopped being accurate the moment the rail became eighteen brands
and no creators.

**Not "Trusted by", not "Partners", not "Our clients".** Those describe a relationship this
project cannot evidence for every mark on the rail. *Worked with* is true of all of them and is
the old site's own wording. The chapter title `01 / SELECTED COLLABORATIONS` is unchanged.

#### `/about` TAKES THE FEATURED SET, and that is the only change to that page

`AboutCredibility` renders `FEATURED_COLLABORATIONS` rather than the whole roster — one import.
Eighteen rows would have turned a supporting beat inside the company's story into the longest
block on the page; the chapter's own lead already promises *"a few of the brands"*. The credibility
chapter went **1,232 → 1,329px** and `/about` **10,595 → 10,864px (12.07 viewports)**. Nothing
else on that route was touched.

---

### 5 — SERVICE 05 HIDDEN: `built` and `public` are now two different questions

The client wants **Brand Shoots & Content off public discovery** during the outreach campaign.
**The implementation is untouched.** The homepage scene, `/services/brand-shoots-content` and
every composition on it (§10n) are exactly as they were, and the route still resolves.

**`built` was the wrong flag to use, and this is the reusable part.** It records that the
implementation exists. Setting it `false` to hide something would mean the registry lies about
the code, and prev/next, the menus and the footer would all be reasoning from a false premise.
So `Service` gained a second boolean:

```ts
built: boolean;   // the implementation exists — a fact about the code
public: boolean;  // it appears in public discovery — the editorial decision
```

`PUBLIC_SERVICES` (`built && public`) and `PUBLIC_SERVICE_PAGES` are what everything derives
from. One flag took the service off **six** surfaces with **no component edit and no
`if (service.id === "shoots")` anywhere**:

| Surface | Result |
| --- | --- |
| Homepage `02 / What We Do` | Four chapters. The pinned track shortened by exactly one `SERVICE_SCROLL_VH` slot — **7,449 → 6,279px** |
| Progress indicator | `01 ──────● 04`, four accent dots, fill reaching its own last dot |
| Header services menu | `Overview · 01 · 02 · 03` |
| Mobile services group | The same four rows |
| Footer Services directory | Three routes |
| Prev / next | 03 shows only a previous. The hidden page renders no rail at all |
| `/about` service index | Brand Shoots & Content renders as a **named capability with no link**, exactly as Web & Digital Experiences does |

**No empty scroll, no blank slot, no lingering transition, no wrong count** — verified by
measurement and by looking at the sequence: the last scene is Service 04, and it resolves into
*"Different disciplines. One growth system."* as it always did.

**CANONICAL NUMBERING IS PRESERVED.** Brand Shoots is still `05` and Web & Digital Experiences is
still `04`. Numbering belongs to the five-service system in `config/services.ts`, not to what
happens to be visible this month. The progress indicator's endpoints are the first and last
*visible* indices — `01` and `04` — which is a different thing from renumbering.

**`robots: noindex, nofollow` while hidden, and it is derived.** The route's metadata reads
`PAGE.service.public`, so the directive lifts by itself when the flag goes back — which is what
stops a `noindex` being left behind on a page that is public again. Verified on the rendered
route: `noindex, nofollow`, the page renders in full, and **no internal link on any surface
points at it**.

One piece of copy was wrong the moment this shipped and was fixed: the services menu's overview
row read *"What We Do — all five services"*. It now carries **no count at all** — a number in copy
is a claim that has to be maintained, and the overview itself shows how many there are.

---

### 6 — THE HOMEPAGE ABOUT CHAPTER IS NOW A PREVIEW

**1,468px / 1.63 viewports → 718px / 0.80 viewports.**

The chapter was written before `/about` existed. Once it did (§10r), the homepage was telling the
company's story twice — the short version immediately above a form, and the full one a click away.

| Removed from the homepage | Where it lives now |
| --- | --- |
| The second body paragraph (the "handoffs are where results get lost" argument) | **The Mishram Difference interlude already makes it on this page** (§10a) |
| The `emphasis` line, verbatim from Mishram's schema.org description | `/about`'s opening claim |
| The `INDIA` locator | The Footer, and `/about` |
| `DisciplineSystem` — the four-discipline drawing | `/about`'s disciplines chapter, at full length. `DISCIPLINES` still feeds `FOOTER_EQUATION`, so the data is unchanged |
| The 2021 / 2023 / 2025 history band | `/about`'s origin chapter, with room to land in what starting there taught the practice |

**What the preview keeps:** the chapter label, the headline *"Creative thinking, built for
growth."* unchanged, one sentence of positioning, **one concise historical sentence** — *"It began
in 2021 as Starcrown Media, an influencer marketing practice, and became Mishram.Media in 2025 as
the disciplines grew."* — `Read our story ↗`, and the closing conversion moment it always ended on.

**`HISTORY` stays in `config/about.ts`** as the evidence ledger. It is where the verbatim source
sentence is written down, and both the homepage's one-liner and `/about`'s chapter are checked
against it.

Two columns rather than a stack, because the block's whole point is that it is short: set one
under the other, three sentences read as the start of a chapter that then stops. Section padding
came down one step top and bottom, and the closing rule's approach with it — **that is the only
whitespace reduced anywhere on the site.** The reduction is otherwise all content.

**Do not rebuild the long version here.** If this chapter needs to say more, that is a signal
`/about` is not doing its job.

---

### 7 — MEASURED, before and after (1440×900)

| | Before | After |
| --- | --- | --- |
| **Homepage** | **17,591px / 19.55 vh** | **15,671px / 17.41 vh** |
| 02 / What We Do | 7,449 | **6,279** (−1,170, one service slot) |
| About | 1,468 / 1.63 vh | **718 / 0.80 vh** (−750) |
| 01 / Selected Collaborations | 298 | **298** (unchanged) |
| Brands rendered | 5 | **18** (+1 confirmed, no asset — VYRL) |
| Public services in §02 | 5 | **4** |
| Homepage images | 24 | **20** |
| Eager images / image preloads | 0 / 0 | **0 / 0** |
| Canvases / videos | 1 / 0 | **1 / 0** |
| Horizontal overflow at 1440 | none | **none** |

**−1,920px, −10.9%**, and the arithmetic accounts for all of it: one fewer public service scene
and the About preview. The §10q headless-Chrome route independently measures the shipped page at
**15,694px**; the 23px is instrument rounding between a DPR-1 and a DPR-2 pass, not a
discrepancy.

At **390×844** the page is **14,963px**, `02 / What We Do` is four stacked chapters (3,938px) and
About is 785px. No horizontal overflow at 1440×900 or 390×844 in either theme.

**Homepage image count fell by four** — the About chapter's discipline system and history band
carried none, so the drop is Recognition and the creator frames being reached by a shorter page;
the loading behaviour §10p established is intact: **0 eager, 0 preloads, everything lazy.**

---

### 8 — VISUAL VERIFICATION — real composited screenshots

**The §10q headless-Chrome-over-CDP route was used**, and the Browser pane was also compositing
this session. Reviewed as images at 1440×900 in **both themes**, at 390×844, and under emulated
`prefers-reduced-motion`:

- **The brand rail**, dark and light, at rest — optically balanced, real whitespace, marks
  readable at 29px, no two marks forced to the same physical width.
- **The rail at 390** — three marks visible at 22px, clearly readable. Not eighteen tiny marks.
- **The rail under reduced motion** — twelve featured marks, two centred rows, static.
- **The About preview**, dark at 1440 and at 390 — composed, not a stub.
- **`02 / What We Do`** at four scroll positions, including the progress rail reading `01 … 04`
  and the hand-off from Service 04 into the closing statement.
- **`/about`'s credibility chapter** with the twelve-brand index.

**One defect was found by looking that measurement would not have caught**, and it is §10q's
lesson repeating: the four solid-field marks reducing to unrecognisable slabs at rest. See the
mask-derivation note above. Both prior methodological lessons held — *a text search cannot clear
an image*, and *geometry cannot clear a composition*.

---

### 9 — WHAT WAS DELIBERATELY NOT DONE

Recorded because each was explicitly in scope for a **later** task and doing any of it here would
have made it worse:

| Held | Why |
| --- | --- |
| **The creator roster expansion** — Ali Fazal, Fukra Insaan, Purav Jha, Sahil Gambhir, Vibhu Varshney, Allen Chaudhary, Manish Jain, Mukesh Jain, Anubhav Golia, Sagar Rathee, Shadab Jakati, Shubham Kochale, Sahida Ansari, Famous Ram, Deepankar | **Not one name was added.** `config/creators.ts` is untouched; the roster is still the five verified creators and the header still reads `SELECTED CREATORS / 05`. The client is supplying images next, and §10b's rule stands: **no creator without approved local photography** |
| **The Xbhandesiri case study** — 1B dashboard, 800K+ follower growth, 30M+ average views, 130M+ reels, 35%+ retention, a 100K starting point | **No metric was published.** Turning unverified numbers into decorative metrics is precisely what §1 forbids, and it is what the analytics screenshots exist to prevent. Akash Sagar remains configured and `published: false` (§10p) |
| **Red Bull** | **A prospect, not a client.** No logo, no mention, no implied relationship, nothing in `collaborations.ts`. The site's job here is to be strong enough that the recipient sees the credibility that genuinely exists |
| **Service 04 / Web & Digital Experiences** | Still deferred (§10o). Not started, not stubbed, not renumbered |

---

### 10 — DEPENDENCIES, and the files that changed

**No dependency was added.** The logo pipeline is `sharp`, already a dev dependency for the asset
pipeline; the rail timing is arithmetic; the visibility flag is a boolean.

```
src/config/site.ts               new contact set, LinkedIn live, LEGACY_INSTAGRAM, the
                                 WhatsApp note
src/config/collaborations.ts     19 brands, priority/source/logoSource, WITHHELD, new
                                 categories, the derived ordering
src/config/services.ts           `public` on every service, PUBLIC_SERVICES
src/config/service-pages.ts      PUBLIC_SERVICE_PAGES; href + prev/next derive from it
src/config/about.ts              one-paragraph body, historyPreview, notes on what moved
src/config/about-page.ts         the connections note says "a selection"
src/config/inquiry.ts            whatsappValue
src/config/legal.ts              the WhatsApp claim corrected
src/components/Collaborations.tsx   railTiming, ordered roster, data-roster
src/components/about/About.tsx      the preview; History and DisciplineSystem removed
src/components/about/DisciplineSystem.tsx   deleted — /about carries the idea in full
src/components/whatwedo/WhatWeDo.tsx        drives from PUBLIC_SERVICES
src/components/whatwedo/ServiceProgress.tsx the visible span, 01 … 04
src/components/Footer.tsx                   services from PUBLIC_SERVICE_PAGES
src/components/header/ServicesMenu.tsx      same, plus the countless overview line
src/components/about-page/AboutCredibility.tsx  the featured set
src/components/inquiry/ProjectInquiry.tsx   the WhatsApp row's value
src/app/services/brand-shoots-content/page.tsx  derived robots + the hidden-state notice
src/app/globals.css              --collab-duration, reduced-motion roster rule
public/media/brands/*            26 new files, 13 brands, 149KB
```

---

## 10t. CREATOR CREDIBILITY + MEDIA INTEGRATION (Revision 17)

The revision where the site stopped being blocked on client-supplied material. Revision 16 ended
with five open items waiting on an upload; the client supplied a **local media library** and two
confirmations, and this revision closes four of them.

**The library is `F:\Drive data`** — read directly from disk, and it is the authoritative source.
The Drive folder `1IAU2wgNarM8G3hyfa9NusHIg3K-ayNKB` is recorded as provenance only; nothing was
fetched from it.

**The raw library stays outside the repository.** 210 files were audited, **two** were copied in.
No folder was mirrored, no camera dump committed, and not one of the 140 `.MOV` files was moved.
The full ledger is `docs/MEDIA-ASSET-AUDIT.md`; this section records what shipped and why.

---

### 1 — HEIC → JPG, and the tool that actually worked

**13 HEIC/HEIF files, 13 converted, 0 failures, 0 originals touched.**

Both obvious tools fail on these files, and the reasons are worth keeping:

- **Sharp cannot decode them.** libheif rejects every one — *"Number of references in iref box
  (40–48) exceeds the security limits of 16"*. These are ordinary iPhone **grid** HEICs, stored as
  40–48 tiles, and libheif's default `max_iref_references` is below that. Sharp exposes no way to
  raise it. **Do not spend time on this again.**
- **ffmpeg returns one 512×512 tile.** The build available here (CapCut's, the only one on the
  machine) opens the file and hands back a single grid tile rather than the assembled image.
  Fine for video, useless for these stills.
- **ImageMagick is not installed.** `C:\Windows\system32\convert.exe` is the Windows *filesystem*
  tool — never invoke it for images.

**Windows Imaging Component decodes all of them at full resolution**, through .NET's
`BitmapDecoder` from PowerShell, using the HEIF Image Extensions already on the machine.
**No dependency was added**, which was the constraint.

Settings: **JPEG quality 92**, original dimensions, orientation resolved by the decoder (so nothing
downstream re-rotates), **all metadata stripped** — no EXIF, no GPS, no device identifiers. Staging
mirrors the source tree at `F:\Drive data\_website-converted-jpg\`, so every JPEG traces to exactly
one original, and a manifest sits beside them.

Verified after the fact: every output readable, correctly sized and oriented, **none black, blank or
corrupt** (channel means 105–159, standard deviations 58–73).

---

### 2 — Identity discipline, and what it cost

**No face was used to identify anybody.** Identity was accepted only from an explicit folder name, a
filename, existing project metadata, or the client's own instruction.

That rule is what shaped the whole revision. The library contains genuinely good photography of
people the project cannot name — production BTS, campaign environments, group shots — and **all of
it is unpublished**, because a folder called `PRASHANT SIR - PICTURES` tells you whose collection it
is, not who is in each frame.

**Exactly one person cleared the bar**, and by two independent allowed sources agreeing: the folder
is literally `AKASH COVER PHOTO`, and the client named `IMG_2188/2189/2190.jpg` directly.

Three further rules the audit had to apply, each of which held something back:

- **A third-party brand in frame is a brand claim.** zingbus, OPPO and Cream Bell all appear in
  otherwise usable material. All three keep it unpublished — the same logic §9 applies to the rail.
- **A filename that names a person is not evidence of a person.** §10p established this about an
  `alt` attribute; it recurred here on a file whose name thanks a named individual for an award.
- **Unclear context means hold**, even when the file is exactly what the site has wanted.

---

### 3 — WHATSAPP: one number again

**The client confirmed `+91 95482 78558` is also the current WhatsApp line**, which closes the split
Revision 16 had to leave open.

`config/site.ts` now derives both from one constant — `PHONE_E164` is written once and
`whatsappNumber` is that string without the `+`, so the two **cannot drift apart again**. The
previous number `916399399333` is **gone from production entirely**; it survives only in comments
and revision history, which is where an obsolete contact detail belongs.

Two hedges Revision 16 introduced were reverted, because both were only true while the numbers
differed:

- Project Inquiry's WhatsApp row prints `CONTACT.phoneDisplay` again instead of *"Chat with the
  team"*.
- The legal pages say *"or on WhatsApp at the same number"* again. **That sentence has now been
  corrected twice in two revisions** — which is the point: a legal page carries no convenient
  approximations, so it changes whenever the fact does.

`Continue on WhatsApp` in the inquiry fallback is unchanged and still a plain `<a href>` — **nothing
auto-opens**, a click is always required (§10h).

---

### 4 — CURRENT MANAGEMENT — the new chapter

`src/components/management/CurrentManagement.tsx`, copy and provenance in
`src/config/management.ts`, `.mgt-*` in `globals.css`.

**Akash Sagar (`@xbhandesiri_`) is published**, and not as creator #06.

> ```
> Hero → 01 / Selected Collaborations → CURRENT MANAGEMENT → 02 / What We Do → …
> ```

**Second on the page, deliberately.** The brand rail says which brands the work has run alongside;
this says the agency manages a creator, today. Those are the two things an outreach recipient is
scanning for, so they arrive back to back before the site starts explaining itself.

**Unnumbered**, like the Mishram Difference, Client Notes and Project Inquiry — a short teal rule
instead of a chapter index — so `02`, `03` and `ABOUT_CHAPTER` are all untouched and nothing
downstream was renumbered.

**The composition is type left, photography right**, which is the inverse of §06 Recognition and
structurally unlike §03's index-plus-cascade. Three photographic chapters on one page, three
different layouts. The name *is* the headline — every other chapter opens on a statement, this one
opens on a person. One dominant 3:4 portrait, one supporting 4:5 crop hanging off its lower left,
one sentence, one quiet `View Instagram ↗`.

**Frames are sized by height** (`clamp(21rem, 60vh, 33rem)`), not by column width — a 3:4 portrait
filling six columns at 1440 would be 837px on its own, and Revision 16 shortened this page on
purpose. Same reasoning as §05's reel.

**Measured: 834px / 0.93 viewports at 1440×900**, inside the 0.9–1.2 target. 954px at 390.

**What it never says**, and each is a content-integrity constraint rather than a style choice:
no metric of any kind · never "exclusive", "signed" or "under contract" (the evidence supports
*manages*, and does not describe the terms) · no claim that the management caused anything.

**One defect was found by looking rather than measuring:** the frame note ran straight through the
supporting frame's overhang. The overhang is now one declared custom property that both the frame's
offset and the note's clearance read, so they cannot drift.

---

### 5 — ANALYTICS: none exists, and every metric stays unpublished

**The entire library was searched. There is not one analytics screenshot, insights export, dashboard
capture or follower record in it.** Every filename was checked for `analytic`, `insight`,
`dashboard`, `follower`, `reach`, `views`, `stat`, `screenshot`, `RPReplay`; all four PNGs were
opened (three are old brand logos, one is a screenshot *of a photograph*).

The only "followers" match is `…\CREATIVES REELS\10th 100 followers\Akash 100 followers 2.m4a` — a
**voice take for a reel script** inside Mishram's own creative-reel folders. A creative asset, not a
measurement, and not evidence about `@xbhandesiri_`.

So all of it stays unpublished: **1B dashboard · 800K+ follower growth · joined at ~100K · 30M+
average reel views · 130M+ reels · 35%+ retention · 200M/500M projections.**
`MANAGEMENT.metrics` is an empty array and **renders nothing at all** — no placeholder row, no
dash, no "coming soon", the same self-suppressing pattern §06 and Client Notes use. Populating it is
the only change needed, and each entry carries a `source` naming the screenshot it came from.

---

### 6 — THE TWO-LAYER CREATOR SYSTEM

§03 keeps its image-backed stage exactly as approved and gains a second movement beneath it.

**Layer one — the stage.** Unchanged: five creators with approved photography, the talent index,
the cascade, the selection model (§10b).

**Layer two — the worked-with index.** The client confirmed eighteen further relationships. The
library holds an unambiguously identified photograph for **one** of them. Putting the rest on the
stage would mean guessing which photograph is whom, or shipping seventeen empty frames — so the
names are published as **type**: an editorial index on hairlines, three columns at `lg`, two at
`sm`, one on a phone.

**"WORKED WITH" IS LOAD-BEARING.** Not managed, not signed, not exclusive, not clients, not
represented — the project can evidence management for exactly one person and it has its own chapter.
No follower counts, no niches, no tiers, no ranking; `PROMINENT` ordering is reading order only.

**Three names are filtered out by derivation.** Lovekesh Kataria, Nikita Kumawat and Vishnu Priya are
on the client's list *and* on the image-backed stage; printing them again under a heading that says
"Also worked with" reads as an error. `WORKED_WITH` keeps all eighteen as supplied and
`WORKED_WITH_INDEX` derives the fifteen the page needs, so **publishing a roster creator later
removes them from the index on their own**. The match tolerates the `Lovkesh`/`Lovekesh` spelling
difference — both spellings are left as supplied rather than one being silently corrected, because
one is this project's approved-asset spelling and the other is the client's and every public source.

---

### 7 — SCALE — two facts, conservatively worded

**500+ Creators worked with · 1,000+ Promotional videos**, both client-confirmed August 2026.

Published as the **lower bound they were given as**. "500–1,000" was not used: a range invites the
reader to average it, and the figure the client stands behind is the floor. Nothing rounded up,
nothing extrapolated.

**Presented as two large editorial facts on one hairline** — display type with the label beneath,
in the site's own grammar. **Not KPI cards, not a counter, not a chart, no dashboard**; §1 rules
that reading out and §10m already refused it on the one page where numbers were expected.

---

### 8 — SELECTED WORK: still no video, and the reason is not scarcity

**The library contains a finished, vertical, 9:16 Mishram reel** — `…\14th work load\final.mp4`,
2160×3840, 14.1s, h264 60fps, with a 1080×1920 sibling. That is exactly the asset class §10d has
been blocked on for four revisions.

**It is held, on three independent grounds, any one of which is enough:**

1. **It is internal office humour, not creator or campaign work.** §05 is framed as "creator
   content, campaigns and visual work from across our network".
2. **Its burnt-in captions describe two identifiable employees as "our two office lovebirds".**
   Publishing named staff in a romantic framing on a client-facing site, with no consent on file,
   is not a call to make unilaterally.
3. **A Cream Bell / MAXUM banner is prominent throughout** — a brand not on the confirmed roster.

The other candidates are raw takes: the Swiggy folder's pieces to camera show nothing Swiggy-related
in frame and the speaker is unidentified; the `Purav` and `Dr 69` folders hold genuine production
BTS (a lapel mic being clipped on, a crew walking with a gimbal rig) that would be strong evidence
if anybody in it could be named.

**So §05 is unchanged and still shows stills honestly typed as posters.** The unblock is narrower
than it was: not "supply a reel" but "supply a reel that is creator or campaign work, cleared for
publication". **The video path in `WorkMedia` remains built and untested against real media.**

---

### 9 — INFLUENCER MARKETING: two scope rows, and only two

`/services/influencer-marketing` was **not redesigned**. The scope index gained:

- **Creator Outreach**
- **Negotiation** — named as the conversation, not as a commercial function.

§10l recorded that *negotiation* had stopped being unevidenced (the old site's own copy states
"manage outreach, **negotiations**, and briefs") but left the index unchanged, because promoting a
row is a public promise and that was historical copy. **The client has now confirmed both**, so the
reason for holding them is gone. Ten rows, renumbered `01`–`10`.

**Still absent, still deliberate: contracts, legal contracting, rate cards, talent exclusivity and
creator payments.** None is confirmed, each is a materially different promise, and a service page is
the wrong place for a brand to discover a capability was overstated.

---

### 10 — Measured, before and after (1440×900)

| | Revision 16 | Revision 17 |
| --- | --- | --- |
| **Homepage** | **15,671px / 17.41 vh** | **17,061px / 18.96 vh** |
| Current Management | — | **834** (0.93 vh) |
| 03 / Creators | 1,161 | **1,695** |
| Everything else | unchanged | unchanged |
| Image nodes | 20 | **22** |
| Eager images / preloads | 0 / 0 | **0 / 0** |
| Videos / canvases | 0 / 1 | **0 / 1** |
| Horizontal overflow | none | **none** |

**+1,390px, +1.55 viewports**, against a ≤18.7 guidance — **0.26 over, and the arithmetic accounts
for all of it**: a new chapter at 0.93 and a Creators chapter carrying two new movements at +0.59.

**The growth was absorbed inside §03 rather than taken from the page**, which was the instruction.
The index went to three columns at `lg` (six rows became five), row padding and the block's internal
gaps each came down a step, and the chapter's own approach and run-out gave up one step — while the
approved stage composition was not touched. That recovered 260px. **No whitespace was reduced
anywhere else on the site.**

Other viewports: 15,940 at 1280×800 · 13,042 at 1024×768 · 15,884 at 768×1024 · 17,209 at 430×932 ·
16,971 at 390×844.

---

### 11 — Visual verification

Real composited screenshots via the §10q headless-Chrome-over-CDP route, plus a geometry sweep.

**Verified at 1440×900, 1280×800, 1024×768, 768×1024, 430×932 and 390×844, in both themes and under
emulated `prefers-reduced-motion`:**

- **Zero horizontal overflow at every one of them.** The only elements measuring past the viewport
  are `.collab-*` — the brand marquee's own track, clipped by `.collab-rail { overflow: hidden }`,
  which is the documented benign case.
- Current Management reads as premium editorial proof in both themes; the supporting frame tucks
  into the primary's corner below `lg` so nothing reaches past the gutter.
- The worked-with index reads as an index at three columns, two and one. **Rows are 45–47px**,
  clear of 44px even though nothing in it is interactive.
- Under reduced motion, **nothing is hidden** — every element renders at full opacity.

**One defect found by looking that measurement did not catch** (the frame-note collision, §4 above),
and **one found by measurement that looking did not** (three names duplicated between the stage and
the index, §6). Both lessons from §10p and §10q, both still earning their place.

---

### 12 — Dependencies and files

**No dependency was added.** HEIC decoding is a Windows facility reached from PowerShell; video
probing used an ffmpeg already on the machine; the crops are `sharp`, already a dev dependency.

```
docs/MEDIA-ASSET-AUDIT.md              NEW — the full ledger
src/config/management.ts               NEW — the chapter's copy, evidence chain and metric slot
src/components/management/CurrentManagement.tsx   NEW
src/components/creators/WorkedWithIndex.tsx       NEW — scale facts + the worked-with index
src/config/creators.ts                 WORKED_WITH, WORKED_WITH_INDEX, CREATOR_SCALE
src/components/creators/Creators.tsx   mounts the second layer; padding one step tighter
src/config/site.ts                     one number, derived
src/config/inquiry.ts                  WhatsApp row prints the number again
src/config/legal.ts                    the WhatsApp sentence, corrected
src/config/service-influencer.ts       Creator Outreach + Negotiation
src/app/page.tsx                       CurrentManagement, second
src/app/globals.css                    .mgt-* and .wwi-*
public/media/creators/akash-sagar/     2 files, 273KB
```

---

## 10u. CREATOR IDENTITY / PROFILE CORRECTION (Revision 17B)

The revision that had to unpublish something. Revision 17's Current Management chapter was built
around two photographs the audit had cleared by its own strictest rule, **and the user confirmed
they are not Akash Sagar.** So this revision revokes them, rebuilds that chapter around the only
image the project can still trace to him, publishes two genuinely user-labelled photographs, and
turns the worked-with index into a set of real profile links.

**Revision 17 was intact after standby** — the recovery check found nothing missing. See §1.

---

### 1 — RECOVERY CHECK: Revision 17 survived the sleep

Every artefact Revision 17 reported was on disk and coherent before anything new was written:

| Checked | Result |
| --- | --- |
| `src/config/management.ts` · `components/management/CurrentManagement.tsx` · `components/creators/WorkedWithIndex.tsx` · `docs/MEDIA-ASSET-AUDIT.md` | All four present |
| `public/media/creators/akash-sagar/` | Both WebPs present, 273KB |
| Homepage order | Hero → Collaborations → Current Management → What We Do → Difference → Creators → Work Process → Selected Work → Client Notes → Recognition → About → Project Inquiry → Footer. Exactly as §10t left it |
| `500+` / `1,000+` | Both rendering |
| WhatsApp | Every `wa.me` on the page resolves to `919548278558`; `PHONE_E164` is written once and derived |
| Brand Shoots | `public: false`, route `noindex`, no internal link |
| Web & Digital | Still deferred, still 404 |
| `npx tsc --noEmit` | Clean, before any edit |

**Nothing was repaired and Revision 17 was not re-run.**

---

### 2 — THE AKASH SAGAR CORRECTION

#### The images are revoked, and the lesson is not "the rule was too loose"

`IMG_2188/2189/2190.jpg` and both WebPs built from them **do not depict Akash Sagar.** The two
production files are **deleted from `public/`**; the Drive originals are untouched; the audit
carries `REVISION 17 IMAGE ASSOCIATION REVOKED BY USER` at the head of the document and struck
through the entries themselves rather than deleting them.

**Revision 17 cleared those files on two independent allowed sources agreeing** — a folder literally
named `AKASH COVER PHOTO`, plus the client naming the three files. That is the strongest evidence
the audit's rules permit, it was applied honestly, and it was still wrong. The correction is
therefore not "be stricter next time"; it is a specific sentence the audit had already written about
two *other* folders and failed to apply to this one:

> **A folder name says whose folder it is, not who is in the frame. A client naming *files* is
> evidence about files. Only a client confirming *this photograph is this person* is evidence about
> a person.**

That is now rule 7 of the media audit.

#### What replaced the photography, and why it is 72px

`F:\Drive data` was re-searched in full — `akash`, `sagar`, `bhande`, `xbhandesiri`, `bhandesiri`,
and a fresh listing of every directory to catch anything added since Revision 17. **There is no
other Mishram-owned photograph of him in the library.**

So the one remaining traceable image is the profile picture published by the exact official account,
`@xbhandesiri_` — whose own display name is **"Akash Sagar"** and whose bio reads **"Managed by -
@filmybande"**, which is Mishram's own public Instagram (§10s). That is a stronger identity chain
than the folder ever was, and it also re-confirms the management relationship from the creator's own
account.

**Instagram publishes it at 150×150 and nothing larger.** `s320x320`, `s640x640` and the
unparameterised original all return **HTTP 403** — the URL signature covers the size parameter.
Recorded so nobody retries it.

**So it is used as an avatar, at 72px, and the chapter's media treatment was rebuilt around type.**
It is not upscaled, not blurred into a backdrop, not stretched into the frame it replaced.

#### The identity plate — the new right-hand column

`.mgt-frames` / `.mgt-primary` / `.mgt-supporting` are gone. In their place, `.mgt-plate`: a
surface-tinted panel on a hairline with a short teal corner rule, carrying the **72px official
avatar** in the site's own square 3px frame, `OFFICIAL PROFILE` beside it, **`@xbhandesiri_` set at
display scale as the plate's graphic**, and `CREATOR — CURRENTLY MANAGED` under a rule.

It is **not** a social-profile card: no follower count, no verified tick, no Instagram chrome, no
gradient ring, no Follow button. The avatar frame is the same treatment every other photograph on
the page uses.

**One duplication was found by looking and removed.** The first build kept the teal `@XBHANDESIRI_`
caps line under the name *and* set the handle at display scale in the plate — the same string twice
at the same eye level. The left column's copy is gone; the plate owns the handle.

**The plate fills its six-column span at `lg`** rather than floating at an intermediate width, so
its right edge lands on the page gutter. At 27rem it read as a card dropped onto the layout.

**Measured: 834px → 491px at 1440 (0.93 → 0.55 viewports); 954 → 680 at 390.** The chapter got
shorter because type is shorter than a 3:4 portrait, and that headroom is what paid for the creator
chapter's growth below.

**The relationship is still published.** The claim was never the photograph.

---

### 3 — ALI FAZAL — user-confirmed, and the roster's opening slot

| | |
| --- | --- |
| **Input** | `F:\Drive data\ali fazal.jpeg`, 3120×4160 |
| **Production** | `public/media/creators/featured/ali-fazal.webp`, **1000×1333** WebP q74, 177KB |
| **Crop** | `extract{left 355, top 747, 2560×3413}` → **3:4**, the stage's portrait frame exactly |
| **Instagram** | **`@alifazal9`** — verified account, display name "ali fazal" |
| **Relationship** | **`Worked With`.** Never managed, represented, signed or exclusive |
| **Where** | §03's featured stage, **position 01** — the creator the section opens on |

**Identity comes from the filename the user gave it.** No face was compared.

**THE BRIEF'S PATH DID NOT EXIST, and this is stated rather than absorbed.** It named
`F:\Drive data\WEBSITE SHORTLIST\ali-fazal-user-confirmed.jpeg`. **There is no `WEBSITE SHORTLIST`
folder anywhere on `F:\`**, and no `*user-confirmed*` file anywhere either — both were searched for
across the drive. What exists, at the root of `F:\Drive data`, is `ali fazal.jpeg` and
`Lovekesh Kataria.jpeg`: the only files in the library named after those two people, both portrait,
both absent from Revision 17's own listing of that directory. The brief's own rule is that **the
filename is the identity mapping** — so the files were used and the deviation is on the record.

**He opens the section, which is what "strongest visual priority" means here.** §10b gave that slot
to Zoya Jaan; the client has asked for Ali Fazal to lead the creator proof, and the opening slot is
the one the stage shows first and the only image the section mounts on load. **Editorial priority,
not a ranking** — nothing on the page numbers the roster by importance.

---

### 4 — LOVEKESH KATARIA — upgraded, de-duplicated, and one spelling

| | |
| --- | --- |
| **Input** | `F:\Drive data\Lovekesh Kataria.jpeg`, 8064×6048 with **EXIF orientation 6** → 6048×8064 upright |
| **Production** | `public/media/creators/featured/lovekesh-kataria.webp`, **1000×1333** WebP q74, 79KB |
| **Crop** | `extract{left 1286, top 2741, 3800×5067}` → **3:4** |
| **Instagram** | **`@corrupt_tuber`** — verified account, display name "Lovekesh Kataria" |
| **Existing record** | **Upgraded in place. No duplicate creator was created** |

**One person, one spelling.** Revision 17 deliberately carried `Lovkesh` on the roster and
`Lovekesh` in the index, each correct in its own place. The verification pass settled it: the live
official account publishes **"Lovekesh Kataria"**, so that is now the spelling everywhere the site
renders. **The `id` stays `lovkesh`** — it is an internal key that eight other compositions look
this creator up by, and renaming it would be a rename with no reader-facing benefit.

`WORKED_WITH_INDEX` removed him from the index **on its own** when he joined the stage, which is
what that derivation was built for. Same for Ali Fazal. No second list was edited.

**The old file is not deleted.** `config/hero.ts` still uses `lovkesh-kataria.webp` and the Hero is
locked (§05). Only the roster's reference moved — **which means five compositions on
`/services/influencer-marketing` and `/services/brand-shoots-content` inherited the new photograph,
and all five were re-checked as images.** One defect was found there and fixed; see §7.

---

### 5 — PROFILE VERIFICATION: fourteen published, five held

**Every handle was verified against the live official account, not against a search result.** The
bar was **two independent sources agreeing**: the client supplying the handle for that name, *and*
the account's own display name, bio or a stated linkage corroborating the same person. No
aggregator, follower-counter or biography site was accepted as identity evidence.

| Name | Handle | Corroboration |
| --- | --- | --- |
| Akash Sagar | `@xbhandesiri_` | Display name "Akash Sagar"; bio "Managed by - @filmybande" |
| Ali Fazal | `@alifazal9` | Verified; display name "ali fazal" |
| Lovekesh Kataria | `@corrupt_tuber` | Verified; display name "Lovekesh Kataria" |
| Fukra Insaan | `@fukra_insaan` | Verified; display name "ABHISHEK MALHAN"; the handle **is** the stage name supplied |
| Purav Jha | `@puravjha` | Verified; display name "Purav Jha" |
| Sahil Gambhir | `@sahilgambhir_` | Verified; display name "Sahil Gambhir" |
| Vibhu Varshney | `@dilsepaneer` | Verified; display name "Vibhu Varshney" |
| Mukesh Jain | `@mj.mukesh.jain` | Verified; display name "MJ Mukesh Jain"; **bio links `youtube.com/@shallunishapodcast`**, which is the organisation the client named |
| Anubhav Golia | `@anubhav_golia` | Verified; the YouTube channel *"BB Pranks \| Anubhav Golia"* matches the client's `BB Prank` context |
| Nikita Kumawat | `@iamnikitakumawat` | Verified; display name "Nikita Kumawat (Bullet Rani)"; **its own bio names `@imnikkskumawat` as the personal account**, which resolves §10b's four-account problem |
| Vishnu Priya | `@vishnupriyaaofficial` | Verified; display name "Vishnu Priya" |
| Sagar Rathee | `@dr.69___` | Full name "Sagar Rathee Skincare" — **and this project's own media library contains a folder named `Dr 69 - sagar bhai shoot +bts`.** Three things agreeing |
| Sahida Ansari | `@sahida__ansari` | Verified; the handle matches the client's spelling exactly; national coverage of the same creator |
| Deepankar | `@deepankarmaxx` | Display name "DEEPANKAR MAXX"; multiple independent trade-press reports name *"Deepankar Koshta (@deepankarmaxx)"* as the creator behind the viral clip |

**Held — the name is published, the link is not.** Each keeps its row in the index; only the profile
link is absent, which is the rule §18 already applies to unbuilt routes and the suppressed LinkedIn
icon. `WORKED_WITH_UNVERIFIED` in `config/creators.ts` records the candidates and the blocker for
each, so the search is not repeated:

| Name | Why held |
| --- | --- |
| **Allen Chaudhary** | Two live accounts under the name (`@allen_choudhary`, `@allenchoudhary`) with very different followings, and every public source spells it *Choudhary* rather than the supplied *Chaudhary* |
| **Manish Jain** | Seven-plus accounts all presenting as "Manish Jain (JJ Communication)", **including pairs differing by a single character** — the signature of copycat accounts. Reported followings between 8K and 37M |
| **Shubham Kochale** | Five accounts under the name, four of them near-identical numbered variants. No source identifies a primary |
| **Famous Ram** | `@famous_ram` matches the supplied name exactly and is verified, **but its own display name is "NunnaRamesh"** and the content is Telugu-language. Nothing corroborates that this is the person meant |
| **Shadab Jakati** | No reliable source establishes a handle — **and a separate finding is recorded below** |

> **A BRAND-SAFETY FINDING THE CLIENT NEEDS TO SEE, raised rather than acted on unilaterally.**
> National outlets (The Statesman, Free Press Journal, Republic) report that **Shadab Jakati was
> arrested in 2026 over a reel involving a minor**, following a police complaint, with public calls
> for action under POCSO. **The name is still published**, because the client confirmed the
> relationship and removing a confirmed name is the client's call, not this project's. **No profile
> link is attached.** This is flagged in `WORKED_WITH_UNVERIFIED` and here because the page is about
> to be used for a brand-outreach campaign, and a partnerships recipient scanning this roster is
> exactly who would recognise the name. **It is a one-word decision for the client.**

**No metric of any kind was published for anybody.** No follower count, engagement rate, average
views or third-party statistic reached the site, and none was read off any account for publication.
`followers` remains empty for the whole roster.

**One organisation spelling was normalised**, on §10s's rule that an organisation is spelled the way
it spells itself: the client's `Shalu Nisha Podcast` → **`Shallu Nisha Podcast`**, which is what its
own YouTube channel, site and Instagram carry, and what `@mj.mukesh.jain`'s bio links to.

---

### 6 — FEATURED vs WORKED-WITH — the two layers, now both carrying links

**No new homepage chapter was added.** Everything below happened inside §03, which was the
instruction.

**Layer one — the featured stage, 5 → 6.** The approved talent index, cascade, selection model and
media-loading architecture are all untouched (§10b, §10b-scale). Six is inside the 6–8 the brief
asked for, and **below `MATRIX_MIN` (7), so the roster still renders as one column and the desktop
composition keeps its approved 4/8 spans exactly.**

```
01 Ali Fazal          Worked With          @alifazal9
02 Zoya Jaan          Creator Network      —
03 Nikita Kumawat     Creator Network      @iamnikitakumawat
04 Lovekesh Kataria   Creator Network      @corrupt_tuber
05 Mukul Sharma       Creator Network      —
06 Vishnu Priya       Creator Network      @vishnupriyaaofficial
```

**The stage did not become a carousel and does not need to.** Quality over count: the six are the
relationships with approved local photography, and the index carries the scale.

**Two pieces of copy changed, because they stopped being true.** `Creators we've worked with…`
became **`Creators, actors and personalities we've worked with…`** — Ali Fazal is an actor, and
calling him a content creator on a live site would misstate who he is. The roster header
`SELECTED CREATORS / 05` became **`FEATURED / 06`** for the same reason.

**Layer two — the worked-with index, now with real profile links.** `WorkedWith` gained
`instagram` and `lead`; the URL is **derived** (`workedWithUrl`) so a handle and its href cannot
drift apart.

- Each row is a name and, where they exist, a quiet second register carrying the organisation
  and/or the handle. **Names stay dominant**; handles are 12px, lowercase and untracked —
  deliberately *not* the site's `.caps` utility, because `@ALIFAZAL9` is not what the account is
  called. The same correction was applied to the stage's own handle link.
- **No handle renders as a dead link.** No `href="#"`, no disabled control, no greyed row, no
  "profile coming soon".
- **Two lead names — Fukra Insaan and Purav Jha — are set at display scale above the index**, on
  the same hairline grammar. Both are high-recognition relationships with **no first-party
  photograph**, so type is the only honest way to give them weight; the alternative would be
  putting a picture on the page this project cannot source. It is reading emphasis, not a tier —
  the same editorial device the brand rail's `featured` flag already is. `WORKED_WITH_LEAD` and
  `WORKED_WITH_INDEX` **partition** the same array, so a lead can never be printed twice or vanish.

**Final counts: 14 names below the stage — 2 leads + 12 index rows — carrying 9 verified profile
links.** Four keep a row and no link.

---

### 7 — Measured, before and after (1440×900)

| | Revision 17 | Revision 17B |
| --- | --- | --- |
| **Homepage** | **17,061px / 18.96 vh** | **16,828px / 18.70 vh** |
| Current Management | 834 (0.93 vh) | **491 (0.55 vh)** |
| 03 / Creators | 1,695 | **1,805** |
| Everything else | unchanged | unchanged |
| Image nodes | 22 | **21** |
| Eager images / preloads | 0 / 0 | **0 / 0** |
| Videos / canvases | 0 / 1 | **0 / 1** |
| Horizontal overflow | none | **none** |

**−233px, and the arithmetic accounts for all of it:** the management chapter gave up 343px by
becoming typographic, and §03 took 110px back for the sixth creator's roster row, the lead band and
the index's second register. **No approved whitespace was reduced anywhere**, and the target was
≤19 viewports.

Other viewports: **15,792** at 1280×800 · **12,976** at 1024×768 · **15,769** at 768×1024 ·
**17,208** at 430×932 · **16,931** at 390×844. Every one is shorter than Revision 17's.

**Asset weight: −13KB net.** Two Akash WebPs removed (273KB), a 4KB avatar and two 1000×1333
featured photographs added (256KB). The image *node* count fell because the management chapter went
from two photographs to one avatar.

---

### 8 — Visual verification

Real composited screenshots via the §10q headless-Chrome-over-CDP route, at **1440×900, 1280×800,
1024×768, 768×1024, 430×932 and 390×844**, in both themes and under emulated
`prefers-reduced-motion`.

- **Zero horizontal overflow at every viewport.** The only elements past the frame are `.collab-*`
  (the marquee's own clipped track, the documented benign case) and the inquiry form's off-screen
  honeypot, which is what a honeypot is.
- **Under reduced motion, every element this revision added computes to `opacity: 1`** — the plate,
  the lead band, the index, the scale facts and the links were each checked individually rather
  than inferred from a page-wide count.
- **The index reads as an index** at three columns, two and one. Rows are **45–47px**, and 74px
  where a row's name and meta wrap to two lines. Clear of 44 everywhere.
- **At 390 the handles are readable and no record became a card** — names dominant, handle
  secondary, exactly one row wrapping.
- **Both new photographs were art-directed by looking**, then re-checked in the rendered cascade.

**Three defects were found by looking that measurement did not catch**, which is §10q's lesson
earning its place for the fourth revision running:

1. **The handle printed twice** in Current Management, at the same eye level (§2).
2. **Ali's 9:16 reel frame bisected one of the two heads** at `position: 50%`. A 9:16 window shows
   ~43% of a 3:4 source's width, and at 50% its edge landed on a face — which starts to read as
   isolating one figure, the exact thing the crop must not do. Pulled to 46%.
3. **Lovekesh's two 16:9 frames on `/services/brand-shoots-content` rendered as a headless torso
   band.** A 16:9 frame crops a 3:4 source to a 42% vertical band, and at `position: 50%` that band
   sat entirely below both heads. Fixed on the creator's own `portrait.position` (`50% 14%`) rather
   than on those frames — **and it changes nothing on the homepage**, where the file and the frame
   share a 3:4 aspect so there is no overflow for `object-position` to move.

---

### 9 — Dependencies and files

**No dependency was added.** The crops are `sharp` (already a dev dependency), the avatar was
fetched with `curl`, and the QA harness is Node's global `WebSocket` driving the machine's own
Chrome — the §10q route, no package installed.

```
src/config/management.ts          MANAGEMENT_MEDIA → MANAGEMENT_AVATAR; the revocation record
                                  and the avatar's provenance chain; plateLabel / plateNote
src/components/management/CurrentManagement.tsx
                                  Frames() → IdentityPlate(); the duplicated handle removed
src/config/creators.ts            Ali Fazal added at position 01; Lovekesh's photograph, crops
                                  and spelling; verified handles on three roster creators;
                                  WorkedWith.instagram + .lead; workedWithUrl;
                                  WORKED_WITH_LEAD / WORKED_WITH_INDEX partition;
                                  WORKED_WITH_UNVERIFIED; lead + rosterLabel copy
src/components/creators/WorkedWithIndex.tsx
                                  ProfileLink, the lead band, the row's meta register
src/components/creators/CreatorMeta.tsx
                                  the stage's handle link stops being uppercased
src/app/globals.css               .mgt-frames/.mgt-primary/.mgt-supporting → .mgt-plate et al;
                                  .wwi-meta, .wwi-link, .wwi-lead*
docs/MEDIA-ASSET-AUDIT.md         the revocation banner, rule 7, and new §7–§9
public/media/creators/akash-sagar/akash-sagar-xbhandesiri-avatar.webp   NEW, 150×150, 4KB
public/media/creators/featured/ali-fazal.webp                           NEW, 1000×1333, 177KB
public/media/creators/featured/lovekesh-kataria.webp                    NEW, 1000×1333, 79KB
public/media/creators/akash-sagar/akash-sagar-xbhandesiri-primary.webp  DELETED
public/media/creators/akash-sagar/akash-sagar-xbhandesiri-secondary.webp DELETED
```

**Untouched, deliberately:** Recognition, Web & Digital Experiences, the Hero, the brand rail, the
scale facts, the contact set, and every service page's composition (only the photograph five
`lovkesh` frames resolve to changed, and each was re-checked).

**Red Bull:** still a prospect, still absent. Verified on the rendered page — zero matches for
`red bull` in the homepage's text.

---

## 10v. 04 / WEB & DIGITAL EXPERIENCES — the deferred page, first pass (Revision 18)

**§10o's milestone is open.** The client supplied the discovery that section was waiting on — the
projects actually built, the software and CRM scope, the conversion offer — so
`/services/web-digital-experiences` now exists. It is being approved **section by section**, and
this revision covers the hero, the portfolio and the shared inquiry only.

### The route question, and why there is no design-lab

The request named a `/design-lab/web-development/` route. **There is none, deliberately** — §10j,
§10k and §19 all state that this project has no internal, debug, design-lab or preview routes, and
adding one would have been a second route inventory to keep honest. The registry already held the
canonical entry, so the page was built at `/services/web-digital-experiences` against the existing
`ServicePage` record rather than beside it.

**`built` stays `false` while the page is unapproved**, which is the §10l discipline verbatim, and
it is what gives the review the safety a design-lab route was being asked for:

| | State |
| --- | --- |
| Linked from menus, footer, `Explore service ↗`, prev/next | **No** — all read `PUBLIC_SERVICE_PAGES`. Crawled all five public routes: **zero** occurrences of `web-digital-experiences` |
| Reachable by direct URL | Yes |
| Indexed | No — `robots: noindex, nofollow`, derived from `PAGE.built` so it lifts itself when the flag flips |
| Homepage numbering gap | Unchanged, still honest |

### Section rhythm — and proof arrives second

```
01  hero → positioning → system → interaction → scope → proof → audience → process → FAQ
02  hero → relevance → interaction → system → proof → scope → fit → audience → process → FAQ
03  hero → hypothesis → creative + interaction → path → destination → scope → audience → process → FAQ
04  hero → PROOF → …
```

**Earlier than anywhere else on the site, and the reason is structural.** On Services 01–03 the
evidence is a method, which has to be explained before it can be shown. Here it is two live URLs a
visitor can open and judge. Sections 3–8 of the approved flow are designed but **absent rather than
stubbed** — `config/service-web.ts` carries no speculative copy for a section that has not been
built, the same rule the registry applies to an unbuilt route.

### The CTA hierarchy inverts, through a slot rather than a fork

Services 01–03 open with the booking ask because a call is the first step into a retainer. A build
starts with a brief, so `Start a Project` leads, `Explore Our Work` sits beside it, and the
consultation becomes a **quiet third text link** — never a third button. `ServiceHero` grew two
optional props for this (`tertiary`, `wideVisual`); the other four pages pass neither and are
byte-identical.

### Hero — THE DIGITAL BUILD STAGE

Four surfaces at four depths over a measurement field, joined by an orthogonal architecture layer:
**structure → interface → responsive → system.** Unlike the other three heroes nothing radiates,
converges or travels — it is the same object at four stages of being built, seen at once. Each
surface is placed so the part no later surface covers is the part that identifies it.

`SiteSurface` and `MobileSurface` are deliberately the **same drawing** the homepage's
`WebDigitalScene` makes, down to the masthead weights and the 40/40 editorial split, so a visitor
arriving from `02 / What We Do` recognises the object. **No browser chrome**, per §10's own ruling
for that scene. No photography, no code, no dashboard, no WebGL.

**The assembly runs on entry, not on scroll — and that is a deviation from the request.** Gating the
build sequence on scroll leaves a visitor who does not scroll looking at a half-drawn hero, which
§12 rules out. So the entry choreography completes it (~2.4s) and **scroll performs a second
movement**: the field, the structure and the connectors converge into the primary viewport and
clear, the narrow viewport docks, and the group recedes — the same handoff the Growth Orbit makes.

### Selected Digital Work — a window, not a device

Two live projects, and **the viewport is a window**: a hairline frame at the page's own 3px radius
with the site inside it. No traffic lights, address bar, tab strip or laptop bezel. The URL is set
beside the frame as editorial type where it can be read and clicked. The capture is taller than the
window and **translates inside it on scroll**, so the site is seen moving under its own header
rather than sitting as a thumbnail — transform only.

Two compositions, not one scaled: **pinned** at `(min-width: 1024px) and (min-height: 700px) and
(min-aspect-ratio: 5 / 4)`, where one viewport holds the section while the projects reframe through
it; **stacked** everywhere else, and under `prefers-reduced-motion`, which takes the stacked path
with its travel disabled.

**CONTENT BOUNDARY — name, category, capture, URL, and nothing else.** No metric, revenue, traffic,
conversion, launch date, build duration, team size, technology stack, scope breakdown, description
of Mishram's role, or testimonial. None of it is recorded anywhere in this project. Ruchita's own
site publishes figures inside its hero; they appear only *within a screenshot of that site* and are
never repeated in Mishram's voice.

### The captures — §10q's method, reused

Headless Chrome over CDP, no Playwright, no Puppeteer, no dependency added; optimised with the
`sharp` already in devDependencies. **Four assets, 460KB total**, all lazy.

| Asset | Output | Size |
| --- | --- | --- |
| `ekly-desktop.webp` | 1440×1600 | 85KB |
| `ekly-mobile.webp` | 720×2400 | 74KB |
| `ruchita-desktop.webp` | 1440×2600 | 207KB |
| `ruchita-mobile.webp` | 720×2400 | 94KB |

**The crop is the part worth reusing.** A full-page capture of a site with lazy media leaves
unrendered bands mid-page — Ekly's had one at ~1620–2160 CSS px, which inside our frame would have
read as a defect rather than as a scroll position. Each capture was trimmed to the region that
actually rendered, **decided by looking at it**. §10q's lesson again: geometry cannot clear a
composition.

### THE THIRD METHODOLOGICAL LESSON — `useTransform` is sometimes not JavaScript

§10p's was *a text search cannot clear an image*. §10q's was *geometry cannot clear a composition*.
This one is about a fast path nobody asked for:

> **`useTransform(scrollProgress, inputRange, outputRange)` can compile to a WAAPI animation on a
> ScrollTimeline.** When the input comes from `useScroll` and the range is a literal array, Motion
> attaches an `accelerate` descriptor and `VisualElement.bindToMotionValue` turns it into
> `element.animate(...)` — but **only for the five properties in `acceleratedValues`**, of which
> `opacity` is one and `scale`, `x` and `y` are not.

It cost two separate defects, and each looked like something else:

1. **A blank page.** WAAPI keyframe offsets must sit inside [0, 1]. The natural cross-fade band
   around a slot boundary (`start - band` … `end + band`) produces `-0.07` and `1.07`; Chrome
   rejects the whole animation during `commitLayoutEffect` with *"Offsets must be monotonically
   non-decreasing"* and the route renders nothing. The stack trace names React internals and no
   line of this project.
2. **Two projects rendered on top of each other.** Measured at progress 0.994: `scale`, always on
   the JS path, read `0.985` — correct. `opacity`, on the accelerated path, driven from the same
   MotionValue with the same range, read `1` where it should have read `0`.

The remedy is `components/service-page/web/scroll-range.ts` — `useScrollRange`, which passes a
**transformer function** so `useTransform` skips `accelerate` entirely. Every scroll-driven opacity
on this route uses it. **Ranges are still clamped to [0, 1] regardless**, because a band running
past the end of its own track is wrong on its own terms.

### What visual review found, and it was not measurement

Four defects, all inside correctly measured layouts:

| # | Defect | Fix |
| --- | --- | --- |
| 1 | **The hero's scroll handoff had already fired at rest.** `offset: ["start center", …]` measures from the moment the stage's top passes the viewport middle — which, for a composition centred in a 100svh hero, has already happened. Measured **0.304 before a single pixel of scroll**, so the measurement field and all four labels were at `opacity: 0` in the first frame | `["start start", "end start"]` |
| 2 | **The convergence then finished too early** — everything but the interface had cleared by 420px while the lead, detail and both CTAs were still on screen | Windows stretched; the composition now holds through the chapter it belongs to |
| 3 | **`RESPONSIVE` was struck through** by the narrow viewport's frame and its separating ring — §10q's defect 7 exactly | `translateY(0.6rem)` on `.web-anno--corner` |
| 4 | **`STRUCTURE` ran under the interface at 390px**, and at 360 the clearance was 1px | Stacked table re-derived: the interface moves to `x: 22`, the box to `100 / 126` |

Plus three of register rather than geometry: the structure layer was invisible on obsidian at
`--color-line` (now `line-strong`), the primary viewport read as one more faint rectangle in the
`--plan` fill (now the full surface register), and the two front surfaces had no separation in dark
mode, where `--t-image-shadow` is `none` (now `.web-surface--lift`, a canvas-coloured ring that
works in both themes).

### Verified

- **Types, lint and the production build are clean.** All twelve routes prerender.
- **Eight viewports** — 1440×900, 1440×768, 1280×800, 1024×768, 768×1024, 430×932, 390×844,
  360×800 — in **both themes** and under **reduced motion**. No console errors, **no horizontal
  overflow at any size**, exactly one `h1`, one `#hero`, and `h1 → h2 → h3` with no skipped level.
- **Accessibility.** Both project links carry `target="_blank"` + `rel="noopener noreferrer"` and
  distinguishable accessible names (`Visit live site — Ekly, opens in a new tab`). The off-screen
  project in the pinned stage sits inside `[inert]`, so it is out of the tab order and the
  accessibility tree — the one piece of React state in that stage exists for this, and changes once
  per project boundary rather than per frame. Desktop captures carry meaningful `alt`; the
  decorative mobile ones carry `alt=""`.
- **Performance.** Four lazy captures, 460KB total; transforms and opacity only; no new dependency.

### Still to build, in order

Sections 5–8 of the approved flow: the Design + Development + Growth argument, the responsive
demonstration, the development process, and the capability / technology philosophy. **Then**
`built: true`, and the `noindex` lifts with it.

> **SUPERSEDED — see §10y and §10z.** `built: true` shipped in Revision 21, and Revision 22 built
> the Design + Development + Growth argument as `05 / Why Mishram`. The four-section tail above is
> **no longer the plan**: the remaining three chapters collapse into one compact `How We Build`,
> because the route already measures ~14,000px on a phone. Build against §10z's table.

---

## 10x. 04 / BEYOND WEBSITES — the business system (Revision 20)

The chapter that has to move the visitor from *"Mishram builds premium websites"* to *"Mishram can
build the digital infrastructure my business runs on"* — and the one place on the route where that
claim is made rather than listed.

### The ink environment, and the CSS gotcha it exposed

The section carries `.web-ink`, a **scoped re-declaration of the same `--t-*` tokens §3 defines**,
at the obsidian column's values. Everything inside then resolves through the ordinary semantic
names, so **no component in the section references a raw palette value**, and one rule serves both
themes: in light it is a full inversion, in dark it is a no-op and the chapter reads as continuous —
its separation there coming from the chapter rule, the frame marks and a denser composition.

> **`@theme` aliases resolve at `:root`, not where they are used.** `--color-canvas: var(--t-canvas)`
> is declared on `:root`, and a custom property's value is substituted at computed-value time **on
> the element it is declared on**. So overriding `--t-canvas` further down the tree reaches nothing —
> every `bg-canvas` below simply inherits the colour already resolved at the root. The section
> rendered on the light canvas with all sixteen tokens silently ignored.
>
> The global theme toggle never hits this because `[data-theme="light"]` sits on `:root` itself. A
> **scoped** inversion is the first thing on this site to need it, and the fix is to restate the
> `--color-*` aliases inside the scope alongside the `--t-*` values.

### The architecture: accumulation, not transformation

§03's stage transforms one frame between three products. **This one deliberately does the
opposite — nothing is replaced.** Four entry points converge on one record; the record grows a CRM
around it; an automation rail appears beneath the whole thing; and the product surfaces then arrive
**outside the original frame**. Earlier tiers stay on screen, subdued, because the argument *is*
accumulation: the website has to still be visible when the larger system exists.

**The one piece of geometry that moves is the customer record** — large and central while it is
alone, contracted and shifted left as the system builds around it. Everything else holds position
and changes only presence, tone and routes, which is what keeps a fourteen-node diagram to four
transitions rather than a per-frame layout pass.

**The frame marks are the payoff.** Registration corners bound `x 0–72` — the "original website
frame" — and states one to three fit inside them. State four's admin panel, client portal, web app
and mobile surface sit outside. The automation rail was pulled back to end exactly on `x 72` so that
state four is the *first* thing to cross it.

### Motion, and why this section costs nothing at rest

Scroll picks the state — three React updates across the whole track — and every visual change is a
CSS transition. Routes draw with a normalised `pathLength="1"` and a `stroke-dashoffset`
transition: **pure CSS, no per-frame work, and no animated `pathLength`**, so §10's `vector-effect`
shatter gotcha cannot apply. No scroll MotionValue reaches a style property, so §10v's
`accelerate` / ScrollTimeline defect cannot recur either.

**There is no looping animation anywhere in the section**, which is the complete answer to "do not
keep expensive effects running offscreen" — once a state settles there is nothing left running, so
nothing needs pausing. The status mark inside the CRM moves between rows on a state change; it does
not pulse.

### What review found

| # | Defect | Fix |
| --- | --- | --- |
| 1 | **The ink scope did nothing** — see the gotcha above | `--color-*` aliases restated inside `.web-ink` |
| 2 | **The mobile surface overlapped the client portal** by one unit in the shared right-hand column | Phone dropped to `y 29`. Verified by a probe that intersects **every node against every other node in all four states** — zero overlaps, and nothing outside its stage |
| 3 | **Five terms wrap at every width used**, and the divider led each item, so wrapped lines opened on a stray hairline | The divider trails its term instead |
| 4 | **The headline fragmented into three ragged lines**, stranding `problem` — 26 characters against §03's 18 at the shared `34rem` measure | Widened to `44rem` through a scoped `[&_h2]` variant, not in the component the other four pages are art-directed against |
| 5 | **The bridge line resumed a section-padding below the boundary** | Pulled up through `ServiceSection`'s own padding so it starts at the chapter rule |
| 6 | **The CRM strip was illegible in the mobile fragments** — a three-row module body does not survive 28px | A `compact` body: name, status mark, rule |
| 7 | The automation rail overran the frame marks by two units, weakening the one detail the section's argument rests on | Rail re-spaced to end on `x 72` |

### The bridge, and the handoff

§03's rail ends on `Workflow`; this section opens with a line that resumes **in the same grid
column**, labelled `Form submission`, so the two chapters descend as one. At the other end the last
routes leave the frame and the section closes on `Traffic → Experience → Conversion → System →
Growth` — **no heading, no copy, no CTA**, because §05 does not exist yet.

### Verified

- **Types, lint and the production build are clean.** Twelve routes prerender.
- **Eight viewports** — 1440×900, 1440×768, 1280×800, 1024×768, 768×1024, 430×932, 390×844,
  360×800 — in **both themes** and under **reduced motion**. No console or hydration errors, **no
  horizontal overflow anywhere**, one `h1`, one `#hero`, `h1 → h2 → h3` with no skipped level, and
  the ink scope resolving to `rgb(10,10,10)` at every width in both themes.
- **Sticky at 1200+, stacked at 1024 and below** — and the stacked path is what ships in the HTML,
  what a client without JavaScript keeps, and what reduced motion gets. Mobile draws **one tier per
  state** rather than the accumulated whole, which at 360px would be fourteen illegible boxes.
- **Accessibility.** The architecture is `aria-hidden` at every size and **every node it draws is
  named in the copy beside it** — nineteen state terms plus a twenty-five-item directory, all real
  DOM text. Four `h3` state headings in both layouts. The three inactive state copies are `inert`.
  The section has **no interactive controls at all**, so there is nothing to trap a keyboard user
  and nothing behind hover: the node highlight is a pointer-only enhancement over a decorative
  drawing.
- **Sections 01–03 are untouched.** Proved by capturing all three under `prefers-reduced-motion`
  with Section 04 present and again with it removed: **0.0000% of subpixels differ** on each.
- **`built: false` and `robots: noindex, nofollow` unchanged**, and all eight public surfaces still
  contain **zero** occurrences of `web-digital-experiences`.

---

## 10w. 04 / WHAT WE BUILD — the capability explorer (Revision 19)

Section 03 of the Web & Digital Experiences route. It has to answer *"what can Mishram actually
build for us?"* across **thirty-three categories of work** without becoming a directory — and the
obvious solution, a card per capability, would have been thirty-three boxes saying "we do this too".

### The idea: three families of one capability

The categories are grouped into **Websites / Commerce + Service / Digital Products**, and the
section argues they are the *same* capability pointed at different problems. Beside the index sits
**one procedural product architecture that transforms** — six regions that never leave and change
purpose instead of being replaced. The masthead of a website becomes the masthead of a store and
then, without ever unmounting, the navigation rail of an application: an 88×5 horizontal bar
becoming a 12×52 vertical one. That single rectangle *is* the argument.

The list stays typographic — a two-column matrix of names on hairlines. No icon, no container, no
pill, no bento grid, no accordion.

### THE ARCHITECTURE DECISION: scroll-driven progression, discrete state

Sticky scroll-driven on desktop, because the brief's thesis is *transformation, not replacement*
and a tab component gives a before and an after with nothing in between. Three slots down a pinned
track hand one object from state to state.

**But the state itself is discrete, and that is the half that matters.** Scroll sets an index once
per boundary — two React updates across the whole track — and the transformation is a **CSS
transition on the regions' geometry**. Four reasons, and the fourth is specific to this page:

1. It is the only way to hit the specified 500–800ms transition; scroll-linked geometry has
   whatever duration the visitor's wheel gives it.
2. Per-frame `left/top/width/height` on twelve boxes is layout work on every scroll frame. This is
   three transitions for the entire section.
3. `prefers-reduced-motion` neutralises it for free through the global block — same three states,
   switching instantly, no component-level branch.
4. **Nothing in this section reads a scroll MotionValue for a visual property**, so the
   `accelerate` / ScrollTimeline defect §10v documents *cannot* recur here.

### The threshold is higher than the section above it, deliberately

`DigitalWork` pins from **1024**; this pins from **1200**. That section pins one image beside a
short meta column; this one needs an index, a twelve-row matrix *and* a composition in the same
100svh panel. **1024×768 therefore gets the stacked sequence**, which is the better composition
there rather than a degraded one — measured, the pinned left column is 605–638px against a 642–782px
panel at 1200–1440, and would not have fitted at 1024.

Mobile abandons the sticky experience entirely: all three families render in sequence — label,
title, description, composition, flow, matrix — so **every capability is reachable by scrolling and
by a screen reader, with nothing behind a tap.** That is also what ships in the HTML
(`useMediaQuery` is `false` on the server) and what a client with no JavaScript keeps.

### What measurement found, and none of it was visible in a layout that "worked"

| # | Defect | Fix |
| --- | --- | --- |
| 1 | **The pinned index exposed no headings.** The stacked sequence used `h3` per family; the sticky index used links in a list, so the same page had two different document outlines depending on viewport | The family name is an `h3` wrapping the link in both layouts. `h3` count 2 → 5 |
| 2 | **Four matrix rows wrapped to two lines at 1280** — `MEMBERSHIP PLATFORMS`, `PERSONAL BRAND SITES`, `E-COMMERCE WEBSITES`, `APPOINTMENT SYSTEMS`. At `col-span-4` the matrix got 174px per column | Split rebalanced to **5 / 6** (column six is the gutter). 224px per column — 45px of slack on the longest name, so it survives a font fallback and a longer future entry |
| 3 | **One row still wrapped at 360–430**, where two columns leave ~155px | **One column below `sm`**, two from 640 |
| 4 | **`STRUCTURE`, `COMMERCE` and `WORKFLOW` printed across the top border of the region they name** at 360–768. Root cause: label geometry is absolute px while the gaps between regions are percentages of a stage that shrinks — a 4-unit gap is 14px at 390 and cannot hold an 8px label plus its offset | Corner offset 0.6rem → **0.3rem** for this stage only, and the three gaps widened to 5+ units. Verified by a probe that intersects **every label against every region in all three states**: zero collisions at 360 / 390 / 430 / 768 / 1024, and in all three states at 1200 / 1280 / 1440 |
| 5 | Capability rows carried `tabIndex={0}` in the stacked sequence, where focusing them updates nothing | Focusable only where focus does something |

**A methodological note on defect 2 and 3.** The first wrap probe counted `getClientRects().length`,
which reports **one** rect for a flex item however many lines it holds — so it returned "0 wrapped"
while a screenshot plainly showed two lines. Measuring rendered *height* found four. §10q's lesson
inverted: geometry cannot clear a composition, and a bad geometry probe cannot clear it either.

### The handoff into Beyond Websites

The last state's architecture is drawn with **two connectors that leave the bottom of its own
frame** and are clipped by it, and the section closes on a descending rail — `Customer → Data → CRM
→ Workflow` — with **no heading, no copy and no CTA**, because the chapter that answers them has not
been built. §10o's rule against placeholders holds.

### Verified

- **Types, lint and the production build are clean.** Twelve routes prerender.
- **Eight viewports** — 1440×900, 1280×800, 1200×760, 1024×768, 768×1024, 430×932, 390×844,
  360×800 — in **both themes** and under **reduced motion**. No console errors, **no horizontal
  overflow anywhere**, one `h1`, one `#hero`, `h1 → h2 → h3` with no skipped level, and all three
  states reached at every sticky width.
- **Accessibility.** `aria-current="true"` on exactly the active family; the index rows are real
  anchors to slot markers, so category navigation is native and needs no scripted scrolling (§10);
  the two inactive matrices are `inert`; and **all thirty-three capability names are real text in
  the DOM in both layouts**, not a property of the drawing.
- **Hero and Selected Digital Work are untouched.** Proved rather than asserted: captured under
  `prefers-reduced-motion` (which stills the idle drift) before and after this section existed —
  **0.0000% of subpixels differ** on both. Without reduced motion the same comparison shows 1.33%,
  which is entirely `svc-drift` phase: the longer page makes the capture harness's scroll sweep
  ~1.4s slower, landing the shot at a different point in a 13–19s loop. Worth knowing before
  treating a pixel diff on this page as a regression.
- **`built: false` and `robots: noindex, nofollow` are unchanged**, and all five public routes
  still contain zero occurrences of `web-digital-experiences`.
- **Performance.** No continuous animation, no scroll-linked visual property, no canvas, no new
  dependency, and no MotionValue fan-out — the section's entire animation budget is three CSS
  transitions.

---

## 11. Responsive strategy

| Breakpoint | Behaviour |
| --- | --- |
| What We Do pinned | `(min-width: 1280px) and (min-height: 680px) and (min-aspect-ratio: 5 / 4)` |
| Everything else | What We Do stacks — no pinning, in-view animation instead |
| ≥768px (stacked) | Chapters split into two columns — copy `col-span-5`, stage `col-span-7` |
| <768px (stacked) | One column: copy, then stage |
| 768–1100px portrait | Hero uses the **stacked** composition (media in the lower band) |
| <768px | Mobile: stacked hero, mobile menu, bottom-sheet contact |

Two independent shape-aware queries, both in `hooks/useMediaQuery.ts`. **Neither is a device guess.**

**`STACKED_HERO_QUERY`** — the hero switches on frame *shape*: a portrait tablet needs the stacked
composition even at 820px. Mirrored by `.hero-media` / `.hero-scrim` in `globals.css`; **change both
together.**

**`DESKTOP_SEQUENCE_QUERY`** — the pinned What We Do sequence. The 1280 is measured, not chosen: the
capability rail needs a ~168px cell to hold `Creative Production` on one line and stay two columns,
and below two columns it becomes four rows and overflows the fixed `h-[22rem]` copy holder into the
progress indicator (at 1024px it overshot by 65px). A 12-column grid only gives `col-span-4` that
much room from about 1254px up. The height and aspect guards catch the rest: a 100svh panel is only
worth pinning if there is height to pin, and a portrait tablet cannot carry the composition however
wide it looks. Mirrored by `data-sequence` on the section, which gates the scene annotations in CSS.

### What We Do across sizes

- **Scene geometry** is handled once, by `.svc-stage-box` (§10) — the composition box holds a
  constant 1.141 aspect at every viewport, so no scene can spill and no annotation placement can
  drift. This replaced the per-scene spill that existed at 768–1023px.
- **Tablet 768–1279px** gets the stacked path deliberately, laid out as two columns rather than a
  full-width band a scene has to letterbox inside. Copy left, scene right, vertically centred, one
  hairline between chapters.
- **Capability rail** uses `auto-fit` with a minimum that steps at 768px alongside the `.caps`
  font-size, and tracks at 0.16em rather than the 0.26em `.caps` default. Two columns at 1440, 1280
  and every phone down to 375px; one column on the narrow stacked copy column at 768–1023px. Never a
  wrapped capability label.
- **Closing CTA** keeps the buttons on one row wherever they fit and lets them fall into a clean
  left-aligned stack below that (they wrap at 375px), 52px tall throughout, with
  `15 MIN · NO OBLIGATION` under the group exactly as the Hero does it.

Verified at 1440×900 / 1440×768 / 1366×768 / 1280×800 / 1152×800 / 1024×768 / 820×1180 / 768×1024 /
430×932 / 390×844 / 375×812 — both themes and `prefers-reduced-motion` — with no horizontal
overflow, no scene spill, no wrapped capability and no console errors.

---

## 12. Motion philosophy

Motion communicates the work; it is never decoration.

- Hero is the site's only heavy 3D moment. **No second WebGL canvas.** Later sections get
  progressively lighter — CSS transforms, perspective, masks, Motion values.
- Restrained: slow drifts, small offsets, long periods. No blobs, particles, bouncing loops,
  scroll-jacking or gimmicks.
- Prefer depth and position over `opacity: 0 → 1`.
- Standard easing `[0.16, 1, 0.3, 1]`; entry sequences stay under ~1.5s. No splash screen, no
  loading counter.
- Avoid React state per scroll pixel — use MotionValues.

---

## 13. CTA & lead generation

- **Primary:** `Book a 15-Min Call`, with `15 MIN · NO OBLIGATION`. Low friction, no aggressive sales
  language.
- **Secondary:** `Contact Us` → the panel (WhatsApp / Email / Call / Book a Call), for visitors who
  won't schedule immediately.
- **Placement is strategic, not repeated.** Hero (strong) → Services (contextual, e.g. "Discuss this
  project") → a major proof section → closing section. Never a large CTA after every block.
- **`Book a 15-Min Call` appears twice on the homepage: the Hero and the Footer.** §02's closing
  booking block went first (§10 — the second ask before any proof), then About's (§10f — the primary
  ask sitting immediately above a form asking the same thing). The Footer's is the **last remaining
  duplication** and the Footer redesign in §19 removes it.
- **Project Inquiry (§10h) is the page's conversion endpoint.** About bridges into it with
  `Tell us what you're building ↓`. Adding another booking CTA anywhere needs a real argument, not a
  spare gap.
- **Service pages have their own hierarchy** — §10j. `Book a 15-Min Call` **once**, in the hero,
  beside `Start a Project`; one contextual text link mid-page; the shared inquiry form at the foot.
  The "exactly once on the page" count above is a **homepage** rule; what carries to a service route
  is the restraint, not the number.
- Journey the homepage should walk: attention → credibility → capabilities → proof → process →
  results → conversion. Hero owns attention; Collaborations owns credibility.
- **Portfolio-first:** show the work rather than claiming it. "Creator Growth" means showing
  creators; "Web Development" is evidenced by this site itself.

---

## 14. Key files

```
src/app/layout.tsx            fonts, metadata, theme boot script, providers, RouteTransition,
                              Header + Footer
src/app/globals.css           tokens, both themes, .caps/.page-x, smooth scroll + anchor offset,
                              hero + collab + service CSS
src/app/page.tsx              homepage composition — the sections, nothing else
src/app/services/social-personal-brand-growth/page.tsx
                              01 / Social & Personal Brand Growth — the first service route
src/app/services/influencer-marketing/page.tsx
                              02 / Influencer Marketing — the second service route
src/app/services/performance-marketing/page.tsx
                              03 / Performance Marketing — the third service route
src/app/services/brand-shoots-content/page.tsx
                              05 / Brand Shoots & Content — the fourth built route (04 deferred)

src/config/site.ts            brand, NAV_ITEMS + SECTION_ORDER + TOP_ANCHOR, SOCIAL_LINKS,
                              real contact data, BOOKING_URL, WhatsApp helpers
src/config/hero.ts            hero copy, media surfaces, annotations
src/config/collaborations.ts  public brand rail + brand-safety note
src/config/services.ts        five services, `built` flags, SERVICE_SCROLL_VH, section copy
src/config/creators.ts        the roster, per-creator media + crops, publish flag, section copy,
                              WORKED_WITH + the derived index, CREATOR_SCALE (§10t)
src/config/management.ts      the Current Management chapter — copy, the evidence chain, the
                              photography, and the empty verified-metric slot (§10t)
src/config/process.ts         five process stages, pipeline geometry, paths, section copy
src/config/work.ts            work items, media typing, crops, the media audit record
src/config/recognition.ts     recognition items (empty) + the full recognition audit
src/config/testimonials.ts    testimonials (empty) + the full testimonial audit
src/config/about.ts           About copy, disciplines, and the source note for every claim
src/config/sections.ts        adaptive visible-chapter numbering
src/config/difference.ts      the interlude's copy and its four differentiators
src/config/inquiry.ts         inquiry copy, options, limits + the shared validator
src/config/footer.ts          Footer V2 labels + the discipline equation (values come from
                              site.ts, service-pages.ts and legal.ts)
src/config/legal.ts           Privacy / Terms / Cookies content, the audit of the old site's
                              documents, and the record of what this site actually does
src/config/routes.ts          the public route map + the transition's destination marker
src/config/service-pages.ts   the service-route registry (`built` flags), the homepage→route
                              link helper (`servicePageHrefFor`), `isServiceRoute`,
                              `SERVICE_PARENT`, + the shared section vocabulary every service
                              page's copy is written into
src/config/service-social.ts  all of the Social & Personal Brand Growth page's words
src/config/service-influencer.ts
                              all of the Influencer Marketing page's words + its content boundary
src/config/service-performance.ts
                              all of the Performance Marketing page's words, the test-bench and
                              variant-sheet surface definitions, + the strictest content boundary
                              on the site (no figure of any kind, and why)
src/config/service-shoots.ts   all of the Brand Shoots & Content page's words, the shot-builder
                              arrangements, + the photography audit that disqualified the old
                              site's brand-shoot gallery under §9

src/components/Header.tsx     header + mobile menu, live anchors, active-section state,
                              the services disclosure
src/components/header/*       the services menu — desktop panel + mobile group
src/components/Footer.tsx     Footer V2, the agency desk
src/components/transition/*   the Mishram signal wipe — one route transition, mounted globally
src/components/legal/*        the shared legal article shell
src/components/ui/PageLink    internal route link that plays the wipe (wraps next/link)
src/components/Hero.tsx
src/components/Collaborations.tsx
src/components/hero/*         WebGL scene, shader card, spatial layout, procedural textures, fallback
src/components/whatwedo/*     section shell, copy, progress, stage, closing statement, scenes/
src/components/difference/*   interlude shell + axis, connected stack, rail, evidence fragments
src/components/inquiry/*      inquiry shell, form, field primitives
src/components/ui/SocialIcon  the three platform marks, inline SVG
src/app/api/inquiry/route.ts  server-side inquiry delivery (the only holder of the API key)
src/components/creators/*     section shell, talent index matrix, photographic stage, meta
                              block, load-gated transition, worked-with index + scale facts
src/components/management/*   the Current Management chapter
src/components/process/*      section shell, pipeline SVG, active-stage detail, vertical rail
src/components/work/*         section shell, work index, media stage, media surface
src/components/recognition/*  section shell (self-suppressing), evidence surface
src/components/testimonials/* Client Notes shell (self-suppressing), quote index, quote stage
src/components/about/*        the About preview chapter + its closing conversion moment
src/components/service-page/* shared service-page primitives — section shell + head + grid, hero,
                              statement, connected system, scope index, audience rail, process,
                              FAQ, prev/next rail
src/components/service-page/social/*
                              the Social page's own art direction — the Brand Signal hero
                              composition, the Content System board, the creator field
src/components/service-page/influencer/*
                              the Influencer page's own art direction — the Campaign
                              Constellation hero, the Creator Match Field, the braided campaign
                              system, the casting wall, the fit relations
src/components/service-page/performance/*
                              the Performance page's own art direction — CreativeSurface (the
                              abstract, wordless, numberless ad surface every composition is
                              built from), the Experiment Field hero, the variant sheet, the
                              Creative Test Bench, the performance path, the optimisation rail,
                              the landing experience, the scope experiment mark
src/components/service-page/shoots/*
                              the Brand Shoots page's own art direction — ShootFrame (one
                              photographic frame, three size buckets, §10b crops reused), the
                              Live Contact Sheet hero, the Shot Builder, the format system, the
                              direction desk, the selects, the scope frame mark
src/components/theme/*        ThemeProvider (+ boot script), ThemeToggle
src/components/contact/*      provider, panel, icons
src/components/ui/*           CtaButton, Magnetic, Arrow, Wordmark
src/app/{privacy,terms,cookies}/page.tsx
                              the three legal routes — shells around LegalArticle
src/hooks/*                   useMediaQuery (+ useStackedHero, useDesktopSequence),
                              usePrefersReducedMotion, useDialogBehaviour, useHoverLock,
                              useActiveSection, useHashLanding, useSectionHref
```

Assets: `public/media/creators/*.webp` (5 portraits — `lovkesh-kataria.webp` is now used by the
**Hero only**, §10u), `public/media/creators/featured/*.webp` (`ali-fazal.webp`,
`lovekesh-kataria.webp` — both 1000×1333, user-labelled, §10u),
`public/media/creators/akash-sagar/akash-sagar-xbhandesiri-avatar.webp` (150×150, the official
profile picture — **the only image on this site that comes from a live account**, §10u),
`public/media/brands/*.png` (**18 mask + 18
colour**, one pair per published brand — §10s; all local, all built from official sources, none
hotlinked),
`public/media/recognition/mishram-best-digital-marketing-agency-nufew-2024-25.webp` (850×680, the
§06 award — cropped from the old deployment's original and stored locally, §10p),
`public/brand/mishram-wordmark.png` (used as a CSS mask so it inherits `currentColor`). Everything is
local — nothing is hotlinked.

---

## 15. Dependencies

Runtime: `next@16.3.2`, `react@19.2.8`, `react-dom`, `three@^0.185`, `@react-three/fiber@^9.7`,
`motion@^13.1`, `clsx`.
Dev: `typescript`, `tailwindcss@4`, `@tailwindcss/postcss`, `eslint` + `eslint-config-next`,
`@types/three`, `sharp` (asset pipeline only).

The Project Inquiry form added **none**: plain React, native form controls, and one server-side
`fetch` against Resend's REST API rather than their npm package. No form library, no validation
package, no email SDK.

The service-page system, the services menu, Footer V2, the route transition and the legal pages
(§10j, §10k) added **none either**. The wipe is Motion and one fixed element; the menu is a real
`<button>` and a `<ul>`; the legal pages are typography. **No router library, no transition package,
no icon set, no headless-UI dependency, and no analytics or consent SDK** — the last of which is why
the cookie policy can honestly say the site sets no cookies.

`@react-three/drei` was **removed** — `useLoader(TextureLoader)` and a hand-rolled projection replaced
its two uses. Do not reinstall it, a carousel library, a cursor package or a second animation engine.

Next 16 notes: Turbopack by default, `next dev` regenerates `AGENTS.md`/`CLAUDE.md`, and version-
specific docs live in `node_modules/next/dist/docs/`.

---

## 16. Performance rules

- Hero WebGL is the only heavy runtime cost and is lazy, pausable and DPR-capped.
- three.js chunk (~875KB uncompressed) is lazy-loaded client-side only; it never blocks first paint.
- Images pre-encoded to WebP at display-appropriate sizes (5 creator photos ≈ 220KB total).
- Prefer CSS transforms and MotionValues; no per-pixel React renders.
- No new runtime dependency without a real justification.
- Sections below the hero must stay lightweight.

---

## 17. Accessibility & reduced motion

- Semantic HTML, one `<h1>` (hero), section `aria-labelledby`, skip link.
- Single focus treatment site-wide: 1px accent outline, 3px offset.
- `MotionConfig reducedMotion="user"` strips transform animation from the DOM layer, leaving fades.
- `prefers-reduced-motion` also: hero canvas → `frameloop="demand"` (composition settles, then
  stops); marquee → static centred grid of five; service drift and parallax off; content and
  hierarchy always preserved — never hidden.
- Hover-only feedback is gated to fine pointers; keyboard `:focus-within` equivalents exist for the
  logo rail (activate once logos become links).
- Contact panel and mobile menu: full dialog semantics, focus trap, Escape, focus restoration.
- Header nav links (`Work / Services / Creators / About`) are live plain anchors — see §10g. Native
  hash navigation, `scroll-margin-top` for the fixed header, `scroll-behavior: smooth` disabled
  under reduced motion, `aria-current` on the section in view, and the mobile menu closes before the
  browser performs the navigation. No clickable divs anywhere in the header or the footer.
- **Disclosure panels stay mounted.** `aria-controls` has to name an element that exists, so a
  collapsed FAQ answer is hidden with `inert` and a CSS `grid-template-rows: 0fr → 1fr` transition,
  never unmounted (§10j). Unmounting it leaves every closed button pointing at nothing.
- **A `pathLength` draw needs a reduced-motion fallback.** Motion implements it as an inline
  `stroke-dasharray` / `stroke-dashoffset`, so a draw that is stripped or never fires leaves the
  line invisible — force the drawn state in CSS with `!important` (§10j), the same class of bug
  §10g records for the footer signal.
- **So does an animated `transform` that starts at zero.** §10m's optimisation tracks hold their
  teal fill at `scaleX(0)` until it animates; a stripped transform animation leaves every track
  looking empty. `transform: scaleX(1) !important` in the reduced-motion block is the fix — the same
  reasoning as the `pathLength` guard, on a different property.
- **And the reverse case: hiding something under reduced motion needs `!important` too.** §10m's
  travelling dash resolves its entry to an inline `opacity: 1`, which a plain
  `.pfm-flow { opacity: 0 }` cannot reach past — the dash would survive as a static thicker stroke
  over the line it was meant to travel.

---

## 17b. DEPLOYMENT — GitHub + Vercel, and the production origin

The site is deployed. This section is the operational record: where it lives, what is wired to
what, and the two things that are still the client's to do.

### The production origin — one constant, and why it is not an env var

`SITE_URL` in `config/site.ts` is `https://mishram.media`, and `app/layout.tsx` passes it to Next's
`metadataBase`. **Every route's `alternates.canonical` and `openGraph.url` stays a relative path**
and resolves against it — so the domain appears in exactly one place on the site.

**It was missing entirely before deployment, and that is a production defect rather than a tidiness
one.** With no `metadataBase`, Next falls back to the deployment's own hostname: on Vercel that is
the per-deployment `*.vercel.app` URL, so **every preview build would have published canonicals and
OpenGraph URLs pointing at itself**, and any preview that got indexed would compete with the real
site. An environment variable would have the same failure mode the first time it was missing on one
environment. The canonical origin is a fact about the business, not about the host.

The homepage also gained its own `alternates.canonical: "/"`. Every other route already declared
one (§10j); `/` was the single page whose canonical was whatever origin served it.

Verified on the deployed site: `/` and `/about` carry `https://mishram.media` canonicals, and
`/services/brand-shoots-content` still carries `noindex, nofollow` — the derived directive from
§10s survives deployment.

**`sitemap.ts` and `robots.ts` do not exist.** Neither did before; nothing was added, because
building either means making route-policy decisions (the hidden Service 05, the deferred Service
04) that belong to a scoped SEO task rather than to a deployment. Recorded as the obvious next
improvement, not as a defect.

### GitHub

`github.com/krishlathwal/mishram-media` — **private**, production branch `main`. It is this
project's own repository and always has been; the local `origin` already pointed at it and the
remote HEAD matched the local commit before any work started, so **no repository was created and no
history was rewritten.**

**Secret audit, run before the first push.** Every file ever added in every commit was listed and
matched against `.env`, `.pem`, credential and secret patterns: **the only match in the entire
history is `.env.example`**, which is deliberately tracked as the documentation of what production
needs. `.gitignore` already excluded `node_modules`, `.next`, `.vercel`, `.netlify` and `.env*`
with a `!.env.example` negation.

**One thing to know about `vercel link`:** it writes a `.env.local` containing a `VERCEL_OIDC_TOKEN`
and then appends its own `.vercel` and `.env*` lines to `.gitignore`. The token file was already
covered by the existing rule and never entered the index; **the appended `.gitignore` lines were
reverted**, because a bare `.env*` after the file's own `!.env.example` negation is exactly how a
deliberately-tracked template stops being tracked on the next clone.

### Vercel

| | |
| --- | --- |
| Team | `silksora` (`team_8EBVpOomRw1AwITgcDqlTQgZ`) |
| Project | **`mishram-media`** — `prj_88q2cT1X6WpG8t0xUy70jUf4pk7L` |
| Git link | `github/krishlathwal/mishram-media`, production branch **`main`** |
| Framework | **Next.js**, `npm run build`, Node 24.x |
| Deployment URL | `https://mishram-media.vercel.app` |

**It is a new project, deliberately.** The account already holds `mishramngo`
(`krishlathwal/mishram.org` — **Mishram Foundation, a different legal entity**) and `souklane`.
Neither was touched, and **nothing about this site is attached to the Foundation's project.**

**`vercel.json` exists for the same reason `netlify.toml` does.** The project was created through
the API rather than the dashboard's new-project flow, which is what performs framework detection,
so it was created with no framework preset. Declaring `framework`, `buildCommand` and
`installCommand` in the repository fixes it for every future deployment and keeps build
configuration in version control rather than in dashboard state.

**`next export` must never be introduced.** `/api/inquiry` is a real route handler and needs a
server at runtime (§10h) — verified on the deployed site, which answers `503
delivery_not_configured` and `400 invalid_request` correctly.

> ### ⚠ GIT-CONNECTED DEPLOYMENTS ARE BLOCKED, AND THE REASON IS THE PLAN
>
> **The Git integration is configured correctly and it does fire.** A push to `main` creates a
> Production deployment on its own — verified twice. **Vercel then refuses to build it.**
>
> The deployment's own record says `readyState: BLOCKED`, with no build log and no error code, and
> GitHub carries Vercel's commit status as **`failure — "Deployment was blocked"`**. It is not a
> build failure, a permissions problem or a queue: **the same source builds in 47 seconds when the
> CLI uploads it.**
>
> **The cause is that `silksora` is on the Hobby plan and `krishlathwal/mishram-media` is a private
> repository.** The evidence is on the same account: `mishramngo` deploys from Git without
> trouble, and its repository — `krishlathwal/mishram.org` — is **public**. Hobby deploys public
> repos from Git and uploads from the CLI; **private repos from Git need a paid plan.**
>
> **Three ways out, and the choice is the client's:**
>
> | Option | Consequence |
> | --- | --- |
> | **Upgrade `silksora` to Vercel Pro** | The repository stays private and continuous deployment starts working immediately. Nothing in this repo changes |
> | **Make the repository public** | Free, and Git deployments start working — **but it publishes this document.** The brief carries the client's contact strategy, the withheld-brand reasoning, held creator identities, the Shadab Jakati brand-safety finding and every audit. **Do not take this option without reading what is in `docs/` first** |
> | **Keep deploying with `npx vercel deploy --prod`** | Works today on the current plan, costs nothing, and is manual — somebody has to remember |
>
> **Until one is chosen, `npx vercel deploy --prod` is the deployment command**, and the live site
> is one of those. A blocked deployment is inert: it never becomes the production alias, so a push
> cannot take the site down.

> **`netlify.toml` AND `.netlify/state.json` ARE STILL IN THE TREE, AND THIS NEEDS A DECISION.**
> The site was previously wired to Netlify (site `d41f4d3c-…`, and `.netlify/` is gitignored so it
> never reached the remote). `netlify.toml` **is** committed. Vercel ignores it, so it breaks
> nothing here — but **if that Netlify site is still connected to this GitHub repository, every
> push to `main` now builds the site twice, on two hosts.** That is not dangerous today; it becomes
> dangerous the moment somebody points DNS at the wrong one. Either disconnect the Netlify site or
> keep it deliberately as a fallback — but decide, rather than leaving two live pipelines.

### Environment variables — none configured, and every fallback verified

No `.env`, `.env.local` or `.env.production` exists locally, so **there was nothing legitimate to
configure and nothing was invented.** All four are absent on Vercel:

| Variable | State | Behaviour without it |
| --- | --- | --- |
| `RESEND_API_KEY` | missing | `/api/inquiry` answers `delivery_not_configured` |
| `INQUIRY_FROM_EMAIL` | missing | Same. It deliberately has no default (§10h) |
| `INQUIRY_TO_EMAIL` | missing | Would default to `CONTACT.email` anyway |
| `NEXT_PUBLIC_BOOKING_URL` | missing | Every booking CTA falls back to WhatsApp |

**The form never fakes a success**, says plainly that delivery is not configured, and offers
`Continue on WhatsApp ↗` carrying the whole brief — a link the visitor has to click. Verified on
the deployed site: the WhatsApp fallback resolves to `https://wa.me/919548278558`.

### Domains

Both are attached to the project and **ownership is verified — no TXT challenge is required**
(`domainOwnership: current-scope`, `acceptedChallenges: []`).

- **`mishram.media` — the canonical production domain.** No redirect.
- **`www.mishram.media` — a 308 permanent redirect to the apex**, set on the project's domain
  record rather than in application code, so nothing in `next.config.ts` or middleware handles it.

**The nameservers stay at GoDaddy.** Vercel offers `ns1/ns2.vercel-dns.com` as an alternative and
it is **not** being taken: the domain carries `info@mishram.media`, and moving nameservers moves
MX, SPF, DKIM and DMARC with them. The A/CNAME route achieves the same result and touches nothing
else.

**The records Vercel asked for**, read off `vercel domains verify` rather than assumed:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `7bb1978068d42c76.vercel-dns-017.com.` |

Vercel also reports lower-ranked fallbacks — a single `A @ 76.76.21.21`, and
`CNAME www cname.vercel-dns.com.` — which are the older shared endpoints. The rank-1 values above
are what it currently recommends.

**The conflicting records at GoDaddy**, as Vercel observed them: the apex resolves to
`76.223.105.230` and `13.248.243.5`, and `www` is a CNAME to `mishram.media.` Those are what the
records above replace. **Nothing else at GoDaddy is touched** — MX, SPF, DKIM, DMARC and every
unrelated TXT record stay exactly as they are.

### What is still outstanding

1. **The GoDaddy DNS change**, which is the client's to make.
2. **The plan-vs-visibility decision** above, which is what unblocks continuous deployment.
3. **The Netlify decision** above.
4. **Deployment protection is off** and the deployment URL is public, which is correct for an
   outreach campaign. Say so out loud if that ever changes.
5. **No rate limiting on `/api/inquiry`** — §10h records this as deployment hardening, and it is
   now genuinely deployment-time. Provider-level or edge middleware; a per-process counter is
   meaningless on serverless.

---

## 10o. SERVICE 04 / WEB & DIGITAL EXPERIENCES — WHY IT WAS DEFERRED

> **SUPERSEDED IN PART BY §10v (Revision 18).** The client supplied the
> discovery this section was waiting on, and the route now **exists**: hero,
> Selected Digital Work and the shared inquiry are built. `built` is still
> `false` and nothing links to it while the page is approved section by
> section. The reasoning below is why it got its own pass, and it still stands.

**This was a scheduled milestone, not an unfinished page.** Read this before
concluding the service pages are "nearly done bar one" or offering to fill the
gap quickly.

Until Revision 18 `/services/web-digital-experiences` **did not exist**, `built`
stayed `false`, and nothing on the site linked to it — verified after Revision
12 by crawling every internal `href` on all eight public routes.

### Why it is held back

Its page has to demonstrate a materially wider scope than any other service
page: **websites, landing experiences, custom software, CRM systems, internal
business tools and automation** — the required list is in §10's Service 04 note,
and the homepage's own capability rail already states the software half out
loud. It is also the one service where **the site itself is the portfolio**, so
the page sets the ceiling for how technically credible Mishram looks.

A version built in the same pass as another service would inevitably be a
web-agency page with software bolted on. **The client asked for it to get its
own deep design and build pass**, and that is the right call.

### The temporary numbering gap, and why it is honest

The built sequence is **`01 → 02 → 03 → 05`**. Service 05 keeps its canonical
index — it is **05, never renumbered to 04** — because the numbering belongs to
the five-service system in `config/services.ts`, not to the order the routes
happened to ship in.

Everything derives, so nothing had to be special-cased:

| Surface | Behaviour with 04 deferred |
| --- | --- |
| Header + mobile services menu | `Overview · 01 · 02 · 03 · 05`. **No disabled Service 04 row**, and no renumbering to hide the gap |
| Homepage `02 / What We Do` | Services 01, 02, 03 and 05 show `Explore service ↗`; Service 04 shows none, because `servicePageHrefFor` returns `undefined` for it |
| Footer Services directory | The same four routes |
| Prev / next | 03 → **Next: Brand Shoots & Content**; 05 → **Previous: Performance Marketing**. `adjacentServicePages` walks `BUILT_SERVICE_PAGES`, so it steps straight over 04 |
| Route transition | `Services / 05 — Brand Shoots & Content`, from the same registry |

**When Service 04 ships, the sequence repairs itself** — one `built: true` plus
its metadata, and 03 → 04 → 05 falls out with no component edit. Two things are
already waiting for it: §10m's landing-experience section is the natural home
for a contextual link to it, and §10n's `ShootFrame` shows the pattern its own
media primitive should follow rather than one it should share.

**It was not built as part of another task.** It got the dedicated pass this
section asked for — see §10v.

---

## 18. Do NOT redesign

Approved and locked. Extend, don't rebuild:

- **Revision 17B's decisions (§10u) — awaiting review, then locked.**
  - **`IMG_2188/2189/2190.jpg` NEVER REPRESENT AKASH SAGAR AGAIN**, in any crop, at any size, on
    any surface. The user revoked the association; the two WebPs are deleted. Do not "restore" them
    from the audit, and do not reason from the `AKASH COVER PHOTO` folder name.
  - **A folder name is not a person, and a client naming *files* is not a client naming *a
    person*.** This is the correction Revision 17B cost, and it is now rule 7 of the media audit.
    Revision 17 followed the identity rule correctly and still got it wrong.
  - **The Akash avatar is 150×150 and is rendered at 72px. Never upscale it**, never blur it into a
    backdrop, never stretch it into a portrait frame. Instagram serves no larger variant — every
    other size returns 403. The chapter stays typographic until a Mishram-owned photograph with
    explicit identity exists.
  - **Ali Fazal is `Worked With`, not managed.** Never *managed*, *represented*, *signed*,
    *exclusive* or *under contract*. Exactly one person on this site is described as managed.
  - **Both new photographs keep both figures in every format.** The user's label establishes that
    each person is *in* the frame, not which figure they are — isolating one asserts something
    unverified. This is §10b's existing rule, now applying to three photographs.
  - **A handle is published only where two independent sources agree** — the client supplying it,
    and the live official account corroborating the person. **Five names are held and keep their
    rows with no link**; do not "finish the set" from a name match. `WORKED_WITH_UNVERIFIED` says
    why for each, so the search is not repeated.
  - **No metric, ever, for anybody.** Handles are destinations; follower counts, engagement rates
    and third-party statistics are claims. `followers` stays empty for the entire roster.
  - **Handles render lowercase and untracked, never through `.caps`.** `@ALIFAZAL9` is not what the
    account is called.
  - **`lovkesh-kataria.webp` stays on disk.** The Hero uses it and the Hero is locked. Only the
    roster's reference moved.
  - **The lead names in the index are reading emphasis, not a tier.** Do not number them, rank
    them, or add a third level.
  - **SHADAB JAKATI CARRIES AN UNRESOLVED BRAND-SAFETY FINDING** (§10u §5) — a 2026 arrest reported
    by national outlets over a reel involving a minor. The name is published because the client
    confirmed the relationship; **the decision to keep or remove it is the client's**, and it should
    be put to them before this page is used for outreach.
- **Revision 17's decisions (§10t) — awaiting review, then locked.**
  - **NO FACE IS EVER USED TO IDENTIFY ANYBODY.** Identity comes from an explicit folder name, a
    filename, existing project metadata or the client's own instruction — otherwise the asset is
    `IDENTITY UNKNOWN` and stays unpublished, however good the photograph is. This kept most of a
    210-file library off the site and it is not a bar to lower.
  - **"Worked with" is not "managed".** §03's index and the Current Management chapter are two
    different claims, and exactly one person has the second. Do not relabel the index, and do not
    move somebody between the two without separate confirmation.
  - **No Xbhandesiri metric without a dated insights capture.** `MANAGEMENT.metrics` renders
    nothing while empty — that is the design, not an unfinished state. Never populate it from the
    figures discussed in planning.
  - **The scale facts stay lower bounds and stay editorial.** `500+` and `1,000+`, never a range,
    never rounded up, never a KPI card, counter or chart.
  - **A third-party brand in frame is a brand claim.** zingbus, OPPO and Cream Bell all appear in
    otherwise usable material and all three keep it unpublished. Same logic as §9's rail.
  - **The raw library stays outside the repository.** `F:\Drive data` is a source, not an asset
    folder; HEIC originals are never deleted or overwritten, and conversions go to the staging tree.
  - **`whatsappNumber` derives from `CONTACT.phone`.** One number, written once. Do not re-split it.
- **Revision 16's decisions (§10s) — awaiting review, then locked.**
  - **`built` and `public` are two different questions and must stay apart.** `built` is a fact
    about the code; `public` is the editorial decision. **Never set `built: false` to hide
    something that exists**, and never hardcode `if (service.id === "shoots")` — every discovery
    surface derives from `PUBLIC_SERVICES` / `PUBLIC_SERVICE_PAGES`. Brand Shoots & Content comes
    back with one boolean, and its `noindex` lifts with it because that is derived too.
  - **Service 05 keeps its canonical `05`** while hidden, and Web & Digital Experiences is not
    promoted to close the gap.
  - **The published phone number and the WhatsApp number are deliberately different** until the
    client confirms WhatsApp on the new line. Do not "fix" the inconsistency by pointing `wa.me`
    at an unconfirmed number, and do not print the published number under a WhatsApp label.
  - **Fun N Earn is never published** (§9). Real-money gaming, confirmed from the product's own
    terms. The rule does not turn on whether the relationship is genuine.
  - **VYRL renders nothing until an official logo exists.** No aggregator file, no platform
    avatar, no recreation.
  - **The rail's timing stays derived.** Copies-per-track and duration come off the roster, so
    adding brands can never silently triple the marquee's speed again. A brand's `logoSource` and
    `source` are development-only and are never rendered.
  - **`Trusted by`, `Partners` and `Our clients` stay out of the collaborations copy.** *Worked
    with* is what the project can evidence for every mark on the rail.
- Header (layout, wordmark, nav, theme toggle placement)
- Growth Orbit Hero — composition, copy, WebGL architecture, shader, `layout.ts` values, exposure
  tiers, entry sequence, scroll recede
- Custom cursor / pointer caption system
- Dark + light theme system and token names
- Contact panel and its data
- Selected Collaborations — layout, marquee, speed, logo treatment, hover colour, brand list
- **02 / What We Do — the whole section is locked.** Intro, scroll architecture, all five service
  scenes, the progress indicator, the closing statement, and the responsive behaviour in §11. Extend
  nothing here without explicit approval. Service 04's copy and its `Custom Build` annotation were
  changed under an explicit instruction (§10); the scene itself was not, and **the closing statement
  must not regain a CTA block**
- **03 / Creators — locked again, now that the roster has been scaled.** The talent index, the
  cascade geometry, the five per-creator crops in §10b, the selection model, the matrix and the
  media-loading architecture in §10b-scale, and the empty follower fields all stand. Fill
  `followers`/`instagram` when the client confirms a handle, and add creators by config — that is
  what §10b-scale exists for. **Do not reintroduce mount-everything media loading, an inner scroll
  area, pagination, a carousel or a virtualisation dependency**

- **Footer V2, the services menu and the route transition (§10k) — awaiting review, then locked.**
  The wordmark stays a left-aligned signature, not a centred poster. `Services` stays a plain anchor
  with a disclosure beside it, never a nav item replaced by a dropdown. The wipe stays under ~550ms
  and never stalls a navigation. **Every service link, footer service row and menu row stays derived
  from `built`.**
- **LinkedIn stays present and unlinked** until a real profile URL is confirmed — `aria-disabled`
  on a non-anchor, never `href="#"` and never a bare domain (§10k).
- **The legal pages describe this site, not a template.** If the site gains an analytics tool, a
  cookie, an embed or a new processor, the policy changes in the same commit — never after.
- **Service 02 (§10l) — awaiting review, then locked.** The Creator Match Field routes through
  formats, never through people, and its creator backdrop is evenly treated under every intent —
  **that is a content-integrity constraint, not a style choice.** Do not "improve" it by lighting
  up creators per campaign type. The page carries no figure of any kind, and the scope carries no
  negotiation, contract or payment claim until the client confirms one.
- **Service 03 (§10m) — awaiting review, then locked.** **Not one performance figure appears on the
  route, and that is a content-integrity constraint rather than a style choice.** Do not "improve"
  the test bench by showing a winning variant, adding a confidence bar, a percentage, a chart or a
  red/green state — every one of them would be a fabricated result, and on a performance page a
  fabricated result is a business claim. The creative surfaces stay wordless, imageless and
  brandless for the three reasons at the head of `CreativeSurface`. **Google Ads stays out of the
  scope index** until the client confirms it, and no FAQ answer promises a result. The page carries
  **no photography at all**, which is a decision, not a gap.
- **Service 05 (§10n) — awaiting review, then locked.** **The old site's brand-shoot gallery stays
  out**: 16 of its 19 images are betting, casino, fantasy-gaming or offshore-CFD brands, which §9
  excludes permanently, and all 19 are hotlinked. Do not reintroduce them, and do not substitute
  stock photography — the five approved creator files are the library, and one source resolving
  into four formats is the page's argument rather than a shortage it is hiding. **Prominent frames
  use the `portrait` and `reel` crops**; §10b's `content` crops drop below the face and render as
  flat fabric at any size that matters. Nothing on the page names a client, campaign, photographer,
  camera, location, date, package or price.
- **Service 04 stays deferred (§10o).** Do not build it inside another task, do not create a
  placeholder, and do not renumber Service 05 to close the gap. **It now needs the client discovery
  listed under *Exact next step* before any design work begins.**
- **`/about` (§10r) — awaiting review, then locked.** It has **no signature interaction and no system
  diagram**, and that is the design rather than an omission — a fifth interactive chapter would make
  it the sixth service page. **No team member, no founder, no city, no scale claim** ever appears on
  it; the four historical names stay unpublished until the client confirms them. The archive board
  shows five fragments from five chapters with a note on the page saying so — **do not let it imply
  one campaign**, and do not add a stock image to fill it. The service index stays derived from
  `built`, so Web & Digital Experiences renders as a capability with no link.
- **`About` in the navigation means the page.** Header, mobile sheet and footer all resolve it to
  `/about`, and active state comes from the pathname. **Do not point it back at `#about`** — one
  word cannot mean a section on one route and a page on another.
- **Art-direct a shared primitive with a slot, never a fork** (§10l). `ServiceScope.accessory` and
  `ServiceProcess`'s derived column count are the pattern; a second copy of either component is not.
- **06 / Recognition's content (§10p) — content-integrity constraints, not style choices.**
  **`NUFEW` is never expanded** — it exists only as pixels on a badge and `grep` returns zero text
  matches in either repository. **Nobody in the photograph is named**, including the presenter the
  old markup's alt text guesses at and the recipient who resembles the founder photograph. No rank,
  no "national", no "#1", no jurisdiction, nothing quoted from the illegible plaque. The asset stays
  a **local** crop that excludes the source banner's promotional typography and clipart — do not
  recolour it, do not add gold, and do not add trophy iconography anywhere. **Recognition's image
  never carries `priority` or eager loading**; the prop was deleted from `RecognitionMedia` so it
  cannot come back.
- **Client Notes stays suppressed.** All eight old-site testimonial candidates are **conclusively
  rejected** after two independent audits (§10d-notes). Do not re-audit them, do not soften a quote
  into usability, and do not populate the section because the architecture exists. It switches on
  with genuine first-party client material and nothing else.
- **The creator roster's rejected names never return (§10p).** Irwin Javier, Boss Toni and Argoni X
  are one stock photoshoot series relabelled as three creators; Vijay 3 Guy is a generated/stock
  portrait on a tile whose own `alt` names a different person; `xx_mrswag` is unnamed and carries
  another photographer's watermark. **`Currently Managed` belongs to Akash Sagar alone** — the
  historical five keep `Creator Network`, because "worked with" is the old site's own ceiling for
  them. A handle renders as a link **only where it is verified**.
- **NEVER LINK TO A ROUTE THAT DOES NOT EXIST.** No `Coming Soon` label, no disabled control, no
  `href="#"`, and no placeholder page committed to make a link valid. Every service link on the site
  is derived from the `built` flag in `config/service-pages.ts` (§10j), so an unbuilt service
  renders nothing at all. The same rule already governs Recognition, Client Notes and the
  suppressed LinkedIn icon — a missing thing is absent, never faked.
- **The service-page system (§10j) — awaiting review, then locked.** The shared primitives, the
  section rhythm, the grid rules, the CTA hierarchy, the navigation helper and the inquiry
  integration are what the remaining four routes inherit. Extend them with new *content*; do not
  fork a page's own copy of a primitive, and **do not extend the config types to describe layout** —
  each service keeps its own hero composition, signature interaction and proof section as React.

Also permanent: no generic agency cards, no SaaS layouts, no Bento grids, no card-grid landing-page
components, no six-icon feature grids, no pricing cards and no template FAQ blocks. The homepage is
one art-directed system, and so is every service page.

---

## 19. Current status & next step

> **READ §10u, §10t AND §10s FIRST IF YOU ARE PICKING THIS UP AFTER REVISION 17B.**
>
> **§10u (Revision 17B):** **the Revision 17 Akash Sagar photographs were not him** — the user
> revoked the association, both production files are deleted, and Current Management is now a
> typographic chapter built around the **official 150×150 profile picture rendered at 72px**. The
> featured stage carries **six** people: **Ali Fazal opens it** and **Lovekesh Kataria's imagery was
> upgraded** from two user-labelled photographs at `F:\Drive data`. The worked-with index carries
> **nine verified profile links**; **five names are held with no link** and one of them,
> **Shadab Jakati, carries an unresolved brand-safety finding the client needs to decide on.**
> The homepage is **16,828px / 18.70 viewports**.
>
> **§10t (Revision 17):** the homepage has a new second chapter — **Current Management**, publishing
> Akash Sagar (`@xbhandesiri_`) — and §03 gained a second layer of scale facts and a worked-with
> index. **WhatsApp is one number again.** The client's media library lives at `F:Drive data` and
> the full ledger is `docs/MEDIA-ASSET-AUDIT.md`. **No Xbhandesiri metric is published**, because
> the library contains no analytics evidence at all.
>
> **§10s (Revision 16):** the public contact set is new, the brand rail carries eighteen brands
> rather than five, **Service 05 / Brand Shoots & Content is hidden from public discovery with its
> implementation fully intact**, and the homepage About chapter is a preview of `/about`.
>
> The homepage is **16,828px / 18.70 viewports** at 1440×900 (§10u; it was 17,061 / 18.96 after
> Revision 17).

**Done and approved (locked, see §18):** design system, both themes, Header, Growth Orbit Hero,
Selected Collaborations, **02 / What We Do**, **03 / Creators**.

**Awaiting review:** **The Mishram Difference** (§10a), **04 / Work Process** (§10c),
**05 / Selected Work** (§10d), **06 / Recognition** (§10e, §10p — **now active with one verified
award**), **About** (§10f, §10p — the last storytelling chapter, now carrying the verified
2021/2023/2025 history band and the page's closing conversion moment),
the **navigation + Footer** (§10g), **the service-page system + `/services/social-personal-brand-growth`** (§10j),
**`/services/influencer-marketing`** (§10l), **`/services/performance-marketing`** (§10m), and
**`/services/brand-shoots-content`** (§10n).

**The homepage shell is complete.** Header → Hero → Collaborations → What We Do → The Mishram
Difference → Creators → Work Process → Selected Work → (Recognition) → About → Footer, with the
global contact panel over it. Every header, mobile-menu and footer link resolves to a real section;
the development spacer after About is gone and there is no blank area below the Footer.

**The site now has a second page type.** `/services/social-personal-brand-growth` is built on the
shared service-page architecture in §10j, and the homepage's Service 01 links to it.

**Four service pages exist; three are public.** §10l, §10m and §10n. Each shipped on the shared
system and lit the Header menu, the mobile menu, the homepage `Explore service ↗`, the Footer
Services directory and prev/next **with no component edit at all** — and Revision 16 took one of
them back off all of those surfaces the same way, with one boolean (§10s §5). **Service 04 is
deliberately deferred (§10o)** and `/services/web-digital-experiences` returns 404 with nothing
linking to it; **Service 05 is built and deliberately hidden**, its route reachable by direct URL
and carrying `noindex, nofollow`. The public sequence is `01 → 02 → 03`, and every service keeps
its canonical index.

**The shared system has now carried four genuinely different stories** (§10j, §10l, §10m, §10n):
one identity outward into a system; many voices inward onto one campaign; a loop that travels and
comes back; and a board of frames resolving into a library. The last two are the extremes of the
set — Service 03 carries **zero images and no figure of any kind**, Service 05 carries **29 frames
and no diagram at all** — and both reuse every shared primitive while sharing no composition, no
section order and no interaction model with anything before them.

**The global shell is now complete** — §10k. Eight public routes: the homepage, four service pages
and the three legal documents. Footer V2 is a working directory rather than a poster, `Services` in
the header opens a menu of the routes that exist, and every internal route change plays one shared
transition. Nothing in any of it is hand-listed; it all derives from the registries.

### Revision 12

**05 / Brand Shoots & Content** — §10n. The fourth service page built, and the most photographic
one on the site: **no connected-system diagram anywhere on it**, and the only SVG on the route is
the scope accessory. It is built around **the shoot board** — idea → direction → frame → format →
library — with a **Live Contact Sheet** hero of six frames, indices, crop marks and a selection
bracket; a **Shot Builder** whose five directions replace the photographs and their crops rather
than redrawing a diagram; a **format system** that proves one photograph becomes 9:16, 4:5, 1:1 and
16:9 by actually doing it; and a **sheet of selects** whose heights and aspects both vary.

**The old site's brand-shoot portfolio was audited and disqualified wholesale** — 16 of its 19
images are betting, casino, fantasy-gaming or offshore-CFD brands (§9), and all 19 are hotlinked.
So the library is the five approved creator files, which turns out to be the honest way to sell
creative direction: **29 frames, 5 source files, 11 fetched variants, 1 eager, 0 videos.**

**Service 04 was deliberately not built** — §10o. It is a scheduled deep-build milestone, so the
route sequence is temporarily 01 → 02 → 03 → 05 and Service 05 keeps its canonical index. The gap
is visible in the header menu on purpose.

**Screenshots worked in this session**, and looking at the page caught three defects measurement
would not have: three crops that rendered as flat fabric, a format crop squeezing its sentence to
9px, and 50px-wide crops on a phone. Measured **11,189px / 12.43 viewports**, above the 9–11.5
guidance — both of the brief's authorised merges were applied before the first measurement, so the
arithmetic and the two remaining cuts are recorded in §10n rather than taken unilaterally.

### Revision 11

**03 / Performance Marketing** — §10m. The third service page, and the hardest content problem on
the site: performance marketing is the service a visitor most expects numbers on, and Mishram has
none it may publish. **The route carries no performance figure at all** — no ROAS, CTR, CPA, spend,
revenue or conversion count, not even decoratively — and no dashboard, no ad-manager chrome, no Meta
UI and no chart with an axis. What it draws instead is **the experiment engine**: hypothesis →
creative variants → paid distribution → landing → signal ↺ next test, told four ways. The
**Experiment Field** hero travels left to right and returns; the **Creative Test Bench** lets a
visitor change one variable and watch three genuinely different surfaces replace three others; the
**performance path** is a flat closed circuit rather than a rising pipeline or a convergence; and
the **landing experience** argues the half of a campaign everyone inherits. The page has **zero
images, zero canvases and zero videos** — a deliberate inversion of Service 02's fifteen. Two
sections carry two movements each, both merges removing a genuine repeat rather than trimming
content, which took ~1,150px out of the route. Measured **11,384px / 12.65 viewports**, above the
9.5–11 guidance, with the arithmetic and the two available cuts recorded in §10m rather than taken
unilaterally.

### Revision 10

**02 / Influencer Marketing** — §10l. The second service page, and the first real test of whether
the shared architecture carries a different story. It reuses every shared primitive and shares no
composition or section order with Service 01: a **Campaign Constellation** hero of five creators
converging on one signal, a **Creator Match Field** where five campaign intents redraw the route,
a **campaign system** of four strands braiding into one trunk, and a **casting wall** of uneven
portraits. Two primitives gained slots rather than forks — `ServiceScope.accessory` and a derived
column count on `ServiceProcess`. `built: true` was flipped only after validation, and four
discovery surfaces plus prev/next lit on their own. **Not one figure appears on the page**, and the
match field routes through formats rather than people so no real creator is ever categorised.

### Revision 09

**Global shell refinement** — §10k. **Footer V2**: the 616px centred wordmark became a 340px
left-aligned signature, and the space it freed carries contact, navigation, the built service
routes, socials and legal — 803px → **681px** at 1440, 1,070 → **1,012** at 390 with far more in it.
**LinkedIn is now visually present and still not a link** (`aria-disabled`, no href), turning into a
real one the moment its URL is configured. **A services menu** was added beside the header's
`Services` anchor, listing the overview and every built route, with a matching expandable group in
the mobile sheet. **One route transition** — the Mishram signal wipe — now runs for every internal
pathname change from the root layout, with hash navigation deliberately left native. **Three legal
routes** were written after auditing the old site's documents and discarding almost all of them: the
old cookie policy claimed Google Analytics, Facebook Pixel, Google Ads and a LinkedIn Insight Tag,
and **this site has none of them**. No homepage section was redesigned and Service 01 is untouched.

### Revision 08

**Public route discovery, and the homepage → service-page link** — §10j, *The public route
inventory* onward. The App Router tree was inventoried from the filesystem rather than from this
document: **two public pages, one API route handler, and no internal, debug or design-lab route
anywhere.** Service 01 in `02 / What We Do` gained `Explore service ↗` beside its existing
`Discuss this project ↗`, derived from the registry's `built` flag so Services 02–05 render nothing
rather than a dead link. The header now lights `Services` on any `/services/...` route, resolved
from the URL with the homepage observer left unattached. The service page's hero eyebrow became a
real breadcrumb — `SERVICES / SOCIAL & PERSONAL BRAND GROWTH`, with the parent linking back to
`02 / What We Do`. **No homepage layout, scene, scroll or section copy was otherwise touched**, and
the copy block's metrics are byte-identical to before.

### Revision 07

**The service-page system, and the first page on it** — §10j. Shared primitives (section shell,
head, grid modes, hero, statement, connected system, scope index, audience rail, process, FAQ,
prev/next), a thin route registry deriving its titles from `config/services.ts`, and one
fully art-directed page: **01 / Social & Personal Brand Growth**, whose hero composition resolves a
single creator identity into the formats a brand is made of, and whose signature interaction is a
five-pillar content-system board. The shared `ProjectInquiry` gained three optional props so a route
can preselect its own service without a second form or a second endpoint; `NAV_ITEMS` gained one
helper so header and footer anchors leave a subpage correctly. **The homepage was not changed.**

### Revision 06

**Full homepage review** — §10i. Audit of the rendered page end to end, then four fixes: three
below-the-fold `priority` images removed (both LCP warnings cleared), the serif accent dropped from
§04 to break an eight-section template, the per-service CTA quietened, and 48px of Footer slack
trimmed without shrinking the closing mark. **The homepage is structurally complete.**

### Revision 05

**The Footer was completely redesigned** — §10g, "The Final Signal". The old editorial colophon is
gone: it continued the page grid, read as another band, and repeated the booking CTA. The new one is
a full-bleed closing canvas that **inverts to obsidian even in light mode**, draws no grid and no
border, opens on the teal trace §10h's fade resolves into, and ends on the Mishram wordmark at poster
scale with a pointer-tracked teal band inside the letterforms. **Its `Book a 15-Min Call` was
removed, so the ask now appears exactly once on the homepage, in the Hero.** Facebook was promoted to
a published social link on the strength of the old site's schema.org `sameAs`; LinkedIn stays
suppressed because the only URL that ever existed for it is a bare domain.

### Revision 04

**Project Inquiry added** above the Footer — §10h. The homepage's final conversion moment: an
editorial project brief with real validation, a server-side delivery route that never exposes a
credential, and an honest WhatsApp fallback for when email delivery is not configured. **About's
closing `Book a 15-Min Call` was removed** and replaced with a bridge into the form (§10f), leaving
the Footer's as the last remaining duplication. The twelve-column grid now resolves through this
section so the Footer can become a distinct ending.

### Revision 03

**Client Notes added** between §05 and Recognition — §10d-notes. An unnumbered interlude, built and
**shipped rendering nothing**: a bounded audit of the old site found eight candidate testimonials
across three sources and disqualified all of them (placeholder avatars, one quote attributed to two
people verbatim, placeholder job titles, and a testimonials page still praising the template's own
agency). Verified against a temporary populated config, which was then reverted.

### Revision 02

**03 / Creators rearchitected to carry 15–20+ creators** — §10b-scale. The concept, composition and
interaction model are untouched; the roster became a derived-column matrix and the stage stopped
mounting every creator's frames. Stress tested at 24, then the synthetic entries were removed —
production holds exactly the five legitimate creators. §03 also adopted the shared `useHoverLock`,
which §10c had flagged as worth consolidating whenever that section was next opened.

### Revision 01

Four targeted corrections after reviewing the whole page. Nothing was redesigned.

1. **§02's duplicated booking CTA removed.** `Book a 15-Min Call` + `Contact Us` at the end of
   What We Do — the second ask on the page, before any proof. See §10; do not reinstate.
2. **Service 04 now states the software capability.** New description and a
   `Web Design / Web Development / Custom Software / CRM Systems` rail, plus one annotation in the
   scene (`Interaction` → `Custom Build`). The scene is otherwise unchanged. The future service
   page's required scope is recorded in §10.
3. **The Mishram Difference interlude added** between §02 and §03 — §10a.
4. **Vertical rhythm tightened at the §02 boundary.** §02's closing runs to `lg:pb-16` and the
   interlude's axis carries the gap, so the mostly-empty viewport between the two chapters is gone
   without losing the whitespace.

### Revision 17

**Creator credibility + media integration** — §10t. The revision where the site stopped being
blocked on client-supplied material. The client supplied a **local media library** (`F:\Drive data`,
210 files) and two confirmations, and four standing blockers closed.

**Akash Sagar (`@xbhandesiri_`) is published**, in a dedicated **Current Management** chapter
placed **second on the page**, directly after the brand rail — not as creator #06. Unnumbered, one
dominant portrait and one supporting crop, the name as the headline, one sentence, one quiet
`View Instagram ↗`. **834px / 0.93 viewports.** No metric appears on it, and `MANAGEMENT.metrics`
is an empty array that renders nothing: **the entire library was searched and contains zero
analytics screenshots**, so every figure discussed for that section stays unpublished.

**HEIC conversion came first, as instructed.** All 13 HEIC/HEIF files converted at quality 92 with
metadata stripped, originals untouched, staged in a mirrored tree. Neither Sharp (libheif rejects
iPhone grid HEICs on an iref security limit) nor the available ffmpeg (returns one 512×512 tile)
can do it — **Windows Imaging Component can**, with no dependency added.

**§03 became two layers.** The image-backed stage is untouched; beneath it sit **two scale facts**
— 500+ creators worked with, 1,000+ promotional videos, published as the lower bounds they were
given as — and a **worked-with index** of fifteen further confirmed names as type. Three of the
client's eighteen are filtered out by derivation because they are already on the stage. **"Worked
with" is load-bearing**: management is a bigger claim and exactly one person has it.

**WhatsApp is one number again** — the client confirmed `+91 95482 78558`, so `whatsappNumber`
derives from `CONTACT.phone` and the previous number is gone from production. Two Revision 16
hedges were reverted, the legal sentence among them.

**Influencer Marketing gained Creator Outreach and Negotiation**, both now client-confirmed;
contracts, rate cards, exclusivity and payments stay out.

**No video was added to Selected Work**, and not for want of one: the library holds a finished 9:16
Mishram reel, held on three independent grounds including burnt-in captions naming two employees
and a third-party brand banner throughout. **Identity discipline is what shaped the whole
revision** — no face was used to identify anybody, and it kept a great deal of good photography
unpublished.

Measured **15,671 → 17,061px, 17.41 → 18.96 viewports**, with the growth absorbed inside §03 rather
than taken from the rest of the page. **No dependency added.**

### Revision 16

**Current proof / outreach preparation** — §10s. The first revision aimed at a specific
commercial use of the site: a high-value creator and brand outreach campaign whose recipient will
open the page cold. **Nothing was redesigned** — every change is data, one derived flag, or copy.

**The public contact set was replaced** with `info@mishram.media`, `+91 95482 78558` and
`@filmybande`, and **LinkedIn went live** on the client's supplied profile URL — the row §10k
built as present-but-unlinked became a real link with **zero component edits**. The WhatsApp deep
link deliberately still uses the previous number, because nothing confirms the new line is on
WhatsApp; two surfaces that printed the published number under a WhatsApp label were corrected
rather than left approximately true, the legal pages among them.

**The brand rail went from five names to eighteen**, all client-confirmed, with a `priority` flag
so twelve featured marks lead and the rest of the roster follows through the same rail. Fourteen
new logos were sourced from official brand packs, official sites and official CDNs — **149KB
across 26 local files, nothing hotlinked** — and four marks whose alpha is a solid slab got an
ink-derived mask so they are actually identifiable at 29px. **The marquee's timing had to become
derived**: at eighteen brands the approved 46 seconds would have run the rail at three times its
approved speed.

**`Fun N Earn` was withheld under §9.** It is a real-money cash-contest app, confirmed from its
own terms. The rule was not weakened, and no exception was made for a genuine relationship.
**VYRL is configured and unrendered** — no official logo exists anywhere to download.

**Service 05 / Brand Shoots & Content was hidden**, and the mechanism is the reusable part:
`built` (the code exists) and `public` (the editorial decision) are now two separate flags, so a
finished service can come off six discovery surfaces without deleting anything. The pinned track
shortened by exactly one slot, the progress rail reads `01 … 04`, canonical numbering is
untouched, and the route carries a **derived** `noindex, nofollow`.

**The homepage About chapter became a preview** — 1,468 → **718px**, since `/about` now tells that
story properly. The homepage is **17,591 → 15,671px, −10.9%**, and the reduction is one service
scene plus the About preview rather than whitespace taken from the whole site.

**Held for the next task, deliberately:** the fifteen-name creator roster, the Xbhandesiri
metrics, and Red Bull, which is a prospect and not a client. **No dependency added.**

### Revision 15

**The dedicated About page** — §10r. `/about` is built: the site's **fifth page type**, ninth public
route, and deliberately the calmest thing on it. **THE EDITORIAL ARCHIVE** — no signature
interaction, nothing selectable, no system diagram beyond one small convergence mark. It argues by
provenance rather than mechanism, which is the right form for the page read by someone who has
already decided to take Mishram seriously.

The **hero archive** lays five fragments from five chapters of the company on one board — a creator,
a format, the recognition, a 2021 record card and an abstract build — with a note on the page saying
they are five separate things. The **origin chapter** gives the verified 2021 → 2023 → 2025
chronology real room and then lands it in what starting with creators taught the practice. The
**service index** is registry-driven, so **Web & Digital Experiences appears as a named capability
with no link at all**. Recognition and collaborations merge into one credibility chapter, neither
duplicating its homepage counterpart.

**`About` in the navigation now means the page, everywhere** — header, mobile sheet and footer — with
active state derived from the pathname, and the homepage chapter gaining one restrained
`Read our story ↗`. **No team, no founder, no city, no scale claim, no award embellishment**; every
held item from the content-migration audit stayed held.

Measured **10,595px / 11.77 viewports**, above the 8–10.5 target with the arithmetic and the two
available cuts recorded in §10r rather than taken. **No dependency added.**

### Revision 14

**Post-migration visual QA** — §10q. The first pass with **real composited screenshots**, obtained
by driving the machine's own Chrome headless over CDP from a dependency-free Node script after the
Browser pane and the Chrome extension both proved unavailable. Looking at the pages found **nine
defects that three prior passes of measurement had not** — the counterpart to §10p's lesson:
*geometry cannot clear a composition.*

**Recognition** was the worst of it: the award asset was a lilac promotional banner with a
sunburst, a gold rosette and two small figures, reading as an advertisement on the obsidian
canvas. It was **recropped from the original** so the presentation fills the frame, the duplicated
and illegible in-frame tag was suppressed, and the caption **moved beside the frame** to fill the
five empty columns a single item left — 1,317 → **1,232px**. **About's history** gained a per-row
rule on mobile, where the ticks had been floating in space, and the years a step of weight.
**Service 03's hero** had three label collisions, all fixed with §10n's halo trick plus two
geometry corrections; the concept rail's orphaned `→ Signal` turned out to affect **Service 01
too**, unseen since Revision 07, and both now fit on one line. The **legal-route `#hero` anchor**
recorded as a known defect in §10k is closed.

No content was added, no concept redesigned, and **no dependency introduced**.

### Revision 13

**Content migration — Recognition activated, About gains its history** — §10p. The first revision
in a while to ship content rather than architecture, and it corrected three earlier conclusions
this brief had reached by grepping markup instead of opening files.

**06 / Recognition is live.** The old site's `*_AWARD_*.gif` — dismissed by §10e as "promotional,
unlabelled" — turn out to carry `"AWARDED AS " BEST DIGITAL MARKETING AGENCY` and a gold
`NUFEW 2024-25` badge over an award-plaque presentation. The banner was downloaded, cropped to the
photograph and the badge (**850×680, stored locally, never hotlinked**), and configured with only
the fields the image visibly supports. **`NUFEW` is not expanded and nobody in the frame is named.**
`ABOUT_CHAPTER` derived `07 / ABOUT` on its own. **The stale `priority` flag §10i left behind is
gone**, and the prop was deleted so it cannot return: 0 eager, 0 preloads, 24 of 24 lazy.

**About carries three verified milestones** — 2021 Starcrown Media · 2023 New disciplines · 2025
Mishram.Media — as a hairline band reusing the service pages' tick grammar. Not a timeline. **This
supersedes the "no founding date" rule**, which was written before the evidence was found.

**Akash Sagar (`@xbhandesiri_`) is configured and deliberately unpublished.** The relationship is
the best-evidenced on the roster; the official profile exposes only a **150×150** avatar, which is
~7% of the pixels the section needs. Supply the portrait and flip one boolean. Two generic
capabilities shipped with him — per-creator relationship labels and a verified handle rendering as
a real external link — plus one accessibility fix (`inert` on inactive meta lines).

**Held, not shipped:** all 8 testimonials (conclusively rejected, now by two independent
mechanisms), five B-class historical creators, four team members, the influencer geography, the
non-profit arm, WOW Skin Science and the negotiation scope row.

Measured **16,122 → 17,612px**; Recognition 1,309; About 1,223 → 1,403 (1.56 viewports).

### Open items, all blocked on client-supplied material

Each is recorded rather than guessed, and each is a config change away from working.

**Added in Revision 16 (§10s), and both are one line:**

- **Is `+91 95482 78558` on WhatsApp?** Until that is confirmed, `whatsappNumber` in
  `config/site.ts` stays on the previous number — the one the business is known to answer on — and
  the site publishes exactly one phone number as text. **Confirm it and change that one constant;**
  every WhatsApp action on the site follows. Do not point `wa.me` at an unconfirmed number.
- **An official VYRL logo.** The relationship is confirmed and the config entry is written with
  `visible: false`. There is no official file anywhere to download — no live site, no press page,
  nothing on Wikimedia or Wikipedia. **Supply an SVG or a transparent PNG and flip one boolean.**

**Added in Revision 17 (§10t), and both are narrower than what they replaced:**

- **Analytics evidence for the Xbhandesiri chapter.** The whole media library was searched and
  contains **no analytics screenshot, insights export or dashboard capture of any kind**, so every
  figure discussed for that section is unpublished. `MANAGEMENT.metrics` is an empty array that
  renders nothing. **The unblock is a dated capture of the account's own insights**, tied
  unambiguously to `@xbhandesiri_`; one config entry each, with `source` naming the screenshot.
- **A publishable Mishram reel.** The library *does* contain a finished 9:16 Mishram reel, so §05's
  blocker is no longer "no local file" — it is that this particular file is internal office humour,
  names two employees as a couple in burnt-in captions, and carries a third-party brand banner
  throughout (§10t §8). **The ask is a creator or campaign piece cleared for publication.**

**Both Revision 16 deferrals are now resolved:** the creator roster shipped as a worked-with index
(§10t §6) and the Xbhandesiri chapter is live without metrics.

**The standing four:**

1. **No creator follower data.** §03's `followers` and `instagram` fields are empty for all five
   creators. §10b lists the candidate handles found and why each was rejected. The client can
   confirm the handles in minutes; the meta block renders them the moment they land.
2. **No Mishram Media reel *file* has been supplied to this repo.** **Corrected in Revision 13:**
   genuine reels **do** exist publicly — at least nine on `@mishram.media` — but none is available
   locally, and they must not be scraped, hotlinked or embedded (§10d, §14). §05 therefore shows
   stills honestly typed as `mediaType: "poster"`, with no play control over a photograph. The
   playback path is built and smoke-tested, so a real reel is a config change. **The unblock is the
   client exporting the source MP4s from their own account.**
3. ~~No verified Mishram Media recognition exists.~~ **CLOSED IN REVISION 13.** §06 is active with
   one verified award — see §10p. A second item is one config entry plus a local asset.
4. **No verifiable Mishram Media testimonial exists — and this is now settled, not open.**
   §10d-notes has both audits. All eight candidates are **conclusively rejected**: placeholder
   `pravatar.cc` faces on the service pages, **AI-generated portraits** behind the named avatars on
   the homepage and about page, a quote reused verbatim under a second person's name, placeholder
   job titles, and a page praising the template's own agency. Client Notes renders nothing rather
   than publishing an unverified claim about a named real person. **Two genuine testimonials switch
   it on**, and they must be new first-party material — **not a reappraisal of this set.**
5. ~~No usable photograph of Akash Sagar (`@xbhandesiri_`).~~ **CLOSED IN REVISION 17 (§10t).** The
   client's media library supplied approved, identified photography and he is published in his own
   **Current Management** chapter. He stays `published: false` on §03's roster deliberately — that
   is a worked-with list, and management has its own chapter.

**Not built yet:** one service route — `/services/web-digital-experiences`, **deferred on purpose**
(§10o, required scope in §10) — plus case studies and work detail routes. It returns 404 and is
linked from nowhere. **The three legal routes exist** (§10k) and the footer links to all of them.
**`/services/social-personal-brand-growth` (§10j), `/services/influencer-marketing` (§10l),
`/services/performance-marketing` (§10m) and `/services/brand-shoots-content` (§10n) are built.**
`NEXT_PUBLIC_BOOKING_URL` is still unset, so every booking CTA falls back to WhatsApp.

**Homepage → service-page links are wired, and self-extending.** Services 01, 02, 03 and 05 show
`Explore service ↗`; Service 04 shows nothing, because `servicePageHrefFor` returns `undefined` for
a service whose route is not `built`. It joins the row by flipping that one flag — no component
edit, and a dead link is not reachable.

**Known, deliberate, and not defects:**

- What We Do surfaces overhang their composition box by up to ~6px — the bounding box of a tilted
  surface plus idle drift, not layout. It drops to ~2px with motion reduced.
- Services 03 and 04 use the upper ~77% of their box, so their stacked chapters carry more empty
  space beneath the scene than 01, 02 and 05. Spacing values are identical; the difference comes
  from the compositions, which is the intended rhythm.
- The Hero closing CTA row has a 4px-slack button row at 390px. Left alone because the Hero is
  locked; worth a look if that section is ever reopened.
- Lovkesh Kataria's asset is the only two-person photograph in the creator roster, and its weakest
  link. A solo portrait would lift that state, make him usable in §05 (which needs vertical crops),
  and is unrelated to §06 — his current photo is a creator at an awards evening, not agency
  recognition.
- The three.js `Clock` deprecation warning originates in `@react-three/fiber`, not this code. See §10i;
  it clears when R3F ships on `THREE.Timer`.
- ~~Recognition still sets `priority` on its dominant image.~~ **FIXED in Revision 13 (§10p)** — and
  the prop was removed from `RecognitionMedia` entirely so it cannot be reinstated. Verified on the
  shipped page: 0 eager images and 0 image preload links with §06 rendering.
- `useHoverLock` now holds the hover-preview/click-lock pattern for §03, §04 and §05. §03's private
  copy was removed when that section was reopened for §10b-scale.
- §05's video path has not run against real decodable media. Smoke-tested end to end against a
  deliberately broken source; give it one pass when the first genuine reel arrives.
- **§10n is 12.43 viewports against a 9–11.5 guidance**, and both of the brief's authorised merges
  were applied before the first measurement. Photographs are tall; nothing on the page is padded.
  The arithmetic and the two remaining cuts are in §10n.
- **§10m is 12.65 viewports against a 9.5–11 guidance.** The arithmetic is in §10m and nothing on the
  page is padded; the two cuts that would shorten it are recorded there rather than taken. Decide
  at review whether the length or the content gives.
- **§10m was verified by measurement, not by looking at it.** No composited screenshot was
  available in that session — see *Visual verification* in §10m for what that does and does not
  cover, and for the three non-compositing artefacts that look like page bugs. **The pane
  composited in Revision 12 and did not in Revision 13**, so this is genuinely intermittent.
  **§10q SOLVES THIS FOR GOOD: drive the machine's own Chrome headless over CDP** — see *How
  screenshots were finally obtained*. No dependency, and full control of viewport, theme and
  reduced motion. **Do not accept a geometry-only pass again without trying it first.**
  **Everything on the site has now been looked at**: Service 03, §06 Recognition and About's
  history band were all reviewed as images in Revision 14.
- **A hidden pane blocks CDP input as well as screenshots** — a `computer` click by ref timed out
  in Revision 13, so interaction was verified through the temporary-config technique instead.
  Generalises the §10b-scale note. The headless-Chrome route above is unaffected by either limit.
- **Programmatic `focus()` and synthetic pointer events do not reach React in the preview pane.**
  Revision 12 confirmed it twice: `element.focus()` dispatches no focus event when the pane lacks
  OS focus, and a synthetic `pointerover` never reaches React's delegation. Only CDP input
  (`computer` hover/click) drives these components — the §10b-scale note, generalised.
- ~~The skip link and the Footer's back-to-top point at `#hero`, which does not exist on the three
  legal routes.~~ **FIXED in Revision 14 (§10q)** — `LegalArticle`'s root carries `id="hero"`.
  Verified: exactly one `id="hero"` on each of `/privacy`, `/terms` and `/cookies`, homepage
  unchanged.

### Exact next step

## **FINAL PRODUCTION QA, THEN DEPLOYMENT.**

Revision 17 closed the creator-proof work the last two revisions were waiting on. Nothing on the
homepage is now blocked on client material, and the remaining items are all *additive* — each is a
config change against evidence that does not exist yet, not a build:

- **Xbhandesiri metrics** — waiting on a dated insights capture. Architecture is in place and
  renders nothing until it is filled (§10t §5).
- **A publishable Mishram reel** — §05's blocker is now specific rather than general (§10t §8).
- **Creator handles** — **largely cleared in §10u.** Nine render in the index and three on the
  stage. **Five are held** and close with one message from the client: Allen Chaudhary, Manish Jain,
  Shubham Kochale, Famous Ram, Shadab Jakati. **Follower labels stay out permanently** — that is a
  decision, not a blocker.
- **A Mishram-owned photograph of Akash Sagar** — the one that reopened in §10u. Current Management
  is typographic until it lands, and *"the client confirms this photograph is him"* is now the bar.
- **A decision on Shadab Jakati** (§10u §5) — a brand-safety finding the client has to rule on.
- **An official VYRL logo** — unchanged since §10s.

**Two findings recorded for a scoped revision, both from Revision 17's media audit:**

1. **§06 Recognition could be upgraded to genuine photography.** The library holds **five
   first-party 3024×4032 photographs of the NUFEW award presentation** — the section currently
   renders a 775×581 crop of a *promotional banner* that §10q already had to re-crop once because
   it read as an advertisement. Deliberately not acted on here: Recognition is locked (§18) and
   this was a creator-proof revision. **All of §10p's constraints would carry over unchanged** —
   the plaque is still illegible at full resolution, so no new claim can be made, `NUFEW` stays
   unexpanded, nobody in frame is named, no gold is added. See `docs/MEDIA-ASSET-AUDIT.md` §B.
2. **Genuine production BTS exists** — a crew with a gimbal rig, a lapel mic being fitted on
   location — and is unusable only because nobody in it can be named. If the client identifies the
   people, it becomes strong evidence for §05 or a BTS beat.

**Red Bull remains a prospect and is not represented as a client anywhere.**

**Then: deployment.** Types, lint and the production build are clean, all eleven routes prerender,
and Revision 17's visual review is done at six viewports in both themes and under reduced motion.

**After that:**

## **SERVICE 04 — IN PROGRESS, SECTION BY SECTION (§10v, §10w, §10x).**

**The discovery below has been supplied and the route now exists.** Revision 18 built the hero
(the Digital Build Stage), Selected Digital Work with real captures of both live projects, and the
shared inquiry; Revision 19 added `03 / What We Build` (§10w) and Revision 20 `04 / Beyond Websites` (§10x). `built` stays `false` and the page carries `noindex` until the remaining sections
are approved: **the Design +
Development + Growth argument, the responsive demonstration, the development process, and the
capability / technology philosophy.** Then one `built: true` publishes it.

> **SUPERSEDED — see §10y and §10z.** The page is published (Revision 21) and the Design +
> Development + Growth argument is built as `05 / Why Mishram` (Revision 22). One chapter remains,
> not three: `06 / How We Build` folds process, approach and technology philosophy together. §10z
> carries the current table.

*The original instruction, kept because it is why the page reads the way it does:*

`/services/web-digital-experiences` is the last unbuilt service route and **the
second-most-important conversion page on the site** (§10o). It must **NOT** be generated from the
current generic service summary, and it should not be started until the client has supplied:

- Mishram's real web-development experience, and the projects actually built
- technologies and capabilities; process
- software, CRM and internal-tool experience
- automation and integration experience
- ideal clients, and the strongest differentiators
- examples and screenshots
- the preferred conversion offer

Only then design and build it, at the depth §10o describes. **Do not build it inside another task,
do not create a placeholder, and do not renumber Service 05 to close the gap.** All three still
hold for the sections that remain: no placeholder has reached the route, and Service 05 keeps `05`.

**After that:** final production QA, then GitHub + Netlify deployment.

*(Revision 15 completed the dedicated About page — §10r. Revision 14 completed the visual QA that
was blocking it.)*

The About page expands the homepage manifesto (§10f) into a fuller company story: positioning,
operating philosophy, capabilities and credibility, at the length a visitor who has already decided
to take Mishram seriously will actually read.

**What it must not invent, and this is the whole difficulty.** §10f already records why the
homepage chapter carries no team block: the old about page lists four names and role titles, but
every headshot is a remote Cloudinary file with a numbered placeholder filename, and staff change.
**No founder name, no team member, no headshot, no headcount, no client count, no
years-in-business, no city** — the old site contradicts itself on location, so `INDIA` stays the
locator. Every claim needs the same traceability §10f applies: the emphasis line is verbatim from
Mishram's own schema.org description, and the discipline captions come from its own per-service
copy.

> **"no founding date" was struck from that list in Revision 13.** The 2021 / 2023 / 2025
> chronology is verbatim-traceable to Mishram's own `about.html`, identically in the pre-SEO
> backup and in the site's own `llms-full.txt`. **The homepage already publishes it** (§10f, §10p),
> so the About page may expand on it. Everything else in the sentence above still stands — in
> particular **the founder is still not named**, even though the same source names him, because
> that is a person's current role rather than a dated event.

**What it can legitimately carry**: the positioning in §1, the four disciplines, the **verified
2021/2023/2025 history**, the operating argument the Mishram Difference makes (§10a — fewer
handoffs, one connected partner), the creator network as evidence, **the NUFEW recognition
(§10p)**, this site as evidence of the web capability, and the four service pages as the detailed
proof. It should read as the long form of §10f rather than a second homepage.

**Then a navigation and content review** across all eight routes: whether About earns a fifth nav
item or stays a footer / `#about` destination, whether the homepage About chapter should shorten now
that a full page exists, and whether the four service pages still read as one system when visited
in sequence. **After that: final production QA, then GitHub + Netlify deployment.**

**Service 04 / Web & Digital Experiences remains a separate future milestone** — §10o. It is
deferred deliberately, it is not next, and it should not be built inside another task.


**Content blockers, none of them fabricated:**

1. **Genuine Mishram Media reel *files*** (§10d, §10p) — the reels exist publicly; the source MP4s
   have not been supplied here. §05 shows stills honestly typed as posters.
2. **A photograph of Akash Sagar** (§10p) — **reopened in Revision 17B**: what Revision 17 published
   was not him. Everything else about him is verified and configured, and the chapter is a complete
   typographic treatment in the meantime. **The bar is now the client confirming a specific
   photograph**, not a folder name (§10u §2).
3. ~~Verified creator handles~~ — **LARGELY CLEARED in Revision 17B (§10u §5).** Fourteen profiles
   verified against their own live accounts; nine render in the index, three on the stage, and
   `@xbhandesiri_` in Current Management. **Five are held** — Allen Chaudhary, Manish Jain, Shubham
   Kochale, Famous Ram, Shadab Jakati — each with the blocker written down in
   `WORKED_WITH_UNVERIFIED`. **Follower counts are not a blocker; they are permanently out.**
4. **Real client testimonials** (§10d-notes) — Client Notes is built and renders nothing. Must be
   **new** first-party material; the old set is closed.
5. ~~Genuine award evidence~~ — **CLEARED in Revision 13 (§10p).**
6. ~~A LinkedIn profile URL~~ — **CLEARED in Revision 16 (§10s).** The client supplied it, filling
   `SOCIAL_URLS.linkedin` turned the row into a real link, and no component was edited.
7. **`NEXT_PUBLIC_BOOKING_URL`** and the three inquiry-delivery variables in `.env.example` (§10h)
   are all still unset.

**Decisions waiting on the client, all evidenced but none shipped** (§10p): the five B-class
historical creators, the four team members, the influencer geography, the non-profit arm,
WOW Skin Science, and whether negotiation joins the Influencer Marketing scope index.

---

## 10y. SITE-WIDE INTEGRATION, SEO AND MOBILE MILESTONE (Revision 21)

Feature work stopped so the Web & Digital Experiences route could stop being a hidden prototype and
become part of the site. Four chapters existed behind a direct URL; nothing linked to them, nothing
indexed them, and the surfaces around them had drifted while they were built.

### 1 — PUBLISHED, AND THE FLIP WAS THE WHOLE INTEGRATION

`built: false → true` on one registry entry. **No component was edited to publish it**, which is the
§10j architecture paying for itself: the header services menu, the mobile services group, the footer
directory, the homepage's `Explore service ↗` on Service 04, the prev/next rail and the new sitemap
all read `PUBLIC_SERVICE_PAGES`. The page's own `robots` was written as
`PAGE.built ? undefined : { index: false, follow: false }`, so the `noindex` lifted itself rather
than leaving a stale override behind.

Verified after the flip: every service now carries **exactly two** homepage hrefs (its `Explore
service ↗` and its footer row) — four services, eight links, perfectly symmetric. The numbering gap
closed to 01 → 02 → 03 → 04.

### 2 — THE LOGO BUG, AND ITS ROOT CAUSE

> `RouteTransition.start()` opened with
> `if (reduced || !path || path === pathname) { router.push(href); return; }`.
>
> Clicking the wordmark **on the page it points at** took that branch. `router.push` to the URL you
> are already on is a no-op — the App Router has nothing to navigate to, so it neither re-renders
> nor scrolls. The visitor asked for "home" nine thousand pixels down the homepage and stayed
> exactly where they were.

Same-path-no-fragment is now its own branch: it plays **the site's own wipe** and lets the existing
`window.scrollTo(0, 0)` at the end of the cover do the work. Not a long smooth scroll — a 16,000px
homepage unwinding takes seconds and reads as a second bug. Same-path links carrying a fragment are
untouched, because those are native anchors. Verified from `/`, from `/about` and from the web route
on mobile: all three land on `/` at `scrollY 0`.

### 3 — BRAND SHOOTS, REPOSITIONED

It was already off public discovery (§10s) but four surfaces still presented it as a flagship:

| Surface | Was | Now |
| --- | --- | --- |
| Site meta description | "…performance, **brand shoots** and web" | "…performance marketing, web development and custom software" |
| Hero capability rail (§5) | `Social · Influencer · Performance · Brand Shoots · Web` | `Social · Influencer · Performance · Web · Software` |
| Homepage + About disciplines | Creative — "Content, reels and **brand shoots**" | "Content, reels and campaign production" |
| About service index | **Rendered all five `SERVICES`** | `PUBLIC_SERVICES` |

**The About index was a genuine bug, not just wording.** Every other discovery surface reads the
public list; About read the raw one, so it listed a hidden service as a flagship discipline with no
link. The technology caption also grew to carry the half Service 04 made real —
"Websites, platforms and custom systems".

The only surviving mention site-wide is the inquiry form's `Brand Shoots & Content` checkbox, which
is correct: content production is still something a client may ask for.

### 4 — SEO, FROM NOTHING TO A BASELINE

The site had **no `sitemap.xml`, no `robots.txt`, no structured data and no social image.**

- **`app/sitemap.ts`** — derived, nine URLs. It lists what is *indexable*, not what exists:
  `PUBLIC_SERVICE_PAGES` excludes the built-but-hidden Brand Shoots route, which answers `noindex`.
  A sitemap entry pointing at it would be the site contradicting itself.
- **`app/robots.ts`** — permissive, `/api/` excluded, sitemap declared. Deliberately no `Disallow`
  for the hidden route: a disallowed page is never crawled, so its `noindex` is never read.
- **`config/schema.ts`** — `Organization` + `WebSite` JSON-LD. Every property comes from
  `config/site.ts`. **`Organization`, not `ProfessionalService`**, because the richer types expect
  `priceRange` and `openingHours` and this project has verified values for neither. No rating, no
  review, no founder, no headcount, no `foundingDate`.
- **Twitter card** plus `opengraph-image` / `twitter-image` (1200×630).

Titles and descriptions were already unique per route — that part of the audit came back clean.

### 5 — THE FAVICON WAS THE DEFAULT NEXT.JS TRIANGLE

Never replaced since `create-next-app`. Every browser tab on the site showed a black circle with a
white triangle.

There is **no vector brand asset in this project** — `mishram-wordmark.png` (420×199, raster) is the
canonical mark, used as a CSS mask. So nothing was traced or redrawn: the **M** was cropped from
that approved artwork (`left 4, top 104, 74×78`), centred on the brand's obsidian, and emitted as
`favicon.ico` (16/32/48, PNG-in-ICO), `icon.png` (512) and `apple-icon.png` (180). Proofed at 16,
32 and 48px before shipping. The ink tile means it reads on light and dark browser chrome alike.

### 6 — MOBILE, MEASURED BEFORE AND AFTER

The complaint was that the site "feels long" on a phone. Measurement found something sharper: **the
web route was *longer* on mobile than on desktop** — 15,176px against 14,983px, on a screen 56px
shorter.

| Page | Mobile 390×844 | Desktop |
| --- | --- | --- |
| `/services/web-digital-experiences` | 15,176 → **14,268** (−6.0%) | 14,983 → **14,983** (0.0%) |
| `/` | 16,975 → **16,455** (−3.1%) | 16,828 → **16,828** (0.0%) |
| `/about` | 13,935 → **13,583** (−2.5%) | — |

**Every change is a base or `sm:` step; `md:` and up are byte-identical.** That is why desktop
measures *exactly* zero difference, and it is the rule this pass was run under — §11's protection of
the approved desktop compositions is absolute.

What moved: the chapter padding on nine homepage sections, `ServiceSection`, `AboutSection` and
`ProjectInquiry` (all authored with one desktop value and no mobile value), plus the internal rhythm
of the three web-route chapters.

**The honest finding is that padding is not what makes it long.** After the pass the remaining
mobile weight is content: `beyond-websites` 4,642px, `what-we-build` 3,194px, `project-inquiry`
2,232px on every page. Those are four architecture states, three capability families and a
fourteen-field form — cutting them would be cutting meaning, which the brief for this pass ruled
out.

### 7 — WHAT THE MOBILE MENU DID NOT NEED

Audited and left alone. It already carries `role="dialog"`, `aria-modal`, a labelled close control
at 40×40, `env(safe-area-inset-bottom)`, editorial nav type at the same scale as the desktop
header, a services disclosure and a full-width contact CTA. Redesigning it would have been change
for its own sake.

### Verified

- **Types, lint and the production build are clean.** Twenty routes prerender, now including
  `sitemap.xml`, `robots.txt`, `icon.png`, `apple-icon.png`, `opengraph-image.png` and
  `twitter-image.png`.
- **27 configurations** — `/`, `/about` and the web route at 1440×900, 1280×800, 1024×768,
  768×1024, 430×932, 390×844, 375×812, 360×800 and **330×760**, alternating themes. No horizontal
  overflow, no console errors, exactly one `h1` on every one.
- **Desktop regression, proved not asserted.** The three approved web-route chapters captured under
  `prefers-reduced-motion` before and after this pass: **0.0000% of subpixels differ** on each.
- **Public state.** `built: true` · no robots override · canonical
  `https://mishram.media/services/web-digital-experiences` · present in `sitemap.xml` · allowed by
  `robots.txt` · linked from the homepage sequence, the footer directory, the header services menu,
  the About index and the prev/next rail.

---

## 10z. 04 / WHY MISHRAM — the connected route (Revision 22)

Section 05 of the Web & Digital Experiences route: the positioning chapter, and the only one on the
page that is not about what Mishram builds. §01–§04 prove the capability; this answers the question
they leave open — **why take a build to Mishram rather than to a development studio.**

### 1 — THE PAGE PLAN WAS SHORTENED, AND THIS IS THE IMPORTANT PART

The approved flow (§10v) carried nine to ten chapters. **It no longer does.** §10y measured the
route at 14,268px on a phone with only four of them built — `beyond-websites` 4,642px,
`what-we-build` 3,194px and the shared form 2,232px — and found the remaining weight was content,
not padding. Five more cinematic sections on top of that would have produced a page nobody finishes.

The remaining plan is **two** sections, not five:

| # | Section | Status |
| - | ------- | ------ |
| 5 | Why Mishram — the whole route | **built (this revision)** |
| 6 | How We Build — process, approach and technology philosophy, as one compact chapter | **built — §10aa** |
| 7 | Project inquiry (shared) | already built |

> **The route is now complete.** §10aa built section 6 and closed the information architecture of
> this page. Nothing further is planned for it: the next pass is QA, copy and production, not
> another section.

A responsive demonstration, a development process and a technology philosophy were three separate
approved chapters. They collapse into one. **That is fewer sections saying the same things, not
less to say** — and the next session should build §06 against this table, not against §10v's.

### 2 — THE ARGUMENT, AND HOW IT IS DRAWN

The differentiation is not technology and the copy never claims it is. It is that Mishram already
works on the four stages either side of the website.

```
├─ where mishram works ────────────────────────────────┤
                                                   ●  Growth
                                           ●  System
                                   ●  Conversion
                           ●  Experience
                   ●  Traffic
───┴───────────────┴───────────────┴───────────────┴──────
    Traffic         Experience      Conversion      System      Growth
    Content         Website         Enquiry         CRM         Measure
    Creators        Commerce        Booking         Automation  Learn
    Campaigns       Product         Purchase        Workflow    Improve
                    └──── typical web project ────┘
```

**The whole case is the difference between the two span widths.** Nothing is asserted about anybody
else: `Typical web project` describes a *brief*, which is a neutral and true statement about scope,
and no competitor is named, implied or diminished anywhere in the section.

**No fabricated proof.** No conversion rate, traffic figure, client count, project count, revenue,
years, award, ranking or testimonial — §1, and a positioning chapter is exactly where those normally
arrive. The five practice terms in the closing strip are `config/services.ts` restated, and the
three cross-links are derived from `PUBLIC_SERVICE_PAGES` rather than written down a second time.

### 3 — `Traffic`, NOT `Attention`

§04 closes on `Traffic → Experience → Conversion → System → Growth` under `And what it is all for`,
in display type, and then stops without explaining it. §05 opens on the same five words, in the same
order, and gives them a route — so the chapter break is a **reprise**, not a restart. The words have
to match exactly for that to work, so `WEB_WHY_STAGES` is pinned to `WEB_SYSTEM_HANDOFF.terms` and
both carry a comment saying so.

The transition itself reuses `.web-sys-entry` — the bridge device §03 → §04 already established —
in the same grid column, pulled up through the section's own top padding. Its gradient hairline is
transparent at the top and teal at the dot, so on the narrow layout, where it overhangs the chapter
rule by 32px, only the teal end crosses onto §04's ink. One class, two boundaries, deliberately: two
bridges meant to read as the same device must not be able to drift apart.

### 4 — PACING IS THE FEATURE

§03 pins a three-state capability stage; §04 pins a four-state, fourteen-node architecture. **This
section has no sticky track, no scroll MotionValue, no state machine, no pinned viewport and no
accumulated diagram.** One drawing, drawn once, then nothing — after the route settles the section
costs zero, so there is no offscreen work to pause. The page needed to exhale before the form.

Motion is one `useInView` boolean driving a CSS `stroke-dashoffset` transition off a static
`pathLength="1"` (§04's pattern, and the reason `vectorEffect` is absent here too), plus one React
state for hover. Hover changes emphasis only — every word is in the document at all times, nothing
is revealed and nothing hidden — so there is no keyboard equivalent to provide.

### 5 — TWO LAYOUTS, ONE DOCUMENT

| | `< md` | `>= md` |
| --- | --- | --- |
| Head | headline, then copy | headline left (6 cols), copy right (5 cols), baselines aligned |
| Route | vertical rail down the left, one stage per row, terms inline behind hairlines | rising horizontal path in a band above a five-column row |
| Span | a caps label above the journey | a teal bracket across the band, ticked at both ends |
| Bracket | vertical, pinned to the right edge, label level with `Experience` | horizontal, hanging under two columns, label beneath |

Every word is rendered **once**. What swaps is decoration — two node marks, one of which is always
`display: none` — and `.web-why-typical`, which is a single element repositioned entirely in CSS.
Its narrow height is `calc(100% + var(--why-row-gap))` from the first node, which reaches the second
row's node exactly and needs no measurement of the second row at all.

**The band's hairlines are HTML, not SVG**, and that is not fussiness: the band keeps a `clamp()`
height rather than an aspect ratio (a route whose height tracked its width would be 500px tall on a
wide desktop), so under `preserveAspectRatio="none"` one `stroke-width` renders the vertical drop
ticks several times thicker than the horizontal span rule. Borders are exactly 1px everywhere; the
SVG carries only the near-horizontal diagonal, which lands between 1.0 and 1.5px across the range.

### 6 — TWO DEFECTS FOUND WHILE BUILDING

**`.caps` on a child silently beat the label's own sizing.** The bracket label was written as
`<span class="web-why-typical-label"><span class="caps">…</span></span>`. Specificity never entered
into it — `font-size` and `letter-spacing` on the *child* win whatever the parent's rule says — so
the narrow-layout fit, measured to the pixel against `Experience`, was not applying at all and the
label collided with the stage name at 330px. `caps` now sits on the same element.

**Never run `next build` while `next dev` is running in this project.** Turbopack's shared cache
corrupted twice, and the failure is disguised: every route returns 500 with a *CSS parse error in
generated output* — `var(--header-h)` arriving as `var(--<garbage>-h)` — which reads exactly like a
syntax error in `globals.css` and is not one. The fix is a real content change to `globals.css`
(append a comment, save, delete it), which forces a re-transform. Builds during this pass were run
with `NEXT_DIST_DIR` set against a temporary `distDir` in `next.config.ts`, reverted afterwards.

### Verified

- **Types, lint and the production build are clean.** Twenty routes prerender, including
  `/services/web-digital-experiences`, `sitemap.xml` and `robots.txt`.
- **Nine viewports, alternating themes, one under reduced motion** — 1440×900, 1280×800, 1024×768,
  768×1024, 430×932, 390×844, 375×812, 360×800, 330×760. No horizontal overflow on the document or
  on any element inside the section, exactly one `h1`, heading order `h2` then five `h3`, no console
  errors and no hydration warnings.
- **Desktop regression, proved not asserted.** §01–§04 captured under `prefers-reduced-motion` at
  1440×900 with the section and its stylesheet present, then with both removed: `hero`,
  `digital-work` and `what-we-build` differ by **0 pixels**. `beyond-websites` differs by 11 pixels
  on a single 1px column — and **two captures of the same unchanged state differ by the same 11
  pixels in the same place**, so it is gradient dither on §04's own bridge line, not a change.
- **Page height.** 390×844: **14,268 → 15,353 (+1,085)**. 1440×900: **14,983 → 16,070 (+1,087)**.
  Every other section measures identical at both. The section itself is 1,088px on desktop and
  1,085px on a phone — 1,209px at 768×1024, where the head stacks, and 1,157px at 330×760.
- **Public state unchanged.** `built: true` · no robots override · canonical
  `https://mishram.media/services/web-digital-experiences` · present in `sitemap.xml` · allowed by
  `robots.txt` · linked from the homepage sequence, the footer, the header services menu, About and
  the prev/next rail.

---

## 10aa. 04 / HOW WE BUILD — the build itself (Revision 23)

Section 06 of the Web & Digital Experiences route, and **the last one it gets.** §01–§03 answer what
Mishram can build, §04 widens it to the system behind the interface, §05 answers why here. This
answers the only question left — *what it is actually like to build something with Mishram* — and
then the page stops arguing and hands over to the form.

**The information architecture of this route is now complete.** The next pass on it is QA, copy and
production. A seventh chapter would have to argue something the six above it do not, and there is
nothing left: process was the last open question.

### 1 — FOUR APPROVED CHAPTERS, BUILT AS ONE

The approved flow carried a development process, a responsive demonstration, a technology philosophy
and a capability index as four separate sections. §10z collapsed them; this built the result:

| Was going to be | Is |
| --- | --- |
| Development process | Six stages on one line |
| Technology philosophy | One sentence — *The stack follows the product* |
| Capability / stack index | Twelve terms in three groups, beside that sentence |
| Responsive demonstration | **Three descending outlines inside the `Test` artifact** |

That last row is the one to notice. An entire chapter was going to demonstrate desktop → tablet →
mobile; it is now three rectangles inside a 46×30px drawing, and that is all it was ever going to
prove. **No FAQ, no pricing, no stack chapter and no second call to action** — `ProjectInquiry`
immediately below already is one.

### 2 — THE COMPOSITION, AND WHY IT IS NOT §05 AGAIN

Two adjacent sections both drawing a labelled sequence on a line is the obvious failure mode here,
so the differences are structural rather than cosmetic:

| | §05 Why Mishram | §06 How We Build |
| --- | --- | --- |
| Line | rises | flat |
| Marks | squares sitting **on** the line | ticks passing **through** it |
| Under each stage | tracked capability terms | a sentence |
| Numbering | none, deliberately (§10j) | `01`–`06`, because a process has an order |
| Annotation | two spans bracketing the route | one artifact per stage, resolving |

Prose against index type is the strongest texture difference two adjacent sections can have, and it
is the one doing most of the work.

### 3 — THE ARTIFACT

One tiny frame per stage, and the product inside it resolves as the process runs:

```
01 Discover   ▫ loose marks, nothing aligned to anything
02 Architect  ▤ the field divides — structure before appearance
03 Design     ▥ hierarchy: one element outranks the others
04 Build      ▦ a working surface, something live in it
05 Test       ▢▢▫ the same surface at three widths
06 Launch     ▩ resolved, and the frame closes in teal
```

**Secondary by construction.** 46×30px wide, 38×22 narrow, `aria-hidden`, and built from absolutely
positioned `<span>`s at percentage coordinates — one part table serves both frame sizes. The whole
sequence costs six boxes and twenty-two bars of pure CSS: no SVG, no imagery, no illustration files.

### 4 — THREE LAYOUTS, ONE DOCUMENT

| | `< md` | `md → lg` | `≥ lg` |
| --- | --- | --- | --- |
| Steps | rail down the left, index outside it | 3 columns × 2 rows | 6 columns × 1 row |
| The line | vertical, per-row segments | per-cell rules, two rows | one continuous rule on the list |
| Marks | horizontal, crossing the rail | vertical, crossing the rule | vertical, crossing the rule |
| Artifact | inline, right of the stage name | hung above its cell | hung above its cell |
| Capabilities | label above terms, wrapped inline | three columns, stacked | three columns, stacked |

**The middle breakpoint is not decoration.** Six columns need to hold a sentence, not a label: at
768 the content box is 700px, a column is 107px, and every detail broke to four lines of two or
three words. Three columns give 226px and two clean lines. Falling back to the rail there would have
been readable too — and 193px taller on the viewport that can least afford it.

### 5 — CONTENT INTEGRITY

**No framework is named anywhere**, and that is positioning rather than omission: §10 settled that a
capability index is a promise, so it lists what the business sells — frontend, backend, CMS,
database, authentication, APIs, automation, payments, e-commerce, analytics, cloud deployment,
mobile — and never a vendor, a version or a logo. The visitor is buying a product, not a dependency
list.

**No quality claim that cannot be stood behind.** No uptime figure, no Lighthouse score, no
"enterprise-grade", no "military-grade", no "infinitely scalable", no guaranteed ranking, no
promised conversion lift. `Test` says what is *checked*, not what is achieved.

**No accent word on the headline, deliberately.** Five sections on this page already carry one —
`rely`, `different`, `entire`, `another`, `one roof` — and §10i's finding was that consecutive
accented headlines stop reading as emphasis and start reading as a template. The last chapter
settling into plain display type is the right end to that sequence.

### 6 — THE INQUIRY HANDOFF NEEDED NO CODE

The section ends on the stack statement and the capability index — **not** on a call to action —
because the next section is one. `ProjectInquiry`'s headline is already *Tell us what you're
building.*, which is exactly the question §06 leaves the visitor holding, and `WEB_INQUIRY.context`
already reads *"Tell us what you are trying to launch, improve or automate…"*. Nothing in the global
inquiry system was touched, no second form exists, and `inquiryServiceId: "web"` still arrives
preselected — verified in the rendered DOM, not assumed.

### 7 — A CAPTURE METHOD THAT LIED, AND THE ONE THAT DID NOT

The first regression pass reported 503 changed pixels in the hero and 2,088 in Selected Digital
Work — reproducibly, in both directions. Neither was real.

> `Page.captureScreenshot` with `clip` + `captureBeyondViewport` renders a region as though scrolled
> to it, while `useScroll`-linked values keep reading the *actual* scroll position and the document
> height. §01 and §02 are both scroll-linked compositions, and the document is 783px taller with
> §06 in it — so the two states settled at different progress values and the "diff" was the capture
> method, not the page.

**Capture full viewport frames at fixed absolute offsets instead.** §01–§05 sit above §06, so their
offsets are identical in both states. Nineteen 1440×900 frames from `scrollY` 0 to 16,200:
**eighteen are byte-identical**, and the only one that differs is the frame containing §06's own
first pixels. That is the regression proof; the clipped one was noise.

### Verified

- **Types, lint and the production build are clean.** Twenty routes prerender. The build was run the
  way §10z documents — `NEXT_DIST_DIR` against a temporary `distDir` — and Turbopack's shared cache
  corrupted the dev server exactly as described, healed by the documented `globals.css` cache-bust.
- **Nine viewports, alternating themes, one under reduced motion** — 1440×900, 1280×800, 1024×768,
  768×1024, 430×932, 390×844, 375×812, 360×800, 330×760. No horizontal overflow on the document or
  on any element inside the section, exactly one `h1`, heading order `h2` then six `h3`, no console
  errors, no hydration warnings. The section holds no focusable element at all, so there is no tab
  order to get wrong and no focus trap to test.
- **Page height.** 390×844: **15,353 → 16,347 (+994)**. 1440×900: **16,070 → 16,854 (+784)**.
  Every other section measures identical at both.
- **Mobile section budget at 390×844** — hero 1,524 · Selected Work 1,336 · What We Build 3,194 ·
  Beyond Websites 4,642 · Why Mishram 1,085 · How We Build 994 · Inquiry 2,232. The remaining
  ~1,340px is the prev/next rail and the footer. **Beyond Websites and What We Build are 7,836px
  between them — 48% of the route.** Any future length work starts there, not here.
- **Public state unchanged.** `built: true` · no robots override · canonical
  `https://mishram.media/services/web-digital-experiences` · in `sitemap.xml` · allowed by
  `robots.txt` · linked from the homepage sequence, the footer, the header services menu, About and
  the prev/next rail · `inquiryServiceId: "web"` still preselects.

---

## 10ab. FINAL QA — MOBILE COMPRESSION, COPY, SEO AND PRODUCTION READINESS (Revision 24)

No new sections. The Web Development information architecture closed in §10aa; this pass made the
route **readable on a phone**, fixed two real production bugs and took the repository to a
commit-ready state.

### 1 — THE MOBILE PROBLEM WAS REPETITION, NOT PADDING

§10y already swept padding and correctly concluded the remaining weight was content. It was — but
not *information*. It was the same information drawn twice.

| At 390×844 | Before | After | Δ |
| --- | ---: | ---: | ---: |
| **Web Development** | 16,347 | **14,343** | **−2,004 (−12.3%)** |
| Homepage | 16,455 | 16,296 | −159 |
| About | 13,583 | 13,424 | −159 |

| Web section @390 | Before | After | Δ |
| --- | ---: | ---: | ---: |
| Hero | 1,524 | 1,508 | −16 |
| Selected Work | 1,336 | 1,336 | 0 |
| **What We Build** | 3,194 | **2,684** | **−510** |
| **Beyond Websites** | 4,642 | **3,322** | **−1,320** |
| Why Mishram | 1,085 | 1,085 | 0 |
| How We Build | 994 | 994 | 0 |
| **Project Inquiry** | 2,232 | **2,073** | **−159** |

**Not one word was deleted.** Every capability, term, node name and form field that existed before
exists now.

### 2 — FOUR ARCHITECTURE DRAWINGS BECAME ONE SYSTEM MAP

`Beyond Websites` rendered `SystemArchitecture` four times on a phone, once per state, each at
`100 / 66` — 924px of diagram whose every box was **already named in the copy beside it**, at a
width where a fourteen-node plan is fourteen boxes nobody can read.

Below 640 the section now draws **one continuous spine with four checkpoints**, and each state's
`terms` render as the boxes the diagram would have drawn:

```
● 01 / CAPTURE
│   lead + body
│   [WEBSITE] [FORM] [BOOKING] [CAMPAIGN] [CUSTOMER RECORD]
│
● 02 / ORGANISE …
```

The chips *are* the architecture, so nothing is lost. `COMPACT_QUERY` switches it client-side
alongside the existing `STICKY_QUERY`, so **only one layout is ever mounted** — verified: 4
`.web-sys-stage` components at 768, **0 at 390**.

### 3 — TWO ONE-COLUMN LISTS THAT SHOULD HAVE BEEN TWO

- **The capability matrix.** Thirty-three names, one per row below 640: 1,059px against 550 in two
  columns. Now two from 360.
- **The system directory.** Twenty-five names, one per row: 1,054px for an *appendix*, which is
  scanned rather than read. Below 640 it becomes an inline index behind hairlines — the grammar §05
  and §06 already use — for about 300px.
- **The inquiry services.** Seven options stacked at 48px each. Two columns from 360, tap targets
  unchanged, and preselection still verified in the rendered DOM.

> **`auto-fit` was the wrong tool and the breakpoint audit caught it.** `repeat(auto-fit,
> minmax(9.5rem, 1fr))` reads elegantly and fits **three** 186px columns at 639px — narrower than
> the design allows and inconsistent with the two that 640 resolves to. Grid has no
> max-column-count, so the count is now stated at a measured threshold: 360, where two columns give
> exactly the 154px `Personal Brand Sites` needs.

### 4 — TWO REAL BUGS, NEITHER OF THEM ASKED ABOUT

**The Open Graph image was missing on every route except the homepage.** `src/app/opengraph-image.png`
is Next's file convention and covers the root segment — but a route that declares its own
`openGraph` object *replaces* the parent's rather than merging into it. Nine routes set a per-route
OG title and silently lost the image with it. The symptom was invisible in the app and only showed
on a share card: `/about` and all five service routes published `twitter:image` (no route overrides
`twitter`) and **no `og:image` at all**. Fixed with one `OG_IMAGE` constant in `config/site.ts`,
spread into all nine.

**One CTA under two nouns.** The Web hero's third link read `Book a free 15-min consultation` while
every other hero on the site says `Book a 15-Min Call` — one destination, and the only place the
word "consultation" appeared in a label. Now `Book a 15-min call`; `free` moved into the note, where
the same promise costs no headline weight. The quieter sentence-case register is kept deliberately:
it is a third link, not a button.

### 5 — WHAT WAS AUDITED AND FOUND ALREADY CORRECT

Worth recording so the next pass does not re-derive it:

- **The hero's WebGL scene is not a mobile cost.** `frameloop={reduced ? "demand" : active ? "always"
  : "never"}` — the render loop stops entirely offscreen, driven by an IntersectionObserver that also
  watches `document.hidden`. Dynamic import, `ssr: false`, WebGL feature detection, static fallback.
  The only console output is `THREE.Clock` deprecation noise from inside `@react-three/fiber`.
- **The 3,516px overflow inside `#collaborations` is the marquee**, and its parent is
  `overflow: hidden`. `documentElement.scrollWidth === clientWidth` at all nine widths.
- **No dead links anywhere** — no `href="#"`, no empty href, no `javascript:`, no placeholder URL,
  and every on-page hash target resolves. All nine `target="_blank"` links carry
  `rel="noopener noreferrer"`.
- **The logo fix from §10y holds**: `/about` at `scrollY 3000` → `/` at `scrollY 0`; `/` at
  `scrollY 6000` → `/` at `scrollY 0`.
- **No secrets.** `.env.local` is git-ignored; `.env.example` carries variable names and no values;
  no credential literal anywhere in `src`.
- **Copy is clean of AI register.** A scan for twenty banned constructions returned three hits, all
  of them inside code comments describing the rule.

### Verified

- **Types, lint and the production build are clean.** Twenty routes prerender. Build run the way
  §10z documents — `NEXT_DIST_DIR` against a temporary `distDir` — and the documented Turbopack
  cache corruption occurred and was healed the documented way.
- **From the build output, not the dev server**: the sitemap carries nine `https://mishram.media`
  URLs, once each, with no API route, no hidden service and no trailing-slash variant; `robots.txt`
  allows `/`, disallows `/api/` and declares the sitemap; the prerendered service HTML carries
  `og:image`.
- **Nine viewports × three routes, alternating themes, two under reduced motion.** No horizontal
  overflow, exactly one `h1` everywhere, no heading-level skips, no console errors, no hydration
  warnings, every `img` has `alt`.
- **Desktop is untouched, measured not asserted.** Every section on `/services/web-digital-experiences`
  and `/about` measures **identically** at 1440×900 before and after, and the computed
  `grid-template-columns` for every rule this pass touched is byte-identical at 1440 and 768. Every
  change is scoped below 640 except the one intended copy fix.

---

## 10ac. LEAD CAPTURE BACKEND — SUPABASE (Revision 25, live in Revision 25B)

**This is a backend task and it changed no design.** Not one component's layout, spacing,
typography or motion moved. What changed is what happens after the visitor presses
`Send project brief`, plus the two legal documents that describe it — because §18's standing rule
is that the policies change in the same commit as the behaviour, never after.

### 1 — THE ONE SENTENCE THIS IS ALL DERIVED FROM

> **The database is the source of truth. The email is a notification.**

Until now `/api/inquiry` wrote nothing anywhere (§10h): it validated, called Resend, and every
inquiry lived or died on one email send. A missing API key, an unverified sender domain, a provider
outage or a full mailbox each lost the lead outright — and the site correctly refused to claim
otherwise, which meant a real prospect who wrote a long brief was told to go and retype it into
WhatsApp.

The order is now:

```
validate → honeypot → INSERT → notify → mark the notification → respond
```

and every branch below falls out of it:

| Case | Response | Why |
| --- | --- | --- |
| Insert OK, email sent | **200** | Captured and announced |
| Insert OK, email failed | **200** | **Captured.** The email is Mishram's problem, not the visitor's — telling them it failed is how you lose a lead you already have |
| Insert OK, email not configured | **200** | Same. The row records `not_configured` |
| Insert failed | **502** `storage_failed` | Nothing was captured, so **no success is faked** |
| No Supabase configured | **503** `storage_not_configured` | Nowhere to put it. Same discipline, applied earlier |
| Honeypot filled | **200**, nothing written | Answers exactly as success does. **It short-circuits before the store check**, so a bot cannot probe whether the database is configured |

`delivery_not_configured` and `delivery_failed` are **gone**. They named the wrong failure: email
delivery is no longer something the visitor can be affected by.

### 2 — THE TABLE

`public.leads`, created by `supabase/migrations/20260831202514_create_leads.sql` — one migration,
version-controlled, no dashboard-only state.

| | |
| --- | --- |
| Identity | `id` uuid pk `gen_random_uuid()`, `created_at` timestamptz `now()` |
| The brief | `name`, `email`, `message` **not null** — the three fields the form requires; `phone`, `business`, `budget`, `timeline` nullable; `services text[]` not null, default empty array |
| Attribution | `source` not null default `website`, `page_path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` |
| Operational | `status` not null default `new`, `email_notification_status` not null default `pending`, `email_notification_error` |

Two CHECK constraints, so a bad value is a database error rather than a silently wrong dashboard:
`status in (new, contacted, qualified, won, lost, spam)` and
`email_notification_status in (pending, sent, failed, not_configured)`.

**`services` is a real `text[]`**, not a joined string, so a containment filter works without
parsing. **Three indexes and no more** — `created_at desc`, `status`, `email`. This is a small
operational table read by a person in a dashboard; indexing it like an analytics store would be
cargo cult.

Every column that needs one carries a `comment on`, so the Table Editor explains itself to whoever
works the leads without them opening this file.

### 3 — WHAT IS DELIBERATELY NOT STORED, AND IT IS A LIST

**No IP address. No user agent. No device or browser fingerprint. No cookie. No session id. No
generated visitor identifier of any kind.** This is a sales record, not a tracking record, and the
privacy policy now says so in those words. The temptation is real — every one of those is one line
in a route handler — and the answer is that none of them helps anybody reply to an inquiry.

`utm_*` and `referrer` are about **the campaign**, not the person. They answer "did the Meta ad
work", which is a question about Mishram's own spending.

### 4 — RLS: ON, WITH ZERO POLICIES, AND THAT IS THE DESIGN

A table with RLS enabled and **no policies denies every read and every write** to `anon` and
`authenticated`. That is exactly right, because **the browser must never touch this table**. There
is no client Supabase provider, no publishable key in the bundle, no `useSupabase` hook and no
direct insert from the form. The form posts to `/api/inquiry`; that route validates; only that route
writes.

The single exception is the server's secret key, whose role bypasses RLS by design — which is why
adding a policy would only widen the surface without enabling anything. `revoke all … from anon,
authenticated` is belt-and-braces: RLS alone is sufficient today, but a policy added later without
thinking would then have no table privileges sitting behind it to accidentally open.

**Verified in the build output**: `.next/static` contains **zero** occurrences of
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, `service_role`, `sb_secret`, `RESEND_API_KEY`
or even the string `supabase.co`. `@supabase/supabase-js` is not in the client graph at all.

### 5 — `src/lib/supabase/server.ts`, AND WHY IT STARTS WITH `import "server-only"`

`server-only` is the **one** dependency added beyond the client itself, and it earns its place: it
turns "a client component imported the secret-key module" from a silent production leak into a
**build error**. Next already strips non-`NEXT_PUBLIC_` env vars from client bundles, so the leak is
unlikely — but "unlikely" is not the standard for the file holding the key that bypasses RLS. It is
one file with zero transitive dependencies. The §15 rule stands otherwise: no ORM, no Prisma, no
Drizzle, no query builder, no second client.

**Two env names, because Supabase is mid-migration.** Projects now issue `sb_secret_…` keys
alongside the legacy `service_role` JWT and both authenticate identically. `SUPABASE_SECRET_KEY`
wins when set; `SUPABASE_SERVICE_ROLE_KEY` is the fallback. Neither is ever `NEXT_PUBLIC_`, logged,
or returned in a response.

`leadStore()` returns `null` rather than throwing when unconfigured, so
"not configured" stays a normal branch the route already handles instead of an exception that would
read like something the visitor did wrong.

### 6 — ATTRIBUTION, AND WHY IT IS NOT ANALYTICS

`useInquiryAttribution` (`src/hooks/`) reads the five standard `utm_*` parameters and the external
referrer, and hands them to the form at submit. **No library was added and none will be** — §15's
"no analytics or consent SDK" is what lets the cookie policy say what it says.

- **`sessionStorage`, not a cookie.** A cookie travels on every request and would need a consent
  banner. This does not travel at all until the visitor presses submit.
- **`sessionStorage`, not `localStorage`.** A campaign parameter is about *this visit*. One still
  sitting in `localStorage` in November would attribute a February lead to the wrong ad.
- **First touch wins.** The entry is written once and never overwritten, so a visitor who arrives
  from an ad, reads three service pages and then fills the form is still credited to the ad.
  Internal navigation cannot launder the source. **Verified**: landing on
  `/?utm_source=meta&utm_medium=paid_social&…`, then navigating to
  `/services/performance-marketing` with no query string, and the five values are still there.
- **The referrer is kept only when it is external.** A same-origin referrer is just the previous
  page of this site and would be noise in the table.
- **Nothing is written for a direct visit.** No UTMs and no external referrer means no entry at all
  — writing an empty object would let a later page's referrer masquerade as the source.
- Every storage call is wrapped. Private windows, disabled site data and embedded webviews all
  throw here, and the getter falls back to reading the live URL. **Attribution is metadata about a
  lead and must never be able to cost you the lead.**

`page_path` is read at submit rather than stored — it is a fact about the submission, not the visit.
`source` stays `website` for a form submission; which ad sent them is `utm_source`'s question, and
the two are kept apart so neither overwrites the other. `meta_ads` / `google_ads` / `linkedin` /
`outreach` are **not** invented now.

Attribution travels beside the brief and never appears in it: it is not shown back to the visitor,
not included in the notification email, and not written into the WhatsApp fallback.

### 7 — DUPLICATES ARE ALLOWED, ON PURPOSE

**No unique constraint on `email`, and no dedupe.** The same person may legitimately inquire twice —
about a different project, or because the first conversation stalled. Every genuine submission
creates a row. Deduplication is an operational judgement made by a human looking at the table, not a
constraint that silently drops a real lead.

### 8 — SPAM: THE HONEYPOT, AND NOTHING ELSE YET

The existing hidden field is preserved exactly, and now short-circuits **before** the insert, so
bots never reach the table. No CAPTCHA, no bot-detection service, no fingerprinting — the site is
not experiencing abuse, and the first thing a CAPTCHA costs is real inquiries. Rate limiting remains
what §17b already recorded: deployment hardening at the provider or edge, not a per-process counter
that means nothing on serverless. **Revisit if the table starts filling with junk** — which is now
observable, and was not before.

### 9 — COPY THAT HAD TO CHANGE, AND WHY THAT IS NOT A REDESIGN

Two error strings in `INQUIRY_COPY`. Both used to talk about email, because email was the only thing
that could fail. Neither mentions it now, because neither case is about email any more:

| | Was | Now |
| --- | --- | --- |
| `failed` | "We couldn't **send** this right now…" | "We couldn't **save** this right now. You can try again, or continue on WhatsApp." |
| `unconfigured` | "**Email delivery** isn't switched on for this site yet…" | "This site isn't set up to receive inquiries yet. Your details are still here — you can send them straight to us on WhatsApp." |

Everything else in §10h stands: no response-time promise, errors never clear what was typed, the
success state appears only after a confirmed capture, and **WhatsApp never opens by itself.**

### 10 — THE LEGAL DOCUMENTS, REWRITTEN IN THE SAME COMMIT

§18: *"If the site gains an analytics tool, a cookie, an embed or a new processor, the policy changes
in the same commit — never after."* It gained a processor and a second piece of browser storage.

**`/privacy`:**

- **"The route does not write your inquiry to a database, a file or a log" is deleted.** It was true
  and is now false, and leaving it would have been the single worst line on the site.
- *How an inquiry actually travels* now says the inquiry is **saved to our database first**, that
  **Supabase** hosts it, that the email is a **notification** sent afterwards, and — in plain words —
  that a failed email does not mean a lost inquiry, because that is the whole point of the order.
- *What we collect* gains the page it was sent from and the campaign that sent them, with the reason
  ("so we know which of our own efforts actually reach people") and the exception ("if you came here
  directly there is nothing to record").
- *What we do not collect* now states explicitly: **no IP address, no user agent, no device details,
  no identifier**, and that reading the site records nothing.
- *Who else is involved* gains **Supabase**; Resend is relabelled as delivering the **notification**.
  The list ends "We do not sell, rent or trade inquiry information to anyone."
- *How long we keep things* now names **both** places — database and inbox — and a deletion request
  removes it from both.

**`/cookies`:** *The one thing that is stored* became **the two things**. The new entry is named
(`mishram-attribution`), explained, and its lifetime stated: session storage, scoped to the tab,
gone when it closes, never used to recognise anybody. The no-cookie claim is untouched and still
true. The consent-banner paragraph was rewritten to justify itself on what the storage *does* rather
than on there being none of it.

**Not written:** anything alarming, anything technical for its own sake, and any claim about
hosting, encryption or compliance that this project cannot verify.

### 11 — NOT BUILT, DELIBERATELY

No admin login, no lead dashboard, no pipeline UI, no automated follow-up, no email sequence, no
lead scoring, no CRM integration and no Slack alert. **The Supabase Table Editor is the CRM for
launch** — `created_at`, `name`, `email`, `phone`, `business`, `services` and `status` are all
plainly inspectable, and `status` is a hand-edited CHECK-constrained column precisely so a person
can work the pipeline in the dashboard.

§10h's "the natural attachment point for a CRM" is still the plan, and is still not this task.

### 12 — DEPENDENCIES

`@supabase/supabase-js@^2.112` and `server-only@^0.0.1`. **That is the entire addition.** Resend is
still one server-side `fetch` with no npm package (§15). No ORM, no Prisma, no Drizzle, no
validation library, no analytics SDK.

### 13 — FILES

```
supabase/migrations/20260831202514_create_leads.sql   new — the table, indexes, RLS, comments
src/lib/supabase/server.ts                            new — server-only client, leadStore()
src/hooks/useInquiryAttribution.ts                    new — utm_* + external referrer, first touch
src/app/api/inquiry/route.ts                          rewritten — insert, then notify, then mark
src/config/inquiry.ts                                 + attribution vocabulary; two error strings
src/components/inquiry/InquiryForm.tsx                sends attribution; new error mapping
src/config/legal.ts                                   privacy + cookies rewritten (§10 above)
.env.example                                          + SUPABASE_URL and the secret-key names
.gitignore                                            + supabase/.temp, supabase/.branches
```

### 14 — PRODUCTION ENVIRONMENT VARIABLE NAMES

Names only. **No value belongs in this document.**

| Variable | Required | Without it |
| --- | --- | --- |
| `SUPABASE_URL` | **yes** | `/api/inquiry` answers `storage_not_configured`; the form says so and offers WhatsApp |
| `SUPABASE_SECRET_KEY` **or** `SUPABASE_SERVICE_ROLE_KEY` | **yes** | Same. Secret wins if both are set |
| `RESEND_API_KEY` | no | Lead still captured; row records `not_configured` |
| `INQUIRY_FROM_EMAIL` | no | Same. Still deliberately has no default (§10h) |
| `INQUIRY_TO_EMAIL` | no | Defaults to `CONTACT.email` |
| `NEXT_PUBLIC_BOOKING_URL` | no | Booking CTAs fall back to WhatsApp |

**The first two are what changed the deployment checklist.** §17b recorded a site whose missing env
vars were all optional; two are now required for the form to work at all.

### 15 — THE SUPABASE ACCOUNT, AND IT IS NOW LIVE (Revision 25B)

Revision 25 left this section as the one outstanding block: the CLI could not authenticate without a
TTY, and the MCP connection exposes no organization-creation call. **The client authenticated, and
everything behind it is now done.**

**One correction worth recording**, because it changes what "the account" means: the MCP connection
sees **one** organization, but the authenticated CLI sees **three**. `krishlathwal's Org`
(`krishlathwal's Project`, `ap-southeast-2`, paused) was invisible to the MCP token. Do not treat
the MCP's organization list as the account's inventory.

| | |
| --- | --- |
| Organization | **`Mishram Media`** — `qgubicgcimfosaqwxeov`. **Created**, not reused |
| Plan | **Free.** `supabase orgs create` completed with no card, no plan selection and no charge |
| Project | **`mishram-media-leads`** — ref `cfequtbkoqyfvfzwxesc` |
| Region | **`ap-south-1` (Mumbai)** — the audience is India |
| Postgres | 17.6, `ACTIVE_HEALTHY`, verified with a live query before the migration ran |
| Dashboard | `https://supabase.com/dashboard/project/cfequtbkoqyfvfzwxesc` |

**`Mishram Foundation` was not used and was not touched.** Neither was its `mishram.org` project.
The linked ref was read back off `supabase/.temp/project-ref` and checked against the new project
before `db push` was allowed to run — the one command in this task that could have written to the
wrong database.

**The database password** was generated locally at 40 characters from a hardened alphabet, passed to
`projects create` through a shell variable so it never appeared in a command line, and written only
to `supabase/.temp/db-password` — ignored by both `.gitignore:42` and the `supabase/.gitignore`
that `supabase init` created. It is not in this document, the repository, the source, the migration
or any report.

**`supabase init` was run**, adding `supabase/config.toml` and `supabase/.gitignore`. The config is
the stock template — scanned, and every `secret` / `password` / `token` line in it is a commented
placeholder. Both are safe to commit; `supabase/.temp/` is not, and is excluded twice over.

**The migration was applied by `supabase db push`, not by hand.** No table was created in the
dashboard, and there is no second leads table. `migration list` showed
`local 20260831202514 / remote (empty)` before, and the push applied exactly that one file.

### 16 — THE SCHEMA, VERIFIED AGAINST THE LIVE DATABASE (Revision 25B)

Read back from `information_schema` and `pg_catalog` rather than assumed:

- **All 21 columns present, in the specified order**, with the right types and nullability. `id` uuid
  pk `gen_random_uuid()`; `created_at` timestamptz `now()`; `services` is `_text` — a real `text[]` —
  not null, default `'{}'::text[]`; `source` default `'website'`; `status` default `'new'`;
  `email_notification_status` default `'pending'`.
- **Both CHECK constraints exist with the exact value sets** — `leads_status_check` over
  `new, contacted, qualified, won, lost, spam`, and `leads_email_notification_status_check` over
  `pending, sent, failed, not_configured`.
- **Exactly three indexes plus the primary key** — `leads_created_at_idx (created_at DESC)`,
  `leads_status_idx`, `leads_email_idx`. Nothing was added.

**RLS is `ENABLED` with zero policies and zero grants**, which is the design §4 above describes.
`has_table_privilege` returns **false for `anon` and `authenticated` on SELECT, INSERT, UPDATE and
DELETE**, and true for `service_role` on all four.

**Proved at runtime, not just in the catalog.** The live REST API was called with the project's
publishable key:

```
GET  /rest/v1/leads   → 401  permission denied for table leads
POST /rest/v1/leads   → 401  permission denied for table leads
```

**The one Supabase security advisory on this project is `rls_enabled_no_policy` at `INFO`**, which
is this design being described back to us, not a defect. There is no `WARN` and no `ERROR`. Do not
"fix" it by adding a policy.

### 17 — THE LIVE TESTS (Revision 25B)

All four paths were exercised against the real project. **Every synthetic row was deleted
afterwards, and the table is empty.**

| Test | Result |
| --- | --- |
| **Capture, through the real form in a browser** | `200`. Row written with every field correct |
| **Email not configured** | `200`, `email_notification_status = not_configured`, error `null` |
| **Email failure** | `200`, `email_notification_status = failed`, error `provider 401: API key is invalid` — **32 characters**, no key echoed, no stack trace |
| **Database failure** | `502 storage_failed`, **no row written, no fake success** |

**Normalisation verified on the real row.** `TEST+Supabase@Mishram.Media` typed into the form was
stored as `test+supabase@mishram.media`; leading and trailing whitespace was trimmed from the name;
and **`+91 99999 99999` was stored exactly as typed** — the phone rule holds, no country code was
invented, nothing was reformatted.

**Attribution verified end to end.** Landing on
`/services/performance-marketing?utm_source=integration_test&utm_medium=qa&utm_campaign=supabase_launch&utm_content=form_test&utm_term=lead_capture`
and submitting stored all five parameters, `page_path = /services/performance-marketing`,
`source = website` and `referrer = null` — **nothing invented for a direct visit**. The route's
preselected `performance` arrived as a `text[]` of one element.

**`services` stores option ids, not labels** — `{performance}`, not `{Performance Marketing}`. That
is deliberate: ids are the allow-list and are stable, labels are editorial copy that has already
changed once on this site. The column comment records the mapping for whoever reads the table.

**The email-failure test used an obviously invalid key** (`re_invalid_key_for_failure_path_test`)
in a temporary `.env.local`, restored from a backup immediately afterwards. **No real credential was
created, used or exposed to exercise a failure path.** The database-failure test replaced the
Supabase secret with an invalid string for one submission — **the project itself was never deleted,
paused or reconfigured**, and the table was untouched throughout.

**The database-failure UI was driven in the browser**, not inferred: the honest notice
*"We couldn't save this right now. You can try again, or continue on WhatsApp."*, **no success
state**, the retry button still present, and `Continue on WhatsApp` →
`https://wa.me/919548278558` carrying the full brief with every typed value preserved.

**One thing the tests exposed about `sessionStorage`, and it is the feature working.** The second
campaign test initially recorded the *first* test's UTMs, because the browser tab had never been
closed and first-touch attribution refuses to overwrite itself. That is exactly the behaviour §6
specifies. A real campaign visitor arrives on a fresh page load; an agent re-running tests in one
tab has to clear the entry, which is what was done.

### 18 — THE TABLE EDITOR (Revision 25B)

`public.leads` is listed through the same Management API the dashboard's Table Editor reads —
RLS enabled, and carrying its table comment. `created_at`, `name`, `email`, `phone`, `business`,
`services` and `status` are all plain columns, and `status` is the hand-edited CHECK-constrained
one. **No custom admin UI was built and none is planned for launch.**

### 19 — VERCEL (Revision 25B)

`.vercel/project.json` was read before anything was written: `prj_88q2cT1X6WpG8t0xUy70jUf4pk7L` /
`mishram-media` under `team_8EBVpOomRw1AwITgcDqlTQgZ` — **the correct project, and not the
Foundation's `mishramngo`.** The project had **no environment variables at all** (§17b said so, and
it was still true).

**`SUPABASE_URL` and `SUPABASE_SECRET_KEY` are now set for Production and Preview**, both stored as
Vercel Secret type. **Development is deliberately not configured** — local development reads
`.env.local`, and a second copy of a secret is a second place to leak it from.

`RESEND_API_KEY`, `INQUIRY_FROM_EMAIL` and `INQUIRY_TO_EMAIL` remain unset everywhere. That is a
choice, not an oversight: the form works without them and the row records `not_configured`.

### 20 — THE CREDENTIAL, AND WHICH ONE

The project issues **both** key models. It exposes a modern `sb_secret_…` key, so **that is the one
in use** and `SUPABASE_SECRET_KEY` is the only name configured — locally and on Vercel.
`SUPABASE_SERVICE_ROLE_KEY` stays supported in `server.ts` and documented in `.env.example` for a
project on the legacy scheme, but **it is not set anywhere**, because two names holding the same
credential is two things to rotate.

### Verified

- **Types, lint and the production build are clean.** Twenty routes; `/api/inquiry` still dynamic,
  which it must be — `next export` remains forbidden (§17b).
- **Every route branch exercised against the live dev server**: valid payload → `200` with a real
  row; honeypot → `200` with nothing written; bad name, bad email and short message → `400
  validation` carrying all three field errors; non-JSON body → `400 invalid_request`; unconfigured
  storage → `503 storage_not_configured`; broken credential → `502 storage_failed`.
- **No secret reaches the browser.** A clean `npm run build`, then `.next/static` scanned two ways:
  by name (`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, `service_role`, `sb_secret`,
  `RESEND_API_KEY`, `supabase.co`) → **0 files**; and by **literal value**, searching all 47 client
  files for the actual configured secret, URL and OIDC token → **0 occurrences**, without the values
  being printed.
- **`git status` carries no credential.** `.env.local` is ignored by `.gitignore:34`;
  `supabase/.temp/db-password` by `supabase/.gitignore:3`; the only env file tracked is
  `.env.example`, which holds names and no values. A dry-run `git add supabase/` stages exactly
  three files: `.gitignore`, `config.toml` and the migration.
- **The leads table is empty.** Three synthetic rows from the first pass and one from the final
  proof were deleted by an exact match on the test name *and* the test email. No real lead has ever
  existed in it.

---

## 10ad. GOOGLE ANALYTICS 4 (Revision 26)

**Measurement, not a redesign.** No composition, spacing, typography or motion moved. One new piece
of UI exists — a small consent notice — and it exists because the alternative was measuring people
without asking them.

The property is **`G-QKQK14BSFG`**, and **that string appears in exactly one place in this
repository: nowhere.** It lives in `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel Production, is read
once by `config/analytics.ts`, and no component contains it.

### 1 — ONE MOUNT, AND THAT IS THE WHOLE INSTALLATION

Google's snippet is **not pasted into a single page file.** `app/layout.tsx` renders two things:

| Piece | Where | Strategy |
| --- | --- | --- |
| `<AnalyticsBoot />` | inside `<head>`, beside `themeBootScript` | plain inline `<script>`, parse time |
| `<GoogleAnalytics />` | top of `<body>` | `next/script`, `afterInteractive` |

Every public route renders inside that layout, so all of them are covered and **a route added
tomorrow is covered on the day it exists** — the same argument §10j makes for the service-page
registry. Verified against the running server: `/`, `/about`, `/privacy`, `/terms`, `/cookies` and
all five service routes each carry `id="ga-boot"` **exactly once**.

**No Google Tag Manager.** GA4 through `gtag.js` directly: one script, no container, no second
configuration surface that can disagree with this file. **No npm package either** — §15's rule
holds, and this revision added **zero dependencies**.

### 2 — THE ORDER IN `dataLayer` IS THE ARCHITECTURE

The inline boot script is a plain `<script>` rather than `next/script`'s `beforeInteractive` for
the same reason `themeBootScript` is one: it must execute at parse time, and being written first in
`<head>` is sufficient — no framework mechanism required, and no lint rule to suppress. It runs:

```
consent default  — all four signals denied
  → consent update — analytics_storage: granted, ONLY if this visitor already allowed it
    → js
      → config G-…, send_page_view: false
```

`gtag()` only pushes into `dataLayer`, so all of that is queued before Google's library is even
requested and replayed in order when it arrives. **That closes the race the plan named** — *page
tracked → visitor rejects → too late*. Verified in the browser: a returning visitor who chose
`Only necessary` produces `consent default` and nothing else; one who chose `Allow analytics`
produces `default` then `update granted`, both ahead of `config`.

### 3 — `send_page_view: false`, AND THE DUPLICATE IT PREVENTS

`gtag('config', …)` sends a page view on load and then never again — right for a
document-per-navigation site, wrong for this one, where the header, the route wipe and every
internal link navigate on the client. Leaving it on *and* tracking route changes is how a site ends
up with **two** page views for its landing page and one for every page after it.

So it is off, and `components/analytics/RouteObserver.tsx` sends every view **including the first**.

**What counts as a navigation is `pathname` and `searchParams`, and nothing else:**

- **A hash does not.** `#about`, `#creators`, `#project-inquiry` are how this homepage is read —
  §10g made the whole navigation native anchors — and a visitor scrolling six chapters would
  otherwise look like six page views. This is the single biggest source of inflated page views on a
  one-page site, and it is designed out rather than filtered later.
- **Query changes do**, so `/?utm_source=meta` is a distinct arrival. GA4 reads the standard `utm_*`
  parameters out of `page_location` itself; **no second attribution system was built**, and the
  Supabase session attribution from §10ac is untouched and still answers a different question.
- **Back and forward do.**

A ref holds the last URL actually reported, which stops React's development Strict Mode double
effect, a parent re-render, and a `searchParams` object that changes identity without changing
value — none of which are navigations.

`useSearchParams` makes its subtree dynamic, so it sits behind a `<Suspense>` boundary. **Without
it, adding analytics would have quietly opted the entire site out of static generation.** All twenty
routes still prerender.

**Measured, not asserted** — `/ → /about → /services/performance-marketing → /` produced exactly
four page views, one per navigation; two hash changes in between produced **none**; back and forward
produced one each.

### 4 — CONSENT: DENIED BY DEFAULT, AND THE TAG STILL LOADS

Consent Mode v2, **advanced**: `gtag.js` loads on every page and all four signals start `denied`.
With `analytics_storage: denied` the tag sets no cookie and stores no identifier.

**This was a real decision and it is worth recording the alternative.** *Basic* consent mode — not
loading Google's script at all until someone allows it — is marginally more private and was
seriously considered. It was rejected for one concrete reason: **Google's own "Test installation"
check loads the site as a fresh visitor with no consent, so under basic mode it would find no tag
and report the installation as failed.** Advanced mode is Google's documented architecture, gives
the same guarantee that matters (nothing is stored before consent), and is what the plan asked for —
its test 10 says consent rejection prevents *storage*, which is exactly this.

**Proved in the browser, on a cleared profile:**

| State | `_ga` cookies |
| --- | --- |
| Loaded, not yet answered | **none** |
| After `Only necessary` | **none** |
| After `Allow analytics` | `_ga`, `_ga_<property>` |

`ad_storage`, `ad_user_data` and `ad_personalization` are **never granted, by any path.** There is
no advertising tag on this site, so asking for permission it cannot use would be theatre — and
`setConsent` only ever writes `analytics_storage`.

**The notice.** A hairline card bottom-left in the site's own type: a `.caps` label, one sentence,
`Allow analytics` / `Only necessary`, and a quiet `Privacy` link. **Not a modal, no scrim, no focus
trap, no dismiss-without-answering X** — closing a consent prompt is not an answer, and treating it
as one is the dark pattern the plan said not to build. Neither button is styled as the wrong one.
Real `<button>`s in the tab order, `aria-live="polite"`, visible focus rings, and an entrance of
opacity plus 8px that `MotionConfig reducedMotion="user"` strips to a plain fade.

The answer is `localStorage["mishram-analytics-consent"]` — **its own key**, never the theme's — and
is read through `useSyncExternalStore` with a server snapshot of "answered", the same idiom
`ThemeProvider` uses. So the notice is absent from the prerendered HTML, appears after hydration only
for someone who has not replied, and **there is no copy of the choice in React state.**

### 5 — `generate_lead`, AND WHAT IT IS TIED TO

Fired at exactly one line: the `response.ok` branch of `InquiryForm`'s submit. A `200` from
`/api/inquiry` means one thing — **the row was written to Supabase** (§10ac) — so the conversion and
the words *"Brief received."* are the same event.

**It does not fire** on a validation error, on the honeypot, on a failed insert, when the WhatsApp
fallback is clicked, or when somebody merely opens the form. Verified: a submission with the
database credential broken produced `page_view`, `form_start`, and **zero** `generate_lead`.

The payload, read out of `dataLayer` on a real submission:

```
generate_lead {
  services: "performance", service_count: 1,
  budget_range: "1l-3l", timeline: "30-days",
  page_path: "/services/performance-marketing",
  form_context: "service:performance-marketing"
}
```

**Every value is an option id from `config/inquiry.ts`'s allow-lists, a count, or a place.** No name,
email, phone, business or message — and not by discipline alone: `AnalyticsEvent` is a discriminated
union whose every field is a fixed semantic string or number, so a free-text field **cannot** reach
Google even by typo.

### 6 — THE EVENT VOCABULARY, AND WHY IT IS SHORT

| Event | Parameters | Where |
| --- | --- | --- |
| `page_view` | `page_title`, `page_location`, `page_path` | every navigation |
| `generate_lead` | services, service_count, budget_range, timeline, page_path, form_context | confirmed capture only |
| `form_start` | `form_name`, `form_context` | first real edit, once per form instance |
| `book_consultation` | `context` | hero, five service heroes, contact panel |
| `start_project` | `context` | service heroes, About bridge |
| `contact_click` | `method` (whatsapp/email/phone), `context` | contact panel, footer, inquiry direct rows, inquiry fallback |
| `social_outbound` | `platform`, `context` | footer rail, contact panel |
| `creator_profile_click` | `platform`, `context` | roster, worked-with index |
| `service_explore` | `service_slug`, `context` | `Explore service ↗` |

**Deliberately not tracked:** mouse movement, scroll depth, hover, theme switches, menu opens, FAQ
expands, and the footer/menu service links — those are ordinary navigation and are already page
views. **Useful analytics, not event noise.**

`service_explore` sends the **slug**, never the label: the slug is what the route is built from, the
label is editorial copy that has already been rewritten once (§10).

### 7 — WIRED AS DATA, NOT AS CALLS

**`window.gtag` is called in exactly one file**, `lib/analytics.ts`. There is no `(window as any)`
anywhere; `Window` is properly augmented with a typed `gtag`.

Components declare measurement rather than performing it. `CtaButton` and `PageLink` — the site's two
shared link abstractions — take an optional typed `track` prop; `Footer`'s `TextLink` and
`ProjectInquiry`'s `DirectRow` take the same; the contact panel's four rows carry `track` as a field
**in the channel table, next to the href**, so one `onClick` in one loop covers all of them.

The best example is `ServiceHero`: its primary is always the booking ask and its secondary always
goes to the inquiry form, so **the events live in the component that guarantees that** rather than
being repeated across five page files that could drift. Which service is not lost — `page_location`
rides on every GA4 event.

Tracking never delays or intercepts a click. `onTrackedClick` queues the event and returns; the
anchor does what an anchor does.

### 8 — ANALYTICS CANNOT BREAK THE SITE

Every helper no-ops when the tag is off, when the script has not loaded, when an ad blocker removed
it, or when anything throws. `track()` is wrapped; `pageView()` is wrapped; `setConsent()` still
writes the visitor's choice even if Google is unreachable.

**Supabase remains the source of truth and GA is measurement.** Nothing about lead capture depends on
`gtag`: the success state is set from the HTTP response, not from a successful event, and no GA data
is written into `leads`.

**With `NEXT_PUBLIC_GA_MEASUREMENT_ID` absent, the site is byte-identical to before this revision** —
verified: `/`, `/about`, `/privacy` and a service route each served `200` with **zero** analytics
references in the HTML, and a real inquiry still stored successfully.

### 9 — PRODUCTION ONLY, AND HOW THAT IS ENFORCED

| Environment | Tag |
| --- | --- |
| Production (`mishram.media`) | on |
| Vercel Preview | **off** — variable not set |
| `next dev` / local `npm run build` | **off** — variable not set |

One condition — `analyticsEnabled = GA_MEASUREMENT_ID.length > 0` — rather than a hostname
allow-list that would break the first time a domain changed. A developer who *does* set it locally
gets `debug_mode: true` (from `NODE_ENV`), so their hits land in GA4's **DebugView** instead of the
reports. **That is Google's own mechanism for this, not an invented one**, and it means nobody has to
dismiss a consent notice to work on the site.

**All local verification for this revision used a deliberately fake property, `G-LOCALTEST00`**, so
not one test hit could reach `G-QKQK14BSFG`.

### 10 — THE LEGAL DOCUMENTS, REWRITTEN IN THE SAME COMMIT

§18 again: *the policy changes in the same commit as the behaviour, never after.* The site gained a
processor, a third piece of browser storage and — conditionally — its first cookie.

**`/privacy`:** *"This site runs no analytics"* is **gone.** A new chapter, *Google Analytics, and
what we ask you first*, explains in plain words what it is for, that it runs in a no-storage mode
until you answer, what Google processes if you allow it, that advertising is switched off entirely
whichever you choose, and — as a list — that **your name, email, phone, business name and message
are never sent to Google.** *What we do not collect* keeps its exactness but no longer over-claims.
Google Analytics joins the processor list.

**`/cookies`:** the lead and the whole opening are rewritten. It now says the site sets **no cookies
of its own**, that **one** cookie is possible and only after `Allow analytics`, and names them —
`_ga` and a second beginning `_ga_`. **No expiry is quoted**, because that is Google's setting to
change and a number here would be wrong the moment it did. Two new sections cover each answer.
*The one thing that is stored* became **the three things**, adding `mishram-analytics-consent`.
*Third-party cookies* became *Third-party scripts* and names GA as the only one — while still saying
plainly that marketing cookies, the Facebook Pixel, Google Ads and the LinkedIn Insight Tag **do not
exist here**, which is the point: the document tracks the site in both directions.

The audit table at the head of `config/legal.ts` was updated too, so the record of what the old site
claimed and what this one does stays honest.

### 11 — PERFORMANCE

`gtag.js` is `afterInteractive` — requested after hydration, so it never competes with the WebGL
hero for the main thread and is not in front of LCP. §16 stands: the hero remains the only heavy
runtime cost.

**First-party JavaScript is essentially unchanged**: no dependency was added, and the whole
implementation is one config file, one lib file, three small components and a handful of props. The
inline boot script is a few hundred bytes in `<head>`. All twenty routes still prerender statically —
the `Suspense` boundary is what protects that.

### 12 — GOOGLE ADS: READY, AND DELIBERATELY ABSENT

**No `AW-` conversion id and no conversion label**, because none was supplied and inventing one
would be a fabrication of exactly the kind §9 and the legal audit exist to prevent. The three `ad_*`
consent signals already exist and are already denied; the event union is the place a future Ads
conversion would be declared. **This revision is GA4 only.**

### Verified

- **Types, lint and the production build are clean.** Twenty routes, all still static;
  `/api/inquiry` still dynamic.
- **Global coverage measured, not assumed** — nine public routes each serve `id="ga-boot"` exactly
  once, with `consent default` all-denied and `send_page_view: false` in the served HTML.
- **Page views:** one on load, one per client navigation, one per back/forward, **none** for a hash
  change. The `/ → /about → /services/performance-marketing → /` walk produced exactly four.
- **Consent:** default denied; `Only necessary` → no `_ga` cookie ever, notice never returns;
  `Allow analytics` → `_ga` + `_ga_<property>`, and on the next load `update granted` is queued
  ahead of `config`. Advertising signals never granted.
- **`generate_lead` fires once on a confirmed capture and zero times on a database failure.** The
  WhatsApp fallback fires `contact_click` with `context: inquiry_fallback` — **never**
  `generate_lead`, because a failed insert is not a lead and following a link is not proof a message
  was sent.
- **Every CTA event exercised in the browser** — `book_consultation` (hero, panel), `contact_click`
  (footer ×3, panel ×3, inquiry fallback), `social_outbound`, `service_explore` ×3 with correct
  slugs, `start_project`, `creator_profile_click` from both indexes, `form_start` once across
  seventeen keystrokes.
- **No PII in any payload**, read out of `dataLayer` rather than reasoned about, and structurally
  impossible: every parameter in the union is a fixed semantic string or number.
- **Missing id does not break the site** — four routes `200` with zero analytics references, and an
  inquiry still stored.
- **No secret in the client bundle or in git.** `.next/static` scanned by name and by literal value
  (0 of each); 245 tracked and untracked files scanned for the live Supabase secret, the OIDC token
  and the database password — **0 leaks**.
- **Synthetic rows deleted.** The `leads` table is empty.
- **Vercel:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` set on **Production only**, value read back and
  confirmed as `G-QKQK14BSFG`. Preview and Development deliberately unset.
- **Google's "Test installation" is PENDING.** It cannot pass until `mishram.media` is redeployed —
  a `NEXT_PUBLIC_` variable is inlined at build time, so **the tag will not exist in production
  until a new deployment is made.** Nothing about this revision has been verified against the live
  domain, and nothing here claims it has.

---

## 10ae. PRODUCTION LAUNCH (Revision 27)

**The site is live at `https://mishram.media`**, serving the build that contains the Supabase lead
backend (§10ac) and Google Analytics 4 (§10ad). Everything below was measured against the live
domain, not against a preview.

### 1 — THE COMMIT

`cbbf998` — *Production launch — leads, analytics and creator proof* — on `main`, pushed to
`github.com/krishlathwal/mishram-media` (private). 32 files: three revisions' worth of work in one
launch commit.

Working tree clean afterwards, `main` tracking `origin/main`.

**Nothing unwanted went in.** The staged set was reviewed file by file before committing: no
`.env.local`, no `supabase/.temp`, no `.next`, no `node_modules`, no screenshots, no QA scratch
files, no raw Drive media. `supabase/` contributed exactly three files — `.gitignore`,
`config.toml` and the migration.

**Secret scan before push, and it is worth recording how it was done**, because grepping for the
*word* `secret` proves nothing. Every tracked and untracked file (245 of them) was searched for the
**literal values** of the live Supabase secret key, the Supabase URL, the Vercel OIDC token and the
database password: **zero hits.** A pattern scan for `sb_secret_`, `service_role`, Resend keys and
JWT prefixes returned only documentation — `.env.example` describing the two env names, this brief
describing the scan itself, and a comment in `lib/supabase/server.ts`. No key material anywhere.

### 2 — THE DEPLOYMENT

| | |
| --- | --- |
| Project | `mishram-media` — `prj_88q2cT1X6WpG8t0xUy70jUf4pk7L`, team `silksora` |
| Deployment | `dpl_DducrK4UcWdennMTvkJedX295v1m`, `readyState: READY`, `target: production` |
| Build URL | `https://mishram-media-r2fe70pph-silksora.vercel.app` |
| Stable alias | `https://mishram-media.vercel.app` |
| Command | `npx vercel deploy --prod` |

`.vercel/project.json` was read **before** anything was deployed and matched the expected id
exactly. **`mishramngo` — the Foundation's project — was not touched**, and neither was any other.

The CLI remains the deployment path for the reason §17b records: `silksora` is on Hobby and the
repository is private, so Git-triggered production builds are refused. That decision is still the
client's and is still open; it does not block anything, because the CLI upload builds fine.

**Production environment, verified before deploying:** `SUPABASE_URL`, `SUPABASE_SECRET_KEY` and
`NEXT_PUBLIC_GA_MEASUREMENT_ID` all present. Preview carries the two Supabase variables; GA4 stays
Production-only (§10ad §9). `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` and
`NEXT_PUBLIC_BOOKING_URL` remain unset — deliberately, and none of them blocks a launch.

### 3 — THE DOMAIN WAS ALREADY CUT OVER

**§17b's first outstanding item — the GoDaddy DNS change — has been done by the client since that
section was written.** This revision did not need to change a single DNS record, and did not.

Observed live:

| Host | Resolves to | Result |
| --- | --- | --- |
| `mishram.media` | `216.198.79.1`, `64.29.17.1` | `200`, `Server: Vercel` |
| `www.mishram.media` | same pair | `308` → `https://mishram.media/` |
| `http://mishram.media` | — | `308` → `https://mishram.media/` |

Those two A records are **exactly the rank-1 values §17b read off `vercel domains verify`**, so the
zone matches what the project asked for. Both hostnames are attached to `mishram-media` in Vercel,
and the apex is the canonical host.

**THE NAMESERVERS ARE STILL GODADDY'S — `ns59` / `ns60.domaincontrol.com` — AND THAT IS CORRECT.**
Vercel's domain inspector marks them with ✗ because they are not `ns1/ns2.vercel-dns.com`. **Do not
"fix" that.** §17b's reasoning stands and is now load-bearing: the domain carries
`info@mishram.media`, and moving nameservers to Vercel would move MX, SPF, DKIM and DMARC with them.
The A/CNAME route achieves the same web routing and touches no mail record. **No MX, SPF, DKIM,
DMARC or verification record was read, altered or deleted in this revision.**

**SSL is live and valid**: Let's Encrypt, `CN=mishram.media`, `notBefore` 30 Aug 2026, `notAfter`
28 Nov 2026, chain verified by `curl` on both apex and `www` with no warning.

### 4 — WHAT WAS VERIFIED ON THE LIVE DOMAIN

**Twelve routes, all `200`:** `/`, `/about`, `/privacy`, `/terms`, `/cookies`, all five service
routes, `/sitemap.xml`, `/robots.txt`.

**SEO, read off the live HTML rather than the source:**

- Every canonical resolves against `https://mishram.media` — the `metadataBase` architecture holds
  in production, and the domain still appears in exactly one place in the codebase (`config/site.ts`).
- `sitemap.xml` carries **nine** `https://mishram.media` URLs, once each, with no API route and no
  hidden service.
- `robots.txt` allows `/`, disallows `/api/`, declares the host and the sitemap.

**Homepage integrity:** all eleven sections present in the DOM — `hero`, `collaborations`,
`current-management`, `what-we-do`, `difference`, `creators`, `process`, `work`, `recognition`,
`about`, `project-inquiry`. **17 images, zero broken.** Exactly one `h1`. **No console errors.**
Verified visually at desktop and at a phone width, including the new consent notice.

**Contact details, read out of the live DOM:** `mailto:info@mishram.media`, `tel:+919548278558`,
`https://wa.me/919548278558`, `https://instagram.com/filmybande`,
`https://www.linkedin.com/in/prashant-mishra-mishram-media`, and the Facebook page. **No `href="#"`,
no empty href, and every one of the `target="_blank"` links carries `rel="noopener"`.** Links only —
nothing was sent, dialled or messaged.

**Visibility is unchanged, and was only checked, not touched:**

- **Brand Shoots & Content** — `noindex, nofollow` on the route, absent from the sitemap, and **zero
  occurrences of `brand-shoots-content` in the HTML of `/`, `/about` or a service page.** §10s's
  derived hiding survives deployment.
- **Web & Digital Experiences is public, and that is the recorded state, not a leak.** §10y
  published it in Revision 21; it is indexable, in the sitemap and linked from discovery. Anyone
  reading a launch checklist that still describes it as unfinished should read §10y first.

### 5 — THE LIVE LEAD TEST

One synthetic inquiry submitted **from `https://mishram.media`**, landing on
`/?utm_source=production_test&utm_medium=qa&utm_campaign=domain_launch` and submitting from
`/services/performance-marketing` **two internal navigations later**.

Stored row: name, email, phone, business and message correct; `services` `{performance}` as a
`text[]`; `budget` `1l-3l`; `timeline` `30-days`; `source` `website`; `page_path`
`/services/performance-marketing`; `status` `new`; `email_notification_status` `not_configured`
with a `null` error.

**All three UTMs survived** — first-touch attribution held across two client-side navigations on the
real domain, which is the behaviour §10ac §6 designed and this is its first production proof.

`generate_lead` fired **once**, after the row existed, carrying only option ids, a count and a page.

**The synthetic row was then deleted by exact match on the test name and the test email. The `leads`
table is empty. No real lead has ever existed in it.**

### 6 — THE LIVE GA4 TEST

Run against `https://mishram.media` with cleared storage and cookies.

- `gtag.js` loaded with `id=G-QKQK14BSFG` — **read off the live `<script>` element, not inferred
  from the env var.** A `NEXT_PUBLIC_` variable is inlined at build time, so this is the only proof
  that counts.
- `consent default` with all four signals `denied`, first in `dataLayer`.
- **Zero `_ga` cookies before answering.**
- After `Allow analytics`: `_ga` and `_ga_QKQK14BSFG`, and a `consent update` carrying
  `analytics_storage: granted` **only** — the three advertising signals were never granted.
- `/` → `/about` → `/services/performance-marketing` produced **exactly three page views, one per
  navigation**, with the campaign parameters in `page_location` of the first.
- **Real hits reached Google**: seven requests to `googletagmanager.com` and
  `google-analytics.com/g/collect` recorded in the page's resource timing.

**Google's own "Test installation" has NOT been run**, and this document does not claim it passed.
The tag is verifiably live and collecting, which is the precondition for it — the button itself is
in the client's Google Analytics screen and is theirs to press.

### 7 — WHAT IS STILL OPEN, AND NONE OF IT BLOCKED THE LAUNCH

1. **No notification email.** `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` are unset, so every lead
   lands with `email_notification_status: not_configured` and **nobody is told about it.** The lead
   is safe — that is the whole point of §10ac's ordering — but **until Resend is configured,
   somebody has to watch the Supabase Table Editor.** This is the single most operationally
   important item on this list.
2. **No rate limiting on `/api/inquiry`** — recorded as post-launch hardening since §10h, and still
   correct as one. **Deliberately not invented during a launch**: a per-process counter is
   meaningless on serverless, and the honest fixes are provider-level or edge middleware. The
   honeypot short-circuits before the insert, so bots do not reach the table, and the table is now
   observable — revisit if junk appears.
3. **The Netlify remnant.** `netlify.toml` is committed and `.netlify/state.json` (git-ignored) still
   names site `d41f4d3c-f07e-462d-9e1d-c45c560b4a13`. **There is no live conflict**: the domain
   resolves to Vercel and is served by Vercel, so nothing about the Netlify site can take
   `mishram.media` down. What may still be true is that a push to `main` builds the site twice, on
   two hosts. **Disconnect it as a separate cleanup step, now that Vercel is confirmed live** — not
   before, and not blindly.
4. **Git-connected deployments are still blocked** (Hobby plan + private repository, §17b). The
   plan-vs-visibility decision is unchanged and unmade. `npx vercel deploy --prod` remains the
   deployment command.
5. **The consent notice's two buttons are 40px tall on a phone.** That clears WCAG 2.2 AA's 24px
   minimum comfortably, but it is under the **48px** this project holds itself to for the inquiry
   form's option rows (§10h). Left alone during a launch rather than changing production for it;
   worth a one-token fix in the next content pass.

### Verified

- **Types, lint and the production build clean** before the commit and again after it. Twenty
  routes, all static; `/api/inquiry` still dynamic — `next export` remains forbidden.
- **`git status` clean, `main` tracking `origin/main`, no secret tracked.** 245 files scanned for
  four literal secret values: zero hits. Only `.env.example` is tracked, and it holds names.
- **Live, on `https://mishram.media`:** twelve routes `200`; nine correct canonicals and a nine-URL
  sitemap; Brand Shoots `noindex` and undiscoverable; SSL valid; `www` and `http` both `308` to the
  apex; seventeen images, no broken assets, one `h1`, no console errors.
- **Lead capture proven end to end on the final domain**, UTMs intact across two navigations, then
  the synthetic row deleted.
- **GA4 proven live** — real measurement id in the served HTML, consent honoured in both directions,
  one page view per navigation, real hits reaching Google.
- **Email DNS untouched.** No MX, SPF, DKIM, DMARC or verification record was read, changed or
  removed, and the nameservers stay at GoDaddy by design.

---

## 10af. FINAL POLISH PHASE 01 — BRAND IDENTITY, HERO, MEDIA ALLOCATION (Revision 28)

**Nothing was deployed.** The live site still serves Revision 27. This revision is local work behind
a review gate, and it opens a fourteen-phase final-polish programme whose own document is
**`docs/FINAL-POLISH-ROADMAP.md`** — the roadmap, the shortlist audit, the proof register and the
media allocation ledger all live there so that no future session re-researches them. This section
records the decisions; that file carries the tables.

### 1 — THREE FIRST-PARTY SOURCES, AND ONE OF THEM WAS NEW

| | Source | Result |
| --- | --- | --- |
| A | `F:\Drive data\WEBSITE SHORTLIST` | 15 files, every one audited |
| B | `WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf` | 9 pages, Canva-produced, read |
| C | `https://canva.link/2zuy2cde0ar0kfd` | **ACCESSIBLE** — read in full |

**B and C are the same document**, so there is no contradiction to reconcile. The PDF's text layer
uses subset-font encoding that does not decode to plain text; the Canva deck is the readable copy
and is where the register's quotations come from. Worth knowing before anyone tries the PDF again.

**Identity discipline held.** A filename is user-supplied identity metadata and nothing else was
used — **no face was matched, compared or recognised at any point.** §18 rule 7 is untouched.

### 2 — WHAT THE AUDIT FOUND THAT THE PLAN DID NOT EXPECT

**PURAV JHA HAS NO PHOTOGRAPH.** Four folders named `Purav` exist on the drive and **every one of
them contains only `.MOV` files** — no `.jpg`, `.jpeg`, `.png`, `.heic` or `.webp` under any `purav`
path anywhere. He therefore could not join the Hero, and **no frame was pulled from the video**: a
folder name does not establish which person in a frame is the named one, which is precisely the
mistake §10u cost a revision to learn. The handle `@puravjha9` is registered from the deck; the
photograph is an open request to the client.

**Nine of the ten creator photographs contain two or more people.** Only `Prashant Mishra.jpeg` is a
single figure. §10u's locked rule therefore governs all of them — **both figures stay in every
crop** — and the Hero crops were chosen by testing which aspect could hold two heads rather than by
assuming one could.

**Three files carry EXIF orientation 6** (`Lovekesh Kataria`, `Prashant Mishra`, `Shadab Hasan`).
They are stored `8064×6048` and are only upright after a rotate. **`sharp` does not auto-rotate
unless `.rotate()` is called**, so a naive pipeline silently ships a sideways person. Same class of
production gotcha as §10t's HEIC lesson, and now written down.

### 3 — BRAND SAFETY: THREE FLAGS, ALL RAISED BY EXISTING RULES

None of these is a new policy. All three are §9/§18 applied to new material, and all three are the
client's decision.

1. **`JJ Communication.jpeg` is shot inside an OPPO store** — OPPO branding, a handset poster and a
   celebrity poster in frame. §18 names OPPO explicitly among the three brands whose material stays
   unpublished. **Blocked by the existing rule.**
2. **The proposal names `@zingbus` as a brand partner** — the same zingbus §18 already holds back.
   **Hold.**
3. **`Shadab Hasan.jpeg` is not assumed to be `@shadabjakati1`.** The deck promotes Jakati, against
   whom §18 records an unresolved 2026 brand-safety finding; the shortlist file says **Hasan**.
   Different surname, **treated as two different people** until the client says otherwise —
   conflating them on a name fragment is the §10u error exactly. Neither is published.
   **The Jakati question is now more urgent, because the deck is in active outreach.**

### 4 — THE PROOF REGISTER, AND ITS ONE UNCOMFORTABLE FINDING

Sixteen claims registered (`FINAL-POLISH-ROADMAP.md`), **none published.** The positioning copy and
the collaboration-journey language are `READY`; the figures are not.

**Every numeric claim in the proposal is class A — text only.** Not one of *130 million+ views on a
single Reel*, *100+ brands*, *1,000+ creator videos* or *40M+ on a single branded video* is
accompanied by a screenshot in the deck, and no local asset corroborates any of them. §1's rule
against unverified metrics applies to a first-party proposal exactly as it applies to anything else.
**Phase 06 is blocked until dated captures exist.**

**And one claim cannot be published even in principle as it stands:** the network slide lists **six
handles against five follower figures**. The deck does not say which figure belongs to which
creator. Guessing would be the §10u failure again, so `P12` is **HOLD — unmappable**.

### 5 — `#4c3660`: SELECTIVE PLUM, DECLARED AND UNUSED

It is not an arbitrary swatch. The logo's own indigo, sampled from `blue logo mishram.png`, is
**`#5c37ff`**; `#4c3660` is that hue desaturated and darkened, which is why it can belong to the
brand at all.

**The decision was measured before it was judged:**

| Use | Contrast | |
| --- | --- | --- |
| Plum as text or line on the dark canvas | **1.89 : 1** | **fails** — needs 4.5 |
| Teal, for scale | 10.87 : 1 | the bar |
| Ivory on a plum **surface** | **9.14 : 1** | passes |

**So it is a surface colour and can never be an accent here.** Option A dies on arithmetic, not
taste. **Option C — a global plum canvas — was rendered and rejected on sight**: it flattens the
obsidian, muddies the teal, fights the photography and lands in generic-purple-SaaS. Option B
survives and **has nowhere legitimate to go this phase**, because every candidate surface is frozen
by scope and the Hero is locked.

So the token ships **declared and applied to nothing**: `--color-brand-plum` in `globals.css`, with
the measurements and the permitted future surfaces in the comment beside it. **The user's own
instruction — if it damages the design, do not force it — is why it is a token and not a repaint.**

### 6 — THE LOGO ANSWER WAS "CHANGE NOTHING", AND IT IS EVIDENCE-BASED

**The supplied logos and the site's existing wordmark are the same artwork.** `blue logo
mishram.png`, `grey logo mishram.png` and `public/brand/mishram-wordmark.png` are the identical
mark. The site renders it as a **CSS mask inheriting `currentColor`**, which is *better* than a
fixed-blue PNG — a blue file would break one of the two themes. Header, footer, dark and light marks
all stay.

`grey logo mishram.png` has **no unique role**. The blue file is reserved for decks, print and
third-party profiles where the site's theming does not apply; the circular lockup is reserved for
social avatars, where a circle crop is enforced anyway.

**Nothing was redesigned, redrawn or generated.**

### 7 — THE FAVICON WAS TESTED AND DELIBERATELY LEFT ALONE

The plan's hypothesis was to swap in the circular mark. **Rendered at real sizes it is a clear
regression**, so it was not done:

| | 16px | 32px |
| --- | --- | --- |
| Current `icon.png` — the `M` with the slash | **crisp, unmistakable** | crisp |
| Circular lockup | **illegible smudge in a white disc** | `MISHRAM` is mush |

The circle contains the **whole wordmark**, so it cannot survive a browser tab. The existing favicon
is already the strongest compact first-party symbol — the `M` glyph from the same mark. `icon.png`,
`apple-icon.png` and `favicon.ico` are unchanged. **§10y fixed the default-Next-triangle favicon and
got it right the first time.**

### 8 — THE HERO: COMPOSITION LOCKED, MEDIA MOVED

Five surfaces, the same five aspects, the same `onMobile` pattern, the same `layout.ts` geometry.

| Slot | Aspect | Was | Now | Caption |
| --- | --- | --- | --- | --- |
| 1 | 9:16 | Zoya Jaan | Zoya Jaan | Creator Network |
| 2 | 9:16 | Mukul Sharma | **Ali Fazal** | **Worked With** |
| 3 | 9:16 | Nikita Kumawat | Nikita Kumawat | Creator Network |
| 4 | 4:5 | Vishnu Priya | **Akash Sagar** | **Current Management** |
| 5 | 1:1 | Lovekesh Kataria | Lovekesh Kataria | Creator Network |

Three existing creators stay, so the Hero keeps its breadth instead of becoming a wall of one kind
of photograph. **Captions are relationships, never metrics** — `Worked With` for Ali (never
*managed*, §18), `Current Management` for Akash, and no follower count anywhere.

**THE ALLOCATION DECISION IS THE PART WORTH KEEPING.** Three Akash frames arrived. The Hero got
`Akash sagar.jpeg` — the cleanest *portrait*. `Akash sagar 1st.jpeg`, the fuller *relational* frame,
is **held back for Phase 03 / Current Management**, because that section has to argue the working
relationship and the Hero only has to look like proof. **The best relationship photograph does not
go in the Hero.** The third frame is out on quality — 1.1MP, with third-party signage in shot.

**One structural detail that will trip up the next person.** `Scene.tsx` filters surfaces by
`Boolean(layouts[s.id])`, so a surface with no `layout.ts` entry is silently dropped — the new
creators loaded no texture at all until the slot keys were renamed. Slots `mukul` → `ali` and
`vishnu` → `akash`: **ten lines, every one a key name, every numeric value byte-identical.**
`config/creators.ts` keeps its own `mukul` / `vishnu` roster ids — a different namespace, used by six
downstream sections this phase does not touch.

### 9 — PERFORMANCE

| | Before | After |
| --- | --- | --- |
| Hero textures | 5 | 5 |
| Total texture weight | 190KB | **211KB** (+21KB) |
| Eager images | 0 | 0 |
| `<link rel=preload as=image>` | 0 | 0 |

The Hero's photography is **WebGL texture loading, not DOM images** — lazy, DPR-capped and behind
the scene's own load gate, exactly as §16 requires. No preload was added for any new creator.

### 10 — WHAT WAS NOT TOUCHED

Brands rail, Current Management, What We Do, all five service pages, Creators, Work Process,
Selected Work, Recognition, About, Project Inquiry, Supabase, GA4, the legal documents and the
Footer are **all unchanged**. The only shared asset touched is the Hero's own media directory.
No dependency was added.

### Verified

- **Types, lint and the production build are clean.** Twenty routes, all still static.
- **All five Hero textures load**, the two new ones at the sizes produced —
  `ali-fazal.webp` 98KB, `akash-sagar.webp` 38KB — with no horizontal overflow at 1440×900.
- **Both production crops inspected standalone**: both figures fully in frame, heads intact, no bad
  cuts. §10u's two-figure rule is satisfied by measurement rather than assertion.
- **The plum rejection is screenshot-backed**, not asserted.
- **The favicon decision is render-backed at 16 and 32px**, not assumed.
- **NOT VERIFIED, AND SAID PLAINLY: the two new cards were never seen composed inside the running
  Hero.** The preview pane failed to composite the WebGL canvas throughout this session — the
  typography, rails and CTAs screenshot correctly while the media plane comes back empty, including
  on the previously-good production route. The network layer proves all five textures are requested
  and delivered, and the crops are proven standalone, but **the in-situ visual check and the
  six-viewport responsive sweep are outstanding and are the first thing Phase 02 should do**, via
  §10q's headless-Chrome-over-CDP method rather than the pane.
- **Nothing was deployed.** No `vercel deploy`, no push.

---

## 10ag. FINAL POLISH PHASE 02 — HERO SIGN-OFF + THE COLOUR RAIL (Revision 29)

**Nothing was deployed.** Production still serves Revision 27. This revision closes the one item
Revision 28 left genuinely open, and redesigns the collaborations rail. Details and registers live
in `docs/FINAL-POLISH-ROADMAP.md`.

### 1 — THE SCREENSHOT METHOD IS NOW A SCRIPT, NOT A MEMORY

`scripts/shoot.mjs` — headless Chrome over CDP through Node's global `WebSocket`. **No dependency
added** (§15). §10q described this method in prose and it has been rebuilt from that prose twice;
it is now code, with both of its failure modes baked in:

1. **The scroll sweep**, or `IntersectionObserver` never fires and every `whileInView` element
   captures at `opacity: 0` — a page that looks broken and is not (§10q).
2. **`--use-angle=swiftshader`**, or headless Chrome renders no WebGL at all. **This is precisely
   the false negative the preview pane produced in Revision 28**, and it is worth naming: the pane
   was not lying about a broken hero, it was failing to composite one that worked.

### 2 — PHASE 01 HERO QA: **PASS**, WITH NO FIX REQUIRED

Nine captures — 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and
dark, and 1440×900 under `prefers-reduced-motion` — every one with a live GL canvas.

**Ali Fazal and Akash Sagar both render correctly at every viewport**, both figures in frame in both
photographs, no head cut at any size including 390. Headline, CTAs, orbital composition, caption
rail and media overlap are correct in both themes. Five textures on desktop, three on the reduced
mobile set, which is the `onMobile` design working.

**The media replacement introduced no defect**, so the smallest-correction rule never fired and the
Hero was not touched again.

**One pre-existing defect was found and deliberately left.** `scrollWidth` exceeds the viewport at
**1024×768 and 768×1024**. It is **not from Phase 01** — the same probe against the live production
site, which still runs the *old* Hero, reproduces it at exactly those two viewports and nowhere
else. Registered for Phase 12. Fixing it here would have meant editing a section this phase was told
not to touch, on a defect this phase did not cause.

### 3 — THE RAIL: COLOUR AT REST

The rail sat monochrome and revealed colour on hover. **It now sits in real brand colour**, and
hover supplies only the last of the clarity plus a 3px lift and `scale(1.03)`.

The argument for the inversion is one sentence: **a visitor who never hovers is the one this section
has to convince.** Hover-to-reveal is a reward for people already exploring; the rail's job is to be
read in two seconds by someone who has just finished the hero.

**A separate token, and the reason is the interesting part.** The rest opacity is
`--collab-color-rest` (0.88 dark / 0.9 light), **not** the existing `--collab-logo-rest`. That token
is shared with `/about`'s `.abt-brand-mark`, which is still a monochrome mask and is out of scope —
raising the shared value would have silently restyled another page. Caught before it shipped.

### 4 — SEVEN PLATES, AND THE LIST WAS MEASURED

Seven marks are drawn in black for light stationery and disappear on obsidian. They get a soft
parchment ground — `rgba(243,239,231,0.84)`, `inset -10px -16px`, 6px radius. **The other eleven get
no chrome whatsoever**, which is the whole difference between an editorial ribbon and a sponsor
wall. A first pass at full ivory produced exactly the white-slab wall the plan warned about and was
softened after looking at it.

The list came from measuring **the share of each mark's opaque ink whose contrast against `#0a0a0a`
falls below 2:1**: 100% for AVVATAR, DermaTouch, Kapiva, Pilgrim and Wondershare; 99% Muuchstac;
61% Navi. Excel Entertainment at 26.7% reads fine and was **left unplated** — an eighth box costs
more than it buys. Everything else measured 0%.

**That confirmed the seven `darkKeepsMono` flags already in the config exactly, so no flag changed.**

**And the first metric was wrong, which is worth recording.** *Mean* luminance cleared Navi at
4.15:1 and I nearly un-flagged it — but Navi is a two-part lockup, a bright green glyph beside a
near-black wordmark, and a mean averages the invisible half away. **Mean luminance is the wrong
measure for a lockup.** Share-of-invisible-ink is the right one, and it agreed with the human
judgement that was already in the file.

### 5 — ONE LAYER INSTEAD OF TWO

With colour at rest, the mask layer is never painted in the rail — so it is no longer rendered, and
no longer downloaded.

| | Before | After |
| --- | --- | --- |
| Brand files the homepage requests | **36** | **18** |
| Weight | **456KB** | **298KB** |

**−18 requests, −158KB, and recognisability went up.** The 18 mask files stay on disk: `/about`
renders the same roster as monochrome marks and still reads them.

### 6 — ROSTER: EIGHTEEN PUBLIC, FOUR HELD

Eighteen brands render, unchanged in membership. Four are recorded and not rendered:

- **Duolingo — new in this revision.** The current first-party deck presents a Duolingo brand tile,
  which satisfies the relationship test. It fails the *asset* test: the only file is a 480×360
  raster with the wordmark locked onto Duolingo's green, and lifting a mark off its ground is
  altering artwork, which the logo policy forbids. `visible: false`, same treatment as VYRL —
  **supply an official transparent asset and flip one boolean.** A third provenance class, `DECK`,
  was added to the config for it.
- **Zingbus** appears in the deck and stays **blocked** by the standing §18 decision. The deck being
  first-party does not reopen a brand-safety call.
- **VYRL** unchanged — relationship confirmed, no official asset exists.
- **Fun N Earn** unchanged — withheld under the permanent real-money-gaming rule.

**YesMadam and Bajaj Finserv were looked for and are not in the deck** — not in its text, not in any
of its 35 extracted images. They were not added.

**DermaTouch: the supplied file lost the comparison.** `WEBSITE SHORTLIST/images.png` is 447×447 and
**opaque**; the production asset is 337×128 **with alpha**, already tightly cropped. Using the
supplied one would have meant cutting the mark off a white ground. **The existing asset is better
and was kept** — the instruction was to use it *if cleaner*, and it is not.

### 7 — MOTION AND THE OTHER SURFACES

The derived-duration rule stands untouched: speed comes from actual track width, so adding a brand
can never silently accelerate the marquee. Desktop is a continuous rail that pauses on hover or
focus. **Reduced motion renders a static two-row grid of the twelve featured marks in full colour**
— the compact multi-row treatment, not a hidden roster. Mobile holds a 22px logo height, legible at
390 rather than eighteen specks.

**The seam was captured deliberately**, hero foot and rail head in one frame: the hero's own
capability rail hands into the section across a hairline with generous space, and the colour lands
as the first proof after the fold. The transition reads as intentional.

### 8 — PLUM

**Not used.** No surface in this section earned it, and plum text on obsidian still fails contrast at
1.89:1 (§10af). The token stays declared and unapplied.

### 9 — WHAT WAS NOT TOUCHED

Current Management, What We Do, all five service pages, Creators, Work Process, Selected Work,
Recognition, About, Project Inquiry, Supabase, GA4, the legal documents and the Footer are
unchanged. `/about`'s brand marks were specifically protected by the token split in §3.

### Verified

- **Types, lint and the production build clean.** Twenty routes, all static.
- **Hero: nine real composited captures, PASS**, both new creators correct at every viewport and in
  both themes, reduced motion included.
- **Rail: captured at 1440 light and dark, 1280, 1024, 768, 430, 390 dark and light, under reduced
  motion, and as a hero-to-rail seam.** No clipping, no distorted aspect, no white-box wall, no
  horizontal document overflow in the section.
- **The plate list is measured**, and the measurement agreed with the config that already existed.
- **−18 network requests and −158KB** on the homepage, verified from the rendered HTML.
- **Nothing pushed, nothing deployed.** One local commit.

---

## 10ah. FINAL POLISH PHASE 03 — CURRENT MANAGEMENT (Revision 30)

**Nothing was deployed.** Production still serves Revision 27. Full working detail is in
`docs/FINAL-POLISH-ROADMAP.md`; this records the decisions.

### 1 — §10u's PROMISE CAME DUE

`config/management.ts` has said since Revision 17B: *"The unblock is one file. Supply a
Mishram-owned photograph of Akash with explicit identity and this goes back to a full portrait
composition — the `.mgt-plate` treatment is one block in `CurrentManagement.tsx`, not a redesign of
the chapter."*

**That file arrived, and the estimate was exact**: one config export and one component function.
The chapter was typographic because the evidence was a 150px avatar, never because type was
preferred — and it is worth noting that the note written under the worst-case constraint is what
made this phase cheap.

### 2 — THE MEDIA, AND THE LEDGER HELD

`Akash sagar 1st.jpeg`, client-labelled, **reserved for this chapter by the Revision 28 ledger and
not spent on the Hero**. The Hero keeps `Akash sagar.jpeg`. Two source files, two sections, no
repetition — which is the entire reason the ledger exists.

The reservation was the right call for a reason worth restating: **the Hero has to look like proof;
this chapter has to be it.** The relational frame — two figures, arm across the shoulder — is the
one that argues a working relationship, and it would have been wasted as hero decoration.

**Crop chosen by testing.** 5:4 and 16:10 decapitated; 1:1 held the pair; **3:4 held them largest
with headroom**, which is what a dominant column wants. Extracted from
`{ 624, 666, 1934×2579 }` of the rotated original, which is never modified. **Both figures stay** —
§10u, and because the gesture *is* the evidence.

### 3 — THE COMPOSITION INVERTED

Photograph left (`col-span-5`), claim right (`col-span-6 / col-start-7`). The identity plate is
gone and its teal corner marker moved onto the image, so the mark travelled with the composition
rather than being discarded.

**The handle came down from display scale to a byline beside the 44px official avatar**, and that
pairing is the point: **two provenances on one line.** The photograph is identified by the client's
filename; the avatar by the account itself. Revision 17B set the handle huge because it was the only
graphic available — it no longer is, so the handle went back to being a destination.

The label gained a small teal dot beside its rule — the header's own point, and the whole of the
status signal. **No "LIVE", no "SIGNED", no "EXCLUSIVE".**

### 4 — SCOPE, AND FOUR THINGS DELIBERATELY LEFT OUT

Three rows: **Creator strategy · Brand opportunities · Short-form growth** — each lifted straight
out of the client-confirmed sentence rather than added to it.

**Campaign coordination, content direction, payment handling and legal representation were all
considered and rejected.** The deck describes the first two as things Mishram does on *campaigns*,
which is a different claim from what it does for *this creator*; the last two were never confirmed
at all. A fourth row would have balanced the column nicely and that is not a reason.

### 5 — PLUM: TESTED ON THE BEST CANDIDATE SURFACE, AND REJECTED

This was the first section with a legitimate claim to it. Option B made the whole chapter a plum
field with ivory content — the only usable form, since ivory on plum is 9.14:1 while plum as text on
obsidian is 1.89:1.

**Rendered and rejected.** Directly beneath the full-colour brands rail the plum band reads as a
hard flat slab with no transition, and gradients are explicitly off the table so there is nothing to
soften it with. It also fights the photograph, whose corridor light is warm cream. **The chapter
already earns its rhythm through composition** — a dominant photograph after a logo ribbon is a
clear change of gear without changing the canvas.

**Two phases have now tested plum on real surfaces and neither found one.** That is a finding.
The token stays declared and unused.

### 6 — HEIGHT, AND THE CORRECTION

First build measured **1108px / 1.23 viewports** — over the 0.85–1.1 target, with dead space under
the text. Narrowing the image from `col-span-6` to `col-span-5` gave **958px / 1.06 viewports**,
inside target and better balanced. Before this phase: ~834px / 0.93. **The chapter gained a
photograph for 124px.**

### 7 — A REAL MOBILE DEFECT, CAUGHT IN CAPTURE

The first attempt used `order-2` / `order-1` to drop the photograph below the claim on a phone.
**Below `lg` the parent is a plain block, so `order` does nothing** — the figure's caption landed a
few pixels above the chapter label and read as a collision. Fixed by removing the ineffective
`order-*` and using `mb-14 lg:mb-0`: **one reading order at every size**, with real space between
image and words. At 390 the section is 1120px, both figures visible, no head cut, no overflow.

### 8 — METRICS: STILL NONE

No follower count, no view figure, nothing from the deck. `MANAGEMENT.metrics` remains an empty
array rendering nothing. The `@xbhandesiri_` screenshot showing 135M/111M/70.9M stays in the proof
register — **Phase 06 owns numeric proof**, and this section was built to work without any.

### Verified

- **Types, lint and the production build clean.** Twenty routes, all static.
- **Ten real composited captures** — 1440 light and dark, 1280, 1024, 768, 430, 390 light and dark,
  reduced motion, and both seams — via `scripts/shoot.mjs`.
- **Brands → Current Management seam** reads as intentional: hairline, generous space, then a
  photograph after a logo ribbon.
- **No image repeated.** Hero and this chapter use different source files and different outputs.
- **63KB, lazy, no preload**, two image nodes in the section.
- **The plum A/B was rendered before the decision**, and the test CSS was removed — the diff carries
  no `!important` and no test rule.
- **Nothing pushed, nothing deployed.**

---

## 10ai. FINAL POLISH PHASE 04 — SOCIAL & PERSONAL BRAND GROWTH (Revision 31)

**Nothing was deployed.** Production still serves Revision 27. Working detail is in
`docs/FINAL-POLISH-ROADMAP.md`.

### 1 — THE LIBRARY IS EXHAUSTED, AND THAT IS THE PHASE'S MAIN FINDING

The phase was scoped to replace weaker imagery with better first-party creator proof. **A complete
scan of `F:\Drive data` found 58 stills, and none of them is available to this service.**

Everything usable is already allocated (Hero, Current Management), reserved (Lovekesh → Phase 05,
Prashant → Phase 10, Immortal Kaka Ji → Phase 07), held (Shadab Hasan, Akash 2nd) or blocked
(JJ Communication, OPPO in frame). The rest is: three permanently revoked `AKASH COVER PHOTO`
files, roughly thirty **UUID- and `IMG_`-named files with no identity metadata whatsoever**, two
Swiggy campaign frames that belong to Phase 05, and logos.

The three named creator folders that looked most promising — `Purav`, `Dr 69 - sagar bhai shoot
+bts`, `RAMAH` — **contain only `.MOV` files.**

**So no photograph was added, and none was invented.** Publishing a UUID-named file as a named
creator is the precise mistake §10u cost a revision to learn, and the temptation was real: thirty
unused images sitting in the library with nothing to say about who is in them.

### 2 — THE ONE REAL IMPROVEMENT, AND IT IS A LEDGER FIX

**Brand Signal's anchor moved from Zoya Jaan to Vishnu Priya.**

Revision 28 kept Zoya, Nikita and Lovekesh in the Hero, which left `zoya-jaan.webp` rendering in
**both the Hero and this route's opening composition** — the same file, one screen apart, and the
only same-file repeat of its kind on the site.

Exactly two published creators came *off* the Hero in that revision: Mukul Sharma and Vishnu Priya.
Mukul already carries the Content System Board further down this page, so the hero takes Vishnu
Priya, and **the route now opens and argues on two creators the homepage's first screen never
shows.** She also arrived with all three crops (`portrait`, `reel`, `content`) already tuned, so the
swap changed no art direction and no layout.

### 3 — AND THE SWAP EXPOSED A REAL DEFECT

The hero's attribution was a hardcoded string, `"Pictured — Zoya Jaan, Mishram creator network"`.
Changing the anchor left **the wrong creator's name printed under a photograph** — the §10u class of
error exactly — and it survived types, lint and a clean build, because nothing in the codebase
connected a caption to an image.

**Fixed at the root.** `SOCIAL_ANCHOR` is now one export in `config/service-social.ts`;
`BrandSignal` reads it and the caption derives from `SOCIAL_ANCHOR.name`. **A name and the
photograph beside it can no longer disagree**, and swapping the anchor is one id.

Worth recording as a general lesson: **a hardcoded caption next to a configurable image is an
identity bug waiting for its trigger.** This one waited three revisions.

### 4 — COPY AUDIT: PASSED, NOTHING CHANGED

All eight capabilities the phase listed are present and supported. A scan for the banned register —
*viral, 10x, guarantee, unlock, next level, one-stop, icon* — and for any figure or `NNM+` pattern
returned **zero hits**. The headline **"Build a brand people remember."** was reviewed and kept.

The creator proof already carries the only defensible framing — *"Selected creators from our
network"*, with a config note stating outright that no follower figure, growth claim, management
relationship or campaign attribution attaches to those portraits. **Nothing needed rewording, and
nothing was reworded to look busy.**

### 5 — HOMEPAGE SERVICE 01: INSPECTED, DELIBERATELY UNCHANGED

`SocialGrowthScene` uses Nikita, Mukul and Vishnu Priya. Nikita is also in the Hero, and **that
overlap cannot be removed**: only two published creators are absent from the Hero, the scene needs
three, and §18 locks the What We Do system. Shuffling would relocate the repeat, not fix it.
Recorded so the next phase does not re-derive it.

### 6 — MEASURED

| | |
| --- | --- |
| Page height, 1440×900 | **10,445px — and identical with either anchor.** Verified by swapping back, re-capturing, and swapping forward again |
| Other viewports | 1280 · 10,189 / 1024 · 9,805 / 768 · 13,061 / 430 · 13,124 / 390 · 13,222 |
| Images | 10 — **9 lazy, 1 eager, 1 preload**, the eager one being the single above-fold hero portrait |
| New media weight | **0KB**, homepage and service page alike |
| Horizontal overflow | **none at any of the eight viewports**, both themes, reduced motion included |

Notably this route is clean at 1024 and 768, where the **homepage** carries the pre-existing overflow
registered for Phase 12 — so that defect is homepage-specific.

### 7 — RESERVED FOR PHASE 05

`Lovekesh Kataria.jpeg`, and the two `PRASHANT VIDEO/Swiggy/` campaign frames. **Phase 04 argued
identity, personality and content language; Phase 05 gets network, campaign and coordination.** That
split is why nothing was spent here.

### Verified

- **Types, lint and the production build clean.** Twenty routes, all static.
- **Nine real composited captures** of the service route — 1440 light and dark, 1280, 1024, 768,
  430, 390 light and dark, reduced motion.
- **The caption defect was caught in capture, not in review**, and the served HTML now reads
  *"Pictured — Vishnu Priya, Mishram creator network"*.
- **No Hero or Current Management source file is reused on this route.** The Hero's files live in
  `/media/hero/creators/`, Current Management's in `/media/management/`; this page reads only
  `/media/creators/`.
- **No metric added.**
- **Nothing pushed, nothing deployed.**
