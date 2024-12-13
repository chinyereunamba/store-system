"use client";
import useProduct from "@/store/productContext";

import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(layout1)/products/data-table";
import { columns } from "@/app/(layout1)/products/columns";
import { brandColumn } from "@/app/(layout1)/products/brand-columns";
import { categoryColumn } from "./category-columns";

import { AddUpdateBox } from "@/components/products/AddProduct";
import { BrandBox } from "@/components/products/Brand";
import { CategoryBox } from "@/components/products/Category";
import { DashboardTabs } from "@/components/utils/Tabs";
import useBrandStore from "@/store/brandContext";
import useCategoryStore from "@/store/categoryContext";

const ProductPage = () => {
  const { products, fetchProducts } = useProduct();
  const { brands, fetchBrand } = useBrandStore();
  const { categories, fetchCategory } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchBrand();
    fetchCategory();
  }, [fetchProducts, fetchBrand, fetchCategory]);
  return (
    <main>
      <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:items-start gap-4">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div className="flex items-center gap-2 flex-wrap">
          <AddUpdateBox type="add" onConfirm={() => {}} trigger="Add Product" />
          <BrandBox type="add" onConfirm={() => {}} trigger="Add Brand" />
          <CategoryBox type="add" onConfirm={() => {}} trigger="Add Category" />
        </div>
      </div>
      <DashboardTabs
        addClass="grid-cols-3"
        tabs={[
          {
            name: "Overview",
            content: <DataTable columns={columns} data={products} />,
          },
          {
            name: "Brands",
            content: <DataTable columns={brandColumn} data={brands} />,
          },
          {
            name: "Category",
            content: <DataTable columns={categoryColumn} data={categories} />,
          },
        ]}
      />
    </main>
  );
};

export default ProductPage;
