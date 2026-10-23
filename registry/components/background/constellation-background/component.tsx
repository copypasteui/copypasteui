"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * A drifting particle network: nodes link up when close and are pulled toward the cursor,
 * drawn on canvas in the theme's foreground and primary colours. Works on light and dark.
 */

function rgb(el: Element, name: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim() || "gray";
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const x = c.getContext("2d")!;
  x.fillStyle = v;
  x.fillRect(0, 0, 1, 1);
  const [r, g, b] = x.getImageData(0, 0, 1, 1).data;
  return `${r},${g},${b}`;
}

// intensity="soft" draws the network fainter, for text-heavy sections.
export default function ConstellationBackground({ children, intensity = "bold" }: { children?: ReactNode; intensity?: "soft" | "bold" }) {
  const bold = intensity === "bold";
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0;
    let h = 0;
    let col = { line: rgb(el, "--muted-foreground"), hot: rgb(el, "--primary") };
    const mo = new MutationObserver(() => (col = { line: rgb(el, "--muted-foreground"), hot: rgb(el, "--primary") }));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(140, Math.round((w * h) / 11000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? false));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => (mouse.x = mouse.y = -9999);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const draw = () => {
      if (visible && !document.hidden) {
        ctx.clearRect(0, 0, w, h);
        for (const n of nodes) {
          if (!reduce) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 220) {
              n.vx += (dx / d) * 0.02;
              n.vy += (dy / d) * 0.02;
            }
            n.vx *= 0.985;
            n.vy *= 0.985;
            n.x += n.vx + Math.sign(n.vx) * 0.05;
            n.y += n.vy + Math.sign(n.vy) * 0.05;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i]!;
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j]!;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK) {
              const near = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < 180;
              ctx.strokeStyle = `rgba(${near ? col.hot : col.line},${(1 - d / LINK) * (near ? 0.95 : bold ? 0.8 : 0.5)})`;
              ctx.lineWidth = near ? 1.2 : 0.8;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 180;
          ctx.fillStyle = `rgba(${near ? col.hot : col.line},${near ? 1 : bold ? 0.95 : 0.7})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, near ? 3 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [bold]);

  return (
    <div
      ref={wrap}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-background font-sans text-foreground"
    >
      <canvas ref={canvas} aria-hidden className="absolute inset-0 -z-10 size-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]"
      />
      {children ?? (
        <div className="pointer-events-none px-6 text-center">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Constellation</h2>
          <p className="mt-3 text-muted-foreground">Nodes connect and gather around your cursor.</p>
        </div>
      )}
    </div>
  );
}
