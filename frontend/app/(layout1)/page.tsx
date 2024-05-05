"use client";
import Dashboard from "@/components/dashboard/home";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LoginPage from "../(layout2)/login/page";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return redirect('/login')
  }
  return (
    <main className="">
      <Dashboard />
    </main>
  );
}
