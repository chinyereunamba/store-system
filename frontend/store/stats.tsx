import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";
import { Sale, SalesGroup } from "./salesContext";

const date = new Date().toJSON().split("T")[0];

type Stats = {
  daily: number;
  profit: number;
  revenue: number;
  weekly: number;
  fetchStats: () => void;
};

const useStatStore = create<Stats>((set) => ({
  daily: 0,
  weekly: 0,
  revenue: 0,
  profit: 0,

  fetchStats: async () => {
    try {
      const salesData: SalesGroup[] = (
        await axiosInstance.get("/v1/sales-by-days/")
      ).data;

      // Compute daily stats
      const todaySales =
        salesData.find((group) => group.date === date)?.sales || [];
      const dailyTotal = todaySales.reduce(
        (sum, sale) => sum + (sale.total_amount || 0),
        0
      );
      const dailyProfit = todaySales.reduce(
        (sum, sale) =>
          sum + ((sale.unit_price - sale.cost_price) * sale.quantity_sold || 0),
        0
      );

      // Compute weekly stats
      const weeklyTotal = salesData.reduce(
        (weekSum, group) =>
          weekSum +
          group.sales.reduce((sum, sale) => sum + (sale.total_amount || 0), 0),
        0
      );

      const weeklyProfit = salesData.reduce(
        (weekSum, group) =>
          weekSum +
          group.sales.reduce(
            (sum, sale) =>
              sum +
              ((sale.unit_price - sale.cost_price) * sale.quantity_sold || 0),
            0
          ),
        0
      );

      // Update the store with the computed values
      set({
        daily: dailyTotal,
        profit: dailyProfit,
        revenue: dailyTotal,
        weekly: weeklyTotal,
      });

      // Optionally, log if no sales were found for today
      if (!todaySales.length) {
        console.log("No sales found for today:", date);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  },
}));

export default useStatStore;
