"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import useProductStore, { type Product } from "@/store/productContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSaleStore, { Sale } from "@/store/salesContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Purchase } from "@/store/purchaseContext";

export const columns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "sn",
    header: "S/n",
    cell: ({ row }) => <div className="capitalize">{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "product_name",
    header: "Products",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("product_name")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity Purchased",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "brand_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("brand_name")}</div>
    ),
  },
  {
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category_name")}</div>
    ),
  },

  {
    accessorKey: "unit_price",
    header: "Cost Price",
    cell: ({ row }) => (
      <div>$ {Number(row.getValue("unit_price")).toLocaleString()}</div>
    ),
  },

  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const purchase = row.original;
      const [open, setOpen] = useState(false);
      const { updateSale, deleteSale } = useSaleStore();
      const [editSale, setEditSale] = useState<Purchase | null>(purchase!);

      const handleDelete = () => {
        deleteSale(purchase!.id as number);
        setOpen(false);
      };

      const handleEdit = () => {
        updateSale(purchase!.id as number, editSale);
        setEditSale(null);
      };

      return (
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] w-full">
              <div className="grid gap-4">
                <DialogTitle>Edit Sale</DialogTitle>
                <Input
                  placeholder="Product"
                  value={editSale?.product_name || ""}
                  onChange={(e) =>
                    setEditSale({
                      ...editSale!,
                      product_name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Quantity sold"
                  type="number"
                  value={""}
                  onChange={(e) =>
                    setEditSale({
                      ...editSale!,
                      // quantity_sold: parseInt(e.target.value),
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={editSale?.unit_price || ""}
                  onChange={(e) =>
                    setEditSale({
                      ...editSale!,
                      // quantity_sold: parseInt(e.target.value),
                    })
                  }
                />
                <Button onClick={handleEdit}>Update</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[500px] w-full">
              <div className="grid gap-4">
                <h3>Confirm Deletion</h3>
                {/* <PopoverDescription>Product deletion</PopoverDescription> */}
                <p>
                  Are you sure you want to delete{" "}
                  {/* <strong>{purchase.supplier}</strong>? */}
                </p>
                <div className="flex justify-end">
                  <Button onClick={() => handleDelete()} variant="destructive">
                    Yes
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right">
        ${" "}
        {Number(row.getValue("unit_price")) * Number(row.getValue("quantity"))}
      </div>
    ),
  },
];
