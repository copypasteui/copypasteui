"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

const types = ["New home", "Renovation", "Workplace", "Public building"];
const budgets = ["< €500k", "€500k–1.5M", "€1.5M+", "Not sure yet"];

export default function NordContact() {
  const [type, setType] = useState(types[0]!);
  const [budget, setBudget] = useState(budgets[3]!);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const chip = (active: boolean) =>
    `border px-4 py-2 text-sm transition ${active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`;

  return (
    <section id="contact" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] font-extrabold tracking-[-0.05em] uppercase">
            Have a site<span className="text-accent">?</span>
          </h2>
          <a
            href="mailto:studio@nord.example"
            className="mt-8 block w-fit border-b-2 border-foreground text-2xl font-semibold tracking-tight md:text-4xl"
          >
            studio@nord.example
          </a>
          <p className="mt-6 max-w-sm text-muted-foreground">We reply within two working days and take on six new projects a year.</p>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-center border-t border-foreground pt-10"
            >
              <p className="text-4xl font-semibold tracking-tight">Thank you.</p>
              <p className="mt-3 text-lg text-muted-foreground">
                We’ll be in touch about your {type.toLowerCase()} project within two working days.
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-8 border-t border-foreground pt-10">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold tracking-[0.15em] uppercase">Project</legend>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button key={t} type="button" onClick={() => setType(t)} className={chip(type === t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-3 text-sm font-semibold tracking-[0.15em] uppercase">Budget</legend>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button key={b} type="button" onClick={() => setBudget(b)} className={chip(budget === b)}>
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  required
                  placeholder="Name"
                  aria-label="Name"
                  className="border-b border-foreground bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-accent"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  className="border-b border-foreground bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-accent"
                />
                <textarea
                  rows={3}
                  placeholder="Tell us about the site"
                  aria-label="About the site"
                  className="resize-none border-b border-foreground bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-accent sm:col-span-2"
                />
              </div>
              <button
                type="submit"
                className="group flex w-full items-center justify-between bg-foreground px-6 py-5 text-lg font-semibold text-background transition hover:bg-accent hover:text-accent-foreground"
              >
                Send enquiry <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
