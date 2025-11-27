"use client";

import { useTransaction } from "@/hooks/use-transaction";
import Loading from "../loading-and-error";
import TransactionHeading from "./transaction-heading";
import TransactionTable from "./transaction-table";
import { usePathname, useSearchParams } from "next/navigation";
import TransactionPagination from "./transaction-pagination";
import { TransactionChart } from "./transaction-chart";
import { Alert, AlertTitle } from "../ui/alert";

const Transaction = () => {
  const pathName = usePathname();
  return (
    <section className="space-y-8">
      <TransactionHeading />

      <section>
        {pathName === "/" ? <TransactionTable /> : <TransactionChart />}
      </section>
    </section>
  );
};

export default Transaction;
