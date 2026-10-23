import { notFound } from "next/navigation";
import { components, defaultTheme, getComponent, themeTokens } from "@/lib/registry";
import PreviewRenderer from "../PreviewRenderer";

export const generateStaticParams = () => components.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;
export const metadata = { robots: { index: false } };

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = getComponent(slug);
  if (!component) notFound();
  return (
    <PreviewRenderer slugs={[slug]} themes={themeTokens} initialTheme={component.theme ?? defaultTheme} category={component.category} />
  );
}
