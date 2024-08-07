"use client";
import { supportedChains } from "@/utils/lib/network";
import coinbaseModule from "@web3-onboard/coinbase";
import fortmaticModule from "@web3-onboard/fortmatic";
import injectedModule from "@web3-onboard/injected-wallets";
import portisModule from "@web3-onboard/portis";
import { init, Web3OnboardProvider } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";

const injected = injectedModule();
const coinbase = coinbaseModule();

const portis = portisModule({
  apiKey: "apiKey",
});
const fortmatic = fortmaticModule({
  apiKey: "apiKey",
});

const walletConnect = walletConnectModule({
  projectId: "5f4e967f02cf92c8db957c56e877e149",
  requiredChains: [10, 42161],
  optionalChains: [421614, 11155420],
  dappUrl: "https://orderlynetwork.github.io/example-dex",
});

const web3Onboard = init({
  wallets: [injected, walletConnect, coinbase, portis, fortmatic],
  chains: supportedChains.map(({ id, token, label, rpcUrl }) => ({
    id,
    token,
    label,
    rpcUrl,
  })),
  appMetadata: {
    name: "Orderly DEX",
    description: "Fully fledged example DEX using Orderly Network",
  },
  accountCenter: {
    desktop: { enabled: false },
    mobile: { enabled: false },
  },
  connect: {
    autoConnectLastWallet: true,
  },
});

export default function Web3OnboardProviderRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      {children}
    </Web3OnboardProvider>
  );
}
