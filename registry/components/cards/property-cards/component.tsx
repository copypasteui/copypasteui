"use client";

import { useState } from "react";
import { BedDouble, Bath, Ruler, Heart, MapPin } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Listing = {
  id: number;
  title: string;
  area: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: "For sale" | "New" | "Under offer";
  photo: string;
  alt: string;
  note: string;
};

const listings: Listing[] = [
  {
    id: 1,
    title: "Glass-fronted new build",
    area: "Laurelhurst",
    price: 1185000,
    beds: 4,
    baths: 3,
    sqft: 2860,
    status: "New",
    photo: "photo-1771366260867-7e07094579d7",
    alt: "Modern white house with glass garage doors",
    note: "Solar, EV charger, no chain",
  },
  {
    id: 2,
    title: "Tudor revival with garden",
    area: "Eastmoreland",
    price: 989000,
    beds: 4,
    baths: 2,
    sqft: 2410,
    status: "For sale",
    photo: "photo-1751050743813-03d46859896c",
    alt: "Tudor-style home with a front garden",
    note: "Original leaded windows, 0.2 acre lot",
  },
  {
    id: 3,
    title: "Two-storey with dark cladding",
    area: "Sellwood",
    price: 649000,
    beds: 3,
    baths: 2.5,
    sqft: 1780,
    status: "Under offer",
    photo: "photo-1777106322601-578dc9213ace",
    alt: "Modern two-storey house with a dark garage door",
    note: "Two blocks from the river trail",
  },
];

export default function PropertyCards() {
  const [saved, setSaved] = useState<number[]>([]);
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Featured listings</h2>
          <a href="#" className="font-semibold text-primary">
            All 48 homes in Portland →
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {listings.map((l) => (
            <article key={l.id} className="group overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img(l.photo)}
                  alt={l.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 rounded px-2.5 py-1 text-xs font-semibold ${l.status === "Under offer" ? "bg-foreground text-background" : "bg-primary text-primary-foreground"}`}
                >
                  {l.status}
                </span>
                <button
                  type="button"
                  aria-label="Save listing"
                  onClick={() => setSaved((s) => (s.includes(l.id) ? s.filter((x) => x !== l.id) : [...s, l.id]))}
                  className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/90 text-foreground"
                >
                  <Heart className={`size-4 ${saved.includes(l.id) ? "fill-primary text-primary" : ""}`} />
                </button>
              </div>
              <div className="p-5">
                <p className="font-display text-2xl font-bold">{fmt(l.price)}</p>
                <h3 className="mt-1 font-semibold">{l.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {l.area}
                </p>
                <p className="mt-3 text-sm">{l.note}</p>
                <div className="mt-4 flex gap-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="size-4" /> {l.beds} bd
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="size-4" /> {l.baths} ba
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ruler className="size-4" /> {l.sqft.toLocaleString()} ft²
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
