import React from "react";
import style from "./dashboard.module.css";
import BlockTitle from "../utils/blockTitle";

type ProductProps = {
  name: string;
  stock: string;
  price: number;
  status: "In stock" | "Out of stock";
};
export default function BestSales() {
  const products: ProductProps[] = [
    { name: "Test product 1", stock: "3pcs", price: 5700, status: "In stock" },
    {
      name: "Test product 2",
      stock: "15pcs",
      price: 5500,
      status: "Out of stock",
    },
    { name: "Test product 3", stock: "12pcs", price: 800, status: "In stock" },
    { name: "Test product 4", stock: "52pcs", price: 4500, status: "In stock" },
  ];
  return (
    <section className={style.best_sales}>
      <BlockTitle title="Best Selling products" />
      <div className="mt-5">
        <table className={`${style.table}`}>
          <thead className="border-b border-b-[gray] ">
            <tr className="pb-2">
              <th>Product name</th>
              <th>Stock</th>
              <th>Unit price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.stock}</td>
                <td>₦ {product.price.toLocaleString()}</td>
                <td>
                  <span
                    className={`text-sm self-start font-bold ${
                      product.status == "In stock"
                        ? style.in_stock
                        : style.out_of_stock
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
