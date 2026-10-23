"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, MapPin, PoundSterling } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const projects = [
  {
    title: "Glass-box kitchen extension",
    type: "Extension",
    place: "Dulwich",
    budget: "£148k",
    weeks: 15,
    photo: "photo-1758565811145-619f5e20f196",
    quote: "They found a steel problem in week two and fixed it without a single extra invoice.",
  },
  {
    title: "Mansard loft with ensuite",
    type: "Loft",
    place: "Brixton",
    budget: "£82k",
    weeks: 10,
    photo: "photo-1676802037786-3697d60497ae",
    quote: "We stayed in the house the whole time. Barely noticed them until the stairs went in.",
  },
  {
    title: "Victorian terrace, top to bottom",
    type: "Renovation",
    place: "Herne Hill",
    budget: "£210k",
    weeks: 26,
    photo: "photo-1674649207083-281c2517ab49",
    quote: "Every Friday we got photos and a plain-English update. Total peace of mind.",
  },
  {
    title: "Shaker kitchen & utility",
    type: "Kitchen",
    place: "Clapham",
    budget: "£41k",
    weeks: 5,
    photo: "photo-1771371854543-bb274762389e",
    quote: "Five weeks, to the day. The fitter even labelled every drawer for us.",
  },
  {
    title: "Double-storey side return",
    type: "Extension",
    place: "Peckham",
    budget: "£165k",
    weeks: 18,
    photo: "photo-1786053538161-501fbdd89629",
    quote: "The architect’s drawings, the party walls, building control: they handled all of it.",
  },
];
const types = ["All", "Extension", "Loft", "Kitchen", "Renovation"];

export default function IronbarkProjects() {
  const [t, setT] = useState("All");
  const list = projects.filter((p) => t === "All" || p.type === t);

  return (
    <section id="projects" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl leading-none font-black uppercase md:text-8xl">Recent work</h2>
          <div className="flex flex-wrap gap-1">
            {types.map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setT(x)}
                aria-pressed={t === x}
                className={`px-4 py-2 text-sm font-bold transition ${t === x ? "bg-foreground text-background" : "bg-muted hover:bg-secondary"}`}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`group ${i === 0 && t === "All" ? "md:col-span-2" : ""}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img(p.photo, i === 0 ? 1800 : 1000)}
                    alt={p.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 && t === "All" ? "aspect-[21/9]" : "aspect-[4/3]"}`}
                  />
                  <span className="absolute top-0 left-0 bg-accent px-3 py-1.5 text-xs font-bold tracking-widest text-accent-foreground uppercase">
                    {p.type}
                  </span>
                  <blockquote className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground/90 p-5 text-background transition-transform duration-500 group-hover:translate-y-0">
                    “{p.quote}”
                  </blockquote>
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl font-black uppercase">{p.title}</h3>
                  <ul className="flex gap-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-1">
                      <MapPin className="size-3.5" /> {p.place}
                    </li>
                    <li className="flex items-center gap-1">
                      <PoundSterling className="size-3.5" /> {p.budget.slice(1)}
                    </li>
                    <li className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {p.weeks} wks
                    </li>
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
