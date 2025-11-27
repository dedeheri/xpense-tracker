// dummy
import Container from "@/components/container";
import NetTotal from "@/components/net-total";
import Summaries from "@/components/summaries/summaries";
import Transaction from "@/components/transaction/transaction";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Description of Expense Tracker",
};

const Page = () => {
  return (
    <Container>
      <NetTotal />
      <Summaries />
      <Transaction />
    </Container>
  );
};

export default Page;
