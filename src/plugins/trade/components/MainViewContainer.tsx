import MainCard from "@/components/card/MainCard";
import { MainContainer } from "@/components/container/MainContainer";
import BoxConnectWallet from "@/plugins/wallet/components/BoxConnectWallet";
import { Box, Grid, Stack } from "@mui/material";
import MarketsContainer from "../markets/components/MarketsContainer";
import MarketSlider from "../markets/MarketSlider";
import { OrderBookContainer } from "../order-book/OrderBookContainer";
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

			<MainContainer maxWidth={false}>
				<Grid container spacing={"16px"} height={"100%"} sx={{ display: "flex" }}>
					<Grid item md={8} sx={{ display: "flex", flexDirection: "column" }}>
						<Box>
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
					</Grid>

					<Grid item md={2} sx={{ display: "flex", flexDirection: "column", height: "auto" }}>
						<OrderBookContainer symbol={symbol} />
					</Grid>

					<Grid item md={2}>
						<Stack spacing={"10px"} height={"100%"}>
							<MarketsContainer onSymbolChange={onSymbolChange} symbol={symbol} />
							<BoxConnectWallet />
							<CreateOrderForm symbol={symbol} />
						</Stack>
					</Grid>
				</Grid>
			</MainContainer>
		</>
	);
};
