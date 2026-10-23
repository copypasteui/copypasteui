## 1. Put Access in front of /admin

In Cloudflare Zero Trust → Access → Applications, add a **self-hosted** application for `yourdomain.com/admin` and `yourdomain.com/api/admin`. Add an Allow policy listing the owner's and staff's email addresses, with "One-time PIN" as the login method. Cloudflare now asks for an emailed code before anyone reaches those paths — admin-sign-in isn't needed with this recipe. This check runs on Cloudflare's servers, before a request ever reaches your site, and step 3 checks the role again on your own server code — never rely on hiding links in the browser.

## 2. Tables in D1

Create a D1 database and run the data-model tables as SQLite `create table` statements (`integer` for pence and booleans, `text` for times in ISO format, JSON text for order items). `staff_members` is keyed by email, with the role.

## 3. Check identity and role in the Worker

Access adds a signed `Cf-Access-Jwt-Assertion` header to every request it lets through. Verify it in your Worker or Pages Function (with `jose` against your team's certs URL), take the email from it, and look up the role:

```ts
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(new URL("https://YOUR-TEAM.cloudflareaccess.com/cdn-cgi/access/certs"));

export async function requireRole(request: Request, env: Env, allowed: string[]) {
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) throw new Response("Not signed in", { status: 401 });
  const { payload } = await jwtVerify(token, JWKS, { issuer: "https://YOUR-TEAM.cloudflareaccess.com", audience: env.ACCESS_AUD });
  const member = await env.DB.prepare("select role from staff_members where email = ? and status = 'active'").bind(payload.email).first<{ role: string }>();
  if (!member || !allowed.includes(member.role)) throw new Response("Not allowed", { status: 403 });
  return member;
}
```

Use it at the top of every `/api/admin/*` handler, following the access table (staff endpoints update only `status` or `stage`). Public endpoints for the booking and contact forms live outside `/api/admin`, insert only, and should be protected with Turnstile.

## 4. The first owner

Add the owner's email to the Access policy and insert their `staff_members` row with `wrangler d1 execute`.

## 5. Wire the screens

The admin pages fetch from `/api/admin/*`; Access's cookie travels with those requests automatically.
