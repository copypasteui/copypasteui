import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CopyText from "@/components/CopyText";
import { industries } from "@/lib/industries";
import { templates } from "@/lib/registry";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/get-started"),
  title: "Get started: build your small-business website with AI",
  description:
    "Pick a free template, add your business details, paste one prompt into ChatGPT, Replit, Lovable, Bolt, v0, Claude or Gemini, then publish and connect your domain. Step by step, no coding.",
};

// Ordered by how many people use each tool (2026 figures); keep in step with the template page and homepage.
const tools = [
  {
    name: "ChatGPT",
    href: "https://chatgpt.com/",
    kind: "Chat",
    how: "Start a new chat, paste the prompt and ask for a single-page site you can preview. Great for trying a template; for a live site, a builder below is easier.",
  },
  {
    name: "Replit",
    href: "https://replit.com/",
    kind: "Builder",
    how: "Create a new app with Replit's agent, paste the prompt as the first message, then deploy it to put it online.",
  },
  {
    name: "Lovable",
    href: "https://lovable.dev/",
    kind: "Builder",
    how: "Start a new project and paste the prompt as your first message. When it looks right, publish it.",
  },
  {
    name: "Bolt",
    href: "https://bolt.new/",
    kind: "Builder",
    how: "Paste the prompt on the start screen. Bolt builds and previews it, then you deploy it.",
  },
  {
    name: "v0",
    href: "https://v0.app/",
    kind: "Builder",
    how: "Paste the prompt into a new chat. v0 uses the same building blocks as our sections, so the result comes out closest to the preview.",
  },
  {
    name: "Claude",
    href: "https://claude.ai/",
    kind: "Chat",
    how: "Paste the prompt into a new chat. Claude shows the page as a preview you can change, then gives you the files.",
  },
  {
    name: "Gemini",
    href: "https://gemini.google.com/",
    kind: "Chat",
    how: "Paste the prompt into a new chat to preview the page and get the code.",
  },
];

const refine = `Thanks. Now a few more details:
- Address: …
- Opening hours: …
- Prices or services to show: …
- Things customers often ask: …
Use them everywhere the sample details appear, and remove anything we don't offer.`;

const nextSteps = [
  {
    title: "Get found on Google",
    body: "Claim your free Google Business Profile and add the website link. It's what shows up on Maps and in local searches. For most small businesses it brings more visits than the website itself.",
    link: { label: "Google Business Profile", href: "https://www.google.com/business/" },
  },
  {
    title: "Take bookings",
    body: "Most templates come with a booking section. Ask your AI tool to connect it to the service you use: Cal.com (free), Calendly, OpenTable or ResDiary for restaurants, or Fresha for salons. It puts that service's booking link or embed into the section.",
  },
  {
    title: "Get messages from the contact form",
    body: "Forms need somewhere to send messages. Free services like Formspree or Web3Forms give you a form address in two minutes; ask your AI tool to connect the contact section to it.",
  },
  {
    title: "Add a privacy page",
    body: "If you take bookings, payments or emails, you need a privacy page. In the UK and EU you also need a cookie banner if anything sets tracking cookies. Our ready-made privacy & terms page and cookie banner match whichever template you picked.",
    link: { label: "Utility pages", href: "/components/pages" },
  },
  {
    title: "Cover the in-between moments",
    body: "A friendly 404 page for old links, a thank-you page after forms, a closed-for-holidays banner and a coming-soon page before launch, all in the same look as your site.",
    link: { label: "Utility pages", href: "/components/pages" },
  },
  {
    title: "Run it yourself",
    body: "Want to change prices, mark dishes sold out, see bookings and reply to enquiries without asking anyone? The back-office screens add an owner's area behind a sign-in, in the same look as your site. Pick where the data lives (your builder's own backend, Supabase, Firebase or others) and paste that setup prompt too.",
    link: { label: "Back office screens", href: "/components/admin#backend" },
  },
  {
    title: "See who visits",
    body: "Cloudflare Web Analytics and Plausible count visitors without cookies, so you don't need a cookie banner for them.",
  },
];

const faqs = [
  {
    q: "What does it cost?",
    a: "CopyPasteUI is free. Your AI builder may have a free tier and a paid plan for publishing on your own domain (typically £15–25 a month), and a domain costs around £10–15 a year.",
  },
  {
    q: "Do I own the website?",
    a: "Yes. The site you build is yours to keep, change and move, including sites you build for clients. Most builders also let you download the code.",
  },
  {
    q: "Do I need a developer?",
    a: "Not to get a good first version live. You may want one later for things like online payments, a members area or connecting to software you already use.",
  },
  {
    q: "Can I change things after it's live?",
    a: "Yes. Go back to the same chat or project and ask for the change in plain words (“add a summer menu”, “change the phone number”). Then publish again.",
  },
];

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section id={`step-${n}`} className="grid scroll-mt-24 gap-4 border-t border-foreground py-10 md:grid-cols-[4rem_1fr]">
    <p className="font-mono text-3xl font-semibold text-muted-foreground">{String(n).padStart(2, "0")}</p>
    <div className="min-w-0">
      <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-4 max-w-2xl space-y-4 text-muted-foreground">{children}</div>
    </div>
  </section>
);

const Shot = ({ src, alt, w, h, className = "" }: { src: string; alt: string; w: number; h: number; className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    width={w}
    height={h}
    loading="lazy"
    className={`rounded-lg border border-foreground shadow-[4px_4px_0_var(--foreground)] ${className}`}
  />
);

export default function GetStartedPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">Get started · no coding</p>
      <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Your business website, built by AI from a <span className="highlight">real design</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Pick a template made for your kind of business, add your details, paste one prompt into the AI tool you already use, and publish.
        Most people have a first version in under an hour.
      </p>
      <nav aria-label="Steps" className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {["Pick", "Personalise", "Paste", "Refine", "Check", "Publish", "Next steps"].map((s, i) => (
          <a key={s} href={`#step-${i + 1}`} className="text-muted-foreground hover:text-foreground">
            <span className="font-mono">{i + 1}.</span> {s}
          </a>
        ))}
      </nav>
      <p className="mt-6 text-sm text-muted-foreground">
        Not sure which template or pages you need?{" "}
        <Link href="/plan" className="font-semibold text-foreground hover:highlight">
          Answer a few questions and get one prompt →
        </Link>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Comfortable with code or an AI editor like Claude Code or Cursor?{" "}
        <Link href="/developers" className="font-semibold text-foreground hover:highlight">
          Use the developer route →
        </Link>
      </p>

      <div className="mt-12">
        <Step n={1} title="Pick a template for your kind of business">
          <p>
            Each one is a complete site with its own colours, fonts and photos, written for one trade. Every word gets rewritten for you in
            the next steps.
          </p>
          <ul className="flex flex-wrap gap-2">
            {industries.map((g) => (
              <li key={g.id}>
                <Link
                  href={`/templates#${g.id}`}
                  className="inline-block rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:border-foreground"
                >
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
          <Shot src="/guide/pick.jpg" alt="The templates page, grouped by industry" w={1600} h={900} className="w-full" />
          <p>
            <Link href="/templates" className="inline-flex items-center gap-1 font-semibold text-foreground hover:highlight">
              See all {templates.length} templates <ArrowRight className="size-4" />
            </Link>
          </p>
        </Step>

        <Step n={2} title="Add your details and copy the prompt">
          <div className="grid gap-6 sm:grid-cols-[1fr_16rem] sm:items-start">
            <div className="space-y-4">
              <p>
                On the template page, fill in your business name, what you do, your town and a phone number or email. They&apos;re optional
                and stay in your browser, but with them the AI writes the whole site about <em>you</em> from the first try.
              </p>
              <p>
                Pick a different look in the preview if you like, then press <b className="text-foreground">Copy full-page prompt</b>.
                It&apos;s long on purpose: it carries the whole design, so the AI rebuilds it properly instead of guessing.
              </p>
            </div>
            <Shot
              src="/guide/personalise.jpg"
              alt="The template page panel with a business name, trade, town and phone filled in above the Copy full-page prompt button"
              w={384}
              h={600}
              className="w-full max-w-64"
            />
          </div>
        </Step>

        <Step n={3} title="Paste it into your AI tool">
          <p>Builders give you a live site at the end; chat tools are great for trying things out. Ordered by how many people use them:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {tools.map((t) => (
              <div key={t.name} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                <p className="flex items-baseline justify-between gap-2">
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="font-semibold hover:highlight">
                    {t.name} ↗
                  </a>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">{t.kind}</span>
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.how}</p>
              </div>
            ))}
          </div>
        </Step>

        <Step n={4} title="Refine it in plain words">
          <p>When the first version is ready, send what the four fields didn&apos;t cover:</p>
          <CopyText text={refine} label="Copy message" />
          <p>
            Then swap the sample photos for your own: real photos of your place, team and work make the biggest difference. Replace the
            photos of people in reviews and team sections before you go live: they are stock models, not your customers or staff. Ask for
            one change at a time (&ldquo;make the menu two columns&rdquo;, &ldquo;use our logo&rdquo;) and check after each.
          </p>
        </Step>

        <Step n={5} title="Check it on your phone">
          <p>
            Most of your visitors will be on a phone. Open the preview link on yours: tap every button, check the phone number rings you and
            the map shows the right place. Read every line once, because AI tools sometimes leave a sample detail behind.
          </p>
        </Step>

        <Step n={6} title="Publish and connect your domain">
          <p>Use your tool&apos;s Publish or Deploy button to get a live link. Then, to use your own address:</p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <b className="text-foreground">Buy the domain</b> (yourbusiness.co.uk or .com) from any registrar; Cloudflare, Namecheap and
              Porkbun are good value. If you already own one, skip this.
            </li>
            <li>
              <b className="text-foreground">Add it in your builder&apos;s domain settings.</b> It shows you one or two records to add,
              usually an <code className="font-mono text-sm text-foreground">A</code> record for the bare domain and a{" "}
              <code className="font-mono text-sm text-foreground">CNAME</code> for{" "}
              <code className="font-mono text-sm text-foreground">www</code>.
            </li>
            <li>
              <b className="text-foreground">Paste those records into your registrar&apos;s DNS page.</b> Leave any existing{" "}
              <code className="font-mono text-sm text-foreground">MX</code> or{" "}
              <code className="font-mono text-sm text-foreground">TXT</code> records alone: they run your email.
            </li>
            <li>
              <b className="text-foreground">Wait.</b> It usually works within an hour, sometimes up to a day. The padlock (HTTPS) is added
              automatically.
            </li>
          </ol>
        </Step>

        <Step n={7} title="Next steps">
          <div className="grid gap-4 sm:grid-cols-2">
            {nextSteps.map((s) => (
              <div key={s.title} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                <p className="font-semibold">{s.title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
                {s.link && (
                  <a
                    href={s.link.href}
                    {...(s.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-2 inline-block text-sm font-semibold hover:highlight"
                  >
                    {s.link.label} {s.link.href.startsWith("http") ? "↗" : "→"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Step>
      </div>

      <section className="border-t border-foreground py-10">
        <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">Questions</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold">
                <span className="mr-2 inline-block transition group-open:rotate-45">+</span>
                {f.q}
              </summary>
              <p className="mt-2 max-w-3xl pl-6 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-foreground pt-10 sm:flex-row sm:items-center">
        <Link
          href="/templates"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-6 py-3 font-semibold text-background shadow-[0_3px_0_var(--accent)]"
        >
          Pick a template <ArrowRight className="size-4" />
        </Link>
        <p className="text-sm text-muted-foreground">Free for any business website, including sites you build for clients.</p>
      </div>
    </main>
  );
}
