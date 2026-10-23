"use client";

import { motion } from "motion/react";

const img = (id: string, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const day = [
  {
    time: "7:30",
    emoji: "🥣",
    title: "Breakfast club",
    body: "Porridge, fruit and toast, and a cuddle if needed.",
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    time: "9:00",
    emoji: "🎨",
    title: "Messy play",
    body: "Paint, clay, sand and water. Spare clothes advised.",
    tone: "bg-card text-card-foreground",
    photo: "photo-1564429097439-e400382dc893",
  },
  {
    time: "10:30",
    emoji: "🌳",
    title: "Forest school",
    body: "Mud kitchens, den building and bug hunts in our woodland.",
    tone: "bg-accent text-accent-foreground",
    photo: "photo-1519226135464-df5a9dbcd2a5",
  },
  {
    time: "12:00",
    emoji: "🍲",
    title: "Lunch",
    body: "Cooked fresh on site by Jean, our chef of eleven years.",
    tone: "bg-card text-card-foreground",
  },
  {
    time: "13:00",
    emoji: "😴",
    title: "Quiet time",
    body: "Naps for little ones, stories and yoga for the big ones.",
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    time: "14:30",
    emoji: "🔤",
    title: "Phonics & numbers",
    body: "Playful, school-ready learning in small groups.",
    tone: "bg-card text-card-foreground",
    photo: "photo-1788882679829-fee300e8ae4a",
  },
  {
    time: "16:00",
    emoji: "🍎",
    title: "Tea & garden",
    body: "A light tea, then outside until home time.",
    tone: "bg-primary text-primary-foreground",
    photo: "photo-1516890896652-41ca1a35787c",
  },
];

export default function AcornsDay() {
  return (
    <section className="overflow-hidden bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-5xl font-extrabold md:text-6xl">A day at Little Acorns</h2>
        <p className="mt-3 max-w-lg text-lg text-muted-foreground">
          Every day is a little different, but this is the rhythm your child will settle into.
        </p>
      </div>
      <div
        tabIndex={0}
        role="region"
        aria-label="A day at nursery"
        className="mt-12 flex snap-x gap-5 overflow-x-auto px-6 pb-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {day.map((d, i) => (
          <motion.article
            key={d.time}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            whileHover={{ rotate: 0, y: -8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.05 }}
            className={`w-64 shrink-0 snap-start overflow-hidden rounded-[var(--radius)] shadow-lg shadow-foreground/5 ${d.tone}`}
          >
            {d.photo && <img src={img(d.photo)} alt="" className="aspect-[4/3] w-full object-cover" />}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-extrabold">{d.time}</span>
                <span className="text-4xl" aria-hidden>
                  {d.emoji}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold">{d.title}</h3>
              <p className="mt-1 opacity-90">{d.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
