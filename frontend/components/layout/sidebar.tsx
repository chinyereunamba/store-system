"use client";
import { BsHouseDoor, BsBagCheck, BsCart } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { SlPieChart } from "react-icons/sl";
import React from "react";
import style from "./layout.module.css";
import NavLink from "./navLink";
import Link from "next/link";

export default function Sidebar() {
  return (
    <section
      className={`${style.sidebar} flex flex-col justify-between  w-full style.show`}
    >
      <div>
        <div
          className={`flex justify-between items-center p-2 mb-4 min-h-12 ${style.sidebar_header}`}
        >
          <h4>Anol</h4>
        </div>
        <ul className={style.sidebar_items}>
          <NavLink to="/" name="Dashboard" icon={<BsHouseDoor />} />
          <NavLink to="/analytics" name="Analytics" icon={<SlPieChart />} />
          <NavLink to="/products" name="Products" icon={<BsBagCheck />} />
          <NavLink to="/sales" name="Sales" icon={<BsCart />} />
          <NavLink to="/purchases" name="Purchases" icon={<BsCart />} />
          <NavLink
            to="/reports"
            name="Reports"
            icon={<HiOutlineDocumentChartBar />}
          />
        </ul>
      </div>

      <ul className={style.sidebar_items}>
        <Link href={"/logout"}>
          <li className="flex items-center gap-2 cursor-pointer">
            <LuLogOut /> <span className={style.sidebar_list}>Logout</span>
          </li>
        </Link>
      </ul>
    </section>
  );
}
