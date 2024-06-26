"use client"
import React from "react"
import { BsGear, BsSearch, BsBell, BsPersonCircle } from "react-icons/bs"
import style from "./layout.module.css"
import { useUserContext } from "@/store/context"

export default function Header() {
    const { user } = useUserContext()
    return (
        <header className="flex items-center justify-between">
            <div className="title">
                <h4>Dashboard</h4>
            </div>
            <div className={`${style.search} flex items-center"`}>
                <input type="text" placeholder="Search products..." />
                <span>
                    <BsSearch />
                </span>
            </div>
            <div className={`${style.profile}  flex gap-4 items-center`}>
                <div className="user flex gap-2 items-center">
                    <BsPersonCircle className="" />
                    {user?.user.username}
                </div>
                <span className={style.settings}>
                    <BsBell />
                </span>
                <span className={style.settings}>
                    <BsGear />
                </span>
            </div>
        </header>
    )
}
