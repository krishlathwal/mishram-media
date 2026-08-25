import { BRAND } from "@/config/site";

/**
 * The original Mishram wordmark, reused as a CSS mask so it inherits
 * `currentColor` instead of being locked to the old brand purple.
 * Intrinsic ratio of the source art is 420 x 199.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label={BRAND.name}
      className={className}
      style={{
        display: "block",
        aspectRatio: "420 / 199",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${BRAND.wordmark})`,
        maskImage: `url(${BRAND.wordmark})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
