"use client";
import { DashboardTabs } from "@/components/utils/Tabs";
import { DashCard } from "@/components/dashboard/DashboardCard";
import Sales from "@/components/dashboard/Sales";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/utils/DateRange";
import { DashChart } from "@/components/utils/DashChart";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ConfirmationBox } from "@/components/utils/Confirmation";
import { AddSaleRecord } from "@/components/dashboard/AddSaleRecord";
import useProductStore from "@/store/productContext";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!session) {
    redirect("/login");
  }

  return (
    <section>
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start gap-4 mb-4">
        <h1 className="text-3xl font-semibold text-left justify-self-end">
          Dashboard
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <DatePickerWithRange />
          <Button>Download</Button>
          <AddSaleRecord btnName="Add sales record" products={products} />
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
                  <DashCard title="Total revenue" value={23403} />
                  <DashCard title="Total daily sale" value={3503} />
                  <DashCard title="Total weekly sales" value={45920} />
                  <DashCard title="Daily profit" value={3002} />
                </div>
                <div className="grid grid-cols-3 h-[calc(100vh-420px)] gap-6 ">
                  <div className="flex flex-col justify-between max-md:col-span-3 col-span-1 p-4 border h-full rounded-xl">
                    <h3>Weekly Overview</h3>
                    <DashChart />
                  </div>
                  <div className="col-span-1 border rounded-xl"></div>
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
    </section>
  );
}
