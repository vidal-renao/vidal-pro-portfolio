"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp } from "@/components/ui/icons";

interface Props {
  /** Section ids in page order. */
  sections: readonly string[];
  labels: { next: string; back: string };
}

/** Anchored sections rest 168px below the top (scroll padding + margin): at or above this line counts as reached. */
const OFFSET = 190;

/**
 * One floating arrow. While there is content below it points down and goes to the next section;
 * at the end of the page it points up and returns to the top. Native scrolling is never captured.
 */
export function ScrollArrow({ sections, labels }: Props) {
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setAtEnd(window.scrollY >= max - 4);
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

  function go() {
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (atEnd) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const next = sections
      .map((id) => document.getElementById(id))
      .find((node) => node !== null && node.getBoundingClientRect().top > OFFSET);
    if (next) next.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
  }

  const label = atEnd ? labels.back : labels.next;
  return (
    <button type="button" data-testid="scroll-arrow" data-direction={atEnd ? "up" : "down"} aria-label={label} title={label} onClick={go}
      className="scroll-arrow cta-sw fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white sm:bottom-6 sm:right-6">
      {atEnd ? <ArrowUp size={22} /> : <ArrowDown size={22} />}
    </button>
  );
}
