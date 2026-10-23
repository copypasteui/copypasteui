"use client";

import { MapPin, Clock } from "lucide-react";

const img = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export default function CinderwickFooter() {
  return (
    <footer className="bg-primary font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative overflow-hidden rounded-[var(--radius)]">
          <img
            src={img("photo-1600353565737-2427a1ba3d3a")}
            alt="Bright café with plants and long tables"
            loading="lazy"
            className="aspect-[16/10] size-full object-cover"
          />
          <div className="absolute right-4 bottom-4 left-4 flex flex-wrap items-center justify-between gap-3 rounded-[calc(var(--radius)-4px)] bg-background/95 p-4 text-foreground">
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-accent" /> 8 Mill Lane, Leeds LS1 4AB
            </span>
            <span className="flex items-center gap-2 text-sm">
              <Clock className="size-4 text-accent" /> Open today 7:00–16:00
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="font-display text-4xl leading-tight font-semibold">Visit the roastery café and we’ll show you the drum.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex gap-2 rounded-full border border-primary-foreground/25 p-1.5">
              <input
                type="email"
                required
                placeholder="Get roast-day emails"
                aria-label="Email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm placeholder:text-primary-foreground/90 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
                Sign up
              </button>
            </form>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            {[
              { t: "Shop", l: ["Coffee", "Subscriptions", "Gear", "Gift cards"] },
              { t: "Learn", l: ["Brew guides", "Journal", "Our farms"] },
              { t: "Cinderwick", l: ["Café", "Wholesale", "Careers", "Contact"] },
            ].map((c) => (
              <div key={c.t}>
                <p className="font-semibold">{c.t}</p>
                <ul className="mt-3 space-y-1.5 opacity-90">
                  {c.l.map((x) => (
                    <li key={x}>
                      <a href="#" className="hover:opacity-100">
                        {x}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-6 pt-6 font-display text-[17vw] leading-[0.8] font-extrabold tracking-tight select-none">
          cinderwick<span className="text-accent">·</span>
        </p>
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs opacity-90">
          © {new Date().getFullYear()} Cinderwick Roasters Ltd · B Corp pending · Prices include VAT{" "}
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
