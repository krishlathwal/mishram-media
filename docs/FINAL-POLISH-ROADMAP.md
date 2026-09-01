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
| **05** | **Influencer Marketing media + campaign proof** | **Done — Revision 32** |
| **06** | **Quick-scan proof layer** | **Done — Revision 33** |
| **07** | **Creator / viral network refinement** | **Done — Revision 34** |
| **08** | **Selected Work / real campaign proof** | **Done — Revision 35** |
| **09** | **Recognition / NUFEW award proof** | **Done — Revision 36** |
| **10** | **About / Prashant Mishra / agency credibility** | **Done — Revision 37** |
| **11** | **Homepage length + information hierarchy** | **Done — Revision 38** |
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
| `Lovekesh Kataria.jpeg` | 6048×8064¹ | JPEG | 10.1MB | Lovekesh Kataria | **2** | Excellent, clean interior | Very flexible | **SPENT TWICE — 3:4 roster portrait (Rev 17B) + 4:5 relationship node (Rev 32). See Revision 32** |
| `Prashant Mishra.jpeg` | 6048×8064¹ | JPEG | 9.2MB | Prashant Mishra | **1** | Excellent, informal (sunglasses) | Very flexible | **RESERVED — Phase 10** |
| `Shadab Hasan.jpeg` | 6048×8064¹ | JPEG | 10.1MB | Shadab Hasan | **3** | Good, busy street | Moderate | **HOLD — see brand safety** |
| `JJ Communication.jpeg` | 2160×3840 | JPEG | 1.38MB | JJ Communication | 2 | Good | Flexible | **BLOCKED — OPPO in frame** |
| `Immortal Kaka Ji.jpeg` | 2160×3840 | JPEG | 1.92MB | Immortal Kaka Ji | 2 | Good, café interior | Flexible | **HELD — identity yes, RELATIONSHIP NOT VERIFIED (Rev 34). See Revision 34** |
| `award.jpg.jpeg` | 3920×2160 | JPEG | 2.41MB | — (award) | 2 | **Composite marketing graphic, not a photo** | Poor — baked-in type | **NOT USED (Rev 36). The caveat was right — see the audit below** |
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
| P1 | "An award-winning creative influencer & digital marketing agency" | B+C | Cover | Award graphic exists | About / Recognition | **READY, still unpublished as a phrase (re-checked Rev 36).** §06 carries the award itself — a title, a body, a year and now a photograph — which is stronger and checkable. *"Award-winning"* as a standalone adjective adds nothing the evidence does not already say |
| P28 | **`NUFEW` vs `NUFW`** — the awarding body's own mark | A | The five award photographs | **YES, and it disagrees with the published string** | — | **FLAGGED, NOT ACTED ON (Rev 36).** The promotional banner's rendered badge reads `NUFEW`; the event's step-and-repeat, the engraved plaque and the trophy plate all read **`NUFW`**, and the step-and-repeat prints the expansion beside it — **`NEXUS UNIVERSE FASHION WEEK`**. The site keeps publishing `NUFEW`, unexpanded. A designer's badge and an engraver's die can disagree without either being the body's legal name, and resolving a one-character difference unilaterally is the §10u error. **One-word client decision** |
| P29 | A **`Digital Partner`** recognition, addressed to an individual | A | `CE81BFA5-…`, `135279F4-…` | **YES — legible on the engraved plaque** | — | **HELD.** A second, differently-scoped recognition from the same evening. It is inscribed to a person rather than to the agency, so it cannot be published under §06's agency award, and §18 rule 7 governs the name on it. Recorded so it is not rediscovered as "the same award" |
| P30 | **Prashant Mishra — identity** | A | `WEBSITE SHORTLIST/Prashant Mishra.jpeg` | The client supplied and named the file | `/about` → `now` | **PUBLIC (Rev 37).** The same evidence class Ali Fazal, Akash Sagar and Lovekesh Kataria are published on. **No face was compared, matched or recognised.** Single figure, so no crop asserts which person in a frame he is |
| P31 | **Prashant Mishra — public role** (*Founder & Chief Marketing Officer*) | Old site `about.html:1347` visible team block + `about.html:101-104` schema.org `employee` + `llms.txt` | Three places in Mishram's own former markup | Partial — `@filmybande` (Mishram's **current** public Instagram) is publicly "Prashant mishra" with a `mishram.media` highlight, and the client supplied `…/in/prashant-mishra-mishram-media` as the company's LinkedIn. **Neither states a title** | — | **HELD (unchanged, re-searched Rev 37).** First-party but **historical**, and the migration audit's verdict stands: *"'Founder' and 'CMO' are separate claims and only the first is corroborated"* — **B, needs current confirmation.** §10r's *"NO TEAM AND NO FOUNDER"* is not reversed. The site publishes **the name, an entity line and a real link, and no title.** One client sentence unblocks it: set `ABOUT_PERSON.role` |
| P32 | The **2021 / 2023 / 2025 chronology** | Old site `about.html`, verbatim, identical in `_backup_pre_seo` and `llms-full.txt` | One sentence, three events | — | Homepage preview (one line) + `/about` origin | **PUBLIC (unchanged since Rev 13).** Re-verified in Rev 37 and **not rewritten from memory.** No 2026 moment was added — no verified event exists for one, and a "today" milestone for visual balance is exactly what §10f rules out |
| P33 | The **current team roster** — Upendra Singh, Subhash Kumar, Abhishek Gautam | Old site `employee` array | Named in markup | **None.** No corroboration anywhere for any of the three; every headshot is a numbered placeholder GIF | — | **HELD / INCOMPLETE.** One evidenced person does not make a team section, and a team grid with one filled slot is worse than none. **No team grid was created** |
| P34 | **Location** | `BRAND.locator` | — | The old site contradicts itself across five cities | `/about` → `now`, Footer | **PUBLIC — `INDIA` only.** No city, office or address was restored, and none sits beside the person |
| P2 | "Scaling influencers · Creating content · Building iconic digital careers" | B+C | Cover | — | About positioning | **READY** — editorial copy, no metric |
| P3 | About paragraph — "creator focused talent and marketing agency… India's most influential, viral, and emerging creators" | C | About Us | — | About / Influencer Marketing | **READY** — rewrite in site voice, do not paste |
| P4 | "premium influencers and trending creators" — two-tier network | B+C | p9 | — | 03 / Creators intro | **PUBLIC (Rev 34)** — renders as **Established** / **Trending**. *Premium* was rejected: on a website it reads as a pricing tier. **The two halves describe the network and never label a person** |
| P5 | Full collaboration journey: strategy → selection → execution → tracking | C | About Us | — | Influencer Marketing (§05) | **READY** |
| P6 | **130 million+ views on a single Reel** | B+C | p2 | **YES — deck Reel-grid capture, top tile 139M** | Homepage proof band | **PUBLIC (Rev 33)** — renders as `130M+ / Views on a single Reel`. The published figure is deliberately *below* the evidence |
| P7 | **100+ brands** | B+C | p2, p6 | No | Homepage proof band | **PUBLIC (Rev 33)** — renders as `100+ / Brands worked with`. Same wording the rail uses, so the eighteen marks and the figure agree rather than compete |
| P8 | **1,000+ creator videos** | B+C, + client Aug 2026 | p2, p6 | No | Homepage proof band | **PUBLIC (Rev 33)** — renders as `1,000+ / Creator-led videos`. Wording reconciled: the client said *promotional videos*, the deck says *creator-led videos*; same figure, the deck's noun ships |
| P9 | "billions of views" | B+C | p2, p6 | No | — | **HELD (unchanged)** — unbounded, uncheckable, §1 forbids the register. Recorded in `config/proof.ts` as `public: false`. Not scheduled |
| P10 | **40M+ views on a single branded video** | B+C | p2, p5 | No | 05 / Selected Work | **PUBLIC (Rev 35)** — renders once, above the work index, as `40M+ / Views on a single branded video` with the scope note *"Across Mishram's brand collaborations. Not attributed to the work shown here."* **Attached to no brand.** Stays `public: false` in `config/proof.ts` because that flag governs the quick-scan band only |
| P11 | Creator network handles: `@mishram_media`, `@corrupt_tuber`, `@puravjha9`, `@shadabjakati1`, `@xbhandesiri_`, `@jj_mobile_world` | C | Network slide | Portraits in deck | Creator network (§07) | **NEEDS VERIFY** — two-source rule (§18) |
| P12 | Follower figures: 40M+, 3.4M+, 7.6M+, 3.4M+, 1M | C | Network slide | No | — | **HELD — UNMAPPABLE (unchanged).** Six handles, five figures, and the six profile screenshots on p8 are a *different* set of creators. Re-checked in Revision 33 and still not mappable |
| P13 | "Viral sensation": `@shubhamkochale`, `@shadabjakati1`, `@xbhandesiri_`, `@jj_mobile_world` | C | Viral slide | Portraits | Creator network (§07) | **NEEDS VERIFY** + Jakati flag |
| P14 | Brand partners named: `@canvaindia`, `@zingbus`, `@troovyfoods` | C | Brand slide | Logos in deck | Brands rail (§02) | **PART HOLD** — zingbus blocked by §18; Canva and Troovy already on the rail |
| P15 | "Proven Brand Partnerships" narrative | C | Brand slide | — | Influencer Marketing | **READY** |
| P16 | `@puravjha9` is Purav Jha's handle | C | Network slide | — | — | **SUPERSEDED (Rev 34).** The site publishes **`@puravjha`**, verified in Rev 17B against the live account whose own display name reads *Purav Jha* — and re-confirmed this phase. `@puravjha9` resolves to nothing; his YouTube is a third variant (`@Puravjha_`). **The deck's handle is a deck-side variant and is not published** |
| P17 | **“an average of more than 10 million views per creator”** (Trending Influencers) | B+C | p8 | No | — | **HELD** — an average over an unnamed, unbounded set. The site cannot state what it is an average *of*, so a reader cannot check it |
| P18 | **Premium Influencer names**: Elvish Yadav, Purav Jha, Harsh Beniwal, Faisal Khan (Faizu), Jannat Zubair, **Lovekesh Kataria**, JJ Communication, Tijara Vines, Round2hell | B+C | p9 | Portraits in deck | — | **HELD (unchanged, re-checked Rev 34).** Being named on a network slide is **not** the same evidence as a client-confirmed working relationship, and the two must not be collapsed. Only the names already in `WORKED_WITH` are published, with the wording that list carries. **No name was added to the site from this slide** |
| P19 | Mishram “manages production” on campaigns | B+C | p7 | No | Influencer scope (§05) | **HELD** — first-party copy, awaiting the same client confirmation outreach and negotiation got |
| P20 | **@xbhandesiri_ Reel view counts** — 70.9M, 40.3M, 33.9M (and 33.5M, 26.6M, 13.2M, 12.1M, 9.9M, 7.6M) | B | p3 capture | **YES — the capture carries the handle, the verified badge, the active Reels tab and Instagram's own view UI** | Current Management inset | **PUBLIC (Rev 33)** — three figures render as *Selected Reel views*, beside the screenshot they were read off |
| P21 | **139M / 111M** on the same account's grid | B | p2 capture | **YES — but the capture carries NO account header** | — | **HELD.** Stronger figures, weaker provenance. Used only as corroboration for P6's 130M+, never published as figures |
| P22 | **Immortal Kaka Ji** — a creator relationship | — | — | Photograph only | — | **HELD — RELATIONSHIP NOT VERIFIED.** Identity is established by the client's own filename; **nothing establishes a relationship.** The name appears in no `WORKED_WITH` entry, no roster entry, no brief section and **nowhere in the proposal**. A file sitting in `WEBSITE SHORTLIST` is not a relationship claim |
| P23 | Per-creator **Established / Trending** classification | B+C | p9 | No | — | **HELD, AND DELIBERATELY SO.** The taxonomy is published about the *network*; sorting named people into it would assert a characteristic the project cannot evidence — the §10b follower-count mistake in a different currency |
| P24 | **Swiggy branded content** — a real campaign frame | A | `PRASHANT VIDEO/Swiggy/IMG_3842.MOV` | **YES — Swiggy delivery boxes and the "Food you ♥ on time" tagline legible in frame** | 05 / Selected Work | **PUBLIC (Rev 35).** Brand relationship already evidenced by the collaborations rail (§10s). **No campaign, creator, date, deliverable, result or Mishram role claimed** |
| P25 | **Pintola branded content** — a product-integration frame | B | p6, *BRANDS WE'VE WORKED WITH* | **YES — Pintola® High Protein Muesli pack legible, presented to camera** | 05 / Selected Work | **PUBLIC (Rev 35).** Two sources: the rail's confirmed relationship and the deck placing the frame on its own brand-collaboration page. Same boundary as P24 |
| P26 | **Canva India** as displayed campaign work | B+C | p5 handle, p6 logo | **NO — logo and handle only** | — | **HELD.** The deck carries the Canva *wordmark* and `@canvaindia`, and no campaign frame anywhere. A logo is not a campaign: §08's rule that a rail relationship does not establish a specific deliverable |
| P27 | A publishable Mishram **campaign video** | A | Swiggy folder + `REELS - MISHRAM` | Audited frame by frame | — | **NO SAFE VIDEO SELECTED.** See the audit in Revision 35. The playback path stays built; `mediaType: "video"` plus `src` switches it on |

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
| `Lovekesh Kataria.jpeg` | Lovekesh Kataria | Excellent | **Influencer Marketing (05)** | Roster portrait — already spent, Rev 17B | Hero¹ | `/media/creators/featured/lovekesh-kataria.webp` 1000×1333 **+** `/media/services/influencer/lovekesh-kataria-worked-with.webp` 800×1000, 77KB | **LIVE (local) — two crops, two jobs. See Revision 32** |
| `Prashant Mishra.jpeg` | Prashant Mishra | Excellent | **`/about` → `now` (10)** | — | Hero, Creators, homepage About, Current Management, Selected Work, Recognition, service pages | `public/media/about/prashant-mishra.webp` 900×1200, 77.8KB | **LIVE (local)** |
| `Immortal Kaka Ji.jpeg` | Immortal Kaka Ji | Good | — | — | everywhere, pending | — | **HELD — no relationship record exists (Rev 34). Unblock is one client sentence** |
| `Shadab Hasan.jpeg` | Shadab Hasan | Good | — | — | everywhere, pending | — | **HOLD — brand safety** |
| `JJ Communication.jpeg` | JJ Communication | Good | — | — | everywhere | — | **BLOCKED — OPPO** |
| `award.jpg.jpeg` | Award | Graphic | — | — | **everywhere** | — | **REJECTED (Rev 36). Caveat ² proved correct** |
| `186F38BE-….HEIC` | Award evening | Excellent | **Recognition (06)** | — | About¹, Hero, Selected Work | `public/media/recognition/nufew-award-presentation-2024-25.webp` 1600×1200, 304KB | **LIVE (local)** |
| `03EBDAA5-…` / `Award.HEIC`, `4FCFF00A-…` | Award evening | Excellent | — | — | everywhere | — | **NOT USED — same pose, seconds apart** |
| `135279F4-…`, `CE81BFA5-…` | Award evening, step-and-repeat | Excellent | — | — | everywhere, pending | — | **HELD — 20+ brand sponsor wall, and a differently-scoped award** |
| `images.png` | Dermatouch (3rd party) | OK | **Brands rail (02)** | — | anywhere implying a creator | — | **RESERVED** |
| `circle logo mishram.jpg.jpeg` | Mishram mark | Good | **Social / profile avatar** | — | **Favicon** | — | **RESERVED** |
| `blue logo mishram.png` | Mishram mark | Vector-grade | **Light-surface brand mark** | Print / deck | Header³ | — | **RESERVED** |

¹ The Hero keeps its **original** square Lovekesh photograph — §18 locks that specific file because
the exposure tiers and `layout.ts` were composed against it. The Recognition photograph's
"do not repeat in About" is **advisory rather than absolute**: `/about` has read
`RECOGNITION_ITEMS[0]` since Revision 15, deliberately and at a different scale (a record inside the
company's story, not a chapter's subject). That reuse is architecture, not drift.
² It is a composite marketing graphic with baked-in typography and a URL, not a photograph. It will
fight the site's own type. Phase 09 should either crop to the trophy moment or ask for the original
photograph behind the graphic.
> **RESOLVED IN REVISION 36, and the third option was the right one.** Neither crop was needed:
> **the original photographs behind the graphic were already on the drive.** The cut-out figures in
> `award.jpg.jpeg` are lifted from `03EBDAA5-…`, one of five 3024×4032 first-party frames of the
> same evening. See Revision 36.
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
  > **PAGE CORRECTED IN REVISION 35.** The published capture is from **page 5 — “BRAND VIDEO &
  > VIEWS”**, not page 3; traced through the page objects’ own `/XObject` dictionaries. Better
  > provenance than the record claimed, and the asset and figures are unaffected.
  > **CORRECTED IN REVISION 33 — four of those six figures were transcribed wrong.** Re-read at
  > high zoom, that capture reads **139M · 111M · 70.9M · 58.3M · 58.3M · 58.1M**. The conclusion
  > is unaffected and if anything stronger (139M, not 135M), but **do not quote the old six**.
  > The capture also has **no account header**, which Revision 33 found is what disqualifies it
  > as the published proof asset — see P21.
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

---

## Revision 32 — Phase 05, Influencer Marketing

### Three findings that change what the next session should assume

**1 — The Phase 05 Lovekesh reservation was already half spent, and nobody noticed.**
`WEBSITE SHORTLIST/Lovekesh Kataria.jpeg` is recorded above as **RESERVED — Phase 05**. It was not:
**Revision 17B already produced `public/media/creators/featured/lovekesh-kataria.webp`** (1000×1333,
a 3:4 crop of the rotated original) and that file has been rendering on this very route ever since —
in the hero constellation, in the match-field backdrop and in the casting wall. The ledger row was
written before that revision and never corrected. **Corrected here.** The source is now allocated
twice, deliberately and to two different crops with two different jobs.

**2 — The proposal PDF's text layer decodes after all.** Revision 28 recorded that
*"the PDF's text layer uses subset-font encoding that does not decode to plain text"* and that the
Canva deck was the only readable copy. **`pdftotext -layout` (the mingw poppler build already on
this machine, `/mingw64/bin/pdftotext.exe`) extracts all nine pages cleanly.** That matters because
the Canva link now 301s to a `canva.com/design/.../edit` URL which returns **403** without a login —
so the deck is currently *only* readable through the PDF. Do not conclude the deck is inaccessible.

**3 — The Swiggy campaign material does not show a campaign.** See the audit below. This is the
phase's most consequential negative result, because the roadmap reserved those two files for exactly
this phase.

---

### Source audit — every candidate, and why

#### The reserved Swiggy frames — **HELD, and the reason is the frames themselves**

`Prashant - data/PRASHANT VIDEO/Swiggy/IMG_3865.HEIC` and `IMG_3866.HEIC`, already converted in the
Revision 17 staging tree. Both were opened and looked at.

| | Finding |
| --- | --- |
| Content | **Two near-identical frames of the same moment**: four people posing together in a small orange-walled room with an air conditioner, a bench, bags and a water bottle |
| Campaign context in frame | **None.** No set, no camera, no lighting, no crew, no product, no deliverable, no branding of any kind |
| Swiggy in frame | **Nothing.** The orange walls are the only thing suggesting it, and a wall colour is not a brand |
| Identity metadata | **None.** `IMG_3865` / `IMG_3866` — four unidentified people |
| Cross-reference | **`IMG_3866.HEIC` is byte-identical (md5 `0ac772cb…`) to `PRASHANT SIR - PICTURES/IMG_3866.heic`** and to the loose `IMG_3866.HEIC.heif` at the drive root. The same file sits in a person-named folder *and* a brand-named folder, so the folder name does not even establish the context unambiguously |

**Verdict: held.** Publishing either as *Swiggy campaign work* would assert a context the photograph
does not carry and the metadata does not establish — the §10u error, and the plan's own instruction
was *"do not assume context beyond what folder/file metadata and first-party material support."*
The folder name is a real signal; it is not evidence of what is in the frame. **To unblock: the
client confirms what the photograph is and who is in it.**

#### The proposal deck — 35 embedded images, all extracted and reviewed

Extracted by scanning the PDF for JPEG streams and mapped back to pages through the page objects'
`/XObject` dictionaries. Page numbers below are real, not inferred from order.

| Deck image | Page | What it is | Verdict |
| --- | --- | --- | --- |
| `img-023` | 4 | **Two people presenting a Troovy pack to camera.** Clean interior, blurred background, legible product | **USED — the campaign proof** |
| `img-018` | 3 | The Lovekesh corridor photograph — **the same frame as the shortlist file** | Corroborates first-party provenance. Not used from the deck; the shortlist original is higher resolution |
| `img-020`, `img-025` | 3 | **Inside an OPPO store** — `oppo` counter graphics, a *"…1 Series 5G"* display, retail shelving | **BLOCKED.** Identical to the `JJ Communication.jpeg` block. The deck being first-party does not reopen an OPPO decision |
| `img-022` | 4 | The Swiggy-folder group photo, in the deck | Held, as above |
| `img-029` | — | Two people in front of a coach with partial third-party operator livery | **HELD** — an unidentified third-party brand in frame (§18) |
| `img-013` | 1 | Award presentation | **Phase 09.** §18 forbids naming anyone in it |
| `img-000`–`img-011` | 2, 5, 6, 8 | Instagram post grids (135M/111M/70.9M/58.3M/56.3M/34.6M) and six profile screenshots with follower counts; Duolingo and Avvatar tiles | **Phase 06.** Registered, unpublished |
| the remaining ~14 | 1, 3, 4, 7, 9 | Relationship and meeting photographs — no campaign context, no identity metadata, various unconfirmed third-party environments | Not used |

#### Everything else on the drive

The complete still inventory was re-run: **44 image files outside the staging tree.** No new
candidate appeared. `Purav`, `Dr 69 - sagar bhai shoot +bts`, `RAMAH` and
`PRASHANT VIDEO/Swiggy/Funny edits` still contain **only `.MOV`**, so Revision 31's finding stands
and the Purav still blocker stays open.

---

### Media ledger — Phase 05

| | |
| --- | --- |
| **Source file** | `F:\Drive data\WEBSITE SHORTLIST\Lovekesh Kataria.jpeg` — 8064×6048 stored, **EXIF orientation 6**, 10.1MB |
| **Identity / context** | **Lovekesh Kataria**, from the client's own filename. No face was compared. Corroborated as first-party by the same frame appearing in the proposal deck (page 3) — the deck's *layout* was **not** used to infer which figure is which |
| **Role** | The hero constellation's **relationship node** — one photographic node of five inside the network story |
| **Production output** | `public/media/services/influencer/lovekesh-kataria-worked-with.webp` — **800×1000, 77KB**, 4:5, `.rotate()` first, extracted `{ left: 1620, top: 3000, width: 2800, height: 3500 }` of the rotated original |
| **Used in** | `/services/influencer-marketing` hero only, through `INFLUENCER_ANCHOR` |
| **Do NOT repeat in** | Homepage Hero, Current Management, Social & Personal Brand Growth, Creators, Brand Shoots |
| **Provenance** | First-party, client-supplied. Original untouched |
| **Status** | **LIVE (local)** |

| | |
| --- | --- |
| **Source file** | `WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf`, embedded image on **page 4** (`img-023`, 1286×1714) — the export of `canva.link/2zuy2cde0ar0kfd` |
| **Identity / context** | **A Troovy product presented to camera.** The pack is legible: *"THE HEALTHY PROTEIN PANCAKE"* with the Troovy script mark and giraffe. **Nobody in the frame is named** — the photograph carries no identity metadata and §18 rule 7 bars using a face |
| **Role** | The page's **only real campaign proof** |
| **Production output** | `public/media/services/influencer/troovy-branded-content.webp` — **1200×750, 46KB**, 16:10, extracted `{ left: 0, top: 390, width: 1286, height: 804 }`. Downscaled from 1286; no upscaling |
| **Used in** | `/services/influencer-marketing`, the campaign-context band inside `#creator-proof` |
| **Do NOT repeat in** | Anywhere. It is this page's single campaign frame |
| **Provenance** | First-party Mishram material. **Troovy is confirmed twice**: `@troovyfoods` under *Proven Brand Partnerships* (deck page 5) and the official mark already on the site's own rail since Revision 16 |
| **Status** | **LIVE (local)** |

**Creator-photo allocation stays separate from brand-logo provenance**, as before. The Troovy *logo*
row in the brand register is unchanged — the rail's asset is an official transparent PNG, and this
photograph is a different class of thing.

#### The ledger correction, restated as a row

| Source file | Crop | Production output | Section |
| --- | --- | --- | --- |
| `Lovekesh Kataria.jpeg` | 3:4, `{ 3800×5067 }` | `/media/creators/featured/lovekesh-kataria.webp` 1000×1333 | Roster portrait — **Revision 17B**, six sections site-wide |
| `Lovekesh Kataria.jpeg` | 4:5, `{ 1620, 3000, 2800×3500 }` | `/media/services/influencer/lovekesh-kataria-worked-with.webp` 800×1000 | Influencer hero anchor — **Revision 32** |

Two crops, two jobs, one source. The 3:4 is a portrait among portraits; the 4:5 is the relationship,
composed by testing which aspect held the pair largest **with the arm across the shoulder intact**.

---

### The relationship word

**`Worked with`.** Not *managed*, *represented*, *signed* or *exclusive* (§18). The deck names
Lovekesh Kataria among its *Premium Influencers*, which would have supported *creator network* — the
site's existing label for him — but the phase's default is the weaker word and there was no reason
to reach past it. It renders as a teal eyebrow above the name, inside the frame, on that one node.

---

### Homepage Service 02 — inspected at four states, deliberately unchanged

Captured active-pinned in both themes, at the 01→02 handoff, at the 02→03 handoff, and stacked at
390. **It already communicates a network being orchestrated**: four creators at four depths around
an abstract campaign board, three convergence arcs, and the annotations
`CREATOR NETWORK · CAMPAIGN STRATEGY · COLLABORATION · DISTRIBUTION`. That is the visual vocabulary
the phase asked for, already built.

Both possible replacements make it worse:

- **The new Lovekesh crop** would put the same photograph on the homepage and on the dedicated
  route's hero — **the exact same-file repeat Revision 31 spent the phase removing** for Zoya Jaan.
- **The Troovy frame** would put a real third-party brand into a scene §10 requires to have *"no
  brand marks and no figures."*

So the media stayed. **The homepage document height is byte-identical — 17,296px at 1440 and
16,784px at 390, matching the pre-phase capture exactly**, which is the proof that nothing moved.

---

### The dedicated page — what changed

**Two things, and nothing else.**

1. **The hero constellation gained a relationship node.** One of the five frames — the `lovkesh`
   node, already in the composition — now draws from `INFLUENCER_ANCHOR`: its own 4:5 production
   crop, 25% width instead of 22%, and the marker `Worked with` above the name. The other four
   nodes, the five arcs, the campaign node, the travelling signal, the parallax and the entry
   choreography are untouched. The arc to that node already terminated behind the photograph, so no
   geometry moved.

2. **The proof section gained a campaign-context band.** Inside `#creator-proof`, under the casting
   wall: the Troovy frame at `col-span-5`, three facts at `col-span-6 / col-start-7`, and one line of
   provenance. **No eleventh section was added.**

**Not touched, and each for a stated reason:**

- **The Creator Match Field.** §18 locks its constraint — the route runs through formats, never
  through people, and no intent changes which creator is emphasised. It uses **real roster
  portraits, not placeholder media**, so the phase's "replace placeholders" clause never fired.
- **The campaign system.** Objective → Creator Fit → Brief → Coordination → Launch + Learn already
  maps onto the brief's BRIEF → MATCH → COORDINATE → CREATE → LAUNCH → LEARN. Adding a sixth strand
  would break the five-strand braid for a word the page already carries.
- **The scope index.** Audited against the phase's list of nine supported capabilities; **all nine
  are already published** across the ten rows. Nothing was added and nothing was removed.

---

### Scope audit — and one capability held

The deck's *WHY PARTNER WITH US* page says Mishram's team manages *"the entire campaign journey,
from understanding the brand's objective and developing the right creative strategy to selecting the
most relevant creators, **managing production**, ensuring smooth execution, and delivering detailed
performance insights."*

**"Managing production" is not on the page and was not added.** It is a materially different promise
from the ten published rows, and this project has been here twice: §10l held *negotiation* back for
two revisions on first-party copy alone and only published it when the client confirmed that
specific thing. **Same treatment.** Recorded here as first-party-supported and awaiting
confirmation; one row when it comes.

Still absent and still deliberate: legal contracting, talent exclusivity, payment custody,
guaranteed performance, guaranteed virality.

---

### Metrics — none published, and the list is longer than it was

Nothing numeric was added anywhere. Withheld this phase, all of it from the deck:

`130 million+ views on a single Reel` · `135M / 111M / 70.9M / 58.3M / 56.3M / 34.6M` ·
`40M+ on a single branded video` · `100+ brands` · `1,000+ creator videos` · `billions of views` ·
`an average of more than 10 million views per creator` · every follower figure on the network,
viral-sensation and profile-screenshot slides.

**One new claim was found and registered rather than published:** the *Trending Influencers* slide's
*"average of more than 10 million views per creator."* It joins the register as unevidenced.

---

### Non-numeric deck material actually used

- **Provenance** for the Troovy relationship (`@troovyfoods`, *Proven Brand Partnerships*, page 5).
- **Corroboration** that the Lovekesh photograph is first-party Mishram material (page 3).
- The **campaign journey** (P5) — confirmed as already fully represented by the page's five stages,
  so it needed no new copy.
- The **two-tier network** (P4, Premium / Trending) — confirmed as already represented by the site's
  existing two-layer creator model. Not restated.

---

### Measurements

| Viewport | Before | After | Δ |
| --- | --- | --- | --- |
| 1440×900 | 10,930px | **11,357px** | **+427 (+3.9%)** |
| 1280×800 | 10,601px | 11,009px | +408 |
| 1024×768 | 10,234px | 10,636px | +402 |
| 768×1024 | 14,331px | 15,211px | +880 |
| 430×932 | 14,925px | 15,600px | +675 |
| 390×844 | 15,035px | 15,703px | +668 |

Per section at 1440 after: hero 900 · relevance 584 · match-field 1275 · campaign-system 987 ·
**creator-proof 1411 (was 984)** · scope 1115 · creator-fit 796 · who-its-for 652 · approach 674 ·
faq 683 · inquiry 1377 · nav 221.

**Where the height came back from.** The first build put the band at +509px. Rebalancing the frame
from `col-span-6` to `col-span-5` made the two columns end together instead of leaving dead space
under the text, and the casting wall's top gap came down one step — **−82px**. The band's own
boundary statement was then merged into the section's closing caption, so the page does not print
two disclaimers a screen apart. **The section gained real campaign evidence for 427px.**

### Performance

| | Homepage | `/services/influencer-marketing` |
| --- | --- | --- |
| Images | 22 → **22** | 15 → **16** |
| Lazy | 22 → **22** | 14 → **15** |
| Eager | 0 → **0** | 1 → **1** |
| `preload as=image` | 0 → **0** | 1 → **1** |
| New media weight | **0KB** | **+123KB** (77KB Lovekesh + 46KB Troovy) |

The one eager image is still the hero's above-fold anchor portrait, unchanged. **The campaign frame
is `loading="lazy"` with no preload**, as §16 and the phase both require. The Lovekesh anchor
replaces a roster crop at the same node, so it adds a node's worth of bytes rather than a node.

### Mobile — 390px

**Pass.** The constellation still reads as a network — five frames, the campaign node and five arcs
in the same arrangement. Both figures and the arm across the shoulder survive in the anchor. The
campaign frame is full width at ~318px, not a thumbnail. The facts list is three hairline rows. No
horizontal overflow in either theme.

**One real defect was caught in capture.** The anchor's tag is the only label on the composition
carrying two statements, and at the shared `0.2em` tracking it wrapped to **four lines and 44% of
the frame** at 390. Measured, not eyeballed: 48px of label in a 109px frame. `0.12em` and a 4%
inset below 640px put it back to three lines / 37px — one marker line plus the same two-line name
every other node already wraps to at that width. Desktop is untouched at 26px.

### Visual QA — 21 real composited captures

Dedicated route at 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and
dark, and 1440×900 under `prefers-reduced-motion`. Hero section clipped at 1440 in both themes and
at 390. Campaign band clipped at 1440 and 390 in **both** themes. Homepage Service 02 active in both
themes, the 01→02 and 02→03 handoffs, and the stacked chapter at 390.

**No horizontal overflow at any viewport, in either theme, reduced motion included.**

#### `scripts/shoot.mjs` — two capture bugs fixed, and both produced a wrong verdict first

1. **A clip is in document coordinates, not viewport coordinates.** A shot that scrolls somewhere and
   then clips at `y: 0` returns a **completely black frame**, because the region is not composited.
   The homepage Service 02 captures were black until the clip was moved to the shot's own `scrollY`.
2. **A section far below the fold composites black even with `captureBeyondViewport`.** Every earlier
   phase clipped sections near the top of the document, so this never surfaced. The reliable
   technique is: grow the viewport to the region's height, **sweep again** (resizing reflows the
   page, so the pre-resize measurement is stale and the `whileInView` elements below the new fold
   have never intersected — that produced a section with a visible label and nothing under it),
   re-measure, scroll, and capture the viewport with no clip.

`slotScroll(n)` was added for the pinned What We Do track: a scroll position in **slot units**,
resolved inside the page against the track's own box, so it survives any height change above it. A
hardcoded pixel offset silently captures the wrong service, which is not a failure a thumbnail shows.

**No dependency was added.**

### Held, and unchanged

| | |
| --- | --- |
| `JJ Communication.jpeg` | **BLOCKED — OPPO.** And the deck's own two OPPO-store frames are blocked by the same rule. **The environment was not cropped away to get past it** |
| `Shadab Hasan.jpeg` / `@shadabjakati1` | **HELD.** Still two different people until the client says otherwise. The unresolved brand-safety finding stands |
| Purav Jha | **Still no still.** Four folders, `.MOV` only. No frame was extracted |
| `Immortal Kaka Ji.jpeg` | **Still reserved for Phase 07.** A viable asset existed, so there was no reason to spend it |
| `Prashant Mishra.jpeg` | Still reserved for Phase 10 |
| Swiggy `IMG_3865` / `IMG_3866` | **Newly held** — see the audit above |
| Zingbus, Fun N Earn, VYRL, Duolingo | Unchanged. No hold was reopened, weakened or revisited |
| `Akash sagar 2nd.jpeg`, the three `AKASH COVER PHOTO` files | Unchanged — held and permanently revoked respectively |

### No-repeat, proved

`/media/services/influencer/` is a new directory and neither file existed before. The Hero reads
`/media/hero/creators/`, Current Management reads `/media/management/`, Social Brand reads
`/media/creators/`. **No source photograph allocated to the Hero, Current Management or Social &
Personal Brand Growth is used on this route**, and `ali fazal.jpeg`, `Akash sagar.jpeg` and
`Akash sagar 1st.jpeg` are untouched. The one shared source — `Lovekesh Kataria.jpeg` — is split
across two crops with two jobs, and that split is recorded above rather than left to be rediscovered.

---

## Revision 33 — Phase 06, the quick-scan proof layer

### The change that made this phase possible, and it was not technical

Every phase before this one recorded the same sentence: *the proposal's figures are unevidenced and
§1 forbids an unverified metric.* **The client has now asked the website to carry the same
information the brand-collaboration proposal already puts in front of brands.** That does not make
the figures verified by a third party — it makes them **first-party business claims, stated by the
business, approved by the business for publication**, which is the same class of evidence
`CONTACT`, `MANAGEMENT.statement` and the brand rail have always run on.

So the register below moves rows from *NEEDS VERIFY* to **PUBLIC** — and, just as importantly,
leaves four of them **HELD**, because approval to publish the proposal is not approval to publish
anything the proposal implies.

---

### The screenshot audit — and the capture with the best numbers is the one that lost

The deck holds **four captures of `@xbhandesiri_`'s Reels grid**. Two matter:

| Capture | Figures | Account header | Verdict |
| --- | --- | --- | --- |
| p2, cropped grid (647×800) | **139M · 111M · 70.9M · 58.3M · 58.3M · 58.1M** | **NONE** | **Not published.** Proves a set of view counts without proving whose |
| p3, full phone capture (716×1600) | 33.5M · 7.6M · 13.2M · 40.3M · 33.9M · 9.9M · **70.9M** · 26.6M · 12.1M | **Handle, verified badge, Reels tab active** | **PUBLISHED** |

**The whole decision is in that table.** §4 of the plan set four conditions — handle visible, metric
labels/context, figures visible, crop preserves provenance — and the capture with the spectacular
numbers satisfies two of four. Taking **70.9M with provenance over 139M without it** is the phase's
central call, and it is the same rule §18 rule 7 applies to faces: a figure whose account cannot be
seen is not evidence about that account.

**The two captures are demonstrably the same grid.** The p2 crop's second row is byte-for-byte the
p2/p3 family's first row — the same tile at the same 58.1M — and 70.9M appears in both. So the p2
crop *is* this account, one row higher. That chain is what lets 139M corroborate the 130M+ claim
while never being published as a figure.

**A transcription error was found and corrected.** Revision 29 recorded that capture as
*135M, 111M, 70.9M, 58.3M, 56.3M, 34.6M*. Read at high zoom it is
**139M, 111M, 70.9M, 58.3M, 58.3M, 58.1M** — four of six wrong. The conclusion was unaffected (and
139M is *stronger* than 135M), but the old six must not be quoted. Corrected in place above.

**The published crop removes exactly one thing.** `{ 0, 85, 716×1215 }` drops the phone's status bar
— clock, battery percentage, notification icons. Nothing else: **no figure altered, no label added,
no interface redrawn, no tile removed, no recolouring.** The row cut off at the bottom is cut by the
grid, not by a decision about which numbers to show.

---

### What is public, and the exact wording

| Value | Label | Source | Where |
| --- | --- | --- | --- |
| **130M+** | Views on a single Reel | Proposal p2, corroborated by the 139M tile | Homepage proof band, lead |
| **100+** | Brands worked with | Proposal p2 + p6 | Homepage proof band |
| **500+** | Creators worked with | Client, August 2026 | Homepage proof band |
| **1,000+** | Creator-led videos | Client Aug 2026 + proposal p2/p6 | Homepage proof band |
| **70.9M · 40.3M · 33.9M** | Selected Reel views | The p3 capture, rendered beside them | Current Management inset |

**Every label carries its claim's scope, and that is the label's job.** *Views on a single Reel*, not
"views" — the difference between the claim and `130M+ average` is one word, and it is that word.
*Brands worked with*, not "clients". *Creator-led videos*, not "campaigns". *Selected Reel views*,
not "average". Nothing anywhere is an average, a total, a monthly figure or a Mishram-attributed
result.

**The 1,000+ wording was reconciled, not changed.** The client said *promotional videos*; the deck
says *creator videos* / *creator-led videos*. Same figure, two nouns, and the site was carrying the
vaguer one. `Creator-led videos` ships: it is the client's own current wording, it is specific to
the business Mishram actually runs, and it cannot be misread as advertising spots. Both sources are
recorded on the record in `config/proof.ts`.

### What is held, and why each one

- **40M+ on a single branded video — RESERVED, not rejected.** It is a *campaign* result and
  Selected Work (Phase 08) is the page that argues campaigns. A fifth large number on the homepage
  would have turned an editorial index into the statistics board this layer exists not to be.
- **"Billions of views" — HELD on language.** Unbounded, uncheckable, and exactly the register §1
  forbids. The four public figures say the same thing with edges on it. Not scheduled for any phase.
- **The 139M / 111M figures — HELD on provenance.** See the audit above.
- **Every follower figure — HELD, unmappable.** Six handles against five figures on the network
  slide, and the six profile screenshots are a different set of creators. Re-checked this phase and
  still not mappable.
- **"An average of more than 10 million views per creator" — HELD.** An average over an unnamed,
  unbounded set. The site cannot state what it is an average *of*.
- **Everything discussed in planning for Current Management** — 30M average, 800K growth, a 100K
  starting point, 1B dashboard totals, 35% retention — **remains unevidenced and unpublished.** None
  appears in the screenshot, so none appears on the site.

---

### The architecture — one file, and no number in JSX

`src/config/proof.ts` is now **the only place a figure lives on this site.** Every record carries
`value`, `label`, `source`, `sourceType`, `confirmed`, an optional `proofAsset`, and `public`.
`public: false` renders nothing at all — no dash, no placeholder, no "coming soon" — the
self-suppressing pattern Recognition, Client Notes and `MANAGEMENT.metrics` already use. Held
figures are recorded there so the next session does not re-research them and cannot accidentally
render them.

`source` / `sourceType` / `confirmed` are **development-only**. No internal path, deck page or file
name reaches the DOM; the public surface carries one plain-English attribution line and nothing else.

---

### Placement — and it was the hypothesis, tested

```
Hero  →  Brands  →  Current Management  →  QUICK PROOF  →  What We Do
        recognition      relationship          scale          capability
```

**After Current Management, not before it.** A real managed creator outranks a number, and leading
with the figures would have made the figures the argument. A visitor who reads nothing but the first
three screens now knows which brands, which relationship, and how much work.

The band is **397px at 1440 — 0.44 of a viewport**, under the 0.45–0.7 target rather than over it.

### Design — an index, and every alternative refused

Four facts, hairlines, display numerals, small-caps labels. **No KPI cards, no stat tiles, no
bordered boxes, no icons, no circles, no rings, no animated count-up, no chart, no axis, no
sparkline, no percentage, no comparison.**

**The hierarchy is typographic and nothing else.** The reach fact leads at roughly double the scale
of the three operating facts, because one Reel's reach and the shape of the business are different
kinds of statement — flattening them into four equal cells would say they are not. Nothing is
coloured, boxed or marked to achieve it.

**A measured correction.** The first build split the row `1.15fr / 1.85fr`, which left the lead
column 180px wider than `130M+` needs and pushed the three operating facts into the last third of
the page — the band read as two separate things. `1fr / 2fr` closes it.

**Plum was not used.** §19 of the plan permitted a test only if the band materially benefited. It
does not: the band's whole argument is that it is *not* a highlighted panel, and a full-bleed plum
surface is the one treatment that would make it look like one. Three phases have now tested plum on
real surfaces and none found one.

---

### Current Management — the promise in the config came due

`MANAGEMENT.metrics` had been empty for five revisions under one written condition: *"A figure needs
a dated screenshot tied unambiguously to this account before it goes here, and `source` has to say
which one."* **The bar it was held against is exactly the bar it cleared** — and, as with §10ah's
photograph, the note written under the worst-case constraint is what made the unblock cheap.

The inset renders **the three figures and the screenshot they were read off, side by side**, so the
evidence is the other half of the block rather than a footnote. Three figures, not the nine the
capture shows: nine as type would be the dashboard §10t refused.

**It sits in the claim column's own headroom, and that is the whole reason it is affordable.** The
chapter's height is set by the photograph on the left, which ran **243px taller than the text beside
it** — measured, not assumed. Putting the inset there cost the section **173px** instead of its own
~470px, and the photograph stays the dominant object in the chapter.

**Still not a dashboard**: no chart, no axis, no bar, no percentage, no growth arrow, no comparison,
no timeframe, no total. And no analytics event was added — §17 of the plan asked for none, and the
existing `creator_profile_click` vocabulary is untouched.

---

### Creators — the deduplication, and a first attempt that was worse

The chapter set **500+** and **1,000+** at display scale above the worked-with index. Both figures
are still published; the proof band owns them now, in the third screen instead of the ninth.
Printing two of the band's four facts again, at display scale, six chapters lower turned the same
evidence into what a reader would fairly read as more evidence.

**The first attempt kept the block and replaced the numbers with a sentence. Captured, that was
worse:** a caps label plus prose sitting directly above *another* caps label plus prose read as the
same statement made twice in the same shape. So the sentence moved into `CREATORS_COPY.workedWithNote`
— a note that already existed and already framed the index — and the block went entirely.

`ScaleFact` and `CREATOR_SCALE` were **deleted rather than left exported and unused**, so nothing can
re-render them by accident. **The roster, the index, the leads, the profile links and the creator
interaction are all untouched.**

Chapter: **1,805px → 1,640px (−165px).**

---

### Numeric integrity — the repo-wide audit

Every occurrence of `130`, `135`, `139`, `111`, `70.9`, `40.3`, `33.9`, `40M`, `100+`, `500+`,
`1,000`, `1000+`, `billion` in `src/` was reviewed.

| Finding | |
| --- | --- |
| Values reachable by a component | `config/proof.ts` (four public, four held) and `config/management.ts` (three) — **and nowhere else** |
| `1,000+ Promotional videos` | **Gone.** The phrase survives only inside comments recording the reconciliation |
| Duplicate rendering of any figure | **None.** `CREATOR_SCALE` deleted; `PUBLIC_PROOF` is imported by exactly one component |
| Held figures reachable | **None.** `HELD_PROOF` is exported for documentation and imported by nothing |
| `SERVICE_SCROLL_VH = 130` | A viewport-height constant, not a metric. Untouched |
| `config/about-page.ts` | Its comment still forbids `"1000+ influencers"` on About — and About renders no statistic. §22 honoured |
| `config/service-influencer.ts` | Its boundary still says the page carries **no figure of any kind**, and it still doesn't. §23 honoured — no metric wallpaper on any service page |
| SVG path coordinates, hex colours | 11 further matches, all geometry. Reviewed, none is a metric |

---

### Measurements

| | Before | After | Δ |
| --- | --- | --- | --- |
| **Homepage, 1440×900** | 17,296px | **17,700px** | **+404 (+2.3%)** |
| `#current-management` | 958 | 1,131 | +173 |
| `#proof` | — | **397** | +397 |
| `#creators` | 1,805 | 1,640 | **−165** |
| Other viewports | — | 1280 · 16,658 / 1024 · 13,873 / 768 · 17,314 / 430 · 18,324 / 390 · 17,948 | — |

Comfortably inside the plan's ≤500–600px target, and the deduplication is why.

| | Homepage |
| --- | --- |
| New asset | `xbhandesiri-reel-performance.webp` — 560×950, **75.1KB** |
| Image nodes | 22 → **23** |
| Lazy / eager / preload | 22 / 0 / 0 → **23 / 0 / 0** |

**The homepage still has no eager image and no image preload**, which is the state §16 wants: the
Hero's photography is WebGL texture loading and nothing on this page competes with it for the first
megabyte. The proof screenshot is far below the fold and lazy.

### Mobile — 390px

**Pass.** The band renders as **single vertical editorial rows**, never four columns: `130M+` at
display scale on its own, then `100+`, `500+`, `1,000+` each with its label beneath. Every figure is
readable while scrolling past.

**One defect caught in capture.** At full column width the Reel screenshot rendered ~660px tall —
**taller than the relationship photograph above it**, which inverts the chapter. Capped at `17rem`
(272px wide, ~461px tall): the handle is still ~120px of legible type, all nine view counts still
read, and the photograph is the dominant object again.

### Visual QA — 25 real composited captures

Homepage at 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and dark,
and 1440×900 under `prefers-reduced-motion`. The proof band clipped at 1440 in both themes, 1280,
768, 390 in both themes and under reduced motion. Current Management with its inset at 1440 in both
themes and at 390. Creators after the dedupe at 1440 and 390. Both seams — Current Management → the
band, and the band → What We Do — at 1440 and 390.

**Horizontal overflow: unchanged, and proved rather than asserted.** The document overflows at
1024 and 768 exactly as §10ag registered for Phase 12. The same probe run against **live production
(Revision 27, which has none of this work)** returns the same numbers within ±1px — 390 → 496,
768 → 844, 1024 → 1038, 1440 → 1440 — and the offending elements are all `.collab-viewport` /
`.collab-track`, the brands marquee. **Zero overflowing elements inside `#proof`,
`#current-management` or `#creators` at 1024, 768 or 390.**

Worth writing down: at 390 `innerWidth` reports **496**, not 390, *because* the document overflows —
which is why `scrollWidth > innerWidth` reads false there. Compare `clientWidth`, not `innerWidth`,
when checking this defect.

### Untouched

Hero, the brands rail, all five service pages, The Mishram Difference, Work Process, Selected Work,
Client Notes, Recognition, About (the chapter and the page), Project Inquiry, the Footer, Supabase,
GA4 and the legal documents. `globals.css` is **purely additive** — three new rule groups, no
existing selector modified. No dependency was added.

---

## Revision 34 — Phase 07, the creator network refinement

### The finding that decided the phase: the reserved asset has no relationship

`WEBSITE SHORTLIST/Immortal Kaka Ji.jpeg` has been reserved for this phase since Revision 28. It
was searched for properly before anything was built with it:

| Where a relationship would be recorded | Result |
| --- | --- |
| `WORKED_WITH` — the client's confirmed relationship list, August 2026 | **absent** |
| `CREATORS` / `ROSTER` | **absent** |
| `WORKED_WITH_UNVERIFIED` — the names whose *handles* did not resolve | **absent** |
| `docs/PROJECT-BRIEF.md` | **absent** — no mention outside media-ledger rows |
| The proposal, all nine pages of text | **absent** — not in the Premium list, not anywhere |

**So: identity yes, relationship no.**

- **IDENTITY — VERIFIED.** The client supplied and explicitly named the file. That is the same
  evidence Ali Fazal, Akash Sagar and Lovekesh Kataria are published on.
- **RELATIONSHIP — NOT VERIFIED.** Nothing anywhere establishes one.

**The file being in `WEBSITE SHORTLIST` is not a relationship claim**, and the only records that
ever pointed at this phase are the ledger's own *allocation* rows — written in Revision 28 as
"where might this go", never as "what is this". A shortlist is a shortlist.

**HELD.** No production image was made. The unblock is one sentence from the client, and it is now
registered as **P22** rather than left implied by a reservation.

The photograph itself was inspected for the record: 2160×3840, **orientation 1** (no rotate needed),
two figures, café interior, good quality. Branded cups sit on the tables — ambient rather than a
placement, and moot while the relationship is unverified.

---

### What the chapter now says, and where it says it

The chapter answered *who* three times over — `CreatorMeta` labels every creator on the stage
individually, the roster note says it again, and the intro's lead said it a third time. **It never
answered the question a brand actually arrives with: what kind of network is this?**

Mishram's own proposal answers that in two categories. They now open the chapter:

> **ESTABLISHED** — Actors and creators with audiences already built, and personal brands people
> recognise.
>
> **TRENDING** — Fast-moving creators making the kind of short-form work that is in the
> conversation now.

Two halves on hairlines, in the intro's right column. **It replaced the lead sentence rather than
being added to it**, which is why the chapter got *shorter*.

**"Premium" was considered and rejected.** The proposal says *Premium Influencers*, and on a website
that reads as a pricing tier — the rate-card register this chapter has avoided since Revision 17.
`Established` carries the same meaning with none of the commercial edge. `Tier 1/2`, `A-list` and
`Micro/Macro` were never candidates.

**No promise of future virality.** *"in the conversation now"* describes what is already true.
*"Our creators consistently generate an average of more than 10 million views"* is the proposal's
own claim and it **stays held** (P17).

---

### The rule that shaped everything else: categories describe the network, never a person

**Not one name on this page is sorted into Established or Trending, and none should be.**

The proposal lists nine Premium Influencers — Elvish Yadav, Purav Jha, Harsh Beniwal, Faisal Khan
(Faizu), Jannat Zubair, Lovekesh Kataria, JJ Communication, Tijara Vines, Round2hell. **Being named
on a network slide is not the same evidence as a client-confirmed working relationship**, and
collapsing the two would publish a relationship claim the project cannot make. P18 stays held and
**no name was added to the site from that slide.**

Sorting real people into tiers would also be the §10b follower-count mistake in a different
currency: a characteristic asserted about a human being that the project cannot evidence. A general
statement about the network is both safer and truer, and it is the whole of what this phase
publishes. Registered as **P23**.

---

### Featured stage — audited, and deliberately unchanged

**Ali Fazal · Zoya Jaan · Nikita Kumawat · Lovekesh Kataria · Mukul Sharma · Vishnu Priya.**

Every question the phase asked was run:

| Question | Answer |
| --- | --- |
| Is Ali valuable here despite also being in the Hero? | **Yes.** Different production file — `featured/ali-fazal.webp` 1000×1333 against the Hero's `hero/creators/ali-fazal.webp` 620×1102 — and he is the stage's only `Worked With`, its strongest relationship label |
| Does the chapter over-repeat Lovekesh? | **Not within the chapter** — he appears once here. His other crops are on other routes, which is the ledger working as designed |
| Should a slot take a different verified creator already in production? | **There is no candidate.** Every published creator with an approved photograph is already on the stage. Akash Sagar is `published: false` on purpose — he has his own chapter |
| Would a change improve breadth? | **No.** Breadth would need a photograph the project does not have |

**The phase's own rule applies: "NO CHANGE IS ACCEPTABLE."** The six remain the strongest truthful
lineup, so the lineup did not move — and the category framing improved the chapter without forcing
a portrait.

---

### Worked-With Index — audited, four findings

**Eighteen confirmed relationships; twelve render in the index, two as leads, four filtered because
they are on the stage.** Structure untouched — not redesigned, not turned into a table.

**1 — A published outbound link was checked and stands.** The proposal says `@puravjha9`; the site
publishes **`@puravjha`**. Two first-party sources disagreeing on a live link is exactly what §17's
*"no link is better than the wrong link"* guards against, so it was resolved rather than left: the
live account's own profile title reads *"Purav Jha (@puravjha)"*, corroborating Revision 17B's
verification. `@puravjha9` resolves to nothing, and his YouTube is a third variant (`@Puravjha_`),
which is how these proliferate. **The site is correct; the register row was wrong and is corrected.**
This was the only handle checked — §18 rules out a broad sweep and nothing else was in conflict.

**2 — Five names carry no link, and that is a real state.** Allen Chaudhary, Manish Jain, Shadab
Jakati, Shubham Kochale and Famous Ram each have their reason recorded in
`WORKED_WITH_UNVERIFIED`. A name renders as a name — no dead link, no disabled control, no
"coming soon".

**3 — JJ Communication stays textual.** The relationship is confirmed and renders as
*Manish Jain · JJ Communications*. **The photograph stays blocked** — OPPO environment, §18 — and
was not cropped around.

**4 — Purav Jha stays textual.** Relationship confirmed, handle verified, and **still no still**:
four `Purav` folders, `.MOV` only. No frame was extracted and none should be.

#### The reputational flag, reported rather than acted on

**Shadab Jakati** carries an unresolved 2026 brand-safety finding — national outlets report an
arrest over a reel involving a minor, with a police complaint filed. §18 has flagged it since
Revision 17B and it is still open.

**The row renders.** He is a user-confirmed relationship, and §18's rule is that a real relationship
is not quietly deleted to tidy a page — removing him is the client's call, not this project's.

**What changed is that the client's call is now one line.** `WorkedWith.withheld` was added: a
development-only string that removes a row from the index entirely when set, in the same shape
`published: false` gives a creator and `visible: false` gives a brand. **Nothing sets it**, so no
row moved this phase. `withheld: "client decision, <date>"` is the whole of the future edit.

**A brand running outreach off this page should be told about this name before the campaign, not
after.**

---

### Metric restraint — held, and verified in the rendered DOM

The chapter's rendered text was probed rather than assumed:

| | |
| --- | --- |
| Follower counts | **none** — no figure, no "follower" anywhere |
| `500+` / `1,000+` | **absent.** Revision 33's deduplication is intact and was not reversed |
| `130M+` and every other proof-band figure | **absent** |
| Figure-like matches in the whole chapter | **one**, and it is the roster's own index number `05` beside *Mukul Sharma* |

The proposal's follower figures stay held on the same ground as ever — **six handles against five
figures**, still not mappable.

---

### Measurements

| | Before | After | Δ |
| --- | --- | --- | --- |
| `#creators`, 1440×900 | 1,640px | **1,618px** | **−22** |
| Homepage, 1440×900 | 17,700px | **17,678px** | **−22** |
| Other viewports (`#creators`) | — | 1024 · 1,550 / 768 · 2,274 / 430 · 2,594 / 390 · 2,538 | — |

**The chapter gained the category framing and got shorter**, which is the outcome the phase asked
for. Two reasons: the two halves sit in a column the intro already bottom-aligns against a
two-line headline, so the row's height never changed; and the roster note's opening clause —
which now repeated the framing above it — came out.

| | |
| --- | --- |
| New production images | **0** |
| Homepage image nodes | **23 → 23** |
| Lazy / eager / preload | **23 / 0 / 0 — unchanged** |
| Asset delta | **0KB** |
| Dependencies | none added |

### Mobile — 390px

**Pass.** The chapter reads: `03 / CREATORS` → headline → **ESTABLISHED** → **TRENDING** → featured
stage → talent index → worked-with roster. The two halves are full-width editorial rows on
hairlines — **no dual-column category cards, no follower grid**. Zero overflowing elements inside
`#creators` at 1440, 1024, 768, 430 or 390; the document-level overflow is the pre-existing brands
marquee, proved against production in Revision 33.

### Visual QA — 16 real composited captures

The chapter at 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and
dark, and 1440×900 under `prefers-reduced-motion`. Its three beats captured separately — intro and
category framing (1440 both themes, 390), talent index and stage, worked-with roster. Both seams:
**The Mishram Difference → Creators** and **Creators → 04 / Work Process**, the section order read
off `app/page.tsx` rather than remembered.

`scripts/shoot.mjs` gained `sectionScroll(selector, into)` — a scroll position resolved inside the
page against a section's own top edge, for the same reason `slotScroll` exists: a section offset
moves whenever anything above it changes height, and a hardcoded pixel value silently captures the
wrong beat.

### Untouched

Hero, the brands rail, Current Management, the Quick Proof band, all five What We Do scenes, every
service page, The Mishram Difference, Work Process, Selected Work, Client Notes, Recognition, About
(chapter and page), Project Inquiry, the Footer, Supabase, GA4 and the legal documents. **No
analytics event was added** — the handle links use the existing `creator_profile_click`.
`globals.css` is purely additive: one new rule group, no existing selector modified.

---

## Revision 35 — Phase 08, Selected Work and the branded-campaign proof

### What the chapter was, and why that was the wrong claim to be able to make

`05 / Selected Work` carried three items: `zoya-jaan.webp`, `mukul-sharma.webp`,
`nikita-kumawat.webp`. Each was the **same file already rendering in §03 Creators**, and two of them
in the Hero as well. They were honestly labelled — `Still / 9:16`, no invented campaign name, no
fabricated result — but they proved that Mishram photographs creators, not that it makes work for
brands. **On a chapter called Selected Work that is the wrong claim to be able to make.**

Two genuine branded-campaign frames now open it. Both are first-party, both carry a legible brand
that is **already on this site's own collaborations rail**, and neither claims anything the sources
do not establish.

---

### The extraction gap that hid the evidence

Phase 05 extracted the proposal's imagery by scanning for **JPEG streams**. The deck holds **113
image objects: 41 DCTDecode and 72 FlateDecode** — so seventy-two images were never looked at.

Decoding the Flate set changed two answers:

- **Pintola.** `img-028` had been catalogued in Phase 05 as *"three men, curtain background"*. At
  full resolution the centre figure is holding a **Pintola® High Protein Muesli** pack, wordmark and
  pack copy legible, with the person beside him pointing at it — a product-integration frame in the
  same grammar as the Troovy one. It sits on **page 6, *BRANDS WE'VE WORKED WITH***.
- **The rest of the Flate set is brand logo lockups** — Yash Raj Films, zingbus, Canva, Troovy,
  Navi, DermaTouch, Mamaearth, Swiggy, Instamart — plus decorative shapes. Two large exceptions: a
  cut-out **award photograph** with an alpha mask (Recognition, Phase 09 — out of scope here) and a
  2880×1800 canvas holding a letterboxed relationship photo with no campaign context.

**A page-mapping correction came out of the same pass.** Revision 33 recorded the published
Xbhandesiri Reel-performance capture as coming from **page 3**. Traced properly through the page
objects' `/XObject` dictionaries it is **page 5 — "BRAND VIDEO & VIEWS"**, which is better
provenance than the record claimed, not worse. Corrected here; the asset and the figures are
unaffected.

---

### The Swiggy frame Phase 05 could not find

Phase 05 examined the two **stills** in `PRASHANT VIDEO/Swiggy/` and correctly held them: four
people in a room, and **nothing Swiggy in shot**. That verdict stands for those two files.

**The branding is in the video, one folder over.** `IMG_3842.MOV` — 5.67s, 3840×2160 HEVC with a
-90 display matrix, so upright it is natively **2160×3840 (9:16)** — shows a content setup with
**Swiggy delivery boxes and the "Food you ♥ on time" tagline legible** in the foreground, food
styled across the table, a laptop and phones in shot.

**A folder name is a signal; the packaging in the frame is the evidence.** That distinction is the
whole reason this frame is publishable and the two stills are not.

---

### The video audit — NO SAFE VIDEO SELECTED

Every campaign-relevant clip was probed and sampled rather than dismissed.

| Source | Duration / format | Context | Verdict |
| --- | --- | --- | --- |
| `PRASHANT VIDEO/Swiggy/IMG_3842.MOV` | 5.67s · 4K HEVC · 9:16 · audio | **Real Swiggy branding** | **The still is better.** As motion it is a handheld take of people crossing a room — a phone video from a shoot day, not portfolio work. Fails rule 4 |
| `…/Swiggy/IMG_3847.MOV` | 3.79s · 4K · 9:16 | none | Selfie in a crowded room. No brand, no campaign |
| `…/Swiggy/Funny edits/IMG_3818.MOV` | 28.9s · 1080p | none | Person talking to camera in a plain room |
| `…/Swiggy/Funny edits/IMG_3822.MOV` | 37.2s · 4K 60fps | none | Vlog footage in public places, identifiable private individuals |
| `REELS - MISHRAM/CREATIVE REEL - ALL/…` | 16 folders, ~28 `.MOV` | none | Mishram's own in-house skits — *"asking for agency"*, *"WHERE IS OUR SOCIAL MEDIA MANAGER"*, *"100 followers"*, *"work load"*. Agency self-promo, no brand, no campaign |
| `…/14th work load/final.mp4` | 14.1s · finished | internal | Still held on §10t's three grounds: office humour, burnt-in captions describing two employees as a couple, third-party banner |

**No clip passes rule 4 — "suitable for a premium agency portfolio"** — and the one clip with real
branding produces a *better still than motion*. The phase's own instruction applies: **a strong
still-based index beats the wrong clip.**

The playback path is untouched and fully built. `mediaType: "video"` plus `src` switches it on with
no component edit — and there are **zero `<video>` elements in the DOM** today, so no decoder mounts.

---

### The final three items

| # | Title | Type | Relationship | Media | Result attached? |
| --- | --- | --- | --- | --- | --- |
| 01 | **Swiggy** | Branded Content | Worked with | Still / 9:16 | **No** |
| 02 | **Pintola** | Branded Content | Worked with | Still / 9:16 | **No** |
| 03 | **Mukul Sharma** | Creator Content | — | Still / 9:16 | **No** |

**Branded work leads.** A visitor who reads only the featured state sees a real brand.

**Mukul is the one creator item kept, and the reason is arithmetic rather than taste.** The lead
promises *creator content, campaigns and visual work*, so dropping creator content entirely would
make the lead wrong. Zoya Jaan and Nikita Kumawat both render in the Hero **and** §03, so either
would be a third appearance on one page; Mukul is on §03's stage and nowhere else on the homepage —
Revision 28 took him off the Hero. It is still a repeat, and it is the smallest one available.

**`relationship` is a new field** and it renders only where the collaborations rail already
evidences one. It is absent on creator content, and it is never upgraded to *managed*, *client* or
*campaign by*.

---

### Two brands that did not become items, and why

- **Troovy — deliberately not repeated.** It already carries the campaign-proof band on
  `/services/influencer-marketing` (§10aj). A second crop of the same photograph would put one piece
  of evidence in two places, which is the duplication Revisions 33 and 34 spent effort removing.
  §06's own rule: *do not duplicate Troovy merely to fill a slot.*
- **Canva India — held, and the reason is the phase's own rule.** The deck carries the Canva
  **wordmark** (page 6) and the handle `@canvaindia` (page 5) and **no campaign frame anywhere** —
  confirmed across all 113 image objects. §08: *do not create Selected Work items from a logo alone;
  a public collaboration relationship does not establish a specific campaign, deliverable, creator
  or result.* Registered as **P26**.

---

### The 40M+ claim — published once, attached to nothing

Phase 06 held it for exactly this chapter. It renders **above the work index**, on the chapter's own
hairline, beside the lead:

> **40M+**
> **VIEWS ON A SINGLE BRANDED VIDEO**
> Across Mishram's brand collaborations. Not attributed to the work shown here.

**Every word of the proposal's scope survives.** *"on a single video"* — not a total, not an average,
not a monthly figure. *"some of our brand collaborations"* — an agency-level statement about an
unnamed collaboration.

**The scope note is the load-bearing part, not decoration.** Nothing in any source identifies which
collaboration the figure belongs to, so naming one would turn a true agency claim into a false
client claim — and the figure sits inches from the words *Swiggy* and *Pintola*. That sentence is
what keeps them apart.

**No KPI band, no counter, no chart.** One figure, one line, and the work stays dominant.

`config/proof.ts` keeps the record at `public: false`, and the flag's meaning was tightened rather
than flipped: **it governs the quick-scan band only.** Setting it true would render the figure twice
on one page.

---

### What is never claimed on this chapter

- **No campaign name, brief, date, deliverable count or creator list.** The sources establish a
  brand and a frame; they do not establish a project.
- **No Mishram role.** Nothing says who did what, and *"agencies usually do these things"* is not
  evidence (§12). Strategy, sourcing, production and execution are all absent.
- **Nobody is named.** Neither photograph carries identity metadata, and §18 rule 7 bars using a
  face. Recognition sets the precedent: publish the moment, name no one.
- **No result on any item.** The chapter's single performance figure is agency-scoped and says so.
- **"Billions of views" — HELD, unchanged.** Unbounded, uncheckable, §1 forbids the register.

### Brand safety

Both published brands are on the collaborations rail with an official asset and a client-confirmed
relationship (§10s). **No held brand appears in any frame** — zingbus, Fun N Earn, VYRL, Duolingo
and all OPPO material are absent, and **nothing was cropped to get around a prior decision.** No
permanently excluded category is touched.

---

### Media ledger — Phase 08

| | |
| --- | --- |
| **Source** | `F:\Drive data\Prashant - data\PRASHANT VIDEO\Swiggy\IMG_3842.MOV` — frame at 5.0s of 5.67s |
| **Brand** | **Swiggy** — legible packaging in frame; relationship evidenced by the collaborations rail |
| **Context** | A content setup: styled food, branded delivery boxes, laptop and phones |
| **Production output** | `public/media/work/swiggy-branded-content.webp` — **620×1102, 52.8KB**, extracted `{ 180, 640, 1800×3200 }` of the upright 2160×3840 frame, saturation +6% for the HLG source and nothing else |
| **Section** | 05 / Selected Work, item 01 |
| **Video / still** | **Still.** The clip was audited and rejected — see the video table |
| **Relationship wording** | `Worked with` |
| **Result attached?** | **No** |
| **Do NOT repeat in** | Anywhere. It is this chapter's Swiggy frame |

| | |
| --- | --- |
| **Source** | `WEBSITE SHORTLIST/PROPOSAL - PDF (1).pdf` — embedded image on **page 6**, *BRANDS WE'VE WORKED WITH* (794×1412) |
| **Brand** | **Pintola** — `Pintola® High Protein Muesli` legible; relationship evidenced by the collaborations rail |
| **Context** | Product integration: the pack presented to camera |
| **Production output** | `public/media/work/pintola-branded-content.webp` — **620×1103, 73.0KB**. Uncropped; the source is already 9:16 |
| **Section** | 05 / Selected Work, item 02 |
| **Video / still** | Still |
| **Relationship wording** | `Worked with` |
| **Result attached?** | **No** |
| **Do NOT repeat in** | Anywhere |

**Media uniqueness.** `/media/work/` is this chapter's own directory and neither file existed
before. **No Hero photograph, no Current Management frame, no Social Brand creator imagery, no
Influencer Marketing Troovy crop, no Quick Proof screenshot, no Recognition asset and no Prashant
portrait is used here.** The one shared asset is `mukul-sharma.webp`, which was already in this
chapter and is the least-repeated of the three it replaces.

**Two posters retired**, and neither file was deleted: `zoya-jaan.webp` and `nikita-kumawat.webp`
still serve §03 and the Hero. Only this chapter's references moved.

---

### Measurements

| | Before | After | Δ |
| --- | --- | --- | --- |
| `#work`, 1440×900 | 1,036px | **1,137px** | **+101** |
| Homepage, 1440×900 | 17,678px | **17,779px** | **+101 (+0.6%)** |
| Other viewports (`#work`) | — | 1024 · 1,055 / 768 · 1,113 / 390 · 1,503 | — |

The growth is the 40M+ block in the intro's lead column. **No copy was cut to pay for it**, and the
alternative — dropping the scope note — is the one line that keeps the claim honest.

| | |
| --- | --- |
| New production assets | **2** — 52.8KB + 73.0KB = **125.8KB** |
| Homepage image nodes | **23 → 23** (two poster *sources* changed; no item added) |
| Lazy / eager / preload | **23 / 0 / 0 — unchanged** |
| `<video>` elements in `#work` | **0** at every viewport — no decoder mounts |
| Media requests added | **0 net.** Two new posters replace two that are no longer requested here |

**Still no eager image and no image preload on the homepage.** Selected Work is far below the fold,
`sectionInView` still gates everything, and the one-decoder-max and offscreen-pause rules are
untouched because no video mounts at all.

### Mobile — 390px

**Pass.** One work item at a time: heading → lead → the 40M+ line → a full-width 9:16 still with the
Swiggy boxes legible → `BRANDED CONTENT / Swiggy / STILL 9:16 — WORKED WITH` → the three-row index →
CTA. **No three-column metadata, no tiny campaign screenshot, no horizontal overflow** — zero
overflowing elements inside `#work` at 1440, 1024, 768 or 390.

### Reduced motion

Unchanged and correct: every item is a poster, so there is nothing to autoplay. The stage's clip
wipe becomes a short opacity swap, the crop and drift animations are off, and all three items stay
selectable. Captured at 1440 to confirm.

### Visual QA — 17 real composited captures

The chapter at 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932, 390×844 light and
dark, and 1440×900 under `prefers-reduced-motion`. **Each work item captured in its own selected
state** — Swiggy, Pintola, Mukul at 1440 and Pintola at 390 — plus both seams: 04 / Work Process →
Selected Work, and Selected Work → Recognition.

#### `scripts/shoot.mjs` — a `click` step, and a convergence bug worth writing down

**`click`** drives a real index button before the capture, so a selected state comes from the
component rather than from a prop set for a screenshot. A missed selector is reported, not silent.

**The section-capture routine now converges rather than resizing twice.** Growing the viewport to a
section's height reflows the document — and `02 / What We Do` is a `100svh + N×130vh` track, so its
height is a *function of the viewport height*. One resize moved every section below it by hundreds
of pixels, and a capture of `#work` came back showing the inquiry form. It now resizes, sweeps,
re-measures and repeats until the offset stops moving, then **asserts that the section actually
landed where the frame claims** before writing the file.

That assertion immediately reported every padded seam as `2 × pad` wrong — because the check itself
compared against 0 instead of `pad`. **The check was the bug, not the shot**, which is exactly the
kind of thing an assertion is for.

### Numeric integrity — the 40M audit

| | |
| --- | --- |
| `40M` on the rendered homepage | **exactly one occurrence**, inside `#work` |
| In the quick-scan proof band | **zero.** The band still reads 130M+ / 100+ / 500+ / 1,000+ |
| Attached to a brand | **no** — it renders above the index, before any brand name, with an explicit non-attribution note |
| "average" / "guaranteed" | **absent.** The only source matches are a comment saying what the claim is *not*, and an unrelated use of "guarantees" about decoding |
| Source occurrences | `config/work.ts` (the published record), `config/proof.ts` (the held register row), and two explanatory comments |

### Untouched

Hero, the brands rail, Current Management, the Quick Proof band, all five What We Do scenes, 03 /
Creators, The Mishram Difference, 04 / Work Process, Client Notes, Recognition, About (chapter and
page), Project Inquiry, the Footer, Supabase, GA4, the legal documents and every service page.
`globals.css` is purely additive — one new rule, no existing selector modified. No dependency, no
new analytics event.

---

## Revision 36 — Phase 09, Recognition and the real award photographs

### The phase's decisive finding: the supplied "award banner" is not an award banner

The plan reserved `WEBSITE SHORTLIST/award.jpg.jpeg` as the chapter's new banner. **It was opened
before anything was built with it**, and it is not what the plan assumed:

| | |
| --- | --- |
| What it is | **The proposal deck's cover artwork** — a Canva composite, 3920×2160, orientation 1 |
| Type it carries | `MISHRAM MEDIA` at poster scale · *"AN AWARD-WINNING / CREATIVE INFLUENCER & / DIGITAL MARKETING AGENCY"* · *"SCALING INFLUENCERS / CREATING CONTENT / BUILDING ICONIC DIGITAL CAREERS"* · **`www.mishram.media`** |
| Decoration | A vinyl disc, a saxophone, a guitar, a microphone, a squiggle, a striped circle — clipart belonging to no part of this site's design system |
| The figures | **A cut-out with the background removed.** Not a photograph of the moment |
| Award content | **None.** No award title, no `NUFEW` badge, no year, no organisation |

**So as evidence it is weaker than the asset it was meant to replace**, which at least carried the
badge. And as a banner it is the §10q defect in a new costume: a promotional graphic with its own
typography pasted onto an editorial page. §7 of the plan asked that the crop preserve "award title,
NUFEW branding, presentation language" — **there is none in the file to preserve**, and the only
thing left to crop to is a cut-out on a synthetic ground, which §7 also forbids.

**It is rejected, not re-cropped.** The plan's own §2 made this conditional — *"if it passes real
visual QA"* — and it does not.

### What was used instead, and it was already in the audit

The Revision 17 media audit called five root HEICs **"the single highest-value finding in this
audit"** and declined to act on them inside a creator-media revision, recommending a scoped
Recognition revision. This is that revision. They are genuine first-party **3024×4032** photographs
of the award evening — four times the resolution of the banner crop, and actually photographs.

**One correction to the audit's inventory.** `03EBDAA5-….HEIC` is no longer at the drive root; in
its place sits **`Award.HEIC` at exactly 3,265,980 bytes**, which is byte-for-byte the size the
conversion manifest records for `03EBDAA5`. The client has renamed the file. Same asset, and the new
name is first-party metadata confirming what it is.

### The five frames, audited

| File | Dimensions | Orientation | Group | Figures | In frame | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| `186F38BE-…` | 3024×4032 | 1 (upright) | Stage | 2 | Gold trophy held between them, ceremony LED backdrop, crowd, stage truss above | **PUBLISHED** |
| `03EBDAA5-…` (= `Award.HEIC`) | 3024×4032 | 1 | Stage | 2 | Same moment, seconds apart | Not used — duplicate pose |
| `4FCFF00A-…` | 3024×4032 | 1 | Stage | 2 | Same moment, seconds apart | Not used — duplicate pose |
| `135279F4-…` | 3024×4032 | 1 | Step-and-repeat | 1 | Engraved plaque, **20+ brand sponsor wall** | **HELD** |
| `CE81BFA5-…` | 3024×4032 | 1 | Step-and-repeat | 1 | Same, brighter and to camera | **HELD** |

**EXIF handled properly**: these were decoded by the Revision 17 Windows-Imaging-Component pass,
which resolves orientation at decode and strips metadata, so all five report orientation 1 and are
natively upright. **No `.rotate()` was needed and none was guessed at** — the stored pixel
orientation was measured, not assumed. `award.jpg.jpeg` is also orientation 1.

### Why the two step-and-repeat frames are held — two independent reasons

Either one would have made a genuinely different second frame, which is exactly what the archive's
unused fragment slot wants. Both are held anyway.

**1 — The backdrop is a sponsor wall, and it was read rather than glanced at.** Legible marks: NUFW,
VLCC Institute, Prima, Peplos Jeans, Stylox, Satmola, Inkz, Aagaaz Events, 360 Advertising
Production, Gopal's 56, HB Klyde Premier, D'Vomore, All India News, Samar Salon Academy, Ever Pure,
Mopwna Cling, MCF, Mr & Ms Next Super Models, SS Creation, hc, AC, PSM, and more.

**§9 was checked against every legible mark and none is a betting, gambling, casino, fantasy-gaming
or offshore-CFD brand.** That is a clean result and worth recording — but §18's *"a third-party
brand in frame is a brand claim"* does not survive twenty of them rendered at 946px. A step-and-
repeat is understood as an event's sponsor board rather than a client list; that is an argument for
publishing it, not a rule, and the rule is conservative.

Worth keeping: the wall also carries **Star Crown Media**, the agency's own 2021 name (§10f's
history band). Good corroboration that this is Mishram's own event presence — and not a reason to
publish the other twenty marks.

**2 — The plaque is a different award.** Read at full resolution it is inscribed to a **digital
partner** and addressed to an individual by name — not *Best Digital Marketing Agency*, and not to
the agency. Publishing it under §06's title would attach the wrong artifact to the claim. Registered
as **P29**.

### `NUFEW` vs `NUFW` — the finding this phase could not have made before

Reading the photographs at high zoom turned up a conflict invisible while the only evidence was a
rendered badge:

| Source | Reads |
| --- | --- |
| The promotional banner's gold badge (a designed graphic) | **`NUFEW`** |
| The event's step-and-repeat, repeated across the wall | **`NUFW`** |
| The engraved plaque in `CE81BFA5-…` | **`NUFW`** |
| The trophy's own plate in `186F38BE-…` | **`NUFW`** |

And the step-and-repeat prints the expansion legibly beside the mark:
**`NUFW — NEXUS UNIVERSE FASHION WEEK`.**

**The site keeps publishing `NUFEW` and it is still never expanded.** Three reasons in order:

1. It is the string the client's own material carries, and the one this phase was told to use.
2. A designer's badge and an engraver's die can disagree without either being the awarding body's
   legal name.
3. `NUFEW` → `NUFW` is a **one-character difference**, and resolving one of those unilaterally is
   precisely the §10u error — Shadab *Hasan* is still not Shadab *Jakati*.

**The expansion is not published either, and that is the subtle part.** `NEXUS UNIVERSE FASHION
WEEK` expands `NUFW`; the site prints `NUFEW`. Writing the expansion beside it would assert the two
are the same body, which is the open question. §18's rule survives Revision 36 intact.

**This is a one-word decision for the client**, raised in the same shape as the Shadab Jakati flag.
Registered as **P28**.

### Nothing new is claimed, and the illegibility was re-checked rather than inherited

The audit predicted the plaque inscription would still be illegible at full resolution. It is — and
so is the trophy's plate, whose usable area is roughly **117×125 source pixels**. Both were extracted
at native resolution and upscaled before the conclusion was drawn. **No award wording was read off
any photograph**, and the published title still comes from the banner's own display type via
Revision 13.

### People — nobody is identified, and one filename was refused again

Two figures are in the published frame and **neither is named**. §18 rule 7 bars a face, and the one
file in the library that names a presenter —
`…[ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴛʜᴇ ᴀᴡᴀʀᴅ ᴍʀ. ᴛᴜꜱʜᴀʀ ᴋᴀᴘᴏᴏʀ ᴅɪɢɪᴛᴀʟ ᴍᴀʀᴋᴇᴛɪɴɢ ᴍᴀɴᴀɢᴇʀ].webp` — is the exact case
§10p already ruled on twice. **A filename that names a person is not evidence of a person.** No
presenter, no recipient, no celebrity endorsement, nothing in the alt text.

### The composition — one photograph, and the label finally finishes

**One item, not three.** The three stage frames are the same pose seconds apart; two of them on one
page would be a scrapbook of a single moment, which §8 of the plan rules out. So the archive stays
in its count-adaptive **single-item** state and the chapter argues on one photograph.

Two changes, both driven by a capture rather than a preference:

1. **The split went 7 / 4 → 8 / 3.** With one photograph carrying the whole chapter, 824px did not
   read as proof and **946px does**. Both were rendered before the choice was made. `sizes` moved
   with it — `58vw → 66vw` — because a stale `sizes` is §10q's defect 4, and it is now commented as a
   pair that must be re-measured together.
2. **The chapter's action moved into the foot of the museum label.** Beside a 618px photograph the
   label bottomed out around 180px and left half a column of empty canvas. Anchoring the action to
   the column's foot finishes the label *and* removes the action's own band from the section — which
   is what paid for the wider frame. Implemented as a **slot on the shared primitive, not a fork**
   (§18): `RecognitionMedia.action`, passed only in the single-item state.

**`globals.css` was not touched at all.** The `.rcg-*` treatment §10e wrote — full colour,
`saturate(0.94)` at rest, hairline frame, canvas veil, hover strengthens rather than reveals — was
already correct for a real photograph, and needed a better photograph rather than a change.

### No gold, and this time none arrives through the image either

§10e's *"no gold: an awards section is not a licence to leave the palette"* has always been true of
the CSS. **It was not true of the picture.** The retired banner brought a rendered gold badge, a gold
rosette, gold hanging stars and a flat lilac field onto an obsidian page — the palette left via the
asset. The published photograph's only gold is **the trophy itself**, in shot, where §18 says any
gold tone should come from. Nothing was recoloured and nothing gold was added.

### Plum — tested on the surface it was being saved for, and rejected

§10af listed *"a Recognition surface (§09)"* as one of three places the token might legitimately go,
and it is the strongest of the three: an award chapter is the one genuine event surface on the page.
Option B — the whole section as a plum field with ivory content, the only usable form — was rendered
in both themes and at the Selected Work seam.

**Rejected, and the seam capture is the argument.** Three reasons:

1. **The seam is a hard flat slab with no transition**, exactly as §10ah found on Current Management,
   and gradients are off the table so there is nothing to soften it with.
2. **It fights the photograph.** The frame's tones are cool stage grey, skin, and one warm gold
   point; a plum field pulls a purple cast across all of it and turns the trophy's gold into a clash
   rather than the composition's single warm note.
3. **It re-creates the exact defect this phase just removed.** The retired banner failed because a
   flat lilac panel dominated an obsidian page. A full-bleed plum field reinstates that at section
   scale — with the real photograph sitting inside it, which is worse, because the *page* becomes the
   advertisement instead of the image.

**Four phases have now tested plum on real surfaces and none has found one**, and this is the
strongest refusal of the four because it is the surface the token was being held for. The test CSS
was removed; the diff carries no `!important` and no test rule. The token stays declared and unused.

### Measurements

| | Before | After | Δ |
| --- | --- | --- | --- |
| `#recognition`, 1440×900 | 1,232px | **1,239px** | **+7** |
| `#recognition`, 1280×800 | 1,152 | **1,150** | −2 |
| `#recognition`, 1024×768 | 1,021 | **1,003** | −18 |
| `#recognition`, 768×1024 | 1,255 | **1,235** | −20 |
| `#recognition`, 430×932 | 888 | **876** | −12 |
| `#recognition`, 390×844 | 858 | **846** | −12 |
| **Homepage, 1440×900** | 17,779px | **17,787px** | **+8 (+0.05%)** |
| Homepage, 1280 / 1024 / 768 / 430 / 390 | 16,742 / 13,987 / 17,457 / 18,413 / 18,082 | **16,739 / 13,969 / 17,437 / 18,401 / 18,070** | −3 / −18 / −20 / −12 / −12 |
| `/about` | 10,731px | **10,731px** | **0 — byte-identical** |

**The chapter gained a 15% wider frame and a real photograph and got *shorter at five of six
viewports***, because the action's own band came out of the section. 1,239px is **1.38 viewports**,
inside the plan's 0.9–1.4 band.

### Performance

| | Before | After |
| --- | --- | --- |
| Production asset | `mishram-…-nufew-2024-25.webp` 775×581, **86.9KB** | `nufew-award-presentation-2024-25.webp` 1600×1200, **303.6KB** |
| Assets in `public/media/recognition/` | 1 | **1 — replaced, not added** |
| Homepage image nodes | 23 | **23 — unchanged** |
| Image nodes in `#recognition` | 1 | **1** |
| Lazy / eager / preload | 23 / 0 / 0 | **23 / 0 / 0 — unchanged** |
| Delivered at 1440 @1x | 750×600, **20.9KB** | 1080×810, **126KB** |
| Delivered at 1440 @2x | capped at 775 | 1600×1200, **283KB** |
| Delivered at 390 @2x | — | 750×563, **72KB** |
| `<video>` / new dependency | 0 / none | **0 / none** |

**The homepage still has no eager image and no image preload** — the state §16 wants, and the
Recognition image still carries neither `priority` nor `loading="eager"`; the prop does not exist on
`RecognitionMedia` to reinstate.

**The delivered increase is real and it is the honest cost of the swap.** A flat three-colour
promotional graphic compresses to 21KB; a high-ISO night photograph of a stage and a crowd does not.
What the extra bytes buy: the old asset was a **775px source rendering into an 824px box — the
browser was upscaling it**, which is §10q's defect 4 in its original form and why the award "came
back soft". The new one renders 1080px into a 944px box and is downscaled at every viewport. It is
below the fold, lazy, unpreloaded, and it is the only image in the chapter.

### Mobile — 390px

**Pass.** The chapter reads `06 / RECOGNITION` → *Work that gets noticed.* → lead → hairline →
**full-width 4:3 photograph at ~348px** → `Best Digital Marketing Agency` → `NUFEW · 2024–25` →
caption → action. Both figures and the trophy are clear, no head cut, no thumbnail, no photo mosaic,
and **zero overflowing elements inside `#recognition`** at 1440, 1280, 1024, 768, 430 or 390.

**No responsive art direction was needed, and that was measured rather than assumed.** §20 warned
against holding an ultra-wide desktop ratio on a phone — but the frame is 4:3, not ultra-wide, and
the two figures fill it at every width, so a second mobile crop would have added an asset and a
second crop decision for no gain. The single frame is correct at every viewport.

### Visual QA — 30 real composited captures

**After state, 16:** the chapter at 1440×900 light and dark, 1280×800, 1024×768, 768×1024, 430×932,
390×844 light and dark, and 1440×900 under `prefers-reduced-motion`; the evidence frame at reading
distance at 1440; both seams — **05 / Selected Work → Recognition** and **Recognition → 07 / About** —
at 1440 plus the Work → Recognition seam at 390; and `/about` at 1440 and 390 plus its
`#on-the-record` chapter, because that route reads `RECOGNITION_ITEMS[0]` and a change here reaches
it.

**Baseline, 7**, captured before anything was edited, which is what the before/after measurements are
read off. **Plum A/B, 3** — both themes and the seam. **Intermediate, 4**, one per composition
decision: the asset swap alone, the action moved into the label, and the 8 / 3 split.

**Every viewport in the after set was looked at, not just probed.**

- **Selected Work → Recognition** reads as the narrative the plan wanted: a real branded still and
  `Create with us ↗` close §05, one hairline, generous space, then the award moment. **No filler
  paragraph was inserted between them.**
- **Recognition → About** steps from a photograph-dominant chapter to a purely typographic one, which
  is the contrast §16 of the plan asked for. **About was not touched**, and Phase 10 is not
  pre-empted.
- **Reduced motion**: every element renders at full opacity — label, headline, lead, hairline,
  photograph, caption and action were each checked rather than inferred from a page count.
- The document-level overflow at 1024 and 768 is the **pre-existing brands marquee** registered for
  Phase 12 (§10ag, re-proved against production in §10ak). Zero overflowing elements inside
  `#recognition` at any viewport.

A hairline that looked truncated in the first capture was **measured rather than fixed**: the rule
is 1313px, `transform: none`, `opacity: 1` — full content width. `bg-line` is 10% ivory on obsidian
and simply falls below the eye against the grid behind it. No defect, and no change was made to
chase one.

`scripts/shoot.mjs` gained the Phase 09 shot list — the chapter, its evidence frame, both seams, and
the two `/about` consumers. **No dependency was added.**

### Media ledger — Phase 09

| | |
| --- | --- |
| **Source file** | `F:\Drive data\186F38BE-342B-4E0F-8847-9645F42AEFE0.HEIC` — 3024×4032, orientation 1, first-party, one of five frames of the same evening |
| **Staging** | `_website-converted-jpg/186F38BE-….jpg` (Revision 17 WIC pass — orientation resolved at decode, all EXIF stripped) |
| **Identity / context** | **An award presentation at the NUFEW 2024–25 ceremony.** Nobody in the frame is identified; no face was compared, matched or recognised |
| **Role** | The chapter's single piece of evidence — the dominant frame of the archive's one-item state |
| **Production output** | `public/media/recognition/nufew-award-presentation-2024-25.webp` — **1600×1200, 303.6KB**, 4:3, `extract{left 560, top 1360, 2000×1500}` then downscaled. **Pure crop and downscale** — nothing recoloured, retouched, sharpened, denoised, generated, added or removed |
| **Crop reasoning** | The top edge sits below the stage truss, which carries an unrelated event-production vendor's banner. Nothing else legible in frame is a brand — the backdrop is the ceremony's own LED graphic — so **no §18 decision was cropped around**; an irrelevant vendor banner was framed out, which is art direction |
| **Chosen by looking** | Over the two near-identical frames of the same pose: this one holds the trophy highest and most centrally with both faces to camera |
| **Used in** | `06 / Recognition` (homepage) **and** `/about` — the archive board's recognition fragment and the `#on-the-record` chapter, both of which have read `RECOGNITION_ITEMS[0]` since Revision 15 |
| **Do NOT repeat in** | Hero, Selected Work, Creators, Current Management, the Quick Proof band, any service page |
| **Provenance** | First-party, client-supplied. Original untouched and never moved out of `F:\Drive data` |
| **Status** | **LIVE (local)** |

| Retired | |
| --- | --- |
| **File** | `public/media/recognition/mishram-best-digital-marketing-agency-nufew-2024-25.webp`, 775×581, 86.9KB |
| **What it was** | A crop of the old deployment's Cloudinary promotional banner — a cut-out composite on a flat lilac field with a rendered gold badge, gold rosette and clipart stars |
| **Action** | **Deleted from the repo.** It is a generated derivative, it was referenced only through `RECOGNITION_ITEMS[0].image`, and nothing else on the site pointed at it. The Cloudinary original is not ours and was not kept |
| **Source originals** | **Untouched.** Nothing in `F:\Drive data` was modified, moved or deleted |

**The aspect stayed 4:3 deliberately.** `/about`'s `ArchiveBoard` hardcodes a `4 / 3` recognition
fragment and `AboutCredibility` follows `item.aspect`; holding the ratio is what let this phase
upgrade the photograph on two routes **without editing About**, which was out of scope. Anyone
changing the dominant item's aspect must re-check both.

### What is still held after this phase

| | |
| --- | --- |
| `award.jpg.jpeg` | **Rejected** — a marketing composite with baked-in type and a URL, and no award content |
| `135279F4-…`, `CE81BFA5-…` | **Held** — 20+ brand sponsor wall, and a differently-scoped award (P29) |
| `03EBDAA5-…` / `Award.HEIC`, `4FCFF00A-…` | **Not used** — the same pose as the published frame |
| `…[ᴛʜᴀɴᴋꜱ ꜰᴏʀ ᴛʜᴇ ᴀᴡᴀʀᴅ…].webp` | **Held** — 846×1057, and its filename names a person, which is not evidence (§10p) |
| A second award, press feature, ranking or nomination | **NONE EXISTS.** Nothing was invented, and no "award-winning since" phrasing was added anywhere |
| The `NUFEW` expansion | **HELD** — see P28 |
| Every name in the photograph | **HELD** — §18 rule 7 |

### Untouched

Hero, the brands rail, Current Management, the Quick Proof band, all five What We Do scenes, 03 /
Creators, The Mishram Difference, 04 / Work Process, 05 / Selected Work, Client Notes, About (the
chapter and the route), Project Inquiry, the Footer, Supabase, GA4, the legal documents and every
service page. **`globals.css` was not modified at all** — no rule added, none changed. No dependency,
no new analytics event, no copy change to any other section.

---

## Revision 37 — Phase 10, About and the person behind the work

### The role question, answered by searching rather than by taste

This phase turns on one decision: **does the site print a title next to the name?**

Every first-party source the project holds was searched before anything was designed:

| Source | Says |
| --- | --- |
| Old site `about.html:1347` — the visible team block | **Founder & Chief Marketing Officer** |
| Old site `about.html:101-104` — schema.org `employee` | the same |
| The old site's own `llms.txt` | the same |
| **`@filmybande`** — Mishram's *current* public Instagram (§10s) | display name **"Prashant mishra"**, bio *"Talent Management"*, `mishram.media` story highlight |
| **`SOCIAL_URLS.linkedin`** — supplied by the client, Revision 16 | `linkedin.com/in/**prashant-mishra-mishram-media**` |
| The first-party proposal deck, all nine pages | **no role for anybody** |
| This project's own configs | record the title only as *step 4 of the management evidence chain* |

**So the title is first-party — and historical.** The content-migration audit's verdict is precise and
still stands: *"'Founder' and 'CMO' are separate claims and only the first is corroborated"* —
classified **B, needs current confirmation**. §10r then locked **"NO TEAM AND NO FOUNDER"** on the
ground that publishing a historical employment record as a current one is the class of claim §1
forbids.

**Nothing found this phase changes that, so nothing here reverses it.** The two *current* sources
both corroborate that he is the person Mishram's public channels run through — the agency's own
Instagram is an account publicly named "Prashant mishra", and the agency's own LinkedIn is his
personal profile — and **neither states a title.**

> ### PRASHANT PUBLIC ROLE FOUND IN FIRST-PARTY SOURCES: **NO VERIFIED CURRENT ROLE**
>
> *Founder & Chief Marketing Officer* exists in Mishram's own former markup, is **corroborated only
> as "Founder" and only partially**, and is registered **HELD** as **P31**. The site publishes the
> name, an entity line and a real link. **It publishes no title.**

**The unblock is one line**: `ABOUT_PERSON.role` in `config/about-page.ts`. The component already
renders it under the name, so confirming the title is a config edit and not a design change.

### Identity, and the folder that establishes nothing

**`WEBSITE SHORTLIST/Prashant Mishra.jpeg` is the only Prashant photograph the project may use**, and
that is a finding rather than a shortage.

`Prashant - data/PRASHANT SIR - PICTURES/` holds seven further stills, reserved for this phase by
Revision 31. All seven were inventoried and **all seven are `IDENTITY UNKNOWN`** under §18 rule 7 —
*a folder name says whose folder it is, not who is in the frame.* That is the rule Revision 17B cost
a whole revision to learn, and it applies here exactly.

| File | Upright | Figures | What is in frame | Verdict |
| --- | --- | --- | --- | --- |
| `IMG_2344.jpg` | 2268×4032 | 1 | A cinema lobby, a film-quote pillar, third-party cinema branding | **IDENTITY UNKNOWN** + third-party brand |
| `IMG_2719.heic` | 3024×4032 | 1 | A person in a Spider-Man mask on a sofa | **IDENTITY UNKNOWN** — a masked subject cannot be attributed at all |
| `IMG_3727.heic` | 2268×4032 | 2 | A fast-food interior, third-party food branding and signage | **IDENTITY UNKNOWN** + third-party brand |
| `IMG_3866.heic` | 2268×4032 | 4 | Byte-identical to the held Swiggy-folder still | **IDENTITY UNKNOWN**, already held (Rev 32) |
| `IMG_4009.PNG` | 1170×2532 | — | A phone screenshot *of* a photograph | Reject — not a photograph |
| `IMG_7679.JPG` | 4284×5712 (orientation 6) | 2 | Two people on a sofa presenting an unidentified product carton | **IDENTITY UNKNOWN** + unidentified third-party product |
| `IMG_7680.JPG` | 4284×5712 (orientation 6) | 2 | The same moment | Same |

**So §6 of the plan's preferred two-photograph allocation is not available**, and the plan's own
fallback is what shipped: *"If only one photo is strong — use it in the dedicated About page only."*

### The photograph, and the crop chosen by looking

| | |
| --- | --- |
| Source | `F:\Drive data\WEBSITE SHORTLIST\Prashant Mishra.jpeg` — client-supplied and **client-named**, which is the whole of the identity evidence |
| Stored | **8064×6048 with EXIF orientation 6** → 6048×8064 upright |
| Orientation | **`.rotate()` called first, every time.** Sharp does not auto-rotate; §10af recorded that skipping it silently ships a sideways person, and the output's pixel orientation was verified rather than assumed |
| Figures | **1** — the only single-figure file in the whole shortlist |
| Content | Seated on a stump in a styled interior set. Informal: sunglasses, an open shirt |
| Production | `public/media/about/prashant-mishra.webp` — **900×1200, 77.8KB**, 3:4, `extract{left 1616, top 2200, 2600×3467}`. **Pure crop and downscale** — nothing retouched, recoloured, enhanced, relit, background-replaced or generated |

**A full-length environmental 4:5 was rendered first and rejected**: the styled set's yellow
dominated the figure, and at section scale it would have repeated Phase 09's retired-banner problem —
a bright flat field taking over an obsidian page. **3:4 head-to-lap makes the person the subject and
the set context**, and 3:4 is the aspect §10b already established as this site's portrait crop.

**The sunglasses and the set stay.** They are in the photograph, §15 forbids altering it, and the
alternative — no photograph — is what the page had for five revisions.

### Where it went, and what paid for it

**`/about` → the `now` chapter**, which is the present-tense chapter and the right home for a person
who is here today rather than a historical artifact. Not the hero board (§18 locks its five
fragments as five separate chapters), not `origin` (that would file him as history), and not
`on the record` (that files a person under evidence).

**It sits in the left column's own headroom** — the §10ah / §10ak move. The chapter's height was set
by the body paragraphs on the right while the left held a headline and a locator with a third of a
column empty beneath them.

**Then a measured correction.** With the portrait in, the left column ran **243px past the right** and
the chapter was taller than it needed to be. Moving the `WHERE WE WORK · INDIA` locator to the foot
of the **right** column balanced them and **took 59px back** — and it reads better in both layouts:
the locator now closes the chapter instead of interrupting it before the body, which is also the
better stacked order below `lg`.

**§10f's five-revision-old note came due**, which is the third time in this programme a note written
under the worst-case constraint made the unblock cheap: *"A genuine agency or BTS photograph would
slot into the right column if the client supplies one."*

### The homepage About preview — inspected, and deliberately unchanged

**`config/about.ts` and `components/about/About.tsx` are untouched, and the homepage is
byte-identical at every viewport.** Four reasons, in order:

1. **There is only one identified photograph and it is allocated to `/about`.** Putting the same file
   on both surfaces is the same-file repeat Revision 31 spent an entire phase removing for
   `zoya-jaan.webp`. §6 of the plan anticipated this and authorised exactly this outcome.
2. **The preview already makes the positioning the plan asked for.** Its one paragraph reads
   *"a creative growth and digital agency working with brands, businesses and established Indian
   creators — social, influencer marketing, performance and digital experiences"* — §11 satisfied
   already: it is **not** described as an influencer agency. Its history line carries the creator-first
   → broader-practice arc §12 asks for.
3. **Revision 16 made this a preview on purpose**, and §10f wrote the test: *"If this chapter needs
   to say more, that is a signal `/about` is not doing its job."* `/about` is now doing that job
   better, which is an argument for leaving the preview alone rather than growing it.
4. **§18 of the plan asks the homepage not to inflate.** A human module here would add height for a
   claim the page one click away now makes with a photograph.

Recorded as a deliberate no-change, in the same shape as Phase 04's Service 01 scene, Phase 05's
Service 02 scene and Phase 07's featured stage.

### What is never said

- **No title.** Not Founder, CEO, Managing Director, Creative Director or Owner. See P31.
- **No biography.** No years of experience, education, achievements, brand count, "visionary
  founder", "serial entrepreneur" or "industry leader". The project holds no first-party source for
  any of it.
- **No team grid.** Three further names sit in the old `employee` array, all **B**, none
  corroborated, every headshot a placeholder GIF. **One evidenced person does not make a team
  section**, and a team section with one filled slot is worse than none (P33).
- **No city, office or address.** `INDIA` only, and it is not placed beside the person (P34).
- **No metric.** `100+`, `500+`, `1,000+`, `130M+` and `40M+` are all absent from both About
  surfaces, as is every follower figure, the Xbhandesiri Reel screenshot and any second rendering of
  the award.
- **No fourth chronology moment.** No 2026, and no "today" milestone for visual balance.
- **No role in the alt text.** *"Prashant Mishra, photographed seated on a styled interior set."* —
  §26's rule, applied.

### Recognition, re-verified rather than assumed

`/about` reads `RECOGNITION_ITEMS[0]` in two places, so Revision 36's award swap reaches this route.
**Both were captured again this phase and both are correct**: the archive board's 4:3 recognition
fragment and the `on the record` chapter's record-scale frame, with `Best Digital Marketing Agency` /
`NUFEW · 2024–25` and the caption unchanged. **No crop or layout issue was introduced, so no fix was
made.**

**The `NUFEW` / `NUFW` discrepancy stays held exactly as Revision 36 left it** (P28). Not resolved,
not expanded, not touched.

### Plum — not tested, and that is the decision

Four phases have now rendered `#4c3660` on real surfaces — the global canvas, the Brands rail,
Current Management, the Quick Proof band and Recognition — and **not one found a home for it**,
including the award chapter it was explicitly being saved for (§10an).

**No further test was run in Phase 10**, deliberately. The evidence is sufficient and another QA
cycle would spend real time re-deriving a settled answer. **PLUM REMAINS DECLARED AND UNUSED.**

### Measurements

| | Before | After | Δ |
| --- | --- | --- | --- |
| **`/about`, 1440×900** | 10,731px | **10,897px** | **+166 (+1.5%)** |
| `/about` at 1280 / 1024 / 768 / 430 / 390 | 10,489 / 10,072 / 12,965 / 13,385 / 13,424 | **10,653 / 10,191 / 13,226 / 13,615 / 13,654** | +164 / +119 / +261 / +230 / +230 |
| `#now`, 1440 | 708px | **874px** | **+166** |
| `#hero` · `#origin` · `#disciplines` · `#practice` · `#principles` · `#on-the-record` · `#project-inquiry` | 1,000 · 2,490 · 1,199 · 1,068 · 879 · 1,329 · 1,377 | **identical, all seven** | **0** |
| **Homepage, every viewport** | 17,787 / 16,739 / 13,969 / 17,437 / 18,401 / 18,070 | **identical** | **0** |
| Homepage `#about` | 718px | **718px** | **0** |

**The entire change is contained in one chapter**, which the six unchanged section heights prove
rather than assert. `+166px` is **+1.5%** on a 10,731px page, and it buys the one thing the route has
never had.

### Performance

| | `/about` before | `/about` after | Homepage |
| --- | --- | --- | --- |
| Image nodes | 8 | **9** | **23 → 23** |
| Lazy | 7 | **8** | 23 → 23 |
| **Eager** | 1 | **1 — unchanged** | **0 → 0** |
| **`preload as=image`** | 1 | **1 — unchanged** | **0 → 0** |
| New production asset | — | **77.8KB** on disk | **0KB** |
| Delivered (1440 @2x) | — | **384w variant, 17.9KB** | — |

**The portrait is `loading="lazy"` and no preload was added.** §24 asked for a measurement before
deciding whether a portrait justified an eager image: it does not — the route's single eager image
and single preload are still the archive board's own dominant creator fragment, the genuine LCP
candidate, and the person sits ~9,000px down the page. **Delivered weight is 17.9KB**, because the
frame renders at 182px and Next serves a 384w variant into it.

### Mobile — 390px

**`/about`: pass.** The `now` chapter reads `NOW` → *Still evolving. Still building.* → **portrait +
name + `MISHRAM MEDIA` + `LinkedIn ↗`** → the two body paragraphs → `WHERE WE WORK · INDIA` → the
closing statement and CTAs. The portrait is 134px beside the name block — **an editorial byline, not
a montage** — and there is no sideways timeline and no dense biography.

**Homepage: unchanged**, 745px at 390, still concise.

**Zero overflowing elements** introduced. The three that `main` reports on `/about` are the inquiry
form's **off-screen honeypot** — `DIV.inq-honeypot`, its label and `INPUT[name=company-website]` —
present identically before this phase, and §10u already recorded that as what a honeypot is.

### Visual QA — 32 real composited captures

`/about` at 1440×900 light and dark, 1024×768, 768×1024, 390×844 light and dark, and 1440×900 under
`prefers-reduced-motion`. The `now` chapter on its own at all of those plus 1280. The `on the record`
chapter, to re-verify Revision 36's award asset on this route. The homepage About preview at
1440 light and dark, 1280, 1024, 768, 430, 390 light and dark, and under reduced motion. Both
homepage seams — **Recognition → About** and **About → Project Inquiry** — at 1440, plus the
Recognition → About seam at 390. Three baseline captures and four intermediate ones, one per
composition decision.

- **Recognition → About** steps from the phase-09 photograph to a purely typographic preview — the
  contrast §16 of the Phase 09 plan asked for, still correct.
- **About → Project Inquiry** is unchanged, because the homepage chapter is.
- **Reduced motion**: the portrait, the name, the context line and the link all render at full
  opacity.

**Two real defects were caught in capture, and neither was visible to measurement** (§10q, again):

1. **`.abt-frame` is `width: 100%` in `globals.css`**, so a width utility placed on it is overridden.
   The portrait silently filled the entire column at ~530px and squeezed the name block into a
   two-line-per-word ribbon. **The width belongs on a wrapper**, and it now is — with the reason
   written beside it.
2. **The left column then overran the right by 243px.** Fixed by moving the locator, not by shrinking
   the photograph.

### Media ledger — Phase 10

| | |
| --- | --- |
| **Source file** | `F:\Drive data\WEBSITE SHORTLIST\Prashant Mishra.jpeg` — 8064×6048, **EXIF orientation 6**, client-supplied and client-named |
| **Identity** | **Prashant Mishra**, from the client's own filename. **No face was compared, matched or recognised** |
| **Role** | **None published.** See P31 |
| **Production output** | `public/media/about/prashant-mishra.webp` — **900×1200, 77.8KB**, 3:4, `.rotate()` then `extract{1616, 2200, 2600×3467}`. Pure crop and downscale |
| **Where** | **`/about` → the `now` chapter only** |
| **Do NOT repeat in** | **The homepage About preview**, the Hero, Current Management, Creators, Selected Work, Recognition, the Quick Proof band and every service page |
| **Status** | **LIVE (local)** |

**Reserved rather than published** — real material, deliberately unspent:

| | |
| --- | --- |
| The remaining frames of `Prashant Mishra.jpeg` | A full-length environmental 4:5 crop was produced and rejected on composition. **The source supports a second crop** if a later phase needs an environmental frame — but not on a surface that already carries the 3:4 |
| `PRASHANT SIR - PICTURES/` ×7 | **HELD — `IDENTITY UNKNOWN`.** Unblocked only by the client confirming *this photograph is this person*, which is evidence about a person rather than about a folder (§18 rule 7) |

### Untouched

The Hero, the brands rail, Current Management, the Quick Proof band, all five What We Do scenes,
03 / Creators, The Mishram Difference, 04 / Work Process, 05 / Selected Work, Client Notes,
06 / Recognition (component **and** config), **the homepage About chapter and `config/about.ts`**,
Project Inquiry, the Footer, Supabase, GA4, the legal documents and every service page.
**`globals.css` was not modified** — the person module is built from `.abt-frame` and `.abt-photo`,
which already existed. **No dependency, no new analytics event** — the LinkedIn click reuses the
existing `social_outbound` with a new `context` value, and the URL comes from `SOCIAL_URLS.linkedin`
rather than being written a second time.

---

## Revision 38 — Phase 11, homepage rhythm and information hierarchy

### The verdict first: the page was already balanced, and the evidence says so

This phase measured the whole homepage as one editorial experience and found **one** defect worth
fixing. That is the honest outcome rather than a thin one — six independent tests all came back
clean, and the plan's own §8 is explicit: *if the page is already well balanced, do not destroy it
just to hit a percentage.*

| Test | Result |
| --- | --- |
| **Section order vs. the narrative test** | **Exact match, all twelve beats.** Nothing moved |
| **Inter-section gaps** | **0px at every boundary, every viewport.** No phantom space anywhere |
| **Boundary empty runs at 1440** | 154–341px around §10i's recorded 256px standard (two `lg:py-32` meeting), and both >320 readings were instrument artifacts — see below |
| **Client Notes dead space** | **Zero.** `#client-notes` is absent from the DOM entirely |
| **CTA hierarchy** | **Exactly two filled primaries** on the whole page — `Book a 15-Min Call` (Hero) and `Send project brief` (Inquiry) |
| **Chapter numbering** | `01`–`07` with no gaps; four unnumbered interludes each on a rule-plus-label. Consistent |

### The one change: a discipline list printed twice, 124px apart

`WHAT_WE_DO_CLOSING.baseline` renders **`Strategy — Content — Creators — Performance — Technology`**
as the closing baseline of `02 / What We Do`. The very next section's lead read:

> *"Creators, content, performance and technology working as one team, not four suppliers."*

**Four of the five words, repeated verbatim, one boundary later** — 124px of empty run on desktop and
about one screen on a phone. Same idea, adjacent sections, no new information between them, which is
the precise case §29 exists to catch. It also pulled the Mishram Difference toward answering *what
Mishram does* when its whole job is *why Mishram*.

**Now:** *"The same disciplines, working as one team rather than four suppliers."*

- **The claim is unchanged.** *"working as one team"*, *"four suppliers"* and the **four** that
  anchors the argument all survive verbatim. Only the enumeration became a reference to the
  enumeration.
- **Nothing is lost.** The disciplines are named 124px above and again in the four numbered
  differentiator rows below.
- **It turns a redundancy into a connective** — the lead now points at the section it follows.
- **Height-neutral at all six viewports**: the lead occupied two lines in its column before and
  after, so `#difference` is byte-identical at 1440, 1280, 1024, 768, 430 and 390.

**Reason: DUPLICATE COPY.** `WHAT_WE_DO_CLOSING` was not touched — §15 locks What We Do, and the
junior chapter is the one that should stop repeating.

### Three findings observed and deliberately not acted on

Each has a reason, and each is recorded so the next session does not re-derive it.

1. **Mobile Current Management opens with an unlabelled photograph.** At 390 the order is photo →
   caption → chapter label → name, so the chapter announces itself ~600px late; every other chapter
   opens with its label. **Not changed:** Revision 30 chose *one reading order at every size*
   deliberately, after `order-*` proved inert in a block parent, and the photograph does carry its
   `WORKING RELATIONSHIP` caption immediately. §5 requires the alternative to be *materially* better
   before an approved composition moves, and photo-then-label is a legitimate editorial device rather
   than a defect.
2. **Four consecutive chapters each close with a same-destination contextual action** — Creators
   *"Work with our creator network"*, Work Process *"Start a project"*, Selected Work *"Create with
   us"*, Recognition *"Build something worth noticing"*. All four open the same contact panel under
   four different labels. **Not changed:** each is individually approved, each is a small text action
   rather than a button, the two *primary* CTAs remain uncontested, and §30 is explicit that useful
   actions are not removed merely to simplify. Recorded as a density observation.
3. **Selected Work's headline sits ~170px below its own chapter label** at 1440. **Not changed:** the
   intro uses `lg:flex-row lg:items-end`, which is the *shared* pattern — Recognition and Creators
   use the identical class list. The gap is that pattern meeting the taller right column Revision 35
   built for the 40M+ block. Changing it for one chapter would break the consistency §31/§32 ask to
   preserve.

### The instrument was wrong three times, and that is worth writing down

A boundary-padding probe was built to find dead space objectively. **Three of its findings were
artifacts, and acting on any of them would have damaged the page:**

- It reported `#difference` with 216px of empty bottom padding. The foot actually carries the
  **`MOMENTUM`** resolution — which computed to `opacity: 0` because a 0.8×viewport scroll sweep
  *steps over* its `whileInView` trigger. Re-probed with the chapter's foot centred, **`Momentum`
  renders at `opacity: 1` at both 1440 and 390.** A real visitor scrolls continuously and never
  misses it.
- It reported the two largest boundary runs at `difference → creators` (341px) and `process → work`
  (335px). Both were the same un-triggered-element error; the seam captures show both boundaries
  sitting at the standard.
- It reported `#collaborations` with 164px of empty bottom padding at 390. That band is **the logo
  rail** — the detector only walked text nodes.

**Geometry cannot clear a composition (§10q), and it cannot condemn one either.** Every conclusion
above was settled by looking at a real composited capture.

### CTA inventory, read off the rendered DOM

| Tier | Actions |
| --- | --- |
| **PRIMARY CONVERSION** (filled ivory) | `Book a 15-Min Call` — Hero → WhatsApp consultation · `Send project brief` — Project Inquiry → the form. **Two, and no more** |
| **SECONDARY EXPLORATION** | `Contact Us` ×2 (Hero, About) · `Explore service ↗` ×4 (one per public service) · `Read our story ↗` → `/about` · `Tell us what you're building ↓` → `#project-inquiry` |
| **CONTEXTUAL / OUTBOUND** | `View Instagram` · `Discuss this project` ×4 · `Work with our creator network` · `Start a project` · `Create with us` · `Build something worth noticing` · 11 creator handle links · the email and WhatsApp rows |

No two consecutive filled CTAs, no competing primaries, and no primary repeated a screen later.
**Unchanged this phase.**

### Section height table — 1440×900

| Section | Before | After | Δ |
| --- | --- | --- | --- |
| Hero | 900 | 900 | 0 |
| 01 / Brands | 298 | 298 | 0 |
| Current Management | 1,131 | 1,131 | 0 |
| Quick Proof | 397 | 397 | 0 |
| 02 / What We Do | 6,280 | 6,280 | 0 |
| The Mishram Difference | 929 | 929 | 0 |
| 03 / Creators | 1,618 | 1,618 | 0 |
| 04 / Work Process | 1,081 | 1,081 | 0 |
| 05 / Selected Work | 1,137 | 1,137 | 0 |
| Client Notes | **absent** | **absent** | 0 |
| 06 / Recognition | 1,239 | 1,239 | 0 |
| 07 / About | 718 | 718 | 0 |
| Project Inquiry | 1,377 | 1,377 | 0 |
| Footer | 681 | 681 | 0 |
| **TOTAL** | **17,787** | **17,787** | **0 (0.00%)** |

Other viewports, before → after: 1280 · 16,739 → 16,739 · 1024 · 13,969 → 13,969 · 768 · 17,437 →
17,437 · 430 · 18,401 → 18,401 · 390 · 18,070 → 18,070. **Byte-identical at every one.**

**Zero reduction, and it is the correct result.** The page carries no dead space to reclaim: every
boundary is the design system's own padding scale, every gap is 0px, and the one chapter over two
viewports is the pinned What We Do track, which §15 locks.

### Mobile and tablet

**390 — full-page read, 22 true-viewport frames.** Hero → Brands → Current Management → Quick Proof →
four stacked services → Difference → Creators → Work Process → Selected Work → Recognition → About →
Inquiry → Footer. **No excessive gaps, no consecutive giant headlines, no consecutive full-width
photographs, no tiny UI stranded after large media, no dead bottom spacing.** Quick Proof renders as
four single vertical rows and stays compact at 547px.

**430.** Both 390 and 430 sit below the `sm` breakpoint, so they share layout classes exactly and the
differences are pure text reflow — **no two-column leftover, no breakpoint height jump.** 430 is
331px taller than 390 overall, and 228px of that is arithmetic rather than layout: the Hero is
`100svh` (+88) and the stacked What We Do track is viewport-height-derived (+140).

**1024 and 768 — rhythm only.** Chapter pacing is correct at both. **The known document overflow at
these two widths is untouched and still deferred to Phase 12**, exactly as §37 requires: `scrollWidth`
1038 vs `clientWidth` 1024, and 844 vs 768. Revision 33 already proved it reproduces identically on
live production, so it predates every final-polish phase.

### Zero-content, zero-media result

| | |
| --- | --- |
| New production media | **0** |
| Image nodes | **23 → 23** (19 at ≤768) |
| Lazy / eager / preload | **23 / 0 / 0 — unchanged** |
| Canvases / videos | **1 / 0 — unchanged** |
| DOM nodes at 1440 | **2,070 → 2,070** |
| CSS | **`globals.css` not modified — 0 bytes** |
| Dependencies | none added |
| Brands, creators, metrics, award wording, campaign proof, Prashant role, services, history, contact data | **all untouched** |

**No dead homepage CSS was removed, because none was proven dead.** A sweep of every `.tst-*`,
`.rcg-*`, `.mgt-*`, `.dif-*`, `.prc-*`, `.wrk-*`, `.crt-*` and `.svc-*` selector flagged twelve
`--a/--b/--c/--d` drift modifiers as unreferenced — **and every one of them is live**, built by
template interpolation (`` `abt-drift--${f.drift}` ``, `` `svc-drift--${place.drift}` ``). A grep does
not prove a class unused, which is §39's own bar. The one genuinely unreachable selector found,
`a.abt-svc-row .abt-arrow`, is `/about` CSS and therefore outside a homepage rhythm pass —
**recorded for Phase 12.**

### Visual QA

**Baseline:** all twelve seams at true 1440×900, the four mobile outlier chapters whole, and a
22-frame true-viewport read of the entire page at 390 composited into two contact sheets.

**After:** the homepage at 1440 light and dark, 1280, 1024, 768, 430, 390 light and dark, and 1440
under `prefers-reduced-motion`, plus the changed seam at 1440 and 390.

**All twelve transitions reviewed:** Hero → Brands · Brands → Current Management · Current Management
→ Quick Proof · Quick Proof → What We Do · **What We Do → Mishram Difference (changed)** · Difference
→ Creators · Creators → Work Process · Work Process → Selected Work · Selected Work → Recognition ·
Recognition → About · About → Project Inquiry · Project Inquiry → Footer.

`scripts/shoot.mjs` gained the two seams no earlier phase had needed — What We Do → Difference and
Project Inquiry → Footer — plus five whole-chapter mobile shots. **No dependency added.**

### First five scrolls — the conversion zone

**Hero → Brands → Current Management → Quick Proof → What We Do.** A visitor who reads only these
learns, in order: what Mishram does and where to enquire (Hero, with the page's one booking CTA);
which brands the work has run alongside (eighteen marks in full colour at rest); that the agency
manages a named creator **today**, with the account's own Reel figures beside the screenshot they
were read off; the operating scale — `130M+ / 100+ / 500+ / 1,000+`; and then the capability system.
**Verdict: passes, unchanged.** Each of the four credibility layers stays distinct — a rail, a
relationship, a set of figures, a capability track — with different eyebrows, different compositions
and no repeated copy.

### Two items handed to Phase 12

1. **The 1024 / 768 document overflow.** Untouched by design (§37).
2. **`#collaborations` and `#proof` use their eyebrow label as the section `<h2>`** — every other
   chapter's `h2` is a real headline. That is heading semantics, which §21 of Phase 12 owns, and
   §38 forbids fixing it here.
