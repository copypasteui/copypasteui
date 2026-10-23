// Runs inside `firebase emulators:exec`: loads the Firebase recipe's security rules into the Firestore
// emulator and checks the access table for every role.
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { check, recipeBlocks, summary } from "../lib.mjs";

const rules = recipeBlocks("firebase").find((b) => b.startsWith("rules_version"));
if (!rules) throw new Error("No rules block found in registry/recipes/firebase.md");

const env = await initializeTestEnvironment({ projectId: "demo-copypasteui", firestore: { rules, host: "127.0.0.1", port: 8085 } });

// Seed with rules off, including the hand-made first owner and the team.
await env.withSecurityRulesDisabled(async (ctx) => {
  const d = ctx.firestore();
  await setDoc(doc(d, "staffMembers/owner"), { email: "owner@example.com", role: "owner", status: "active" });
  await setDoc(doc(d, "staffMembers/manager"), { email: "manager@example.com", role: "manager", status: "active" });
  await setDoc(doc(d, "staffMembers/staff"), { email: "staff@example.com", role: "staff", status: "active" });
  await setDoc(doc(d, "settings/main"), { name: "Harbour Kitchen" });
  await setDoc(doc(d, "menuSections/mains"), { name: "Mains", position: 0 });
  await setDoc(doc(d, "menuItems/bream"), { sectionId: "mains", name: "Bream", pricePence: 2600, available: true });
  await setDoc(doc(d, "openingHours/0"), { open: false });
  await setDoc(doc(d, "closures/xmas"), { startsOn: "2026-12-24", endsOn: "2027-01-02", note: "Holidays" });
  await setDoc(doc(d, "bookings/b1"), { startsAt: new Date(), name: "Grace", party: 2, status: "confirmed" });
  await setDoc(doc(d, "orders/o1"), { customerName: "Jo", items: [], totalPence: 1200, paid: true, stage: "new" });
  await setDoc(doc(d, "enquiries/e1"), { name: "Sophie", email: "s@example.com", message: "Hi", status: "new" });
  await setDoc(doc(d, "customers/c1"), { name: "Grace" });
  await setDoc(doc(d, "reviews/r1"), { author: "Kate", rating: 2 });
});

const as = {
  public: env.unauthenticatedContext().firestore(),
  stranger: env.authenticatedContext("stranger").firestore(),
  staff: env.authenticatedContext("staff").firestore(),
  manager: env.authenticatedContext("manager").firestore(),
  owner: env.authenticatedContext("owner").firestore(),
};
// Returns true when allowed, false when the rules deny it.
const attempt = (fn) => async () => {
  try {
    await fn();
    return true;
  } catch (e) {
    if (String(e).includes("PERMISSION_DENIED") || e.code === "permission-denied") return false;
    throw e;
  }
};
const booking = (status = "confirmed") => ({
  startsAt: new Date(),
  name: "Test",
  party: 2,
  phone: "07700",
  status,
  createdAt: serverTimestamp(),
});

for (const who of ["public", "stranger"]) {
  const d = as[who];
  for (const c of ["menuSections", "menuItems", "openingHours", "closures", "settings"])
    await check(
      who,
      `read ${c}`,
      true,
      attempt(() => getDocs(collection(d, c))),
    );
  await check(
    who,
    "change menuItems",
    false,
    attempt(() => updateDoc(doc(d, "menuItems/bream"), { pricePence: 1 })),
  );
  await check(
    who,
    "change settings",
    false,
    attempt(() => updateDoc(doc(d, "settings/main"), { name: "Hacked" })),
  );
  await check(
    who,
    "create a booking",
    true,
    attempt(() => addDoc(collection(d, "bookings"), booking())),
  );
  await check(
    who,
    "create a booking already marked arrived",
    false,
    attempt(() => addDoc(collection(d, "bookings"), booking("arrived"))),
  );
  await check(
    who,
    "create a booking with an extra field (tableLabel)",
    false,
    attempt(() => addDoc(collection(d, "bookings"), { ...booking(), tableLabel: "VIP" })),
  );
  await check(
    who,
    "read bookings",
    false,
    attempt(() => getDocs(collection(d, "bookings"))),
  );
  await check(
    who,
    "create an unpaid new order",
    true,
    attempt(() => addDoc(collection(d, "orders"), { customerName: "X", items: [], totalPence: 100, paid: false, stage: "new" })),
  );
  await check(
    who,
    "create an order marked paid",
    false,
    attempt(() => addDoc(collection(d, "orders"), { customerName: "X", items: [], totalPence: 100, paid: true, stage: "new" })),
  );
  await check(
    who,
    "read orders",
    false,
    attempt(() => getDocs(collection(d, "orders"))),
  );
  await check(
    who,
    "send an enquiry",
    true,
    attempt(() => addDoc(collection(d, "enquiries"), { name: "Y", email: "y@example.com", message: "Hi", status: "new" })),
  );
  for (const c of ["enquiries", "customers", "reviews"])
    await check(
      who,
      `read ${c}`,
      false,
      attempt(() => getDocs(collection(d, c))),
    );
  await check(
    who,
    "read another person's staffMembers doc",
    false,
    attempt(() => getDoc(doc(d, "staffMembers/owner"))),
  );
}

const s = as.staff;
await check(
  "staff",
  "read bookings",
  true,
  attempt(() => getDocs(collection(s, "bookings"))),
);
await check(
  "staff",
  "change a booking's status",
  true,
  attempt(() => updateDoc(doc(s, "bookings/b1"), { status: "arrived" })),
);
await check(
  "staff",
  "rename a booking",
  false,
  attempt(() => updateDoc(doc(s, "bookings/b1"), { name: "Renamed" })),
);
await check(
  "staff",
  "move an order to ready",
  true,
  attempt(() => updateDoc(doc(s, "orders/o1"), { stage: "ready" })),
);
await check(
  "staff",
  "change an order's total",
  false,
  attempt(() => updateDoc(doc(s, "orders/o1"), { totalPence: 1 })),
);
await check(
  "staff",
  "delete a booking",
  false,
  attempt(() => deleteDoc(doc(s, "bookings/b1"))),
);
for (const c of ["enquiries", "customers", "reviews"])
  await check(
    "staff",
    `read ${c}`,
    false,
    attempt(() => getDocs(collection(s, c))),
  );
await check(
  "staff",
  "change menuItems",
  false,
  attempt(() => updateDoc(doc(s, "menuItems/bream"), { pricePence: 1 })),
);
await check(
  "staff",
  "read their own staffMembers doc",
  true,
  attempt(() => getDoc(doc(s, "staffMembers/staff"))),
);
await check(
  "staff",
  "promote themselves to owner",
  false,
  attempt(() => updateDoc(doc(s, "staffMembers/staff"), { role: "owner" })),
);

const m = as.manager;
for (const c of ["enquiries", "customers", "reviews"])
  await check(
    "manager",
    `read ${c}`,
    true,
    attempt(() => getDocs(collection(m, c))),
  );
await check(
  "manager",
  "mark an enquiry replied",
  true,
  attempt(() => updateDoc(doc(m, "enquiries/e1"), { status: "replied" })),
);
await check(
  "manager",
  "change menuItems",
  true,
  attempt(() => updateDoc(doc(m, "menuItems/bream"), { pricePence: 2700 })),
);
await check(
  "manager",
  "add a closure",
  true,
  attempt(() => addDoc(collection(m, "closures"), { startsOn: "2027-08-01", endsOn: "2027-08-14" })),
);
await check(
  "manager",
  "read every staffMembers doc",
  true,
  attempt(() => getDocs(collection(m, "staffMembers"))),
);
await check(
  "manager",
  "change settings",
  false,
  attempt(() => updateDoc(doc(m, "settings/main"), { name: "Hacked" })),
);
await check(
  "manager",
  "add a staff member",
  false,
  attempt(() => setDoc(doc(m, "staffMembers/stranger"), { role: "staff", status: "active" })),
);
await check(
  "manager",
  "promote themselves to owner",
  false,
  attempt(() => updateDoc(doc(m, "staffMembers/manager"), { role: "owner" })),
);

const o = as.owner;
await check(
  "owner",
  "change settings",
  true,
  attempt(() => updateDoc(doc(o, "settings/main"), { name: "Harbour Kitchen Ltd" })),
);
await check(
  "owner",
  "add a staff member",
  true,
  attempt(() => setDoc(doc(o, "staffMembers/stranger"), { email: "new@example.com", role: "staff", status: "active" })),
);
await check(
  "owner",
  "delete a booking",
  true,
  attempt(() => deleteDoc(doc(o, "bookings/b1"))),
);

await env.cleanup();
summary("Firebase recipe");
