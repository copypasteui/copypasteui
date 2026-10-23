import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/config";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/cookies"),
  title: "Cookie policy",
  description: "CopyPasteUI sets no cookies, ours or anyone else's. What is stored in your browser, and how to clear it.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" intro="CopyPasteUI doesn't use cookies, ours or anyone else's. That's why there's no cookie banner.">
      <section>
        <h2>What&apos;s stored in your browser</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-foreground">
              <tr>
                <th className="py-2 pr-4 font-semibold">Name</th>
                <th className="py-2 pr-4 font-semibold">Type</th>
                <th className="py-2 pr-4 font-semibold">What it&apos;s for</th>
                <th className="py-2 font-semibold">How long</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border align-top">
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">copypasteui:business</td>
                <td className="py-3 pr-4">Local storage (set by us)</td>
                <td className="py-3 pr-4">
                  The business details you choose to type on a template page, so they&apos;re filled in next time. Never sent to us.
                </td>
                <td className="py-3">Until you clear the fields or this site&apos;s data</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">copypasteui:plan</td>
                <td className="py-3 pr-4">Local storage (set by us)</td>
                <td className="py-3 pr-4">Your answers on the Plan page, so you can come back and finish. Never sent to us.</td>
                <td className="py-3">Until you start a new plan or clear this site&apos;s data</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs">copypasteui:color-mode</td>
                <td className="py-3 pr-4">Local storage (set by us)</td>
                <td className="py-3 pr-4">Light or dark colours, if you picked one instead of following your device. Never sent to us.</td>
                <td className="py-3">Until you pick &ldquo;System&rdquo; or clear this site&apos;s data</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Local storage isn&apos;t a cookie: it isn&apos;t sent with any request and only this site can read it. We use it because you asked
          for the feature by typing your details.
        </p>
      </section>

      <section>
        <h2>Fonts, photos and visit counts</h2>
        <p>
          Google Fonts and Unsplash serve the typefaces and photos in template and theme previews. They don&apos;t set cookies here, but
          like any server they receive your IP address (see the <Link href="/privacy">privacy policy</Link>).
        </p>
        <p>
          Cloudflare Web Analytics counts visits without cookies or local storage, so it doesn&apos;t appear in the table above and
          doesn&apos;t need a banner.
        </p>
      </section>

      <section>
        <h2>Clearing or blocking storage</h2>
        <p>
          Every browser lets you see and delete what a site has stored: look for &ldquo;site data&rdquo; or &ldquo;cookies and site
          data&rdquo; in its settings. The site works fine with storage blocked; you&apos;ll just have to type your business details each
          time.
        </p>
        <p>
          Questions: <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
