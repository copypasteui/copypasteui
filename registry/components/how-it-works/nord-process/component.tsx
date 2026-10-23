"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const phases = [
  {
    n: "01",
    t: "Listen",
    weeks: "2 weeks",
    b: "Site visits at different times of day, a long conversation about how you actually live, and a brief we write together.",
    photo: "photo-1611827886404-495e633249ae",
  },
  {
    n: "02",
    t: "Sketch",
    weeks: "6 weeks",
    b: "Hand drawings and timber models first. Three directions, then one. Renderings only when they help decide.",
    photo: "photo-1495321308589-43affb814eee",
  },
  {
    n: "03",
    t: "Detail",
    weeks: "10 weeks",
    b: "Every joint, sill and switch drawn. We bring the builder in early so the budget never surprises anyone.",
    photo: "photo-1758801304964-417e328be877",
  },
  {
    n: "04",
    t: "Build",
    weeks: "8–14 months",
    b: "Weekly site visits until handover, and one more a year later, to see how the building has settled in.",
    photo: "photo-1768836180164-070b4c1a8f94",
  },
];

function Phase({ p, onActive }: { p: (typeof phases)[number]; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);
  return (
    <div
      ref={ref}
      className={`border-t-4 py-10 transition-colors duration-500 lg:min-h-[60vh] ${inView ? "border-primary" : "border-border"}`}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-6xl font-extrabold tracking-tighter md:text-8xl">{p.n}</span>
        <span className="text-sm text-muted-foreground">{p.weeks}</span>
      </div>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight">{p.t}</h3>
      <p className="mt-3 max-w-md text-lg text-muted-foreground">{p.b}</p>
      <img src={img(p.photo, 900)} alt="" loading="lazy" className="mt-6 aspect-[16/10] w-full object-cover lg:hidden" />
    </div>
  );
}

export default function NordProcess() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase">Process</p>
          <h2 className="mt-6 max-w-lg text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            We draw for months before we build.
          </h2>
          <div className="mt-12">
            {phases.map((p, i) => (
              <Phase key={p.n} p={p} onActive={() => setActive(i)} />
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="sticky top-12 aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={phases[active]!.photo}
                src={img(phases[active]!.photo)}
                alt=""
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute bottom-0 left-0 bg-background px-4 py-2 text-sm font-semibold">
              Phase {phases[active]!.n}: {phases[active]!.t}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
