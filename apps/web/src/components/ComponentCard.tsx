import Link from "next/link";
import Thumb from "@/components/Thumb";
import type { ComponentSummary } from "@/lib/registry";

export default function ComponentCard({ c, theme }: { c: ComponentSummary; theme: string }) {
  return (
    <Link
      href={`/components/${c.category}/${c.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-[4px_4px_0_var(--foreground)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
        <Thumb
          src={`/thumbs/components/${c.slug}.jpg`}
          previewSrc={`/preview/${c.slug}?theme=${c.collection ? c.theme : theme}&frame=thumb`}
          alt={`${c.name} preview`}
        />
      </div>
      <div className="p-4">
        <p className="flex items-center justify-between gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          {c.category.replace(/-/g, " ")}
          {c.collection && (
            <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] tracking-wider text-accent-foreground">
              {c.collection.split("-")[0]}
            </span>
          )}
        </p>
        <h3 className="mt-1 font-semibold text-card-foreground">{c.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">by {c.author.github ? `@${c.author.github}` : c.author.name}</p>
      </div>
    </Link>
  );
}
