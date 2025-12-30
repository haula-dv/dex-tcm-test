'use client'
import MainCard from "@/components/card/MainCard";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { Box, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const DynamicMarketSlider = dynamic(() => import("../markets/MarketSlider"), {
  ssr: false,
  loading: () => <div>Markets loading...</div>,
});

const DynamicTradingMainView = dynamic(() => import("../trading-view/TradingView"), {
  ssr: false,
});

const DynamicOrderViewContainer = dynamic(() => import("./order-view/OrderViewContainer").then((mod) => mod.default), {
  ssr: false,
});

const DynamicMarketsContainer = dynamic(() => import("../markets/components/MarketsContainer").then((mod) => mod.default), {
  ssr: false,
});

const DynamicCreateOrderForm = dynamic(() => import("./create-order/CreateOrderForm").then((mod) => mod.default), {
  ssr: false,
});

const DynamicOrderEntryForm = dynamic(() => import("./create-order/OrderEntryForm").then((mod) => mod.default), {
  ssr: false,
});

const DynamicSymbolHeader = dynamic(
  () => import("./SymbolHeader").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div>SymbolHeader loading...</div>,
  }
);

interface IProps {
  symbol: string;
}

export const MainViewContainer = ({ symbol }: IProps) => {
  const router = useRouter();
  const onSymbolChange = (symbol: string) => {
    localStorage.setItem(_orderlySymbolKey, symbol);
    router.replace(`/trading/perp/${symbol}`);
    // location.replace(`/trading/perp/${symbol}`);
    //  updateTitle(symbol);
  };

  return (
    <>
      <DynamicMarketSlider onChangeSymbol={onSymbolChange} />

      <Box
        display={"flex"}
        flexDirection={"row"}
        px="10px"
        gap={"10px"}
        height={"100%"}
        width={"100%"}
        pb="10px"
      >
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          <DynamicSymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

          <MainCard backgroudColor="primary" width="100%">
            <Box sx={{ height: "calc(-175px + 100vh)", minHeight: "800px" }}>
              <Box height={"100%"} display={"flex"} flexDirection={"column"}>
                <DynamicTradingMainView
                  symbol={symbol}
                  onSymbolChange={onSymbolChange}
                />

                <DynamicOrderViewContainer symbol={symbol} />
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
          <DynamicMarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
          {/* <BoxConnectWallet /> */}
          <MainCard
            backgroudColor="primary"
            width="100%"
            height="100%"
            heightCard="100%"
          >
            <DynamicOrderEntryForm symbol={symbol} />
            {/* <DynamicCreateOrderForm symbol={symbol} /> */}
          </MainCard>
        </Stack>
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
    </>
  );
};
