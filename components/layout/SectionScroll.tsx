"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";

interface Props {
  sections: { id: string; label: string }[];
  labels: { navigation: string; previous: string; next: string; top: string; move: string };
}

/**
 * Optional section-by-section navigation. It never captures wheel or touch gestures:
 * visitors retain native, uninterrupted scrolling through long sections.
 */
export function SectionScroll({ sections, labels }: Props) {
  const stops = useMemo(() => [{ id: "top", label: labels.top }, ...sections], [sections, labels.top]);
  const [current, setCurrent] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const railRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);

  const clampToViewport = useCallback((x: number, y: number) => {
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    return {
      x: Math.max(0, Math.min(x, window.innerWidth - rect.width)),
      y: Math.max(0, Math.min(y, window.innerHeight - rect.height)),
    };
  }, []);

  useEffect(() => {
    const onResize = () => setPosition((previous) =>
      previous ? clampToViewport(previous.x, previous.y) : null,
    );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampToViewport]);

  const onGripDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      id: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    setPosition({ x: rect.left, y: rect.top });
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onGripMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    setPosition(clampToViewport(event.clientX - drag.offsetX, event.clientY - drag.offsetY));
  };
  const onGripEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (dragRef.current?.id !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const onGripKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const movement: Record<string, [number, number]> = {
      ArrowLeft: [-20, 0], ArrowRight: [20, 0],
      ArrowUp: [0, -20], ArrowDown: [0, 20],
    };
    const delta = movement[event.key];
    if (!delta) return;
    event.preventDefault();
    const rect = railRef.current?.getBoundingClientRect();
    if (rect) setPosition(clampToViewport(rect.left + delta[0], rect.top + delta[1]));
  };

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
    <nav ref={railRef} aria-label={labels.navigation}
      style={position ? { left: position.x, top: position.y } : undefined}
      className={"fixed z-40 flex flex-col items-center gap-0.5 rounded-full border border-line bg-bg/40 p-1 shadow-lg opacity-60 backdrop-blur-md transition-[background-color,opacity] duration-200 hover:bg-bg/90 hover:opacity-100 focus-within:bg-bg/90 focus-within:opacity-100 " + (position ? "" : "right-2 top-1/2 -translate-y-1/2 sm:right-4")}>
      <button type="button" aria-label={labels.move} title={labels.move}
        onPointerDown={onGripDown} onPointerMove={onGripMove}
        onPointerUp={onGripEnd} onPointerCancel={onGripEnd}
        onKeyDown={onGripKeyDown}
        className="flex h-8 w-10 cursor-grab touch-none select-none items-center justify-center rounded-full text-dim hover:bg-white/[0.08] hover:text-ink active:cursor-grabbing">
        <span aria-hidden="true" className="text-[15px] leading-none tracking-widest">⠿</span>
      </button>
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
