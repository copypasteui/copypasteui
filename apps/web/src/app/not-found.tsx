import NotFoundContent from "@/components/NotFoundContent";
import SiteChrome from "@/components/SiteChrome";

// For URLs that match no route at all (and the static 404.html). Pages inside the site that call notFound()
// use app/(site)/not-found.tsx instead, which is already inside the site layout.
export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundContent />
    </SiteChrome>
  );
}
