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

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";
const infuraKey = "<INFURA_KEY>";

const onboard = init({
  apiKey,
  wallets: [injected, coinbase], // initialize wallet
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
    },
    {
      id: 42161,
      token: "ARB-ETH",
      label: "Arbitrum One",
      rpcUrl: "https://rpc.ankr.com/arbitrum",
    },
    {
      id: "0xa4ba",
      token: "ARB",
      label: "Arbitrum Nova",
      rpcUrl: "https://nova.arbitrum.io/rpc",
    },
    {
      id: "0x2105",
      token: "ETH",
      label: "Base",
      rpcUrl: "https://mainnet.base.org",
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
      brokerId="orderly"
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
