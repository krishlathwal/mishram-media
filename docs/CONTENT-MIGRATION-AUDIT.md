# Content Migration Audit

> **Part 1 — investigation — complete. Part 2A — implementation — complete.**
> This document is the evidence ledger for a content-recovery pass across the old Mishram Media
> repository, the old public website, and the current Next.js rebuild.
>
> **§16 records exactly what shipped. §17 records what is still waiting on the client.**
> Everything between §1 and §15 is the original investigation, preserved as written.

Audit run: **25 August 2026.** · Implementation (Part 2A): **25 August 2026.**

**At a glance**

| | |
| --- | --- |
| Shipped | 06 / Recognition activated · About history band · Recognition `priority` defect cleared · Akash Sagar configured (unpublished) · relationship labels + verified-handle links |
| Held | 8 testimonials (rejected) · 5 B-class creators · 4 team members · influencer geography · non-profit arm · WOW Skin Science · negotiation scope row |
| Blocking assets | Akash Sagar portrait · Mishram reel source files · 2 genuine testimonials |

**Classification key**

| | |
| --- | --- |
| **A** | Verified / safe to publish. Strong source, no contradiction found. |
| **B** | Probable / needs confirmation. Evidence exists but carries ambiguity. |
| **C** | Reject. Template content, stock or generated imagery, conflicting data, unsafe brand, or an unverifiable claim. |

**Source priority used**

1. Current project + explicit user statements
2. Old Mishram Media repository
3. Old public Mishram Media website
4. Official public profiles

---

## 1. Repository identification

Both projects were identified by **structure and contents**, never by folder name. The parent
directory `F:\NGO Website` holds two candidates whose names are easy to confuse.

### CURRENT_REPO

```
F:\NGO Website\mishram-media
```

| Evidence | Result |
| --- | --- |
| `git rev-parse --show-toplevel` | `F:/NGO Website/mishram-media` — the **only** git repository of the two |
| `git log` | one commit, `f4e8dc9 Initial commit from Create Next App` |
| `git remote -v` | **no remote configured** |
| Next.js App Router | `src/app/` with `layout.tsx`, `page.tsx`, `api/inquiry/route.ts` |
| Service-page architecture | `src/components/service-page/` (ServiceHero, ServiceScope, ServiceFaq, ServicePageNav, …) |
| Service registry | `src/config/service-pages.ts` present |
| Source of truth | `docs/PROJECT-BRIEF.md` present — 4,237 lines, read in full before this audit |
| Routes | `services/{social-personal-brand-growth, influencer-marketing, performance-marketing, brand-shoots-content}`, `privacy`, `terms`, `cookies` |
| Project Inquiry | `src/components/inquiry/`, `src/config/inquiry.ts` |
| Footer V2 / transitions | `src/components/Footer.tsx`, `src/components/transition/RouteTransition.tsx` |

### OLD_REPO

```
F:\NGO Website\Mishram.Media
```

| Evidence | Result |
| --- | --- |
| Git | **not a git repository** (`fatal: not a git repository`) |
| Shape | a cPanel/FTP account dump: `public_html/`, `_backup_pre_seo/`, `awstats/`, `logs/`, `public_ftp/`, `stats/`, `.htpasswd/` |
| Pages | static HTML — `index.html`, `about.html`, `contact.html`, `socialMediaManagement.html`, `metaAds.html`, `brandshoot.html`, `webDevelopment.html`, `influencerMarketing.html`, `privacyPolicy.html`, `cookiePolicy.html`, `termsAndConditions.html` |
| Deleted pages, still in backup | `_backup_pre_seo/{testimonials,team,case,404}.html` |
| Front-end stack | jQuery 3.6, Bootstrap, GSAP, Owl Carousel, Slick, AOS, Magnific Popup, Font Awesome |
| Legacy JS named in the task | `assets/js/homepage/review.js`, `assets/js/webdevelopment/projectShowcase.js`, `assets/js/socialmediamanagment/gridSlider.js` — **all three exist** |
| Service-page architecture | absent |

**Ambiguity check.** None. One is a git-tracked Next.js 16 application; the other is a static
hosting-account dump with no VCS. The distinction did not rely on the folder name at any point.

### Related directories, deliberately out of scope

| Path | What it is | Why excluded |
| --- | --- | --- |
| `F:\NGO Website\mishramngo` | `mishram-foundation-site` — the Foundation's own site | Different entity (§10d of the brief) |
| `F:\NGO Website\aditi-landing` | "The Career Acceleration Program – Aditi Sharma" | Different person; its award images are hers (§10e) |
| `F:\NGO Website\mishram.com.zip` | archive | Same files as the extracted old site; **0 award/trophy/certificate entries** |
| `F:\NGO Website\Mishram.Media\public_html\mishrammediaupdated (2).zip` | archive, 464 files | Re-checked this pass: 175 svg / 124 png / 37 scss / 28 js / 15 html. **0 award, 0 video, 0 creator photographs.** Theme furniture only |
| `F:\NGO Website\mishramsf.zip` | 524 MB archive | Foundation material (§10d/§10e) |

### The old public website

`https://mishram-media.vercel.app/` was fetched page by page and **byte-compared** against
`OLD_REPO/public_html`:

| Page | Live bytes | Local bytes | `diff` |
| --- | --- | --- | --- |
| `/` | 58,561 | 58,561 | identical |
| `/about` | 57,965 | 57,965 | identical |
| `/contact` | 32,647 | 32,647 | — |
| `/influencerMarketing` | 68,607 | 68,607 | — |
| `/socialMediaManagement` | 62,837 | 62,837 | — |
| `/metaAds` | 63,006 | 63,006 | — |
| `/brandshoot` | 63,215 | 63,215 | — |
| `/webDevelopment` | 61,029 | 61,029 | — |

`/testimonials`, `/team`, `/case`, `/awards` all return **404** — they survive only in
`_backup_pre_seo/`.

**So the old repo and the old public site are one source, not two.** Anything found in one is in
the other.

---

## 2. Award / Recognition

### THE HEADLINE FINDING — the previous audit's rejection was wrong

`docs/PROJECT-BRIEF.md` §10e and `src/config/recognition.ts` both record:

> Two remote `*_AWARD_*.gif` on Cloudinary … **Excluded — promotional, unlabelled, hotlinked.**
> … **No award name, body, year or category appears anywhere in that markup.**

That statement is **true of the markup and false of the images.** The previous pass searched text
and never opened the files. This pass downloaded and read them.

### Evidence

| | |
| --- | --- |
| **Source** | `OLD_REPO/public_html/index.html:1592-1602` (and `_backup_pre_seo/index.html:1332-1342`) |
| Markup | `<div class="banner-container">`, two `<img>`, classes `tusharkappor-desktop` / `tusharkappor-mobile`, mobile carries `alt="Tushar Kapoor"` |
| Desktop asset | `res.cloudinary.com/dlnux9dga/image/upload/v1751801863/DESKTOP_-_AWARD_bq7qju.gif` — **2048 × 731**, 215 KB, HTTP 200 |
| Mobile asset | `res.cloudinary.com/dlnux9dga/image/upload/v1751801864/AWARD_MOBILE_jjnoxn.gif` — **360 × 400**, 35 KB, HTTP 200 |
| Method | downloaded, frames extracted and upscaled via Cloudinary transforms, read visually |

### Visible wording, read directly off both images

```
"AWARDED AS "
BEST DIGITAL MARKETING AGENCY
```

Gold badge, upper right, legible at full resolution:

```
NUFEW
2024-25
```

Also in frame: a photograph of **two men holding an award plaque** between them; a decorative gold
trophy; a second trophy graphic lower left; and a service list rendered as boxes —
`SOCIAL MEDIA MANAGEMENT`, `BRANDSHOOT`, `META/GOOGLE ADS`, `WEB DEVLOPMENT` *(sic)*.

Both the desktop and the mobile asset carry the **same** wording, badge and photograph. They are two
crops of one banner.

### Award ledger

| Field | Value | Confidence | Note |
| --- | --- | --- | --- |
| Evidence file | `DESKTOP_-_AWARD_bq7qju.gif` / `AWARD_MOBILE_jjnoxn.gif` | **A** | Both live, both referenced by Mishram's own homepage |
| Visible wording | `"AWARDED AS " BEST DIGITAL MARKETING AGENCY` | **A** | Read off the image, two independent crops |
| Award / category | **Best Digital Marketing Agency** | **A** | Verbatim |
| Organisation | **NUFEW** | **B** | Legible on the badge, but it is an abbreviation with no expansion anywhere. The full body name is not recorded |
| Year | **2024-25** | **A** | Verbatim on the badge |
| Recipient | Mishram Media | **A** *(as a claim)* | Mishram published it about themselves, on their own homepage, above their own footer |
| Recipient — person in frame | Probably **Prashant Mishra**, Founder & CMO | **B** | Strong visual resemblance to `Prashant_image_vkhpy0.png` (`about.html:1239`, `alt="Prashant"`) — same beard shape, hairline and build. Not documented in text anywhere |
| Presenter — person in frame | Possibly **Tusshar Kapoor** | **B** | Sole evidence is `alt="Tushar Kapoor"` on the *mobile* image and the CSS class `tusharkappor-*`. The desktop image carries no alt at all |
| Plaque inscription | **unreadable** | — | The plaque shows a circular logo and 1–2 lines of text. At the source's 2048 px width the plaque occupies ~90 px. Upscaling does not recover it |

### What remains unknown

1. **What NUFEW stands for.** No expansion appears in any HTML, JS, JSON-LD, `llms.txt`,
   `llms-full.txt`, sitemap or archive. `grep -i nufew` across both repositories returns **zero
   text matches** — the string exists only as pixels.
2. **The award ceremony's name, date and venue.**
3. **Whether the plaque names Mishram.Media or a person.**
4. **Confirmed identity of either person in the photograph.**

### Where it was searched

Terms: `award, awards, recognition, recognized, recognised, winner, winning, certificate, trophy,
shield, memento, honour, honor, achievement, felicitation, event, accolade, press, nufew, tushar,
kapoor`.

Searched: all `*.html`, `*.js`, `*.txt`, `*.json`, `*.css`, `*.scss` in `OLD_REPO` (Font Awesome
icon-name noise excluded); `OLD_REPO/public_html/assets/img/**` (full file listing — **bg, elements
and icons only; theme furniture, no photography**); `_backup_pre_seo/*.html`; both archives; the
live site; and `CURRENT_REPO/src/**`.

### Classification and publishing recommendation

**A — safe to publish, with the fields that are actually documented and no others.**

`src/config/recognition.ts` already models exactly this shape (`title`, optional `organisation`,
optional `year`, `type`, `image`, `alt`, optional `caption`, dev-only `source`). Proposed entry:

```
title:        "Best Digital Marketing Agency"
organisation: "NUFEW"          ← as printed; do not expand it
year:         "2024-25"        ← as printed, not "2024" or "2025"
type:         "Award"
caption:      (only if the client supplies the ceremony's name)
source:       old site index.html banner-container → DESKTOP_-_AWARD_bq7qju.gif, read visually
```

**Do not** add a presenter name, a ceremony name, a jury, a category description or a rank.

### The asset problem — see §15

The only image that exists is a **promotional banner**, not documentation: lilac gradient, clipart
trophies, a paper-plane doodle, gold stars, and the service list baked in. It is off-palette for a
site whose §10e rule is *"No gold: an awards section is not a licence to leave the palette."*

Two options, in order of preference:

1. **ASSET REQUIRED** — the original award photograph from the client (the plaque presentation
   without the banner artwork). Best outcome by a wide margin.
2. **Fallback** — crop the photograph out of the 2048 × 731 banner. Yields roughly **700 × 731**,
   which is adequate resolution, but it carries the event's own lilac backdrop and decorative gold
   stars. Stored **locally** in `public/media/recognition/` — never hotlinked (§14).

---

## 3. Testimonials

Re-verified from source rather than inherited from the previous audit. **The previous conclusion
holds, and this pass adds a further disqualifier.**

### Candidate inventory — 8 records across 3 sources

| # | Name | Role in source | Source | Avatar | Class |
| --- | --- | --- | --- | --- | --- |
| 1 | Rahul Mehta | "Social Media Influencer" | 5 service pages + `index.html` + `about.html` | `i.pravatar.cc/40?img=5` **and** `rahul_mehta_gh8cuc.png` | **C** |
| 2 | Ayesha Khan | "Social Media Influencer" | 5 service pages | `i.pravatar.cc/40?img=7` | **C** |
| 3 | Kunal Verma | "Head of Product" | 5 service pages + `index.html` + `about.html` | `i.pravatar.cc/40?img=8` **and** `kunal_verma_do6m0m.png` | **C** |
| 4 | Sneha Roy | "Head of Product" | 5 service pages | `i.pravatar.cc/40?img=8` | **C** |
| 5 | Vikram Singh | "Head of Product" | 5 service pages | `i.pravatar.cc/40?img=8` | **C** |
| 6 | **Vishnu Priya** | none | `index.html:1447`, `about.html:1496`, `llms-full.txt:103,257` | `Vishnu_priya_s7k7q9.jpg` | **C** |
| 7 | David M. | none | `_backup_pre_seo/testimonials.html` | Google review icon | **C** |
| 8 | Emily R. | none | `_backup_pre_seo/testimonials.html` | Google review icon | **C** |

**Verified: 0. Uncertain: 0. Rejected: 8.**

### The rejection reasons, stated in full

1. **`pravatar.cc` — a random-stock-face generator — supplies every service-page avatar.**
   Counted this pass across `public_html/*.html` + `_backup_pre_seo/*.html`:
   `img=8` appears **30 times**, `img=5` **10 times**, `img=7` **10 times**, and `img=1…4`
   **4 times each** in the rating box. **`img=8` is the face of three different named people** —
   Kunal Verma, Sneha Roy and Vikram Singh.

2. **NEW THIS PASS — the four *named* Cloudinary avatars are AI-generated portraits.**
   `rahul_mehta_gh8cuc.png`, `kunal_verma_do6m0m.png`, `sneha_roy_ywxeti.png` and
   `vikram_singh_s53fhy.png` were downloaded and viewed. All four show the characteristic
   generated-portrait signature: plastic, poreless skin; flawless bilateral symmetry; a synthetic
   depth-of-field background; and stock-neutral wardrobe. The previous audit recorded only the
   pravatar problem and treated these as untested. **They are not photographs of clients.**
   So *no portrait in any source connects to the person it is attached to* — by two independent
   mechanisms, not one.

3. **One quote is attributed to two people, word for word.** Confirmed at
   `index.html:1396-1402` (Rahul Mehta) and `index.html:1436-1442` (Vishnu Priya) — the identical
   *"Mishram Media completely transformed my Instagram presence…"* paragraph, twice on one page,
   under two names. Mirrored in `about.html` and `llms-full.txt:93` / `llms-full.txt:101`. At least
   one attribution is false, and nothing indicates which.
   **Vishnu Priya is a real person on the current site's creator roster**, which makes this the
   most damaging of the eight.

4. **The roles are placeholders.** Three people share "Head of Product" with no employer. Two are
   "Social Media Influencer" with no handle. No company, link, date or organisation appears in any
   record.

5. **Source C praises a different agency.** `_backup_pre_seo/testimonials.html` contains **"SEOC"**
   — the purchased template's own agency name — alongside `alt="SEOC Agency Logo"`, "David M.",
   "Emily R." and Google review icons. Deleting that page from the live site was correct.

6. **Unverifiable figures inside the quotes.** *"a 4x ROI in the first month"*, *"My conversions
   have doubled"*. Forbidden by §1.

7. **Fabricated rating furniture.** `about.html:1420-1423` renders a **`4.9`** score, **★★★★★**,
   and **`(40+ Reviews)`** with no rating platform behind any of it; `index.html` and every service
   page repeat the review count. Source C adds a Google icon implying Google reviews that do not
   exist.

### Editing decisions recorded, not taken

No quote was rewritten, trimmed or paraphrased in this audit. Had #3's quote been salvageable, the
edit would have needed recording per §10d-notes. It is not salvageable — the problem is the
attribution, not the wording.

### Consequence

`TESTIMONIALS` stays **empty** and Client Notes continues to render nothing. **Two genuine
testimonials switch the section on**, and they must come from the client's own relationships.

---

## 4. Creators

### Relationship wording in the source — read it before writing any label

| Source | Exact wording |
| --- | --- |
| `index.html:1469` (section heading over the 11-creator carousel) | **"We've successfully worked with influencers"** |
| `about.html:801` | "Today, we **collaborate with** renowned creators such as Fukra Insaan, Lovekesh Kataria, and Tehelka Bhai" |
| `about.html:1017` | "We've **collaborated with** top YouTube creators such as **Fukra Insaan**, **Lovekesh Kataria**, **Sahil Gambhir**, and **Tehelka Bhai**" |
| `influencerMarketing.html` | section heading **"Worked with influencers"** |
| `index.html:1570` | link text **"Worked with 1000+ influencers"** — an unverified count; §1 forbids migrating it |

**Nothing in the old repository or on the old site says "managed", "exclusive" or "talent roster"
about any named creator.** The old site's own ceiling is *Worked With* / *Collaborated With*.
The current site's `label: "Creator Network"` is at or slightly above that ceiling and is the safe
default for anything migrated.

The one exception is `@xbhandesiri_`, which has separate first-party evidence — see §5.

### Creator ledger

Current public roster: **5.** Historical and newly discovered candidates: **16.**

| Canonical name | Historical spelling | Old site | Old repo | Image | Image identity confidence | Handle | Relationship wording in source | On new site | Class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Zoya Jaan | Zoya Jaan / `Zoya_jaan` | ✔ | ✔ | local `.webp` | approved | — | Worked with | **Yes** | A |
| Nikita Kumawat | `Nikita_kumawat` | ✔ | ✔ | local `.webp` | approved | — | Worked with | **Yes** | A |
| Lovkesh Kataria | caption `Lovkesh`, file `lovekesh_kataria` | ✔ | ✔ | local `.webp` | approved | — | Worked with / collaborated with | **Yes** | A |
| Mukul Sharma | `mukul_sharma` | ✔ | ✔ | local `.webp` | approved | — | Worked with | **Yes** | A |
| Vishnu Priya | `Vishnu_priya` | ✔ | ✔ | local `.webp` | approved | — | Worked with | **Yes** | A |
| **Akash Sagar** | — | ✘ | ✘ | **none** | — | **`xbhandesiri_`** | **user-confirmed: currently managed** | No | **A** *(relationship)* / **asset required** |
| Fukra Insaan | `fukra_insaan` | ✔ | ✔ | remote only, 580×731 | **low** | — | collaborated with | No | **B** |
| Prerna Malhan | `Prerna_malhan` | ✔ | ✔ | remote only, 651×651 | **low** | — | worked with | No | **B** |
| Sahil Gambhir | — | ✔ (prose) | ✔ (prose) | **none** | — | — | collaborated with | No | **B** |
| Tehelka Bhai | — | ✔ (prose) | ✔ (prose) | **none** | — | — | collaborate with / collaborated with | No | **B** |
| Deepankar Maxx | — | ✘ | ✘ | none | — | `deepankarmaxx` | one shared reel on `@mishram.media` | No | **B** |
| Vijay 3 Guy | `vijay3guy` | ✔ | ✔ | remote, 1024×1536 | **rejected** | — | worked with | No | **C** |
| Irwin Javier | `irwin_javier` | ✔ | ✔ | remote, 1920×1920 | **rejected** | — | worked with | No | **C** |
| Boss Toni | `boss_toni` | ✔ | ✔ | remote, 1920×1920 | **rejected** | — | worked with | No | **C** |
| Argoni X | `argoni_x` | ✔ | ✔ | remote, 1920×1920 | **rejected** | — | worked with | No | **C** |
| *(unnamed)* | `xx_mrswag` | ✔ (image only) | ✔ | remote, 1080×1080 | **rejected** | — | **none — no caption at all** | No | **C** |

### The rejections, with the evidence

**Irwin Javier · Boss Toni · Argoni X — one stock photo series, three names.**
All three images were downloaded and viewed. All three are **1920 × 1920** formal-menswear studio
portraits shot against **the same grey arched-panelling backdrop** under the same lighting. Irwin
Javier and Argoni X are in **near-identical poses** — both gripping a suit lapel, three-quarter
turn, same eyeline. This is one commercial photoshoot set sold as stock, relabelled as three
different creators. Publishing any of them would attach a named real creator to a stock model.

**Vijay 3 Guy — generated or stock, plus an attribution error on the neighbouring tile.**
`vijay3guy_y1o7x6.png` is **1024 × 1536** — a native text-to-image output size — 2.3 MB, showing a
generically handsome man in sunglasses lit against a studio red gradient, with the smooth
synthetic skin rendering seen in the testimonial avatars. Separately, the *Fukra Insaan* tile at
`index.html:1493-1496` carries **`alt="Vijay 3 Guy"` under the caption "Fukra Insaan"** — the two
tiles' metadata is crossed, so the old site itself does not reliably know which face is whose.

**`xx_mrswag` — unnamed, and someone else's photograph.**
Referenced at `influencerMarketing.html:1017` inside the creator strip with **no caption, no alt
and no name anywhere on the site**. The image carries a third-party photographer's watermark
("MM / Mallar photography") in the lower-left corner. No relationship is stated, so there is
nothing to publish.

### The B-class candidates, and what they need

**Fukra Insaan** and **Prerna Malhan** are named, captioned, and their imagery is at least
plausibly genuine (Prerna's is a travel photograph in a hot-air balloon over what appears to be
Cappadocia, consistent with a travel creator; Fukra Insaan's is a solo styled portrait). But:

- both exist **only as hotlinked Cloudinary files** — §14 forbids hotlinking, so both need a local
  copy the client is entitled to publish;
- **neither identity can be confirmed** from anything in the project — and the crossed `alt` on the
  Fukra Insaan tile means the old site's own labelling is demonstrably unreliable for this pair;
- Prerna Malhan's source is **651 × 651**, below every current roster asset.

**Sahil Gambhir** and **Tehelka Bhai** are named in Mishram's own prose on `about.html` — good
evidence of a *collaboration*, and **no image exists anywhere** for either.

**Deepankar Maxx** appears as one collaborative reel on `@mishram.media`. Their own Instagram bio
reads *"Managed by @thisisbillgates"* — **not** Mishram. At most "Collaborated With", on one
reel's evidence.

### A note on the 1000+ figure

`index.html:1570` reads **"Worked with 1000+ influencers"**. Unverified, and §1 forbids it. It is
recorded here only so nobody mistakes it for a missing statistic. **Do not migrate.**

---

## 5. @xbhandesiri_

The user stated: *Mishram Media currently manages this creator/profile.* That alone makes the
relationship **A — user verified**. This pass then found **independent public corroboration**,
which is worth recording because it removes the need to take it on trust.

### The evidence chain

| Step | Source | Finding |
| --- | --- | --- |
| 1 | `https://www.instagram.com/xbhandesiri_/` | Display name **Akash Sagar**. Bio: *"Exploring without limits📍 / **Managed by - @filmybande** / Backup:- @masterbhandesiri"* |
| 2 | `https://www.instagram.com/filmybande/` | Display name **"Prashant mishra"**. Bio: *"🎥 Building Viral Creators & Founders / 🎬 Personal Branding for Top 1% / 🤝 **Talent Management** \| 🎥 Viral Content & Growth"*. Story highlights include **`mishram.media`** and **`mishram.ngo`** |
| 3 | `OLD_REPO/public_html/about.html:100-105` (schema.org `employee`) and `about.html:1347` (visible team block) | **Prashant Mishra — Founder & Chief Marketing Officer (CMO), Mishram.Media** |
| 4 | `https://www.instagram.com/mishram.media/` | Display name **"Mishram media"**. Bio: *"🏆 Building Top 1% Personal Brands / 🎥 Viral Content & Authority Growth / 🤝 **Talent Management** \| Influencer Marketing"* |

So the creator's own public bio credits a manager who is, by Mishram's own published schema, the
agency's founder — and whose account carries a `mishram.media` highlight. The user's statement is
consistent with every public source checked.

### Record

| Field | Value | Class |
| --- | --- | --- |
| Exact handle | **`xbhandesiri_`** (trailing underscore is part of the handle) | **A** |
| Current display name | **Akash Sagar** | **A** — read off the live profile |
| Public profile URL | `https://www.instagram.com/xbhandesiri_/` | **A** |
| Relationship | Currently managed by Mishram Media | **A** — user-confirmed + corroborated above |
| Existing asset in `CURRENT_REPO` | **none** — `public/media/creators/` holds exactly 5 `.webp` files | — |
| Existing asset in `OLD_REPO` | **none** — `grep -i "bhandesiri"` returns zero matches across the old repo and the live site | — |
| Usable image | **IMAGE NEEDED** | — |

### One caveat the client should settle

The bio names **`@filmybande`** — the founder's personal account — not `@mishram.media`. That is
normal for talent management run through a founder's profile, and the corroboration chain closes
it, but it means **no public page anywhere states "managed by Mishram Media" in those words.**

Two safe options for Part 2:

- **`Currently Managed`** — supported by the user's explicit confirmation plus the chain above, and
  by both Mishram accounts publicly describing themselves as doing "Talent Management".
- **`Creator Network`** — the label all five current creators carry. Zero incremental risk, and
  loses the distinction the user is asking to show.

**Recommendation: `Currently Managed`**, on the user's confirmation. The label field in
`config/creators.ts` is a free string, so this is a one-line change either way.

### Metrics — deliberately not carried

The live profile displays a follower figure. It is **not recorded in this document and must not be
published**, per the task instruction and §10b. No engagement rate, view count or audience
statistic is to be attached to this creator or any other.

### Image

Do **not** hotlink Instagram, and do **not** substitute a stock or generated portrait. Required: a
portrait Mishram is entitled to publish, ideally matching the roster's existing shape (the frame is
3:4; sources between 1:1 and 9:16 all work — see §10b's per-creator crop table).

---

## 6. Company history

Verbatim from `OLD_REPO/public_html/about.html:790-800`, mirrored word for word in
`_backup_pre_seo/about.html:549-559` and `llms-full.txt:147`:

> "Our journey began in **2021** under the name **Starcrown Media**, with a focused mission on
> influencer marketing. As client demands expanded, so did our capabilities. By **2023**, we were
> offering services like paid ads, content creation, and web development. In **2025**, we rebranded
> to **Mishram.Media** to better reflect our broader vision and impact."

### History ledger

| Year | Claim | Source(s) | Confidence | Safe to publish |
| --- | --- | --- | --- | --- |
| **2021** | Founded as **Starcrown Media**, focused on influencer marketing | `about.html` (live + backup), `llms-full.txt:147` | **A** | **Yes** |
| **2023** | Expanded into paid ads, content creation and web development | same | **A** | **Yes** |
| **2025** | Rebranded to **Mishram.Media** | same | **A** | **Yes** |
| — | Origin is **influencer marketing**, not general digital marketing | same | **A** | **Yes** — and it is the strongest available support for §10a's "Creator-Native" differentiator |
| — | Non-profit arm: **Starcrownmedia Zone Foundation**, described as feeding underprivileged children and environmental action | `about.html:1171` / `llms-full.txt:171-179`; the name is corroborated by the separate `mishramngo` project and by the `mishram.ngo` highlight on `@filmybande` | **B** | **Confirm first** — the entity name links the agency to a different legal body, and the current site says nothing about an NGO |
| — | Founding **date** more precise than the year | — | — | **No** — none exists |
| — | Headcount, client count, years-in-business, campaign count | — | — | **No** — none exists; §1 forbids inventing them |

**All three milestones are self-reported by Mishram on their own about page.** That is exactly the
provenance §10f already accepted for the About chapter's emphasis line, which is verbatim from the
same document's schema.org `description`. They are consistent across the live page, the pre-SEO
backup and the machine-readable summary, with no contradicting version anywhere.

**Worth noting for the About page build.** §19's "Exact next step" instructs the dedicated About
page to carry **no founding date**. That instruction was written when the only history evidence was
assumed to be absent. The 2021 / 2023 / 2025 chronology **is** documented, in Mishram's own words,
in three places. It is a decision for the user whether to relax that constraint — this audit does
not take it.

---

## 7. Team / people

Four people are named in **both** the visible markup and the schema.org `employee` array. This is
stronger evidence than §10f records — the brief says the old page "does list four role titles",
where in fact it lists four **names and** titles, and declares them in structured data.

| Name | Historical role | Source | Current evidence | Recommendation |
| --- | --- | --- | --- | --- |
| **Prashant Mishra** | Founder & Chief Marketing Officer (CMO) | `about.html:1347` (visible) + `about.html:101-104` (schema `employee`) + `llms.txt` | **Yes, partial** — `@filmybande` is publicly "Prashant mishra", carries a `mishram.media` highlight, and is named as manager on `@xbhandesiri_` | **B — needs current confirmation.** Strongest of the four, but "Founder" and "CMO" are separate claims and only the first is corroborated |
| **Upendra Singh** | Chief Client Officer | `about.html:1363` + schema `employee` | none found | **B — needs current confirmation** |
| **Subhash Kumar** | Influencer Marketing Manager | `about.html:1379` + schema `employee` | none found | **B — needs current confirmation** |
| **Abhishek Gautam** | Chief Financial Officer (CFO) | `about.html:1395` + schema `employee` | none found | **B — needs current confirmation** |

### Headshots — all unusable

| Person | Asset | Problem |
| --- | --- | --- |
| Prashant Mishra | `v1751739281/1_xnj5ig.gif` | Numbered placeholder filename, remote-only |
| Upendra Singh | `v1751739281/2_ji5r8y.gif` | Same |
| Subhash Kumar | `v1751739281/4_amyzea.gif` | Same — **and note the sequence skips 3** |
| Abhishek Gautam | `v1751739281/5_k0nkzb.gif` | Same |

All four are hotlinked (§14) and all four carry `alt=""`. The one photograph on the old site with
a person's name in its filename — `v1751701847/Prashant_image_vkhpy0.png`, `alt="Prashant"` — is
**also reused decoratively as the hero image of `brandshoot.html:869`**, so the old site does not
treat it as a portrait of record.

### Recommendation

**Do not publish any team member in Part 2.** §10f's reasoning stands unchanged and is reinforced:
staff change, no headshot is usable, and a team block is outside the current About chapter's design.
The names are recorded here so the client can confirm or correct them if a team block is ever
wanted.

---

## 8. Contact / location conflicts

**No change is proposed to `src/config/site.ts`.** This table exists so the conflicts are documented
rather than rediscovered.

### Email

| Value | Occurrences | Where | Verdict |
| --- | --- | --- | --- |
| `mediamishram@gmail.com` | **63** | every page; schema `email`; every real `mailto:` href | **A — current site is correct** |
| `info@mishram.com` | 16 | footer **display text only** on all 11 pages | **C** — `index.html:1641` renders the *text* `info@mishram.com` inside `<a href="mailto:mediamishram@gmail.com">`. The old footer contradicts its own link |
| `support@mishram.com` | 1 | `privacyPolicy.html` | **C** — legal-template leftover |
| `email@example.com` | 3 | template placeholders | **C** |

### Phone

| Value | Occurrences | Where | Verdict |
| --- | --- | --- | --- |
| `+91 63993 99333` | 33 + 25 + 11 + 6 across formats | schema `telephone`, footer, every `tel:` href, `llms.txt` | **A — current site is correct** |
| `+91-9548278558` | 22 | schema only — `Place: Nainital` and a `ContactPoint` | **B — branch line, never displayed** |
| `+91-7248439633` | 22 | schema only — `Place: Bareilly` and a `ContactPoint` | **B — branch line, never displayed** |
| `+91 87550 65397` | 2 | isolated | **C** |
| `+91 6393939333` | 3 | `cookiePolicy`, `privacyPolicy`, `termsAndConditions` | **C — a digit-transposed typo of the real number** |

### WhatsApp

| Value | Verdict |
| --- | --- |
| `wa.me/916399399333` (57×) | **A** — matches the current site's `whatsappHref` |
| `wa.link/90ehhj` (6×) | **B** — an opaque shortlink; the current site's direct `wa.me` form is better |

### Location — the conflict is real and unresolved

| Source | Head office | Other |
| --- | --- | --- |
| `about.html:185-195` **(visible page)** | **28kh, Rameshwarpur, Lalpur, US Nagar, Uttarakhand** | Rajendra Nagar, Bareilly, UP · Ekta Residency, Chhatarpur, Delhi |
| `index.html:1642` **(visible footer)** | **28kh, Rameshwarpur, Lalpur, US Nagar, Uttarakhand, India** | — |
| `index.html:52-89` **(schema.org)** | `addressLocality: "New Delhi"` | `Place: New Delhi` · **`Place: Nainital, Uttarakhand`** · `Place: Bareilly` |
| `llms.txt` | "Offices: **New Delhi**; **Nainital**, Uttarakhand; Bareilly" | — |
| `llms-full.txt:13` | "a digital marketing agency in **New Delhi**" | — |

**Two irreconcilable readings.** The visible pages say the head office is in **US Nagar** and the
Delhi site is a *branch*; the structured data says the organisation's address **is New Delhi** and
places the Uttarakhand office in **Nainital** — a different district from US Nagar entirely.

**The current site's decision is correct and should stand.** `BRANCH.locator = "India"` is the one
locator no source contradicts, and `CONTACT.address` uses the US Nagar address, which is the value
carried by **two** visible surfaces against schema's one. **Do not change `INDIA` in Part 2.**

---

## 9. Brands / collaborations

### PERMANENT EXCLUSION — confirmed still excluded

Per §9 of the brief, these are **never rendered on any surface of this site, in any state**. Full
list as it appears in the old site's `alt` attributes, each on **14 occurrences** (7 pages × 2
rails):

`1xbet` · `binomo` · `captial.com` *(sic)* · `currency.com` · `dream11` · `glory casino` ·
`leon` · `mel bet` · `mpl` · `my 11 circle` · `Octa Fx` · `olymp trade` · `pari match` ·
`pocket option` · `slottica` · `winzo`

Sixteen names: betting, casino, fantasy/real-money gaming, and offshore CFD/binary-options brands.
**They are rejected under permanent project brand-safety policy and are not candidates.** They
appear here as a rejection record only.

Two additional notes:

- `brandshoot.html` carries an **18-image gallery** whose alt text is **15 excluded brands and 3
  permitted ones** (upstox, mama earth, cash karo). §10n already disqualified it wholesale; this
  pass re-counted and confirms it. Nothing in it is usable.
- `about.html:1017` names **"Slotica"** in the same sentence as the permitted brands. **Do not quote
  that sentence verbatim** anywhere in Part 2.

### Brand ledger — safe candidates

| Brand | Source | Logo asset | Relationship wording | Evidence confidence | On current site | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| Mamaearth | logo rail, all pages | local `.png` pair | "Worked with brands" | A | **Yes** | no change |
| Groww | logo rail, all pages | local `.png` pair | "Worked with brands" | A | **Yes** | no change |
| Muuchstac | logo rail, all pages | local `.png` pair | "Worked with brands" | A | **Yes** | no change |
| CashKaro | logo rail, all pages | local `.png` pair | "Worked with brands" | A | **Yes** | no change |
| Upstox | logo rail, all pages | local `.png` pair | "Worked with brands" | A | **Yes** | no change |
| **WOW Skin Science** | `about.html:802` — *"partner with top brands like Mamaearth, WOW Skin Science, and Groww"*; `about.html:1019` — *"our clients include Mamaearth, WOW Skin Science, Upstox, Groww…"* | **none — prose only, no logo anywhere** | "partner with" / "our clients include" | **B** | No | **Needs client confirmation + a logo asset.** See below |

**WOW Skin Science is the only new safe brand candidate in the entire old estate.** Its evidence is
genuinely reasonable — named twice, in Mishram's own prose, in the same breath as four brands
already approved. But:

- it appears in **no logo rail on any page**, so there is no artwork to migrate;
- adding it needs the same two-layer mask + colour treatment the other five have (§8), generated
  from a source Mishram is entitled to use;
- **§8 says explicitly: "Do not add or remove brands without explicit approval."**

**Recommendation: hold for user confirmation.** §8 also notes "4–6 verified names beats a longer
list" — five is already inside that band, so this is optional rather than a gap.

---

## 10. Selected Work / videos

### The previous audit's conclusion needs one correction

§10d states: *"A bounded search of the whole workspace … found **no agency video of any kind**."*
That is **accurate for the filesystem** — re-verified this pass, including the 464-file
`mishrammediaupdated (2).zip`, which contains zero `.mp4` / `.mov` / `.webm`. But the old site
also references remote media, and one video was missed.

### Video ledger

| # | File | Where | Duration / size | Content | Identifiable creator/brand | Mishram relationship | Safe | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `res.cloudinary.com/dlnux9dga/video/upload/v1751055974/**INFLUENCERS_to4v66.mp4**` | `influencerMarketing.html:947` and `_backup_pre_seo/influencerMarketing.html:691` | 7.5 MB, 1:1 square | **A promotional explainer graphic**, not a reel. Lilac/purple gradient, title card *"INFLUENCER DISCOVERY & COLLABORATION"*, two captioned boxes (*"Find & vet influencers"*, *"Manage end-to-end collaboration"*), and a small embedded clip of a person filming a product piece to camera | none named | Mishram's own marketing asset | Yes | **C — REJECT for Selected Work.** It is a marketing infographic in the old brand's purple language, 1:1 rather than 9:16, with baked-in text overlays. §10d's rule is that Selected Work shows work, not advertising about the work. **Also note it is placed inside an `<img src="…mp4">` tag**, so it never played on the old site either |
| 2–4 | `mishramngo/public/video/*.mp4` (3 files, 44–96 MB) | Foundation project | — | NGO relief films | Mishram Foundation | **different entity** | — | **C — unchanged from §10d** |

### THE ACTUAL FINDING — genuine Mishram Media reels exist, off-workspace

`https://www.instagram.com/mishram.media/` was inspected this pass. The public grid exposes
**12 reel permalinks**, of which **9 are native to `@mishram.media`**:

```
/mishram.media/reel/DMF6MvRyG7Y/     /mishram.media/reel/DMP24O8yINQ/
/mishram.media/reel/DMfeo_dyIPe/     /mishram.media/reel/DMxtjS9SvQu/
/mishram.media/reel/DMaQCe7SCbw/     /mishram.media/reel/DNNv_g2y1jJ/
/mishram.media/reel/DMuxFA7ysyv/     /mishram.media/reel/DMpmUXvyuLR/
/mishram.media/reel/DM-MuUdSdcA/
```

Plus three collaborations surfaced on the same grid — two with **`@filmybande`**
(`/filmybande/reel/DMIHeimBZ5n/`, `/filmybande/reel/DPLyripAdJs/`) and one with
**`@deepankarmaxx`** (`/deepankarmaxx/reel/DNxF9lxUClv/`).

**This changes the shape of blocker #2 in §19.** It is not "no Mishram Media video exists" — it is
"the video exists and is not in the workspace." The unblock is narrower and much easier than the
brief assumes: **the client exports the source MP4s from their own account.**

**These reels must not be scraped, hotlinked or embedded from Instagram.** §14 requires local
assets, and the platform's terms are a separate reason. The permalinks above are recorded purely so
the client can identify which files to send.

---

## 11. Other missing information

Genuinely useful omissions found in the old estate. Fabricated metrics, pricing and guarantees are
excluded by definition and are listed at the end rather than here.

| # | Item | Source | Why it matters | Class |
| --- | --- | --- | --- | --- |
| 1 | **Influencer marketing operates across India, the Philippines, Bangladesh, Nepal and Morocco** | `influencerMarketing.html`, `llms-full.txt:182,188` | A real capability the current site does not state. It also independently explains the presence of Filipino names in the old creator carousel | **B** — Mishram's own claim; confirm it is still true |
| 2 | **Mishram handles creator outreach, negotiations and briefs** | `influencerMarketing.html:952-956` — *"manage outreach, **negotiations**, and briefs, and build strong, long-term collaborations"* | **Directly relevant to §10l**, which deliberately omits negotiation from the Influencer Marketing scope index on the grounds that "the project holds no evidence Mishram manages any of them." Evidence now exists — Mishram's own service copy | **B** — one client confirmation promotes it to a scope row |
| 3 | **Prior brand identity: Starcrown Media (2021–2025)** | `about.html` | Company story; see §6 | **A** |
| 4 | **Non-profit arm: Starcrownmedia Zone Foundation / Mishram.NGO** | `about.html:1171`, corroborated by the `mishramngo` project and the `mishram.ngo` highlight on `@filmybande` | The current site says nothing about it. Only publish if the client wants the association | **B** |
| 5 | **Current self-positioning: "Talent Management", "Building Top 1% Personal Brands", "Viral Content & Authority Growth"** | `@mishram.media` and `@filmybande` Instagram bios | This is how Mishram describes itself **today**, and it supports a management relationship (§5) more directly than the old site's "worked with" ever did | **A** — first-party public profile |
| 6 | **Facebook profile is `facebook.com/mishram`** | schema `sameAs` on every page | Already on the current site; re-confirmed this pass | **A** |
| 7 | **LinkedIn** | — | Re-checked: the old site's only LinkedIn reference is a bare `linkedin.com` in the template's social row, absent from `sameAs`. **No profile URL exists.** §10k's suppressed row stays suppressed | **C** |

### Explicitly NOT treated as missing information

Recorded so a later pass does not "restore" them:

- Pricing tiers (`₹2xxxx` / `₹3xxxx` / `₹5xxxx` monthly; `₹499` per image; `₹2,499`; `₹6,999`)
- *"Organic reach by 100% / 200% / 300% guaranteed"*
- *"20K+ Views Guaranteed"*, *"60K+ Views Guaranteed"*, *"150K–200K+ Reach Guaranteed"*
- *"500+ Quality Leads Guaranteed"*, *"900+ Qualified Leads Guaranteed"*
- *"4x ROI in the first month"*, *"conversions have doubled"*
- **`4.9`** rating, **★★★★★**, **`(40+ Reviews)`**
- *"Worked with 1000+ influencers"*
- The Mishram-vs-Others comparison table (*"Affordable prices"* vs *"Higher prices"*, etc.)
- *"Ready to Take Your Brand to The Next Level?"* — §1 forbids "next level" by name

---

## 12. Ready to implement — no further user input needed

| # | Item | Where it lands | Change required |
| --- | --- | --- | --- |
| 1 | **06 / Recognition — the NUFEW award**, as `title: "Best Digital Marketing Agency"`, `organisation: "NUFEW"`, `year: "2024-25"`, `type: "Award"` | `src/config/recognition.ts` | One `RECOGNITION_ITEMS` entry **+ a local image** (see §15 — this is the one dependency). About renumbers `06 → 07` on its own via `ABOUT_CHAPTER` |
| 2 | **Company history — 2021 Starcrown Media → 2023 service expansion → 2025 Mishram.Media rebrand** | About copy, `src/config/about.ts` | Copy addition with a `source` note. Verbatim-traceable to `about.html` |
| 3 | **`@xbhandesiri_` / Akash Sagar added to the creator roster** | `src/config/creators.ts` | One `CREATORS` entry **+ a local portrait** (§15). Relationship label `Currently Managed` |
| 4 | **Remove the stale `priority` flag on Recognition's dominant image** | `src/components/recognition/RecognitionMedia.tsx` | §10i already flagged this as "harmless while the section renders nothing; remove it when that section is populated." Populating it in item 1 makes it live |

Items 2 and 4 need **nothing at all** from the user. Items 1 and 3 are blocked only on an asset.

---

## 13. Needs user confirmation

| # | Question | Why it is blocked | Default if unanswered |
| --- | --- | --- | --- |
| 1 | **What does NUFEW stand for?** And what was the ceremony called? | The string exists only as pixels on a badge — zero text matches across both repositories | Publish `organisation: "NUFEW"` exactly as printed; leave the ceremony unnamed |
| 2 | **Is the man receiving the award Prashant Mishra?** Is the presenter Tusshar Kapoor? | Strong resemblance and an `alt` attribute, neither of them documentation | Name nobody. The recognition entry needs no person in it |
| 3 | **Label `@xbhandesiri_` as `Currently Managed`, or `Creator Network`?** | The creator's bio credits `@filmybande` (the founder's account), not the agency by name | `Currently Managed`, on the user's explicit confirmation |
| 4 | **Are Fukra Insaan and Prerna Malhan publishable?** Confirm identity, and supply images Mishram is entitled to use | Hotlinked only; identity unverifiable; the Fukra Insaan tile's own `alt` says "Vijay 3 Guy" | Leave both off |
| 5 | **Sahil Gambhir and Tehelka Bhai** — collaborations named in Mishram's own prose, but no image exists | The roster is closed to entries without approved photography (§10b) | Leave both off |
| 6 | **Add WOW Skin Science to the collaboration rail?** | §8 requires explicit approval for any brand change, and no logo asset exists | Leave the rail at five |
| 7 | **Publish the influencer geography** (India, Philippines, Bangladesh, Nepal, Morocco)? | Mishram's own claim; needs to still be true | Omit |
| 8 | **Promote `negotiation` / creator coordination to the Influencer Marketing scope index?** | §10l omitted it for lack of evidence; the old site's own copy is now that evidence | Leave the scope as built |
| 9 | **Should the site acknowledge Mishram.NGO / Starcrownmedia Zone Foundation?** | Links the agency to a separate legal entity | Omit |
| 10 | **May the 2021 founding year be published?** | §19's About-page instruction says "no founding date" — written before this evidence was found | Follow §19 and omit, until the user relaxes it |
| 11 | **Team members** — are the four names still current? | Staff change; no usable headshot exists | Publish none (§10f stands) |

---

## 14. Rejected material

| Item | Count | Reason |
| --- | --- | --- |
| Testimonials | **8 of 8** | pravatar stock avatars (`img=8` = three different named people), AI-generated named avatars, one quote under two names verbatim, placeholder job titles, unverifiable ROI figures, and a page praising the template's own agency ("SEOC") |
| Rating furniture | all | `4.9`, ★★★★★, `(40+ Reviews)` — no rating platform exists |
| Creator portraits — Irwin Javier, Boss Toni, Argoni X | 3 | One 1920×1920 stock menswear photoshoot series, same grey arched backdrop, two in near-identical poses, sold as three different creators |
| Creator portrait — Vijay 3 Guy | 1 | 1024×1536 generated/stock studio portrait; and the neighbouring Fukra Insaan tile carries `alt="Vijay 3 Guy"`, so the old site's own labelling is unreliable here |
| Creator image — `xx_mrswag` | 1 | Unnamed on the site, no relationship stated, third-party photographer's watermark |
| Team headshots | 4 | Numbered placeholder GIFs (`1_`, `2_`, `4_`, `5_` — sequence skips 3), hotlinked, `alt=""` |
| Brand logos — betting / casino / fantasy gaming / offshore CFD | **16** | **Permanent project brand-safety policy (§9).** Not candidates in any form |
| `brandshoot.html` gallery | 18 images | 15 of 18 are excluded categories; all hotlinked; the 3 permitted are already on the rail |
| `INFLUENCERS_to4v66.mp4` | 1 | Promotional explainer graphic, 1:1, purple brand language, baked-in text; not creator or campaign work |
| Foundation videos | 3 | Different entity, and 44–96 MB each |
| `info@mishram.com`, `support@mishram.com`, `+91 6393939333`, `+91 87550 65397`, `email@example.com` | 5 | Contradicted by the site's own links, or template leftovers, or a digit-transposition typo |
| Pricing, guarantees, reach/lead promises, "1000+ influencers", "next level" | all | §1 |
| LinkedIn URL | — | Only ever a bare `linkedin.com` in the template's social row; absent from `sameAs` |

---

## 15. Asset requirements

Everything below is a **verified relationship or fact with no usable media**. Each is one config
entry away from working once the file lands.

| # | Asset | For | Blocking | Notes |
| --- | --- | --- | --- | --- |
| 1 | **A photograph of the NUFEW award** | 06 / Recognition | **Yes — item 1 of §12** | Preferred: the original presentation photograph, without the promotional banner artwork. Fallback: crop the photo region out of the 2048×731 banner (~700×731, adequate resolution, but carries the event's lilac backdrop and gold star decoration, which fights §10e's "no gold" rule). Store locally in `public/media/recognition/` — never hotlink |
| 2 | **A portrait of Akash Sagar (`@xbhandesiri_`)** | 03 / Creators | **Yes — item 3 of §12** | Frame is 3:4; 1:1, 4:5 and 9:16 sources all crop cleanly (§10b). Do not hotlink Instagram, do not substitute stock. `public/media/creators/` |
| 3 | **Genuine Mishram Media reel source files** | 05 / Selected Work | Yes | **They exist** — at least 9 on `@mishram.media` (§10). The playback path in `WorkMedia` is built and smoke-tested; a real reel is `mediaType: "video"` + `src`. §10d notes the path has never run against real decodable media — worth one smoke test when the first arrives |
| 4 | Two genuine client testimonials | Client Notes | Yes | Zero of eight candidates cleared. The client can supply these from their own relationships. Written permission to publish a name is worth having on file |
| 5 | Portraits for Fukra Insaan / Prerna Malhan | 03 / Creators | Only if §13 item 4 is approved | Current sources are hotlinked and identity-unverified; Prerna's is 651×651, below every current roster asset |
| 6 | A WOW Skin Science logo | 01 / Collaborations | Only if §13 item 6 is approved | Needs the two-layer mask + colour treatment the other five use (§8) |
| 7 | A solo portrait of Lovkesh Kataria | 03 / Creators, 05 / Selected Work | No — pre-existing | Carried over from §19. The current asset is the roster's only two-person photograph, and a solo frame would make him usable in Selected Work, which needs vertical crops |
| 8 | A LinkedIn profile URL | Footer V2 | No — pre-existing | Filling `SOCIAL_URLS.linkedin` turns the present-but-unlinked row into a real link with zero component edits |
| 9 | A genuine agency / BTS photograph | About | No — pre-existing | §10f: would slot into the right column. `@mishram.media` and `@filmybande` both carry `BTS` story highlights, so material likely exists |

---

## 16. IMPLEMENTED — Part 2A, 25 August 2026

Full technical record: **§10p of `docs/PROJECT-BRIEF.md`.**

### 16.1 · 06 / Recognition — activated

| | |
| --- | --- |
| Config | `src/config/recognition.ts` — one `RECOGNITION_ITEMS` entry |
| Public title | **Best Digital Marketing Agency** |
| Public detail line | **NUFEW · 2024–25** (in-frame tag and caption both) |
| Public caption | "Recognition for Mishram Media's work in digital marketing." |
| Asset | `public/media/recognition/mishram-best-digital-marketing-agency-nufew-2024-25.webp` — **850×680 (5:4), 108 KB**, cropped from the 2048×731 original at `left 1198, top 45` and converted with `sharp`. **Local, never hotlinked.** |
| Loading | **lazy**, `fetchpriority="auto"`, **no preload** |
| Position | **Selected Work → Recognition → About**, 0px boundaries both sides |
| Height | **1,309px / 1.45 viewports** |

**Held to exactly what the image supports.** `NUFEW` is not expanded — it appears nowhere as text
in either repository. Neither person in the photograph is named. No rank, scale or jurisdiction.
Nothing quoted from the illegible plaque.

**Visual treatment**: the existing §10e design controls it — `saturate(0.94)` at rest, hairline
frame, canvas-token veil, caption in the site's own type. **No CSS changed, no gold added, no
trophy iconography.** The crop excludes the source banner's promotional headline typography and
clipart trophies; the lilac field that remains is the event's own backdrop, unretouched.

**The §10i `priority` defect is cleared.** `priority={dominant}` removed from `Recognition.tsx`,
**and the `priority` prop deleted from `RecognitionMedia.tsx`** so it cannot be reinstated.

**Adaptive numbering derived correctly**: About renders **`07 / ABOUT`** with no code change.

### 16.2 · About — the history band

`src/config/about.ts` gains `HISTORY`; `src/components/about/About.tsx` gains a `History`
component. Public wording:

| | | |
| --- | --- | --- |
| **2021** | Starcrown Media | Founded as an influencer marketing practice. |
| **2023** | New disciplines | Paid media, content production and web development joined it. |
| **2025** | Mishram.Media | Rebranded to reflect the wider practice. |

Three moments on one hairline with the teal tick grammar the service pages already use — **not a
timeline**, no axis, no arrows, no cards, nothing selectable. Traceable to one sentence in the old
`about.html`, identical in the pre-SEO backup and in `llms-full.txt`.

**Not imported from the same sentence**: its "broader vision and impact" (marketing language), any
growth claim, and the non-profit arm it also names.

**Cost +212px**, offset by two one-step spacing reductions → About **1,223 → 1,403px (1.56
viewports)**, in line with Project Inquiry's accepted 1.53.

### 16.3 · Akash Sagar — configured, deliberately unpublished

`src/config/creators.ts` — full record at roster position **2**, `published: false`.

| Field | Value |
| --- | --- |
| Name | **Akash Sagar** |
| Handle | **`xbhandesiri_`** |
| Label | **`Currently Managed`** — his alone; the historical five keep `Creator Network` |
| Image | **`/media/creators/akash-sagar.webp` — DOES NOT EXIST YET** |

**The one bounded image attempt was made and failed.** This repo: nothing. Old repo:
`grep -i bhandesiri` returns zero matches. Official profile: the only exposed asset is a
**150×150** avatar, **no `srcset`, no larger variant** — about 7% of the pixels the portrait frame
needs. Stock, scraped substitutes, fan-page crops and generated portraits are all excluded, and
hotlinking Instagram is excluded twice over.

**Verified against a temporary config, then reverted**: publishing him renders roster **02**,
header `SELECTED CREATORS / 06`, label `CURRENTLY MANAGED`, and the handle as a working link with
`aria-label="Akash Sagar on Instagram"` — **and media loading stays bounded at 3 nodes / 1 source.**

### 16.4 · Two generic capabilities, one accessibility fix

- **Relationship labels** — already a per-creator free string, so no schema change was needed.
- **A verified handle now renders as a real external link** — `@handle ↗`, `target="_blank"`,
  `rel="noopener noreferrer"`, `aria-label="<Name> on Instagram"`. Renders **only where configured**,
  which is nowhere on the public page today.
- **`inert` on inactive `CreatorMeta` lines.** They carried `aria-hidden` only, which leaves them
  in the tab order — harmless until the block contained a link, which it now can.

### 16.5 · Deliberately NOT implemented

Client Notes remains suppressed (`#client-notes` absent from the DOM). No B- or C-class creator was
added. No team member, no influencer geography, no non-profit story, no WOW Skin Science, no
negotiation scope row, no `/about` route, no Web & Digital Experiences page, no deployment.

**No stale testimonial data exists in `src/`** — `TESTIMONIALS` is `[]` and the rejected candidates
live only in the audit prose in `config/testimonials.ts` and in this document. Nothing can reach
production by accident.

### 16.6 · Measured, before → after (1440×900)

| | Before | After |
| --- | --- | --- |
| Homepage height | 16,122px | **17,612px** (19.57 vp) |
| Recognition | absent | **1,309px** |
| About | 1,223px | **1,403px** |
| Public creator roster | 5 | **5** (+1 configured, unpublished) |
| Image nodes | 23 | **24** |
| Creator image nodes / sources at rest | 3 / 1 | **3 / 1** |
| Eager images · image preloads | 0 · 0 | **0 · 0** |
| Canvases · videos | 1 · 0 | **1 · 0** |
| Horizontal overflow | none | **none** |

Types, lint and production build all clean; all 8 public routes statically prerendered.

---

## 17. STILL NEEDS USER INPUT

Ordered by what unblocks the most.

### Assets (each one flips a switch that is already built)

| # | Asset | Unblocks |
| --- | --- | --- |
| 1 | **A portrait of Akash Sagar** Mishram is entitled to publish | His roster entry — everything else is configured. Frame is 3:4; 1:1, 4:5 and 9:16 sources all crop cleanly |
| 2 | **Mishram Media reel source files** (MP4). At least 9 exist on `@mishram.media`; permalinks in §10 | 05 / Selected Work — the playback path is built and smoke-tested |
| 3 | **Two genuine client testimonials** | Client Notes. Must be **new** first-party material; the old set is closed |
| 4 | **The original NUFEW award photograph**, without the promotional banner artwork | Would replace the current crop with a cleaner asset. **Optional** — the section works now |

### Questions

| # | Question | Default if unanswered |
| --- | --- | --- |
| 5 | **What does NUFEW stand for?** And what was the ceremony called? | Ship `NUFEW` exactly as printed — already done |
| 6 | Confirm the people in the award photograph? | Name nobody — already done |
| 7 | **Fukra Insaan / Prerna Malhan** — confirm identity and supply usable images? | Stay off the roster |
| 8 | **Sahil Gambhir / Tehelka Bhai** — named in Mishram's own prose, no image exists anywhere | Stay off |
| 9 | **Deepankar Maxx** — one shared reel; his bio credits a different manager | Stays off |
| 10 | **Add WOW Skin Science** to the collaboration rail? Needs approval **and** a logo asset | Rail stays at five |
| 11 | **Publish the influencer geography** (India, Philippines, Bangladesh, Nepal, Morocco)? | Omitted |
| 12 | **Promote negotiation / creator coordination** to the Influencer Marketing scope index? Evidence now exists | Scope unchanged |
| 13 | **Acknowledge Mishram.NGO / Starcrownmedia Zone Foundation?** | Omitted |
| 14 | **Team** — are the four names still current, and are there usable headshots? | Publish none |
| 15 | **A LinkedIn profile URL** | Row stays present and unlinked |

### Review

| # | |
| --- | --- |
| 16 | **Look at §06 Recognition and About's history band on a real screen.** No composited screenshot was available this session, so both were verified by measurement. The award *photograph* was reviewed as an image file; the *sections* have not been seen. Service 03's compositions are still outstanding from Revision 11 |

---

## Corrections to `docs/PROJECT-BRIEF.md`

Three statements in the brief were contradicted by this pass. **All three were corrected in Part 2A**
— superseded in place, with the original reasoning preserved rather than rewritten.

| § | Brief says | This audit found |
| --- | --- | --- |
| **§10e** and `config/recognition.ts` | The `*_AWARD_*.gif` files are "promotional, unlabelled" and *"No award name, body, year or category appears anywhere in that markup"* | **True of the markup, false of the images.** They read `"AWARDED AS " BEST DIGITAL MARKETING AGENCY` with a `NUFEW 2024-25` badge. The previous pass searched text and never opened the files |
| **§10d** and `config/work.ts` | *"no agency video of any kind"* anywhere in the workspace | **True of the filesystem, incomplete overall.** One video is hotlinked from the old site (`INFLUENCERS_to4v66.mp4` — rejected on its own merits), and **at least 9 genuine reels exist on `@mishram.media`** |
| **§10d-notes** | The testimonial disqualifier is `pravatar.cc` on the service pages | Correct, **and** the four *named* Cloudinary avatars used on `index.html` / `about.html` are **AI-generated portraits** — a second, independent disqualifier the previous pass did not test |

---

## Verification record

- `docs/PROJECT-BRIEF.md` read **in full** (4,237 lines) before any conclusion was drawn.
- Both repositories identified by structure, git state and file inventory — **never by folder name**.
- Live old site fetched page by page and byte-compared against the local copy: **identical**.
- Award GIFs **downloaded and read visually** at source resolution, with region crops upscaled
  through Cloudinary transforms.
- All 6 candidate creator images, the founder photograph, 4 testimonial avatars and 2 team
  headshots **downloaded and viewed**, not inferred from filenames.
- 70 unique Cloudinary asset URLs extracted from the old site and reconciled against the markup.
- Instagram profiles read for `@xbhandesiri_`, `@filmybande`, `@mishram.media`, `@deepankarmaxx`.
- Archives re-listed: `mishram.com.zip` and `mishrammediaupdated (2).zip` — 0 award, 0 video,
  0 photographic assets.
- **Part 1 modified no production source file.** Part 2A's changes are listed in §16 and §10p of
  the brief.

### Part 2A verification (25 August 2026)

- Repository re-confirmed as `F:\NGO Website\mishram-media` before any edit.
- `npx tsc --noEmit` — clean. `npx eslint src` — clean. `npm run build` — succeeded, **8 public
  routes statically prerendered**, no LCP warnings.
- Homepage measured at **1440×900** and at the pane's mobile setting; section order, heights,
  boundaries, numbering, image counts, loading flags, canvas/video counts and horizontal overflow
  all recorded in §16.6.
- **Both themes probed through the semantic tokens** with transitions forced off, to defeat the
  non-compositing artefact that otherwise reports the previous theme's border colour. Light
  `rgba(17,17,15,0.16)` / dark `rgba(243,239,231,0.22)` — both correct.
- The Recognition asset was reviewed **as an image** at three stages: the 2048×731 source, three
  candidate crops, and the 750×600 WebP variant Next actually delivers — confirming the
  `NUFEW 2024-25` badge stays legible after compression.
- Akash Sagar's entry, his `Currently Managed` label, the handle link and the bounded media loading
  were verified by **temporarily publishing him, then restoring the config**. Restoration confirmed:
  one `published: false` in the file, no `TEMP` markers, roster back to five with Zoya first.
- **No screenshot and no CDP input were available** — the Browser pane was hidden all session. See
  §17 item 16.
- **`docs/PROJECT-BRIEF.md` was corrected, not rewritten.** Superseded conclusions are struck and
  annotated in place so the earlier reasoning survives.
