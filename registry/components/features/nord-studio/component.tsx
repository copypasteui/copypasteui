"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const principles = [
  { n: "01", t: "Light first", b: "Every plan starts with where the sun falls in February, not June." },
  { n: "02", t: "Honest materials", b: "Timber, lime and stone that age well and can be repaired." },
  { n: "03", t: "Fewer, better rooms", b: "We remove square metres before we add them." },
];

export default function NordStudio() {
  return (
    <section className="bg-secondary px-6 py-24 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-5 gap-4"
        >
          <img
            src={img("photo-1784461616365-6c89576916dc")}
            alt="Curved timber interior lit from above"
            loading="lazy"
            className="col-span-3 aspect-[3/4] size-full object-cover"
          />
          <div className="col-span-2 flex flex-col gap-4">
            <img src={img("photo-1768836180164-070b4c1a8f94", 900)} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            <div className="flex flex-1 flex-col justify-end bg-foreground p-5 text-background">
              <p className="text-5xl font-extrabold tracking-tight">64</p>
              <p className="text-sm text-background/70">buildings completed across four countries</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase">Studio</p>
            <h2 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
              Twelve architects, one long table, and a habit of <span className="text-primary">saying no</span> to things that don’t need
              building.
            </h2>
          </div>
          <dl className="mt-12 divide-y divide-foreground/15 border-y border-foreground/15">
            {principles.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-[48px_1fr] gap-4 py-5 md:grid-cols-[48px_200px_1fr]"
              >
                <dt className="contents">
                  <span className="text-sm text-muted-foreground">{p.n}</span>
                  <span className="text-lg font-semibold">{p.t}</span>
                </dt>
                <dd className="col-start-2 text-muted-foreground md:col-start-3">{p.b}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
