'use client'
import { DefaultEVMWalletAdapter } from '@orderly.network/default-evm-adapter';
import { OrderlyConfigProvider } from '@orderly.network/hooks';
import { EthersProvider } from '@orderly.network/web3-provider-ethers';
import { FC } from 'react';

// Hardcoded network ID - change this to 'testnet' if needed
const NETWORK_ID = 'mainnet';

export const OrderlyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <OrderlyConfigProvider
      networkId={NETWORK_ID}
      brokerId={'tcmp'}
      brokerName={'tcmp'}
      walletAdapters={[
        new DefaultEVMWalletAdapter(new EthersProvider()),
        // new DefaultSolanaWalletAdapter()
      ]}
    >
      {children}
    </OrderlyConfigProvider>
  );
};
