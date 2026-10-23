## 1. Schema

Define the data-model tables in `convex/schema.ts` with `defineSchema`/`defineTable`, using the same field names (money as whole pence, times as numbers in ms). Add `.index("by_email", ["email"])` on `staffMembers`, and `.index("by_starts", ["startsAt"])` on `bookings`.

## 2. One helper for every check

Convex has no separate rules file: each query and mutation checks access itself. Put this in `convex/access.ts` and call it at the top of every back-office function.

```ts
import type { QueryCtx, MutationCtx } from "./_generated/server";

export type Role = "owner" | "manager" | "staff";

export async function requireRole(ctx: QueryCtx | MutationCtx, allowed: Role[]) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) throw new Error("Not signed in");
  const member = await ctx.db
    .query("staffMembers")
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .unique();
  if (!member || member.status !== "active" || !allowed.includes(member.role)) throw new Error("Not allowed");
  return member;
}
```

Then follow the access table exactly, for example:

```ts
export const listBookings = query({ args: { day: v.number() }, handler: async (ctx, { day }) => {
  await requireRole(ctx, ["owner", "manager", "staff"]);
  return ctx.db.query("bookings").withIndex("by_starts", (q) => q.gte("startsAt", day).lt("startsAt", day + 86_400_000)).collect();
} });

export const setBookingStatus = mutation({ args: { id: v.id("bookings"), status: v.union(v.literal("confirmed"), v.literal("arrived"), v.literal("no-show"), v.literal("cancelled")) },
  handler: async (ctx, { id, status }) => {
    await requireRole(ctx, ["owner", "manager", "staff"]);
    await ctx.db.patch(id, { status }); // staff may only change status, so this mutation touches nothing else
  } });

// Public booking form: no role check, but only the fields the form sends, and status forced to "confirmed".
export const createBooking = mutation({ args: { startsAt: v.number(), name: v.string(), party: v.number(), phone: v.string(), note: v.optional(v.string()) },
  handler: (ctx, args) => ctx.db.insert("bookings", { ...args, status: "confirmed", createdAt: Date.now() }) });
```

Public reads (menu, hours, closures, settings) are plain queries without `requireRole`. Never write a back-office query without it.

## 3. Sign-in and the first owner

Use Convex Auth (password and magic-link providers) or Clerk. Insert the first `staffMembers` row by hand in the Convex dashboard with the owner's email and `role: "owner"`.

## 4. Protect /admin on the server

With Convex Auth in Next.js, use `convexAuthNextjsMiddleware` and redirect unauthenticated requests for `/admin/*` (except `/admin/sign-in`) to the sign-in page. The functions' `requireRole` checks are what actually protect the data.

## 5. Wire the screens

Pass `useQuery(api.bookings.listBookings, …)` results into the screens and call mutations from their callbacks. Lists update live without polling.
