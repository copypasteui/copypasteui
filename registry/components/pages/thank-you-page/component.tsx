"use client";

import { motion } from "motion/react";
import { ArrowLeft, CalendarCheck, Check, MessageSquare, Phone } from "lucide-react";

// Replace with what actually happens after someone books or gets in touch.
const business = { name: "Verelle", phone: "0161 496 0750", tel: "+441614960750" };
const steps = [
  { icon: MessageSquare, title: "We'll confirm by text", body: "Within two hours in opening times, with your stylist's name." },
  { icon: CalendarCheck, title: "Pop it in your calendar", body: "Your confirmation has an add-to-calendar link and a map." },
  { icon: Phone, title: "Need to change it?", body: "Reply to the text or call us. It’s free up to 24 hours before." },
];

export default function ThankYouPage() {
  return (
    <section className="bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <Check className="size-8" strokeWidth={2.5} />
        </motion.div>
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-5xl">Thanks, your request is in.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          We&apos;ve sent a copy to your email. Reference <span className="font-mono font-semibold text-foreground">LUM-4821</span>.
        </p>
      </div>

      <ol className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-[var(--radius)] border border-border bg-card p-5 text-card-foreground">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-mono">{i + 1}</span>
              <s.icon className="size-4" />
            </p>
            <p className="mt-3 font-semibold">{s.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border px-6 py-3 font-semibold hover:bg-muted"
        >
          <ArrowLeft className="size-4" /> Back to {business.name}
        </a>
        <a
          href={`tel:${business.tel}`}
          className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          <Phone className="size-4" /> {business.phone}
        </a>
      </div>
    </section>
  );
}
