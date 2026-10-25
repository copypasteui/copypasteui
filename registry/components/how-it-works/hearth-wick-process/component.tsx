"use client";

import { motion } from "motion/react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const steps = [
  { title: "Melt", body: "Rapeseed wax from a farm near Selby, melted slowly to 80°C in a double boiler." },
  { title: "Scent", body: "Each blend is weighed to the gram: 8% fragrance, no more, so it never gives you a headache." },
  { title: "Pour", body: "Poured at 60°C into jars warmed on the hob, so the wax sticks to the glass." },
  { title: "Cure", body: "Two weeks on the shelf before it ships. That's when the scent settles into the wax." },
];

export default function HearthWickProcess() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <img
          src={img("photo-1788537404964-cfa2d4d21fed")}
          alt="Pouring liquid wax from a brown glass bottle into a metal pitcher"
          className="aspect-[4/5] w-full rounded-[calc(var(--radius)*1.5)] object-cover"
        />
        <div>
          <h2 className="font-display text-4xl md:text-5xl">How a candle gets made</h2>
          <ol className="mt-8 grid gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-[var(--radius)] bg-card p-5 text-card-foreground"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-accent-foreground">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-display text-xl">{s.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.body}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
