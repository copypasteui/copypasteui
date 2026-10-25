"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const facts = [
  ["Seats", "62"],
  ["From", "£280 for 2 hours"],
  ["Formats", "DCP, Blu-ray, laptop, 35mm"],
  ["Bar", "Ours, or bring a cake"],
];

export default function UndercroftHire() {
  return (
    <section id="hire" className="border-y border-foreground bg-foreground font-sans text-background">
      <div className="grid lg:grid-cols-2">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          src={img("photo-1779696304968-fe2320d1db2c")}
          alt="Projectionist threading a vintage film projector with golden reels"
          className="aspect-[4/3] size-full object-cover grayscale lg:aspect-auto"
        />
        <div className="px-6 py-14 md:px-12 md:py-20">
          <h2 className="font-display text-5xl font-medium tracking-tight md:text-6xl">Hire the whole room</h2>
          <p className="mt-6 max-w-md">
            Birthdays, wrap parties, a premiere for your short film. Bring your own film on a laptop and we&apos;ll put it on the big
            screen.
          </p>
          <dl className="mt-8 grid grid-cols-2 border-t border-background">
            {facts.map(([k, v]) => (
              <div key={k} className="border-b border-background py-4 pr-4">
                <dt className="text-xs uppercase">{k}</dt>
                <dd className="mt-1 font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <a href="#" className="mt-8 inline-block bg-accent px-6 py-3.5 font-bold text-accent-foreground uppercase">
            Ask about a date
          </a>
        </div>
      </div>
    </section>
  );
}
