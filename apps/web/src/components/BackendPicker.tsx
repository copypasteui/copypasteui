"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Loader2 } from "lucide-react";
import type { RecipeSummary } from "@/lib/recipes";

type Recipe = Omit<RecipeSummary, "prompt">;

/** The back office works with any backend: pick one and copy its setup prompt. */
export default function BackendPicker({ recipes }: { recipes: Recipe[] }) {
  const [state, setState] = useState<Record<string, "loading" | "done" | "error">>({});

  const copy = async (slug: string) => {
    setState((s) => ({ ...s, [slug]: "loading" }));
    try {
      const text = fetch(`/r/recipes/${slug}.json`)
        .then((r) => r.json())
        .then((j) => j.prompt as string);
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/plain": text.then((t) => new Blob([t], { type: "text/plain" })) })]);
      } else {
        await navigator.clipboard.writeText(await text);
      }
      setState((s) => ({ ...s, [slug]: "done" }));
      setTimeout(() => setState((s) => ({ ...s, [slug]: undefined as never })), 2000);
    } catch {
      setState((s) => ({ ...s, [slug]: "error" }));
    }
  };

  return (
    <section
      id="backend"
      aria-labelledby="backend-title"
      className="scroll-mt-24 rounded-lg border border-foreground bg-card p-5 text-card-foreground shadow-[4px_4px_0_var(--foreground)] md:p-7"
    >
      <h2 id="backend-title" className="font-display text-2xl font-extrabold tracking-tight">
        Pick where the data lives
      </h2>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        The screens below work with any backend. Copy the setup prompt for yours and paste it after the screens: it creates the tables, the
        sign-in, and the rules for who may see what, which is the part AI tools most often get wrong. Ordered by how many people use each.
      </p>
      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {recipes.map((r) => {
          const st = state[r.slug];
          return (
            <li key={r.slug} className="flex flex-col rounded-md border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">
                  <span className="mr-2 font-mono text-xs text-muted-foreground">{r.rank}</span>
                  {r.name}
                </p>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                  {r.covers === "content"
                    ? "content only"
                    : r.audience.includes("builders") && r.audience.includes("developers")
                      ? "everyone"
                      : r.audience[0]}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.summary}</p>
              <p className="mt-2 text-sm">
                <span className="text-muted-foreground">Best for:</span> {r.bestFor}
              </p>
              <p className="mt-1 text-sm">
                <span className="text-muted-foreground">Cost:</span> {r.cost}
              </p>
              {r.tested && (
                <p
                  className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-sm bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground"
                  title={r.tested}
                >
                  <Check className="size-3.5" /> Tested end to end
                </p>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => copy(r.slug)}
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-semibold text-background"
                >
                  {st === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : st === "done" ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                  {st === "done" ? "Copied" : st === "error" ? "Couldn't copy" : "Copy setup prompt"}
                </button>
                {r.docs[0] && (
                  <a
                    href={r.docs[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {r.docs[0].label} <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-sm text-muted-foreground">
        Using the MCP? Ask your editor to <code className="font-mono text-foreground">build a back office</code> and it calls{" "}
        <code className="font-mono text-foreground">list_recipes</code> and <code className="font-mono text-foreground">get_recipe</code>{" "}
        for you. Recipes follow each provider&apos;s docs; check the linked docs, as providers change their APIs.
      </p>
    </section>
  );
}
