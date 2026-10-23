"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ImagePlus } from "lucide-react";

const sizes = ["Courtyard", "Small", "Medium", "Large", "Acres"];
const wants = ["New design", "Patio or paths", "Planting", "Lawn", "Regular maintenance", "Tree work"];
const budgets = ["Under £5k", "£5–15k", "£15–40k", "£40k+"];

export default function GreenlineQuote() {
  const [size, setSize] = useState("Medium");
  const [want, setWant] = useState<string[]>(["New design", "Planting"]);
  const [budget, setBudget] = useState("£15–40k");
  const [sent, setSent] = useState(false);

  return (
    <section id="quote" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-5xl leading-tight font-bold">Tell us about your garden.</h2>
          <p className="mt-4 text-muted-foreground">
            A designer will visit, walk the space with you and send a no-obligation proposal within ten days.
          </p>
          <ol className="mt-10 space-y-5">
            {["Free visit within 2 weeks", "Proposal with 3D sketch", "Fixed price, then we build"].map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-display font-bold text-accent-foreground">
                  {i + 1}
                </span>{" "}
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-[calc(var(--radius)*2)] border border-border bg-card p-6 text-card-foreground md:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} className="py-12 text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="size-8" />
                </motion.span>
                <p className="mt-6 font-display text-3xl font-bold">Thank you!</p>
                <p className="mt-2 text-muted-foreground">We’ll call within two working days to arrange your visit.</p>
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
                <fieldset>
                  <legend className="text-sm font-semibold">Garden size</legend>
                  <div className="mt-2 grid grid-cols-5 gap-1 rounded-[var(--radius)] bg-muted p-1">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={`rounded-[calc(var(--radius)*0.7)] py-2 text-xs font-semibold sm:text-sm ${size === s ? "bg-card text-card-foreground shadow" : "text-muted-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold">What are you after?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {wants.map((w) => {
                      const on = want.includes(w);
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWant((a) => (on ? a.filter((x) => x !== w) : [...a, w]))}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                        >
                          {on && <Check className="size-3.5" />}
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold">Rough budget</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        aria-pressed={budget === b}
                        className={`rounded-[var(--radius)] border py-2.5 text-sm font-medium ${budget === b ? "border-primary bg-secondary text-secondary-foreground" : "border-border"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius)] border border-dashed border-border p-4 text-sm text-muted-foreground hover:border-foreground">
                  <ImagePlus className="size-5" /> Add a few photos of the garden (optional)
                  <input type="file" accept="image/*" multiple className="sr-only" />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Name"
                    aria-label="Name"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                  <input
                    required
                    placeholder="Postcode"
                    aria-label="Postcode"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="rounded-[var(--radius)] border border-border bg-background px-4 py-3 outline-none focus:border-ring sm:col-span-2"
                  />
                </div>
                <button type="submit" className="w-full rounded-[var(--radius)] bg-primary py-4 font-semibold text-primary-foreground">
                  Request my free visit
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
