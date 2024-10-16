"use client";
import useProduct from "@/store/productContext";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(layout1)/products/data-table";
import { columns } from "@/app/(layout1)/products/columns";
import { Product } from "@/store/productContext";
import { AddUpdateBox } from "@/components/products/AddProduct";

const ProductPage = () => {
  const { products, fetchProducts } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <main>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div className="flex items-center gap-4">
          <AddUpdateBox type="add" onConfirm={() => {}} trigger="Add Product" />
        </div>
      </div>
      <DataTable columns={columns} data={products} />
    </main>
  );
};

export default ProductPage;
