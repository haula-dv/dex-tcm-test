'use client'
import { useConnectWallet } from '@web3-onboard/react';
import { useState } from 'react';

export default function PerpPage() {
  const [open, setOpen] = useState(false);
  const [{ wallet: evmWallet }, connectWallet] = useConnectWallet();

  return (
    <>
      {evmWallet && <div>EVM Wallet: {JSON.stringify(evmWallet.label)}</div>}

      <button
        onClick={async () => {
          console.log('connectWallet', connectWallet);
          await connectWallet().then((wallet) => {
            console.log('wallet', wallet);
          });
        }}
      >
        Connect EVM Wallet
      </button>
      {/* <MainViewContainer symbol={symbol} /> */}
      {/* {lgUp ? (
				<MainViewContainer symbol={symbol || "PERP_ETH_USDC"} onSymbolChange={onSymbolChange} />
			) : (
				<MainViewMobileContainer
					symbol={symbol || "PERP_ETH_USDC"}
					onSymbolChange={onSymbolChange}
				/>
			)} */}

      {/* <MainViewContainer symbol={symbol || "PERP_ETH_USDC"} onSymbolChange={onSymbolChange} /> */}
    </>
  );
}
