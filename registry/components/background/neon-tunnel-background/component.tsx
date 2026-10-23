"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * A square grid corridor rushing towards you. Lines are projected in 3D on all four walls, and a band of light
 * in your primary colour scans along the tunnel. Pauses off-screen.
 */
function Tunnel() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const primary = getComputedStyle(cv).getPropertyValue("--primary").trim() || "rgb(57 255 140)";
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const DEPTH = 24;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    // Project a point on the tunnel wall (x, y in -1..1, z in units ahead) to the screen.
    const project = (x: number, y: number, z: number) => {
      const f = Math.min(w, h) * 0.9;
      const s = f / Math.max(z, 0.05);
      return [w / 2 + x * s * 0.6, h / 2 + y * s * 0.6] as const;
    };
    const draw = (t: number) => {
      ctx.fillStyle = "rgb(2 6 4)";
      ctx.fillRect(0, 0, w, h);
      const offset = reduce ? 0 : (t / 900) % 1;
      const scan = reduce ? 6 : ((t / 220) % (DEPTH + 6)) - 3;
      ctx.strokeStyle = primary;
      ctx.lineWidth = 1;
      // Additive strokes with a soft glow read as neon on the dark walls.
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = primary;
      ctx.shadowBlur = 14;
      // Rings across the corridor, moving towards the viewer.
      for (let i = 0; i < DEPTH; i++) {
        const z = i + 1 - offset;
        const glow = Math.max(0, 1 - Math.abs(z - scan) / 2.5);
        ctx.globalAlpha = Math.min(1, 0.3 + 2.4 / z) * 0.8 + glow * 0.2;
        ctx.lineWidth = 1.2 + glow * 3;
        const [x0, y0] = project(-1, -1, z);
        const [x1, y1] = project(1, 1, z);
        ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      }
      // Rails running into the distance on each wall.
      ctx.lineWidth = 1;
      for (let k = -1; k <= 1; k += 0.25) {
        for (const [ax, ay] of [
          [k, -1],
          [k, 1],
          [-1, k],
          [1, k],
        ] as const) {
          const [nx, ny] = project(ax, ay, 0.6);
          const [fx, fy] = project(ax, ay, DEPTH);
          const g = ctx.createLinearGradient(nx, ny, fx, fy);
          g.addColorStop(0, primary);
          g.addColorStop(1, "transparent");
          ctx.strokeStyle = g;
          ctx.globalAlpha = 0.75;
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(fx, fy);
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize();
    draw(0);
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

export default function NeonTunnelBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(2_6_4)] font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Tunnel />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_22%_at_center,rgb(0_0_0/0.8),transparent)]" />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Neon tunnel</h2>
          <p className="mt-3">A grid corridor with a scan of light running through it.</p>
        </div>
      )}
    </div>
  );
}
