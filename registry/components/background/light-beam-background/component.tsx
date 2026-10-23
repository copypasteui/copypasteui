"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * A column of light falling onto a reflective floor, drawn on canvas every frame:
 * layered additive gradients, a shimmering core, a pooled reflection and drifting sparks.
 * Colours come from --primary and --accent. Pauses off-screen and for reduced motion.
 */

function cssToRgb(el: Element, name: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim() || "white";
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d")!;
  x.fillStyle = v;
  x.fillRect(0, 0, 1, 1);
  const [r, g, b] = x.getImageData(0, 0, 1, 1).data;
  return `${r},${g},${b}`;
}

export default function LightBeamBackground({ children }: { children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0;
    let h = 0;
    let colors = { a: cssToRgb(el, "--primary"), b: cssToRgb(el, "--accent") };
    const mo = new MutationObserver(() => (colors = { a: cssToRgb(el, "--primary"), b: cssToRgb(el, "--accent") }));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const sparks = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.0006 + Math.random() * 0.0014,
      s: Math.random() * 1.6 + 0.3,
    }));

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
        const cx = w / 2;
        const floor = h * 0.72;
        const flick = 0.85 + 0.15 * Math.sin(t / 180) * Math.sin(t / 77);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";

        // wide glow, mid beam, hot core
        for (const [width, alpha, col] of [
          [w * 0.32, 0.18, colors.a],
          [w * 0.09, 0.45, colors.a],
          [w * 0.025, 0.9, colors.b],
          [w * 0.006, 1, "255,255,255"],
        ] as const) {
          const g = ctx.createLinearGradient(cx - width, 0, cx + width, 0);
          g.addColorStop(0, `rgba(${col},0)`);
          g.addColorStop(0.5, `rgba(${col},${alpha * flick})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(cx - width, 0, width * 2, floor);
        }
        // vertical fade at the top
        const top = ctx.createLinearGradient(0, 0, 0, h * 0.35);
        top.addColorStop(0, "rgba(0,0,0,0.85)");
        top.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = top;
        ctx.fillRect(0, 0, w, h * 0.35);
        ctx.globalCompositeOperation = "lighter";

        // splash where the beam hits the floor + reflection pool
        for (const [rx, ry, a, col] of [
          [w * 0.45, h * 0.09, 0.35, colors.a],
          [w * 0.18, h * 0.035, 0.7, colors.b],
          [w * 0.05, h * 0.012, 1, "255,255,255"],
        ] as const) {
          ctx.save();
          ctx.translate(cx, floor);
          ctx.scale(1, ry / rx);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
          g.addColorStop(0, `rgba(${col},${a * flick})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, rx, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        // floor reflection streaks
        for (let i = 0; i < 18; i++) {
          const y = floor + (i / 18) * (h - floor);
          const width = w * 0.04 * (1 + i * 0.6);
          const g = ctx.createLinearGradient(cx - width, 0, cx + width, 0);
          g.addColorStop(0, `rgba(${colors.a},0)`);
          g.addColorStop(0.5, `rgba(${colors.a},${0.12 * (1 - i / 18) * (0.6 + 0.4 * Math.sin(t / 300 + i))})`);
          g.addColorStop(1, `rgba(${colors.a},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(cx - width, y, width * 2, 2);
        }
        // sparks drifting up near the beam
        for (const s of sparks) {
          if (!reduce) s.y -= s.v;
          if (s.y < 0) s.y = 1;
          const x = cx + (s.x - 0.5) * w * 0.5 * (1 - s.y * 0.4);
          ctx.fillStyle = `rgba(${colors.b},${0.6 * (1 - Math.abs(s.x - 0.5) * 2)})`;
          ctx.beginPath();
          ctx.arc(x, s.y * floor, s.s, 0, Math.PI * 2);
          ctx.fill();
        }
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
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black font-sans text-white"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 size-full" />
      {children ?? (
        <div className="-mt-40 px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Light beam</h2>
          <p className="mt-3 text-white/70">A falling column of light with a pooled reflection, drawn live.</p>
        </div>
      )}
    </div>
  );
}
