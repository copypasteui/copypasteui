"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Canvas dot field that ripples away from the pointer. Colours come from the theme's
 * --primary and --muted-foreground variables, so it follows light/dark and theme changes.
 */
// intensity="soft" keeps the resting dots faint; the ripple under the cursor is the same.
export default function DotFieldBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const restAlpha = intensity === "bold" ? 0.32 : 0.18;
  const swell = intensity === "bold" ? 0.4 : 0.22;
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!el || !c || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    const gap = 22;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const color = (name: string) => getComputedStyle(el).getPropertyValue(name).trim() || "gray";

    const draw = () => {
      const base = color("--muted-foreground");
      const accent = color("--primary");
      ctx.clearRect(0, 0, w, h);
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const near = Math.max(0, 1 - d / 160);
          const wave = reduce ? 0 : Math.sin(x * 0.02 + y * 0.015 + t) * 0.5 + 0.5;
          const push = near * 10;
          const px = x + (d ? (dx / d) * push : 0);
          const py = y + (d ? (dy / d) * push : 0);
          ctx.globalAlpha = Math.min(1, restAlpha + wave * swell + near * 0.6);
          ctx.fillStyle = near > 0.05 ? accent : base;
          ctx.beginPath();
          ctx.arc(px, py, 1.2 + near * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      t += 0.02;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      if (reduce) draw();
    };
    const leave = () => {
      pointer.x = pointer.y = -9999;
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [restAlpha, swell]);

  return (
    <div ref={wrap} className="relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden bg-background font-sans">
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10" />
      {children ?? (
        <div className="pointer-events-none px-6 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">Dot field</h2>
          <p className="mt-3 text-muted-foreground">Move your cursor. The field follows your theme.</p>
        </div>
      )}
    </div>
  );
}
