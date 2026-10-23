"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Gift, MapPin } from "lucide-react";

const amounts = [50, 85, 150, 250];

export default function StillBooking() {
  const [amount, setAmount] = useState(85);
  const [to, setTo] = useState("");
  const [msg, setMsg] = useState("Take a breath. You deserve it.");

  return (
    <section id="book" className="bg-secondary py-28 font-sans text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.4em] text-muted-foreground uppercase">
            <Gift className="size-4" /> Gift vouchers
          </p>
          <h2 className="mt-4 font-display text-5xl md:text-6xl">Give someone an afternoon of nothing.</h2>
          <form onSubmit={(e) => e.preventDefault()} className="mt-10 space-y-6">
            <div className="flex flex-wrap gap-2">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  aria-pressed={amount === a}
                  className={`rounded-full px-6 py-3 font-semibold transition ${amount === a ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground hover:bg-background"}`}
                >
                  £{a}
                </button>
              ))}
            </div>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipient’s name"
              aria-label="Recipient’s name"
              maxLength={24}
              className="w-full rounded-full border border-border bg-background px-6 py-4 text-foreground outline-none focus:border-ring"
            />
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="A short message"
              aria-label="Message"
              maxLength={60}
              className="w-full rounded-full border border-border bg-background px-6 py-4 text-foreground outline-none focus:border-ring"
            />
            <button type="submit" className="w-full rounded-full bg-primary py-4 font-semibold text-primary-foreground">
              Buy £{amount} voucher · sent instantly
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <motion.div
            key={amount}
            initial={{ rotate: -2, y: 10, opacity: 0.6 }}
            animate={{ rotate: -3, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative mx-auto aspect-[1.6] w-full max-w-md overflow-hidden rounded-[var(--radius)] bg-primary p-8 text-primary-foreground shadow-2xl"
          >
            <span aria-hidden className="absolute -top-16 -right-16 size-64 rounded-full border border-primary-foreground/20" />
            <span aria-hidden className="absolute -top-6 -right-6 size-40 rounded-full border border-primary-foreground/20" />
            <p className="font-display text-xl tracking-[0.4em]">STILL</p>
            <p className="mt-8 text-sm opacity-90">For</p>
            <p className="font-display text-3xl">{to || "Someone lovely"}</p>
            <p className="mt-2 text-sm italic opacity-90">“{msg}”</p>
            <p className="absolute right-8 bottom-6 font-display text-5xl">£{amount}</p>
          </motion.div>
          <ul className="mx-auto max-w-md space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="size-4 shrink-0" /> The Old Bathhouse, 3 Pump Lane, Bath BA1 1AA
            </li>
            <li className="flex gap-3">
              <Clock className="size-4 shrink-0" /> Daily 9am – 9pm · Last thermal entry 7pm
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
