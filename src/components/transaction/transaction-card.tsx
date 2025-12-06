"use client";

import { useTransaction } from "@/hooks/use-transaction";
import { useSearchParams } from "next/navigation";

const TransactionCard = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category") ?? "";
  const typeParams = searchParams.get("type") ?? "";
  const pageParams = searchParams.get("page") ?? "1";

  const params = {
    type: typeParams,
    category: categoryParams,
    page: pageParams,
  };

  const {
    transactions,
    transactionsLoading,
    transactionsError,
    transactionsMessage,
    pages,
  } = useTransaction(params);

  return (
    <section className="space-y-3">
      {transactions?.map((transaction, index) =>
        transaction.transactions.map((items, i) => (
          <div
            key={i}
            className="bg-neutral-900 h-14 rounded-full w-full flex items-center"
          >
            <div className="flex items-center px-4">
              <div className="bg-neutral-800 h-9 rounded-full w-9 flex items-center justify-center">
                <p className="text-md">{items?.type?.icon}</p>
              </div>
            </div>

            <div>
              <h1>{items?.note}</h1>
              <div className="flex items-center space-x-1">
                <p>{items?.category?.icon}</p>
                <p>{items?.category?.title}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default TransactionCard;
