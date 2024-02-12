import React from "react";
import style from "./dashboard.module.css";
import BestSales from "./bestSales";
import Stats from "./statictics";
import Performance from "./performance";
import IntroBlocks from "./blockGroup";


export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <IntroBlocks />
      <Stats />
      <BestSales />
      <Performance />
    </section>
  );
}
