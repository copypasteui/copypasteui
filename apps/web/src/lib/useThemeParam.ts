"use client";

import { useEffect, useState } from "react";

/**
 * The theme a template or section page shows, starting from `?theme=` in the address when it names a real
 * theme (so "Use this theme" on the Themes page carries over), and written back as it changes, so the link
 * shares what you're looking at. The page is static, so the address is read after the first render.
 */
export function useThemeParam(defaultTheme: string, known: { slug: string }[]) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("theme");
    if (asked && asked !== defaultTheme && known.some((t) => t.slug === asked)) setTheme(asked);
  }, [defaultTheme, known]);

  const choose = (slug: string) => {
    setTheme(slug);
    const url = new URL(window.location.href);
    if (slug === defaultTheme) url.searchParams.delete("theme");
    else url.searchParams.set("theme", slug);
    history.replaceState(null, "", url);
  };

  return [theme, choose] as const;
}
