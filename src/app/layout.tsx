import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Loading } from "@/components/loading/loading";
import { Providers } from "@/provider/providers";
import "@orderly.network/ui/dist/styles.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";
import "./globals.css";

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
          <Providers>{children}</Providers>

          <Loading />
          <Toaster closeButton position="top-right" />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
