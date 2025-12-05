import Container from "@/components/container";
import NetTotal from "@/components/net-total";
import Summaries from "@/components/summaries/summaries";
import { TransactionChart } from "@/components/transaction/transaction-chart";
import TransactionHeading from "@/components/transaction/transaction-heading";

import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Chart Transaction",
  description: "Description of the Add Transaction",
};

const Page = () => {
  return (
    <Container>
      <NetTotal />
      <Summaries />
      <TransactionHeading />
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionChart />
      </Suspense>
    </Container>
  );
};

export default Page;
