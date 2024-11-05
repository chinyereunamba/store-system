import usePurchaseStore, {
  Purchase,
  PurchaseRecord,
} from "@/store/purchaseContext";
import { ReactHTMLElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SelectComponent from "../utils/SelectComponent";
import { Product } from "@/store/productContext";
import { Calendar } from "../ui/calendar";

const PurchaseForm = ({
  btn,
  products,
  purchaseRecord,
}: {
  btn: string;
  products: Product[];
  purchaseRecord: PurchaseRecord[];
}) => {
  const { addPurchase } = usePurchaseStore();
  const [isComplete, setIsComplete] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState<string | number>("");
  const [purchases, setPurchases] = useState([
    {
      product: "",
      quantity: 1,
      unit_price: "",
    },
  ]);

  const handleAddPurchase = () => {
    const allFieldsFilled = purchases.every(
      (purchase) => purchase.product && purchase.quantity && purchase.unit_price
    );
    setIsComplete(allFieldsFilled);
    if (isComplete) {
      setPurchases([
        ...purchases,
        {
          product: "",
          quantity: 1,
          unit_price: "",
        },
      ]);
      setIsComplete((prev) => !prev);
    }
  };

  const handleChange = (
    index: number,
    field: keyof Purchase,
    value: string | number
  ) => {
    const updatedPurchases = [...purchases];
    updatedPurchases[index] = {
      ...updatedPurchases[index],
      [field]: value,
    };
    setPurchases(updatedPurchases);
    const allFieldsFilled = updatedPurchases.every(
      (purchase) => purchase.product && purchase.quantity && purchase.unit_price
    );
    setIsComplete(allFieldsFilled);
  };

  const handleSubmit = () => {
    // Submit all purchases at once to the backend
    const refinedPurchase = purchases.map((item) =>
      Object.assign({}, item, { purchase_order: purchaseOrder })
    );
    addPurchase(refinedPurchase as Purchase[]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{btn}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Purchase Items</DialogTitle>
        <DialogDescription>Bulk upload of purchase items</DialogDescription>

        <ScrollArea className="max-h-[500px]">
          <div className="mb-4">
            <SelectComponent
              placeholder="Select Purchase Record"
              value={purchaseOrder as string}
              onChange={(e) => setPurchaseOrder(e)}
              options={purchaseRecord.map((record, index) => ({
                label: `${record.supplier_name} — ${record.purchase_date}`,
                value: String(record.id),
              }))}
            />
          </div>
          {purchaseOrder !== "" &&
            purchases.map((purchase, index) => (
              <div key={index} className="mb-4 flex flex-col gap-2">
                <SelectComponent
                  placeholder="Select Product"
                  value={purchase.product}
                  onChange={(e) => handleChange(index, "product", e)}
                  options={products.map((product, index) => ({
                    label: product.product_name,
                    value: String(product.id),
                  }))}
                />
                <Input
                  type="number"
                  min={1}
                  placeholder="Quantity"
                  value={purchase.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  required
                />
                <Input
                  type="text"
                  value={purchase.unit_price}
                  placeholder="Cost price"
                  onChange={(e) =>
                    handleChange(index, "unit_price", e.target.value)
                  }
                  required
                />
              </div>
            ))}
        </ScrollArea>

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            variant={"outline"}
            disabled={!isComplete}
            className={`${isComplete == false && "cursor-not-allowed"}`}
            onClick={handleAddPurchase}
          >
            Add Another Purchase
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit Purchases
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseForm;
