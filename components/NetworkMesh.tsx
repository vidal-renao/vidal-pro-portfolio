import React from "react";

interface NetworkMeshProps {
  className?: string;
  opacity?: number;
}

export default function NetworkMesh({ className = "", opacity = 0.45 }: NetworkMeshProps) {
  // A clean coordinate set that generates a technology constellation
  const nodes = [
    { id: 1, x: 180, y: 20 },
    { id: 2, x: 160, y: 60 },
    { id: 3, x: 190, y: 100 },
    { id: 4, x: 145, y: 120 },
    { id: 5, x: 175, y: 160 },
    { id: 6, x: 120, y: 180 },
    { id: 7, x: 155, y: 210 },
    { id: 8, x: 110, y: 240 },
    { id: 9, x: 140, y: 270 },
    { id: 10, x: 95, y: 310 },
    { id: 11, x: 125, y: 340 },
    { id: 12, x: 80, y: 380 },
    { id: 13, x: 105, y: 410 },
    { id: 14, x: 65, y: 450 },
    { id: 15, x: 90, y: 490 },
    { id: 16, x: 45, y: 520 },
    { id: 17, x: 75, y: 560 },
    { id: 18, x: 30, y: 600 },
  ];

  const connections = [
    [1, 2], [1, 3], [2, 3], [2, 4], [3, 5],
    [4, 5], [4, 6], [5, 7], [6, 7], [6, 8],
    [7, 9], [8, 9], [8, 10], [9, 11], [10, 11],
    [10, 12], [11, 13], [12, 13], [12, 14], [13, 15],
    [14, 15], [14, 16], [15, 17], [16, 17], [16, 18],
    [17, 18],
    // Cross connections for mesh depth
    [1, 5], [3, 7], [5, 9], [7, 11], [9, 13], [11, 15], [13, 17],
    [2, 6], [4, 8], [6, 10], [8, 12], [10, 14], [12, 16], [14, 18]
  ];

  return (
    <svg
      viewBox="0 0 200 620"
      className={`select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Network lines */}
      {connections.map(([fromId, toId], idx) => {
        const fromNode = nodes.find((n) => n.id === fromId);
        const toNode = nodes.find((n) => n.id === toId);
        if (!fromNode || !toNode) return null;
        return (
          <line
            key={`line-${idx}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="#00A3E0"
            strokeWidth="0.75"
            strokeOpacity="0.8"
          />
        );
      })}

      {/* Network nodes */}
      {nodes.map((node) => (
        <circle
          key={`node-${node.id}`}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#00A3E0"
          className="animate-pulse"
          style={{
            animationDelay: `${(node.id * 150) % 1500}ms`,
            animationDuration: "3s"
          }}
        />
      ))}
    </svg>
  );
}
