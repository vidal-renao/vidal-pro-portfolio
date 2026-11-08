"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";

interface Props {
  sections: { id: string; label: string }[];
  labels: { navigation: string; previous: string; next: string; top: string };
}

/**
 * Optional section-by-section navigation. It never captures wheel or touch gestures:
 * visitors retain native, uninterrupted scrolling through long sections.
 */
export function SectionScroll({ sections, labels }: Props) {
  const stops = useMemo(() => [{ id: "top", label: labels.top }, ...sections], [sections, labels.top]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const position = window.scrollY + 170;
        let index = 0;
        stops.forEach(({ id }, i) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= position) index = i;
        });
        setCurrent(index);
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", sync); };
  }, [stops]);

  function navigate(direction: -1 | 1) {
    const targetIndex = Math.max(0, Math.min(stops.length - 1, current + direction));
    const target = stops[targetIndex];
    document.getElementById(target.id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${target.id}`);
    setCurrent(targetIndex);
  }

  return (
    <nav aria-label={labels.navigation} className="fixed bottom-5 right-4 z-40 hidden items-center gap-1 rounded-full border border-line-strong bg-bg/90 p-1.5 shadow-xl backdrop-blur-xl sm:flex sm:bottom-6 sm:right-6">
      <button type="button" aria-label={labels.previous} title={labels.previous}
        disabled={current === 0} onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30">
        <ArrowUp size={17} />
      </button>
      <span className="min-w-12 text-center font-mono text-[11px] tabular-nums text-dim" aria-hidden="true">
        {String(current + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
      </span>
      <button type="button" aria-label={labels.next} title={labels.next}
        disabled={current === stops.length - 1} onClick={() => navigate(1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30">
        <ArrowDown size={17} />
      </button>
    </nav>
  );
}
