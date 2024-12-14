"use client";
import { AddSellerDetails } from "@/components/purchase/AddSeller";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import useSupplierContext from "@/store/supplierContext";
import { columns } from "./columns";

export default function Sellers() {
  const { suppliers, fetchSupplier } = useSupplierContext();
  useEffect(() => {
    fetchSupplier();
  }, []);
  return (
    <main className="">
      <div className="flex justify-between items-center mb-2 max-md:flex-col max-md:items-start gap-4">
        <h1 className="text-3xl font-semibold">Supplier Records</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <AddSellerDetails btnName="Add supplier" />
        </div>
      </div>
      <div className="mt-4">
        <DataTable data={suppliers} columns={columns} />
      </div>
    </main>
  );
}
