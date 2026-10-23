# Backend recipe tests

End-to-end tests for the back-office backend recipes in `registry/recipes/`. They read the SQL, rules and
`/admin` protection code straight from the recipe files, so they test exactly what users copy.

| Recipe | What runs | Needs |
| --- | --- | --- |
| Supabase | The recipe SQL as the only migration on a local Supabase stack; every row of the access table for public, stranger, staff, manager and owner; then the real `admin-sign-in` and `admin-bookings` screens in a browser, with the recipe's protection code as `middleware.ts` and as `proxy.ts` | Docker (Colima works) and the Supabase CLI |
| Firebase | The recipe's Firestore rules in the Firestore emulator for every role; then the same screens against the Auth and Firestore emulators | Java (for the emulators) |

No accounts or sign-ins: Supabase runs locally, Firebase uses a `demo-` project the emulators accept offline.

```bash
cd tests/recipes && npm install
cd supabase && supabase start -x studio,imgproxy,storage-api,realtime,edge-runtime,logflare,vector,supavisor,mailpit,postgres-meta && cd ..
npm test
```

Not covered yet: Firebase server-side session cookies, and the Convex, Postgres, PocketBase and Cloudflare recipes.
