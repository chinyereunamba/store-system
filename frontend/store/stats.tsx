import { axiosInstance } from "@/lib/utils";
import { create } from "zustand";
import { Sale, SalesGroup } from "./salesContext";

const d = new Date()

const date = d.toJSON().split("T")[0];
const year = d.getFullYear();
const month = d.getMonth() + 1

type MonthlyRevenue = {
  year: number;
  monthly_revenue: {
    [month: number]: number;
  };
};

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
          sum +
          ((sale.unit_price || 0) - (sale.cost_price || 0)) *
            (sale.quantity_sold || 0),
        0
      );

      // Compute weekly stats
      const weeklyTotal = salesData.reduce(
        (weekSum, group) =>
          weekSum +
          group.sales.reduce((sum, sale) => sum + (sale.total_amount || 0), 0),
        0
      );

      // const weeklyProfit = salesData.reduce(
      //   (weekSum, group) =>
      //     weekSum +
      //     group.sales.reduce(
      //       (sum, sale) =>
      //         sum +
      //         ((sale.unit_price - sale.cost_price) * sale.quantity_sold || 0),
      //       0
      //     ),
      //   0
      // );

      const revenueData:MonthlyRevenue = (
        await axiosInstance.get(`/v1/monthly-revenue/?year=${year}`)
      ).data;
      const revenue = revenueData.monthly_revenue[month];

      // Update the store with the computed values
      set({
        daily: dailyTotal,
        profit: dailyProfit,
        revenue: revenue,
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
