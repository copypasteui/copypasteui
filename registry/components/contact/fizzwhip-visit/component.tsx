"use client";

import { Clock, MapPin, Phone } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hours = [
  ["Monday", "Closed"],
  ["Tuesday to Thursday", "12pm to 8pm"],
  ["Friday and Saturday", "11am to 10pm"],
  ["Sunday", "11am to 7pm"],
];

export default function FizzwhipVisit() {
  return (
    <section id="visit" className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-[var(--radius)] border border-foreground bg-card p-8 text-card-foreground">
          <h2 className="font-display text-4xl md:text-5xl">Come and find us</h2>
          <p className="mt-6 flex gap-3 text-lg">
            <MapPin className="mt-1 size-5 shrink-0" aria-hidden /> 27 Broad Street, Hockley, Nottingham NG1 3AJ
          </p>
          <p className="mt-3 flex gap-3 text-lg">
            <Phone className="mt-1 size-5 shrink-0" aria-hidden />
            <a href="tel:01154960274" className="underline underline-offset-4">
              0115 496 0274
            </a>
          </p>
          <h3 className="mt-8 flex items-center gap-2 font-semibold">
            <Clock className="size-5" aria-hidden /> Opening hours
          </h3>
          <dl className="mt-3 grid gap-2">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 border-b border-border pb-2">
                <dt>{d}</dt>
                <dd className="font-semibold">{h}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Two minutes from Victoria Centre tram stop. Step-free, with a buggy space by the window.
          </p>
        </div>
        <img
          src={img("photo-1783125386360-032ca7ba4605")}
          alt="Small ice cream shop with a carved wooden front"
          className="h-full min-h-72 w-full rounded-[var(--radius)] border border-foreground object-cover"
        />
      </div>
    </section>
  );
}
