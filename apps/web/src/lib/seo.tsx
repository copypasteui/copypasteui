// Canonical URLs and schema.org structured data, so search engines see one address per page
// and know what each page is (a free template, a section, where it sits in the site).
import { config, license } from "@/lib/config";

/** Page metadata `alternates`: the canonical address (relative to metadataBase). */
export const canonical = (path: string) => ({ alternates: { canonical: path } });

export const abs = (path: string) => `${config.siteUrl}${path}`;

export const owner = { "@type": "Person", name: "Nidhin Radh P V", url: "https://nidhinradh.dev" } as const;

/** Home › Templates › Olea, as a BreadcrumbList. The last crumb is the page itself. */
export const breadcrumbs = (trail: [name: string, path: string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"] as [string, string], ...trail].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

/** The fields every free template, section or theme shares. */
export const freeWork = (licenseId?: string) => ({
  isAccessibleForFree: true,
  license: licenseId && licenseId !== license.id ? `https://spdx.org/licenses/${licenseId}.html` : license.url,
  copyrightHolder: owner,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

/** Renders schema.org JSON-LD. `<` is escaped so a description can't close the script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
