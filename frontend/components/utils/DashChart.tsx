"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, name: "Jan" },
  { month: "February", desktop: 305, name: "Feb" },
  { month: "March", desktop: 237, name: "Mar" },
  { month: "April", desktop: 73, name: "Apr" },
  { month: "May", desktop: 209, name: "May" },
  { month: "June", desktop: 214, name: "Jun" },
  { month: "July", desktop: 50, name: "Jul" },
  { month: "August", desktop: 60, name: "Aug" },
  { month: "September", desktop: 200, name: "Sep" },
  { month: "October", desktop: 120, name: "Oct" },
  { month: "November", desktop: 235, name: "Nov" },
  { month: "December", desktop: 300, name: "Dec" },
];

const chartConfig = {
  sales: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DashChart() {
  return (
    <ChartContainer config={chartConfig} className="max-w-[95%] max-h-[500px] w-full absolute bottom-2">
      <BarChart accessibilityLayer data={chartData} width={500} height={300}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
