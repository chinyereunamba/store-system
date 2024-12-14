"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SelectComponent from "../utils/SelectComponent";
import useSupplierContext from "@/store/supplierContext";
import usePurchaseStore, { PurchaseRecord } from "@/store/purchaseContext";
import { Label } from "../ui/label";

export const AddPurchaseRecord = ({ btnName }: { btnName: string }) => {
  const { fetchSupplier, suppliers } = useSupplierContext();
  const { addRecord } = usePurchaseStore();
  const [purchaseRecord, setPurchaseRecord] = useState<PurchaseRecord>({
    total_amount: 0,
    supplier: "",
  });
  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);
  const handleSubmit = () => {
    addRecord(purchaseRecord!);
    // setPurchaseRecord(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="capitalize">
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full">
        <div className="grid gap-4">
          <DialogTitle>Purchase Record</DialogTitle>
          <DialogDescription>
            This records stock purchases to the database
          </DialogDescription>
          <div className="flex flex-col gap-1">
            <Label>Amount Spent</Label>
            <Input
              placeholder="Amount spent"
              type="string"
              value={purchaseRecord!.total_amount}
              onChange={(e) =>
                setPurchaseRecord({
                  ...purchaseRecord!,
                  total_amount: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Supplier</Label>
            <SelectComponent
              value={String(purchaseRecord?.supplier)}
              placeholder="Select supplier"
              options={suppliers.map((supplier, index) => ({
                label: supplier.name,
                value: String(supplier.id),
              }))}
              onChange={(e) =>
                setPurchaseRecord({ ...purchaseRecord!, supplier: e })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Purchase Date</Label>
            <Input type="date" placeholder="Purchase Date" />
          </div>
          <Button
            onClick={() => {
              handleSubmit();
              setPurchaseRecord({ total_amount: 0, supplier: "" });
            }}
          >
            Add Purchase Record
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
