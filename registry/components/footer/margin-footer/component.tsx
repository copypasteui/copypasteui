"use client";

import { useState } from "react";

export default function MarginFooter() {
  const [done, setDone] = useState(false);
  return (
    <footer className="border-t border-border bg-background font-sans text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl italic">Margin</p>
            <p className="mt-4 max-w-sm text-sm">
              The Sunday letter: five books we couldn&apos;t stop talking about, and the week&apos;s events.
            </p>
            {done ? (
              <p role="status" className="mt-4 text-sm font-semibold">
                Thanks. The next letter comes on Sunday.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
                className="mt-4 flex max-w-sm border-b border-foreground"
              >
                <input
                  type="email"
                  required
                  aria-label="Email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent py-2 outline-none"
                />
                <button type="submit" className="py-2 text-sm font-semibold">
                  Subscribe
                </button>
              </form>
            )}
          </div>
          <nav aria-label="Shop">
            <ul className="space-y-2 text-sm">
              {["Staff picks", "Events", "Book of the month", "Gift cards", "Special orders"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm">
            41 Bruntsfield Place
            <br />
            Edinburgh EH10 4HJ
            <br />
            0131 496 0265
          </p>
        </div>
        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 Margin Books Ltd{" "}
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
