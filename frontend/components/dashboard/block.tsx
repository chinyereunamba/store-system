import React from "react";
import style from "./dashboard.module.css";
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";

type BlockProps = {
  defaultIcon: React.JSX.Element;
  percentage: number;
  amount: number;
  name: string;
  status: "increase" | "decrease";
};

export type { BlockProps };

export default function Block({
  defaultIcon,
  percentage,
  amount,
  name,
  status,
}: BlockProps) {
  const color = status == "increase" ? style.increase : style.decrease;

  let caret: React.JSX.Element;
  if (status == "increase") {
    caret = <BsCaretUpFill />;
  } else {
    caret = <BsCaretDownFill />;
  }
  return (
    <div className="product">
      <div className={style.card_header}>
        <span className="text-accent text-xl p-3 rounded-full bg-secondary">
          {defaultIcon}
        </span>
        <span className={`${style.caret} ${color}`}>
          {caret}
          {percentage}%
        </span>
      </div>
      <div className="flex flex-col gap-1 self-start justify-center">
        <span className="text-2xl font-bold">₦ {amount.toLocaleString()}</span>
        <span className="text-sm text-[grey] self-start font-bold">{name}</span>
      </div>
    </div>
  );
}
