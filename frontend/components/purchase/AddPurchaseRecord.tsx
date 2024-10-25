"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sale } from "@/store/salesContext";
import { Product } from "@/store/productContext";

export const AddPurchaseRecord = ({
  btnName,
  seller,
}: {
  btnName: string;
  seller?: Product[];
}) => {
  const addPurchase = () => {};
  const [saleDetails, setSaleDetails] = useState<Sale>({
    product: 0,
    unit_price: 0,
    quantity_sold: 0,
  }); 


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full">
        <div className="grid gap-4">
          <DialogTitle>Purchase Record</DialogTitle>
          <DialogDescription>
            This records stock purchases to the database
          </DialogDescription>

          <Input
            placeholder="Amount spent"
            type="number"
            value={saleDetails?.quantity_sold || ""}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails!,
                quantity_sold: parseInt(e.target.value),
              })
            }
          />
          <Input
            placeholder="Seller"
            type="string"
            value={saleDetails?.unit_price || ""}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails!,
                unit_price: parseInt(e.target.value),
              })
            }
          />
          <Button onClick={addPurchase}>Add Purchase Record</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
