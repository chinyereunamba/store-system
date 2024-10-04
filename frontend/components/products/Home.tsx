"use client";
import React, { useState, useEffect } from "react";
import style from "../utils/table.module.css";
import classes from "./products.module.css";
import type { ProductProps } from "../dashboard/BestSales";
import { BsPencil, BsPlus, BsSortUp, BsTrash } from "react-icons/bs";
import DeleteProduct from "./ChangeProduct";
import AddProductModal from "./AddProductModal";
import { Product, useProductContext } from "@/store/productContext";
import fetchAPI from "../utils/functions";
import { useSession } from "next-auth/react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const getProducts = async () => {
    const product: Product[] = fetchAPI({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/products/`,
      method: "GET",
      token: session?.user.access,
    }) as any;
    setProducts(product);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={classes.products}>
      <div className="flex justify-between gap-2 py-2 mb-4">
        <div>
          <h4>Products</h4>
        </div>
        <div>
          <span
            className="bg-primary text-background p-3 rounded cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Add Products
            <AddProductModal open={open} onClose={() => setOpen(false)} />
          </span>
        </div>
      </div>
      <table className={`${style.table} ${style.product_table}`}>
        <thead className={`border-b border-b-[gray] `}>
          <tr className={`pb-2`}>
            <th className={style.checkbox}>
              <input type="checkbox" />
            </th>
            <th className={style.index}>S/n</th>
            <th>Product name</th>
            <th className={style.brand}>Brand</th>
            <th className={style.category}>Category</th>
            <th className={style.stock}>Stock</th>
            <th>Unit price</th>
            <th className={style.status}>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* {isLoading && <h1>Loading...</h1>} */}
          {products?.map((product, index) => (
            <tr key={index}>
              <td className={style.checkbox}>
                <input type="checkbox" name="" id="" />
              </td>
              <td className={style.index}>{index + 1}</td>
              <td>{product.product_name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td className={style.stock}>Hello</td>
              <td>Hello</td>
              <td className={style.status}>Hello</td>
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
      <div className="my-5 flex justify-center">Page 1</div>
    </section>
  );
}
