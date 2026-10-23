## The back-office data model

Every recipe stores the same data with the same names, so the back-office screens (category "admin") work with any backend. Money is stored in pence/cents as whole numbers. Times are stored in UTC.

| Table | Fields | Used by |
| --- | --- | --- |
| `staff_members` | user_id (the auth user), email, name, role (`owner` \| `manager` \| `staff`), status (`active` \| `invited`) | admin-staff, every access check |
| `settings` | one row: name, phone, email, address, instagram, booking_link, notify_bookings, notify_enquiries, notify_reviews, daily_summary | admin-settings, the public header/footer/contact |
| `bookings` | id, starts_at, name, party, phone, email, table_label, note, status (`confirmed` \| `arrived` \| `no-show` \| `cancelled`), created_at | admin-bookings, admin-overview |
| `orders` | id, number, customer_name, placed_at, pickup_at, items (list of {name, qty}), total_pence, paid, stage (`new` \| `preparing` \| `ready` \| `collected`) | admin-orders |
| `enquiries` | id, name, email, phone, subject, message, received_at, status (`new` \| `replied` \| `archived`) | admin-enquiries |
| `menu_sections` | id, name, position | admin-menu-editor, the public menu |
| `menu_items` | id, section_id, name, description, price_pence, tags (list), available, position | admin-menu-editor, the public menu |
| `customers` | id, name, email, phone, visits, last_visit, spend_pence, notes, marketing_opt_in | admin-customers |
| `reviews` | id, source, author, rating (1–5), text, posted_at, reply | admin-reviews |
| `opening_hours` | day (0 = Monday … 6 = Sunday), open, opens, closes | admin-hours, the public footer/contact |
| `closures` | id, starts_on, ends_on, note | admin-hours, the closed-notice banner |

## Who may do what

This is the security contract. Implement it in the database's own rules, not only in the interface — hiding a button doesn't stop anyone.

| Data | Public visitors | Staff | Manager | Owner |
| --- | --- | --- | --- | --- |
| menu_sections, menu_items, opening_hours, closures | read | read | read, write | read, write |
| settings | read (public fields only) | read | read | read, write |
| bookings | create only (from the booking form), never read | read, change status | read, write | read, write |
| orders | create only (from checkout), never read | read, change stage | read, write | read, write |
| enquiries | create only (from the contact form), never read | — | read, write | read, write |
| customers, reviews | — | — | read, write | read, write |
| staff_members | — | read own row | read | read, write |

Rules that apply to every backend:
- Every `/admin` page checks the session **on the server** and sends signed-out people to `/admin/sign-in`.
- Secret keys (service-role keys, admin SDK credentials, API secrets) live only in server code and environment variables, never in the browser bundle.
- Public forms may only insert, with fields limited to what the form sends; they can never read other people's rows.
- `/admin` is left out of the navigation and the sitemap, and disallowed in robots.txt.
- The first owner account is created by hand once (instructions in each recipe); everyone else is invited from admin-staff.
