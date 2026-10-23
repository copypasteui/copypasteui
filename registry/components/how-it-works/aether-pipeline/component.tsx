"use client";

import { motion } from "motion/react";
import { Zap, Bot, Wrench, UserCheck, CheckCircle2 } from "lucide-react";

const nodes = [
  { icon: Zap, label: "Trigger", sub: "New invoice in inbox", x: 80 },
  { icon: Bot, label: "Agent", sub: "Reads, matches, decides", x: 290 },
  { icon: Wrench, label: "Tools", sub: "ERP · Bank · Slack", x: 500 },
  { icon: UserCheck, label: "Approval", sub: "Only over €5k", x: 710 },
  { icon: CheckCircle2, label: "Done", sub: "Logged & reversible", x: 920 },
];

export default function AetherPipeline() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-28 font-sans text-foreground">
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">Autonomy, with a seatbelt.</h2>
        </div>

        <div className="mt-16 [scrollbar-width:none] overflow-x-auto pb-4">
          <svg viewBox="0 0 1000 200" className="min-w-[760px]" role="img" aria-label="Pipeline: trigger, agent, tools, approval, done">
            <defs>
              <linearGradient id="aether-pipe" x1="0" x2="1">
                <stop offset="0" stopColor="var(--primary)" />
                <stop offset="1" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <path d="M80 70 H920" stroke="var(--border)" strokeWidth="2" strokeDasharray="6 8" fill="none" />
            <motion.path
              d="M80 70 H920"
              stroke="url(#aether-pipe)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {[0, 1, 2].map((k) => (
              <motion.circle
                key={k}
                r="5"
                cy="70"
                fill="var(--accent)"
                style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
                initial={{ cx: 80, opacity: 0 }}
                animate={{ cx: [80, 920], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: k * 1.33, ease: "linear" }}
              />
            ))}
            {nodes.map((n, i) => (
              <motion.g
                key={n.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.25 }}
              >
                <circle
                  cx={n.x}
                  cy="70"
                  r="34"
                  fill="var(--card)"
                  stroke={i === 3 ? "var(--accent)" : "var(--primary)"}
                  strokeWidth="1.5"
                />
                <foreignObject x={n.x - 12} y="58" width="24" height="24">
                  <n.icon className={`size-6 ${i === 3 ? "text-accent" : "text-primary"}`} />
                </foreignObject>
                <text x={n.x} y="135" textAnchor="middle" className="fill-foreground font-display text-[17px] font-semibold">
                  {n.label}
                </text>
                <text x={n.x} y="160" textAnchor="middle" className="fill-muted-foreground text-[13px]">
                  {n.sub}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { t: "Describe the job", b: "Tell Aether what “done” looks like. It proposes a plan and the tools it needs." },
            { t: "Set the guardrails", b: "Spend limits, approval thresholds and which actions always need a human." },
            { t: "Watch it work", b: "Every step is logged, explainable and one click to undo." },
          ].map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
