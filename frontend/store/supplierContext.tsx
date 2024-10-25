// useStore.ts
import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

export type Supplier = {
  id?: number;
  name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  address?: string;
};

type SuppliersProps = {
  loading: boolean;
  error: null | string;
  suppliers: Supplier[];
  addSupplier: (data: Supplier) => void;
  setSuppliers: () => void;
  deleteSupplier: (id: number) => void;
};

const useSupplierContext = create<SuppliersProps>((set) => ({
  loading: false,
  error: null,
  suppliers: [],
  setSuppliers: async () => {
    try {
      const suppliers = (await axiosInstance.get("/v1/supplier/")).data;
      set({ suppliers: suppliers });
    } catch (error) {}
  },
  addSupplier: async (supplierData) => {
    try {
      const supplier = (
        await axiosInstance.post("/v1/supplier/", supplierData)
      ).data;
      set((state) => ({ suppliers: [...state.suppliers, supplier] }));
    } catch (error) {}
  },
  deleteSupplier: async (id) => {
    const supplier = (await axiosInstance.delete(`/v1/supplier/${id}`)).data;
    set((state) => ({
      suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
    }));
  },
}));

export default useSupplierContext;
