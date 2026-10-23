"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * A perspective grid floor racing toward the viewer under a striped setting sun,
 * drawn on canvas with true 3D projection. Grid and sun use the theme's primary and accent.
 */

function rgb(el: Element, name: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim() || "white";
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d")!;
  x.fillStyle = v;
  x.fillRect(0, 0, 1, 1);
  const [r, g, b] = x.getImageData(0, 0, 1, 1).data;
  return `${r},${g},${b}`;
}

export default function RetroGridBackground({ children }: { children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0;
    let h = 0;
    let col = { a: rgb(el, "--primary"), b: rgb(el, "--accent") };
    const mo = new MutationObserver(() => (col = { a: rgb(el, "--primary"), b: rgb(el, "--accent") }));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? false));
    io.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const draw = (t: number) => {
      if (visible && !document.hidden) {
        const horizon = h * 0.58;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);

        // sky glow
        const sky = ctx.createLinearGradient(0, 0, 0, horizon);
        sky.addColorStop(0, "rgba(0,0,0,1)");
        sky.addColorStop(1, `rgba(${col.a},0.35)`);
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, horizon);

        // striped sun
        const r = Math.min(w, h) * 0.22;
        const sunG = ctx.createLinearGradient(0, horizon - r * 2, 0, horizon);
        sunG.addColorStop(0, `rgba(${col.b},1)`);
        sunG.addColorStop(1, `rgba(${col.a},1)`);
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, horizon - r * 0.35, r, Math.PI, 0);
        ctx.lineTo(w / 2 + r, horizon);
        ctx.lineTo(w / 2 - r, horizon);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = sunG;
        ctx.fillRect(w / 2 - r, horizon - r * 1.5, r * 2, r * 1.5);
        ctx.fillStyle = "black";
        for (let i = 0; i < 7; i++) {
          const y = horizon - r * 0.35 - i * r * 0.11 + ((t / 60) % (r * 0.11));
          ctx.fillRect(w / 2 - r, y, r * 2, 2 + i * 0.9);
        }
        ctx.restore();

        // floor
        ctx.fillStyle = "black";
        ctx.fillRect(0, horizon, w, h - horizon);
        const fov = h * 0.9;
        const camY = 1;
        const speed = reduce ? 0 : (t / 1000) * 1.2;
        ctx.lineWidth = 1.2;
        // horizontal lines
        for (let z = 1 - (speed % 1); z < 40; z += 1) {
          const y = horizon + (camY * fov) / z / 4;
          if (y > h) continue;
          const a = Math.min(1, 6 / z);
          ctx.strokeStyle = `rgba(${col.a},${a})`;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        // vertical lines converging to the vanishing point
        for (let x = -24; x <= 24; x++) {
          ctx.strokeStyle = `rgba(${col.a},${0.75 - Math.abs(x) / 40})`;
          ctx.beginPath();
          ctx.moveTo(w / 2, horizon);
          ctx.lineTo(w / 2 + x * w * 0.12, h);
          ctx.stroke();
        }
        // horizon haze
        const haze = ctx.createLinearGradient(0, horizon - 40, 0, horizon + 80);
        haze.addColorStop(0, "rgba(0,0,0,0)");
        haze.addColorStop(0.4, `rgba(${col.b},0.35)`);
        haze.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haze;
        ctx.fillRect(0, horizon - 40, w, 120);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw(0);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative isolate flex min-h-[100svh] items-start justify-center overflow-hidden bg-black pt-[14vh] font-sans text-white"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 size-full" />
      {children ?? (
        <div className="px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight uppercase md:text-7xl">Retro grid</h2>
          <p className="mt-3 text-white/70">An endless perspective floor under a striped sun.</p>
        </div>
      )}
    </div>
  );
}
