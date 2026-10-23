"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Wire this up to your email provider's form endpoint or a server action.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (valid) setDone(true);
  };

  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-primary px-8 py-14 text-primary-foreground md:px-14">
        <div aria-hidden className="absolute -top-16 -right-16 size-64 rounded-full border-[28px] border-primary-foreground/10" />
        <div aria-hidden className="absolute right-40 -bottom-24 size-56 rounded-full bg-primary-foreground/10" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Mail className="size-8 opacity-80" />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">The Sunday letter</h2>
            <p className="mt-3 max-w-md opacity-90">
              One email a week: new dishes, wine arrivals and first dibs on supper-club seats. No spam, unsubscribe in one click.
            </p>
          </div>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-lg bg-primary-foreground/15 p-5 text-lg font-semibold"
              >
                <CheckCircle2 className="size-6 shrink-0" /> You’re on the list. See you Sunday!
              </motion.p>
            ) : (
              <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} className="space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 rounded-lg bg-background p-2 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    type="submit"
                    disabled={!valid}
                    className="rounded-md bg-foreground px-5 py-2.5 font-semibold text-background transition disabled:opacity-40"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs opacity-75">Join 8,400 readers. We never share your email.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
