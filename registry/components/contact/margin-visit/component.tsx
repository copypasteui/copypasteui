"use client";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const hours = [
  ["Monday to Wednesday", "9am to 6pm"],
  ["Thursday", "9am to 8pm"],
  ["Friday and Saturday", "9am to 6pm"],
  ["Sunday", "11am to 5pm"],
];

export default function MarginVisit() {
  return (
    <section className="bg-background px-6 py-20 font-sans text-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <img
          src={img("photo-1674476803343-2a2c7678d367")}
          alt="Open book on a café table next to a cup of coffee"
          className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover"
        />
        <div>
          <h2 className="font-display text-5xl md:text-6xl">Visit the shop</h2>
          <p className="mt-6 text-lg">41 Bruntsfield Place, Edinburgh EH10 4HJ</p>
          <p className="mt-1">
            <a href="tel:01314960265" className="underline underline-offset-4">
              0131 496 0265
            </a>{" "}
            · orders@margin.example
          </p>
          <dl className="mt-8 border-t border-border">
            {hours.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 border-b border-border py-3">
                <dt>{d}</dt>
                <dd className="font-semibold">{h}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            The café serves until 30 minutes before closing. The ground floor is step-free; the children&apos;s room upstairs has a stair
            lift.
          </p>
        </div>
      </div>
    </section>
  );
}
