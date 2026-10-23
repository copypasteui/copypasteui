"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, Check, Siren, CalendarDays, FileText } from "lucide-react";

const urgency = [
  { id: "now", label: "Emergency", note: "Within 2 hours", icon: Siren },
  { id: "week", label: "This week", note: "Pick a day", icon: CalendarDays },
  { id: "quote", label: "Free quote", note: "Bigger jobs", icon: FileText },
] as const;
const problems = ["Leak", "No hot water", "Boiler fault", "Power cut", "Blocked drain", "Something else"];

export default function FixwellCallout() {
  const [u, setU] = useState<(typeof urgency)[number]["id"]>("now");
  const [p, setP] = useState<string[]>(["Leak"]);
  const [sent, setSent] = useState(false);

  return (
    <section id="callout" className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="font-display text-5xl font-extrabold tracking-tight">Tell us what’s wrong.</h2>
          <p className="mt-3 text-muted-foreground">We’ll text you an engineer’s name, photo and ETA.</p>
        </div>
        <div className="mt-10 rounded-[calc(var(--radius)*1.5)] bg-card p-6 text-card-foreground shadow-xl shadow-foreground/5 md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="size-8" />
                </span>
                <p className="mt-5 font-display text-3xl font-extrabold">Request received</p>
                <p className="mt-2 text-muted-foreground">
                  {u === "now" ? "We’re calling you back in the next 5 minutes." : "We’ll be in touch within the hour."}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-7"
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  {urgency.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => setU(x.id)}
                      aria-pressed={u === x.id}
                      className={`flex items-center gap-3 rounded-[var(--radius)] border-2 p-4 text-left transition ${u === x.id ? (x.id === "now" ? "border-primary bg-primary text-primary-foreground" : "border-primary bg-secondary text-secondary-foreground") : "border-border hover:border-foreground"}`}
                    >
                      <x.icon className="size-5 shrink-0" />
                      <span>
                        <span className="block font-bold">{x.label}</span>
                        <span className="text-xs opacity-90">{x.note}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <fieldset>
                  <legend className="text-sm font-semibold">What’s the problem?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {problems.map((x) => {
                      const on = p.includes(x);
                      return (
                        <button
                          key={x}
                          type="button"
                          onClick={() => setP((a) => (on ? a.filter((y) => y !== x) : [...a, x]))}
                          aria-pressed={on}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${on ? "bg-accent text-accent-foreground" : "bg-muted hover:bg-secondary"}`}
                        >
                          {x}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <textarea
                  rows={3}
                  placeholder="Anything that would help: where it is, how long it’s been happening…"
                  aria-label="Details"
                  className="w-full rounded-[var(--radius)] border-2 border-border bg-background p-4 outline-none focus:border-primary"
                />
                <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border-2 border-dashed border-border p-4 text-sm text-muted-foreground hover:border-foreground">
                  <Camera className="size-5" /> Add a photo (optional) so we bring the right parts
                  <input type="file" accept="image/*" className="sr-only" />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name"
                    aria-label="Name"
                    className="rounded-[var(--radius)] border-2 border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile"
                    aria-label="Mobile"
                    className="rounded-[var(--radius)] border-2 border-border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
                <button type="submit" className="w-full rounded-[var(--radius)] bg-primary py-4 font-bold text-primary-foreground">
                  {u === "now" ? "Send an engineer" : "Send request"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
