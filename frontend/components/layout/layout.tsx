"use client"
import React, {useState} from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"
import style from "./layout.module.css"


export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed)
    }
    return (
        <section
            className={` ${isSidebarClosed ? style.collapsed : ""} ${
                style.layout
            }`}
        >
            <Sidebar isClosed={isSidebarClosed} toggleSidebar={toggleSidebar} />
            <Header />
            <main className={style.main}>{children}</main>
            <Footer />
        </section>
    )
}
