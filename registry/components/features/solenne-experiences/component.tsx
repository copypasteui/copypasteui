"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tiles = [
  {
    n: "01",
    title: "Three pools, one horizon",
    body: "Saltwater, heated and a quiet adults-only edge.",
    photo: "photo-1781455495352-f810d0901497",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    n: "02",
    title: "Breakfast until noon",
    body: "Lemon ricotta, figs from the garden, slow coffee.",
    photo: "photo-1504754524776-8f4f37790ca0",
    span: "md:col-span-5",
  },
  {
    n: "03",
    title: "Terrace dinners",
    body: "Seven tables, one menu, the sound of the sea.",
    photo: "photo-1679394900352-05fd1ed3ed48",
    span: "md:col-span-5",
  },
  {
    n: "04",
    title: "Golden-hour boat trips",
    body: "Hidden coves with a skipper who knows them all.",
    photo: "photo-1724618702364-8cde016bda22",
    span: "md:col-span-12",
  },
];

export default function SolenneExperiences() {
  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Days that <em>don’t</em> need a plan.
          </h2>
          <p className="max-w-md text-lg text-muted-foreground md:justify-self-end">
            Everything is a few steps from your room, and nothing is scheduled unless you want it to be.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-[260px] gap-4 md:auto-rows-[300px] md:grid-cols-12">
          {tiles.map((t, i) => (
            <motion.a
              key={t.n}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[var(--radius)] text-white ${t.span}`}
            >
              <img
                src={img(t.photo)}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute top-5 left-5 font-display text-2xl text-white/85 italic">{t.n}</span>
              <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="size-5" />
              </span>
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="font-display text-3xl leading-tight md:text-4xl">{t.title}</h3>
                <p className="mt-1 max-w-sm text-sm text-white/80">{t.body}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
