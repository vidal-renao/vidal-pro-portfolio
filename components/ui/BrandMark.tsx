/** VIDAL ECOSYSTEM brand symbol — scalable SVG, no image download or runtime dependency. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 112 88"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`ve-brand-mark ${className}`}
    >
      <defs>
        <linearGradient id="ve-brand-gradient" x1="0" y1="0" x2="1" y2="0.9">
          <stop offset="0%" stopColor="#17F5E7" />
          <stop offset="48%" stopColor="#159EFF" />
          <stop offset="100%" stopColor="#BB58EE" />
        </linearGradient>
      </defs>
      <g fill="url(#ve-brand-gradient)">
        <path d="M3 7h21l28 47L82 7h23L52 85z" />
        <path d="M75 7h35L99 24H65z" />
        <path d="M62 35h38L89 52H52z" />
        <path d="M50 63h47L85 80H39z" />
      </g>
    </svg>
  );
}
