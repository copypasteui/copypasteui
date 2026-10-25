"use client";

const plans = [
  { name: "Ticket", price: "£9", per: "a film", points: ["£7 for students and over-65s", "£4 for under-14s at kids' screenings"] },
  {
    name: "Card",
    price: "£40",
    per: "a year",
    points: ["£6 tickets, for you and one guest", "One free film every three months", "10% off at the bar"],
    featured: true,
  },
  {
    name: "Projectionist",
    price: "£90",
    per: "a year",
    points: ["Everything on the Card", "Unlimited tickets to 35mm screenings", "Your name on the seat of your choice"],
  },
];

export default function UndercroftMembership() {
  return (
    <section id="membership" className="bg-background px-6 py-16 font-sans text-foreground md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="border-b border-foreground pb-6 font-display text-5xl font-medium tracking-tight md:text-7xl">
          Tickets and membership
        </h2>
        <div className="grid border-b border-foreground md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col border-foreground px-0 py-8 md:border-r md:px-6 md:last:border-r-0 ${p.featured ? "md:bg-accent md:text-accent-foreground" : ""}`}
            >
              <h3 className="text-sm font-bold uppercase">{p.name}</h3>
              <p className="mt-4">
                <span className="font-display text-6xl font-medium">{p.price}</span> <span>{p.per}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span aria-hidden>+</span> {x}
                  </li>
                ))}
              </ul>
              {p.name !== "Ticket" && (
                <a href="#" className="mt-8 w-fit bg-primary px-5 py-3 text-sm font-bold text-primary-foreground uppercase">
                  Join as {p.name.toLowerCase()}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
