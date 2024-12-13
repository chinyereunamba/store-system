"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useStatStore from "@/store/stats";

const months = Array.from({ length: 12 }, (_, i) =>
  new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(0, i))
);

export function Monthly() {
  const { months } = useStatStore();
  const date = new Date();
  const getStartAndCurrentMonth = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const startMonthIndex = (currentMonth - 5 + 12) % 12;
    const startYear = currentMonth < 5 ? currentYear - 1 : currentYear;

    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });
    const startMonth = monthFormatter.format(
      new Date(startYear, startMonthIndex)
    );
    const currentMonthName = monthFormatter.format(today);

    return `${startMonth} ${startYear} - ${currentMonthName} ${currentYear}`;
  };

  
  const getLastSixMonths = () => {
    const currentMonth = new Date().getMonth();
    const months = Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        new Date(2024, i)
      )
    );

    const lastSixMonths = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      lastSixMonths.push({ month: months[monthIndex], revenue: 0 });
    }
    return lastSixMonths;
  };

  // Combine revenue data with months
  const combineMonthsAndData = (revenueData:number[]) => {
    const lastSixMonths = getLastSixMonths();
    return lastSixMonths.map((item, index) => {
      const monthIndex = (new Date().getMonth() - 5 + index + 12) % 12; // Map index back to data
      return {
        month: item.month,
        revenue: revenueData[monthIndex+1] || 0, // Use month number (1-based) for data lookup
      };
    });
  };

  const combinedData = combineMonthsAndData(months);
  const chartData = combinedData;
  console.log(combinedData);
  // console.log(chartData)
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>{getStartAndCurrentMonth()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 1,
              bottom: 5
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
