import React from "react";
import style from "./dashboard.module.css";
import BestSales from "./bestSales";
import Stats from "./statictics";
import IntroBlocks from "./blockGroup";
import RecentProducts from "./recentProducts";


export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <IntroBlocks />
      <Stats />
      <BestSales />
      <RecentProducts />
    </section>
  );
}
