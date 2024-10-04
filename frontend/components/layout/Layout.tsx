"use client"
import React from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"
import style from "./layout.module.css"
import { useSidebarContext } from "@/store/sidebarContext"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { expanded, setExpanded } = useSidebarContext()
    return (
        <section
            className={` ${!expanded ? style.collapsed : ""} ${style.layout}`}
        >
            <Sidebar />
            <Header />
            <main className={style.main}>{children}</main>
            <Footer />
        </section>
    )
}
