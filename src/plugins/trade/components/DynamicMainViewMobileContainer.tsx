import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
import MainTab from "@/components/tab/MainTab";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, IconButton, Stack } from "@mui/material";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, useState } from "react";
const DynamicMarketSlider = dynamic(() => import("../markets/MarketSlider"));
const DynamicSymbolHeader = dynamic(() => import("./SymbolHeader"));
const DynamicOrderBookContainer = dynamic(() => import("../order-book/OrderBookContainer").then((w) => w.OrderBookContainer), {
    ssr: false,
});
const DynamicTimeChart = dynamic(() => import("./TimeChart").then((w) => w.TimeChart), {
    ssr: false,
});
const DynamicOrderEntryForm = dynamic(() => import("./create-order/OrderEntryForm"));
const DynamicOrderViewContainer = dynamic(() => import("./order-view/OrderViewContainer"));

interface IProps {
    symbol: string;
}

function PureMainViewMobileContainer({ symbol }: IProps) {
    const onSymbolChange = (symbol: string) => {
        localStorage.setItem(_orderlySymbolKey, symbol);
        location.replace(`/trading/perp/${symbol}`);
    };

    const [valueTab, setValueTab] = useState<any>("orderbook");

    const tabs: ITab[] = [
        { label: "Chart", value: "chart" },
        { label: "Orderbook", value: "orderbook" },
    ];

    const handleChange = (newValue: ITab) => {
        setValueTab(newValue.value);
    };

    const [isShowTab, setIsShowTab] = useState(true);
    const handleShowTab = () => {
        setIsShowTab(!isShowTab);
    };

    return <>
        <DynamicMarketSlider onChangeSymbol={onSymbolChange} />
        <Stack spacing={1} px={1}>
            <MainCard backgroudColor="primary">
                <DynamicSymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
            </MainCard>

            <MainCard backgroudColor="primary">
                <MainTab fullWidth={false} tabs={tabs} onChange={handleChange} height={TSizes.buttonHeightSmall} rightSideTab={<IconButton onClick={handleShowTab}>
                    <ChevronDown size={'1rem'} />
                </IconButton>}>
                    <Box display={isShowTab ? 'block' : 'none'}>
                        <Box height={'440px'} display={valueTab === "chart" ? "block" : "none"} borderRadius={'14px'} overflow={'hidden'}>
                            <DynamicTimeChart symbol={symbol} />
                        </Box>

                        <Box display={valueTab === "orderbook" ? "block" : "none"}>
                            <DynamicOrderBookContainer symbol={symbol} />
                        </Box>
                    </Box>
                </MainTab>
            </MainCard>

            <DynamicOrderEntryForm symbol={symbol} />

            <DynamicOrderViewContainer symbol={symbol} onSymbolChange={onSymbolChange} />
            <div style={{ paddingTop: '10px' }}></div>
        </Stack>
    </>;
}

export const MainViewMobileContainer = memo(PureMainViewMobileContainer, (prevProps, nextProps) => {
    return prevProps.symbol === nextProps.symbol;
})