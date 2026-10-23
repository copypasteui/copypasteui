"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/** Falling light-beam background (canvas), tinted with --primary / --accent. */
function Beam() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const rgb = (name: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const x = c.getContext("2d")!;
      x.fillStyle = getComputedStyle(el).getPropertyValue(name).trim() || "white";
      x.fillRect(0, 0, 1, 1);
      return Array.from(x.getImageData(0, 0, 1, 1).data.slice(0, 3)).join(",");
    };
    let A = rgb("--primary");
    let B = rgb("--accent");
    const mo = new MutationObserver(() => {
      A = rgb("--primary");
      B = rgb("--accent");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    let w = 0;
    let h = 0;
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
    const sparks = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 0.0008 + Math.random() * 0.0015,
      s: Math.random() * 1.5 + 0.3,
    }));
    let raf = 0;
    const draw = (t: number) => {
      if (visible) {
        const cx = w / 2;
        const floor = h * 0.8;
        const fl = 0.85 + 0.15 * Math.sin(t / 170) * Math.sin(t / 61);
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (const [bw, a, c] of [
          [w * 0.3, 0.16, A],
          [w * 0.08, 0.4, A],
          [w * 0.02, 0.9, B],
          [w * 0.005, 1, "255,255,255"],
        ] as const) {
          const g = ctx.createLinearGradient(cx - bw, 0, cx + bw, 0);
          g.addColorStop(0, `rgba(${c},0)`);
          g.addColorStop(0.5, `rgba(${c},${a * fl})`);
          g.addColorStop(1, `rgba(${c},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(cx - bw, 0, bw * 2, floor);
        }
        for (const [rx, ry, a, c] of [
          [w * 0.45, h * 0.08, 0.3, A],
          [w * 0.16, h * 0.03, 0.7, B],
          [w * 0.05, h * 0.012, 1, "255,255,255"],
        ] as const) {
          ctx.save();
          ctx.translate(cx, floor);
          ctx.scale(1, ry / rx);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
          g.addColorStop(0, `rgba(${c},${a * fl})`);
          g.addColorStop(1, `rgba(${c},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, rx, 0, 6.28);
          ctx.fill();
          ctx.restore();
        }
        for (const s of sparks) {
          if (!reduce) s.y -= s.v;
          if (s.y < 0) s.y = 1;
          ctx.fillStyle = `rgba(${B},${0.7 * (1 - Math.abs(s.x - 0.5) * 2)})`;
          ctx.beginPath();
          ctx.arc(cx + (s.x - 0.5) * w * 0.45, s.y * floor, s.s, 0, 6.28);
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
    <div ref={wrap} aria-hidden className="absolute inset-0 -z-10">
      <canvas ref={canvas} className="size-full" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}

export default function AetherBeamCta() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-40 text-center font-sans text-foreground md:py-52">
      <Beam />
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-4xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] font-semibold tracking-[-0.04em] [text-shadow:0_0_40px_var(--background)]"
      >
        Hire your first agent tonight.
      </motion.h2>
      <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground [text-shadow:0_0_20px_var(--background)]">
        Free for your first 500 tasks. No credit card, no sales call.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-medium text-background">
          Start building <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a href="#" className="rounded-full border border-border bg-background/40 px-8 py-4 font-medium backdrop-blur">
          Book a demo
        </a>
      </div>
    </section>
  );
}
