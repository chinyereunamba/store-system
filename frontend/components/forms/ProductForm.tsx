import React, { FormEvent } from "react";
import { Input, InputProps as BaseInputProps } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface InputProps extends BaseInputProps {
  label?: string;
}

type ProductFormProps = {
  inputList: InputProps[];
  error?: string;
  handleSubmit: (e: FormEvent) => void;
};
export default function ProductForm({
  inputList,
  error,
  handleSubmit,
}: ProductFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {inputList.map((field, index) => (
        <div key={index} className="flex flex-col">
          {field.label && (
            <Label className="mb-2" htmlFor={field.name}>
              {field.label}
            </Label>
          )}
          <Input {...field} />
        </div>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit">Save</Button>
    </form>
  );
}
  