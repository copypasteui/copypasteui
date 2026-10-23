import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/config";
import { canonical } from "@/lib/seo";

export const metadata = {
  ...canonical("/privacy"),
  title: "Privacy policy",
  description:
    "What CopyPasteUI collects (very little), how visits are counted without cookies, what stays in your browser, which outside services the site uses, and your rights.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="CopyPasteUI has no accounts, no sign-up forms and no cookies. We count visits with Cloudflare Web Analytics, which doesn't track you across sites. This page explains the little that is collected, by whom, and what you can do about it."
    >
      <section>
        <h2>The short version</h2>
        <ul>
          <li>We don&apos;t ask for your name, email or anything else to use the site, and we don&apos;t set cookies.</li>
          <li>Business details you type on a template page stay in your browser. They are never sent to us.</li>
          <li>Like every website, our host keeps basic server logs (such as your IP address) to deliver pages and keep the site secure.</li>
          <li>Template and theme previews load fonts from Google Fonts and photos from Unsplash, so those services see your IP address.</li>
          <li>
            We count visits with Cloudflare Web Analytics. It sets no cookies, stores nothing on your device and doesn&apos;t follow you to
            other sites; we only see totals, such as page views per page and visitors per country.
          </li>
          <li>There are no ads on the site. If that ever changes, this page will say so first.</li>
          <li>We never sell your data.</li>
        </ul>
      </section>

      <section>
        <h2>Who runs this site</h2>
        <p>
          CopyPasteUI (copypasteui.dev) is run by {legal.operator}, who is responsible for your data under this policy. For anything about
          privacy, email <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </section>

      <section>
        <h2>What is collected, and why</h2>
        <p>
          <b>Server logs.</b> When you visit, our hosting provider (currently GitHub Pages) receives the usual technical details: IP
          address, browser and device type, the page requested and the time. They&apos;re used to deliver the site, prevent abuse and fix
          problems, and are kept only as long as the host&apos;s own policy allows. We don&apos;t combine them with anything else.
        </p>
        <p>
          <b>Visit statistics.</b> When you open a page on copypasteui.dev, a small Cloudflare Web Analytics script reports the page
          address, the page that linked to it, your browser, operating system and device type, your country (worked out from your IP
          address) and how quickly the page loaded. Cloudflare doesn&apos;t use cookies or local storage for this and doesn&apos;t build a
          profile of you. We see only the totals, never individual visits or IP addresses, and use them to learn which templates people use
          and which pages are slow. Previews of templates and sections, and the npm package, don&apos;t send anything.
        </p>
        <p>
          <b>Your business details.</b> The optional fields on template pages (business name, what you do, town, phone and email) are saved
          in your browser&apos;s local storage so you don&apos;t have to type them again, and added to the prompt when you press copy. They
          never leave your device unless you paste that prompt somewhere. To remove them, empty the fields or clear this site&apos;s data in
          your browser.
        </p>
        <p>
          <b>Your website plan.</b> Answers on the Plan page are saved the same way, in your browser only, so you can come back and finish.
          They go into the prompt or the plan file only when you copy or download it. &ldquo;Start a new plan&rdquo; clears them.
        </p>
        <p>
          <b>Emails you send us.</b> If you write to us, we keep your message and address to reply, and delete them when they&apos;re no
          longer needed.
        </p>
        <p>
          <b>Contributions.</b> If you contribute on GitHub, your GitHub username appears as the author of your work, as you&apos;d expect.
          GitHub&apos;s own privacy policy covers your account there.
        </p>
      </section>

      <section>
        <h2>Outside services the site uses</h2>
        <ul>
          <li>
            <b>Google Fonts</b> (fonts.googleapis.com, fonts.gstatic.com) serves the typefaces of each theme when you preview a template,
            section or theme (the site&apos;s own fonts are served by us), which means Google receives your IP address and browser details.{" "}
            <a href="https://developers.google.com/fonts/faq/privacy">Google Fonts privacy FAQ</a>.
          </li>
          <li>
            <b>Cloudflare Web Analytics</b> (static.cloudflareinsights.com, cloudflareinsights.com) counts visits as described above.{" "}
            <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.
          </li>
          <li>
            <b>Unsplash</b> (images.unsplash.com) serves the photos in previews and templates.{" "}
            <a href="https://unsplash.com/privacy">Unsplash privacy policy</a>.
          </li>
          <li>
            <b>Links to other sites</b>, such as GitHub and the AI tools we link to, are covered by their own policies once you leave.
          </li>
        </ul>
      </section>

      <section>
        <h2>The MCP server and CLI</h2>
        <p>
          The <code>copypasteui</code> npm package runs on your own computer. It downloads the public library files from copypasteui.dev
          (which appear in our host&apos;s logs like any page visit), keeps a cache in your home folder, and only reads or writes files in
          the folders you point it at. It sends no telemetry or usage data anywhere.
        </p>
      </section>

      <section>
        <h2>Legal bases</h2>
        <p>
          For visitors in the UK and EU: server logs, visit statistics and the outside services above are used on the basis of legitimate
          interests (running a secure, working website and knowing which parts of it people use). Saving your business details in your
          browser happens only because you typed them in, for the feature you asked for.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Wherever you are, you can ask what we hold about you, ask us to correct or delete it, or object to how it&apos;s used. Email{" "}
          <a href={`mailto:${legal.email}`}>{legal.email}</a> and we&apos;ll reply within a month. In practice we hold almost nothing that
          can be linked to you.
        </p>
        <ul>
          <li>
            <b>UK and EU:</b> you also have rights to restrict processing and to data portability, and you can complain to your data
            protection authority (in the UK, the <a href="https://ico.org.uk/make-a-complaint/">ICO</a>).
          </li>
          <li>
            <b>US states with privacy laws (such as California):</b> we don&apos;t sell or share personal information.
          </li>
          <li>
            <b>India:</b> you can raise a grievance or exercise your rights under the Digital Personal Data Protection Act by emailing the
            address above.
          </li>
        </ul>
      </section>

      <section>
        <h2>Transfers, children and changes</h2>
        <p>
          The services above may process data outside your country (for example in the US); they rely on their own safeguards for this. The
          site isn&apos;t aimed at children under 13. If this policy changes, the date at the top changes too.
        </p>
        <p>
          More about storage in your browser: see the <Link href="/cookies">cookie policy</Link>. The rules for using the site and the code
          are in the <Link href="/terms">terms of use</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
