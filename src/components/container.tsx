'use client";';

import Header from "./headers";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <main>
      <Header />
      <div className="py-5 lg:px-0 px-5 max-w-5xl mx-auto space-y-10 font-sans">
        {children}
      </div>
    </main>
  );
};

export default Container;
