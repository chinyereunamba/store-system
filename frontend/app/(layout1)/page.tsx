import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Dashboard from "@/components/dashboard/Home";

export default function Home() {
  return (
    <main>
      <Nav />
      <Dashboard />
    </main>
  );
}
