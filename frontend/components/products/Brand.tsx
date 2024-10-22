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
import useBrandStore, { Brand } from "@/store/brandContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

type BrandProps = {
  trigger: string;
  type?: "add" | "update";
  onConfirm?: () => void;
};

export function BrandBox({ trigger, onConfirm }: BrandProps) {
  const [brand, setBrand] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addBrand } = useBrandStore();
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error

    try {
      addBrand({ brand });
      toast({
        title: "Brand",
        description: `"${brand}" add successfully`,
      });
      setOpen(false);
      setBrand("");
    } catch (error: any) {
      if (error.response?.data?.brand) {
        setErrorMessage(error.response.data.brand[0]);
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Brand</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add brand to database</DialogDescription>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Brand"
              name="brand"
              value={brand}
              required
              onChange={(e) => setBrand(e.currentTarget.value)}
            />
            <small>{errorMessage}</small>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
