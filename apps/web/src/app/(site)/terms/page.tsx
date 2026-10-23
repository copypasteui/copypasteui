import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { githubUrl, legal, license } from "@/lib/config";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/terms"),
  title: "Terms of use",
  description:
    "The terms for using copypasteui.dev, the copypasteui.dev npm package and the code they give you: the licence, sample content, updates and liability.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="These terms cover copypasteui.dev, the copypasteui.dev npm package (the MCP server and CLI) and the code you get from them. By using them you agree to these terms."
    >
      <section>
        <h2>Who runs CopyPasteUI</h2>
        <p>
          CopyPasteUI is run by {legal.operator}. Questions about these terms: <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>

      <section>
        <h2>Using the code</h2>
        <p>
          The templates, sections and themes are licensed under <a href={license.url}>{license.name}</a> unless an item says otherwise. Some
          community items are marked MIT, Apache-2.0 or CC0-1.0, and those licences apply to them instead. In short, you can use the code in
          any website or app you build, including paid client work, but not to run a competing template library, theme collection, website
          builder or MCP service. Keep the two notice lines at the top of each file. If these terms and the{" "}
          <a href={`${githubUrl}/blob/main/LICENSE`}>licence</a> ever disagree about the code, the licence wins.
        </p>
      </section>

      <section>
        <h2>Sample content is made up</h2>
        <p>
          The businesses, people, reviews, prices, addresses, phone numbers and emails in templates are fictional, and any likeness to a
          real business is a coincidence. Replace them with your own before you publish. The photos come from Unsplash under the{" "}
          <a href="https://unsplash.com/license">Unsplash licence</a>; photos of people show models, not real customers or staff, so replace
          the ones in reviews and team sections too.
        </p>
        <p>
          What you publish is your responsibility: your words, photos, prices, contact details, and the privacy policy and other notices
          your own site needs.
        </p>
      </section>

      <section>
        <h2>Updates are a plan, not a promise</h2>
        <p>
          We aim to add new templates every month, but that&apos;s a plan, not a commitment. We may add, change or remove templates,
          sections, themes and features at any time, and we may pause or stop the project. A trade you request may never be built. The site,
          its JSON files and the npm package may sometimes be unavailable, and nothing here is guaranteed to stay online.
        </p>
      </section>

      <section>
        <h2>No warranty</h2>
        <p>
          Everything is provided free and &ldquo;as is&rdquo;, without warranties of any kind, including that it&apos;s fit for a particular
          purpose, free of bugs, accessible or compliant with the laws that apply to your site. Check and test what you build before it goes
          live. Code that an AI builder or editor writes from our prompts is that tool&apos;s output, not ours.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          As far as the law allows, we aren&apos;t liable for any loss or damage that comes from using the site, the npm package or the
          code, including lost profits, data or business. Nothing in these terms limits liability that the law doesn&apos;t allow to be
          limited, or takes away rights you have as a consumer.
        </p>
      </section>

      <section>
        <h2>Other services and names</h2>
        <p>
          We link to and write prompts for tools such as Lovable, Bolt, v0, ChatGPT, Claude Code, Cursor and the shadcn CLI, and previews
          load from Google Fonts and Unsplash. Those services have their own terms. CopyPasteUI isn&apos;t affiliated with or endorsed by
          any of them; their names belong to their owners.
        </p>
      </section>

      <section>
        <h2>Contributions</h2>
        <p>
          If you send a template, section or theme, the contribution terms on the <Link href="/contribute">Contribute</Link> page and in{" "}
          <a href={`${githubUrl}/blob/main/CONTRIBUTING.md`}>CONTRIBUTING.md</a> apply, including the licence your work is published under.
        </p>
      </section>

      <section>
        <h2>Privacy and changes</h2>
        <p>
          How we handle data is in the <Link href="/privacy">privacy policy</Link> and the <Link href="/cookies">cookie policy</Link>. If
          these terms change, the date at the top changes too, and the version on this page is the one that applies.
        </p>
      </section>
    </LegalPage>
  );
}
