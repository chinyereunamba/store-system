import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

export type Product = {
  id?: number;
  product_name: string;
  brand?: string | number;
  category?: string | number;
  brand_name?: string;
  category_name?: string;
  stock_quantity: number | string;
  date_created?: string;
};

type ProductsProps = {
  loading: boolean;
  error: null | string;
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProducts: (productData: Product) => void; // C
  fetchProducts: () => void; // R
  updateProduct: (
    productId: number,
    updateData: Partial<Product | null>
  ) => void; // U
  deleteProduct: (productId: number) => void; // D
};

const useProductStore = create<ProductsProps>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await axiosInstance.get("/v1/products/");
      set({ products: products.data, loading: false });
    } catch (e) {
      set({ error: "Failed to fetch products" });
    } finally {
      set({ loading: false });
    }
  },
  addProducts: async (productData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/v1/products/", productData);
      set((state) => ({
        products: [response.data, ...state.products],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add product", loading: false });
    }
  },
  updateProduct: async (productId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `/v1/products/${productId}/`,
        updateData
      );
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? response.data : product
        ),

        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update product" });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      const product = await axiosInstance.delete(`/v1/products/${productId}/`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
        loading: false,
      }));
    } catch (e) {
      set({ error: "Failed to delete product", loading: false });
    }
  },
}));

export default useProductStore;
