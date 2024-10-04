"use client";
import React from "react";
import classes from "./products.module.css";

export default function DeleteProduct({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  async function deleteProduct(id: number) {
    const res = await fetch("http://127.0.0.1:8000/api/v1/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <span
      className={`text-lg font-bold ${classes.trash}`}
      onClick={() => deleteProduct(id)}
    >
      {children}
    </span>
  );
}
