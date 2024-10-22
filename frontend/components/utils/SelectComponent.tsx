import React, { FormEvent, FormHTMLAttributes } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
