"use client";

import { motion } from "motion/react";
import { Check, MessageSquare, CalendarClock, TrendingUp } from "lucide-react";

function InboxVisual() {
  return (
    <div className="space-y-3">
      {["Can we move the call to 3pm?", "Invoice #2041 paid ✓", "New lead from the website"].map((m, i) => (
        <motion.div
          key={m}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-sm"
        >
          <span className="grid size-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <MessageSquare className="size-4" />
          </span>
          <span className="text-sm text-card-foreground">{m}</span>
        </motion.div>
      ))}
    </div>
  );
}

function CalendarVisual() {
  const busy = [2, 5, 6, 9, 12, 13, 16, 20, 23, 24];
  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.015 }}
          className={`grid aspect-square place-items-center rounded-md text-xs ${busy.includes(i) ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}
        >
          {i + 1}
        </motion.span>
      ))}
    </div>
  );
}

function GrowthVisual() {
  return (
    <svg viewBox="0 0 300 160" className="w-full">
      <motion.path
        d="M0 140 C 40 130, 60 110, 100 105 S 160 70, 200 60 S 260 20, 300 12"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-primary"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.circle
        cx="300"
        cy="12"
        r="6"
        className="fill-primary"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
      />
    </svg>
  );
}

const rows = [
  {
    icon: MessageSquare,
    kicker: "Inbox",
    title: "Every conversation in one calm place",
    body: "Email, chat and form submissions land in a shared inbox with owners, snooze and canned replies.",
    points: ["Assign in one click", "Shared drafts", "SLA timers"],
    visual: <InboxVisual />,
  },
  {
    icon: CalendarClock,
    kicker: "Scheduling",
    title: "Booking that fills itself",
    body: "Clients pick a slot that actually works. Buffers, time zones and reminders are handled for you.",
    points: ["Round-robin teams", "Paid bookings", "Calendar sync"],
    visual: <CalendarVisual />,
  },
  {
    icon: TrendingUp,
    kicker: "Insights",
    title: "Know what’s working",
    body: "See which channels bring revenue, not just clicks, with reports your accountant will like too.",
    points: ["Revenue attribution", "Weekly digest", "Export anywhere"],
    visual: <GrowthVisual />,
  },
];

export default function AlternatingFeatureRows() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl space-y-24">
        {rows.map((r, i) => (
          <div key={r.title} className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={i % 2 ? "md:order-2" : ""}
            >
              <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-primary uppercase">
                <r.icon className="size-4" /> {r.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{r.title}</h3>
              <p className="mt-4 text-lg text-muted-foreground">{r.body}</p>
              <ul className="mt-6 space-y-2">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className={`rounded-xl border border-border bg-muted p-8 ${i % 2 ? "md:order-1" : ""}`}>{r.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
