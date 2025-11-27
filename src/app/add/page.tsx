import AddTransaction from "@/components/add/add-transaction";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Transaction",
  description: "Description of the Add Transaction",
};

const Page = () => {
  return <AddTransaction />;
};

export default Page;
