"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

// Set your event date here (local time).
const EVENT_DATE = new Date("2027-04-15T09:00:00");
const topics = ["AI agents", "Edge compute", "Design systems", "Open source", "Realtime", "Security", "DX"];

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - (now ?? target.getTime()));
  return [
    { label: "Days", value: Math.floor(diff / 86_400_000) },
    { label: "Hours", value: Math.floor(diff / 3_600_000) % 24 },
    { label: "Minutes", value: Math.floor(diff / 60_000) % 60 },
    { label: "Seconds", value: Math.floor(diff / 1000) % 60 },
  ];
}

export default function EventCountdownHero() {
  const parts = useCountdown(EVENT_DATE);

  return (
    <section className="relative overflow-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] opacity-40"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-border bg-card px-5 py-2 text-sm"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" /> April 15–16, 2027
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-primary" /> Lisbon + online
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-8 max-w-5xl font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase md:text-8xl"
        >
          Shipfest <span className="text-primary">27</span>
        </motion.h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Two days, 60 talks and one very loud afterparty for people who build the web. 2,000 builders. Zero sales pitches.
        </p>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-3">
          {parts.map((p) => (
            <div key={p.label} className="rounded-lg border border-border bg-card py-4">
              <motion.p
                key={p.value}
                initial={{ y: -8, opacity: 0.4 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-4xl font-bold text-card-foreground tabular-nums md:text-5xl"
              >
                {String(p.value).padStart(2, "0")}
              </motion.p>
              <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">{p.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#tickets"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 font-bold text-primary-foreground transition hover:-translate-y-0.5"
          >
            <Ticket className="size-5" /> Get early-bird tickets
          </a>
          <a
            href="#schedule"
            className="rounded-lg border border-border bg-card px-7 py-4 font-semibold text-card-foreground hover:bg-muted"
          >
            View schedule
          </a>
        </div>
      </div>

      <div className="relative border-y border-border bg-accent py-3 text-accent-foreground">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex w-max gap-8 font-display text-lg font-bold whitespace-nowrap uppercase"
        >
          {[...topics, ...topics, ...topics, ...topics].map((t, i) => (
            <span key={i}>{t} ●</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
