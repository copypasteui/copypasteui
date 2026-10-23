import Link from "next/link";
import { githubUrl, legal, requestTradeUrl } from "@/lib/config";
import { components, templates, themes } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/about"),
  title: "About",
  description: "Who makes CopyPasteUI, whether it's really free, and what you can do with it.",
};

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="mt-12 font-display text-xl font-bold">{children}</h2>;
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
    {children}
  </a>
);

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">About CopyPasteUI</h1>

      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>
          CopyPasteUI is a library of website templates for small businesses, from bakeries and barbers to garages and vets. So far there
          are {templates.length} templates, built from {components.length} sections and {themes.length} themes. New templates are added
          every month, starting with the trades people ask for, and anyone can send one in. You can copy a template&apos;s prompt into
          Lovable, Bolt, v0 or ChatGPT, add sections to your own project with the shadcn CLI, or let Claude Code or Cursor fetch them
          through the MCP server that runs on your computer. The{" "}
          <Link href="/developers" className="underline underline-offset-2 hover:text-foreground">
            developer page
          </Link>{" "}
          covers the last two.
        </p>
        <p>
          Nidhin Radh makes it in his spare time. He&apos;s a software engineer in Los Angeles who leads engineering teams for a living, and
          he grew up in Wayanad, Kerala, and studied in Kochi. More about him at <A href="https://nidhinradh.dev">nidhinradh.dev</A>.
        </p>
      </div>

      <H2>Is it really free?</H2>
      <p className="mt-3 text-muted-foreground">
        Yes. There&apos;s no paid version and no account to make. The site has no ads and sets no cookies. We count visits with Cloudflare
        Web Analytics, which doesn&apos;t track you across sites: the{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy page
        </Link>{" "}
        has the details.
      </p>

      <H2>What can I do with it?</H2>
      <div className="mt-3 space-y-4 text-muted-foreground">
        <p>
          Use anything here on your own website or on websites you build for clients, including paid work, and change it as much as you
          like.
        </p>
        <p>
          Template footers end with a small &ldquo;Built with CopyPasteUI&rdquo; link. Keeping it helps other small businesses find these
          templates, but it&apos;s up to you: change it or take it out.
        </p>
        <p>
          The one thing you can&apos;t do is use them to run a rival: your own template library, theme collection or website builder, free
          or paid. Each file starts with two short notice lines; leave those in. The details are in the{" "}
          <A href={`${githubUrl}/blob/main/LICENSE`}>licence</A> (PolyForm Shield 1.0.0) and the{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
            terms of use
          </Link>
          .
        </p>
      </div>

      <H2>Can I help?</H2>
      <p className="mt-3 text-muted-foreground">
        If there&apos;s no template for your kind of business, <A href={requestTradeUrl()}>ask for one</A>. If you write code, you can add
        one yourself: see{" "}
        <Link href="/contribute" className="underline underline-offset-2 hover:text-foreground">
          Contribute
        </Link>
        . All the code is on <A href={githubUrl}>GitHub</A>.
      </p>

      <H2>Contact</H2>
      <p className="mt-3 text-muted-foreground">
        For bugs and requests, <A href={`${githubUrl}/issues/new`}>open an issue on GitHub</A>. For privacy questions, email{" "}
        <a href={`mailto:${legal.email}`} className="underline underline-offset-2 hover:text-foreground">
          {legal.email}
        </a>
        .
      </p>
    </main>
  );
}
