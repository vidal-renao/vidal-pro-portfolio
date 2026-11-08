"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";

interface Props {
  sections: { id: string; label: string }[];
  labels: { navigation: string; previous: string; next: string; top: string; move: string; choose: string };
}

/**
 * Optional section-by-section navigation. It never captures wheel or touch gestures:
 * visitors retain native, uninterrupted scrolling through long sections.
 */
export function SectionScroll({ sections, labels }: Props) {
  const stops = useMemo(() => [{ id: "top", label: labels.top }, ...sections], [sections, labels.top]);
  const [current, setCurrent] = useState(0);
  const [atBottom, setAtBottom] = useState(false);
  const [pageProgress, setPageProgress] = useState({ current: 1, total: 1 });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const railRef = useRef<HTMLElement>(null);
  const dragRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const lastStepAtRef = useRef(0);
  const lastDirectionRef = useRef<-1 | 0 | 1>(0);
  const lastArrowTargetRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

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
    setPickerOpen(false);
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
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const step = Math.max(1, Math.round(window.innerHeight * 0.82));
        const total = Math.max(1, Math.ceil(maxScroll / step) + 1);
        const bottom = window.scrollY >= maxScroll - 3;
        setPageProgress({
          current: bottom ? total : Math.min(total, Math.floor(window.scrollY / step) + 1),
          total,
        });
        setAtBottom(bottom);
        let section = 0;
        stops.forEach(({ id }, index) => {
          const node = document.getElementById(id);
          if (node && node.getBoundingClientRect().top <= 110) section = index;
        });
        setCurrent(section);
      });
    };
    sync();
    const nativeInput = () => {
      lastArrowTargetRef.current = null;
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
    window.addEventListener("wheel", nativeInput, { passive: true });
    window.addEventListener("touchstart", nativeInput, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("wheel", nativeInput);
      window.removeEventListener("touchstart", nativeInput);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [stops]);

  useEffect(() => {
    if (!pickerOpen) return;
    const close = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setPickerOpen(false); };
    const outside = (event: globalThis.PointerEvent) => { if (!railRef.current?.contains(event.target as Node)) setPickerOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [pickerOpen]);

  function navigateTo(targetIndex: number) {
    setPickerOpen(false);
    lastArrowTargetRef.current = null;
    const target = stops[targetIndex];
    const node = document.getElementById(target.id);
    if (!node) return;
    node.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#" + target.id);
    setCurrent(targetIndex);
  }

  function navigate(direction: -1 | 1) {
    // This is viewport pagination, never a jump to the next variable-height section.
    // Rapid repeated taps in one direction are ignored; reverse remains available.
    if (direction === lastDirectionRef.current && Date.now() - lastStepAtRef.current < 650) return;
    lastStepAtRef.current = Date.now();
    lastDirectionRef.current = direction;
    const distance = Math.round(window.innerHeight * 0.82);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const base = lastArrowTargetRef.current ?? window.scrollY;
    const target = Math.max(0, Math.min(maxScroll, base + distance * direction));
    lastArrowTargetRef.current = target;
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    const start = window.scrollY;
    const change = target - start;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: target, behavior: "instant" });
      return;
    }
    let startedAt: number | null = null;
    const tick = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo({ top: start + change * eased, behavior: "instant" });
      if (progress < 1) animationRef.current = requestAnimationFrame(tick);
      else animationRef.current = null;
    };
    animationRef.current = requestAnimationFrame(tick);
  }

  return (
    <nav ref={railRef} aria-label={labels.navigation}
      style={position ? { left: position.x, top: position.y } : undefined}
      className={"section-scroll-rail fixed z-40 flex flex-col items-center gap-0.5 rounded-full border border-line bg-bg/40 p-1 shadow-lg opacity-60 backdrop-blur-md transition-[background-color,opacity] duration-200 hover:bg-bg/90 hover:opacity-100 focus-within:bg-bg/90 focus-within:opacity-100 " + (position ? "" : "right-2 top-1/2 -translate-y-1/2 sm:right-4")}>
      <button type="button" aria-label={labels.move} title={labels.move}
        onPointerDown={onGripDown} onPointerMove={onGripMove}
        onPointerUp={onGripEnd} onPointerCancel={onGripEnd}
        onKeyDown={onGripKeyDown}
        className="flex h-8 w-10 cursor-grab touch-none select-none items-center justify-center rounded-full text-dim hover:bg-white/[0.08] hover:text-ink active:cursor-grabbing">
        <span aria-hidden="true" className="text-[15px] leading-none tracking-widest">⠿</span>
      </button>
      <button type="button" aria-label={labels.previous} title={labels.previous}
        disabled={pageProgress.current === 1} onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30">
        <ArrowUp size={17} />
      </button>
      <button type="button" aria-label={labels.choose} title={stops[current]?.label}
        aria-expanded={pickerOpen} aria-controls="section-scroll-picker" onClick={() => setPickerOpen((value) => !value)}
        className="flex min-h-11 min-w-10 items-center justify-center rounded-full px-1 font-mono text-[10px] tabular-nums text-muted hover:bg-white/[0.08] hover:text-ink">
        <span aria-hidden="true" className="[writing-mode:vertical-rl]">{String(pageProgress.current).padStart(2, "0")} / {String(pageProgress.total).padStart(2, "0")}</span>
      </button>
      <span className="sr-only" aria-live="polite">{stops[current]?.label}</span>
      <div id="section-scroll-picker" hidden={!pickerOpen}
        className="absolute right-full top-1/2 mr-3 max-h-[min(65dvh,440px)] min-w-40 -translate-y-1/2 overflow-y-auto rounded-2xl border border-line-strong bg-raised p-1.5 shadow-2xl">
        {stops.map((stop, index) => (
          <a key={stop.id} href={"#" + stop.id} aria-current={index === current ? "location" : undefined}
            onClick={(event) => { event.preventDefault(); navigateTo(index); }}
            className={"flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-medium transition-colors " + (index === current ? "bg-accent/10 text-accent" : "text-muted hover:bg-white/[0.06] hover:text-ink")}>
            <span className="font-mono text-[10px] text-dim">{String(index + 1).padStart(2, "0")}</span>{stop.label}
          </a>
        ))}
      </div>
      <button type="button" aria-label={labels.next} title={labels.next}
        disabled={atBottom} onClick={() => navigate(1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-ink disabled:cursor-not-allowed disabled:opacity-30">
        <ArrowDown size={17} />
      </button>
    </nav>
  );
}
