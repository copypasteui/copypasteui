"use client";

import { motion } from "motion/react";
import { ArrowRight, Bath, Scissors, Siren, Stethoscope, Syringe, Smile } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const services = [
  {
    icon: Stethoscope,
    title: "Check-ups & vaccinations",
    price: "from £45",
    body: "Annual health checks, boosters and a nose-to-tail once-over.",
    photo: "photo-1770836037793-95bdbf190f71",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: Scissors,
    title: "Full groom",
    price: "from £38",
    body: "Bath, blow-dry, cut, nails and a bandana.",
    photo: "photo-1772437883387-8076cf660c65",
    span: "",
  },
  {
    icon: Syringe,
    title: "Neutering & surgery",
    price: "from £180",
    body: "Modern theatre, keyhole options, overnight care.",
    photo: "",
    span: "",
  },
  {
    icon: Smile,
    title: "Dental care",
    price: "from £65",
    body: "Scale & polish under sedation, plus home-care advice.",
    photo: "",
    span: "",
  },
  {
    icon: Siren,
    title: "24/7 emergencies",
    price: "Always open",
    body: "A vet and nurse on site every night of the year.",
    photo: "",
    span: "",
    accent: true,
  },
  {
    icon: Bath,
    title: "Puppy & kitten packs",
    price: "£149",
    body: "First vaccines, microchip, flea & worm and a starter kit.",
    photo: "photo-1534361960057-19889db9621e",
    span: "md:col-span-2 lg:col-span-4",
  },
];

export default function MossbrookServices() {
  return (
    <section className="bg-secondary py-24 font-sans text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl font-extrabold tracking-tight">Everything under one roof</h2>
        <div className="mt-12 grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#book"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.05 }}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-[var(--radius)] p-6 ${s.photo ? "text-white" : s.accent ? "bg-accent text-accent-foreground" : "bg-card text-card-foreground"} ${s.span}`}
            >
              {s.photo && (
                <>
                  <img
                    src={img(s.photo)}
                    alt=""
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              )}
              <span className="relative">
                <span
                  className={`grid size-11 place-items-center rounded-full ${s.photo ? "bg-white/20 backdrop-blur" : "bg-primary text-primary-foreground"}`}
                >
                  <s.icon className="size-5" />
                </span>
                <span className="mt-4 block font-display text-2xl font-bold">{s.title}</span>
                <span className="mt-1 block text-sm opacity-90">{s.body}</span>
                <span className="mt-4 flex items-center justify-between text-sm font-bold">
                  {s.price} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
