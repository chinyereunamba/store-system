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
import ProductForm from "../forms/ProductForm";
import useProductStore, { Product } from "@/store/productContext";

type EditUpdateBoxProps = {
  trigger: string;
  type: "add" | "update";
  onConfirm: () => void;
};

export function AddUpdateBox({ trigger, type, onConfirm }: EditUpdateBoxProps) {
  const [product, setProduct] = useState<Product>({
    product_name: "",
    category_name: "",
    brand_name: "",
    stock_quantity: 0,
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const { addProducts } = useProductStore();
    const data = {
      product_name: product.product_name,
      category_name: product.category_name,
      brand_name: product.brand_name,
      stock_quantity: product.stock_quantity,
    };
    addProducts(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Products</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add product to database</DialogDescription>
        <ProductForm
          handleSubmit={submit}
          inputList={[
            {
              type: "text",
              placeholder: "5w Bulb",
              name: "productName",
              value: product.product_name,
              onChange: (e) =>
                setProduct({
                  ...product,
                  product_name: e.currentTarget.value,
                }),
            },
            {
              type: "number",
              name: "stockQuantity",
              value: product.stock_quantity,
              onChange: (e) =>
                setProduct({
                  ...product,
                  stock_quantity: e.currentTarget.value,
                }),
            },
            {
              type: "text",
              placeholder: "Bulbs",
              name: "categoryName",
              value: product.category_name,
              onChange: (e) =>
                setProduct({
                  ...product,
                  category_name: e.currentTarget.value,
                }),
            },
            {
              type: "text",
              placeholder: "Itel",
              name: "brandName",
              value: product.brand_name,
              onChange: (e) =>
                setProduct({ ...product, brand_name: e.currentTarget.value }),
            },
          ]}
        />
        <DialogFooter>
          <Button type="submit" variant="default" onClick={onConfirm}>
            Save product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
