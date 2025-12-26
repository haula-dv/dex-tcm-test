import { MainLayoutTrade } from "@/plugins/trade/components/MainLayoutTrade";

export default async function PerpPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;
  console.log(symbol);
  return (
    <>
      <MainLayoutTrade symbol={symbol} />
      {/* {evmWallet && <div>EVM Wallet: {JSON.stringify(evmWallet.label)}</div>}

      <button
        onClick={async () => {
          console.log('connectWallet', connectWallet);
          await connectWallet().then((wallet) => {
            console.log('wallet', wallet);
          });
        }}
      >
        Connect EVM Wallet
      </button> */}
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
