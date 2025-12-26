'use client'
import { useIsTestnet } from '@/hooks';
import { ENV_NAME } from '@/utils/config/CustomConfigStore';
import { AppInfo } from '@/utils/constants/key_store';
import { DefaultEVMWalletAdapter } from '@orderly.network/default-evm-adapter';
import { OrderlyConfigProvider } from '@orderly.network/hooks';
import { EthersProvider } from '@orderly.network/web3-provider-ethers';
import { FC } from 'react';
const HostEnvMap: Record<string, ENV_NAME> = {
  "dev-sdk-demo.orderly.network": "dev",
  "qa-sdk-demo.orderly.network": "qa",
  "sdk-demo-iap.orderly.network": "staging",
  localhost: "staging",
};

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
      brokerId={AppInfo.BROKER_ID ?? ''}
      brokerName={AppInfo.BROKER_NAME ?? ''}
      walletAdapters={[
        new DefaultEVMWalletAdapter(new EthersProvider()),
      ]}
    >
      {children}
    </OrderlyConfigProvider>
  );
};
