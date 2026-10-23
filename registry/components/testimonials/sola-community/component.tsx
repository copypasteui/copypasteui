"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    quote: "I came for my back. I stayed for the 7am crew; they’re my favourite people now.",
    name: "Gemma, 52",
    since: "Member since 2021",
  },
  {
    quote: "First yoga class of my life at 34, terrified. Leo made me feel like I’d always been there.",
    name: "Raj, 35",
    since: "Member since 2025",
  },
  { quote: "Reformer twice a week fixed what three years of desk work did to my posture.", name: "Lucy, 29", since: "Member since 2023" },
];

export default function SolaCommunity() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[var(--radius)]">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
            src={img("photo-1545205597-3d9d02c29597")}
            alt="Group holding tree pose on the beach"
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6 flex flex-wrap items-end justify-between gap-4 text-white">
            <p className="font-display text-4xl leading-none font-extrabold md:text-6xl">
              Saturday beach class.
              <br />
              Free. Always.
            </p>
            <dl className="flex gap-8">
              <div>
                <dt className="font-display text-4xl font-extrabold">1,800</dt>
                <dd className="text-sm opacity-90">members</dd>
              </div>
              <div>
                <dt className="font-display text-4xl font-extrabold">4.8★</dt>
                <dd className="text-sm opacity-90">on Google</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[var(--radius)] border border-primary-foreground/25 p-7"
            >
              <blockquote className="text-lg leading-relaxed">“{s.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{s.name}</span> <span className="opacity-90">· {s.since}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
