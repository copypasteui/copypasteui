"use client";

import { Mail, Phone } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const team = [
  {
    name: "Helena Brooks",
    role: "Branch director",
    patch: "Clifton & Redland",
    years: 18,
    photo: "photo-1573496359142-b8d87734a5a2",
    alt: "Woman in a grey jacket",
  },
  {
    name: "Marcus Webb",
    role: "Period homes",
    patch: "Cotham & Kingsdown",
    years: 12,
    photo: "photo-1560250097-0b93528c311a",
    alt: "Man in a suit standing by a wall",
  },
  {
    name: "Aiko Tanaka",
    role: "First-time buyers",
    patch: "Bedminster & Southville",
    years: 7,
    photo: "photo-1627161683077-e34782c24d81",
    alt: "Woman in a red cardigan smiling",
  },
  {
    name: "Daniel Ortiz",
    role: "Lettings",
    patch: "Whole city",
    years: 15,
    photo: "photo-1629425733761-caae3b5f2e50",
    alt: "Man in a black zip-up jacket",
  },
];

export default function TeamGrid() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">People who know every street.</h2>
          <p className="text-muted-foreground">
            Four of us, 52 years between us, and every one lives in the part of Bristol they sell. Ring the person, not a switchboard.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <article key={m.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-muted">
                <img src={img(m.photo)} alt={m.alt} loading="lazy" className="size-full object-cover" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">
                {m.role} · {m.years} yrs
              </p>
              <p className="mt-1 text-sm">{m.patch}</p>
              <div className="mt-3 flex gap-4 text-sm font-medium">
                <a href="#" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                  <Phone className="size-3.5" /> Call
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                  <Mail className="size-3.5" /> Email
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
