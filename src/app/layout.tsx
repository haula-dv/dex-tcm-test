import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import ClientThemeProvider from "@/components/ClientThemeProvider";
import { inter } from "@/utils/themes/custom-theme/Typography";

import { Loading } from "@/components/loading/loading";
import Web3OnboardProviderRoot from "@/provider/WalletConnectProvider";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  applicationName: "Dex",
  title: "Dex",
  description: "Dex",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head />
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ClientThemeProvider>
            <Web3OnboardProviderRoot>{children}</Web3OnboardProviderRoot>

            <Loading />
            <Toaster closeButton position="top-right" />
          </ClientThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
