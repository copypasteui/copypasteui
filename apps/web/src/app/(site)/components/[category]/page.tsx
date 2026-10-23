import { notFound } from "next/navigation";
import BackendPicker from "@/components/BackendPicker";
import ComponentBrowser from "@/components/ComponentBrowser";
import { recipes } from "@/lib/recipes";
import { categories, components, defaultTheme, getCategory, summarize } from "@/lib/registry";
import { JsonLd, breadcrumbs, canonical } from "@/lib/seo";

export const generateStaticParams = () => categories.filter((c) => c.count > 0).map((c) => ({ category: c.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  return c
    ? {
        ...canonical(`/components/${c.slug}`),
        title: `${c.name} sections`,
        description: `${c.count} free ${c.name.toLowerCase()} sections for React and Tailwind, ready to paste into Lovable, Bolt, v0 or Cursor, or install with the MCP or shadcn CLI.`,
      }
    : { title: "Sections" };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbs([
          ["Sections", "/components"],
          [cat.name, `/components/${category}`],
        ])}
      />
      <h1 className="font-display text-4xl font-extrabold tracking-tight">{cat.name}</h1>
      <p className="mt-2 text-muted-foreground">
        Free {cat.name.toLowerCase()} sections for small-business sites. Preview any of them in any theme, then copy the prompt or install
        it.
      </p>
      {category === "admin" && (
        <div className="mt-8">
          <BackendPicker recipes={recipes} />
        </div>
      )}
      <div className="mt-10">
        <ComponentBrowser
          items={components.filter((c) => c.category === category).map(summarize)}
          categories={categories}
          active={category}
          theme={defaultTheme}
        />
      </div>
    </main>
  );
}
