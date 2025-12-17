"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import { useType } from "@/hooks/use-type";
import { ScrollArea } from "../ui/scroll-area";
import { useQueryHandler } from "@/hooks/use-query";
import { useSearchParams } from "next/navigation";
import Tooltips from "../tooltips";
import LoadingAndError from "../loading-and-error";

const FilterType = () => {
  const { types, typesIsError, typesMessage, typesLoading } = useType();
  const { handleSetQuery } = useQueryHandler();

  const params = useSearchParams();
  const TypeParams = params.get("type");

  return (
    <Popover>
      <Tooltips label="Type">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full cursor-pointer h-9 w-9 md:w-auto"
          >
            <Type />
            <h1 className="hidden md:block">Type</h1>
          </Button>
        </PopoverTrigger>
      </Tooltips>
      <PopoverContent
        align="end"
        className="w-64 
       rounded-3xl p-0"
      >
        <section className=" h-full">
          {/* heading */}
          <div className="border-b py-1.5 px-4 flex justify-between items-center">
            <h3 className="font-semibold text-md">Type</h3>
          </div>

          {/* main */}
          <LoadingAndError
            isLoading={typesLoading}
            isError={typesIsError}
            message={typesMessage}
            height="h-8"
            width="w-full"
            className="px-2 py-2"
            row={4}
          >
            <ScrollArea className="space-y-0.5 min-h-10 h-24">
              {types?.map((type) => (
                <div
                  onClick={() => handleSetQuery("type", type?.title)}
                  key={type?.id}
                  className={`flex items-center  h-9 justify-between duration-300 cursor-pointer pr-4 pl-3 py-1 ${
                    TypeParams === type.title
                      ? "bg-green-100 dark:bg-green-800"
                      : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <div className="flex space-x-2">
                    <h1>{type?.icon}</h1>
                    <h1>{type?.title}</h1>
                  </div>
                </div>
              ))}
            </ScrollArea>
            {TypeParams && (
              <div className="h-8 border-t flex items-center justify-end px-4">
                <button
                  onClick={() => handleSetQuery("type", "")}
                  className="font-semibold cursor-pointer"
                >
                  Reset
                </button>
              </div>
            )}
          </LoadingAndError>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default FilterType;
