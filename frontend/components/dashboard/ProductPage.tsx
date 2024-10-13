"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(layout1)/products/data-table";
import { Product, columns } from "@/app/(layout1)/products/columns";

const ProductPage = ({ data }: { data: Product[] }) => {
 

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div className="flex items-center gap-4">
          <Button variant='default'>Add product</Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default ProductPage;
