import { Suspense } from "react";
import "./globals.css";
import Provider from "@/components/provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Provider>
          <Suspense>{children}</Suspense>
        </Provider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
