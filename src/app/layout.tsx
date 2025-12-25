import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Loading } from "@/components/loading/loading";
import Providers from "@/provider/providers";
import "@orderly.network/ui/dist/styles.css";
import { headers } from "next/headers";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import "./globals.css";
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
          <Providers cookies={cookies}>{children}</Providers>

          <Loading />
          <Toaster closeButton position="top-right" />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
