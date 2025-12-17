"use client";

import { useNetTransaction } from "@/hooks/use-transaction";
import numberFormatter from "@/lib/number-formatter";
import Loading from "./loading-and-error";

const NetTotal = () => {
  const { net, netLoading } = useNetTransaction();

  return (
    <section>
      <h1 className="text-sm md:text-md text-muted-foreground">Balance</h1>
      <div className="text-xl font-semibold">
        <Loading height="h-6" width="w-56" isLoading={netLoading}>
          <h3 className="text-xl md:text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {numberFormatter(net?.netIncome || 0)}
          </h3>
        </Loading>
      </div>
    </section>
  );
};

export default NetTotal;
