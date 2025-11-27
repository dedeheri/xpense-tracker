"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  AlertCircleIcon,
  LoaderCircle,
  PopcornIcon,
  Settings2,
  TrashIcon,
} from "lucide-react";
import { useCategory, useDeletedCategory } from "@/hooks/use-category";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import LoadingAndError from "../loading-and-error";
import Tooltips from "../tooltips";

const FilterEditted = () => {
  const {
    addDeletedCategoryTrigger,
    addDeletedCategoryMutating,
    addDeletedCategoryData,
    addDeletedCategoryMessage,
    addDeletedCategoryIsError,
  } = useDeletedCategory();
  const {
    categorys,
    categorysIsError,
    categorysLoading,
    categorysMessage,
    categorysTrigger,
  } = useCategory();

  const [selectedId, setSelectedId] = useState<string>("");

  const handleOnDeleted = (id: string) => {
    setSelectedId(id);
    addDeletedCategoryTrigger("DELETE", { id });
  };

  useEffect(() => {
    categorysTrigger();
  }, [categorysTrigger, addDeletedCategoryMutating]);

  const handleTrigger = () => {
    categorysTrigger();
  };

  return (
    <Dialog>
      <Tooltips label="Manage">
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full size-7 cursor-pointer"
          >
            <Settings2 className="size-4" />
          </Button>
        </DialogTrigger>
      </Tooltips>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage</DialogTitle>
        </DialogHeader>

        <LoadingAndError
          isLoading={categorysLoading}
          width="w-full"
          height="h-9"
          row={3}
          isError={categorysIsError}
          message={categorysMessage?.error}
        >
          {addDeletedCategoryData && (
            <Alert
              variant={addDeletedCategoryIsError ? "destructive" : "default"}
            >
              {addDeletedCategoryIsError ? (
                <AlertCircleIcon />
              ) : (
                <PopcornIcon />
              )}
              <AlertTitle>{addDeletedCategoryMessage}</AlertTitle>
            </Alert>
          )}

          <Button onClick={handleTrigger}>Trigger</Button>

          <div className="grid grid-cols-2 gap-2">
            {!categorysLoading &&
              !categorysIsError &&
              categorys?.map((category) => (
                <div
                  key={category.id}
                  className="border py- px-2 rounded-full h-12 flex items-center justify-between space-x-2"
                >
                  <div className="flex space-x-2  items-center">
                    <h1>{category.icon}</h1>
                    <h2>{category.title}</h2>
                  </div>

                  <div>
                    <Button
                      onClick={() => handleOnDeleted(category.id)}
                      variant="outline"
                      size="sm"
                      disabled={addDeletedCategoryMutating}
                      className="rounded-full size-7 cursor-pointer
        "
                    >
                      {addDeletedCategoryMutating &&
                      category.id === selectedId ? (
                        <LoaderCircle className="animate-spin" size={20} />
                      ) : (
                        <TrashIcon size={20} />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </LoadingAndError>
      </DialogContent>
    </Dialog>
  );
};

export default FilterEditted;
