"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const posts = [
  {
    cat: "Field notes",
    title: "What 15 years of well-building taught us about listening",
    excerpt: "The technology was never the hard part. Here’s what was.",
    date: "Mar 12",
    read: 8,
    photo: "photo-1543181077-099f32f30a1c",
    alt: "A group of people walking along a road carrying water containers",
  },
  {
    cat: "Impact",
    title: "2025 annual report: 186 new wells and what went wrong",
    excerpt: "Our numbers, our mistakes and what we’re changing this year.",
    date: "Feb 28",
    read: 12,
    photo: "photo-1760873059715-7c7cfbe2a2c6",
    alt: "Children standing by a water pump in a village",
  },
  {
    cat: "Stories",
    title: "Meet Grace, the engineer who trains engineers",
    excerpt: "From apprentice to running the regional maintenance team.",
    date: "Feb 10",
    read: 5,
    photo: "photo-1543335547-334c05de28c2",
    alt: "Man sitting on yellow plastic water containers",
  },
  {
    cat: "Field notes",
    title: "Solar pumps vs. hand pumps: an honest comparison",
    excerpt: "Costs, upkeep and why the answer is usually 'both'.",
    date: "Jan 22",
    read: 10,
    photo: "photo-1543180930-261980d4868a",
    alt: "Two boys beside a bicycle loaded with containers",
  },
];
const cats = ["All", "Field notes", "Impact", "Stories"];

export default function BlogPostCards() {
  const [cat, setCat] = useState("All");
  const list = posts.filter((p) => cat === "All" || p.cat === cat);

  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">From the field</h2>
            <p className="mt-2 text-muted-foreground">Stories, reports and lessons from our teams.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              layout
              transition={{ duration: 0.3 }}
              className={`group flex flex-col ${i === 0 && cat === "All" ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <div
                className={`relative overflow-hidden rounded-lg ${i === 0 && cat === "All" ? "aspect-[16/10] lg:aspect-auto lg:flex-1" : "aspect-[16/10]"}`}
              >
                <img
                  src={img(p.photo, i === 0 && cat === "All" ? 1400 : 800)}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-semibold">{p.cat}</span>
              </div>
              <div className="mt-4">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  {p.date} · <Clock className="size-3.5" /> {p.read} min read
                </p>
                <h3
                  className={`mt-2 font-display leading-snug font-bold group-hover:text-primary ${i === 0 && cat === "All" ? "text-3xl" : "text-xl"}`}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read story <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
