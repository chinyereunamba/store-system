import React from "react";
import { Input } from "../ui/input"; // Assuming this is the path to Input
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select"; // Assuming this is the path to Select
import { Label } from "../ui/label";

type ComboInputSelectProps = {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectValue: string;
  onSelectChange: (value: string) => void;
  label: string;
  selectOptions: { value: string; label: string }[];
};

const ComboInputSelect: React.FC<ComboInputSelectProps> = ({
  inputValue,
  onInputChange,
  selectValue,
  onSelectChange,
  label,
  selectOptions,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>{label}</Label>
      <div className="flex space-x-2">
        {/* Input Field */}
        <Input
          value={inputValue}
          onChange={onInputChange}
          className="w-full"
          placeholder="Enter text"
        />

        {/* Select Dropdown */}
        <Select onValueChange={onSelectChange} value={selectValue}>
          <SelectTrigger className="w-32">
            {selectValue || "Select"}
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ComboInputSelect;
