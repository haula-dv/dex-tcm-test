'use client'
import { useIsTestnet } from '@/hooks';
import { OrderlyConfigProvider } from '@orderly.network/hooks';
import { WalletConnectorProvider } from '@orderly.network/wallet-connector';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { FC } from 'react';

export const OrderlyConfigProviderRoot: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isTestnet, networkChanged] = useIsTestnet();

    if (networkChanged && typeof window !== 'undefined') {
        setTimeout(() => {
            window.localStorage.setItem('networkId', isTestnet ? 'testnet' : 'mainnet');
            window.location.reload();
        }, 1_000);
    }

    return (
        <WalletConnectorProvider
            solanaInitial={{
                network: isTestnet ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet
            }}
        >
            <OrderlyConfigProvider
                networkId={isTestnet ? 'testnet' : 'mainnet'}
                brokerId={process.env.NEXT_PUBLIC_BROKER_ID ?? ''}
                brokerName={process.env.NEXT_PUBLIC_BROKER_NAME ?? ''}
            >
                {children}
            </OrderlyConfigProvider>
        </WalletConnectorProvider>
    );
};