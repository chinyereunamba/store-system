import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import style from "./layout.module.css";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.layout}>
      <Sidebar />
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
}
