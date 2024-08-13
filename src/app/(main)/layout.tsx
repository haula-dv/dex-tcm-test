"use client";
import { MainContainer } from "@/components/container/MainContainer";
import { Header } from "@/components/layouts/Header";
import { UnSupportNextworkAlert } from "@/plugins/wallet/components/UnSupportNextworkAlert";
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
          <UnSupportNextworkAlert />
          <MainContainer sx={{ pt: "40px" }}>
            <Box maxWidth={"440px"} mx={"auto"}>
              {children}
            </Box>
          </MainContainer>
        </OrderlyConfigProviderRoot>
      </Web3OnboardProviderRoot>
    </main>
  );
}
