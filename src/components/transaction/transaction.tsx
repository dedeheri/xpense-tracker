"use client";

import TransactionHeading from "./transaction-heading";
import TransactionTable from "./transaction-table";
import { usePathname } from "next/navigation";
import { TransactionChart } from "./transaction-chart";

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
