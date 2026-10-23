"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Hyperspace star field on canvas: stars stream out from a vanishing point that follows
 * the cursor, leaving theme-tinted streaks. Speeds up while the pointer is pressed.
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

export default function WarpStarfieldBackground({ children }: { children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0;
    let h = 0;
    let tint = rgb(el, "--primary");
    const mo = new MutationObserver(() => (tint = rgb(el, "--primary")));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    const N = 700;
    const stars = Array.from({ length: N }, () => ({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: Math.random() }));
    const center = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let boost = 0;
    let target = 0;

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
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      center.tx = 0.5 + ((e.clientX - r.left) / r.width - 0.5) * 0.4;
      center.ty = 0.5 + ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    const down = () => (target = 1);
    const up = () => (target = 0);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const draw = () => {
      if (visible && !document.hidden) {
        center.x += (center.tx - center.x) * 0.05;
        center.y += (center.ty - center.y) * 0.05;
        boost += (target - boost) * 0.05;
        const speed = reduce ? 0 : 0.007 + boost * 0.03;
        ctx.fillStyle = `rgba(0,0,0,${0.35 - boost * 0.2})`;
        ctx.fillRect(0, 0, w, h);
        const cx = w * center.x;
        const cy = h * center.y;
        const f = Math.max(w, h) * 0.5;
        for (const s of stars) {
          const pz = s.z;
          s.z -= speed;
          if (s.z <= 0.02) {
            s.x = (Math.random() - 0.5) * 2;
            s.y = (Math.random() - 0.5) * 2;
            s.z = 1;
            continue;
          }
          const x = cx + (s.x / s.z) * f;
          const y = cy + (s.y / s.z) * f;
          const px = cx + (s.x / pz) * f;
          const py = cy + (s.y / pz) * f;
          const b = 1 - s.z;
          ctx.strokeStyle = s.z < 0.35 ? `rgba(255,255,255,${b})` : `rgba(${tint},${b})`;
          ctx.lineWidth = b * 2.6;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(x, y, b * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    // warm up a few frames so the first paint already has streaks
    for (let i = 0; i < 40; i++) {
      for (const s of stars) s.z = s.z - 0.01 <= 0.02 ? 1 : s.z - 0.01;
    }
    draw();
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative isolate flex min-h-[100svh] cursor-crosshair items-center justify-center overflow-hidden bg-black font-sans text-white"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_100%)]"
      />
      {children ?? (
        <div className="pointer-events-none px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Warp speed</h2>
          <p className="mt-3 text-white/70">Steer with your cursor. Hold to jump.</p>
        </div>
      )}
    </div>
  );
}
