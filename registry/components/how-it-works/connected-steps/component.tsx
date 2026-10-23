"use client";

import { motion } from "motion/react";
import { CalendarCheck, Bike, Wrench } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Book a slot", body: "Pick a morning online. A full service is £85, a safety check £25." },
  { icon: Bike, title: "Drop it off by 9am", body: "Tell us what's squeaking. We'll text a quote before we touch anything else." },
  { icon: Wrench, title: "Collect after 4pm", body: "Washed, tuned and test-ridden round the block. Pay when you pick it up." },
];

export default function ConnectedSteps() {
  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">How a service works</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Most bikes go out the same day. Busy weeks in spring, so book a few days ahead.
        </p>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <svg aria-hidden className="absolute top-8 left-0 hidden h-2 w-full md:block" preserveAspectRatio="none" viewBox="0 0 100 2">
            <motion.line
              x1="16"
              y1="1"
              x2="84"
              y2="1"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="1.5 1.5"
              className="text-border"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative grid size-16 place-items-center rounded-2xl border border-border bg-card shadow-sm">
                <s.icon className="size-7 text-primary" />
                <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-xs text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
