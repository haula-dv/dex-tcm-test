'use client'
import { supportedEvmChains } from '@/utils/network';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import React, { FC } from 'react';
// https://dashboard.walletconnect.com/01692520-64b0-4ed8-8713-cdac19098bff/2202d3e2-19b7-4dd2-954d-3208dfdb639a

export const EvmProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const injected = injectedModule();
  const walletConnect = walletConnectModule({
    projectId: "1425135d05a58da2119aba3bbe0141de",
    requiredChains: [10, 42161],
    optionalChains: [421614, 11155420],
    dappUrl: "https://tcmp-orderly.vercel.app",
  });

  const onboard = init({
    wallets: [injected, walletConnect],
    // Only include Arbitrum and Optimism chains (Orderly Network officially supports these)
    chains: supportedEvmChains
      .filter((chain) =>
        chain.label.includes('Arbitrum') || chain.label.includes('Optimism')
      )
      .map(({ id, token, label, rpcUrl }) => ({
        id,
        token,
        label,
        rpcUrl
      })),
    appMetadata: {
      name: "tcmp-orderly",
      description: "tcmp-orderly"
    },
    accountCenter: {
      desktop: { enabled: false },
      mobile: { enabled: false }
    },
    connect: {
      autoConnectLastWallet: true // Always auto-reconnect last wallet on page load
    }
  });

  return <Web3OnboardProvider web3Onboard={onboard}>{children}</Web3OnboardProvider>;
};
