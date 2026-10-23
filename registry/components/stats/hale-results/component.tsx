"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stats = [
  { to: 64, suffix: "", label: "years serving Bath and the South West" },
  { to: 1800, suffix: "+", label: "clients helped last year" },
  { to: 94, suffix: "%", label: "of family matters settled without court" },
  { to: 4.7, suffix: "", label: "average client rating", decimals: 1 },
];

function Num({ to, suffix, decimals = 0 }: { to: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [seen, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function HaleResults() {
  return (
    <section className="relative isolate overflow-hidden py-24 font-sans text-white">
      <img src={img("photo-1505547828843-176834e42154")} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[rgb(14_17_28)]/85" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.blockquote
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl font-display text-4xl leading-tight italic md:text-5xl"
        >
          “Good law is about people first. The paperwork follows.”
        </motion.blockquote>
        <p className="mt-4 text-sm tracking-[0.3em] text-white/70 uppercase">— Margaret Hale, founding partner</p>
        <dl className="mt-16 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[rgb(14_17_28)]/60 p-6 backdrop-blur">
              <dt className="font-display text-6xl text-accent tabular-nums">
                <Num {...s} />
              </dt>
              <dd className="mt-2 text-sm text-white/80">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
