"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Project = { title: string; result: string; year: string; tags: string[]; photo: string; alt: string; wide?: boolean };

const projects: Project[] = [
  {
    title: "Hearth Coffee Roasters",
    result: "Bags, cups and a shop that now sells 40% online",
    year: "2026",
    tags: ["Packaging", "Web"],
    photo: "photo-1633533452148-a9657d2c9a5f",
    alt: "Coffee cups and bags of coffee held against a white wall",
    wide: true,
  },
  {
    title: "Good Boy Bakery",
    result: "Treat packets for 60 pet shops",
    year: "2025",
    tags: ["Packaging"],
    photo: "photo-1633533446213-a438ff5f0629",
    alt: "Two packets of dog treats on a pink background",
  },
  {
    title: "Marsh & Rye",
    result: "Name, mark and cards for a law firm",
    year: "2025",
    tags: ["Brand"],
    photo: "photo-1777652918753-d66882b15391",
    alt: "Two business cards on a wooden surface",
  },
  {
    title: "One Gym",
    result: "Identity across 3 sites",
    year: "2024",
    tags: ["Brand"],
    photo: "photo-1763705857736-2b4f16a33758",
    alt: "Orange card with a 'one' logo among other cards",
  },
  {
    title: "Lantern Film Club",
    result: "A poster a month for six years",
    year: "2024",
    tags: ["Print"],
    photo: "photo-1563050860-87d45eaaeabb",
    alt: "Wall of assorted posters",
    wide: true,
  },
];
const filters = ["All", "Brand", "Packaging", "Print", "Web"];

export default function ProjectShowcaseGrid() {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter((p) => filter === "All" || p.tags.includes(filter));

  return (
    <section id="work" className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-5xl font-black tracking-tight uppercase md:text-7xl">Selected work</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${filter === f ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.a
                layout
                key={p.title}
                href="#"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`group block ${p.wide && filter === "All" ? "md:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden rounded-lg ${p.wide && filter === "All" ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={img(p.photo, p.wide ? 1600 : 900)}
                    alt={p.alt}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 grid size-12 scale-75 place-items-center rounded-full bg-background text-foreground opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {p.tags.join(" · ")} · {p.year}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">{p.result}</p>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
