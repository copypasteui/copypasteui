import { themes } from "@/lib/registry";

export const themeOptions = themes.map((t) => ({ slug: t.slug, name: t.name, swatch: t.light.primary }));
