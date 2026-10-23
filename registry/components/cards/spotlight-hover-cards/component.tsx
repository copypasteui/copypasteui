"use client";

import { useRef, type PointerEvent } from "react";
import { Boxes, Gauge, Shield, Workflow, Bot, LineChart } from "lucide-react";

const items = [
  { icon: Bot, title: "Agents", body: "Durable, observable AI agents with retries built in." },
  { icon: Workflow, title: "Workflows", body: "Chain steps with branching, waits and human approval." },
  { icon: Gauge, title: "Realtime", body: "Stream every token and state change to your UI." },
  { icon: Shield, title: "Guardrails", body: "Policies, PII redaction and spend limits per key." },
  { icon: Boxes, title: "Sandboxes", body: "Run untrusted code in isolated micro-VMs." },
  { icon: LineChart, title: "Evals", body: "Score every run and catch regressions in CI." },
];

/** Cards share one cursor spotlight: each card's border and fill light up near the pointer. */
export default function SpotlightHoverCards() {
  const grid = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    for (const card of Array.from(grid.current?.children ?? []) as HTMLElement[]) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--x", `${e.clientX - r.left}px`);
      card.style.setProperty("--y", `${e.clientY - r.top}px`);
    }
  };

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight md:text-5xl">
          Run AI agents without building the plumbing yourself.
        </h2>
        <div ref={grid} onPointerMove={onMove} className="group/grid mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-px text-card-foreground [--x:-500px] [--y:-500px]"
            >
              {/* border glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(260px_circle_at_var(--x)_var(--y),var(--primary),transparent_60%)] group-hover/grid:opacity-100" />
              <div className="relative h-full rounded-[calc(var(--radius)+3px)] bg-card p-7">
                {/* inner glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(320px_circle_at_var(--x)_var(--y),color-mix(in_oklab,var(--primary)_12%,transparent),transparent_60%)] group-hover/grid:opacity-100" />
                <it.icon className="relative size-7 text-primary" />
                <h3 className="relative mt-5 text-lg font-semibold">{it.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
