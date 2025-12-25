'use client'
import { useWalletConnector } from '@orderly.network/wallet-connector';

export default function PerpPage() {
  const { connect, wallet, disconnect } = useWalletConnector();

  useEffect(() => {
    if (buttonState === 'has-wallet' && onConnect) {
      onConnect();
    }
  }, [buttonState, onConnect]);
  // const updateTitle = useCallback(
  //   (title: string) => {
  //     var titleElement = document.getElementById(TCMP_ORDERLY_SDK_TITLE_KEY);
  //     if (titleElement) {
  //       titleElement.textContent = title ?? symbol.toString();
  //     }
  //   },
  //   [symbol]
  // );

  // const onSymbolChange = (symbol: string) => {
  //   localStorage.setItem(_orderlySymbolKey, symbol);
  //   router.push(`/trading/perp/${symbol}`);
  //   updateTitle(symbol);
  // };

  // const theme = useTheme();
  // const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {evmWallet && <div>EVM Wallet: {JSON.stringify(evmWallet.label)}</div>}

      <button
        onClick={() => {
          setSolanaModalVisible(true);
        }}
      >
        Connect Solana Wallet
      </button>

      <button
        onClick={async () => {
          await connectWallet();
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
