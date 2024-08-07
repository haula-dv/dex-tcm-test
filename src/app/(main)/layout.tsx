"use client";
import { MainContainer } from "@/components/container/MainContainer";
import { Header } from "@/components/layouts/Header";
import { useIsTestnet } from "@/hooks/useIsTestnet";
import { Box } from "@mui/material";
import { OrderlyConfigProvider } from "@orderly.network/hooks";
import coinbaseModule from "@web3-onboard/coinbase";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import React from "react";

// Initialize Web3 Onboard
const injected = injectedModule();
const coinbase = coinbaseModule();

const onboard = init({
  wallets: [injected, coinbase], // initialize wallet
  chains: [
    {
      id: "0x1", // Ethereum Mainnet
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://arbitrum-one.publicnode.com",
    },
    {
      id: 11155111,
      token: "ETH",
      label: "Sepolia",
      rpcUrl: "https://rpc.sepolia.org/",
    },
  ],
  appMetadata: {
    name: "Your App Name",
    icon: "<svg>Your SVG Icon</svg>", // Replace with your icon
    description: "Your app description",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

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
    <OrderlyConfigProvider
      networkId={isTestnet ? "testnet" : "mainnet"}
      brokerId="tcmp"
    >
      <main>
        <Header />
        <Box pt={"100px"}>
          <MainContainer>{children}</MainContainer>
        </Box>
      </main>
    </OrderlyConfigProvider>
  );
}
