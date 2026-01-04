import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
import MainTab from "@/components/tab/MainTab";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useState } from "react";

// Wrapper that tracks loading without passing onLoaded to child
const createTrackedComponent = (importFn: () => Promise<any>, onLoaded: () => void) => {
    const Component = dynamic(importFn, { ssr: false });

    return function TrackedComponent(props: any) {
        useEffect(() => {
            onLoaded();
        }, []);
        return <Component {...props} />;
    };
};

interface IProps {
    symbol: string;
}

const TOTAL_COMPONENTS = 6;

function PureMainViewMobileContainer({ symbol }: IProps) {
    const [loadedCount, setLoadedCount] = useState(0);
    const [components, setComponents] = useState<any>(null);

    const handleLoaded = useCallback(() => {
        setLoadedCount((prev) => prev + 1);
    }, []);

    // Create tracked components only once
    useEffect(() => {
        setComponents({
            MarketSlider: createTrackedComponent(() => import("../markets/MarketSlider"), handleLoaded),
            SymbolHeader: createTrackedComponent(() => import("./SymbolHeader"), handleLoaded),
            OrderBook: createTrackedComponent(() => import("../order-book/OrderBookContainer").then(w => w.OrderBookContainer), handleLoaded),
            TimeChart: createTrackedComponent(() => import("./TimeChart").then(w => w.TimeChart), handleLoaded),
            OrderEntry: createTrackedComponent(() => import("./create-order/OrderEntryForm"), handleLoaded),
            OrderView: createTrackedComponent(() => import("./order-view/OrderViewContainer"), handleLoaded),
        });
    }, [handleLoaded]);

    const isLoading = loadedCount < TOTAL_COMPONENTS || !components;

    const onSymbolChange = (symbol: string) => {
        localStorage.setItem(_orderlySymbolKey, symbol);
        location.replace(`/trading/perp/${symbol}`);
    };

    const [valueTab, setValueTab] = useState<any>("chart");

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

    if (!components) return null;

    const { MarketSlider, SymbolHeader, OrderBook, TimeChart, OrderEntry, OrderView } = components;

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
                    bgcolor="rgba(0,0,0,0.3)"
                    zIndex={1000}
                >
                    <CircularProgress color="primary" />
                </Box>
            )}

            <Box sx={{ opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
                <MarketSlider onChangeSymbol={onSymbolChange} />
                <Stack spacing={1} px={1}>
                    <MainCard backgroudColor="primary">
                        <SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
                    </MainCard>

                    <MainCard backgroudColor="primary">
                        <MainTab fullWidth={false} tabs={tabs} onChange={handleChange} height={TSizes.buttonHeightSmall} rightSideTab={<IconButton onClick={handleShowTab}>
                            <ChevronDown size={'1rem'} />
                        </IconButton>}>
                            <Box display={isShowTab ? 'block' : 'none'}>
                                <Box height={'440px'} display={valueTab === "chart" ? "block" : "none"} borderRadius={'14px'} overflow={'hidden'}>
                                    <TimeChart symbol={symbol} />
                                </Box>

                                <Box display={valueTab === "orderbook" ? "block" : "none"}>
                                    <OrderBook symbol={symbol} />
                                </Box>
                            </Box>
                        </MainTab>
                    </MainCard>

                    <OrderEntry symbol={symbol} />

                    <OrderView symbol={symbol} onSymbolChange={onSymbolChange} />
                    <div style={{ paddingTop: '10px' }}></div>
                </Stack>
            </Box>
        </Box>
    );
}

export const MainViewMobileContainer = memo(PureMainViewMobileContainer, (prevProps, nextProps) => {
    return prevProps.symbol === nextProps.symbol;
})