import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import style from "./layout.module.css"
type NavLinkProps = {
    to: string
    name: string
    icon: React.JSX.Element
}

export default function NavLink({ to, name, icon }: NavLinkProps) {
    const pathname = usePathname()
    return (
        <li
            className={`${
                pathname == to ? style.active : ""
            } hover:scale-[102%] transition-all`}
        >
            <Link href={to} className="flex items-center leading-6 transition-all">
                {icon} <span className={style.sidebar_list}>{name}</span>
            </Link>
        </li>
    )
}
