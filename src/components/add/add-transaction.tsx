"use client";
import React, { useState } from "react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronLeft,
  LoaderCircle,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddTransaction } from "@/hooks/use-transaction";
import { Card } from "../ui/card";
import { ITransactionFormData } from "@/types/transaction.types";
import AddSelectedCategory from "./add-selected-category";
import Tooltips from "../tooltips";
import AddSelectedType from "./add-selected-type";

const AddTransaction = () => {
  const router = useRouter();

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

  const handleAddTransaction = async () => {
    await transactionTrigger("POST", formData);
  };

  return (
    <section className="space-y-10">
      {/* header */}
      <section className="flex h-14 border-b items-center w-full">
        <div className="max-w-lg lg:px-0 px-5 mx-auto flex items-center justify-between w-full">
          <div className="flex items-center w-full gap-2 md:gap-3">
            <Tooltips label="Back">
              <Button
                onClick={() => router.back()}
                variant="secondary"
                size="icon"
                className="rounded-full size-8 md:size-9 cursor-pointer"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </Button>
            </Tooltips>
            <p className="font-semibold md:text-lg">Add Transaction</p>
          </div>

          <Button
            disabled={transactionMutation}
            onClick={handleAddTransaction}
            variant="default"
            size="sm"
            className={`rounded-full cursor-pointer h-8 md:h-9`}
          >
            {transactionMutation ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Plus />
            )}
            Add
          </Button>
        </div>
      </section>

      <section className="space-y-5 px-5 lg:px-0 max-w-lg  mx-auto">
        {/* message */}
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
        <Card className="gap-5 flex flex-col border p-10 rounded-3xl shadow-none">
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
        </Card>
      </section>
    </section>
  );
};

export default AddTransaction;
