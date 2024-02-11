"use client";

import React from "react";
import style from "./dashboard.module.css";
import BlockTitle from "../utils/blockTitle";
import Chart from "chart.js/auto";
import {
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
} from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController
);

export default function Stats() {
  const labels = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Month",
        data: [65, 59, 80, 81, 56, 55, 40, 30, 75],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        // fill: true
      },
    ],
  };
  return (
    <section className={style.stats}>
      <div className="flex items-center justify-between">
        <BlockTitle title="Statistics" />
        <div className={style.range}>
          <span className="text-accent">Week</span>
          <span>Month</span>
          <span>Year</span>
        </div>
      </div>
      <div>
        <Line data={data} />
      </div>
    </section>
  );
}
