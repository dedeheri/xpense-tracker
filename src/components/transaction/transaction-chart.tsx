"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartTransaction } from "@/hooks/use-transaction";
import { useSearchParams } from "next/navigation";

import { useCategory } from "@/hooks/use-category";
import { useEffect, useState } from "react";
import Loading from "../loading-and-error";

export const description = "A multiple bar chart";

export function TransactionChart() {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category") ?? "";

  const params = {
    category: categoryParams,
  };

  const { chart, chartLoading, chartMessage, chartError } =
    useChartTransaction(params);
  const { categorys } = useCategory();
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    if (categorys && categorys.length > 0) {
      const categoryConfig = categorys.reduce((acc, cgry) => {
        if (cgry && cgry.title) {
          const categoryKey = cgry.title;
          acc[categoryKey] = {
            label: cgry.title,
          };
        }
        return acc;
      }, {} as ChartConfig);
      setChartConfig({ ...categoryConfig });
    }
  }, [categorys]);

  return (
    <Loading
      isLoading={chartLoading}
      row={5}
      height="h-10"
      width="w-full"
      isError={chartError}
      message={chartMessage?.error}
    >
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <BarChart
              accessibilityLayer
              data={chart}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                // tickFormatter={(value) => value.slice(0, 10)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {categorys?.map((category, i) => (
                <Bar
                  key={i}
                  dataKey={category.title}
                  fill={`#ffffff`}
                  radius={10}
                >
                  {/* <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  /> */}
                </Bar>
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Loading>
  );
}
