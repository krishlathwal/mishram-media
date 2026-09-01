/**
 * REAL COMPOSITED SCREENSHOTS — headless Chrome over CDP.
 *
 * The Browser pane has been non-compositing for most of this project (§10m,
 * §10p, §10q) and it failed again for the WebGL hero in Revision 28. This is
 * §10q's documented workaround, written down as a script instead of being
 * rebuilt from memory every time.
 *
 * **No dependency is added.** Chrome is already on the machine; Node's global
 * `WebSocket` speaks CDP directly. No Playwright, no Puppeteer (§15).
 *
 * ── THE TWO GOTCHAS, BOTH OF WHICH COST A WRONG VERDICT BEFORE ────────────
 *
 * 1. **Scroll sweep before capture.** Without it `IntersectionObserver` never
 *    fires, every `whileInView` element sits at `opacity: 0`, and the capture
 *    shows a half-empty page that looks like a bug (§10q).
 * 2. **WebGL needs SwiftShader in headless.** Without `--use-angle=swiftshader`
 *    the hero's canvas renders nothing and you conclude the media is broken —
 *    which is exactly the false negative the preview pane produced.
 *
 * Usage:  node scripts/shoot.mjs <outDir> [shotName...]
 */

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9223;
const BASE = process.env.SHOOT_BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "./shots";

const INF = "/services/influencer-marketing";

/**
 * A scroll position expressed in **What We Do slot units**: 0 is the first
 * service arriving, 1.5 is the second one settled, 2.0 is the second handing
 * off to the third. Resolved inside the page against the pinned track's own
 * box, which is what makes it survive a height change anywhere above it.
 *
 * The track is the element carrying the inline `calc(100svh + Nvh)` height and
 * `useScroll` maps [start start, end end] onto it, so slot s sits at
 * `trackTop + (s / count) * (trackHeight - innerHeight)`.
 */
const slotScroll = (slot) =>
  `(() => {
    const el = [...document.querySelectorAll("#what-we-do div")]
      .find((d) => /calc\\(100svh/.test(d.style.height));
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + scrollY;
    const span = el.offsetHeight - innerHeight;
    return Math.round(top + (span * ${slot}) / 4);
  })()`;

/**
 * A scroll position `into` pixels below a section's own top edge, resolved
 * inside the page. Section offsets move whenever anything above them changes
 * height, so a hardcoded pixel value silently captures the wrong beat — the
 * same failure `slotScroll` exists to avoid for the pinned track.
 */
const sectionScroll = (selector, into) =>
  `(() => {
    const el = document.querySelector("${selector}");
    if (!el) return 0;
    return Math.round(el.getBoundingClientRect().top + scrollY + ${into});
  })()`;

/** viewport, theme, reduced motion, and where on the page to look. */
const SHOTS = [
  { name: "hero-1440-light", w: 1440, h: 900, scheme: "light" },
  { name: "hero-1440-dark", w: 1440, h: 900, scheme: "dark" },
  { name: "hero-1280", w: 1280, h: 800, scheme: "dark" },
  { name: "hero-1024", w: 1024, h: 768, scheme: "dark" },
  { name: "hero-768", w: 768, h: 1024, scheme: "dark" },
  { name: "hero-430", w: 430, h: 932, scheme: "dark", mobile: true },
  { name: "hero-390-light", w: 390, h: 844, scheme: "light", mobile: true },
  { name: "hero-390-dark", w: 390, h: 844, scheme: "dark", mobile: true },
  { name: "hero-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true },

  // Collaborations. `selector` clips to the section itself; `pad` pulls the
  // capture upward so the seam with the hero above it is visible — the
  // transition between the two has to read as intentional, and you cannot
  // judge that from two separate screenshots.
  { name: "brands-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#collaborations" },
  { name: "brands-1440-light", w: 1440, h: 900, scheme: "light", selector: "#collaborations" },
  { name: "brands-1280", w: 1280, h: 800, scheme: "dark", selector: "#collaborations" },
  { name: "brands-1024", w: 1024, h: 768, scheme: "dark", selector: "#collaborations" },
  { name: "brands-768", w: 768, h: 1024, scheme: "dark", selector: "#collaborations" },
  { name: "brands-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#collaborations" },
  { name: "brands-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#collaborations" },
  { name: "brands-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#collaborations" },
  { name: "brands-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#collaborations" },
  { name: "mgt-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#current-management" },
  { name: "mgt-1440-light", w: 1440, h: 900, scheme: "light", selector: "#current-management" },
  { name: "mgt-1280", w: 1280, h: 800, scheme: "dark", selector: "#current-management" },
  { name: "mgt-1024", w: 1024, h: 768, scheme: "dark", selector: "#current-management" },
  { name: "mgt-768", w: 768, h: 1024, scheme: "dark", selector: "#current-management" },
  { name: "mgt-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#current-management" },
  { name: "mgt-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#current-management" },
  { name: "mgt-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#current-management" },
  { name: "mgt-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#current-management" },
  { name: "seam-brands-mgt", w: 1440, h: 900, scheme: "dark", selector: "#current-management", pad: 300 },
  { name: "seam-mgt-what", w: 1440, h: 900, scheme: "dark", selector: "#what-we-do", pad: 400 },
  { name: "social-1440-dark", w: 1440, h: 900, scheme: "dark", path: "/services/social-personal-brand-growth" },
  { name: "social-1440-light", w: 1440, h: 900, scheme: "light", path: "/services/social-personal-brand-growth" },
  { name: "social-1280", w: 1280, h: 800, scheme: "dark", path: "/services/social-personal-brand-growth" },
  { name: "social-1024", w: 1024, h: 768, scheme: "dark", path: "/services/social-personal-brand-growth" },
  { name: "social-768", w: 768, h: 1024, scheme: "dark", path: "/services/social-personal-brand-growth" },
  { name: "social-430", w: 430, h: 932, scheme: "dark", mobile: true, path: "/services/social-personal-brand-growth" },
  { name: "social-390-light", w: 390, h: 844, scheme: "light", mobile: true, path: "/services/social-personal-brand-growth" },
  { name: "social-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: "/services/social-personal-brand-growth" },
  { name: "social-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, path: "/services/social-personal-brand-growth" },
  { name: "seam-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#collaborations", pad: 420 },
  { name: "seam-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#collaborations", pad: 300 },

  /* ── Phase 05 — 02 / Influencer Marketing ───────────────────────────────
     The dedicated route, its campaign-proof band, and the homepage Service 02
     slot. The homepage shots use `scrollExpr` rather than a fixed pixel offset
     because the pinned track moves down the document whenever anything above
     it changes height — a hardcoded number silently captures the wrong
     service, which is not a failure you notice in a thumbnail. */
  { name: "inf-1440-light", w: 1440, h: 900, scheme: "light", path: INF },
  { name: "inf-1440-dark", w: 1440, h: 900, scheme: "dark", path: INF },
  { name: "inf-1280", w: 1280, h: 800, scheme: "dark", path: INF },
  { name: "inf-1024", w: 1024, h: 768, scheme: "dark", path: INF },
  { name: "inf-768", w: 768, h: 1024, scheme: "dark", path: INF },
  { name: "inf-430", w: 430, h: 932, scheme: "dark", mobile: true, path: INF },
  { name: "inf-390-light", w: 390, h: 844, scheme: "light", mobile: true, path: INF },
  { name: "inf-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: INF },
  { name: "inf-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, path: INF },

  { name: "inf-hero-1440-dark", w: 1440, h: 900, scheme: "dark", path: INF, selector: "#hero" },
  { name: "inf-hero-1440-light", w: 1440, h: 900, scheme: "light", path: INF, selector: "#hero" },
  { name: "inf-hero-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: INF, selector: "#hero" },

  { name: "proof-1440-dark", w: 1440, h: 900, scheme: "dark", path: INF, selector: "#creator-proof" },
  { name: "proof-1440-light", w: 1440, h: 900, scheme: "light", path: INF, selector: "#creator-proof" },
  { name: "proof-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: INF, selector: "#creator-proof" },
  { name: "proof-390-light", w: 390, h: 844, scheme: "light", mobile: true, path: INF, selector: "#creator-proof" },

  { name: "svc02-active", w: 1440, h: 900, scheme: "dark", scrollExpr: slotScroll(1.5) },
  { name: "svc02-active-light", w: 1440, h: 900, scheme: "light", scrollExpr: slotScroll(1.5) },
  { name: "svc01-to-02", w: 1440, h: 900, scheme: "dark", scrollExpr: slotScroll(0.96) },
  { name: "svc02-to-03", w: 1440, h: 900, scheme: "dark", scrollExpr: slotScroll(2.02) },
  { name: "svc02-390", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#what-we-do div.border-t" },

  /* ── Phase 06 — the quick-scan proof layer ──────────────────────────────
     The homepage sweep, the new band on its own, the Current Management
     chapter with its Reel-performance inset, the Creators chapter after the
     scale deduplication, and the two seams the band now sits between. */
  { name: "home-1440-light", w: 1440, h: 900, scheme: "light" },
  { name: "home-1440-dark", w: 1440, h: 900, scheme: "dark" },
  { name: "home-1280", w: 1280, h: 800, scheme: "dark" },
  { name: "home-1024", w: 1024, h: 768, scheme: "dark" },
  { name: "home-768", w: 768, h: 1024, scheme: "dark" },
  { name: "home-430", w: 430, h: 932, scheme: "dark", mobile: true },
  { name: "home-390-light", w: 390, h: 844, scheme: "light", mobile: true },
  { name: "home-390-dark", w: 390, h: 844, scheme: "dark", mobile: true },
  { name: "home-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true },

  { name: "proof-band-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#proof" },
  { name: "proof-band-1440-light", w: 1440, h: 900, scheme: "light", selector: "#proof" },
  { name: "proof-band-1280", w: 1280, h: 800, scheme: "dark", selector: "#proof" },
  { name: "proof-band-768", w: 768, h: 1024, scheme: "dark", selector: "#proof" },
  { name: "proof-band-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#proof" },
  { name: "proof-band-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#proof" },
  { name: "proof-band-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#proof" },

  { name: "mgt-proof-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#current-management" },
  { name: "mgt-proof-1440-light", w: 1440, h: 900, scheme: "light", selector: "#current-management" },
  { name: "mgt-proof-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#current-management" },

  { name: "creators-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#creators" },
  { name: "creators-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#creators" },

  /* The two seams the band lives between. `pad` pulls the capture upward so
     the boundary above it is in frame — a transition cannot be judged from
     two separate screenshots. */
  { name: "seam-mgt-proof", w: 1440, h: 900, scheme: "dark", selector: "#proof", pad: 420 },
  { name: "seam-proof-what", w: 1440, h: 900, scheme: "dark", selector: "#what-we-do", pad: 420 },
  { name: "seam-mgt-proof-390", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#proof", pad: 300 },

  /* ── Phase 07 — 03 / Creators, the network refinement ───────────────────
     The chapter at every viewport, plus its two seams. The section order the
     seams assume is read off `app/page.tsx`, not remembered: The Mishram
     Difference sits above Creators and 04 / Work Process below it. */
  { name: "crt-1440-light", w: 1440, h: 900, scheme: "light", selector: "#creators" },
  { name: "crt-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#creators" },
  { name: "crt-1280", w: 1280, h: 800, scheme: "dark", selector: "#creators" },
  { name: "crt-1024", w: 1024, h: 768, scheme: "dark", selector: "#creators" },
  { name: "crt-768", w: 768, h: 1024, scheme: "dark", selector: "#creators" },
  { name: "crt-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#creators" },
  { name: "crt-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#creators" },
  { name: "crt-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#creators" },
  { name: "crt-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#creators" },

  /* The chapter's own beats, so each can be judged without scrolling a
     1,600px capture: the intro and its category framing, the talent index
     and stage, and the worked-with roster. */
  { name: "crt-intro-1440", w: 1440, h: 900, scheme: "dark", scrollExpr: sectionScroll("#creators", 0) },
  { name: "crt-intro-1440-light", w: 1440, h: 900, scheme: "light", scrollExpr: sectionScroll("#creators", 0) },
  { name: "crt-stage-1440", w: 1440, h: 900, scheme: "dark", scrollExpr: sectionScroll("#creators", 420) },
  { name: "crt-roster-1440", w: 1440, h: 900, scheme: "dark", scrollExpr: sectionScroll("#creators", 1000) },
  { name: "crt-intro-390", w: 390, h: 844, scheme: "dark", mobile: true, scrollExpr: sectionScroll("#creators", 0) },

  { name: "seam-difference-crt", w: 1440, h: 900, scheme: "dark", selector: "#creators", pad: 380 },
  { name: "seam-crt-process", w: 1440, h: 900, scheme: "dark", selector: "#process", pad: 380 },

  /* ── Phase 08 — 05 / Selected Work, the campaign proof ──────────────────
     The chapter at every viewport, its intro and 40M+ line, each work item in
     turn, and both seams. Section order read off `app/page.tsx`: 04 / Work
     Process sits above and Recognition below. */
  { name: "wrk-1440-light", w: 1440, h: 900, scheme: "light", selector: "#work" },
  { name: "wrk-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#work" },
  { name: "wrk-1280", w: 1280, h: 800, scheme: "dark", selector: "#work" },
  { name: "wrk-1024", w: 1024, h: 768, scheme: "dark", selector: "#work" },
  { name: "wrk-768", w: 768, h: 1024, scheme: "dark", selector: "#work" },
  { name: "wrk-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#work" },
  { name: "wrk-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#work" },
  { name: "wrk-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#work" },
  { name: "wrk-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#work" },

  /* Each work item in turn. `click` drives the real index button before the
     capture, so these are the live selected states rather than three renders
     of the featured one. */
  { name: "wrk-item-swiggy", w: 1440, h: 900, scheme: "dark", selector: "#work", click: "#work ul li:nth-child(1) button" },
  { name: "wrk-item-pintola", w: 1440, h: 900, scheme: "dark", selector: "#work", click: "#work ul li:nth-child(2) button" },
  { name: "wrk-item-mukul", w: 1440, h: 900, scheme: "dark", selector: "#work", click: "#work ul li:nth-child(3) button" },
  { name: "wrk-item-pintola-390", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#work", click: "#work ul li:nth-child(2) button" },

  { name: "seam-process-wrk", w: 1440, h: 900, scheme: "dark", selector: "#work", pad: 380 },
  { name: "seam-wrk-next", w: 1440, h: 900, scheme: "dark", selector: "#recognition", pad: 380 },

  /* ── Phase 09 — 06 / Recognition, the NUFEW award proof ─────────────────
     The chapter at every viewport, the evidence frame on its own, and both
     seams. Section order read off `app/page.tsx`: 05 / Selected Work sits
     above and 07 / About below.

     `rcg-frame-*` scrolls to the chapter's own top edge rather than a fixed
     pixel offset, for the reason `sectionScroll` exists at all — Recognition
     sits ~14,000px down a document whose height changes in almost every
     phase. */
  { name: "rcg-1440-light", w: 1440, h: 900, scheme: "light", selector: "#recognition" },
  { name: "rcg-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#recognition" },
  { name: "rcg-1280", w: 1280, h: 800, scheme: "dark", selector: "#recognition" },
  { name: "rcg-1024", w: 1024, h: 768, scheme: "dark", selector: "#recognition" },
  { name: "rcg-768", w: 768, h: 1024, scheme: "dark", selector: "#recognition" },
  { name: "rcg-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#recognition" },
  { name: "rcg-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#recognition" },
  { name: "rcg-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#recognition" },
  { name: "rcg-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#recognition" },

  /* The evidence frame at reading distance, so the award moment can be judged
     without scrolling a full-chapter capture. */
  { name: "rcg-frame-1440", w: 1440, h: 900, scheme: "dark", scrollExpr: sectionScroll("#recognition", 260) },
  { name: "rcg-frame-1440-light", w: 1440, h: 900, scheme: "light", scrollExpr: sectionScroll("#recognition", 260) },
  { name: "rcg-frame-390", w: 390, h: 844, scheme: "dark", mobile: true, scrollExpr: sectionScroll("#recognition", 260) },

  { name: "seam-wrk-rcg", w: 1440, h: 900, scheme: "dark", selector: "#recognition", pad: 380 },
  { name: "seam-rcg-about", w: 1440, h: 900, scheme: "dark", selector: "#about", pad: 380 },
  { name: "seam-wrk-rcg-390", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#recognition", pad: 300 },

  /* `/about` reads `RECOGNITION_ITEMS[0]` in two places — the archive board's
     recognition fragment and the on-the-record chapter. Changing the award
     asset changes that route too, so it is captured rather than assumed. */
  { name: "abt-board-1440", w: 1440, h: 900, scheme: "dark", path: "/about" },
  { name: "abt-record-1440", w: 1440, h: 900, scheme: "dark", path: "/about", selector: "#on-the-record" },
  { name: "abt-board-390", w: 390, h: 844, scheme: "dark", mobile: true, path: "/about" },

  /* ── Phase 10 — About, and the human behind the work ────────────────────
     The homepage preview and the dedicated route. Section order read off
     `app/page.tsx`: 06 / Recognition sits above the homepage About chapter
     and Project Inquiry below it. */
  { name: "hab-1440-light", w: 1440, h: 900, scheme: "light", selector: "#about" },
  { name: "hab-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#about" },
  { name: "hab-1280", w: 1280, h: 800, scheme: "dark", selector: "#about" },
  { name: "hab-1024", w: 1024, h: 768, scheme: "dark", selector: "#about" },
  { name: "hab-768", w: 768, h: 1024, scheme: "dark", selector: "#about" },
  { name: "hab-430", w: 430, h: 932, scheme: "dark", mobile: true, selector: "#about" },
  { name: "hab-390-light", w: 390, h: 844, scheme: "light", mobile: true, selector: "#about" },
  { name: "hab-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#about" },
  { name: "hab-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, selector: "#about" },

  { name: "seam-rcg-hab", w: 1440, h: 900, scheme: "dark", selector: "#about", pad: 380 },
  { name: "seam-hab-inq", w: 1440, h: 900, scheme: "dark", selector: "#project-inquiry", pad: 380 },
  { name: "seam-rcg-hab-390", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#about", pad: 300 },

  /* The dedicated route: every viewport, plus each narrative beat on its own
     so the page can be judged without scrolling a 10,000px capture. */
  { name: "abt-1440-light", w: 1440, h: 900, scheme: "light", path: "/about" },
  { name: "abt-1440-dark", w: 1440, h: 900, scheme: "dark", path: "/about" },
  { name: "abt-1024", w: 1024, h: 768, scheme: "dark", path: "/about" },
  { name: "abt-768", w: 768, h: 1024, scheme: "dark", path: "/about" },
  { name: "abt-390-light", w: 390, h: 844, scheme: "light", mobile: true, path: "/about" },
  { name: "abt-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: "/about" },
  { name: "abt-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, path: "/about" },

  { name: "abt-origin-1440", w: 1440, h: 900, scheme: "dark", path: "/about", selector: "#origin" },
  { name: "abt-now-1440-dark", w: 1440, h: 900, scheme: "dark", path: "/about", selector: "#now" },
  { name: "abt-now-1440-light", w: 1440, h: 900, scheme: "light", path: "/about", selector: "#now" },
  { name: "abt-now-1024", w: 1024, h: 768, scheme: "dark", path: "/about", selector: "#now" },
  { name: "abt-now-768", w: 768, h: 1024, scheme: "dark", path: "/about", selector: "#now" },
  { name: "abt-now-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, path: "/about", selector: "#now" },
  { name: "abt-now-390-light", w: 390, h: 844, scheme: "light", mobile: true, path: "/about", selector: "#now" },
  { name: "abt-now-1440-reduced", w: 1440, h: 900, scheme: "dark", reduced: true, path: "/about", selector: "#now" },
];

const only = process.argv.slice(3);
const shots = only.length ? SHOTS.filter((s) => only.includes(s.name)) : SHOTS;

mkdirSync(OUT, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--force-device-scale-factor=1",
    // Software WebGL. Without these the hero canvas is empty in headless.
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--user-data-dir=" + OUT + "/.chrome-profile",
    "about:blank",
  ],
  { stdio: "ignore", detached: false },
);

let nextId = 1;
const pending = new Map();

function send(ws, method, params = {}, sessionId) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
}

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const j = await r.json();
      return j.webSocketDebuggerUrl;
    } catch {
      await sleep(500);
    }
  }
  throw new Error("Chrome did not expose a CDP endpoint");
}

const wsUrl = await targetWs();
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));

ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};

const { targetId } = await send(ws, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await send(ws, "Target.attachToTarget", {
  targetId,
  flatten: true,
});

const S = (m, p) => send(ws, m, p, sessionId);

await S("Page.enable");
await S("Runtime.enable");

const results = [];

for (const shot of shots) {
  await S("Emulation.setDeviceMetricsOverride", {
    width: shot.w,
    height: shot.h,
    deviceScaleFactor: 1,
    mobile: Boolean(shot.mobile),
  });

  const features = [{ name: "prefers-color-scheme", value: shot.scheme }];
  if (shot.reduced)
    features.push({ name: "prefers-reduced-motion", value: "reduce" });
  await S("Emulation.setEmulatedMedia", { features });

  // A fresh document each time, so the theme boot script re-runs against the
  // emulated colour scheme rather than reusing a stale [data-theme].
  await S("Page.navigate", { url: `${BASE}${shot.path ?? "/"}` });
  await sleep(shot.settle ?? 5500);

  // §10q's gotcha: sweep the page so IntersectionObserver fires, then return.
  const SWEEP = `(async () => {
      const step = Math.round(innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, ${shot.scrollExpr ?? (shot.scrollTo ?? 0)});
      await new Promise(r => setTimeout(r, 900));
    })()`;
  await S("Runtime.evaluate", { expression: SWEEP, awaitPromise: true });

  // Drive a real control before the capture where a shot asks for one, so a
  // selected state comes from the component rather than from a prop set for
  // the screenshot. `click` is a selector; a miss is reported, not silent.
  if (shot.click) {
    const hit = await S("Runtime.evaluate", {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(shot.click)});
        if (!el) return false;
        el.click();
        return true;
      })()`,
      returnByValue: true,
    });
    if (!hit.result.value) console.warn(`  ! click target not found: ${shot.click}`);
    await sleep(900);
  }
  await sleep(shot.after ?? 2200);

  const probe = await S("Runtime.evaluate", {
    expression: `JSON.stringify({
      theme: document.documentElement.dataset.theme,
      scrollY: Math.round(scrollY),
      hOverflow: document.documentElement.scrollWidth > innerWidth,
      scrollW: document.documentElement.scrollWidth,
      docHeight: document.documentElement.scrollHeight,
      imgs: document.querySelectorAll("img").length,
      lazyImgs: document.querySelectorAll('img[loading="lazy"]').length,
      eagerImgs: document.querySelectorAll('img[loading="eager"]').length,
      imgPreloads: document.querySelectorAll('link[rel=preload][as=image]').length,
      inner: innerWidth,
      canvas: (() => { const c = document.querySelector('canvas'); if (!c) return null;
        const g = c.getContext('webgl2') || c.getContext('webgl');
        return { w: c.width, h: c.height, gl: !!g }; })(),
      textures: performance.getEntriesByType('resource').filter(e => /creators\\//.test(e.name)).map(e => e.name.split('/').pop())
    })`,
    returnByValue: true,
  });

  const p = JSON.parse(probe.result.value);

  /* A section shot clips to the section's own document box, optionally
     extended upward by `pad` so the seam with the section above is in frame.

     **`Page.captureScreenshot` with a clip returns a black frame for anything
     far below the fold**, `captureBeyondViewport` or not — the earlier phases
     only ever clipped sections near the top of the document, so this never
     surfaced. The reliable technique is to make the viewport the size of the
     region, scroll the region to the top of it, and capture the viewport with
     no clip at all. Costs one extra layout pass and always composites. */
  let box = null;
  if (shot.selector) {
    const measured = await S("Runtime.evaluate", {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(shot.selector)});
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return JSON.stringify({ y: r.top + scrollY, h: r.height });
      })()`,
      returnByValue: true,
    });
    if (measured.result.value) box = JSON.parse(measured.result.value);
  }

  let data;
  if (box) {
    const pad = shot.pad ?? 0;
    const measure = async () => {
      const r = await S("Runtime.evaluate", {
        expression: `(() => { const el = document.querySelector(${JSON.stringify(shot.selector)});
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return JSON.stringify({ y: b.top + scrollY, h: b.height });
        })()`,
        returnByValue: true,
      });
      return r.result.value ? JSON.parse(r.result.value) : null;
    };

    /* GROW THE VIEWPORT TO THE REGION, THEN CONVERGE.

       Two things make a single resize-and-scroll wrong, and both cost a
       capture before they were understood:

       1. Resizing reflows the document, so the pre-resize measurement is
          stale **and** the `whileInView` elements below the new fold have
          never intersected — that produced a section with a visible label and
          nothing underneath it.
       2. `02 / What We Do` is a `100svh + N×130vh` track, so its height is a
          function of the viewport height. Resizing moves every section below
          it by hundreds of pixels, which is how a capture of `#work` came
          back showing the inquiry form.

       So: resize, sweep, re-measure, and repeat until the offset stops
       moving. Three passes is plenty; it settles in two. */
    for (let pass = 0; pass < 3; pass++) {
      await S("Emulation.setDeviceMetricsOverride", {
        width: shot.w,
        height: Math.min(Math.round(box.h + pad), 12000),
        deviceScaleFactor: 1,
        mobile: Boolean(shot.mobile),
      });
      await sleep(350);
      await S("Runtime.evaluate", { expression: SWEEP, awaitPromise: true });
      const next = await measure();
      if (!next) break;
      const settled =
        Math.abs(next.y - box.y) < 2 && Math.abs(next.h - box.h) < 2;
      box = next;
      if (settled) break;
    }

    await S("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${Math.max(0, Math.round(box.y - pad))}); new Promise((r) => setTimeout(r, 900))`,
      awaitPromise: true,
    });
    await sleep(900);

    // Prove the frame is the region it claims to be, rather than trusting it.
    const landed = await S("Runtime.evaluate", {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(shot.selector)});
        return Math.round(el.getBoundingClientRect().top);
      })()`,
      returnByValue: true,
    });
    // After scrolling to `box.y - pad`, the section should sit exactly `pad`
    // below the top of the frame. Comparing against 0 instead of `pad` reported
    // every padded seam as 2*pad wrong — the check was the bug, not the shot.
    const off = landed.result.value - pad;
    if (Math.abs(off) > 4) console.warn(`  ! ${shot.name}: section is ${off}px off the frame`);

    ({ data } = await S("Page.captureScreenshot", { format: "png" }));
  } else {
    ({ data } = await S("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: p.scrollY ?? 0, width: shot.w, height: shot.h, scale: 1 },
      captureBeyondViewport: true,
    }));
  }
  writeFileSync(`${OUT}/${shot.name}.png`, Buffer.from(data, "base64"));
  results.push({ shot: shot.name, ...p });
  console.log(
    `${shot.name.padEnd(22)} theme=${String(p.theme).padEnd(5)} overflow=${p.hOverflow} canvas=${p.canvas ? "gl" : "none"} doc=${p.docHeight}px imgs=${p.imgs} lazy=${p.lazyImgs} eager=${p.eagerImgs} preload=${p.imgPreloads}`,
  );
}

writeFileSync(`${OUT}/probe.json`, JSON.stringify(results, null, 2));
ws.close();
chrome.kill();
console.log(`\nwrote ${shots.length} shot(s) to ${OUT}`);
