"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Send } from "lucide-react";

const needs = [
  { id: "brand", label: "Brand identity", weeks: 5, cost: 4.5 },
  { id: "web", label: "Website", weeks: 7, cost: 6 },
  { id: "pack", label: "Packaging", weeks: 4, cost: 2.5 },
  { id: "social", label: "Launch & social", weeks: 3, cost: 1.8 },
];

export default function KilnBrief() {
  const [sel, setSel] = useState<string[]>(["brand", "web"]);
  const [sent, setSent] = useState(false);
  const chosen = needs.filter((n) => sel.includes(n.id));
  const weeks = chosen.length ? Math.max(...chosen.map((c) => c.weeks)) + (chosen.length - 1) * 2 : 0;
  const cost = chosen.reduce((s, c) => s + c.cost, 0) * (chosen.length > 2 ? 0.9 : 1);

  return (
    <section id="brief" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[calc(var(--radius)*1.6)] bg-accent p-8 text-accent-foreground md:p-14">
          <h2 className="font-display text-4xl leading-[0.9] font-black uppercase [font-stretch:110%] sm:text-5xl md:text-7xl md:[font-stretch:125%]">
            Got a project?
          </h2>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                className="mt-10"
              >
                <p className="font-display text-3xl font-black uppercase">Brief received ✶</p>
                <p className="mt-2 text-lg">Asha will reply personally within one working day.</p>
              </motion.div>
            ) : (
              <motion.form
                key="f"
                exit={{ opacity: 0 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-10 space-y-8"
              >
                <fieldset>
                  <legend className="text-sm font-semibold">I need…</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {needs.map((n) => {
                      const on = sel.includes(n.id);
                      return (
                        <motion.button
                          key={n.id}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSel((s) => (on ? s.filter((x) => x !== n.id) : [...s, n.id]))}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-2 rounded-full border-2 border-current px-5 py-3 font-semibold transition ${on ? "bg-primary text-primary-foreground" : ""}`}
                        >
                          {on && <Check className="size-4" />} {n.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="grid gap-4 rounded-[var(--radius)] bg-background/90 p-6 text-foreground sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Typical timeline</p>
                    <motion.p
                      key={weeks}
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                      className="font-display text-4xl font-black"
                    >
                      {weeks ? `~${weeks} weeks` : "—"}
                    </motion.p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Typical budget</p>
                    <motion.p
                      key={cost}
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                      className="font-display text-4xl font-black"
                    >
                      {cost ? `from £${cost.toFixed(1)}k` : "—"}
                    </motion.p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Your name"
                    aria-label="Your name"
                    className="rounded-full border-2 border-current bg-transparent px-5 py-3.5 outline-none placeholder:text-current placeholder:opacity-60"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="rounded-full border-2 border-current bg-transparent px-5 py-3.5 outline-none placeholder:text-current placeholder:opacity-60"
                  />
                  <textarea
                    rows={3}
                    placeholder="Tell us about your business"
                    aria-label="About your business"
                    className="rounded-[var(--radius)] border-2 border-current bg-transparent px-5 py-3.5 outline-none placeholder:text-current placeholder:opacity-60 sm:col-span-2"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground"
                >
                  <Send className="size-4" /> Send brief
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
