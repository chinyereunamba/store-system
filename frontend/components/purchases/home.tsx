import React from "react";
import style from "./purchase.module.css";
import table from "../utils/table.module.css";
import BlockTitle from "../utils/blockTitle";

export default function PurchasePage() {
  return (
    <section className="">
      <div className="mb-4 flex justify-between items-center">
        <span>
          <p className="text-[gray] uppercase text-sm">Date</p>
          <BlockTitle title="3rd January, 2024" />
        </span>
        <span>
          <p className="text-[gray] uppercase text-sm">Supplier</p>
          <BlockTitle title="Chinedu Ugo" />
        </span>
      </div>
      <div className={style.purchases}>
        <table className={table.table}>
          <thead className="border-b border-b-[gray] ">
            <tr className={`pb-2 ${style.product_table}`}>
              {/* <th className={style.checkbox}>
              <input type="checkbox" />
            </th> */}
              <th>Product name</th>
              <th className="flex gap-2 items-center">Brand</th>
              <th className="flex gap-2 items-center">Category</th>
              <th>Quantity Purchased</th>
              <th>Unit price</th>
              <th>Total Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* {products?.map((product, index) => (
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
              </td> 
                <td className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${classes.pencil}`}>
                    <BsPencil />
                  </span>

                  <DeleteProduct id={product.id}>
                    <BsTrash />
                  </DeleteProduct>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
