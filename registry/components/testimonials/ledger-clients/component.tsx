"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const img = (id: string, w = 200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const clients = [
  {
    name: "Maya Brooks",
    biz: "Freelance illustrator",
    stat: "£3,200",
    statLabel: "tax saved in year one",
    quote: "I used to dread January. Now I get a message saying it’s done before I’ve even thought about it.",
    face: "photo-1758518727592-706e80ebc354",
  },
  {
    name: "Tunde Adebayo",
    biz: "Adebayo Electrical Ltd",
    stat: "6 hrs",
    statLabel: "a month back from admin",
    quote: "Switching to a limited company was painless. They set up payroll, VAT, the lot.",
    face: "photo-1790386436843-76ff0b8fcfca",
  },
  {
    name: "Carol Pemberton",
    biz: "Landlord, 4 properties",
    stat: "£0",
    statLabel: "late-filing penalties since joining",
    quote: "Patient with my endless questions about mortgage interest. Worth every penny.",
    face: "photo-1780733058439-b8952315e59c",
  },
];

export default function LedgerClients() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-5xl font-bold tracking-tight">900 small businesses sleep better.</h2>
          <p className="opacity-90">4.7 ★ on Google · 98% of clients stay year after year</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {clients.map((c, i) => (
            <motion.figure
              key={c.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-[calc(var(--radius)*1.5)] bg-card p-7 text-card-foreground"
            >
              <div className="rounded-[var(--radius)] bg-accent p-5 text-accent-foreground">
                <p className="font-display text-5xl font-bold">{c.stat}</p>
                <p className="text-sm">{c.statLabel}</p>
              </div>
              <Quote className="mt-6 size-6 text-primary" />
              <blockquote className="mt-2 flex-1 leading-relaxed">{c.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <img src={img(c.face)} alt="" className="size-11 rounded-full object-cover" />
                <span className="text-sm">
                  <span className="block font-semibold">{c.name}</span>
                  <span className="text-muted-foreground">{c.biz}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
