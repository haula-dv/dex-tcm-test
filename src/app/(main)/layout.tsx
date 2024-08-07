"use client";
import { MainContainer } from "@/components/container/MainContainer";
import { Header } from "@/components/layouts/Header";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { web3Onboard } from "@/utils/lib/web3onboard.config";
import { Box } from "@mui/material";
import { OrderlyConfigProvider } from "@orderly.network/hooks";
import React from "react";

web3Onboard;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isTestnet, networkChanged] = useIsTestnet();

  if (networkChanged && typeof window !== "undefined") {
    window.localStorage.setItem("networkId", isTestnet ? "testnet" : "mainnet");
    // window.location.reload();
  }

  return (
    <main>
      <OrderlyConfigProvider
        networkId={isTestnet ? "testnet" : "mainnet"}
        brokerId="tcmp"
      >
        <Header />
        <Box pt={"100px"}>
          <MainContainer>{children}</MainContainer>
        </Box>
      </OrderlyConfigProvider>
    </main>
  );
}
