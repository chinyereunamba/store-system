import React from "react";
import style from "./dashboard.module.css";
import BestSales from "./bestSales";
import Stats from "./statictics";
import Performance from "./performance";
import { BsCaretUpFill, BsCaretDownFill, BsFillHandbagFill, BsFillEyeFill} from "react-icons/bs";
import { GiPowderBag } from "react-icons/gi";
import { FaChartPie } from 'react-icons/fa6'


export default function Dashboard() {
  return (
    <section className={style.dashboard}>
      <div className={style.dashboard_intro}>
        <div className="product">
          <div className={style.card_header}>
            <span className="text-accent text-xl p-3 rounded-full bg-secondary">
              <GiPowderBag />
            </span>
            <span className={style.caret}>
              <BsCaretUpFill />
              125%
            </span>
          </div>
          <span>23</span>
          <span>Total Profit</span>
        </div>
        <div className="product">
          <div className={style.card_header}>
            <span className="text-accent text-xl p-3 rounded-full bg-secondary">
              <FaChartPie />
            </span>
            <span className={style.caret}>
              <BsCaretUpFill />
              125%
            </span>
          </div>
          <span>23</span>
          <span>Total Sales</span>
        </div>
        <div className="product">
          <div className={style.card_header}>
            <span className="text-accent text-xl p-3 rounded-full bg-secondary">
              <BsFillHandbagFill />
            </span>
            <span className={style.caret}>
              <BsCaretDownFill />
              125%
            </span>
          </div>
          <span>23</span>
          <span>Total Order</span>
        </div>
        <div className="product">
          <div className={style.card_header}>
            <span className="text-accent text-xl p-3 rounded-full bg-secondary">
              <BsFillEyeFill />
            </span>
            <span className={style.caret}>
              <BsCaretUpFill />
              125%
            </span>
          </div>
          <span>23</span>
          <span>Total View</span>
        </div>
      </div>
      <Stats />
      <BestSales />
      <Performance />
    </section>
  );
}
