"use client";

import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

// Replace with the business's real details and most-visited pages.
const business = { name: "Harbour Kitchen", phone: "01632 960 101", tel: "+441632960101" };
const popular = [
  { label: "Our menu", href: "/menu" },
  { label: "Book a table", href: "/book" },
  { label: "Find us", href: "/contact" },
  { label: "Gift cards", href: "/gift-cards" },
];

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[80vh] items-center bg-background px-6 py-24 font-sans text-foreground">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Error 404</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight md:text-6xl">
            This page has moved, or never existed.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            The link may be from an old menu or flyer. Everything else at {business.name} is right where you left it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              <ArrowLeft className="size-4" /> Back to the home page
            </a>
            <a
              href={`tel:${business.tel}`}
              className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-border px-6 py-3 font-semibold hover:bg-muted"
            >
              <Phone className="size-4" /> {business.phone}
            </a>
          </div>
        </div>

        <motion.nav
          aria-label="Popular pages"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-6 text-card-foreground"
        >
          <p className="font-display text-7xl leading-none font-bold text-primary md:text-8xl" aria-hidden>
            404
          </p>
          <p className="mt-6 text-sm font-semibold">You might be looking for</p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {popular.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="group flex items-center justify-between py-3 font-medium">
                  {p.label}
                  <ArrowRight className="size-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
