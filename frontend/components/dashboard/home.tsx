import React from "react"
import style from "./dashboard.module.css"
import BestSales from "./BestSales"
import Stats from "./Statictics"
import IntroBlocks from "./BlockGroup"
import RecentProducts from "./RecentProducts"

export default function Dashboard() {
    return (
        <section className={style.dashboard}>
            <IntroBlocks />
            <Stats />
            <BestSales />
            <RecentProducts />
        </section>
    )
}
