# Mishram Media — Final Polish Programme

> **Companion to `PROJECT-BRIEF.md`, not a replacement for it.** The brief is the source of truth
> for what the site *is*. This document is the source of truth for what the final-polish programme
> is *doing next*, and it exists so no future session has to re-open the proposal, re-inventory the
> shortlist folder or re-decide an allocation that has already been decided.
>
> Started at **Revision 28 (Phase 01)**. The site is live at `https://mishram.media` throughout.
> **Every phase ships behind a review; nothing here deploys itself.**

---

## The phases

| # | Phase | State |
| --- | --- | --- |
| **01** | **Brand identity + Hero + media allocation** | **Done — Revision 28. Visual QA closed in Revision 29** |
| **02** | **Full-colour brands rail** | **Done — Revision 29** |
| **03** | **Current Management / Akash Sagar** | **Done — Revision 30** |
| **04** | **Social & Personal Brand Growth media** | **Done — Revision 31** |
| 05 | Influencer Marketing media + campaign proof | Not started — **assets reserved: Lovekesh + Swiggy campaign material** |
| 06 | Quick-scan proof layer | Not started — **blocked on the proof register below** |
| 07 | Creator / viral network refinement | Not started |
| 08 | Selected Work / real campaign proof | Not started |
| 09 | Recognition / NUFEW award upgrade | Not started — **asset reserved** |
| 10 | About / Prashant Mishra / agency credibility | Not started — **asset reserved** |
| 11 | Homepage length + information hierarchy | Not started |
| 12 | Global responsive / performance / accessibility polish | Not started |
| 13 | Operational hardening | Not started |
| 14 | Web & Digital Experiences final deep polish | Not started |

**Phase 13 — operational hardening — is the one with a live consequence and is worth naming
explicitly**, because it is currently the site's only real gap:

1. **Resend notifications.** `RESEND_API_KEY` / `INQUIRY_FROM_EMAIL` are unset, so every lead is
   captured correctly and **silently**. Someone has to watch the Supabase Table Editor until this
   is done. Highest operational priority in the whole programme.
2. `/api/inquiry` rate limiting — provider-level or edge, never a per-process counter (§10h).
3. Disconnect the old Netlify site — safe now that Vercel serves the domain (§10ae).
4. Run Google's **Test installation** against the live domain (§10ad).
5. Google Ads conversion — **only** when a real `AW-` id and label exist. Never invented.

---

## Source inventory — the three first-party sources

| | Source | State |
| --- | --- | --- |
| **A** | `F:\Drive data\WEBSITE SHORTLIST` | **Primary production media.** 15 files, audited below |
| **B** | `WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf` | 9 pages, Canva-produced, 21MB. Read |
| **C** | `https://canva.link/2zuy2cde0ar0kfd` | **ACCESSIBLE.** Read in full |

**B and C are the same document.** The PDF is an export of the Canva deck; no contradictory figure
was found between them, so there is nothing to reconcile. The Canva version was the readable one —
the PDF's text layer uses subset-font encoding that does not decode to plain text, which is why the
figures below are quoted from Canva rather than from the export.

**Identity rule for Source A, and it is the one that matters:** a filename is user-supplied identity
metadata. `ali fazal.jpeg` means the client says Ali Fazal is in that frame. **No face was matched,
compared or recognised at any point** — §18 rule 7 stands untouched.

---

## Shortlist audit — every file

| File | Dimensions | Fmt | Size | Identity (user-labelled) | Figures | Quality | Crop flexibility | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ali fazal.jpeg` | 3120×4160 | JPEG | 1.95MB | Ali Fazal | **2** | Good, outdoor daylight | Holds both figures to 9:16 | **HERO — used** |
| `Akash sagar.jpeg` | 3024×4032 | JPEG | 0.95MB | Akash Sagar | **2** | Very good, bright corridor | Holds both to 4:5 | **HERO — used** |
| `Akash sagar 1st.jpeg` | 3120×4160 | JPEG | 1.00MB | Akash Sagar | **2** | Good, fuller/relational | Wide, needs 4:5+ | **RESERVED — Phase 03** |
| `Akash sagar 2nd.jpeg` | 1280×853 | JPEG | 0.10MB | Akash Sagar | 2 | **Weak — 1.1MP**, third-party signage in shot | Poor | **HOLD — do not publish** |
| `Lovekesh Kataria.jpeg` | 6048×8064¹ | JPEG | 10.1MB | Lovekesh Kataria | **2** | Excellent, clean interior | Very flexible | **RESERVED — Phase 05** |
| `Prashant Mishra.jpeg` | 6048×8064¹ | JPEG | 9.2MB | Prashant Mishra | **1** | Excellent, informal (sunglasses) | Very flexible | **RESERVED — Phase 10** |
| `Shadab Hasan.jpeg` | 6048×8064¹ | JPEG | 10.1MB | Shadab Hasan | **3** | Good, busy street | Moderate | **HOLD — see brand safety** |
| `JJ Communication.jpeg` | 2160×3840 | JPEG | 1.38MB | JJ Communication | 2 | Good | Flexible | **BLOCKED — OPPO in frame** |
| `Immortal Kaka Ji.jpeg` | 2160×3840 | JPEG | 1.92MB | Immortal Kaka Ji | 2 | Good, café interior | Flexible | **RESERVED — Phase 07** |
| `award.jpg.jpeg` | 3920×2160 | JPEG | 2.41MB | — (award) | 2 | **Composite marketing graphic, not a photo** | Poor — baked-in type | **RESERVED — Phase 09, with caveat** |
| `blue logo mishram.png` | 15625×15625 | PNG α | 1.48MB | Mishram mark, indigo | — | Vector-grade, 69.6% empty padding | Trim to 12499×5946 | **Logo — light surfaces** |
| `grey logo mishram.png` | 15625×15625 | PNG α | 1.46MB | Mishram mark, grey | — | Same mark, desaturated | Same | **No unique role** |
| `circle logo mishram.jpg.jpeg` | 10000×10000 | JPEG | 4.97MB | Mishram circular lockup | — | Good, black canvas baked in | Trim to 9020×9020 | **Social/profile only — not favicon** |
| `images.png` | 447×447 | PNG | 5KB | **DERMATOUCH®** — third party | — | Small but clean | — | **Phase 02, brands rail** |
| `PROPOSAL - PDF (1).pdf` | 9pp | PDF | 21MB | — | — | — | — | Source B |

¹ **EXIF ORIENTATION 6 — AND THIS WILL BITE ANYONE WHO SKIPS IT.** These three are stored
`8064×6048` and are only correct after a rotate; `sharp` does **not** auto-rotate unless `.rotate()`
is called, so a naive pipeline silently produces a sideways person. Same class of finding as §10t's
HEIC lesson. **Always `.rotate()` first.**

### What the audit found that the plan did not anticipate

- **There is no Purav Jha still photograph anywhere on the drive.** Four folders named `Purav`
  (`F:\Drive data\Purav` and three siblings) contain **only `.MOV` files**. No `.jpg`, `.jpeg`,
  `.png`, `.heic` or `.webp` exists under any `purav` path. He therefore **cannot** join the Hero
  this phase — §18's "a missing thing is absent, never faked" — and no frame was pulled from video,
  because a folder name does not establish which person in a frame is the named one (§10u rule 7).
  **Action: ask the client for one still, or for permission to grab a frame and confirm the subject.**
- **Nine of the ten creator photographs contain two or more people.** Only `Prashant Mishra.jpeg` is
  a single figure. §10u's locked rule applies to all of them: **both figures stay in every crop**,
  because the client's label says who is *in* the frame, not which figure they are.
- **The supplied logos are the same artwork the site already uses.** See the logo section.

---

## Brand safety — three flags raised by this phase

**These are findings, not decisions. All three are the client's call (§9, §18).**

1. **`JJ Communication.jpeg` is shot inside an OPPO store**, with OPPO branding, a handset poster
   and a celebrity poster clearly in frame. §18 is explicit: *"A third-party brand in frame is a
   brand claim. zingbus, OPPO and Cream Bell all appear in otherwise usable material and all three
   keep it unpublished."* **This file is blocked under the existing rule**, not a new one.
2. **The proposal names `@zingbus` as a brand partner** — the same zingbus §18 already holds back.
   Publishing it from the deck would contradict a locked decision. **Hold.**
3. **`Shadab Hasan.jpeg` vs. `@shadabjakati1`.** The proposal promotes `@shadabjakati1`, and §18
   records an **unresolved brand-safety finding** against Shadab Jakati (a 2026 arrest reported by
   national outlets over a reel involving a minor). The shortlist file is labelled **Hasan**, a
   different surname. **These are treated as two different people until the client says otherwise** —
   conflating them on a name fragment is exactly the §10u error. Neither is published this phase.
   **The Jakati question should be put to the client before the deck is used for outreach**, which
   §18 already said and which is now more urgent because the deck is in active circulation.

Separately, and much smaller: the Ali Fazal frame has a cinema marquee in the background. That reads
as ambient street context rather than a brand placement, so it is **noted, not blocked** — but it is
the client's to overrule.

---

## Proof register — the proposal's claims, none of them published yet

Source C (Canva) unless noted. **Nothing in this table is on the website**, and nothing goes on it
without passing the phase that owns it.

| # | Claim | Source | Where | Visual evidence? | Recommended location | Status |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | "An award-winning creative influencer & digital marketing agency" | B+C | Cover | Award graphic exists | About / Recognition | **READY** — §06 already carries the NUFEW award |
| P2 | "Scaling influencers · Creating content · Building iconic digital careers" | B+C | Cover | — | About positioning | **READY** — editorial copy, no metric |
| P3 | About paragraph — "creator focused talent and marketing agency… India's most influential, viral, and emerging creators" | C | About Us | — | About / Influencer Marketing | **READY** — rewrite in site voice, do not paste |
| P4 | "premium influencers and trending creators" — two-tier network | C | About Us | — | Creator network (§07) | **READY** — matches the existing two-layer model (§10u §6) |
| P5 | Full collaboration journey: strategy → selection → execution → tracking | C | About Us | — | Influencer Marketing (§05) | **READY** |
| P6 | **130 million+ views on a single Reel** | C | Slide 3 | **No screenshot in deck** | Quick-scan proof (§06) | **NEEDS VERIFY** — headline figure, needs a dated capture |
| P7 | **100+ brands** | C | About Us | No | Quick-scan proof (§06) | **NEEDS VERIFY** — the rail publishes 18; 100+ needs a list |
| P8 | **1,000+ creator videos** | C | About Us | No | Quick-scan proof (§06) | **NEEDS VERIFY** |
| P9 | "billions of views" | C | About Us | No | — | **HOLD** — unbounded language, §1 forbids it |
| P10 | **40M+ views on a single branded video** | C | About Us + Brand Video | No | Selected Work (§08) | **NEEDS VERIFY** |
| P11 | Creator network handles: `@mishram_media`, `@corrupt_tuber`, `@puravjha9`, `@shadabjakati1`, `@xbhandesiri_`, `@jj_mobile_world` | C | Network slide | Portraits in deck | Creator network (§07) | **NEEDS VERIFY** — two-source rule (§18) |
| P12 | Follower figures: 40M+, 3.4M+, 7.6M+, 3.4M+, 1M | C | Network slide | No | — | **HOLD — UNMAPPABLE.** Six handles, five figures. **The deck does not let you say which figure belongs to which creator.** §18: no metric, ever, for anybody, without verification |
| P13 | "Viral sensation": `@shubhamkochale`, `@shadabjakati1`, `@xbhandesiri_`, `@jj_mobile_world` | C | Viral slide | Portraits | Creator network (§07) | **NEEDS VERIFY** + Jakati flag |
| P14 | Brand partners named: `@canvaindia`, `@zingbus`, `@troovyfoods` | C | Brand slide | Logos in deck | Brands rail (§02) | **PART HOLD** — zingbus blocked by §18; Canva and Troovy already on the rail |
| P15 | "Proven Brand Partnerships" narrative | C | Brand slide | — | Influencer Marketing | **READY** |
| P16 | `@puravjha9` is Purav Jha's handle | C | Network slide | — | Creator network | **READY as a handle** — but see the missing-photograph finding |

**Source discipline, as the plan asked.** Every row above is **class A — text claim only**. Not one
figure in the deck is accompanied by a screenshot of a platform showing it, and no local raw asset
corroborates any of them. **That is the single most important thing this register records**: the
proposal's numbers are currently unevidenced, and §1's rule against unverified metrics applies to
them exactly as it applies to anything else. Phase 06 cannot start until at least P6, P7, P8 and P10
have dated captures.

---

## Master media allocation ledger

**The rule: one photograph, one editorial role.** No image appears in two sections. Where a creator
has more than one usable frame, the *relationship* frame goes to the section that argues the
relationship, and the *portrait* frame goes to the Hero — never the other way round.

| Source file | Identity | Quality | Primary section | Reserved secondary | Do NOT repeat in | Production output | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ali fazal.jpeg` | Ali Fazal | Good | **Hero** | — | Creators, Influencer, Social | `public/media/hero/creators/ali-fazal.webp` 620×1102, 98KB | **LIVE (local)** |
| `Akash sagar.jpeg` | Akash Sagar | Very good | **Hero** | — | Current Management, Creators | `public/media/hero/creators/akash-sagar.webp` 640×800, 38KB | **LIVE (local)** |
| `Akash sagar 1st.jpeg` | Akash Sagar | Good, relational | **Current Management (03)** | — | Hero, Creators | — | **RESERVED** |
| `Akash sagar 2nd.jpeg` | Akash Sagar | Weak | — | — | everywhere | — | **HOLD** |
| `Lovekesh Kataria.jpeg` | Lovekesh Kataria | Excellent | **Influencer Marketing (05)** | Creator network | Hero¹ | — | **RESERVED** |
| `Prashant Mishra.jpeg` | Prashant Mishra | Excellent | **About (10)** | Agency credibility | Hero, Creators | — | **RESERVED** |
| `Immortal Kaka Ji.jpeg` | Immortal Kaka Ji | Good | **Creator network (07)** | Viral personalities | Hero | — | **RESERVED** |
| `Shadab Hasan.jpeg` | Shadab Hasan | Good | — | — | everywhere, pending | — | **HOLD — brand safety** |
| `JJ Communication.jpeg` | JJ Communication | Good | — | — | everywhere | — | **BLOCKED — OPPO** |
| `award.jpg.jpeg` | Award | Graphic | **Recognition (09)** | — | Hero, Favicon | — | **RESERVED, with caveat²** |
| `images.png` | Dermatouch (3rd party) | OK | **Brands rail (02)** | — | anywhere implying a creator | — | **RESERVED** |
| `circle logo mishram.jpg.jpeg` | Mishram mark | Good | **Social / profile avatar** | — | **Favicon** | — | **RESERVED** |
| `blue logo mishram.png` | Mishram mark | Vector-grade | **Light-surface brand mark** | Print / deck | Header³ | — | **RESERVED** |

¹ The Hero keeps its **original** square Lovekesh photograph — §18 locks that specific file because
the exposure tiers and `layout.ts` were composed against it.
² It is a composite marketing graphic with baked-in typography and a URL, not a photograph. It will
fight the site's own type. Phase 09 should either crop to the trophy moment or ask for the original
photograph behind the graphic.
³ The header mark needs no change — see below.

**Uniqueness proved.** Akash is the only creator with enough source photography to appear twice, and
his two frames are **different files in different sections**: `Akash sagar.jpeg` → Hero,
`Akash sagar 1st.jpeg` → Current Management. Every other creator has exactly one allocated frame.
No file is allocated to two sections anywhere in this table.

---

## Brand colour — `#4c3660`

**Verdict: SELECTIVE PLUM. Token declared, applied to nothing.**

It is not arbitrary: the first-party logo's own indigo, sampled from `blue logo mishram.png`, is
**`#5c37ff`**. `#4c3660` is that hue desaturated and darkened — a genuine identity bridge rather
than a mood-board pick.

**Measured, not judged:**

| Use | Contrast | Verdict |
| --- | --- | --- |
| Plum as text/line on the dark canvas | **1.89 : 1** | **Fails.** Needs 4.5. Effectively invisible |
| Teal as text on the dark canvas (for scale) | 10.87 : 1 | The bar it would have to clear |
| Ivory text on a plum **surface** | **9.14 : 1** | Passes comfortably |
| Logo indigo `#5c37ff` on the dark canvas | 3.25 : 1 | Large graphics only, never text |

**So `#4c3660` is a surface colour and can never be an accent on this site.** Option A — plum as a
selective accent — is dead on arithmetic, not taste.

**Option C — a global plum canvas — was rendered and rejected on sight.** It flattens the obsidian's
depth, muddies the teal into the background, fights the photography (the orange-dress frame in
particular), and lands the site squarely in generic-purple-SaaS territory. Screenshot captured
during Revision 28; the design is materially worse.

**Option B — plum as a major editorial surface — is the survivor, and has nowhere to go yet.**
Every section that could carry it is frozen by Phase 01's scope, and the Hero is locked. So the
token ships **declared and unused**:

```css
--color-brand-plum: #4c3660;   /* globals.css @theme */
```

**Where a later phase may use it:** the quick-scan proof band (§06), a Recognition surface (§09), or
one brand moment in About (§10) — always as a full-bleed surface carrying ivory type, never as a
line, label, link or icon. **Do not gradient it. Do not tint the canvas with it. Do not use it on
the light theme without re-measuring.**

---

## Logo system

**The single most useful finding: the supplied logos and the site's existing wordmark are the same
artwork.** `blue logo mishram.png`, `grey logo mishram.png` and `public/brand/mishram-wordmark.png`
are the identical mark — studio light, `MISHRAM`, headphones, diagonal slash.

| Role | Source | Decision |
| --- | --- | --- |
| **Primary header mark** | `public/brand/mishram-wordmark.png` | **Unchanged.** It is rendered as a CSS mask so it inherits `currentColor` — ivory on obsidian, ink on parchment. That is **better** than shipping a fixed-blue PNG, which would break one of the two themes |
| **Dark-surface mark** | same, masked | Unchanged |
| **Light-surface mark** | same, masked | Unchanged |
| **Footer mark** | same | Unchanged |
| **Full-colour brand mark** | `blue logo mishram.png` (trim to 12499×5946) | **Reserved** — for decks, print and third-party profiles, where the site's theming does not apply |
| **Circular lockup** | `circle logo mishram.jpg.jpeg` (trim to 9020×9020) | **Reserved** — social avatars, where a circle crop is enforced anyway |
| **Favicon / app icon** | existing `src/app/icon.png` | **Unchanged — and this was tested** |

`grey logo mishram.png` has **no unique role**: it is the same mark desaturated, and the masked
wordmark already produces any tone the site needs.

**Nothing was redesigned, redrawn or generated.**

---

## Favicon — tested, and deliberately not changed

The plan's hypothesis was to replace the favicon with the circular mark. **Rendered at real sizes,
that is a clear regression**, so it was not done:

| Candidate | 16px | 32px | 64px |
| --- | --- | --- | --- |
| **Current `icon.png`** — the `M` with the slash | **Crisp and unmistakable** | Crisp | Crisp |
| `circle logo mishram` | **Illegible grey smudge in a white disc** | `MISHRAM` is mush | First legible size |

The circle lockup contains the **entire wordmark**, so it cannot survive a 16px tab. The existing
favicon is already the strongest compact first-party symbol available — the `M` glyph taken from the
same mark — and it is what a browser tab actually needs. `icon.png` (512×512), `apple-icon.png`
(180×180) and `favicon.ico` all stay as they are.

Neither the award artwork nor any creator photograph was considered, per the plan.

---

## Hero — final lineup

Composition **locked and untouched**: five surfaces, the same five aspects, the same `onMobile`
pattern, the same `layout.ts` geometry. Only the media moved.

| Slot | Aspect | Was | Now | Caption | Mobile |
| --- | --- | --- | --- | --- | --- |
| 1 | 9:16 | Zoya Jaan | **Zoya Jaan** | Creator Network | yes |
| 2 | 9:16 | Mukul Sharma | **Ali Fazal** | **Worked With** | yes |
| 3 | 9:16 | Nikita Kumawat | **Nikita Kumawat** | Creator Network | no |
| 4 | 4:5 | Vishnu Priya | **Akash Sagar** | **Current Management** | yes |
| 5 | 1:1 | Lovekesh Kataria | **Lovekesh Kataria** | Creator Network | no |

Three existing creators stay, so the composition keeps its breadth rather than becoming a wall of
one kind of photograph. **Captions are relationships, never metrics** — no follower count, and none
of the proposal's figures.

`layout.ts` slot keys `mukul` → `ali` and `vishnu` → `akash` were renamed. **Every numeric value is
byte-identical** — the diff is ten lines, all of them key names. `config/creators.ts` keeps its own
`mukul` / `vishnu` roster ids, which are a different namespace and are used by six downstream
sections that this phase does not touch.

**Media weight:** 63KB + 52KB (out) → 98KB + 38KB (in) = **+21KB across the whole Hero**
(190KB → 211KB for the five textures). No new eager image, no new preload — the Hero's photography
is WebGL texture loading, lazy and DPR-capped, exactly as §16 requires.

---

## Open items handed to the next phase

1. **Purav Jha has no photograph.** Ask the client for a still, or for permission to extract a video
   frame *and* confirmation of which figure he is.
2. **The proposal's four headline figures are unevidenced** (P6, P7, P8, P10). Phase 06 is blocked
   until dated captures exist.
3. **The handle→follower mapping in the deck is ambiguous** (P12) and must not be guessed.
4. **Shadab Jakati's brand-safety finding is still unresolved** and the deck actively promotes him.
5. **`JJ Communication.jpeg` is blocked by the OPPO rule** — a different photograph is needed.
6. **The consent notice's mobile buttons are 40px**, under this project's own 48px standard (§10ae).

---

## Revision 29 — Phase 01 visual sign-off, and Phase 02

### The screenshot method, now a script

`scripts/shoot.mjs`. Headless Chrome driven over CDP with Node's global `WebSocket` — §10q's
documented workaround, written down instead of rebuilt from memory each time. **No dependency was
added.** It handles viewport, `prefers-color-scheme`, `prefers-reduced-motion`, the §10q scroll
sweep, and section-clipped captures.

**Two gotchas are baked into it because both have produced a wrong verdict before:**

1. **The scroll sweep.** Without it `IntersectionObserver` never fires and every `whileInView`
   element sits at `opacity: 0` — the capture looks like a broken page (§10q).
2. **`--use-angle=swiftshader`.** Without software WebGL in headless the hero canvas renders
   nothing, which is *exactly* the false negative the preview pane produced in Revision 28.

### Phase 01 Hero visual QA — PASS

Nine captures: 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and
dark, and 1440×900 under `prefers-reduced-motion`. Every one reports `gl=true` with a live canvas.

- **Ali Fazal renders correctly at every size**, both figures in frame, neither head cut.
- **Akash Sagar renders correctly at every size**, both figures in frame, bright and clean — the
  strongest card in the composition.
- All five surfaces load (`textures=5` on desktop, `textures=3` on the reduced mobile set, which is
  the `onMobile` design).
- Headline, CTAs, orbital composition, caption rail and media overlap all correct in both themes.
- **No fix was required.** The media replacement introduced no defect, so the smallest-correction
  rule never fired.

**One pre-existing defect found, and deliberately not fixed here.** `document.scrollWidth` exceeds
the viewport at **1024×768 and 768×1024**. It is **not caused by Phase 01**: the identical probe run
against the live production site — Revision 27, the old Hero — reproduces it at exactly the same two
viewports. It is absent at 1440, 1280, 430 and 390 (390 was re-run three times to confirm a single
transient reading). **Registered for Phase 12**, which owns global responsive polish; fixing it here
would be scope creep into a section this phase was told not to touch.

### Phase 02 — the rail is colour at rest

**The inversion.** The rail sat monochrome and revealed colour on hover. It now sits in real brand
colour at `--collab-color-rest` (0.88 dark / 0.9 light) and hover only takes it to full clarity plus
a 3px lift and `scale(1.03)`. **A visitor who never hovers is the one this section has to convince.**

**A new token, and the reason matters.** `--collab-color-rest` is separate from `--collab-logo-rest`
on purpose: that token is shared with `/about`'s `.abt-brand-mark`, which is still a monochrome mask
and is out of this phase's scope. Raising the shared token would have silently restyled another page.

**The plate, and how the list was decided.** Seven marks are drawn in black for light stationery and
vanish on obsidian. They get a soft parchment ground — `rgba(243,239,231,0.84)`, `inset -10px -16px`,
6px radius — and **the other eleven get no chrome at all**, which is the whole difference between an
editorial ribbon and a sponsor wall.

The list was **measured, not eyeballed**: for each colour asset, the share of opaque ink whose
contrast against `#0a0a0a` falls below 2:1.

| Mark | Invisible ink | Ground |
| --- | --- | --- |
| AVVATAR, DermaTouch, Kapiva, Pilgrim, Wondershare | **100%** | yes |
| Muuchstac | 99.0% | yes |
| Navi | 61.1% | yes |
| Excel Entertainment | 26.7% | **no** — it reads, and an eighth plate costs more than it buys |
| Canva, CashKaro, Groww, Mamaearth, Pintola, Swiggy, Swiggy Instamart, Troovy, Upstox, Yash Raj Films | **0%** | no |

**This exactly confirmed the seven `darkKeepsMono` flags already in the config**, so no flag changed.
A first, cruder metric — *mean* luminance — wrongly cleared Navi, because a two-part lockup averages
a bright glyph against a near-black wordmark. **Mean luminance is the wrong measure for a lockup;
share-of-invisible-ink is the right one.**

### Asset architecture — one layer, not two

The rail no longer renders the mask layer at all, so it no longer downloads it.

| | Before | After |
| --- | --- | --- |
| Brand files requested by the homepage | **36** (colour + mask) | **18** (colour only) |
| Weight | **456KB** | **298KB** |

**Minus 18 requests, minus 158KB**, and recognisability went *up* rather than down. The 18 mask files
stay on disk because `/about` still renders the roster as monochrome marks — this change is scoped
to the rail.

### Motion, unchanged in principle

The derived-duration rule stands: speed comes from actual track width so the marquee cannot silently
accelerate when a brand is added. Desktop is a continuous rail that pauses on hover or focus.
**Reduced motion renders a static two-row grid of the twelve featured marks in full colour** — the
compact multi-row treatment, not a hidden roster. Mobile keeps the rail at a 22px logo height, which
stays legible at 390px rather than shrinking eighteen marks into specks.

### Asset / provenance register — brand logos

Kept separate from the creator-photo ledger above, deliberately.

| Brand | Source | Local output | Format | Public |
| --- | --- | --- | --- | --- |
| Swiggy, Swiggy Instamart | official corporate-site vector | `/media/brands/*-color.png` | PNG alpha | yes |
| Canva, Yash Raj Films, Wondershare, Upstox, Pilgrim, CashKaro, Kapiva, Navi, Pintola, AVVATAR, Troovy, DermaTouch, Muuchstac | official mark / website (vector) | `/media/brands/*-color.png` | PNG alpha | yes |
| Mamaearth, Groww | existing approved asset (Revision 01) | `/media/brands/*-color.png` | PNG alpha | yes |
| Excel Entertainment | official website header mark | `/media/brands/excel-entertainment-color.png` | PNG alpha | yes |
| **Duolingo** | **first-party deck (new, Rev 29)** | none | — | **held — no clean asset** |
| VYRL | client-confirmed | none | — | held — no official asset |
| Zingbus | first-party deck | none | — | **blocked — brand-safety rule** |
| Fun N Earn | client-confirmed | none | — | **withheld — brand-safety rule** |

**No new logo file was created and none was recoloured, redrawn or rasterised.** All 18 public marks
were already local, transparent and official; the redesign needed a treatment change, not sourcing.

**DermaTouch: the supplied file was compared and rejected.** `WEBSITE SHORTLIST/images.png` is
447x447, **opaque**, with the mark occupying 401x173. The production asset is 337x128 **with alpha**
and already tightly cropped. Using the supplied one would mean cutting a mark off its white ground —
altering artwork, which the logo policy forbids. **The existing asset is better and was kept.**

### Proof register — a correction to Revision 28

**Revision 28 recorded that every numeric claim in the proposal is "class A — text only". That was
wrong, and it was wrong because it was based on the deck's *text*.** Extracting the deck's embedded
imagery shows platform screenshots:

- A `@xbhandesiri_` post grid with view counts of **135M, 111M, 70.9M, 58.3M, 56.3M and 34.6M** —
  direct visual evidence for the *130 million+ on a single Reel* claim (P6), and it puts the claimed
  figure slightly *below* what the screenshot shows.
- Instagram profile screenshots carrying follower counts for `@priyanka_chouhan70` (16.1M),
  `@aaryankelvin` (25.4M), `@vikesh.24` (4M), `@alian_star_` (1.7M), `@muzakkir011_` (1.6M) and
  `@xbhandesiri_` (928K).

**P6 is therefore upgraded from class A to class B — claim accompanied by visual evidence.** P7
(100+ brands), P8 (1,000+ videos) and P10 (40M+ branded video) remain class A. **Nothing was
published, and Phase 06 still owns the decision** — but the next session should not repeat Revision
28's conclusion, which is why it is corrected here rather than left to be rediscovered.

The handle-to-follower ambiguity in **P12 stands unchanged**: the network slide still lists six
handles against five figures, and the profile screenshots are a different set of creators.

### New brand evidence

- **Duolingo** appears as a brand tile in the deck's brand-video section. Relationship recorded,
  **visually held** — the only file is a 480x360 raster on an opaque green ground, and lifting the
  wordmark off it would alter the artwork.
- **Zingbus** appears in the deck and stays **blocked** by the standing brand-safety decision.
- **YesMadam and Bajaj Finserv were looked for and not found** — neither appears in the deck's text
  or in any of its 35 extracted images. They are not added.

---

## Revision 30 — Phase 03, Current Management

### The unblock arrived, and the file said it would

`config/management.ts` has carried this line since Revision 17B: *"The unblock is one file. Supply
a Mishram-owned photograph of Akash with explicit identity and this goes back to a full portrait
composition."* **That turned out to be exactly right** — one config export and one component
function. The chapter was typographic because the evidence was a 150px avatar, not because anyone
preferred type.

### Media allocation — unchanged, and now proved in production

| Source file | Destination | Production output |
| --- | --- | --- |
| `Akash sagar.jpeg` | **Hero** (Rev 28) | `/media/hero/creators/akash-sagar.webp` 640×800, 38KB |
| `Akash sagar 1st.jpeg` | **Current Management** (Rev 30) | `/media/management/akash-sagar-current-management.webp` 960×1280, 63KB |
| `Akash sagar 2nd.jpeg` | — | **still held**: 1.1MP, third-party signage in shot |

**Two different source files, two different sections, no repetition.** The ledger's whole purpose,
honoured. The reserved frame was the *relational* one on purpose: the Hero has to look like proof,
this chapter has to be it.

**The crop was tested, not assumed.** 5:4 and 16:10 both cut heads off; 1:1 held the pair well;
**3:4 held them largest with headroom intact**, which is what a dominant column wants. Extracted
from `{ left: 624, top: 666, width: 1934, height: 2579 }` of the rotated original. The original is
untouched. **Both figures stay in frame** — the arm across the shoulder is the part that makes the
photograph evidence rather than decoration, and cropping to a solo portrait would also assert which
figure is which, which the client's label does not establish (§10u).

### The composition

Photograph left at `col-span-5`, claim right at `col-span-6 / col-start-7`. The old identity plate
is gone; its teal corner marker moved onto the image, so the mark travelled with the composition
rather than being dropped.

The handle came **down** from display scale to a byline beside the official 150px avatar, rendered
at 44px so it still covers 2× exactly. That pairing is deliberate: **two provenances on one line** —
the photograph is identified by the client's own filename, the avatar by the account itself.

`CURRENT MANAGEMENT` gained a small teal dot beside its rule — the same point the header uses, and
the whole of the status signal. **No "LIVE", no "SIGNED", no "EXCLUSIVE"**; none of those is
supported and §18 forbids two of them outright.

### Scope, and what was rejected

Three rows: **Creator strategy · Brand opportunities · Short-form growth**. Every one is lifted out
of the client-confirmed sentence rather than added to it.

**Campaign coordination, content direction, payment handling and legal representation were all
considered and rejected.** The deck describes the first two as things Mishram does on *campaigns* —
a different claim from what it does for *this creator*. Add an item when the client confirms that
item, not when it sounds plausible.

### Plum — tested on the one surface that could have earned it, and rejected

Option A is the existing obsidian/parchment treatment; Option B made the whole section a plum field
with ivory content, which is the only way the token can be used (ivory on plum is 9.14:1; plum as
text on obsidian is 1.89:1 and fails).

**Option B was rendered and rejected.** Against the colour brands rail directly above it, the plum
band reads as a hard flat slab with no transition — and gradients are explicitly off the table, so
there is no softening it. It also fights the photograph, whose corridor light is warm cream and
white. The chapter already earns its rhythm through **composition**: a dominant photograph after a
logo ribbon is a clear change of gear without changing the canvas.

**Plum remains declared and unused.** Two phases have now tested it on real surfaces and neither
found one; that is a finding, not a failure to try.

### Height, and the correction that got there

First build measured **1108px = 1.23 viewports**, over the 0.85–1.1 target, with visible dead space
under the text column. The image was at `col-span-6`; narrowing it to `col-span-5` took the section
to **958px = 1.06 viewports** — inside target, and better balanced because the two columns now end
nearer each other.

Before: ~834px / 0.93 viewports. After: **958px / 1.06**. The chapter gained a photograph for
124px.

### Mobile, and a real defect caught

At 390 the section is 1120px, reading image → label → name → byline → statement → scope → CTA.
Both figures visible, no head cut, no horizontal overflow, both themes correct.

**The first attempt had a genuine bug.** The columns carried `order-2` / `order-1`, intending the
photograph to drop below the claim on a phone — but below `lg` the parent is a plain block, so
`order` does nothing at all. The figure's caption landed a few pixels above the chapter label and
read as a collision. Fixed by dropping the ineffective `order-*` entirely and using `mb-14 lg:mb-0`:
one reading order at every size, with real space between the image and the words.

### Performance

| | |
| --- | --- |
| Production image | 63KB, 960×1280 WebP |
| Loading | `loading="lazy"` |
| Preload | **none** |
| Image nodes in section | 2 (relationship frame + 44px avatar) |
| Section total | ~68KB |

Below the fold, so it never competes with the hero for the first megabyte (§16).

### Metrics

**None published.** No follower count, no view figure, nothing from the deck. `MANAGEMENT.metrics`
is still an empty array that renders nothing at all. The `@xbhandesiri_` screenshot showing
135M/111M/70.9M is registered in the proof register and stays there — **Phase 06 owns numeric
proof**, and this section was built to work without any of it.

---

## Revision 31 — Phase 04, Social & Personal Brand Growth

### The finding that shaped the phase: there is no new media

The brief for this phase was to replace weaker imagery with better first-party creator proof. **An
exhaustive scan of `F:\Drive data` found 58 still images in total, and not one of them is available
for this service.** That is the phase's most important output, so the classification is recorded in
full rather than summarised:

| Group | Count | Status |
| --- | --- | --- |
| `WEBSITE SHORTLIST` creator photographs | 8 | Allocated (Hero ×2, Current Management), reserved (Lovekesh → 05, Prashant → 10, Immortal Kaka Ji → 07), held (Shadab, Akash 2nd), blocked (JJ / OPPO) |
| `Prashant - data/PRASHANT SIR - PICTURES/*` | 7 | Explicit Prashant folder — **reserved Phase 10** |
| `AKASH COVER PHOTO/IMG_2188-2190.jpg` | 3 | **Permanently revoked (§18).** Never represent Akash Sagar again, in any crop, at any size |
| Root `IMG_*` / `*.HEIC` / UUID files, and their `_website-converted-jpg` copies | ~30 | **No identity metadata.** A UUID is not a person — §18 rule 7 bars publishing them as any named creator |
| `PRASHANT VIDEO/Swiggy/*` | 2 | Campaign material in a brand folder → **Phase 05**, not personal branding |
| Logos, award artwork | ~8 | Phases 02 and 09 |

The named creator folders that looked promising — `Purav`, `Dr 69 - sagar bhai shoot +bts`,
`RAMAH` — **contain only `.MOV` files.** No stills anywhere under them.

**So no new photograph was produced, and none was invented.** The alternative — publishing a
UUID-named file as a named creator — is the exact mistake §10u cost a revision to learn.

### What was actually improved, and why it is not cosmetic

**The Brand Signal anchor moved from Zoya Jaan to Vishnu Priya.**

Revision 28 rebuilt the Hero around Ali Fazal and Akash Sagar while keeping Zoya, Nikita and
Lovekesh. That left `zoya-jaan.webp` rendering in **both the Hero and this route's opening
composition** — the same production file, one screen apart on a visitor's way down the site, and the
only same-file repeat of its kind.

Exactly two published creators came *off* the Hero in that revision: **Mukul Sharma and Vishnu
Priya**. Mukul already carries the Content System Board further down this page, so the hero takes
Vishnu Priya. **The route now opens and argues on two creators the homepage's first screen does not
use at all**, which is the no-repeat principle applied where it could actually be applied.

She also arrived with all three crops already tuned (`portrait`, `reel`, `content`), so the swap
needed no new art direction and no layout change.

### A real defect the swap exposed

The hero's attribution line was a hardcoded string: `"Pictured — Zoya Jaan, Mishram creator
network"`. Changing the anchor left **the wrong creator's name printed under a photograph** — an
identity error of precisely the class §10u exists to prevent, and it survived a clean build because
nothing connects a caption to an image.

**Fixed at the root, not patched.** `SOCIAL_ANCHOR` is now a single export in
`config/service-social.ts`; `BrandSignal` reads it and the caption derives from
`SOCIAL_ANCHOR.name`. **The name and the photograph can no longer disagree**, and changing the
anchor is one id.

### Copy audit — passed, no changes required

Every capability the phase asked about is already present and supported: Personal Brand Strategy,
Content Strategy, Social Media Management, Content Planning, Creative Direction, Short-Form Content
Strategy, Creator Growth Direction, Collaboration Coordination. Positioning, publishing consistency
and brand voice are carried by the four pillars.

A scan for the banned register — *viral, 10x, guarantee, unlock, next level, one-stop, icon*, and
for any figure or `NNM+` pattern — returned **zero hits**. The headline
**"Build a brand people remember."** was reviewed and kept; nothing was found wrong with it.

The creator proof already carries the only defensible framing: label *"Selected creators from our
network"*, and a config comment stating explicitly that no follower figure, growth claim, management
relationship or campaign attribution is made about those portraits. **Nothing needed rewording.**

### Homepage Service 01 — inspected, deliberately unchanged

`SocialGrowthScene` renders Nikita Kumawat, Mukul Sharma and Vishnu Priya. Nikita is also in the
Hero, so one overlap remains — and **it cannot be removed.** Only two published creators are absent
from the Hero, the scene needs three, and §18 locks the What We Do system. Shuffling would move the
repeat, not remove it. Left alone, and recorded here so the next phase does not re-derive it.

### Media ledger — Phase 04

| Source | Identity | Where | Production output | Reserved elsewhere | Do not repeat in |
| --- | --- | --- | --- | --- | --- |
| `/media/creators/vishnu-priya.webp` (existing) | Vishnu Priya | **Dedicated page hero** + homepage Service 01 | none — reused, three tuned crops | no | Hero, Current Management |
| `/media/creators/mukul-sharma.webp` (existing) | Mukul Sharma | Content System Board + homepage Service 01 | none — reused | no | Hero, Current Management |
| `ROSTER` portraits ×6 | Ali, Zoya, Nikita, Lovekesh, Mukul, Vishnu | Creator field (proof) | none — reused | no | — |

**No new production asset was created in this phase**, so media weight is unchanged everywhere.

### Reserved for Phase 05 — Influencer Marketing

Held deliberately so that page has its own visual identity:

- **`WEBSITE SHORTLIST/Lovekesh Kataria.jpeg`** — 6048×8064, excellent, two figures, EXIF 6.
- **`Prashant - data/PRASHANT VIDEO/Swiggy/IMG_3865.HEIC`, `IMG_3866.HEIC`** — campaign material in
  a brand-named folder. Campaign execution is Phase 05's argument, not Phase 04's.
- `WEBSITE SHORTLIST/Immortal Kaka Ji.jpeg` stays reserved for Phase 07.

**Phase 04 leaned on identity, personality and content language; Phase 05 gets network, campaign and
coordination.** That split is the reason nothing was spent here.

### Measurements

| | |
| --- | --- |
| Page height, 1440×900 | **10,445px** — and **identical with either anchor**, measured by swapping back and re-capturing. The change is exactly height-neutral |
| 1280 / 1024 / 768 / 430 / 390 | 10,189 / 9,805 / 13,061 / 13,124 / 13,222px |
| Images on the page | 10 — **9 lazy, 1 eager, 1 preload** |
| Horizontal overflow | **none at any of the eight viewports**, in both themes and under reduced motion |
| New media weight | **0KB** |

The single eager image is the hero composition's anchor portrait, which is the one truly above-fold
image — exactly the budget the phase set.

### Metrics

**None added.** No follower count, no view figure, nothing from the deck. The `@xbhandesiri_`
screenshot and the 130M+/100+/1,000+/40M+ claims all stay in the proof register for Phase 06.
