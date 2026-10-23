"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, PawPrint, Phone, Star } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const pets = {
  Dog: {
    photo: "photo-1782022491533-267c13b410bf",
    alt: "Two happy dogs sitting in front of sunflowers",
    line: "Vaccines, puppy classes, dental care and the best pampered groom in town.",
  },
  Cat: {
    photo: "photo-1596272875729-ed2ff7d6d9c5",
    alt: "Tabby cat held in its owner’s lap",
    line: "A cat-friendly clinic with a separate quiet waiting room and pheromone diffusers.",
  },
  Puppy: {
    photo: "photo-1537151608828-ea2b11777ee8",
    alt: "Corgi puppy with big ears on an orange background",
    line: "Puppy packs with first vaccines, microchip, socialisation classes and a lot of patience.",
  },
};
const paws = Array.from({ length: 6 });

export default function MossbrookHero() {
  const [pet, setPet] = useState<keyof typeof pets>("Dog");
  const p = pets[pet];

  return (
    <section className="relative overflow-hidden bg-background font-sans text-foreground">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2 text-sm">
          <span>24/7 emergency vet line. We always answer.</span>
          <a href="tel:+441130000000" className="inline-flex items-center gap-1.5 font-semibold">
            <Phone className="size-3.5" /> 0113 000 0000
          </a>
        </div>
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <PawPrint className="size-5" />
          </span>{" "}
          Mossbrook
        </a>
        <nav className="hidden gap-7 text-sm font-semibold md:flex">
          {["Vet care", "Grooming", "Health plans", "Our team", "Emergencies"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
        >
          Book online
        </a>
        <button type="button" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </button>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-8 pb-20 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] font-extrabold tracking-tight"
          >
            Healthy pets, <span className="text-primary">happy humans.</span>
          </motion.h1>
          <p className="mt-6 text-lg font-semibold">Who are we looking after?</p>
          <div className="mt-3 flex gap-2">
            {(Object.keys(pets) as (keyof typeof pets)[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setPet(k)}
                aria-pressed={pet === k}
                className={`relative rounded-full px-6 py-3 font-semibold transition ${pet === k ? "text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {pet === k && (
                  <motion.span
                    layoutId="paw-pet"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.3 }}
                  />
                )}
                <span className="relative">
                  {k === "Dog" ? "🐶" : k === "Cat" ? "🐱" : "🐾"} {k}
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={pet}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="mt-5 max-w-md text-lg text-muted-foreground"
            >
              {p.line}
            </motion.p>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#book" className="rounded-full bg-accent px-7 py-4 font-bold text-accent-foreground">
              Book an appointment
            </a>
            <span className="flex items-center gap-2 text-sm">
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <strong>4.7</strong> · 2,100 pet parents
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-[45%_55%_50%_50%/50%_45%_55%_50%] bg-secondary">
            <AnimatePresence initial={false}>
              <motion.img
                key={p.photo}
                src={img(p.photo)}
                alt={p.alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
          {paws.map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute text-accent"
              style={{ left: `${-4 + i * 7}%`, top: `${88 - i * 9}%`, rotate: `${-30 + i * 8}deg` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 1] }}
              transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.3, times: [0, 0.1, 0.8, 1] }}
            >
              <PawPrint className="size-6 fill-current" />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
