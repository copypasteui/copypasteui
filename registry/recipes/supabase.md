## 1. Create the tables and access rules

Run this once in the Supabase SQL editor (or as a migration). It creates the tables from the data model, turns on row-level security everywhere, and encodes the access table with one helper function.

```sql
create type staff_role as enum ('owner', 'manager', 'staff');

create table staff_members (
  user_id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  name text,
  role staff_role not null default 'staff',
  status text not null default 'active'
);

-- The signed-in user's role, or null for the public. security definer so policies can call it
-- without being blocked by staff_members' own policy.
create or replace function public.my_role() returns staff_role
language sql stable security definer set search_path = public
as $$ select role from staff_members where user_id = auth.uid() $$;

create table settings (id int primary key default 1 check (id = 1), name text, phone text, email text, address text,
  instagram text, booking_link text, notify_bookings bool default true, notify_enquiries bool default true,
  notify_reviews bool default false, daily_summary bool default true);
create table bookings (id uuid primary key default gen_random_uuid(), starts_at timestamptz not null, name text not null,
  party int not null check (party between 1 and 50), phone text, email text, table_label text, note text,
  status text not null default 'confirmed' check (status in ('confirmed','arrived','no-show','cancelled')),
  created_at timestamptz default now());
create table orders (id uuid primary key default gen_random_uuid(), number serial, customer_name text not null,
  placed_at timestamptz default now(), pickup_at timestamptz, items jsonb not null, total_pence int not null,
  paid bool default false, stage text not null default 'new' check (stage in ('new','preparing','ready','collected')));
create table enquiries (id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text,
  subject text, message text not null, received_at timestamptz default now(),
  status text not null default 'new' check (status in ('new','replied','archived')));
create table menu_sections (id uuid primary key default gen_random_uuid(), name text not null, position int default 0);
create table menu_items (id uuid primary key default gen_random_uuid(), section_id uuid references menu_sections on delete cascade,
  name text not null, description text, price_pence int not null, tags text[] default '{}', available bool default true, position int default 0);
create table customers (id uuid primary key default gen_random_uuid(), name text, email text unique, phone text,
  visits int default 0, last_visit date, spend_pence int default 0, notes text, marketing_opt_in bool default false);
create table reviews (id uuid primary key default gen_random_uuid(), source text, author text, rating int check (rating between 1 and 5),
  text text, posted_at timestamptz, reply text);
create table opening_hours (day int primary key check (day between 0 and 6), open bool default true, opens time, closes time);
create table closures (id uuid primary key default gen_random_uuid(), starts_on date not null, ends_on date not null, note text);

do $$ declare t text; begin
  foreach t in array array['staff_members','settings','bookings','orders','enquiries','menu_sections','menu_items',
    'customers','reviews','opening_hours','closures'] loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- Public content: everyone reads, managers and owners write.
create policy "public read" on menu_sections for select using (true);
create policy "public read" on menu_items for select using (true);
create policy "public read" on opening_hours for select using (true);
create policy "public read" on closures for select using (true);
create policy "public read" on settings for select using (true);
create policy "managers write" on menu_sections for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));
create policy "managers write" on menu_items for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));
create policy "managers write" on opening_hours for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));
create policy "managers write" on closures for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));
create policy "owner writes" on settings for update to authenticated using (my_role() = 'owner') with check (my_role() = 'owner');

-- Bookings and orders: the public can only create; the team reads; staff change status; managers do the rest.
create policy "public creates" on bookings for insert to anon, authenticated with check (status = 'confirmed');
create policy "team reads" on bookings for select to authenticated using (my_role() is not null);
create policy "team updates" on bookings for update to authenticated using (my_role() is not null) with check (my_role() is not null);
create policy "managers delete" on bookings for delete to authenticated using (my_role() in ('owner','manager'));
create policy "public creates" on orders for insert to anon, authenticated with check (stage = 'new' and paid = false);
create policy "team reads" on orders for select to authenticated using (my_role() is not null);
create policy "team updates" on orders for update to authenticated using (my_role() is not null) with check (my_role() is not null);

-- Row-level security can't limit columns, so a trigger stops staff changing anything but the one
-- column their job needs (status on bookings, stage on orders). Managers, owners and the service role pass.
create or replace function public.staff_may_only_change() returns trigger
language plpgsql set search_path = public
as $$
begin
  if my_role() = 'staff' and (to_jsonb(new) - tg_argv[0]) is distinct from (to_jsonb(old) - tg_argv[0]) then
    raise exception 'Staff can only change %', tg_argv[0] using errcode = '42501';
  end if;
  return new;
end $$;
create trigger staff_only_status before update on bookings for each row execute function staff_may_only_change('status');
create trigger staff_only_stage before update on orders for each row execute function staff_may_only_change('stage');

-- Enquiries: public creates, managers and owners read and manage.
create policy "public creates" on enquiries for insert to anon, authenticated with check (status = 'new');
create policy "managers manage" on enquiries for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));

-- Customers and reviews: managers and owners only.
create policy "managers manage" on customers for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));
create policy "managers manage" on reviews for all to authenticated using (my_role() in ('owner','manager')) with check (my_role() in ('owner','manager'));

-- Staff list: everyone on the team sees their own row, managers see all, only the owner changes it.
create policy "see own row" on staff_members for select to authenticated using (user_id = auth.uid() or my_role() in ('owner','manager'));
create policy "owner manages" on staff_members for all to authenticated using (my_role() = 'owner') with check (my_role() = 'owner');
```


## 2. Make the first owner

Sign up once through admin-sign-in (or Authentication → Users → Add user), then run, with that email:

```sql
insert into staff_members (user_id, email, name, role)
select id, email, 'Owner', 'owner' from auth.users where email = 'owner@example.com';
```

## 3. Protect /admin on the server

In Next.js, use `@supabase/ssr` and check the user for every `/admin` route except the sign-in page. On Next.js 16 save this as `proxy.ts` and rename the function to `proxy`; on Next.js 15 and earlier keep `middleware.ts` (16 still accepts it). Both were tested.

```ts
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => response.cookies.set(name, value, options)),
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && !request.nextUrl.pathname.startsWith("/admin/sign-in")) {
    return NextResponse.redirect(new URL("/admin/sign-in", request.url));
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
```

The middleware only keeps signed-out people away; the row-level security above is what actually protects the data.

## 4. Wire the screens

- admin-sign-in: `onSignIn` → `supabase.auth.signInWithPassword(...)`, `onMagicLink` → `supabase.auth.signInWithOtp({ email })`. Return the error message, if any.
- Lists: `select` from the matching table; saves: `update`/`insert`/`upsert` with the browser client — the policies decide what each role may do.
- admin-staff invites: call `supabase.auth.admin.inviteUserByEmail` from a **server** route (it needs the service-role key), then insert the staff_members row.
- Public pages read menu, hours, closures and settings with the anon key; the booking and contact forms insert only.

Never put the service-role key in browser code or a `NEXT_PUBLIC_` variable.
