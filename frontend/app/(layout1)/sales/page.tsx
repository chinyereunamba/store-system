"use client";
import React, { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useSaleStore from "@/store/salesContext";
import { AddSaleRecord } from "@/components/dashboard/AddSaleRecord";
import useProductStore from "@/store/productContext";

const SalesPage: React.FC = () => {
  const { groupedSales, fetchGroupedSales } = useSaleStore();
  const {products, fetchProducts} = useProductStore()
  useEffect(() => {
    fetchGroupedSales();
    fetchProducts()
  }, []);
  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Sales</h1>
        <div className="flex items-center gap-4">
          <AddSaleRecord btnName="Add sales record" products={products} />
        </div>
      </div>
      <div>
        {groupedSales.map((sale, index) => (
          <div className="mb-4">
            <DataTable
              key={`${sale.date}-${index}`}
              date={sale.date}
              columns={columns}
              data={sale.sales}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default SalesPage;
