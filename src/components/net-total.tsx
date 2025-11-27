"use client";

import { useNetTransaction } from "@/hooks/use-transaction";
import numberFormatter from "@/lib/number-formatter";
import Loading from "./loading-and-error";

const NetTotal = () => {
  const { net, isLoading } = useNetTransaction();

  return (
    <section className="space-y-1">
      <h1 className="text-md font-semibold">Net Total</h1>
      <div
        className="text-xl font-semibold
      "
      >
        <Loading height="h-6" width="w-56" isLoading={isLoading}>
          {numberFormatter(net?.netIncome || 0)}
        </Loading>
      </div>
    </section>
  );
};

export default NetTotal;
