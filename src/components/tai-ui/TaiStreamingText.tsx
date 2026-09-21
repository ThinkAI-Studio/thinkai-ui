"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

export interface TaiStreamingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  cursor?: boolean;
  cursorChar?: string;
  autoStart?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function TaiStreamingText({
  text,
  speed = 18,
  cursor = true,
  cursorChar = "▋",
  autoStart = true,
  onComplete,
  className,
}: TaiStreamingTextProps) {
  const prefersReduced = useReducedMotion();
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isStreaming, setIsStreaming] = useState(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (prefersReduced) {
      onCompleteRef.current?.();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setDisplayedLength(current);

      if (current >= text.length) {
        clearInterval(interval);
        setIsStreaming(false);
        onCompleteRef.current?.();
      }
    }, speed);

    timerRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [text, speed, prefersReduced]);

  const handleSkip = () => {
    if (isStreaming) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedLength(text.length);
      setIsStreaming(false);
      onCompleteRef.current?.();
    }
  };

  const displayedText = prefersReduced ? text : text.slice(0, displayedLength);

  return (
    <span
      onClick={handleSkip}
      className={cn(
        "inline font-mono cursor-pointer select-text",
        className
      )}
      title={isStreaming ? "Click to reveal immediately" : undefined}
    >
      <span>{displayedText}</span>
      {cursor && (
        <span
          className={cn(
            "inline-block text-tai-accent ml-0.5",
            isStreaming ? "opacity-100" : "animate-pulse"
          )}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
