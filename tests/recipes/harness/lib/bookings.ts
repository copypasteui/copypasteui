import type { Booking } from "@/components/AdminBookings";
export function toBooking(r: Record<string, any>): Booking {
  const starts = new Date(r.starts_at ?? r.startsAt?.toDate?.() ?? r.startsAt);
  return {
    id: r.id,
    time: starts.toISOString().slice(11, 16),
    name: r.name,
    party: r.party,
    phone: r.phone ?? "",
    table: r.table_label ?? r.tableLabel,
    note: r.note,
    status: r.status,
  };
}
