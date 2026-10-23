"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const BOATS = [
  {
    name: "Mary Ellen, WH 41",
    skipper: "Skipper: Dan Ashby",
    catch: "Inshore trawling for dabs, plaice and the odd turbot. Out at 4am, back by 10.",
    photo: "photo-1687706418918-1c95d829b478",
    alt: "A small fishing boat on the water near a lighthouse",
  },
  {
    name: "Sea Pink, WH 7",
    skipper: "Skipper: Jess Holden",
    catch: "Rod-and-line bass and mackerel in summer, native oysters from the beds in winter.",
    photo: "photo-1692045469707-6bd4a4f01668",
    alt: "A boat moored in the harbour on a cloudy day",
  },
];

export default function BrinebankBoats() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase">Where it comes from</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02]">The two boats</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {BOATS.map((b, i) => (
            <article key={b.name} className={i === 1 ? "md:mt-24" : ""}>
              <div className="overflow-hidden">
                <motion.img
                  src={img(b.photo)}
                  alt={b.alt}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-3xl">{b.name}</h3>
              <p className="mt-1 text-sm font-semibold tracking-wide uppercase">{b.skipper}</p>
              <p className="mt-3 max-w-md text-muted-foreground">{b.catch}</p>
            </article>
          ))}
        </div>
        <blockquote className="mx-auto mt-20 max-w-3xl border-y border-foreground py-10 text-center">
          <p className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-snug">
            &ldquo;If the weather&rsquo;s bad we don&rsquo;t go out, and they just cook something else. That&rsquo;s the deal.&rdquo;
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">Jess Holden, Sea Pink</footer>
        </blockquote>
      </div>
    </section>
  );
}
