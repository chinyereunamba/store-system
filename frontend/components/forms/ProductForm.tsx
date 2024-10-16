import React, { FormEvent } from "react";
import { Input, InputProps } from "../ui/input";

type ProductFormProps = {
  inputList: InputProps[];
  handleSubmit: (e: FormEvent) => void;
};
export default function ProductForm({
  inputList,
  handleSubmit,
}: ProductFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {inputList.map((field, index) => (
        <Input
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      ))}
    </form>
  );
}
