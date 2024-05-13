"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  product_id: string;
  description: string;
  price: number;
  quantity: number;
  weight: number;
  brand: {
    id: number;
    brand: string;
    date_created: string;
  };
  category: {
    id: number;
    category: string;
    date_created: string;
  };
  image: string;
  product_images: string[];
  color: string;
  size: string;
};

type ProductContext = {
  products: Product[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>;
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
  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch products when the component mounts
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // Set loading state to false after the API request completes
      setIsLoading(false);
    }
  }

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
