import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Loading } from "@/components/loading/loading";
import Web3OnboardProviderRoot from "@/provider/WalletConnectProvider";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <ClientThemeProvider>
          <Web3OnboardProviderRoot>{children}</Web3OnboardProviderRoot>

          <Loading />
          <Toaster closeButton position="top-right" />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
