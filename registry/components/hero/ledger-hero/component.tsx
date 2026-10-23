"use client";

import { motion } from "motion/react";
import { ArrowRight, Bell, CheckCircle2, Menu, TrendingUp } from "lucide-react";

const bars = [38, 52, 44, 61, 58, 72, 69, 84];

export default function LedgerHero() {
  return (
    <section className="overflow-hidden bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
          <span className="grid size-9 place-items-center rounded-[var(--radius)] bg-primary font-display text-lg text-primary-foreground">
            L
          </span>{" "}
          ledger
        </a>
        <nav className="hidden gap-8 text-sm font-medium lg:flex">
          {["Sole traders", "Limited companies", "Landlords", "Pricing", "About"].map((l) => (
            <a key={l} href="#" className="hover:text-primary">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="#call"
            className="hidden rounded-[var(--radius)] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-block"
          >
            Book a free call
          </a>
          <button type="button" aria-label="Open menu" className="lg:hidden">
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 pt-10 pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            <CheckCircle2 className="size-4" /> Chartered accountants · fixed monthly fees
          </p>
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-display text-[clamp(2.75rem,6vw,5.25rem)] leading-[1] font-bold tracking-tight"
          >
            Your accounts and tax return, <span className="text-primary">for one monthly fee.</span>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Friendly accountants for freelancers, small businesses and landlords. One named accountant, one monthly fee, and answers in
            plain English, usually the same day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-[var(--radius)] bg-primary px-6 py-4 font-semibold text-primary-foreground"
            >
              See prices <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-muted-foreground">
              From <span className="font-semibold text-foreground">£39/month</span> · cancel any time
            </p>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[calc(var(--radius)*2)] border border-border bg-card p-6 text-card-foreground"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profit, this tax year</p>
                <p className="font-display text-4xl font-bold">£48,210</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-sm font-semibold text-primary">
                <TrendingUp className="size-4" /> 18%
              </span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-2">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                  className={`flex-1 rounded-t-[calc(var(--radius)*0.5)] ${i === bars.length - 1 ? "bg-primary" : "bg-secondary"}`}
                />
              ))}
            </div>
            <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Self assessment 2025/26
                </span>
                <span className="font-medium text-primary">Filed</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> VAT return Q2
                </span>
                <span className="font-medium text-primary">Filed</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Bell className="size-4 text-muted-foreground" /> Payment on account
                </span>
                <span className="text-muted-foreground">Due 31 Jan</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="absolute -top-8 -right-3 rounded-[var(--radius)] bg-primary px-5 py-4 text-primary-foreground shadow-xl sm:-right-6"
          >
            <p className="text-xs opacity-80">Tax saved for clients last year</p>
            <p className="font-display text-2xl font-bold">£1.4m</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
