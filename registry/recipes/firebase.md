## 1. Collections

Use one Firestore collection per table in the data model, with the same field names in camelCase: `staffMembers` (document id = the user's Firebase Auth uid), `settings` (one document, id `main`), `bookings`, `orders`, `enquiries`, `menuSections`, `menuItems`, `customers`, `reviews`, `openingHours` (ids `0`–`6`), `closures`. Store money as whole pence and times as Firestore timestamps.

## 2. Security rules

Deploy these as `firestore.rules`. They encode the access table; every read and write goes through them.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function member() { return get(/databases/$(db)/documents/staffMembers/$(request.auth.uid)).data; }
    function signedIn() { return request.auth != null; }
    function onTeam() { return signedIn() && exists(/databases/$(db)/documents/staffMembers/$(request.auth.uid)); }
    function isManager() { return onTeam() && member().role in ['owner', 'manager']; }
    function isOwner() { return onTeam() && member().role == 'owner'; }
    function onlyChanges(fields) { return request.resource.data.diff(resource.data).affectedKeys().hasOnly(fields); }

    match /menuSections/{id} { allow read: if true; allow write: if isManager(); }
    match /menuItems/{id}    { allow read: if true; allow write: if isManager(); }
    match /openingHours/{id} { allow read: if true; allow write: if isManager(); }
    match /closures/{id}     { allow read: if true; allow write: if isManager(); }
    match /settings/{id}     { allow read: if true; allow write: if isOwner(); }

    match /bookings/{id} {
      allow create: if request.resource.data.status == 'confirmed'
        && request.resource.data.keys().hasOnly(['startsAt', 'name', 'party', 'phone', 'email', 'note', 'status', 'createdAt']);
      allow read: if onTeam();
      allow update: if isManager() || (onTeam() && onlyChanges(['status']));
      allow delete: if isManager();
    }
    match /orders/{id} {
      allow create: if request.resource.data.stage == 'new' && request.resource.data.paid == false;
      allow read: if onTeam();
      allow update: if isManager() || (onTeam() && onlyChanges(['stage']));
      allow delete: if isManager();
    }
    match /enquiries/{id} {
      allow create: if request.resource.data.status == 'new';
      allow read, update, delete: if isManager();
    }
    match /customers/{id} { allow read, write: if isManager(); }
    match /reviews/{id}   { allow read, write: if isManager(); }
    match /staffMembers/{uid} {
      allow read: if signedIn() && (request.auth.uid == uid || isManager());
      allow write: if isOwner();
    }
  }
}
```

The `onlyChanges` checks mean staff can move a booking to "arrived" or an order to "ready", but can't edit anything else.

## 3. Make the first owner

Create the owner in Authentication → Users, copy their UID, and add a document `staffMembers/<uid>` with `{ email, name, role: "owner", status: "active" }` in the Firestore console. Rules can't create the first owner, so this step is manual on purpose.

## 4. Protect /admin on the server

Firebase Auth lives in the browser by default. For server protection in Next.js, exchange the ID token for a session cookie after sign-in (`admin.auth().createSessionCookie(idToken, { expiresIn })` in a server route), then in middleware or each admin layout call `admin.auth().verifySessionCookie(cookie, true)` and redirect to `/admin/sign-in` when it fails. The Firebase Admin SDK credentials stay in server environment variables only. On Next.js 16 the file is `proxy.ts` (function `proxy`); on 15 and earlier, `middleware.ts`.

## 5. Wire the screens

- admin-sign-in: `signInWithEmailAndPassword`, and `sendSignInLinkToEmail` for the email link.
- Lists: `getDocs`/`onSnapshot` on the collection; saves: `updateDoc`/`setDoc`. The rules decide what each role may do.
- admin-staff invites: create the user with the Admin SDK in a server route and write the `staffMembers` document.
