import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Loading } from "@/components/loading/loading";
import { OrderlyRootProvider } from "@/provider-2/OrderlyRootProvider";
import "@orderly.network/ui/dist/styles.css";
import '@solana/wallet-adapter-react-ui/styles.css';
import { headers } from "next/headers";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import "./globals.css";
import "./market-popup.css";
import "./theme.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <head />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <ClientThemeProvider>
          {/* <Providers cookies={cookies}>{children}</Providers> */}
          <OrderlyRootProvider>{children}</OrderlyRootProvider>
          <Loading />
          <Toaster closeButton position="top-right" />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
