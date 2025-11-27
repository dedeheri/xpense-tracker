"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import FilterEditted from "./filter-editted";
import { useQueryHandler } from "@/hooks/use-query";
import { useCategory } from "@/hooks/use-category";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import LoadingAndError from "../loading-and-error";
import Tooltips from "../tooltips";

interface CategoryViewProps {
  handleToggleAddingMode: () => void;
}

const CategoryView = ({ handleToggleAddingMode }: CategoryViewProps) => {
  const { categorys, categorysMessage, categorysLoading, categorysIsError } =
    useCategory();

  const { handleSetQuery } = useQueryHandler();
  const params = useSearchParams();
  const categoryParams = params.get("category");

  return (
    <section className=" h-full">
      {/* heading */}
      <div className="border-b py-1.5 px-4 flex justify-between items-center">
        <h3 className="font-semibold text-md">Category </h3>
        <div className="space-x-1">
          <Tooltips label="Add">
            <Button
              onClick={handleToggleAddingMode}
              variant="secondary"
              size="icon"
              className="rounded-full size-7 cursor-pointer"
            >
              <PlusIcon className="size-4" />
            </Button>
          </Tooltips>

          <FilterEditted />
        </div>
      </div>

      {/* main */}

      <LoadingAndError
        height="h-8"
        width=""
        className="px-2 py-2"
        row={4}
        isLoading={categorysLoading}
        isError={categorysIsError}
        message={categorysMessage?.error}
      >
        <ScrollArea className="space-y-0.5 min-h-10 h-52 max-h-52">
          {categorys?.map((category) => (
            <div
              onClick={() => handleSetQuery("category", category?.title)}
              key={category?.id}
              className={`flex items-center  h-9 justify-between duration-300 cursor-pointer pr-4 pl-3 py-1 ${
                categoryParams === category.title
                  ? "bg-green-100 dark:bg-green-800"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              <div className="flex space-x-2 ">
                <h1>{category?.icon}</h1>
                <h1>{category?.title}</h1>
              </div>

              <p>{category?.count}</p>
            </div>
          ))}
        </ScrollArea>
      </LoadingAndError>

      {categoryParams && (
        <div className="h-10 border-t flex items-center justify-end px-6">
          <button
            onClick={() => handleSetQuery("category", "")}
            className="font-semibold cursor-pointer"
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
};

export default CategoryView;
