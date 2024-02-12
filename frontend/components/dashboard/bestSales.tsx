import React from "react";
import style from "./dashboard.module.css";
import BlockTitle from "../utils/blockTitle";
export default function BestSales() {
  return (
    <section className={style.best_sales}>
      <BlockTitle title="Best Selling products" />
      <div className="mt-5">
        <table className={`${style.table}`}>
          <thead className="border-b ">
            <tr className="pb-2">
              <th>Product name</th>
              <th>Stock</th>
              <th>Unit price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test product 1</td>
              <td>15pcs</td>
              <td>₦ 500</td>
              <td>
                <span className="text-sm self-start font-bold">
                  In stock
                </span>
              </td>
            </tr>
            <tr>
              <td>Test product 2</td>
              <td>1pc</td>
              <td>₦ 1,500</td>
              <td>
                <span className="text-sm self-start font-bold">
                  In stock
                </span>
              </td>
            </tr>
            <tr>
              <td>Test product 3</td>
              <td>5pcs</td>
              <td>₦ 7000</td>
              <td>
                <span className="text-sm self-start font-bold">
                  In stock
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
