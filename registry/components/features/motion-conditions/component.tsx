"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    id: "neck",
    label: "Neck",
    x: 50,
    y: 15,
    conditions: ["Desk neck & headaches", "Whiplash", "Trapped nerve"],
    sessions: "3–5",
    tip: "Most neck pain settles faster with movement than rest.",
  },
  {
    id: "shoulder",
    label: "Shoulder",
    x: 35,
    y: 22,
    conditions: ["Frozen shoulder", "Rotator cuff tears", "Swimmer’s shoulder"],
    sessions: "4–8",
    tip: "We’ll test strength in six directions before treating.",
  },
  {
    id: "back",
    label: "Lower back",
    x: 50,
    y: 42,
    conditions: ["Sciatica", "Disc bulges", "Pregnancy-related pain"],
    sessions: "3–6",
    tip: "90% of back pain improves within six weeks with the right plan.",
  },
  {
    id: "hip",
    label: "Hip",
    x: 60,
    y: 50,
    conditions: ["Hip impingement", "Bursitis", "Post-replacement rehab"],
    sessions: "4–8",
    tip: "Glute strength is usually the missing piece.",
  },
  {
    id: "knee",
    label: "Knee",
    x: 42,
    y: 70,
    conditions: ["Runner’s knee", "ACL rehab", "Meniscus injuries"],
    sessions: "4–10",
    tip: "We use video gait analysis for every running injury.",
  },
  {
    id: "ankle",
    label: "Ankle & foot",
    x: 58,
    y: 90,
    conditions: ["Sprains", "Achilles tendinopathy", "Plantar fasciitis"],
    sessions: "3–6",
    tip: "Balance training cuts re-sprain risk by half.",
  },
];

export default function MotionConditions() {
  const [sel, setSel] = useState("back");
  const a = areas.find((x) => x.id === sel)!;

  return (
    <section id="conditions" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[360px_1fr] lg:items-center">
        <div className="relative mx-auto aspect-[1/2] w-full max-w-[300px]">
          <svg viewBox="0 0 100 200" className="absolute inset-0 size-full text-primary/15" aria-hidden>
            <circle cx="50" cy="18" r="11" fill="currentColor" />
            <path
              d="M34 34 h32 q6 0 7 7 l6 48 q1 5-4 5 h-2 l-5-40 v42 l4 98 q0 5-5 5 h-4 q-4 0-4-5 l-5-80 l-5 80 q0 5-4 5 h-4 q-5 0-5-5 l4-98 v-42 l-5 40 h-2 q-5 0-4-5 l6-48 q1-7 7-7z"
              fill="currentColor"
            />
          </svg>
          {areas.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setSel(x.id)}
              aria-pressed={sel === x.id}
              aria-label={x.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x.x}%`, top: `${x.y}%` }}
            >
              <span
                className={`relative grid size-8 place-items-center rounded-full border-4 border-secondary transition ${sel === x.id ? "scale-125 bg-accent" : "bg-primary hover:scale-110"}`}
              >
                {sel === x.id && <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />}
              </span>
            </button>
          ))}
        </div>

        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Where does it hurt?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {areas.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setSel(x.id)}
                aria-pressed={sel === x.id}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sel === x.id ? "bg-foreground text-background" : "bg-card text-card-foreground hover:bg-background"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-[calc(var(--radius)*1.5)] bg-card p-8 text-card-foreground"
            >
              <h2 className="font-display text-5xl font-black tracking-tight uppercase italic">{a.label}</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-3">
                {a.conditions.map((c) => (
                  <li key={c} className="rounded-[var(--radius)] bg-muted px-4 py-3 text-sm font-semibold">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <p className="text-sm">
                  <span className="font-display text-3xl font-black">{a.sessions}</span>{" "}
                  <span className="text-muted-foreground">typical sessions</span>
                </p>
                <p className="max-w-xs text-sm text-muted-foreground">💡 {a.tip}</p>
              </div>
              <a href="#book" className="mt-6 inline-flex items-center gap-2 font-bold text-primary">
                Book for {a.label.toLowerCase()} pain <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
