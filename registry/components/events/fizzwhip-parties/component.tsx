"use client";

import { motion } from "motion/react";
import { CalendarHeart, Check } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const included = [
  "An hour in the lab making two flavours from scratch",
  "Every child takes home a 500ml tub",
  "Cones, sprinkles and a sauce bar to finish",
  "Invitations you can print or send",
];

export default function FizzwhipParties() {
  return (
    <section id="parties" className="bg-accent px-6 py-20 font-sans text-accent-foreground md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.img
          initial={{ opacity: 0, rotate: -3 }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true }}
          src={img("photo-1629385744299-74b9cf013f52")}
          alt="Five small bowls of brightly coloured gelato in a row"
          className="aspect-[4/3] w-full rounded-[var(--radius)] border-4 border-foreground object-cover"
        />
        <div>
          <p className="flex items-center gap-2 font-semibold">
            <CalendarHeart className="size-5" aria-hidden /> Saturdays and Sundays, 9am and 4pm
          </p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Gelato-making parties for ages 5 to 12</h2>
          <p className="mt-5 text-lg">£18 a child, for 8 to 14 children. Grown-ups get a coffee on us.</p>
          <ul className="mt-6 grid gap-3">
            {included.map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-foreground text-background">
                  <Check className="size-4" aria-hidden />
                </span>
                {x}
              </li>
            ))}
          </ul>
          <a href="#" className="mt-8 inline-block rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground">
            Check party dates
          </a>
        </div>
      </div>
    </section>
  );
}
