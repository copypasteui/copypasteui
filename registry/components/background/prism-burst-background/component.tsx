"use client";

// design-ok: glow-blob — the burst's core is the light source

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Rays of coloured light turning out from a bright core: two conic-gradient layers rotating in opposite directions,
 * with sparks flung outwards on a canvas. The rays mix your primary and accent with white. Pauses off-screen.
 */
function Sparks() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(cv).getPropertyValue("--accent").trim() || "rgb(255 220 150)";
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const sparks = Array.from({ length: 140 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random(),
      v: 0.002 + Math.random() * 0.006,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const max = Math.hypot(w, h) / 2;
      ctx.globalCompositeOperation = "lighter";
      for (const s of sparks) {
        s.r += s.v;
        if (s.r > 1) {
          s.r = 0;
          s.a = Math.random() * Math.PI * 2;
        }
        const d = s.r * s.r * max;
        const x = w / 2 + Math.cos(s.a) * d;
        const y = h / 2 + Math.sin(s.a) * d;
        ctx.globalAlpha = (1 - s.r) * 0.9;
        ctx.fillStyle = s.r < 0.3 ? "white" : accent;
        ctx.beginPath();
        ctx.arc(x, y, 0.8 + s.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}

export default function PrismBurstBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(6_3_12)] font-sans text-white">
      <style>{`@keyframes prism-turn { to { rotate: 360deg; } } @keyframes prism-turn-back { to { rotate: -360deg; } }`}</style>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 size-[180vmax] -translate-x-1/2 -translate-y-1/2 opacity-70 mix-blend-screen [background:repeating-conic-gradient(from_0deg,color-mix(in_oklab,var(--primary)_80%,white)_0deg_3deg,transparent_3deg_15deg)] [mask:radial-gradient(closest-side,black_8%,transparent_70%)] motion-safe:animate-[prism-turn_80s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 size-[180vmax] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-screen [background:repeating-conic-gradient(from_7deg,color-mix(in_oklab,var(--accent)_80%,white)_0deg_2deg,transparent_2deg_11deg)] [mask:radial-gradient(closest-side,black_6%,transparent_60%)] motion-safe:animate-[prism-turn-back_110s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 size-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,white,color-mix(in_oklab,var(--primary)_70%,white)_35%,transparent)] blur-md" />
        <Sparks />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.6))]" />
      </div>
      {children ?? (
        <div className="px-6 text-center [text-shadow:0_2px_24px_rgb(0_0_0/0.8)]">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Prism burst</h2>
          <p className="mt-3">Rays turning out from a bright core, with sparks flung outwards.</p>
        </div>
      )}
    </div>
  );
}
