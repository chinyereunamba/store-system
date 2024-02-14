"use client";
import Link from "next/link";
import { BsHouseDoor, BsBagCheck, BsCart } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { SlPieChart } from "react-icons/sl";
import React from "react";
import style from "./layout.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavLink from "./navLink";

export default function Sidebar() {
  const router = useRouter();
  const logout = async () => {
    signOut();
    router.push("/login");
  };
  return (
    <div
      className={`${style.sidebar} flex flex-col justify-between max-h-screen h-[96vh]`}
    >
      <div>
        <div className="flex justify-between items-center p-2 mb-4">
          <h4>Anol</h4>
          <div className={style.burger}>
            <div className="div"></div>
            <div className="div"></div>
            <div className="div"></div>
          </div>
        </div>
        <ul className={style.sidebar_items}>
          <NavLink to="/" name="Dashboard" icon={<BsHouseDoor />} />
          <NavLink to="/analytics" name="Analytics" icon={<SlPieChart />} />
          <NavLink to="/products" name="Products" icon={<BsBagCheck />} />
          <NavLink to="/sales" name="Sales" icon={<BsCart />} />
          <NavLink to="/orders" name="Purchases" icon={<BsCart />} />
          <NavLink to="/reports" name="Reports" icon={<HiOutlineDocumentChartBar />} />

        </ul>
      </div>

      <ul className={style.sidebar_items}>
        <li className="flex items-center gap-2 cursor-pointer" onClick={logout}>
          <LuLogOut /> Logout
        </li>
      </ul>
    </div>
  );
}
