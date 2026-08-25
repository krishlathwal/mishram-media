import Image from "next/image";

import type { DifferentiatorId } from "@/config/difference";

/**
 * One small evidence fragment per differentiator.
 *
 * All four share a single 16:10 footprint so switching layer never moves the
 * panel below them, and all four are built from the same marks the rest of the
 * site uses — hairlines, bars, one teal accent. No icons, no illustrations, no
 * dashboard chrome, and nothing heavier than a single already-loaded creator
 * photograph.
 *
 * They are `aria-hidden`: every fragment restates something the sentence and
 * the meta rail beside it already say in words.
 */

/** Creator-native: a real creator, and the record the network keeps of them. */
function CreatorFragment() {
  return (
    <div className="flex h-full w-full items-stretch gap-[7%] p-[7%]">
      {/* The one photograph in the section. Zoya Jaan is already fetched by
          §02's Service 04 scene and §03 below, so this costs one small crop. */}
      {/* Damped into the palette like §02's scene photography — this is a
          supporting mark, not the section's subject. */}
      <span className="dif-photo relative block w-[30%] shrink-0 overflow-hidden rounded-[2px] border border-image-line">
        <Image
          src="/media/creators/zoya-jaan.webp"
          alt=""
          fill
          sizes="80px"
          className="object-cover object-[50%_18%]"
        />
        <span aria-hidden className="dif-photo-veil" />
      </span>

      <span className="flex flex-1 flex-col justify-center gap-[9%]">
        <span className="block h-[5px] w-[72%] rounded-[1px] bg-ink/38" />
        <span className="block h-[3px] w-[46%] bg-ink/18" />
        <span className="mt-[6%] block h-px w-full bg-line" />
        <span className="flex items-center gap-[6%]">
          <span className="block h-[3px] w-[22%] bg-accent" />
          <span className="block h-[3px] w-[34%] bg-ink/14" />
        </span>
      </span>
    </div>
  );
}

/** Creative + performance: one piece of creative, and where it travels. */
function CampaignFragment() {
  return (
    <div className="flex h-full w-full items-stretch gap-[7%] p-[7%]">
      <span className="flex w-[28%] shrink-0 flex-col justify-center gap-[9%] rounded-[2px] border border-line bg-surface p-[10%]">
        <span className="block h-[4px] w-full rounded-[1px] bg-ink/32" />
        <span className="block h-[3px] w-[74%] bg-ink/16" />
        <span className="block h-[3px] w-[54%] bg-ink/16" />
        <span className="mt-[8%] block h-[7px] w-[62%] rounded-[1px] bg-accent/80" />
      </span>

      {/* The distribution path leaving the creative — one trace, three
          waypoints, no platform marks. Uniform aspect so the stroke stays a
          true hairline and the curve is not sheared. */}
      <svg viewBox="0 0 100 56" className="h-full flex-1" aria-hidden>
        <path
          d="M0 28 H34 M34 28 H100"
          stroke="var(--color-line-strong)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M34 28 C48 28 46 8 60 8 H100"
          stroke="var(--color-accent)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M34 28 C48 28 46 48 60 48 H90"
          stroke="var(--color-line-strong)"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="34" cy="28" r="2" fill="var(--color-accent)" />
        <circle cx="98" cy="8" r="1.6" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}

/** The destination: an interface, and the system standing behind it. */
function DestinationFragment() {
  return (
    <div className="flex h-full w-full gap-[7%] p-[7%]">
      <span className="flex flex-1 flex-col gap-[7%] rounded-[2px] border border-line bg-surface p-[7%]">
        <span className="flex items-center justify-between">
          <span className="block h-[3px] w-[34%] rounded-[1px] bg-ink/38" />
          <span className="block h-[3px] w-[16%] bg-ink/16" />
        </span>
        <span className="block h-px w-full bg-line" />
        <span className="block h-[5px] w-[84%] rounded-[1px] bg-ink/28" />
        <span className="block h-[3px] w-[60%] bg-ink/14" />
        <span className="mt-auto block h-[8px] w-[46%] rounded-[1px] bg-accent/80" />
      </span>

      {/* Records rather than pages — the software and CRM half. */}
      <span className="flex w-[34%] shrink-0 flex-col justify-center gap-[8%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-[8%]">
            <span
              className={`block h-[4px] w-[4px] rounded-full ${
                i === 0 ? "bg-accent" : "bg-ink/22"
              }`}
            />
            <span className="block h-[3px] flex-1 bg-ink/14" />
          </span>
        ))}
        <span className="mt-[6%] block h-px w-full bg-line" />
        <span className="block h-[3px] w-[52%] bg-ink/14" />
      </span>
    </div>
  );
}

/** One connected partner: four inputs resolving into one continuous output. */
function ConnectedFragment() {
  return (
    <div className="h-full w-full p-[7%]">
      <svg viewBox="0 0 100 48" className="h-full w-full" aria-hidden>
        {[6, 18, 30, 42].map((y, i) => (
          <path
            key={y}
            d={`M0 ${y} H30 C44 ${y} 44 24 58 24`}
            stroke="var(--color-line-strong)"
            strokeWidth="0.7"
            fill="none"
            opacity={0.55 + i * 0.05}
          />
        ))}
        <path
          d="M58 24 H100"
          stroke="var(--color-accent)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="58" cy="24" r="2" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}

const FRAGMENTS: Record<DifferentiatorId, () => React.JSX.Element> = {
  "creator-native": CreatorFragment,
  "creative-performance": CampaignFragment,
  destination: DestinationFragment,
  connected: ConnectedFragment,
};

export function DifferenceFragment({ id }: { id: DifferentiatorId }) {
  const Fragment = FRAGMENTS[id];
  return (
    <div aria-hidden className="dif-frag">
      <Fragment />
    </div>
  );
}
