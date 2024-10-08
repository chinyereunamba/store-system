import React from "react";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../utils/DateRange";
import { DashboardTabs } from "../utils/Tabs";

export default function Dashboard() {
  return (
    <section className="py-4 px-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Button>Download</Button>
        </div>
      </div>
      <div>
        <DashboardTabs
          tabs={[
            {
              name: "Overview",
              content: "",
            },
            { name: "Analytics" },
            { name: "Reports" },
            { name: "Notifications" },
          ]}
        />
      </div>
      <div>
        
      </div>
    </section>
  );
}
