"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sale } from "@/store/salesContext";
import { Product } from "@/store/productContext";
import useSupplierContext, { Supplier } from "@/store/supplierContext";

export const AddSellerDetails = ({
  btnName,
  seller,
}: {
  btnName: string;
  seller?: Product[];
}) => {
  const { addSupplier } = useSupplierContext();
  const [supplierDetails, setSupplierDetails] = useState<Supplier>({
    name: "",
    contact_person: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const handleAdd = () => {
    addSupplier(supplierDetails);
    setSupplierDetails({
      name: "",
      contact_person: "",
      email: "",
      phone_number: "",
      address: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="default" className="capitalize">
          {btnName}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[500px] w-full">
        <div className="grid gap-4">
          <DialogTitle>Supplier Details</DialogTitle>
          <DialogDescription>
            This records seller details to the database
          </DialogDescription>

          <Input
            placeholder="Name of Supplier"
            type="text"
            value={supplierDetails.name || ""}
            onChange={(e) =>
              setSupplierDetails({
                ...supplierDetails!,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Contact person"
            type="text"
            value={supplierDetails.contact_person}
            onChange={(e) =>
              setSupplierDetails({
                ...supplierDetails!,
                contact_person: e.target.value,
              })
            }
          />
          <Input
            placeholder="Email address"
            type="email"
            value={supplierDetails.email || ""}
            onChange={(e) =>
              setSupplierDetails({
                ...supplierDetails!,
                email: e.target.value,
              })
            }
          />
          <Input
            placeholder="Phone"
            type="tel"
            value={supplierDetails.phone_number || ""}
            onChange={(e) =>
              setSupplierDetails({
                ...supplierDetails!,
                phone_number: e.target.value,
              })
            }
          />
          
          <textarea
            className="border rounded-md p-2 text-sm placeholder:text-primary active:outline-primary resize-none"
            placeholder="Address"
            value={supplierDetails.address}
            onChange={(e) =>
              setSupplierDetails({
                ...supplierDetails!,
                address: e.target.value,
              })
            }
          ></textarea>

          <Button type="submit" onClick={handleAdd}>
            Add Supplier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
