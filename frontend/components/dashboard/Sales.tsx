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
      const response: [] = (await axiosInstance.get("/v1/latest-sales/")).data;
      setSaleData(response.reverse());
    };
    getSale();
  }, []);
  return (
    <section className={`p-4`}>
      <h3>Recent Sales</h3>
      <p className="my-2">You made 255 sales this month</p>
      <ScrollArea className="mt-6 h-fit">
        {saleData.map((sale, index) => (
          <Sale
            key={index}
            price={sale.selling_price}
            quantity={sale.quantity_sold}
            product={sale.product}
          />
        ))}
      </ScrollArea>
    </section>
  );
}

function Sale({
  price,
  product,
  quantity,
}: {
  price: number;
  product: string;
  quantity: number;
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-200 rounded-lg mb-4">
      <div className="flex gap-4">
        <h3 className="font-normal text-base">{product}</h3>
        <p className="text-sm">{quantity}</p>
      </div>
      <p className="font-bold text-base">+&#8358; {price.toLocaleString()}</p>
    </div>
  );
}
