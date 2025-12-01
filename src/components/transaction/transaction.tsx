"use client";

import TransactionHeading from "./transaction-heading";
import TransactionTable from "./transaction-table";
import { usePathname } from "next/navigation";
import { TransactionChart } from "./transaction-chart";
import { Suspense } from "react";

const Transaction = () => {
  const pathName = usePathname();
  return (
    <section className="space-y-8">
      <TransactionHeading />

      <Suspense>
        {pathName === "/" ? <TransactionTable /> : <TransactionChart />}
      </Suspense>
    </section>
  );
};

export default Transaction;
