"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowToBottom, ArrowToTop, ArrowUp } from "@/components/ui/icons";

interface Props {
  /** Section ids in page order, starting with the hero. */
  sections: readonly string[];
  labels: { navigation: string; previous: string; next: string; toTop: string; toBottom: string };
}

const BUTTON = "scroll-arrow-button flex h-11 w-24 items-center sm:w-11 justify-center rounded-xl border transition-[transform,background-color,border-color] duration-150 active:scale-[0.95]";
const STEP = `${BUTTON} border-line-strong bg-raised text-ink hover:border-sw/60 hover:bg-[#1b2a45]`;
const JUMP = `${BUTTON} cta-sw border-transparent text-white`;

/** Document position of each section, measured at click time so expanded content never leaves it stale. */
function sectionTargets(ids: readonly string[]): number[] {
  const header = document.querySelector("[data-enterprise-header]")?.getBoundingClientRect().height ?? 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return ids.flatMap((id) => {
    const node = document.getElementById(id);
    if (!node) return [];
    const top = node.getBoundingClientRect().top + window.scrollY - header;
    return [Math.round(Math.max(0, Math.min(max, top)))];
  });
}

/**
 * Two-way section navigator. Middle of the page: previous / next section. At the very top the upper
 * button jumps to the bottom; at the very bottom the lower button returns to the top.
 * Native scrolling is never captured.
 */
export function ScrollArrow({ sections, labels }: Props) {
  const [edge, setEdge] = useState<"top" | "middle" | "bottom">("top");

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setEdge(window.scrollY <= 4 ? "top" : window.scrollY >= max - 4 ? "bottom" : "middle");
      });
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  function scrollToY(top: number) {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    window.scrollTo({ top, behavior });
  }

  const bottom = () => document.documentElement.scrollHeight - window.innerHeight;

  function up() {
    if (edge === "top") return scrollToY(bottom());
    const previous = sectionTargets(sections).filter((y) => y < window.scrollY - 4).pop();
    scrollToY(previous ?? 0);
  }

  function down() {
    if (edge === "bottom") return scrollToY(0);
    const next = sectionTargets(sections).find((y) => y > window.scrollY + 4);
    scrollToY(next ?? bottom());
  }

  const upLabel = edge === "top" ? labels.toBottom : labels.previous;
  const downLabel = edge === "bottom" ? labels.toTop : labels.next;

  return (
    <nav aria-label={labels.navigation} data-testid="scroll-arrow" data-edge={edge}
      className="scroll-arrow fixed inset-x-0 bottom-0 z-40 flex justify-center gap-3 border-t border-line-strong bg-bg px-3 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-12px_30px_-18px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:flex-col sm:gap-1.5 sm:rounded-2xl sm:border sm:border-line sm:bg-bg/85 sm:p-1.5 sm:backdrop-blur-md">
      <button type="button" data-testid="scroll-up" aria-label={upLabel} title={upLabel} onClick={up} className={STEP}>
        {edge === "top" ? <ArrowToBottom size={20} /> : <ArrowUp size={20} />}
      </button>
      <button type="button" data-testid="scroll-down" aria-label={downLabel} title={downLabel} onClick={down} className={edge === "bottom" ? JUMP : STEP}>
        {edge === "bottom" ? <ArrowToTop size={20} /> : <ArrowDown size={20} />}
      </button>
    </nav>
  );
}
