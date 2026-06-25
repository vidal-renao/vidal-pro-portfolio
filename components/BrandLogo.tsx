import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const dimensions = {
    sm: { width: "w-20", height: "h-12" },
    md: { width: "w-32", height: "h-20" },
    lg: { width: "w-40", height: "h-24" },
    xl: { width: "w-48", height: "h-30" },
  }[size];

  return (
    <svg
      viewBox="0 0 160 100"
      className={`${dimensions.width} ${dimensions.height} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rounded border */}
      <rect
        x="6"
        y="6"
        width="148"
        height="88"
        rx="22"
        stroke="#00A3E0"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Yellow connection node line and circle */}
      <line
        x1="6"
        y1="64"
        x2="28"
        y2="64"
        stroke="#FBBF24"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="64" r="5" fill="#FBBF24" />

      {/* Letters V and R */}
      <text
        x="38"
        y="70"
        fontFamily="var(--font-sans), Montserrat, Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="54"
        fill="#FFFFFF"
        letterSpacing="-0.02em"
      >
        V
      </text>
      <text
        x="84"
        y="70"
        fontFamily="var(--font-sans), Montserrat, Inter, system-ui, sans-serif"
        fontWeight="900"
        fontSize="54"
        fill="#00A3E0"
        letterSpacing="-0.02em"
      >
        R
      </text>

      {/* Top right decorative shield curve and "+" node */}
      <path
        d="M 124 16 A 24 24 0 0 1 144 36"
        stroke="#FBBF24"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Plus Sign */}
      <line
        x1="123"
        y1="26"
        x2="133"
        y2="26"
        stroke="#FBBF24"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="128"
        y1="21"
        x2="128"
        y2="31"
        stroke="#FBBF24"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
