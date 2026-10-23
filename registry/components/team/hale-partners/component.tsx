"use client";

import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const people = [
  {
    name: "Eleanor Hale",
    role: "Senior partner · Family",
    since: "Qualified 1998",
    photo: "photo-1758518727888-ffa196002e59",
    note: "Accredited family mediator. Calm in a crisis, firm in negotiation.",
  },
  {
    name: "Ravi Menon",
    role: "Partner · Property",
    since: "Qualified 2006",
    photo: "photo-1778692258270-bc0e80e975c0",
    note: "Has handled over 3,000 home moves and still returns calls the same day.",
  },
  {
    name: "Grace Liang",
    role: "Associate · Wills & probate",
    since: "Qualified 2015",
    photo: "photo-1581065178047-8ee15951ede6",
    note: "Specialist in estates involving family businesses and farms.",
  },
  {
    name: "David Brooks",
    role: "Partner · Employment",
    since: "Qualified 2003",
    photo: "photo-1780733057950-0dc9055ddae9",
    note: "Advises employees and small employers. Former tribunal judge.",
  },
];

export default function HalePartners() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-medium">The people you’ll speak to</h2>
          <a href="#" className="border-b border-foreground pb-0.5 text-sm">
            All 22 lawyers →
          </a>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <motion.article
              key={p.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img(p.photo)}
                  alt={`Portrait of ${p.name}`}
                  className="aspect-[4/5] w-full object-cover grayscale-[70%] transition duration-700 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-px transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
                  <a href="#" className="flex flex-1 items-center justify-center gap-2 bg-primary py-3 text-sm text-primary-foreground">
                    <Mail className="size-4" /> Email
                  </a>
                  <a href="#" className="flex flex-1 items-center justify-center gap-2 bg-primary py-3 text-sm text-primary-foreground">
                    <Phone className="size-4" /> Call
                  </a>
                </div>
              </div>
              <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
              <p className="text-sm text-primary">{p.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
              <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">{p.since}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
