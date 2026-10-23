import { notFound } from "next/navigation";
import { getTemplate, templates } from "@/lib/registry";
import OgFrame from "../../OgFrame";

export const generateStaticParams = () => templates.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;
export const metadata = { robots: { index: false } };

export default async function TemplateOg({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTemplate((await params).slug);
  if (!t) notFound();
  return (
    <OgFrame
      kicker={`Template · ${t.sections.length} sections`}
      title={t.name.split(" — ")[1] ?? t.name}
      description={t.description}
      image={`/thumbs/templates/${t.slug}.jpg`}
      imageAlt={`${t.name} preview`}
    />
  );
}
