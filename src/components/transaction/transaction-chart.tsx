"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartTransaction } from "@/hooks/use-transaction";

import { useCategory } from "@/hooks/use-category";
import { use, useEffect, useState } from "react";
import Loading from "../loading-and-error";
import { useTheme } from "next-themes";

export const description = "A multiple bar chart";

export function TransactionChart({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const { theme } = useTheme();
  const params = use(searchParams);

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
                  fill={theme === "dark" ? `#ffffff` : "#000000"}
                  radius={10}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Loading>
  );
}
