"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const img = (id: string, w = 120) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    name: "Chloe, 31",
    issue: "ACL reconstruction",
    before: 8,
    after: 1,
    weeks: 26,
    quote: "Back playing netball nine months after surgery. Tom pushed me exactly the right amount.",
    face: "photo-1494790108377-be9c29b29330",
  },
  {
    name: "Graham, 64",
    issue: "Sciatica",
    before: 9,
    after: 2,
    weeks: 6,
    quote: "I’d been told to rest for months. Six weeks of the right exercises and I’m gardening again.",
    face: "photo-1568602471122-7832951cc4c5",
  },
  {
    name: "Ife, 27",
    issue: "Runner’s knee",
    before: 6,
    after: 0,
    weeks: 8,
    quote: "Gait analysis found the problem in ten minutes. Just ran my first marathon.",
    face: "photo-1489278353717-f64c6ee8a4d2",
  },
];

function PainBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-12 font-semibold tracking-wider text-muted-foreground uppercase">{label}</span>
      <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 10}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`block h-full rounded-full ${tone}`}
        />
      </span>
      <span className="w-8 text-right font-display text-sm font-black">{value}/10</span>
    </div>
  );
}

export default function MotionResults() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-none font-black tracking-tight uppercase italic md:text-6xl">
            Real people,
            <br />
            real results.
          </h2>
          <p className="flex items-center gap-2">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>{" "}
            4.8 · 1,120 Google reviews
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-[calc(var(--radius)*1.5)] bg-card p-6 text-card-foreground"
            >
              <figcaption className="flex items-center gap-3">
                <img src={img(s.face)} alt="" className="size-12 rounded-full object-cover" />
                <span>
                  <span className="block font-bold">{s.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {s.issue} · {s.weeks} weeks
                  </span>
                </span>
              </figcaption>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{s.quote}”</blockquote>
              <div className="mt-6 space-y-2 border-t border-border pt-5">
                <p className="text-xs font-bold tracking-wider uppercase">Pain score</p>
                <PainBar label="Before" value={s.before} tone="bg-primary" />
                <PainBar label="After" value={s.after} tone="bg-accent" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
