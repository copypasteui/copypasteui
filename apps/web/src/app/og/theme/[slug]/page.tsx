import { notFound } from "next/navigation";
import { getTheme, themes } from "@/lib/registry";
import OgFrame from "../../OgFrame";

export const generateStaticParams = () => themes.map((t) => ({ slug: t.slug }));
export const dynamicParams = false;
export const metadata = { robots: { index: false } };

export default async function ThemeOg({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTheme((await params).slug);
  if (!t) notFound();
  return (
    <OgFrame
      kicker="Theme"
      title={t.name}
      description={t.description}
      image={`/thumbs/themes/${t.slug}.jpg`}
      imageAlt={`${t.name} theme preview`}
    >
      <div className="absolute bottom-10 left-[600px] flex gap-3 rounded-full bg-background/95 p-3 shadow-2xl">
        {(["primary", "accent", "secondary", "background", "foreground"] as const).map((k) => (
          <span key={k} className="size-12 rounded-full ring-2 ring-black/10" style={{ background: t.light[k] }} />
        ))}
      </div>
    </OgFrame>
  );
}
