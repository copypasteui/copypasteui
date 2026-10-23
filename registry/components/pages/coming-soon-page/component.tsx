"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, Check, MapPin } from "lucide-react";

const img = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Replace with the real business, opening date and address.
const business = { name: "Harbour Kitchen", what: "A seafood kitchen on the quay", address: "3 Quay Street, Falmouth", instagram: "#" };
const OPENING = new Date("2027-03-14T12:00:00");

export default function ComingSoonPage() {
  const [days, setDays] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setDays(Math.max(0, Math.ceil((OPENING.getTime() - Date.now()) / 86_400_000)));
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // Connect this to your email list (Buttondown, Mailchimp, a form service) before going live.
    setSent(true);
  };

  return (
    <section className="grid min-h-screen bg-background font-sans text-foreground lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-10 md:px-12">
        <p className="font-display text-2xl font-bold">{business.name}</p>
        <div className="py-16">
          <p className="text-sm font-semibold text-muted-foreground">
            Opening {OPENING.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 className="mt-4 max-w-lg font-display text-5xl leading-[1.02] font-bold tracking-tight md:text-7xl">{business.what}.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {days === null
              ? " "
              : days === 0
                ? "We're open. Come and see us."
                : `${days} days to go. Leave your email and we'll tell you first, with a table for the opening week.`}
          </p>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p
                key="ok"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius)] bg-secondary px-5 py-3 font-semibold text-secondary-foreground"
              >
                <Check className="size-5" /> You&apos;re on the list.
              </motion.p>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="soon-email">
                  Email address
                </label>
                <input
                  id="soon-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-card px-4 py-3 text-card-foreground outline-none focus:border-primary"
                />
                <button type="submit" className="rounded-[var(--radius)] bg-primary px-6 py-3 font-semibold text-primary-foreground">
                  Tell me first
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" /> {business.address}
          </span>
          <a href={business.instagram} className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Camera className="size-4" /> Follow the build on Instagram
          </a>
        </div>
      </div>
      <div className="relative min-h-[40vh] overflow-hidden bg-muted lg:min-h-0">
        <img
          src={img("photo-1622140739492-f82f386260b5")}
          alt="Empty wooden tables and chairs waiting for opening day"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </section>
  );
}
