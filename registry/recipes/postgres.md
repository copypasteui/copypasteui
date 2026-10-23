## 1. Schema

Model the data-model tables in Drizzle (`pgTable`), same names and types: `pgEnum("staff_role", ["owner", "manager", "staff"])`, integer pence, `timestamp({ withTimezone: true })`, `jsonb` for order items, `text().array()` for tags. Run `drizzle-kit push` (or generate migrations).

## 2. Sign-in

Pick one:
- **Better Auth** — add the email-and-password and magic-link plugins, mount its route handler at `/api/auth/[...all]`, and use its Drizzle adapter so users live in the same database.
- **Clerk** — hosted sign-in screens and invitations; you only store `staff_members` keyed by Clerk's user id.

## 3. Protect /admin on the server

On Next.js 16 the file is `proxy.ts` and the exported function is `proxy`; on 15 and earlier it's `middleware.ts` / `middleware` (16 still accepts the old name).

Better Auth:

```ts
// middleware.ts — a quick cookie check that redirects; real checks happen on the server below.
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin/sign-in")) return NextResponse.next();
  if (!getSessionCookie(request)) return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
```

Clerk:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isAdmin = createRouteMatcher(["/admin(.*)"]);
const isSignIn = createRouteMatcher(["/admin/sign-in(.*)"]);
export default clerkMiddleware(async (auth, req) => { if (isAdmin(req) && !isSignIn(req)) await auth.protect(); });
export const config = { matcher: ["/((?!_next|.*\\..*).*)"] };
```

## 4. Check the role in every server action and route

Postgres here has no row-level rules, so the server code is the security. One helper, used everywhere:

```ts
// lib/access.ts
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";          // Better Auth instance (Clerk: use auth() from @clerk/nextjs/server)
import { db, staffMembers } from "@/db";

export type Role = "owner" | "manager" | "staff";

export async function requireRole(allowed: Role[]) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not signed in");
  const [member] = await db.select().from(staffMembers).where(eq(staffMembers.userId, session.user.id));
  if (!member || member.status !== "active" || !allowed.includes(member.role)) throw new Error("Not allowed");
  return member;
}
```

Follow the access table: e.g. `setBookingStatus` calls `requireRole(["owner", "manager", "staff"])` and updates **only** `status`; `saveMenu` calls `requireRole(["owner", "manager"])`; `updateSettings` and staff changes call `requireRole(["owner"])`. Public form actions don't call it, but insert only the fields the form sends with status forced to its starting value, and are rate-limited.

## 5. The first owner

After signing up once, insert their `staff_members` row by hand (`role = 'owner'`) with a one-off SQL statement or Drizzle Studio.

## 6. Wire the screens

Load data in server components with Drizzle and pass it into the screens; their callbacks call server actions that start with `requireRole`. The database URL and auth secrets stay in server environment variables.
