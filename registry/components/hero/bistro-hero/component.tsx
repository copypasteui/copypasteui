"use client";

import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";

const dishes = ["Charred leeks, hazelnut", "Hand-cut tagliatelle", "Whole roast sea bream", "Burnt honey tart", "Wild garlic gnocchi"];

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function BistroHero() {
  return (
    <section className="relative overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-sm tracking-[0.3em] text-primary uppercase"
          >
            <span className="h-px w-10 bg-primary" /> Seasonal kitchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-6 font-display text-6xl leading-[0.95] font-bold tracking-tight md:text-8xl"
          >
            Slow food,
            <br />
            <em className="font-semibold text-primary">warm</em> tables.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            A neighbourhood bistro cooking with what the market brings in each morning. Natural wines, open fire and a menu that changes
            with the week.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#reserve"
              className="rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Reserve a table
            </a>
            <a href="#menu" className="rounded-md border border-foreground/20 px-7 py-3.5 font-semibold transition hover:bg-muted">
              See tonight’s menu
            </a>
          </motion.div>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-6 text-sm">
            <p className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Tue–Sun · 17:30–23:00
                <span className="block text-muted-foreground">Brunch Sat & Sun</span>
              </span>
            </p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                14 Rue des Lilas
                <span className="block text-muted-foreground">Old Town</span>
              </span>
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -12 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <img
            src={img("photo-1564758564527-b97d79cb27c1")}
            alt="Two hands holding a white plate of food"
            className="absolute inset-0 size-full rounded-full object-cover"
          />
          <div className="absolute -bottom-4 left-1/2 w-[85%] -translate-x-1/2 overflow-hidden rounded-full border border-border bg-background py-2">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-6 text-sm whitespace-nowrap text-muted-foreground italic"
            >
              {[...dishes, ...dishes].map((d, i) => (
                <span key={i}>· {d}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
