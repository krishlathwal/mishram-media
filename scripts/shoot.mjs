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
  { name: "seam-1440-dark", w: 1440, h: 900, scheme: "dark", selector: "#collaborations", pad: 420 },
  { name: "seam-390-dark", w: 390, h: 844, scheme: "dark", mobile: true, selector: "#collaborations", pad: 300 },
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
  await S("Runtime.evaluate", {
    expression: `(async () => {
      const step = Math.round(innerHeight * 0.8);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, ${shot.scrollTo ?? 0});
      await new Promise(r => setTimeout(r, 900));
    })()`,
    awaitPromise: true,
  });
  await sleep(shot.after ?? 2200);

  const probe = await S("Runtime.evaluate", {
    expression: `JSON.stringify({
      theme: document.documentElement.dataset.theme,
      hOverflow: document.documentElement.scrollWidth > innerWidth,
      scrollW: document.documentElement.scrollWidth,
      inner: innerWidth,
      canvas: (() => { const c = document.querySelector('canvas'); if (!c) return null;
        const g = c.getContext('webgl2') || c.getContext('webgl');
        return { w: c.width, h: c.height, gl: !!g }; })(),
      textures: performance.getEntriesByType('resource').filter(e => /creators\\//.test(e.name)).map(e => e.name.split('/').pop())
    })`,
    returnByValue: true,
  });

  // A selector shot clips to the section's own document box, optionally
  // extended upward by `pad` so the seam with the section above is in frame.
  let clip = { x: 0, y: 0, width: shot.w, height: shot.h, scale: 1 };
  if (shot.selector) {
    const box = await S("Runtime.evaluate", {
      expression: `(() => { const el = document.querySelector(${JSON.stringify(shot.selector)});
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return JSON.stringify({ x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height });
      })()`,
      returnByValue: true,
    });
    const v = box.result.value;
    if (v) {
      const b = JSON.parse(v);
      const pad = shot.pad ?? 0;
      clip = {
        x: Math.max(0, Math.round(b.x)),
        y: Math.max(0, Math.round(b.y - pad)),
        width: Math.round(b.w),
        height: Math.round(b.h + pad),
        scale: 1,
      };
    }
  }

  const { data } = await S("Page.captureScreenshot", {
    format: "png",
    clip,
    captureBeyondViewport: Boolean(shot.selector),
  });

  writeFileSync(`${OUT}/${shot.name}.png`, Buffer.from(data, "base64"));
  const p = JSON.parse(probe.result.value);
  results.push({ shot: shot.name, ...p });
  console.log(
    `${shot.name.padEnd(22)} theme=${String(p.theme).padEnd(5)} overflow=${p.hOverflow} canvas=${p.canvas ? p.canvas.w + "x" + p.canvas.h + " gl=" + p.canvas.gl : "none"} textures=${p.textures.length}`,
  );
}

writeFileSync(`${OUT}/probe.json`, JSON.stringify(results, null, 2));
ws.close();
chrome.kill();
console.log(`\nwrote ${shots.length} shot(s) to ${OUT}`);
