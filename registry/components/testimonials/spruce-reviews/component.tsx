"use client";

import { motion } from "motion/react";
import { HeartHandshake, ShieldCheck, Star, UserCheck } from "lucide-react";

const img = (id: string, w = 160) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const reviews = [
  {
    name: "Charlotte",
    text: "Agnieszka has cleaned for us every Thursday for three years. She knows the house better than we do.",
    face: "photo-1494790108377-be9c29b29330",
    tilt: -2,
  },
  {
    name: "Ben & Zara",
    text: "End of tenancy clean and we got every penny of the deposit back. Landlord asked for their number.",
    face: "photo-1500648767791-00dcc994a43e",
    tilt: 1.5,
  },
  {
    name: "Mrs Okoro",
    text: "As I’ve got older the stairs are harder. Spruce gives me one less worry each week, and lovely company.",
    face: "photo-1548382131-e0ebb1f0cdea",
    tilt: -1,
  },
];
const promises = [
  { icon: UserCheck, title: "Same cleaner", body: "Every visit, unless you ask to change." },
  { icon: ShieldCheck, title: "Vetted & insured", body: "Background-checked, £5m public liability." },
  { icon: HeartHandshake, title: "Paid fairly", body: "Our cleaners earn the Real Living Wage +20%." },
];

export default function SpruceReviews() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-4 py-1.5 text-sm">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>{" "}
            4.6 from 5,200 reviews
          </p>
          <h2 className="mt-5 font-display text-5xl font-semibold">Spotless, say our neighbours.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: r.tilt }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, delay: i * 0.1 }}
              className="rounded-[calc(var(--radius)*1.2)] bg-card p-7 text-card-foreground shadow-xl"
            >
              <blockquote className="text-lg leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 font-semibold">
                <img src={img(r.face)} alt="" className="size-10 rounded-full object-cover" /> {r.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-16 grid gap-6 border-t border-primary-foreground/20 pt-10 md:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <p.icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold">{p.title}</p>
                <p className="text-sm opacity-90">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
