"use client";

import { motion } from "motion/react";
import { HeartHandshake } from "lucide-react";

const img = (id: string, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const team = [
  {
    name: "Dr Hannah Clarke",
    role: "Principal dentist",
    bio: "Special interest in anxious patients and children. 15 years in practice.",
    reg: "GDC 000001",
    photo: "photo-1662850886700-4ec19bd30d11",
  },
  {
    name: "Dr Sam Patel",
    role: "Cosmetic dentist",
    bio: "Aligners, bonding and whitening. Will show you a 3D preview first.",
    reg: "GDC 000002",
    photo: "photo-1758691463582-11aea602cd4a",
  },
  {
    name: "Rosa Jiménez",
    role: "Dental hygienist",
    bio: "Gentle, thorough and genuinely funny. Airflow specialist.",
    reg: "GDC 000003",
    photo: "photo-1594756154841-ac5d160dbf46",
  },
];

export default function BrightlineTeam() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-display text-5xl font-black tracking-tight">Meet the people behind the mask.</h2>
            <div className="mt-8 rounded-[calc(var(--radius)*1.5)] bg-accent p-6 text-accent-foreground">
              <HeartHandshake className="size-8" />
              <p className="mt-4 font-display text-xl font-bold">Nervous? You’re not alone.</p>
              <p className="mt-2 text-sm">
                Book a free 15-minute chat with no examination. Headphones, a stop signal and sedation are all available.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {team.map((t, i) => (
              <motion.article
                key={t.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-[calc(var(--radius)*1.5)] bg-secondary">
                  <img
                    src={img(t.photo)}
                    alt={`Portrait of ${t.name}`}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{t.name}</h3>
                <p className="text-sm font-semibold text-primary">{t.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.bio}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t.reg}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
