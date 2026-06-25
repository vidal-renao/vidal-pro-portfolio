import React from "react";

interface VectorQRProps {
  className?: string;
  size?: number;
}

export default function VectorQR({ className = "", size = 120 }: VectorQRProps) {
  // Pre-calculated QR code matrix for "https://vidal-pro-portfolio.vercel.app" (Version 3, 29x29, Error Correction M)
  const matrix = [
    "11111110010100101011101111111",
    "10000010011100011100001000001",
    "10111010101010010010101011101",
    "10111010110111110100101011101",
    "10111010111000101111101011101",
    "10000010110100010100001000001",
    "11111110101010101010101111111",
    "00000000101110001001000000000",
    "10111110010000000100101111100",
    "01011000010011000111111110001",
    "01111110100011110000101110000",
    "11101101110111011011110011010",
    "01011010001110100101010001100",
    "00111100010100001111111110001",
    "01100011000010011010001011100",
    "01100001000010111000000110010",
    "10110011100100010100100001100",
    "10111101101011101111101110101",
    "10111010010111111100110110100",
    "10001000111001000000110000010",
    "10101011101010110111111110111",
    "00000000101000001110100011111",
    "11111110010010010101101011100",
    "10000010101010100010100010011",
    "10111010110010011100111110100",
    "10111010110010101001100001111",
    "10111010110011011101101111110",
    "10000010001111011010110001010",
    "11111110110110110101011111100"
  ];

  const gridSize = 29;
  const cellSize = 10;
  const svgSize = gridSize * cellSize;

  // Define center boundary to clear for the custom logo (e.g. from index 11 to 17 inclusive)
  const centerStart = 11;
  const centerEnd = 17;

  const rects: React.ReactNode[] = [];

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip the center area to leave space for the logo
      if (r >= centerStart && r <= centerEnd && c >= centerStart && c <= centerEnd) {
        continue;
      }

      if (matrix[r][c] === "1") {
        rects.push(
          <rect
            key={`cell-${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize}
            height={cellSize}
            fill="#FFFFFF"
          />
        );
      }
    }
  }

  return (
    <div
      className={`relative inline-block bg-[#111827] p-2.5 rounded-lg border border-gray-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White QR blocks */}
        {rects}

        {/* Central Logo Box */}
        <g>
          {/* Background Card inside QR code */}
          <rect
            x={centerStart * cellSize - 1}
            y={centerStart * cellSize - 1}
            width={(centerEnd - centerStart + 1) * cellSize + 2}
            height={(centerEnd - centerStart + 1) * cellSize + 2}
            rx={4}
            fill="#111827"
            stroke="#00A3E0"
            strokeWidth={1.5}
          />
          {/* Logo Text VR */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontFamily="var(--font-sans), Montserrat, Inter, system-ui, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="-0.05em"
          >
            <tspan fill="#FFFFFF">V</tspan>
            <tspan fill="#00A3E0">R</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
