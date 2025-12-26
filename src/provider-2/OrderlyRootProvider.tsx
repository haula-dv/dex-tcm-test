'use client'
import { AppInfo } from '@/utils/constants/key_store';
import { supportedEvmChains } from '@/utils/network';
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import injectedModule from '@web3-onboard/injected-wallets';
import metamaskModule from "@web3-onboard/metamask";
import walletConnectModule from '@web3-onboard/walletconnect';
import React, { FC } from "react";


export const OrderlyRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const injected = injectedModule();
    const walletConnect = walletConnectModule({
        projectId: process.env.WALLETCONNECT_PROJECT_ID,
        requiredChains: [10, 42161],
        optionalChains: [421614, 11155420],
        dappUrl: process.env.WALLETCONNECT_DAPP_URL,
    });

    const metamask = metamaskModule({
        options: {
            extensionOnly: false,
            dappMetadata: {
                name: AppInfo.BROKER_NAME,
                url: process.env.WALLETCONNECT_DAPP_URL,
            },

            useDeeplink: true,
            preferDesktop: false,
            checkInstallationImmediately: false,
        },
    });

    // Only include Arbitrum and Optimism chains (Orderly Network officially supports these)
    const orderlyChains = supportedEvmChains
        .filter((chain) =>
            chain.label.includes('Arbitrum') || chain.label.includes('Optimism')
        )
        .map(({ id, token, label, rpcUrl }) => ({
            id,
            token,
            label,
            rpcUrl
        }));

    return (
        <WalletConnectorProvider
            evmInitial={{
                options: {
                    accountCenter: {
                        desktop: { enabled: false },
                        mobile: { enabled: false }
                    },
                    connect: {
                        autoConnectLastWallet: false
                    },
                    appMetadata: {
                        name: "tcmp-orderly",
                        description: "tcmp-orderly"
                    },
                    chains: orderlyChains,
                    wallets: [injected, walletConnect, metamask],
                    theme: 'dark',
                }
            }}
            solanaInitial={{ network: WalletAdapterNetwork.Mainnet }}
        >
            <OrderlyAppProvider
                brokerId="orderly"
                brokerName="Orderly"
                networkId="testnet"
            >
                {children}
            </OrderlyAppProvider>
        </WalletConnectorProvider>
    );
};