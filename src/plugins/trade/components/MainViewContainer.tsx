import MainCard from "@/components/card/MainCard";
import BoxConnectWallet from "@/plugins/wallet/components/BoxConnectWallet";
import { Box, Stack } from "@mui/material";
import MarketsContainer from "../markets/components/MarketsContainer";
import MarketSlider from "../markets/MarketSlider";
import { TradingMainView } from "../trading-view/TradingView";
import CreateOrderForm from "./create-order/CreateOrderForm";
import { OrderViewContainer } from "./order-view/OrderViewContainer";
import SymbolHeader from "./SymbolHeader";

interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

export const MainViewContainer = ({ onSymbolChange, symbol }: IProps) => {
	return (
		<>
			<MarketSlider onChangeSymbol={onSymbolChange} />

			<Box display={"flex"} flexDirection={"row"} px="10px" gap={"10px"} height={"100%"}>
				<Box display={"flex"} flexDirection={"column"}>
					<SymbolHeader onSymbolChange={onSymbolChange} symbol={symbol} />

					<MainCard backgroudColor="primary" width="100%">
						<Box sx={{ height: "calc(-175px + 100vh)", minHeight: "800px" }}>
							<Box height={"100%"} display={"flex"} flexDirection={"column"}>
								<TradingMainView symbol={symbol} onSymbolChange={onSymbolChange} />
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
					flexShrink={0}>
					<MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
					<BoxConnectWallet />
					<CreateOrderForm symbol={symbol} />
				</Stack>
			</Box>
		</>
	);
};
