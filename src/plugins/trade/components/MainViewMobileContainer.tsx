import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
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
import OrderViewMobileContainer from "./order-view/OrderViewMobileContainer";
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
			children: <TradingViewMobile onSymbolChange={onSymbolChange} symbol={symbol} />,
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

			<Box pl={TSizes.margin_base} pt={TSizes.margin_xs}>
				<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />
			</Box>

			<MainContainer>
				<MainTab tabs={tabs}>
					{/* <MainCard backgroudColor="primary" width="100%"> */}
					<>
						{tabs.map((item, index) => (
							<TabPanel key={index} value={item.value} sx={{ p: 0 }}>
								{item.children}
							</TabPanel>
						))}
					</>
					{/* </MainCard> */}
				</MainTab>
				<Box pt={TSizes.margin_base} />

				<MainCard backgroudColor="primary" width="100%" minHeight="auto" disablePadding>
					<OrderViewMobileContainer symbol={symbol} />
				</MainCard>
			</MainContainer>

			<Box py={6} />
			<ActionPlaceOrderMobile symbol={symbol} />
		</>
	);
};

export default memo(MainViewMobileContainer);
