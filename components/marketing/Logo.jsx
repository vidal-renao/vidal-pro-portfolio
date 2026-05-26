import { useId } from "react";

const SUBTEXT = "IT INFRASTRUCTURE & AI SOLUTIONS";

function NodeMark({ id, x = 0, y = 0, size = 52 }) {
  const scale = size / 80;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width="80" height="80" rx="18" fill="#0B132B" />
      <rect x="1" y="1" width="78" height="78" rx="17" fill="none" stroke={`url(#${id})`} strokeWidth="2" />
      <path
        d="M16 22h11l12 34 12-34h11L45 66H33L16 22Z"
        fill="#F8FAFC"
      />
      <path
        d="M51 22h10c11 0 16 5 16 13 0 6-3 10-8 12l8 19H66l-7-17h-2v17H47V22h4Zm6 9v10h4c4 0 6-2 6-5s-2-5-6-5h-4Z"
        fill="#38BDF8"
      />
      <circle cx="12" cy="64" r="3" fill="#D4AF37" />
      <path d="M16 64h11M66 10v10M61 15h10" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export default function Logo({ variant = "inline", className = "" }) {
  const gradientId = `brand-accent-${useId().replaceAll(":", "")}`;
  const stacked = variant === "stacked";

  return (
    <svg
      className={className}
      viewBox={stacked ? "0 0 290 158" : "0 0 308 52"}
      role="img"
      aria-label={`Vidal Reñao - ${SUBTEXT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      {stacked ? (
        <>
          <NodeMark id={gradientId} x={105} y={4} size={80} />
          <text x="145" y="108" fill="#0B132B" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="19" textAnchor="middle" letterSpacing="0.8">
            VIDAL REÑAO
          </text>
          <path d="M68 121h154" stroke="#D4AF37" strokeWidth="1" />
          <text x="145" y="142" fill="#0B132B" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9.5" textAnchor="middle" letterSpacing="1.55">
            {SUBTEXT}
          </text>
        </>
      ) : (
        <>
          <NodeMark id={gradientId} size={52} />
          <text x="64" y="22" fill="#F8FAFC" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="16" letterSpacing="0.4">
            VIDAL REÑAO
          </text>
          <text x="64" y="39" fill="#38BDF8" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="7.8" letterSpacing="1.15">
            {SUBTEXT}
          </text>
          <path d="M64 47h228" stroke="#D4AF37" strokeWidth="1" opacity="0.8" />
        </>
      )}
    </svg>
  );
}
