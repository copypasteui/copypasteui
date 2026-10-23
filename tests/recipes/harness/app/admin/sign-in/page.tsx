"use client";
import { useRouter } from "next/navigation";
import AdminSignIn from "@/components/AdminSignIn";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const router = useRouter();
  return (
    <AdminSignIn
      onSignIn={async ({ email, password }) => {
        const { error } = await supabase().auth.signInWithPassword({ email, password });
        if (error) return error.message;
        router.push("/admin/bookings");
        router.refresh();
      }}
    />
  );
}
