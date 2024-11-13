import { ITab } from "@/common/types/components/tab";
import MainCard from "@/components/card/MainCard";
import MainTab from "@/components/tab/MainTab";
import { TColors } from "@/utils";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack, useTheme } from "@mui/material";
import { memo, useState } from "react";
import OrderBookContentCustom from "./OrderBookContentCustom";
import OrderLastTradeContent from "./OrderLastTradeContent";

interface IProps {
	symbol: string;
	onSymbolChange?: (symbol: string) => void;
}

const OrderBookMobileContainer = ({ symbol }: IProps) => {
	const [value, setValue] = useState<any>("orderbook");

	const handleChange = (newValue: ITab) => {
		setValue(newValue.value);
	};

	const tabs = [
		{ label: "Orderbook", value: "orderbook" },
		{ label: "Trades", value: "trades" },
	];

	return (
		<MainCard backgroudColor="primary" width="100%">
			<Box
				flexShrink={0}
				width={"100%"}
				height="100%"
				overflow={"hidden"}
				borderRadius={TSizes.borderRadius}>
				<Stack direction={"row"} spacing={"6px"} height={"48px"} width={"100%"}>
					<MainTab tabs={tabs} onChange={handleChange} fullWidth height={TSizes.buttonHeight} />
				</Stack>

				<Box
					sx={{ height: "390px", overflowY: "auto" }}
					bgcolor={setColorThemeMode(useTheme().palette.primary.light, TColors.brownnDark)}
					borderRadius={TSizes.borderRadius}
					p="10px">
					{value == "orderbook" && <OrderBookContentCustom symbol={symbol} />}

					{value == "trades" && <OrderLastTradeContent symbol={symbol} />}
				</Box>
			</Box>
		</MainCard>
	);
};

export default memo(OrderBookMobileContainer);
