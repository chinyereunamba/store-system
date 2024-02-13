import React from "react";
import style from "./dashboard.module.css";
import BlockTitle from "../utils/blockTitle";

export default function RecentProducts() {
  return (
    <section className={style.performa}>
      <BlockTitle title="Recent Products" />
      <div className="mt-3 flex flex-col gap-2">
        <div className="py-2 flex flex-col gap-1">
          <p>Test Product 1</p>
          <p className="text-sm text-[gray]">10pcs</p>
        </div>
        <div className="py-2 flex flex-col gap-1">
          <p>Test Product 2</p>
          <p className="text-sm text-[gray]">4pcs</p>
        </div>
        <div className="py-2 flex flex-col gap-1">
          <p>Test Product 3</p>
          <p className="text-sm text-[gray]">1pck</p>
        </div>
        <div className="py-2 flex flex-col gap-1">
          <p>Test Product 4</p>
          <p className="text-sm text-[gray]">1pck</p>
        </div>
      </div>
    </section>
  );
}
