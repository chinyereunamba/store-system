"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import useBrandContext, { type Brand } from "@/store/brandContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const brandColumn: ColumnDef<Brand>[] = [
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
    accessorKey: "brand",
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
      <div className="capitalize">{row.getValue("brand")}</div>
    ),
  },
  //   {
  //     accessorKey: "stock_quantity",
  //     header: "Quantity",
  //     cell: ({ row }) => <div>{row.getValue("stock_quantity")}</div>,
  //   },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      const [open, setOpen] = useState(false);
      const { brands, deleteBrand } = useBrandContext();
      const { toast } = useToast();

      const handleDelete = (id: number) => {
        deleteBrand(id);
        toast({
          title: "Brand",
          description: `${brands.find((item) => item.id)} deleted successfully`,
        });
      };

      return (
        <div className="flex space-x-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h3 className="font-medium">Confirm Deletion</h3>
                <p>Are you sure you want to delete this brand?</p>
                <Button onClick={() => handleDelete(3)} variant="destructive">
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
