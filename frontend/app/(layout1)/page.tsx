"use client";
import { DashboardTabs } from "@/components/utils/Tabs";
import { DashCard } from "@/components/utils/DashboardCard";
import Sales from "@/components/products/sales";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/utils/DateRange";
import { DashChart } from "@/components/utils/DashChart";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ConfirmationBox } from "@/components/utils/Confirmation";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Button>Download</Button>
          <Button variant={"outline"}>Record new sales</Button>
        </div>
      </div>
      <DashboardTabs
        addClass="grid-cols-4"
        tabs={[
          {
            name: "Overview",
            content: (
              <section className="flex flex-col gap-6 mt-5">
                <div className="flex gap-6 flex-wrap">
                  <DashCard />
                  <DashCard />
                  <DashCard />
                  <DashCard />
                </div>
                <div className="grid grid-cols-3 h-[calc(100vh-420px)] gap-6 ">
                  <div className="relative max-md:col-span-3 col-span-2 p-4 border h-full rounded-xl">
                    <h3>Overview</h3>
                    <DashChart />
                  </div>
                  <div className="max-md:col-span-3 col-span-1 border rounded-xl">
                    <Sales />
                  </div>
                </div>
              </section>
            ),
          },
          {
            name: "Analytics",
            content: (
              <ConfirmationBox
                trigger="Open"
                onConfirm={() => console.log("Opened")}
              />
            ),
          },
          { name: "Reports" },
          { name: "Notifications" },
        ]}
      />
    </main>
  );
}
