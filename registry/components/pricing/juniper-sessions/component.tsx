"use client";

import { motion } from "motion/react";

const img = (id: string, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const sessions = [
  {
    name: "Mini",
    price: "£195",
    time: "30 minutes",
    images: "15 edited images",
    note: "Perfect for an updated portrait or a quick family refresh.",
    photo: "photo-1639760749623-3cf6dab57823",
  },
  {
    name: "Golden hour",
    price: "£395",
    time: "75 minutes",
    images: "40+ edited images",
    note: "My favourite: a slow wander at sunset, wherever you love most.",
    photo: "photo-1561525140-c2a4cc68e4bd",
    best: true,
  },
  {
    name: "Day in the life",
    price: "£795",
    time: "4 hours",
    images: "120+ edited images",
    note: "Breakfast to bedtime, at home. The real, messy, lovely stuff.",
    photo: "photo-1770871821382-60ea99b0a941",
  },
];

export default function JuniperSessions() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">Sessions</p>
          <h2 className="mt-4 font-display text-6xl leading-none">
            Three ways <em>to begin.</em>
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {sessions.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(-100% -100% -100% -100%)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              className={`group ${s.best ? "md:-mt-8" : ""}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img(s.photo)}
                  alt=""
                  className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {s.best && (
                  <span className="absolute top-6 left-0 bg-accent px-4 py-1.5 text-xs tracking-[0.2em] text-accent-foreground uppercase">
                    Most loved
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline justify-between border-b border-foreground/20 pb-4">
                <h3 className="font-display text-3xl">{s.name}</h3>
                <p className="font-display text-3xl italic">{s.price}</p>
              </div>
              <p className="mt-4 text-muted-foreground">{s.note}</p>
              <ul className="mt-4 flex gap-4 text-xs tracking-[0.15em] uppercase">
                <li>{s.time}</li>
                <li className="text-muted-foreground">·</li>
                <li>{s.images}</li>
              </ul>
            </motion.article>
          ))}
        </div>
        <p className="mt-14 text-center text-sm text-muted-foreground">
          Every session includes a planning call, an online gallery and a print release. Albums from £180.
        </p>
      </div>
    </section>
  );
}
