"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Receipt, LifeBuoy, TrendingDown, CalendarCheck, FileSearch, Mail } from "lucide-react";

/** Particle network canvas (constellation background), tinted by --primary. */
function Network() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const tint = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 1;
      const x = c.getContext("2d")!;
      x.fillStyle = getComputedStyle(el).getPropertyValue("--primary").trim() || "white";
      x.fillRect(0, 0, 1, 1);
      return Array.from(x.getImageData(0, 0, 1, 1).data.slice(0, 3)).join(",");
    };
    let col = tint();
    const mo = new MutationObserver(() => (col = tint()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.min(110, Math.round((w * h) / 12000)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e?.isIntersecting ?? false));
    io.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const n of nodes) {
          if (!reduce) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
          }
        }
        for (let i = 0; i < nodes.length; i++)
          for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.hypot(nodes[i]!.x - nodes[j]!.x, nodes[i]!.y - nodes[j]!.y);
            if (d < 150) {
              ctx.strokeStyle = `rgba(${col},${(1 - d / 150) * 0.45})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i]!.x, nodes[i]!.y);
              ctx.lineTo(nodes[j]!.x, nodes[j]!.y);
              ctx.stroke();
            }
          }
        ctx.fillStyle = `rgba(${col},0.9)`;
        for (const n of nodes) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.8, 0, 6.28);
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
    };
  }, []);
  return (
    <div ref={wrap} aria-hidden className="absolute inset-0 -z-10">
      <canvas ref={canvas} className="size-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_80%)]" />
    </div>
  );
}

const agents = [
  { icon: Receipt, name: "Finance", job: "Matches invoices to payments and chases what’s overdue.", metric: "−11 h", unit: "per week" },
  {
    icon: LifeBuoy,
    name: "Support",
    job: "Triages tickets, drafts replies and escalates only the hard ones.",
    metric: "92%",
    unit: "auto-resolved",
  },
  {
    icon: TrendingDown,
    name: "Retention",
    job: "Spots churn signals and opens a save-play in your CRM.",
    metric: "+18%",
    unit: "saved revenue",
  },
  {
    icon: CalendarCheck,
    name: "Scheduling",
    job: "Books, moves and confirms meetings across time zones.",
    metric: "0",
    unit: "back-and-forth",
  },
  {
    icon: FileSearch,
    name: "Compliance",
    job: "Reviews contracts against your policy and flags risky clauses.",
    metric: "4 min",
    unit: "per contract",
  },
  { icon: Mail, name: "Follow-up", job: "Writes and sends the follow-up nobody remembered to send.", metric: "3×", unit: "reply rate" },
];

export default function AetherAgents() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-28 font-sans text-foreground">
      <Network />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-accent">Agents</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">A team that never clocks out.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with a template or describe the job in plain English. Every agent works inside the tools you already use.
          </p>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.article
              key={a.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
              className="group rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl transition hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <a.icon className="size-5" />
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent" /> running
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{a.name} agent</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.job}</p>
              <p className="mt-6 border-t border-border pt-4 font-display text-3xl font-semibold">
                {a.metric} <span className="text-sm font-normal text-muted-foreground">{a.unit}</span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
