import NotFoundContent from "@/components/NotFoundContent";

// notFound() inside the site (an unknown template, a section under the wrong category): the site layout
// already supplies the header and footer, so only the content goes here.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
