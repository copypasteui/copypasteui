"use client";

import { motion } from "motion/react";
import { ArrowRight, Flame, HandHeart, ShoppingBasket, Users } from "lucide-react";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const programmes = [
  {
    icon: ShoppingBasket,
    title: "Community pantry",
    when: "Tue, Thu & Sat",
    body: "Fresh food and essentials for £3.50 a shop, or free, no questions asked.",
    photo: "photo-1628717341663-0007b0ee2597",
  },
  {
    icon: Flame,
    title: "Warm hubs",
    when: "Mon–Fri, 10–4",
    body: "Somewhere warm with hot food, Wi-Fi, phone charging and energy-bill advice.",
    photo: "photo-1706806595136-5afefb45da1a",
  },
  {
    icon: Users,
    title: "Youth club",
    when: "Weeknights, 4–8",
    body: "Football, cooking, homework help and trips for 11 to 18-year-olds.",
    photo: "photo-1778864875166-92a5c1adf24a",
  },
  {
    icon: HandHeart,
    title: "Befriending",
    when: "Weekly visits",
    body: "Volunteers matched with older neighbours for tea, chats and errands.",
    photo: "photo-1544928938-6852c1925194",
  },
];

export default function CommonGroundProgrammes() {
  return (
    <section className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-extrabold">What we do</h2>
          <a href="#" className="inline-flex items-center gap-2 font-bold text-primary">
            Need help? Start here <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius)] border-2 border-border bg-card text-card-foreground transition hover:border-primary"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img(p.photo)}
                  alt=""
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 grid size-11 place-items-center rounded-full bg-card text-primary shadow">
                  <p.icon className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="text-sm font-bold text-primary">{p.when}</p>
                <p className="mt-2 flex-1 text-muted-foreground">{p.body}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 font-bold text-primary">
                  Find out more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
