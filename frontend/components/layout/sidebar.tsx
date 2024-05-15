"use client"
import { BsHouseDoor, BsBagCheck, BsCart } from "react-icons/bs"
import { LuLogOut, LuSettings } from "react-icons/lu"
import { HiOutlineDocumentChartBar } from "react-icons/hi2"
import { SlPieChart } from "react-icons/sl"
import {
    PiCaretDoubleLeftDuotone,
    PiCaretDoubleRightDuotone,
} from "react-icons/pi"
import React, { useState } from "react"
import style from "./layout.module.css"
import NavLink from "./NavLink"
type Props = { isClosed: boolean; toggleSidebar: () => void }
export default function Sidebar({ isClosed, toggleSidebar }: Props) {
    return (
        <section
            className={`${
                style.sidebar
            } flex flex-col transition-all justify-between w-full ${
                isClosed && style.close
            } `}
        >
            <div>
                <div
                    className={`flex justify-between items-center p-2 mb-4 min-h-12 ${style.sidebar_header}`}
                >
                    <h4
                        className={`transition-all ${
                            isClosed ? "w-0" : "w-auto"
                        }`}
                    >
                        Anol
                    </h4>
                    {isClosed ? (
                        <PiCaretDoubleRightDuotone
                            onClick={toggleSidebar}
                            size={27}
                            cursor={"pointer"}
                        />
                    ) : (
                        <PiCaretDoubleLeftDuotone
                            onClick={toggleSidebar}
                            size={27}
                            cursor={"pointer"}
                        />
                    )}
                </div>
                <ul className={style.sidebar_items}>
                    <NavLink to="/" name="Dashboard" icon={<BsHouseDoor />} />
                    <NavLink
                        to="/products"
                        name="Products"
                        icon={<BsBagCheck />}
                    />
                    <NavLink
                        to="/analytics"
                        name="Analytics"
                        icon={<SlPieChart />}
                    />
                    <NavLink to="/sales" name="Sales" icon={<BsCart />} />
                    <NavLink
                        to="/purchases"
                        name="Purchases"
                        icon={<BsCart />}
                    />
                    <NavLink
                        to="/reports"
                        name="Reports"
                        icon={<HiOutlineDocumentChartBar />}
                    />
                </ul>
            </div>

            <ul className={style.sidebar_items}>
                <NavLink to="/settings" name="Settings" icon={<LuSettings />} />
                <NavLink to="/logout" name="Logout" icon={<LuLogOut />} />
            </ul>
        </section>
    )
}
