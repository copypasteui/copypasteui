"use client";

// design-ok: glow-blob — the planet's atmosphere

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

/*
 * A planet rising from the bottom edge: a dark disc with an atmospheric rim lit in the
 * theme's primary colour, a light sweep travelling along the horizon, and a twinkling
 * canvas star field. Pure CSS + canvas — no images or video.
 */

function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: { x: number; y: number; r: number; p: number }[] = [];
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((cv.clientWidth * cv.clientHeight) / 2600);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * cv.clientWidth,
        y: Math.random() * cv.clientHeight * 0.8,
        r: Math.random() * 1.2 + 0.2,
        p: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      for (const s of stars) {
        ctx.globalAlpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t / 900 + s.p));
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize();
    draw(0);
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}

export default function PlanetHorizonBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Stars />
        {/* atmospheric haze above the horizon */}
        <div className="absolute top-[62%] left-1/2 aspect-square w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,transparent_92%,color-mix(in_oklab,var(--primary)_55%,transparent)_96%,transparent_100%)] blur-2xl md:w-[150vw]" />
        {/* the planet */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[62%] left-1/2 aspect-square w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_35%,black)_0%,black_35%)] shadow-[0_-2px_0_0_color-mix(in_oklab,var(--primary)_80%,white),0_-20px_80px_-10px_var(--primary),inset_0_30px_80px_-20px_color-mix(in_oklab,var(--primary)_70%,transparent)] md:w-[150vw]"
        />
        {/* light sweep travelling along the rim */}
        <motion.div
          animate={{ rotate: [-28, 28, -28] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[62%] left-1/2 aspect-square w-[180vw] -translate-x-1/2 rounded-full [background:conic-gradient(from_350deg,transparent,color-mix(in_oklab,var(--accent)_80%,white)_10deg,transparent_22deg)] [mask:radial-gradient(closest-side,transparent_97.5%,black_99%,transparent_100%)] md:w-[150vw]"
        />
      </div>
      {children ?? (
        <div className="-mt-24 px-6 text-center">
          <p className="text-xs tracking-[0.4em] text-white/60 uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Planet horizon</h2>
          <p className="mt-3 text-white/70">Rim light follows your theme’s primary colour.</p>
        </div>
      )}
    </div>
  );
}
