"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const stories = [
  {
    quote: "I started piano at 67. Last month I played Clair de Lune for my granddaughter’s wedding.",
    name: "Margaret",
    detail: "Piano · started 2022",
    grade: "Grade 4",
  },
  {
    quote: "Mr Ellis turned my son from ‘do I have to?’ to practising without being asked. Witchcraft.",
    name: "Jo, parent of Leo (11)",
    detail: "Guitar · 3 years",
    grade: "Grade 5",
  },
  {
    quote: "Got into my first-choice music college. Couldn’t have done the audition without Hannah.",
    name: "Aisha, 18",
    detail: "Voice · 6 years",
    grade: "Grade 8 Distinction",
  },
];

export default function QuavermoorStudents() {
  return (
    <section className="overflow-x-clip bg-background py-24 font-sans text-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-center [&>*]:min-w-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <img
            src={img("photo-1758612897772-8f4524c94b62")}
            alt="Grandfather guiding a boy’s fingers on a guitar"
            className="aspect-[4/5] w-full rounded-[var(--radius)] object-cover"
          />
          <div className="absolute -right-4 -bottom-6 rounded-[var(--radius)] bg-accent p-5 text-accent-foreground shadow-xl">
            <p className="font-display text-4xl">98%</p>
            <p className="text-sm">exam pass rate, 2025</p>
          </div>
        </motion.div>
        <div className="space-y-6">
          <h2 className="font-display text-5xl">Our students say it best</h2>
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="border-l-4 border-accent pl-6"
            >
              <blockquote className="font-display text-2xl leading-snug">“{s.quote}”</blockquote>
              <figcaption className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold">{s.name}</span>
                <span className="text-muted-foreground">{s.detail}</span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{s.grade}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
