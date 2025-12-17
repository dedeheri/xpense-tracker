"use client";

import { useTarget } from "@/hooks/use-target";
import TargetCard from "./target-card";
import TargetHeading from "./target-heading";
import LoadingAndError from "../loading-and-error";

const Target = () => {
  const {
    targetData,
    targetMessage,
    targetIsStatus,
    targetIsError,
    targetIsLoading,
  } = useTarget();

  return (
    <section className="space-y-5">
      <TargetHeading />

      <LoadingAndError
        isStatus={targetIsStatus}
        isLoading={targetIsLoading}
        row={5}
        height="h-10"
        width="w-full"
        isError={targetIsError}
        message={targetMessage}
      >
        <div className="grid grid-cols-2 gap-3">
          {targetData?.map(({ id, icon, title, amount, goals }, i) => (
            <TargetCard
              key={i}
              id={id}
              icon={icon}
              title={title}
              amount={amount}
              goals={goals}
            />
          ))}
        </div>
      </LoadingAndError>
    </section>
  );
};

export default Target;
