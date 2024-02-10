"use client";
import Link from "next/link";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import React from "react";
import style from "./layout.module.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter()
  const logout = async () => {
    signOut();
    router.push('/login')
  };
  return (
    <div
      className={`${style.sidebar} flex flex-col justify-between max-h-screen`}
    >
      <div>
        <div className="flex justify-between p-2 mb-4">
          <h4>ANOL</h4>
          <div className={style.burger}>
            <div className="div"></div>
            <div className="div"></div>
            <div className="div"></div>
          </div>
        </div>
        <ul className={style.sidebar_items}>
          <li>
            <Link href={"/"}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <FaHome /> Products
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <FaHome /> Ordered
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <FaHome />
              Sold
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <FaHome /> Sold
            </Link>
          </li>
        </ul>
      </div>

      <ul className={style.sidebar_items}>
        <li className="flex items-center gap-2 cursor-pointer" onClick={logout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}
