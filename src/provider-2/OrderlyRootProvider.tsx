'use client'
import { useOrderlyConfig } from '@/utils/config/tcmp-cofig';
import { AppInfo } from '@/utils/constants/key_store';
import { useTheme } from "@mui/material";
import { useChains } from '@orderly.network/hooks';
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import injectedModule from '@web3-onboard/injected-wallets';
import metamaskModule from "@web3-onboard/metamask";
import walletConnectModule from '@web3-onboard/walletconnect';
import React, { FC, useMemo } from "react";

export const OrderlyRootProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();

    // Determine network mode from localStorage (avoid using useIsTestnet hook here to prevent circular dependency)
    const networkId = useMemo(() => {
        if (typeof window === 'undefined') return 'mainnet';
        return (localStorage.getItem('networkId') ?? 'mainnet') as 'testnet' | 'mainnet';
    }, []);

    const injected = injectedModule();
    const walletConnect = walletConnectModule({
        projectId: process.env.WALLETCONNECT_PROJECT_ID,
        requiredChains: [10, 42161],
        optionalChains: [421614, 11155420],
        dappUrl: process.env.WALLETCONNECT_DAPP_URL ?? 'https://dex-tcm-test.vercel.app',
    });
    // https://dashboard.walletconnect.com/01692520-64b0-4ed8-8713-cdac19098bff/2202d3e2-19b7-4dd2-954d-3208dfdb639a

    const metamask = metamaskModule({
        options: {
            extensionOnly: false,
            dappMetadata: {
                name: AppInfo.BROKER_NAME,
                url: process.env.WALLETCONNECT_DAPP_URL ?? 'https://dex-tcm-test.vercel.app',
            },
            // Enable deeplink for auto-redirect back to website after signing
            useDeeplink: true,
            // Use mobile app for better UX
            preferDesktop: false,
            checkInstallationImmediately: false,
            // Important: This helps with auto-redirect
            i18nOptions: {
                enabled: true
            }
        },
    });

    const [chains] = useChains()

    const orderlyChains = useMemo(() => {
        if (!chains || !chains.mainnet || !chains.testnet) return []
        const allChains = [...chains.mainnet, ...chains.testnet];
        const remapChainIds = allChains.map((item) => {
            return {
                id: item.network_infos.chain_id,
                token: item.network_infos.currency_symbol,
                label: item.network_infos.shortName,
                rpcUrl: item.network_infos.public_rpc_url
            };
        })

        return remapChainIds
    }, [chains])

    const config = useOrderlyConfig()

    console.log("DAPP_URL", process.env.WALLETCONNECT_DAPP_URL)

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
                        name: AppInfo.BROKER_NAME,
                        description: AppInfo.BROKER_NAME,
                        icon: AppInfo.BROKER_LOGO,
                        logo: AppInfo.BROKER_LOGO,
                    },
                    chains: orderlyChains,
                    wallets: [injected, walletConnect, metamask],
                    theme: theme.palette.mode,
                }
            }}
            solanaInitial={{ network: WalletAdapterNetwork.Mainnet }}
        >
            <OrderlyAppProvider
                brokerId={AppInfo.BROKER_ID}
                brokerName={AppInfo.BROKER_NAME}
                networkId={networkId}
                appIcons={config.orderlyAppProvider.appIcons}
            >
                {children}
            </OrderlyAppProvider>
        </WalletConnectorProvider>
    );
};