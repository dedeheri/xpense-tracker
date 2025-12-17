"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";
import numberFormatter from "@/lib/number-formatter";
import Loading from "../loading-and-error";

interface ICardSummaries {
  title: string;
  increase: boolean | undefined;
  amount: number | undefined;
  percent: number | undefined;
  isLoading: boolean;
}

const CardSummaries = ({
  title,
  increase,
  amount,
  percent,
  isLoading,
}: ICardSummaries) => {
  return (
    <section className=" border p-3 md:p-4 rounded-2xl md:rounded-3xl min-w-60 w-full">
      <section className="space-y-2 md:space-y-4">
        <div>
          <div className="flex items-center space-y-2 !justify-between">
            <Loading isLoading={isLoading} height="h-4" width="w-20">
              <h1 className="text-xs md:text-md text-muted-foreground">
                {title}
              </h1>
            </Loading>

            <Loading isLoading={isLoading} height="h-4" width="w-16 ">
              <Badge
                variant="outline"
                className="h-5 min-w-5 rounded-full px-1 space-x-1 "
              >
                {increase ? <TrendingUp /> : <TrendingDown />}

                <span>{percent}%</span>
              </Badge>
            </Loading>
          </div>

          <Loading isLoading={isLoading} height="h-8" width="w-52">
            <h3 className="text-lg md:text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {numberFormatter(amount || 0)}
            </h3>
          </Loading>
        </div>

        <Loading isLoading={isLoading} height="h-4" width="w-48">
          {increase ? (
            <div className="flex items-center space-x-2">
              <h4 className="text-xs md:text-md line-clamp-1 flex gap-2 font-medium">
                Up this month
              </h4>

              <TrendingUp size={18} />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h4 className="text-sm md:text-md line-clamp-1 flex gap-2 font-medium">
                Down this month
              </h4>

              <TrendingDown size={18} />
            </div>
          )}
        </Loading>
      </section>
    </section>
  );
};

export default CardSummaries;
