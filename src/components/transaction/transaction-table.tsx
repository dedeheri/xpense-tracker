"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import numberFormatter from "@/lib/number-formatter";
import moment from "moment";
import TransactionPagination from "./transaction-pagination";
import { useSearchParams } from "next/navigation";
import { useTransaction } from "@/hooks/use-transaction";
import LoadingAndError from "../loading-and-error";

const TransactionTable = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category") ?? "";
  const typeParams = searchParams.get("type") ?? "";
  const pageParams = searchParams.get("page") ?? "1";

  const params = {
    type: typeParams,
    category: categoryParams,
    page: pageParams,
  };

  const {
    transactions,
    transactionsLoading,
    transactionsError,
    transactionsMessage,
    pages,
  } = useTransaction(params);

  const typeIconInOrOut = (typeIcon: string, amount: number) => {
    if (typeIcon === "Income") {
      return (
        <div className="text-green-500 flex items-center justify-end">
          <p>+</p>
          <p>{numberFormatter(amount)}</p>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-end">
        <p>-</p>
        <p>{numberFormatter(amount)}</p>
      </div>
    );
  };

  return (
    <LoadingAndError
      isLoading={transactionsLoading}
      row={5}
      height="h-10"
      width="w-full"
      isError={transactionsError}
      message={transactionsMessage?.error}
    >
      <section className="space-y-6">
        {transactions?.map((transaction, index) => (
          <section key={index}>
            <div className="flex items-center justify-between border-b pb-3">
              <h1 className="text-md font-semibold text-muted-foreground capitalize">
                {transaction?.date}
              </h1>
            </div>

            {/* table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-0">Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right p-0">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transaction?.transactions?.map((item) => (
                  <TableRow key={item?.id}>
                    <TableCell className="font-medium capitalize p-0  w-52">
                      <div className="flex items-center">
                        <p>{moment(item?.createdAt).format("lll")}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium capitalize">
                      <div className="flex items-center gap-2">
                        <p>{item?.type?.icon}</p>
                        <p>{item?.type?.title}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium w-40">
                      <div className="flex items-center gap-2">
                        <p>{item.category?.icon}</p>
                        <p>{item.category?.title}</p>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium w-80">
                      {item.note}
                    </TableCell>

                    <TableCell className="font-medium capitalize p-0">
                      {typeIconInOrOut(item?.type?.title, item?.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        ))}

        <TransactionPagination
          currentPage={pages?.currentPage as number}
          totalPages={pages?.totalPages as number}
          totalItems={pages?.totalItems as number}
        />
      </section>
    </LoadingAndError>
  );
};

export default TransactionTable;
