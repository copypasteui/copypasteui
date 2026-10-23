"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const slides = [
  { id: "photo-1526835746352-0b9da4054862", alt: "Portrait of a woman lit by low golden sun", cap: "Ellie, Cornwall · August" },
  { id: "photo-1561525140-c2a4cc68e4bd", alt: "Young family embracing in tall grass at sunset", cap: "The Okafors · golden hour" },
  { id: "photo-1710286148404-edd1aef18b82", alt: "Woman by the sea at sunset", cap: "Nadia, Porthcurno · June" },
];

export default function JuniperHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-background font-sans text-foreground">
      <div className="grid min-h-[100svh] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col px-6 py-6 md:px-12">
          <header className="flex items-center justify-between">
            <a href="#" className="font-display text-xl italic">
              Juniper Hart
            </a>
            <nav className="hidden gap-7 text-sm md:flex">
              {["Portfolio", "Sessions", "About", "Journal"].map((l) => (
                <a key={l} href="#" className="text-muted-foreground hover:text-foreground">
                  {l}
                </a>
              ))}
            </nav>
            <button type="button" aria-label="Open menu" className="md:hidden">
              <Menu className="size-6" />
            </button>
          </header>
          <div className="flex flex-1 flex-col justify-center py-16">
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">Portrait &amp; family photographer · Cornwall</p>
            <h1 className="mt-6 font-display text-[clamp(4rem,11vw,10rem)] leading-[0.85]">
              <motion.span
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Light,
              </motion.span>
              <motion.span
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(-100% -100% -100% -100%)" }}
                transition={{ delay: 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="block text-primary italic"
              >
                kept.
              </motion.span>
            </h1>
            <p className="mt-8 max-w-sm text-muted-foreground">
              Unposed, unhurried photographs of the people you love, made outside in the last hour of light.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <a href="#enquire" className="bg-primary px-7 py-4 text-sm tracking-[0.2em] text-primary-foreground uppercase">
                Book a session
              </a>
              <a href="#portfolio" className="border-b border-foreground pb-1 text-sm">
                See the work
              </a>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Now booking spring &amp; summer 2027</p>
        </div>

        <div className="relative min-h-[70svh] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={slides[i]!.id}
              src={img(slides[i]!.id)}
              alt={slides[i]!.alt}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-lg italic"
              >
                {slides[i]!.cap}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center gap-3 text-sm tabular-nums">
              <span>0{i + 1}</span>
              <span className="relative h-px w-16 bg-white/40">
                <motion.span
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-white"
                />
              </span>
              <span>0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
