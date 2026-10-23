"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const words = [
  {
    q: "We have exactly one photo of my grandmother laughing. Juniper gave us eighty of our kids. That’s the gift.",
    who: "Sophie, mum of three",
  },
  { q: "I hate having my picture taken. I didn’t notice the camera once, and I love every single photo.", who: "Mark, portrait session" },
  { q: "She caught the little things: my son’s hand on the dog, my husband’s terrible dancing. Perfect.", who: "Amira, day in the life" },
];

export default function JuniperKindWords() {
  return (
    <section className="relative isolate overflow-hidden py-28 font-sans text-white">
      <img src={img("photo-1619896849560-f92c4330f1a6")} alt="" className="absolute inset-0 -z-10 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/70" />
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs tracking-[0.4em] text-white/70 uppercase">Kind words</p>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {words.map((w, i) => (
            <motion.figure
              key={w.who}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
            >
              <span aria-hidden className="block font-display text-7xl leading-none text-accent">
                “
              </span>
              <blockquote className="font-display text-2xl leading-snug italic">{w.q}</blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.25em] text-white/70 uppercase">{w.who}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
