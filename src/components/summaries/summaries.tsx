"use client";

import { useSummariesTransaction } from "@/hooks/use-transaction";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CardSummaries from "./card-summaries";

const Summaries = () => {
  const { summaries, summariesIsLoading } = useSummariesTransaction();

  return (
    <section className="w-full">
      <ScrollArea className=" w-full overflow-x-hidden" type="always">
        <section className="w-full gap-4 whitespace-nowrap flex pb-3">
          <CardSummaries
            title="Income"
            increase={summaries?.income?.increase}
            amount={summaries?.income?.amount}
            percent={summaries?.income?.percent}
            isLoading={summariesIsLoading}
          />

          <CardSummaries
            title="Expense"
            increase={summaries?.expense?.increase}
            amount={summaries?.expense?.amount}
            percent={summaries?.expense?.percent}
            isLoading={summariesIsLoading}
          />

          <CardSummaries
            title="Saving"
            increase={summaries?.saving?.increase}
            amount={summaries?.saving?.amount}
            percent={summaries?.saving?.percent}
            isLoading={summariesIsLoading}
          />
        </section>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </section>
  );
};

export default Summaries;
