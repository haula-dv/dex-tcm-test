/* eslint-disable react-hooks/rules-of-hooks */
import { setColorThemeMode } from "@/utils/helpers";
import { Box, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { memo } from "react";
const SymbolOverviewNoSSR = dynamic(
	() => import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
	{
		ssr: false,
	},
);
interface IProps {
	symbol: string;
	onSymbolChange: (symbol: string) => void;
}

const TradingViewMobile = ({ symbol, onSymbolChange }: IProps) => {
	const theme = useTheme();

	const [_, base] = symbol.split("_");

	return (
		<Box
			position={"relative"}
			width={"100%"}
			borderRadius={"14px"}
			overflow={"hidden"}
			height={"440px"}
			bgcolor={setColorThemeMode("#fff", "#131722")}>
			<Box
				position={"absolute"}
				top={0}
				left={0}
				border={1}
				borderColor={setColorThemeMode("#fff", "#131722")}
				width={"100%"}
				height={"100%"}
				bgcolor={"transparent"}
				sx={{
					pointerEvents: "none",
					borderRadius: "14px",
				}}
				zIndex={9}></Box>

			<SymbolOverviewNoSSR
				disabled_features={[
					"hide_left_toolbar_by_default",
					"adaptive_logo",
					"header_chart_type",
					"header_compare",
					"left_toolbar",
				]}
				enabled_features={["header_settings", "header_chart_type"]}
				locale="en"
				calendar
				theme={theme.palette.mode}
				symbol={base}
				autosize
				allow_symbol_change={false}
				interval="180"
				range="12M"
				timezone="Etc/UTC"
				style="9"
				toolbar_bg={theme.palette.primary.light}
			/>
		</Box>
	);
};

export default memo(TradingViewMobile);
