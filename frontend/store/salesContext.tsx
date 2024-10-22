import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

export type Sale = {
  id?: number;
  product_name: string;
  brand?: string | number;
  category?: string | number;
  brand_name?: string;
  category_name?: string;
  quantity: number | string;
  price: number;
  cost_price: number;
  profitOrLoss: number;
  date_created?: string;
};

type SalesProps = {
  loading: boolean;
  error: null | string;
  sales: Sale[];
  setSales: (sales: Sale[]) => void;
  addSales: (saleData: Sale) => void; // C
  fetchSales: () => void; // R
  updateSale: (saleId: number, updateData: Partial<Sale | null>) => void; // U
  deleteSale: (saleId: number) => void; // D
};

const useSaleStore = create<SalesProps>((set) => ({
  sales: [],
  loading: false,
  error: null,
  setSales: (sales) => set({ sales }),
  fetchSales: async () => {
    set({ loading: true, error: null });
    try {
      const sales = await axiosInstance.get("/v1/sales/");
      set({ sales: sales.data, loading: false });
    } catch (e) {
      set({ error: "Failed to fetch sales" });
    } finally {
      set({ loading: false });
    }
  },
  addSales: async (saleData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/v1/sales/", saleData);
      set((state) => ({
        sales: [response.data, ...state.sales],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add sale", loading: false });
    }
  },
  updateSale: async (saleId, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `/v1/sales/${saleId}/`,
        updateData
      );
      set((state) => ({
        sales: state.sales.map((sale) =>
          sale.id === saleId ? response.data : sale
        ),

        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update sale" });
    }
  },
  deleteSale: async (saleId) => {
    set({ loading: true, error: null });
    try {
      const sale = await axiosInstance.delete(`/v1/sales/${saleId}/`);
      set((state) => ({
        sales: state.sales.filter((sale) => sale.id !== saleId),
        loading: false,
      }));
    } catch (e) {
      set({ error: "Failed to delete sale", loading: false });
    }
  },
}));

export default useSaleStore;
