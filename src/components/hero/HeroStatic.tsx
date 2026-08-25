import Image from "next/image";

import { HERO_SURFACES } from "@/config/hero";

const BY_ID = Object.fromEntries(HERO_SURFACES.map((s) => [s.id, s]));

/**
 * Composition for visitors without WebGL. It mirrors the live scene: the same
 * four frames, the same right-weighted arrangement, the same depth hierarchy
 * expressed as exposure. Positions are percentages of the media container, so
 * this reads correctly whether that container is the whole hero (wide) or the
 * lower band (stacked).
 */
const FRAMES = [
  {
    id: "zoya",
    style: { left: "46%", top: "24%", height: "48%" },
    className: "z-30 opacity-100",
    rotate: -1.2,
    priority: true,
  },
  {
    id: "lovkesh",
    style: { right: "6%", top: "62%", height: "24%" },
    className: "z-20 opacity-80",
    rotate: 1.1,
  },
  {
    id: "mukul",
    style: { right: "12%", top: "20%", height: "34%" },
    className: "z-10 opacity-[0.74]",
    rotate: 1.6,
  },
  {
    id: "vishnu",
    style: { left: "26%", top: "12%", height: "27%" },
    className: "z-0 opacity-[0.62]",
    rotate: -1.8,
  },
] as const;

export function HeroStatic({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        {FRAMES.map((f) => {
          const s = BY_ID[f.id];
          if (!s) return null;
          return (
            <figure
              key={f.id}
              className={`absolute overflow-hidden rounded-[3px] border border-image-line shadow-[var(--t-image-shadow)] ${f.className}`}
              style={{
                ...f.style,
                aspectRatio: String(s.aspect),
                transform: `rotate(${f.rotate}deg)`,
              }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(max-width: 767px) 30vw, 20vw"
                priority={"priority" in f}
                className="object-cover brightness-[0.92] saturate-[0.8]"
              />
              {/* Same grounding falloff the shader applies. */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgb(var(--t-canvas-rgb)/0.5)_0%,rgb(var(--t-canvas-rgb)/0)_55%)]"
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
