"use client"
import React, { createContext, useContext, useState } from "react"

type SidebarContextProps = {
    expanded: boolean | null
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}
const SidebarContext = createContext<SidebarContextProps | null>(null)

export default function SidebarContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [expanded, setExpanded] = useState(true)
    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    )
}

const useSidebarContext = () => {
    const sidebarContext = useContext(SidebarContext)
    if (sidebarContext === null) {
        throw new Error(
            "useSidebarContext must be used within a UserContextProvider"
        )
    }

    return sidebarContext
}

export {useSidebarContext}