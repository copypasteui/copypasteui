import Link from "next/link";
import type { ComponentSummary } from "@/lib/registry";

/** Two rows of real screenshots drifting in opposite directions (pure CSS, pauses on hover). */
export default function ShowcaseBanner({ items }: { items: ComponentSummary[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className="relative space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-2">
      {rows.map((row, r) => (
        <div
          key={r}
          className="group flex w-max gap-4 hover:[animation-play-state:paused]"
          style={{ animation: `showcase-scroll ${row.length * 6}s linear infinite ${r ? "reverse" : ""}` }}
        >
          {[...row, ...row].map((c, i) => (
            <Link
              key={`${c.slug}-${i}`}
              href={`/components/${c.category}/${c.slug}`}
              tabIndex={i >= row.length ? -1 : undefined}
              className="relative block aspect-[16/10] w-72 shrink-0 overflow-hidden rounded-lg border border-border bg-muted shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.thumbnailUrl} alt={c.name} loading="lazy" className="size-full object-cover object-top" />
              <span className="absolute bottom-2 left-2 rounded-md bg-background/90 px-2 py-1 text-xs font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
