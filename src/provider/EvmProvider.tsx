'use client'
import { supportedEvmChains } from '@/utils/network';
import { ChainNamespace } from '@orderly.network/types';
import injectedModule from '@web3-onboard/injected-wallets';
import { init, Web3OnboardProvider } from '@web3-onboard/react';
import walletConnectModule from '@web3-onboard/walletconnect';
import React, { FC, useEffect, useMemo, useState } from 'react';

export const EvmProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const web3Onboard = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      console.log('[EvmProvider] Initializing web3-onboard...');

      const injected = injectedModule();
      console.log('[EvmProvider] Injected module created');

      const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
      console.log('[EvmProvider] WalletConnect ProjectId:', projectId ? 'Set' : 'Not set');

      const walletConnect = walletConnectModule({
        projectId: projectId ?? '',
        requiredChains: [10, 42161],
        optionalChains: [421614, 11155420],
        dappUrl: process.env.NEXT_PUBLIC_WALLETCONNECT_DAPP_URL ?? ''
      });
      console.log('[EvmProvider] WalletConnect module created');

      const autoConnectLastWallet =
        window.localStorage.getItem('chain-namespace') === ChainNamespace.evm;

      const web3OnboardInstance = init({
        wallets: [injected, walletConnect],
        chains: supportedEvmChains.map(({ id, token, label, rpcUrl }) => ({
          id,
          token,
          label,
          rpcUrl
        })),
        appMetadata: {
          name: process.env.NEXT_PUBLIC_APP_NAME ?? 'TCMP DEX Trade',
          description: process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? 'Trading Platform'
        },
        accountCenter: {
          desktop: { enabled: false },
          mobile: { enabled: false }
        },
        connect: {
          autoConnectLastWallet
        }
      });

      console.log('[EvmProvider] web3-onboard initialized successfully');
      return web3OnboardInstance;
    } catch (err) {
      console.error('[EvmProvider] Error during initialization:', err);
      setError(err as Error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (error) {
      console.error('[EvmProvider] Caught error:', error.message, error.stack);
    }
  }, [error]);

  if (!web3Onboard) {
    if (error) {
      console.error('[EvmProvider] Rendering children without provider due to error:', error);
    }
    return <>{children}</>;
  }

  return <Web3OnboardProvider web3Onboard={web3Onboard}>{children}</Web3OnboardProvider>;
};
