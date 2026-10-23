"use client";

import { useState } from "react";
import { Reorder } from "motion/react";
import { Eye, EyeOff, GripVertical, Plus, Trash2 } from "lucide-react";

export type MenuItem = { id: string; name: string; description: string; price: number; tags: string[]; available: boolean };
export type MenuSection = { id: string; name: string; items: MenuItem[] };

const TAGS = ["V", "VG", "GF", "Spicy"];
const sample: MenuSection[] = [
  {
    id: "starters",
    name: "Starters",
    items: [
      { id: "m1", name: "Crab on toast", description: "Brown and white crab, lemon mayo, sourdough", price: 11, tags: [], available: true },
      { id: "m2", name: "Burrata", description: "Blood orange, chilli honey, basil", price: 10, tags: ["V"], available: true },
      { id: "m3", name: "Fish soup", description: "Rouille, gruyère, croutons", price: 9, tags: ["GF"], available: false },
    ],
  },
  {
    id: "mains",
    name: "Mains",
    items: [
      { id: "m4", name: "Whole grilled bream", description: "Salsa verde, charred lemon", price: 26, tags: ["GF"], available: true },
      { id: "m5", name: "Crab linguine", description: "Chilli, garlic, parsley", price: 22, tags: [], available: true },
    ],
  },
];

// Edit the menu (or a product or service list). Load sections from your database and save the whole
// list in onSave — reordering, prices, tags and "sold out" all live in this one structure.
export default function AdminMenuEditor({
  sections: initial = sample,
  onSave,
}: {
  sections?: MenuSection[];
  onSave?: (sections: MenuSection[]) => void;
}) {
  const [sections, setSections] = useState(initial);
  const [active, setActive] = useState(initial[0]?.id ?? "");
  const [dirty, setDirty] = useState(false);
  const section = sections.find((s) => s.id === active);

  const update = (fn: (items: MenuItem[]) => MenuItem[]) => {
    setSections((all) => all.map((s) => (s.id === active ? { ...s, items: fn(s.items) } : s)));
    setDirty(true);
  };
  const edit = (id: string, patch: Partial<MenuItem>) => update((items) => items.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold">Menu</h1>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => {
              onSave?.(sections);
              setDirty(false);
            }}
            className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {dirty ? "Publish changes" : "All changes live"}
          </button>
        </div>
        <div role="tablist" aria-label="Menu sections" className="mt-4 flex flex-wrap gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${active === s.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}
            >
              {s.name} <span className="opacity-90">{s.items.length}</span>
            </button>
          ))}
        </div>

        {section && (
          <Reorder.Group axis="y" values={section.items} onReorder={(items) => update(() => items)} className="mt-4 space-y-2">
            {section.items.map((it) => (
              <Reorder.Item
                key={it.id}
                value={it}
                className={`grid gap-3 rounded-[var(--radius)] border border-border bg-card p-3 text-card-foreground sm:grid-cols-[auto_1fr_7rem_auto] sm:items-center ${it.available ? "" : "border-dashed"}`}
              >
                <GripVertical className="hidden size-4 cursor-grab text-muted-foreground sm:block" aria-hidden />
                <div className="min-w-0 space-y-1.5">
                  <input
                    value={it.name}
                    onChange={(e) => edit(it.id, { name: e.target.value })}
                    aria-label="Dish name"
                    className="w-full rounded-[calc(var(--radius)-2px)] bg-transparent px-1 font-semibold outline-none focus:bg-background"
                  />
                  <input
                    value={it.description}
                    onChange={(e) => edit(it.id, { description: e.target.value })}
                    aria-label="Description"
                    className="w-full rounded-[calc(var(--radius)-2px)] bg-transparent px-1 text-sm text-muted-foreground outline-none focus:bg-background"
                  />
                  <div className="flex flex-wrap gap-1 px-1">
                    {TAGS.map((t) => {
                      const on = it.tags.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => edit(it.id, { tags: on ? it.tags.filter((x) => x !== t) : [...it.tags, t] })}
                          className={`rounded-full border px-2 py-0.5 text-xs ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <label className="flex items-center gap-1 rounded-[var(--radius)] border border-border bg-background px-2 py-1.5 text-sm">
                  £
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={it.price}
                    onChange={(e) => edit(it.id, { price: Number(e.target.value) })}
                    aria-label={`Price of ${it.name}`}
                    className="w-full bg-transparent outline-none"
                  />
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => edit(it.id, { available: !it.available })}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-muted"
                  >
                    {it.available ? (
                      <>
                        <Eye className="size-3.5" /> On menu
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3.5" /> Sold out
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${it.name}`}
                    onClick={() => update((items) => items.filter((x) => x.id !== it.id))}
                    className="grid size-8 place-items-center rounded-[var(--radius)] text-muted-foreground hover:bg-muted"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
        <button
          type="button"
          onClick={() =>
            update((items) => [
              ...items,
              { id: `new-${Date.now()}`, name: "New dish", description: "", price: 0, tags: [], available: true },
            ])
          }
          className="mt-3 inline-flex items-center gap-2 rounded-[var(--radius)] border border-dashed border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <Plus className="size-4" /> Add a dish
        </button>
      </div>
    </section>
  );
}
