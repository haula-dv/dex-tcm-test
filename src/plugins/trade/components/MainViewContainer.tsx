'use client'
import MainCard from "@/components/card/MainCard";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { Box, CircularProgress, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Helper to wrap dynamic components and trigger onLoaded
const wrapDynamic = (importFunc: () => Promise<any>) => {
  return dynamic(async () => {
    const mod = await importFunc();
    const Component = mod.default;
    return function WrappedChecked({ onLoaded, ...props }: any) {
      useEffect(() => {
        onLoaded?.();
      }, []);
      return <Component {...props} />;
    };
  }, { ssr: false });
};

const DynamicMarketSlider = wrapDynamic(() => import("../markets/MarketSlider"));
const DynamicTradingMainView = wrapDynamic(() => import("../trading-view/TradingView"));
const DynamicOrderViewContainer = wrapDynamic(() => import("./order-view/OrderViewContainer"));
const DynamicMarketsContainer = wrapDynamic(() => import("../markets/components/MarketsContainer"));
const DynamicCreateOrderForm = wrapDynamic(() => import("./create-order/CreateOrderForm"));
const DynamicOrderEntryForm = wrapDynamic(() => import("./create-order/OrderEntryForm"));
const DynamicSymbolHeader = wrapDynamic(() => import("./SymbolHeader"));
const DynamicBoxConnectWallet = wrapDynamic(() => import("@/plugins/wallet/components/BoxConnectWallet"));

interface IProps {
  symbol: string;
}

const TOTAL_COMPONENTS = 6;

export const MainViewContainer = ({ symbol }: IProps) => {
  const router = useRouter();
  const [loadedCount, setLoadedCount] = useState(0);

  const handleLoaded = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  const isLoading = loadedCount < TOTAL_COMPONENTS;

  const onSymbolChange = (symbol: string) => {
    localStorage.setItem(_orderlySymbolKey, symbol);
    // router.push(`/trading/perp/${symbol}`);
    // router.refresh();
    location.replace(`/trading/perp/${symbol}`);
  };

  return (
    <Box position="relative" width="100%" height="100%">
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="transparent"
          zIndex={1000}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <Box sx={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <DynamicMarketSlider onChangeSymbol={onSymbolChange} onLoaded={handleLoaded} />

        <Box
          display={"flex"}
          flexDirection={"row"}
          px="10px"
          gap={"10px"}
          height={"100%"}
          width={"100%"}
          pb="10px"
        >
          <Box display={"flex"} flexDirection={"column"}
            width={"calc(100% - 350px)"}
            flexShrink={0}
          >
            <DynamicSymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} onLoaded={handleLoaded} />

            <MainCard backgroudColor="primary" width="100%" height="calc(100vh - 400px)">
              <DynamicTradingMainView
                key={symbol}
                symbol={symbol}
                onSymbolChange={onSymbolChange}
                onLoaded={handleLoaded}
              />
            </MainCard>

            <DynamicOrderViewContainer symbol={symbol} onSymbolChange={onSymbolChange} onLoaded={handleLoaded} />
          </Box>

          <Stack
            spacing={"10px"}
            width={"350px"}
            flexShrink={0}
            pr={1}
            position={'sticky'}
            top={'100px'}
          >
            <DynamicMarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} onLoaded={handleLoaded} />

            <DynamicBoxConnectWallet />

            <DynamicOrderEntryForm symbol={symbol} onLoaded={handleLoaded} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
