"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { Droplets, Leaf, Sun, Users } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stats = [
  { icon: Sun, value: 100, suffix: "%", label: "Solar powered since 2022" },
  { icon: Users, value: 86, suffix: "%", label: "Team from our village" },
  { icon: Leaf, value: 3200, suffix: "", label: "Native trees replanted" },
  { icon: Droplets, value: 0, suffix: "", label: "Single-use plastic bottles" },
];

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function CanopyImpact() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">Our land</p>
          <h2 className="mt-4 font-display text-5xl leading-tight">Luxury that leaves the forest better than we found it.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Canopy was a cleared coffee plantation in 2015. Today it is eleven hectares of regenerating forest, a bee sanctuary and a
            kitchen garden that grows half of what you eat.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-border pt-5">
                <s.icon className="size-5 text-primary" />
                <dt className="mt-3 font-display text-5xl tabular-nums">
                  <Count to={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(12% 12% 12% 12%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] overflow-hidden"
            style={{ borderRadius: "calc(var(--radius) * 2)" }}
          >
            <img
              src={img("photo-1717119125410-29c3edf6e075")}
              alt="Stone path through tropical gardens to the main house"
              className="size-full object-cover"
            />
          </motion.div>
          <figure
            className="absolute right-4 -bottom-8 left-4 bg-card p-6 text-card-foreground shadow-2xl md:right-auto md:-left-10 md:max-w-sm"
            style={{ borderRadius: "var(--radius)" }}
          >
            <blockquote className="font-display text-xl leading-snug">
              “The most beautiful place we’ve ever stayed, and the first where we didn’t feel guilty about the footprint.”
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold">Clara & Henrik, Oslo</span>
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">9.8 / 10</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
