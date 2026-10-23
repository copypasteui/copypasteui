## What this covers — and doesn't

This recipe replaces the menu editor and the hours screen with a spreadsheet the owner already knows how to use. It's for **public content only**: bookings, orders, enquiries and customer details must never go in a published sheet, because anyone with the link can read it. For those, use a booking service's own dashboard, or one of the database recipes.

## 1. Make the sheet

One Google Sheet with tabs named exactly like the data model:
- `menu_items`: section, name, description, price (e.g. `11.50`), tags (comma-separated), available (`TRUE`/`FALSE`), position
- `opening_hours`: day (`Monday` … `Sunday`), open, opens, closes
- `closures`: starts_on, ends_on, note
- `settings`: two columns, key and value (name, phone, email, address, instagram, booking_link)

## 2. Publish it

File → Share → Publish to web → choose each tab → **CSV**. Copy each tab's CSV link.

## 3. Read it from the site

Fetch each CSV when the site builds (static sites) or on the server with a short cache (for example revalidate every 5 minutes), parse it, and feed the public menu, footer, contact section and closed-notice banner. Fall back to the last good copy if the fetch fails, so a typo in the sheet can't take the site down. Don't fetch it from visitors' browsers on every page view.

## 4. Hand it over

Give the owner edit access to the sheet only, and a one-line note: "Change it here; the website updates within five minutes."
