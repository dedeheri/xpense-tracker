"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle } from "./ui/alert";

interface LoadingProps {
  isLoading: boolean;
  height: string;
  width: string;
  className?: string;
  row?: number;
  isError?: boolean;
  message?: string;
  children: React.ReactNode;
}

const LoadingAndError = ({
  isLoading,
  height,
  width,
  className,
  row = 1,
  isError = false,
  message = "",
  children,
}: LoadingProps) => {
  const { status } = useSession();

  // loading
  if (status === "unauthenticated" || isLoading) {
    return (
      <section>
        <div className={clsx("space-y-2", className)}>
          {[...Array(row)].map((_, i) => (
            <div
              key={i}
              className={clsx(
                "bg-neutral-100 dark:bg-neutral-800 rounded-full animate-pulse",
                height,
                width
              )}
            />
          ))}
        </div>
      </section>
    );
  }

  // error
  if (isError) {
    return (
      <div className="p-4">
        <Alert className="flex items-center justify-center ">
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      </div>
    );
  }

  return children;
};

export default LoadingAndError;
