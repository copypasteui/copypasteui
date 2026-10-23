"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Navigation, Clock } from "lucide-react";

// day index: 0 = Sunday
const hours: { day: string; idx: number; open: string | null }[] = [
  { day: "Monday", idx: 1, open: null },
  { day: "Tuesday", idx: 2, open: "17:30 – 23:00" },
  { day: "Wednesday", idx: 3, open: "17:30 – 23:00" },
  { day: "Thursday", idx: 4, open: "17:30 – 23:00" },
  { day: "Friday", idx: 5, open: "17:30 – 00:00" },
  { day: "Saturday", idx: 6, open: "11:00 – 00:00" },
  { day: "Sunday", idx: 0, open: "11:00 – 16:00" },
];

export default function LocationHours() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <section id="visit" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        {/* Stylised map — swap for an embedded map from your provider */}
        <div className="relative min-h-80 overflow-hidden rounded-lg border border-border bg-muted">
          <svg className="absolute inset-0 size-full text-border" aria-hidden>
            <defs>
              <pattern id="streets" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
                <path d="M0 40 H80 M40 0 V80" stroke="currentColor" strokeWidth="6" />
                <path d="M0 10 H80" stroke="currentColor" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#streets)" />
          </svg>
          <div className="absolute top-[60%] left-[12%] h-24 w-40 rounded-full bg-accent/70 blur-sm" aria-hidden />
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
          >
            <span className="absolute top-full left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30" />
            <MapPin className="size-12 fill-primary text-primary-foreground drop-shadow-lg" />
          </motion.div>
          <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-md bg-card p-4 text-card-foreground shadow-lg">
            <div>
              <p className="font-semibold">Maison Olive</p>
              <p className="text-sm text-muted-foreground">14 Rue des Lilas, Old Town</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Navigation className="size-4" /> Directions
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Come say hello</h2>
          <p className="mt-3 text-muted-foreground">Walk-ins welcome at the bar. For tables of 7+, call us.</p>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {hours.map((h) => {
              const isToday = h.idx === today;
              return (
                <li key={h.day} className={`flex items-center justify-between py-3 ${isToday ? "font-semibold" : ""}`}>
                  <span className="flex items-center gap-3">
                    {h.day}
                    {isToday && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">Today</span>}
                  </span>
                  <span className={h.open ? "" : "text-muted-foreground"}>{h.open ?? "Closed"}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <a href="tel:+15550100" className="flex items-center gap-2 font-medium hover:text-primary">
              <Phone className="size-4 text-primary" /> +1 555 0100
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 text-primary" /> Kitchen closes 45 min before
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
