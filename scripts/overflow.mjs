/**
 * HORIZONTAL-OVERFLOW ASSERTION — every public route, every viewport.
 *
 * The 1024 / 768 document overflow was carried, measured and deferred from
 * Revision 29 through Revision 38. This is the check that closes it and keeps
 * it closed: it fails loudly when
 *
 *     document.documentElement.scrollWidth > window.innerWidth + 1
 *
 * and prints the elements actually sticking out, with the numbers needed to
 * fix them rather than just a red cross.
 *
 * **Compare against `clientWidth`, not `innerWidth`, when a document already
 * overflows** — §10ak found `innerWidth` reports 496 at a 390 viewport *because*
 * the document is wide, which makes the naive comparison read false. Both are
 * reported below so that trap is visible rather than silent.
 *
 * Headless Chrome over CDP through Node's global `WebSocket`, the same route as
 * `scripts/shoot.mjs`. **No dependency added** (§15).
 *
 * usage: node scripts/overflow.mjs [--port 9500] [--base http://localhost:3000]
 *        node scripts/overflow.mjs --quick        # 1024/768/390/320 only
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const PORT = Number(arg("--port", "9500"));
const BASE = arg("--base", process.env.SHOOT_BASE ?? "http://localhost:3000");
const QUICK = argv.includes("--quick");

/** Every route the build marks public. `/api/*` has no layout to measure. */
const ROUTES = [
  "/",
  "/about",
  "/services/social-personal-brand-growth",
  "/services/influencer-marketing",
  "/services/performance-marketing",
  "/services/web-digital-experiences",
  "/privacy",
  "/terms",
  "/cookies",
  "/this-page-does-not-exist-mishram",
];

const FULL = [
  [1600, 900], [1440, 900], [1366, 768], [1280, 800], [1024, 768],
  [768, 1024], [430, 932], [414, 896], [390, 844], [375, 812],
  [360, 800], [320, 568],
];
/** The four widths the defect has ever appeared at, for a fast re-check. */
const QUICK_SET = [[1024, 768], [768, 1024], [390, 844], [320, 568]];
const VIEWPORTS = QUICK ? QUICK_SET : FULL;

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, "--hide-scrollbars",
  "--no-first-run", "--no-default-browser-check", "--disable-extensions",
  "--force-device-scale-factor=1",
  // Software WebGL, or the hero canvas never renders and its box is wrong.
  "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader",
  `--user-data-dir=${arg("--profile", process.env.TEMP + "/mishram-overflow-" + PORT)}`, "about:blank",
], { stdio: "ignore" });

let nextId = 1;
const pending = new Map();
const send = (ws, method, params = {}, sessionId) => {
  const id = nextId++;
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });
};

let wsUrl;
for (let i = 0; i < 60; i++) {
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl;
    break;
  } catch { await sleep(500); }
}
if (!wsUrl) { console.error("Chrome did not expose a CDP endpoint"); process.exit(1); }

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { res, rej } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
  }
};
const { targetId } = await send(ws, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await send(ws, "Target.attachToTarget", { targetId, flatten: true });
const S = (m, p) => send(ws, m, p, sessionId);
await S("Page.enable");
await S("Runtime.enable");

/**
 * Runs in the page. Walks every element and reports the ones whose border box
 * escapes the document's client width, with the numbers that identify the
 * cause: the computed width, whether a transform moved it, and whether an
 * ancestor is already clipping it (an overflowing child inside an
 * `overflow: hidden` parent is contained by design and is not a defect).
 */
const PROBE = `(() => {
  const de = document.documentElement;
  const cw = de.clientWidth;
  const clipped = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const o = getComputedStyle(p);
      if (o.overflowX === "hidden" || o.overflowX === "clip" || o.overflowX === "scroll") return true;
    }
    return false;
  };
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const b = el.getBoundingClientRect();
    if (b.width === 0 && b.height === 0) continue;
    const right = b.right, left = b.left;
    if (right <= cw + 1 && left >= -1) continue;
    const cs = getComputedStyle(el);
    out.push({
      sel: el.tagName.toLowerCase()
        + (el.id ? "#" + el.id : "")
        + (typeof el.className === "string" && el.className
            ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".")
            : ""),
      left: Math.round(left), right: Math.round(right),
      over: Math.round(right - cw),
      w: Math.round(b.width),
      cssW: cs.width,
      transform: cs.transform === "none" ? null : cs.transform.slice(0, 42),
      position: cs.position,
      clippedByAncestor: clipped(el),
    });
  }
  // Only the widest few matter; the rest are usually children of the first.
  out.sort((a, b) => (b.right - a.right) || (a.left - b.left));
  return JSON.stringify({
    innerWidth: window.innerWidth,
    clientWidth: cw,
    docScrollWidth: de.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    overflow: de.scrollWidth - cw,
    offenders: out.slice(0, 12),
    unclippedOffenders: out.filter((o) => !o.clippedByAncestor).slice(0, 12),
  });
})()`;

let failures = 0;
let checks = 0;

for (const route of ROUTES) {
  console.log(`\n═══ ${route} ═══`);
  for (const [w, h] of VIEWPORTS) {
    await S("Emulation.setDeviceMetricsOverride", {
      width: w, height: h, deviceScaleFactor: 1, mobile: w < 500,
    });
    await S("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-color-scheme", value: "dark" }],
    });
    await S("Page.navigate", { url: BASE + route });
    await sleep(w >= 1024 ? 4200 : 3800);
    // §10q: sweep, or `whileInView` elements never lay out at their real size.
    await S("Runtime.evaluate", {
      expression: `(async () => { const s = Math.round(innerHeight * 0.8);
        for (let y = 0; y < document.body.scrollHeight; y += s) {
          window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60));
        }
        window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500)); })()`,
      awaitPromise: true,
    });
    await sleep(600);

    const r = await S("Runtime.evaluate", { expression: PROBE, returnByValue: true });
    const p = JSON.parse(r.result.value);
    checks++;

    const bad = p.overflow > 1;
    if (bad) failures++;
    const mark = bad ? "FAIL" : "ok  ";
    console.log(
      `  ${mark} ${String(w).padStart(4)}×${String(h).padEnd(4)}` +
      ` client=${String(p.clientWidth).padStart(4)}` +
      ` scrollW=${String(p.docScrollWidth).padStart(4)}` +
      ` over=${String(p.overflow).padStart(4)}` +
      (p.innerWidth !== p.clientWidth ? `  (innerWidth reports ${p.innerWidth})` : ""),
    );
    if (bad) {
      const list = p.unclippedOffenders.length ? p.unclippedOffenders : p.offenders;
      const note = p.unclippedOffenders.length ? "" : "  [all clipped by an ancestor]";
      for (const o of list.slice(0, 5)) {
        console.log(
          `        ${o.sel}` +
          `\n          left=${o.left} right=${o.right} over=${o.over} w=${o.w}` +
          ` cssW=${o.cssW} pos=${o.position}` +
          (o.transform ? ` transform=${o.transform}` : "") +
          (o.clippedByAncestor ? " CLIPPED-BY-ANCESTOR" : "") + note,
        );
      }
    }
  }
}

console.log(
  `\n${failures === 0 ? "PASS" : "FAIL"} — ${checks - failures}/${checks} viewport checks clean` +
  (failures ? `, ${failures} overflowing` : ""),
);
ws.close();
chrome.kill();
process.exit(failures === 0 ? 0 : 1);
