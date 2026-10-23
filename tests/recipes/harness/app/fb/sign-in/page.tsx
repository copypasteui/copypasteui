"use client";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import AdminSignIn from "@/components/AdminSignIn";
import { firebase } from "@/lib/firebase";

export default function Page() {
  const router = useRouter();
  return (
    <AdminSignIn
      onSignIn={async ({ email, password }) => {
        try {
          await signInWithEmailAndPassword(firebase().auth, email, password);
          router.push("/fb/bookings");
        } catch (e) {
          return (e as Error).message;
        }
      }}
    />
  );
}
