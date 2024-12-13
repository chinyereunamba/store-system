"use client";
import { AddPurchaseRecord } from "@/components/purchase/AddPurchaseRecord";
import { AddSellerDetails } from "@/components/purchase/AddSeller";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import usePurchaseStore from "@/store/purchaseContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PurchaseForm from "@/components/purchase/PurchaseForm";
import useProductStore from "@/store/productContext";
import useSupplierContext from "@/store/supplierContext";

const PurchasePage = () => {
  const { record, fetchRecord } = usePurchaseStore();
  const { products, fetchProducts } = useProductStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Determine the start and end indices for items on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = record.slice(startIndex, endIndex);

  useEffect(() => {
    fetchProducts();
    fetchRecord();
  }, []);
  return (
    <main className="min-h-[90vh] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Purchase Records</h1>
          <div className="flex items-center gap-2">
            <PurchaseForm
              purchaseRecord={record}
              products={products}
              btn="Add Stock Items"
            />
            <AddPurchaseRecord btnName="Add new record" />
            <AddSellerDetails btnName="Add seller" />
          </div>
        </div>
        <div>
          {paginatedData.map((purchase) => (
            <DataTable
              key={purchase.id}
              columns={columns}
              data={purchase!.products ?? []}
              date={purchase.purchase_date}
              supplier={purchase.supplier_name}
              total={purchase.total_amount}
            />
          ))}
        </div>
      </div>

      <Pagination
      className="mt-4"
      // currentPage={currentPage}
      // totalPages={Math.ceil(record.length / itemsPerPage)}
      // onPageChange={(page: number) => setCurrentPage(page)}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default PurchasePage;
