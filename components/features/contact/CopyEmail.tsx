"use client";
import { useState } from "react";
import { Check, Copy } from "@/components/ui/icons";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" onClick={async () => { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:text-ink">
      {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? done : label}
    </button>
  );
}
