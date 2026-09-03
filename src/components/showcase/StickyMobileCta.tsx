"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export function StickyMobileCta() {
  const [copied, setCopied] = useState(false);

  const copyInit = () => {
    navigator.clipboard.writeText("npx thinkai-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-tai-bg/95 backdrop-blur-lg border-t border-white/[0.12] tai-inset-top">
      <button
        onClick={copyInit}
        className="w-full flex items-center justify-between px-4 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider active:scale-[0.98] transition-transform shadow-lg"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-black" />
          <span>npx thinkai-ui init</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] bg-black text-white px-2 py-0.5">
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "COPIED" : "COPY"}</span>
        </div>
      </button>
    </div>
  );
}
