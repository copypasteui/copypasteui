"use client";

import { ArrowUpRight } from "lucide-react";
import PreviewFrame, { type ThemeOption } from "@/components/PreviewFrame";
import UsePanel from "@/components/UsePanel";
import { useThemeParam } from "@/lib/useThemeParam";

/** Section page top: live preview on the left, the two-door panel on the right. */
export default function ComponentDetail({
  slug,
  name,
  code,
  dependencies,
  previewSrc,
  themeOptions,
  defaultTheme,
}: {
  slug: string;
  name: string;
  code: string;
  dependencies: string[];
  previewSrc: string;
  themeOptions: ThemeOption[];
  defaultTheme: string;
}) {
  const [theme, setTheme] = useThemeParam(defaultTheme, themeOptions);
  const themeName = themeOptions.find((t) => t.slug === theme)?.name ?? theme;

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
      <div className="min-w-0">
        <div className="mb-3 flex justify-end">
          <a
            href={`${previewSrc}?theme=${theme}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold hover:highlight"
          >
            Open full screen <ArrowUpRight className="size-4" />
          </a>
        </div>
        <PreviewFrame src={previewSrc} themes={themeOptions} theme={theme} onThemeChange={setTheme} />
      </div>
      <div className="xl:sticky xl:top-24">
        <UsePanel target={{ kind: "component", slug, name, dependencies, code }} theme={theme} themeName={themeName} />
      </div>
    </div>
  );
}
