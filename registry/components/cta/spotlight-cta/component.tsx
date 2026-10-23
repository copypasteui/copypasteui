"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function SpotlightCta() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });
  const y = useSpring(useMotionValue(50), { stiffness: 120, damping: 20 });
  const background = useMotionTemplate`radial-gradient(28rem circle at ${x}% ${y}%, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)`;

  return (
    <section className="bg-background px-6 py-24 font-sans">
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          x.set(((e.clientX - r.left) / r.width) * 100);
          y.set(((e.clientY - r.top) / r.height) * 100);
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card px-8 py-20 text-center"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [background-size:40px_40px] opacity-40"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight text-card-foreground md:text-6xl">
            Your first climb at Northside is free.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Shoes and chalk included. Taster sessions run Saturday and Sunday, 10am to 1pm, with a coach on the wall.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Book a taster
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-7 py-3.5 font-semibold text-foreground transition hover:bg-muted"
            >
              Prices and times
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
