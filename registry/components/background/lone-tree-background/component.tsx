"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/*
 * A single tree in a bright valley. The photo shifts with the cursor, pollen drifts through the light on a
 * canvas, and the sky fades into your theme's background so text sits on it cleanly.
 */
const PHOTO = "https://images.unsplash.com/photo-1584986098866-92f42410e9f7?auto=format&fit=crop&w=2400&q=80";

function Pollen() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let motes: { x: number; y: number; r: number; v: number; p: number }[] = [];
    let raf = 0;
    let visible = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: Math.round(cv.clientWidth / 18) }, () => ({
        x: Math.random() * cv.clientWidth,
        y: Math.random() * cv.clientHeight,
        r: Math.random() * 1.8 + 0.6,
        v: Math.random() * 0.25 + 0.08,
        p: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, cv.clientWidth, cv.clientHeight);
      ctx.fillStyle = "rgb(255 250 230)";
      for (const m of motes) {
        m.y -= m.v;
        m.x += Math.sin(t / 1800 + m.p) * 0.25;
        if (m.y < -4) m.y = cv.clientHeight + 4;
        ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t / 700 + m.p);
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
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

export default function LoneTreeBackground({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 18 });
  const y = useSpring(my, { stiffness: 40, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -30);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -16);
  };

  return (
    <div
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col items-center overflow-hidden bg-background pt-[16vh] font-sans text-foreground"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.img src={PHOTO} alt="" style={{ x, y }} className="absolute inset-[-3%] size-[106%] object-cover object-bottom" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_30%,transparent_60%)]" />
        <Pollen />
      </div>
      {children ?? (
        <div className="px-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase">Background</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Lone tree</h2>
          <p className="mt-3">The sky fades into your theme. Pollen drifts in the light.</p>
        </div>
      )}
    </div>
  );
}
