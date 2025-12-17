import Container from "@/components/container";
import Target from "@/components/target/target";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Target - Expense Tracker",
  description: "Description of Expense Tracker",
};

const Page = () => {
  return (
    <Container>
      <Target />
    </Container>
  );
};

export default Page;
