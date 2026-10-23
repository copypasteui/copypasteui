"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Play } from "lucide-react";

/** A button that is pulled toward the cursor. Reuse <Magnetic> around any element. */
function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function MagneticButtons() {
  return (
    <section className="flex min-h-[22rem] flex-wrap items-center justify-center gap-10 bg-background px-6 py-20 font-sans text-foreground">
      <Magnetic>
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground"
        >
          Book a demo
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>
      </Magnetic>
      <Magnetic strength={0.5}>
        <button
          type="button"
          aria-label="Play showreel"
          className="grid size-24 place-items-center rounded-full border border-border bg-card text-card-foreground shadow-sm transition-colors hover:bg-foreground hover:text-background"
        >
          <Play className="size-7 translate-x-0.5 fill-current" />
        </button>
      </Magnetic>
      <Magnetic strength={0.25}>
        <button
          type="button"
          className="rounded-md border-2 border-foreground px-8 py-4 text-lg font-bold tracking-wider uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Let’s talk
        </button>
      </Magnetic>
    </section>
  );
}
