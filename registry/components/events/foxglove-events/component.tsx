"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const events = [
  {
    day: "Thu",
    date: "23",
    month: "Oct",
    title: "Pub quiz",
    time: "7:30pm",
    tag: "Weekly",
    note: "Teams of up to six. Winners drink free (one round).",
    going: 58,
  },
  {
    day: "Fri",
    date: "24",
    month: "Oct",
    title: "Hollow Point launch party",
    time: "6pm",
    tag: "Release",
    note: "First pours of the new batch, live DJ until close.",
    going: 211,
  },
  {
    day: "Sat",
    date: "25",
    month: "Oct",
    title: "Saturday run club",
    time: "9am",
    tag: "Free",
    note: "5k along the canal, coffee and a half after.",
    going: 34,
  },
  {
    day: "Sun",
    date: "26",
    month: "Oct",
    title: "Folk & roast",
    time: "2pm",
    tag: "Live music",
    note: "Acoustic sets from local artists. Roast from the pizza oven.",
    going: 87,
  },
  {
    day: "Wed",
    date: "29",
    month: "Oct",
    title: "Meet the brewer",
    time: "7pm",
    tag: "Ticketed £18",
    note: "Six-beer tasting with head brewer Ama Owusu.",
    going: 22,
  },
];

export default function FoxgloveEvents() {
  const [rsvp, setRsvp] = useState<string[]>([]);

  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-7xl leading-none uppercase">What’s on</h2>
          <a href="#" className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
            Full calendar <ArrowRight className="size-4" />
          </a>
        </div>

        <ul className="mt-10 border-t-4 border-foreground">
          {events.map((e, i) => {
            const going = rsvp.includes(e.title);
            return (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group grid grid-cols-[4.5rem_1fr] items-center gap-x-6 gap-y-4 border-b border-border py-6 transition-colors hover:bg-secondary md:grid-cols-[6rem_1fr_auto] md:px-4"
              >
                <div className="text-center">
                  <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{e.day}</p>
                  <p className="font-display text-6xl leading-none">{e.date}</p>
                  <p className="text-xs font-bold tracking-widest text-primary uppercase">{e.month}</p>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl tracking-wide uppercase md:text-4xl">{e.title}</h3>
                    <span className="rounded-[var(--radius)] border border-foreground/30 px-2 py-0.5 text-xs font-semibold">{e.tag}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {e.time} · {e.note}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setRsvp((r) => (going ? r.filter((x) => x !== e.title) : [...r, e.title]))}
                  aria-pressed={going}
                  className={`col-span-2 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-3 text-sm font-bold tracking-wider uppercase transition md:col-span-1 ${going ? "bg-primary text-primary-foreground" : "border-2 border-foreground hover:bg-foreground hover:text-background"}`}
                >
                  {going ? (
                    <>
                      <Check className="size-4" /> Going · {e.going + 1}
                    </>
                  ) : (
                    <>I’m in · {e.going}</>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
