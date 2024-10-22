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
import SelectComponent from "@/components/utils/SelectComponent";
import useBrandStore from "@/store/brandContext";
import useCategoryStore from "@/store/categoryContext";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_name",
    header: "Products",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("product_name")}</div>
    ),
  },
  {
    accessorKey: "stock_quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("stock_quantity")}</div>,
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
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const [open, setOpen] = useState(false);
      const { updateProduct, deleteProduct } = useProductStore();
      const [editingProduct, setEditingProduct] = useState<Product>(product);
      const { brands } = useBrandStore();
      const { categories } = useCategoryStore();

      const handleDelete = () => {
        deleteProduct(product.id as number);
        setOpen(false);
      };

      const handleEdit = () => {
        updateProduct(product.id as number, editingProduct);
        // setEditingProduct(null);
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
                <DialogTitle>Edit Product</DialogTitle>
                <Input
                  placeholder="Name"
                  value={editingProduct?.product_name || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct!,
                      product_name: e.target.value,
                    })
                  }
                />
                <SelectComponent
                  placeholder="Select Brand"
                  value={String(editingProduct!.brand)} // If brand is nullable, handle null or undefined
                  onChange={
                    (e) => setEditingProduct({ ...product, brand: e }) // Convert value to number if IDs are numbers
                  }
                  options={brands.map((item) => ({
                    label: item.brand,
                    value: String(item.id) || "",
                  }))}
                />
                {/* Category Select Component */}
                <SelectComponent
                  placeholder="Select Category"
                  value={String(editingProduct!.category)}
                  onChange={(e) =>
                    setEditingProduct({
                      ...product,
                      category: e,
                    })
                  }
                  options={categories.map((item) => ({
                    label: item.category,
                    value: String(item.id) || "",
                  }))}
                />
                <Input
                  placeholder="Stock"
                  type="number"
                  value={editingProduct?.stock_quantity || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct!,
                      stock_quantity: parseInt(e.target.value),
                    })
                  }
                />
                <Button onClick={handleEdit}>Update</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px]">
              <div className="grid gap-4">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>Product deletion</DialogDescription>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{product.product_name}</strong>?
                </p>
                <div className="flex gap-4">
                  <Button variant="default" onClick={() => setOpen(false)}>
                    No
                  </Button>
                  <Button onClick={() => handleDelete()} variant="destructive">
                    Yes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
