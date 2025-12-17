"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Tooltips from "../tooltips";
import { AlertCircleIcon, LoaderCircle, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { Input } from "../ui/input";

import { toast } from "sonner";
import { Alert, AlertTitle } from "../ui/alert";
import { useAddTransaction } from "@/hooks/use-transaction";
import { ITransactionFormData } from "@/types/transaction.types";

import { Textarea } from "../ui/textarea";
import { useCategory } from "@/hooks/use-category";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import LoadingAndError from "../loading-and-error";
import { useType } from "@/hooks/use-type";

interface ISelected {
  setFormData: Dispatch<SetStateAction<ITransactionFormData>>;
}

export const SelecetedCategory = ({ setFormData }: ISelected) => {
  const { categorys, categorysLoading, categorysMessage, categorysIsError } =
    useCategory();

  const handleSelectChangeCategory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: id,
    }));
  };

  return (
    <div className="space-y-2">
      <h1 className="font-semibold w-24 text-sm">Category</h1>
      <Select onValueChange={handleSelectChangeCategory}>
        <SelectTrigger className="w-full rounded-xl">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <LoadingAndError
            isLoading={categorysLoading}
            isError={categorysIsError}
            message={categorysMessage}
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

export const SelecetedType = ({ setFormData }: ISelected) => {
  const { types, typesLoading, typesIsError, typesMessage } = useType();

  const handleOnChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      typeId: id,
    }));
  };

  return (
    <div className="space-y-2">
      <h1 className="font-semibold w-24  text-sm">Type</h1>
      <Select onValueChange={handleOnChange}>
        <SelectTrigger className="w-full rounded-xl">
          <SelectValue placeholder="Select a Type" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
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

const TransactionAdd = () => {
  const [isCloseDialog, setIsCloseDialog] = useState<boolean>(false);

  const {
    transactionAddTrigger,
    transactionAddIsError,
    transactionAddMutation,
    transactionAddMessage,
  } = useAddTransaction();

  const [formData, setFormData] = useState<ITransactionFormData>({
    typeId: "",
    categoryId: "",
    note: "",
    amount: 0,
  });

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await transactionAddTrigger("POST", formData)
      .then((res) => {
        setIsCloseDialog(false);
        toast(res?.message, {
          style: {
            borderRadius: "30px",
            height: "40px",
          },
        });

        const setIntervalId = setInterval(() => {
          window.location.reload();
          clearInterval(setIntervalId);
        }, 500);
      })
      .catch((error) => error);
  };

  return (
    <AlertDialog open={isCloseDialog} onOpenChange={setIsCloseDialog}>
      <Tooltips label="Add">
        <AlertDialogTrigger asChild>
          <Button className="rounded-full cursor-pointer h-9 w-9 md:w-auto">
            <PlusIcon />
            <p className="hidden md:block">Add</p>
          </Button>
        </AlertDialogTrigger>
      </Tooltips>

      <AlertDialogContent className="md:w-[25rem] rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Transactions</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <form className="space-y-5 px-2" onSubmit={handleOnSubmit}>
          {transactionAddIsError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{transactionAddMessage}</AlertTitle>
            </Alert>
          )}

          {/* input */}
          <div className="gap-2 flex flex-col">
            {/* type */}
            <SelecetedType setFormData={setFormData} />

            {/* category */}
            <SelecetedCategory setFormData={setFormData} />

            {/* amount */}
            <div className="space-y-2">
              <h1 className="font-semibold  text-sm w-24">Amount</h1>
              <Input
                onChange={handleOnChange}
                name="amount"
                placeholder="Amount"
                type="number"
                className="rounded-xl"
              />
            </div>

            {/* note */}
            <div className="space-y-2">
              <h1 className="font-semibold text-sm w-24">Note</h1>
              <Textarea
                name="note"
                onChange={handleOnChange}
                placeholder="Type your message here."
                className="rounded-xl"
              />
            </div>

            <div className="space-y-3 mt-5">
              <Button
                type="submit"
                disabled={transactionAddMutation}
                variant="default"
                className={`rounded-full cursor-pointer w-full`}
              >
                {transactionAddMutation && (
                  <LoaderCircle className="animate-spin" />
                )}
                Submit
              </Button>

              <Button
                onClick={() => setIsCloseDialog(false)}
                type="button"
                disabled={transactionAddMutation}
                variant="secondary"
                className={`rounded-full cursor-pointer w-full`}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransactionAdd;
