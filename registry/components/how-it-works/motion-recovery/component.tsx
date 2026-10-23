"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ClipboardList, Dumbbell, Hand, Trophy } from "lucide-react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const steps = [
  {
    icon: ClipboardList,
    week: "Day 1",
    title: "Assessment",
    body: "60 minutes. We find the cause, not just where it hurts, and agree a goal: a 10k, a full night’s sleep, picking up your kid.",
    photo: "photo-1645005512968-0c1fe99f0093",
  },
  {
    icon: Hand,
    week: "Weeks 1–2",
    title: "Calm it down",
    body: "Hands-on treatment, shockwave or acupuncture to settle pain so you can move again.",
    photo: "photo-1768507423533-b87b62769758",
  },
  {
    icon: Dumbbell,
    week: "Weeks 2–6",
    title: "Build it back",
    body: "A progressive plan in our app, with video for every exercise and check-ins from your physio.",
    photo: "photo-1645005512942-a17817fb7c11",
  },
  {
    icon: Trophy,
    week: "Week 6+",
    title: "Back to it",
    body: "Return-to-sport testing and a plan to stop it coming back. Then we wave you off.",
    photo: "photo-1645005513713-9e2b92a687d3",
  },
];

export default function MotionRecovery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 50%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <h2 className="max-w-2xl font-display text-5xl leading-[0.95] font-black tracking-tight uppercase italic md:text-6xl">
          Your recovery, mapped out.
        </h2>
        <div className="relative mt-14 h-2 rounded-full bg-muted">
          <motion.div style={{ width }} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-[var(--radius)] bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="text-sm font-bold tracking-wider text-muted-foreground uppercase">{s.week}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-black uppercase italic">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              <div className="mt-5 overflow-hidden rounded-[var(--radius)]">
                <img
                  src={img(s.photo)}
                  alt={s.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
