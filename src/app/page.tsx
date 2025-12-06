// dummy
import Container from "@/components/container";
import NetTotal from "@/components/net-total";
import Summaries from "@/components/summaries/summaries";
import TransactionCard from "@/components/transaction/transaction-card";

import TransactionHeading from "@/components/transaction/transaction-heading";
import TransactionTable from "@/components/transaction/transaction-table";

import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Description of Expense Tracker",
};

const Page = () => {
  return (
    <Container>
      <NetTotal />
      <Summaries />
      <TransactionHeading />
      <TransactionTable />
    </Container>
  );
};

export default Page;
