"use client";
import fetchAPI from "@/components/utils/functions";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Product = {
  id: number;
  product_name: string;
  stock_quantity: number;
  date_created: string;
  brand: number;
  category: number;
};

export type {Product}

type ProductContext = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductContext = createContext<ProductContext | null>(null);

type ProductContextProviderProps = {
  children: React.ReactNode;
};

export default function ProductContextProvider({
  children,
}: ProductContextProviderProps) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {data: session} = useSession()

  const getProducts = () => {
    setIsLoading(true)
    const product: Product[] = fetchAPI({
      method: "GET",
      token: session?.user?.access,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/products/`,
    }) as any;
    setProducts(product)
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch products when the component mounts
    getProducts();
  }, [products]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, isLoading, setIsLoading }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }

  return context;
}
