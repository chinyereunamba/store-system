import { Purchase, PurchaseRecord } from "@/store/purchaseContext";
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

const PurchaseForm = ({
  btn,
  products,
  purchaseRecord,
}: {
  btn: string;
  products: Product[];
  purchaseRecord: PurchaseRecord[];
}) => {
  const [purchases, setPurchases] = useState([
    { product: "", quantity: 0, date: "", unit_price: "" },
  ]);

  const [purchaseProducts, setPurchaseProducts] = useState({
    purchaseOrder: '',
    purchases,
  });

  const handleAddPurchase = () => {
    setPurchases([
      ...purchases,
      { product: "", quantity: 0, unit_price: "", date: "" },
    ]);
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
  };

  const handleSubmit = () => {
    // Submit all purchases at once to the backend
    console.log(purchases, purchaseProducts.purchaseOrder);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{btn}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Purchase Items</DialogTitle>
        <DialogDescription>Bulk upload of purchase items</DialogDescription>

        <ScrollArea className="max-h-[500px] px-5">
          <div className="mb-4">
            <SelectComponent
              placeholder="Select Purchase Record"
              value={purchaseProducts.purchaseOrder}
              onChange={(e) =>
                setPurchaseProducts({ ...purchaseProducts, purchaseOrder: e })
              }
              options={purchaseRecord.map((record, index) => ({
                label: `${record.supplier_name} — ${record.purchase_date}`,
                value: String(record.id),
              }))}
            />
          </div>
          {purchases.map((purchase, index) => (
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
                placeholder="Quantity"
                value={purchase.quantity}
                onChange={(e) =>
                  handleChange(index, "quantity", e.target.value)
                }
              />
              <Input
                type="text"
                value={purchase.unit_price}
                onChange={(e) =>
                  handleChange(index, "unit_price", e.target.value)
                }
              />
              <Input type="date" value={purchase.date} onChange={(e) => {}} />
            </div>
          ))}
        </ScrollArea>

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" variant={"outline"} onClick={handleAddPurchase}>
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
