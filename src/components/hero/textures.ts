import * as THREE from "three";

/** Both procedural surfaces are drawn per theme: ivory on obsidian, or ink
 *  on parchment, so they recede the same way the photography does. */
export type TextureTheme = {
  paper: string;
  ink: string;
  accent: string;
};

export const TEXTURE_THEME: Record<"dark" | "light", TextureTheme> = {
  dark: { paper: "#0b0b0b", ink: "243, 239, 231", accent: "53, 214, 192" },
  light: { paper: "#efece3", ink: "17, 17, 15", accent: "11, 143, 128" },
};

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context unavailable");
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function hairline(ctx: CanvasRenderingContext2D, ink: string, alpha: number) {
  ctx.strokeStyle = `rgba(${ink}, ${alpha})`;
  ctx.lineWidth = 1;
}

/**
 * An abstracted website layout — header rule, display type, a primary action,
 * a three-up grid. Stands in for the design & development side of the studio
 * without pretending to be a screenshot of a real product.
 */
export function createInterfaceTexture(t: TextureTheme): THREE.Texture {
  const W = 768;
  const H = 480;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.fillStyle = t.paper;
  ctx.fillRect(0, 0, W, H);

  const pad = 54;

  // Frame + header rule
  hairline(ctx, t.ink, 0.14);
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
  hairline(ctx, t.ink, 0.1);
  ctx.beginPath();
  ctx.moveTo(0, 74.5);
  ctx.lineTo(W, 74.5);
  ctx.stroke();

  // Nav marks
  ctx.fillStyle = `rgba(${t.ink}, 0.3)`;
  ctx.fillRect(pad, 33, 74, 8);
  ctx.fillStyle = `rgba(${t.ink}, 0.14)`;
  [0, 1, 2].forEach((i) => ctx.fillRect(W - pad - 190 + i * 66, 34, 42, 6));

  // Display type, three descending bars
  const barY = 130;
  const widths = [0.56, 0.42, 0.26];
  widths.forEach((w, i) => {
    ctx.fillStyle = `rgba(${t.ink}, ${0.26 - i * 0.06})`;
    ctx.fillRect(pad, barY + i * 44, (W - pad * 2) * w, 24);
  });

  // Primary action, plus a ghost sibling
  ctx.fillStyle = `rgba(${t.accent}, 0.85)`;
  ctx.fillRect(pad, 288, 128, 34);
  hairline(ctx, t.ink, 0.2);
  ctx.strokeRect(pad + 144.5, 288.5, 118, 33);

  // Three-up grid
  const gridY = 372;
  const colW = (W - pad * 2 - 36) / 3;
  [0, 1, 2].forEach((i) => {
    const x = pad + i * (colW + 18);
    hairline(ctx, t.ink, 0.12);
    ctx.strokeRect(x + 0.5, gridY + 0.5, colW, 62);
    ctx.fillStyle = `rgba(${t.ink}, 0.1)`;
    ctx.fillRect(x + 14, gridY + 18, colW * 0.55, 7);
    ctx.fillRect(x + 14, gridY + 34, colW * 0.34, 7);
  });

  return toTexture(canvas);
}

/**
 * A performance fragment: an ascending curve over a faint grid.
 * Deliberately unlabelled — no axes, no figures, nothing to misread as a claim.
 */
export function createGrowthTexture(t: TextureTheme): THREE.Texture {
  const W = 640;
  const H = 400;
  const { canvas, ctx } = makeCanvas(W, H);

  ctx.fillStyle = t.paper;
  ctx.fillRect(0, 0, W, H);

  hairline(ctx, t.ink, 0.13);
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

  // Grid
  hairline(ctx, t.ink, 0.06);
  for (let i = 1; i < 5; i += 1) {
    const y = Math.round((H / 5) * i) + 0.5;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(W - 40, y);
    ctx.stroke();
  }

  // Curve
  const pts: [number, number][] = [
    [48, 330],
    [148, 300],
    [244, 306],
    [340, 236],
    [438, 214],
    [530, 128],
    [596, 92],
  ];

  const trace = () => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i += 1) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const mx = (px + cx) / 2;
      ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
    }
  };

  // Fill beneath
  trace();
  ctx.lineTo(pts[pts.length - 1][0], H - 40);
  ctx.lineTo(pts[0][0], H - 40);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 80, 0, H - 40);
  grad.addColorStop(0, `rgba(${t.accent}, 0.22)`);
  grad.addColorStop(1, `rgba(${t.accent}, 0)`);
  ctx.fillStyle = grad;
  ctx.fill();

  // Stroke
  trace();
  ctx.strokeStyle = `rgba(${t.accent}, 0.8)`;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Vertex marks
  ctx.fillStyle = `rgba(${t.accent}, 0.95)`;
  [pts[3], pts[5]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Base ticks
  ctx.fillStyle = `rgba(${t.ink}, 0.16)`;
  for (let i = 0; i < 7; i += 1) ctx.fillRect(48 + i * 92, H - 40, 1, 8);

  return toTexture(canvas);
}
