"use client"
import React, { Children } from "react";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../utils/DateRange";
import usePage from "@/store/pageContext";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { currentPage } = usePage();
  return (
    <section className="py-4 px-8 flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">{currentPage}</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Button>Download</Button>
        </div>
      </div>
      <div className="my-2">{children}</div>
    </section>
  );
}
