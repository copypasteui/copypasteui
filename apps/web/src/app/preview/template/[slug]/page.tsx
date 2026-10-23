import { notFound } from "next/navigation";
import { getTemplate, templates, themeTokens } from "@/lib/registry";
import PreviewRenderer from "../../PreviewRenderer";

export const generateStaticParams = () => templates.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;
export const metadata = { robots: { index: false } };

export default async function TemplatePreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return <PreviewRenderer slugs={template.sections} themes={themeTokens} initialTheme={template.theme} />;
}
