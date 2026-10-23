"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Bookmark, Share2, Check } from "lucide-react";

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const toc = ["The Monday problem", "What the till said", "Telling the regulars", "Six months on"];

export default function ArticleReader() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <article className="relative bg-background px-6 pb-24 font-sans text-foreground">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary" />
      <header className="mx-auto max-w-3xl pt-20 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">Notes from the counter</p>
        <h1 className="mt-4 font-display text-4xl leading-tight font-bold tracking-tight md:text-6xl">Why we stopped opening on Mondays</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          We lost £180 every Monday for two years before we looked at the numbers. Closing made the other six days better.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm">
          <img src={img("photo-1544005313-94ddf0286df2", 120)} alt="Sana Iqbal" className="size-10 rounded-full object-cover" />
          <span className="text-left">
            <span className="block font-semibold">Sana Iqbal</span>
            <span className="text-muted-foreground">Owner, Corner House Café · 6 min read</span>
          </span>
        </div>
      </header>

      <figure className="mx-auto mt-12 max-w-5xl">
        <img
          src={img("photo-1622140739492-f82f386260b5")}
          alt="Empty wooden tables and chairs in the café"
          className="aspect-[21/9] w-full rounded-lg object-cover"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          A Monday at 11am, March last year. Three customers all morning.
        </figcaption>
      </figure>

      <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-10 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">On this page</p>
              <ol className="mt-3 space-y-2 border-l border-border text-sm">
                {toc.map((t, i) => (
                  <li key={t}>
                    <a
                      href="#"
                      className={`-ml-px block border-l-2 pl-3 ${i === 0 ? "border-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                aria-label="Save"
                className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
              >
                <Bookmark className={`size-4 ${saved ? "fill-primary text-primary" : ""}`} />
              </button>
              <button
                type="button"
                onClick={() => {
                  // Only confirm when the copy worked: browsers can refuse clipboard access.
                  navigator.clipboard?.writeText(window.location.href).then(
                    () => setCopied(true),
                    () => {},
                  );
                }}
                aria-label="Copy link"
                className="grid size-10 place-items-center rounded-full border border-border hover:bg-muted"
              >
                {copied ? <Check className="size-4 text-primary" /> : <Share2 className="size-4" />}
              </button>
            </div>
          </div>
        </aside>

        <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
          <p>
            <span className="float-left mt-1 mr-3 font-display text-7xl leading-[0.8] font-bold text-primary">F</span>
            or two years Monday was the day we told ourselves would pick up. Two of us on, the full menu prepped, the ovens on at six. By
            close we&apos;d usually taken about £240, and paid out £420 in wages, energy and food we binned.
          </p>
          <h2 className="pt-4 font-display text-3xl font-bold">What the till said</h2>
          <p className="text-muted-foreground">
            When we finally exported a year of sales, Monday was 6% of our takings and 14% of our costs. Saturday alone made more than
            Monday, Tuesday and Wednesday together. We weren&apos;t a seven-day café; we were a five-day café paying for two empty ones.
          </p>
          <blockquote className="border-l-4 border-primary bg-muted py-4 pr-4 pl-6 font-display text-2xl italic">
            “The regulars didn&apos;t mind at all. Two of them asked why it took us so long.”
          </blockquote>
          <p className="text-muted-foreground">
            We kept the hours we close on the door for a month first, and gave everyone on the Monday rota the same hours across the week.
            Six months on, takings are up 4% with one less day of costs, and nobody has to bake for an empty room.
          </p>
          <div className="flex flex-wrap gap-2 pt-6">
            {["Running a café", "Opening hours", "Numbers"].map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
