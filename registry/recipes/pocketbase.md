## 1. Collections

Create one collection per data-model table in the PocketBase dashboard. Instead of a separate `staff_members` table, add to the built-in **users** auth collection a `role` select field (`owner`, `manager`, `staff`) and a `status` field.

## 2. API rules

PocketBase checks these on every request. Set them per collection (List/View, Create, Update, Delete); an empty rule means "anyone", a locked rule means "only superusers".

| Collection | List/View | Create | Update | Delete |
| --- | --- | --- | --- | --- |
| menu_sections, menu_items, opening_hours, closures | *(empty — public)* | `@request.auth.role ?= "owner" \|\| @request.auth.role ?= "manager"` | same | same |
| settings | *(empty — public)* | locked | `@request.auth.role = "owner"` | locked |
| bookings | `@request.auth.id != ""` | `@request.body.status = "confirmed"` | `@request.auth.role = "owner" \|\| @request.auth.role = "manager" \|\| (@request.auth.role = "staff" && @request.body.name:isset = false && @request.body.starts_at:isset = false)` | `@request.auth.role = "owner" \|\| @request.auth.role = "manager"` |
| orders | `@request.auth.id != ""` | `@request.body.stage = "new" && @request.body.paid = false` | same pattern as bookings (staff may change `stage` only) | owner/manager |
| enquiries | owner/manager | `@request.body.status = "new"` | owner/manager | owner/manager |
| customers, reviews | owner/manager | owner/manager | owner/manager | owner/manager |
| users | `id = @request.auth.id \|\| @request.auth.role = "owner" \|\| @request.auth.role = "manager"` | locked (invite from server) | `@request.auth.role = "owner"` | `@request.auth.role = "owner"` |

"owner/manager" means `@request.auth.role = "owner" || @request.auth.role = "manager"`. Also stop people from changing their own role: on the users Update rule add `&& (@request.body.role:isset = false || @request.auth.role = "owner")`.

## 3. The first owner

Create the owner as a normal user in the dashboard and set `role` to `owner` there.

## 4. Protect /admin

Sign in with `pb.collection("users").authWithPassword(...)` (or OTP). For server-rendered admin pages, keep the auth token in an HTTP-only cookie (`pb.authStore.exportToCookie()`), load it in middleware, call `pb.collection("users").authRefresh()`, and redirect to `/admin/sign-in` when it fails. The API rules are what protect the data.

## 5. Run it safely

Put PocketBase behind HTTPS (Caddy or the host's proxy), keep the superuser dashboard password strong, and back up `pb_data` daily.
