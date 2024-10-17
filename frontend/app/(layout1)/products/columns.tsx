"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationBox } from "@/components/utils/Confirmation";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import useProductStore, { type Product } from "@/store/productContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
      const handleDelete = (id:number) => {
        // Implement your delete API call here
        console.log(`Deleting product with ID: ${product.id}`);
        // Optionally refresh the table data after deletion
      };
      const { products, updateProduct, deleteProduct } = useProductStore();
      const [editingProduct, setEditingProduct] = useState<Product | null>(
        null
      );

      const handleEdit = (product: Product) => {
        setEditingProduct(product);
      };

      const handleUpdate = () => {
        // if (editingProduct) {
        //   updateProduct(editingProduct.id, editingProduct);
        //   setEditingProduct(null);
        //   toast.success("Product updated successfully");
        // }
      };

      // const handleDelete = (id: string) => {
      //   deleteProduct(id);
      //   toast.success("Product deleted successfully");
      // };

      const handleViewDetails = (product: Product) => {
        // toast(`Product Details: ${JSON.stringify(product)}`, {
        //   duration: 5000,
        // });
      };

      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem
        //       onClick={() =>
        //         navigator.clipboard.writeText(product.product_name)
        //       }
        //     >
        //       Copy payment ID
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>Edit</DropdownMenuItem>

        //     <DropdownMenuItem
        //       className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive"
        //     >
        //       <ConfirmationBox trigger="Delete" onConfirm={handleDelete} />
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h3 className="font-medium">Edit Product</h3>
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
                <Input
                  placeholder="Category"
                  value={editingProduct?.category_name || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct!,
                      category_name: e.target.value,
                    })
                  }
                />
                {/* <Input
                  placeholder="Price"
                  type="number"
                  value={editingProduct?.price || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct!,
                      price: parseFloat(e.target.value),
                    })
                  }
                /> */}
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
                <Button onClick={handleUpdate}>Update</Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h3 className="font-medium">Confirm Deletion</h3>
                <p>Are you sure you want to delete this product?</p>
                <Button
                  onClick={() => handleDelete(3)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleViewDetails(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
       