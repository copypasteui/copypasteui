import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

// Demo project against the local emulators — no real Firebase project or login.
export function firebase() {
  const fresh = !getApps().length;
  const app = fresh ? initializeApp({ projectId: "demo-copypasteui", apiKey: "demo-key", authDomain: "localhost" }) : getApps()[0];
  const auth = getAuth(app);
  const db = getFirestore(app);
  if (fresh) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8085);
  }
  return { auth, db };
}
