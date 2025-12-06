'use client";';

import Header from "./headers";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
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
