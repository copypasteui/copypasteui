"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PreviewFrame, { type ThemeOption } from "@/components/PreviewFrame";
import UsePanel from "@/components/UsePanel";
import { useThemeParam } from "@/lib/useThemeParam";

/** Template page top: live preview or whole-page screenshot on the left, the two-door panel on the right. */
export default function TemplateDetail({
  slug,
  name,
  sections,
  dependencies,
  themeOptions,
  defaultTheme,
}: {
  slug: string;
  name: string;
  sections: string[];
  dependencies: string[];
  themeOptions: ThemeOption[];
  defaultTheme: string;
}) {
  const [theme, setTheme] = useThemeParam(defaultTheme, themeOptions);
  const [view, setView] = useState<"live" | "whole">("live");
  const themeName = themeOptions.find((t) => t.slug === theme)?.name ?? theme;

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div role="tablist" aria-label="Preview" className="inline-flex rounded-md border border-border bg-card p-0.5 text-sm">
            {[
              { id: "live" as const, label: "Live preview" },
              { id: "whole" as const, label: "Whole page" },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={view === v.id}
                onClick={() => setView(v.id)}
                className={`rounded px-3 py-1.5 font-medium ${view === v.id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <a
            href={`/preview/template/${slug}?theme=${theme}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold hover:highlight"
          >
            Open full page <ArrowUpRight className="size-4" />
          </a>
        </div>
        {view === "live" ? (
          <PreviewFrame src={`/preview/template/${slug}`} themes={themeOptions} theme={theme} onThemeChange={setTheme} height={760} />
        ) : (
          <div className="h-[760px] overflow-y-auto rounded-xl border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/thumbs/templates/${slug}-full.jpg`} alt={`The whole ${name} page, top to bottom`} className="block w-full" />
          </div>
        )}
        {view === "whole" && (
          <p className="mt-2 text-xs text-muted-foreground">
            Screenshot in the template&apos;s own theme. Scroll inside it to see every section.
          </p>
        )}
      </div>
      <div className="xl:sticky xl:top-24">
        <UsePanel target={{ kind: "template", slug, name, sections, dependencies }} theme={theme} themeName={themeName} />
      </div>
    </div>
  );
}
