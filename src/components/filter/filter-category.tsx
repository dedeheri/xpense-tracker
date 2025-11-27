"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import AddCatergory from "./add-category";
import CategoryView from "./view-category";
import Tooltips from "../tooltips";

const FilterCategory = () => {
  const [selectedAdd, setSelectedAdd] = useState<boolean>(false);
  const handleToggleAddingMode = () => setSelectedAdd((prev) => !prev);

  return (
    <Popover>
      <Tooltips label="Category">
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            className="rounded-full cursor-pointer h-9 w-9 md:w-auto"
          >
            <SlidersHorizontal />
            <p className="hidden md:block">Category</p>
          </Button>
        </PopoverTrigger>
      </Tooltips>
      <PopoverContent className="w-64 rounded-3xl p-0" align="end">
        {selectedAdd && (
          <AddCatergory handleToggleAddingMode={handleToggleAddingMode} />
        )}

        {!selectedAdd && (
          <CategoryView handleToggleAddingMode={handleToggleAddingMode} />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FilterCategory;
