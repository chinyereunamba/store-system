"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import useSupplierContext, { Supplier } from "@/store/supplierContext";

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "sn",
    header: "S/n",
    cell: ({ row }) => <div className="capitalize">{Number(row.id) + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => <div>{row.getValue("contact_person")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },

  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phone_number")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },

  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const supplier = row.original;
      const [open, setOpen] = useState(false);
      const { updateSupplier, deleteSupplier } = useSupplierContext();
      const [editSupplier, setEditSupplier] = useState<Supplier | null>(
        supplier!
      );

      const handleDelete = () => {
        deleteSupplier(supplier!.id as number);
        setOpen(false);
      };

      const handleEdit = () => {
        updateSupplier(editSupplier!, supplier!.id as number);
        setEditSupplier(null);
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
                <DialogTitle>Edit Supplier</DialogTitle>
                <Input
                  placeholder="Supplier"
                  type="string"
                  value={editSupplier?.name || ""}
                  onChange={(e) =>
                    setEditSupplier({
                      ...editSupplier!,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Contact Person"
                  type="string"
                  value={editSupplier?.contact_person || ""}
                  onChange={(e) =>
                    setEditSupplier({
                      ...editSupplier!,
                      contact_person: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Email"
                  type="string"
                  value={editSupplier?.email || ""}
                  onChange={(e) =>
                    setEditSupplier({
                      ...editSupplier!,
                      email: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={editSupplier?.phone_number || ""}
                  onChange={(e) =>
                    setEditSupplier({
                      ...editSupplier!,
                      phone_number: e.target.value,
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
];
