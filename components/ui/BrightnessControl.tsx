"use client";

import { useState, useEffect } from "react";

export function BrightnessControl() {
  const [brightness, setBrightness] = useState(100);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("site-brightness");
    if (saved) {
      const value = parseInt(saved, 10);
      setBrightness(value);
      document.documentElement.style.filter = `brightness(${value}%)`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setBrightness(value);
    document.documentElement.style.filter = `brightness(${value}%)`;
    localStorage.setItem("site-brightness", value.toString());
  };

  const reset = () => {
    setBrightness(100);
    document.documentElement.style.filter = "";
    localStorage.removeItem("site-brightness");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {visible ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.1] bg-[#0d0d0d]/95 p-4 shadow-2xl backdrop-blur-md w-48">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Brightness
            </span>
            <button
              onClick={() => setVisible(false)}
              className="text-white/30 hover:text-white/70 transition-colors text-xs"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <input
            type="range"
            min="70"
            max="150"
            step="5"
            value={brightness}
            onChange={handleChange}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-blue-400">{brightness}%</span>
            {brightness !== 100 && (
              <button
                onClick={reset}
                className="text-[10px] text-white/35 hover:text-white/65 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setVisible(true)}
          aria-label="Adjust brightness"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#0d0d0d]/80 text-white/40 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-blue-500/40 hover:text-blue-400"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
