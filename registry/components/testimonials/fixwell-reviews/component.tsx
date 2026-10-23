"use client";

import { motion } from "motion/react";
import { BadgeCheck, Star } from "lucide-react";

const reviews = [
  {
    name: "Hannah P.",
    area: "Islington",
    job: "Burst pipe",
    text: "Water through the ceiling at 7am. Marcus was here by 7:40, fixed it, and even helped me move the sofa. Hero.",
    rating: 5,
  },
  {
    name: "Dev R.",
    area: "Highbury",
    job: "EV charger",
    text: "Clear quote, turned up on time, neat cable run and a proper walkthrough of the app. Exactly what you want.",
    rating: 5,
  },
  {
    name: "Sue M.",
    area: "Stoke Newington",
    job: "Boiler repair",
    text: "Two other firms wanted to replace the whole boiler. Fixwell replaced a £40 part. Honest people.",
    rating: 5,
  },
  {
    name: "Ola A.",
    area: "Finsbury Park",
    job: "Rewire",
    text: "Full rewire of a Victorian flat in four days. Plastered and painted the chases too. Spotless.",
    rating: 5,
  },
  {
    name: "Greg T.",
    area: "Holloway",
    job: "Landlord certificate",
    text: "I manage nine flats. Fixwell just handles the certificates and reminds me before they lapse.",
    rating: 5,
  },
  {
    name: "Priya K.",
    area: "Canonbury",
    job: "Shower install",
    text: "Lovely, tidy, explained everything. Shoe covers on without being asked!",
    rating: 5,
  },
];

export default function FixwellReviews() {
  return (
    <section className="bg-primary py-24 font-sans text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            <p className="font-display text-8xl leading-none font-extrabold">4.7</p>
            <div className="mt-3 flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-6 fill-current" />
              ))}
            </div>
            <p className="mt-3 opacity-90">From 3,400 verified customers on Google, trade review sites and our own follow-ups.</p>
            <dl className="mt-8 space-y-3 border-t border-primary-foreground/20 pt-6 text-sm">
              {[
                ["Turned up on time", "98%"],
                ["Price matched the quote", "99%"],
                ["Would recommend", "97%"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="opacity-90">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="mb-4 break-inside-avoid rounded-[var(--radius)] bg-card p-5 text-card-foreground"
              >
                <div className="flex items-center justify-between">
                  <span className="flex text-primary">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">{r.job}</span>
                </div>
                <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-1.5 text-sm">
                  <span className="font-semibold">{r.name}</span> <span className="text-muted-foreground">· {r.area}</span>{" "}
                  <BadgeCheck className="ml-auto size-4 text-primary" aria-label="Verified customer" />
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
