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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="default">
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full">
        <div className="grid gap-4">
          <DialogTitle>Record Sale</DialogTitle>
          <DialogDescription>
            This records daily sales to the database
          </DialogDescription>

          <SearchableSelect
            options={options}
            handleChange={(val) =>
              setSaleDetails({ ...saleDetails!, product: val })
            }
          />

          <Input
            placeholder="Quantity sold"
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
            placeholder="Selling price"
            type="string"
            value={saleDetails?.unit_price || ""}
            onChange={(e) =>
              setSaleDetails({
                ...saleDetails!,
                unit_price: parseInt(e.target.value),
              })
            }
          />
          <Button onClick={handleAdd}>Add Sale</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
