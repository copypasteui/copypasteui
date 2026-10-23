"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const rays = [
  { left: "36%", width: "9%", rotate: -18, d: 9 },
  { left: "45%", width: "14%", rotate: -6, d: 11 },
  { left: "52%", width: "6%", rotate: 5, d: 8 },
  { left: "57%", width: "11%", rotate: 15, d: 12 },
  { left: "63%", width: "5%", rotate: 26, d: 10 },
];

export default function PrismRaysCta() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-36 text-center font-sans text-foreground md:py-44">
      {/* light-rays background, inlined */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {rays.map((r, i) => (
          <motion.div
            key={i}
            className="absolute -top-[10%] h-[100%] origin-top bg-gradient-to-b from-primary/45 via-accent/20 to-transparent blur-xl"
            style={{ left: r.left, width: r.width, rotate: r.rotate }}
            animate={{ opacity: [0.35, 0.9, 0.35], rotate: [r.rotate - 2, r.rotate + 2, r.rotate - 2] }}
            transition={{ duration: r.d, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-4xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-bold tracking-[-0.04em]"
      >
        Your best work starts on a blank canvas.
      </motion.h2>
      <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">Free for individuals forever. Teams get 30 days of everything.</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground">
          Open a new file <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a href="#" className="rounded-full border border-border bg-background/60 px-8 py-4 font-medium backdrop-blur">
          Talk to sales
        </a>
      </div>
    </section>
  );
}
