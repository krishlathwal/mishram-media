type ArrowProps = {
  className?: string;
  size?: number;
};

/** Hairline arrow. Stroke width stays optically constant at every size. */
export function Arrow({ className, size = 14 }: ArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 7h11.5M8 2.5 12.5 7 8 11.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}
