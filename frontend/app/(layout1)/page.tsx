"use client";
import { DashboardTabs } from "@/components/utils/Tabs";
import { DashCard } from "@/components/dashboard/DashboardCard";
import Sales from "@/components/dashboard/Sales";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/utils/DateRange";
import { DashChart } from "@/components/dashboard/DashChart";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ConfirmationBox } from "@/components/utils/Confirmation";
import { AddSaleRecord } from "@/components/dashboard/AddSaleRecord";
import useProductStore from "@/store/productContext";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/utils";
import useStatStore from "@/store/stats";
import { Monthly } from "@/components/dashboard/StatsByMonth";

export default function Home() {
  const { data: session } = useSession();
  const { fetchProducts, products } = useProductStore();
  const { daily, profit, weekly, revenue, fetchStats } = useStatStore();

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  if (!session) {
    redirect("/login");
  }

  // i want to get the weekly sales total amount. I don't know how to go about it

  const dailySale = async () => {
    const date = new Date();
    const getSalesList = await axiosInstance.get("/v1/sales-by-days?page=1/");
    // getSalesList.forEach((item, i) => {
    //   if (date - item.date <= 7) {

    //   }
    // })
    return "";
  };

  return (
    <section>
      <div className="flex justify-between items-center max-md:flex-col max-md:items-start gap-4 mb-4">
        <h1 className="text-3xl font-semibold text-left justify-self-end">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
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
                  <DashCard title="Monthly revenue" value={revenue} />
                  <DashCard title="Total weekly sales" value={weekly} />
                  <DashCard title="Daily revenue" value={daily} />
                  <DashCard title="Days profit" value={profit} />
                </div>
                <div className="grid grid-cols-3 gap-6 items-stretch auto-rows-[minmax(150px,_auto)]">
                  <div className="max-md:col-span-3 col-span-1">
                    <DashChart />
                  </div>
                  <div className="col-span-1">
                    <Monthly />
                  </div>
                  <div className="max-md:col-span-3 col-span-1">
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
