"use client";
import { isTestnet } from "@/utils/lib/network";
import { useSetChain } from "@web3-onboard/react";
import { useEffect, useState } from "react";

export function useIsTestnet() {
  const [networkId, setNetworkId] = useState<"testnet" | "mainnet">();
  const [{ connectedChain }] = useSetChain();

  // Determine if the network is testnet or mainnet
  const testnet = connectedChain ? isTestnet(connectedChain) : false;

  // Detect network change
  const networkChanged =
    (testnet && networkId === "mainnet") ||
    (!testnet && networkId === "testnet");

  useEffect(() => {
    // Set initial networkId from localStorage
    if (typeof window !== "undefined") {
      const storedNetworkId = window.localStorage.getItem("networkId") as
        | "testnet"
        | "mainnet";
      setNetworkId(storedNetworkId ?? "mainnet");
    }
  }, []);

  useEffect(() => {
    // Update networkId when connectedChain changes
    if (connectedChain != null) {
      setNetworkId(testnet ? "testnet" : "mainnet");
    }
  }, [connectedChain, testnet]);

  return [testnet, networkChanged];
}
