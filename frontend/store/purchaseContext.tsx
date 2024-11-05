import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";
import { Product } from "./productContext";

export type Purchase = {
  id?: number;
  product_name?: string;
  product?: number;
  brand_name?: string;
  brand?: number;
  category_name?: string;
  category?: number;
  quantity?: number;
  unit_price?: number | string;
  purchase_order?: number;
  order_detail?: null;
  total_amount?: number;
};

export type PurchaseRecord = {
  id?: number;
  total_amount: number;
  purchase_date?: string;
  supplier: number | string;
  supplier_name?: string;
  products?: Purchase[];
};

type PurchaseState = {
  loading: boolean;
  error: null | string;
  purchases: Purchase[];
  record: PurchaseRecord[];
  addRecord: (data: PurchaseRecord) => void; // C
  fetchRecord: () => void;
  addPurchase: (purchaseData: Purchase[]) => void; // C
  fetchPurchase: () => void;
  updatePurchase: (id: number, updateData: Partial<Purchase | null>) => void; // U
  deletePurchase: (id: number) => void; // D
};

const usePurchaseStore = create<PurchaseState>((set) => ({
  loading: false,
  error: null,
  purchases: [],
  record: [],
  fetchPurchase: async () => {
    try {
      const response = await axiosInstance.get(`/v1/purchase-items/`);
      set({ purchases: response.data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  fetchRecord: async () => {
    try {
      const response = await axiosInstance.get(`/v1/purchase-records/`);
      set({ record: response.data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  addRecord: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/v1/purchase-records/", data);
      set((state) => ({
        record: [response.data, ...state.record],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add sale", loading: false });
    }
  },
  addPurchase: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post(
        "/v1/bulk-purchase-upload/",
        data
      );
      set((state) => ({
        purchases: [response.data, ...state.purchases],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add sale", loading: false });
    }
  },
  updatePurchase: async (id, updateData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(
        `/v1/purchase-items/${id}/`,
        updateData
      );
      set((state) => ({
        purchases: state.purchases.map((purchase) =>
          purchase.id === id ? response.data : purchase
        ),

        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update sale" });
    }
  },
  deletePurchase: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/v1/purchase-items/${id}/`);
      set((state) => ({
        purchases: state.purchases.filter((purchase) => purchase.id !== id),
        record: state.record.map((item) => ({
          ...item,
          products: item.products?.filter((p) => p.id !== id),
        })),
        loading: false,
      }));
    } catch (e) {
      set({ error: "Failed to delete purchase", loading: false });
    }
  },
}));

export default usePurchaseStore;
