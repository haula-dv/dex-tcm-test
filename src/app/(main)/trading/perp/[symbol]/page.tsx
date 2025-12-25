import { MainViewContainer } from "@/plugins/trade/components/MainViewContainer";

export default async function PerpPage({ params }: { params: { symbol: string } }) {
  // const router = useRouter();
  const { symbol } = await params;

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
      <MainViewContainer symbol={symbol} />
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
