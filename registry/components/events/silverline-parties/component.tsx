"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const packages = [
  {
    name: "Rink party",
    price: 15,
    points: ["Two-hour family session", "Skate hire, pads and helmets", "Reserved table for the cake"],
  },
  {
    name: "Disco party",
    price: 22,
    points: ["Everything in the rink party", "The DJ plays three requests", "Pizza and a drink each", "Mirror-ball photo booth"],
  },
];

export default function SilverlineParties() {
  const [guests, setGuests] = useState(12);
  return (
    <section id="parties" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-3xl uppercase md:text-5xl">Birthday parties</h2>
          <p className="mt-5 text-muted-foreground">
            For 10 to 30 guests, on Saturday and Sunday afternoons. A host from our team runs the whole thing.
          </p>
          <img
            src={img("photo-1784399620949-e7da143e02d1")}
            alt="Skater in rainbow roller skates on a wooden floor"
            className="mt-8 aspect-[4/3] w-full rounded-[var(--radius)] object-cover"
          />
        </div>
        <div>
          <label className="block rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground">
            <span className="flex items-center justify-between text-sm font-semibold">
              Guests <span className="font-display text-2xl">{guests}</span>
            </span>
            <input
              type="range"
              min={10}
              max={30}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
            />
          </label>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {packages.map((p) => (
              <li key={p.name} className="flex flex-col rounded-[var(--radius)] border border-border bg-card p-6 text-card-foreground">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">£{p.price} a guest</p>
                <p className="mt-3 font-display text-3xl">£{p.price * guests}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {p.points.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {x}
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-6 rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground">
                  Enquire about a {p.name.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
