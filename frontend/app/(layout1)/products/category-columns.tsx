"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import useCategoryStore, { type Category } from "@/store/categoryContext";
import { Input } from "@/components/ui/input";

export const categoryColumn: ColumnDef<Category>[] = [
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
    accessorKey: "category",
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
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      const [open, setOpen] = useState(false);
      const [editCategory, setEditCategory] = useState<string>(
        category.category
      );
      const { deleteCategory, updateCategory } = useCategoryStore();
      const { toast } = useToast();

      const handleDelete = (id: number) => {
        deleteCategory(id);
        toast({
          title: "Category",
          description: `"${category.category}" deleted successfully`,
        });
        setOpen(false);
      };

      const handleEdit = () => {
        updateCategory(category.id as number, { category: editCategory });
      };

      return (
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[500px] w-full">
              <div className="grid gap-4">
                Edit Category
                <Input
                  placeholder="Category"
                  value={editCategory || ""}
                  onChange={(e) => setEditCategory(e.currentTarget.value)}
                />
                <Button onClick={handleEdit}>Update</Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <h3 className="font-medium">Confirm Deletion</h3>
                <p>Are you sure you want to delete this category?</p>
                <Button
                  onClick={() => handleDelete(category.id as number)}
                  variant="destructive"
                >
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
