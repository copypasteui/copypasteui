"use client";

import { useState } from "react";
import { Snowflake } from "lucide-react";

export default function FizzwhipFooter() {
  const [joined, setJoined] = useState(false);
  return (
    <footer className="bg-foreground font-sans text-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-3xl">
              <Snowflake className="size-7" aria-hidden /> fizzwhip
            </p>
            <p className="mt-4 max-w-sm">Get the flavour board by email on Friday mornings. One email a week.</p>
            {joined ? (
              <p role="status" className="mt-4 font-semibold">
                You&apos;re on the list. See you Friday.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setJoined(true);
                }}
                className="mt-4 flex max-w-sm gap-2"
              >
                <input
                  type="email"
                  required
                  aria-label="Email"
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-full bg-background px-5 py-3 text-foreground"
                />
                <button type="submit" className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">
                  Sign up
                </button>
              </form>
            )}
          </div>
          <nav aria-label="Shop">
            <p className="font-semibold">Shop</p>
            <ul className="mt-3 space-y-2">
              {["Flavours", "Tubs", "Parties", "Gift cards"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-semibold">Visit</p>
            <p className="mt-3">27 Broad Street, Hockley, Nottingham NG1 3AJ</p>
            <p className="mt-2">0115 496 0274</p>
          </div>
        </div>
        <p className="mt-14 border-t border-background/30 pt-6 text-sm">
          © 2026 Fizzwhip Gelato Ltd{" "}
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
