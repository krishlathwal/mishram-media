import type { SocialPlatform } from "@/config/site";

/**
 * The three platform marks, as inline SVG.
 *
 * **No icon dependency.** Three symbols do not justify a package (§15), and
 * inline paths mean they inherit `currentColor` and stay inside the Mishram
 * palette rather than arriving with their own brand blues.
 *
 * One family, deliberately: each is the platform's mark inside the same rounded
 * square, drawn on the same 24px grid at the same 1.5 stroke. Instagram's own
 * logo already *is* a rounded square, and the app-tile convention makes Facebook
 * and LinkedIn read instantly at 20px — so the set is recognisable without any
 * of them borrowing a colour.
 */

const TILE = "M4.6 3h14.8A1.6 1.6 0 0 1 21 4.6v14.8a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V4.6A1.6 1.6 0 0 1 4.6 3Z";

function Instagram() {
  return (
    <>
      <path d={TILE} />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </>
  );
}

function Facebook() {
  return (
    <>
      <path d={TILE} />
      {/* The "f": a stem dropping from the tile's upper right, with its bar. */}
      <path d="M15.2 7.4h-1.4a1.9 1.9 0 0 0-1.9 1.9V21" />
      <path d="M9.6 12.6h4.9" />
    </>
  );
}

function LinkedIn() {
  return (
    <>
      <path d={TILE} />
      {/* "in": the i with its dot, then the n. */}
      <path d="M7.7 10.6v6.6" />
      <circle cx="7.7" cy="7.6" r="0.95" fill="currentColor" stroke="none" />
      <path d="M11.6 17.2v-6.6" />
      <path d="M11.6 13.4a2.8 2.8 0 0 1 5.6 0v3.8" />
    </>
  );
}

const MARKS: Record<SocialPlatform, () => React.JSX.Element> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: LinkedIn,
};

export function SocialIcon({
  platform,
  size = 20,
  className,
}: {
  platform: SocialPlatform;
  size?: number;
  className?: string;
}) {
  const Mark = MARKS[platform];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <Mark />
    </svg>
  );
}
