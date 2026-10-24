"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Bike, Clock, ShoppingBag } from "lucide-react";

type App = { name: string; href: string; eta: string; note?: string };

// Order buttons for a takeaway or restaurant: the direct collection order first, because it costs the business no
// commission, then each delivery app with its usual delivery time. App names are plain text, with no logos.
export default function OrderDeliveryCta({
  heading = "Order from Basil & Ember",
  intro = "Wood-fired pizza from 14 Market Street, Bristol. Delivery 5pm to 10pm, Tuesday to Sunday, within about 3 miles.",
  directHref = "#order",
  directLabel = "Order for collection",
  directNote = "10% off every collection order, ready in 15 to 20 minutes",
  apps = [
    { name: "Deliveroo", href: "https://deliveroo.co.uk", eta: "25–35 min" },
    { name: "Uber Eats", href: "https://www.ubereats.com", eta: "25–40 min" },
    { name: "Just Eat", href: "https://www.just-eat.co.uk", eta: "30–45 min" },
  ],
  appsNote = "Menu prices on the apps are about 15% higher than ordering from us.",
}: {
  heading?: string;
  intro?: string;
  directHref?: string;
  directLabel?: string;
  directNote?: string;
  apps?: App[];
  appsNote?: string;
}) {
  return (
    <section className="bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-md text-muted-foreground">{intro}</p>
          <a
            href={directHref}
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-sm"
          >
            <ShoppingBag className="size-5" aria-hidden /> {directLabel}
          </a>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4 shrink-0" aria-hidden /> {directNote}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground">Delivery through an app</h3>
          <ul className="mt-3 grid gap-3">
            {apps.map((app, i) => (
              <motion.li
                key={app.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground transition-colors hover:border-primary"
                >
                  <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-muted text-foreground">
                    <Bike className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{app.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      Delivery in {app.eta}
                      {app.note && <span className="block">{app.note}</span>}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </motion.li>
            ))}
          </ul>
          {appsNote && <p className="mt-3 text-sm text-muted-foreground">{appsNote}</p>}
        </div>
      </div>
    </section>
  );
}
