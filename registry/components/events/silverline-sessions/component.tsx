"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Session = { day: string; time: string; kind: "Family" | "Disco 18+" | "Learn" | "Adults"; spaces: number };
const sessions: Session[] = [
  { day: "Mon", time: "6pm to 8pm", kind: "Adults", spaces: 40 },
  { day: "Tue", time: "4pm to 6pm", kind: "Family", spaces: 22 },
  { day: "Wed", time: "6:30pm to 7:30pm", kind: "Learn", spaces: 6 },
  { day: "Thu", time: "7pm to 10pm", kind: "Disco 18+", spaces: 58 },
  { day: "Fri", time: "7pm to 11pm", kind: "Disco 18+", spaces: 12 },
  { day: "Sat", time: "10am to 12pm", kind: "Family", spaces: 31 },
  { day: "Sat", time: "1pm to 2pm", kind: "Learn", spaces: 3 },
  { day: "Sat", time: "7pm to 11pm", kind: "Disco 18+", spaces: 0 },
  { day: "Sun", time: "11am to 1pm", kind: "Family", spaces: 44 },
];
const kinds = ["All", "Family", "Disco 18+", "Learn", "Adults"] as const;

export default function SilverlineSessions() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const shown = sessions.filter((s) => kind === "All" || s.kind === kind);
  return (
    <section id="sessions" className="bg-secondary px-6 py-20 font-sans text-secondary-foreground md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl uppercase md:text-5xl">This week on the floor</h2>
        <div role="group" aria-label="Filter sessions" className="mt-8 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold ${kind === k ? "bg-primary text-primary-foreground" : "border border-border bg-card text-card-foreground"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((s) => (
              <motion.li
                key={s.day + s.time}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between gap-4 rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground"
              >
                <div>
                  <p className="font-display text-lg uppercase">{s.day}</p>
                  <p className="text-sm">{s.time}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.kind}</p>
                </div>
                {s.spaces > 0 ? (
                  <a href="#" className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    {s.spaces < 10 ? `Last ${s.spaces}` : "Book"}
                  </a>
                ) : (
                  <span className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Sold out
                  </span>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
