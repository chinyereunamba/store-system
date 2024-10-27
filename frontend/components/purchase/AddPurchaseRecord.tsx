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

export const AddPurchaseRecord = ({ btnName }: { btnName: string }) => {
  const { fetchSupplier, suppliers } = useSupplierContext();
  const { addRecord } = usePurchaseStore();
  const [purchaseRecord, setPurchaseRecord] = useState<PurchaseRecord | null>({
    total_amount: 0,
    supplier: null,
  });
  useEffect(() => {
    fetchSupplier();
  }, [fetchSupplier]);
  const handleSubmit = () => {
    addRecord(purchaseRecord!);
    setPurchaseRecord(null);
  };

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
            value={purchaseRecord!.total_amount || ""}
            onChange={(e) =>
              setPurchaseRecord({
                ...purchaseRecord!,
                total_amount: parseInt(e.target.value),
              })
            }
          />
          <SelectComponent
            value={String(purchaseRecord!.supplier)}
            placeholder="Select supplier"
            options={suppliers.map((supplier, index) => ({
              label: supplier.name,
              value: String(supplier.id),
            }))}
            onChange={(e) =>
              setPurchaseRecord({ ...purchaseRecord!, supplier: e })
            }
          />
          <Button onClick={handleSubmit}>Add Purchase Record</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
