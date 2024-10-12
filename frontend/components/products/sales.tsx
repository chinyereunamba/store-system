import React from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function Sales() {
  return (
    <section className={`p-4`}>
      <h3>Recent Sales</h3>
      <p className="my-2">You made 255 sales this month</p>
      <ScrollArea className="mt-6 h-[480px]">
        <Sale />
        <Sale />
        <Sale />
        <Sale />
        <Sale />
        <Sale />
      </ScrollArea>
    </section>
  );
}

function Sale() {
  const price = (3200.8).toLocaleString();

  return (
    <div className="flex justify-between items-center p-4 bg-slate-200 rounded-lg mb-4">
      <h3>Product name</h3>
      <p className="font-medium text-xl">+${price}</p>
    </div>
  );
}
