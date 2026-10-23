"use client";

import { motion } from "motion/react";
import { Lock, CloudOff, Bell, Palette, Share2, Clock } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Reminders at your time",
    body: "Learns when you usually walk, read or stretch, and reminds you then, not every hour.",
  },
  { icon: Lock, title: "Private by design", body: "Your data stays on your device. No ads, no tracking, no selling." },
  { icon: CloudOff, title: "Works offline", body: "Everything syncs quietly when you’re back online." },
  { icon: Bell, title: "Gentle reminders", body: "Soft, timed nudges you can snooze with a swipe." },
  { icon: Palette, title: "Your colours, your icon", body: "Twelve themes, home-screen widgets and 30 app icons." },
  { icon: Share2, title: "Better together", body: "Share goals with friends and cheer each other on." },
];

export default function IconFeatureList() {
  return (
    <section className="bg-muted px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Why 8 in 10 people still use it a year later</h2>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="group"
            >
              <span className="grid size-12 place-items-center rounded-lg bg-card text-primary shadow-sm ring-1 ring-border transition group-hover:-rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
