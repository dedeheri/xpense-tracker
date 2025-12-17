"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import numberFormatter from "@/lib/number-formatter";
import Link from "next/link";

const TargetCard = ({
  id,
  icon,
  title,
  amount = 0,
  goals = 0,
}: {
  id: string | undefined;
  icon: string;
  title: string;
  amount: number | undefined;
  goals: number | undefined;
}) => {
  return (
    <section>
      <Link href={`targets/${id}`}>
        <div className="border rounded-full px-5 py-3">
          <div className="flex space-x-4">
            {/* icon */}

            <div className="size-12 px-2 bg-neutral-700 rounded-full">
              <h1 className="flex justify-center items-center h-full text-2xl">
                {icon}
              </h1>
            </div>

            <div className="w-full  space-y-1">
              {/* title */}
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold">{title}</h1>
                <div className="flex">
                  <h2 className="text-lg font-semibold">
                    {numberFormatter(amount)}
                  </h2>
                  <h2 className="text-lg font-semibold">/</h2>
                  <h2 className="text-lg font-semibold">
                    {numberFormatter(goals)}
                  </h2>
                </div>
              </div>

              {/* progres */}
              <Progress value={50} className="w-full h-3" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default TargetCard;
