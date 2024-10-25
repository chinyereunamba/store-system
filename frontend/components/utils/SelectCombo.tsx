import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; // Assuming you're using the shadcn component path
import { Input } from "@/components/ui/input"; // Input component from ShadCN for the search bar

const SearchableSelect = ({ options }: { options: [] }) => {
  const [searchValue, setSearchValue] = React.useState("");

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a product" />
      </SelectTrigger>
      <SelectContent>
        {/* Search Input */}
        <div className="p-2">
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full"
          />
        </div>
        {/* Display Options */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-sm text-gray-500">No options found.</div>
        )}
      </SelectContent>
    </Select>
  );
};

export default SearchableSelect;
