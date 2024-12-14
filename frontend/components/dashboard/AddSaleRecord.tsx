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
import SearchableSelect from "../utils/SelectCombo";
import useSaleStore, { Sale } from "@/store/salesContext";
import { Product } from "@/store/productContext";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

export const AddSaleRecord = ({
  btnName,
  products,
}: {
  btnName: string;
  products: Product[];
}) => {
  const [saleDetails, setSaleDetails] = useState<Sale | null>({
    product: undefined,
    unit_price: 0,
    quantity_sold: 0,
  });
  const { addSales } = useSaleStore();
  const [productInput, setProductInput] = useState<string>("");
  const options = [];
  for (let index = 0; index < products.length; index++) {
    const label = products[index].product_name;
    const value = products[index].id;
    options.push({ label: label, value: String(value) });
  }

  const { toast } = useToast();

  const handleAdd = () => {
    addSales(saleDetails!);
    toast({
      title: "Sales",
      description: `New sale add successfully`,
    });
    setSaleDetails(null);
  };

  const selectProduct = (val: any) => {
    setSaleDetails({ ...saleDetails!, product: val, unit_price: products[val].selling_price as number ?? 0 });
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
          <DialogTitle>Record Sale</DialogTitle>
          <DialogDescription>
            This records daily sales to the database
          </DialogDescription>

          <SearchableSelect options={options} handleChange={selectProduct} />
          <div className="flex flex-col gap-2">
            <Label className="!text-sm">Quantity Sold</Label>
            <Input
              aria-label="quantity"
              type="string"
              value={saleDetails?.quantity_sold || 1}
              onChange={(e) =>
                setSaleDetails({
                  ...saleDetails!,
                  quantity_sold: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="!text-sm pb-2">Selling Price</Label>

            <Input
              type="string"
              value={saleDetails?.unit_price || ""}
              onChange={(e) =>
                setSaleDetails({
                  ...saleDetails!,
                  unit_price: parseInt(e.target.value),
                })
              }
            />
          </div>
          <Button onClick={handleAdd}>Add Sale</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
