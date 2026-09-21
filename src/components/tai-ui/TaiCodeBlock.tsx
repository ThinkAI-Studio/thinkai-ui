"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaiCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  maxHeight?: string | number;
  className?: string;
}

export function TaiCodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  copyable = true,
  maxHeight,
  className,
}: TaiCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "overflow-hidden border border-tai-border bg-tai-card text-tai-text select-none shadow-sm",
        className
      )}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-tai-border bg-tai-sheet px-4 py-2 text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          {filename ? (
            <FileCode className="w-3.5 h-3.5 text-tai-accent shrink-0" />
          ) : (
            <Terminal className="w-3.5 h-3.5 text-tai-muted shrink-0" />
          )}
          {filename && (
            <span className="font-bold text-tai-text truncate">{filename}</span>
          )}
          {language && (
            <span className="border border-tai-border bg-tai-surface px-1.5 py-0.5 text-[10px] text-tai-subtle uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>

        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 border border-tai-border bg-tai-surface hover:bg-tai-card px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-tai-muted hover:text-tai-text transition-colors"
            title="Copy snippet"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-tai-success" />
                <span className="text-tai-success font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Code Content Body */}
      <div
        style={{ maxHeight }}
        className="overflow-x-auto p-4 font-mono text-xs leading-6 text-tai-text selection:bg-tai-accent/30"
      >
        <pre className="flex">
          {showLineNumbers && (
            <div
              className="mr-4 flex select-none flex-col text-right font-mono text-tai-subtle/60 border-r border-tai-border/60 pr-3"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
          )}
          <code className="flex-1 overflow-x-auto text-tai-text">{code}</code>
        </pre>
      </div>
    </div>
  );
}
