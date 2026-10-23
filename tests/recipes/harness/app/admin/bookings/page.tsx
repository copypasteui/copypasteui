"use client";
import { useEffect, useState } from "react";
import AdminBookings, { type Booking } from "@/components/AdminBookings";
import { toBooking } from "@/lib/bookings";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [rows, setRows] = useState<Booking[] | null>(null);
  useEffect(() => {
    supabase()
      .from("bookings")
      .select("*")
      .order("starts_at")
      .then(({ data }) => setRows((data ?? []).map(toBooking)));
  }, []);
  if (!rows) return <p>Loading…</p>;
  return (
    <AdminBookings
      bookings={rows}
      onStatusChange={async (id, status) => {
        const { error } = await supabase().from("bookings").update({ status }).eq("id", id);
        document.body.dataset.saved = error ? `error:${error.message}` : `ok:${id}:${status}`;
      }}
    />
  );
}
