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
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${target.id}`);
    setCurrent(targetIndex);
  }

  return (
    <nav aria-label={labels.navigation} className="fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-0.5 rounded-full border border-line bg-bg/40 p-1 shadow-lg opacity-60 backdrop-blur-md transition-[background-color,opacity] duration-200 hover:bg-bg/90 hover:opacity-100 focus-within:bg-bg/90 focus-within:opacity-100 sm:right-4">
      <button type="button" aria-label={labels.previous} title={labels.previous}
        disabled={current === 0} onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30">
        <ArrowUp size={17} />
      </button>
      <span className="py-1 text-center font-mono text-[10px] leading-4 tabular-nums text-dim [writing-mode:vertical-rl]" aria-hidden="true">
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
