import { config } from "@/lib/config";

/**
 * Cloudflare Web Analytics: no cookies, no storage, no cross-site tracking (see the privacy page). Only on site pages,
 * only when a token is set, and only on the real domain, so local builds, previews and CI screenshots aren't counted.
 */
export default function Analytics() {
  if (!config.cfBeaconToken) return null;
  const host = new URL(config.siteUrl).hostname;
  const load = `if(location.hostname===${JSON.stringify(host)}){var s=document.createElement("script");s.defer=true;s.src="https://static.cloudflareinsights.com/beacon.min.js";s.setAttribute("data-cf-beacon",${JSON.stringify(JSON.stringify({ token: config.cfBeaconToken }))});document.body.appendChild(s)}`;
  return <script dangerouslySetInnerHTML={{ __html: load }} />;
}
