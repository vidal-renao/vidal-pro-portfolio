"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const techData = [
  {
    category: "cloud",
    color: "blue",
    items: [
      { name: "Microsoft Azure", level: 85 },
      { name: "Microsoft 365", level: 90 },
      { name: "Entra ID", level: 88 },
      { name: "Microsoft Intune", level: 85 },
      { name: "Autopilot", level: 80 },
      { name: "Azure Arc", level: 72 },
    ],
  },
  {
    category: "infra",
    color: "violet",
    items: [
      { name: "Windows Server 2025", level: 92 },
      { name: "Active Directory", level: 90 },
      { name: "Group Policy (GPO)", level: 85 },
      { name: "VMware vSphere", level: 78 },
      { name: "Hyper-V", level: 75 },
      { name: "Linux / Debian", level: 72 },
    ],
  },
  {
    category: "automation",
    color: "cyan",
    items: [
      { name: "PowerShell", level: 82 },
      { name: "Bash Scripting", level: 70 },
      { name: "AI Automation", level: 68 },
      { name: "Next.js", level: 72 },
    ],
  },
  {
    category: "network",
    color: "emerald",
    items: [
      { name: "CCNA / TCP-IP", level: 85 },
      { name: "DNS / DHCP", level: 88 },
      { name: "VLAN / VPN", level: 82 },
      { name: "Firewall (nftables)", level: 75 },
    ],
  },
];

const colorMap: Record<string, { bar: string; badge: string; glow: string }> =
  {
    blue: {
      bar: "bg-blue-500",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "group-hover:shadow-blue-500/10",
    },
    violet: {
      bar: "bg-violet-500",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      glow: "group-hover:shadow-violet-500/10",
    },
    cyan: {
      bar: "bg-cyan-500",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "group-hover:shadow-cyan-500/10",
    },
    emerald: {
      bar: "bg-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/10",
    },
  };

function RadarChart() {
  const data = [
    { label: "Azure / M365", value: 88 },
    { label: "Identity", value: 86 },
    { label: "Infrastructure", value: 91 },
    { label: "Automation", value: 78 },
    { label: "Networking", value: 84 },
    { label: "Dev / AI", value: 70 },
  ];

  const size = 280;
  const center = size / 2;
  const radius = center - 45;
  const n = data.length;
  const levels = 4;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius;
    return Array.from(
      { length: n },
      (_, j) => {
        const angle = (Math.PI * 2 * j) / n - Math.PI / 2;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      }
    ).join(" ");
  });

  const dataPoints = data
    .map((d, i) => {
      const pt = getPoint(i, d.value);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

  const labels = data.map((d, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lr = radius + 32;
    const x = center + lr * Math.cos(angle);
    const y = center + lr * Math.sin(angle);
    const cos = Math.cos(angle);
    const anchor: "start" | "end" | "middle" =
      cos > 0.1 ? "start" : cos < -0.1 ? "end" : "middle";
    return { x, y, label: d.label, anchor };
  });

  return (
    <svg
      width={size}
      height={size}
      className="w-full max-w-[280px] mx-auto"
      aria-label="Technology radar"
    >
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}
      <polygon
        points={dataPoints}
        fill="rgba(59,130,246,0.12)"
        stroke="rgba(59,130,246,0.6)"
        strokeWidth="1.5"
      />
      {data.map((d, i) => {
        const pt = getPoint(i, d.value);
        return (
          <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#3b82f6" />
        );
      })}
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={l.y}
          textAnchor={l.anchor}
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="10"
          fontFamily="var(--font-geist-sans)"
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}

export default function TechStack() {
  const t = useTranslations("stack");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stack" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">
          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {techData.map((group, gi) => {
              const colors = colorMap[group.color];
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: gi * 0.08 }}
                  className={`group glass-card rounded-2xl p-5 transition-shadow duration-300 ${colors.glow} hover:shadow-xl`}
                >
                  <div
                    className={`inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-3 py-1 mb-4 ${colors.badge}`}
                  >
                    {t(group.category)}
                  </div>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-white/70">
                            {item.name}
                          </span>
                          <span className="text-xs text-white/30">
                            {item.level}%
                          </span>
                        </div>
                        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${colors.bar}`}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${item.level}%` } : {}}
                            transition={{
                              duration: 0.8,
                              delay: gi * 0.08 + 0.3,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 lg:sticky lg:top-24"
          >
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
              Competency Radar
            </p>
            <RadarChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
