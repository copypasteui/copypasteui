"use client";

import { motion } from "motion/react";
import { MapPin, Ticket } from "lucide-react";

const events = [
  {
    day: "29",
    month: "Nov",
    title: "Winter showcase",
    where: "St Wilfrid’s Church",
    body: "Students of every age and grade perform, with mince pies at the interval.",
    free: false,
    price: "£6 · under-16s free",
  },
  {
    day: "13",
    month: "Dec",
    title: "Carols & cocoa",
    where: "Valley Gardens bandstand",
    body: "Our choirs and string orchestra lead an outdoor sing-along.",
    free: true,
    price: "Free",
  },
  {
    day: "18",
    month: "Jan",
    title: "Adult beginners’ open mic",
    where: "The studio",
    body: "Nervous? Perfect. A friendly first performance for grown-up learners.",
    free: true,
    price: "Free",
  },
  {
    day: "8",
    month: "Mar",
    title: "Exam prep masterclass",
    where: "The studio",
    body: "Mock exams with feedback from a visiting examiner, grades 1–8.",
    free: false,
    price: "£15",
  },
];

export default function QuavermoorConcerts() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl">Concerts &amp; events</h2>
          <p className="max-w-sm text-muted-foreground">Every student gets the chance to perform at least twice a year, if they want to.</p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {events.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex gap-5 rounded-[var(--radius)] bg-card p-5 text-card-foreground"
            >
              <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-[calc(var(--radius)*0.8)] bg-primary py-3 text-primary-foreground">
                <span className="font-display text-4xl leading-none">{e.day}</span>
                <span className="mt-1 text-xs tracking-widest text-primary-foreground uppercase">{e.month}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl">{e.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {e.where}
                </p>
                <p className="mt-2 text-sm">{e.body}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${e.free ? "bg-accent text-accent-foreground" : "bg-muted"}`}
                  >
                    {e.price}
                  </span>
                  <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    <Ticket className="size-4" /> {e.free ? "RSVP" : "Tickets"}
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
