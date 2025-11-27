"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ITransactionFormData } from "@/types/transaction.types";
import LoadingAndError from "../loading-and-error";
import { useType } from "@/hooks/use-type";

interface AddSelectedTypeProps {
  setFormData: Dispatch<SetStateAction<ITransactionFormData>>;
}

const AddSelectedType = ({ setFormData }: AddSelectedTypeProps) => {
  const { types, typesLoading, typesIsError, typesMessage } = useType();

  const handleOnChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: id,
    }));
  };

  return (
    <div className="flex items-center gap-8">
      <h1 className="font-semibold w-24  text-sm">Category</h1>
      <Select onValueChange={handleOnChange}>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          <LoadingAndError
            isLoading={typesLoading}
            isError={typesIsError}
            message={typesMessage?.error}
            height="h-8"
            width="w-full"
            row={2}
          >
            {types?.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                <p> {type?.icon}</p>
                <p> {type?.title}</p>
              </SelectItem>
            ))}
          </LoadingAndError>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddSelectedType;
