"use client"
import { DashboardTabs } from "@/components/utils/Tabs";
import { DashCard } from "@/components/utils/DashboardCard";
import Sales from "@/components/products/sales";
import usePage from "@/store/pageContext";
import { useEffect } from "react";

export default function Home() {
  const { setCurrentPage } = usePage()
  useEffect(() => {
    setCurrentPage('Dashboard')
  }, [])
  return (
    <main>
      <div>
        <DashboardTabs
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
                  <div className="grid grid-cols-3 h-[calc(100vh-400px)] gap-6 ">
                    <div className="max-md:col-span-3 col-span-2 border h-full rounded-xl">
                      {/* <DashChart /> */}
                    </div>
                    <div className="max-md:col-span-3 col-span-1 border rounded-xl">
                      <Sales />
                    </div>
                  </div>
                </section>
              ),
            },
            { name: "Analytics" },
            { name: "Reports" },
            { name: "Notifications" },
          ]}
        />
      </div>
    </main>
  );
}
