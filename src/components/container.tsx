"use client";

import { useEffect, useState } from "react";
import Header from "./headers";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans flex !items-center space-x-3">
          <p>Xpense</p>
        </h1>
      </div>
    );
  }
  return (
    <main>
      <Header />
      <div className="py-5 mt-14 lg:py-8 lg:px-0 px-5 max-w-5xl mx-auto space-y-5 lg:space-y-8 font-sans">
        {children}
      </div>
    </main>
  );
};

export default Container;
