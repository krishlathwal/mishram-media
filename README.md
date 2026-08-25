# Mishram Media

Creative growth & digital studio site. Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · React Three Fiber.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

> Continuing this project in a fresh session? Read
> [docs/PROJECT-BRIEF.md](docs/PROJECT-BRIEF.md) first — it is the source of truth for what is
> built, what is locked, and what comes next.

## Scope

Homepage is Header → Hero → Selected Collaborations. Everything after that is a development-only spacer in
[page.tsx](src/app/page.tsx), clearly marked — delete it when the next section ships.

## Where to change things

| What | Where |
| --- | --- |
| Brand, nav items, phone / email / WhatsApp / Instagram | [src/config/site.ts](src/config/site.ts) |
| Hero copy, media surfaces, editorial annotations | [src/config/hero.ts](src/config/hero.ts) |
| 3D composition — positions, depth, exposure, drift | [src/components/hero/layout.ts](src/components/hero/layout.ts) |
| Public collaboration rail (see brand-safety note in the file) | [src/config/collaborations.ts](src/config/collaborations.ts) |
| Colour, type, spacing tokens; both themes | [src/app/globals.css](src/app/globals.css) |

## Theming

Components only ever use semantic tokens (`canvas`, `ink`, `ink-soft`, `ink-muted`, `line`, `grid`,
`accent`, `surface`, `image-line`, `overlay`). Those map to `--t-*` variables that swap on
`<html data-theme>`, so both themes come from one set of classes.

A blocking script in the document head applies the stored choice — or `prefers-color-scheme` on a first
visit — before the first paint, so there is no flash. The toggle lives in the header and persists to
`localStorage` under `mishram-theme`.

The WebGL scene reads `SCENE_THEME` in [layout.ts](src/components/hero/layout.ts): in the light theme
surfaces recede into the paper instead of into the dark, and each one draws a soft contact shadow. The two
procedural surfaces are redrawn per theme in [textures.ts](src/components/hero/textures.ts).

## Brand safety

Betting, gambling, casino and real-money gaming brands are never rendered on this site. They are absent
from [collaborations.ts](src/config/collaborations.ts) rather than filtered at render time, so they cannot
reach the DOM through marquee duplication, reduced-motion markup or a future section.

## Booking link

`Book a 15-Min Call` reads `NEXT_PUBLIC_BOOKING_URL` (see [.env.example](.env.example)). While it is unset,
every booking CTA falls back to a WhatsApp conversation requesting the free 15-minute consultation. No
placeholder scheduling URL is committed.

## Hero notes

- The media system is a WebGL scene lazy-loaded client-side; three.js never reaches the server bundle.
- Without WebGL — or if the canvas throws — [HeroStatic](src/components/hero/HeroStatic.tsx) renders the same
  composition as layered images.
- `prefers-reduced-motion` switches the scene to `frameloop="demand"`: the composition settles into its resting
  arrangement and stops. `MotionConfig reducedMotion="user"` strips transform animation from the DOM layer.
- The render loop pauses when the hero leaves the viewport or the tab is hidden.
- Hero layout switches on frame *shape*, not width alone, so portrait tablets get the stacked composition.
  The query lives in [useMediaQuery.ts](src/hooks/useMediaQuery.ts) and is mirrored by `.hero-media` /
  `.hero-scrim` in `globals.css` — change both together.

## Assets

Creator photography and the wordmark come from the previous Mishram Media site, downloaded and re-encoded
locally (`public/media/creators`, `public/brand`). Nothing is hotlinked.

## Design & conversion rules for future sections

Permanent constraints for everything built after Selected Collaborations.

**The journey.** Sections should advance the visitor: attention → credibility → capabilities → proof →
process → results → conversion. The Hero owns attention; Selected Collaborations owns credibility.

**Portfolio first.** Show the work rather than claiming it. "Creator Growth" means showing creators;
"Web Development" means showing web experiences — this site is itself the evidence for that one.

**Conversion.** `Book a 15-Min Call` stays the primary action, with `15 MIN · NO OBLIGATION` alongside it;
`Contact Us` stays secondary and opens the WhatsApp / Call / Email / Book panel. Place CTAs strategically —
Hero, Services, a major proof section, and the closing section — never after every block. Premium first,
conversion second; both have to work.

**Copy.** Short, confident, specific, restrained. No "next level", "one-stop solution", "unlock your
potential", "10X". Claims must be supported.

**Interaction.** Motion should communicate the work: responsive service typography, project previews,
cursor-responsive imagery, scroll-linked storytelling. Not blobs, particles, scroll-jacking or decoration
for its own sake. The Hero stays the one heavy 3D moment; later sections get progressively lighter — no
second WebGL canvas, no second animation engine, no additional cursor system.

**Visual continuity.** Every section inherits the Hero's language: editorial grid, Archivo with the
Instrument Serif accent, both themes, Mishram teal, hairline borders, deliberate asymmetry, controlled
whitespace, editorial photography, measured motion. The homepage is one art-directed system, never a
card-grid landing page.

**Brand safety.** See the note above and in `collaborations.ts`. The exclusion covers every future public
surface: portfolio, case studies, testimonials, work pages, creator work and awards references.
