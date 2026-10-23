"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const services = [
  {
    title: "Garden design",
    from: "from £850",
    body: "A scaled plan, planting schedule and 3D visuals so you can see it before we dig.",
    photo: "photo-1668120089662-42642838cfef",
  },
  {
    title: "Hard landscaping",
    from: "from £6k",
    body: "Porcelain and natural-stone patios, paths, raised beds, walls and decking.",
    photo: "photo-1633330948542-0b3bdeefcdb3",
  },
  {
    title: "Planting",
    from: "from £1.2k",
    body: "Borders that look good in every month, chosen for your soil and how much time you have.",
    photo: "photo-1700689807667-82630348b301",
  },
  {
    title: "Garden maintenance",
    from: "from £45 / visit",
    body: "Weekly, fortnightly or monthly: mowing, pruning, weeding and seasonal jobs.",
    photo: "photo-1617576683096-00fc8eecb3af",
  },
];

export default function GreenlineServices() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-5xl leading-tight font-bold">From the first sketch to the hundredth mow.</h2>
          <p className="max-w-sm text-muted-foreground">
            Most of our clients start with one project and stay for maintenance. Some have been with us for fifteen years.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#quote"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative flex aspect-[3/4.4] flex-col justify-end overflow-hidden rounded-[var(--radius)] text-white ${i % 2 ? "lg:mt-12" : ""}`}
            >
              <img
                src={img(s.photo)}
                alt=""
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowUpRight className="size-5" />
              </span>
              <span className="relative p-6">
                <span className="text-sm font-semibold text-white/80">{s.from}</span>
                <span className="mt-1 block font-display text-3xl font-bold">{s.title}</span>
                <span className="mt-2 block max-h-0 overflow-hidden text-sm text-white/85 transition-all duration-500 group-hover:max-h-24">
                  {s.body}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
