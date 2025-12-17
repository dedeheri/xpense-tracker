"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Fragment, useState } from "react";
import {
  AlertCircleIcon,
  DollarSign,
  LoaderCircle,
  MoreHorizontalIcon,
  PencilRuler,
  SlidersHorizontal,
  Trash,
  TypeIcon,
} from "lucide-react";
import { useDeleteTransaction } from "@/hooks/use-transaction";
import { toast } from "sonner";
import { Alert, AlertTitle } from "../ui/alert";

const TransactionTableAction = ({
  transactionId,
  categoryId,
  typeTitle,
}: {
  transactionId: string;
  categoryId: string;
  typeTitle: string;
}) => {
  const [showNewDialog, setShowNewDialog] = useState(false);

  const {
    transactionDeleteTrigger,
    transactionDeleteMutation,
    transactionDeleteMessage,
    transactionDeleteIsError,
  } = useDeleteTransaction();

  const handleDelete = async (
    transactionId: string,
    categoryId: string,
    typeTitle: string
  ) => {
    // e.preventDefault();

    await transactionDeleteTrigger("DELETE", {
      transactionId,
      categoryId,
      typeTitle,
    })
      .then((res) => {
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
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0">
          <Button
            variant="outline"
            aria-label="Open menu"
            size="icon-sm"
            className="size-6 cursor-pointer"
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 rounded-2xl" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer rounded-2xl"
              onSelect={() => setShowNewDialog(true)}
            >
              <PencilRuler className="size-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer rounded-2xl"
              onSelect={() => setShowNewDialog(true)}
            >
              <Trash className="size-4 " />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="md:w-[25rem] rounded-3xl">
          {transactionDeleteIsError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{transactionDeleteMessage}</AlertTitle>
            </Alert>
          )}

          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete.
            </DialogDescription>
          </DialogHeader>
          {/* <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button className="rounded-full cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="rounded-full cursor-pointer"
              onClick={() => handleDelete(transactionId, categoryId, typeTitle)}
              type="button"
            >
              {transactionDeleteMutation && (
                <LoaderCircle className="animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default TransactionTableAction;
