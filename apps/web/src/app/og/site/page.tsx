import { components, templates, themes } from "@/lib/registry";
import OgFrame from "../OgFrame";

export const metadata = { robots: { index: false } };

export default function SiteOg() {
  const picks = components.filter((c) => c.featured).slice(0, 9);
  return (
    <OgFrame
      kicker={`${templates.length} templates · free`}
      title="Small-business websites for your AI builder."
      description={`Restaurants, salons, garages and vets: ${components.length} sections and ${themes.length} themes, in one prompt or a local MCP.`}
    >
      <div className="absolute top-[-60px] left-[560px] grid w-[820px] rotate-[-8deg] grid-cols-3 gap-4">
        {picks.map((c) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.slug}
            src={`/thumbs/components/${c.slug}.jpg`}
            alt=""
            className="aspect-[16/10] w-full rounded-lg border border-background/20 object-cover shadow-2xl"
          />
        ))}
      </div>
    </OgFrame>
  );
}
