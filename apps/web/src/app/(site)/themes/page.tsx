import ThemesExplorer from "@/components/ThemesExplorer";
import { defaultTheme, getTheme, templates, themes } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/themes"),
  title: "Themes",
  description:
    "Colours, corners and fonts that restyle every CopyPasteUI template and section at once, in light and dark. Works with shadcn/ui projects too.",
  openGraph: { images: [getTheme("midnight")?.thumbnailUrl ?? ""].filter(Boolean) },
};

// The template the theme thumbnails are shot on; a neutral page that shows colours and type well.
const SHOWCASE = "ledger-accountants";

export default function ThemesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Themes</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A theme is a look: colours for light and dark, how round the corners are, and two fonts. Some also set a style, such as hard
        shadows, glass panels or a printed texture. Every template and section follows it, so the whole site changes at once. Pick one below
        to see it on a real page. The values follow shadcn/ui, so existing shadcn projects work as they are.
      </p>
      <ThemesExplorer
        themes={themes.map(({ slug, name, description, light, dark, fonts, radius, style, googleFontsUrl, license }) => ({
          slug,
          name,
          description,
          light,
          dark,
          fonts,
          radius,
          look: style.label ?? null,
          googleFontsUrl,
          license,
        }))}
        templates={templates.map(({ slug, name }) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name))}
        defaultTheme={defaultTheme}
        defaultTemplate={templates.some((t) => t.slug === SHOWCASE) ? SHOWCASE : templates[0]!.slug}
      />
    </main>
  );
}
