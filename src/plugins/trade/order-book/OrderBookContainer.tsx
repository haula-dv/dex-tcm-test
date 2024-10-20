import { ITab } from "@/common/types/components/tab";
import MainTab from "@/components/tab/MainTab";
import { TColors } from "@/utils";
import { setColorThemeMode } from "@/utils/helpers";
import { TSizes } from "@/utils/themes/custom-theme/sizes";
import { Box, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import OrderBookContentCustom from "./OrderBookContentCustom";
import OrderLastTradeContent from "./OrderLastTradeContent";

interface IProps {
	symbol: string;
	onSymbolChange?: (symbol: string) => void;
}

export const OrderBookContainer = ({ symbol }: IProps) => {
	const [value, setValue] = useState<any>("orderbook");

	const handleChange = (newValue: ITab) => {
		setValue(newValue.value);
	};

	const tabs = [
		{ label: "Orderbook", value: "orderbook" },
		{ label: "Trades", value: "trades" },
	];

	return (
		<Box
			flexShrink={0}
			width={{ xs: "220px", lg: "280px" }}
			height="100%"
			overflow={"hidden"}
			ml={"10px"}
			borderRadius={TSizes.borderRadius}>
			<Stack direction={"row"} spacing={"6px"} height={"48px"} width={"100%"}>
				<MainTab tabs={tabs} onChange={handleChange} fullWidth height={TSizes.buttonHeight} />
			</Stack>

			<Box
				sx={{ height: "calc(100% - 48px)", overflowY: "auto" }}
				bgcolor={setColorThemeMode(useTheme().palette.primary.light, TColors.brownnDark)}
				borderRadius={TSizes.borderRadius}
				p="10px">
				{value == "orderbook" && <OrderBookContentCustom symbol={symbol} />}

				{value == "trades" && <OrderLastTradeContent symbol={symbol} />}
			</Box>
		</Box>
	);
};
