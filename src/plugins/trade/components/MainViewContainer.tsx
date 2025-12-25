'use client'
import MainCard from "@/components/card/MainCard";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { Box } from "@mui/material";
import { SymbolInfoBarFullWidget } from '@orderly.network/markets';
import dynamic from "next/dynamic";
import { TradingMainView } from "../trading-view/TradingView";
import { OrderViewContainer } from "./order-view/OrderViewContainer";

const DynamicMainViewContainer = dynamic(() => import("../markets/MarketSlider"), {
  ssr: false,
});

interface IProps {
  symbol: string;
}

export const MainViewContainer = ({ symbol }: IProps) => {
  const onSymbolChange = (symbol: string) => {
    localStorage.setItem(_orderlySymbolKey, symbol);
    //  router.push(`/trading/perp/${symbol}`);
    location.replace(`/trading/perp/${symbol}`);
    //  updateTitle(symbol);
  };

  return (
    <div>
      <DynamicMainViewContainer onChangeSymbol={onSymbolChange} />

      <Box>
        <Box display={"flex"} flexDirection={"column"}>
          <SymbolInfoBarFullWidget symbol={symbol} onSymbolChange={(symbol) => onSymbolChange(symbol.symbol)} />

          <MainCard backgroudColor="primary" width="100%">
            <Box sx={{ height: "calc(-175px + 100vh)", minHeight: "800px" }}>
              <Box height={"100%"} display={"flex"} flexDirection={"column"}>
                <TradingMainView
                  symbol={symbol}
                  onSymbolChange={onSymbolChange}
                />

                <OrderViewContainer symbol={symbol} />
              </Box>
            </Box>
          </MainCard>
        </Box>
      </Box>
      {/* <Box
        display={"flex"}
        flexDirection={"row"}
        px="10px"
        gap={"10px"}
        height={"100%"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

          <MainCard backgroudColor="primary" width="100%">
            <Box sx={{ height: "calc(-175px + 100vh)", minHeight: "800px" }}>
              <Box height={"100%"} display={"flex"} flexDirection={"column"}>
                <TradingMainView
                  symbol={symbol}
                  onSymbolChange={onSymbolChange}
                />
                <OrderViewContainer symbol={symbol} />
              </Box>
            </Box>
          </MainCard>
        </Box>

        <Stack
          spacing={"10px"}
          minHeight={"calc(100vh - 200px)"}
          maxWidth={"300px"}
          width={"100%"}
          flexShrink={0}
        >
          <MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
          <BoxConnectWallet />
          <MainCard
            backgroudColor="primary"
            width="100%"
            height="100%"
            heightCard="100%"
          >
            <CreateOrderForm symbol={symbol} />
          </MainCard>
        </Stack>
      </Box> */}
    </div>
  );
};
