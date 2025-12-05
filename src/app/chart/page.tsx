import Container from "@/components/container";
import NetTotal from "@/components/net-total";
import Summaries from "@/components/summaries/summaries";
import { TransactionChart } from "@/components/transaction/transaction-chart";
import TransactionHeading from "@/components/transaction/transaction-heading";

import { Metadata } from "next";
import { Suspense, use } from "react";
export const metadata: Metadata = {
  title: "Chart Transaction",
  description: "Description of the Add Transaction",
};

const Page = ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) => {
  return (
    <Container>
      <NetTotal />
      <Summaries />
      <TransactionHeading />
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionChart searchParams={searchParams} />
      </Suspense>
    </Container>
  );
};

export default Page;
