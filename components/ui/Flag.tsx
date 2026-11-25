/** Inline SVG flags: emoji flags render as two letters on Windows, these look the same in every browser. */
export type FlagCode = "de" | "en" | "es";

const SHAPES: Record<FlagCode, React.ReactNode> = {
  de: <><path fill="#000" d="M0 0h30v7H0z" /><path fill="#d00" d="M0 7h30v6H0z" /><path fill="#ffce00" d="M0 13h30v7H0z" /></>,
  en: (
    <>
      <path fill="#012169" d="M0 0h30v20H0z" />
      <path stroke="#fff" strokeWidth="4" d="m0 0 30 20M30 0 0 20" />
      <path stroke="#c8102e" strokeWidth="1.6" d="m0 0 30 20M30 0 0 20" />
      <path stroke="#fff" strokeWidth="6.6" d="M15 0v20M0 10h30" />
      <path stroke="#c8102e" strokeWidth="4" d="M15 0v20M0 10h30" />
    </>
  ),
  es: <><path fill="#aa151b" d="M0 0h30v20H0z" /><path fill="#f1bf00" d="M0 5h30v10H0z" /><path fill="#aa151b" d="M7 7.5h3.5v4a1.75 1.75 0 0 1-3.5 0z" /></>,
};

export function Flag({ code, className = "h-4 w-6" }: { code: FlagCode; className?: string }) {
  return (
    <span aria-hidden="true" data-flag={code} className={`inline-block flex-none overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.25)] ${className}`}>
      <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">{SHAPES[code]}</svg>
    </span>
  );
}
