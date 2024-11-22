import { ITab } from "@/common/types/components/tab";
import { MainContainer } from "@/components/container/MainContainer";
import MainTab from "@/components/tab/MainTab";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Divider } from "@mui/material";
import { memo, useState } from "react";
import MarketSlider from "../markets/MarketSlider";
import ActionPlaceOrderMobile from "../order-book/ActionPlaceOrderMobile";
import OrderBookMobileContainer from "../order-book/OrderBookMobileContainer";
import TradingViewMobile from "../trading-view/TradingViewMobile";
import DataListMobile from "./order-view/DataListMobile";
import SymbolHeader from "./SymbolHeader";

interface IProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
}

const MainViewMobileContainer = ({ onSymbolChange, symbol }: IProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  return (
    <>
      <MarketSlider onChangeSymbol={onSymbolChange} />

      <Divider />

      <Box pl={TSizes.margin_common} pt={TSizes.margin_xs}>
        <SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
      </Box>

      <MainContainer>
        <MainTab tabs={tabs}>
          <>
            {tabs.map((item, index) => (
              <TabPanel key={index} value={item.value} sx={{ p: 0 }}>
                {item.children}
              </TabPanel>
            ))}
          </>
        </MainTab>
        <Box pt={TSizes.margin_common} />

        {/* <OrderViewMobileContainer symbol={symbol} /> */}

        <DataListMobile symbol={symbol} />
      </MainContainer>

      <Box py={5.2} />
      <ActionPlaceOrderMobile symbol={symbol} />
    </>
  );
};

export default memo(MainViewMobileContainer);
