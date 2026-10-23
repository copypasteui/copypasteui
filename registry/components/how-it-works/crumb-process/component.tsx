"use client";

import { motion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const steps = [
  {
    time: "Day 1 · 4pm",
    title: "Feed the starter",
    body: "Our starter, Doris, is fourteen years old. She gets organic stoneground flour and spring water twice a day.",
    photo: "photo-1597528662465-55ece5734101",
  },
  {
    time: "Day 1 · 9pm",
    title: "Mix & fold",
    body: "Dough is mixed by hand, folded four times over two hours, then rests in the cold room overnight.",
    photo: "photo-1566698629409-787a68fc5724",
  },
  {
    time: "Day 2 · 4am",
    title: "Shape & score",
    body: "Loaves are shaped, scored with a razor and loaded into a stone-deck oven at 250°C.",
    photo: "photo-1586765501019-cbe3973ef8fa",
  },
  {
    time: "Day 2 · 7am",
    title: "Doors open",
    body: "Still crackling on the cooling racks when the first customers come in. Some never make it home.",
    photo: "photo-1711672284661-bd70e38f31b2",
  },
];

export default function CrumbProcess() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-display text-5xl leading-[1] md:text-7xl">
            36 hours
            <br />
            <span className="text-primary">to one loaf.</span>
          </h2>
          <p className="max-w-md text-lg text-muted-foreground md:justify-self-end">
            No shortcuts, no improvers, no frozen dough. Just flour, water, salt and time, which is why we sell out by lunch on Saturdays.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div aria-hidden className="absolute top-[5.5rem] right-0 left-0 hidden border-t-2 border-dashed border-border md:block" />
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative"
            >
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {s.time}
              </span>
              <div className="relative mt-6 grid size-14 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground ring-8 ring-background">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
              <motion.div whileHover={{ rotate: i % 2 ? 2 : -2, scale: 1.03 }} className="mt-6 overflow-hidden rounded-[var(--radius)]">
                <img src={img(s.photo)} alt={s.title} className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
