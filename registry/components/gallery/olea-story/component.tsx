"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const facts = [
  { n: "64", l: "seats on the harbour" },
  { n: "11", l: "local boats we buy from" },
  { n: "2,400", l: "litres of our own olive oil a year" },
];

const strip = [
  { id: "photo-1578425570232-bf51f753dd5e", cap: "Service, 7:40pm" },
  { id: "photo-1564844536308-50b114a1d946", cap: "Seasoning the greens" },
  { id: "photo-1552960226-639240203497", cap: "The back room, lit for dinner" },
  { id: "photo-1653259038915-7cf0b7a4dd6c", cap: "Private dining, up to 18" },
  { id: "photo-1776993298422-5b7df704c2c1", cap: "Lunch light" },
];

export default function OleaStory() {
  return (
    <section className="overflow-hidden bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] w-4/5 overflow-hidden rounded-[var(--radius)]">
            <img
              src={img("photo-1577106263724-2c8e03bfe9cf")}
              alt="Chef Marta Ruiz plating at the pass"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute right-0 -bottom-8 w-1/2 overflow-hidden rounded-[var(--radius)] border-8 border-secondary shadow-2xl">
            <img
              src={img("photo-1519233991914-26a44330ccd7", 800)}
              alt="Grilled bream on a grey plate"
              className="aspect-square w-full object-cover"
            />
          </div>
        </motion.div>

        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-primary uppercase">Our story</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.02] md:text-6xl">
            A fisherman’s daughter, a wood oven and <em>ten years</em> of Sundays.
          </h2>
          <div className="mt-8 space-y-4 text-lg text-muted-foreground">
            <p>
              Marta grew up gutting her father’s catch on the quay at Cádiz. She opened Olea in an old net loft with one oven, eight tables
              and no sign on the door.
            </p>
            <p>
              We still cook over oak and olive wood, still buy whatever the boats bring in, and still close on Mondays so the team can eat
              dinner with their families.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {facts.map((f) => (
              <div key={f.l}>
                <dt className="font-display text-4xl text-foreground md:text-5xl">{f.n}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{f.l}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 font-display text-2xl text-foreground italic">— Marta Ruiz, chef &amp; owner</p>
        </div>
      </div>

      <div className="mt-24 flex w-max [animation:olea-strip_60s_linear_infinite] gap-5 px-6 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...strip, ...strip].map((s, i) => (
          <figure key={i} className="w-72 shrink-0 md:w-96" aria-hidden={i >= strip.length}>
            <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius)]">
              <img
                src={img(s.id, 900)}
                alt={i < strip.length ? s.cap : ""}
                className="size-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">{s.cap}</figcaption>
          </figure>
        ))}
      </div>
      <style>{`@keyframes olea-strip { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
