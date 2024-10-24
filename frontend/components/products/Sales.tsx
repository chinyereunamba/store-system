import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { axiosInstance } from "@/lib/utils";

type LatestSale = {
  product: string;
  selling_price: number;
  quantity_sold: number;
  sale_date: string;
};

export default function Sales() {
  const [saleData, setSaleData] = useState<LatestSale[]>([]);
  useEffect(() => {
    const getSale = async () => {
      const response = (await axiosInstance.get("/v1/latest-sales")).data;
      setSaleData(response);
    };
    getSale();
  }, []);
  return (
    <section className={`p-4`}>
      <h3>Recent Sales</h3>
      <p className="my-2">You made 255 sales this month</p>
      <ScrollArea className="mt-6 h-[460px]">
        {saleData.map((sale, index) => (
          <Sale price={sale.selling_price} product={sale.product} />
        ))}
      </ScrollArea>
    </section>
  );
}

function Sale({ price, product }: { price: number; product: string }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-200 rounded-lg mb-4">
      <h3 className="font-normal text-lg">{product}</h3>
      <p className="font-bold text-xl">+$ {(price).toLocaleString()}</p>
    </div>
  );
}
