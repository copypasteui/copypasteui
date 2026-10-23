"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

export default function WaxCellarFooter() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="border-t border-foreground bg-background px-6 pt-16 pb-8 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <p aria-hidden className="relative font-display text-[clamp(3.5rem,14vw,10rem)] leading-[0.85] font-extrabold">
          <span className="absolute inset-0 translate-x-1 translate-y-1 text-primary mix-blend-multiply dark:mix-blend-screen">
            Wax Cellar
          </span>
          <span className="relative">Wax Cellar</span>
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <address className="not-italic">
            Basement, 31 Goose Gate
            <br />
            Nottingham NG1 1FE
            <br />
            0115 496 0436
          </address>
          <p>Tuesday to Sunday. Closed Mondays, open bank holidays. Card only for anything under £5.</p>
          <div>
            <p className="flex items-center gap-2 font-bold">
              <Mail className="size-5" aria-hidden /> Friday new-arrivals list
            </p>
            {sent ? (
              <p className="mt-3" role="status">
                Done. See you Friday.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-3 flex gap-2">
                <label htmlFor="wax-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="wax-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-[var(--radius)] border border-foreground bg-card px-3 py-2 text-card-foreground"
                />
                <button type="submit" className="rounded-[var(--radius)] bg-primary px-4 font-semibold text-primary-foreground">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          © 2027 Wax Cellar Records. Prices include VAT. We buy and sell; we don&rsquo;t do valuations by email.{" "}
          {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
          with{" "}
          <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
            CopyPasteUI
          </a>
        </p>
      </div>
    </footer>
  );
}
