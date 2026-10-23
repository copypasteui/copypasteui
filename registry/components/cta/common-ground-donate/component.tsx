"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Lock } from "lucide-react";

const amounts = [10, 25, 50, 100];
const impact = (n: number) =>
  n >= 100
    ? "keeps a warm hub open for a whole afternoon"
    : n >= 50
      ? "fills a family’s cupboards for a fortnight"
      : n >= 25
        ? "pays for a week of youth-club dinners"
        : n >= 10
          ? "provides three hot meals in our warm hub"
          : "helps keep the lights on";

export default function CommonGroundDonate() {
  const [monthly, setMonthly] = useState(false);
  const [amount, setAmount] = useState(25);
  const [custom, setCustom] = useState("");
  const [giftAid, setGiftAid] = useState(true);
  const value = custom ? Number(custom) || 0 : amount;

  return (
    <section id="donate" className="bg-background py-24 font-sans text-foreground">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-[calc(var(--radius)*2)] border-2 border-border bg-card p-6 text-card-foreground md:p-10">
          <div className="text-center">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
              className="inline-grid size-14 place-items-center rounded-full bg-accent text-accent-foreground"
            >
              <Heart className="size-7 fill-current" />
            </motion.span>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Make a donation</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 rounded-[var(--radius)] bg-muted p-1">
            {[false, true].map((m) => (
              <button
                key={String(m)}
                type="button"
                onClick={() => setMonthly(m)}
                aria-pressed={monthly === m}
                className={`relative rounded-[calc(var(--radius)*0.8)] py-3 font-bold ${monthly === m ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                {monthly === m && (
                  <motion.span layoutId="cg-freq" className="absolute inset-0 rounded-[calc(var(--radius)*0.8)] bg-primary" />
                )}
                <span className="relative">{m ? "Monthly" : "One-off"}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {amounts.map((a) => (
              <motion.button
                key={a}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setAmount(a);
                  setCustom("");
                }}
                aria-pressed={!custom && amount === a}
                className={`rounded-[var(--radius)] border-2 py-4 font-display text-2xl font-extrabold transition ${!custom && amount === a ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}
              >
                £{a}
              </motion.button>
            ))}
          </div>
          <label className="mt-3 flex items-center rounded-[var(--radius)] border-2 border-border px-4 focus-within:border-primary">
            <span className="font-display text-xl font-bold">£</span>
            <input
              inputMode="decimal"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Other amount"
              aria-label="Other amount"
              className="w-full bg-transparent px-2 py-3.5 outline-none"
            />
          </label>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${value}-${monthly}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 rounded-[var(--radius)] bg-secondary px-5 py-4 text-center text-secondary-foreground"
            >
              <strong>
                £{value || 0}
                {monthly ? " a month" : ""}
              </strong>{" "}
              {impact(value)}
              {monthly ? ", every month" : ""}.
            </motion.p>
          </AnimatePresence>
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={giftAid}
              onChange={(e) => setGiftAid(e.target.checked)}
              className="mt-0.5 size-5 accent-[var(--primary)]"
            />
            <span>
              <strong>Add Gift Aid.</strong> As a UK taxpayer, your £{value || 0} becomes £{((value || 0) * 1.25).toFixed(2)} at no extra
              cost to you.
            </span>
          </label>
          <button type="button" className="mt-6 w-full rounded-[var(--radius)] bg-accent py-4 text-lg font-bold text-accent-foreground">
            Donate £{value || 0}
            {monthly ? " monthly" : ""}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> Secure payment · Cancel monthly gifts any time
          </p>
        </div>
      </div>
    </section>
  );
}
