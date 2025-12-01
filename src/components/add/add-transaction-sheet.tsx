"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Tooltips from "../tooltips";
import { Button } from "../ui/button";
import { LoaderCircle, PlusIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useAddTransaction } from "@/hooks/use-transaction";
import { ITransactionFormData } from "@/types/transaction.types";
import AddSelectedCategory from "./add-selected-category";
import AddSelectedType from "./add-selected-type";

const AddTransactionSheet = () => {
  const {
    transactionTrigger,
    transactionIsError,
    transactionMutation,
    transactionMessage,
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

    await transactionTrigger("POST", formData);
  };

  return (
    <Sheet>
      <Tooltips label="Add">
        <SheetTrigger asChild>
          <Button className="rounded-full cursor-pointer h-9 w-9 md:w-auto">
            <PlusIcon />
            <p className="hidden md:block">Add</p>
          </Button>
        </SheetTrigger>
      </Tooltips>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
        </SheetHeader>

        <form className="space-y-5 px-5 mt-5" onSubmit={handleOnSubmit}>
          {transactionIsError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{transactionMessage}</AlertTitle>
            </Alert>
          )}

          {!transactionIsError && transactionMessage && (
            <Alert variant="default">
              <CheckCircle2Icon />
              <AlertTitle>{transactionMessage}</AlertTitle>
            </Alert>
          )}

          {/* input */}
          <div className="gap-2 flex flex-col">
            {/* type */}
            <AddSelectedType setFormData={setFormData} />

            {/* category */}
            <AddSelectedCategory setFormData={setFormData} />

            {/* amount */}
            <div className="flex items-center gap-8">
              <h1 className="font-semibold  text-sm w-24">Amount</h1>
              <Input
                onChange={handleOnChange}
                name="amount"
                placeholder="Amount"
                type="number"
              />
            </div>

            {/* note */}
            <div className="flex items-center gap-8">
              <h1 className="font-semibold text-sm w-24">Note</h1>
              <Textarea
                name="note"
                onChange={handleOnChange}
                placeholder="Type your message here."
              />
            </div>

            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                disabled={transactionMutation}
                variant="default"
                size="sm"
                className={`rounded-full cursor-pointer h-8 md:h-9`}
              >
                {transactionMutation && (
                  <LoaderCircle className="animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTransactionSheet;
