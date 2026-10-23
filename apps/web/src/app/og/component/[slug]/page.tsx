import { notFound } from "next/navigation";
import { components, getCategory, getComponent } from "@/lib/registry";
import OgFrame from "../../OgFrame";

export const generateStaticParams = () => components.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;
export const metadata = { robots: { index: false } };

export default async function ComponentOg({ params }: { params: Promise<{ slug: string }> }) {
  const c = getComponent((await params).slug);
  if (!c) notFound();
  return (
    <OgFrame
      kicker={getCategory(c.category)?.name ?? c.category}
      title={c.name}
      description={c.description}
      image={`/thumbs/components/${c.slug}.jpg`}
      imageAlt={`${c.name} preview`}
    />
  );
}
