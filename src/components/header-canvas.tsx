"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function HeaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    const isDark = resolvedTheme === "dark";

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Waves hanging from top
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();

        const baseY = h * 0.35 + i * (h * 0.12);
        const amplitude = h * 0.08 + i * 3;
        const frequency = 0.002 + i * 0.0003;
        const speed = 0.0002 + i * 0.00008;
        const phaseOffset = i * 1.2;

        // Fill from top to wave line
        ctx.moveTo(0, 0);
        for (let x = 0; x <= w; x += 2) {
          const y =
            baseY +
            Math.sin(x * frequency + time * speed + phaseOffset) * amplitude +
            Math.cos(x * frequency * 0.7 + time * speed * 1.3 + phaseOffset) *
              (amplitude * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, 0);
        ctx.closePath();

        const alpha = isDark
          ? 0.06 + i * 0.025
          : 0.04 + i * 0.018;
        const color = isDark
          ? `rgba(96, 165, 250, ${alpha})`
          : `rgba(27, 49, 86, ${alpha})`;
        ctx.fillStyle = color;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [resolvedTheme]);

  return (
    <div className="w-full h-24 sm:h-40 overflow-hidden pointer-events-none absolute top-0 left-0 right-0 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
    </div>
  );
}
