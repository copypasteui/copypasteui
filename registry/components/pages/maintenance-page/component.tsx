"use client";

import { motion } from "motion/react";
import { Clock, Mail, Phone } from "lucide-react";

// Replace with the real reason, return date and the ways people can still reach you.
const business = { name: "Fixwell Plumbing", phone: "020 7946 0300", tel: "+442079460300", email: "help@fixwell.example" };
const closure = {
  title: "We're giving the website a fresh coat of paint.",
  body: "The site is offline for a few hours while we update prices and booking. We're still working, so call or email and we'll answer as normal.",
  back: "Back by 6pm today",
};

export default function MaintenancePage() {
  return (
    <section className="flex min-h-screen items-center bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto w-full max-w-2xl">
        <p className="font-display text-xl font-bold">{business.name}</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-8 text-card-foreground md:p-12"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
            <Clock className="size-4" /> {closure.back}
          </p>
          <h1 className="mt-6 font-display text-3xl leading-tight font-bold tracking-tight md:text-5xl">{closure.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{closure.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${business.tel}`}
              className="flex items-center gap-3 rounded-[var(--radius)] bg-primary px-5 py-4 font-semibold text-primary-foreground"
            >
              <Phone className="size-5" />
              <span>
                <span className="block text-sm font-normal opacity-90">Call us</span>
                {business.phone}
              </span>
            </a>
            <a
              href={`mailto:${business.email}`}
              className="flex items-center gap-3 rounded-[var(--radius)] border border-border px-5 py-4 font-semibold hover:bg-muted"
            >
              <Mail className="size-5" />
              <span className="min-w-0">
                <span className="block text-sm font-normal text-muted-foreground">Email</span>
                <span className="block truncate">{business.email}</span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
