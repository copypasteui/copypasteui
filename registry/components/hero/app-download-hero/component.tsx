"use client";

import { motion } from "motion/react";
import { Smartphone, Download, Bell, Flame, Moon, Star } from "lucide-react";

function PhoneMock() {
  return (
    <div className="relative mx-auto h-[560px] w-[280px] rounded-[3rem] border-[10px] border-foreground bg-background">
      <div className="absolute top-2 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground" />
      <div className="flex h-full flex-col gap-4 overflow-hidden rounded-[2.2rem] bg-muted p-5 pt-12">
        <p className="text-xs text-muted-foreground">Good morning, Sam</p>
        <p className="font-display text-2xl leading-tight font-bold text-foreground">You slept 7h 42m</p>
        <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
          <div className="flex items-center justify-between text-xs opacity-90">
            <span>Sleep score</span>
            <Moon className="size-4" />
          </div>
          <p className="mt-2 font-display text-4xl font-bold">92</p>
          <div className="mt-3 flex h-12 items-end gap-1">
            {[40, 65, 50, 80, 72, 95, 88].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                className="flex-1 rounded-sm bg-primary-foreground/60"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-3">
            <Flame className="size-4 text-primary" />
            <p className="mt-2 font-display text-xl font-bold text-card-foreground">12</p>
            <p className="text-[11px] text-muted-foreground">day streak</p>
          </div>
          <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
            <Star className="size-4" />
            <p className="mt-2 font-display text-xl font-bold">4.7</p>
            <p className="text-[11px] opacity-90">mood avg</p>
          </div>
        </div>
        <div className="rounded-2xl bg-card p-3 text-xs text-card-foreground">Wind-down starts at 22:30 · breathing, 5 min</div>
      </div>
    </div>
  );
}

export default function AppDownloadHero() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 font-sans text-foreground md:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            <Star className="size-4 fill-current text-primary" /> 4.7 · 38k ratings · Editor’s choice
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 font-display text-5xl leading-[1.05] font-extrabold tracking-tight md:text-6xl"
          >
            Fall asleep 20 minutes <span className="text-primary">sooner.</span>
          </motion.h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            That&apos;s the average for people who use Drift&apos;s wind-down routine for two weeks. It also wakes you in your lightest
            sleep phase, inside a 30-minute window you choose.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { top: "Download on the", label: "App Store" },
              { top: "Get it on", label: "Google Play" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                className="flex items-center gap-3 rounded-xl bg-foreground px-5 py-3 text-background transition hover:-translate-y-0.5"
              >
                <Smartphone className="size-6" />
                <span className="text-left leading-tight">
                  <span className="block text-[10px] tracking-wide uppercase opacity-90">{s.top}</span>
                  <span className="block font-semibold">{s.label}</span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Download className="size-4" /> Free for 14 days · 2M+ downloads
          </p>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <PhoneMock />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 0.8 }, x: { delay: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute bottom-28 -left-2 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-xl sm:flex"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Bell className="size-5" />
            </span>
            <span className="text-sm">
              <span className="block font-semibold text-card-foreground">Gentle alarm</span>
              <span className="block text-muted-foreground">Waking you in light sleep</span>
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1 }, x: { delay: 1 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-16 -right-2 hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:block"
          >
            <p className="text-xs text-muted-foreground">This week</p>
            <p className="font-display text-2xl font-bold text-card-foreground">+48 min</p>
            <p className="text-xs text-primary">deep sleep</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
