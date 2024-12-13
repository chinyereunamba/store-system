import { Button } from "@/components/ui/button";
import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useProductStore, { Product } from "@/store/productContext";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useBrandStore from "@/store/brandContext";
import SelectComponent from "../utils/SelectComponent";
import useCategoryStore from "@/store/categoryContext";
import { useToast } from "@/hooks/use-toast";

type EditUpdateBoxProps = {
  trigger: string;
  type?: "add" | "update";
  onConfirm?: () => void;
};

export function AddUpdateBox({ trigger }: EditUpdateBoxProps) {
  const [product, setProduct] = useState<Product>({
    product_name: "",
    category: "",
    brand: "",
  });
  const [open, setOpen] = useState(false);
  const { brands } = useBrandStore();
  const { categories } = useCategoryStore();
  const { addProducts } = useProductStore();
  const { toast } = useToast();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      product_name: product.product_name,
      category: Number(product.category),
      brand: Number(product.brand),
    };
    addProducts(data);
    setOpen(false);
    toast({
      title: "Product Added",
      description: `${product.product_name} added successfully`,
    });
    setProduct({
      product_name: "",
      category: "",
      brand: "",
      stock_quantity: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="capitalize">{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Products</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add product to database</DialogDescription>

        <form onSubmit={submit}>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Product"
              name="product_name"
              value={product.product_name}
              onChange={(e) =>
                setProduct({ ...product, product_name: e.currentTarget.value })
              }
              required
            />
            <SelectComponent
              placeholder="Select Brand"
              value={String(product.brand)}
              onChange={(value) => {
                setProduct({ ...product, brand: value });
              }}
              options={brands.map((item) => ({
                label: item.brand,
                value: String(item.id) || "",
              }))}
            />
            {/* Category Select Component */}
            <SelectComponent
              placeholder="Select Category"
              value={String(product.category)}
              onChange={(value) => setProduct({ ...product, category: value })}
              options={categories.map((item) => ({
                label: item.category,
                value: String(item.id) || "",
              }))}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
