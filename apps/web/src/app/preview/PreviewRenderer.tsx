"use client";

import { useEffect, useState, type ComponentType } from "react";
import { componentLoaders } from "@/generated/component-map";
import type { ThemeTokens } from "@/lib/registry";

type Mode = "light" | "dark";

function applyTheme(theme: ThemeTokens, mode: Mode) {
  const root = document.documentElement;
  root.classList.add("preview-root");
  root.classList.toggle("dark", mode === "dark");
  for (const [k, v] of Object.entries(theme[mode])) root.style.setProperty(`--${k}`, v);
  root.style.setProperty("--radius", theme.radius);
  for (const [k, v] of Object.entries(theme.styleVars)) root.style.setProperty(k, v);
  const rules =
    document.getElementById("cpui-style-rules") ??
    document.head.appendChild(Object.assign(document.createElement("style"), { id: "cpui-style-rules" }));
  rules.textContent = theme.styleRules;
  root.style.setProperty("--font-sans", theme.fonts.sans);
  root.style.setProperty("--font-display", theme.fonts.display);
  if (theme.googleFontsUrl) {
    const id = `cpui-font-${theme.slug}`;
    if (!document.getElementById(id)) {
      const link = Object.assign(document.createElement("link"), { id, rel: "stylesheet", href: theme.googleFontsUrl });
      document.head.appendChild(link);
    }
  }
}

/** Placeholder page shown under navbars so sticky/scroll behaviour can be tried. */
function PagePlaceholder() {
  return (
    <div aria-hidden className="mx-auto max-w-5xl px-6 py-20">
      <div className="mx-auto h-4 w-32 rounded-full bg-muted" />
      <div className="mx-auto mt-6 h-12 w-3/4 rounded-lg bg-muted" />
      <div className="mx-auto mt-3 h-12 w-1/2 rounded-lg bg-muted" />
      <div className="mx-auto mt-8 h-4 w-2/3 rounded-full bg-muted" />
      <div className="mx-auto mt-10 flex w-fit gap-3">
        <div className="h-11 w-36 rounded-lg bg-primary/30" />
        <div className="h-11 w-36 rounded-lg bg-muted" />
      </div>
      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="mt-6 h-[60vh] rounded-xl bg-muted" />
    </div>
  );
}

/** Renders one or more registry components full-bleed, themed from ?theme=&mode= or parent postMessage. */
export default function PreviewRenderer({
  slugs,
  themes,
  initialTheme,
  category,
}: {
  slugs: string[];
  themes: ThemeTokens[];
  initialTheme: string;
  category?: string;
}) {
  const [loaded, setLoaded] = useState<ComponentType[] | null>(null);
  const [thumb, setThumb] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pick = (slug: string | null) => themes.find((t) => t.slug === slug) ?? themes.find((t) => t.slug === initialTheme) ?? themes[0]!;
    applyTheme(pick(params.get("theme")), params.get("mode") === "dark" ? "dark" : "light");
    setThumb(params.get("frame") === "thumb");

    const onMessage = (e: MessageEvent) => {
      // The preview runs in a sandboxed (opaque-origin) iframe, so trust the embedding window, not an origin.
      if (e.source !== window.parent || e.data?.type !== "cpui-theme") return;
      applyTheme(pick(e.data.theme), e.data.mode === "dark" ? "dark" : "light");
    };
    window.addEventListener("message", onMessage);

    Promise.all(slugs.map((s) => componentLoaders[s]!().then((m) => m.default))).then(setLoaded);
    return () => window.removeEventListener("message", onMessage);
  }, [slugs, themes, initialTheme]);

  // Tell the embedding PreviewFrame we rendered (it falls back if this never arrives).
  useEffect(() => {
    if (loaded && window.parent !== window) window.parent.postMessage({ type: "cpui-ready" }, "*");
  }, [loaded]);

  if (!loaded) return <div className="min-h-screen bg-background" />;
  const navbar = category === "navbar";
  return (
    <main
      className={`min-h-screen bg-background text-foreground ${thumb && !navbar && slugs.length === 1 ? "flex flex-col justify-center [&>*]:w-full" : ""}`}
    >
      {loaded.map((C, i) => (
        <C key={i} />
      ))}
      {navbar && <PagePlaceholder />}
    </main>
  );
}
