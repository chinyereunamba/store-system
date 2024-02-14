// "use client";
import React, { useEffect, useState } from "react";
import style from "../utils/table.module.css";
import classes from "./products.module.css";
import type { ProductProps } from "../dashboard/bestSales";
import { BsPencil, BsPlus, BsSortUp, BsTrash } from "react-icons/bs";
import DeleteProduct from "./changeProduct";

interface ProductsPageProps extends ProductProps {
  brand: string;
  category: string;
}

type Product = {
  id: number;
  product_name: string;
  stock_quantity: number;
  date_created: string;
  brand: string;
  category: string;
};

async function fetchProduct(): Promise<Product[]> {
  const res = await fetch("http://127.0.0.1:8000/api/v1/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data;
}

export default async function ProductsPage() {
  const [products] = await Promise.all([fetchProduct()]);
  // const [products, setProducts] = useState<Product[]>();

  // const products: ProductsPageProps[] = [
  //   {
  //     name: "Test product 1",
  //     stock: "3pcs",
  //     price: 5700,
  //     status: "In stock",
  //     brand: "CTorch",
  //     category: "Bulb",
  //   },
  //   {
  //     name: "Test product 2",
  //     stock: "15pcs",
  //     price: 5500,
  //     status: "Out of stock",
  //     brand: "Itel",
  //     category: "Bulb",
  //   },
  //   {
  //     name: "Test product 3",
  //     stock: "12pcs",
  //     price: 800,
  //     status: "In stock",
  //     brand: "Bs",
  //     category: "Socket",
  //   },
  //   {
  //     name: "Test product 4",
  //     stock: "52pcs",
  //     price: 4500,
  //     status: "In stock",
  //     brand: "Genesis",
  //     category: "Pattress Box",
  //   },
  // ];

  return (
    <section className={classes.products}>
      <div className="flex justify-between gap-2 py-4 mb-3">
        <div>
          <span>Brand</span>
          <span>Brand</span>
        </div>
        <div>
          <span className="flex items-center bg-background p-3 rounded-xl gap-1 cursor-pointer">
            <BsPlus className="text-2xl font-bold" /> Add Product
          </span>
        </div>
      </div>
      <table className={style.table}>
        <thead className="border-b border-b-[gray] ">
          <tr className={`pb-2 ${style.product_table}`}>
            {/* <th className={style.checkbox}>
              <input type="checkbox" />
            </th> */}
            <th>Product name</th>
            <th className="flex gap-2 items-center">Brand</th>
            <th className="flex gap-2 items-center">Category</th>
            <th>Stock</th>
            <th>Unit price</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <td>{product.product_name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              {/* <td>{product.stock}</td>
              <td>₦ {product.price.toLocaleString()}</td> */}
              {/* <td>
                <span
                  className={`text-sm self-start font-bold ${
                    product.status == "In stock"
                      ? style.in_stock
                      : style.out_of_stock
                  }`}
                >
                  {product.status}
                </span>
              </td> */}
              <td className="flex items-center gap-2">
                <span className={`text-lg font-bold ${classes.pencil}`}>
                  <BsPencil />
                </span>

                <DeleteProduct id={product.id}>
                  <BsTrash />
                </DeleteProduct>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
