"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import AdminBookings, { type Booking } from "@/components/AdminBookings";
import { toBooking } from "@/lib/bookings";
import { firebase } from "@/lib/firebase";

export default function Page() {
  const [rows, setRows] = useState<Booking[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const { auth, db } = firebase();
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setError("signed out");
      try {
        const snap = await getDocs(collection(db, "bookings"));
        setRows(snap.docs.map((d) => toBooking({ id: d.id, ...d.data() })));
      } catch (e) {
        setError((e as Error).message);
        setRows([]);
      }
    });
  }, []);
  if (!rows) return <p>Loading… {error}</p>;
  return (
    <>
      {error && <p data-testid="error">{error}</p>}
      <AdminBookings
        bookings={rows}
        onStatusChange={async (id, status) => {
          try {
            await updateDoc(doc(firebase().db, "bookings", id), { status });
            document.body.dataset.saved = `ok:${id}:${status}`;
          } catch (e) {
            document.body.dataset.saved = `error:${(e as Error).message}`;
          }
        }}
      />
    </>
  );
}
