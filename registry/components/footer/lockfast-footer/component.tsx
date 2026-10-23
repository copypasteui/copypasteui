"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

const HOURS = [
  ["Thursday, Friday", "4pm to 11pm"],
  ["Saturday", "12 to 11pm"],
  ["Sunday", "12 to 6pm"],
];

export default function LockfastFooter() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="overflow-hidden bg-foreground px-6 pt-20 pb-8 font-sans text-background">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Find us</h2>
          <address className="mt-4 not-italic">
            Unit 4, Canal Wharf
            <br />
            Leeds LS11 5PZ
            <br />
            Ten minutes&rsquo; walk from the station
          </address>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Taproom hours</h2>
          <dl className="mt-4 space-y-1">
            {HOURS.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 border-b border-background/30 pb-1">
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">The Thursday tap list</h2>
          <p className="mt-4">One email a week with what&rsquo;s pouring and what&rsquo;s nearly gone.</p>
          {sent ? (
            <p className="mt-4 flex items-center gap-2 font-semibold" role="status">
              <Check className="size-5" aria-hidden /> You&rsquo;re on the list. First one lands Thursday.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-4 flex">
              <label htmlFor="lockfast-email" className="sr-only">
                Email address
              </label>
              <input
                id="lockfast-email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 border-2 border-background bg-transparent px-3 py-2.5 text-background placeholder:text-background/70"
              />
              <button type="submit" className="border-2 border-l-0 border-background bg-background px-4 font-bold text-foreground">
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <p
        aria-hidden
        className="mx-auto mt-16 max-w-6xl font-display text-[clamp(4rem,18vw,15rem)] leading-[0.8] text-transparent uppercase [-webkit-text-stroke:2px_var(--background)]"
      >
        Lockfast
      </p>
      <p className="mx-auto mt-6 max-w-6xl text-sm">
        © 2027 Lockfast Brewing Co. Please drink responsibly. Over 18s after 8pm.{" "}
        {/* Optional credit, for a link back to CopyPasteUI. Keep it, change it or remove it: it is not a licence requirement. */}· Built
        with{" "}
        <a href="https://copypasteui.dev" className="underline underline-offset-2 hover:opacity-80">
          CopyPasteUI
        </a>
      </p>
    </footer>
  );
}
