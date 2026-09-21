"use client";

import React, { useRef, useEffect, useState } from "react";
import { Send, Square, Sparkles, Paperclip, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaiPromptInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  modelName?: string;
  tokenCount?: number;
  maxTokens?: number;
  disabled?: boolean;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
}

export function TaiPromptInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSubmit,
  onStop,
  placeholder = "Message or prompt ThinkAI Agent...",
  isLoading = false,
  modelName = "claude-3-7-sonnet",
  tokenCount,
  maxTokens = 8192,
  disabled = false,
  minHeight = 48,
  maxHeight = 240,
  className,
}: TaiPromptInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [value, minHeight, maxHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        if (isLoading) {
          onStop?.();
        } else {
          onSubmit?.(value);
          if (controlledValue === undefined) {
            setInternalValue("");
          }
        }
      }
    }
  };

  const handleSubmitClick = () => {
    if (isLoading) {
      onStop?.();
    } else if (value.trim()) {
      onSubmit?.(value);
      if (controlledValue === undefined) {
        setInternalValue("");
      }
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border border-tai-border bg-tai-card text-tai-text transition-colors focus-within:border-tai-accent/70 shadow-lg",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      style={{ borderRadius: 0 }}
    >
      {/* Auto-expanding Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 font-sans text-sm leading-relaxed text-tai-text placeholder:text-tai-muted focus:outline-none selection:bg-tai-accent/30"
        style={{ minHeight }}
      />

      {/* Action Toolbar Bottom Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-tai-border/60 bg-tai-sheet px-3 py-2 text-xs select-none">
        
        {/* Left tools: Model Selector & Token Counter */}
        <div className="flex items-center gap-2">
          {modelName && (
            <div className="flex items-center gap-1.5 border border-tai-border bg-tai-surface px-2 py-0.5 font-mono text-[10px] text-tai-muted">
              <Sparkles className="w-3 h-3 text-tai-accent shrink-0" />
              <span className="font-bold text-tai-text truncate">{modelName}</span>
            </div>
          )}

          {tokenCount !== undefined && (
            <div className="hidden sm:inline-flex items-center font-mono text-[10px] text-tai-subtle">
              <span>{tokenCount.toLocaleString()}</span>
              <span>/</span>
              <span>{maxTokens.toLocaleString()} tokens</span>
            </div>
          )}

          <button
            type="button"
            className="p-1 text-tai-muted hover:text-tai-text transition-colors"
            title="Attach context file or image"
          >
            <Paperclip className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right tools: Keyboard hints & Send/Stop Button */}
        <div className="flex items-center gap-2.5">
          <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] text-tai-subtle">
            <span>↵ Send</span>
            <span>·</span>
            <span>⇧↵ Newline</span>
          </span>

          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={disabled || (!isLoading && !value.trim())}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
              isLoading
                ? "bg-tai-danger text-white hover:bg-tai-danger/90"
                : "bg-tai-text text-tai-bg hover:opacity-90 shadow-md"
            )}
            title={isLoading ? "Stop generation" : "Send prompt"}
          >
            {isLoading ? (
              <>
                <Square className="w-3 h-3 fill-current" />
                <span>STOP</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>SEND</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
