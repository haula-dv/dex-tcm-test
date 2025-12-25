'use client'
import { useIsTestnet } from '@/hooks';
import { DefaultEVMWalletAdapter } from '@orderly.network/default-evm-adapter';
import { DefaultSolanaWalletAdapter } from '@orderly.network/default-solana-adapter';
import { OrderlyConfigProvider } from '@orderly.network/hooks';
import { EthersProvider } from '@orderly.network/web3-provider-ethers';
import { FC } from 'react';


export const OrderlyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTestnet, networkChanged] = useIsTestnet();

  if (networkChanged && typeof window !== 'undefined') {
    setTimeout(() => {
      window.localStorage.setItem('networkId', isTestnet ? 'testnet' : 'mainnet');
      window.location.reload();
    }, 1_000);
  }

  return (
    <OrderlyConfigProvider
      networkId={isTestnet ? 'testnet' : 'mainnet'}
      brokerId={process.env.NEXT_PUBLIC_BROKER_ID ?? ''}
      brokerName={process.env.NEXT_PUBLIC_BROKER_NAME ?? ''}
      walletAdapters={[
        new DefaultEVMWalletAdapter(new EthersProvider()),
        new DefaultSolanaWalletAdapter() as any
      ]}
    >
      {children}
    </OrderlyConfigProvider>
  );
};
