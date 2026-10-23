"use client";

import { motion } from "motion/react";

export default function FounderNote() {
  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <motion.article
        initial={{ opacity: 0, y: 30, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-3xl rounded-lg border border-border bg-card px-8 py-12 text-card-foreground shadow-xl shadow-foreground/5 md:px-16"
      >
        <span className="absolute -top-4 left-8 rounded-full bg-primary px-4 py-1 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase">
          A note from our founder
        </span>
        <div className="space-y-5 font-display text-xl leading-relaxed md:text-2xl">
          <p>
            When I visited my grandmother’s village in 2009, the nearest clean water was a two-hour walk away. Every day. For every family.
          </p>
          <p className="text-muted-foreground">
            We started with one well and a promise to stay until it worked for good. Fifteen years later we still do it the same way: with
            the community, not for it.
          </p>
          <p>Thank you for being part of that promise.</p>
        </div>
        <div className="mt-10 flex items-center gap-4 border-t border-border pt-6">
          <span className="grid size-14 place-items-center rounded-full bg-accent font-display text-xl font-bold text-accent-foreground">
            AM
          </span>
          <div>
            <svg viewBox="0 0 200 50" className="h-10 w-40 text-foreground" aria-label="Signature">
              <motion.path
                d="M5 35 C 20 5, 35 5, 30 35 S 50 40, 60 20 S 75 10, 80 30 S 100 40, 110 18 C 115 10, 125 10, 120 30 S 150 35, 160 20 S 185 15, 195 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 2, ease: "easeInOut" }}
              />
            </svg>
            <p className="text-sm text-muted-foreground">Amara Mensah, founder</p>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
