"use client";
import { CustomTable } from "@/components/utils/Table";
import usePage from "@/store/pageContext";
import React, { useEffect } from "react";

export default function Products() {
  const { setCurrentPage } = usePage();
  useEffect(() => {
    setCurrentPage("Products");
  }, []);
  return (
    <>
      <p>Available products</p>
      <CustomTable />
    </>
  );
}
