import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ConfirmationBoxProps = {
  trigger: string;
  onConfirm: () => void; // Function to call when confirmed
};

export function ConfirmationBox({ trigger, onConfirm }: ConfirmationBoxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this product?
        </DialogDescription>
        <DialogFooter>
          <Button type="button" variant="secondary">
            No
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
