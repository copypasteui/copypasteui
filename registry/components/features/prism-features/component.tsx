"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { LayoutGrid, Component, PlayCircle } from "lucide-react";

/** Flowing ribbon lines (SVG), inlined from flowing-lines-background. */
function Ribbons() {
  const g = useRef<SVGGElement>(null);
  useEffect(() => {
    const paths = Array.from(g.current!.querySelectorAll("path"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = (time: number) => {
      const t = time / 1000;
      paths.forEach((p, i) => {
        const k = i / paths.length;
        const pts: string[] = [];
        for (let x = -40; x <= 1240; x += 40) {
          const y =
            300 + Math.sin(x / 280 + t * 0.5 + k * 2.2) * (110 + k * 50) + Math.sin(x / 130 - t * 0.8 + k * 4) * 14 + (k - 0.5) * 140;
          pts.push(`${x},${y.toFixed(1)}`);
        }
        p.setAttribute("d", `M${pts.join(" L")}`);
      });
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw(3000);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg aria-hidden viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 -z-10 size-full opacity-70">
      <defs>
        <linearGradient id="prism-ribbon" x1="0" x2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
          <stop offset=".4" stopColor="var(--primary)" />
          <stop offset=".75" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g ref={g} fill="none" stroke="url(#prism-ribbon)">
        {Array.from({ length: 28 }).map((_, i) => (
          <path key={i} strokeWidth={i % 7 === 0 ? 1.4 : 0.7} opacity={0.3 + (i % 4) * 0.15} />
        ))}
      </g>
    </svg>
  );
}

export default function PrismFeatures() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-28 font-sans text-foreground">
      <Ribbons />
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-3xl text-center font-display text-4xl font-bold tracking-[-0.03em] md:text-6xl">
          Everything your team draws, in one canvas.
        </h2>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card/85 p-6 backdrop-blur-xl"
          >
            <LayoutGrid className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold">Auto-layout that gets it</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Stacks, grids and wrapping that behave like real CSS, so handoff is just copying.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-muted p-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.span key={i} layout className={`h-12 rounded-lg ${i === 1 ? "col-span-2 bg-primary" : "bg-card"}`} />
              ))}
            </div>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-border bg-card/85 p-6 backdrop-blur-xl md:translate-y-8"
          >
            <Component className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold">Components with variants</h3>
            <p className="mt-2 text-sm text-muted-foreground">One button, every state. Change the main, update every instance.</p>
            <div className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-muted p-4">
              {[
                ["Primary", "bg-primary text-primary-foreground"],
                ["Secondary", "bg-secondary text-secondary-foreground"],
                ["Ghost", "border border-border"],
                ["Accent", "bg-accent text-accent-foreground"],
              ].map(([l, c]) => (
                <span key={l} className={`rounded-full px-3 py-1.5 text-xs font-medium ${c}`}>
                  {l}
                </span>
              ))}
            </div>
          </motion.article>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-border bg-card/85 p-6 backdrop-blur-xl"
          >
            <PlayCircle className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-2xl font-bold">Prototypes that feel real</h3>
            <p className="mt-2 text-sm text-muted-foreground">Smart-animate between frames and share a link anyone can click through.</p>
            <div className="relative mt-6 h-[104px] overflow-hidden rounded-2xl bg-muted">
              <motion.span
                animate={{ x: [12, 150, 12] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 h-14 w-20 rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--accent))] shadow-lg"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
