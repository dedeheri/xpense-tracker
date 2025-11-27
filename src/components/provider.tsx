"use client";

import { SessionProvider } from "next-auth/react";
import Protected from "./protected";
import ThemeProvider from "./theme-provider";

type ProviderProps = {
  children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Protected>{children}</Protected>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
