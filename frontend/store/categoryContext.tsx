import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";

export type Category = {
  id?: number;
  category: string;
  date_created?: string;
};

type Categories = {
  loading: boolean;
  error: null | string;
  categories: Category[];
  setCategory: (categories: Category[]) => void;
  fetchCategory: () => void;
  addCategory: (categoryData: Category) => void;
  deleteCategory: (categoryId: number) => void;
};

const useCategoryStore = create<Categories>((set) => ({
  loading: false,
  error: null,
  categories: [],
  setCategory: (categories) => set({ categories }),
  fetchCategory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/v1/category/");
      set({ categories: response.data });
    } catch (error) {
      set({ error: "Failed to fetch Categories" });
    } finally {
      set({ loading: false });
    }
  },
  addCategory: async (categoryData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/v1/category/", categoryData);
      console.log(response);

      set((state) => ({
        categories: [response.data, ...state.categories],
      }));
    } catch (error) {
      set({ error: "Failed to add product" });
    } finally {
      set({ loading: false });
    }
  },
  deleteCategory: async (categoryId) => {
    set({ loading: true, error: null });
    try {
      const category = await axiosInstance.delete(`/v1/category/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== categoryId),
      }));
    } catch (e) {
      set({ error: "Failed to delete product" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
 