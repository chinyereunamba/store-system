import React from "react";
import { BsFillHandbagFill, BsFillEyeFill } from "react-icons/bs";
import { GiPowderBag } from "react-icons/gi";
import { FaChartPie } from "react-icons/fa6";
import style from "./dashboard.module.css";
import Block, { BlockProps } from "./block";


export default function IntroBlocks() {
  const blockValues: BlockProps[] = [
    {
      amount: 20000,
      name: "Total Profit",
      percentage: 25,
      defaultIcon: <GiPowderBag />,
      status: "increase",
    },
    {
      amount: 2000000,
      name: "Total Sales",
      percentage: 25,
      defaultIcon: <FaChartPie />,
      status: "decrease",
    },
    {
      amount: 4250000,
      name: "Total Order",
      percentage: -5,
      defaultIcon: <BsFillHandbagFill />,
      status: "decrease",
    },
    {
      amount: 2300000,
      name: "Total View",
      percentage: 24,
      defaultIcon: <BsFillEyeFill />,
      status: "increase",
    },
  ];

  return (
    <div className={style.dashboard_intro}>
      {blockValues.map((item, index) => (
        <Block
          amount={item.amount}
          defaultIcon={item.defaultIcon}
          name={item.name}
          percentage={item.percentage}
          key={index}
          status={item.status}
        />
      ))}
    </div>
  );
}
