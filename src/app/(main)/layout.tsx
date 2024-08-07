"use client";
import { MainContainer } from "@/components/container/MainContainer";
import { Header } from "@/components/layouts/Header";
import { OrderlyConfigProviderRoot } from "@/provider/OrderlyConfigProviderRoot";
import Web3OnboardProviderRoot from "@/provider/WalletConnectProvider";
import { Box } from "@mui/material";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Web3OnboardProviderRoot>
        <OrderlyConfigProviderRoot>
          <Header />
          <Box pt={"100px"}>
            <MainContainer>{children}</MainContainer>
          </Box>
        </OrderlyConfigProviderRoot>
      </Web3OnboardProviderRoot>
    </main>
  );
}
