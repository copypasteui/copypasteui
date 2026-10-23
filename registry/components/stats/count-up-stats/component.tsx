"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

const stats = [
  { value: 12000, suffix: "+", label: "Sites launched" },
  { value: 98, suffix: "%", label: "Lighthouse average" },
  { value: 4.7, suffix: "/5", label: "Customer rating", decimals: 1 },
  { value: 36, suffix: "h", label: "Median time to launch" },
];

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
}

export default function CountUpStats() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-8 text-center md:text-left">
            <p className="font-display text-5xl font-semibold tracking-tight text-card-foreground">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
