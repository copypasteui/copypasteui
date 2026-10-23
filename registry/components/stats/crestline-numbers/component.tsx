"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const NUMBERS = [
  { value: 7, unit: "days", note: "Saturday to Saturday" },
  { value: 92, unit: "km", note: "about 13 km a day" },
  { value: 5370, unit: "m", note: "total climbing" },
  { value: 8, unit: "walkers", note: "the most we take" },
  { value: 6, unit: "huts", note: "and one Cortina hotel" },
  { value: 1, unit: "bag", note: "moved by van, every day" },
];

function Counter({ to }: { to: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || !inView) {
      el.textContent = (reduce ? to : 0).toLocaleString("en-GB");
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-GB")),
    });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{to.toLocaleString("en-GB")}</span>;
}

export default function CrestlineNumbers() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 border-t-4 border-foreground pt-6 md:grid-cols-4">
          <p className="font-bold tracking-tight">03 / The trip</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-none font-extrabold tracking-tight md:col-span-3">
            In numbers
          </h2>
        </div>
        <dl className="mt-12 grid grid-cols-2 border-t border-l border-foreground md:grid-cols-3">
          {NUMBERS.map((n) => (
            <div key={n.unit} className="border-r border-b border-foreground p-6 md:p-8">
              <dt className="sr-only">{n.unit}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none font-extrabold tracking-tighter tabular-nums">
                  <Counter to={n.value} />
                  <span className="ml-1 text-[0.4em] font-bold tracking-normal">{n.unit}</span>
                </span>
                <span className="mt-3 block text-muted-foreground">{n.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
