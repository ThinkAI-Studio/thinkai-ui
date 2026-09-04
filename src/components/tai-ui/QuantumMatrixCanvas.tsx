"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface QuantumMatrixCanvasProps {
  className?: string;
  gridSize?: number;
}

export function QuantumMatrixCanvas({
  className = "w-full h-full",
  gridSize = 28,
}: QuantumMatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let isLight = document.documentElement.dataset.theme === "light";

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const render = () => {
      if (!ctx || !canvas) return;
      const displayWidth = canvas.offsetWidth;
      const displayHeight = canvas.offsetHeight;
      const dotColor = isLight ? "24, 24, 27" : "224, 230, 236";
      const lineColor = isLight ? "24, 24, 27" : "220, 226, 232";
      const accentColor = isLight ? "8, 127, 69" : "74, 222, 128";
      const baseAlpha = isLight ? 0.16 : 0.24;
      const hoverAlpha = isLight ? 0.42 : 0.5;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Interpolate mouse with hydraulic damping
      mouseX += (targetMouseX - mouseX) * 0.12;
      mouseY += (targetMouseY - mouseY) * 0.12;

      // Draw Manhattan Bus Lines under mouse
      if (mouseX > 0 && mouseY > 0 && !prefersReduced) {
        ctx.strokeStyle = `rgba(${lineColor}, ${isLight ? 0.14 : 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, mouseY);
        ctx.lineTo(displayWidth, mouseY);
        ctx.moveTo(mouseX, 0);
        ctx.lineTo(mouseX, displayHeight);
        ctx.stroke();

        // 1px crosshair intersection at cursor
        ctx.strokeStyle = `rgba(${accentColor}, ${isLight ? 0.62 : 0.52})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouseX - 12, mouseY);
        ctx.lineTo(mouseX + 12, mouseY);
        ctx.moveTo(mouseX, mouseY - 12);
        ctx.lineTo(mouseX, mouseY + 12);
        ctx.stroke();
      }

      // Draw Monochromatic Dot-Lattice Grid
      const cols = Math.ceil(displayWidth / gridSize) + 1;
      const rows = Math.ceil(displayHeight / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          let drawX = x;
          let drawY = y;
          let alpha = baseAlpha;
          let size = 1.55;

          if (mouseX > 0 && mouseY > 0 && !prefersReduced) {
            const dx = mouseX - x;
            const dy = mouseY - y;
            const manhattanDist = Math.abs(dx) + Math.abs(dy);

            if (manhattanDist < 160) {
              const strain = (1 - manhattanDist / 160) * 4;
              drawX += (dx > 0 ? 1 : -1) * strain;
              drawY += (dy > 0 ? 1 : -1) * strain;
              alpha = baseAlpha + (1 - manhattanDist / 160) * hoverAlpha;
              size = 1.55 + (1 - manhattanDist / 160) * 1.7;
            }
          }

          ctx.fillStyle = `rgba(${dotColor}, ${alpha})`;
          ctx.fillRect(drawX - size / 2, drawY - size / 2, size, size);
        }
      }

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.dataset.theme === "light";
      render();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
