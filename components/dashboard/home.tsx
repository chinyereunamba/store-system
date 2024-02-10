import React from "react";
import style from './dashboard.module.css'

export default function Dashboard() {
  return (
    <section>
      <div className={style.dashboard_intro}>
        <div className="product">
          <span>23</span>
          <span>Products</span>
        </div>
        <div className="product">
          <span>23</span>
          <span>Products</span>
        </div>
        <div className="product">
          <span>23</span>
          <span>Products</span>
        </div>
        <div className="product">
          <span>23</span>
          <span>Products</span>
        </div>
      </div>
    </section>
  );
}
