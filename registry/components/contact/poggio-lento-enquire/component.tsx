"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

const input = "mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 focus:border-primary focus:outline-none";

export default function PoggioLentoEnquire() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <section className="bg-background px-6 py-28 font-sans text-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.3em] text-primary uppercase">Stay with us</p>
        <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">Send us your dates</h2>
        <p className="mt-4 text-muted-foreground">Chiara replies personally, usually the same day. Open from 1 April to 2 November.</p>
      </div>
      {done ? (
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          role="status"
          className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 border-y border-border py-8 text-center font-display text-2xl"
        >
          <Check className="size-6 text-primary" aria-hidden /> Grazie. Chiara will write to you soon.
        </motion.p>
      ) : (
        <form onSubmit={submit} className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
          <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Arriving
            <input type="date" required className={input} />
          </label>
          <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Leaving
            <input type="date" required className={input} />
          </label>
          <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Name
            <input required autoComplete="name" className={input} />
          </label>
          <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Email
            <input type="email" required autoComplete="email" className={input} />
          </label>
          <label className="text-xs tracking-[0.2em] text-muted-foreground uppercase sm:col-span-2">
            Anything we should know
            <textarea rows={3} className={input} placeholder="Celebrations, dietary needs, which room you'd like" />
          </label>
          <button
            type="submit"
            className="justify-self-center border border-primary bg-primary px-10 py-4 text-sm tracking-[0.2em] text-primary-foreground uppercase sm:col-span-2"
          >
            Send enquiry
          </button>
        </form>
      )}
    </section>
  );
}
