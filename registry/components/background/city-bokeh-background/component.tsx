"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Night city lights, out of focus. Glowing bokeh circles in your theme's primary and accent rise slowly and
 * add their light together on a canvas over the photo. Pauses off-screen.
 */
const PHOTO = "https://images.unsplash.com/photo-1477999440782-e1f435f8c7de?auto=format&fit=crop&w=2400&q=80";

function Bokeh() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(cv);
    const colours = [
      css.getPropertyValue("--primary").trim() || "rgb(255 94 168)",
      css.getPropertyValue("--accent").trim() || "rgb(94 231 255)",
      "rgb(255 210 122)",
    ];
    let dots: { x: number; y: number; r: number; v: number; c: string; a: number }[] = [];
    let raf = 0;
    let visible = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: Math.round(cv.clientWidth / 40) + 10 }, (_, i) => ({
        x: Math.random() * cv.clientWidth,
        y: Math.random() * cv.clientHeight,
        r: 12 + Math.random() * 46,
        v: 0.1 + Math.random() * 0.35,
        c: colours[i % colours.length]!,
        a: 0.12 + Math.random() * 0.22,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      ctx.globalCompositeOperation = "lighter";
      for (const d of dots) {
        d.y -= d.v;
        if (d.y < -d.r) d.y = cv.clientHeight + d.r;
        const g = ctx.createRadialGradient(d.x, d.y, d.r * 0.2, d.x, d.y, d.r);
        g.addColorStop(0, d.c);
        g.addColorStop(0.85, d.c);
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = d.a;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
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

export default function CityBokehBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <img src={PHOTO} alt="" className="absolute inset-0 size-full scale-110 object-cover blur-sm" />
        <div className="absolute inset-0 bg-black/45" />
        <Bokeh />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">City bokeh</h2>
          <p className="mt-3">Out-of-focus lights rise in your theme&rsquo;s colours.</p>
        </div>
      )}
    </div>
  );
}
