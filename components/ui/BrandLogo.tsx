import Link from "next/link";

interface BrandLogoProps {
  href?: string;
}

export default function BrandLogo({ href = "/" }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060606]"
      aria-label="Vidal Reñao Lopelo — Home"
    >
      {/* Monogram badge */}
      <div className="relative w-[42px] h-[42px] flex-none overflow-hidden rounded-[11px] shadow-[0_2px_16px_rgba(59,130,246,0.18),0_0_0_1px_rgba(255,255,255,0.07)]">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="vr-bg" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="55%" stopColor="#312e81" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
            <linearGradient id="vr-sheen" x1="0" y1="0" x2="0" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.11)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="42" height="42" rx="10" fill="url(#vr-bg)" />
          {/* Top sheen */}
          <rect width="42" height="22" rx="10" fill="url(#vr-sheen)" />
          {/* Border */}
          <rect x="0.5" y="0.5" width="41" height="41" rx="9.5" stroke="rgba(255,255,255,0.10)" fill="none" />

          {/* V */}
          <path
            d="M6 10.5L10.5 26L15 10.5"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* R — vertical bar */}
          <path
            d="M17.5 10.5L17.5 26"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
          />
          {/* R — bump */}
          <path
            d="M17.5 10.5 C17.5 10.5 25.5 10.5 25.5 15.5 C25.5 20.5 17.5 20.5 17.5 20.5"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* R — diagonal leg */}
          <path
            d="M22 19.5L27.5 26"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
            fill="none"
          />

          {/* + accent — superscript top-right */}
          <path
            d="M33.5 8L33.5 15M30 11.5L37 11.5"
            stroke="rgba(147,197,253,0.9)"
            strokeWidth="1.9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Shine sweep — slides across on group hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-shine"
        />
      </div>

      {/* Corporate text block */}
      <div className="flex flex-col leading-none gap-[3px]">
        <span className="font-bold text-sm text-white tracking-tight leading-none">
          Vidal Reñao Lopelo
        </span>
        <span className="font-mono text-[10px] text-white/40 tracking-wide leading-none">
          AI-Powered Infrastructure Architect
        </span>
      </div>
    </Link>
  );
}
