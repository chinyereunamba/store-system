import { AddPurchaseRecord } from "@/components/purchase/AddPurchaseRecord";
import { AddSellerDetails } from "@/components/purchase/AddSeller";
import { Button } from "@/components/ui/button";
import React from "react";

const PurchasePage = () => {
  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Purchase Records</h1>
        <div className="flex items-center gap-4">
          <AddPurchaseRecord btnName="Add new record" />
          <AddSellerDetails btnName="Add seller" />
        </div>
      </div>
    </main>
  );
};

export default PurchasePage;
