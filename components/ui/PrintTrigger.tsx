"use client";

import { useEffect } from "react";

export default function PrintTrigger({ auto = true }: { auto?: boolean }) {
  useEffect(() => {
    if (!auto) return;
    const timer = setTimeout(() => window.print(), 700);
    return () => clearTimeout(timer);
  }, [auto]);

  return null;
}
