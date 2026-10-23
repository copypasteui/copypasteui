"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

export type Review = {
  id: string;
  source: "Google" | "Tripadvisor" | "Website";
  author: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
};

const sample: Review[] = [
  {
    id: "r1",
    source: "Google",
    author: "Kate M.",
    rating: 2,
    text: "Lovely food but we waited 40 minutes for mains and nobody told us why.",
    date: "Yesterday",
  },
  {
    id: "r2",
    source: "Google",
    author: "Daniel R.",
    rating: 5,
    text: "The bream was perfect and the staff remembered our anniversary.",
    date: "3 days ago",
    reply: "Thank you, Daniel. See you next year!",
  },
  {
    id: "r3",
    source: "Tripadvisor",
    author: "Jo_Travels",
    rating: 4,
    text: "Great crab linguine, a bit noisy on a Saturday.",
    date: "Last week",
  },
  {
    id: "r4",
    source: "Website",
    author: "Ellie",
    rating: 5,
    text: "Best fish and chips in Falmouth, and they did gluten-free for my daughter.",
    date: "Last week",
  },
];

// Reviews from every site in one list, unanswered first. Load them from the platforms' APIs or your own
// review form, and post replies in onReply (Google Business Profile's API supports this).
export default function AdminReviews({
  reviews: initial = sample,
  average = 4.6,
  total = 1184,
  onReply,
}: {
  reviews?: Review[];
  average?: number;
  total?: number;
  onReply?: (id: string, reply: string) => void;
}) {
  const [reviews, setReviews] = useState(initial);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const unanswered = reviews.filter((r) => !r.reply);
  const ordered = [...unanswered, ...reviews.filter((r) => r.reply)];

  const send = (id: string) => {
    const reply = drafts[id]?.trim();
    if (!reply) return;
    setReviews((all) => all.map((r) => (r.id === id ? { ...r, reply } : r)));
    onReply?.(id, reply);
  };

  return (
    <section className="bg-muted p-4 font-sans text-foreground sm:p-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Reviews</h1>
            <p className="text-sm text-muted-foreground">{unanswered.length} waiting for a reply</p>
          </div>
          <p className="text-right">
            <span className="font-display text-3xl font-bold">{average.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground"> average from {total.toLocaleString("en-GB")}</span>
          </p>
        </div>
        <ul className="mt-5 space-y-3">
          {ordered.map((r) => (
            <li key={r.id} className="rounded-[var(--radius)] border border-border bg-card p-4 text-card-foreground">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">{r.author}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{r.source}</span>
                  <span className="text-muted-foreground">{r.date}</span>
                </p>
                <span className="flex" role="img" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < r.rating ? "fill-primary text-primary" : "text-border"}`} />
                  ))}
                </span>
              </div>
              <p className="mt-2">{r.text}</p>
              {r.reply ? (
                <p className="mt-3 border-l-2 border-primary pl-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">You replied:</span> {r.reply}
                </p>
              ) : (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <label className="sr-only" htmlFor={`reply-${r.id}`}>
                    Reply to {r.author}
                  </label>
                  <input
                    id={`reply-${r.id}`}
                    value={drafts[r.id] ?? ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
                    placeholder={r.rating <= 3 ? "Say sorry, explain, and invite them back" : "Say thanks, mention something they liked"}
                    className="min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => send(r.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    <Send className="size-4" /> Reply
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
