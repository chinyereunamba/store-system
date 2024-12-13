import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { axiosInstance } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

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
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 255 sales this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-fit">
          {saleData.map((sale, index) => (
            <Sale
              key={index}
              price={sale.selling_price * sale.quantity_sold}
              quantity={sale.quantity_sold}
              product={sale.product}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
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
