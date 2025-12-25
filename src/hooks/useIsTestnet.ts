'use client'
import { useSolanaNetwork } from '@/provider/SolanaProvider';
import { isTestnet } from '@/utils/network';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSetChain } from '@web3-onboard/react';
import { useEffect, useState } from 'react';

export function useIsTestnet() {
  const [networkId, setNetworkId] = useState<'testnet' | 'mainnet'>();
  const [{ connectedChain: connectedEvmChain }] = useSetChain();
  const { solanaNetwork } = useSolanaNetwork();
  const { connected: solanaWalletConnected } = useWallet();

  let testnet: boolean;
  if (connectedEvmChain != null) {
    testnet = isTestnet(connectedEvmChain.id);
  } else if (solanaWalletConnected && solanaNetwork === WalletAdapterNetwork.Devnet) {
    testnet = true;
  } else if (!solanaWalletConnected && typeof window !== 'undefined') {
    testnet = window.localStorage.getItem('networkId') === 'testnet';
  } else {
    testnet = false;
  }
  const networkChanged =
    (testnet && networkId === 'mainnet') || (!testnet && networkId === 'testnet');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNetworkId(
        (window.localStorage.getItem('networkId') as 'testnet' | 'mainnet') ?? 'mainnet'
      );
    }
  }, []);

  useEffect(() => {
    setNetworkId(testnet ? 'testnet' : 'mainnet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedEvmChain]);

  return [testnet, networkChanged];
}
