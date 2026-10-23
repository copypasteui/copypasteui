"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Plus, ShoppingBag, Star } from "lucide-react";

const img = (id: string, w = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

type Product = {
  id: number;
  name: string;
  detail: string;
  price: number;
  was?: number;
  rating: number;
  reviews: number;
  badge?: string;
  photo: string;
  alt: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Steel Bottle",
    detail: "750ml · keeps cold 24h",
    price: 38,
    rating: 4.7,
    reviews: 1204,
    badge: "Bestseller",
    photo: "photo-1544003484-3cd181d17917",
    alt: "Black stainless steel tumbler",
  },
  {
    id: 2,
    name: "Stoneware Mug",
    detail: "Hand-glazed in Stoke",
    price: 24,
    rating: 4.6,
    reviews: 388,
    photo: "photo-1570784332176-fdd73da66f03",
    alt: "White ceramic mug",
  },
  {
    id: 3,
    name: "Canvas Tote",
    detail: "12oz cotton, inside pocket",
    price: 45,
    was: 60,
    rating: 4.5,
    reviews: 640,
    badge: "Was £60",
    photo: "photo-1544816155-12df9643f363",
    alt: "Beige canvas tote bag",
  },
  {
    id: 4,
    name: "Washed Cap",
    detail: "Grey · one size",
    price: 29,
    rating: 4.5,
    reviews: 212,
    photo: "photo-1521369909029-2afed882baee",
    alt: "Grey baseball cap",
  },
  {
    id: 5,
    name: "Blue Tumbler",
    detail: "500ml · fits car holders",
    price: 30,
    rating: 4.7,
    reviews: 97,
    badge: "New",
    photo: "photo-1568395216634-ab1b1e848751",
    alt: "Blue tumbler",
  },
  {
    id: 6,
    name: "Black Mug",
    detail: "Matte glaze, 350ml",
    price: 22,
    rating: 4.6,
    reviews: 455,
    photo: "photo-1518358246973-95637f1df901",
    alt: "Black ceramic mug on a wooden table",
  },
  {
    id: 7,
    name: "Market Bag",
    detail: "Folds into its own pocket",
    price: 34,
    rating: 4.4,
    reviews: 173,
    photo: "photo-1574365569389-a10d488ca3fb",
    alt: "White reusable bag",
  },
  {
    id: 8,
    name: "Sun Cap",
    detail: "Yellow · cotton twill",
    price: 27,
    rating: 4.6,
    reviews: 58,
    photo: "photo-1645266729222-17cd32e06fd0",
    alt: "Yellow baseball cap",
  },
];

export default function ProductGrid() {
  const [cart, setCart] = useState<number[]>([]);
  const [liked, setLiked] = useState<number[]>([2]);
  const [toast, setToast] = useState<string | null>(null);

  const add = (p: Product) => {
    setCart((c) => [...c, p.id]);
    setToast(p.name);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <section className="relative bg-background px-6 py-20 font-sans text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight">The everyday range</h2>
            <p className="mt-2 text-muted-foreground">Made to be used for years. Free UK delivery over £50.</p>
          </div>
          <span className="relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium">
            <ShoppingBag className="size-4" /> Bag
            <motion.span
              key={cart.length}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              className="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground"
            >
              {cart.length}
            </motion.span>
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={img(p.photo)}
                  alt={p.alt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-background px-2.5 py-1 text-xs font-semibold">{p.badge}</span>
                )}
                <button
                  type="button"
                  aria-label="Save"
                  onClick={() => setLiked((l) => (l.includes(p.id) ? l.filter((x) => x !== p.id) : [...l, p.id]))}
                  className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background"
                >
                  <Heart className={`size-4 ${liked.includes(p.id) ? "fill-primary text-primary" : ""}`} />
                </button>
                <button
                  type="button"
                  onClick={() => add(p)}
                  className="absolute inset-x-3 bottom-3 flex translate-y-14 items-center justify-center gap-2 rounded-md bg-foreground py-2.5 text-sm font-semibold text-background transition group-hover:translate-y-0"
                >
                  <Plus className="size-4" /> Quick add
                </button>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.detail}</p>
                </div>
                <p className="shrink-0 font-semibold">
                  £{p.price}
                  {p.was && <span className="ml-1.5 text-sm font-normal text-muted-foreground line-through">£{p.was}</span>}
                </p>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="size-3.5 fill-primary text-primary" /> {p.rating} <span>({p.reviews})</span>
              </p>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-xl"
          >
            Added {toast} to your bag
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
