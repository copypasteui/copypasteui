"use client";

import { motion } from "motion/react";

const img = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function NordClientQuote() {
  return (
    <section className="bg-foreground px-6 py-24 font-sans text-background">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[1fr_1.4fr] md:items-end">
        <motion.img
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          src={img("photo-1783125127229-0850d689e014")}
          alt="Stenhus, a low stone house with large windows"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-background/90 uppercase">Client: Stenhus, Aarhus</p>
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-8 text-3xl leading-[1.15] font-medium tracking-tight md:text-5xl"
          >
            “They talked us out of a bigger house and into a better one. Two winters in, there isn’t a room we don’t use every day, and our
            heating bill is a third of what it was.”
          </motion.blockquote>
          <div className="mt-10 flex items-center gap-4 border-t border-background/20 pt-6">
            <img src={img("photo-1568602471122-7832951cc4c5", 160)} alt="" className="size-14 rounded-full object-cover" />
            <div>
              <p className="font-semibold">Mads & Ingrid Sørensen</p>
              <p className="text-sm text-background/90">Homeowners · completed 2024</p>
            </div>
            <span className="ml-auto hidden text-right text-sm text-background/90 sm:block">
              <span className="block text-3xl font-extrabold text-primary-foreground">A+</span>
              energy rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
