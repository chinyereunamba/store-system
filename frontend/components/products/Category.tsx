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
import useCategoryStore, { Category } from "@/store/categoryContext";
import { useToast } from "@/hooks/use-toast";

type categoryProps = {
  trigger: string;
  type?: "add" | "update";
  onConfirm?: () => void;
};

export function CategoryBox({ trigger, onConfirm }: categoryProps) {
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addCategory } = useCategoryStore();
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error

    try {
      await addCategory({ category });
      toast({
        title: "Category",
        description: `${category} add successfully`,
      });
      setOpen(false);
    } catch (error: any) {
      if (error.response?.data?.category) {
        setErrorMessage(error.response.data.category[0]);
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
          <DialogTitle>Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add Category to database</DialogDescription>
        <ProductForm
          handleSubmit={submit}
          error={errorMessage}
          inputList={[
            {
              type: "text",
              placeholder: "Category",
              name: "category",
              value: category,
              onChange: (e) => setCategory(e.currentTarget.value),
            },
          ]}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
 