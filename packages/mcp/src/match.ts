// Matching a plain-words business ("wedding photographer in York") to the templates that fit.
// Pure, so the website's plan page uses the same matching as the MCP.
type Matchable = { slug: string; name: string; description: string; brief?: string | undefined };

// Words people use that the template briefs don't.
const SYNONYMS: Record<string, string> = {
  cafe: "café coffee",
  coffee: "café coffee",
  pizza: "restaurant trattoria",
  pizzeria: "restaurant trattoria",
  takeaway: "restaurant",
  dentist: "dentist clinic",
  dental: "dentist clinic",
  hearing: "hearing audiologist",
  audiology: "audiologist hearing",
  doctor: "gp clinic",
  therapist: "massage wellness clinic",
  plumbing: "plumber",
  electrical: "electrician",
  roofing: "roofer",
  hairdresser: "hair salon",
  hair: "hair salon",
  nails: "nail salon",
  lawyer: "law solicitor",
  attorney: "law solicitor",
  accounting: "accountant",
  realtor: "estate agent property",
  property: "estate agent property",
  hotel: "hotel",
  airbnb: "holiday b&b",
  bnb: "b&b guesthouse",
  wedding: "wedding venue",
  pub: "pub bar",
  bar: "bar pub",
  gym: "gym fitness",
  pilates: "pilates",
  dog: "dog groomer vet",
  cat: "vet",
  pet: "pet vet",
  garage: "garage car",
  mechanic: "garage car",
  car: "car garage",
  church: "church charity",
  nonprofit: "charity nonprofit",
  school: "school tutor",
  tutor: "tutor school",
  nursery: "nursery preschool",
  photographer: "photographer",
  agency: "agency studio",
  florist: "florist flower",
  flowers: "florist flower",
  farm: "farm",
};

const STOP = new Set(
  "an and the for with my our of in at on near by to small local family run based independent new business company shop".split(" "),
);
const words = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9&]+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
const stem = (w: string) => w.replace(/(ies|es|s)$/, (m) => (m === "ies" ? "y" : ""));

export function rankTemplates<T extends Matchable>(templates: T[], business: string): T[] {
  // The last word usually names the trade ("wedding photographer"), so later words count for more.
  const base = words(business);
  const asked = base.flatMap((w, i) =>
    [w, ...words(SYNONYMS[w] ?? SYNONYMS[stem(w)] ?? "")].map((x) => ({ w: stem(x), weight: 1 + i / Math.max(1, base.length - 1) })),
  );
  return templates
    .map((t) => {
      const brief = words(t.brief ?? "").map(stem);
      const rest = words(`${t.name} ${t.slug} ${t.description}`).map(stem);
      const score = asked.reduce((n, { w, weight }) => n + ((brief.includes(w) ? 5 : 0) + (rest.includes(w) ? 1 : 0)) * weight, 0);
      return { t, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.t);
}
