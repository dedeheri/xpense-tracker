"use client";

import { Dispatch, SetStateAction } from "react";
import { useCategory } from "@/hooks/use-category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ITransactionFormData } from "@/types/transaction.types";
import LoadingAndError from "../loading-and-error";

interface AddSelectedCategoryProps {
  setFormData: Dispatch<SetStateAction<ITransactionFormData>>;
}

const AddSelectedCategory = ({ setFormData }: AddSelectedCategoryProps) => {
  const { categorys, categorysLoading, categorysMessage, categorysIsError } =
    useCategory();

  const handleSelectChangeCategory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: id,
    }));
  };

  return (
    <div className="flex items-center gap-8">
      <h1 className="font-semibold w-24  text-sm">Category</h1>
      <Select onValueChange={handleSelectChangeCategory}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <LoadingAndError
            isLoading={categorysLoading}
            isError={categorysIsError}
            message={categorysMessage?.error}
            height="h-8"
            width="w-full"
            row={2}
          >
            {categorys?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <p> {category?.icon}</p>
                <p> {category?.title}</p>
              </SelectItem>
            ))}
          </LoadingAndError>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddSelectedCategory;
