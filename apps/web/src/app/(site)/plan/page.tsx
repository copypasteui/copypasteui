import PlanWizard, { type PlanData } from "@/components/PlanWizard";
import { recipes } from "@/lib/recipes";
import { components, templates, themes } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/plan"),
  title: "Plan your website",
  description:
    "Answer a few questions about your business and get one prompt for Lovable, Bolt, v0 or ChatGPT, or a plan file for Claude Code and Cursor.",
};

export default function PlanPage() {
  // Only what planning needs: the full registry (code and prompts) stays out of the page.
  const used = new Set(templates.flatMap((t) => t.sections));
  const data: PlanData = {
    templates: templates.map(({ slug, name, description, brief, theme, sections }) => ({
      slug,
      name,
      description,
      brief,
      theme,
      sections,
    })),
    components: components.filter((c) => used.has(c.slug)).map(({ slug, category }) => ({ slug, category })),
    recipes: recipes.map(({ slug, name, covers }) => ({ slug, name, covers })),
    themes: themes.map(({ slug, name }) => ({ slug, name })),
  };
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Website plan</p>
      <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        What does <span className="highlight">your business</span> need from its website?
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        We&apos;ll ask what you do, where you are and what customers should do when they land on your site. At the end you copy one prompt
        into Lovable, Bolt, v0 or ChatGPT. Using Claude Code or Cursor? Download the plan as a file instead.
      </p>
      <PlanWizard data={data} />
    </main>
  );
}
