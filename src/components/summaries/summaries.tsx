"use client";

import { useSummariesTransaction } from "@/hooks/use-transaction";
import CardSummaries from "./card-summaries";

const Summaries = () => {
  const { summaries, summariesLoading } = useSummariesTransaction();

  return (
    <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      <CardSummaries
        title="Income"
        increase={summaries?.income?.increase}
        amount={summaries?.income?.amount}
        percent={summaries?.income?.percent}
        isLoading={summariesLoading}
      />

      <CardSummaries
        title="Expense"
        increase={summaries?.expense?.increase}
        amount={summaries?.expense?.amount}
        percent={summaries?.expense?.percent}
        isLoading={summariesLoading}
      />

      <CardSummaries
        title="Saving"
        increase={summaries?.saving?.increase}
        amount={summaries?.saving?.amount}
        percent={summaries?.saving?.percent}
        isLoading={summariesLoading}
      />
    </section>
  );
};

export default Summaries;
