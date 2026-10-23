"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * A ring of light rising from the horizon, with particles drawn into it. Each particle spirals in, flares on the
 * rim and starts again; the ring leans towards the cursor. Colours come from your theme. Pauses off-screen.
 */
function Portal() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(cv);
    const primary = css.getPropertyValue("--primary").trim() || "rgb(80 140 255)";
    const accent = css.getPropertyValue("--accent").trim() || "rgb(150 230 255)";
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lean = 0;
    let leanTarget = 0;
    const N = 900;
    const parts = Array.from({ length: N }, () => ({
      a: Math.random() * Math.PI * 2,
      d: 1 + Math.random() * 1.6,
      s: 0.002 + Math.random() * 0.006,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      leanTarget = ((e.clientX - r.left) / r.width - 0.5) * 0.25;
    };
    const draw = () => {
      lean += (leanTarget - lean) * 0.05;
      const cx = w / 2;
      const cy = h * 0.78;
      const R = Math.min(w, h) * 0.42;
      ctx.fillStyle = "rgb(3 4 10 / 0.35)";
      ctx.fillRect(0, 0, w, h);
      // The ring: a wide soft stroke under a thin bright one.
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(lean);
      ctx.scale(1, 0.92);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 26;
      ctx.strokeStyle = primary;
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(0, 0, R, Math.PI, 0);
      ctx.stroke();
      ctx.lineWidth = 2.5;
      ctx.globalAlpha = 0.95;
      ctx.strokeStyle = accent;
      ctx.beginPath();
      ctx.arc(0, 0, R, Math.PI, 0);
      ctx.stroke();
      for (const p of parts) {
        p.d -= p.s;
        p.a += p.s * 2.4;
        if (p.d <= 1) {
          p.d = 1 + Math.random() * 1.6;
          p.a = Math.PI + Math.random() * Math.PI;
        }
        const x = Math.cos(p.a) * R * p.d;
        const y = Math.sin(p.a) * R * p.d;
        if (y > 4) continue;
        const near = 1 - Math.min(1, (p.d - 1) * 1.6);
        ctx.globalAlpha = 0.15 + near * 0.85;
        ctx.fillStyle = near > 0.7 ? "white" : accent;
        ctx.fillRect(x, y, 1.6 + near * 1.6, 1.6 + near * 1.6);
      }
      ctx.restore();
      ctx.globalCompositeOperation = "source-over";
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };
    resize();
    ctx.fillStyle = "rgb(3 4 10)";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < (reduce ? 60 : 1); i++) draw();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => {
      visible = Boolean(e?.isIntersecting);
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full" />;
}

export default function PortalArcBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[rgb(3_4_10)] font-sans text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Portal />
      </div>
      {children ?? (
        <div className="-mt-[10vh] px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Portal arc</h2>
          <p className="mt-3">Particles spiral into a ring of light that leans with the cursor.</p>
        </div>
      )}
    </div>
  );
}
