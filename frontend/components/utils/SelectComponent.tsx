import React, { FormEvent, FormHTMLAttributes, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useProductStore from "@/store/productContext";

type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: any) => void;
}

export default function SelectComponent({
  options,
  placeholder,
  value,
  onChange,
}: SelectProps) {
  return (
    <Select onValueChange={onChange} value={value} required>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} aria-required>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type PSelectProps = {
  value: string | number;
  onChange: (e) => void;
};
export function SelectProducts({ value, onChange }: PSelectProps) {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Select onValueChange={onChange} value={value!} required>
      <SelectTrigger>
        <SelectValue placeholder={"Select Product"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {products.map((option) => (
            <SelectItem key={option.id} value={String(option.id)} aria-required>
              {option.product_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
