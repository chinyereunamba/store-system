"use client";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useProductStore from "@/store/productContext";
import useSaleStore, { useGroupedSaleStore } from "@/store/salesContext";

const SalesPage: React.FC = () => {
  const { sales, fetchSales } = useSaleStore();
  const { fetchGroupedSales } = useGroupedSaleStore()
  useEffect(() => {
    fetchSales();
    // fetchGroupedSales()
  }, []);
  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Sales</h1>
        <div className="flex items-center gap-4"></div>
      </div>
      <div>
        <DataTable columns={columns} data={sales} />
      </div>
    </main>
  );
};

export default SalesPage;
