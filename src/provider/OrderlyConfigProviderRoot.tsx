import { WalletConnectorContext, WalletState } from "@orderly.network/hooks";
import { ChainNamespace } from "@orderly.network/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  useWeb3Modal,
} from "@web3modal/wagmi/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WagmiProvider, useAccount as useWagmiAccount } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// 1. Get projectId at https://cloud.reown.com/
const projectId = "8113e540d923482c1bc40bb5e4a14672";
// https://dashboard.reown.com/01692520-64b0-4ed8-8713-cdac19098bff/b388c9a0-eab5-4efd-afb0-1a4631495b7a

// 2. Create wagmiConfig
const metadata = {
  name: "Bazaarex",
  description: "Bazaarex",
  url: "https://bazaarex.com",
  icons: ["https://bazaarex.com/favicon.ico"],
};

const chains = [mainnet, arbitrum] as any;
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId });

// 4. Create QueryClient for React Query
const queryClient = new QueryClient();

// Inner component that uses Wagmi hooks
const OrderlyConfigProviderInner: FC<PropsWithChildren> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    chains: chains.map((chain: any) => ({
      namespace: ChainNamespace.evm,
      id: chain.id,
    })),
    accounts: [],
    icon: "",
    label: "",
    provider: null as any,
  });

  const { open } = useWeb3Modal();
  const { address, isConnecting, chain, connector, status } = useWagmiAccount();

  useEffect(() => {
    const run = async () => {
      if (!connector) return;
      const accounts = await connector.getAccounts();
      const provider = await connector.getProvider();
      const client = await connector.getClient?.();

      setWallet((prevWallet) => ({
        ...prevWallet,
        accounts: accounts.map((addr) => ({ address: addr })),
        provider: provider as any,
        label: client?.name ?? "",
      }));
    };
    run();
  }, [address, connector]);

  return (
    <WalletConnectorContext.Provider
      value={{
        connect: () => {
          return open().then(() => []);
        },
        disconnect: async () => {
          connector?.disconnect();
          return [];
        },
        setChain: async ({ chainId }) => {
          return connector?.switchChain?.({ chainId: Number(chainId) });
        },
        chains,
        connectedChain: chain
          ? { id: chain.id, namespace: ChainNamespace.evm }
          : null,
        namespace: ChainNamespace.evm,
        connecting: isConnecting,
        settingChain: status === "reconnecting",
        wallet,
      }}
    >
      {children}
    </WalletConnectorContext.Provider>
  );
};

// Wrapper component with WagmiProvider
export const OrderlyConfigProviderRoot: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OrderlyConfigProviderInner>{children}</OrderlyConfigProviderInner>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
