"use client";
import { WalletConnectorContext, useAccount } from "@orderly.network/hooks";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { arbitrum, mainnet } from "viem/chains";
import { usePublicClient, useAccount as useWagmiAccount } from "wagmi";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "8113e540d923482c1bc40bb5e4a14672";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 4. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains } as any);

export const WalletConnectProvider: FC<PropsWithChildren<{}>> = (props) => {
  const { account } = useAccount();

  const publicClient = usePublicClient();
  const { address, isConnecting, isDisconnected } = useWagmiAccount();

  const { open } = useWeb3Modal();

  useEffect(() => {
    // call account's setAddress method to update account status;
  }, []);

  const connect = useCallback(() => {
    return open().then((res) => {
      console.log(res);
      return [];
    });
  }, []);

  return (
    <WalletConnectorContext.Provider value={{ connect } as any}>
      {props.children}
    </WalletConnectorContext.Provider>
  );
};
