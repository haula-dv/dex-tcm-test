import { ITab } from "@/common/types/components/tab";
import { MainContainer } from "@/components/container/MainContainer";
import MainTab from "@/components/tab/MainTab";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useWalletConnector } from "@orderly.network/hooks";
import { memo } from "react";
import MarketSlider from "../markets/MarketSlider";
import ActionPlaceOrderMobile from "../order-book/ActionPlaceOrderMobile";
import OrderBookMobileContainer from "../order-book/OrderBookMobileContainer";
import TradingViewMobile from "../trading-view/TradingViewMobile";
import SymbolHeader from "./SymbolHeader";
import DataListMobile from "./order-view/DataListMobile";
import { OrderViewContainer } from "./order-view/OrderViewContainer";
import DataListMobileEmpty from "./order-view/mobile/DataListMobileEmpty";

interface IProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}

const MainViewMobileContainer = ({ onSymbolChange, symbol }: IProps) => {
  const { wallet } = useWalletConnector();

  const tabs: ITab[] = [
    {
      label: "Chart",
      value: "chart",
      children: (
        <TradingViewMobile onSymbolChange={onSymbolChange} symbol={symbol} />
      ),
    },
    {
      label: "Order Book",
      value: "orderBook",
      children: <OrderBookMobileContainer symbol={symbol} />,
    },
  ];
  const theme = useTheme();

  const mdUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <MarketSlider onChangeSymbol={onSymbolChange} />

      <Divider />

      <Box pl={TSizes.margin_common} pt={TSizes.margin_xs}>
        <SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
      </Box>

      <MainContainer>
        <Box
          p={TSizes.margin_xs}
          borderRadius={TSizes.borderRadius}
          bgcolor={setColorThemeMode(
            theme.palette.primary.main,
            theme.palette.grey[800]
          )}
        >
          <MainTab tabs={tabs}>
            <>
              {tabs.map((item, index) => (
                <TabPanel key={index} value={item.value} sx={{ p: 0 }}>
                  {item.children}
                </TabPanel>
              ))}
            </>
          </MainTab>
        </Box>
        <Box pt={TSizes.margin_mobile} />
        {mdUp ? (
          <Box
            height={"333px"}
            p={TSizes.margin_xs}
            borderRadius={TSizes.borderRadius}
            bgcolor={setColorThemeMode(
              theme.palette.primary.main,
              theme.palette.grey[800]
            )}
          >
            <OrderViewContainer symbol={symbol} />
          </Box>
        ) : wallet ? (
          <DataListMobile symbol={symbol} />
        ) : (
          <DataListMobileEmpty />
        )}
      </MainContainer>

      <Box py={5.2} />
      <ActionPlaceOrderMobile symbol={symbol} />
    </>
  );
};

export default memo(MainViewMobileContainer);
