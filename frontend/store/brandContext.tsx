import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

export type Brand = {
  id?: number;
  brand: string;
  date_created?: string;
};

type Brands = {
  loading: boolean;
  error: null | string;
  brands: Brand[];
  setBrand: (brands: Brand[]) => void;
  fetchBrand: () => void;
  addBrand: (brandData: Brand) => void;
  deleteBrand: (brandId: number) => void;
};

const useBrandStore = create<Brands>((set) => ({
  loading: false,
  error: null,
  brands: [],
  setBrand: (brands) => set({ brands }),
  fetchBrand: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/v1/brands/");
      set({ brands: response.data });
    } catch (error) {
      set({ error: "Failed to fetch brands" });
    } finally {
      set({ loading: false });
    }
  },
  addBrand: async (brandData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/v1/brands/", brandData);
      console.log(response);

      set((state) => ({
        brands: [response.data, ...state.brands],
      }));
    } catch (error) {
      set({ error: "Failed to add product" });
    } finally {
      set({ loading: false });
    }
  },
  deleteBrand: async (brandId) => {
    set({ loading: true, error: null });
    try {
      const brand = await axiosInstance.delete(`/v1/brands/${brandId}`);
      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== brandId),
      }));
    } catch (e) {
      set({ error: "Failed to delete product" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBrandStore;
