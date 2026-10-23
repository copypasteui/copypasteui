"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const projects = [
  { name: "Lindholm House", place: "Bergen", year: 2025, type: "Residential", photo: "photo-1756706718604-ef4af3970e33" },
  { name: "Kvarter 9", place: "Copenhagen", year: 2025, type: "Housing", photo: "photo-1764502547771-9a48420782a1" },
  { name: "Stenhus", place: "Aarhus", year: 2024, type: "Residential", photo: "photo-1783125127229-0850d689e014" },
  { name: "Ochre Block", place: "Oslo", year: 2024, type: "Mixed use", photo: "photo-1785681856854-a08e10c6ff3f" },
  { name: "Grå Library", place: "Malmö", year: 2023, type: "Public", photo: "photo-1788956766888-912549a5b892" },
  { name: "Halvø Terraces", place: "Stavanger", year: 2022, type: "Housing", photo: "photo-1789570254729-0647c908f694" },
];

export default function NordProjectIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 30 });

  return (
    <section
      id="projects"
      className="relative bg-background px-6 py-24 font-sans text-foreground"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-end justify-between border-b border-foreground pb-4">
          <h2 className="text-5xl font-extrabold tracking-[-0.04em] uppercase md:text-8xl">Index</h2>
          <p className="text-sm text-muted-foreground">{projects.length} selected / 64 total</p>
        </div>
        <ul onPointerLeave={() => setHover(null)}>
          {projects.map((p, i) => (
            <li key={p.name}>
              <a
                href="#"
                onPointerEnter={() => setHover(i)}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border py-5 transition-colors md:grid-cols-[60px_1.4fr_1fr_1fr_80px_32px]"
              >
                <span className="hidden text-sm text-muted-foreground md:block">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-3 md:text-4xl">
                  {p.name}
                </span>
                <span className="hidden text-muted-foreground md:block">{p.place}</span>
                <span className="hidden text-muted-foreground md:block">{p.type}</span>
                <span className="text-muted-foreground">{p.year}</span>
                <ArrowUpRight className="hidden size-6 text-accent opacity-0 transition group-hover:opacity-100 md:block" />
              </a>
              {/* On touch screens show the photo inline instead of following the cursor */}
              <img src={img(p.photo, 900)} alt="" loading="lazy" className="mt-1 mb-4 aspect-[16/9] w-full object-cover md:hidden" />
            </li>
          ))}
        </ul>
      </div>

      <motion.div style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block">
        <AnimatePresence>
          {hover !== null && (
            <motion.img
              key={projects[hover]!.photo}
              src={img(projects[hover]!.photo)}
              alt=""
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="absolute aspect-[4/3] w-80 translate-x-8 -translate-y-1/2 object-cover shadow-2xl"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
