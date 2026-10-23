"use client";

import { motion } from "motion/react";

const img = (id: string, w = 200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    metric: "11 hrs",
    label: "saved per analyst, per week",
    quote: "Our analysts stopped answering the same five questions and started doing actual analysis.",
    name: "Maya Chen",
    role: "Head of Data, Fieldnote",
    photo: "photo-1758599543111-36ce5c34fceb",
    big: true,
  },
  {
    metric: "€410k",
    label: "revenue leak caught in month one",
    quote: "The first anomaly alert paid for three years of Lumen.",
    name: "Daniel Okoro",
    role: "CFO, Parallax",
    photo: "photo-1758691737646-79dbce8e25fb",
  },
  {
    metric: "92%",
    label: "of the company asks questions weekly",
    quote: "Sales, support, finance: everyone uses it. That never happened with dashboards.",
    name: "Sara Lind",
    role: "COO, Kestrel",
    photo: "photo-1494790108377-be9c29b29330",
  },
];

export default function LumenCustomerStories() {
  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
          Teams that stopped waiting on the data team.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col justify-between rounded-2xl p-7 ${s.big ? "bg-foreground text-background md:row-span-2" : "border border-border bg-card text-card-foreground"}`}
            >
              <div>
                <p
                  className={`font-display font-semibold tracking-tight ${s.big ? "text-7xl text-background md:text-8xl" : "text-5xl text-primary"}`}
                >
                  {s.metric}
                </p>
                <p className={`mt-1 text-sm ${s.big ? "text-background/90" : "text-muted-foreground"}`}>{s.label}</p>
                <blockquote className={`mt-8 leading-snug ${s.big ? "text-2xl md:text-3xl" : "text-lg"}`}>“{s.quote}”</blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <img src={img(s.photo)} alt="" className="size-11 rounded-full object-cover" />
                <span className="text-sm">
                  <span className="block font-medium">{s.name}</span>
                  <span className={s.big ? "text-background/90" : "text-muted-foreground"}>{s.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
