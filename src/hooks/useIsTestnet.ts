'use client'
import { isTestnet } from '@/utils/network';
import { useSetChain } from '@web3-onboard/react';
import { useEffect, useState } from 'react';

export function useIsTestnet() {
  const [networkId, setNetworkId] = useState<'testnet' | 'mainnet'>('mainnet');
  const [{ connectedChain: connectedEvmChain }] = useSetChain();

  // Only check EVM chain for testnet (Solana removed)
  let testnet: boolean;
  if (connectedEvmChain != null) {
    testnet = isTestnet(connectedEvmChain.id);
  } else {
    testnet = false;
  }
  
  const networkChanged =
    (testnet && networkId === 'mainnet') || (!testnet && networkId === 'testnet');

  useEffect(() => {
    setNetworkId(testnet ? 'testnet' : 'mainnet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedEvmChain]);

  return [testnet, networkChanged];
}
