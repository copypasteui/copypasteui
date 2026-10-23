## How to use this recipe

Paste it into your AI builder after adding the back-office screens. Builders can create tables and sign-in for you, but they don't always lock the data down unless asked — so ask explicitly, and check.

1. **Turn on the built-in backend.**
   - **Lovable:** enable Lovable Cloud (it runs on Supabase, so ask Lovable to use the SQL and policies from the Supabase recipe — `get_recipe` with slug `supabase` if your editor has the CopyPasteUI MCP).
   - **Bolt:** use Bolt's built-in database and authentication (or connect Supabase).
   - **Replit:** use Replit's built-in database and Replit Auth.
   - **v0:** connect a database from the Vercel Marketplace (Supabase or Neon) and follow that recipe.
2. **Create the tables** in the data model above, with exactly those names and fields.
3. **Lock the data down** with the access table above. Say it in these words:
   > Turn on row-level security (or the platform's equivalent) for every table. Public visitors may only read the menu, opening hours, closures and settings, and may only create bookings, orders and enquiries — never read them. Signed-in staff read bookings and orders and may change only their status. Managers and owners manage everything else; only the owner changes settings and staff.
4. **Protect /admin.** Ask for every `/admin` page to check the signed-in user on the server and redirect to `/admin/sign-in` when signed out, and for `/admin` to be left out of the menu and sitemap.
5. **Make the first owner.** Sign up once, then ask the builder to mark that account as `owner` in the staff table.

## Check it before you publish

- Open the site in a private window, go to `/admin` — you should land on the sign-in page.
- Submit the contact form while signed out, then try to read enquiries without signing in (ask the builder "can a signed-out visitor read the enquiries table?"). The answer must be no.
- Sign in as a staff account and check you can't open Settings or Staff.

## Leaving later

Builders' built-in backends can be hard to move away from (Lovable Cloud, for example, can't change region once enabled and needs a manual export to leave). Export your data now and then, and keep a copy of the table definitions.
