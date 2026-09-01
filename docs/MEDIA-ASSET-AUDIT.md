# Media Asset Audit — Mishram Media

> **Revision 17, August 2026.** A bounded audit of the client's own media library, carried out
> before anything was published from it. It records what exists, what was converted, what shipped,
> and — more usefully — **what was deliberately held back and why**.
>
> ---
>
> ## ⚠ REVISION 17B — READ THIS BEFORE §3A BELOW
>
> **THE REVISION 17 AKASH SAGAR IMAGE ASSOCIATION IS REVOKED BY THE USER.** `IMG_2188.jpg`,
> `IMG_2189.jpg` and `IMG_2190.jpg` do **not** depict Akash Sagar, and neither do the two WebPs
> built from them. **§3A below is history, not a current record** — it is left standing rather than
> rewritten because the reasoning it contains is exactly what needs to be visible next time.
>
> Both production files were **deleted from `public/`**. The Drive originals are untouched.
> **They must never publicly represent Akash Sagar again**, in any crop, at any size.
>
> **What this cost, and it is the useful part.** Revision 17 cleared those files on the strongest
> evidence the audit's own rules allow — *two independent allowed sources agreeing*: a folder
> literally named `AKASH COVER PHOTO`, and the client naming the three files directly. The rule was
> followed correctly and the answer was still wrong, because **a folder name says whose folder it
> is, not who is in the frame** — which is the same sentence this audit already wrote about
> `PRASHANT SIR - PICTURES` and about a filename that thanks a named individual. It was applied to
> the loose files and not to the one folder that seemed unambiguous.
>
> **The standing correction: a folder name plus a client instruction naming *files* is not
> confirmation of *a person*.** The client confirming *this photograph is X* is. Nothing else is.
>
> See §7 for what replaced it, and §8 for the two new user-labelled assets.

---

## 0. The library

| | |
| --- | --- |
| **Primary source (authoritative)** | `F:\Drive data` — read directly from the local disk |
| **Cloud reference (provenance only)** | `https://drive.google.com/drive/folders/1IAU2wgNarM8G3hyfa9NusHIg3K-ayNKB` |
| **HEIC/HEIF staging** | `F:\Drive data\_website-converted-jpg\` |
| **Total files** | 210 |
| **Readable** | Yes — verified before any other step |

Composition: **140 `.MOV`**, 20 JPEG, **13 HEIC/HEIF**, 4 PNG, 2 MP4, 1 WebP, 9 MPEG + 6 M4A + 3 MP3
(audio beds for reel edits), 12 `.DS_Store`.

**The raw library stays outside the repository.** Nothing was bulk-copied, no folder was mirrored
into `public/`, and not one `.MOV` was moved. Only the two finished production assets in §4 were
written into the project.

### Top-level structure

```
F:\Drive data\
├── (22 loose files at root — HEICs and JPEGs with NO folder context)
├── Dr 69 - sagar bhai shoot +bts\      7 MOV
├── PRASHANT VIDEO\                     Purav\ · Swiggy\ · Swiggy\Funny edits\
├── Prashant - data\                    ← a fuller copy of the same tree
│   ├── Mishram Data\                   4 brand logo files
│   ├── PRASHANT SIR - PICTURES\        8 files
│   ├── PRASHANT VIDEO\                 Purav\ · Swiggy\
│   ├── Purav\                          9 MOV
│   ├── RAMAH\11 NOV -\                 13 MOV
│   ├── REELS - MISHRAM\CREATIVE REEL - ALL\CREATIVES REELS\
│   │   └── 22 numbered reel folders + AKASH COVER PHOTO\
│   └── sounds\                         3 MP3
├── Purav\ · RAMAH\ · REELS - MISHRAM\  (partial duplicates of the above)
```

`Prashant - data\` is a **superset** of the top-level folders — the same trees appear in both places
and several files are byte-identical duplicates. Where a file exists in both, the `Prashant - data\`
copy was treated as authoritative because it is the complete one.

---

## 1. HEIC → JPG conversion

**All 13 HEIC/HEIF files were converted. Zero failures. No original was touched.**

### The tool, and why it is not the obvious one

| Candidate | Result |
| --- | --- |
| **Sharp** (already a dev dependency) | **Cannot decode these.** libheif rejects every file: *"Number of references in iref box (40–48) exceeds the security limits of 16"*. These are ordinary iPhone **grid** HEICs — a 4032×3024 image stored as 40–48 tiles — and libheif's default `max_iref_references` is lower than that. Sharp exposes no way to raise it |
| **ImageMagick** | Not installed. (`C:\Windows\system32\convert.exe` is the Windows filesystem tool, not ImageMagick — it must never be invoked for this) |
| **ffmpeg** | Present at `…\CapCut\Apps\8.5.0.3590\ffmpeg.exe`. It *opens* the files but returns **a single 512×512 grid tile** rather than the assembled image. Unusable for stills; used for video probing in §3 |
| **Windows Imaging Component** ✅ | **Decodes every file at full resolution.** The HEIF Image Extensions are already installed on this machine, reached through .NET's `BitmapDecoder` from PowerShell |

**No dependency was added to the project**, which was the constraint.

### Settings

- **JPEG quality 92** — inside the requested 90–94 band.
- **Original dimensions preserved.** Nothing upscaled, nothing downscaled.
- **Orientation resolved by the decoder**, so the pixels are upright and nothing downstream
  re-applies a rotation. Verified: every output is portrait where the source was portrait.
- **All metadata stripped.** The re-encode carries no EXIF, no GPS and no device identifiers —
  verified with `sharp().metadata()`, `exif: no` on all 13.
- Script: `scratchpad/heic-convert.ps1`. Manifest: `F:\Drive data\_website-converted-jpg\_conversion-manifest.json`.

### The 13 conversions

Staging mirrors the source folder structure, so every JPEG traces to exactly one original.

| # | Original (relative to `F:\Drive data\`) | → `_website-converted-jpg\` | Pixels | JPEG |
| --- | --- | --- | --- | --- |
| 1 | `03EBDAA5-…-8FE6CA2107AB.HEIC` | `03EBDAA5-….jpg` | 3024×4032 | 3,734 KB |
| 2 | `135279F4-…-8D50B7C365F5.HEIC` | `135279F4-….jpg` | 3024×4032 | 3,486 KB |
| 3 | `186F38BE-…-9645F42AEFE0.HEIC` | `186F38BE-….jpg` | 3024×4032 | 3,820 KB |
| 4 | `4FCFF00A-…-BCB51CE1CBDC.HEIC` | `4FCFF00A-….jpg` | 3024×4032 | 3,830 KB |
| 5 | `CE81BFA5-…-709D6F298A2F.HEIC` | `CE81BFA5-….jpg` | 3024×4032 | 3,524 KB |
| 6 | `IMG_0884.HEIC` | `IMG_0884.jpg` | 3024×4032 | 3,672 KB |
| 7 | `IMG_3866.HEIC.heif` | `IMG_3866.HEIC.jpg` | 2268×4032 | 1,905 KB |
| 8 | `IMG_6975.HEIC` | `IMG_6975.jpg` | 4032×3024 | 2,658 KB |
| 9 | `Prashant - data\PRASHANT SIR - PICTURES\IMG_2719.heic` | same path, `.jpg` | 3024×4032 | 1,823 KB |
| 10 | `…\PRASHANT SIR - PICTURES\IMG_3727.heic` | same path, `.jpg` | 2268×4032 | 2,021 KB |
| 11 | `…\PRASHANT SIR - PICTURES\IMG_3866.heic` | same path, `.jpg` | 2268×4032 | 1,905 KB |
| 12 | `…\PRASHANT VIDEO\Swiggy\IMG_3865.HEIC` | same path, `.jpg` | 2268×4032 | 1,908 KB |
| 13 | `…\PRASHANT VIDEO\Swiggy\IMG_3866.HEIC` | same path, `.jpg` | 2268×4032 | 1,905 KB |

**Verification.** Every output was re-opened and measured: readable, correct dimensions, correct
orientation, EXIF absent, and **none black, blank or corrupt** — channel means ran 105–159 and
standard deviations 58–73, which is a normal photographic spread. Rows 7, 11 and 13 are byte-identical
duplicates of one source (`IMG_3866`), which is why their outputs match to the byte.

---

## 2. Identity discipline

**No face was used to identify anybody, at any point.** Identity was accepted only from an explicit
folder name, a filename, existing project metadata, or the client's own instruction.

| Source | What it establishes |
| --- | --- |
| `…\AKASH COVER PHOTO\` | **Akash Sagar.** The folder names him, and the client named `IMG_2188/2189/2190.jpg` directly. Two independent allowed sources agreeing |
| `Purav\`, `PRASHANT VIDEO\Purav\` | Folder context only. Enough to know what a *shoot* was, not enough to caption a person |
| `Dr 69 - sagar bhai shoot +bts\` | A shoot name. "sagar bhai" is informal and not a published identity |
| `PRASHANT SIR - PICTURES\` | Whose collection it is — **not** who is in each frame |
| `PRASHANT VIDEO\Swiggy\` | Brand context for the shoot |
| Loose root files | **Nothing.** No folder, no naming convention → `IDENTITY UNKNOWN` |

Everything marked `IDENTITY UNKNOWN` below is unpublished for that reason alone, regardless of how
good the photograph is.

---

## 3. The audit

### A — ~~MUST USE (shipped)~~ **REVOKED BY THE USER IN REVISION 17B — NOT AKASH SAGAR**

> Everything in this subsection is **superseded**. The two files described below were deleted from
> `public/` and neither original may represent Akash Sagar on any surface. Kept verbatim as the
> record of a decision that was made correctly under the rules and was still wrong — see the
> banner at the head of this document.

| | |
| --- | --- |
| **File** | `IMG_2189.jpg` |
| **Original** | `F:\Drive data\Prashant - data\REELS - MISHRAM\CREATIVE REEL - ALL\CREATIVES REELS\AKASH COVER PHOTO\IMG_2189.jpg` |
| **JPG conversion** | n/a — already JPEG |
| **Identity / context** | **Akash Sagar (`@xbhandesiri_`)** — explicit folder name + client instruction |
| **Source dimensions** | 2268×4032 |
| **Website use** | Current Management chapter — the dominant portrait |
| **Crop / aspect** | 3:4, full source width, `top: 766` → 2268×3024, resized to **1000×1333** WebP q74 |
| **Reason** | The strongest of the three: direct to camera, face fully visible and sharp, real separation from the pillar behind, jacket reads as a distinct silhouette. Confirms the previous review's recommendation |

| | |
| --- | --- |
| **File** | `IMG_2190.jpg` |
| **Original** | `…\AKASH COVER PHOTO\IMG_2190.jpg` |
| **Identity / context** | Akash Sagar — same folder |
| **Source dimensions** | 2268×4032 |
| **Website use** | Current Management chapter — the supporting crop |
| **Crop / aspect** | 4:5, offset right (`left: 420`, `top: 806`) → 1848×2310, resized to **720×900** WebP q74 |
| **Reason** | A genuinely different frame rather than the same pose at another size — profile, looking up. **The right offset is deliberate**: it removes a children's fairground ride at the left edge of the full frame |

### B — USEFUL (held for a later, scoped revision)

| File | Original | Identity / context | Source | Recommended use | Reason held |
| --- | --- | --- | --- | --- | --- |
| `135279F4-….HEIC` → `.jpg` | root | **NUFEW award evening.** The step-and-repeat carries the NUFEW mark and the subject holds a gold plaque bearing the NUFEW roundel. No person named | 3024×4032 | **Recognition (§06) art-direction upgrade** | See the finding below |
| `CE81BFA5-….HEIC` → `.jpg` | root | Same evening, alternate pose | 3024×4032 | Recognition fragment | Same |
| `03EBDAA5-…`, `186F38BE-…`, `4FCFF00A-…` | root | Same evening — two figures on stage with the trophy | 3024×4032 | Recognition fragment | Same |
| ~~`IMG_2188.jpg`~~ | `…\AKASH COVER PHOTO\` | ~~Akash Sagar~~ **NOT AKASH SAGAR — user-revoked, 17B** | 2268×4032 | **None. Never as Akash Sagar** | Superseded. The original note read: *weakest of the three — a red "SALE 50%" retail banner sits prominently behind the subject* |

> **✅ ACTED ON IN REVISION 36 (Final Polish Phase 09).** `186F38BE-…` is now the §06 Recognition
> photograph — `public/media/recognition/nufew-award-presentation-2024-25.webp`, 1600×1200, a pure
> 4:3 crop and downscale. The promotional-banner crop this section calls out was **retired and
> deleted**. The other two stage frames are the same pose seconds apart and were not used;
> `135279F4-…` and `CE81BFA5-…` are **held** — a 20+ mark sponsor wall (§9 clean, §18 not), and their
> plaque is a *differently-scoped* award inscribed to an individual.
>
> **Every constraint this note predicted held.** The plaque inscription and the trophy plate are
> both still illegible at full resolution, re-checked rather than inherited, so **no new claim was
> made**; nobody in the frame is named; and no gold entered the palette. One thing the note could not
> have known: the photographs read **`NUFW — NEXUS UNIVERSE FASHION WEEK`** where the banner's badge
> reads `NUFEW`. The site still publishes `NUFEW`, still unexpanded — see `docs/PROJECT-BRIEF.md`
> §10an.
>
> **One inventory correction.** `03EBDAA5-….HEIC` is no longer at the drive root; **`Award.HEIC`
> sits there at exactly 3,265,980 bytes**, byte-for-byte the size §1's manifest records for it. The
> client renamed the file.
>
> ---
>
> **THE SINGLE HIGHEST-VALUE FINDING IN THIS AUDIT, and it is deliberately not acted on here.**
>
> Five root HEICs are **first-party 3024×4032 photographs of the NUFEW award presentation** — the
> same recognition §06 currently renders. That section's asset is a **775×581 crop of a promotional
> banner** which §10q had to re-crop once because it read as an advertisement on the obsidian
> canvas. These are the real photographs, at four times the resolution.
>
> **Why nothing was changed.** Revision 17's scope is creator proof and media integration;
> Recognition is a locked section (§18) with content constraints that were reasoned out over two
> revisions. Reopening it unasked is the wrong call. **Recommended as a scoped Recognition
> revision.**
>
> **Constraints that would carry over unchanged:** the plaque inscription is **still illegible** at
> full resolution (checked — the NUFEW roundel is visible, the award text is not), so **no new claim
> can be made from these**; `NUFEW` stays unexpanded; **nobody in the frame is named**; no gold is
> added to the palette.

### C — HOLD (real material, unresolved context)

| File | Original | Identity / context | Source | Reason held |
| --- | --- | --- | --- | --- |
| `IMG_2426.MOV` | `Purav\` | **Genuine on-location production BTS** — a small crew, and a lapel mic being clipped to talent. Folder gives shoot context only | 3840×2160, 17.3s | Excellent evidence of real production, but every person in it is `IDENTITY UNKNOWN`, and §05 requires an item's title to be the person actually in the frame |
| `IMG_2650.MOV` | `Dr 69 - sagar bhai shoot +bts\` | Three people walking to camera, one carrying a gimbal rig. Strong "we make content" frame | 3840×2160, 7.7s | Same. The shoot name is not a publishable identity |
| `IMG_7679.JPG`, `IMG_7680.JPG` | `…\PRASHANT SIR - PICTURES\` | Two people on a sofa with a product carton — reads as placement | 5712×4284, orientation 6 | `IDENTITY UNKNOWN`; the product is not identifiable either |
| `IMG_3274.JPG.jpeg` | root | Product hand-off in a café, blue pack | 4284×5712 | `IDENTITY UNKNOWN`, product unidentified |
| `IMG_3050`, `IMG_3060` | root | In front of a **zingbus MAX** coach | 853×1280 / 1280×853 | **Third-party brand not on the confirmed roster.** Publishing implies a zingbus relationship. Also far too small |
| `IMG_4363`, `IMG_4365` | root | Inside an **OPPO** retail store | 2160×3840 | Same — OPPO is not on the confirmed roster |
| `IMG_2719.heic` → `.jpg` | `…\PRASHANT SIR - PICTURES\` | A person in a Spider-Man mask on a sofa. Distinctive | 3024×4032 | `IDENTITY UNKNOWN`. A masked subject cannot be attributed at all |
| `final.mp4` / `final 3.mp4` | `…\CREATIVES REELS\14th work load\` | **A finished, vertical, 9:16 Mishram reel** — the exact asset class §10d has been blocked on for four revisions | 2160×3840 and 1080×1920, 14.1s, h264 60fps | **Three independent reasons.** (1) It is an internal office-humour piece, not creator or campaign work — §05 is framed as "creator content, campaigns and visual work". (2) Its burnt-in captions describe two identifiable employees as "our two office lovebirds"; publishing named staff in a romantic framing without consent on file is not a call to make unilaterally. (3) A **Cream Bell / MAXUM** banner is prominent throughout — another brand not on the roster |
| `IMG_3818.MOV`, `IMG_3822.MOV` | `PRASHANT VIDEO\Swiggy\Funny edits\` | Raw pieces to camera in a room | 1920×1080 28.9s / 3840×2160 37.2s | Raw takes, not finished work. Nothing Swiggy-related is visible in frame despite the folder, and the speaker is `IDENTITY UNKNOWN` |
| `…award…Tushar Kapoor….webp` | `…\PRASHANT SIR - PICTURES\` | Award presentation, two figures, one holding a framed award | 846×1057 | Related to the §06 recognition. **The filename names a person and that is not evidence** — §10p already established exactly this about an `alt` attribute on the same subject. Low resolution regardless |

### D — REJECT

| File | Reason |
| --- | --- |
| `IMG_0884.HEIC`, `IMG_6975.HEIC`, `IMG_3727.heic`, `IMG_3865/3866.HEIC` (×3 copies), `IMG_2344.jpg`, `IMG_2701`, `IMG_2863`, `IMG_3282`, `IMG_4430/4433/4447`, `IMG_4511`, `IMG_4647` | Casual group and location photographs with **no identity source and no campaign context**. Several are near-duplicates of each other. Converted for completeness; none is publishable |
| `IMG_4009.PNG` | 1170×2532 — a **phone screenshot of a photograph**, not an analytics capture. Two people on a football pitch |
| `Mishram Data\{blue,grey,white} logo mishram.png`, `circle logo mishram.jpg` | Old Mishram brand logo variants. The site uses `public/brand/mishram-wordmark.png` as a CSS mask (§10g) and that treatment is locked |
| All 138 remaining `.MOV` | Raw camera dumps — takes, alternates and B-roll across `RAMAH\11 NOV -`, the 22 numbered reel folders, `Purav\` and `Dr 69`. Auditing every one was explicitly out of scope and none is a finished deliverable |
| `sounds\*.mp3`, `*.m4a`, `*.mpeg` | Audio beds and voice takes for reel edits. Not website material |

---

## 4. What actually shipped

> **SUPERSEDED BY REVISION 17B.** Both files below were **deleted** — the user confirmed they are
> not Akash Sagar. What ships now is in §7 and §8. The block is kept because the sizing reasoning
> at the foot of it is still the rule.

```
public/media/creators/akash-sagar/
├── akash-sagar-xbhandesiri-primary.webp     1000×1333   182 KB   ← DELETED (17B)
└── akash-sagar-xbhandesiri-secondary.webp    720×900      90 KB   ← DELETED (17B)
```

**Current state of `public/media/creators/` after Revision 17B:**

```
akash-sagar/
└── akash-sagar-xbhandesiri-avatar.webp        150×150      4 KB   official profile picture (§7)
featured/
├── ali-fazal.webp                            1000×1333   177 KB   user-labelled (§8)
└── lovekesh-kataria.webp                     1000×1333    79 KB   user-labelled (§8)
                                              net change  −13 KB
```

| Production file | Source original | Crop | Output |
| --- | --- | --- | --- |
| `akash-sagar-xbhandesiri-primary.webp` | `…\AKASH COVER PHOTO\IMG_2189.jpg` (2268×4032) | `extract{left 0, top 766, 2268×3024}` → 3:4 | 1000×1333 WebP q74 |
| `akash-sagar-xbhandesiri-secondary.webp` | `…\AKASH COVER PHOTO\IMG_2190.jpg` (2268×4032) | `extract{left 420, top 806, 1848×2310}` → 4:5 | 720×900 WebP q74 |

Sized for the boxes they actually render into — ~420px and ~160px at 1440, so both cover 2× DPR with
no waste. **Nothing was upscaled** and no 6 MB camera original went into `public/`.

---

## 5. ANALYTICS — none exists

**The whole library was searched. There is not one analytics screenshot, insights export, dashboard
capture or follower record in it.**

Searched: every filename for `analytic`, `insight`, `dashboard`, `follower`, `reach`, `views`,
`stat`, `screenshot`, `RPReplay`; every PNG (4 — three are brand logos, one is a screenshot of a
photograph); every non-video file in the tree.

The only match on "followers" is
`…\CREATIVES REELS\10th 100 followers\Akash 100 followers 2.m4a` — **a voice take for a reel script
about reaching 100 followers**, inside Mishram's own creative-reel folders. It is a creative asset,
not a measurement, and it is not evidence about `@xbhandesiri_`.

**Therefore every metric discussed for the Xbhandesiri chapter remains unpublished**, and
`MANAGEMENT.metrics` in `config/management.ts` is an empty array that renders nothing:

| Claim | Evidence found | Published |
| --- | --- | --- |
| 1B dashboard | none | **No** |
| 800K+ follower growth | none | **No** |
| Joined at ~100K | none | **No** |
| 30M+ average Reel views | none | **No** |
| 130M+ Reels | none | **No** |
| 35%+ retention | none | **No** |
| 200M / 500M projections | none | **No** — and a projection could not be published even with a screenshot |

The unblock is a dated capture of the account's own insights, tied unambiguously to
`@xbhandesiri_`. One config entry each, with `source` naming the screenshot.

---

## 6. Rules this audit followed


1. **Originals are never deleted or overwritten.** Conversions went to a separate staging tree.
2. **The raw library stays outside the repository.** Two files were copied in; nothing else.
3. **No face was used to identify anyone.** Folder name, filename, project metadata or the client's
   own instruction — or `IDENTITY UNKNOWN`.
4. **A third-party brand in frame is a brand claim.** zingbus, OPPO and Cream Bell all appear in
   otherwise usable material and all three keep it unpublished, on the same logic §9 applies to the
   logo rail.
5. **A filename that names a person is not evidence of a person** (§10p, and it recurred here).
6. **Unclear context means hold.** Applied to the only finished reel in the library, which was
   otherwise exactly the asset the site has wanted for four revisions.
7. **REVISION 17B — a folder name is not a person.** Added after rule 3 was followed correctly and
   still produced a wrong identification. A folder name plus a client instruction naming *files* is
   evidence about a folder; **only the client confirming a specific photograph is a specific person
   is evidence about a person.** The rest of rule 3 stands unchanged.

---

## 7. REVISION 17B — the Akash Sagar correction, and what replaced the photography

### The search for a correct local asset — exhaustive, and it found nothing

`F:\Drive data` was re-searched in full for `akash`, `sagar`, `bhande`, `xbhandesiri` and
`bhandesiri`, and every directory in the tree was re-listed to catch folders added since Revision
17. **There is no Mishram-owned photograph of Akash Sagar in the library** other than the revoked
`AKASH COVER PHOTO` set.

The only matches anywhere:

| Match | What it is | Usable? |
| --- | --- | --- |
| `…\CREATIVES REELS\AKASH COVER PHOTO\` | The revoked folder. `IMG_2188/2189/2190.jpg` | **No — user-revoked** |
| `…\CREATIVES REELS\10th 100 followers\Akash 100 followers 2.m4a` | A voice take for a reel script (already recorded in §5) | No — audio |
| `Dr 69 - sagar bhai shoot +bts\` | A *different* person — this is the Sagar Rathee shoot folder (see §9) | Not Akash |

### What is published instead — the official profile picture, at avatar size

| | |
| --- | --- |
| **Production file** | `public/media/creators/akash-sagar/akash-sagar-xbhandesiri-avatar.webp` |
| **Dimensions / weight** | **150×150**, 4 KB, WebP q88 |
| **Source** | `https://www.instagram.com/xbhandesiri_/` — the exact official account named in the brief |
| **Provenance** | The account's own display name is **"Akash Sagar"**; its bio reads **"Managed by - @filmybande"**, and `@filmybande` is the Instagram §10s published as Mishram's own public account. Fetched from the account's own CDN URL |
| **Identity basis** | The account itself. **No face comparison, no search result, no fan page, no news photograph, no aggregator, nothing generated** |
| **Rendered at** | **72 px**, in `.mgt-plate`. 150px covers that at 2× DPR with headroom |

**150×150 is the maximum Instagram publishes for it.** Every larger variant was attempted
(`s320x320`, `s640x640`, and the unparameterised original) and **all three return HTTP 403** — the
URL signature covers the size parameter. This is recorded so nobody retries it.

**It is therefore used as an avatar and nothing else.** It is not upscaled, not blurred into a
backdrop, not used as a hero image, and not stretched into the portrait frame it replaced. The
Current Management chapter's media treatment was rebuilt around type instead — see the brief's
§10u §2. **A correct small image beats a wrong large one.**

**The unblock is one file:** a Mishram-owned photograph of Akash Sagar with explicit identity —
which now means *the client saying "this photograph is Akash Sagar"*, not a folder name.

---

## 8. REVISION 17B — the two user-labelled assets

**Neither was identified by face.** In both cases **the user supplied the file and named it after
the person**, which is first-party identity evidence and is the same class of provenance the
project already accepts (§2, as corrected by rule 7).

**One deviation from the brief, stated rather than quietly absorbed.** The task named
`F:\Drive data\WEBSITE SHORTLIST\ali-fazal-user-confirmed.jpeg` and
`…\lovekesh-kataria-user-confirmed.jpeg`. **`WEBSITE SHORTLIST` does not exist** — the whole of
`F:\` was searched for it and for any `*user-confirmed*` file, and neither exists anywhere. What
does exist, at the root of `F:\Drive data` and matching the brief's description exactly, is
`ali fazal.jpeg` and `Lovekesh Kataria.jpeg`: two files named after those two people, each the only
match for its name in the entire library, both portrait-oriented, both absent from Revision 17's
own file listing of that directory. **The filename is the identity mapping the brief specifies; the
folder path is not.** Proceeded on that basis.

| | Ali Fazal | Lovekesh Kataria |
| --- | --- | --- |
| **Source file** | `F:\Drive data\ali fazal.jpeg` | `F:\Drive data\Lovekesh Kataria.jpeg` |
| **Source pixels** | 3120×4160 (no EXIF) | 8064×6048, **EXIF orientation 6** → 6048×8064 upright |
| **Crop** | `extract{left 355, top 747, 2560×3413}` → 3:4 | `extract{left 1286, top 2741, 3800×5067}` → 3:4 |
| **Production file** | `public/media/creators/featured/ali-fazal.webp` | `public/media/creators/featured/lovekesh-kataria.webp` |
| **Output** | **1000×1333** WebP q74, 177 KB | **1000×1333** WebP q74, 79 KB |
| **What it is** | An on-location relationship frame, two figures | An interior relationship frame, two figures |
| **Where it renders** | §03's featured stage, roster position 01 | §03's featured stage, roster position 04, **replacing** `lovkesh-kataria.webp` |

**3:4, which is the stage's portrait frame exactly**, so the crop that was composed is the crop that
renders and the supporting frames are genuine re-crops of it rather than a second crop of a crop.
**Nothing was upscaled**: both outputs are a fraction of their source resolution.

### Both crops keep both figures, in every format

This is the rule §10b already settled on this project's other two-person photograph, and it now
applies to two more. **The project records that these people are *in* these frames, not which
figure each one is** — the user's label establishes presence, not position. Isolating one figure
would assert something unverified, so no crop in any format does it. The one place it nearly
happened was caught by looking: Ali's 9:16 reel frame at `position: 50%` put the window's edge
straight through one of the two heads, so it is pulled to 46%.

### Third-party marks in frame — inspected at full resolution, and cleared

§10t's rule is that *a third-party brand in frame is a brand claim*, and it has already withheld
zingbus, OPPO and Cream Bell material. Both new files were checked against it:

| Asset | What is in frame | Verdict |
| --- | --- | --- |
| `ali fazal.jpeg` | A red storefront sign behind the subjects, **partially occluded by a head and unreadable** — it renders as `CLAS…E`. Parked two-wheelers and a street | **Cleared.** Street environment in a candid photograph, not a product, a campaign backdrop or a legible mark. Not comparable to a coach livery or a store interior |
| `Lovekesh Kataria.jpeg` | Decorative embroidered script on a shirt sleeve, zoomed to 600px and **not a legible wordmark**. A domestic interior otherwise | **Cleared.** A garment graphic, which §10b already publishes (Mukul's jacket) |

### `lovkesh-kataria.webp` was NOT deleted

The old 720×720 file stays in `public/media/creators/`. **`config/hero.ts` still uses it and the
Hero is locked (§05).** Only the creator roster's reference moved to the new file — which is why
five compositions across `/services/influencer-marketing` and `/services/brand-shoots-content`
inherited the new photograph, and all five were re-checked as images.

---

## 9. REVISION 17B — profile verification, and one asset the library corroborated

Fourteen public profiles were verified and five were held. The full ledger lives in
`config/creators.ts` (`WORKED_WITH`, `WORKED_WITH_UNVERIFIED`) and the brief's §10u §5; only the
part this **media** audit contributes is recorded here:

**`Dr 69 - sagar bhai shoot +bts\` corroborates a handle.** The client seeded `@dr.69___` for Sagar
Rathee; the live account's full name is *"Sagar Rathee Skincare"*; and this library contains a shoot
folder literally named `Dr 69`. Three independent things agreeing — the strongest identity chain in
the whole verification pass, and the library is one of the three.

**No new photograph was published from any of it.** The `Dr 69` and `Purav` folders still hold
genuine production BTS and it is still unusable for the reason §3C gives: nobody in it can be named.
The client naming those people remains the unblock, and rule 7 now applies to that too.
