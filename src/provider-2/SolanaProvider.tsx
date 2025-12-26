'use client'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, WalletConnectWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, {
  Context,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from 'react';

export type SolanaNetworkContextType = {
  solanaNetwork: WalletAdapterNetwork;
  setSolanaNetwork: Dispatch<SetStateAction<WalletAdapterNetwork>>;
};
const SolanaNetworkContext = createContext<SolanaNetworkContextType | null>(null);

export const useSolanaNetwork = () =>
  useContext<SolanaNetworkContextType>(SolanaNetworkContext as Context<SolanaNetworkContextType>);

// Hardcoded network - change to WalletAdapterNetwork.Devnet for testnet
const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
const autoConnect = false; // Set to true to auto-connect wallet

export const SolanaProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState(SOLANA_NETWORK);

  const endPoint = useMemo(
    () =>
      network === WalletAdapterNetwork.Devnet
        ? clusterApiUrl(network)
        : 'https://mainnet.helius-rpc.com/?api-key=4cdab4eb-eefe-4790-a0d6-45f66f2ddba5',
    [network]
  );
  const wallets = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: network as WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet,
        options: {
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
          metadata: {
            name: process.env.NEXT_PUBLIC_NAME ?? 'TCMP DEX Trade',
            description: process.env.NEXT_PUBLIC_DESCRIPTION ?? 'Trading Platform',
            icons: [
              'https://raw.githubusercontent.com/OrderlyNetwork/broker-registration/refs/heads/master/public/icon.svg'
            ],
            url: process.env.NEXT_PUBLIC_WALLETCONNECT_DAPP_URL ?? 'https://tcmp.dex.trade'
          }
        }
      })
    ];
  }, [network]);

  return (
    <SolanaNetworkContext.Provider value={{ solanaNetwork: network, setSolanaNetwork: setNetwork }}>
      <ConnectionProvider endpoint={endPoint}>
        <WalletProvider wallets={wallets as any} autoConnect={autoConnect}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaNetworkContext.Provider>
  );
};
